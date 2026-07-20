// // // // // // // // // // // import { NextResponse } from 'next/server';
// // // // // // // // // // // import { query } from '@/lib/db';

// // // // // // // // // // // export async function POST(request: Request) {
// // // // // // // // // // //   try {
// // // // // // // // // // //     const data = await request.json();

// // // // // // // // // // //     // Convert string "1" (Yes) or "2" (No) to an actual Boolean for PostgreSQL
// // // // // // // // // // //     const isCompFeeding = data.complementaryFeeding === "1";

// // // // // // // // // // //     const sqlText = `
// // // // // // // // // // //       INSERT INTO mtc_child_master (
// // // // // // // // // // //         sam_no, admission_type_id, referred_by_id, admission_date, admission_time, 
// // // // // // // // // // //         child_full_name, dob, sex_id, guardian_name, relationship_id, mobile_number, 
// // // // // // // // // // //         parent_aadhaar_number, bpl_number, caste_id, bank_name, account_holder, 
// // // // // // // // // // //         account_number, ifsc_code, full_address, district_id, block_id, village, 
// // // // // // // // // // //         icds_project_id, anganwadi_id, admission_weight_kg, length_height_cm, 
// // // // // // // // // // //         muac_cm, z_score_sd, odema_id, breast_feeding_id, complementary_feeding, 
// // // // // // // // // // //         appetite_test_id
// // // // // // // // // // //       ) VALUES (
// // // // // // // // // // //         $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 
// // // // // // // // // // //         $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, 
// // // // // // // // // // //         $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, 
// // // // // // // // // // //         $31, $32
// // // // // // // // // // //       ) RETURNING registration_id;
// // // // // // // // // // //     `;

// // // // // // // // // // // // //     const values = [
// // // // // // // // // // // // //       data.samNumber, data.admissionType || null, data.referredBy || null, 
// // // // // // // // // // // // //       data.admissionDate, data.admissionTime, data.childName, data.dateOfBirth, 
// // // // // // // // // // // // //       data.sex || null, data.parentName, data.relationship || null, data.mobileNumber,
// // // // // // // // // // // // //       data.aadhaarNumber || null, data.bplNumber || null, data.caste || null, 
// // // // // // // // // // // // //       data.bankName || null, data.accountHolderName || null, data.accountNumber || null, 
// // // // // // // // // // // // //       data.ifscCode || null, data.address, data.district || null, data.block || null, 
// // // // // // // // // // // // //       data.village || null, data.icdsProject || null, data.anganwadiCenter || null, 
// // // // // // // // // // // // //       data.admissionWeight, data.admissionHeight, data.admissionMuac, data.zScore || null, 
// // // // // // // // // // // // //       data.admissionOdema || null, data.breastFeeding || null, isCompFeeding, 
// // // // // // // // // // // // //       data.appetiteTest || null
// // // // // // // // // // // // //     ];

// // // // // // // // // // // // //     const result = await query(sqlText, values);
    
// // // // // // // // // // // // //     return NextResponse.json({ success: true, id: result.rows[0].registration_id }, { status: 201 });
    
// // // // // // // // // // // // //   } catch (error) {
// // // // // // // // // // // // //     console.error('Child Registration DB Error:', error);
// // // // // // // // // // // // //     return NextResponse.json({ error: 'Failed to register child' }, { status: 500 });
// // // // // // // // // // // // //   }
// // // // // // // // // // // // // }


// // // // // // // // // // // import { NextResponse } from 'next/server';
// // // // // // // // // // // import { query } from '@/lib/db';

// // // // // // // // // // // export async function POST(request: Request) {
// // // // // // // // // // //   try {
// // // // // // // // // // //     const data = await request.json();
// // // // // // // // // // //     const isCompFeeding = data.complementaryFeeding === "1";

// // // // // // // // // // //     const sqlText = `
// // // // // // // // // // //       INSERT INTO mtc_child_master (
// // // // // // // // // // //         sam_no, admission_type_id, referred_by_id, admission_date, admission_time, 
// // // // // // // // // // //         child_full_name, dob, sex_id, guardian_name, relationship_id, mobile_number, 
// // // // // // // // // // //         parent_aadhaar_number, bpl_number, caste_id, bank_name, account_holder, 
// // // // // // // // // // //         account_number, ifsc_code, full_address, district_id, block_id, village, 
// // // // // // // // // // //         icds_project_id, anganwadi_id, admission_weight_kg, length_height_cm, 
// // // // // // // // // // //         muac_cm, z_score_sd, odema_id, breast_feeding_id, complementary_feeding, 
// // // // // // // // // // //         appetite_test_id, medical_complications
// // // // // // // // // // //       ) VALUES (
// // // // // // // // // // //         $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 
// // // // // // // // // // //         $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, 
// // // // // // // // // // //         $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, 
// // // // // // // // // // //         $31, $32, $33
// // // // // // // // // // //       ) RETURNING registration_id;
// // // // // // // // // // //     `;

// // // // // // // // // // //     const values = [
// // // // // // // // // // //       data.samNumber, data.admissionType || null, data.referredBy || null, 
// // // // // // // // // // //       data.admissionDate, data.admissionTime, data.childName, data.dateOfBirth, 
// // // // // // // // // // //       data.sex || null, data.parentName, data.relationship || null, data.mobileNumber,
// // // // // // // // // // //       data.aadhaarNumber || null, data.bplNumber || null, data.caste || null, 
// // // // // // // // // // //       data.bankName || null, data.accountHolderName || null, data.accountNumber || null, 
// // // // // // // // // // //       data.ifscCode || null, data.address, data.district || null, data.block || null, 
// // // // // // // // // // //       data.village || null, data.icdsProject || null, data.anganwadiCenter || null, 
// // // // // // // // // // //       data.admissionWeight, data.admissionHeight, data.admissionMuac, data.zScore || null, 
// // // // // // // // // // //       data.admissionOdema || null, data.breastFeeding || null, isCompFeeding, 
// // // // // // // // // // //       data.appetiteTest || null, 
// // // // // // // // // // //       data.medicalComplications || [] 
// // // // // // // // // // //     ];

// // // // // // // // // // //     const result = await query(sqlText, values);
    
// // // // // // // // // // //     return NextResponse.json({ success: true, id: result.rows[0].registration_id }, { status: 201 });
    
// // // // // // // // // // //   } catch (error) {
// // // // // // // // // // //     console.error('Child Registration DB Error:', error);
// // // // // // // // // // //     return NextResponse.json({ error: 'Failed to register child' }, { status: 500 });
// // // // // // // // // // //   }
// // // // // // // // // // // }

// // // // // // // // // // // // Add this below your existing export async function POST(...) {...}

// // // // // // // // // // // export async function GET() {
// // // // // // // // // // //   try {
// // // // // // // // // // //     // Fetch all children, ordered by the newest admissions first
// // // // // // // // // // //     const result = await query(`
// // // // // // // // // // //       SELECT 
// // // // // // // // // // //         registration_id, sam_no, child_full_name, guardian_name, 
// // // // // // // // // // //         dob, admission_weight_kg, length_height_cm, admission_date 
// // // // // // // // // // //       FROM mtc_child_master 
// // // // // // // // // // //       ORDER BY admission_date DESC, registration_id DESC
// // // // // // // // // // //     `);
    
// // // // // // // // // // //     // Map the database snake_case columns to match your frontend Child interface
// // // // // // // // // // //     const mappedData = result.rows.map(row => ({
// // // // // // // // // // //       id: row.registration_id.toString(),
// // // // // // // // // // //       recordNo: row.registration_id.toString(), // Using registration_id as the Record No
// // // // // // // // // // //       samNumber: row.sam_no || "",
// // // // // // // // // // //       childName: row.child_full_name || "",
// // // // // // // // // // //       parentName: row.guardian_name || "",
// // // // // // // // // // //       dateOfBirth: row.dob ? new Date(row.dob).toISOString().split('T')[0] : "",
// // // // // // // // // // //       admissionWeight: row.admission_weight_kg?.toString() || "-",
// // // // // // // // // // //       admissionHeight: row.length_height_cm?.toString() || "-",
// // // // // // // // // // //       createdAt: row.admission_date ? new Date(row.admission_date).toISOString() : new Date().toISOString()
// // // // // // // // // // //     }));

// // // // // // // // // // //     return NextResponse.json(mappedData);
// // // // // // // // // // //   } catch (error) {
// // // // // // // // // // //     console.error('Fetch Children List Error:', error);
// // // // // // // // // // //     return NextResponse.json({ error: 'Failed to fetch child list' }, { status: 500 });
// // // // // // // // // // //   }
// // // // // // // // // // // }

// // // // // // // // // // // export async function GET() {
// // // // // // // // // // //   try {
// // // // // // // // // // //     // We add WHERE discharge_date IS NULL so the DB only sends us active patients!
// // // // // // // // // // //     const sqlText = `
// // // // // // // // // // //       SELECT 
// // // // // // // // // // //         registration_id, 
// // // // // // // // // // //         sam_no, 
// // // // // // // // // // //         child_full_name, 
// // // // // // // // // // //         guardian_name, 
// // // // // // // // // // //         dob, 
// // // // // // // // // // //         admission_weight_kg, 
// // // // // // // // // // //         length_height_cm, 
// // // // // // // // // // //         admission_date,
// // // // // // // // // // //         discharge_date
// // // // // // // // // // //       FROM mtc_child_master
// // // // // // // // // // //       WHERE discharge_date IS NULL
// // // // // // // // // // //       ORDER BY admission_date DESC, registration_id DESC
// // // // // // // // // // //     `;
    
// // // // // // // // // // //     const result = await query(sqlText);
// // // // // // // // // // //     return NextResponse.json(result.rows, { status: 200 });

// // // // // // // // // // //   } catch (error) {
// // // // // // // // // // //     console.error('Database Error:', error);
// // // // // // // // // // //     return NextResponse.json({ error: 'Failed to fetch patients' }, { status: 500 });
// // // // // // // // // // //   }
// // // // // // // // // // // }

// // // // // // // // // // import { NextResponse } from 'next/server';
// // // // // // // // // // import { query } from '@/lib/db';

// // // // // // // // // // // --- POST: Register a new child ---
// // // // // // // // // // export async function POST(request: Request) {
// // // // // // // // // //   try {
// // // // // // // // // //     const data = await request.json();
    
// // // // // // // // // //     // Convert string boolean representation back to actual boolean
// // // // // // // // // //     const isCompFeeding = data.complementaryFeeding === "1";

// // // // // // // // // //     const sqlText = `
// // // // // // // // // //       INSERT INTO mtc_child_master (
// // // // // // // // // //         sam_no, admission_type_id, referred_by_id, admission_date, admission_time, 
// // // // // // // // // //         child_full_name, dob, sex_id, guardian_name, relationship_id, mobile_number, 
// // // // // // // // // //         parent_aadhaar_number, bpl_number, caste_id, bank_name, account_holder, 
// // // // // // // // // //         account_number, ifsc_code, full_address, district_id, block_id, village, 
// // // // // // // // // //         icds_project_id, anganwadi_id, admission_weight_kg, length_height_cm, 
// // // // // // // // // //         muac_cm, z_score_sd, odema_id, breast_feeding_id, complementary_feeding, 
// // // // // // // // // //         appetite_test_id, medical_complications
// // // // // // // // // //       ) VALUES (
// // // // // // // // // //         $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 
// // // // // // // // // //         $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, 
// // // // // // // // // //         $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, 
// // // // // // // // // //         $31, $32, $33
// // // // // // // // // //       ) RETURNING registration_id;
// // // // // // // // // //     `;

// // // // // // // // // //     const values = [
// // // // // // // // // //       data.samNumber, 
// // // // // // // // // //       data.admissionType || null, 
// // // // // // // // // //       data.referredBy || null, 
// // // // // // // // // //       data.admissionDate, 
// // // // // // // // // //       data.admissionTime, 
// // // // // // // // // //       data.childName, 
// // // // // // // // // //       data.dateOfBirth, 
// // // // // // // // // //       data.sex || null, 
// // // // // // // // // //       data.parentName, 
// // // // // // // // // //       data.relationship || null, 
// // // // // // // // // //       data.mobileNumber,
// // // // // // // // // //       data.aadhaarNumber || null, // FIX: Using actual variable instead of string that exceeds 12 chars
// // // // // // // // // //       data.bplNumber || null, 
// // // // // // // // // //       data.caste || null, 
// // // // // // // // // //       data.bankName || null, 
// // // // // // // // // //       data.accountHolderName || null, 
// // // // // // // // // //       data.accountNumber || null, 
// // // // // // // // // //       data.ifscCode || null, 
// // // // // // // // // //       data.address, 
// // // // // // // // // //       data.district || null, 
// // // // // // // // // //       data.block || null, 
// // // // // // // // // //       data.village || null, 
// // // // // // // // // //       data.icdsProject || null, 
// // // // // // // // // //       data.anganwadiCenter || null, 
// // // // // // // // // //       data.admissionWeight, 
// // // // // // // // // //       data.admissionHeight, 
// // // // // // // // // //       data.admissionMuac, 
// // // // // // // // // //       data.zScore || null, 
// // // // // // // // // //       data.admissionOdema || null, 
// // // // // // // // // //       data.breastFeeding || null, 
// // // // // // // // // //       isCompFeeding, 
// // // // // // // // // //       data.appetiteTest || null, 
// // // // // // // // // //       data.medicalComplications || [] 
// // // // // // // // // //     ];

// // // // // // // // // //     const result = await query(sqlText, values);
    
// // // // // // // // // //     return NextResponse.json({ success: true, id: result.rows[0].registration_id }, { status: 201 });
    
// // // // // // // // // //   } catch (error) {
// // // // // // // // // //     console.error('Child Registration DB Error:', error);
// // // // // // // // // //     return NextResponse.json({ error: 'Failed to register child' }, { status: 500 });
// // // // // // // // // //   }
// // // // // // // // // // }

// // // // // // // // // // // --- GET: Fetch only active (non-discharged) patients ---
// // // // // // // // // // export async function GET() {
// // // // // // // // // //   try {
// // // // // // // // // //     const sqlText = `
// // // // // // // // // //       SELECT 
// // // // // // // // // //         registration_id, 
// // // // // // // // // //         sam_no, 
// // // // // // // // // //         child_full_name, 
// // // // // // // // // //         guardian_name, 
// // // // // // // // // //         dob, 
// // // // // // // // // //         admission_weight_kg, 
// // // // // // // // // //         length_height_cm, 
// // // // // // // // // //         admission_date,
// // // // // // // // // //         discharge_date
// // // // // // // // // //       FROM mtc_child_master
// // // // // // // // // //       WHERE discharge_date IS NULL
// // // // // // // // // //       ORDER BY admission_date DESC, registration_id DESC
// // // // // // // // // //     `;
    
// // // // // // // // // //     const result = await query(sqlText);
    
// // // // // // // // // //     // Return the raw rows; the frontend component maps them to the interface
// // // // // // // // // //     return NextResponse.json(result.rows, { status: 200 });

// // // // // // // // // //   } catch (error) {
// // // // // // // // // //     console.error('Fetch Pending Discharges Error:', error);
// // // // // // // // // //     return NextResponse.json({ error: 'Failed to fetch patients' }, { status: 500 });
// // // // // // // // // //   }
// // // // // // // // // // }

// // // // // // // // // // // --- DELETE: Remove a child record (Required for the Trash Can icon in the list) ---
// // // // // // // // // // export async function DELETE(request: Request) {
// // // // // // // // // //   try {
// // // // // // // // // //     const { searchParams } = new URL(request.url);
// // // // // // // // // //     const id = searchParams.get('id');

// // // // // // // // // //     if (!id) {
// // // // // // // // // //        return NextResponse.json({ error: 'Registration ID is required for deletion' }, { status: 400 });
// // // // // // // // // //     }

// // // // // // // // // //     const sqlText = `
// // // // // // // // // //       DELETE FROM mtc_child_master 
// // // // // // // // // //       WHERE registration_id = $1 
// // // // // // // // // //       RETURNING registration_id
// // // // // // // // // //     `;
    
// // // // // // // // // //     const result = await query(sqlText, [id]);

// // // // // // // // // //     if (result.rowCount === 0) {
// // // // // // // // // //       return NextResponse.json({ error: 'Record not found' }, { status: 404 });
// // // // // // // // // //     }

// // // // // // // // // //     return NextResponse.json({ success: true, message: 'Record deleted successfully' }, { status: 200 });

// // // // // // // // // //   } catch (error) {
// // // // // // // // // //     console.error('Delete Record Error:', error);
// // // // // // // // // //     return NextResponse.json({ error: 'Failed to delete record' }, { status: 500 });
// // // // // // // // // //   }
// // // // // // // // // // }

// // // // // // // // // import { NextResponse } from 'next/server';
// // // // // // // // // import { query } from '@/lib/db';

// // // // // // // // // // --- GET: Fetch all active (non-discharged) patients ---
// // // // // // // // // export async function GET() {
// // // // // // // // //   try {
// // // // // // // // //     const sqlText = `
// // // // // // // // //       SELECT 
// // // // // // // // //         registration_id, 
// // // // // // // // //         sam_no, 
// // // // // // // // //         child_full_name, 
// // // // // // // // //         guardian_name, 
// // // // // // // // //         dob, 
// // // // // // // // //         admission_weight_kg, 
// // // // // // // // //         length_height_cm, 
// // // // // // // // //         admission_date,
// // // // // // // // //         discharge_date
// // // // // // // // //       FROM mtc_child_master
// // // // // // // // //       WHERE discharge_date IS NULL
// // // // // // // // //       ORDER BY admission_date DESC, registration_id DESC
// // // // // // // // //     `;
    
// // // // // // // // //     const result = await query(sqlText);
// // // // // // // // //     return NextResponse.json(result.rows, { status: 200 });

// // // // // // // // //   } catch (error) {
// // // // // // // // //     console.error('Fetch Pending Discharges Error:', error);
// // // // // // // // //     return NextResponse.json({ error: 'Failed to fetch patients' }, { status: 500 });
// // // // // // // // //   }
// // // // // // // // // }

// // // // // // // // // // --- POST: Save a newly registered child ---
// // // // // // // // // export async function POST(request: Request) {
// // // // // // // // //   try {
// // // // // // // // //     const data = await request.json();
    
// // // // // // // // //     // Convert string boolean representation back to actual boolean
// // // // // // // // //     const isCompFeeding = data.complementaryFeeding === "1";

// // // // // // // // //     // --- CHANGED: This perfectly formats the Array for PostgreSQL ---
// // // // // // // // //     let complicationsFormatted = null;
// // // // // // // // //     if (Array.isArray(data.medicalComplications) && data.medicalComplications.length > 0) {
// // // // // // // // //       complicationsFormatted = `{${data.medicalComplications.map((c: string) => `"${c.replace(/"/g, '""')}"`).join(',')}}`;
// // // // // // // // //     }
// // // // // // // // //     // ---------------------------------------------------------------

// // // // // // // // //     const sqlText = `
// // // // // // // // //       INSERT INTO mtc_child_master (
// // // // // // // // //         sam_no, admission_type_id, referred_by_id, referred_by_name, referred_by_mobile,
// // // // // // // // //         admission_date, admission_time, child_full_name, dob, age_years, age_months,
// // // // // // // // //         sex_id, guardian_name, relationship_id, mobile_number, parent_aadhaar_number, 
// // // // // // // // //         bpl_number, caste_id, bank_name, account_holder, account_number, ifsc_code, 
// // // // // // // // //         full_address, district_id, block_id, village, icds_project_id, anganwadi_id, 
// // // // // // // // //         admission_weight_kg, length_height_cm, muac_cm, z_score_sd, odema_id, 
// // // // // // // // //         breast_feeding_id, complementary_feeding, appetite_test_id, medical_complications
// // // // // // // // //       ) VALUES (
// // // // // // // // //         $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 
// // // // // // // // //         $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, 
// // // // // // // // //         $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, 
// // // // // // // // //         $31, $32, $33, $34, $35, $36, $37
// // // // // // // // //       ) RETURNING registration_id;
// // // // // // // // //     `;

// // // // // // // // //     const values = [
// // // // // // // // //       data.samNumber, 
// // // // // // // // //       data.admissionType ? parseInt(data.admissionType) : null, 
// // // // // // // // //       data.referredBy ? parseInt(data.referredBy) : null, 
// // // // // // // // //       data.referredByName || null,
// // // // // // // // //       data.referredByMobile || null,
// // // // // // // // //       data.admissionDate || null, 
// // // // // // // // //       data.admissionTime || null, 
// // // // // // // // //       data.childName || null, 
// // // // // // // // //       data.dateOfBirth || null, 
// // // // // // // // //       data.ageYears !== "" ? parseInt(data.ageYears) : null,
// // // // // // // // //       data.ageMonths !== "" ? parseInt(data.ageMonths) : null,
// // // // // // // // //       data.sex ? parseInt(data.sex) : null, 
// // // // // // // // //       data.parentName || null, 
// // // // // // // // //       data.relationship ? parseInt(data.relationship) : null, 
// // // // // // // // //       data.mobileNumber || null,
// // // // // // // // //       data.aadhaarNumber || null, 
// // // // // // // // //       data.bplNumber || null, 
// // // // // // // // //       data.caste ? parseInt(data.caste) : null, 
// // // // // // // // //       data.bankName || null, 
// // // // // // // // //       data.accountHolderName || null, 
// // // // // // // // //       data.accountNumber || null, 
// // // // // // // // //       data.ifscCode || null, 
// // // // // // // // //       data.address || null, 
// // // // // // // // //       data.district ? parseInt(data.district) : null, 
// // // // // // // // //       data.block ? parseInt(data.block) : null, 
// // // // // // // // //       data.village || null, 
// // // // // // // // //       data.icdsProject ? parseInt(data.icdsProject) : null, 
// // // // // // // // //       data.anganwadiCenter ? parseInt(data.anganwadiCenter) : null, 
// // // // // // // // //       data.admissionWeight ? parseFloat(data.admissionWeight) : null, 
// // // // // // // // //       data.admissionHeight ? parseFloat(data.admissionHeight) : null, 
// // // // // // // // //       data.admissionMuac ? parseFloat(data.admissionMuac) : null, 
// // // // // // // // //       data.zScore ? parseFloat(data.zScore) : null, 
// // // // // // // // //       data.admissionOdema ? parseInt(data.admissionOdema) : null, 
// // // // // // // // //       data.breastFeeding ? parseInt(data.breastFeeding) : null, 
// // // // // // // // //       isCompFeeding, 
// // // // // // // // //       data.appetiteTest ? parseInt(data.appetiteTest) : null,
// // // // // // // // //       complicationsFormatted // <-- Sending the correctly formatted array here!
// // // // // // // // //     ];

// // // // // // // // //     const result = await query(sqlText, values);
    
// // // // // // // // //     return NextResponse.json({ success: true, id: result.rows[0].registration_id }, { status: 201 });
    
// // // // // // // // //   } catch (error) {
// // // // // // // // //     console.error('Child Registration DB Error:', error);
// // // // // // // // //     return NextResponse.json({ error: 'Failed to register child' }, { status: 500 });
// // // // // // // // //   }
// // // // // // // // // }

// // // // // // // // // // --- DELETE: Remove a child record ---
// // // // // // // // // export async function DELETE(request: Request) {
// // // // // // // // //   try {
// // // // // // // // //     const { searchParams } = new URL(request.url);
// // // // // // // // //     const id = searchParams.get('id');

// // // // // // // // //     if (!id) {
// // // // // // // // //        return NextResponse.json({ error: 'Registration ID is required for deletion' }, { status: 400 });
// // // // // // // // //     }

// // // // // // // // //     const sqlText = `
// // // // // // // // //       DELETE FROM mtc_child_master 
// // // // // // // // //       WHERE registration_id = $1 
// // // // // // // // //       RETURNING registration_id
// // // // // // // // //     `;
    
// // // // // // // // //     const result = await query(sqlText, [id]);

// // // // // // // // //     if (result.rowCount === 0) {
// // // // // // // // //       return NextResponse.json({ error: 'Record not found' }, { status: 404 });
// // // // // // // // //     }

// // // // // // // // //     return NextResponse.json({ success: true, message: 'Record deleted successfully' }, { status: 200 });

// // // // // // // // //   } catch (error) {
// // // // // // // // //     console.error('Delete Record Error:', error);
// // // // // // // // //     return NextResponse.json({ error: 'Failed to delete record' }, { status: 500 });
// // // // // // // // //   }
// // // // // // // // // }

// // // // // // // // import { NextResponse } from 'next/server';
// // // // // // // // import { query } from '@/lib/db';

// // // // // // // // // --- GET: Fetch all active (non-discharged) patients ---
// // // // // // // // export async function GET() {
// // // // // // // //   try {
// // // // // // // //     const sqlText = `
// // // // // // // //       SELECT 
// // // // // // // //         registration_id, 
// // // // // // // //         sam_no, 
// // // // // // // //         child_full_name, 
// // // // // // // //         guardian_name, 
// // // // // // // //         dob, 
// // // // // // // //         admission_weight_kg, 
// // // // // // // //         length_height_cm, 
// // // // // // // //         admission_date,
// // // // // // // //         discharge_date
// // // // // // // //       FROM mtc_child_master
// // // // // // // //       WHERE discharge_date IS NULL
// // // // // // // //       ORDER BY admission_date DESC, registration_id DESC
// // // // // // // //     `;
    
// // // // // // // //     const result = await query(sqlText);
// // // // // // // //     return NextResponse.json(result.rows, { status: 200 });

// // // // // // // //   } catch (error) {
// // // // // // // //     console.error('Fetch Pending Discharges Error:', error);
// // // // // // // //     return NextResponse.json({ error: 'Failed to fetch patients' }, { status: 500 });
// // // // // // // //   }
// // // // // // // // }

// // // // // // // // // --- POST: Save a newly registered child ---
// // // // // // // // export async function POST(request: Request) {
// // // // // // // //   try {
// // // // // // // //     const data = await request.json();
    
// // // // // // // //     const isCompFeeding = data.complementaryFeeding === "1";

// // // // // // // //     // Format the Medical Complications Array specifically for PostgreSQL
// // // // // // // //     let complicationsFormatted = null;
// // // // // // // //     if (Array.isArray(data.medicalComplications) && data.medicalComplications.length > 0) {
// // // // // // // //       complicationsFormatted = `{${data.medicalComplications.map((c: string) => `"${c.replace(/"/g, '""')}"`).join(',')}}`;
// // // // // // // //     }

// // // // // // // //     const sqlText = `
// // // // // // // //       INSERT INTO mtc_child_master (
// // // // // // // //         sam_no, admission_type_id, referred_by_id, referred_by_name, referred_by_mobile,
// // // // // // // //         admission_date, admission_time, child_full_name, dob, age_years, age_months,
// // // // // // // //         sex_id, guardian_name, relationship_id, mobile_number, parent_aadhaar_number, 
// // // // // // // //         bpl_number, caste_id, bank_name, account_holder, account_number, ifsc_code, 
// // // // // // // //         full_address, district_id, block_id, village, icds_project_id, anganwadi_id, 
// // // // // // // //         admission_weight_kg, length_height_cm, muac_cm, z_score_sd, odema_id, 
// // // // // // // //         breast_feeding_id, complementary_feeding, appetite_test_id, medical_complications
// // // // // // // //       ) VALUES (
// // // // // // // //         $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 
// // // // // // // //         $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, 
// // // // // // // //         $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, 
// // // // // // // //         $31, $32, $33, $34, $35, $36, $37
// // // // // // // //       ) RETURNING registration_id;
// // // // // // // //     `;

// // // // // // // //     const values = [
// // // // // // // //       data.samNumber, 
// // // // // // // //       data.admissionType ? parseInt(data.admissionType) : null, 
// // // // // // // //       data.referredBy ? parseInt(data.referredBy) : null, 
// // // // // // // //       data.referredByName || null,
// // // // // // // //       data.referredByMobile || null,
// // // // // // // //       data.admissionDate || null, 
// // // // // // // //       data.admissionTime || null, 
// // // // // // // //       data.childName || null, 
// // // // // // // //       data.dateOfBirth || null, 
// // // // // // // //       data.ageYears !== "" && data.ageYears !== undefined ? parseInt(data.ageYears) : null,
// // // // // // // //       data.ageMonths !== "" && data.ageMonths !== undefined ? parseInt(data.ageMonths) : null,
// // // // // // // //       data.sex ? parseInt(data.sex) : null, 
// // // // // // // //       data.parentName || null, 
// // // // // // // //       data.relationship ? parseInt(data.relationship) : null, 
// // // // // // // //       data.mobileNumber || null,
// // // // // // // //       data.aadhaarNumber || null, 
// // // // // // // //       data.bplNumber || null, 
// // // // // // // //       data.caste ? parseInt(data.caste) : null, 
// // // // // // // //       data.bankName || null, 
// // // // // // // //       data.accountHolderName || null, 
// // // // // // // //       data.accountNumber || null, 
// // // // // // // //       data.ifscCode || null, 
// // // // // // // //       data.address || null, 
// // // // // // // //       data.district ? parseInt(data.district) : null, 
// // // // // // // //       data.block ? parseInt(data.block) : null, 
// // // // // // // //       data.village || null, 
// // // // // // // //       data.icdsProject ? parseInt(data.icdsProject) : null, 
// // // // // // // //       data.anganwadiCenter ? parseInt(data.anganwadiCenter) : null, 
// // // // // // // //       data.admissionWeight ? parseFloat(data.admissionWeight) : null, 
// // // // // // // //       data.admissionHeight ? parseFloat(data.admissionHeight) : null, 
// // // // // // // //       data.admissionMuac ? parseFloat(data.admissionMuac) : null, 
// // // // // // // //       data.zScore ? parseFloat(data.zScore) : null, 
// // // // // // // //       data.admissionOdema ? parseInt(data.admissionOdema) : null, 
// // // // // // // //       data.breastFeeding ? parseInt(data.breastFeeding) : null, 
// // // // // // // //       isCompFeeding, 
// // // // // // // //       data.appetiteTest ? parseInt(data.appetiteTest) : null,
// // // // // // // //       complicationsFormatted // Pass the formatted PostgreSQL Array
// // // // // // // //     ];

// // // // // // // //     const result = await query(sqlText, values);
    
// // // // // // // //     return NextResponse.json({ success: true, id: result.rows[0].registration_id }, { status: 201 });
    
// // // // // // // //   } catch (error) {
// // // // // // // //     console.error('Child Registration DB Error:', error);
// // // // // // // //     return NextResponse.json({ error: 'Failed to register child' }, { status: 500 });
// // // // // // // //   }
// // // // // // // // }

// // // // // // // // // --- DELETE: Remove a child record ---
// // // // // // // // export async function DELETE(request: Request) {
// // // // // // // //   try {
// // // // // // // //     const { searchParams } = new URL(request.url);
// // // // // // // //     const id = searchParams.get('id');

// // // // // // // //     if (!id) {
// // // // // // // //        return NextResponse.json({ error: 'Registration ID is required for deletion' }, { status: 400 });
// // // // // // // //     }

// // // // // // // //     const sqlText = `
// // // // // // // //       DELETE FROM mtc_child_master 
// // // // // // // //       WHERE registration_id = $1 
// // // // // // // //       RETURNING registration_id
// // // // // // // //     `;
    
// // // // // // // //     const result = await query(sqlText, [id]);

// // // // // // // //     if (result.rowCount === 0) {
// // // // // // // //       return NextResponse.json({ error: 'Record not found' }, { status: 404 });
// // // // // // // //     }

// // // // // // // //     return NextResponse.json({ success: true, message: 'Record deleted successfully' }, { status: 200 });

// // // // // // // //   } catch (error) {
// // // // // // // //     console.error('Delete Record Error:', error);
// // // // // // // //     return NextResponse.json({ error: 'Failed to delete record' }, { status: 500 });
// // // // // // // //   }
// // // // // // // // }

// // // // // // // import { NextResponse } from 'next/server';
// // // // // // // import { query } from '@/lib/db';

// // // // // // // export const dynamic = 'force-dynamic';

// // // // // // // // --- SAFE NUMBER PARSING HELPER ---
// // // // // // // // Prevents `NaN` errors when inserting empty/hidden fields into PostgreSQL
// // // // // // // const parseNum = (val: any, isFloat = false) => {
// // // // // // //   if (val === null || val === undefined || val === "") return null;
// // // // // // //   const parsed = isFloat ? parseFloat(val) : parseInt(val, 10);
// // // // // // //   return isNaN(parsed) ? null : parsed;
// // // // // // // };

// // // // // // // // --- GET: Fetch all active (non-discharged) patients ---
// // // // // // // export async function GET() {
// // // // // // //   try {
// // // // // // //     const sqlText = `
// // // // // // //       SELECT 
// // // // // // //         registration_id, sam_no, child_full_name, mother_name, guardian_name, 
// // // // // // //         TO_CHAR(dob, 'YYYY-MM-DD') as dob, admission_weight_kg, length_height_cm, 
// // // // // // //         TO_CHAR(admission_date, 'YYYY-MM-DD') as admission_date, discharge_date
// // // // // // //       FROM mtc_child_master
// // // // // // //       WHERE discharge_date IS NULL
// // // // // // //       ORDER BY admission_date DESC, registration_id DESC
// // // // // // //     `;
// // // // // // //     const result = await query(sqlText);
// // // // // // //     return NextResponse.json(result.rows, { status: 200 });
// // // // // // //   } catch (error) {
// // // // // // //     console.error('Fetch Patients Error:', error);
// // // // // // //     return NextResponse.json({ error: 'Failed to fetch patients' }, { status: 500 });
// // // // // // //   }
// // // // // // // }

// // // // // // // // --- POST: Save a newly registered child ---
// // // // // // // export async function POST(request: Request) {
// // // // // // //   try {
// // // // // // //     const data = await request.json();
    
// // // // // // //     // Format Complementary Feeding back to a boolean
// // // // // // //     const isCompFeeding = data.complementaryFeeding === "1";

// // // // // // //     // Format the Medical Complications Array specifically for PostgreSQL
// // // // // // //     let complicationsFormatted = null;
// // // // // // //     if (Array.isArray(data.medicalComplications) && data.medicalComplications.length > 0) {
// // // // // // //       complicationsFormatted = `{${data.medicalComplications.map((c: string) => `"${c.replace(/"/g, '""')}"`).join(',')}}`;
// // // // // // //     }

// // // // // // //     const sqlText = `
// // // // // // //       INSERT INTO mtc_child_master (
// // // // // // //         sam_no, admission_type_id, referred_by_id, referred_by_name, referred_by_mobile,
// // // // // // //         admission_date, admission_time, child_full_name, mother_name, dob, age_years, age_months,
// // // // // // //         sex_id, guardian_name, relationship_id, mobile_number, parent_aadhaar_number, 
// // // // // // //         bpl_number, caste_id, bank_name, account_holder, account_number, ifsc_code, 
// // // // // // //         full_address, district_id, block_id, village, icds_project_id, anganwadi_id, 
// // // // // // //         admission_weight_kg, length_height_cm, muac_cm, z_score_sd, odema_id, 
// // // // // // //         breast_feeding_id, complementary_feeding, appetite_test_id, medical_complications
// // // // // // //       ) VALUES (
// // // // // // //         $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 
// // // // // // //         $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, 
// // // // // // //         $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, 
// // // // // // //         $31, $32, $33, $34, $35, $36, $37, $38
// // // // // // //       ) RETURNING registration_id;
// // // // // // //     `;

// // // // // // //     // Safely mapping ALL 38 variables using the parseNum helper
// // // // // // //     const values = [
// // // // // // //       data.samNumber, 
// // // // // // //       parseNum(data.admissionType), 
// // // // // // //       parseNum(data.referredBy), 
// // // // // // //       data.referredByName || null,
// // // // // // //       data.referredByMobile || null,
// // // // // // //       data.admissionDate || null, 
// // // // // // //       data.admissionTime || null, 
// // // // // // //       data.childName || null, 
// // // // // // //       data.motherName || null, // <-- MOTHER NAME ADDED HERE
// // // // // // //       data.dateOfBirth || null, 
// // // // // // //       parseNum(data.ageYears),
// // // // // // //       parseNum(data.ageMonths),
// // // // // // //       parseNum(data.sex), 
// // // // // // //       data.parentName || null, 
// // // // // // //       parseNum(data.relationship), 
// // // // // // //       data.mobileNumber || null,
// // // // // // //       data.aadhaarNumber || null, 
// // // // // // //       data.bplNumber || null, 
// // // // // // //       parseNum(data.caste), 
// // // // // // //       data.bankName || null, 
// // // // // // //       data.accountHolderName || null, 
// // // // // // //       data.accountNumber || null, 
// // // // // // //       data.ifscCode || null, 
// // // // // // //       data.address || null, 
// // // // // // //       parseNum(data.district), 
// // // // // // //       parseNum(data.block), 
// // // // // // //       data.village || null, 
// // // // // // //       parseNum(data.icdsProject), 
// // // // // // //       parseNum(data.anganwadiCenter), 
// // // // // // //       parseNum(data.admissionWeight, true), 
// // // // // // //       parseNum(data.admissionHeight, true), 
// // // // // // //       parseNum(data.admissionMuac, true), // Safely handles null when hidden
// // // // // // //       parseNum(data.zScore, true), 
// // // // // // //       parseNum(data.admissionOdema), 
// // // // // // //       parseNum(data.breastFeeding), 
// // // // // // //       isCompFeeding, 
// // // // // // //       parseNum(data.appetiteTest),
// // // // // // //       complicationsFormatted
// // // // // // //     ];

// // // // // // //     const result = await query(sqlText, values);
    
// // // // // // //     return NextResponse.json({ success: true, id: result.rows[0].registration_id }, { status: 201 });
    
// // // // // // //   } catch (error) {
// // // // // // //     console.error('Child Registration DB Error:', error);
// // // // // // //     return NextResponse.json({ error: 'Failed to register child' }, { status: 500 });
// // // // // // //   }
// // // // // // // }

// // // // // // // // --- DELETE: Remove a child record ---
// // // // // // // export async function DELETE(request: Request) {
// // // // // // //   try {
// // // // // // //     const { searchParams } = new URL(request.url);
// // // // // // //     const id = searchParams.get('id');

// // // // // // //     if (!id) {
// // // // // // //        return NextResponse.json({ error: 'Registration ID is required for deletion' }, { status: 400 });
// // // // // // //     }

// // // // // // //     const sqlText = `
// // // // // // //       DELETE FROM mtc_child_master 
// // // // // // //       WHERE registration_id = $1 
// // // // // // //       RETURNING registration_id
// // // // // // //     `;
    
// // // // // // //     const result = await query(sqlText, [id]);

// // // // // // //     if (result.rowCount === 0) {
// // // // // // //       return NextResponse.json({ error: 'Record not found' }, { status: 404 });
// // // // // // //     }

// // // // // // //     return NextResponse.json({ success: true, message: 'Record deleted successfully' }, { status: 200 });

// // // // // // //   } catch (error) {
// // // // // // //     console.error('Delete Record Error:', error);
// // // // // // //     return NextResponse.json({ error: 'Failed to delete record' }, { status: 500 });
// // // // // // //   }
// // // // // // // }

// // // // // // import { NextResponse } from 'next/server';
// // // // // // import { query } from '@/lib/db';

// // // // // // export const dynamic = 'force-dynamic';

// // // // // // // --- SAFE NUMBER PARSING HELPER ---
// // // // // // // Prevents `NaN` errors when inserting empty/hidden fields into PostgreSQL
// // // // // // const parseNum = (val: any, isFloat = false) => {
// // // // // //   if (val === null || val === undefined || val === "") return null;
// // // // // //   const parsed = isFloat ? parseFloat(val) : parseInt(val, 10);
// // // // // //   return isNaN(parsed) ? null : parsed;
// // // // // // };

// // // // // // // --- GET: Fetch all active (non-discharged) patients ---
// // // // // // export async function GET() {
// // // // // //   try {
// // // // // //     const sqlText = `
// // // // // //       SELECT 
// // // // // //         registration_id, sam_no, child_full_name, mother_name, guardian_name, 
// // // // // //         TO_CHAR(dob, 'YYYY-MM-DD') as dob, admission_weight_kg, length_height_cm, 
// // // // // //         TO_CHAR(admission_date, 'YYYY-MM-DD') as admission_date, discharge_date
// // // // // //       FROM mtc_child_master
// // // // // //       WHERE discharge_date IS NULL
// // // // // //       ORDER BY admission_date DESC, registration_id DESC
// // // // // //     `;
// // // // // //     const result = await query(sqlText);
// // // // // //     return NextResponse.json(result.rows, { status: 200 });
// // // // // //   } catch (error) {
// // // // // //     console.error('Fetch Patients Error:', error);
// // // // // //     return NextResponse.json({ error: 'Failed to fetch patients' }, { status: 500 });
// // // // // //   }
// // // // // // }

// // // // // // // --- POST: Save a newly registered child ---
// // // // // // export async function POST(request: Request) {
// // // // // //   try {
// // // // // //     const data = await request.json();
    
// // // // // //     // Format Complementary Feeding back to a boolean
// // // // // //     const isCompFeeding = data.complementaryFeeding === "1";

// // // // // //     // Format the Medical Complications Array specifically for PostgreSQL
// // // // // //     let complicationsFormatted = null;
// // // // // //     if (Array.isArray(data.medicalComplications) && data.medicalComplications.length > 0) {
// // // // // //       complicationsFormatted = `{${data.medicalComplications.map((c: string) => `"${c.replace(/"/g, '""')}"`).join(',')}}`;
// // // // // //     }

// // // // // //     const sqlText = `
// // // // // //       INSERT INTO mtc_child_master (
// // // // // //         sam_no, admission_type_id, referred_by_id, referred_by_name, referred_by_mobile,
// // // // // //         admission_date, admission_time, child_full_name, mother_name, dob, age_years, age_months,
// // // // // //         sex_id, guardian_name, relationship_id, mobile_number, parent_aadhaar_number, 
// // // // // //         bpl_number, caste_id, bank_name, account_holder, account_number, ifsc_code, 
// // // // // //         full_address, district_id, block_id, village, icds_project_id, anganwadi_id, 
// // // // // //         admission_weight_kg, length_height_cm, muac_cm, z_score_sd, odema_id, 
// // // // // //         breast_feeding_id, complementary_feeding, appetite_test_id, medical_complications
// // // // // //       ) VALUES (
// // // // // //         $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 
// // // // // //         $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, 
// // // // // //         $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, 
// // // // // //         $31, $32, $33, $34, $35, $36, $37, $38
// // // // // //       ) RETURNING registration_id;
// // // // // //     `;

// // // // // //     // Safely mapping ALL 38 variables using the parseNum helper
// // // // // //     const values = [
// // // // // //       data.samNumber, 
// // // // // //       parseNum(data.admissionType), 
// // // // // //       parseNum(data.referredBy), 
// // // // // //       data.referredByName || null,
// // // // // //       data.referredByMobile || null,
// // // // // //       data.admissionDate || null, 
// // // // // //       data.admissionTime || null, 
// // // // // //       data.childName || null, 
// // // // // //       data.motherName || null, 
// // // // // //       data.dateOfBirth || null, 
// // // // // //       parseNum(data.ageYears),
// // // // // //       parseNum(data.ageMonths),
// // // // // //       parseNum(data.sex), 
// // // // // //       data.parentName || null, 
// // // // // //       parseNum(data.relationship), 
// // // // // //       data.mobileNumber || null,
// // // // // //       data.aadhaarNumber || null, 
// // // // // //       data.bplNumber || null, 
// // // // // //       parseNum(data.caste), 
// // // // // //       data.bankName || null, 
// // // // // //       data.accountHolderName || null, 
// // // // // //       data.accountNumber || null, 
// // // // // //       data.ifscCode || null, 
// // // // // //       data.address || null, 
// // // // // //       parseNum(data.district), 
// // // // // //       parseNum(data.block), 
// // // // // //       data.village || null, 
// // // // // //       parseNum(data.icdsProject), 
// // // // // //       parseNum(data.anganwadiCenter), 
// // // // // //       parseNum(data.admissionWeight, true), 
// // // // // //       parseNum(data.admissionHeight, true), 
// // // // // //       parseNum(data.admissionMuac, true), // Safely handles null when hidden
// // // // // //       parseNum(data.zScore, true), 
// // // // // //       parseNum(data.admissionOdema), 
// // // // // //       parseNum(data.breastFeeding), 
// // // // // //       isCompFeeding, 
// // // // // //       parseNum(data.appetiteTest),
// // // // // //       complicationsFormatted
// // // // // //     ];

// // // // // //     const result = await query(sqlText, values);
    
// // // // // //     return NextResponse.json({ success: true, id: result.rows[0].registration_id }, { status: 201 });
    
// // // // // //   } catch (error) {
// // // // // //     console.error('Child Registration DB Error:', error);
// // // // // //     return NextResponse.json({ error: 'Failed to register child' }, { status: 500 });
// // // // // //   }
// // // // // // }

// // // // // // // --- DELETE: Remove a child record ---
// // // // // // export async function DELETE(request: Request) {
// // // // // //   try {
// // // // // //     const { searchParams } = new URL(request.url);
// // // // // //     const id = searchParams.get('id');

// // // // // //     if (!id) {
// // // // // //        return NextResponse.json({ error: 'Registration ID is required for deletion' }, { status: 400 });
// // // // // //     }

// // // // // //     const sqlText = `
// // // // // //       DELETE FROM mtc_child_master 
// // // // // //       WHERE registration_id = $1 
// // // // // //       RETURNING registration_id
// // // // // //     `;
    
// // // // // //     const result = await query(sqlText, [id]);

// // // // // //     if (result.rowCount === 0) {
// // // // // //       return NextResponse.json({ error: 'Record not found' }, { status: 404 });
// // // // // //     }

// // // // // //     return NextResponse.json({ success: true, message: 'Record deleted successfully' }, { status: 200 });

// // // // // //   } catch (error) {
// // // // // //     console.error('Delete Record Error:', error);
// // // // // //     return NextResponse.json({ error: 'Failed to delete record' }, { status: 500 });
// // // // // //   }
// // // // // // }


// // // // // import { NextResponse } from 'next/server';
// // // // // import { query } from '@/lib/db';

// // // // // export const dynamic = 'force-dynamic';

// // // // // // --- SAFE NUMBER PARSING HELPER ---
// // // // // const parseNum = (val: any, isFloat = false) => {
// // // // //   if (val === null || val === undefined || val === "") return null;
// // // // //   const parsed = isFloat ? parseFloat(val) : parseInt(val, 10);
// // // // //   return isNaN(parsed) ? null : parsed;
// // // // // };

// // // // // // --- GET: Fetch all active patients ---
// // // // // export async function GET() {
// // // // //   try {
// // // // //     const sqlText = `
// // // // //       SELECT 
// // // // //         registration_id, sam_no, child_full_name, mother_name, guardian_name, 
// // // // //         TO_CHAR(dob, 'YYYY-MM-DD') as dob, admission_weight_kg, length_height_cm, 
// // // // //         TO_CHAR(admission_date, 'YYYY-MM-DD') as admission_date, discharge_date
// // // // //       FROM mtc_child_master
// // // // //       WHERE discharge_date IS NULL
// // // // //       ORDER BY admission_date DESC, registration_id DESC
// // // // //     `;
// // // // //     const result = await query(sqlText);
// // // // //     return NextResponse.json(result.rows, { status: 200 });
// // // // //   } catch (error) {
// // // // //     console.error('Fetch Patients Error:', error);
// // // // //     return NextResponse.json({ error: 'Failed to fetch patients' }, { status: 500 });
// // // // //   }
// // // // // }

// // // // // // --- POST: Save a newly registered child ---
// // // // // export async function POST(request: Request) {
// // // // //   try {
// // // // //     const data = await request.json();
    
// // // // //     const isCompFeeding = data.complementaryFeeding === "1";

// // // // //     // Format the Medical Complications Array (Safely wraps "OTHERS: [Text]" in quotes)
// // // // //     let complicationsFormatted = null;
// // // // //     if (Array.isArray(data.medicalComplications) && data.medicalComplications.length > 0) {
// // // // //       complicationsFormatted = `{${data.medicalComplications.map((c: string) => `"${c.replace(/"/g, '""')}"`).join(',')}}`;
// // // // //     }

// // // // //     const sqlText = `
// // // // //       INSERT INTO mtc_child_master (
// // // // //         sam_no, admission_type_id, referred_by_id, referred_by_name, referred_by_mobile,
// // // // //         admission_date, admission_time, child_full_name, mother_name, dob, age_years, age_months,
// // // // //         sex_id, guardian_name, relationship_id, mobile_number, parent_aadhaar_number, 
// // // // //         bpl_number, caste_id, bank_name, account_holder, account_number, ifsc_code, 
// // // // //         full_address, district_id, block_id, village, icds_project_id, anganwadi_id, 
// // // // //         admission_weight_kg, length_height_cm, muac_cm, z_score_sd, odema_id, 
// // // // //         breast_feeding_id, complementary_feeding, appetite_test_id, medical_complications
// // // // //       ) VALUES (
// // // // //         $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 
// // // // //         $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, 
// // // // //         $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, 
// // // // //         $31, $32, $33, $34, $35, $36, $37, $38
// // // // //       ) RETURNING registration_id;
// // // // //     `;

// // // // //     const values = [
// // // // //       data.samNumber, 
// // // // //       parseNum(data.admissionType), 
// // // // //       parseNum(data.referredBy), 
// // // // //       data.referredByName || null,
// // // // //       data.referredByMobile || null,
// // // // //       data.admissionDate || null, 
// // // // //       data.admissionTime || null, 
// // // // //       data.childName || null, 
// // // // //       data.motherName || null, 
// // // // //       data.dateOfBirth || null, 
// // // // //       parseNum(data.ageYears),
// // // // //       parseNum(data.ageMonths),
// // // // //       parseNum(data.sex), 
// // // // //       data.parentName || null, 
// // // // //       parseNum(data.relationship), 
// // // // //       data.mobileNumber || null,
// // // // //       data.aadhaarNumber || null, 
// // // // //       data.bplNumber || null, 
// // // // //       parseNum(data.caste), 
// // // // //       data.bankName || null, 
// // // // //       data.accountHolderName || null, 
// // // // //       data.accountNumber || null, 
// // // // //       data.ifscCode || null, 
// // // // //       data.address || null, 
// // // // //       parseNum(data.district), 
// // // // //       parseNum(data.block), 
// // // // //       data.village || null, 
// // // // //       parseNum(data.icdsProject), 
// // // // //       parseNum(data.anganwadiCenter), 
// // // // //       parseNum(data.admissionWeight, true), 
// // // // //       parseNum(data.admissionHeight, true), 
// // // // //       parseNum(data.admissionMuac, true), 
// // // // //       parseNum(data.zScore, true), 
// // // // //       parseNum(data.admissionOdema), 
// // // // //       parseNum(data.breastFeeding), 
// // // // //       isCompFeeding, 
// // // // //       parseNum(data.appetiteTest),
// // // // //       complicationsFormatted
// // // // //     ];

// // // // //     const result = await query(sqlText, values);
    
// // // // //     return NextResponse.json({ success: true, id: result.rows[0].registration_id }, { status: 201 });
    
// // // // //   } catch (error) {
// // // // //     console.error('Child Registration DB Error:', error);
// // // // //     return NextResponse.json({ error: 'Failed to register child' }, { status: 500 });
// // // // //   }
// // // // // }

// // // // // // --- DELETE: Remove a child record ---
// // // // // export async function DELETE(request: Request) {
// // // // //   try {
// // // // //     const { searchParams } = new URL(request.url);
// // // // //     const id = searchParams.get('id');

// // // // //     if (!id) return NextResponse.json({ error: 'Registration ID required' }, { status: 400 });

// // // // //     const sqlText = `DELETE FROM mtc_child_master WHERE registration_id = $1 RETURNING registration_id`;
// // // // //     const result = await query(sqlText, [id]);

// // // // //     if (result.rowCount === 0) return NextResponse.json({ error: 'Record not found' }, { status: 404 });
// // // // //     return NextResponse.json({ success: true, message: 'Record deleted successfully' }, { status: 200 });

// // // // //   } catch (error) {
// // // // //     return NextResponse.json({ error: 'Failed to delete record' }, { status: 500 });
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

// // // // // --- GET: Fetch all active patients ---
// // // // export async function GET(request: Request) {
// // // //   try {
// // // //     // Optional: If you want to filter patients by MTC ID in the future, you can read it from the URL
// // // //     const { searchParams } = new URL(request.url);
// // // //     const mtcId = searchParams.get('mtcId');

// // // //     let sqlText = `
// // // //       SELECT 
// // // //         registration_id, sam_no, child_full_name, mother_name, guardian_name, 
// // // //         TO_CHAR(dob, 'YYYY-MM-DD') as dob, admission_weight_kg, length_height_cm, 
// // // //         TO_CHAR(admission_date, 'YYYY-MM-DD') as admission_date, discharge_date
// // // //       FROM mtc_child_master
// // // //       WHERE discharge_date IS NULL
// // // //     `;
    
// // // //     const values: any[] = [];

// // // //     if (mtcId) {
// // // //       sqlText += ` AND mtc_id = $1`;
// // // //       values.push(parseNum(mtcId));
// // // //     }

// // // //     sqlText += ` ORDER BY admission_date DESC, registration_id DESC`;

// // // //     const result = await query(sqlText, values);
// // // //     return NextResponse.json(result.rows, { status: 200 });
// // // //   } catch (error) {
// // // //     console.error('Fetch Patients Error:', error);
// // // //     return NextResponse.json({ error: 'Failed to fetch patients' }, { status: 500 });
// // // //   }
// // // // }

// // // // // --- POST: Save a newly registered child ---
// // // // export async function POST(request: Request) {
// // // //   try {
// // // //     const data = await request.json();
    
// // // //     const isCompFeeding = data.complementaryFeeding === "1";

// // // //     // Format the Medical Complications Array (Safely wraps "OTHERS: [Text]" in quotes)
// // // //     let complicationsFormatted = null;
// // // //     if (Array.isArray(data.medicalComplications) && data.medicalComplications.length > 0) {
// // // //       complicationsFormatted = `{${data.medicalComplications.map((c: string) => `"${c.replace(/"/g, '""')}"`).join(',')}}`;
// // // //     }

// // // //     // ✅ ADDED mtc_id to the insert statement and $39 to the values list
// // // //     const sqlText = `
// // // //       INSERT INTO mtc_child_master (
// // // //         mtc_id, sam_no, admission_type_id, referred_by_id, referred_by_name, referred_by_mobile,
// // // //         admission_date, admission_time, child_full_name, mother_name, dob, age_years, age_months,
// // // //         sex_id, guardian_name, relationship_id, mobile_number, parent_aadhaar_number, 
// // // //         bpl_number, caste_id, bank_name, account_holder, account_number, ifsc_code, 
// // // //         full_address, district_id, block_id, village, icds_project_id, anganwadi_id, 
// // // //         admission_weight_kg, length_height_cm, muac_cm, z_score_sd, odema_id, 
// // // //         breast_feeding_id, complementary_feeding, appetite_test_id, medical_complications
// // // //       ) VALUES (
// // // //         $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 
// // // //         $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, 
// // // //         $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, 
// // // //         $31, $32, $33, $34, $35, $36, $37, $38, $39
// // // //       ) RETURNING registration_id;
// // // //     `;

// // // //     const values = [
// // // //       parseNum(data.mtcId), // ✅ Extracted from frontend payload as $1
// // // //       data.samNumber, 
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
// // // //       parseNum(data.admissionMuac, true), 
// // // //       parseNum(data.zScore, true), 
// // // //       parseNum(data.admissionOdema), 
// // // //       parseNum(data.breastFeeding), 
// // // //       isCompFeeding, 
// // // //       parseNum(data.appetiteTest),
// // // //       complicationsFormatted
// // // //     ];

// // // //     const result = await query(sqlText, values);
    
// // // //     return NextResponse.json({ success: true, id: result.rows[0].registration_id }, { status: 201 });
    
// // // //   } catch (error) {
// // // //     console.error('Child Registration DB Error:', error);
// // // //     return NextResponse.json({ error: 'Failed to register child' }, { status: 500 });
// // // //   }
// // // // }

// // // // // --- DELETE: Remove a child record ---
// // // // export async function DELETE(request: Request) {
// // // //   try {
// // // //     const { searchParams } = new URL(request.url);
// // // //     const id = searchParams.get('id');

// // // //     if (!id) return NextResponse.json({ error: 'Registration ID required' }, { status: 400 });

// // // //     const sqlText = `DELETE FROM mtc_child_master WHERE registration_id = $1 RETURNING registration_id`;
// // // //     const result = await query(sqlText, [id]);

// // // //     if (result.rowCount === 0) return NextResponse.json({ error: 'Record not found' }, { status: 404 });
// // // //     return NextResponse.json({ success: true, message: 'Record deleted successfully' }, { status: 200 });

// // // //   } catch (error) {
// // // //     return NextResponse.json({ error: 'Failed to delete record' }, { status: 500 });
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

// // // // --- GET: Fetch all active patients ---
// // // export async function GET(request: Request) {
// // //   try {
// // //     const { searchParams } = new URL(request.url);
// // //     const mtcId = searchParams.get('mtcId');

// // //     let sqlText = `
// // //       SELECT 
// // //         registration_id, sam_no, child_full_name, mother_name, guardian_name, 
// // //         TO_CHAR(dob, 'YYYY-MM-DD') as dob, admission_weight_kg, length_height_cm, 
// // //         TO_CHAR(admission_date, 'YYYY-MM-DD') as admission_date, discharge_date,
// // //         is_samar_registered, samar_uuid
// // //       FROM mtc_child_master
// // //       WHERE discharge_date IS NULL
// // //     `;
    
// // //     const values: any[] = [];

// // //     if (mtcId) {
// // //       sqlText += ` AND mtc_id = $1`;
// // //       values.push(parseInt(mtcId, 10));
// // //     }

// // //     sqlText += ` ORDER BY admission_date DESC, registration_id DESC`;

// // //     const result = await query(sqlText, values);
// // //     return NextResponse.json(result.rows, { status: 200 });
// // //   } catch (error) {
// // //     console.error('Fetch Patients Error:', error);
// // //     return NextResponse.json({ error: 'Failed to fetch patients' }, { status: 500 });
// // //   }
// // // }

// // // // --- POST: Save a newly registered child ---
// // // export async function POST(request: Request) {
// // //   try {
// // //     const data = await request.json();
    
// // //     const isCompFeeding = data.complementaryFeeding === "1";

// // //     let complicationsFormatted = null;
// // //     if (Array.isArray(data.medicalComplications) && data.medicalComplications.length > 0) {
// // //       complicationsFormatted = `{${data.medicalComplications.map((c: string) => `"${c.replace(/"/g, '""')}"`).join(',')}}`;
// // //     }

// // //     // Now includes is_samar_registered and samar_uuid
// // //     const sqlText = `
// // //       INSERT INTO mtc_child_master (
// // //         mtc_id, sam_no, is_samar_registered, samar_uuid, admission_type_id, referred_by_id, 
// // //         referred_by_name, referred_by_mobile, admission_date, admission_time, child_full_name, 
// // //         mother_name, dob, age_years, age_months, sex_id, guardian_name, relationship_id, 
// // //         mobile_number, parent_aadhaar_number, bpl_number, caste_id, bank_name, account_holder, 
// // //         account_number, ifsc_code, full_address, district_id, block_id, village, icds_project_id, 
// // //         anganwadi_id, admission_weight_kg, length_height_cm, muac_cm, z_score_sd, odema_id, 
// // //         breast_feeding_id, complementary_feeding, appetite_test_id, medical_complications
// // //       ) VALUES (
// // //         $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 
// // //         $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, 
// // //         $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, 
// // //         $31, $32, $33, $34, $35, $36, $37, $38, $39, $40, $41
// // //       ) RETURNING registration_id;
// // //     `;

// // //     const values = [
// // //       parseNum(data.mtcId), 
// // //       data.samNumber, 
// // //       data.isSamarRegistered || false, // SAAMAR Boolean
// // //       data.samarUuid || null,          // SAAMAR UUID
// // //       parseNum(data.admissionType), 
// // //       parseNum(data.referredBy), 
// // //       data.referredByName || null,
// // //       data.referredByMobile || null,
// // //       data.admissionDate || null, 
// // //       data.admissionTime || null, 
// // //       data.childName || null, 
// // //       data.motherName || null, 
// // //       data.dateOfBirth || null, 
// // //       parseNum(data.ageYears),
// // //       parseNum(data.ageMonths),
// // //       parseNum(data.sex), 
// // //       data.parentName || null, 
// // //       parseNum(data.relationship), 
// // //       data.mobileNumber || null,
// // //       data.aadhaarNumber || null, 
// // //       data.bplNumber || null, 
// // //       parseNum(data.caste), 
// // //       data.bankName || null, 
// // //       data.accountHolderName || null, 
// // //       data.accountNumber || null, 
// // //       data.ifscCode || null, 
// // //       data.address || null, 
// // //       parseNum(data.district), 
// // //       parseNum(data.block), 
// // //       data.village || null, 
// // //       parseNum(data.icdsProject), 
// // //       parseNum(data.anganwadiCenter), 
// // //       parseNum(data.admissionWeight, true), 
// // //       parseNum(data.admissionHeight, true), 
// // //       parseNum(data.admissionMuac, true), 
// // //       parseNum(data.zScore, true), 
// // //       parseNum(data.admissionOdema), 
// // //       parseNum(data.breastFeeding), 
// // //       isCompFeeding, 
// // //       parseNum(data.appetiteTest),
// // //       complicationsFormatted
// // //     ];

// // //     const result = await query(sqlText, values);
    
// // //     return NextResponse.json({ success: true, id: result.rows[0].registration_id }, { status: 201 });
    
// // //   } catch (error) {
// // //     console.error('Child Registration DB Error:', error);
// // //     return NextResponse.json({ error: 'Failed to register child' }, { status: 500 });
// // //   }
// // // }

// // // // --- DELETE: Remove a child record ---
// // // export async function DELETE(request: Request) {
// // //   try {
// // //     const { searchParams } = new URL(request.url);
// // //     const id = searchParams.get('id');

// // //     if (!id) return NextResponse.json({ error: 'Registration ID required' }, { status: 400 });

// // //     const sqlText = `DELETE FROM mtc_child_master WHERE registration_id = $1 RETURNING registration_id`;
// // //     const result = await query(sqlText, [id]);

// // //     if (result.rowCount === 0) return NextResponse.json({ error: 'Record not found' }, { status: 404 });
// // //     return NextResponse.json({ success: true, message: 'Record deleted successfully' }, { status: 200 });

// // //   } catch (error) {
// // //     return NextResponse.json({ error: 'Failed to delete record' }, { status: 500 });
// // //   }
// // // }

// // import { NextResponse } from 'next/server';
// // import { query } from '@/lib/db';

// // export const dynamic = 'force-dynamic';

// // const parseNum = (val: unknown, isFloat = false) => {
// //   if (val === null || val === undefined || val === "") return null;
// //   // Convert val to string safely for parsing
// //   const parsed = isFloat ? parseFloat(String(val)) : parseInt(String(val), 10);
// //   return isNaN(parsed) ? null : parsed;
// // };

// // // --- GET: Fetch all active patients ---
// // export async function GET(request: Request) {
// //   try {
// //     const { searchParams } = new URL(request.url);
// //     const mtcId = searchParams.get('mtcId');

// //     let sqlText = `
// //       SELECT 
// //         registration_id, sam_no, child_full_name, mother_name, guardian_name, 
// //         TO_CHAR(dob, 'YYYY-MM-DD') as dob, admission_weight_kg, length_height_cm, 
// //         TO_CHAR(admission_date, 'YYYY-MM-DD') as admission_date, discharge_date,
// //         is_samar_registered, samar_uuid
// //       FROM mtc_child_master
// //       WHERE discharge_date IS NULL
// //     `;
    
// //     const values: (string | number | boolean | null)[] = [];

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

// //     // Now includes is_samar_registered and samar_uuid
// //     const sqlText = `
// //       INSERT INTO mtc_child_master (
// //         mtc_id, sam_no, is_samar_registered, samar_uuid, admission_type_id, referred_by_id, 
// //         referred_by_name, referred_by_mobile, admission_date, admission_time, child_full_name, 
// //         mother_name, dob, age_years, age_months, sex_id, guardian_name, relationship_id, 
// //         mobile_number, parent_aadhaar_number, bpl_number, caste_id, bank_name, account_holder, 
// //         account_number, ifsc_code, full_address, district_id, block_id, village, icds_project_id, 
// //         anganwadi_id, admission_weight_kg, length_height_cm, muac_cm, z_score_sd, odema_id, 
// //         breast_feeding_id, complementary_feeding, appetite_test_id, medical_complications
// //       ) VALUES (
// //         $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 
// //         $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, 
// //         $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, 
// //         $31, $32, $33, $34, $35, $36, $37, $38, $39, $40, $41
// //       ) RETURNING registration_id;
// //     `;

// //     const values = [
// //       parseNum(data.mtcId), 
// //       data.samNumber, 
// //       data.isSamarRegistered || false, // SAAMAR Boolean
// //       data.samarUuid || null,          // SAAMAR UUID
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
// //     console.error('Delete Record Error:', error); // Resolves the unused variable warning
// //     return NextResponse.json({ error: 'Failed to delete record' }, { status: 500 });
// //   }
// // }


// import { NextResponse } from 'next/server';
// import { query } from '@/lib/db';

// export const dynamic = 'force-dynamic';

// const parseNum = (val: unknown, isFloat = false) => {
//   if (val === null || val === undefined || val === "") return null;
//   // Convert val to string safely for parsing
//   const parsed = isFloat ? parseFloat(String(val)) : parseInt(String(val), 10);
//   return isNaN(parsed) ? null : parsed;
// };

// // --- GET: Fetch all active patients ---
// export async function GET(request: Request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const mtcId = searchParams.get('mtcId');

//     let sqlText = `
//       SELECT 
//         registration_id, sam_no, child_full_name, mother_name, guardian_name, 
//         TO_CHAR(dob, 'YYYY-MM-DD') as dob, admission_weight_kg, length_height_cm, 
//         TO_CHAR(admission_date, 'YYYY-MM-DD') as admission_date, discharge_date,
//         is_samar_registered, samar_uuid
//       FROM mtc_child_master
//       WHERE discharge_date IS NULL
//     `;
    
//     const values: (string | number | boolean | null)[] = [];

//     if (mtcId) {
//       sqlText += ` AND mtc_id = $1`;
//       values.push(parseInt(mtcId, 10));
//     }

//     sqlText += ` ORDER BY admission_date DESC, registration_id DESC`;

//     const result = await query(sqlText, values);
//     return NextResponse.json(result.rows, { status: 200 });
//   } catch (error) {
//     console.error('Fetch Patients Error:', error);
//     return NextResponse.json({ error: 'Failed to fetch patients' }, { status: 500 });
//   }
// }

// // --- POST: Save a newly registered child ---
// export async function POST(request: Request) {
//   try {
//     const data = await request.json();
    
//     const isCompFeeding = data.complementaryFeeding === "1";

//     let complicationsFormatted = null;
//     if (Array.isArray(data.medicalComplications) && data.medicalComplications.length > 0) {
//       complicationsFormatted = `{${data.medicalComplications.map((c: string) => `"${c.replace(/"/g, '""')}"`).join(',')}}`;
//     }

//     // Now includes is_samar_registered and samar_uuid
//     const sqlText = `
//       INSERT INTO mtc_child_master (
//         mtc_id, sam_no, is_samar_registered, samar_uuid, admission_type_id, referred_by_id, 
//         referred_by_name, referred_by_mobile, admission_date, admission_time, child_full_name, 
//         mother_name, dob, age_years, age_months, sex_id, guardian_name, relationship_id, 
//         mobile_number, parent_aadhaar_number, bpl_number, caste_id, bank_name, account_holder, 
//         account_number, ifsc_code, full_address, district_id, block_id, village, icds_project_id, 
//         anganwadi_id, admission_weight_kg, length_height_cm, muac_cm, z_score_sd, odema_id, 
//         breast_feeding_id, complementary_feeding, appetite_test_id, medical_complications
//       ) VALUES (
//         $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 
//         $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, 
//         $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, 
//         $31, $32, $33, $34, $35, $36, $37, $38, $39, $40, $41
//       ) RETURNING registration_id;
//     `;

//     const values = [
//       parseNum(data.mtcId), 
//       data.samNumber, 
//       data.isSamarRegistered || false, // SAAMAR Boolean
//       data.samarUuid || null,          // SAAMAR UUID
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
//       complicationsFormatted
//     ];

//     const result = await query(sqlText, values);
    
//     return NextResponse.json({ success: true, id: result.rows[0].registration_id }, { status: 201 });
    
//   } catch (error) {
//     console.error('Child Registration DB Error:', error);
//     return NextResponse.json({ error: 'Failed to register child' }, { status: 500 });
//   }
// }

// // --- DELETE: Remove a child record ---
// export async function DELETE(request: Request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const id = searchParams.get('id');

//     if (!id) return NextResponse.json({ error: 'Registration ID required' }, { status: 400 });

//     const sqlText = `DELETE FROM mtc_child_master WHERE registration_id = $1 RETURNING registration_id`;
//     const result = await query(sqlText, [id]);

//     if (result.rowCount === 0) return NextResponse.json({ error: 'Record not found' }, { status: 404 });
//     return NextResponse.json({ success: true, message: 'Record deleted successfully' }, { status: 200 });

//   } catch (error) {
//     console.error('Delete Record Error:', error); // Resolves the unused variable warning
//     return NextResponse.json({ error: 'Failed to delete record' }, { status: 500 });
//   }
// }

import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

const parseNum = (val: unknown, isFloat = false) => {
  if (val === null || val === undefined || val === "") return null;
  const parsed = isFloat ? parseFloat(String(val)) : parseInt(String(val), 10);
  return isNaN(parsed) ? null : parsed;
};

// --- GET: Fetch all active patients ---
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const mtcId = searchParams.get('mtcId');

    let sqlText = `
      SELECT 
        registration_id, sam_no, child_full_name, mother_name, guardian_name, 
        TO_CHAR(dob, 'YYYY-MM-DD') as dob, admission_weight_kg, length_height_cm, 
        TO_CHAR(admission_date, 'YYYY-MM-DD') as admission_date, discharge_date,
        is_samar_registered, samar_uuid
      FROM mtc_child_master
      WHERE discharge_date IS NULL
    `;
    
    const values: (string | number | boolean | null)[] = [];

    if (mtcId) {
      sqlText += ` AND mtc_id = $1`;
      values.push(parseInt(mtcId, 10));
    }

    sqlText += ` ORDER BY admission_date DESC, registration_id DESC`;

    const result = await query(sqlText, values);
    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    console.error('Fetch Patients Error:', error);
    return NextResponse.json({ error: 'Failed to fetch patients' }, { status: 500 });
  }
}

// --- POST: Save a newly registered child ---
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const isCompFeeding = data.complementaryFeeding === "1";

    const sqlText = `
      INSERT INTO mtc_child_master (
        mtc_id, sam_no, is_samar_registered, samar_uuid, admission_type_id, referred_by_id, 
        referred_by_name, referred_by_mobile, admission_date, admission_time, child_full_name, 
        mother_name, dob, age_years, age_months, sex_id, guardian_name, relationship_id, 
        mobile_number, parent_aadhaar_number, bpl_number, caste_id, bank_name, account_holder, 
        account_number, ifsc_code, full_address, district_id, block_id, village, icds_project_id, 
        anganwadi_id, admission_weight_kg, length_height_cm, muac_cm, z_score_sd, odema_id, 
        breast_feeding_id, complementary_feeding, appetite_test_id, medical_complications
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 
        $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, 
        $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, 
        $31, $32, $33, $34, $35, $36, $37, $38, $39, $40, $41
      ) RETURNING registration_id;
    `;

    const values = [
      parseNum(data.mtcId), 
      data.samNumber, 
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
      Array.isArray(data.medicalComplications) ? data.medicalComplications : null
    ];

    const result = await query(sqlText, values);
    return NextResponse.json({ success: true, id: result.rows[0].registration_id }, { status: 201 });
    
  } catch (error) {
    console.error('Child Registration DB Error:', error);
    const databaseErrorMessage = error instanceof Error ? error.message : 'Unknown database fault';
    return NextResponse.json({ error: `Failed to register child: ${databaseErrorMessage}` }, { status: 500 });
  }
}

// --- DELETE: Remove a child record ---
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ error: 'Registration ID required' }, { status: 400 });

    const sqlText = `DELETE FROM mtc_child_master WHERE registration_id = $1 RETURNING registration_id`;
    const result = await query(sqlText, [id]);

    if (result.rowCount === 0) return NextResponse.json({ error: 'Record not found' }, { status: 404 });
    return NextResponse.json({ success: true, message: 'Record deleted successfully' }, { status: 200 });

  } catch (error) {
    console.error('Delete Record Error:', error);
    return NextResponse.json({ error: 'Failed to delete record' }, { status: 500 });
  }
}