
import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Map your frontend object to database columns
    const sqlText = `
      INSERT INTO mtc_child_master (
        record_no, sam_number, admission_type_id, referred_by_id, referred_by_name, 
        referred_by_mobile, child_name, parent_name, relationship_id, mobile_number, 
        bpl_number, date_of_birth, sex_id, address, caste_id, district_id, block_id, 
        village, icds_project_id, anganwadi_center_id, national_id_number, bank_name, 
        account_holder_name, account_number, ifsc_code, admission_date, admission_time, 
        admission_weight, admission_height, z_score, admission_odema_id, admission_muac, 
        breast_feeding_id, complementary_feeding_id, appetite_test_id, complications, other_complication
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 
        $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, 
        $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, 
        $31, $32, $33, $34, $35, $36, $37
      ) RETURNING id;
    `;

    const values = [
      data.recordNo, data.samNumber, data.admissionType || null, data.referredBy || null, data.referredByName,
      data.referredByMobile, data.childName, data.parentName, data.relationship || null, data.mobileNumber,
      data.bplNumber, data.dateOfBirth, data.sex || null, data.address, data.caste || null, data.district || null, data.block || null,
      data.village, data.icdsProject || null, data.anganwadiCenter || null, data.aadhaarNumber, data.bankName,
      data.accountHolderName, data.accountNumber, data.ifscCode, data.admissionDate, data.admissionTime,
      data.admissionWeight, data.admissionHeight, data.zScore, data.admissionOdema || null, data.admissionMuac,
      data.breastFeeding || null, data.complementaryFeeding || null, data.appetiteTest || null, 
      JSON.stringify(data.complications), data.otherComplication
    ];

    const result = await query(sqlText, values);
    
    return NextResponse.json({ success: true, id: result.rows[0].id }, { status: 201 });
    
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ error: 'Failed to register child' }, { status: 500 });
  }
}