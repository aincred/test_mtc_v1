import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const mtcId = searchParams.get('mtcId');
    const districtName = searchParams.get('districtName');

    let sqlText = `
      SELECT 
        m.registration_id AS id,
        COALESCE(m.sam_no, 'N/A') AS "samNumber",
        COALESCE(m.registration_id::text, 'N/A') AS "recordNo",
        COALESCE(m.child_full_name, 'Unknown') AS "childName",
        COALESCE(m.guardian_name, m.mother_name, 'N/A') AS "parentName",
        COALESCE(m.mobile_number, 'N/A') AS "mobileNumber",
        m.sex_id::text AS sex,
        TO_CHAR(m.admission_date, 'YYYY-MM-DD') AS "admissionDate",
        COALESCE(m.admission_weight_kg, 0) AS "admissionWeight",
        COALESCE(m.length_height_cm, 0) AS "admissionHeight",
        COALESCE(m.z_score_sd, 'N/A') AS "zScore",
        COALESCE(m.village, 'N/A') AS village,
        TO_CHAR(m.discharge_date, 'YYYY-MM-DD') AS "dischargeDate",
        m.admission_type_id::text AS "admissionType"
      FROM mtc_child_master m
      WHERE 1=1
    `;

    const sqlParams: any[] = [];

    // Filter by specific MTC Center ID
    if (mtcId) {
      sqlParams.push(mtcId);
      sqlText += ` AND m.mtc_id = $${sqlParams.length}`;
    } 
    // Otherwise filter by entire District if provided
    else if (districtName && districtName.toUpperCase() !== 'ALL') {
      sqlParams.push(districtName.toUpperCase());
      sqlText += ` AND m.mtc_id IN (
        SELECT mtc_id FROM mtc_centers WHERE UPPER(district) = $${sqlParams.length}
      )`;
    }

    sqlText += ` ORDER BY m.admission_date DESC, m.registration_id DESC LIMIT 500`;

    const result = await query(sqlText, sqlParams);

    return NextResponse.json(result.rows, { status: 200 });
  } catch (error: any) {
    console.error("Master Child Records Fetch Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch child records from database", details: error.message },
      { status: 500 }
    );
  }
}