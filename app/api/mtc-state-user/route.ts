import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // 1. Validate inputs
    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: "Username and password are required." },
        { status: 400 }
      );
    }

    const cleanUsername = username.trim();
    const cleanPassword = password.trim();

    // 2. Fetch user by username (case-insensitive)
    const sql = `
      SELECT id, username, password 
      FROM public.mtc_state_user 
      WHERE LOWER(username) = LOWER($1)
      LIMIT 1
    `;
    const result = await query(sql, [cleanUsername]);

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: "Invalid username or password." },
        { status: 401 }
      );
    }

    const user = result.rows[0];

    // 3. Verify password
    if (user.password !== cleanPassword) {
      return NextResponse.json(
        { success: false, error: "Invalid username or password." },
        { status: 401 }
      );
    }

    // 4. Return successful login (excluding password hash/plain text)
    return NextResponse.json({
      success: true,
      message: "Login successful",
      user: {
        id: user.id,
        username: user.username,
      },
    });
  } catch (error: any) {
    console.error("State User Login Error:", error);
    return NextResponse.json(
      { success: false, error: "Authentication failed", details: error.message },
      { status: 500 }
    );
  }
}