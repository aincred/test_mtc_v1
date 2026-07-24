import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

// SQL Query Result Row Interface
interface FollowUpQueryRow {
  id: string | number;
  childName: string;
  motherName: string;
  phoneNumber: string | null;
  referredBy: string;
  mtcName: string;
  admissionDate: string;
  fu1_date: string | null;
  fu2_date: string | null;
  fu3_date: string | null;
  fu4_date: string | null;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const rangeType = searchParams.get('rangeType') || 'daily';
    const districtName = searchParams.get('districtName') || 'RANCHI';
    const mtcsParam = searchParams.get('mtcs') || searchParams.get('mtcId');

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

    // 2. Determine Target MTC IDs
    let targetMtcIds: number[] = [];
    if (mtcsParam && mtcsParam.trim() !== '' && mtcsParam !== 'ALL') {
      targetMtcIds = mtcsParam.split(',').map(id => Number(id.trim())).filter(id => !isNaN(id));
    }

    // Resolve MTC IDs for district if none provided
    if (targetMtcIds.length === 0 && districtName.toUpperCase() !== 'ALL') {
      const mtcRes = await query<{ mtc_id: number }>(
        `SELECT mtc_id FROM mtc_centers WHERE UPPER(district) = $1`,
        [districtName.toUpperCase()]
      );
      targetMtcIds = mtcRes.rows.map(r => Number(r.mtc_id)).filter(id => !isNaN(id));
    }

    // 3. Build SQL Query
    let sqlText = `
      SELECT 
        m.registration_id AS id,
        COALESCE(m.child_full_name, 'Unknown') AS "childName",
        COALESCE(m.mother_name, m.guardian_name, 'N/A') AS "motherName",
        COALESCE(m.mobile_number, 'N/A') AS "phoneNumber",
        COALESCE(r.referred_by_name, m.referred_by_name, 'OTHER') AS "referredBy",
        c.mtc_name AS "mtcName",
        TO_CHAR(m.admission_date, 'YYYY-MM-DD') AS "admissionDate",
        
        -- Individual Follow-up Dates
        (SELECT TO_CHAR(f.actual_date, 'YYYY-MM-DD') FROM mtc_child_follow_up f WHERE f.registration_id = m.registration_id AND f.visit_number = 1 LIMIT 1) AS fu1_date,
        (SELECT TO_CHAR(f.actual_date, 'YYYY-MM-DD') FROM mtc_child_follow_up f WHERE f.registration_id = m.registration_id AND f.visit_number = 2 LIMIT 1) AS fu2_date,
        (SELECT TO_CHAR(f.actual_date, 'YYYY-MM-DD') FROM mtc_child_follow_up f WHERE f.registration_id = m.registration_id AND f.visit_number = 3 LIMIT 1) AS fu3_date,
        (SELECT TO_CHAR(f.actual_date, 'YYYY-MM-DD') FROM mtc_child_follow_up f WHERE f.registration_id = m.registration_id AND f.visit_number = 4 LIMIT 1) AS fu4_date

      FROM mtc_child_master m
      JOIN mtc_centers c ON m.mtc_id = c.mtc_id
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

    // 4. Execute Query & Format Response
    const result = await query<FollowUpQueryRow>(sqlText, queryParams);

    const formattedData = result.rows.map((row: FollowUpQueryRow) => {
      const rawPhone = row.phoneNumber ?? 'N/A';
      const formattedPhone = rawPhone !== 'N/A' && !rawPhone.startsWith('+91') 
        ? `+91 ${rawPhone}` 
        : rawPhone;

      return {
        id: row.id,
        childName: row.childName,
        motherName: row.motherName,
        phoneNumber: formattedPhone,
        referredBy: row.referredBy,
        mtcName: row.mtcName,
        admissionDate: row.admissionDate,
        followUp1: {
          status: row.fu1_date ? 'Completed' : 'Pending',
          date: row.fu1_date || null
        },
        followUp2: {
          status: row.fu2_date ? 'Completed' : 'Pending',
          date: row.fu2_date || null
        },
        followUp3: {
          status: row.fu3_date ? 'Completed' : 'Pending',
          date: row.fu3_date || null
        },
        followUp4: {
          status: row.fu4_date ? 'Completed' : 'Pending',
          date: row.fu4_date || null
        }
      };
    });

    return NextResponse.json({ 
      success: true, 
      count: formattedData.length,
      data: formattedData 
    }, { status: 200 });

  } catch (error: any) {
    console.error('MTC Follow-Up Report Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch MTC follow-up report', details: error.message }, 
      { status: 500 }
    );
  }
}