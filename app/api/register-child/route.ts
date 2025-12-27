// // app/api/register-child/route.ts
// import { NextResponse } from 'next/server';
// import { generateNextSamNumber, registerChildInDB } from '@/lib/db'; 

// export async function POST(request: Request) {
//   try {
//     const data = await request.json();

//     // 1. Generate ID safely on the server side
//     const newSamNo = await generateNextSamNumber();
    
//     // 2. Attach the generated ID to the data object
//     const childData = {
//       ...data,
//       SamNo: newSamNo 
//     };

//     // 3. Insert into DB
//     await registerChildInDB(childData);

//     // 4. Return success AND the new ID to the frontend
//     return NextResponse.json({ 
//       success: true, 
//       samNo: newSamNo, // <-- Crucial: Send this back
//       message: 'Child registered successfully' 
//     }, { status: 201 });

//   } catch (error: any) {
//     console.error('Registration Error:', error);
//     return NextResponse.json(
//       { success: false, message: error.message || 'Database Insert Failed' }, 
//       { status: 500 }
//     );
//   }
// }




import { NextResponse } from "next/server";
import {
  generateNextSamNumber,
  registerChildInDB,
  ChildData,
} from "@/lib/db";

/**
 * Incoming request = ChildData WITHOUT SamNo
 * (because SamNo is generated on server)
 */
type RegisterChildRequest = Omit<ChildData, "SamNo">;

export async function POST(request: Request) {
  try {
    const data: RegisterChildRequest = await request.json();

    // 1. Generate SAM number
    const newSamNo = await generateNextSamNumber();

    // 2. Build FULL ChildData object (matches DB exactly)
    const childData: ChildData = {
      ...data,
      SamNo: newSamNo,
    };

    // 3. Insert into DB
    await registerChildInDB(childData);

    // 4. Return success
    return NextResponse.json(
      {
        success: true,
        samNo: newSamNo,
        message: "Child registered successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration Error:", error);

    const message =
      error instanceof Error
        ? error.message
        : "Database Insert Failed";

    return NextResponse.json(
      { success: false, message },
      { status: 500 }
    );
  }
}
