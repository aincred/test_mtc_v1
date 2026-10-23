import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const fromDate = searchParams.get("fromDate");
    const toDate = searchParams.get("toDate");
    const districtParams = searchParams.get("districts"); // Comma separated district names
    const registrationId = searchParams.get("registrationId");

    let whereClauses: string[] = [];
    let queryParams: any[] = [];
    let paramIndex = 1;

    // Filter by Admission Date Range
    if (fromDate) {
      whereClauses.push(`m.admission_date >= $${paramIndex}::DATE`);
      queryParams.push(fromDate);
      paramIndex++;
    }

    if (toDate) {
      whereClauses.push(`m.admission_date <= $${paramIndex}::DATE`);
      queryParams.push(toDate);
      paramIndex++;
    }

    // Filter by District Names (multi-select support)
    if (districtParams && districtParams.trim() !== "") {
      const districtsList = districtParams
        .split(",")
        .map((d) => d.trim().toUpperCase())
        .filter(Boolean);

      if (districtsList.length > 0) {
        whereClauses.push(`UPPER(d.district_name) = ANY($${paramIndex})`);
        queryParams.push(districtsList);
        paramIndex++;
      }
    }

    // Filter by specific Registration ID
    if (registrationId) {
      whereClauses.push(`m.registration_id = $${paramIndex}`);
      queryParams.push(Number(registrationId));
      paramIndex++;
    }

    const whereString = whereClauses.length > 0 ? `WHERE ${whereClauses.join(" AND ")}` : "";

    const sqlQuery = `
      SELECT 
        m.registration_id,
        m.sam_no,
        m.child_full_name,
        COALESCE(m.mother_name, m.father_name, m.guardian_name, 'N/A') AS parent_name,
        TO_CHAR(m.dob, 'DD-Mon-YYYY') AS dob_formatted,
        TO_CHAR(m.admission_date, 'DD-Mon-YYYY') AS admission_date_formatted,
        TO_CHAR(m.discharge_date, 'DD-Mon-YYYY') AS discharge_date_formatted,
        m.admission_weight_kg,
        m.length_height_cm,
        m.muac_cm,
        m.z_score_sd,
        m.mobile_number,
        m.village,
        m.full_address,
        m.district_id,
        d.district_name,
        m.medical_complications,
        m.created_at
      FROM public.mtc_child_master m
      LEFT JOIN public.mtc_district d ON m.district_id = d.district_id
      ${whereString}
      ORDER BY m.registration_id DESC
    `;

    const res = await query(sqlQuery, queryParams);

    return NextResponse.json({
      success: true,
      count: res.rows.length,
      data: res.rows,
    });
  } catch (error: any) {
    console.error("Download Children Records API Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch children records", details: error.message },
      { status: 500 }
    );
  }
}