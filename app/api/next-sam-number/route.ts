// import { NextResponse } from 'next/server';
// import { query } from '@/lib/db';

// export async function GET() {
//   try {
//     // Safely extract ONLY the numeric part from the SAM number strings in the database
//     const sqlText = `
//       SELECT MAX(CAST(SUBSTRING(sam_no FROM '[0-9]+') AS INTEGER)) as max_num 
//       FROM mtc_child_master 
//       WHERE sam_no LIKE 'JH/WSB/CBS/%'
//     `;
    
//     const result = await query(sqlText);
    
//     // Get the highest number, or default to 0 if the database is completely empty
//     const maxNum = result.rows[0]?.max_num || 0;

//     // Add 1 to whatever the highest number was
//     const nextNum = maxNum + 1;

//     // Pad the number with leading zeros so it always has at least 4 digits
//     const formattedNum = nextNum.toString().padStart(4, '0');
//     const nextSamNumber = `JH/WSB/CBS/${formattedNum}`;

//     return NextResponse.json({ nextSamNumber }, { status: 200 });
//   } catch (error) {
//     console.error('Fetch Next SAM Number Error:', error);
//     return NextResponse.json({ error: 'Failed to fetch next SAM number' }, { status: 500 });
//   }
// }

import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const mtcCode = searchParams.get('mtcCode');

    if (!mtcCode) {
      return NextResponse.json({ error: 'MTC Code is required' }, { status: 400 });
    }

    // Search for the highest SAM number matching this MTC's specific prefix
    const sqlText = `
      SELECT sam_no 
      FROM mtc_child_master 
      WHERE sam_no LIKE $1 
      ORDER BY registration_id DESC 
      LIMIT 1
    `;
    
    const result = await query(sqlText, [`${mtcCode}%`]);

    let nextSequence = 1;

    if (result.rows.length > 0) {
      const lastSamNo = String(result.rows[0].sam_no);
      const numericPart = lastSamNo.replace(mtcCode, '');
      const parsedNumber = parseInt(numericPart, 10);
      
      if (!isNaN(parsedNumber)) {
        nextSequence = parsedNumber + 1;
      }
    }

    // Pad the sequence with leading zeros (e.g., "0001", "0015")
    const paddedSequence = nextSequence.toString().padStart(4, '0');
    const nextSamNumber = `${mtcCode}${paddedSequence}`;

    return NextResponse.json({ nextSamNumber }, { status: 200 });

  } catch (error) {
    console.error('SAM Number Generation Error:', error);
    return NextResponse.json({ error: 'Failed to generate SAM Number' }, { status: 500 });
  }
}