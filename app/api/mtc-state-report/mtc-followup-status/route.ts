import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const fromDate = searchParams.get("fromDate");
    const toDate = searchParams.get("toDate");
    const districtParams = searchParams.get("districts"); // Comma-separated list
    const mtcParams = searchParams.get("mtc"); // Comma-separated list

    let whereClauses: string[] = [];
    let queryParams: any[] = [];
    let paramIndex = 1;

    // Filter by Actual Follow-Up Date
    if (fromDate) {
      whereClauses.push(`f.actual_date >= $${paramIndex}::DATE`);
      queryParams.push(fromDate);
      paramIndex++;
    }

    if (toDate) {
      whereClauses.push(`f.actual_date <= $${paramIndex}::DATE`);
      queryParams.push(toDate);
      paramIndex++;
    }

    // Filter by District Names
    if (districtParams && districtParams.trim() !== "") {
      const districtsList = districtParams
        .split(",")
        .map((d) => d.trim().toUpperCase())
        .filter(Boolean);

      if (districtsList.length > 0) {
        whereClauses.push(`UPPER(c.district) = ANY($${paramIndex})`);
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
        whereClauses.push(`UPPER(c.mtc_name) = ANY($${paramIndex})`);
        queryParams.push(mtcList);
        paramIndex++;
      }
    }

    const whereString = whereClauses.length > 0 ? `WHERE ${whereClauses.join(" AND ")}` : "";

    const sqlText = `
      SELECT 
        f.follow_up_id,
        f.registration_id,
        f.visit_number,
        TO_CHAR(f.actual_date, 'DD-Mon-YYYY') AS actual_date_formatted,
        f.weight_kg,
        f.height_cm,
        f.muac_cm,
        f.followed_by_name,
        f.mobile_number AS followed_by_mobile,
        m.sam_no,
        m.child_full_name,
        COALESCE(m.mother_name, m.father_name, m.guardian_name, 'N/A') AS parent_name,
        TO_CHAR(m.discharge_date, 'DD-Mon-YYYY') AS discharge_date_formatted,
        COALESCE(c.district, 'N/A') AS district_name,
        COALESCE(c.mtc_name, 'N/A') AS mtc_name
      FROM public.mtc_child_follow_up f
      INNER JOIN public.mtc_child_master m ON f.registration_id = m.registration_id
      LEFT JOIN public.mtc_centers c ON m.mtc_id = c.mtc_id
      ${whereString}
      ORDER BY f.actual_date DESC, f.follow_up_id DESC
    `;

    const res = await query(sqlText, queryParams);

    const formattedData = res.rows.map((row: any) => ({
      followUpId: row.follow_up_id ? row.follow_up_id.toString() : "-",
      registrationId: row.registration_id ? row.registration_id.toString() : "-",
      samNo: row.sam_no || "-",
      childName: row.child_full_name || "-",
      parentName: row.parent_name || "-",
      districtName: row.district_name || "-",
      mtcName: row.mtc_name || "-",
      followUpNumber: row.visit_number ? `Follow-up ${row.visit_number}` : "-",
      followUpDate: row.actual_date_formatted || "-",
      dischargeDate: row.discharge_date_formatted || "-",
      weightKg: row.weight_kg ? Number(row.weight_kg).toFixed(2) : "0.00",
      heightCm: row.height_cm ? Number(row.height_cm).toFixed(2) : "0.00",
      muacCm: row.muac_cm ? Number(row.muac_cm).toFixed(2) : "0.00",
      followedByName: row.followed_by_name || "-",
      followedByMobile: row.followed_by_mobile || "-",
      isCompleted: "Completed",
    }));

    return NextResponse.json({
      success: true,
      count: formattedData.length,
      data: formattedData,
    });
  } catch (error: any) {
    console.error("MTC Follow-Up Status API Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch MTC follow-up report", details: error.message },
      { status: 500 }
    );
  }
}