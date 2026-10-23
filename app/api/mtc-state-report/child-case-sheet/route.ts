import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const singleId = searchParams.get("id");

    // 1. Single Record Detail Request
    if (singleId) {
      const detailSql = `
        SELECT 
          m.*,
          d.district_name,
          TO_CHAR(m.dob, 'DD-Mon-YYYY') AS dob_formatted,
          TO_CHAR(m.admission_date, 'DD-Mon-YYYY') AS admission_date_formatted,
          TO_CHAR(m.discharge_date, 'DD-Mon-YYYY') AS discharge_date_formatted,
          TO_CHAR(m.created_at, 'DD-Mon-YYYY HH12:MI AM') AS created_at_formatted
        FROM public.mtc_child_master m
        LEFT JOIN public.mtc_district d ON m.district_id = d.district_id
        WHERE m.registration_id = $1
      `;

      const detailRes = await query(detailSql, [Number(singleId)]);

      if (detailRes.rows.length === 0) {
        return NextResponse.json(
          { success: false, error: "Child record not found" },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        data: detailRes.rows[0],
      });
    }

    // 2. Table Search / Filter Request
    const fromDate = searchParams.get("fromDate");
    const toDate = searchParams.get("toDate");
    const recordNo = searchParams.get("recordNo");
    const samNo = searchParams.get("samNo");
    const childName = searchParams.get("childName");
    const districtId = searchParams.get("district");
    const mtcId = searchParams.get("mtc");

    let whereClauses: string[] = [];
    let queryParams: any[] = [];
    let paramIndex = 1;

    if (fromDate) {
      whereClauses.push(`m.admission_date >= $${paramIndex}`);
      queryParams.push(fromDate);
      paramIndex++;
    }

    if (toDate) {
      whereClauses.push(`m.admission_date <= $${paramIndex}`);
      queryParams.push(toDate);
      paramIndex++;
    }

    if (recordNo) {
      whereClauses.push(`m.registration_id::TEXT = $${paramIndex}`);
      queryParams.push(recordNo);
      paramIndex++;
    }

    if (samNo) {
      whereClauses.push(`UPPER(m.sam_no) LIKE UPPER($${paramIndex})`);
      queryParams.push(`%${samNo}%`);
      paramIndex++;
    }

    if (childName) {
      whereClauses.push(`UPPER(m.child_full_name) LIKE UPPER($${paramIndex})`);
      queryParams.push(`%${childName}%`);
      paramIndex++;
    }

    if (districtId) {
      whereClauses.push(`m.district_id = $${paramIndex}`);
      queryParams.push(Number(districtId));
      paramIndex++;
    }

    if (mtcId) {
      whereClauses.push(`m.mtc_id = $${paramIndex}`);
      queryParams.push(Number(mtcId));
      paramIndex++;
    }

    const whereString = whereClauses.length > 0 ? `WHERE ${whereClauses.join(" AND ")}` : "";

    const listSql = `
      SELECT 
        m.registration_id,
        m.sam_no,
        m.child_full_name,
        COALESCE(m.mother_name, m.father_name, m.guardian_name, 'N/A') AS parent_name,
        TO_CHAR(m.dob, 'DD-Mon-YYYY') AS dob_formatted,
        m.admission_weight_kg,
        m.length_height_cm,
        m.district_id,
        m.mtc_id
      FROM public.mtc_child_master m
      ${whereString}
      ORDER BY m.registration_id DESC
    `;

    const res = await query<{
      registration_id: number;
      sam_no: string;
      child_full_name: string;
      parent_name: string;
      dob_formatted: string;
      admission_weight_kg: number | string;
      length_height_cm: number | string;
      district_id: number;
      mtc_id: number;
    }>(listSql, queryParams);

    const formattedData = res.rows.map((row) => ({
      recordNo: row.registration_id.toString(),
      samNo: row.sam_no || "-",
      childName: row.child_full_name || "-",
      parentName: row.parent_name || "-",
      dob: row.dob_formatted || "-",
      admWeight: row.admission_weight_kg ? Number(row.admission_weight_kg).toFixed(2) : "0.00",
      admHeight: row.length_height_cm ? Number(row.length_height_cm).toFixed(2) : "0.00",
    }));

    return NextResponse.json({
      success: true,
      data: formattedData,
    });
  } catch (error: any) {
    console.error("Child Case Sheet API Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch child case sheet data", details: error.message },
      { status: 500 }
    );
  }
}