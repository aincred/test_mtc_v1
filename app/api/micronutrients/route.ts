import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { childId, routineTreatments, labTests } = data;

    if (!childId) {
      return NextResponse.json({ error: 'Child ID is required' }, { status: 400 });
    }

    // Upsert Query: Create new or update existing flowsheet
    const sqlText = `
      INSERT INTO mtc_micronutrients (
        child_id, routine_data, lab_data, updated_at
      ) VALUES (
        $1, $2, $3, CURRENT_TIMESTAMP
      )
      ON CONFLICT (child_id) 
      DO UPDATE SET 
        routine_data = EXCLUDED.routine_data,
        lab_data = EXCLUDED.lab_data,
        updated_at = CURRENT_TIMESTAMP
      RETURNING id;
    `;

    const values = [
      childId, 
      JSON.stringify(routineTreatments), 
      JSON.stringify(labTests)
    ];

    const result = await query(sqlText, values);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Data saved successfully',
      id: result.rows[0].id 
    }, { status: 200 });
    
  } catch (error) {
    console.error('Save Micronutrients Error:', error);
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const childId = searchParams.get('childId');

    if (!childId) {
       return NextResponse.json({ error: 'Child ID parameter is required' }, { status: 400 });
    }

    const sqlText = `
      SELECT child_id, routine_data, lab_data 
      FROM mtc_micronutrients 
      WHERE child_id = $1
    `;
    
    const result = await query(sqlText, [childId]);
    const data = result.rows.length > 0 ? result.rows[0] : null;
    
    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error('Fetch Micronutrients Error:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}