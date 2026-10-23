import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const result = await query(
      `SELECT id, district, mtc_name AS "mtcName", number_of_beds AS "numberOfBeds", created_at AS "createdAt" 
       FROM mtc_bed_capacity WHERE id = $1`, 
      [id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ success: false, error: 'MTC record not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: result.rows[0] });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const body = await req.json();
    const { district, mtcName, numberOfBeds } = body;

    const result = await query(
      `UPDATE mtc_bed_capacity 
       SET district = $1, mtc_name = $2, number_of_beds = $3 
       WHERE id = $4
       RETURNING id, district, mtc_name AS "mtcName", number_of_beds AS "numberOfBeds"`,
      [district.toUpperCase().trim(), mtcName.toUpperCase().trim(), Number(numberOfBeds), id]
    );

    if (result.rowCount === 0) {
      return NextResponse.json({ success: false, error: 'MTC record not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: result.rows[0] });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    await query(`DELETE FROM mtc_bed_capacity WHERE id = $1`, [id]);
    return NextResponse.json({ success: true, message: 'MTC deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}