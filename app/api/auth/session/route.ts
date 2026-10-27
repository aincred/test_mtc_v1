import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { cookieName, cookieOptions, destroySession, isRole, isSessionValid } from '@/lib/session';

export const dynamic = 'force-dynamic';

// GET /api/auth/session?role=admin|state|district|mtc  -> { valid: boolean }
export async function GET(req: NextRequest) {
  const role = req.nextUrl.searchParams.get('role');
  if (!isRole(role)) return NextResponse.json({ valid: false }, { status: 400 });
  const sid = (await cookies()).get(cookieName(role))?.value;
  try {
    const valid = await isSessionValid(role, sid);
    return NextResponse.json({ valid }, { status: valid ? 200 : 401, headers: { 'Cache-Control': 'no-store' } });
  } catch (e) {
    console.error('Session check error:', e);
    return NextResponse.json({ valid: false }, { status: 500 });
  }
}

// DELETE /api/auth/session?role=...  -> kills the session (DB row + cookie)
export async function DELETE(req: NextRequest) {
  const role = req.nextUrl.searchParams.get('role');
  if (!isRole(role)) return NextResponse.json({ success: false }, { status: 400 });
  const sid = (await cookies()).get(cookieName(role))?.value;
  try {
    await destroySession(role, sid);
  } catch (e) {
    console.error('Session destroy error:', e);
  }
  const res = NextResponse.json({ success: true }, { headers: { 'Cache-Control': 'no-store' } });
  res.cookies.set(cookieName(role), '', { ...cookieOptions, maxAge: 0 });
  return res;
}
