// import { NextResponse } from "next/server";
// import { saveFollowUpData, FollowUpData } from "@/lib/db";

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
    
//     // Pass the body directly to your db.ts function
//     // Ensure the frontend maps the keys exactly to FollowUpData interface
//     const result = await saveFollowUpData(body as FollowUpData);

//     return NextResponse.json({ success: true, message: result.message });

//   } catch (error: any) {
//     console.error("Save API Error:", error);
//     return NextResponse.json(
//       { success: false, message: error.message || "Database Error" },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import { saveFollowUpData, FollowUpData } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Pass the body directly to your db.ts function
    // Ensure the frontend maps the keys exactly to FollowUpData interface
    const result = await saveFollowUpData(body as FollowUpData);

    return NextResponse.json({ success: true, message: result.message });

  } catch (error: unknown) { // Changed 'any' to 'unknown'
    console.error("Save API Error:", error);
    
    const errorMessage = error instanceof Error ? error.message : "Database Error";

    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}