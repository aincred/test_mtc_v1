import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const mtcResult = await query(`SELECT district, mtc_name FROM mtc_bed_capacity WHERE id = $1`, [id]);
    if (mtcResult.rows.length === 0) {
      return NextResponse.json({ success: false, error: 'MTC not found' }, { status: 404 });
    }

    const { district, mtc_name } = mtcResult.rows[0];

    const usersResult = await query(
      `SELECT id, login_id AS "loginId", district, mtc_name AS "mtcName", created_at AS "createdAt", 'MTC USER' AS role 
       FROM mtc_users 
       WHERE UPPER(district) = UPPER($1) AND UPPER(mtc_name) = UPPER($2)
       ORDER BY id DESC`,
      [district, mtc_name]
    );

    return NextResponse.json({ 
      success: true, 
      mtc: mtcResult.rows[0], 
      users: usersResult.rows 
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}