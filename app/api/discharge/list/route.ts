// import { NextResponse } from "next/server";
// import { getDBConnection } from "@/lib/db"; // Adjust path if your db.ts is in a different folder

// // Force dynamic to prevent Next.js from caching the database response
// export const dynamic = 'force-dynamic';

// export async function GET() {
//   try {
//     const db = await getDBConnection();

//     // Query to fetch children.
//     // NOTE: 'WHERE DischargeDate IS NULL' ensures we only show children 
//     // who are currently in the center and waiting to be discharged.
//     const query = `
//       SELECT 
//         SamNo,
//         MTCCode,
//         ChildName,
//         FatherName,
//         MotherName,
//         DateofBirth,
//         AdmissionWeight,
//         AdmissionHeight,
//         AdmissionDate
//       FROM [MTCJharkhand].[dbo].[MTCSAMChildren]
//       WHERE DischargeDate IS NULL 
//       ORDER BY AdmissionDate DESC
//     `;

//     const result = await db.request().query(query);

//     return NextResponse.json({
//       success: true,
//       data: result.recordset,
//     });

//   } catch (error: any) {
//     console.error("❌ Error fetching discharge list:", error);
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

    const query = `
      SELECT 
        SamNo,
        MTCCode,
        ChildName,
        FatherName,
        MotherName,
        DateofBirth,
        AdmissionWeight,
        AdmissionHeight,
        AdmissionDate
      FROM [MTCJharkhand].[dbo].[MTCSAMChildren]
      WHERE DischargeDate IS NULL 
      ORDER BY AdmissionDate DESC
    `;

    const result = await db.request().query(query);

    return NextResponse.json({
      success: true,
      data: result.recordset,
    });

  } catch (error: unknown) { // Changed 'any' to 'unknown'
    console.error("❌ Error fetching discharge list:", error);
    
    // Safely extract the error message
    const errorMessage = error instanceof Error ? error.message : "Internal Server Error";

    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}