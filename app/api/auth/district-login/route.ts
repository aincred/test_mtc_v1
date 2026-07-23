import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { loginId, password } = body;

    // 1. Validate Input
    if (!loginId || !password) {
      return NextResponse.json(
        { error: 'Login ID and Password are required' }, 
        { status: 400 }
      );
    }

    // 2. Secure Parameterized Query
    const sqlText = `
      SELECT id, district, login_id 
      FROM mtc_district_user 
      WHERE login_id = $1 AND password = $2
    `;
    
    const result = await query(sqlText, [loginId, password]);

    // 3. Verify Match
    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Invalid District Login ID or Password' }, 
        { status: 401 }
      );
    }

    // 4. Type Assertion to fix the TypeScript 'unknown' error
    const user = result.rows[0] as {
      id: number;
      district: string;
      login_id: string;
    };

    // 5. Return Session Payload
    return NextResponse.json({
      success: true,
      user: {
        districtId: user.id.toString(),
        districtName: user.district,
        loginId: user.login_id,
        role: 'district_admin'
      }
    }, { status: 200 });

  } catch (error) {
    console.error('District Login Error:', error);
    return NextResponse.json(
      { error: 'Internal server error during authentication' }, 
      { status: 500 }
    );
  }
}