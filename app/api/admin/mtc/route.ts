import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const result = await query(`
      SELECT 
        id, 
        district, 
        mtc_name AS "mtcName", 
        number_of_beds AS "numberOfBeds", 
        created_at AS "createdAt"
      FROM mtc_bed_capacity 
      ORDER BY id ASC
    `);

    return NextResponse.json({ success: true, data: result.rows });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { district, mtcName, numberOfBeds } = body;

    if (!district || !mtcName || numberOfBeds === undefined) {
      return NextResponse.json({ success: false, error: 'District, MTC Name, and Number of Beds are required' }, { status: 400 });
    }

    const result = await query(
      `INSERT INTO mtc_bed_capacity (district, mtc_name, number_of_beds, created_at)
       VALUES ($1, $2, $3, NOW())
       RETURNING id, district, mtc_name AS "mtcName", number_of_beds AS "numberOfBeds", created_at AS "createdAt"`,
      [district.toUpperCase().trim(), mtcName.toUpperCase().trim(), Number(numberOfBeds)]
    );

    return NextResponse.json({ success: true, data: result.rows[0] }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}