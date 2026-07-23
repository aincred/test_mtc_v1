import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const fromDate = searchParams.get('fromDate');
    const toDate = searchParams.get('toDate');
    const recordNo = searchParams.get('recordNo');
    const samNo = searchParams.get('samNo');
    const childName = searchParams.get('childName');
    const districtName = searchParams.get('district') || 'RANCHI';
    const mtcId = searchParams.get('mtc');
    const page = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 10;
    const offset = (page - 1) * limit;

    let whereClauses: string[] = ['1=1'];
    let sqlParams: any[] = [];

    // Filter by District (Get MTCs in district if specific MTC not passed)
    if (mtcId) {
      sqlParams.push(Number(mtcId));
      whereClauses.push(`m.mtc_id = $${sqlParams.length}`);
    } else if (districtName && districtName.toUpperCase() !== 'ALL') {
      sqlParams.push(districtName.toUpperCase());
      whereClauses.push(`m.mtc_id IN (SELECT mtc_id FROM mtc_centers WHERE UPPER(district) = $${sqlParams.length})`);
    }

    // Date filters
    if (fromDate) {
      sqlParams.push(fromDate);
      whereClauses.push(`m.admission_date >= $${sqlParams.length}::DATE`);
    }
    if (toDate) {
      sqlParams.push(toDate);
      whereClauses.push(`m.admission_date <= $${sqlParams.length}::DATE`);
    }

    // Text search filters
    if (recordNo) {
      sqlParams.push(Number(recordNo));
      whereClauses.push(`m.registration_id = $${sqlParams.length}`);
    }
    if (samNo) {
      sqlParams.push(`%${samNo.trim()}%`);
      whereClauses.push(`m.sam_no ILIKE $${sqlParams.length}`);
    }
    if (childName) {
      sqlParams.push(`%${childName.trim()}%`);
      whereClauses.push(`m.child_full_name ILIKE $${sqlParams.length}`);
    }

    const whereSql = whereClauses.join(' AND ');

    // 1. Get total count for pagination
    const countSql = `SELECT COUNT(*)::INT AS total FROM mtc_child_master m WHERE ${whereSql}`;
    const countRes = await query<{ total: number }>(countSql, sqlParams);
    const totalEntries = countRes.rows[0]?.total || 0;

    // 2. Fetch paginated records
    const dataSql = `
      SELECT 
        m.registration_id::text AS "recordNo",
        COALESCE(m.sam_no, 'N/A') AS "samNumber",
        COALESCE(m.child_full_name, 'Unknown') AS "childName",
        COALESCE(m.guardian_name, m.mother_name, 'N/A') AS "parentName",
        TO_CHAR(m.dob, 'DD-Mon-YYYY') AS dob,
        COALESCE(m.admission_weight_kg, 0)::FLOAT AS weight,
        COALESCE(m.length_height_cm, 0)::FLOAT AS height
      FROM mtc_child_master m
      WHERE ${whereSql}
      ORDER BY m.admission_date DESC, m.registration_id DESC
      LIMIT $${sqlParams.length + 1} OFFSET $${sqlParams.length + 2}
    `;

    const dataRes = await query(dataSql, [...sqlParams, limit, offset]);

    const formattedRecords = dataRes.rows.map((row, index) => ({
      sNo: offset + index + 1,
      recordNo: row.recordNo,
      samNumber: row.samNumber,
      childName: row.childName,
      parentName: row.parentName,
      dob: row.dob || 'N/A',
      weight: Number(row.weight) || 0,
      height: Number(row.height) || 0,
    }));

    return NextResponse.json({
      success: true,
      data: formattedRecords,
      pagination: {
        total: totalEntries,
        page,
        limit,
        totalPages: Math.ceil(totalEntries / limit) || 1,
      },
    });

  } catch (error: any) {
    console.error("Child Case Sheet API Error:", error);
    return NextResponse.json(
      { error: "Failed to query child case sheets", details: error.message },
      { status: 500 }
    );
  }
}