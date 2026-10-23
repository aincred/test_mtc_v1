import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import bcrypt from "bcrypt";

interface AdminUserRow {
  password?: string | null;
  [key: string]: unknown;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id = 1, currentPassword, newPassword } = body;

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: "Current and new password are required" },
        { status: 400 }
      );
    }

    if (typeof newPassword !== "string" || newPassword.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters long" },
        { status: 400 }
      );
    }

    // 1. Fetch current stored password
    const result = await query(
      "SELECT password FROM public.mtc_admin_user WHERE id = $1",
      [id]
    );

    const rows = result?.rows as AdminUserRow[] | undefined;

    if (!rows || rows.length === 0 || !rows[0].password) {
      return NextResponse.json({ error: "Admin not found" }, { status: 404 });
    }

    // Explicitly typed as string to resolve TS18046
    const storedPassword: string = String(rows[0].password);

    // 2. Validate current password (handles both bcrypt hashes and legacy plain-text passwords)
    let isPasswordCorrect = false;
    if (storedPassword.startsWith("$2b$") || storedPassword.startsWith("$2a$")) {
      isPasswordCorrect = await bcrypt.compare(currentPassword, storedPassword);
    } else {
      isPasswordCorrect = storedPassword === currentPassword;
    }

    if (!isPasswordCorrect) {
      return NextResponse.json(
        { error: "Current password is incorrect" },
        { status: 400 }
      );
    }

    // 3. Encrypt new password using bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // 4. Update encrypted password in database
    await query(
      "UPDATE public.mtc_admin_user SET password = $1 WHERE id = $2",
      [hashedPassword, id]
    );

    return NextResponse.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Password change error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}