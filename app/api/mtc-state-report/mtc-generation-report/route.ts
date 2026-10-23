// app\api\mtc-state-report\mtc-generation-report
import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const fromDate = searchParams.get('fromDate');
    const toDate = searchParams.get('toDate');
    const districtIdsParam = searchParams.get('districtIds');
    const mtcIdsParam = searchParams.get('mtcIds');

    if (!fromDate || !toDate) {
      return NextResponse.json(
        { success: false, error: 'Missing required date parameters (fromDate, toDate)' },
        { status: 400 }
      );
    }

    let selectedDistricts: string[] = [];
    if (districtIdsParam && districtIdsParam.trim() !== '') {
      selectedDistricts = districtIdsParam
        .split(',')
        .map((d) => d.trim().toUpperCase())
        .filter((d) => d !== '' && d !== 'ALL' && d !== 'JHARKHAND (ALL)');
    }

    let selectedMtcs: string[] = [];
    if (mtcIdsParam && mtcIdsParam.trim() !== '') {
      selectedMtcs = mtcIdsParam
        .split(',')
        .map((m) => m.trim())
        .filter((m) => m !== '' && m !== 'ALL');
    }

    const hasDistrictFilter = selectedDistricts.length > 0;
    const hasMtcFilter = selectedMtcs.length > 0;

    // Introspect Columns dynamically
    const centerIdCols = await query<{ column_name: string }>(
      `SELECT column_name FROM information_schema.columns WHERE table_name = 'mtc_centers' AND column_name IN ('mtc_id', 'mtc_code', 'id');`,
      []
    );
    const centerIdCol = centerIdCols.rows.length > 0 ? centerIdCols.rows[0].column_name : 'mtc_code';

    const childCenterCols = await query<{ column_name: string }>(
      `SELECT column_name FROM information_schema.columns WHERE table_name = 'mtc_child_master' AND column_name IN ('mtc_id', 'mtc_code', 'center_id');`,
      []
    );
    const childCenterCol = childCenterCols.rows.length > 0 ? childCenterCols.rows[0].column_name : 'mtc_id';

    const centerNameCols = await query<{ column_name: string }>(
      `SELECT column_name FROM information_schema.columns WHERE table_name = 'mtc_centers' AND column_name IN ('mtc_name', 'center_name', 'name');`,
      []
    );
    const centerNameCol = centerNameCols.rows.length > 0 ? centerNameCols.rows[0].column_name : 'mtc_name';

    const bedCols = await query<{ column_name: string }>(
      `SELECT column_name FROM information_schema.columns WHERE table_name = 'mtc_centers' AND column_name IN ('sanctioned_beds', 'total_beds', 'no_of_beds', 'beds');`,
      []
    );
    const bedCol = bedCols.rows.length > 0 ? bedCols.rows[0].column_name : null;
    const bedsExpr = bedCol ? `c.${bedCol}` : '0';

    const occCols = await query<{ column_name: string }>(
      `SELECT column_name FROM information_schema.columns WHERE table_name = 'mtc_bed_occupancy' AND column_name IN ('occupied_beds', 'bed_occupancy_percentage', 'bed_occupancy', 'occupied');`,
      []
    );
    const occCol = occCols.rows.length > 0 ? occCols.rows[0].column_name : null;
    const occupiedExpr = occCol ? `b.${occCol}` : '0';

    const catCols = await query<{ column_name: string }>(
      `SELECT column_name FROM information_schema.columns WHERE table_name = 'mtc_child_master' AND column_name IN ('category_id', 'caste_id', 'social_category_id', 'category');`,
      []
    );
    const catCol = catCols.rows.length > 0 ? catCols.rows[0].column_name : null;
    const categoryExpr = catCol ? `cm.${catCol}` : '0';

    const ageCols = await query<{ column_name: string }>(
      `SELECT column_name FROM information_schema.columns WHERE table_name = 'mtc_child_master' AND column_name IN ('age_in_months', 'dob', 'date_of_birth', 'age_months');`,
      []
    );
    const existingAgeCols = ageCols.rows.map((r) => r.column_name);

    let ageMonthsExpr = '0';
    if (existingAgeCols.includes('age_in_months')) {
      ageMonthsExpr = 'COALESCE(cm.age_in_months, 0)';
    } else if (existingAgeCols.includes('age_months')) {
      ageMonthsExpr = 'COALESCE(cm.age_months, 0)';
    } else if (existingAgeCols.includes('dob')) {
      ageMonthsExpr = `COALESCE(EXTRACT(MONTH FROM AGE(cm.admission_date, cm.dob)) + (EXTRACT(YEAR FROM AGE(cm.admission_date, cm.dob)) * 12), 0)`;
    } else if (existingAgeCols.includes('date_of_birth')) {
      ageMonthsExpr = `COALESCE(EXTRACT(MONTH FROM AGE(cm.admission_date, cm.date_of_birth)) + (EXTRACT(YEAR FROM AGE(cm.admission_date, cm.date_of_birth)) * 12), 0)`;
    }

    let paramIdx = 3;
    let distFilterClause = '';
    let mtcFilterClause = '';
    const queryParams: any[] = [fromDate, toDate];

    if (hasDistrictFilter) {
      distFilterClause = `AND UPPER(c.district) = ANY($${paramIdx}::text[])`;
      queryParams.push(selectedDistricts);
      paramIdx++;
    }

    if (hasMtcFilter) {
      mtcFilterClause = `AND c.${centerIdCol}::text = ANY($${paramIdx}::text[])`;
      queryParams.push(selectedMtcs);
      paramIdx++;
    }

    const reportSql = `
      WITH mtc_list AS (
        SELECT 
          c.${centerIdCol}::text AS mtc_id,
          UPPER(c.${centerNameCol}) AS mtc_name,
          UPPER(c.district) AS district,
          COALESCE(${bedsExpr}, 0) AS sanctioned_beds
        FROM mtc_centers c
        WHERE c.district IS NOT NULL AND TRIM(c.district) != ''
        ${distFilterClause}
        ${mtcFilterClause}
      ),
      admissions_agg AS (
        SELECT 
          c.${centerIdCol}::text AS mtc_id,
          COUNT(*) AS total_admissions,
          COUNT(CASE WHEN cm.sex_id = 1 THEN 1 END) AS male,
          COUNT(CASE WHEN cm.sex_id = 2 THEN 1 END) AS female,
          COUNT(CASE WHEN cm.sex_id NOT IN (1, 2) OR cm.sex_id IS NULL THEN 1 END) AS other_gender,
          COUNT(CASE WHEN ${categoryExpr} = 1 THEN 1 END) AS st,
          COUNT(CASE WHEN ${categoryExpr} = 2 THEN 1 END) AS sc,
          COUNT(CASE WHEN ${categoryExpr} = 3 THEN 1 END) AS obc,
          COUNT(CASE WHEN ${categoryExpr} NOT IN (1, 2, 3) OR ${categoryExpr} IS NULL THEN 1 END) AS general,
          COUNT(CASE WHEN cm.referred_by_id = 1 THEN 1 END) AS sahiya,
          COUNT(CASE WHEN cm.referred_by_id = 2 THEN 1 END) AS anm,
          COUNT(CASE WHEN cm.referred_by_id = 3 THEN 1 END) AS self_referral,
          COUNT(CASE WHEN cm.referred_by_id NOT IN (1, 2, 3) OR cm.referred_by_id IS NULL THEN 1 END) AS others_referral
        FROM mtc_child_master cm
        JOIN mtc_centers c ON cm.${childCenterCol} = c.${centerIdCol}
        WHERE cm.admission_date >= $1::DATE AND cm.admission_date <= $2::DATE
        ${distFilterClause}
        ${mtcFilterClause}
        GROUP BY c.${centerIdCol}
      ),
      discharges_agg AS (
        SELECT 
          c.${centerIdCol}::text AS mtc_id,
          COUNT(CASE WHEN (${ageMonthsExpr}) < 6 THEN 1 END) AS age_0_6m,
          COUNT(CASE WHEN (${ageMonthsExpr}) >= 6 AND (${ageMonthsExpr}) <= 23 THEN 1 END) AS age_6_23m,
          COUNT(CASE WHEN (${ageMonthsExpr}) >= 24 AND (${ageMonthsExpr}) <= 59 THEN 1 END) AS age_24_59m,
          COUNT(CASE WHEN cm.outcome_indicator_id = 1 THEN 1 END) AS compliant_discharge,
          COUNT(CASE WHEN cm.outcome_indicator_id IN (2, 3, 4, 5) THEN 1 END) AS non_compliant_discharge,
          COUNT(*) AS total_discharged
        FROM mtc_child_master cm
        JOIN mtc_centers c ON cm.${childCenterCol} = c.${centerIdCol}
        WHERE cm.discharge_date >= $1::DATE AND cm.discharge_date <= $2::DATE
        ${distFilterClause}
        ${mtcFilterClause}
        GROUP BY c.${centerIdCol}
      ),
      beds_agg AS (
        SELECT 
          c.${centerIdCol}::text AS mtc_id,
          COALESCE(ROUND(AVG(${occupiedExpr})), 0) AS occupied_beds
        FROM mtc_centers c
        LEFT JOIN mtc_bed_occupancy b 
          ON b.mtc_code = c.mtc_code 
          AND b.record_date >= $1::DATE 
          AND b.record_date <= $2::DATE
        WHERE 1=1
        ${distFilterClause}
        ${mtcFilterClause}
        GROUP BY c.${centerIdCol}
      )
      SELECT 
        ml.mtc_id,
        ml.mtc_name,
        ml.district,
        ml.sanctioned_beds,
        COALESCE(adm.total_admissions, 0) AS total_admissions,
        COALESCE(adm.male, 0) AS male,
        COALESCE(adm.female, 0) AS female,
        COALESCE(adm.other_gender, 0) AS other_gender,
        COALESCE(adm.st, 0) AS st,
        COALESCE(adm.sc, 0) AS sc,
        COALESCE(adm.obc, 0) AS obc,
        COALESCE(adm.general, 0) AS general,
        COALESCE(adm.sahiya, 0) AS sahiya,
        COALESCE(adm.anm, 0) AS anm,
        COALESCE(adm.self_referral, 0) AS self_referral,
        COALESCE(adm.others_referral, 0) AS others_referral,
        COALESCE(dis.age_0_6m, 0) AS age_0_6m,
        COALESCE(dis.age_6_23m, 0) AS age_6_23m,
        COALESCE(dis.age_24_59m, 0) AS age_24_59m,
        COALESCE(dis.compliant_discharge, 0) AS compliant_discharge,
        COALESCE(dis.non_compliant_discharge, 0) AS non_compliant_discharge,
        COALESCE(dis.total_discharged, 0) AS total_discharged,
        COALESCE(b.occupied_beds, 0) AS occupied_beds
      FROM mtc_list ml
      LEFT JOIN admissions_agg adm ON ml.mtc_id = adm.mtc_id
      LEFT JOIN discharges_agg dis ON ml.mtc_id = dis.mtc_id
      LEFT JOIN beds_agg b ON ml.mtc_id = b.mtc_id
      ORDER BY ml.district ASC, ml.mtc_name ASC;
    `;

    const { rows } = await query<any>(reportSql, queryParams);

    const reportData = rows.map((row) => {
      const sanctionedBeds = Number(row.sanctioned_beds) || 0;
      const occupiedBeds = Number(row.occupied_beds) || 0;
      const bedOccupancyRate =
        sanctionedBeds > 0
          ? Number(((occupiedBeds / sanctionedBeds) * 100).toFixed(1))
          : 0;

      return {
        mtcId: row.mtc_id,
        mtcName: row.mtc_name,
        districtName: row.district,
        totalAdmissions: Number(row.total_admissions) || 0,
        male: Number(row.male) || 0,
        female: Number(row.female) || 0,
        otherGender: Number(row.other_gender) || 0,
        st: Number(row.st) || 0,
        sc: Number(row.sc) || 0,
        obc: Number(row.obc) || 0,
        general: Number(row.general) || 0,
        sahiya: Number(row.sahiya) || 0,
        anm: Number(row.anm) || 0,
        selfReferral: Number(row.self_referral) || 0,
        othersReferral: Number(row.others_referral) || 0,
        age0to6m: Number(row.age_0_6m) || 0,
        age6to23m: Number(row.age_6_23m) || 0,
        age24to59m: Number(row.age_24_59m) || 0,
        compliantDischarge: Number(row.compliant_discharge) || 0,
        nonCompliantDischarge: Number(row.non_compliant_discharge) || 0,
        totalDischarged: Number(row.total_discharged) || 0,
        sanctionedBeds,
        occupiedBeds,
        bedOccupancyRate,
      };
    });

    return NextResponse.json({ success: true, count: reportData.length, data: reportData });
  } catch (error: any) {
    console.error('MTC Generation Report Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate MTC report', details: error.message },
      { status: 500 }
    );
  }
}