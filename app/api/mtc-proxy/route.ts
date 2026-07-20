// // // // import { NextResponse } from 'next/server';

// // // // export async function GET() {
// // // //   const url = "https://apisaamar.jharkhand.gov.in/service.asmx/MTCRefferedChildList";
  
// // // //   const params = new URLSearchParams();
// // // //   params.append('user', 'Ar15025'); // [cite: 4]
// // // //   params.append('pass', 'Ar15025'); // [cite: 4]

// // // //   try {
// // // //     const response = await fetch(url, {
// // // //       method: 'POST', // [cite: 4]
// // // //       headers: {
// // // //         'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8', // [cite: 4]
// // // //       },
// // // //       body: params.toString(), // [cite: 5]
// // // //     });

// // // //     if (!response.ok) {
// // // //         return NextResponse.json({ error: `Remote server error: ${response.status}` }, { status: 500 });
// // // //     }

// // // //     const xmlData = await response.text(); // [cite: 10]
// // // //     return new NextResponse(xmlData, {
// // // //       headers: { 'Content-Type': 'text/xml' }, // [cite: 7]
// // // //     });

// // // //   } catch (error: unknown) {
// // // //     // Narrowing the 'unknown' type to 'Error' to fix the TS18046 error
// // // //     const errorMessage = error instanceof Error ? error.message : "Unknown error";
// // // //     return NextResponse.json({ error: errorMessage }, { status: 500 }); // 
// // // //   }
// // // // }

// // // // app/api/mtc-proxy/route.ts
// // // import { NextResponse } from 'next/server';

// // // export async function GET() {
// // //   const url = "https://apisaamar.jharkhand.gov.in/service.asmx/MTCRefferedChildList";
  
// // //   const params = new URLSearchParams();
// // //   params.append('user', 'Ar15025'); 
// // //   params.append('pass', 'Ar15025'); 

// // //   try {
// // //     const response = await fetch(url, {
// // //       method: 'POST', 
// // //       headers: {
// // //         'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8', 
// // //       },
// // //       body: params.toString(), 
// // //     });

// // //     if (!response.ok) {
// // //         return NextResponse.json({ error: `Remote server error: ${response.status}` }, { status: 500 });
// // //     }

// // //     const xmlData = await response.text(); 
// // //     return new NextResponse(xmlData, {
// // //       headers: { 'Content-Type': 'text/xml' }, 
// // //     });

// // //   } catch (error: any) {
// // //     // Extract the underlying network cause (e.g., ECONNREFUSED, CERT_HAS_EXPIRED)
// // //     const rootCause = error.cause ? error.cause.message : "No additional cause provided";
// // //     const errorMessage = error instanceof Error ? `${error.message} - Cause: ${rootCause}` : "Unknown error";
    
// // //     // Log the full error to your server console for debugging
// // //     console.error("Proxy Fetch Error details:", error);
    
// // //     return NextResponse.json({ error: errorMessage }, { status: 500 }); 
// // //   }
// // // }

// // // app/api/mtc-proxy/route.ts
// // import { NextResponse } from 'next/server';

// // export async function GET() {
// //   const url = "https://apisaamar.jharkhand.gov.in/service.asmx/MTCRefferedChildList";
  
// //   const params = new URLSearchParams();
// //   params.append('user', 'Ar15025'); 
// //   params.append('pass', 'Ar15025'); 

// //   try {
// //     const response = await fetch(url, {
// //       method: 'POST', 
// //       headers: {
// //         'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8', 
// //       },
// //       body: params.toString(), 
// //     });

// //     if (!response.ok) {
// //         return NextResponse.json({ error: `Remote server error: ${response.status}` }, { status: 500 });
// //     }

// //     const xmlData = await response.text(); 
// //     return new NextResponse(xmlData, {
// //       headers: { 'Content-Type': 'text/xml' }, 
// //     });

// //   } catch (error: unknown) {
// //     let rootCause = "No additional cause provided";
// //     let errorMessage = "Unknown error";

// //     if (error instanceof Error) {
// //       // Safely inspect the error.cause object if it exists
// //       if (error.cause && typeof error.cause === 'object' && 'message' in error.cause) {
// //         const causeObj = error.cause as Record<string, unknown>;
// //         rootCause = String(causeObj.message);
// //       }
// //       errorMessage = `${error.message} - Cause: ${rootCause}`;
// //     }
    
// //     // Log the full error to your server console for debugging
// //     console.error("Proxy Fetch Error details:", error);
    
// //     return NextResponse.json({ error: errorMessage }, { status: 500 }); 
// //   }
// // }

// import { NextResponse } from 'next/server';
// import { Agent } from 'undici';

// export async function GET() {
//   const url = "https://apisaamar.jharkhand.gov.in/service.asmx/MTCRefferedChildList";
  
//   const params = new URLSearchParams();
//   params.append('user', 'Ar15025'); 
//   params.append('pass', 'Ar15025'); 

//   // Create an agent that ignores SSL certificate errors
//   const agent = new Agent({
//     connect: {
//       rejectUnauthorized: false
//     }
//   });

//   try {
//     const response = await fetch(url, {
//       method: 'POST', 
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8', 
//       },
//       body: params.toString(),
//       // @ts-expect-error - Next.js types sometimes do not include the dispatcher property, but Node.js uses it.
//       dispatcher: agent,
//     });

//     if (!response.ok) {
//         return NextResponse.json({ error: `Remote server error: ${response.status}` }, { status: 500 });
//     }

//     const xmlData = await response.text(); 
//     return new NextResponse(xmlData, {
//       headers: { 'Content-Type': 'text/xml' }, 
//     });

//   } catch (error: unknown) {
//     let rootCause = "No additional cause provided";
//     let errorMessage = "Unknown error";

//     if (error instanceof Error) {
//       if (error.cause && typeof error.cause === 'object' && 'message' in error.cause) {
//         const causeObj = error.cause as Record<string, unknown>;
//         rootCause = String(causeObj.message);
//       }
//       errorMessage = `${error.message} - Cause: ${rootCause}`;
//     }
    
//     console.error("Proxy Fetch Error details:", error);
    
//     return NextResponse.json({ error: errorMessage }, { status: 500 }); 
//   }
// }

import { NextResponse } from 'next/server';
// Import fetch directly from undici alongside the Agent
import { Agent, fetch as undiciFetch } from 'undici'; 

export async function GET() {
  const url = "https://apisaamar.jharkhand.gov.in/service.asmx/MTCRefferedChildList";
  
  const params = new URLSearchParams();
  params.append('user', 'Ar15025'); 
  params.append('pass', 'Ar15025'); 

  const agent = new Agent({
    connect: {
      rejectUnauthorized: false
    }
  });

  try {
    // Use undiciFetch instead of the global fetch
    const response = await undiciFetch(url, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8', 
      },
      body: params.toString(),
      dispatcher: agent, 
    });

    if (!response.ok) {
        return NextResponse.json({ error: `Remote server error: ${response.status}` }, { status: 500 });
    }

    const xmlData = await response.text(); 
    return new NextResponse(xmlData, {
      headers: { 'Content-Type': 'text/xml' }, 
    });

  } catch (error: unknown) {
    let rootCause = "No additional cause provided";
    let errorMessage = "Unknown error";

    if (error instanceof Error) {
      if (error.cause && typeof error.cause === 'object' && 'message' in error.cause) {
        const causeObj = error.cause as Record<string, unknown>;
        rootCause = String(causeObj.message);
      }
      errorMessage = `${error.message} - Cause: ${rootCause}`;
    }
    
    console.error("Proxy Fetch Error details:", error);
    
    return NextResponse.json({ error: errorMessage }, { status: 500 }); 
  }
}