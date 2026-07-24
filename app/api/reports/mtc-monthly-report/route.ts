import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

interface MonthlyReportQueryRow {
  date: string;
  mtcName: string;
  totalAdmissions: number;
  wfhLess3SD: number;
  muacLess115: number;
  edema: number;
  refAsha: number;
  refAnm: number;
  refSelfOther: number;
  stayLess7: number;
  stay7To14: number;
  stayMore14: number;
  avgStayDays: string;
  cured: number;
  defaulter: number;
  discharged: number;
  referredHigher: number;
  curedRatePercentage: string;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const requestType = searchParams.get('type');

    // -------------------------------------------------------------
    // 1. Dynamic Dropdown Options Fetcher (Districts & MTCs)
    // -------------------------------------------------------------
    if (requestType === 'options') {
      const districtName = searchParams.get('districtName') || 'RANCHI';

      // Fetch all unique districts
      const districtsRes = await query<{ district: string }>(
        `SELECT DISTINCT UPPER(district) AS district FROM mtc_centers WHERE district IS NOT NULL ORDER BY district ASC`
      );

      // Fetch MTC options for selected/locked district
      const mtcRes = await query<{ mtc_id: number; mtc_name: string }>(
        `SELECT mtc_id, mtc_name FROM mtc_centers WHERE UPPER(district) = $1 ORDER BY mtc_name ASC`,
        [districtName.toUpperCase()]
      );

      return NextResponse.json({
        success: true,
        districts: districtsRes.rows.map((d, index) => ({
          id: String(index + 1),
          name: d.district,
        })),
        mtcs: mtcRes.rows.map((m) => ({
          id: String(m.mtc_id),
          name: m.mtc_name,
        })),
      });
    }

    // -------------------------------------------------------------
    // 2. Report Aggregation Query
    // -------------------------------------------------------------
    const fromDate = searchParams.get('fromDate');
    const toDate = searchParams.get('toDate');
    const districtName = searchParams.get('districtName') || 'RANCHI';
    const mtcId = searchParams.get('mtc'); // Selected MTC ID or 'ALL'

    if (!fromDate || !toDate) {
      return NextResponse.json(
        { error: 'Missing required date parameters (fromDate, toDate)' },
        { status: 400 }
      );
    }

    // Resolve targeted MTC IDs
    let targetMtcIds: number[] = [];
    if (mtcId && mtcId !== 'ALL' && mtcId.trim() !== '') {
      const parsedId = Number(mtcId);
      if (!isNaN(parsedId)) targetMtcIds.push(parsedId);
    }

    if (targetMtcIds.length === 0 && districtName.toUpperCase() !== 'ALL') {
      const mtcRes = await query<{ mtc_id: number }>(
        `SELECT mtc_id FROM mtc_centers WHERE UPPER(district) = $1`,
        [districtName.toUpperCase()]
      );
      targetMtcIds = mtcRes.rows.map((r) => Number(r.mtc_id)).filter((id) => !isNaN(id));
    }

    if (targetMtcIds.length === 0) {
      return NextResponse.json({ success: true, count: 0, data: [] });
    }

    // Aggregated SQL grouped by date
    let sqlText = `
      SELECT 
        TO_CHAR(m.admission_date, 'YYYY-MM-DD') AS "date",
        c.mtc_name AS "mtcName",
        
        -- Total Admissions
        COUNT(*)::INTEGER AS "totalAdmissions",

        -- Admission Criteria Breakdown
        COUNT(CASE WHEN m.z_score_sd < -3 THEN 1 END)::INTEGER AS "wfhLess3SD",
        COUNT(CASE WHEN m.muac_cm < 11.5 THEN 1 END)::INTEGER AS "muacLess115",
        COUNT(CASE WHEN m.odema_id IN (1, 2, 3) THEN 1 END)::INTEGER AS "edema",

        -- Referred By Breakdown
        COUNT(CASE WHEN m.referred_by_id = 6 THEN 1 END)::INTEGER AS "refAsha",
        COUNT(CASE WHEN m.referred_by_id = 3 THEN 1 END)::INTEGER AS "refAnm",
        COUNT(CASE WHEN m.referred_by_id NOT IN (3, 6) OR m.referred_by_id IS NULL THEN 1 END)::INTEGER AS "refSelfOther",

        -- Duration of Stay Breakdown
        COUNT(CASE WHEN m.total_stay_days < 7 THEN 1 END)::INTEGER AS "stayLess7",
        COUNT(CASE WHEN m.total_stay_days BETWEEN 7 AND 14 THEN 1 END)::INTEGER AS "stay7To14",
        COUNT(CASE WHEN m.total_stay_days > 14 THEN 1 END)::INTEGER AS "stayMore14",
        COALESCE(ROUND(AVG(m.total_stay_days)::numeric, 1)::text, '0.0') AS "avgStayDays",

        -- Monthly Output Outcomes
        COUNT(CASE WHEN m.outcome_indicator_id = 1 THEN 1 END)::INTEGER AS "cured",
        COUNT(CASE WHEN m.outcome_indicator_id = 2 THEN 1 END)::INTEGER AS "defaulter",
        COUNT(CASE WHEN m.discharge_date IS NOT NULL THEN 1 END)::INTEGER AS "discharged",
        COUNT(CASE WHEN m.outcome_indicator_id = 3 THEN 1 END)::INTEGER AS "referredHigher",

        -- Cure Rate Percentage
        CASE 
          WHEN COUNT(CASE WHEN m.discharge_date IS NOT NULL THEN 1 END) > 0 THEN 
            ROUND((COUNT(CASE WHEN m.outcome_indicator_id = 1 THEN 1 END)::decimal / COUNT(CASE WHEN m.discharge_date IS NOT NULL THEN 1 END)::decimal) * 100, 1)::text || '%'
          ELSE '0%'
        END AS "curedRatePercentage"

      FROM mtc_child_master m
      JOIN mtc_centers c ON m.mtc_id = c.mtc_id
      WHERE m.admission_date >= $1::DATE 
        AND m.admission_date <= $2::DATE
        AND m.mtc_id = ANY($3::int[])
      GROUP BY m.admission_date, c.mtc_name
      ORDER BY m.admission_date ASC;
    `;

    const result = await query<MonthlyReportQueryRow>(sqlText, [fromDate, toDate, targetMtcIds]);

    const formattedData = result.rows.map((row) => ({
      id: `date-${row.date}-${row.mtcName}`,
      date: row.date,
      mtcName: row.mtcName,
      totalAdmissions: row.totalAdmissions,
      criteria: {
        wfhLess3SD: row.wfhLess3SD,
        muacLess115: row.muacLess115,
        edema: row.edema,
      },
      referredBy: {
        asha: row.refAsha,
        anm: row.refAnm,
        self: row.refSelfOther,
      },
      durationOfStay: {
        lessThan7Days: row.stayLess7,
        sevenTo14Days: row.stay7To14,
        moreThan14Days: row.stayMore14,
        avgStayDays: row.avgStayDays,
      },
      monthlyOutput: {
        cured: row.cured,
        defaulter: row.defaulter,
        discharged: row.discharged,
        referredHigher: row.referredHigher,
        curedRatePercentage: row.curedRatePercentage,
      },
    }));

    return NextResponse.json({
      success: true,
      count: formattedData.length,
      data: formattedData,
    }, { status: 200 });

  } catch (error: any) {
    console.error('MTC Monthly Report API Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate monthly report', details: error.message },
      { status: 500 }
    );
  }
}