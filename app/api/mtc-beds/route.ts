// import { NextResponse } from 'next/server';
// import { query } from '@/lib/db';

// export const dynamic = 'force-dynamic';

// export async function GET(request: Request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const mtcName = searchParams.get('mtcName');

//     if (!mtcName) {
//       return NextResponse.json({ error: 'MTC Name is required' }, { status: 400 });
//     }

//     // Query the bed capacity table based on the MTC Name
//     const sqlText = `
//       SELECT number_of_beds 
//       FROM mtc_bed_capacity 
//       WHERE TRIM(UPPER(mtc_name)) = TRIM(UPPER($1)) 
//       LIMIT 1
//     `;
    
//     const result = await query(sqlText, [mtcName]);

//     let beds = 10; // Default fallback just in case

//     if (result.rows.length > 0) {
//       beds = result.rows[0].number_of_beds;
//     }

//     return NextResponse.json({ beds }, { status: 200 });

//   } catch (error) {
//     console.error('Fetch Bed Capacity Error:', error);
//     // If the table doesn't exist yet or fails, safely fallback to 10 beds
//     return NextResponse.json({ beds: 10 }, { status: 200 });
//   }
// }



import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const mtcName = searchParams.get('mtcName');

    if (!mtcName) {
      return NextResponse.json({ error: 'MTC Name is required' }, { status: 400 });
    }

    const sqlText = `
      SELECT number_of_beds 
      FROM mtc_bed_capacity 
      WHERE TRIM(UPPER(mtc_name)) = TRIM(UPPER($1)) 
      LIMIT 1
    `;
    
    const result = await query(sqlText, [mtcName]);

    let beds = 10; // Global Safe Fallback

    if (result.rows.length > 0 && result.rows[0].number_of_beds) {
      beds = Number(result.rows[0].number_of_beds);
    }

    return NextResponse.json({ beds }, { status: 200 });

  } catch (error) {
    console.error('Fetch Bed Capacity Error:', error);
    return NextResponse.json({ beds: 10 }, { status: 200 });
  }
}