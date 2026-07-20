// // import { NextResponse } from 'next/server';
// // import { query } from '@/lib/db';

// // export async function GET() {
// //   try {
// //     const sqlText = `
// //       SELECT 
// //         registration_id, 
// //         sam_no, 
// //         child_full_name, 
// //         discharge_date
// //       FROM mtc_child_master
// //       WHERE discharge_date IS NOT NULL
// //       ORDER BY discharge_date DESC, registration_id DESC
// //     `;
    
// //     const result = await query(sqlText);
// //     return NextResponse.json(result.rows, { status: 200 });
// //   } catch (error) {
// //     console.error('Database Error:', error);
// //     return NextResponse.json({ error: 'Failed to fetch discharged patients' }, { status: 500 });
// //   }
// // }

// import { NextResponse } from 'next/server';
// import { query } from '@/lib/db';

// export const dynamic = 'force-dynamic';

// export async function GET(request: Request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const mtcId = searchParams.get('mtcId');

//     // ✅ Select only patients who have an actual discharge date
//     let sqlText = `
//       SELECT 
//         registration_id, 
//         sam_no, 
//         child_full_name, 
//         TO_CHAR(discharge_date, 'YYYY-MM-DD') as discharge_date
//       FROM mtc_child_master
//       WHERE discharge_date IS NOT NULL
//     `;
    
//     const values: any[] = [];

//     // ✅ Filter securely by the center if mtcId is passed
//     if (mtcId) {
//       sqlText += ` AND mtc_id = $1`;
//       values.push(parseInt(mtcId, 10));
//     }

//     sqlText += ` ORDER BY discharge_date DESC, registration_id DESC`;

//     const result = await query(sqlText, values);
    
//     return NextResponse.json(result.rows, { status: 200 });

//   } catch (error) {
//     console.error('Fetch Discharged Patients Error:', error);
//     return NextResponse.json({ error: 'Failed to fetch discharged patients' }, { status: 500 });
//   }
// }

import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const mtcId = searchParams.get('mtcId');

    // ✅ Select only patients who have an actual discharge date
    let sqlText = `
      SELECT 
        registration_id, 
        sam_no, 
        child_full_name, 
        TO_CHAR(discharge_date, 'YYYY-MM-DD') as discharge_date
      FROM mtc_child_master
      WHERE discharge_date IS NOT NULL
    `;
    
    const values: (string | number | boolean | null)[] = []; // Fixes the lint error

    // ✅ Filter securely by the center if mtcId is passed
    if (mtcId) {
      sqlText += ` AND mtc_id = $1`;
      values.push(parseInt(mtcId, 10));
    }

    sqlText += ` ORDER BY discharge_date DESC, registration_id DESC`;

    const result = await query(sqlText, values);
    
    return NextResponse.json(result.rows, { status: 200 });

  } catch (error) {
    console.error('Fetch Discharged Patients Error:', error);
    return NextResponse.json({ error: 'Failed to fetch discharged patients' }, { status: 500 });
  }
}