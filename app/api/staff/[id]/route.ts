// // import { NextResponse } from 'next/server';
// // import { query } from '@/lib/db';

// // export async function GET(request: Request, { params }: { params: { id: string } }) {
// //   try {
// //     const sqlText = `
// //       SELECT 
// //         staff_id AS id, district_name AS "districtName", mtc_name AS "mtcName", 
// //         name, designation_id::text AS "designationId", mobile, email, 
// //         TO_CHAR(joining_date, 'YYYY-MM-DD') AS "joiningDate",
// //         fsam_training AS "fsamTraining", 
// //         TO_CHAR(fsam_training_date, 'YYYY-MM-DD') AS "fsamTrainingDate",
// //         refresher_training AS "refresherTraining", 
// //         TO_CHAR(refresher_training_date, 'YYYY-MM-DD') AS "refresherTrainingDate",
// //         status
// //       FROM mtc_staff_details
// //       WHERE staff_id = $1
// //     `;
    
// //     const result = await query(sqlText, [parseInt(params.id)]);
    
// //     if (result.rows.length === 0) {
// //       return NextResponse.json({ error: 'Staff not found' }, { status: 404 });
// //     }

// //     return NextResponse.json(result.rows[0], { status: 200 });
// //   } catch (error) {
// //     console.error('Fetch Staff Error:', error);
// //     return NextResponse.json({ error: 'Failed to fetch staff' }, { status: 500 });
// //   }
// // }

// // export async function PUT(request: Request, { params }: { params: { id: string } }) {
// //   try {
// //     const data = await request.json();

// //     const sqlText = `
// //       UPDATE mtc_staff_details SET 
// //         district_name = $1, mtc_name = $2, name = $3, designation_id = $4, 
// //         mobile = $5, email = $6, joining_date = $7, fsam_training = $8, 
// //         fsam_training_date = $9, refresher_training = $10, 
// //         refresher_training_date = $11, status = $12
// //       WHERE staff_id = $13
// //       RETURNING staff_id;
// //     `;

// //     const values = [
// //       data.districtName, data.mtcName, data.name, parseInt(data.designationId),
// //       data.mobile, data.email, data.joiningDate || null,
// //       data.fsamTraining, data.fsamTrainingDate || null,
// //       data.refresherTraining, data.refresherTrainingDate || null,
// //       data.status, parseInt(params.id)
// //     ];

// //     await query(sqlText, values);
    
// //     return NextResponse.json({ success: true, message: "Staff updated successfully" }, { status: 200 });
// //   } catch (error) {
// //     console.error('Update Staff Error:', error);
// //     return NextResponse.json({ error: 'Failed to update staff' }, { status: 500 });
// //   }
// // }


// import { NextResponse } from 'next/server';
// import { query } from '@/lib/db';

// export async function GET(request: Request, { params }: { params: { id: string } }) {
//   try {
//     const sqlText = `
//       SELECT 
//         staff_id AS id, district_name AS "districtName", mtc_name AS "mtcName", 
//         name, designation_id::text AS "designationId", mobile, email, 
//         TO_CHAR(joining_date, 'YYYY-MM-DD') AS "joiningDate",
//         fsam_training AS "fsamTraining", 
//         TO_CHAR(fsam_training_date, 'YYYY-MM-DD') AS "fsamTrainingDate",
//         refresher_training AS "refresherTraining", 
//         TO_CHAR(refresher_training_date, 'YYYY-MM-DD') AS "refresherTrainingDate",
//         status
//       FROM mtc_staff_details
//       WHERE staff_id = $1
//     `;
//     const result = await query(sqlText, [parseInt(params.id)]);
//     if (result.rows.length === 0) return NextResponse.json({ error: 'Not found' }, { status: 404 });
//     return NextResponse.json(result.rows[0], { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
//   }
// }

// export async function PUT(request: Request, { params }: { params: { id: string } }) {
//   try {
//     const data = await request.json();
//     const sqlText = `
//       UPDATE mtc_staff_details SET 
//         district_name = $1, mtc_name = $2, name = $3, designation_id = $4, 
//         mobile = $5, email = $6, joining_date = $7, fsam_training = $8, 
//         fsam_training_date = $9, refresher_training = $10, 
//         refresher_training_date = $11, status = $12
//       WHERE staff_id = $13
//       RETURNING staff_id;
//     `;
//     const values = [
//       data.districtName, data.mtcName, data.name, parseInt(data.designationId),
//       data.mobile, data.email, data.joiningDate || null, data.fsamTraining, 
//       data.fsamTrainingDate || null, data.refresherTraining, 
//       data.refresherTrainingDate || null, data.status, parseInt(params.id)
//     ];
//     await query(sqlText, values);
//     return NextResponse.json({ success: true }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
//   }
// }

// // --- DELETE: Remove a staff member ---
// export async function DELETE(request: Request, { params }: { params: { id: string } }) {
//   try {
//     const sqlText = `DELETE FROM mtc_staff_details WHERE staff_id = $1 RETURNING staff_id`;
//     const result = await query(sqlText, [parseInt(params.id)]);
    
//     if (result.rowCount === 0) return NextResponse.json({ error: 'Not found' }, { status: 404 });
//     return NextResponse.json({ success: true }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
//   }
// }

import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const sqlText = `SELECT * FROM mtc_staff WHERE id = $1`;
    const result = await query(sqlText, [id]);

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Staff member not found' }, { status: 404 });
    }

    const row = result.rows[0];
    
    const staffData = {
      id: row.id,
      mtcId: row.mtc_id,
      districtName: row.district_name,
      mtcName: row.mtc_name,
      name: row.name,
      designationId: row.designation_id,
      mobile: row.mobile_number,
      email: row.email_id,
      joiningDate: row.joining_date ? new Date(String(row.joining_date)).toISOString().split('T')[0] : "",
      fsamTraining: row.fsam_training_received,
      fsamTrainingDate: row.fsam_training_date ? new Date(String(row.fsam_training_date)).toISOString().split('T')[0] : "",
      refresherTraining: row.refresher_training_received,
      refresherTrainingDate: row.refresher_training_date ? new Date(String(row.refresher_training_date)).toISOString().split('T')[0] : "",
      status: row.status
    };

    return NextResponse.json(staffData, { status: 200 });

  } catch (error) {
    console.error('Fetch Single Staff Error:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const data = await request.json();

    const sqlText = `
      UPDATE mtc_staff SET
        district_name = $1, mtc_name = $2, name = $3, designation_id = $4, 
        mobile_number = $5, email_id = $6, joining_date = $7, fsam_training_received = $8, 
        fsam_training_date = $9, refresher_training_received = $10, refresher_training_date = $11, 
        status = $12, updated_at = CURRENT_TIMESTAMP
      WHERE id = $13
      RETURNING id;
    `;

    const values = [
      data.districtName, data.mtcName, data.name, data.designationId, 
      data.mobile, data.email, data.joiningDate || null, data.fsamTraining, 
      data.fsamTrainingDate || null, data.refresherTraining, data.refresherTrainingDate || null, 
      data.status, id
    ];

    const result = await query(sqlText, values);

    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Record not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    console.error('Update Staff Error:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const sqlText = `DELETE FROM mtc_staff WHERE id = $1 RETURNING id`;
    const result = await query(sqlText, [id]);

    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Record not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    console.error('Delete Staff Error:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}