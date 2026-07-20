// // import { NextResponse } from 'next/server';
// // import { query } from '@/lib/db';

// // export const dynamic = 'force-dynamic';

// // export async function GET() {
// //   try {
// //     const sqlText = `
// //       SELECT 
// //         comp.compensation_id AS id,
// //         child.child_full_name AS "childName",
// //         child.guardian_name AS "parentName",
// //         comp.no_of_days AS "noOfDays",
// //         comp.total_amount AS "totalAmount",
// //         comp.payment_date AS "paymentDate",
// //         TO_CHAR(comp.payment_date, 'Month YYYY') AS "monthYear"
// //       FROM mtc_compensation comp
// //       JOIN mtc_child_master child ON comp.registration_id = child.registration_id
// //       ORDER BY comp.payment_date DESC
// //     `;
// //     const result = await query(sqlText);
// //     return NextResponse.json(result.rows, { status: 200 });
// //   } catch (error) {
// //     return NextResponse.json({ error: 'Failed to fetch payment records' }, { status: 500 });
// //   }
// // }

// import { NextResponse } from 'next/server';
// import { query } from '@/lib/db';

// export const dynamic = 'force-dynamic';

// // GET: Fetch Active Children for Dropdown
// export async function GET() {
//   try {
//     const sqlText = `
//       SELECT registration_id AS id, child_full_name AS "childName", sam_no AS "samNumber", guardian_name AS "parentName"
//       FROM mtc_child_master
//       WHERE discharge_date IS NULL
//       ORDER BY admission_date DESC
//     `;
//     const result = await query(sqlText);
//     return NextResponse.json(result.rows, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error: 'Failed to fetch patients' }, { status: 500 });
//   }
// }

// // POST: Save new Compensation Payment
// export async function POST(request: Request) {
//   try {
//     const data = await request.json();
//     const sqlText = `
//       INSERT INTO mtc_compensation (registration_id, no_of_days, daily_rate, total_amount) 
//       VALUES ($1, $2, $3, $4) RETURNING compensation_id;
//     `;
//     const values = [data.childId, data.noOfDays, data.dailyRate, data.totalAmount];
//     const result = await query(sqlText, values);
    
//     return NextResponse.json({ success: true, id: result.rows[0].compensation_id }, { status: 201 });
//   } catch (error) {
//     return NextResponse.json({ error: 'Failed to save payment' }, { status: 500 });
//   }
// }

import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

// GET: Fetch Active Children for Dropdown
export async function GET() {
  try {
    const sqlText = `
      SELECT registration_id AS id, child_full_name AS "childName", sam_no AS "samNumber", guardian_name AS "parentName"
      FROM mtc_child_master
      WHERE discharge_date IS NULL
      ORDER BY admission_date DESC
    `;
    const result = await query(sqlText);
    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    console.error('Fetch Active Children Error:', error); // Resolves the unused variable warning
    return NextResponse.json({ error: 'Failed to fetch patients' }, { status: 500 });
  }
}

// POST: Save new Compensation Payment
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const sqlText = `
      INSERT INTO mtc_compensation (registration_id, no_of_days, daily_rate, total_amount) 
      VALUES ($1, $2, $3, $4) RETURNING compensation_id;
    `;
    const values = [data.childId, data.noOfDays, data.dailyRate, data.totalAmount];
    const result = await query(sqlText, values);
    
    return NextResponse.json({ success: true, id: result.rows[0].compensation_id }, { status: 201 });
  } catch (error) {
    console.error('Save Compensation Payment Error:', error); // Resolves the unused variable warning
    return NextResponse.json({ error: 'Failed to save payment' }, { status: 500 });
  }
}