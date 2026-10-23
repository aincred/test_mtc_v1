import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const fromDate = searchParams.get("fromDate");
    const toDate = searchParams.get("toDate");
    const districtParam = searchParams.get("district");

    let childWhereClauses: string[] = [];
    let childQueryParams: any[] = [];
    let childParamIdx = 1;

    // Filter Child Master by Admission Date
    if (fromDate) {
      childWhereClauses.push(`m.admission_date >= $${childParamIdx}::DATE`);
      childQueryParams.push(fromDate);
      childParamIdx++;
    }

    if (toDate) {
      childWhereClauses.push(`m.admission_date <= $${childParamIdx}::DATE`);
      childQueryParams.push(toDate);
      childParamIdx++;
    }

    // Filter by District Name
    if (districtParam && districtParam.trim() !== "") {
      childWhereClauses.push(`UPPER(c.district) = $${childParamIdx}`);
      childQueryParams.push(districtParam.trim().toUpperCase());
      childParamIdx++;
    }

    const childWhereString =
      childWhereClauses.length > 0 ? `WHERE ${childWhereClauses.join(" AND ")}` : "";

    // 1. Fetch MTC Centers Directory, Bed Capacity, & Summary Metrics
    let centersWhere = "";
    let centersParams: any[] = [];
    if (districtParam && districtParam.trim() !== "") {
      centersWhere = `WHERE UPPER(c.district) = $1`;
      centersParams.push(districtParam.trim().toUpperCase());
    }

    const centersSql = `
      SELECT 
        c.mtc_id,
        c.mtc_code,
        c.mtc_name,
        c.district,
        COALESCE(b.number_of_beds, 10)::INT AS number_of_beds,
        COUNT(m.registration_id)::INT AS total_admissions,
        COUNT(CASE WHEN m.outcome_indicator_id = 1 THEN 1 END)::INT AS total_cured
      FROM public.mtc_centers c
      LEFT JOIN public.mtc_bed_capacity b 
        ON UPPER(TRIM(c.district)) = UPPER(TRIM(b.district)) 
        AND UPPER(TRIM(c.mtc_name)) = UPPER(TRIM(b.mtc_name))
      LEFT JOIN public.mtc_child_master m ON c.mtc_id = m.mtc_id
      ${centersWhere}
      GROUP BY c.mtc_id, c.mtc_code, c.mtc_name, c.district, b.number_of_beds
      ORDER BY c.district ASC, c.mtc_name ASC
    `;
    const centersRes = await query(centersSql, centersParams);

    // 2. Aggregate KPI Stat Cards
    const kpiSql = `
      SELECT 
        COUNT(m.registration_id)::INT AS total_admissions,
        COUNT(CASE WHEN m.outcome_indicator_id = 1 THEN 1 END)::INT AS total_cured,
        COUNT(CASE WHEN m.sex_id = 1 THEN 1 END)::INT AS male_count,
        COUNT(CASE WHEN m.sex_id = 2 THEN 1 END)::INT AS female_count,
        COUNT(CASE WHEN m.sex_id NOT IN (1, 2) OR m.sex_id IS NULL THEN 1 END)::INT AS other_gender_count,
        
        -- Age Groups (Months)
        COUNT(CASE WHEN (m.age_years * 12 + COALESCE(m.age_months, 0)) <= 6 THEN 1 END)::INT AS age_0_6m,
        COUNT(CASE WHEN (m.age_years * 12 + COALESCE(m.age_months, 0)) BETWEEN 7 AND 24 THEN 1 END)::INT AS age_6_24m,
        COUNT(CASE WHEN (m.age_years * 12 + COALESCE(m.age_months, 0)) BETWEEN 25 AND 36 THEN 1 END)::INT AS age_24_36m,
        COUNT(CASE WHEN (m.age_years * 12 + COALESCE(m.age_months, 0)) > 36 THEN 1 END)::INT AS age_above_36m,

        -- Complications
        COUNT(CASE WHEN m.medical_complications IS NOT NULL AND array_to_string(m.medical_complications, ',') NOT LIKE '%NO COMPLICATION%' THEN 1 END)::INT AS complicated_count,
        COUNT(CASE WHEN m.medical_complications IS NULL OR array_to_string(m.medical_complications, ',') LIKE '%NO COMPLICATION%' THEN 1 END)::INT AS not_complicated_count,

        -- Category / Caste
        COUNT(CASE WHEN m.caste_id = 1 THEN 1 END)::INT AS sc_count,
        COUNT(CASE WHEN m.caste_id = 2 THEN 1 END)::INT AS st_count,
        COUNT(CASE WHEN m.caste_id = 3 THEN 1 END)::INT AS obc_count,
        COUNT(CASE WHEN m.caste_id NOT IN (1, 2, 3) OR m.caste_id IS NULL THEN 1 END)::INT AS others_caste_count,

        -- Outcome Breakdown
        COUNT(CASE WHEN m.outcome_indicator_id = 1 THEN 1 END)::INT AS cured_count,
        COUNT(CASE WHEN m.outcome_indicator_id = 2 THEN 1 END)::INT AS non_responder_count,
        COUNT(CASE WHEN m.outcome_indicator_id = 3 THEN 1 END)::INT AS defaulter_count,
        COUNT(CASE WHEN m.outcome_indicator_id = 4 THEN 1 END)::INT AS med_transfer_count,
        COUNT(CASE WHEN m.outcome_indicator_id = 5 THEN 1 END)::INT AS death_count
      FROM public.mtc_child_master m
      LEFT JOIN public.mtc_centers c ON m.mtc_id = c.mtc_id
      ${childWhereString}
    `;

    const kpiRes = await query(kpiSql, childQueryParams);
    const kpi = kpiRes.rows[0] || {};

    // 3. Referral Sources
    const referralSql = `
      SELECT 
        COALESCE(m.referred_by_id, 0) AS ref_id,
        COUNT(*)::INT AS count
      FROM public.mtc_child_master m
      LEFT JOIN public.mtc_centers c ON m.mtc_id = c.mtc_id
      ${childWhereString}
      GROUP BY COALESCE(m.referred_by_id, 0)
    `;
    const referralRes = await query(referralSql, childQueryParams);

    const referralMap: Record<number, string> = {
      1: "Sahiya / ASHA",
      2: "Anganwadi (AWW)",
      3: "OPD / Doctor",
      4: "Self / Family",
      5: "RBSK",
      6: "Poshan Sakhi",
      7: "ANM",
    };

    const referralLabels: string[] = [];
    const referralCounts: number[] = [];

    referralRes.rows.forEach((row: any) => {
      referralLabels.push(referralMap[row.ref_id] || `Channel #${row.ref_id}`);
      referralCounts.push(row.count);
    });

    const totalAdmissions = Number(kpi.total_admissions || 0);
    const totalCured = Number(kpi.total_cured || 0);
    const recoveryRate =
      totalAdmissions > 0 ? ((totalCured / totalAdmissions) * 100).toFixed(1) : "0.0";

    // Calculate Total Sanctioned & Available Beds from Bed Capacity Table
    const totalSanctionedBeds = centersRes.rows.reduce(
      (sum: number, row: any) => sum + Number(row.number_of_beds || 10),
      0
    );

    // Format Facilities Data
    const formattedFacilities = centersRes.rows.map((row: any) => ({
      id: `MTC-${row.mtc_id}`,
      district: row.district || "UNASSIGNED",
      division: "JHARKHAND",
      facilityName: row.mtc_name || "MTC Center",
      sanctionedBeds: Number(row.number_of_beds || 10),
      availableBeds: Number(row.number_of_beds || 10),
      totalAdmissions: Number(row.total_admissions || 0),
      totalCured: Number(row.total_cured || 0),
      status: "Functional",
    }));

    return NextResponse.json({
      success: true,
      data: {
        kpi: {
          sanctionedMtcs: centersRes.rows.length,
          sanctionedBeds: totalSanctionedBeds,
          functionalMtcs: centersRes.rows.length,
          availableBeds: totalSanctionedBeds,
          totalAdmissions,
          totalCured,
          recoveryRate: `${recoveryRate}%`,
        },
        charts: {
          gender: [
            Number(kpi.male_count || 0),
            Number(kpi.female_count || 0),
            Number(kpi.other_gender_count || 0),
          ],
          ageGroups: [
            Number(kpi.age_0_6m || 0),
            Number(kpi.age_6_24m || 0),
            Number(kpi.age_24_36m || 0),
            Number(kpi.age_above_36m || 0),
          ],
          complications: [
            Number(kpi.complicated_count || 0),
            Number(kpi.not_complicated_count || 0),
          ],
          referrals: { labels: referralLabels, counts: referralCounts },
          caste: [
            Number(kpi.sc_count || 0),
            Number(kpi.st_count || 0),
            Number(kpi.obc_count || 0),
            Number(kpi.others_caste_count || 0),
          ],
          outcomes: [
            Number(kpi.cured_count || 0),
            Number(kpi.death_count || 0),
            Number(kpi.defaulter_count || 0),
            Number(kpi.med_transfer_count || 0),
            Number(kpi.non_responder_count || 0),
          ],
        },
        facilities: formattedFacilities,
      },
    });
  } catch (error: any) {
    console.error("Dashboard Overview API Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to load dashboard overview data", details: error.message },
      { status: 500 }
    );
  }
}