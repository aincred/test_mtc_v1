// import { NextResponse } from 'next/server';
// import { query } from '@/lib/db';

// export const dynamic = 'force-dynamic';

// interface DistrictMasterRow {
//   district: string;
// }

// interface DistrictOccupancyRow {
//   district: string;
//   avg_occupancy: number;
// }

// interface DistrictChildMasterRow {
//   district: string;
//   admissions: number;
//   male_count: number;
//   female_count: number;
//   ref_sahiya: number;
//   ref_aww: number;
//   ref_other: number;
//   exits: number;
//   cured: number;
//   defaulter: number;
//   med_transfer: number;
//   non_respondent: number;
//   death: number;
// }

// export async function GET(request: Request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const fromDate = searchParams.get('fromDate');
//     const toDate = searchParams.get('toDate');

//     if (!fromDate || !toDate) {
//       return NextResponse.json(
//         { success: false, error: 'Missing required date parameters (fromDate, toDate)' },
//         { status: 400 }
//       );
//     }

//     // 1. Fetch All Active Unique Districts in the State
//     const districtMasterSql = `
//       SELECT DISTINCT UPPER(district) AS district 
//       FROM mtc_centers 
//       WHERE district IS NOT NULL AND TRIM(district) != ''
//       ORDER BY UPPER(district) ASC
//     `;

//     // 2. Fetch District-Wise Average Bed Occupancy
//     const occupancySql = `
//       SELECT 
//         UPPER(c.district) AS district,
//         ROUND(AVG(b.bed_occupancy_percentage), 2) AS avg_occupancy
//       FROM mtc_bed_occupancy b
//       JOIN mtc_centers c ON b.mtc_code = c.mtc_code
//       WHERE b.record_date >= $1::DATE AND b.record_date <= $2::DATE
//       GROUP BY UPPER(c.district)
//     `;

//     // 3. Fetch Child Admissions, Referrals & Outcomes
//     const childMasterSql = `
//       SELECT 
//         UPPER(c.district) AS district,
//         COUNT(CASE WHEN cm.admission_date >= $1::DATE AND cm.admission_date <= $2::DATE THEN 1 END) AS admissions,
//         COUNT(CASE WHEN cm.sex_id = 1 AND cm.admission_date >= $1::DATE AND cm.admission_date <= $2::DATE THEN 1 END) AS male_count,
//         COUNT(CASE WHEN cm.sex_id = 2 AND cm.admission_date >= $1::DATE AND cm.admission_date <= $2::DATE THEN 1 END) AS female_count,
        
//         -- Referred By
//         COUNT(CASE WHEN cm.referred_by_id = 1 AND cm.admission_date >= $1::DATE AND cm.admission_date <= $2::DATE THEN 1 END) AS ref_sahiya,
//         COUNT(CASE WHEN cm.referred_by_id = 2 AND cm.admission_date >= $1::DATE AND cm.admission_date <= $2::DATE THEN 1 END) AS ref_aww,
//         COUNT(CASE WHEN cm.referred_by_id NOT IN (1, 2) AND cm.admission_date >= $1::DATE AND cm.admission_date <= $2::DATE THEN 1 END) AS ref_other,

//         -- Exits and Outcomes (Discharge Date Range)
//         COUNT(CASE WHEN cm.discharge_date >= $1::DATE AND cm.discharge_date <= $2::DATE THEN 1 END) AS exits,
//         COUNT(CASE WHEN cm.outcome_indicator_id = 1 AND cm.discharge_date >= $1::DATE AND cm.discharge_date <= $2::DATE THEN 1 END) AS cured,
//         COUNT(CASE WHEN cm.outcome_indicator_id = 2 AND cm.discharge_date >= $1::DATE AND cm.discharge_date <= $2::DATE THEN 1 END) AS defaulter,
//         COUNT(CASE WHEN cm.outcome_indicator_id = 3 AND cm.discharge_date >= $1::DATE AND cm.discharge_date <= $2::DATE THEN 1 END) AS med_transfer,
//         COUNT(CASE WHEN cm.outcome_indicator_id = 4 AND cm.discharge_date >= $1::DATE AND cm.discharge_date <= $2::DATE THEN 1 END) AS non_respondent,
//         COUNT(CASE WHEN cm.outcome_indicator_id = 5 AND cm.discharge_date >= $1::DATE AND cm.discharge_date <= $2::DATE THEN 1 END) AS death

//       FROM mtc_child_master cm
//       JOIN mtc_centers c ON cm.mtc_id = c.mtc_id
//       WHERE (
//         (cm.admission_date >= $1::DATE AND cm.admission_date <= $2::DATE) OR
//         (cm.discharge_date >= $1::DATE AND cm.discharge_date <= $2::DATE)
//       )
//       GROUP BY UPPER(c.district)
//     `;

//     const [districtMasterRes, occupancyRes, childRes] = await Promise.all([
//       query<DistrictMasterRow>(districtMasterSql, []),
//       query<DistrictOccupancyRow>(occupancySql, [fromDate, toDate]),
//       query<DistrictChildMasterRow>(childMasterSql, [fromDate, toDate]),
//     ]);

//     const occupancyMap = new Map(occupancyRes.rows.map((r) => [r.district, Number(r.avg_occupancy) || 0]));
//     const childMap = new Map(childRes.rows.map((r) => [r.district, r]));

//     // 4. Map Over ALL Districts (Ensures 0s if no data)
//     const districtFactRows = districtMasterRes.rows.map((distObj) => {
//       const dist = distObj.district;
//       const childData = childMap.get(dist) || ({} as Partial<DistrictChildMasterRow>);
//       const bedOccupancy = occupancyMap.get(dist) || 0;

//       const admissions = Number(childData.admissions) || 0;
//       const male = Number(childData.male_count) || 0;
//       const female = Number(childData.female_count) || 0;

//       const genderM = admissions > 0 ? (male / admissions) * 100 : 0;
//       const genderF = admissions > 0 ? (female / admissions) * 100 : 0;

//       const refSahiya = Number(childData.ref_sahiya) || 0;
//       const refAww = Number(childData.ref_aww) || 0;
//       const refOther = Number(childData.ref_other) || 0;

//       const sahiyaPct = admissions > 0 ? (refSahiya / admissions) * 100 : 0;
//       const awwPct = admissions > 0 ? (refAww / admissions) * 100 : 0;
//       const otherPct = admissions > 0 ? (refOther / admissions) * 100 : 0;

//       const exits = Number(childData.exits) || 0;
//       const cured = Number(childData.cured) || 0;
//       const defaulter = Number(childData.defaulter) || 0;
//       const medTransfer = Number(childData.med_transfer) || 0;
//       const nonRespondent = Number(childData.non_respondent) || 0;
//       const death = Number(childData.death) || 0;

//       const cureRate = exits > 0 ? (cured / exits) * 100 : 0;
//       const defaulterRate = exits > 0 ? (defaulter / exits) * 100 : 0;
//       const medTransferRate = exits > 0 ? (medTransfer / exits) * 100 : 0;
//       const nonRespondentRate = exits > 0 ? (nonRespondent / exits) * 100 : 0;
//       const deathRate = exits > 0 ? (death / exits) * 100 : 0;

//       const compositeScore = Number(((bedOccupancy + cureRate) / 2).toFixed(1));

//       return {
//         districtId: dist,
//         district: dist,
//         bedOccupancy,
//         admissions,
//         gender: { m: genderM, f: genderF },
//         referredBy: { sahiya: sahiyaPct, aww: awwPct, other: otherPct },
//         exits,
//         outcome: {
//           cure: cureRate,
//           defaulter: defaulterRate,
//           medTransfer: medTransferRate,
//           nonRespondent: nonRespondentRate,
//           death: deathRate,
//         },
//         compositeScore,
//       };
//     });

//     // 5. Rank Districts by Composite Score
//     const sortedDistricts = [...districtFactRows].sort((a, b) => b.compositeScore - a.compositeScore);

//     const finalReport = sortedDistricts.map((row, idx) => {
//       const currentRank = row.compositeScore > 0 ? idx + 1 : 0;
//       const previousRank = 0; // Default 0 if no historical data

//       return {
//         sl: idx + 1,
//         districtId: row.districtId,
//         district: row.district,
//         bedOccupancy: row.bedOccupancy,
//         admissions: row.admissions,
//         gender: row.gender,
//         referredBy: row.referredBy,
//         exits: row.exits,
//         outcome: row.outcome,
//         compositeScore: row.compositeScore,
//         rankJanMar: currentRank,
//         rankChange: { type: 'neutral', value: 0 },
//         rankOctDec: previousRank,
//       };
//     });

//     return NextResponse.json({
//       success: true,
//       totalDistricts: finalReport.length,
//       data: finalReport,
//     });
//   } catch (error: any) {
//     console.error('State Factsheet error:', error);
//     return NextResponse.json(
//       { success: false, error: 'Failed to generate state factsheet', details: error.message },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

interface DistrictMasterRow {
  district: string;
}

interface DistrictOccupancyRow {
  district: string;
  avg_occupancy: number;
}

interface DistrictChildMasterRow {
  district: string;
  admissions: number;
  male_count: number;
  female_count: number;
  ref_sahiya: number;
  ref_aww: number;
  ref_other: number;
  exits: number;
  cured: number;
  defaulter: number;
  med_transfer: number;
  non_respondent: number;
  death: number;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const fromDate = searchParams.get('fromDate');
    const toDate = searchParams.get('toDate');
    const districtName = searchParams.get('districtName') || searchParams.get('districtId');

    if (!fromDate || !toDate) {
      return NextResponse.json(
        { success: false, error: 'Missing required date parameters (fromDate, toDate)' },
        { status: 400 }
      );
    }

    const isAllDistricts =
      !districtName ||
      districtName.trim() === '' ||
      districtName.toUpperCase() === 'ALL' ||
      districtName.toUpperCase() === 'JHARKHAND (ALL)';

    // 1. Fetch District Master List
    const districtMasterSql = `
      SELECT DISTINCT UPPER(district) AS district 
      FROM mtc_centers 
      WHERE district IS NOT NULL AND TRIM(district) != ''
      ${!isAllDistricts ? 'AND UPPER(district) = $1' : ''}
      ORDER BY UPPER(district) ASC
    `;

    // 2. Fetch District-Wise Bed Occupancy
    const occupancySql = `
      SELECT 
        UPPER(c.district) AS district,
        ROUND(AVG(b.bed_occupancy_percentage), 2) AS avg_occupancy
      FROM mtc_bed_occupancy b
      JOIN mtc_centers c ON b.mtc_code = c.mtc_code
      WHERE b.record_date >= $1::DATE AND b.record_date <= $2::DATE
      ${!isAllDistricts ? 'AND UPPER(c.district) = $3' : ''}
      GROUP BY UPPER(c.district)
    `;

    // 3. Fetch Child Admissions, Referrals & Exit Outcomes
    const childMasterSql = `
      SELECT 
        UPPER(c.district) AS district,
        COUNT(CASE WHEN cm.admission_date >= $1::DATE AND cm.admission_date <= $2::DATE THEN 1 END) AS admissions,
        COUNT(CASE WHEN cm.sex_id = 1 AND cm.admission_date >= $1::DATE AND cm.admission_date <= $2::DATE THEN 1 END) AS male_count,
        COUNT(CASE WHEN cm.sex_id = 2 AND cm.admission_date >= $1::DATE AND cm.admission_date <= $2::DATE THEN 1 END) AS female_count,
        
        -- Referred By
        COUNT(CASE WHEN cm.referred_by_id = 1 AND cm.admission_date >= $1::DATE AND cm.admission_date <= $2::DATE THEN 1 END) AS ref_sahiya,
        COUNT(CASE WHEN cm.referred_by_id = 2 AND cm.admission_date >= $1::DATE AND cm.admission_date <= $2::DATE THEN 1 END) AS ref_aww,
        COUNT(CASE WHEN cm.referred_by_id NOT IN (1, 2) AND cm.admission_date >= $1::DATE AND cm.admission_date <= $2::DATE THEN 1 END) AS ref_other,

        -- Exits and Outcomes (Discharge Date Range)
        COUNT(CASE WHEN cm.discharge_date >= $1::DATE AND cm.discharge_date <= $2::DATE THEN 1 END) AS exits,
        COUNT(CASE WHEN cm.outcome_indicator_id = 1 AND cm.discharge_date >= $1::DATE AND cm.discharge_date <= $2::DATE THEN 1 END) AS cured,
        COUNT(CASE WHEN cm.outcome_indicator_id = 2 AND cm.discharge_date >= $1::DATE AND cm.discharge_date <= $2::DATE THEN 1 END) AS defaulter,
        COUNT(CASE WHEN cm.outcome_indicator_id = 3 AND cm.discharge_date >= $1::DATE AND cm.discharge_date <= $2::DATE THEN 1 END) AS med_transfer,
        COUNT(CASE WHEN cm.outcome_indicator_id = 4 AND cm.discharge_date >= $1::DATE AND cm.discharge_date <= $2::DATE THEN 1 END) AS non_respondent,
        COUNT(CASE WHEN cm.outcome_indicator_id = 5 AND cm.discharge_date >= $1::DATE AND cm.discharge_date <= $2::DATE THEN 1 END) AS death

      FROM mtc_child_master cm
      JOIN mtc_centers c ON cm.mtc_id = c.mtc_id
      WHERE (
        (cm.admission_date >= $1::DATE AND cm.admission_date <= $2::DATE) OR
        (cm.discharge_date >= $1::DATE AND cm.discharge_date <= $2::DATE)
      )
      ${!isAllDistricts ? 'AND UPPER(c.district) = $3' : ''}
      GROUP BY UPPER(c.district)
    `;

    const masterParams = !isAllDistricts ? [districtName.toUpperCase()] : [];
    const telemetryParams = !isAllDistricts ? [fromDate, toDate, districtName.toUpperCase()] : [fromDate, toDate];

    const [districtMasterRes, occupancyRes, childRes] = await Promise.all([
      query<DistrictMasterRow>(districtMasterSql, masterParams),
      query<DistrictOccupancyRow>(occupancySql, telemetryParams),
      query<DistrictChildMasterRow>(childMasterSql, telemetryParams),
    ]);

    const occupancyMap = new Map(occupancyRes.rows.map((r) => [r.district, Number(r.avg_occupancy) || 0]));
    const childMap = new Map(childRes.rows.map((r) => [r.district, r]));

    // Map over selected or all districts (Guarantees zero values if empty)
    const districtFactRows = districtMasterRes.rows.map((distObj) => {
      const dist = distObj.district;
      const childData = childMap.get(dist) || ({} as Partial<DistrictChildMasterRow>);
      const bedOccupancy = occupancyMap.get(dist) || 0;

      const admissions = Number(childData.admissions) || 0;
      const male = Number(childData.male_count) || 0;
      const female = Number(childData.female_count) || 0;

      const genderM = admissions > 0 ? (male / admissions) * 100 : 0;
      const genderF = admissions > 0 ? (female / admissions) * 100 : 0;

      const refSahiya = Number(childData.ref_sahiya) || 0;
      const refAww = Number(childData.ref_aww) || 0;
      const refOther = Number(childData.ref_other) || 0;

      const sahiyaPct = admissions > 0 ? (refSahiya / admissions) * 100 : 0;
      const awwPct = admissions > 0 ? (refAww / admissions) * 100 : 0;
      const otherPct = admissions > 0 ? (refOther / admissions) * 100 : 0;

      const exits = Number(childData.exits) || 0;
      const cured = Number(childData.cured) || 0;
      const defaulter = Number(childData.defaulter) || 0;
      const medTransfer = Number(childData.med_transfer) || 0;
      const nonRespondent = Number(childData.non_respondent) || 0;
      const death = Number(childData.death) || 0;

      const cureRate = exits > 0 ? (cured / exits) * 100 : 0;
      const defaulterRate = exits > 0 ? (defaulter / exits) * 100 : 0;
      const medTransferRate = exits > 0 ? (medTransfer / exits) * 100 : 0;
      const nonRespondentRate = exits > 0 ? (nonRespondent / exits) * 100 : 0;
      const deathRate = exits > 0 ? (death / exits) * 100 : 0;

      const compositeScore = Number(((bedOccupancy + cureRate) / 2).toFixed(1));

      return {
        districtId: dist,
        district: dist,
        bedOccupancy,
        admissions,
        gender: { m: genderM, f: genderF },
        referredBy: { sahiya: sahiyaPct, aww: awwPct, other: otherPct },
        exits,
        outcome: {
          cure: cureRate,
          defaulter: defaulterRate,
          medTransfer: medTransferRate,
          nonRespondent: nonRespondentRate,
          death: deathRate,
        },
        compositeScore,
      };
    });

    // Sort by Composite Score
    const sortedDistricts = [...districtFactRows].sort((a, b) => b.compositeScore - a.compositeScore);

    const finalReport = sortedDistricts.map((row, idx) => {
      const currentRank = row.compositeScore > 0 ? idx + 1 : 0;
      const previousRank = 0;

      return {
        sl: idx + 1,
        districtId: row.districtId,
        district: row.district,
        bedOccupancy: row.bedOccupancy,
        admissions: row.admissions,
        gender: row.gender,
        referredBy: row.referredBy,
        exits: row.exits,
        outcome: row.outcome,
        compositeScore: row.compositeScore,
        rankJanMar: currentRank,
        rankChange: { type: 'neutral', value: 0 },
        rankOctDec: previousRank,
      };
    });

    return NextResponse.json({
      success: true,
      totalDistricts: finalReport.length,
      data: finalReport,
    });
  } catch (error: any) {
    console.error('State Factsheet error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate state factsheet', details: error.message },
      { status: 500 }
    );
  }
}