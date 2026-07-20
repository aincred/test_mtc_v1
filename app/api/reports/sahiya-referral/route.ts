import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const fromDate = searchParams.get('fromDate');
    const toDate = searchParams.get('toDate');

    if (!fromDate || !toDate) {
      return NextResponse.json({ error: 'From Date and To Date are required' }, { status: 400 });
    }

    // Query exclusively for Sahiya/Asha referrals (referred_by_id = 6)
    const sqlText = `
      SELECT 
        sam_no, 
        child_full_name, 
        guardian_name, 
        COALESCE(village, full_address) AS address, 
        TO_CHAR(admission_date, 'YYYY-MM-DD') as admission_date, 
        referred_by_name, 
        referred_by_mobile
      FROM mtc_child_master
      WHERE referred_by_id = 6 
      AND admission_date >= $1::DATE 
      AND admission_date <= $2::DATE
      ORDER BY admission_date DESC
    `;

    const result = await query(sqlText, [fromDate, toDate]);

    return NextResponse.json({ success: true, data: result.rows }, { status: 200 });

  } catch (error) {
    console.error('Sahiya Report Generation Error:', error);
    return NextResponse.json({ error: 'Failed to generate report' }, { status: 500 });
  }
}