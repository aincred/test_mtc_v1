// // import { NextResponse } from 'next/server';
// // import { query } from '@/lib/db';

// // export const dynamic = 'force-dynamic';

// // // --- GET: Fetch recent maternal nutrition assessments ---
// // export async function GET() {
// //   try {
// //     const sqlText = `
// //       SELECT 
// //         m.nutrition_id AS id,
// //         c.child_full_name AS "childName",
// //         c.guardian_name AS "motherName",
// //         c.sam_no AS "samNumber",
// //         m.weight_kg AS weight,
// //         m.height_cm AS height,
// //         m.bmi,
// //         m.ifa_given AS "ifaGiven",
// //         m.calcium_given AS "calciumGiven",
// //         m.created_at AS "dateSubmitted"
// //       FROM mtc_maternal_nutrition m
// //       JOIN mtc_child_master c ON m.registration_id = c.registration_id
// //       ORDER BY m.created_at DESC
// //     `;
// //     const result = await query(sqlText);
// //     return NextResponse.json(result.rows, { status: 200 });
// //   } catch (error) {
// //     console.error('Fetch Maternal Nutrition Error:', error);
// //     return NextResponse.json({ error: 'Failed to fetch records' }, { status: 500 });
// //   }
// // }

// // // --- POST: Save a new maternal assessment ---
// // export async function POST(request: Request) {
// //   try {
// //     const data = await request.json();

// //     // Format the counseling topics array specifically for PostgreSQL
// //     let topicsFormatted = null;
// //     if (Array.isArray(data.counselingTopics) && data.counselingTopics.length > 0) {
// //       topicsFormatted = `{${data.counselingTopics.map((t: string) => `"${t.replace(/"/g, '""')}"`).join(',')}}`;
// //     }

// //     const sqlText = `
// //       INSERT INTO mtc_maternal_nutrition (
// //         registration_id, weight_kg, height_cm, bmi, muac_cm, hb_level,
// //         is_lactating, meals_per_day, ifa_given, calcium_given,
// //         counseling_topics, notes
// //       ) VALUES (
// //         $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12
// //       ) RETURNING nutrition_id;
// //     `;

// //     const values = [
// //       parseInt(data.childId),
// //       parseFloat(data.weight),
// //       parseFloat(data.height),
// //       data.bmi ? parseFloat(data.bmi) : null,
// //       data.muac ? parseFloat(data.muac) : null,
// //       data.hbLevel ? parseFloat(data.hbLevel) : null,
// //       data.lactating,
// //       data.mealsPerDay,
// //       data.ifaGiven,
// //       data.calciumGiven,
// //       topicsFormatted,
// //       data.notes || null
// //     ];

// //     const result = await query(sqlText, values);
    
// //     return NextResponse.json({ success: true, id: result.rows[0].nutrition_id }, { status: 201 });
// //   } catch (error) {
// //     console.error('Save Maternal Nutrition Error:', error);
// //     return NextResponse.json({ error: 'Failed to save record' }, { status: 500 });
// //   }
// // }

// import { NextResponse } from 'next/server';
// import { query } from '@/lib/db';

// export const dynamic = 'force-dynamic';

// // --- GET: Fetch maternal nutrition assessment records ---
// export async function GET(request: Request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const mtcId = searchParams.get('mtcId');

//     let sqlText = `
//       SELECT 
//         m.nutrition_id AS id,
//         c.registration_id AS "childId",
//         c.child_full_name AS "childName",
//         c.guardian_name AS "motherName",
//         c.sam_no AS "samNumber",
//         m.weight_kg AS weight,
//         m.height_cm AS height,
//         m.bmi,
//         m.muac_cm AS muac,
//         m.hb_level AS "hbLevel",
//         m.is_lactating AS "isLactating",
//         m.meals_per_day AS "mealsPerDay",
//         m.ifa_given AS "ifaGiven",
//         m.calcium_given AS "calciumGiven",
//         m.counseling_topics AS "counselingTopics",
//         m.notes,
//         m.created_at AS "dateSubmitted"
//       FROM mtc_maternal_nutrition m
//       JOIN mtc_child_master c ON m.registration_id = c.registration_id
//     `;

//     const queryValues: (string | number)[] = [];

//     if (mtcId) {
//       sqlText += ` WHERE c.mtc_id = $1`;
//       queryValues.push(parseInt(mtcId, 10));
//     }

//     sqlText += ` ORDER BY m.created_at DESC;`;

//     const result = await query(sqlText, queryValues);
//     return NextResponse.json(result.rows, { status: 200 });
//   } catch (error) {
//     console.error('Fetch Maternal Nutrition Error:', error);
//     return NextResponse.json({ error: 'Failed to fetch records' }, { status: 500 });
//   }
// }

// // --- POST: Save a new maternal assessment ---
// export async function POST(request: Request) {
//   try {
//     const data = await request.json();

//     // Basic validation
//     if (!data.childId) {
//       return NextResponse.json({ error: 'Admitted child selection is required' }, { status: 400 });
//     }

//     const sqlText = `
//       INSERT INTO mtc_maternal_nutrition (
//         registration_id, 
//         weight_kg, 
//         height_cm, 
//         bmi, 
//         muac_cm, 
//         hb_level,
//         is_lactating, 
//         meals_per_day, 
//         ifa_given, 
//         calcium_given,
//         counseling_topics, 
//         notes
//       ) VALUES (
//         $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11::text[], $12
//       ) RETURNING nutrition_id;
//     `;

//     const values = [
//       parseInt(data.childId, 10),
//       data.weight ? parseFloat(data.weight) : null,
//       data.height ? parseFloat(data.height) : null,
//       data.bmi ? parseFloat(data.bmi) : null,
//       data.muac ? parseFloat(data.muac) : null,
//       data.hbLevel ? parseFloat(data.hbLevel) : null,
//       Boolean(data.lactating),
//       data.mealsPerDay ? parseInt(data.mealsPerDay, 10) : null,
//       Boolean(data.ifaGiven),
//       Boolean(data.calciumGiven),
//       Array.isArray(data.counselingTopics) ? data.counselingTopics : [],
//       data.notes || null
//     ];

//     const result = await query(sqlText, values);
    
//     return NextResponse.json(
//       { success: true, id: result.rows[0].nutrition_id }, 
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error('Save Maternal Nutrition Error:', error);
//     return NextResponse.json({ error: 'Failed to save record' }, { status: 500 });
//   }
// }

import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

// --- GET: Fetch maternal nutrition assessment records ---
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const mtcId = searchParams.get('mtcId');

    let sqlText = `
      SELECT 
        m.nutrition_id AS id,
        c.registration_id AS "childId",
        c.child_full_name AS "childName",
        c.guardian_name AS "motherName",
        c.sam_no AS "samNumber",
        m.weight_kg AS weight,
        m.height_cm AS height,
        m.bmi,
        m.muac_cm AS muac,
        m.hb_level AS "hbLevel",
        m.is_lactating AS "isLactating",
        m.meals_per_day AS "mealsPerDay",
        m.ifa_given AS "ifaGiven",
        m.calcium_given AS "calciumGiven",
        m.counseling_topics AS "counselingTopics",
        m.notes,
        m.created_at AS "dateSubmitted"
      FROM mtc_maternal_nutrition m
      JOIN mtc_child_master c ON m.registration_id = c.registration_id
    `;

    const queryValues: (string | number)[] = [];

    if (mtcId) {
      sqlText += ` WHERE c.mtc_id = $1`;
      queryValues.push(parseInt(mtcId, 10));
    }

    sqlText += ` ORDER BY m.created_at DESC;`;

    const result = await query(sqlText, queryValues);
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

    if (!data.childId) {
      return NextResponse.json({ error: 'Admitted child selection is required' }, { status: 400 });
    }

    const sqlText = `
      INSERT INTO mtc_maternal_nutrition (
        registration_id, 
        weight_kg, 
        height_cm, 
        bmi, 
        muac_cm, 
        hb_level,
        is_lactating, 
        meals_per_day, 
        ifa_given, 
        calcium_given,
        counseling_topics, 
        notes
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11::text[], $12
      ) RETURNING nutrition_id;
    `;

    const values = [
      parseInt(data.childId, 10),
      data.weight ? parseFloat(data.weight) : null,
      data.height ? parseFloat(data.height) : null,
      data.bmi ? parseFloat(data.bmi) : null,
      data.muac ? parseFloat(data.muac) : null,
      data.hbLevel ? parseFloat(data.hbLevel) : null,
      data.lactating === 'yes',
      data.mealsPerDay || null,
      data.ifaGiven || null,
      data.calciumGiven || null,
      Array.isArray(data.counselingTopics) ? data.counselingTopics : [],
      data.notes || null
    ];

    const result = await query(sqlText, values);
    
    return NextResponse.json(
      { success: true, id: result.rows[0].nutrition_id }, 
      { status: 201 }
    );
  } catch (error) {
    console.error('Save Maternal Nutrition Error:', error);
    return NextResponse.json({ error: 'Failed to save record' }, { status: 500 });
  }
}