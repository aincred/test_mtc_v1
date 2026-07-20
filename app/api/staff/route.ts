// // import { NextResponse } from 'next/server';
// // import { query } from '@/lib/db';

// // export async function POST(request: Request) {
// //   try {
// //     const data = await request.json();

// //     const sqlText = `
// //       INSERT INTO mtc_staff_details (
// //         district_name, mtc_name, name, designation_id, mobile, email, 
// //         joining_date, fsam_training, fsam_training_date, 
// //         refresher_training, refresher_training_date, status
// //       ) VALUES (
// //         $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12
// //       ) RETURNING staff_id;
// //     `;

// //     const values = [
// //       data.districtName,
// //       data.mtcName,
// //       data.name,
// //       parseInt(data.designationId),
// //       data.mobile,
// //       data.email,
// //       data.joiningDate || null,
// //       data.fsamTraining, // Boolean
// //       data.fsamTrainingDate || null,
// //       data.refresherTraining, // Boolean
// //       data.refresherTrainingDate || null,
// //       data.status
// //     ];

// //     const result = await query(sqlText, values);
    
// //     return NextResponse.json({ 
// //       success: true, 
// //       message: "Staff added successfully",
// //       id: result.rows[0].staff_id 
// //     }, { status: 201 });

// //   } catch (error) {
// //     console.error('Add Staff DB Error:', error);
// //     return NextResponse.json({ error: 'Failed to add staff' }, { status: 500 });
// //   }
// // }

// import { NextResponse } from 'next/server';
// import { query } from '@/lib/db';

// export const dynamic = 'force-dynamic';

// // --- GET: Fetch all staff members for the list ---
// export async function GET() {
//   try {
//     const sqlText = `
//       SELECT 
//         staff_id AS id,
//         district_name AS "districtName",
//         mtc_name AS "mtcName",
//         name,
//         designation_id AS "designationId",
//         mobile AS "mobileNumber",
//         email AS "emailId",
//         fsam_training AS "fsamTrainingReceived",
//         TO_CHAR(fsam_training_date, 'DD-Mon-YYYY') AS "fsamTrainingDate",
//         refresher_training AS "refresherTrainingReceived",
//         TO_CHAR(refresher_training_date, 'DD-Mon-YYYY') AS "refresherTrainingDate",
//         TO_CHAR(updated_at, 'DD-Mon-YYYY') AS "lastModifiedDate"
//       FROM mtc_staff_details
//       ORDER BY staff_id DESC
//     `;
    
//     const result = await query(sqlText);
//     return NextResponse.json(result.rows, { status: 200 });
//   } catch (error) {
//     console.error('Fetch Staff List Error:', error);
//     return NextResponse.json({ error: 'Failed to fetch staff' }, { status: 500 });
//   }
// }

// // --- POST: Create a new staff member ---
// export async function POST(request: Request) {
//   try {
//     const data = await request.json();

//     const sqlText = `
//       INSERT INTO mtc_staff_details (
//         district_name, mtc_name, name, designation_id, mobile, email, 
//         joining_date, fsam_training, fsam_training_date, 
//         refresher_training, refresher_training_date, status
//       ) VALUES (
//         $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12
//       ) RETURNING staff_id;
//     `;

//     const values = [
//       data.districtName, data.mtcName, data.name, parseInt(data.designationId),
//       data.mobile, data.email, data.joiningDate || null,
//       data.fsamTraining, data.fsamTrainingDate || null,
//       data.refresherTraining, data.refresherTrainingDate || null,
//       data.status
//     ];

//     const result = await query(sqlText, values);
    
//     return NextResponse.json({ success: true, id: result.rows[0].staff_id }, { status: 201 });
//   } catch (error) {
//     console.error('Add Staff DB Error:', error);
//     return NextResponse.json({ error: 'Failed to add staff' }, { status: 500 });
//   }
// }


import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const mtcId = searchParams.get('mtcId');

    if (!mtcId) {
      return NextResponse.json({ error: 'MTC ID is required' }, { status: 400 });
    }

    const sqlText = `
      SELECT * FROM mtc_staff 
      WHERE mtc_id = $1 
      ORDER BY created_at DESC
    `;
    
    const result = await query(sqlText, [mtcId]);

    const mappedData = result.rows.map(row => ({
      id: row.id,
      mtcId: row.mtc_id,
      districtName: row.district_name,
      mtcName: row.mtc_name,
      name: row.name,
      designationId: row.designation_id,
      mobileNumber: row.mobile_number,
      emailId: row.email_id,
      joiningDate: row.joining_date ? new Date(String(row.joining_date)).toISOString().split('T')[0] : null,
      fsamTrainingReceived: row.fsam_training_received,
      fsamTrainingDate: row.fsam_training_date ? new Date(String(row.fsam_training_date)).toISOString().split('T')[0] : null,
      refresherTrainingReceived: row.refresher_training_received,
      refresherTrainingDate: row.refresher_training_date ? new Date(String(row.refresher_training_date)).toISOString().split('T')[0] : null,
      status: row.status,
      lastModifiedDate: row.updated_at
    }));

    return NextResponse.json(mappedData, { status: 200 });

  } catch (error) {
    console.error('Fetch Staff Error:', error);
    return NextResponse.json({ error: 'Failed to fetch staff' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (!data.mtcId) {
        return NextResponse.json({ error: 'MTC ID is missing' }, { status: 400 });
    }

    const sqlText = `
      INSERT INTO mtc_staff (
        mtc_id, district_name, mtc_name, name, designation_id, 
        mobile_number, email_id, joining_date, fsam_training_received, 
        fsam_training_date, refresher_training_received, refresher_training_date, status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING id;
    `;

    const values = [
      data.mtcId,
      data.districtName,
      data.mtcName,
      data.name,
      data.designationId,
      data.mobile,
      data.email,
      data.joiningDate || null,
      data.fsamTraining,
      data.fsamTrainingDate || null,
      data.refresherTraining,
      data.refresherTrainingDate || null,
      data.status
    ];

    const result = await query(sqlText, values);

    return NextResponse.json({ success: true, id: result.rows[0].id }, { status: 201 });

  } catch (error) {
    console.error('Create Staff Error:', error);
    return NextResponse.json({ error: 'Failed to add staff' }, { status: 500 });
  }
}