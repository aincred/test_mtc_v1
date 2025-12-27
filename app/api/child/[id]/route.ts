// import { NextResponse } from "next/server";
// import { getChildBySamNo } from "@/lib/db";

// export async function GET(
//   request: Request,
//   { params }: { params: Promise<{ id: string }> } // Fix for Next.js 15
// ) {
//   try {
//     const { id } = await params;
    
//     // Decode the ID (e.g. "JH%2FWSB" -> "JH/WSB")
//     const samNo = decodeURIComponent(id);
    
//     const child = await getChildBySamNo(samNo);

//     if (!child) {
//       return NextResponse.json(
//         { success: false, message: "Child not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({
//       success: true,
//       data: child
//     });
//   } catch (error: any) {
//     console.error("API Error:", error);
//     return NextResponse.json(
//       { success: false, message: "Server error" },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import { getChildBySamNo } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // Fix for Next.js 15
) {
  try {
    const { id } = await params;
    
    // Decode the ID (e.g. "JH%2FWSB" -> "JH/WSB")
    const samNo = decodeURIComponent(id);
    
    const child = await getChildBySamNo(samNo);

    if (!child) {
      return NextResponse.json(
        { success: false, message: "Child not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: child
    });
  } catch (error: unknown) { // Changed from 'any' to 'unknown'
    console.error("API Error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}