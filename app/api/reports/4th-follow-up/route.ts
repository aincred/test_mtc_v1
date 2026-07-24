import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

interface FourthFollowUpQueryRow {
  id: string | number;
  childName: string;
  childId: string;
  motherName: string;
  phone: string | null;
  mtcName: string;
  referredBy: string;
  referredByPhone: string | null;
  followUpCount: number;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const rangeType = searchParams.get('rangeType') || 'daily';
    const districtName = searchParams.get('districtName') || 'RANCHI';
    const mtcSelection = searchParams.get('mtcSelection'); // Specific MTC filter

    let startDateStr = '';
    let endDateStr = '';

    // 1. Calculate Date Boundaries (Daily, Monthly, Quarterly)
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

    // 2. Resolve MTC IDs
    let targetMtcIds: number[] = [];
    if (mtcSelection && mtcSelection.trim() !== '' && mtcSelection !== 'ALL') {
      const parsedId = Number(mtcSelection);
      if (!isNaN(parsedId)) targetMtcIds.push(parsedId);
    }

    if (targetMtcIds.length === 0 && districtName.toUpperCase() !== 'ALL') {
      const mtcRes = await query<{ mtc_id: number }>(
        `SELECT mtc_id FROM mtc_centers WHERE UPPER(district) = $1`,
        [districtName.toUpperCase()]
      );
      targetMtcIds = mtcRes.rows.map((r) => Number(r.mtc_id)).filter((id) => !isNaN(id));
    }

    // 3. Build SQL Query strictly filtering for children with 4 DISTINCT completed follow-ups
    let sqlText = `
      SELECT 
        m.registration_id AS id,
        COALESCE(m.child_full_name, 'Unknown') AS "childName",
        COALESCE(m.sam_no, 'N/A') AS "childId",
        COALESCE(m.mother_name, m.guardian_name, 'N/A') AS "motherName",
        COALESCE(m.mobile_number, 'N/A') AS "phone",
        c.mtc_name AS "mtcName",
        COALESCE(r.referred_by_name, m.referred_by_name, 'OTHER') AS "referredBy",
        COALESCE(m.referred_by_mobile, 'N/A') AS "referredByPhone",
        fu.fu_count::INTEGER AS "followUpCount"
      FROM mtc_child_master m
      JOIN mtc_centers c ON m.mtc_id = c.mtc_id
      JOIN (
        SELECT registration_id, COUNT(DISTINCT visit_number) AS fu_count
        FROM mtc_child_follow_up
        GROUP BY registration_id
        HAVING COUNT(DISTINCT visit_number) >= 4
      ) fu ON fu.registration_id = m.registration_id
      LEFT JOIN (
        VALUES 
          (1, 'OPD'),
          (2, 'ANGANWADI'),
          (3, 'ANM'),
          (4, 'Poshan Sakhi'),
          (5, 'RBSK Team'),
          (6, 'Sahiya/ASHA'),
          (7, 'SELF'),
          (8, 'OTHER')
      ) AS r(referred_by_id, referred_by_name) ON m.referred_by_id = r.referred_by_id
      WHERE m.admission_date >= $1::DATE 
        AND m.admission_date <= $2::DATE
    `;

    const queryParams: any[] = [startDateStr, endDateStr];

    if (targetMtcIds.length > 0) {
      sqlText += ` AND m.mtc_id = ANY($3::int[])`;
      queryParams.push(targetMtcIds);
    }

    sqlText += ` ORDER BY m.admission_date DESC, m.registration_id DESC;`;

    // 4. Query & format output
    const result = await query<FourthFollowUpQueryRow>(sqlText, queryParams);

    const formattedData = result.rows.map((row) => ({
      id: row.id,
      childName: row.childName,
      childId: row.childId,
      motherName: row.motherName,
      phone: row.phone !== 'N/A' && !row.phone?.startsWith('+91') ? `+91 ${row.phone}` : row.phone,
      mtcName: row.mtcName,
      referredBy: row.referredBy,
      referredByPhone: row.referredByPhone !== 'N/A' && !row.referredByPhone?.startsWith('+91') ? `+91 ${row.referredByPhone}` : row.referredByPhone,
      followUpCount: row.followUpCount
    }));

    return NextResponse.json({
      success: true,
      count: formattedData.length,
      records: formattedData
    }, { status: 200 });

  } catch (error: any) {
    console.error('4th Follow-up Report API Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate 4th follow-up report', details: error.message },
      { status: 500 }
    );
  }
}