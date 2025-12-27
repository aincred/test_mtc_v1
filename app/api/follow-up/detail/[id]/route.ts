// import { NextResponse } from "next/server";
// import { getDBConnection } from "@/lib/db";

// export async function GET(
//   request: Request,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   try {
//     const { id } = await params;
//     const samNo = decodeURIComponent(id);
//     const db = await getDBConnection();

//     // 1. Fetch Child Basic Info (For Header)
//     const childRes = await db.request()
//       .input('SamNo', samNo)
//       .query(`
//         SELECT SamNo, ChildName, FatherName, MotherName, DischargeDate 
//         FROM [MTCJharkhand].[dbo].[MTCSAMChildren] 
//         WHERE SamNo = @SamNo
//       `);

//     if (childRes.recordset.length === 0) {
//       return NextResponse.json({ success: false, message: "Child not found" }, { status: 404 });
//     }

//     // 2. Fetch Existing Follow Up Data (if any)
//     const followUpRes = await db.request()
//       .input('SamNo', samNo)
//       .query(`SELECT * FROM [MTCJharkhand].[dbo].[MTCFollowUp] WHERE SamNo = @SamNo`);

//     return NextResponse.json({
//       success: true,
//       child: childRes.recordset[0],
//       followUpData: followUpRes.recordset[0] || null // Return null if no follow-up started yet
//     });

//   } catch (error: any) {
//     console.error("API Error:", error);
//     return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";
import { getDBConnection } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const samNo = decodeURIComponent(id);
    const db = await getDBConnection();

    // 1. Fetch Child Basic Info (For Header)
    const childRes = await db.request()
      .input('SamNo', samNo)
      .query(`
        SELECT SamNo, ChildName, FatherName, MotherName, DischargeDate 
        FROM [MTCJharkhand].[dbo].[MTCSAMChildren] 
        WHERE SamNo = @SamNo
      `);

    if (childRes.recordset.length === 0) {
      return NextResponse.json({ success: false, message: "Child not found" }, { status: 404 });
    }

    // 2. Fetch Existing Follow Up Data (if any)
    const followUpRes = await db.request()
      .input('SamNo', samNo)
      .query(`SELECT * FROM [MTCJharkhand].[dbo].[MTCFollowUp] WHERE SamNo = @SamNo`);

    return NextResponse.json({
      success: true,
      child: childRes.recordset[0],
      followUpData: followUpRes.recordset[0] || null // Return null if no follow-up started yet
    });

  } catch (error: unknown) { // Changed 'any' to 'unknown'
    console.error("API Error:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}