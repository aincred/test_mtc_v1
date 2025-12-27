// // app/api/get-sam-number/route.ts
// import { NextResponse } from 'next/server';
// import { generateNextSamNumber } from '@/lib/db'; // This import should now work

// export async function GET() {
//   try {
//     const nextSamNo = await generateNextSamNumber();
    
//     // Prevent caching so we always get the latest number
//     return NextResponse.json(
//       { samNumber: nextSamNo }, 
//       { status: 200, headers: { 'Cache-Control': 'no-store' } }
//     );
//   } catch (error) {
//     return NextResponse.json(
//       { error: 'Failed to fetch SAM Number' }, 
//       { status: 500 }
//     );
//   }
// }

// app/api/get-sam-number/route.ts
import { NextResponse } from 'next/server';
import { generateNextSamNumber } from '@/lib/db'; 

export async function GET() {
  try {
    const nextSamNo = await generateNextSamNumber();
    
    // Prevent caching so we always get the latest number
    return NextResponse.json(
      { samNumber: nextSamNo }, 
      { status: 200, headers: { 'Cache-Control': 'no-store' } }
    );
  } catch (error) {
    // Log the error to fix the unused var warning and help debugging
    console.error("Error generating SAM number:", error);
    return NextResponse.json(
      { error: 'Failed to fetch SAM Number' }, 
      { status: 500 }
    );
  }
}