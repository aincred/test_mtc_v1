// lib/session.ts
// Server-side, single-session-per-account store.
// One row per (role, user_key): logging in again replaces the previous session,
// so the old browser/tab is kicked out. Logout / returning to the login page deletes it.
import { randomBytes } from 'crypto';
import { query } from '@/lib/db';

export type SessionRole = 'admin' | 'state' | 'district' | 'mtc';
export const SESSION_ROLES: SessionRole[] = ['admin', 'state', 'district', 'mtc'];

// Hard cap so a forgotten session cannot live forever (12h).
const MAX_AGE_HOURS = 12;

export const cookieName = (role: SessionRole) => `mtc_sid_${role}`;

export const isRole = (v: unknown): v is SessionRole =>
  typeof v === 'string' && (SESSION_ROLES as string[]).includes(v);

// Browser-session cookie (no maxAge/expires): it is dropped when the browser closes.
export const cookieOptions = {
  httpOnly: true,
  sameSite: 'lax' as const,
  secure: process.env.NODE_ENV === 'production',
  path: '/',
};

let tableReady: Promise<unknown> | null = null;
function ensureTable() {
  if (!tableReady) {
    tableReady = query(`
      CREATE TABLE IF NOT EXISTS mtc_sessions (
        session_id TEXT PRIMARY KEY,
        role       TEXT NOT NULL,
        user_key   TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        UNIQUE (role, user_key)
      )
    `).catch((e) => {
      tableReady = null;
      throw e;
    });
  }
  return tableReady;
}

/** Creates the one-and-only session for this account (replacing any older one). */
export async function createSession(role: SessionRole, userKey: string | number) {
  await ensureTable();
  const sid = randomBytes(32).toString('hex');
  await query(
    `INSERT INTO mtc_sessions (session_id, role, user_key, created_at)
     VALUES ($1, $2, $3, NOW())
     ON CONFLICT (role, user_key)
     DO UPDATE SET session_id = EXCLUDED.session_id, created_at = NOW()`,
    [sid, role, String(userKey)]
  );
  return sid;
}

export async function isSessionValid(role: SessionRole, sid: string | undefined) {
  if (!sid) return false;
  await ensureTable();
  const r = await query(
    `SELECT 1 FROM mtc_sessions
     WHERE session_id = $1 AND role = $2
       AND created_at > NOW() - INTERVAL '${MAX_AGE_HOURS} hours'`,
    [sid, role]
  );
  return r.rows.length > 0;
}

export async function destroySession(role: SessionRole, sid: string | undefined) {
  if (!sid) return;
  await ensureTable();
  await query(`DELETE FROM mtc_sessions WHERE session_id = $1 AND role = $2`, [sid, role]);
}
