// // import { NextResponse } from 'next/server';
// // import { query } from '@/lib/db';

// // // --- GET: Fetch Child Info & Completed Visits ---
// // export async function GET(
// //   request: Request, 
// //   { params }: { params: Promise<{ id: string }> }
// // ) {
// //   try {
// //     const { id } = await params;

// //     // 1. Get the Child's Basic Info & Discharge Date
// //     const childSql = `
// //       SELECT registration_id, sam_no, child_full_name, discharge_date 
// //       FROM mtc_child_master 
// //       WHERE registration_id = $1
// //     `;
// //     const childResult = await query(childSql, [id]);
    
// //     if (childResult.rowCount === 0) {
// //       return NextResponse.json({ error: 'Child not found' }, { status: 404 });
// //     }

// //     // 2. Get all completed follow-ups for this child
// //     const followUpSql = `
// //       SELECT visit_number, actual_date, weight_kg, height_cm, muac_cm, followed_by_name 
// //       FROM mtc_child_follow_up 
// //       WHERE registration_id = $1 
// //       ORDER BY visit_number ASC
// //     `;
// //     const followUpResult = await query(followUpSql, [id]);

// //     return NextResponse.json({
// //       child: childResult.rows[0],
// //       visits: followUpResult.rows
// //     }, { status: 200 });

// //   } catch (error) {
// //     console.error('Fetch Follow-up Error:', error);
// //     return NextResponse.json({ error: 'Database error' }, { status: 500 });
// //   }
// // }

// // // --- POST: Save a New Visit ---
// // export async function POST(
// //   request: Request, 
// //   { params }: { params: Promise<{ id: string }> }
// // ) {
// //   try {
// //     const { id } = await params;
// //     const data = await request.json();

// //     const sqlText = `
// //       INSERT INTO mtc_child_follow_up (
// //         registration_id, visit_number, actual_date, weight_kg, 
// //         height_cm, muac_cm, designation_id, followed_by_name, mobile_number
// //       ) VALUES (
// //         $1, $2, $3, $4, $5, $6, $7, $8, $9
// //       ) RETURNING follow_up_id;
// //     `;

// //     const values = [
// //       id,
// //       data.visitNumber,
// //       data.actualDate,
// //       data.weight,
// //       data.height,
// //       data.muac || null,
// //       data.designation,
// //       data.followedBy,
// //       data.mobile
// //     ];

// //     await query(sqlText, values);
// //     return NextResponse.json({ success: true }, { status: 201 });

// //   } catch (error: any) {
// //     console.error('Save Follow-up Error:', error);
// //     // Handle the unique constraint error nicely
// //     if (error.code === '23505') {
// //         return NextResponse.json({ error: 'This visit number already exists.' }, { status: 400 });
// //     }
// //     return NextResponse.json({ error: 'Failed to save visit' }, { status: 500 });
// //   }
// // }

// import { NextResponse } from 'next/server';
// import { query } from '@/lib/db';

// // --- GET: Fetch Child Info & Completed Visits ---
// export async function GET(
//   request: Request, 
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   try {
//     const { id } = await params;

//     // 1. Get the Child's Basic Info & Discharge Date
//     const childSql = `
//       SELECT registration_id, sam_no, child_full_name, discharge_date 
//       FROM mtc_child_master 
//       WHERE registration_id = $1
//     `;
//     const childResult = await query(childSql, [id]);
    
//     if (childResult.rowCount === 0) {
//       return NextResponse.json({ error: 'Child not found' }, { status: 404 });
//     }

//     // 2. Get all completed follow-ups for this child
//     const followUpSql = `
//       SELECT visit_number, actual_date, weight_kg, height_cm, muac_cm, followed_by_name 
//       FROM mtc_child_follow_up 
//       WHERE registration_id = $1 
//       ORDER BY visit_number ASC
//     `;
//     const followUpResult = await query(followUpSql, [id]);

//     return NextResponse.json({
//       child: childResult.rows[0],
//       visits: followUpResult.rows
//     }, { status: 200 });

//   } catch (error) {
//     console.error('Fetch Follow-up Error:', error);
//     return NextResponse.json({ error: 'Database error' }, { status: 500 });
//   }
// }

// // --- POST: Save a New Visit ---
// export async function POST(
//   request: Request, 
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   try {
//     const { id } = await params;
//     const data = await request.json();

//     const sqlText = `
//       INSERT INTO mtc_child_follow_up (
//         registration_id, visit_number, actual_date, weight_kg, 
//         height_cm, muac_cm, designation_id, followed_by_name, mobile_number
//       ) VALUES (
//         $1, $2, $3, $4, $5, $6, $7, $8, $9
//       ) RETURNING follow_up_id;
//     `;

//     const values = [
//       id,
//       data.visitNumber,
//       data.actualDate,
//       data.weight,
//       data.height,
//       data.muac || null,
//       data.designation,
//       data.followedBy,
//       data.mobile
//     ];

//     await query(sqlText, values);
//     return NextResponse.json({ success: true }, { status: 201 });

//   } catch (error: unknown) {
//     console.error('Save Follow-up Error:', error);
    
//     // Handle the unique constraint error nicely without using any
//     if (error && typeof error === 'object' && 'code' in error && (error as Record<string, unknown>).code === '23505') {
//         return NextResponse.json({ error: 'This visit number already exists.' }, { status: 400 });
//     }
//     return NextResponse.json({ error: 'Failed to save visit' }, { status: 500 });
//   }
// }

import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

// --- GET: Fetch Child Info & Completed Visits ---
export async function GET(
  request: Request, 
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // 1. Get the Child's Basic Info & Discharge Date
    const childSql = `
      SELECT registration_id, sam_no, child_full_name, discharge_date 
      FROM mtc_child_master 
      WHERE registration_id = $1
    `;
    const childResult = await query(childSql, [id]);
    
    if (childResult.rowCount === 0) {
      return NextResponse.json({ error: 'Child not found' }, { status: 404 });
    }

    // 2. Get all completed follow-ups for this child
    const followUpSql = `
      SELECT visit_number, actual_date, weight_kg, height_cm, muac_cm, followed_by_name 
      FROM mtc_child_follow_up 
      WHERE registration_id = $1 
      ORDER BY visit_number ASC
    `;
    const followUpResult = await query(followUpSql, [id]);

    return NextResponse.json({
      child: childResult.rows[0],
      visits: followUpResult.rows
    }, { status: 200 });

  } catch (error) {
    console.error('Fetch Follow-up Error:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}

// --- POST: Save a New Visit ---
export async function POST(
  request: Request, 
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();

    const sqlText = `
      INSERT INTO mtc_child_follow_up (
        registration_id, visit_number, actual_date, weight_kg, 
        height_cm, muac_cm, designation_id, followed_by_name, mobile_number
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9
      ) RETURNING follow_up_id;
    `;

    const values = [
      id,
      data.visitNumber,
      data.actualDate,
      data.weight,
      data.height,
      data.muac || null,
      data.designation,
      data.followedBy,
      data.mobile
    ];

    await query(sqlText, values);
    return NextResponse.json({ success: true }, { status: 201 });

  } catch (error: unknown) {
    console.error('Save Follow-up Error:', error);
    
    // Handle the unique constraint error nicely without using any
    if (error && typeof error === 'object' && 'code' in error && (error as Record<string, unknown>).code === '23505') {
        return NextResponse.json({ error: 'This visit number already exists.' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to save visit' }, { status: 500 });
  }
}