// // // // // // import { NextResponse } from 'next/server';
// // // // // // import { query } from '@/lib/db';

// // // // // // // --------------------------------------------------------
// // // // // // // 1. GET: Fetch Patient Data to populate the Edit Form
// // // // // // // --------------------------------------------------------
// // // // // // export async function GET(request: Request, { params }: { params: { id: string } }) {
// // // // // //   try {
// // // // // //     const id = params.id;
    
// // // // // //     // registration_id is assumed to be the primary key based on your POST setup
// // // // // //     const result = await query('SELECT * FROM mtc_child_master WHERE registration_id = $1', [id]);

// // // // // //     if (result.rows.length === 0) {
// // // // // //       return NextResponse.json({ error: 'Patient not found' }, { status: 404 });
// // // // // //     }

// // // // // //     const dbRecord = result.rows[0];

// // // // // //     // Helper to safely format Postgres Dates into HTML "YYYY-MM-DD" for <input type="date">
// // // // // //     const formatDate = (dateValue: any) => {
// // // // // //       if (!dateValue) return "";
// // // // // //       const d = new Date(dateValue);
// // // // // //       return d.toISOString().split('T')[0];
// // // // // //     };

// // // // // //     // Map the database snake_case columns back to the camelCase frontend state
// // // // // //     const mappedData = {
// // // // // //       id: dbRecord.registration_id,
// // // // // //       samNumber: dbRecord.sam_no, // Read-only on the frontend
// // // // // //       admissionType: dbRecord.admission_type_id?.toString() || "",
// // // // // //       referredBy: dbRecord.referred_by_id?.toString() || "",
// // // // // //       admissionDate: formatDate(dbRecord.admission_date),
// // // // // //       admissionTime: dbRecord.admission_time || "",
// // // // // //       childName: dbRecord.child_full_name || "",
// // // // // //       dateOfBirth: formatDate(dbRecord.dob),
// // // // // //       sex: dbRecord.sex_id?.toString() || "",
// // // // // //       parentName: dbRecord.guardian_name || "",
// // // // // //       relationship: dbRecord.relationship_id?.toString() || "",
// // // // // //       mobileNumber: dbRecord.mobile_number || "",
// // // // // //       aadhaarNumber: dbRecord.parent_aadhaar_number || "",
// // // // // //       bplNumber: dbRecord.bpl_number || "",
// // // // // //       caste: dbRecord.caste_id?.toString() || "",
// // // // // //       bankName: dbRecord.bank_name || "",
// // // // // //       accountHolderName: dbRecord.account_holder || "",
// // // // // //       accountNumber: dbRecord.account_number || "",
// // // // // //       ifscCode: dbRecord.ifsc_code || "",
// // // // // //       address: dbRecord.full_address || "",
// // // // // //       district: dbRecord.district_id?.toString() || "",
// // // // // //       block: dbRecord.block_id?.toString() || "",
// // // // // //       village: dbRecord.village || "",
// // // // // //       icdsProject: dbRecord.icds_project_id?.toString() || "",
// // // // // //       anganwadiCenter: dbRecord.anganwadi_id?.toString() || "",
// // // // // //       admissionWeight: dbRecord.admission_weight_kg?.toString() || "",
// // // // // //       admissionHeight: dbRecord.length_height_cm?.toString() || "",
// // // // // //       admissionMuac: dbRecord.muac_cm?.toString() || "",
// // // // // //       zScore: dbRecord.z_score_sd?.toString() || "",
// // // // // //       admissionOdema: dbRecord.odema_id?.toString() || "",
// // // // // //       breastFeeding: dbRecord.breast_feeding_id?.toString() || "",
// // // // // //       // Convert Postgres Boolean back to the select dropdown's "1" or "2"
// // // // // //       complementaryFeeding: dbRecord.complementary_feeding ? "1" : "2",
// // // // // //       appetiteTest: dbRecord.appetite_test_id?.toString() || "",
// // // // // //       medicalComplications: dbRecord.medical_complications || []
// // // // // //     };

// // // // // //     return NextResponse.json(mappedData);

// // // // // //   } catch (error) {
// // // // // //     console.error('Database GET Error:', error);
// // // // // //     return NextResponse.json({ error: 'Failed to fetch record' }, { status: 500 });
// // // // // //   }
// // // // // // }

// // // // // // // --------------------------------------------------------
// // // // // // // 2. PUT: Save the updated Patient Data back to the DB
// // // // // // // --------------------------------------------------------
// // // // // // export async function PUT(request: Request, { params }: { params: { id: string } }) {
// // // // // //   try {
// // // // // //     const id = params.id;
// // // // // //     const data = await request.json();
    
// // // // // //     const isCompFeeding = data.complementaryFeeding === "1";

// // // // // //     // Note: We do NOT update the sam_no here, assuming it acts as a permanent tracking ID.
// // // // // //     const sqlText = `
// // // // // //       UPDATE mtc_child_master SET
// // // // // //         admission_type_id = $1, referred_by_id = $2, admission_date = $3, 
// // // // // //         admission_time = $4, child_full_name = $5, dob = $6, sex_id = $7, 
// // // // // //         guardian_name = $8, relationship_id = $9, mobile_number = $10, 
// // // // // //         parent_aadhaar_number = $11, bpl_number = $12, caste_id = $13, 
// // // // // //         bank_name = $14, account_holder = $15, account_number = $16, 
// // // // // //         ifsc_code = $17, full_address = $18, district_id = $19, 
// // // // // //         block_id = $20, village = $21, icds_project_id = $22, 
// // // // // //         anganwadi_id = $23, admission_weight_kg = $24, length_height_cm = $25, 
// // // // // //         muac_cm = $26, z_score_sd = $27, odema_id = $28, breast_feeding_id = $29, 
// // // // // //         complementary_feeding = $30, appetite_test_id = $31, medical_complications = $32
// // // // // //       WHERE registration_id = $33
// // // // // //       RETURNING registration_id;
// // // // // //     `;

// // // // // //     const values = [
// // // // // //       data.admissionType || null, data.referredBy || null, data.admissionDate, 
// // // // // //       data.admissionTime, data.childName, data.dateOfBirth, data.sex || null, 
// // // // // //       data.parentName, data.relationship || null, data.mobileNumber,
// // // // // //       data.aadhaarNumber || null, data.bplNumber || null, data.caste || null, 
// // // // // //       data.bankName || null, data.accountHolderName || null, data.accountNumber || null, 
// // // // // //       data.ifscCode || null, data.address, data.district || null, 
// // // // // //       data.block || null, data.village || null, data.icdsProject || null, 
// // // // // //       data.anganwadiCenter || null, data.admissionWeight, data.admissionHeight, 
// // // // // //       data.admissionMuac, data.zScore || null, data.admissionOdema || null, 
// // // // // //       data.breastFeeding || null, isCompFeeding, data.appetiteTest || null, 
// // // // // //       data.medicalComplications || [], 
// // // // // //       id // The $33 WHERE clause parameter
// // // // // //     ];

// // // // // //     const result = await query(sqlText, values);

// // // // // //     if (result.rows.length === 0) {
// // // // // //        return NextResponse.json({ error: 'Patient not found or could not be updated' }, { status: 404 });
// // // // // //     }

// // // // // //     return NextResponse.json({ success: true, id: result.rows[0].registration_id }, { status: 200 });

// // // // // //   } catch (error) {
// // // // // //     console.error('Database PUT Error:', error);
// // // // // //     return NextResponse.json({ error: 'Failed to update record' }, { status: 500 });
// // // // // //   }
// // // // // // }

// // // // // import { NextResponse } from 'next/server';
// // // // // import { query } from '@/lib/db';

// // // // // // --------------------------------------------------------
// // // // // // 1. GET: Fetch Patient Data to populate the Edit Form
// // // // // // --------------------------------------------------------
// // // // // export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
// // // // //   try {
// // // // //     // Await the params promise before accessing 'id'
// // // // //     const { id } = await context.params;
    
// // // // //     // registration_id is assumed to be the primary key based on your POST setup
// // // // //     const result = await query('SELECT * FROM mtc_child_master WHERE registration_id = $1', [id]);

// // // // //     if (result.rows.length === 0) {
// // // // //       return NextResponse.json({ error: 'Patient not found' }, { status: 404 });
// // // // //     }

// // // // //     const dbRecord = result.rows[0];

// // // // //     // Helper to safely format Postgres Dates into HTML "YYYY-MM-DD" for <input type="date">
// // // // //     const formatDate = (dateValue: any) => {
// // // // //       if (!dateValue) return "";
// // // // //       const d = new Date(dateValue);
// // // // //       return d.toISOString().split('T')[0];
// // // // //     };

// // // // //     // Map the database snake_case columns back to the camelCase frontend state
// // // // //     const mappedData = {
// // // // //       id: dbRecord.registration_id,
// // // // //       samNumber: dbRecord.sam_no, // Read-only on the frontend
// // // // //       admissionType: dbRecord.admission_type_id?.toString() || "",
// // // // //       referredBy: dbRecord.referred_by_id?.toString() || "",
// // // // //       admissionDate: formatDate(dbRecord.admission_date),
// // // // //       admissionTime: dbRecord.admission_time || "",
// // // // //       childName: dbRecord.child_full_name || "",
// // // // //       dateOfBirth: formatDate(dbRecord.dob),
// // // // //       sex: dbRecord.sex_id?.toString() || "",
// // // // //       parentName: dbRecord.guardian_name || "",
// // // // //       relationship: dbRecord.relationship_id?.toString() || "",
// // // // //       mobileNumber: dbRecord.mobile_number || "",
// // // // //       aadhaarNumber: dbRecord.parent_aadhaar_number || "",
// // // // //       bplNumber: dbRecord.bpl_number || "",
// // // // //       caste: dbRecord.caste_id?.toString() || "",
// // // // //       bankName: dbRecord.bank_name || "",
// // // // //       accountHolderName: dbRecord.account_holder || "",
// // // // //       accountNumber: dbRecord.account_number || "",
// // // // //       ifscCode: dbRecord.ifsc_code || "",
// // // // //       address: dbRecord.full_address || "",
// // // // //       district: dbRecord.district_id?.toString() || "",
// // // // //       block: dbRecord.block_id?.toString() || "",
// // // // //       village: dbRecord.village || "",
// // // // //       icdsProject: dbRecord.icds_project_id?.toString() || "",
// // // // //       anganwadiCenter: dbRecord.anganwadi_id?.toString() || "",
// // // // //       admissionWeight: dbRecord.admission_weight_kg?.toString() || "",
// // // // //       admissionHeight: dbRecord.length_height_cm?.toString() || "",
// // // // //       admissionMuac: dbRecord.muac_cm?.toString() || "",
// // // // //       zScore: dbRecord.z_score_sd?.toString() || "",
// // // // //       admissionOdema: dbRecord.odema_id?.toString() || "",
// // // // //       breastFeeding: dbRecord.breast_feeding_id?.toString() || "",
// // // // //       // Convert Postgres Boolean back to the select dropdown's "1" or "2"
// // // // //       complementaryFeeding: dbRecord.complementary_feeding ? "1" : "2",
// // // // //       appetiteTest: dbRecord.appetite_test_id?.toString() || "",
// // // // //       medicalComplications: dbRecord.medical_complications || []
// // // // //     };

// // // // //     return NextResponse.json(mappedData);

// // // // //   } catch (error) {
// // // // //     console.error('Database GET Error:', error);
// // // // //     return NextResponse.json({ error: 'Failed to fetch record' }, { status: 500 });
// // // // //   }
// // // // // }

// // // // // // --------------------------------------------------------
// // // // // // 2. PUT: Save the updated Patient Data back to the DB
// // // // // // --------------------------------------------------------
// // // // // export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
// // // // //   try {
// // // // //     // Await the params promise before accessing 'id'
// // // // //     const { id } = await context.params;
// // // // //     const data = await request.json();
    
// // // // //     const isCompFeeding = data.complementaryFeeding === "1";

// // // // //     // Note: We do NOT update the sam_no here, assuming it acts as a permanent tracking ID.
// // // // //     const sqlText = `
// // // // //       UPDATE mtc_child_master SET
// // // // //         admission_type_id = $1, referred_by_id = $2, admission_date = $3, 
// // // // //         admission_time = $4, child_full_name = $5, dob = $6, sex_id = $7, 
// // // // //         guardian_name = $8, relationship_id = $9, mobile_number = $10, 
// // // // //         parent_aadhaar_number = $11, bpl_number = $12, caste_id = $13, 
// // // // //         bank_name = $14, account_holder = $15, account_number = $16, 
// // // // //         ifsc_code = $17, full_address = $18, district_id = $19, 
// // // // //         block_id = $20, village = $21, icds_project_id = $22, 
// // // // //         anganwadi_id = $23, admission_weight_kg = $24, length_height_cm = $25, 
// // // // //         muac_cm = $26, z_score_sd = $27, odema_id = $28, breast_feeding_id = $29, 
// // // // //         complementary_feeding = $30, appetite_test_id = $31, medical_complications = $32
// // // // //       WHERE registration_id = $33
// // // // //       RETURNING registration_id;
// // // // //     `;

// // // // //     const values = [
// // // // //       data.admissionType || null, data.referredBy || null, data.admissionDate, 
// // // // //       data.admissionTime, data.childName, data.dateOfBirth, data.sex || null, 
// // // // //       data.parentName, data.relationship || null, data.mobileNumber,
// // // // //       data.aadhaarNumber || null, data.bplNumber || null, data.caste || null, 
// // // // //       data.bankName || null, data.accountHolderName || null, data.accountNumber || null, 
// // // // //       data.ifscCode || null, data.address, data.district || null, 
// // // // //       data.block || null, data.village || null, data.icdsProject || null, 
// // // // //       data.anganwadiCenter || null, data.admissionWeight, data.admissionHeight, 
// // // // //       data.admissionMuac, data.zScore || null, data.admissionOdema || null, 
// // // // //       data.breastFeeding || null, isCompFeeding, data.appetiteTest || null, 
// // // // //       data.medicalComplications || [], 
// // // // //       id // The $33 WHERE clause parameter
// // // // //     ];

// // // // //     const result = await query(sqlText, values);

// // // // //     if (result.rows.length === 0) {
// // // // //        return NextResponse.json({ error: 'Patient not found or could not be updated' }, { status: 404 });
// // // // //     }

// // // // //     return NextResponse.json({ success: true, id: result.rows[0].registration_id }, { status: 200 });

// // // // //   } catch (error) {
// // // // //     console.error('Database PUT Error:', error);
// // // // //     return NextResponse.json({ error: 'Failed to update record' }, { status: 500 });
// // // // //   }
// // // // // }

// // // // import { NextResponse } from 'next/server';
// // // // import { query } from '@/lib/db';

// // // // export const dynamic = 'force-dynamic';

// // // // // --- SAFE NUMBER PARSING HELPER ---
// // // // const parseNum = (val: any, isFloat = false) => {
// // // //   if (val === null || val === undefined || val === "") return null;
// // // //   const parsed = isFloat ? parseFloat(val) : parseInt(val, 10);
// // // //   return isNaN(parsed) ? null : parsed;
// // // // };

// // // // // --- GET: Fetch Single Record for Edit Page ---
// // // // export async function GET(request: Request, { params }: { params: { id: string } }) {
// // // //   try {
// // // //     const id = params.id;
    
// // // //     const sqlText = `
// // // //       SELECT 
// // // //         sam_no AS "samNumber", admission_type_id::text AS "admissionType", 
// // // //         referred_by_id::text AS "referredBy", referred_by_name AS "referredByName", 
// // // //         referred_by_mobile AS "referredByMobile", TO_CHAR(admission_date, 'YYYY-MM-DD') AS "admissionDate", 
// // // //         admission_time AS "admissionTime", child_full_name AS "childName", 
// // // //         mother_name AS "motherName", TO_CHAR(dob, 'YYYY-MM-DD') AS "dateOfBirth", 
// // // //         age_years AS "ageYears", age_months AS "ageMonths", sex_id::text AS "sex", 
// // // //         guardian_name AS "parentName", relationship_id::text AS "relationship", 
// // // //         mobile_number AS "mobileNumber", parent_aadhaar_number AS "aadhaarNumber", 
// // // //         bpl_number AS "bplNumber", caste_id::text AS "caste", bank_name AS "bankName", 
// // // //         account_holder AS "accountHolderName", account_number AS "accountNumber", 
// // // //         ifsc_code AS "ifscCode", full_address AS "address", district_id::text AS "district", 
// // // //         block_id::text AS "block", village, icds_project_id::text AS "icdsProject", 
// // // //         anganwadi_id::text AS "anganwadiCenter", admission_weight_kg AS "admissionWeight", 
// // // //         length_height_cm AS "admissionHeight", muac_cm AS "admissionMuac", 
// // // //         z_score_sd AS "zScore", odema_id::text AS "admissionOdema", 
// // // //         breast_feeding_id::text AS "breastFeeding", complementary_feeding AS "complementaryFeeding", 
// // // //         appetite_test_id::text AS "appetiteTest", medical_complications AS "medicalComplications"
// // // //       FROM mtc_child_master
// // // //       WHERE registration_id = $1
// // // //     `;
    
// // // //     const result = await query(sqlText, [parseInt(id, 10)]);
    
// // // //     if (result.rows.length === 0) {
// // // //       return NextResponse.json({ error: 'Record not found' }, { status: 404 });
// // // //     }

// // // //     const patientData = result.rows[0];
// // // //     // Convert boolean to "1" or "2" for frontend Dropdown
// // // //     patientData.complementaryFeeding = patientData.complementaryFeeding ? "1" : "2";

// // // //     return NextResponse.json(patientData, { status: 200 });
// // // //   } catch (error) {
// // // //     console.error('Fetch Single Record Error:', error);
// // // //     return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
// // // //   }
// // // // }

// // // // // --- PUT: Update Existing Patient Record ---
// // // // export async function PUT(request: Request, { params }: { params: { id: string } }) {
// // // //   try {
// // // //     const id = params.id;
// // // //     const data = await request.json();
    
// // // //     // Convert Dropdown "1" or "2" back to boolean
// // // //     const isCompFeeding = data.complementaryFeeding === "1";

// // // //     // Safely parse PostgreSQL array for Medical Complications
// // // //     let complicationsFormatted = null;
// // // //     if (Array.isArray(data.medicalComplications) && data.medicalComplications.length > 0) {
// // // //       complicationsFormatted = `{${data.medicalComplications.map((c: string) => `"${c.replace(/"/g, '""')}"`).join(',')}}`;
// // // //     }

// // // //     const sqlText = `
// // // //       UPDATE mtc_child_master SET
// // // //         admission_type_id = $1, referred_by_id = $2, referred_by_name = $3, referred_by_mobile = $4,
// // // //         admission_date = $5, admission_time = $6, child_full_name = $7, mother_name = $8, 
// // // //         dob = $9, age_years = $10, age_months = $11, sex_id = $12, guardian_name = $13, 
// // // //         relationship_id = $14, mobile_number = $15, parent_aadhaar_number = $16, bpl_number = $17, 
// // // //         caste_id = $18, bank_name = $19, account_holder = $20, account_number = $21, ifsc_code = $22, 
// // // //         full_address = $23, district_id = $24, block_id = $25, village = $26, icds_project_id = $27, 
// // // //         anganwadi_id = $28, admission_weight_kg = $29, length_height_cm = $30, muac_cm = $31, 
// // // //         z_score_sd = $32, odema_id = $33, breast_feeding_id = $34, complementary_feeding = $35, 
// // // //         appetite_test_id = $36, medical_complications = $37, updated_at = CURRENT_TIMESTAMP
// // // //       WHERE registration_id = $38
// // // //       RETURNING registration_id;
// // // //     `;

// // // //     // Map all variables dynamically, with safe null-checking for hidden fields
// // // //     const values = [
// // // //       parseNum(data.admissionType), 
// // // //       parseNum(data.referredBy), 
// // // //       data.referredByName || null, 
// // // //       data.referredByMobile || null, 
// // // //       data.admissionDate || null, 
// // // //       data.admissionTime || null, 
// // // //       data.childName || null, 
// // // //       data.motherName || null, 
// // // //       data.dateOfBirth || null, 
// // // //       parseNum(data.ageYears), 
// // // //       parseNum(data.ageMonths),
// // // //       parseNum(data.sex), 
// // // //       data.parentName || null, 
// // // //       parseNum(data.relationship), 
// // // //       data.mobileNumber || null, 
// // // //       data.aadhaarNumber || null, 
// // // //       data.bplNumber || null, 
// // // //       parseNum(data.caste), 
// // // //       data.bankName || null, 
// // // //       data.accountHolderName || null, 
// // // //       data.accountNumber || null, 
// // // //       data.ifscCode || null, 
// // // //       data.address || null, 
// // // //       parseNum(data.district), 
// // // //       parseNum(data.block), 
// // // //       data.village || null, 
// // // //       parseNum(data.icdsProject), 
// // // //       parseNum(data.anganwadiCenter), 
// // // //       parseNum(data.admissionWeight, true), 
// // // //       parseNum(data.admissionHeight, true), 
// // // //       parseNum(data.admissionMuac, true), // Automatically passes null if hidden on frontend
// // // //       parseNum(data.zScore, true), 
// // // //       parseNum(data.admissionOdema), 
// // // //       parseNum(data.breastFeeding), 
// // // //       isCompFeeding, 
// // // //       parseNum(data.appetiteTest), 
// // // //       complicationsFormatted, // Passes the text box data inside the array properly
// // // //       parseInt(id, 10)
// // // //     ];

// // // //     await query(sqlText, values);
// // // //     return NextResponse.json({ success: true, message: 'Record updated successfully' }, { status: 200 });

// // // //   } catch (error) {
// // // //     console.error('Update Record Error:', error);
// // // //     return NextResponse.json({ error: 'Failed to update record' }, { status: 500 });
// // // //   }
// // // // }


// // // import { NextResponse } from 'next/server';
// // // import { query } from '@/lib/db';

// // // export const dynamic = 'force-dynamic';

// // // const parseNum = (val: any, isFloat = false) => {
// // //   if (val === null || val === undefined || val === "") return null;
// // //   const parsed = isFloat ? parseFloat(val) : parseInt(val, 10);
// // //   return isNaN(parsed) ? null : parsed;
// // // };

// // // // ==========================================
// // // // GET: Fetch a single child's data for Editing
// // // // ==========================================
// // // export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
// // //   try {
// // //     // ✅ CRITICAL FIX: Await the params object
// // //     const { id } = await params;

// // //     const sqlText = `SELECT * FROM mtc_child_master WHERE registration_id = $1`;
// // //     const result = await query(sqlText, [id]);

// // //     if (result.rows.length === 0) {
// // //       return NextResponse.json({ error: 'Patient not found' }, { status: 404 });
// // //     }

// // //     const row = result.rows[0];

// // //     // Map database snake_case columns back to the frontend camelCase state
// // //     const patientData = {
// // //       samNumber: row.sam_no,
// // //       mtcId: row.mtc_id,
// // //       admissionType: row.admission_type_id?.toString(),
// // //       referredBy: row.referred_by_id?.toString(),
// // //       referredByName: row.referred_by_name,
// // //       referredByMobile: row.referred_by_mobile,
// // //       childName: row.child_full_name,
// // //       motherName: row.mother_name,
// // //       parentName: row.guardian_name,
// // //       relationship: row.relationship_id?.toString(),
// // //       mobileNumber: row.mobile_number,
// // //       aadhaarNumber: row.parent_aadhaar_number,
// // //       bplNumber: row.bpl_number,
// // //       caste: row.caste_id?.toString(),
// // //       bankName: row.bank_name,
// // //       accountHolderName: row.account_holder,
// // //       accountNumber: row.account_number,
// // //       ifscCode: row.ifsc_code,
// // //       address: row.full_address,
// // //       district: row.district_id?.toString(),
// // //       block: row.block_id?.toString(),
// // //       village: row.village,
// // //       icdsProject: row.icds_project_id?.toString(),
// // //       anganwadiCenter: row.anganwadi_id?.toString(),
// // //       dateOfBirth: row.dob ? new Date(row.dob).toISOString().split('T')[0] : "",
// // //       ageYears: row.age_years,
// // //       ageMonths: row.age_months,
// // //       sex: row.sex_id?.toString(),
// // //       admissionDate: row.admission_date ? new Date(row.admission_date).toISOString().split('T')[0] : "",
// // //       admissionTime: row.admission_time,
// // //       admissionWeight: row.admission_weight_kg,
// // //       admissionHeight: row.length_height_cm,
// // //       admissionMuac: row.muac_cm,
// // //       zScore: row.z_score_sd,
// // //       admissionOdema: row.odema_id?.toString(),
// // //       breastFeeding: row.breast_feeding_id?.toString(),
// // //       complementaryFeeding: row.complementary_feeding ? "1" : "2",
// // //       appetiteTest: row.appetite_test_id?.toString(),
// // //       medicalComplications: row.medical_complications || []
// // //     };

// // //     return NextResponse.json(patientData, { status: 200 });

// // //   } catch (error) {
// // //     console.error('Fetch Single Patient Error:', error);
// // //     return NextResponse.json({ error: 'Failed to fetch patient data' }, { status: 500 });
// // //   }
// // // }

// // // // ==========================================
// // // // PUT: Update an existing child's data
// // // // ==========================================
// // // export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
// // //   try {
// // //     // ✅ CRITICAL FIX: Await the params object
// // //     const { id } = await params;
// // //     const data = await request.json();
    
// // //     const isCompFeeding = data.complementaryFeeding === "1";

// // //     let complicationsFormatted = null;
// // //     if (Array.isArray(data.medicalComplications) && data.medicalComplications.length > 0) {
// // //       complicationsFormatted = `{${data.medicalComplications.map((c: string) => `"${c.replace(/"/g, '""')}"`).join(',')}}`;
// // //     }

// // //     const sqlText = `
// // //       UPDATE mtc_child_master SET
// // //         mtc_id = $1, admission_type_id = $2, referred_by_id = $3, referred_by_name = $4, referred_by_mobile = $5,
// // //         admission_date = $6, admission_time = $7, child_full_name = $8, mother_name = $9, dob = $10, age_years = $11, age_months = $12,
// // //         sex_id = $13, guardian_name = $14, relationship_id = $15, mobile_number = $16, parent_aadhaar_number = $17, 
// // //         bpl_number = $18, caste_id = $19, bank_name = $20, account_holder = $21, account_number = $22, ifsc_code = $23, 
// // //         full_address = $24, district_id = $25, block_id = $26, village = $27, icds_project_id = $28, anganwadi_id = $29, 
// // //         admission_weight_kg = $30, length_height_cm = $31, muac_cm = $32, z_score_sd = $33, odema_id = $34, 
// // //         breast_feeding_id = $35, complementary_feeding = $36, appetite_test_id = $37, medical_complications = $38,
// // //         updated_at = CURRENT_TIMESTAMP
// // //       WHERE registration_id = $39
// // //       RETURNING registration_id;
// // //     `;

// // //     const values = [
// // //       parseNum(data.mtcId), parseNum(data.admissionType), parseNum(data.referredBy), data.referredByName || null, data.referredByMobile || null,
// // //       data.admissionDate || null, data.admissionTime || null, data.childName || null, data.motherName || null, data.dateOfBirth || null, 
// // //       parseNum(data.ageYears), parseNum(data.ageMonths), parseNum(data.sex), data.parentName || null, parseNum(data.relationship), 
// // //       data.mobileNumber || null, data.aadhaarNumber || null, data.bplNumber || null, parseNum(data.caste), data.bankName || null, 
// // //       data.accountHolderName || null, data.accountNumber || null, data.ifscCode || null, data.address || null, parseNum(data.district), 
// // //       parseNum(data.block), data.village || null, parseNum(data.icdsProject), parseNum(data.anganwadiCenter), parseNum(data.admissionWeight, true), 
// // //       parseNum(data.admissionHeight, true), parseNum(data.admissionMuac, true), parseNum(data.zScore, true), parseNum(data.admissionOdema), 
// // //       parseNum(data.breastFeeding), isCompFeeding, parseNum(data.appetiteTest), complicationsFormatted, 
// // //       id // WHERE constraint
// // //     ];

// // //     const result = await query(sqlText, values);
    
// // //     if (result.rowCount === 0) {
// // //       return NextResponse.json({ error: 'Patient record not found' }, { status: 404 });
// // //     }

// // //     return NextResponse.json({ success: true, id: result.rows[0].registration_id }, { status: 200 });
    
// // //   } catch (error) {
// // //     console.error('Update Registration DB Error:', error);
// // //     return NextResponse.json({ error: 'Failed to update patient record' }, { status: 500 });
// // //   }
// // // }

// // // // ==========================================
// // // // DELETE: Remove a child record
// // // // ==========================================
// // // export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
// // //   try {
// // //     // ✅ CRITICAL FIX: Await the params object
// // //     const { id } = await params;

// // //     const sqlText = `DELETE FROM mtc_child_master WHERE registration_id = $1 RETURNING registration_id`;
// // //     const result = await query(sqlText, [id]);

// // //     if (result.rowCount === 0) {
// // //       return NextResponse.json({ error: 'Record not found' }, { status: 404 });
// // //     }
    
// // //     return NextResponse.json({ success: true, message: 'Record deleted successfully' }, { status: 200 });

// // //   } catch (error) {
// // //     console.error('Delete Record Error:', error);
// // //     return NextResponse.json({ error: 'Failed to delete record' }, { status: 500 });
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

// // // ==========================================
// // // GET: Fetch a single child's data for Editing
// // // ==========================================
// // export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
// //   try {
// //     const { id } = await params;

// //     const sqlText = `SELECT * FROM mtc_child_master WHERE registration_id = $1`;
// //     const result = await query(sqlText, [id]);

// //     if (result.rows.length === 0) {
// //       return NextResponse.json({ error: 'Patient not found' }, { status: 404 });
// //     }

// //     const row = result.rows[0];

// //     // Map database snake_case columns back to the frontend camelCase state
// //     const patientData = {
// //       samNumber: row.sam_no,
// //       mtcId: row.mtc_id,
// //       isSamarRegistered: row.is_samar_registered, // ✅ Added
// //       samarUuid: row.samar_uuid,                  // ✅ Added
// //       admissionType: row.admission_type_id?.toString(),
// //       referredBy: row.referred_by_id?.toString(),
// //       referredByName: row.referred_by_name,
// //       referredByMobile: row.referred_by_mobile,
// //       childName: row.child_full_name,
// //       motherName: row.mother_name,
// //       parentName: row.guardian_name,
// //       relationship: row.relationship_id?.toString(),
// //       mobileNumber: row.mobile_number,
// //       aadhaarNumber: row.parent_aadhaar_number,
// //       bplNumber: row.bpl_number,
// //       caste: row.caste_id?.toString(),
// //       bankName: row.bank_name,
// //       accountHolderName: row.account_holder,
// //       accountNumber: row.account_number,
// //       ifscCode: row.ifsc_code,
// //       address: row.full_address,
// //       district: row.district_id?.toString(),
// //       block: row.block_id?.toString(),
// //       village: row.village,
// //       icdsProject: row.icds_project_id?.toString(),
// //       anganwadiCenter: row.anganwadi_id?.toString(),
// //       dateOfBirth: row.dob ? new Date(row.dob).toISOString().split('T')[0] : "",
// //       ageYears: row.age_years,
// //       ageMonths: row.age_months,
// //       sex: row.sex_id?.toString(),
// //       admissionDate: row.admission_date ? new Date(row.admission_date).toISOString().split('T')[0] : "",
// //       admissionTime: row.admission_time,
// //       admissionWeight: row.admission_weight_kg,
// //       admissionHeight: row.length_height_cm,
// //       admissionMuac: row.muac_cm,
// //       zScore: row.z_score_sd,
// //       admissionOdema: row.odema_id?.toString(),
// //       breastFeeding: row.breast_feeding_id?.toString(),
// //       complementaryFeeding: row.complementary_feeding ? "1" : "2",
// //       appetiteTest: row.appetite_test_id?.toString(),
// //       medicalComplications: row.medical_complications || []
// //     };

// //     return NextResponse.json(patientData, { status: 200 });

// //   } catch (error) {
// //     console.error('Fetch Single Patient Error:', error);
// //     return NextResponse.json({ error: 'Failed to fetch patient data' }, { status: 500 });
// //   }
// // }

// // // ==========================================
// // // PUT: Update an existing child's data
// // // ==========================================
// // export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
// //   try {
// //     const { id } = await params;
// //     const data = await request.json();
    
// //     const isCompFeeding = data.complementaryFeeding === "1";

// //     let complicationsFormatted = null;
// //     if (Array.isArray(data.medicalComplications) && data.medicalComplications.length > 0) {
// //       complicationsFormatted = `{${data.medicalComplications.map((c: string) => `"${c.replace(/"/g, '""')}"`).join(',')}}`;
// //     }

// //     // ✅ Added is_samar_registered and samar_uuid to the SET clause
// //     const sqlText = `
// //       UPDATE mtc_child_master SET
// //         mtc_id = $1, is_samar_registered = $2, samar_uuid = $3, admission_type_id = $4, referred_by_id = $5, 
// //         referred_by_name = $6, referred_by_mobile = $7, admission_date = $8, admission_time = $9, 
// //         child_full_name = $10, mother_name = $11, dob = $12, age_years = $13, age_months = $14,
// //         sex_id = $15, guardian_name = $16, relationship_id = $17, mobile_number = $18, parent_aadhaar_number = $19, 
// //         bpl_number = $20, caste_id = $21, bank_name = $22, account_holder = $23, account_number = $24, ifsc_code = $25, 
// //         full_address = $26, district_id = $27, block_id = $28, village = $29, icds_project_id = $30, anganwadi_id = $31, 
// //         admission_weight_kg = $32, length_height_cm = $33, muac_cm = $34, z_score_sd = $35, odema_id = $36, 
// //         breast_feeding_id = $37, complementary_feeding = $38, appetite_test_id = $39, medical_complications = $40,
// //         updated_at = CURRENT_TIMESTAMP
// //       WHERE registration_id = $41
// //       RETURNING registration_id;
// //     `;

// //     // ✅ Added the SAAMAR values and shifted the parameter positions
// //     const values = [
// //       parseNum(data.mtcId), 
// //       data.isSamarRegistered || false, 
// //       data.samarUuid || null,          
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
// //       complicationsFormatted, 
// //       id // $41
// //     ];

// //     const result = await query(sqlText, values);
    
// //     if (result.rowCount === 0) {
// //       return NextResponse.json({ error: 'Patient record not found' }, { status: 404 });
// //     }

// //     return NextResponse.json({ success: true, id: result.rows[0].registration_id }, { status: 200 });
    
// //   } catch (error) {
// //     console.error('Update Registration DB Error:', error);
// //     return NextResponse.json({ error: 'Failed to update patient record' }, { status: 500 });
// //   }
// // }

// // // ==========================================
// // // DELETE: Remove a child record
// // // ==========================================
// // export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
// //   try {
// //     const { id } = await params;

// //     const sqlText = `DELETE FROM mtc_child_master WHERE registration_id = $1 RETURNING registration_id`;
// //     const result = await query(sqlText, [id]);

// //     if (result.rowCount === 0) {
// //       return NextResponse.json({ error: 'Record not found' }, { status: 404 });
// //     }
    
// //     return NextResponse.json({ success: true, message: 'Record deleted successfully' }, { status: 200 });

// //   } catch (error) {
// //     console.error('Delete Record Error:', error);
// //     return NextResponse.json({ error: 'Failed to delete record' }, { status: 500 });
// //   }
// // }

// import { NextResponse } from 'next/server';
// import { query } from '@/lib/db';

// export const dynamic = 'force-dynamic';

// const parseNum = (val: unknown, isFloat = false) => {
//   if (val === null || val === undefined || val === "") return null;
//   const parsed = isFloat ? parseFloat(String(val)) : parseInt(String(val), 10);
//   return isNaN(parsed) ? null : parsed;
// };

// // ==========================================
// // GET: Fetch a single child's data for Editing
// // ==========================================
// export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
//   try {
//     const { id } = await params;

//     const sqlText = `SELECT * FROM mtc_child_master WHERE registration_id = $1`;
//     const result = await query(sqlText, [id]);

//     if (result.rows.length === 0) {
//       return NextResponse.json({ error: 'Patient not found' }, { status: 404 });
//     }

//     const row = result.rows[0];

//     // Map database snake_case columns back to the frontend camelCase state
//     const patientData = {
//       samNumber: row.sam_no,
//       mtcId: row.mtc_id,
//       isSamarRegistered: row.is_samar_registered, // ✅ Added
//       samarUuid: row.samar_uuid,                  // ✅ Added
//       admissionType: row.admission_type_id?.toString(),
//       referredBy: row.referred_by_id?.toString(),
//       referredByName: row.referred_by_name,
//       referredByMobile: row.referred_by_mobile,
//       childName: row.child_full_name,
//       motherName: row.mother_name,
//       parentName: row.guardian_name,
//       relationship: row.relationship_id?.toString(),
//       mobileNumber: row.mobile_number,
//       aadhaarNumber: row.parent_aadhaar_number,
//       bplNumber: row.bpl_number,
//       caste: row.caste_id?.toString(),
//       bankName: row.bank_name,
//       accountHolderName: row.account_holder,
//       accountNumber: row.account_number,
//       ifscCode: row.ifsc_code,
//       address: row.full_address,
//       district: row.district_id?.toString(),
//       block: row.block_id?.toString(),
//       village: row.village,
//       icdsProject: row.icds_project_id?.toString(),
//       anganwadiCenter: row.anganwadi_id?.toString(),
//       dateOfBirth: row.dob ? new Date(row.dob).toISOString().split('T')[0] : "",
//       ageYears: row.age_years,
//       ageMonths: row.age_months,
//       sex: row.sex_id?.toString(),
//       admissionDate: row.admission_date ? new Date(row.admission_date).toISOString().split('T')[0] : "",
//       admissionTime: row.admission_time,
//       admissionWeight: row.admission_weight_kg,
//       admissionHeight: row.length_height_cm,
//       admissionMuac: row.muac_cm,
//       zScore: row.z_score_sd,
//       admissionOdema: row.odema_id?.toString(),
//       breastFeeding: row.breast_feeding_id?.toString(),
//       complementaryFeeding: row.complementary_feeding ? "1" : "2",
//       appetiteTest: row.appetite_test_id?.toString(),
//       medicalComplications: row.medical_complications || []
//     };

//     return NextResponse.json(patientData, { status: 200 });

//   } catch (error) {
//     console.error('Fetch Single Patient Error:', error);
//     return NextResponse.json({ error: 'Failed to fetch patient data' }, { status: 500 });
//   }
// }

// // ==========================================
// // PUT: Update an existing child's data
// // ==========================================
// export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
//   try {
//     const { id } = await params;
//     const data = await request.json();
    
//     const isCompFeeding = data.complementaryFeeding === "1";

//     let complicationsFormatted = null;
//     if (Array.isArray(data.medicalComplications) && data.medicalComplications.length > 0) {
//       complicationsFormatted = `{${data.medicalComplications.map((c: string) => `"${c.replace(/"/g, '""')}"`).join(',')}}`;
//     }

//     // ✅ Added is_samar_registered and samar_uuid to the SET clause
//     const sqlText = `
//       UPDATE mtc_child_master SET
//         mtc_id = $1, is_samar_registered = $2, samar_uuid = $3, admission_type_id = $4, referred_by_id = $5, 
//         referred_by_name = $6, referred_by_mobile = $7, admission_date = $8, admission_time = $9, 
//         child_full_name = $10, mother_name = $11, dob = $12, age_years = $13, age_months = $14,
//         sex_id = $15, guardian_name = $16, relationship_id = $17, mobile_number = $18, parent_aadhaar_number = $19, 
//         bpl_number = $20, caste_id = $21, bank_name = $22, account_holder = $23, account_number = $24, ifsc_code = $25, 
//         full_address = $26, district_id = $27, block_id = $28, village = $29, icds_project_id = $30, anganwadi_id = $31, 
//         admission_weight_kg = $32, length_height_cm = $33, muac_cm = $34, z_score_sd = $35, odema_id = $36, 
//         breast_feeding_id = $37, complementary_feeding = $38, appetite_test_id = $39, medical_complications = $40,
//         updated_at = CURRENT_TIMESTAMP
//       WHERE registration_id = $41
//       RETURNING registration_id;
//     `;

//     // ✅ Added the SAAMAR values and shifted the parameter positions
//     const values = [
//       parseNum(data.mtcId), 
//       data.isSamarRegistered || false, 
//       data.samarUuid || null,          
//       parseNum(data.admissionType), 
//       parseNum(data.referredBy), 
//       data.referredByName || null, 
//       data.referredByMobile || null,
//       data.admissionDate || null, 
//       data.admissionTime || null, 
//       data.childName || null, 
//       data.motherName || null, 
//       data.dateOfBirth || null, 
//       parseNum(data.ageYears), 
//       parseNum(data.ageMonths), 
//       parseNum(data.sex), 
//       data.parentName || null, 
//       parseNum(data.relationship), 
//       data.mobileNumber || null, 
//       data.aadhaarNumber || null, 
//       data.bplNumber || null, 
//       parseNum(data.caste), 
//       data.bankName || null, 
//       data.accountHolderName || null, 
//       data.accountNumber || null, 
//       data.ifscCode || null, 
//       data.address || null, 
//       parseNum(data.district), 
//       parseNum(data.block), 
//       data.village || null, 
//       parseNum(data.icdsProject), 
//       parseNum(data.anganwadiCenter), 
//       parseNum(data.admissionWeight, true), 
//       parseNum(data.admissionHeight, true), 
//       parseNum(data.admissionMuac, true), 
//       parseNum(data.zScore, true), 
//       parseNum(data.admissionOdema), 
//       parseNum(data.breastFeeding), 
//       isCompFeeding, 
//       parseNum(data.appetiteTest), 
//       complicationsFormatted, 
//       id // $41
//     ];

//     const result = await query(sqlText, values);
    
//     if (result.rowCount === 0) {
//       return NextResponse.json({ error: 'Patient record not found' }, { status: 404 });
//     }

//     return NextResponse.json({ success: true, id: result.rows[0].registration_id }, { status: 200 });
    
//   } catch (error) {
//     console.error('Update Registration DB Error:', error);
//     return NextResponse.json({ error: 'Failed to update patient record' }, { status: 500 });
//   }
// }

// // ==========================================
// // DELETE: Remove a child record
// // ==========================================
// export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
//   try {
//     const { id } = await params;

//     const sqlText = `DELETE FROM mtc_child_master WHERE registration_id = $1 RETURNING registration_id`;
//     const result = await query(sqlText, [id]);

//     if (result.rowCount === 0) {
//       return NextResponse.json({ error: 'Record not found' }, { status: 404 });
//     }
    
//     return NextResponse.json({ success: true, message: 'Record deleted successfully' }, { status: 200 });

//   } catch (error) {
//     console.error('Delete Record Error:', error);
//     return NextResponse.json({ error: 'Failed to delete record' }, { status: 500 });
//   }
// }

import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

interface MtcChildRow {
  sam_no: string | null;
  mtc_id: number | null;
  is_samar_registered: boolean | null;
  samar_uuid: string | null;
  admission_type_id: number | null;
  referred_by_id: number | null;
  referred_by_name: string | null;
  referred_by_mobile: string | null;
  child_full_name: string | null;
  mother_name: string | null;
  guardian_name: string | null;
  relationship_id: number | null;
  mobile_number: string | null;
  parent_aadhaar_number: string | null;
  bpl_number: string | null;
  caste_id: number | null;
  bank_name: string | null;
  account_holder: string | null;
  account_number: string | null;
  ifsc_code: string | null;
  full_address: string | null;
  district_id: number | null;
  block_id: number | null;
  village: string | null;
  icds_project_id: number | null;
  anganwadi_id: number | null;
  dob: string | number | Date | null;
  age_years: number | null;
  age_months: number | null;
  sex_id: number | null;
  admission_date: string | number | Date | null;
  admission_time: string | null;
  admission_weight_kg: string | number | null;
  length_height_cm: string | number | null;
  muac_cm: string | number | null;
  z_score_sd: string | number | null;
  odema_id: number | null;
  breast_feeding_id: number | null;
  complementary_feeding: boolean | null;
  appetite_test_id: number | null;
  medical_complications: string[] | null;
}

const parseNum = (val: unknown, isFloat = false) => {
  if (val === null || val === undefined || val === "") return null;
  const parsed = isFloat ? parseFloat(String(val)) : parseInt(String(val), 10);
  return isNaN(parsed) ? null : parsed;
};

// ==========================================
// GET: Fetch a single child's data for Editing
// ==========================================
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    const sqlText = `SELECT * FROM mtc_child_master WHERE registration_id = $1`;
    const result = await query<MtcChildRow>(sqlText, [id]);

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Patient not found' }, { status: 404 });
    }

    const row = result.rows[0];

    // Map database snake_case columns back to the frontend camelCase state
    const patientData = {
      samNumber: row.sam_no,
      mtcId: row.mtc_id,
      isSamarRegistered: row.is_samar_registered, 
      samarUuid: row.samar_uuid,                  
      admissionType: row.admission_type_id?.toString(),
      referredBy: row.referred_by_id?.toString(),
      referredByName: row.referred_by_name,
      referredByMobile: row.referred_by_mobile,
      childName: row.child_full_name,
      motherName: row.mother_name,
      parentName: row.guardian_name,
      relationship: row.relationship_id?.toString(),
      mobileNumber: row.mobile_number,
      aadhaarNumber: row.parent_aadhaar_number,
      bplNumber: row.bpl_number,
      caste: row.caste_id?.toString(),
      bankName: row.bank_name,
      accountHolderName: row.account_holder,
      accountNumber: row.account_number,
      ifscCode: row.ifsc_code,
      address: row.full_address,
      district: row.district_id?.toString(),
      block: row.block_id?.toString(),
      village: row.village,
      icdsProject: row.icds_project_id?.toString(),
      anganwadiCenter: row.anganwadi_id?.toString(),
      dateOfBirth: row.dob ? new Date(row.dob).toISOString().split('T')[0] : "",
      ageYears: row.age_years,
      ageMonths: row.age_months,
      sex: row.sex_id?.toString(),
      admissionDate: row.admission_date ? new Date(row.admission_date).toISOString().split('T')[0] : "",
      admissionTime: row.admission_time,
      admissionWeight: row.admission_weight_kg,
      admissionHeight: row.length_height_cm,
      admissionMuac: row.muac_cm,
      zScore: row.z_score_sd,
      admissionOdema: row.odema_id?.toString(),
      breastFeeding: row.breast_feeding_id?.toString(),
      complementaryFeeding: row.complementary_feeding ? "1" : "2",
      appetiteTest: row.appetite_test_id?.toString(),
      medicalComplications: row.medical_complications || []
    };

    return NextResponse.json(patientData, { status: 200 });

  } catch (error) {
    console.error('Fetch Single Patient Error:', error);
    return NextResponse.json({ error: 'Failed to fetch patient data' }, { status: 500 });
  }
}

// ==========================================
// PUT: Update an existing child's data
// ==========================================
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const data = await request.json();
    
    const isCompFeeding = data.complementaryFeeding === "1";

    let complicationsFormatted = null;
    if (Array.isArray(data.medicalComplications) && data.medicalComplications.length > 0) {
      complicationsFormatted = `{${data.medicalComplications.map((c: string) => `"${c.replace(/"/g, '""')}"`).join(',')}}`;
    }

    const sqlText = `
      UPDATE mtc_child_master SET
        mtc_id = $1, is_samar_registered = $2, samar_uuid = $3, admission_type_id = $4, referred_by_id = $5, 
        referred_by_name = $6, referred_by_mobile = $7, admission_date = $8, admission_time = $9, 
        child_full_name = $10, mother_name = $11, dob = $12, age_years = $13, age_months = $14,
        sex_id = $15, guardian_name = $16, relationship_id = $17, mobile_number = $18, parent_aadhaar_number = $19, 
        bpl_number = $20, caste_id = $21, bank_name = $22, account_holder = $23, account_number = $24, ifsc_code = $25, 
        full_address = $26, district_id = $27, block_id = $28, village = $29, icds_project_id = $30, anganwadi_id = $31, 
        admission_weight_kg = $32, length_height_cm = $33, muac_cm = $34, z_score_sd = $35, odema_id = $36, 
        breast_feeding_id = $37, complementary_feeding = $38, appetite_test_id = $39, medical_complications = $40,
        updated_at = CURRENT_TIMESTAMP
      WHERE registration_id = $41
      RETURNING registration_id;
    `;

    const values = [
      parseNum(data.mtcId), 
      data.isSamarRegistered || false, 
      data.samarUuid || null,          
      parseNum(data.admissionType), 
      parseNum(data.referredBy), 
      data.referredByName || null, 
      data.referredByMobile || null,
      data.admissionDate || null, 
      data.admissionTime || null, 
      data.childName || null, 
      data.motherName || null, 
      data.dateOfBirth || null, 
      parseNum(data.ageYears), 
      parseNum(data.ageMonths), 
      parseNum(data.sex), 
      data.parentName || null, 
      parseNum(data.relationship), 
      data.mobileNumber || null, 
      data.aadhaarNumber || null, 
      data.bplNumber || null, 
      parseNum(data.caste), 
      data.bankName || null, 
      data.accountHolderName || null, 
      data.accountNumber || null, 
      data.ifscCode || null, 
      data.address || null, 
      parseNum(data.district), 
      parseNum(data.block), 
      data.village || null, 
      parseNum(data.icdsProject), 
      parseNum(data.anganwadiCenter), 
      parseNum(data.admissionWeight, true), 
      parseNum(data.admissionHeight, true), 
      parseNum(data.admissionMuac, true), 
      parseNum(data.zScore, true), 
      parseNum(data.admissionOdema), 
      parseNum(data.breastFeeding), 
      isCompFeeding, 
      parseNum(data.appetiteTest), 
      complicationsFormatted, 
      id // $41
    ];

    const result = await query(sqlText, values);
    
    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Patient record not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, id: result.rows[0].registration_id }, { status: 200 });
    
  } catch (error) {
    console.error('Update Registration DB Error:', error);
    return NextResponse.json({ error: 'Failed to update patient record' }, { status: 500 });
  }
}

// ==========================================
// DELETE: Remove a child record
// ==========================================
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    const sqlText = `DELETE FROM mtc_child_master WHERE registration_id = $1 RETURNING registration_id`;
    const result = await query(sqlText, [id]);

    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Record not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, message: 'Record deleted successfully' }, { status: 200 });

  } catch (error) {
    console.error('Delete Record Error:', error);
    return NextResponse.json({ error: 'Failed to delete record' }, { status: 500 });
  }
}
