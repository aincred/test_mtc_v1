import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

const TABLE_NAME = 'child_records';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const fromDate = searchParams.get('fromDate');
    const toDate = searchParams.get('toDate');
    const districtId = searchParams.get('districtId');
    const mtcId = searchParams.get('mtcId');
    const recordNo = searchParams.get('recordNo');
    const samNo = searchParams.get('samNo');
    const childName = searchParams.get('childName');

    const conditions: string[] = [];
    const values: any[] = [];

    if (fromDate) {
      values.push(fromDate);
      conditions.push(`admission_date >= $${values.length}`);
    }
    if (toDate) {
      values.push(toDate);
      conditions.push(`admission_date <= $${values.length}`);
    }
    if (districtId) {
      values.push(parseInt(districtId, 10));
      conditions.push(`district_id = $${values.length}`);
    }
    if (mtcId) {
      values.push(parseInt(mtcId, 10));
      conditions.push(`mtc_id = $${values.length}`);
    }
    if (recordNo) {
      values.push(parseInt(recordNo, 10));
      conditions.push(`registration_id = $${values.length}`);
    }
    if (samNo) {
      values.push(`%${samNo.trim()}%`);
      conditions.push(`sam_no ILIKE $${values.length}`);
    }
    if (childName) {
      values.push(`%${childName.trim()}%`);
      conditions.push(`child_full_name ILIKE $${values.length}`);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    const sql = `
      SELECT 
        registration_id,
        sam_no,
        admission_type_id,
        referred_by_id,
        admission_date,
        admission_time,
        child_full_name,
        dob,
        sex_id,
        guardian_name,
        relationship_id,
        mobile_number,
        parent_aadhaar_number,
        bpl_number,
        caste_id,
        bank_name,
        account_holder,
        account_number,
        ifsc_code,
        full_address,
        district_id,
        block_id,
        village,
        icds_project_id,
        anganwadi_id,
        admission_weight_kg,
        length_height_cm,
        muac_cm,
        z_score_sd,
        odema_id,
        breast_feeding_id,
        complementary_feeding,
        appetite_test_id,
        created_at,
        updated_at,
        medical_complications,
        discharge_date,
        discharge_weight_kg,
        discharge_height_cm,
        discharge_muac_cm,
        discharge_edema_id,
        outcome_indicator_id,
        hemoglobin_mother,
        ifa_given_to_mother,
        mother_payment_wages,
        ifa_syrup_to_child,
        total_stay_days,
        minimum_weight_kg,
        discharge_image_path,
        admission_hemoglobin,
        age_years,
        age_months,
        referred_by_name,
        referred_by_mobile,
        mother_name,
        mtc_id,
        is_samar_registered,
        samar_uuid,
        father_name
      FROM ${TABLE_NAME}
      ${whereClause}
      ORDER BY admission_date DESC, registration_id DESC
      LIMIT 100;
    `;

    const result = await query(sql, values);
    const rows = result.rows || result;

    return NextResponse.json({ success: true, count: rows.length, data: rows });
  } catch (error: any) {
    console.error('API execution error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}