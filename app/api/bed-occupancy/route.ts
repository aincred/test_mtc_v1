// import { NextResponse } from 'next/server';
// import { query } from '@/lib/db';

// // --- GET: Fetch Bed Occupancy Records for a specific Year ---
// export async function GET(request: Request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const year = searchParams.get('year');
//     const mtcCode = searchParams.get('mtcCode');

//     if (!year || !mtcCode) {
//       return NextResponse.json({ error: 'Year and MTC Code are required' }, { status: 400 });
//     }

//     const sqlText = `
//       SELECT 
//         occupancy_id AS id,
//         TO_CHAR(record_date, 'YYYY-MM-DD') AS date,
//         record_year AS year,
//         record_month AS month,
//         record_day AS day,
//         bed_sanctioned AS "bedSanctioned",
//         utilized_bed AS "utilizedBed",
//         bed_occupancy_percentage AS "bedOccupancyPercentage",
//         created_at AS "createdAt"
//       FROM mtc_bed_occupancy
//       WHERE record_year = $1 AND mtc_code = $2
//       ORDER BY record_date ASC
//     `;
    
//     const result = await query(sqlText, [parseInt(year), mtcCode]);
    
//     return NextResponse.json(result.rows, { status: 200 });
//   } catch (error) {
//     console.error('Fetch Bed Occupancy Error:', error);
//     return NextResponse.json({ error: 'Failed to fetch records' }, { status: 500 });
//   }
// }

// // --- POST: Save or Update a Bed Occupancy Record ---
// export async function POST(request: Request) {
//   try {
//     const data = await request.json();

//     // The ON CONFLICT clause ensures that if a record for this date already exists, it updates it!
//     const sqlText = `
//       INSERT INTO mtc_bed_occupancy (
//         mtc_code, record_date, record_year, record_month, record_day,
//         bed_sanctioned, utilized_bed, bed_occupancy_percentage
//       ) VALUES (
//         $1, $2, $3, $4, $5, $6, $7, $8
//       )
//       ON CONFLICT (mtc_code, record_date) 
//       DO UPDATE SET 
//         bed_sanctioned = EXCLUDED.bed_sanctioned,
//         utilized_bed = EXCLUDED.utilized_bed,
//         bed_occupancy_percentage = EXCLUDED.bed_occupancy_percentage
//       RETURNING occupancy_id;
//     `;

//     const values = [
//       data.mtcCode,
//       data.date,
//       data.year,
//       data.month,
//       data.day,
//       data.bedSanctioned,
//       data.utilizedBed,
//       data.bedOccupancyPercentage
//     ];

//     const result = await query(sqlText, values);
    
//     return NextResponse.json({ 
//       success: true, 
//       message: "Record saved successfully",
//       id: result.rows[0].occupancy_id 
//     }, { status: 201 });

//   } catch (error) {
//     console.error('Save Bed Occupancy Error:', error);
//     return NextResponse.json({ error: 'Failed to save record' }, { status: 500 });
//   }
// }


import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const year = searchParams.get('year');
    const mtcCode = searchParams.get('mtcCode');

    if (!year || !mtcCode) {
      return NextResponse.json({ error: 'Year and MTC Code are required' }, { status: 400 });
    }

    const sqlText = `
      SELECT 
        occupancy_id AS id,
        mtc_name AS "mtcName",
        TO_CHAR(record_date, 'YYYY-MM-DD') AS date,
        record_year AS year,
        record_month AS month,
        record_day AS day,
        bed_sanctioned AS "bedSanctioned",
        utilized_bed AS "utilizedBed",
        bed_occupancy_percentage AS "bedOccupancyPercentage",
        created_at AS "createdAt"
      FROM mtc_bed_occupancy
      WHERE record_year = $1 AND mtc_code = $2
      ORDER BY record_date ASC
    `;
    
    const result = await query(sqlText, [parseInt(year, 10), mtcCode]);
    
    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    console.error('Fetch Bed Occupancy Error:', error);
    return NextResponse.json({ error: 'Failed to fetch records' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const sqlText = `
      INSERT INTO mtc_bed_occupancy (
        mtc_code, mtc_name, record_date, record_year, record_month, record_day,
        bed_sanctioned, utilized_bed, bed_occupancy_percentage
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9
      )
      ON CONFLICT (mtc_code, record_date) 
      DO UPDATE SET 
        mtc_name = EXCLUDED.mtc_name,
        bed_sanctioned = EXCLUDED.bed_sanctioned,
        utilized_bed = EXCLUDED.utilized_bed,
        bed_occupancy_percentage = EXCLUDED.bed_occupancy_percentage
      RETURNING occupancy_id;
    `;

    const values = [
      data.mtcCode,
      data.mtcName, 
      data.date,
      data.year,
      data.month,
      data.day,
      data.bedSanctioned,
      data.utilizedBed,
      data.bedOccupancyPercentage
    ];

    const result = await query(sqlText, values);
    
    return NextResponse.json({ 
      success: true, 
      message: "Record saved successfully",
      id: result.rows[0].occupancy_id 
    }, { status: 201 });

  } catch (error) {
    console.error('Save Bed Occupancy Error:', error);
    return NextResponse.json({ error: 'Failed to save record' }, { status: 500 });
  }
}