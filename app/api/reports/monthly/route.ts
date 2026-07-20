// import { NextResponse } from 'next/server';
// import { query } from '@/lib/db';

// export const dynamic = 'force-dynamic';

// export async function GET(request: Request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const year = searchParams.get('year');
//     const month = searchParams.get('month');
//     const mtcId = searchParams.get('mtcId');

//     if (!year || !month) {
//       return NextResponse.json({ error: 'Year and Month are required' }, { status: 400 });
//     }

//     // Construct date boundaries for the SQL query
//     const startDate = `${year}-${month.padStart(2, '0')}-01`;
    
//     // An advanced aggregate query to calculate Annexure 5 metrics in a single database call
//     const sqlText = `
//       WITH monthly_data AS (
//         SELECT 
//           sex_id, caste_id, bpl_number, z_score_sd, muac_cm, odema_id,
//           referred_by_id, total_stay_days, outcome_indicator_id,
//           admission_type_id
//         FROM mtc_child_master
//         WHERE DATE_TRUNC('month', admission_date) = DATE_TRUNC('month', $1::DATE)
//         ${mtcId ? 'AND anganwadi_id = $2' : ''} -- Adjust this ID mapping to your actual MTC column
//       )
//       SELECT 
//         -- A. Admissions
//         COUNT(*) AS total_admissions,
//         SUM(CASE WHEN sex_id = 1 THEN 1 ELSE 0 END) AS total_male,
//         SUM(CASE WHEN sex_id = 2 THEN 1 ELSE 0 END) AS total_female,
//         SUM(CASE WHEN caste_id IN (1, 2) THEN 1 ELSE 0 END) AS sc_st_count, -- Adjust IDs based on your caste table
//         SUM(CASE WHEN bpl_number IS NOT NULL AND bpl_number != '' THEN 1 ELSE 0 END) AS bpl_count,
        
//         -- A.1 Admission Criteria
//         SUM(CASE WHEN z_score_sd < -3 THEN 1 ELSE 0 END) AS criteria_zscore,
//         SUM(CASE WHEN muac_cm < 11.5 THEN 1 ELSE 0 END) AS criteria_muac,
//         SUM(CASE WHEN odema_id > 1 THEN 1 ELSE 0 END) AS criteria_edema,
        
//         -- A.2 Referral By
//         SUM(CASE WHEN referred_by_id = 6 THEN 1 ELSE 0 END) AS ref_frontline, -- Sahiya/Asha
//         SUM(CASE WHEN referred_by_id = 1 THEN 1 ELSE 0 END) AS ref_self,
//         SUM(CASE WHEN referred_by_id = 2 THEN 1 ELSE 0 END) AS ref_ward,
        
//         -- A.3 Duration of Stay
//         SUM(CASE WHEN total_stay_days < 7 THEN 1 ELSE 0 END) AS stay_under_7,
//         SUM(CASE WHEN total_stay_days >= 7 AND total_stay_days <= 15 THEN 1 ELSE 0 END) AS stay_7_to_15,
//         SUM(CASE WHEN total_stay_days > 15 THEN 1 ELSE 0 END) AS stay_over_15,
        
//         -- B. Monthly Output
//         SUM(CASE WHEN outcome_indicator_id = 1 THEN 1 ELSE 0 END) AS out_cured,
//         SUM(CASE WHEN outcome_indicator_id = 2 THEN 1 ELSE 0 END) AS out_defaulter,
//         SUM(CASE WHEN outcome_indicator_id = 4 THEN 1 ELSE 0 END) AS out_non_responder,
//         SUM(CASE WHEN outcome_indicator_id = 5 THEN 1 ELSE 0 END) AS out_death,
        
//         -- Relapse
//         SUM(CASE WHEN admission_type_id = 3 THEN 1 ELSE 0 END) AS relapse_cases

//       FROM monthly_data;
//     `;

//     const params = mtcId ? [startDate, parseInt(mtcId)] : [startDate];
//     const result = await query(sqlText, params);

//     return NextResponse.json({ success: true, data: result.rows[0] }, { status: 200 });

//   } catch (error) {
//     console.error('Report Generation Error:', error);
//     return NextResponse.json({ error: 'Failed to generate report' }, { status: 500 });
//   }
// }


import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const year = searchParams.get('year');
    const month = searchParams.get('month');
    const mtcId = searchParams.get('mtcId');

    if (!year || !month) {
      return NextResponse.json({ error: 'Year and Month are required' }, { status: 400 });
    }

    // Construct date boundaries for the SQL query
    const startDate = `${year}-${month.padStart(2, '0')}-01`;
    
    // Fixed: Updated to use mtc_id and wrapped SUMs in COALESCE to prevent null errors
    const sqlText = `
      WITH monthly_data AS (
        SELECT 
          sex_id, caste_id, bpl_number, z_score_sd, muac_cm, odema_id,
          referred_by_id, total_stay_days, outcome_indicator_id,
          admission_type_id
        FROM mtc_child_master
        WHERE DATE_TRUNC('month', admission_date) = DATE_TRUNC('month', $1::DATE)
        ${mtcId ? 'AND mtc_id = $2' : ''} 
      )
      SELECT 
        -- A. Admissions
        COUNT(*)::INTEGER AS total_admissions,
        COALESCE(SUM(CASE WHEN sex_id = 1 THEN 1 ELSE 0 END), 0)::INTEGER AS total_male,
        COALESCE(SUM(CASE WHEN sex_id = 2 THEN 1 ELSE 0 END), 0)::INTEGER AS total_female,
        COALESCE(SUM(CASE WHEN caste_id IN (1, 2) THEN 1 ELSE 0 END), 0)::INTEGER AS sc_st_count,
        COALESCE(SUM(CASE WHEN bpl_number IS NOT NULL AND bpl_number != '' THEN 1 ELSE 0 END), 0)::INTEGER AS bpl_count,
        
        -- A.1 Admission Criteria
        COALESCE(SUM(CASE WHEN z_score_sd < -3 THEN 1 ELSE 0 END), 0)::INTEGER AS criteria_zscore,
        COALESCE(SUM(CASE WHEN muac_cm < 11.5 THEN 1 ELSE 0 END), 0)::INTEGER AS criteria_muac,
        COALESCE(SUM(CASE WHEN odema_id > 1 THEN 1 ELSE 0 END), 0)::INTEGER AS criteria_edema,
        
        -- A.2 Referral By
        COALESCE(SUM(CASE WHEN referred_by_id = 6 THEN 1 ELSE 0 END), 0)::INTEGER AS ref_frontline, 
        COALESCE(SUM(CASE WHEN referred_by_id = 1 THEN 1 ELSE 0 END), 0)::INTEGER AS ref_self,
        COALESCE(SUM(CASE WHEN referred_by_id = 2 THEN 1 ELSE 0 END), 0)::INTEGER AS ref_ward,
        
        -- A.3 Duration of Stay
        COALESCE(SUM(CASE WHEN total_stay_days < 7 THEN 1 ELSE 0 END), 0)::INTEGER AS stay_under_7,
        COALESCE(SUM(CASE WHEN total_stay_days >= 7 AND total_stay_days <= 15 THEN 1 ELSE 0 END), 0)::INTEGER AS stay_7_to_15,
        COALESCE(SUM(CASE WHEN total_stay_days > 15 THEN 1 ELSE 0 END), 0)::INTEGER AS stay_over_15,
        
        -- B. Monthly Output
        COALESCE(SUM(CASE WHEN outcome_indicator_id = 1 THEN 1 ELSE 0 END), 0)::INTEGER AS out_cured,
        COALESCE(SUM(CASE WHEN outcome_indicator_id = 2 THEN 1 ELSE 0 END), 0)::INTEGER AS out_defaulter,
        COALESCE(SUM(CASE WHEN outcome_indicator_id = 4 THEN 1 ELSE 0 END), 0)::INTEGER AS out_non_responder,
        COALESCE(SUM(CASE WHEN outcome_indicator_id = 5 THEN 1 ELSE 0 END), 0)::INTEGER AS out_death,
        
        -- Relapse
        COALESCE(SUM(CASE WHEN admission_type_id = 3 THEN 1 ELSE 0 END), 0)::INTEGER AS relapse_cases

      FROM monthly_data;
    `;

    const params = mtcId ? [startDate, parseInt(mtcId)] : [startDate];
    const result = await query(sqlText, params);

    return NextResponse.json({ success: true, data: result.rows[0] }, { status: 200 });

  } catch (error) {
    console.error('Report Generation Error:', error);
    return NextResponse.json({ error: 'Failed to generate report' }, { status: 500 });
  }
}