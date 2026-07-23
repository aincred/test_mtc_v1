// import { NextResponse } from 'next/server';
// import { query } from '@/lib/db';

// export const dynamic = 'force-dynamic';

// export async function GET(request: Request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const fromDate = searchParams.get('fromDate');
//     const toDate = searchParams.get('toDate');
    
//     // Defaulting to 'ALL' to satisfy "show all the district result"
//     const districtName = searchParams.get('districtName') || 'ALL'; 

//     if (!fromDate || !toDate) {
//       return NextResponse.json({ error: 'Missing required date parameters' }, { status: 400 });
//     }

//     // 1. Fetch MTC facilities for this district (or ALL districts)
//     let mtcSql = `SELECT mtc_id AS id FROM mtc_centers`;
//     let mtcParams: string[] = [];

//     if (districtName.toUpperCase() !== 'ALL') {
//       mtcSql += ` WHERE UPPER(district) = $1`;
//       mtcParams.push(districtName.toUpperCase());
//     }

//     const mtcResult = await query<{ id: number }>(mtcSql, mtcParams);
//     const districtMtcIds = mtcResult.rows.map((row) => row.id);

//     // If no MTCs match the district criteria, return early with zeroed/empty response
//     if (districtMtcIds.length === 0) {
//       return NextResponse.json({ 
//         success: true, 
//         districtName: districtName.toUpperCase(), 
//         data: null,
//         message: "No MTC centers found for the selected criteria."
//       });
//     }

//     // 2. Fetch Aggregations directly from mtc_child_master using the array of IDs
//     const sqlText = `
//       WITH filtered_data AS (
//         SELECT 
//           admission_type_id,
//           sex_id,
//           age_months, 
//           caste_id,
//           referred_by_id,
//           breast_feeding_id, 
//           complementary_feeding
//         FROM mtc_child_master
//         WHERE admission_date >= $1::DATE 
//           AND admission_date <= $2::DATE
//           AND mtc_id = ANY($3::int[]) -- Passing native PostgreSQL array
//       )
//       SELECT 
//         -- 1. Total KPI Metrics
//         COUNT(*)::INTEGER AS total_admissions,
//         COALESCE(SUM(CASE WHEN admission_type_id = 1 THEN 1 ELSE 0 END), 0)::INTEGER AS new_cases,
//         COALESCE(SUM(CASE WHEN admission_type_id = 2 THEN 1 ELSE 0 END), 0)::INTEGER AS re_admissions,
//         COALESCE(SUM(CASE WHEN admission_type_id = 3 THEN 1 ELSE 0 END), 0)::INTEGER AS relapses,
        
//         -- 2. Gender Distribution
//         COALESCE(SUM(CASE WHEN sex_id = 2 THEN 1 ELSE 0 END), 0)::INTEGER AS female_count,
//         COALESCE(SUM(CASE WHEN sex_id = 1 THEN 1 ELSE 0 END), 0)::INTEGER AS male_count,
//         COALESCE(SUM(CASE WHEN sex_id = 3 THEN 1 ELSE 0 END), 0)::INTEGER AS trans_count,
        
//         -- 3. Age Group Profile
//         COALESCE(SUM(CASE WHEN age_months >= 0 AND age_months <= 6 THEN 1 ELSE 0 END), 0)::INTEGER AS age_0_6,
//         COALESCE(SUM(CASE WHEN age_months > 6 AND age_months <= 24 THEN 1 ELSE 0 END), 0)::INTEGER AS age_6_24,
//         COALESCE(SUM(CASE WHEN age_months > 24 AND age_months <= 36 THEN 1 ELSE 0 END), 0)::INTEGER AS age_24_36,
//         COALESCE(SUM(CASE WHEN age_months > 36 THEN 1 ELSE 0 END), 0)::INTEGER AS age_gt_36,
        
//         -- 4. Caste Distribution
//         COALESCE(SUM(CASE WHEN caste_id = 2 THEN 1 ELSE 0 END), 0)::INTEGER AS st_count,
//         COALESCE(SUM(CASE WHEN caste_id = 1 THEN 1 ELSE 0 END), 0)::INTEGER AS sc_count,
//         COALESCE(SUM(CASE WHEN caste_id = 3 THEN 1 ELSE 0 END), 0)::INTEGER AS obc_count,
//         COALESCE(SUM(CASE WHEN caste_id NOT IN (1,2,3) OR caste_id IS NULL THEN 1 ELSE 0 END), 0)::INTEGER AS others_count,
        
//         -- 5. Referral Channels
//         COALESCE(SUM(CASE WHEN referred_by_id = 1 THEN 1 ELSE 0 END), 0)::INTEGER AS ref_self,
//         COALESCE(SUM(CASE WHEN referred_by_id = 6 THEN 1 ELSE 0 END), 0)::INTEGER AS ref_asha,
//         COALESCE(SUM(CASE WHEN referred_by_id = 4 THEN 1 ELSE 0 END), 0)::INTEGER AS ref_aww,
//         COALESCE(SUM(CASE WHEN referred_by_id = 3 THEN 1 ELSE 0 END), 0)::INTEGER AS ref_anm,
//         COALESCE(SUM(CASE WHEN referred_by_id = 2 THEN 1 ELSE 0 END), 0)::INTEGER AS ref_opd,
//         COALESCE(SUM(CASE WHEN referred_by_id NOT IN (1,2,3,4,6) THEN 1 ELSE 0 END), 0)::INTEGER AS ref_other,
        
//         -- 6. Feeding Practices
//         COALESCE(SUM(CASE WHEN breast_feeding_id = 1 THEN 1 ELSE 0 END), 0)::INTEGER AS bf_given,
//         COALESCE(SUM(CASE WHEN breast_feeding_id != 1 OR breast_feeding_id IS NULL THEN 1 ELSE 0 END), 0)::INTEGER AS bf_not_given,
        
//         -- complementary_feeding: Boolean true/false
//         COALESCE(SUM(CASE WHEN complementary_feeding = true THEN 1 ELSE 0 END), 0)::INTEGER AS cf_given,
//         COALESCE(SUM(CASE WHEN complementary_feeding = false OR complementary_feeding IS NULL THEN 1 ELSE 0 END), 0)::INTEGER AS cf_not_given

//       FROM filtered_data;
//     `;

//     // Execute query with the array of MTC IDs natively
//     const result = await query(sqlText, [fromDate, toDate, districtMtcIds]);

//     return NextResponse.json({ 
//       success: true, 
//       districtName: districtName.toUpperCase(),
//       data: result.rows[0] 
//     }, { status: 200 });

//   } catch (error) {
//     console.error('District Dashboard Generation Error:', error);
//     return NextResponse.json(
//       { error: 'Failed to generate district dashboard data' }, 
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const fromDate = searchParams.get('fromDate');
    const toDate = searchParams.get('toDate');
    
    // Defaulting to 'ALL' to satisfy "show all the district result"
    const districtName = searchParams.get('districtName') || 'ALL'; 

    if (!fromDate || !toDate) {
      return NextResponse.json({ error: 'Missing required date parameters' }, { status: 400 });
    }

    // 1. Fetch MTC facilities for this district (or ALL districts)
    let mtcSql = `SELECT mtc_id AS id FROM mtc_centers`;
    let mtcParams: string[] = [];

    if (districtName.toUpperCase() !== 'ALL') {
      mtcSql += ` WHERE UPPER(district) = $1`;
      mtcParams.push(districtName.toUpperCase());
    }

    const mtcResult = await query<{ id: number }>(mtcSql, mtcParams);
    const districtMtcIds = mtcResult.rows.map((row) => row.id);

    // If no MTCs match the district criteria, return early with zeroed/empty response
    if (districtMtcIds.length === 0) {
      return NextResponse.json({ 
        success: true, 
        districtName: districtName.toUpperCase(), 
        data: null,
        message: "No MTC centers found for the selected criteria."
      });
    }

    // 2. Fetch Aggregations directly from mtc_child_master using corrected IDs
    const sqlText = `
      WITH filtered_data AS (
        SELECT 
          admission_type_id,
          sex_id,
          age_months, 
          caste_id,
          referred_by_id,
          breast_feeding_id, 
          complementary_feeding
        FROM mtc_child_master
        WHERE admission_date >= $1::DATE 
          AND admission_date <= $2::DATE
          AND mtc_id = ANY($3::int[]) -- Passing native PostgreSQL array
      )
      SELECT 
        -- 1. Total KPI Metrics
        COUNT(*)::INTEGER AS total_admissions,
        COALESCE(SUM(CASE WHEN admission_type_id = 1 THEN 1 ELSE 0 END), 0)::INTEGER AS new_cases,
        COALESCE(SUM(CASE WHEN admission_type_id = 2 THEN 1 ELSE 0 END), 0)::INTEGER AS re_admissions,
        COALESCE(SUM(CASE WHEN admission_type_id = 3 THEN 1 ELSE 0 END), 0)::INTEGER AS relapses,
        
        -- 2. Gender Distribution
        COALESCE(SUM(CASE WHEN sex_id = 2 THEN 1 ELSE 0 END), 0)::INTEGER AS female_count,
        COALESCE(SUM(CASE WHEN sex_id = 1 THEN 1 ELSE 0 END), 0)::INTEGER AS male_count,
        COALESCE(SUM(CASE WHEN sex_id = 3 THEN 1 ELSE 0 END), 0)::INTEGER AS trans_count,
        
        -- 3. Age Group Profile
        COALESCE(SUM(CASE WHEN age_months >= 0 AND age_months <= 6 THEN 1 ELSE 0 END), 0)::INTEGER AS age_0_6,
        COALESCE(SUM(CASE WHEN age_months > 6 AND age_months <= 24 THEN 1 ELSE 0 END), 0)::INTEGER AS age_6_24,
        COALESCE(SUM(CASE WHEN age_months > 24 AND age_months <= 36 THEN 1 ELSE 0 END), 0)::INTEGER AS age_24_36,
        COALESCE(SUM(CASE WHEN age_months > 36 THEN 1 ELSE 0 END), 0)::INTEGER AS age_gt_36,
        
        -- 4. Caste Distribution (Updated to match DB mapping)
        COALESCE(SUM(CASE WHEN caste_id = 1 THEN 1 ELSE 0 END), 0)::INTEGER AS general_count, -- 1: General
        COALESCE(SUM(CASE WHEN caste_id = 2 THEN 1 ELSE 0 END), 0)::INTEGER AS obc_count,     -- 2: OBC
        COALESCE(SUM(CASE WHEN caste_id = 3 THEN 1 ELSE 0 END), 0)::INTEGER AS sc_count,      -- 3: SC
        COALESCE(SUM(CASE WHEN caste_id = 4 THEN 1 ELSE 0 END), 0)::INTEGER AS st_count,      -- 4: ST
        COALESCE(SUM(CASE WHEN caste_id = 5 THEN 1 ELSE 0 END), 0)::INTEGER AS ews_count,     -- 5: EWS
        COALESCE(SUM(CASE WHEN caste_id = 6 OR caste_id NOT IN (1,2,3,4,5) OR caste_id IS NULL THEN 1 ELSE 0 END), 0)::INTEGER AS others_count, -- 6: Other
        
        -- 5. Referral Channels (Updated previously)
        COALESCE(SUM(CASE WHEN referred_by_id = 1 THEN 1 ELSE 0 END), 0)::INTEGER AS ref_asha,
        COALESCE(SUM(CASE WHEN referred_by_id = 2 THEN 1 ELSE 0 END), 0)::INTEGER AS ref_aww,
        COALESCE(SUM(CASE WHEN referred_by_id = 3 THEN 1 ELSE 0 END), 0)::INTEGER AS ref_anm,
        COALESCE(SUM(CASE WHEN referred_by_id = 4 THEN 1 ELSE 0 END), 0)::INTEGER AS ref_poshan_sakhi,
        COALESCE(SUM(CASE WHEN referred_by_id = 5 THEN 1 ELSE 0 END), 0)::INTEGER AS ref_rbsk,
        COALESCE(SUM(CASE WHEN referred_by_id = 6 THEN 1 ELSE 0 END), 0)::INTEGER AS ref_opd,
        COALESCE(SUM(CASE WHEN referred_by_id = 7 THEN 1 ELSE 0 END), 0)::INTEGER AS ref_self,
        COALESCE(SUM(CASE WHEN referred_by_id = 8 OR referred_by_id NOT IN (1,2,3,4,5,6,7) OR referred_by_id IS NULL THEN 1 ELSE 0 END), 0)::INTEGER AS ref_other,
        
        -- 6. Feeding Practices
        COALESCE(SUM(CASE WHEN breast_feeding_id = 1 THEN 1 ELSE 0 END), 0)::INTEGER AS bf_given,
        COALESCE(SUM(CASE WHEN breast_feeding_id != 1 OR breast_feeding_id IS NULL THEN 1 ELSE 0 END), 0)::INTEGER AS bf_not_given,
        
        -- complementary_feeding: Boolean true/false
        COALESCE(SUM(CASE WHEN complementary_feeding = true THEN 1 ELSE 0 END), 0)::INTEGER AS cf_given,
        COALESCE(SUM(CASE WHEN complementary_feeding = false OR complementary_feeding IS NULL THEN 1 ELSE 0 END), 0)::INTEGER AS cf_not_given

      FROM filtered_data;
    `;

    // Execute query with the array of MTC IDs natively
    const result = await query(sqlText, [fromDate, toDate, districtMtcIds]);

    return NextResponse.json({ 
      success: true, 
      districtName: districtName.toUpperCase(),
      data: result.rows[0] 
    }, { status: 200 });

  } catch (error) {
    console.error('District Dashboard Generation Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate district dashboard data' }, 
      { status: 500 }
    );
  }
}