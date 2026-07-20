// app/api/pending-discharge/route.ts
import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    // We only select children where discharge_date IS NULL
    const sqlText = `
      SELECT 
        registration_id, 
        sam_no, 
        child_full_name, 
        guardian_name, 
        dob, 
        admission_weight_kg, 
        length_height_cm, 
        admission_date
      FROM mtc_child_master
      WHERE discharge_date IS NULL
      ORDER BY admission_date DESC, registration_id DESC
    `;
    
    const result = await query(sqlText);
    return NextResponse.json(result.rows, { status: 200 });

  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ error: 'Failed to fetch pending discharges' }, { status: 500 });
  }
}