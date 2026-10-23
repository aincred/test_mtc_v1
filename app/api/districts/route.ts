import { NextResponse } from "next/server";
import { query } from "@/lib/db"; // Ensure this points to your PostgreSQL pool connection

export async function GET() {
  try {
    const result = await query(
      "SELECT district_id, district_name FROM public.mtc_district ORDER BY district_id ASC"
    );

    return NextResponse.json({
      success: true,
      data: result.rows,
    });
  } catch (error: any) {
    console.error("Database query error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch districts" },
      { status: 500 }
    );
  }
}