// import { NextResponse } from 'next/server';
// import { query } from '@/lib/db';

// export async function POST(request: Request) {
//   try {
//     const data = await request.json();
//     const { childId, minimumWeight, targetWeight, weightEntries } = data;

//     if (!childId) {
//       return NextResponse.json({ error: 'Child ID is required' }, { status: 400 });
//     }

//     // Upsert: Create a new record or update the existing one for this child
//     const sqlText = `
//       INSERT INTO mtc_daily_weights (
//         child_id, minimum_weight, target_weight, weights_data, updated_at
//       ) VALUES (
//         $1, $2, $3, $4, CURRENT_TIMESTAMP
//       )
//       ON CONFLICT (child_id) 
//       DO UPDATE SET 
//         minimum_weight = EXCLUDED.minimum_weight,
//         target_weight = EXCLUDED.target_weight,
//         weights_data = EXCLUDED.weights_data,
//         updated_at = CURRENT_TIMESTAMP
//       RETURNING id;
//     `;

//     const values = [
//       childId, 
//       minimumWeight || null, 
//       targetWeight || null, 
//       JSON.stringify(weightEntries) 
//     ];

//     const result = await query(sqlText, values);
    
//     return NextResponse.json({ success: true, id: result.rows[0].id }, { status: 200 });
    
//   } catch (error) {
//     console.error('Save Weights Error:', error);
//     return NextResponse.json({ error: 'Failed to save weight data' }, { status: 500 });
//   }
// }

// export async function GET(request: Request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const childId = searchParams.get('childId');

//     if (!childId) {
//        return NextResponse.json({ error: 'Child ID parameter is required' }, { status: 400 });
//     }

//     const sqlText = `
//       SELECT child_id, minimum_weight, target_weight, weights_data 
//       FROM mtc_daily_weights 
//       WHERE child_id = $1
//     `;
    
//     const result = await query(sqlText, [childId]);
//     const data = result.rows.length > 0 ? result.rows[0] : null;
    
//     return NextResponse.json({ success: true, data }, { status: 200 });
//   } catch (error) {
//     console.error('Fetch Weights Error:', error);
//     return NextResponse.json({ error: 'Failed to fetch weight data' }, { status: 500 });
//   }
// }

import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

// 1. Only ONE POST function
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { childId, minimumWeight, targetWeight, weightEntries } = data;

    if (!childId) {
      return NextResponse.json({ error: 'Child ID is required' }, { status: 400 });
    }

    // Upsert: Create a new record or update the existing one for this child
    const sqlText = `
      INSERT INTO mtc_daily_weights (
        child_id, minimum_weight, target_weight, weights_data, updated_at
      ) VALUES (
        $1, $2, $3, $4, CURRENT_TIMESTAMP
      )
      ON CONFLICT (child_id) 
      DO UPDATE SET 
        minimum_weight = EXCLUDED.minimum_weight,
        target_weight = EXCLUDED.target_weight,
        weights_data = EXCLUDED.weights_data,
        updated_at = CURRENT_TIMESTAMP
      RETURNING id;
    `;

    const values = [
      childId, 
      minimumWeight || null, 
      targetWeight || null, 
      JSON.stringify(weightEntries) 
    ];

    const result = await query(sqlText, values);
    
    return NextResponse.json({ success: true, id: result.rows[0].id }, { status: 200 });
    
  } catch (error) {
    console.error('Save Weights Error:', error);
    return NextResponse.json({ error: 'Failed to save weight data' }, { status: 500 });
  }
}

// 2. Only ONE GET function (handling both single and bulk fetches)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const childId = searchParams.get('childId');

    if (childId) {
      // Fetch single child (used for the Edit page)
      const sqlText = `
        SELECT child_id, minimum_weight, target_weight, weights_data 
        FROM mtc_daily_weights 
        WHERE child_id = $1
      `;
      const result = await query(sqlText, [childId]);
      const data = result.rows.length > 0 ? result.rows[0] : null;
      
      return NextResponse.json({ success: true, data }, { status: 200 });
    } else {
      // Fetch ALL children (used for the main Timeline/Dashboard page)
      const sqlText = `SELECT child_id, weights_data FROM mtc_daily_weights`;
      const result = await query(sqlText);
      
      return NextResponse.json({ success: true, data: result.rows }, { status: 200 });
    }
  } catch (error) {
    console.error('Fetch Weights Error:', error);
    return NextResponse.json({ error: 'Failed to fetch weight data' }, { status: 500 });
  }
}