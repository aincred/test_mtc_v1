// import { NextResponse } from 'next/server';
// import { query } from '@/lib/db';

// // --- GET: Fetch Children for Dropdown ---
// export async function GET() {
//   try {
//     const sqlText = `
//       SELECT 
//         registration_id, 
//         sam_no, 
//         child_full_name, 
//         guardian_name 
//       FROM mtc_child_master 
//       ORDER BY registration_id DESC
//     `;
//     const result = await query(sqlText);
    
//     // Map data to match the frontend expectations
//     const mappedChildren = result.rows.map(row => ({
//       id: row.registration_id.toString(),
//       samNumber: row.sam_no || "N/A",
//       childName: row.child_full_name || "Unknown",
//       parentName: row.guardian_name || "Unknown"
//     }));

//     return NextResponse.json(mappedChildren, { status: 200 });

//   } catch (error) {
//     console.error('Fetch Children Error:', error);
//     return NextResponse.json({ error: 'Failed to fetch children' }, { status: 500 });
//   }
// }

// // --- POST: Save Compensation Record ---
// export async function POST(request: Request) {
//   try {
//     const data = await request.json();

//     const sqlText = `
//       INSERT INTO mtc_compensation_records (
//         registration_id, no_of_days, daily_rate, total_amount
//       ) VALUES (
//         $1, $2, $3, $4
//       ) RETURNING compensation_id;
//     `;

//     const values = [
//       data.childId,
//       data.noOfDays,
//       data.dailyRate,
//       data.totalAmount
//     ];

//     await query(sqlText, values);
//     return NextResponse.json({ success: true, message: "Payment saved successfully" }, { status: 201 });

//   } catch (error) {
//     console.error('Save Compensation Error:', error);
//     return NextResponse.json({ error: 'Failed to save compensation record' }, { status: 500 });
//   }
// }

import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

interface ChildDropdownRow {
  registration_id: string | number;
  sam_no: string | null;
  child_full_name: string | null;
  guardian_name: string | null;
}

// --- GET: Fetch Children for Dropdown ---
export async function GET() {
  try {
    const sqlText = `
      SELECT 
        registration_id, 
        sam_no, 
        child_full_name, 
        guardian_name 
      FROM mtc_child_master 
      ORDER BY registration_id DESC
    `;
    const result = await query<ChildDropdownRow>(sqlText);
    
    // Map data to match the frontend expectations
    const mappedChildren = result.rows.map(row => ({
      id: row.registration_id.toString(),
      samNumber: row.sam_no || "N/A",
      childName: row.child_full_name || "Unknown",
      parentName: row.guardian_name || "Unknown"
    }));

    return NextResponse.json(mappedChildren, { status: 200 });

  } catch (error) {
    console.error('Fetch Children Error:', error);
    return NextResponse.json({ error: 'Failed to fetch children' }, { status: 500 });
  }
}

// --- POST: Save Compensation Record ---
export async function POST(request: Request) {
  try {
    const data = await request.json();

    const sqlText = `
      INSERT INTO mtc_compensation_records (
        registration_id, no_of_days, daily_rate, total_amount
      ) VALUES (
        $1, $2, $3, $4
      ) RETURNING compensation_id;
    `;

    const values = [
      data.childId,
      data.noOfDays,
      data.dailyRate,
      data.totalAmount
    ];

    await query(sqlText, values);
    return NextResponse.json({ success: true, message: "Payment saved successfully" }, { status: 201 });

  } catch (error) {
    console.error('Save Compensation Error:', error);
    return NextResponse.json({ error: 'Failed to save compensation record' }, { status: 500 });
  }
}