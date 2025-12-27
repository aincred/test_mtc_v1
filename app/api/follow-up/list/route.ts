// import { NextResponse } from "next/server";
// import { getDBConnection } from "@/lib/db";

// export const dynamic = 'force-dynamic';

// export async function GET() {
//   try {
//     const db = await getDBConnection();

//     // Fetch children who HAVE been discharged (DischargeDate IS NOT NULL)
//     // and LEFT JOIN with FollowUp table to get status
//     const query = `
//       SELECT 
//         c.SamNo,
//         c.MTCCode,
//         c.ChildName,
//         c.DischargeDate,
//         -- Follow Up Data Columns (Flattened)
//         f.FirstFollowUpDate, f.FirstFollowUpDoneOn,
//         f.SecondFollowUpDate, f.SecondFollowUpDoneOn,
//         f.ThirdFollowUpDate, f.ThirdFollowUpDoneOn,
//         f.FourthFollowUpDate, f.FourtFollowUpDoneOn as FourthFollowUpDoneOn,
        
//         -- Latest Vitals (Example logic: take from the last completed follow up)
//         COALESCE(f.FourtFollowUpZscore, f.ThirdFollowUpZscore, f.SecondFollowUpZscore, f.FirstFollowUpZscore) as LatestZScore,
//         COALESCE(f.FourtFollowUpMUAC, f.ThirdFollowUpMUAC, f.SecondFollowUpMUAC, f.FirstFollowUpMUAC) as LatestMUAC

//       FROM [MTCJharkhand].[dbo].[MTCSAMChildren] c
//       LEFT JOIN [MTCJharkhand].[dbo].[MTCFollowUp] f ON c.SamNo = f.SamNo
//       WHERE c.DischargeDate IS NOT NULL
//       ORDER BY c.DischargeDate DESC
//     `;

//     const result = await db.request().query(query);

//     return NextResponse.json({
//       success: true,
//       data: result.recordset,
//     });

//   } catch (error: any) {
//     console.error("❌ Error fetching follow-up list:", error);
//     return NextResponse.json(
//       { success: false, message: error.message || "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }
import { NextResponse } from "next/server";
import { getDBConnection } from "@/lib/db";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const db = await getDBConnection();

    // Fetch children who HAVE been discharged (DischargeDate IS NOT NULL)
    // and LEFT JOIN with FollowUp table to get status
    const query = `
      SELECT 
        c.SamNo,
        c.MTCCode,
        c.ChildName,
        c.DischargeDate,
        -- Follow Up Data Columns (Flattened)
        f.FirstFollowUpDate, f.FirstFollowUpDoneOn,
        f.SecondFollowUpDate, f.SecondFollowUpDoneOn,
        f.ThirdFollowUpDate, f.ThirdFollowUpDoneOn,
        f.FourthFollowUpDate, f.FourtFollowUpDoneOn as FourthFollowUpDoneOn,
        
        -- Latest Vitals (Example logic: take from the last completed follow up)
        COALESCE(f.FourtFollowUpZscore, f.ThirdFollowUpZscore, f.SecondFollowUpZscore, f.FirstFollowUpZscore) as LatestZScore,
        COALESCE(f.FourtFollowUpMUAC, f.ThirdFollowUpMUAC, f.SecondFollowUpMUAC, f.FirstFollowUpMUAC) as LatestMUAC

      FROM [MTCJharkhand].[dbo].[MTCSAMChildren] c
      LEFT JOIN [MTCJharkhand].[dbo].[MTCFollowUp] f ON c.SamNo = f.SamNo
      WHERE c.DischargeDate IS NOT NULL
      ORDER BY c.DischargeDate DESC
    `;

    const result = await db.request().query(query);

    return NextResponse.json({
      success: true,
      data: result.recordset,
    });

  } catch (error: unknown) { // Changed 'any' to 'unknown'
    console.error("❌ Error fetching follow-up list:", error);
    
    // Safely extract error message
    const errorMessage = error instanceof Error ? error.message : "Internal Server Error";

    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}