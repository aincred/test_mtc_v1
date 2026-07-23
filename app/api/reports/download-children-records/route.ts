import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const rangeType = searchParams.get('rangeType') || 'daily';
    const districtName = searchParams.get('districtName') || 'RANCHI';
    const mtcsParam = searchParams.get('mtcs'); // Comma-separated MTC IDs

    let startDateStr = '';
    let endDateStr = '';

    // Calculate Date Boundaries
    if (rangeType === 'daily') {
      startDateStr = searchParams.get('fromDate') || new Date().toISOString().split('T')[0];
      endDateStr = searchParams.get('toDate') || startDateStr;
    } else if (rangeType === 'monthly') {
      const year = searchParams.get('year') || new Date().getFullYear().toString();
      const month = searchParams.get('month');
      
      if (month) {
        const paddedMonth = month.padStart(2, '0');
        const lastDay = new Date(Number(year), Number(month), 0).getDate();
        startDateStr = `${year}-${paddedMonth}-01`;
        endDateStr = `${year}-${paddedMonth}-${lastDay}`;
      } else {
        startDateStr = `${year}-01-01`;
        endDateStr = `${year}-12-31`;
      }
    } else if (rangeType === 'quarterly') {
      const year = searchParams.get('year') || new Date().getFullYear().toString();
      const quarter = searchParams.get('quarter') || '1';

      if (quarter === '1') { startDateStr = `${year}-01-01`; endDateStr = `${year}-03-31`; }
      else if (quarter === '2') { startDateStr = `${year}-04-01`; endDateStr = `${year}-06-30`; }
      else if (quarter === '3') { startDateStr = `${year}-07-01`; endDateStr = `${year}-09-30`; }
      else if (quarter === '4') { startDateStr = `${year}-10-01`; endDateStr = `${year}-12-31`; }
    }

    // Determine targeted MTC IDs safely
    let targetMtcIds: number[] = [];
    if (mtcsParam && mtcsParam.trim() !== '') {
      targetMtcIds = mtcsParam.split(',').map(id => Number(id)).filter(id => !isNaN(id));
    }

    // If no MTC IDs explicitly provided in query params, fetch all MTCs for the District
    if (targetMtcIds.length === 0) {
      const mtcRes = await query<{ mtc_id: number }>(
        `SELECT mtc_id FROM mtc_centers WHERE UPPER(district) = $1`,
        [districtName.toUpperCase()]
      );
      targetMtcIds = mtcRes.rows.map(r => Number(r.mtc_id)).filter(id => !isNaN(id));
    }

    if (targetMtcIds.length === 0) {
      return NextResponse.json({ success: true, count: 0, records: [] });
    }

    // Query granular child master records safely converting numeric fields to text BEFORE coalescing
    const sqlText = `
      SELECT 
        m.registration_id AS id,
        COALESCE(m.sam_no, 'N/A') AS "samNo",
        COALESCE(m.child_full_name, 'Unknown') AS "childName",
        COALESCE(m.guardian_name, m.mother_name, 'N/A') AS "parentName",
        COALESCE(m.mobile_number, 'N/A') AS "mobile",
        CASE WHEN m.sex_id = 1 THEN 'Male' WHEN m.sex_id = 2 THEN 'Female' ELSE 'Other' END AS sex,
        TO_CHAR(m.admission_date, 'YYYY-MM-DD') AS "admissionDate",
        COALESCE(m.admission_weight_kg, 0) AS "admissionWeight",
        COALESCE(m.length_height_cm, 0) AS "admissionHeight",
        COALESCE(m.z_score_sd::text, 'N/A') AS "zScore",
        c.mtc_name AS "mtcName",
        TO_CHAR(m.discharge_date, 'YYYY-MM-DD') AS "dischargeDate",
        CASE 
          WHEN m.outcome_indicator_id = 1 THEN 'Cured'
          WHEN m.outcome_indicator_id = 2 THEN 'Defaulter'
          WHEN m.outcome_indicator_id = 3 THEN 'Medical Transfer'
          WHEN m.outcome_indicator_id = 4 THEN 'Non Respondent'
          WHEN m.outcome_indicator_id = 5 THEN 'Death'
          WHEN m.outcome_indicator_id = 6 THEN 'Partial Improvement'
          ELSE 'Admitted'
        END AS status
      FROM mtc_child_master m
      JOIN mtc_centers c ON m.mtc_id = c.mtc_id
      WHERE m.admission_date >= $1::DATE 
        AND m.admission_date <= $2::DATE
        AND m.mtc_id = ANY($3::int[])
      ORDER BY m.admission_date DESC, m.registration_id DESC
    `;

    const recordsRes = await query(sqlText, [startDateStr, endDateStr, targetMtcIds]);

    return NextResponse.json({
      success: true,
      count: recordsRes.rows.length,
      records: recordsRes.rows
    });

  } catch (error: any) {
    console.error("Download Children Records API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch records", details: error.message },
      { status: 500 }
    );
  }
}