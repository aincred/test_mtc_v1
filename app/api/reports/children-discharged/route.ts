import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const range = searchParams.get('range') || 'monthly';
    const districtName = searchParams.get('districtName') || 'RANCHI';
    const selectedMtcsParam = searchParams.get('mtcIds');

    let startDateStr = '';
    let endDateStr = '';

    // Calculate Date Boundaries based on range selection
    if (range === 'daily') {
      startDateStr = searchParams.get('fromDate') || new Date().toISOString().split('T')[0];
      endDateStr = searchParams.get('toDate') || startDateStr;
    } else if (range === 'monthly') {
      const year = searchParams.get('year') || new Date().getFullYear().toString();
      const month = searchParams.get('month');
      
      if (month) {
        const paddedMonth = month.padStart(2, '0');
        const lastDay = new Date(Number(year), Number(month), 0).getDate();
        startDateStr = `${year}-${paddedMonth}-01`;
        endDateStr = `${year}-${paddedMonth}-${lastDay}`;
      } else {
        // Entire Year
        startDateStr = `${year}-01-01`;
        endDateStr = `${year}-12-31`;
      }
    } else if (range === 'quarterly') {
      const year = searchParams.get('year') || new Date().getFullYear().toString();
      const quarter = searchParams.get('quarter') || '1';

      if (quarter === '1') { startDateStr = `${year}-01-01`; endDateStr = `${year}-03-31`; }
      else if (quarter === '2') { startDateStr = `${year}-04-01`; endDateStr = `${year}-06-30`; }
      else if (quarter === '3') { startDateStr = `${year}-07-01`; endDateStr = `${year}-09-30`; }
      else if (quarter === '4') { startDateStr = `${year}-10-01`; endDateStr = `${year}-12-31`; }
    }

    // 1. Fetch ALL MTC centers in the user's assigned district
    let mtcSql = `
      SELECT mtc_id AS id, mtc_name AS name 
      FROM mtc_centers 
      WHERE UPPER(district) = $1
    `;
    const mtcParams: any[] = [districtName.toUpperCase()];

    if (selectedMtcsParam) {
      const selectedIds = selectedMtcsParam.split(',').map(id => Number(id)).filter(Boolean);
      if (selectedIds.length > 0) {
        mtcSql += ` AND mtc_id = ANY($2::int[])`;
        mtcParams.push(selectedIds);
      }
    }

    mtcSql += ` ORDER BY mtc_name ASC`;

    const mtcRes = await query<{ id: number; name: string }>(mtcSql, mtcParams);
    const mtcs = mtcRes.rows;

    if (mtcs.length === 0) {
      return NextResponse.json({
        success: true,
        summary: { totalDischarged: 0, totalDefaulters: 0, totalDeaths: 0, avgSuccessRate: "0.0%" },
        data: []
      });
    }

    const mtcIds = mtcs.map(m => m.id);

    // 2. Fetch Discharge Aggregations directly from mtc_child_master
    const dischargeSql = `
      SELECT 
        mtc_id,
        COUNT(CASE WHEN outcome_indicator_id = 1 THEN 1 END)::INT AS cured,
        COUNT(CASE WHEN outcome_indicator_id = 4 THEN 1 END)::INT AS lama,
        COUNT(CASE WHEN outcome_indicator_id = 2 THEN 1 END)::INT AS defaulter,
        COUNT(CASE WHEN outcome_indicator_id = 3 THEN 1 END)::INT AS referrals,
        COUNT(CASE WHEN outcome_indicator_id = 5 THEN 1 END)::INT AS deaths,
        COUNT(*)::INT AS total_discharged
      FROM mtc_child_master
      WHERE discharge_date >= $1::DATE 
        AND discharge_date <= $2::DATE
        AND mtc_id = ANY($3::int[])
      GROUP BY mtc_id
    `;

    const dischargeRes = await query<any>(dischargeSql, [startDateStr, endDateStr, mtcIds]);
    const dischargeMap = new Map(dischargeRes.rows.map(r => [r.mtc_id, r]));

    // 3. Construct response dataset guaranteeing all district MTCs appear
    let totalDischargedSum = 0;
    let totalDefaultersSum = 0;
    let totalDeathsSum = 0;
    let totalCuredSum = 0;

    const reportData = mtcs.map((mtc) => {
      const row = dischargeMap.get(mtc.id) || {};
      const cured = Number(row.cured) || 0;
      const lama = Number(row.lama) || 0;
      const defaulter = Number(row.defaulter) || 0;
      const death = Number(row.deaths) || 0;
      const referrals = Number(row.referrals) || 0;
      const totalDischarged = Number(row.total_discharged) || 0;

      const cureRate = totalDischarged > 0 ? (cured / totalDischarged) * 100 : 0;

      totalDischargedSum += totalDischarged;
      totalDefaultersSum += defaulter;
      totalDeathsSum += death;
      totalCuredSum += cured;

      return {
        id: mtc.id,
        name: mtc.name,
        cured,
        lama,
        defaulter,
        death,
        ref: referrals,
        totalDischarged,
        rate: `${cureRate.toFixed(1)}%`
      };
    });

    const overallSuccessRate = totalDischargedSum > 0 
      ? ((totalCuredSum / totalDischargedSum) * 100).toFixed(1) 
      : "0.0";

    return NextResponse.json({
      success: true,
      districtName: districtName.toUpperCase(),
      summary: {
        totalDischarged: totalDischargedSum,
        totalDefaulters: totalDefaultersSum,
        totalDeaths: totalDeathsSum,
        avgSuccessRate: `${overallSuccessRate}%`
      },
      data: reportData
    });

  } catch (error: any) {
    console.error("Children Discharged Report Error:", error);
    return NextResponse.json(
      { error: "Failed to generate discharge report", details: error.message },
      { status: 500 }
    );
  }
}