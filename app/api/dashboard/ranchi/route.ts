// // import { NextResponse } from 'next/server';
// // import { query } from '@/lib/db'; 

// // export const dynamic = 'force-dynamic';

// // export async function GET(request: Request) {
// //   try {
// //     // 1. Fetch MTC Centers using the string-based 'district' column from the schema
// //     const centersRes = await query(`
// //       SELECT mtc_id AS id, mtc_name AS name, mtc_code AS code
// //       FROM mtc_centers 
// //       WHERE LOWER(district) = 'ranchi'
// //       ORDER BY mtc_name ASC;
// //     `).catch(() => ({ rows: [] }));

// //     // Construct the final minimal payload 
// //     const payload = {
// //       districtName: "Ranchi",
// //       centers: centersRes.rows.map((row: any) => ({
// //         id: row.id,
// //         name: row.name || "Unknown MTC",
// //         code: row.code,
// //         officer: "Assigned MO",
// //         contact: "N/A",
// //         beds: 10 
// //       }))
// //     };

// //     return NextResponse.json(payload);

// //   } catch (error: any) {
// //     console.error('Ranchi Dashboard Fetch Error:', error);
// //     return NextResponse.json({ 
// //       error: 'Failed to fetch MTC centers', 
// //       details: error?.message 
// //     }, { status: 500 });
// //   }
// // }

// import { NextResponse } from 'next/server';
// import { query } from '@/lib/db'; 

// export const dynamic = 'force-dynamic';

// interface MtcCenterRow {
//   id: number | string;
//   name: string | null;
//   code: string | null;
// }

// export async function GET() {
//   try {
//     // 1. Fetch MTC Centers using the string-based 'district' column from the schema
//     const centersRes = await query(`
//       SELECT mtc_id AS id, mtc_name AS name, mtc_code AS code
//       FROM mtc_centers 
//       WHERE LOWER(district) = 'ranchi'
//       ORDER BY mtc_name ASC;
//     `).catch(() => ({ rows: [] as MtcCenterRow[] }));

//     // Construct the final minimal payload 
//     const payload = {
//       districtName: "Ranchi",
//       centers: centersRes.rows.map((row: MtcCenterRow) => ({
//         id: row.id,
//         name: row.name || "Unknown MTC",
//         code: row.code,
//         officer: "Assigned MO",
//         contact: "N/A",
//         beds: 10 
//       }))
//     };

//     return NextResponse.json(payload);

//   } catch (error: unknown) {
//     console.error('Ranchi Dashboard Fetch Error:', error);
    
//     const errorMessage = error instanceof Error ? error.message : 'Unknown database error';
    
//     return NextResponse.json({ 
//       error: 'Failed to fetch MTC centers', 
//       details: errorMessage 
//     }, { status: 500 });
//   }
// }

import { NextResponse } from 'next/server';
import { query } from '@/lib/db'; 

export const dynamic = 'force-dynamic';

interface MtcCenterRow {
  id: number | string;
  name: string | null;
  code: string | null;
}

export async function GET() {
  try {
    // 1. Fetch MTC Centers with explicit generic interface typing
    const centersRes = await query<MtcCenterRow>(`
      SELECT mtc_id AS id, mtc_name AS name, mtc_code AS code
      FROM mtc_centers 
      WHERE LOWER(district) = 'ranchi'
      ORDER BY mtc_name ASC;
    `).catch(() => ({ rows: [] as MtcCenterRow[] }));

    // Construct the final minimal payload 
    const payload = {
      districtName: "Ranchi",
      centers: centersRes.rows.map((row) => ({
        id: row.id,
        name: row.name || "Unknown MTC",
        code: row.code,
        officer: "Assigned MO",
        contact: "N/A",
        beds: 10 
      }))
    };

    return NextResponse.json(payload);

  } catch (error: unknown) {
    console.error('Ranchi Dashboard Fetch Error:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown database error';
    
    return NextResponse.json({ 
      error: 'Failed to fetch MTC centers', 
      details: errorMessage 
    }, { status: 500 });
  }
}