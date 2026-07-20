import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

// --- GET: Fetch recent maternal nutrition assessments ---
export async function GET() {
  try {
    const sqlText = `
      SELECT 
        m.nutrition_id AS id,
        c.child_full_name AS "childName",
        c.guardian_name AS "motherName",
        c.sam_no AS "samNumber",
        m.weight_kg AS weight,
        m.height_cm AS height,
        m.bmi,
        m.ifa_given AS "ifaGiven",
        m.calcium_given AS "calciumGiven",
        m.created_at AS "dateSubmitted"
      FROM mtc_maternal_nutrition m
      JOIN mtc_child_master c ON m.registration_id = c.registration_id
      ORDER BY m.created_at DESC
    `;
    const result = await query(sqlText);
    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    console.error('Fetch Maternal Nutrition Error:', error);
    return NextResponse.json({ error: 'Failed to fetch records' }, { status: 500 });
  }
}

// --- POST: Save a new maternal assessment ---
export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Format the counseling topics array specifically for PostgreSQL
    let topicsFormatted = null;
    if (Array.isArray(data.counselingTopics) && data.counselingTopics.length > 0) {
      topicsFormatted = `{${data.counselingTopics.map((t: string) => `"${t.replace(/"/g, '""')}"`).join(',')}}`;
    }

    const sqlText = `
      INSERT INTO mtc_maternal_nutrition (
        registration_id, weight_kg, height_cm, bmi, muac_cm, hb_level,
        is_lactating, meals_per_day, ifa_given, calcium_given,
        counseling_topics, notes
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12
      ) RETURNING nutrition_id;
    `;

    const values = [
      parseInt(data.childId),
      parseFloat(data.weight),
      parseFloat(data.height),
      data.bmi ? parseFloat(data.bmi) : null,
      data.muac ? parseFloat(data.muac) : null,
      data.hbLevel ? parseFloat(data.hbLevel) : null,
      data.lactating,
      data.mealsPerDay,
      data.ifaGiven,
      data.calciumGiven,
      topicsFormatted,
      data.notes || null
    ];

    const result = await query(sqlText, values);
    
    return NextResponse.json({ success: true, id: result.rows[0].nutrition_id }, { status: 201 });
  } catch (error) {
    console.error('Save Maternal Nutrition Error:', error);
    return NextResponse.json({ error: 'Failed to save record' }, { status: 500 });
  }
}