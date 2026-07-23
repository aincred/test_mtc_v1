// import { NextResponse } from 'next/server';
// import { query } from '@/lib/db';

// export const dynamic = 'force-dynamic';

// export async function GET(request: Request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     // Defaulting to RANCHI to match your current dashboard scope
//     const district = searchParams.get('district') || 'RANCHI'; 

//     const sqlText = `
//       SELECT mtc_id, mtc_name 
//       FROM mtc_centers 
//       WHERE district = $1 
//       ORDER BY mtc_name ASC
//     `;
    
//     const result = await query(sqlText, [district]);

//     // Map the database integers/strings to the exact format your frontend expects
//     const formattedMtcs = result.rows.map((row: any) => ({
//       id: row.mtc_id.toString(),
//       name: row.mtc_name
//     }));

//     return NextResponse.json({ success: true, data: formattedMtcs }, { status: 200 });

//   } catch (error) {
//     console.error('Failed to fetch MTC centers:', error);
//     return NextResponse.json({ error: 'Failed to fetch MTC centers' }, { status: 500 });
//   }
// }

import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const districtName = searchParams.get('districtName');

    let sqlText = `
      SELECT 
        mtc_id AS id, 
        mtc_name AS name, 
        mtc_code AS code, 
        district 
      FROM public.mtc_centers
    `;
    const sqlParams: any[] = [];

    if (districtName && districtName.toUpperCase() !== 'ALL') {
      sqlParams.push(districtName.toUpperCase());
      sqlText += ` WHERE UPPER(district) = $1`;
    }

    sqlText += ` ORDER BY mtc_name ASC`;

    const result = await query(sqlText, sqlParams);

    return NextResponse.json({
      success: true,
      centers: result.rows
    });
  } catch (error: any) {
    console.error("Fetch MTC Centers Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch MTC centers", details: error.message },
      { status: 500 }
    );
  }
}