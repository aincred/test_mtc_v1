import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const districtName = searchParams.get('districtName') || 'RANCHI';
    const mtcsParam = searchParams.get('mtcs');

    let targetMtcIds: number[] = [];
    if (mtcsParam && mtcsParam.trim() !== '') {
      targetMtcIds = mtcsParam.split(',').map(id => Number(id)).filter(id => !isNaN(id));
    }

    if (targetMtcIds.length === 0) {
      const mtcRes = await query<{ mtc_id: number }>(
        `SELECT mtc_id FROM mtc_centers WHERE UPPER(district) = $1`,
        [districtName.toUpperCase()]
      );
      targetMtcIds = mtcRes.rows.map(r => Number(r.mtc_id));
    }

    if (targetMtcIds.length === 0) {
      return NextResponse.json({
        success: true,
        kpis: { totalCured: 0, avgCureRate: "0.0%", totalReferrals: 0 },
        children: []
      });
    }

    // Query Discharged Patients
    const sqlText = `
      SELECT 
        COALESCE(m.sam_no, m.registration_id::text) AS id,
        COALESCE(m.child_full_name, 'Unknown') AS name,
        CASE 
          WHEN m.age_months IS NOT NULL AND m.age_months > 0 THEN CONCAT(m.age_months, ' Months')
          WHEN m.age_years IS NOT NULL THEN CONCAT(m.age_years, ' Years')
          ELSE 'N/A'
        END AS age,
        c.mtc_name AS mtc,
        CONCAT(COALESCE(m.admission_weight_kg, 0), ' kg') AS "admissionWeight",
        CONCAT(COALESCE(m.discharge_weight_kg, 0), ' kg') AS "dischargeWeight",
        TO_CHAR(COALESCE(m.discharge_date, m.admission_date), 'DD Mon YYYY') AS date,
        CASE 
          WHEN m.outcome_indicator_id = 1 THEN 'Cured'
          WHEN m.outcome_indicator_id = 2 THEN 'Defaulter'
          WHEN m.outcome_indicator_id = 3 THEN 'Referred'
          WHEN m.outcome_indicator_id = 4 THEN 'Non Respondent'
          WHEN m.outcome_indicator_id = 5 THEN 'Death'
          ELSE 'Partial Improvement'
        END AS status
      FROM mtc_child_master m
      JOIN mtc_centers c ON m.mtc_id = c.mtc_id
      WHERE m.mtc_id = ANY($1::int[])
        AND m.discharge_date IS NOT NULL
      ORDER BY m.discharge_date DESC, m.registration_id DESC
    `;

    const result = await query(sqlText, [targetMtcIds]);
    const children = result.rows;

    // Calculate Summary KPIs
    const totalDischarged = children.length;
    const totalCured = children.filter((c: any) => c.status === 'Cured').length;
    const totalReferrals = children.filter((c: any) => c.status === 'Referred').length;
    const avgCureRate = totalDischarged > 0 ? ((totalCured / totalDischarged) * 100).toFixed(1) : "0.0";

    return NextResponse.json({
      success: true,
      kpis: {
        totalCured,
        avgCureRate: `${avgCureRate}%`,
        totalReferrals
      },
      children
    });

  } catch (error: any) {
    console.error("Discharged Telemetry API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch telemetry records", details: error.message },
      { status: 500 }
    );
  }
}