import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

interface FlattenedEquipmentRow {
  mtc_name: string;
  mtc_code: string;
  equipment_id: string;
  equipment_name: string;
  sanctioned_quantity: number;
  available_quantity: number;
  status: string;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const districtName = searchParams.get('districtName') || 'RANCHI';
    const mtcsParam = searchParams.get('mtcs') || searchParams.get('mtc');

    // 1. Resolve Target MTC IDs or Names
    let targetMtcIds: number[] = [];
    if (mtcsParam && mtcsParam.trim() !== '' && mtcsParam.toUpperCase() !== 'ALL') {
      targetMtcIds = mtcsParam
        .split(',')
        .map((id) => Number(id.trim()))
        .filter((id) => !isNaN(id));
    }

    let mtcFilterSql = '1=1';
    const queryParams: any[] = [];

    if (targetMtcIds.length > 0) {
      queryParams.push(targetMtcIds);
      mtcFilterSql = `c.mtc_id = ANY($${queryParams.length}::int[])`;
    } else if (mtcsParam && mtcsParam.toUpperCase() !== 'ALL' && isNaN(Number(mtcsParam))) {
      // Filter by string MTC name if name was passed instead of ID
      queryParams.push(mtcsParam.trim());
      mtcFilterSql = `UPPER(c.mtc_name) = UPPER($${queryParams.length})`;
    } else if (districtName && districtName.toUpperCase() !== 'ALL') {
      queryParams.push(districtName.toUpperCase());
      mtcFilterSql = `(UPPER(c.district) = $${queryParams.length} OR UPPER(e.district) = $${queryParams.length})`;
    }

    // 2. Extract every single equipment item from JSONB across all categories
    const sqlText = `
      WITH center_list AS (
        SELECT 
          c.mtc_id,
          c.mtc_name,
          c.mtc_code,
          c.district
        FROM public.mtc_centers c
        LEFT JOIN public.mtc_equipment e 
          ON UPPER(TRIM(TRAILING '/' FROM c.mtc_code)) = UPPER(TRIM(TRAILING '/' FROM e.mtc_code))
        WHERE ${mtcFilterSql}
      ),
      flattened_equipment AS (
        SELECT 
          COALESCE(e.mtc_name, cl.mtc_name, 'MTC Center') AS mtc_name,
          COALESCE(e.mtc_code, cl.mtc_code) AS mtc_code,
          COALESCE(eq_item->>'id', '0') AS equipment_id,
          COALESCE(eq_item->>'name', 'Equipment Item') AS equipment_name,
          COALESCE((eq_item->>'quantity')::INT, 0) AS sanctioned_quantity,
          COALESCE((eq_item->>'workingQuantity')::INT, 0) AS available_quantity,
          CASE 
            WHEN LOWER(COALESCE(eq_item->>'workingStatus', '')) = 'working' THEN 'Functional'
            WHEN LOWER(COALESCE(eq_item->>'availability', '')) = 'available' THEN 'Functional'
            WHEN (eq_item->>'workingQuantity')::INT > 0 THEN 'Functional'
            ELSE 'Non-Functional'
          END AS status
        FROM center_list cl
        INNER JOIN public.mtc_equipment e 
          ON UPPER(TRIM(TRAILING '/' FROM cl.mtc_code)) = UPPER(TRIM(TRAILING '/' FROM e.mtc_code))
          OR UPPER(cl.mtc_code) LIKE UPPER(e.mtc_code) || '%'
          OR UPPER(e.mtc_code) LIKE UPPER(cl.mtc_code) || '%'
        CROSS JOIN LATERAL jsonb_each(e.equipment_data) AS categories(cat_key, cat_val)
        CROSS JOIN LATERAL jsonb_array_elements(cat_val) AS eq_item
      )
      SELECT 
        mtc_name,
        mtc_code,
        equipment_id,
        equipment_name,
        sanctioned_quantity,
        available_quantity,
        status
      FROM flattened_equipment
      ORDER BY mtc_name ASC, (equipment_id::INT) ASC, equipment_name ASC;
    `;

    const result = await query<FlattenedEquipmentRow>(sqlText, queryParams);
    const rows = result.rows || [];

    // 3. Compute Summary Totals across all returned items
    const functionalCount = rows.filter(
      (r) => String(r.status || '').toLowerCase() === 'functional'
    ).length;
    const nonFunctionalCount = rows.length - functionalCount;

    return NextResponse.json({
      success: true,
      summary: {
        functional: functionalCount || 0,
        nonFunctional: nonFunctionalCount || 0,
      },
      data: rows.map((r) => ({
        mtc: r.mtc_name,
        name: r.equipment_name,
        sanc: r.sanctioned_quantity,
        avail: r.available_quantity,
        status: r.status,
      })),
    });
  } catch (error: any) {
    console.error('Equipment Status Query Error:', error);

    if (error.code === '42P01') {
      return NextResponse.json({
        success: true,
        summary: { functional: 0, nonFunctional: 0 },
        data: [],
        message: 'Equipment table is empty or uninitialized.',
      });
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch equipment status report',
        details: error.message,
        summary: { functional: 0, nonFunctional: 0 },
        data: [],
      },
      { status: 500 }
    );
  }
}