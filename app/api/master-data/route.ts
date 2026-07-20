// // // // // // // import { NextResponse } from 'next/server';
// // // // // // // import { query } from '@/lib/db';

// // // // // // // // Helper function to safely extract an ID and a Label from an unknown table structure
// // // // // // // const formatLookupData = (rows: any[]) => {
// // // // // // //   return rows.map(row => {
// // // // // // //     const keys = Object.keys(row);
// // // // // // //     // Assumes the first column in your DB is the ID, and the second is the Name/Label
// // // // // // //     return {
// // // // // // //       id: row[keys[0]], 
// // // // // // //       name: row[keys[1]]
// // // // // // //     };
// // // // // // //   });
// // // // // // // };

// // // // // // // export async function GET() {
// // // // // // //   try {
// // // // // // //     const [
// // // // // // //       admissionTypes,
// // // // // // //       referredBy,
// // // // // // //       castes,
// // // // // // //       districts,
// // // // // // //       sexes,
// // // // // // //       relationships,
// // // // // // //       odemas,
// // // // // // //       breastFeeding,
// // // // // // //       appetiteTests
// // // // // // //     ] = await Promise.all([
// // // // // // //       query('SELECT * FROM mtc_admission_type ORDER BY 1 ASC'),
// // // // // // //       query('SELECT * FROM mtc_referred_by ORDER BY 1 ASC'),
// // // // // // //       query('SELECT * FROM mtc_caste ORDER BY 1 ASC'),
// // // // // // //       query('SELECT * FROM mtc_district ORDER BY 2 ASC'),
// // // // // // //       query('SELECT * FROM mtc_sex ORDER BY 1 ASC'),
// // // // // // //       query('SELECT * FROM mtc_relationship_with_child ORDER BY 1 ASC'),
// // // // // // //       query('SELECT * FROM mtc_admission_odema ORDER BY 1 ASC'),
// // // // // // //       query('SELECT * FROM mtc_breast_feeding ORDER BY 1 ASC'),
// // // // // // //       query('SELECT * FROM mtc_appetite_test ORDER BY 1 ASC'),
// // // // // // //     ]);

// // // // // // //     return NextResponse.json({
// // // // // // //       admissionTypes: formatLookupData(admissionTypes.rows),
// // // // // // //       referredBy: formatLookupData(referredBy.rows),
// // // // // // //       castes: formatLookupData(castes.rows),
// // // // // // //       districts: formatLookupData(districts.rows),
// // // // // // //       sexes: formatLookupData(sexes.rows),
// // // // // // //       relationships: formatLookupData(relationships.rows),
// // // // // // //       odemas: formatLookupData(odemas.rows),
// // // // // // //       breastFeeding: formatLookupData(breastFeeding.rows),
// // // // // // //       appetiteTests: formatLookupData(appetiteTests.rows),
// // // // // // //     });

// // // // // // //   } catch (error) {
// // // // // // //     console.error('Master Data Fetch Error:', error);
// // // // // // //     return NextResponse.json({ error: 'Failed to fetch master data' }, { status: 500 });
// // // // // // //   }
// // // // // // // }

// // // // // // import { NextResponse } from 'next/server';
// // // // // // import { query } from '@/lib/db';

// // // // // // // Helper function to safely extract an ID and a Label from an unknown table structure
// // // // // // const formatLookupData = (rows: any[]) => {
// // // // // //   return rows.map(row => {
// // // // // //     const keys = Object.keys(row);
// // // // // //     // Assumes the first column in your DB is the ID, and the second is the Name/Label
// // // // // //     return {
// // // // // //       id: row[keys[0]], 
// // // // // //       name: row[keys[1]]
// // // // // //     };
// // // // // //   });
// // // // // // };

// // // // // // export async function GET() {
// // // // // //   try {
// // // // // //     const [
// // // // // //       admissionTypes,
// // // // // //       referredBy,
// // // // // //       castes,
// // // // // //       districts,
// // // // // //       sexes,
// // // // // //       relationships,
// // // // // //       odemas,
// // // // // //       breastFeeding,
// // // // // //       appetiteTests,
// // // // // //       blocks,
// // // // // //       icdsProjects,
// // // // // //       anganwadis
// // // // // //     ] = await Promise.all([
// // // // // //       query('SELECT * FROM mtc_admission_type ORDER BY 1 ASC'),
// // // // // //       query('SELECT * FROM mtc_referred_by ORDER BY 1 ASC'),
// // // // // //       query('SELECT * FROM mtc_caste ORDER BY 1 ASC'),
// // // // // //       query('SELECT * FROM mtc_district ORDER BY 2 ASC'),
// // // // // //       query('SELECT * FROM mtc_sex ORDER BY 1 ASC'),
// // // // // //       query('SELECT * FROM mtc_relationship_with_child ORDER BY 1 ASC'),
// // // // // //       query('SELECT * FROM mtc_admission_odema ORDER BY 1 ASC'),
// // // // // //       query('SELECT * FROM mtc_breast_feeding ORDER BY 1 ASC'),
// // // // // //       query('SELECT * FROM mtc_appetite_test ORDER BY 1 ASC'),
// // // // // //       // Explicitly selecting ID and Name as the first two columns to ensure 
// // // // // //       // formatLookupData maps them correctly, ignoring columns like district_id or code.
// // // // // //       query('SELECT block_id, block_name FROM mtc_block ORDER BY block_name ASC'),
// // // // // //       query('SELECT icds_id, icds_name FROM mtc_icds_project ORDER BY icds_name ASC'),
// // // // // //       query('SELECT awd_id, awd_name FROM mtc_anganwadi ORDER BY awd_name ASC'),
// // // // // //     ]);

// // // // // //     return NextResponse.json({
// // // // // //       admissionTypes: formatLookupData(admissionTypes.rows),
// // // // // //       referredBy: formatLookupData(referredBy.rows),
// // // // // //       castes: formatLookupData(castes.rows),
// // // // // //       districts: formatLookupData(districts.rows),
// // // // // //       sexes: formatLookupData(sexes.rows),
// // // // // //       relationships: formatLookupData(relationships.rows),
// // // // // //       odemas: formatLookupData(odemas.rows),
// // // // // //       breastFeeding: formatLookupData(breastFeeding.rows),
// // // // // //       appetiteTests: formatLookupData(appetiteTests.rows),
// // // // // //       blocks: formatLookupData(blocks.rows),
// // // // // //       icdsProjects: formatLookupData(icdsProjects.rows),
// // // // // //       anganwadis: formatLookupData(anganwadis.rows),
// // // // // //     });

// // // // // //   } catch (error) {
// // // // // //     console.error('Master Data Fetch Error:', error);
// // // // // //     return NextResponse.json({ error: 'Failed to fetch master data' }, { status: 500 });
// // // // // //   }
// // // // // // }

// // // // // import { NextResponse } from 'next/server';
// // // // // import { query } from '@/lib/db';

// // // // // const formatLookupData = (rows: any[]) => {
// // // // //   return rows.map(row => {
// // // // //     const keys = Object.keys(row);
// // // // //     return { id: row[keys[0]], name: row[keys[1]] };
// // // // //   });
// // // // // };

// // // // // export async function GET() {
// // // // //   try {
// // // // //     const [
// // // // //       admissionTypes, referredBy, castes, districts, sexes,
// // // // //       relationships, odemas, breastFeeding, appetiteTests,
// // // // //       blocks, icdsProjects, anganwadis
// // // // //     ] = await Promise.all([
// // // // //       query('SELECT * FROM mtc_admission_type ORDER BY 1 ASC'),
// // // // //       query('SELECT * FROM mtc_referred_by ORDER BY 1 ASC'),
// // // // //       query('SELECT * FROM mtc_caste ORDER BY 1 ASC'),
// // // // //       query('SELECT * FROM mtc_district ORDER BY 2 ASC'),
// // // // //       query('SELECT * FROM mtc_sex ORDER BY 1 ASC'),
// // // // //       query('SELECT * FROM mtc_relationship_with_child ORDER BY 1 ASC'),
// // // // //       query('SELECT * FROM mtc_admission_odema ORDER BY 1 ASC'),
// // // // //       query('SELECT * FROM mtc_breast_feeding ORDER BY 1 ASC'),
// // // // //       query('SELECT * FROM mtc_appetite_test ORDER BY 1 ASC'),
// // // // //       query('SELECT block_id, block_name FROM mtc_block ORDER BY block_name ASC'),
// // // // //       query('SELECT icds_id, icds_name FROM mtc_icds_project ORDER BY icds_name ASC'),
// // // // //       query('SELECT awd_id, awd_name FROM mtc_anganwadi ORDER BY awd_name ASC'),
// // // // //     ]);

// // // // //     return NextResponse.json({
// // // // //       admissionTypes: formatLookupData(admissionTypes.rows),
// // // // //       referredBy: formatLookupData(referredBy.rows),
// // // // //       castes: formatLookupData(castes.rows),
// // // // //       districts: formatLookupData(districts.rows),
// // // // //       sexes: formatLookupData(sexes.rows),
// // // // //       relationships: formatLookupData(relationships.rows),
// // // // //       odemas: formatLookupData(odemas.rows),
// // // // //       breastFeeding: formatLookupData(breastFeeding.rows),
// // // // //       appetiteTests: formatLookupData(appetiteTests.rows),
// // // // //       blocks: formatLookupData(blocks.rows),
// // // // //       icdsProjects: formatLookupData(icdsProjects.rows),
// // // // //       anganwadis: formatLookupData(anganwadis.rows),
// // // // //     });
// // // // //   } catch (error) {
// // // // //     console.error('Master Data Fetch Error:', error);
// // // // //     return NextResponse.json({ error: 'Failed to fetch master data' }, { status: 500 });
// // // // //   }
// // // // // }

// // // // import { NextResponse } from 'next/server';
// // // // import { query } from '@/lib/db';

// // // // const formatLookupData = (rows: any[]) => {
// // // //   return rows.map(row => {
// // // //     const keys = Object.keys(row);
// // // //     return { id: row[keys[0]], name: row[keys[1]] };
// // // //   });
// // // // };

// // // // export async function GET() {
// // // //   try {
// // // //     const [
// // // //       admissionTypes, referredBy, castes, districts, sexes,
// // // //       relationships, odemas, breastFeeding, appetiteTests,
// // // //       blocks, icdsProjects, anganwadis
// // // //     ] = await Promise.all([
// // // //       query('SELECT * FROM mtc_admission_type ORDER BY 1 ASC'),
// // // //       query('SELECT * FROM mtc_referred_by ORDER BY 1 ASC'),
// // // //       query('SELECT * FROM mtc_caste ORDER BY 1 ASC'),
// // // //       query('SELECT * FROM mtc_district ORDER BY 2 ASC'),
// // // //       query('SELECT * FROM mtc_sex ORDER BY 1 ASC'),
// // // //       query('SELECT * FROM mtc_relationship_with_child ORDER BY 1 ASC'),
// // // //       query('SELECT * FROM mtc_admission_odema ORDER BY 1 ASC'),
// // // //       query('SELECT * FROM mtc_breast_feeding ORDER BY 1 ASC'),
// // // //       query('SELECT * FROM mtc_appetite_test ORDER BY 1 ASC'),
// // // //       // UPDATED: Alias the columns to get the districtId directly into the JSON
// // // //       query('SELECT block_id AS id, block_name AS name, district_id AS "districtId" FROM mtc_block ORDER BY block_name ASC'),
// // // //       query('SELECT icds_id, icds_name FROM mtc_icds_project ORDER BY icds_name ASC'),
// // // //       query('SELECT awd_id, awd_name FROM mtc_anganwadi ORDER BY awd_name ASC'),
// // // //     ]);

// // // //     return NextResponse.json({
// // // //       admissionTypes: formatLookupData(admissionTypes.rows),
// // // //       referredBy: formatLookupData(referredBy.rows),
// // // //       castes: formatLookupData(castes.rows),
// // // //       districts: formatLookupData(districts.rows),
// // // //       sexes: formatLookupData(sexes.rows),
// // // //       relationships: formatLookupData(relationships.rows),
// // // //       odemas: formatLookupData(odemas.rows),
// // // //       breastFeeding: formatLookupData(breastFeeding.rows),
// // // //       appetiteTests: formatLookupData(appetiteTests.rows),
// // // //       blocks: blocks.rows, // Bypass formatter to keep the districtId
// // // //       icdsProjects: formatLookupData(icdsProjects.rows),
// // // //       anganwadis: formatLookupData(anganwadis.rows),
// // // //     });
// // // //   } catch (error) {
// // // //     console.error('Master Data Fetch Error:', error);
// // // //     return NextResponse.json({ error: 'Failed to fetch master data' }, { status: 500 });
// // // //   }
// // // // }

// // // import { NextResponse } from 'next/server';
// // // import { query } from '@/lib/db';

// // // // 👇 THIS IS THE MAGIC LINE THAT FIXES YOUR ISSUE 👇
// // // export const dynamic = 'force-dynamic'; 

// // // const formatLookupData = (rows: any[]) => {
// // //   return rows.map(row => {
// // //     const keys = Object.keys(row);
// // //     return { id: row[keys[0]], name: row[keys[1]] };
// // //   });
// // // };

// // // export async function GET() {
// // //   try {
// // //     const [
// // //       admissionTypes, referredBy, castes, districts, sexes,
// // //       relationships, odemas, breastFeeding, appetiteTests,
// // //       blocks, icdsProjects, anganwadis
// // //     ] = await Promise.all([
// // //       query('SELECT * FROM mtc_admission_type ORDER BY 1 ASC'),
// // //       query('SELECT * FROM mtc_referred_by ORDER BY 1 ASC'),
// // //       query('SELECT * FROM mtc_caste ORDER BY 1 ASC'),
// // //       query('SELECT * FROM mtc_district ORDER BY 2 ASC'),
// // //       query('SELECT * FROM mtc_sex ORDER BY 1 ASC'),
// // //       query('SELECT * FROM mtc_relationship_with_child ORDER BY 1 ASC'),
// // //       query('SELECT * FROM mtc_admission_odema ORDER BY 1 ASC'),
// // //       query('SELECT * FROM mtc_breast_feeding ORDER BY 1 ASC'),
// // //       query('SELECT * FROM mtc_appetite_test ORDER BY 1 ASC'),
// // //       query('SELECT block_id AS id, block_name AS name, district_id AS "districtId" FROM mtc_block ORDER BY block_name ASC'),
// // //       query('SELECT icds_id, icds_name FROM mtc_icds_project ORDER BY icds_name ASC'),
// // //       query('SELECT awd_id, awd_name FROM mtc_anganwadi ORDER BY awd_name ASC'),
// // //     ]);

// // //     return NextResponse.json({
// // //       admissionTypes: formatLookupData(admissionTypes.rows),
// // //       referredBy: formatLookupData(referredBy.rows),
// // //       castes: formatLookupData(castes.rows),
// // //       districts: formatLookupData(districts.rows),
// // //       sexes: formatLookupData(sexes.rows),
// // //       relationships: formatLookupData(relationships.rows),
// // //       odemas: formatLookupData(odemas.rows),
// // //       breastFeeding: formatLookupData(breastFeeding.rows),
// // //       appetiteTests: formatLookupData(appetiteTests.rows),
// // //       blocks: blocks.rows, 
// // //       icdsProjects: formatLookupData(icdsProjects.rows),
// // //       anganwadis: formatLookupData(anganwadis.rows),
// // //     });
// // //   } catch (error) {
// // //     console.error('Master Data Fetch Error:', error);
// // //     return NextResponse.json({ error: 'Failed to fetch master data' }, { status: 500 });
// // //   }
// // // }


// // import { NextResponse } from 'next/server';
// // import { query } from '@/lib/db';

// // export const dynamic = 'force-dynamic';

// // const parseNum = (val: any, isFloat = false) => {
// //   if (val === null || val === undefined || val === "") return null;
// //   const parsed = isFloat ? parseFloat(val) : parseInt(val, 10);
// //   return isNaN(parsed) ? null : parsed;
// // };

// // // --- GET: Fetch all active patients (Filtered by MTC Center) ---
// // export async function GET(request: Request) {
// //   try {
// //     // ✅ Extract mtcId from the request URL
// //     const { searchParams } = new URL(request.url);
// //     const mtcId = searchParams.get('mtcId');

// //     let sqlText = `
// //       SELECT 
// //         registration_id, sam_no, child_full_name, mother_name, guardian_name, 
// //         TO_CHAR(dob, 'YYYY-MM-DD') as dob, admission_weight_kg, length_height_cm, 
// //         TO_CHAR(admission_date, 'YYYY-MM-DD') as admission_date, discharge_date
// //       FROM mtc_child_master
// //       WHERE discharge_date IS NULL
// //     `;
    
// //     const values: any[] = [];

// //     // ✅ If an MTC ID is provided, filter the results securely
// //     if (mtcId) {
// //       sqlText += ` AND mtc_id = $1`;
// //       values.push(parseInt(mtcId, 10));
// //     }

// //     sqlText += ` ORDER BY admission_date DESC, registration_id DESC`;

// //     const result = await query(sqlText, values);
// //     return NextResponse.json(result.rows, { status: 200 });
// //   } catch (error) {
// //     console.error('Fetch Patients Error:', error);
// //     return NextResponse.json({ error: 'Failed to fetch patients' }, { status: 500 });
// //   }
// // }

// // // --- POST: Save a newly registered child ---
// // export async function POST(request: Request) {
// //   try {
// //     const data = await request.json();
    
// //     const isCompFeeding = data.complementaryFeeding === "1";

// //     let complicationsFormatted = null;
// //     if (Array.isArray(data.medicalComplications) && data.medicalComplications.length > 0) {
// //       complicationsFormatted = `{${data.medicalComplications.map((c: string) => `"${c.replace(/"/g, '""')}"`).join(',')}}`;
// //     }

// //     const sqlText = `
// //       INSERT INTO mtc_child_master (
// //         mtc_id, sam_no, admission_type_id, referred_by_id, referred_by_name, referred_by_mobile,
// //         admission_date, admission_time, child_full_name, mother_name, dob, age_years, age_months,
// //         sex_id, guardian_name, relationship_id, mobile_number, parent_aadhaar_number, 
// //         bpl_number, caste_id, bank_name, account_holder, account_number, ifsc_code, 
// //         full_address, district_id, block_id, village, icds_project_id, anganwadi_id, 
// //         admission_weight_kg, length_height_cm, muac_cm, z_score_sd, odema_id, 
// //         breast_feeding_id, complementary_feeding, appetite_test_id, medical_complications
// //       ) VALUES (
// //         $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 
// //         $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, 
// //         $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, 
// //         $31, $32, $33, $34, $35, $36, $37, $38, $39
// //       ) RETURNING registration_id;
// //     `;

// //     const values = [
// //       parseNum(data.mtcId), 
// //       data.samNumber, 
// //       parseNum(data.admissionType), 
// //       parseNum(data.referredBy), 
// //       data.referredByName || null,
// //       data.referredByMobile || null,
// //       data.admissionDate || null, 
// //       data.admissionTime || null, 
// //       data.childName || null, 
// //       data.motherName || null, 
// //       data.dateOfBirth || null, 
// //       parseNum(data.ageYears),
// //       parseNum(data.ageMonths),
// //       parseNum(data.sex), 
// //       data.parentName || null, 
// //       parseNum(data.relationship), 
// //       data.mobileNumber || null,
// //       data.aadhaarNumber || null, 
// //       data.bplNumber || null, 
// //       parseNum(data.caste), 
// //       data.bankName || null, 
// //       data.accountHolderName || null, 
// //       data.accountNumber || null, 
// //       data.ifscCode || null, 
// //       data.address || null, 
// //       parseNum(data.district), 
// //       parseNum(data.block), 
// //       data.village || null, 
// //       parseNum(data.icdsProject), 
// //       parseNum(data.anganwadiCenter), 
// //       parseNum(data.admissionWeight, true), 
// //       parseNum(data.admissionHeight, true), 
// //       parseNum(data.admissionMuac, true), 
// //       parseNum(data.zScore, true), 
// //       parseNum(data.admissionOdema), 
// //       parseNum(data.breastFeeding), 
// //       isCompFeeding, 
// //       parseNum(data.appetiteTest),
// //       complicationsFormatted
// //     ];

// //     const result = await query(sqlText, values);
    
// //     return NextResponse.json({ success: true, id: result.rows[0].registration_id }, { status: 201 });
    
// //   } catch (error) {
// //     console.error('Child Registration DB Error:', error);
// //     return NextResponse.json({ error: 'Failed to register child' }, { status: 500 });
// //   }
// // }

// // // --- DELETE: Remove a child record ---
// // export async function DELETE(request: Request) {
// //   try {
// //     const { searchParams } = new URL(request.url);
// //     const id = searchParams.get('id');

// //     if (!id) return NextResponse.json({ error: 'Registration ID required' }, { status: 400 });

// //     const sqlText = `DELETE FROM mtc_child_master WHERE registration_id = $1 RETURNING registration_id`;
// //     const result = await query(sqlText, [id]);

// //     if (result.rowCount === 0) return NextResponse.json({ error: 'Record not found' }, { status: 404 });
// //     return NextResponse.json({ success: true, message: 'Record deleted successfully' }, { status: 200 });

// //   } catch (error) {
// //     return NextResponse.json({ error: 'Failed to delete record' }, { status: 500 });
// //   }
// // }

// // app\api\master-data
// import { NextResponse } from 'next/server';
// import { query } from '@/lib/db';

// export const dynamic = 'force-dynamic'; 

// const formatLookupData = (rows: any[]) => {
//   return rows.map(row => {
//     const keys = Object.keys(row);
//     return { id: row[keys[0]], name: row[keys[1]] };
//   });
// };

// export async function GET() {
//   try {
//     // Execute sequentially to prevent PostgreSQL Error 53300
//     const admissionTypes = await query('SELECT * FROM mtc_admission_type ORDER BY 1 ASC');
//     const referredBy = await query('SELECT * FROM mtc_referred_by ORDER BY 1 ASC');
//     const castes = await query('SELECT * FROM mtc_caste ORDER BY 1 ASC');
//     const districts = await query('SELECT * FROM mtc_district ORDER BY 2 ASC');
//     const sexes = await query('SELECT * FROM mtc_sex ORDER BY 1 ASC');
//     const relationships = await query('SELECT * FROM mtc_relationship_with_child ORDER BY 1 ASC');
//     const odemas = await query('SELECT * FROM mtc_admission_odema ORDER BY 1 ASC');
//     const breastFeeding = await query('SELECT * FROM mtc_breast_feeding ORDER BY 1 ASC');
//     const appetiteTests = await query('SELECT * FROM mtc_appetite_test ORDER BY 1 ASC');
//     const blocks = await query('SELECT block_id AS id, block_name AS name, district_id AS "districtId" FROM mtc_block ORDER BY block_name ASC');
//     const icdsProjects = await query('SELECT icds_id, icds_name FROM mtc_icds_project ORDER BY icds_name ASC');
//     const anganwadis = await query('SELECT awd_id, awd_name FROM mtc_anganwadi ORDER BY awd_name ASC');

//     return NextResponse.json({
//       admissionTypes: formatLookupData(admissionTypes.rows),
//       referredBy: formatLookupData(referredBy.rows),
//       castes: formatLookupData(castes.rows),
//       districts: formatLookupData(districts.rows),
//       sexes: formatLookupData(sexes.rows),
//       relationships: formatLookupData(relationships.rows),
//       odemas: formatLookupData(odemas.rows),
//       breastFeeding: formatLookupData(breastFeeding.rows),
//       appetiteTests: formatLookupData(appetiteTests.rows),
//       blocks: blocks.rows, 
//       icdsProjects: formatLookupData(icdsProjects.rows),
//       anganwadis: formatLookupData(anganwadis.rows),
//     });
//   } catch (error) {
//     console.error('Master Data Fetch Error:', error);
//     return NextResponse.json({ error: 'Failed to fetch master data' }, { status: 500 });
//   }
// }

// app/api/master-data/route.ts
import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic'; 

const formatLookupData = (rows: Record<string, unknown>[]) => {
  return rows.map(row => {
    const keys = Object.keys(row);
    return { id: row[keys[0]], name: row[keys[1]] };
  });
};

export async function GET() {
  try {
    // Execute sequentially to prevent PostgreSQL Error 53300
    const admissionTypes = await query('SELECT * FROM mtc_admission_type ORDER BY 1 ASC');
    const referredBy = await query('SELECT * FROM mtc_referred_by ORDER BY 1 ASC');
    const castes = await query('SELECT * FROM mtc_caste ORDER BY 1 ASC');
    const districts = await query('SELECT * FROM mtc_district ORDER BY 2 ASC');
    const sexes = await query('SELECT * FROM mtc_sex ORDER BY 1 ASC');
    const relationships = await query('SELECT * FROM mtc_relationship_with_child ORDER BY 1 ASC');
    const odemas = await query('SELECT * FROM mtc_admission_odema ORDER BY 1 ASC');
    const breastFeeding = await query('SELECT * FROM mtc_breast_feeding ORDER BY 1 ASC');
    const appetiteTests = await query('SELECT * FROM mtc_appetite_test ORDER BY 1 ASC');
    const blocks = await query('SELECT block_id AS id, block_name AS name, district_id AS "districtId" FROM mtc_block ORDER BY block_name ASC');
    const icdsProjects = await query('SELECT icds_id, icds_name FROM mtc_icds_project ORDER BY icds_name ASC');
    const anganwadis = await query('SELECT awd_id, awd_name FROM mtc_anganwadi ORDER BY awd_name ASC');

    return NextResponse.json({
      admissionTypes: formatLookupData(admissionTypes.rows),
      referredBy: formatLookupData(referredBy.rows),
      castes: formatLookupData(castes.rows),
      districts: formatLookupData(districts.rows),
      sexes: formatLookupData(sexes.rows),
      relationships: formatLookupData(relationships.rows),
      odemas: formatLookupData(odemas.rows),
      breastFeeding: formatLookupData(breastFeeding.rows),
      appetiteTests: formatLookupData(appetiteTests.rows),
      blocks: blocks.rows, 
      icdsProjects: formatLookupData(icdsProjects.rows),
      anganwadis: formatLookupData(anganwadis.rows),
    });
  } catch (error) {
    console.error('Master Data Fetch Error:', error);
    return NextResponse.json({ error: 'Failed to fetch master data' }, { status: 500 });
  }
}