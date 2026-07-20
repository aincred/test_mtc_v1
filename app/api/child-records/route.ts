// // // // // import { NextResponse } from 'next/server';
// // // // // import { query } from '@/lib/db';

// // // // // export const dynamic = 'force-dynamic';

// // // // // export async function GET() {
// // // // //   try {
// // // // //     // We map the PostgreSQL snake_case columns to the camelCase keys 
// // // // //     // that your frontend React component is already expecting.
// // // // //     const sqlText = `
// // // // //       SELECT 
// // // // //         registration_id AS id,
// // // // //         registration_id AS "recordNo",
// // // // //         sam_no AS "samNumber",
// // // // //         child_full_name AS "childName",
// // // // //         guardian_name AS "parentName",
// // // // //         mobile_number AS "mobileNumber",
// // // // //         sex_id::text AS sex,
// // // // //         TO_CHAR(admission_date, 'YYYY-MM-DD') AS "admissionDate",
// // // // //         admission_weight_kg AS "admissionWeight",
// // // // //         length_height_cm AS "admissionHeight",
// // // // //         z_score_sd AS "zScore",
// // // // //         village,
// // // // //         TO_CHAR(discharge_date, 'YYYY-MM-DD') AS "dischargeDate",
// // // // //         admission_type_id::text AS "admissionType",
// // // // //         created_at AS "createdAt"
// // // // //       FROM mtc_child_master
// // // // //       ORDER BY created_at DESC
// // // // //     `;
    
// // // // //     const result = await query(sqlText);
    
// // // // //     return NextResponse.json(result.rows, { status: 200 });

// // // // //   } catch (error) {
// // // // //     console.error('Fetch Child Records Error:', error);
// // // // //     return NextResponse.json({ error: 'Failed to fetch database records' }, { status: 500 });
// // // // //   }
// // // // // }


// // // // import { NextResponse } from 'next/server';
// // // // import { query } from '@/lib/db';

// // // // export const dynamic = 'force-dynamic';

// // // // // --- GET: Fetch All Child Records (Filtered by MTC Center) ---
// // // // export async function GET(request: Request) {
// // // //   try {
// // // //     // ✅ 1. Extract the mtcId from the request URL
// // // //     const { searchParams } = new URL(request.url);
// // // //     const mtcId = searchParams.get('mtcId');

// // // //     // We map the PostgreSQL snake_case columns to the camelCase keys 
// // // //     // that your frontend React component is already expecting.
// // // //     let sqlText = `
// // // //       SELECT 
// // // //         registration_id AS id,
// // // //         registration_id AS "recordNo",
// // // //         sam_no AS "samNumber",
// // // //         child_full_name AS "childName",
// // // //         guardian_name AS "parentName",
// // // //         mobile_number AS "mobileNumber",
// // // //         sex_id::text AS sex,
// // // //         TO_CHAR(admission_date, 'YYYY-MM-DD') AS "admissionDate",
// // // //         admission_weight_kg AS "admissionWeight",
// // // //         length_height_cm AS "admissionHeight",
// // // //         z_score_sd AS "zScore",
// // // //         village,
// // // //         TO_CHAR(discharge_date, 'YYYY-MM-DD') AS "dischargeDate",
// // // //         admission_type_id::text AS "admissionType",
// // // //         created_at AS "createdAt"
// // // //       FROM mtc_child_master
// // // //     `;
    
// // // //     const values: any[] = [];

// // // //     // ✅ 2. Filter securely by the center if mtcId is passed
// // // //     if (mtcId) {
// // // //       sqlText += ` WHERE mtc_id = $1`;
// // // //       values.push(parseInt(mtcId, 10));
// // // //     }

// // // //     sqlText += ` ORDER BY created_at DESC`;
    
// // // //     // ✅ 3. Execute the parameterized query
// // // //     const result = await query(sqlText, values);
    
// // // //     return NextResponse.json(result.rows, { status: 200 });

// // // //   } catch (error) {
// // // //     console.error('Fetch Child Records Error:', error);
// // // //     return NextResponse.json({ error: 'Failed to fetch database records' }, { status: 500 });
// // // //   }
// // // // }


// // // import { NextResponse } from 'next/server';
// // // import { query } from '@/lib/db';

// // // export const dynamic = 'force-dynamic';

// // // export async function GET(request: Request) {
// // //   try {
// // //     const { searchParams } = new URL(request.url);
// // //     const year = searchParams.get('year');
// // //     const month = searchParams.get('month');
// // //     const mtcId = searchParams.get('mtcId');

// // //     if (!year || !month) {
// // //       return NextResponse.json({ error: 'Year and Month are required' }, { status: 400 });
// // //     }

// // //     // Construct date boundaries for the SQL query
// // //     const startDate = `${year}-${month.padStart(2, '0')}-01`;
    
// // //     // Fixed: Updated to use mtc_id and wrapped SUMs in COALESCE to prevent null errors
// // //     const sqlText = `
// // //       WITH monthly_data AS (
// // //         SELECT 
// // //           sex_id, caste_id, bpl_number, z_score_sd, muac_cm, odema_id,
// // //           referred_by_id, total_stay_days, outcome_indicator_id,
// // //           admission_type_id
// // //         FROM mtc_child_master
// // //         WHERE DATE_TRUNC('month', admission_date) = DATE_TRUNC('month', $1::DATE)
// // //         ${mtcId ? 'AND mtc_id = $2' : ''} 
// // //       )
// // //       SELECT 
// // //         -- A. Admissions
// // //         COUNT(*)::INTEGER AS total_admissions,
// // //         COALESCE(SUM(CASE WHEN sex_id = 1 THEN 1 ELSE 0 END), 0)::INTEGER AS total_male,
// // //         COALESCE(SUM(CASE WHEN sex_id = 2 THEN 1 ELSE 0 END), 0)::INTEGER AS total_female,
// // //         COALESCE(SUM(CASE WHEN caste_id IN (1, 2) THEN 1 ELSE 0 END), 0)::INTEGER AS sc_st_count,
// // //         COALESCE(SUM(CASE WHEN bpl_number IS NOT NULL AND bpl_number != '' THEN 1 ELSE 0 END), 0)::INTEGER AS bpl_count,
        
// // //         -- A.1 Admission Criteria
// // //         COALESCE(SUM(CASE WHEN z_score_sd < -3 THEN 1 ELSE 0 END), 0)::INTEGER AS criteria_zscore,
// // //         COALESCE(SUM(CASE WHEN muac_cm < 11.5 THEN 1 ELSE 0 END), 0)::INTEGER AS criteria_muac,
// // //         COALESCE(SUM(CASE WHEN odema_id > 1 THEN 1 ELSE 0 END), 0)::INTEGER AS criteria_edema,
        
// // //         -- A.2 Referral By
// // //         COALESCE(SUM(CASE WHEN referred_by_id = 6 THEN 1 ELSE 0 END), 0)::INTEGER AS ref_frontline, 
// // //         COALESCE(SUM(CASE WHEN referred_by_id = 1 THEN 1 ELSE 0 END), 0)::INTEGER AS ref_self,
// // //         COALESCE(SUM(CASE WHEN referred_by_id = 2 THEN 1 ELSE 0 END), 0)::INTEGER AS ref_ward,
        
// // //         -- A.3 Duration of Stay
// // //         COALESCE(SUM(CASE WHEN total_stay_days < 7 THEN 1 ELSE 0 END), 0)::INTEGER AS stay_under_7,
// // //         COALESCE(SUM(CASE WHEN total_stay_days >= 7 AND total_stay_days <= 15 THEN 1 ELSE 0 END), 0)::INTEGER AS stay_7_to_15,
// // //         COALESCE(SUM(CASE WHEN total_stay_days > 15 THEN 1 ELSE 0 END), 0)::INTEGER AS stay_over_15,
        
// // //         -- B. Monthly Output
// // //         COALESCE(SUM(CASE WHEN outcome_indicator_id = 1 THEN 1 ELSE 0 END), 0)::INTEGER AS out_cured,
// // //         COALESCE(SUM(CASE WHEN outcome_indicator_id = 2 THEN 1 ELSE 0 END), 0)::INTEGER AS out_defaulter,
// // //         COALESCE(SUM(CASE WHEN outcome_indicator_id = 4 THEN 1 ELSE 0 END), 0)::INTEGER AS out_non_responder,
// // //         COALESCE(SUM(CASE WHEN outcome_indicator_id = 5 THEN 1 ELSE 0 END), 0)::INTEGER AS out_death,
        
// // //         -- Relapse
// // //         COALESCE(SUM(CASE WHEN admission_type_id = 3 THEN 1 ELSE 0 END), 0)::INTEGER AS relapse_cases

// // //       FROM monthly_data;
// // //     `;

// // //     const params = mtcId ? [startDate, parseInt(mtcId)] : [startDate];
// // //     const result = await query(sqlText, params);

// // //     return NextResponse.json({ success: true, data: result.rows[0] }, { status: 200 });

// // //   } catch (error) {
// // //     console.error('Report Generation Error:', error);
// // //     return NextResponse.json({ error: 'Failed to generate report' }, { status: 500 });
// // //   }
// // // }

// // import { NextResponse } from 'next/server';
// // import { query } from '@/lib/db';

// // export const dynamic = 'force-dynamic';

// // export async function GET(request: Request) {
// //   try {
// //     const { searchParams } = new URL(request.url);
// //     const mtcId = searchParams.get('mtcId');

// //     let sqlText = '';
// //     let params: any[] = [];

// //     // Base query targeting the child master table
// //     const baseQuery = `
// //       SELECT 
// //         registration_id AS "id",
// //         registration_id AS "recordNo",
// //         sam_no AS "samNumber",
// //         child_full_name AS "childName",
// //         guardian_name AS "parentName",
// //         mobile_number AS "mobileNumber",
// //         sex_id AS "sex",
// //         admission_date AS "admissionDate",
// //         admission_weight_kg AS "admissionWeight",
// //         length_height_cm AS "admissionHeight",
// //         z_score_sd AS "zScore",
// //         village AS "village",
// //         discharge_date AS "dischargeDate",
// //         admission_type_id AS "admissionType"
// //       FROM mtc_child_master
// //     `;

// //     // Apply MTC filtering if the query parameter exists
// //     if (mtcId) {
// //       sqlText = `${baseQuery} WHERE mtc_id = $1 ORDER BY admission_date DESC`;
// //       params = [parseInt(mtcId)];
// //     } else {
// //       sqlText = `${baseQuery} ORDER BY admission_date DESC`;
// //     }

// //     const result = await query(sqlText, params);

// //     // Format the date so it doesn't break the frontend sorting
// //     const formattedData = result.rows.map(row => ({
// //       ...row,
// //       admissionDate: row.admissionDate ? new Date(row.admissionDate).toISOString().split('T')[0] : null,
// //       dischargeDate: row.dischargeDate ? new Date(row.dischargeDate).toISOString().split('T')[0] : null,
// //     }));

// //     return NextResponse.json(formattedData, { status: 200 });

// //   } catch (error) {
// //     console.error('Fetch Child Records Error:', error);
// //     return NextResponse.json({ error: 'Failed to fetch child records' }, { status: 500 });
// //   }
// // }

// import { NextResponse } from 'next/server';
// import { query } from '@/lib/db';

// export const dynamic = 'force-dynamic';

// export async function GET(request: Request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const mtcId = searchParams.get('mtcId');

//     let sqlText = '';
//     let params: (string | number | boolean | null)[] = []; // Fixes the lint error

//     // Base query targeting the child master table
//     const baseQuery = `
//       SELECT 
//         registration_id AS "id",
//         registration_id AS "recordNo",
//         sam_no AS "samNumber",
//         child_full_name AS "childName",
//         guardian_name AS "parentName",
//         mobile_number AS "mobileNumber",
//         sex_id AS "sex",
//         admission_date AS "admissionDate",
//         admission_weight_kg AS "admissionWeight",
//         length_height_cm AS "admissionHeight",
//         z_score_sd AS "zScore",
//         village AS "village",
//         discharge_date AS "dischargeDate",
//         admission_type_id AS "admissionType"
//       FROM mtc_child_master
//     `;

//     // Apply MTC filtering if the query parameter exists
//     if (mtcId) {
//       sqlText = `${baseQuery} WHERE mtc_id = $1 ORDER BY admission_date DESC`;
//       params = [parseInt(mtcId, 10)]; // Good practice to specify base 10
//     } else {
//       sqlText = `${baseQuery} ORDER BY admission_date DESC`;
//     }

//     const result = await query(sqlText, params);

//     // Format the date so it doesn't break the frontend sorting
//     const formattedData = result.rows.map(row => ({
//       ...row,
//       admissionDate: row.admissionDate ? new Date(row.admissionDate).toISOString().split('T')[0] : null,
//       dischargeDate: row.dischargeDate ? new Date(row.dischargeDate).toISOString().split('T')[0] : null,
//     }));

//     return NextResponse.json(formattedData, { status: 200 });

//   } catch (error) {
//     console.error('Fetch Child Records Error:', error);
//     return NextResponse.json({ error: 'Failed to fetch child records' }, { status: 500 });
//   }
// }

import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

interface ChildRow {
  id: number | string;
  recordNo: number | string;
  samNumber: string | null;
  childName: string | null;
  parentName: string | null;
  mobileNumber: string | null;
  sex: number | string | null;
  admissionDate: string | number | Date | null;
  admissionWeight: number | string | null;
  admissionHeight: number | string | null;
  zScore: number | string | null;
  village: string | null;
  dischargeDate: string | number | Date | null;
  admissionType: number | string | null;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const mtcId = searchParams.get('mtcId');

    let sqlText = '';
    let params: (string | number | boolean | null)[] = [];

    // Base query targeting the child master table
    const baseQuery = `
      SELECT 
        registration_id AS "id",
        registration_id AS "recordNo",
        sam_no AS "samNumber",
        child_full_name AS "childName",
        guardian_name AS "parentName",
        mobile_number AS "mobileNumber",
        sex_id AS "sex",
        admission_date AS "admissionDate",
        admission_weight_kg AS "admissionWeight",
        length_height_cm AS "admissionHeight",
        z_score_sd AS "zScore",
        village AS "village",
        discharge_date AS "dischargeDate",
        admission_type_id AS "admissionType"
      FROM mtc_child_master
    `;

    // Apply MTC filtering if the query parameter exists
    if (mtcId) {
      sqlText = `${baseQuery} WHERE mtc_id = $1 ORDER BY admission_date DESC`;
      params = [parseInt(mtcId, 10)];
    } else {
      sqlText = `${baseQuery} ORDER BY admission_date DESC`;
    }

    // Supply the explicit ChildRow type mapping to our database query utility
    const result = await query<ChildRow>(sqlText, params);

    // Format the dates securely without breaking typing limits
    const formattedData = result.rows.map(row => ({
      ...row,
      admissionDate: row.admissionDate ? new Date(row.admissionDate).toISOString().split('T')[0] : null,
      dischargeDate: row.dischargeDate ? new Date(row.dischargeDate).toISOString().split('T')[0] : null,
    }));

    return NextResponse.json(formattedData, { status: 200 });

  } catch (error) {
    console.error('Fetch Child Records Error:', error);
    return NextResponse.json({ error: 'Failed to fetch child records' }, { status: 500 });
  }
}