import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

interface EquipmentItem {
  id: number;
  name: string;
  quantity: number;
  availability: string;
  workingStatus: string;
  workingQuantity: number;
}

interface EquipmentDataJSON {
  screeningRoom?: EquipmentItem[];
  equipmentForExamine?: EquipmentItem[];
  ward?: EquipmentItem[];
  other?: EquipmentItem[];
  kitchenEquipment?: EquipmentItem[];
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const districtParams = searchParams.get("districts"); // Comma-separated list
    const mtcParams = searchParams.get("mtc"); // Comma-separated list
    const equipmentFilter = searchParams.get("equipment"); // Selected Equipment ID/Name

    let whereClauses: string[] = [];
    let queryParams: any[] = [];
    let paramIndex = 1;

    // Filter by District Names
    if (districtParams && districtParams.trim() !== "") {
      const districtsList = districtParams
        .split(",")
        .map((d) => d.trim().toUpperCase())
        .filter(Boolean);

      if (districtsList.length > 0) {
        whereClauses.push(`UPPER(COALESCE(c.district, e.district)) = ANY($${paramIndex})`);
        queryParams.push(districtsList);
        paramIndex++;
      }
    }

    // Filter by MTC Names
    if (mtcParams && mtcParams.trim() !== "") {
      const mtcList = mtcParams
        .split(",")
        .map((m) => m.trim().toUpperCase())
        .filter(Boolean);

      if (mtcList.length > 0) {
        whereClauses.push(`UPPER(COALESCE(c.mtc_name, e.mtc_name)) = ANY($${paramIndex})`);
        queryParams.push(mtcList);
        paramIndex++;
      }
    }

    const whereString = whereClauses.length > 0 ? `WHERE ${whereClauses.join(" AND ")}` : "";

    const sqlText = `
      SELECT 
        e.mtc_code,
        COALESCE(c.mtc_name, e.mtc_name) AS mtc_name,
        COALESCE(c.district, e.district, 'N/A') AS district,
        e.equipment_data,
        TO_CHAR(e.last_updated, 'DD-Mon-YYYY HH12:MI AM') AS last_updated_formatted
      FROM public.mtc_equipment_status e
      LEFT JOIN public.mtc_centers c ON e.mtc_code = c.mtc_code
      ${whereString}
      ORDER BY district ASC, mtc_name ASC
    `;

    const res = await query<{
      mtc_code: string;
      mtc_name: string;
      district: string;
      equipment_data: any;
      last_updated_formatted: string;
    }>(sqlText, queryParams);

    const processedRows: any[] = [];

    res.rows.forEach((row) => {
      let parsedData: EquipmentDataJSON = {};

      try {
        parsedData = typeof row.equipment_data === "string" 
          ? JSON.parse(row.equipment_data) 
          : row.equipment_data || {};
      } catch (err) {
        console.error("Failed to parse equipment_data JSON for MTC:", row.mtc_name);
      }

      // Combine all equipment categories from JSON
      const allItems: { category: string; item: EquipmentItem }[] = [
        ...(parsedData.screeningRoom || []).map((item) => ({ category: "Screening Room", item })),
        ...(parsedData.equipmentForExamine || []).map((item) => ({ category: "Examine Equipment", item })),
        ...(parsedData.ward || []).map((item) => ({ category: "Ward", item })),
        ...(parsedData.other || []).map((item) => ({ category: "Other Equipment", item })),
        ...(parsedData.kitchenEquipment || []).map((item) => ({ category: "Kitchen Equipment", item })),
      ];

      allItems.forEach(({ category, item }) => {
        // Apply single equipment item filter if provided
        if (
          equipmentFilter &&
          equipmentFilter.trim() !== "" &&
          item.id.toString() !== equipmentFilter &&
          item.name.toLowerCase() !== equipmentFilter.toLowerCase()
        ) {
          return;
        }

        processedRows.push({
          id: `${row.mtc_code}_${item.id}`,
          mtcCode: row.mtc_code,
          mtcName: row.mtc_name,
          district: row.district,
          category,
          equipmentId: item.id,
          equipmentName: item.name,
          totalQuantity: Number(item.quantity || 0),
          availability: item.availability || (item.quantity > 0 ? "Available" : "Not Available"),
          workingStatus: item.workingStatus || "N/A",
          workingQuantity: Number(item.workingQuantity || 0),
          lastUpdated: row.last_updated_formatted || "N/A",
        });
      });
    });

    return NextResponse.json({
      success: true,
      count: processedRows.length,
      data: processedRows,
    });
  } catch (error: any) {
    console.error("Equipment Status Report API Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to generate equipment status report", details: error.message },
      { status: 500 }
    );
  }
}