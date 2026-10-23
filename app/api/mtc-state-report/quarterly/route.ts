import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const mode = searchParams.get("mode") || "Range";
    const fromDate = searchParams.get("from");
    const toDate = searchParams.get("to");
    const year = searchParams.get("year");
    const quarter = searchParams.get("quarter");
    const districtParams = searchParams.get("districts");
    const mtcParams = searchParams.get("mtc");

    let startDateStr = "";
    let endDateStr = "";

    // Calculate Date Range Boundaries
    if (mode === "Quarterly") {
      const selectedYear = year || new Date().getFullYear().toString();
      const selectedQuarter = quarter || "1";

      if (selectedQuarter === "1") {
        startDateStr = `${selectedYear}-01-01`;
        endDateStr = `${selectedYear}-03-31`;
      } else if (selectedQuarter === "2") {
        startDateStr = `${selectedYear}-04-01`;
        endDateStr = `${selectedYear}-06-30`;
      } else if (selectedQuarter === "3") {
        startDateStr = `${selectedYear}-07-01`;
        endDateStr = `${selectedYear}-09-30`;
      } else if (selectedQuarter === "4") {
        startDateStr = `${selectedYear}-10-01`;
        endDateStr = `${selectedYear}-12-31`;
      }
    } else {
      startDateStr = fromDate || `${new Date().getFullYear()}-01-01`;
      endDateStr = toDate || new Date().toISOString().split("T")[0];
    }

    let mtcWhereClauses: string[] = [];
    let queryParams: any[] = [startDateStr, endDateStr];
    let paramIndex = 3;

    // Filter by Selected Districts from mtc_centers
    if (districtParams && districtParams.trim() !== "") {
      const districtsList = districtParams
        .split(",")
        .map((d) => d.trim().toUpperCase())
        .filter(Boolean);

      if (districtsList.length > 0) {
        mtcWhereClauses.push(`UPPER(c.district) = ANY($${paramIndex})`);
        queryParams.push(districtsList);
        paramIndex++;
      }
    }

    // Filter by Selected MTC Centers from mtc_centers
    if (mtcParams && mtcParams.trim() !== "") {
      const mtcList = mtcParams
        .split(",")
        .map((m) => m.trim().toUpperCase())
        .filter(Boolean);

      if (mtcList.length > 0) {
        mtcWhereClauses.push(`UPPER(c.mtc_name) = ANY($${paramIndex})`);
        queryParams.push(mtcList);
        paramIndex++;
      }
    }

    const mtcWhereString = mtcWhereClauses.length > 0 ? `WHERE ${mtcWhereClauses.join(" AND ")}` : "";

    // Query starting from public.mtc_centers to include all MTC centers
    const sqlText = `
      SELECT 
        c.district AS district_name,
        c.mtc_name AS mtc_name,
        COUNT(m.registration_id)::INT AS total_admissions,
        COUNT(CASE WHEN m.discharge_date IS NOT NULL THEN 1 END)::INT AS total_discharges,
        
        -- Gender Breakdown
        COUNT(CASE WHEN m.sex_id = 1 THEN 1 END)::INT AS male_admissions,
        COUNT(CASE WHEN m.sex_id = 2 THEN 1 END)::INT AS female_admissions,
        
        -- Clinical Averages
        ROUND(COALESCE(AVG(m.admission_weight_kg), 0)::NUMERIC, 2) AS avg_admission_weight,
        ROUND(COALESCE(AVG(m.discharge_weight_kg), 0)::NUMERIC, 2) AS avg_discharge_weight,
        ROUND(COALESCE(AVG(m.total_stay_days), 0)::NUMERIC, 1) AS avg_length_of_stay,

        -- Target Outcomes
        COUNT(CASE WHEN m.outcome_indicator_id = 1 THEN 1 END)::INT AS recovered_count,
        COUNT(CASE WHEN m.outcome_indicator_id = 2 THEN 1 END)::INT AS non_responder_count,
        COUNT(CASE WHEN m.outcome_indicator_id = 3 THEN 1 END)::INT AS defaulter_count,
        COUNT(CASE WHEN m.outcome_indicator_id = 4 THEN 1 END)::INT AS medical_referred_count,
        COUNT(CASE WHEN m.outcome_indicator_id = 5 THEN 1 END)::INT AS death_count
      FROM public.mtc_centers c
      LEFT JOIN public.mtc_child_master m 
        ON (c.mtc_id = m.mtc_id OR UPPER(c.mtc_code) = UPPER(SUBSTRING(m.sam_no FROM 1 FOR LENGTH(c.mtc_code))))
        AND m.admission_date >= $1::DATE 
        AND m.admission_date <= $2::DATE
      ${mtcWhereString}
      GROUP BY c.district, c.mtc_name
      ORDER BY c.district ASC, c.mtc_name ASC
    `;

    const res = await query(sqlText, queryParams);

    return NextResponse.json({
      success: true,
      mode,
      dateRange: { startDate: startDateStr, endDate: endDateStr },
      appliedFilters: {
        districts: districtParams ? districtParams.split(",") : [],
        mtcs: mtcParams ? mtcParams.split(",") : [],
      },
      count: res.rows.length,
      data: res.rows,
    });
  } catch (error: any) {
    console.error("Quarterly Report API Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to generate quarterly report", details: error.message },
      { status: 500 }
    );
  }
}