// app\api\mtcs
import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const districtIdsParam = searchParams.get('districtIds');

    let selectedDistricts: string[] = [];
    if (districtIdsParam && districtIdsParam.trim() !== '') {
      selectedDistricts = districtIdsParam
        .split(',')
        .map((d) => d.trim().toUpperCase())
        .filter((d) => d !== '' && d !== 'ALL' && d !== 'JHARKHAND (ALL)');
    }

    const hasDistrictFilter = selectedDistricts.length > 0;

    const idCols = await query<{ column_name: string }>(
      `SELECT column_name FROM information_schema.columns WHERE table_name = 'mtc_centers' AND column_name IN ('mtc_id', 'mtc_code', 'id');`,
      []
    );
    const idCol = idCols.rows.length > 0 ? idCols.rows[0].column_name : 'mtc_code';

    const nameCols = await query<{ column_name: string }>(
      `SELECT column_name FROM information_schema.columns WHERE table_name = 'mtc_centers' AND column_name IN ('mtc_name', 'center_name', 'name');`,
      []
    );
    const nameCol = nameCols.rows.length > 0 ? nameCols.rows[0].column_name : 'mtc_name';

    const sql = `
      SELECT DISTINCT 
        c.${idCol}::text AS id,
        UPPER(c.${nameCol}) AS name,
        UPPER(c.district) AS district
      FROM mtc_centers c
      WHERE c.district IS NOT NULL AND TRIM(c.district) != ''
      ${hasDistrictFilter ? 'AND UPPER(c.district) = ANY($1::text[])' : ''}
      ORDER BY UPPER(c.${nameCol}) ASC;
    `;

    const queryParams = hasDistrictFilter ? [selectedDistricts] : [];
    const { rows } = await query<{ id: string; name: string; district: string }>(sql, queryParams);

    return NextResponse.json({ success: true, count: rows.length, data: rows });
  } catch (error: any) {
    console.error('Fetch MTCs Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch MTC options', details: error.message },
      { status: 500 }
    );
  }
}