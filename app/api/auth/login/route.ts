import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { createSession, cookieName, cookieOptions } from '@/lib/session';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // 1. Validate Input
    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: 'Username and password are required.' },
        { status: 400 }
      );
    }

    // 2. Query mtc_admin_user
    const sqlText = `
      SELECT id, username 
      FROM mtc_admin_user 
      WHERE username = $1 AND password = $2
    `;

    const result = await query(sqlText, [username, password]);

    // 3. Verify Match
    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Invalid admin username or password.' },
        { status: 401 }
      );
    }

    // 4. Type Assertion for TypeScript safety
    const user = result.rows[0] as {
      id: number;
      username: string;
    };

    // 5. Return Admin Session Payload
    // One session per account: this replaces any previous login.
    const sid = await createSession('admin', user.id);
    const res = NextResponse.json(
      {
        success: true,
        user: {
          id: user.id.toString(),
          username: user.username,
          role: 'mtc_admin',
        },
      },
      { status: 200 }
    );
    res.cookies.set(cookieName('admin'), sid, cookieOptions);
    return res;
  } catch (error) {
    console.error('Admin Login Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error during authentication.' },
      { status: 500 }
    );
  }
}