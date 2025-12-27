// app\api\children

import { NextRequest, NextResponse } from "next/server";
import { getDBConnection } from "@/lib/db";
import sql from "mssql";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const samNo = decodeURIComponent(resolvedParams.id);

    const db = await getDBConnection();
    
    // Delete from Daily Weight table first (Foreign Key constraint)
    await db.request()
      .input("SamNo", sql.NVarChar, samNo)
      .query("DELETE FROM [MTCJharkhand].[dbo].[MTCSAMDailyWeight] WHERE SamNo = @SamNo");

    // Delete from Main Children table
    const result = await db.request()
      .input("SamNo", sql.NVarChar, samNo)
      .query("DELETE FROM [MTCJharkhand].[dbo].[MTCSAMChildren] WHERE SamNo = @SamNo");

    if (result.rowsAffected[0] === 0) {
      return NextResponse.json({ error: "Record not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete Error:", error);
    return NextResponse.json({ error: "Failed to delete record" }, { status: 500 });
  }
}