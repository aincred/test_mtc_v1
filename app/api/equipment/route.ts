import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

// ==========================================
// GET: Fetch equipment data for a specific MTC
// ==========================================
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const mtcCode = searchParams.get('mtcCode');

    if (!mtcCode) {
      return NextResponse.json({ success: false, error: 'MTC Code is required' }, { status: 400 });
    }

    const sqlText = `SELECT equipment_data, last_updated FROM mtc_equipment_status WHERE mtc_code = $1`;
    const result = await query(sqlText, [mtcCode]);

    // If it's a first-time user, return null data with a 200 OK status
    if (result.rows.length === 0) {
      return NextResponse.json({ 
        success: true, 
        message: 'No data found for this MTC. Ready for first save.',
        data: null 
      }, { status: 200 });
    }

    // Returning user: send their saved data
    return NextResponse.json({
      success: true,
      data: result.rows[0].equipment_data,
      lastUpdated: result.rows[0].last_updated
    }, { status: 200 });

  } catch (error) {
    console.error('Equipment GET Error:', error);
    return NextResponse.json({ success: false, error: 'Database error' }, { status: 500 });
  }
}

// ==========================================
// POST: Save/Update equipment data for an MTC
// ==========================================
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { mtcCode, equipmentData } = body;

    if (!mtcCode || !equipmentData) {
      return NextResponse.json({ success: false, error: 'Missing MTC Code or Data' }, { status: 400 });
    }

    // Upsert logic: Insert if it's the first time, Update if the MTC already has a row
    const sqlText = `
      INSERT INTO mtc_equipment_status (mtc_code, equipment_data, last_updated)
      VALUES ($1, $2, CURRENT_TIMESTAMP)
      ON CONFLICT (mtc_code)
      DO UPDATE SET 
        equipment_data = EXCLUDED.equipment_data,
        last_updated = CURRENT_TIMESTAMP
      RETURNING last_updated;
    `;

    // Stringify the JSON object so Postgres handles it correctly for the JSONB column
    const result = await query(sqlText, [mtcCode, JSON.stringify(equipmentData)]);

    return NextResponse.json({ 
      success: true, 
      message: 'Equipment saved successfully',
      lastUpdated: result.rows[0].last_updated 
    }, { status: 200 });

  } catch (error) {
    console.error('Equipment POST Error:', error);
    return NextResponse.json({ success: false, error: 'Database update failed' }, { status: 500 });
  }
}