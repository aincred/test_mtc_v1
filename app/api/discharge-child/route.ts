// import { NextResponse } from "next/server";
// import { updateDischargeChild, DischargeData } from "@/lib/db";

// export async function PUT(req: Request) {
//   try {
//     const body = await req.json();

//     // 1. Basic Validation
//     if (!body.SamNo || !body.DischargeDate || !body.ExitIndicator) {
//       return NextResponse.json(
//         { success: false, message: "Missing required fields (SAM No, Date, or Outcome)" },
//         { status: 400 }
//       );
//     }

//     // 2. Map Payload to DB Interface
//     const dischargeData: DischargeData = {
//       SamNo: body.SamNo,
//       DischargeDate: body.DischargeDate,
//       DischargeWeight: body.DischargeWeight,
//       DischargeHeight: body.DischargeHeight,
//       DischargeMuac: body.DischargeMuac,
//       DischargeEdema: body.DischargeEdema,
//       ExitIndicator: body.ExitIndicator,
//       IFAToMotherTablet: body.IFAToMotherTablet,
//       MotherWages: body.MotherWages,
//       IFAToMotherSyrup: body.IFAToMotherSyrup,
//       HemoglobinMother: body.HemoglobinMother,
//       DischargeImage: body.DischargeImage,
//       TotalStay: body.TotalStay,
//       MinimumWeight: body.MinimumWeight
//     };

//     // 3. Update Database
//     await updateDischargeChild(dischargeData);

//     return NextResponse.json({ 
//       success: true, 
//       message: "Child discharged successfully" 
//     });

//   } catch (error: any) {
//     console.error("Discharge API Error:", error);
//     return NextResponse.json(
//       { success: false, message: error.message || "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import { updateDischargeChild, DischargeData } from "@/lib/db";

export async function PUT(req: Request) {
  try {
    const body = await req.json();

    // 1. Basic Validation
    if (!body.SamNo || !body.DischargeDate || !body.ExitIndicator) {
      return NextResponse.json(
        { success: false, message: "Missing required fields (SAM No, Date, or Outcome)" },
        { status: 400 }
      );
    }

    // 2. Map Payload to DB Interface
    const dischargeData: DischargeData = {
      SamNo: body.SamNo,
      DischargeDate: body.DischargeDate,
      DischargeWeight: body.DischargeWeight,
      DischargeHeight: body.DischargeHeight,
      DischargeMuac: body.DischargeMuac,
      DischargeEdema: body.DischargeEdema,
      ExitIndicator: body.ExitIndicator,
      IFAToMotherTablet: body.IFAToMotherTablet,
      MotherWages: body.MotherWages,
      IFAToMotherSyrup: body.IFAToMotherSyrup,
      HemoglobinMother: body.HemoglobinMother,
      DischargeImage: body.DischargeImage,
      TotalStay: body.TotalStay,
      MinimumWeight: body.MinimumWeight
    };

    // 3. Update Database
    await updateDischargeChild(dischargeData);

    return NextResponse.json({ 
      success: true, 
      message: "Child discharged successfully" 
    });

  } catch (error: unknown) { // Changed 'any' to 'unknown'
    console.error("Discharge API Error:", error);
    
    // Safely extract error message
    const errorMessage = error instanceof Error ? error.message : "Internal Server Error";

    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}