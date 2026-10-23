// app/api/admin/users/[id]/route.ts
import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const url = new URL(req.url);
  const role = url.searchParams.get('role'); // e.g. MTC USER, STATE USER, DISTRICT USER

  try {
    let result;
    if (role === 'MTC USER') {
      result = await query(`SELECT id, district, mtc_name, login_id, password FROM mtc_users WHERE id = $1`, [id]);
    } else if (role === 'STATE USER') {
      result = await query(`SELECT id, '' as district, '' as mtc_name, username as login_id, password FROM mtc_state_user WHERE id = $1`, [id]);
    } else if (role === 'DISTRICT USER') {
      result = await query(`SELECT id, district, '' as mtc_name, login_id, password FROM mtc_district_user WHERE id = $1`, [id]);
    } else {
      return NextResponse.json({ success: false, error: 'Role query param required' }, { status: 400 });
    }

    if (result.rows.length === 0) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 400 });
    }

    return NextResponse.json({ success: true, user: result.rows[0] });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const body = await req.json();
    const { role, district, mtc_name, login_id, password } = body;

    let result;
    if (role === 'MTC USER') {
      result = await query(
        `UPDATE mtc_users SET district = $1, mtc_name = $2, login_id = $3, password = COALESCE(NULLIF($4, ''), password)
         WHERE id = $5 RETURNING *`,
        [district, mtc_name, login_id, password, id]
      );
    } else if (role === 'STATE USER') {
      result = await query(
        `UPDATE mtc_state_user SET username = $1, password = COALESCE(NULLIF($2, ''), password)
         WHERE id = $3 RETURNING *`,
        [login_id, password, id]
      );
    } else if (role === 'DISTRICT USER') {
      result = await query(
        `UPDATE mtc_district_user SET district = $1, login_id = $2, password = COALESCE(NULLIF($3, ''), password)
         WHERE id = $4 RETURNING *`,
        [district, login_id, password, id]
      );
    }

    return NextResponse.json({ success: true, user: result?.rows[0] });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const url = new URL(req.url);
  const role = url.searchParams.get('role');

  try {
    if (role === 'MTC USER') {
      await query(`DELETE FROM mtc_users WHERE id = $1`, [id]);
    } else if (role === 'STATE USER') {
      await query(`DELETE FROM mtc_state_user WHERE id = $1`, [id]);
    } else if (role === 'DISTRICT USER') {
      await query(`DELETE FROM mtc_district_user WHERE id = $1`, [id]);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}