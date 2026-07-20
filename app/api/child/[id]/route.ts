// // // import { NextResponse } from 'next/server';
// // // // Import your custom database query function here
// // // import { query } from '@/lib/db'; 

// // // // Fix 1: Type params as a Promise
// // // export async function GET(
// // //   request: Request, 
// // //   { params }: { params: Promise<{ id: string }> }
// // // ) {
// // //   try {
// // //     // Fix 1: Await the params before accessing the ID
// // //     const resolvedParams = await params;
// // //     const id = resolvedParams.id;

// // //     // Fix 2: Replace ACTUAL_TABLE_NAME_HERE with your real table name
// // //     const sqlText = `
// // //       SELECT 
// // //         c.sam_no AS "SamNo",
// // //         c.child_name AS "ChildName",
// // //         c.father_name AS "FatherName",
// // //         c.mother_name AS "MotherName",
// // //         c.admission_date AS "AdmissionDate",
// // //         c.admission_weight AS "AdmissionWeight",
// // //         c.admission_height AS "AdmissionHeight",
// // //         c.admission_edema AS "AdmissionEdema",
// // //         c.admission_muac AS "AdmissionMuac",
// // //         c.target_weight AS "TargetWeight",
// // //         NULL AS "AdmissionHemoglobin" 
// // //       FROM ACTUAL_TABLE_NAME_HERE c 
// // //       WHERE c.id = $1
// // //     `;
    
// // //     const result = await query(sqlText, [id]);

// // //     if (result.rows.length === 0) {
// // //       return NextResponse.json(
// // //         { success: false, message: 'Child not found' }, 
// // //         { status: 404 }
// // //       );
// // //     }

// // //     return NextResponse.json(
// // //       { success: true, data: result.rows[0] }, 
// // //       { status: 200 }
// // //     );

// // //   } catch (error) {
// // //     console.error("Database query failed:", error);
// // //     return NextResponse.json(
// // //       { success: false, message: 'Internal Server Error' }, 
// // //       { status: 500 }
// // //     );
// // //   }
// // // }

// // import { NextResponse } from 'next/server';
// // import { query } from '@/lib/db';

// // export async function GET(
// //   request: Request, 
// //   { params }: { params: Promise<{ id: string }> }
// // ) {
// //   try {
// //     const { id } = await params;

// //     // Notice we removed c.admission_hemoglobin from this query
// //     const sqlText = `
// //       SELECT 
// //         c.registration_id AS "id",
// //         c.sam_no AS "SamNo",
// //         c.child_full_name AS "ChildName",
// //         c.guardian_name AS "FatherName", 
// //         c.guardian_name AS "MotherName", 
// //         c.admission_date AS "AdmissionDate",
// //         c.admission_weight_kg AS "AdmissionWeight",
// //         c.length_height_cm AS "AdmissionHeight",
// //         c.muac_cm AS "AdmissionMuac",
// //         ROUND((c.admission_weight_kg * 1.15), 2) AS "TargetWeight",
// //         COALESCE(o.odema_name, 'No') AS "AdmissionEdema"
// //       FROM mtc_child_master c
// //       LEFT JOIN mtc_admission_odema o ON c.odema_id = o.odema_id
// //       WHERE c.registration_id = $1
// //     `;
    
// //     const result = await query(sqlText, [id]);

// //     if (result.rows.length === 0) {
// //       return NextResponse.json({ success: false, message: 'Child not found' }, { status: 404 });
// //     }

// //     return NextResponse.json({ success: true, data: result.rows[0] }, { status: 200 });

// //   } catch (error) {
// //     console.error('Fetch Child Error:', error);
// //     return NextResponse.json({ success: false, error: 'Database error' }, { status: 500 });
// //   }
// // }

// import { NextResponse } from 'next/server';
// import { query } from '@/lib/db';

// export async function GET(
//   request: Request, 
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   try {
//     const { id } = await params;

//     // Fetch the child's admission data. 
//     // We join with mtc_admission_odema to get the text value (e.g., "No", "++")
//     const sqlText = `
//       SELECT 
//         c.registration_id AS "id",
//         c.sam_no AS "SamNo",
//         c.child_full_name AS "ChildName",
//         c.guardian_name AS "FatherName", 
//         c.guardian_name AS "MotherName", 
//         c.admission_date AS "AdmissionDate",
//         c.admission_weight_kg AS "AdmissionWeight",
//         c.length_height_cm AS "AdmissionHeight",
//         c.muac_cm AS "AdmissionMuac",
//         c.admission_hemoglobin AS "AdmissionHemoglobin",
//         -- Target weight logic: Admission weight + 15%
//         ROUND((c.admission_weight_kg * 1.15), 2) AS "TargetWeight",
//         -- Get the text label for edema instead of just the ID
//         COALESCE(o.odema_name, 'No') AS "AdmissionEdema"
//       FROM mtc_child_master c
//       LEFT JOIN mtc_admission_odema o ON c.odema_id = o.odema_id
//       WHERE c.registration_id = $1
//     `;
    
//     const result = await query(sqlText, [id]);

//     if (result.rows.length === 0) {
//       return NextResponse.json({ success: false, message: 'Child not found' }, { status: 404 });
//     }

//     return NextResponse.json({ success: true, data: result.rows[0] }, { status: 200 });

//   } catch (error) {
//     console.error('Fetch Child Error:', error);
//     return NextResponse.json({ success: false, error: 'Database error' }, { status: 500 });
//   }
// }

import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(
  request: Request, 
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Fetch the child's admission data. 
    // We join with mtc_admission_odema to get the text value (e.g., "No", "++")
    // ✅ Added SAAMAR tracking fields to the SELECT statement
    const sqlText = `
      SELECT 
        c.registration_id AS "id",
        c.sam_no AS "SamNo",
        c.child_full_name AS "ChildName",
        c.guardian_name AS "FatherName", 
        c.guardian_name AS "MotherName", 
        c.admission_date AS "AdmissionDate",
        c.admission_weight_kg AS "AdmissionWeight",
        c.length_height_cm AS "AdmissionHeight",
        c.muac_cm AS "AdmissionMuac",
        c.admission_hemoglobin AS "AdmissionHemoglobin",
        c.is_samar_registered AS "isSamarRegistered",
        c.samar_uuid AS "samarUuid",
        -- Target weight logic: Admission weight + 15%
        ROUND((c.admission_weight_kg * 1.15), 2) AS "TargetWeight",
        -- Get the text label for edema instead of just the ID
        COALESCE(o.odema_name, 'No') AS "AdmissionEdema"
      FROM mtc_child_master c
      LEFT JOIN mtc_admission_odema o ON c.odema_id = o.odema_id
      WHERE c.registration_id = $1
    `;
    
    const result = await query(sqlText, [id]);

    if (result.rows.length === 0) {
      return NextResponse.json({ success: false, message: 'Child not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: result.rows[0] }, { status: 200 });

  } catch (error) {
    console.error('Fetch Child Error:', error);
    return NextResponse.json({ success: false, error: 'Database error' }, { status: 500 });
  }
}