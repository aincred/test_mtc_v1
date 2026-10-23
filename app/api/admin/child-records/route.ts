import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export interface ChildRecordData {
  registration_id: number | string;
  sam_no: string | null;
  admission_type_id: number | string | null;
  referred_by_id: number | string | null;
  admission_date: string | null;
  admission_time: string | null;
  child_full_name: string | null;
  dob: string | null;
  sex_id: number | string | null;
  guardian_name: string | null;
  relationship_id: number | string | null;
  mobile_number: string | null;
  parent_aadhaar_number: string | null;
  bpl_number: string | null;
  caste_id: number | string | null;
  bank_name: string | null;
  account_holder: string | null;
  account_number: string | null;
  ifsc_code: string | null;
  full_address: string | null;
  district_id: number | string | null;
  block_id: number | string | null;
  village: string | null;
  icds_project_id: number | string | null;
  anganwadi_id: number | string | null;
  admission_weight_kg: number | string | null;
  length_height_cm: number | string | null;
  muac_cm: number | string | null;
  z_score_sd: number | string | null;
  odema_id: number | string | null;
  breast_feeding_id: number | string | null;
  complementary_feeding: string | null;
  appetite_test_id: number | string | null;
  created_at: string | null;
  updated_at: string | null;
  medical_complications: string | null;
  discharge_date: string | null;
  discharge_weight_kg: number | string | null;
  discharge_height_cm: number | string | null;
  discharge_muac_cm: number | string | null;
  discharge_edema_id: number | string | null;
  outcome_indicator_id: number | string | null;
  hemoglobin_mother: number | string | null;
  ifa_given_to_mother: string | null;
  mother_payment_wages: number | string | null;
  ifa_syrup_to_child: string | null;
  total_stay_days: number | string | null;
  minimum_weight_kg: number | string | null;
  discharge_image_path: string | null;
  admission_hemoglobin: number | string | null;
  age_years: number | string | null;
  age_months: number | string | null;
  referred_by_name: string | null;
  referred_by_mobile: string | null;
  mother_name: string | null;
  mtc_id: number | string | null;
  is_samar_registered: string | null;
  samar_uuid: string | null;
  father_name: string | null;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const mtcId = searchParams.get('mtcId');

    const baseQuery = `
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
      FROM mtc_child_master
    `;

    let sqlText = '';
    let params: (string | number | boolean | null)[] = [];

    if (mtcId) {
      sqlText = `${baseQuery} WHERE mtc_id = $1 ORDER BY admission_date DESC`;
      params = [parseInt(mtcId, 10)];
    } else {
      sqlText = `${baseQuery} ORDER BY admission_date DESC`;
    }

    const result = await query<Record<string, any>>(sqlText, params);

    const formattedData: ChildRecordData[] = result.rows.map((row) => ({
      ...row,
      admission_date: row.admission_date ? new Date(row.admission_date).toISOString().split('T')[0] : null,
      dob: row.dob ? new Date(row.dob).toISOString().split('T')[0] : null,
      discharge_date: row.discharge_date ? new Date(row.discharge_date).toISOString().split('T')[0] : null,
      created_at: row.created_at ? new Date(row.created_at).toISOString() : null,
      updated_at: row.updated_at ? new Date(row.updated_at).toISOString() : null,
    })) as ChildRecordData[];

    return NextResponse.json(formattedData, { status: 200 });
  } catch (error) {
    console.error('Fetch Child Records Error:', error);
    return NextResponse.json({ error: 'Failed to fetch child records' }, { status: 500 });
  }
}