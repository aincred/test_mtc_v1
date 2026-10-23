// app/api/admin/users/route.ts
import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  const users: any[] = [];
  const errors: Record<string, string> = {};

  // 1. Fetch mtc_users
  try {
    const mtcRes = await query(`
      SELECT 
        id, 
        district, 
        mtc_name, 
        login_id AS "userName", 
        created_at AS "createdAt", 
        'MTC USER' AS role 
      FROM mtc_users 
      ORDER BY id ASC
    `);
    if (mtcRes?.rows) {
      users.push(...mtcRes.rows.map(r => ({ ...r, uniqueKey: `MTC_${r.id}` })));
    }
  } catch (err: any) {
    console.error('Error querying mtc_users table:', err.message);
    errors.mtc_users = err.message;
  }

  // 2. Fetch mtc_district_user
  try {
    const distRes = await query(`
      SELECT 
        id, 
        district, 
        '' AS mtc_name, 
        login_id AS "userName", 
        NULL AS "createdAt", 
        'DISTRICT USER' AS role 
      FROM mtc_district_user 
      ORDER BY id ASC
    `);
    if (distRes?.rows) {
      users.push(...distRes.rows.map(r => ({ ...r, uniqueKey: `DISTRICT_${r.id}` })));
    }
  } catch (err: any) {
    console.error('Error querying mtc_district_user table:', err.message);
    errors.mtc_district_user = err.message;
  }

  // 3. Fetch mtc_state_user
  try {
    const stateRes = await query(`
      SELECT 
        id, 
        '' AS district, 
        '' AS mtc_name, 
        username AS "userName", 
        NULL AS "createdAt", 
        'STATE USER' AS role 
      FROM mtc_state_user 
      ORDER BY id ASC
    `);
    if (stateRes?.rows) {
      users.push(...stateRes.rows.map(r => ({ ...r, uniqueKey: `STATE_${r.id}` })));
    }
  } catch (err: any) {
    console.error('Error querying mtc_state_user table:', err.message);
    errors.mtc_state_user = err.message;
  }

  // Return whatever records were successfully fetched alongside any table-specific error messages
  return NextResponse.json({
    success: Object.keys(errors).length === 0,
    users,
    errors: Object.keys(errors).length > 0 ? errors : undefined,
  }, { status: 200 });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { role, district, mtc_name, login_id, password } = body;

    if (!role || !login_id || !password) {
      return NextResponse.json(
        { success: false, error: 'Role, Login ID, and Password are required.' },
        { status: 400 }
      );
    }

    let result;
    if (role === 'MTC USER') {
      result = await query(
        `INSERT INTO mtc_users (district, mtc_name, login_id, password, created_at)
         VALUES ($1, $2, $3, $4, NOW()) RETURNING *`,
        [district || 'UNKNOWN', mtc_name || login_id, login_id, password]
      );
    } else if (role === 'STATE USER') {
      result = await query(
        `INSERT INTO mtc_state_user (username, password)
         VALUES ($1, $2) RETURNING *`,
        [login_id, password]
      );
    } else if (role === 'DISTRICT USER') {
      result = await query(
        `INSERT INTO mtc_district_user (district, login_id, password)
         VALUES ($1, $2, $3) RETURNING *`,
        [district || 'UNKNOWN', login_id, password]
      );
    } else {
      return NextResponse.json({ success: false, error: 'Invalid user tier specified.' }, { status: 400 });
    }

    return NextResponse.json({ success: true, user: result.rows[0] }, { status: 201 });
  } catch (error: any) {
    console.error('Error in POST /api/admin/users:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}