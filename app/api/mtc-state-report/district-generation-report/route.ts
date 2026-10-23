// import { NextResponse } from 'next/server';
// import { query } from '@/lib/db';

// export const dynamic = 'force-dynamic';

// interface DistrictReportQueryResult {
//   district: string;
//   total_admissions: number;
//   male: number;
//   female: number;
//   other_gender: number;
//   st: number;
//   sc: number;
//   obc: number;
//   general: number;
//   sahiya: number;
//   anm: number;
//   self_referral: number;
//   others_referral: number;
//   age_0_6m: number;
//   age_6_23m: number;
//   age_24_59m: number;
//   compliant_discharge: number;
//   non_compliant_discharge: number;
//   total_discharged: number;
//   sanctioned_beds: number;
//   occupied_beds: number;
// }

// export async function GET(request: Request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const fromDate = searchParams.get('fromDate');
//     const toDate = searchParams.get('toDate');
//     const districtIdsParam = searchParams.get('districtIds');

//     if (!fromDate || !toDate) {
//       return NextResponse.json(
//         { success: false, error: 'Missing required date parameters (fromDate, toDate)' },
//         { status: 400 }
//       );
//     }

//     // 1. Parse comma-separated district names/IDs
//     let selectedDistricts: string[] = [];
//     if (districtIdsParam && districtIdsParam.trim() !== '') {
//       selectedDistricts = districtIdsParam
//         .split(',')
//         .map((d) => d.trim().toUpperCase())
//         .filter((d) => d !== '' && d !== 'ALL' && d !== 'JHARKHAND (ALL)');
//     }

//     const hasDistrictFilter = selectedDistricts.length > 0;

//     // 2. Dynamic Introspection for mtc_centers (Sanctioned Beds Column)
//     const centersColsSql = `
//       SELECT column_name 
//       FROM information_schema.columns 
//       WHERE table_name = 'mtc_centers' 
//         AND column_name IN ('sanctioned_beds', 'total_beds', 'no_of_beds', 'beds', 'bed_capacity', 'capacity');
//     `;
//     const centersColsRes = await query<{ column_name: string }>(centersColsSql, []);
//     const bedsCol = centersColsRes.rows.length > 0 ? centersColsRes.rows[0].column_name : null;
//     const bedsExpr = bedsCol ? `c.${bedsCol}` : '0';

//     // 3. Dynamic Introspection for mtc_bed_occupancy (Occupied Beds Column)
//     const occupancyColsSql = `
//       SELECT column_name 
//       FROM information_schema.columns 
//       WHERE table_name = 'mtc_bed_occupancy' 
//         AND column_name IN ('occupied_beds', 'bed_occupancy_percentage', 'bed_occupancy', 'occupied');
//     `;
//     const occupancyColsRes = await query<{ column_name: string }>(occupancyColsSql, []);
//     const occupiedCol = occupancyColsRes.rows.length > 0 ? occupancyColsRes.rows[0].column_name : null;
//     const occupiedExpr = occupiedCol ? `b.${occupiedCol}` : '0';

//     // 4. Dynamic Introspection for mtc_child_master (Category Column)
//     const categoryColsSql = `
//       SELECT column_name 
//       FROM information_schema.columns 
//       WHERE table_name = 'mtc_child_master' 
//         AND column_name IN ('category_id', 'caste_id', 'social_category_id', 'category');
//     `;
//     const categoryColsRes = await query<{ column_name: string }>(categoryColsSql, []);
//     const categoryCol = categoryColsRes.rows.length > 0 ? categoryColsRes.rows[0].column_name : null;
//     const categoryExpr = categoryCol ? `cm.${categoryCol}` : '0';

//     // 5. Dynamic Introspection for mtc_child_master (Age Column)
//     const ageColsSql = `
//       SELECT column_name 
//       FROM information_schema.columns 
//       WHERE table_name = 'mtc_child_master' 
//         AND column_name IN ('age_in_months', 'dob', 'date_of_birth', 'age_months');
//     `;
//     const ageColsRes = await query<{ column_name: string }>(ageColsSql, []);
//     const existingAgeCols = ageColsRes.rows.map(r => r.column_name);

//     let ageMonthsExpr = '0';
//     if (existingAgeCols.includes('age_in_months')) {
//       ageMonthsExpr = 'COALESCE(cm.age_in_months, 0)';
//     } else if (existingAgeCols.includes('age_months')) {
//       ageMonthsExpr = 'COALESCE(cm.age_months, 0)';
//     } else if (existingAgeCols.includes('dob')) {
//       ageMonthsExpr = `COALESCE(EXTRACT(MONTH FROM AGE(cm.admission_date, cm.dob)) + (EXTRACT(YEAR FROM AGE(cm.admission_date, cm.dob)) * 12), 0)`;
//     } else if (existingAgeCols.includes('date_of_birth')) {
//       ageMonthsExpr = `COALESCE(EXTRACT(MONTH FROM AGE(cm.admission_date, cm.date_of_birth)) + (EXTRACT(YEAR FROM AGE(cm.admission_date, cm.date_of_birth)) * 12), 0)`;
//     }

//     // 6. SQL Query using resolved dynamic column expressions
//     const reportSql = `
//       WITH district_list AS (
//         SELECT DISTINCT UPPER(district) AS district
//         FROM mtc_centers
//         WHERE district IS NOT NULL AND TRIM(district) != ''
//         ${hasDistrictFilter ? 'AND UPPER(district) = ANY($3::text[])' : ''}
//       ),
//       admissions_agg AS (
//         SELECT 
//           UPPER(c.district) AS district,
//           COUNT(*) AS total_admissions,
          
//           -- Gender Breakdown
//           COUNT(CASE WHEN cm.sex_id = 1 THEN 1 END) AS male,
//           COUNT(CASE WHEN cm.sex_id = 2 THEN 1 END) AS female,
//           COUNT(CASE WHEN cm.sex_id NOT IN (1, 2) OR cm.sex_id IS NULL THEN 1 END) AS other_gender,
          
//           -- Category / Caste
//           COUNT(CASE WHEN ${categoryExpr} = 1 THEN 1 END) AS st,
//           COUNT(CASE WHEN ${categoryExpr} = 2 THEN 1 END) AS sc,
//           COUNT(CASE WHEN ${categoryExpr} = 3 THEN 1 END) AS obc,
//           COUNT(CASE WHEN ${categoryExpr} NOT IN (1, 2, 3) OR ${categoryExpr} IS NULL THEN 1 END) AS general,

//           -- Referral Sources
//           COUNT(CASE WHEN cm.referred_by_id = 1 THEN 1 END) AS sahiya,
//           COUNT(CASE WHEN cm.referred_by_id = 2 THEN 1 END) AS anm,
//           COUNT(CASE WHEN cm.referred_by_id = 3 THEN 1 END) AS self_referral,
//           COUNT(CASE WHEN cm.referred_by_id NOT IN (1, 2, 3) OR cm.referred_by_id IS NULL THEN 1 END) AS others_referral

//         FROM mtc_child_master cm
//         JOIN mtc_centers c ON cm.mtc_id = c.mtc_id
//         WHERE cm.admission_date >= $1::DATE AND cm.admission_date <= $2::DATE
//         ${hasDistrictFilter ? 'AND UPPER(c.district) = ANY($3::text[])' : ''}
//         GROUP BY UPPER(c.district)
//       ),
//       discharges_agg AS (
//         SELECT 
//           UPPER(c.district) AS district,
          
//           -- Discharge Age Groups
//           COUNT(CASE WHEN (${ageMonthsExpr}) < 6 THEN 1 END) AS age_0_6m,
//           COUNT(CASE WHEN (${ageMonthsExpr}) >= 6 AND (${ageMonthsExpr}) <= 23 THEN 1 END) AS age_6_23m,
//           COUNT(CASE WHEN (${ageMonthsExpr}) >= 24 AND (${ageMonthsExpr}) <= 59 THEN 1 END) AS age_24_59m,

//           -- Performance
//           COUNT(CASE WHEN cm.outcome_indicator_id = 1 THEN 1 END) AS compliant_discharge,
//           COUNT(CASE WHEN cm.outcome_indicator_id IN (2, 3, 4, 5) THEN 1 END) AS non_compliant_discharge,
//           COUNT(*) AS total_discharged

//         FROM mtc_child_master cm
//         JOIN mtc_centers c ON cm.mtc_id = c.mtc_id
//         WHERE cm.discharge_date >= $1::DATE AND cm.discharge_date <= $2::DATE
//         ${hasDistrictFilter ? 'AND UPPER(c.district) = ANY($3::text[])' : ''}
//         GROUP BY UPPER(c.district)
//       ),
//       beds_agg AS (
//         SELECT 
//           UPPER(c.district) AS district,
//           COALESCE(SUM(DISTINCT ${bedsExpr}), 0) AS sanctioned_beds,
//           COALESCE(ROUND(AVG(${occupiedExpr})), 0) AS occupied_beds
//         FROM mtc_centers c
//         LEFT JOIN mtc_bed_occupancy b 
//           ON b.mtc_code = c.mtc_code 
//           AND b.record_date >= $1::DATE 
//           AND b.record_date <= $2::DATE
//         ${hasDistrictFilter ? 'WHERE UPPER(c.district) = ANY($3::text[])' : ''}
//         GROUP BY UPPER(c.district)
//       )
//       SELECT 
//         dl.district,
//         COALESCE(adm.total_admissions, 0) AS total_admissions,
//         COALESCE(adm.male, 0) AS male,
//         COALESCE(adm.female, 0) AS female,
//         COALESCE(adm.other_gender, 0) AS other_gender,
//         COALESCE(adm.st, 0) AS st,
//         COALESCE(adm.sc, 0) AS sc,
//         COALESCE(adm.obc, 0) AS obc,
//         COALESCE(adm.general, 0) AS general,
//         COALESCE(adm.sahiya, 0) AS sahiya,
//         COALESCE(adm.anm, 0) AS anm,
//         COALESCE(adm.self_referral, 0) AS self_referral,
//         COALESCE(adm.others_referral, 0) AS others_referral,
//         COALESCE(dis.age_0_6m, 0) AS age_0_6m,
//         COALESCE(dis.age_6_23m, 0) AS age_6_23m,
//         COALESCE(dis.age_24_59m, 0) AS age_24_59m,
//         COALESCE(dis.compliant_discharge, 0) AS compliant_discharge,
//         COALESCE(dis.non_compliant_discharge, 0) AS non_compliant_discharge,
//         COALESCE(dis.total_discharged, 0) AS total_discharged,
//         COALESCE(b.sanctioned_beds, 0) AS sanctioned_beds,
//         COALESCE(b.occupied_beds, 0) AS occupied_beds
//       FROM district_list dl
//       LEFT JOIN admissions_agg adm ON dl.district = adm.district
//       LEFT JOIN discharges_agg dis ON dl.district = dis.district
//       LEFT JOIN beds_agg b ON dl.district = b.district
//       ORDER BY dl.district ASC;
//     `;

//     const queryParams: any[] = [fromDate, toDate];
//     if (hasDistrictFilter) {
//       queryParams.push(selectedDistricts);
//     }

//     const { rows } = await query<DistrictReportQueryResult>(reportSql, queryParams);

//     const reportData = rows.map((row) => {
//       const sanctionedBeds = Number(row.sanctioned_beds) || 0;
//       const occupiedBeds = Number(row.occupied_beds) || 0;
//       const bedOccupancyRate =
//         sanctionedBeds > 0
//           ? Number(((occupiedBeds / sanctionedBeds) * 100).toFixed(1))
//           : 0;

//       return {
//         districtName: row.district,
//         totalAdmissions: Number(row.total_admissions) || 0,
//         male: Number(row.male) || 0,
//         female: Number(row.female) || 0,
//         otherGender: Number(row.other_gender) || 0,
//         st: Number(row.st) || 0,
//         sc: Number(row.sc) || 0,
//         obc: Number(row.obc) || 0,
//         general: Number(row.general) || 0,
//         sahiya: Number(row.sahiya) || 0,
//         anm: Number(row.anm) || 0,
//         selfReferral: Number(row.self_referral) || 0,
//         othersReferral: Number(row.others_referral) || 0,
//         age0to6m: Number(row.age_0_6m) || 0,
//         age6to23m: Number(row.age_6_23m) || 0,
//         age24to59m: Number(row.age_24_59m) || 0,
//         compliantDischarge: Number(row.compliant_discharge) || 0,
//         nonCompliantDischarge: Number(row.non_compliant_discharge) || 0,
//         totalDischarged: Number(row.total_discharged) || 0,
//         sanctionedBeds,
//         occupiedBeds,
//         bedOccupancyRate,
//       };
//     });

//     return NextResponse.json({
//       success: true,
//       count: reportData.length,
//       data: reportData,
//     });
//   } catch (error: any) {
//     console.error('District Generation Report Error:', error);
//     return NextResponse.json(
//       {
//         success: false,
//         error: 'Failed to generate district admission report',
//         details: error.message,
//       },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") || "Monthly";

    let startDateStr = "";
    let endDateStr = "";

    // 1. Calculate Date Boundaries
    if (type === "Daily") {
      const selectedDate = searchParams.get("fromDate") || new Date().toISOString().split("T")[0];
      startDateStr = selectedDate;
      endDateStr = selectedDate;
    } else if (type === "Monthly") {
      const year = searchParams.get("year") || new Date().getFullYear().toString();
      const month = searchParams.get("month") || (new Date().getMonth() + 1).toString();
      const paddedMonth = month.padStart(2, "0");

      const lastDay = new Date(Number(year), Number(month), 0).getDate();
      startDateStr = `${year}-${paddedMonth}-01`;
      endDateStr = `${year}-${paddedMonth}-${lastDay}`;
    } else if (type === "Quarterly") {
      const year = searchParams.get("year") || new Date().getFullYear().toString();
      const quarter = searchParams.get("quarter") || "Q1";

      if (quarter === "Q1") { startDateStr = `${year}-01-01`; endDateStr = `${year}-03-31`; }
      else if (quarter === "Q2") { startDateStr = `${year}-04-01`; endDateStr = `${year}-06-30`; }
      else if (quarter === "Q3") { startDateStr = `${year}-07-01`; endDateStr = `${year}-09-30`; }
      else if (quarter === "Q4") { startDateStr = `${year}-10-01`; endDateStr = `${year}-12-31`; }
    }

    // 2. Fetch all districts to ensure none are missing
    const districtRes = await query<{ district_id: number; district_name: string }>(
      `SELECT district_id, district_name FROM public.mtc_district ORDER BY district_name ASC`
    );

    if (districtRes.rows.length === 0) {
      return NextResponse.json({
        success: true,
        data: [],
      });
    }

    // 3. Query aggregated bed occupancy grouped by district
    const sqlText = `
      SELECT 
        UPPER(c.district) AS district_name,
        SUM(b.bed_sanctioned)::INT AS total_available_beds,
        SUM(b.utilized_bed)::INT AS beds_occupied
      FROM public.mtc_bed_occupancy b
      INNER JOIN public.mtc_centers c ON b.mtc_code = c.mtc_code
      WHERE b.record_date >= $1::DATE 
        AND b.record_date <= $2::DATE
      GROUP BY UPPER(c.district)
    `;

    const reportRes = await query<{
      district_name: string;
      total_available_beds: number;
      beds_occupied: number;
    }>(sqlText, [startDateStr, endDateStr]);

    // Map query results by district name (uppercase)
    const occupancyMap = new Map();
    reportRes.rows.forEach((row) => occupancyMap.set(row.district_name.toUpperCase(), row));

    // 4. Merge all districts with occupancy records
    const reportData = districtRes.rows.map((dist) => {
      const occ = occupancyMap.get(dist.district_name.toUpperCase());

      const available = Number(occ?.total_available_beds || 0);
      const occupied = Number(occ?.beds_occupied || 0);
      const occupancyRate = available > 0 ? Number(((occupied / available) * 100).toFixed(2)) : 0;

      return {
        id: dist.district_id.toString(),
        districtName: dist.district_name,
        totalAvailableBeds: available,
        bedsOccupied: occupied,
        occupancyRate: occupancyRate,
      };
    });

    return NextResponse.json({
      success: true,
      data: reportData,
    });
  } catch (error: any) {
    console.error("State Bed Occupancy Report API Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to generate district bed occupancy report", details: error.message },
      { status: 500 }
    );
  }
}