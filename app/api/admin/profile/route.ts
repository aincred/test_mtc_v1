import { NextResponse } from "next/server";
import { query } from "@/lib/db";

// GET: Fetch Admin profile data
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id") || "1";

    const result = await query(
      "SELECT id, username, full_name, email, phone FROM public.mtc_admin_user WHERE id = $1",
      [id]
    );

    if (!result.rows || result.rows.length === 0) {
      return NextResponse.json({ error: "Admin not found" }, { status: 404 });
    }

    return NextResponse.json(result.rows[0], { status: 200 });
  } catch (error) {
    console.error("Profile GET Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// PUT: Update Admin profile data
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id = 1, fullName, email, phone, username } = body;

    const result = await query(
      `UPDATE public.mtc_admin_user 
       SET full_name = COALESCE($1, full_name),
           email = COALESCE($2, email),
           phone = COALESCE($3, phone),
           username = COALESCE($4, username)
       WHERE id = $5
       RETURNING id, username, full_name, email, phone`,
      [fullName, email, phone, username, id]
    );

    if (!result.rows || result.rows.length === 0) {
      return NextResponse.json({ error: "Admin not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Admin details updated successfully",
      user: result.rows[0],
    });
  } catch (error) {
    console.error("Profile PUT Error:", error);
    return NextResponse.json(
      { error: "Failed to update profile details" },
      { status: 500 }
    );
  }
}