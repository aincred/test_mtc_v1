// // // // // // // import { NextResponse } from 'next/server';

// // // // // // // export async function GET() {
// // // // // // //   const url = "https://apisaamar.jharkhand.gov.in/service.asmx/MTCRefferedChildList";
  
// // // // // // //   const params = new URLSearchParams();
// // // // // // //   params.append('user', 'Ar15025'); // [cite: 4]
// // // // // // //   params.append('pass', 'Ar15025'); // [cite: 4]

// // // // // // //   try {
// // // // // // //     const response = await fetch(url, {
// // // // // // //       method: 'POST', // [cite: 4]
// // // // // // //       headers: {
// // // // // // //         'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8', // [cite: 4]
// // // // // // //       },
// // // // // // //       body: params.toString(), // [cite: 5]
// // // // // // //     });

// // // // // // //     if (!response.ok) {
// // // // // // //         return NextResponse.json({ error: `Remote server error: ${response.status}` }, { status: 500 });
// // // // // // //     }

// // // // // // //     const xmlData = await response.text(); // [cite: 10]
// // // // // // //     return new NextResponse(xmlData, {
// // // // // // //       headers: { 'Content-Type': 'text/xml' }, // [cite: 7]
// // // // // // //     });

// // // // // // //   } catch (error: unknown) {
// // // // // // //     // Narrowing the 'unknown' type to 'Error' to fix the TS18046 error
// // // // // // //     const errorMessage = error instanceof Error ? error.message : "Unknown error";
// // // // // // //     return NextResponse.json({ error: errorMessage }, { status: 500 }); // 
// // // // // // //   }
// // // // // // // }

// // // // // // // app/api/mtc-proxy/route.ts
// // // // // // import { NextResponse } from 'next/server';

// // // // // // export async function GET() {
// // // // // //   const url = "https://apisaamar.jharkhand.gov.in/service.asmx/MTCRefferedChildList";
  
// // // // // //   const params = new URLSearchParams();
// // // // // //   params.append('user', 'Ar15025'); 
// // // // // //   params.append('pass', 'Ar15025'); 

// // // // // //   try {
// // // // // //     const response = await fetch(url, {
// // // // // //       method: 'POST', 
// // // // // //       headers: {
// // // // // //         'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8', 
// // // // // //       },
// // // // // //       body: params.toString(), 
// // // // // //     });

// // // // // //     if (!response.ok) {
// // // // // //         return NextResponse.json({ error: `Remote server error: ${response.status}` }, { status: 500 });
// // // // // //     }

// // // // // //     const xmlData = await response.text(); 
// // // // // //     return new NextResponse(xmlData, {
// // // // // //       headers: { 'Content-Type': 'text/xml' }, 
// // // // // //     });

// // // // // //   } catch (error: any) {
// // // // // //     // Extract the underlying network cause (e.g., ECONNREFUSED, CERT_HAS_EXPIRED)
// // // // // //     const rootCause = error.cause ? error.cause.message : "No additional cause provided";
// // // // // //     const errorMessage = error instanceof Error ? `${error.message} - Cause: ${rootCause}` : "Unknown error";
    
// // // // // //     // Log the full error to your server console for debugging
// // // // // //     console.error("Proxy Fetch Error details:", error);
    
// // // // // //     return NextResponse.json({ error: errorMessage }, { status: 500 }); 
// // // // // //   }
// // // // // // }

// // // // // // app/api/mtc-proxy/route.ts
// // // // // import { NextResponse } from 'next/server';

// // // // // export async function GET() {
// // // // //   const url = "https://apisaamar.jharkhand.gov.in/service.asmx/MTCRefferedChildList";
  
// // // // //   const params = new URLSearchParams();
// // // // //   params.append('user', 'Ar15025'); 
// // // // //   params.append('pass', 'Ar15025'); 

// // // // //   try {
// // // // //     const response = await fetch(url, {
// // // // //       method: 'POST', 
// // // // //       headers: {
// // // // //         'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8', 
// // // // //       },
// // // // //       body: params.toString(), 
// // // // //     });

// // // // //     if (!response.ok) {
// // // // //         return NextResponse.json({ error: `Remote server error: ${response.status}` }, { status: 500 });
// // // // //     }

// // // // //     const xmlData = await response.text(); 
// // // // //     return new NextResponse(xmlData, {
// // // // //       headers: { 'Content-Type': 'text/xml' }, 
// // // // //     });

// // // // //   } catch (error: unknown) {
// // // // //     let rootCause = "No additional cause provided";
// // // // //     let errorMessage = "Unknown error";

// // // // //     if (error instanceof Error) {
// // // // //       // Safely inspect the error.cause object if it exists
// // // // //       if (error.cause && typeof error.cause === 'object' && 'message' in error.cause) {
// // // // //         const causeObj = error.cause as Record<string, unknown>;
// // // // //         rootCause = String(causeObj.message);
// // // // //       }
// // // // //       errorMessage = `${error.message} - Cause: ${rootCause}`;
// // // // //     }
    
// // // // //     // Log the full error to your server console for debugging
// // // // //     console.error("Proxy Fetch Error details:", error);
    
// // // // //     return NextResponse.json({ error: errorMessage }, { status: 500 }); 
// // // // //   }
// // // // // }

// // // import { NextResponse } from 'next/server';
// // // import { Agent } from 'undici';

// // // export async function GET() {
// // //   const url = "https://apisaamar.jharkhand.gov.in/service.asmx/MTCRefferedChildList";
  
// // //   const params = new URLSearchParams();
// // //   params.append('user', 'Ar15025'); 
// // //   params.append('pass', 'Ar15025'); 

// // //   // Create an agent that ignores SSL certificate errors
// // //   const agent = new Agent({
// // //     connect: {
// // //       rejectUnauthorized: false
// // //     }
// // //   });

// // //   try {
// // //     const response = await fetch(url, {
// // //       method: 'POST', 
// // //       headers: {
// // //         'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8', 
// // //       },
// // //       body: params.toString(),
// // //       // @ts-expect-error - Next.js types sometimes do not include the dispatcher property, but Node.js uses it.
// // //       dispatcher: agent,
// // //     });

// // //     if (!response.ok) {
// // //         return NextResponse.json({ error: `Remote server error: ${response.status}` }, { status: 500 });
// // //     }

// // //     const xmlData = await response.text(); 
// // //     return new NextResponse(xmlData, {
// // //       headers: { 'Content-Type': 'text/xml' }, 
// // //     });

// // //   } catch (error: unknown) {
// // //     let rootCause = "No additional cause provided";
// // //     let errorMessage = "Unknown error";

// // //     if (error instanceof Error) {
// // //       if (error.cause && typeof error.cause === 'object' && 'message' in error.cause) {
// // //         const causeObj = error.cause as Record<string, unknown>;
// // //         rootCause = String(causeObj.message);
// // //       }
// // //       errorMessage = `${error.message} - Cause: ${rootCause}`;
// // //     }
    
// // //     console.error("Proxy Fetch Error details:", error);
    
// // //     return NextResponse.json({ error: errorMessage }, { status: 500 }); 
// // //   }
// // // }

// // import { NextResponse } from 'next/server';
// // // Import fetch directly from undici alongside the Agent
// // import { Agent, fetch as undiciFetch } from 'undici'; 

// // export async function GET() {
// //   const url = "https://apisaamar.jharkhand.gov.in/service.asmx/MTCRefferedChildList";
  
// //   const params = new URLSearchParams();
// //   params.append('user', 'Ar15025'); 
// //   params.append('pass', 'Ar15025'); 

// //   const agent = new Agent({
// //     connect: {
// //       rejectUnauthorized: false
// //     }
// //   });

// //   try {
// //     // Use undiciFetch instead of the global fetch
// //     const response = await undiciFetch(url, {
// //       method: 'POST', 
// //       headers: {
// //         'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8', 
// //       },
// //       body: params.toString(),
// //       dispatcher: agent, 
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
// //       if (error.cause && typeof error.cause === 'object' && 'message' in error.cause) {
// //         const causeObj = error.cause as Record<string, unknown>;
// //         rootCause = String(causeObj.message);
// //       }
// //       errorMessage = `${error.message} - Cause: ${rootCause}`;
// //     }
    
// //     console.error("Proxy Fetch Error details:", error);
    
// //     return NextResponse.json({ error: errorMessage }, { status: 500 }); 
// //   }
// // }

// // // import { NextResponse } from 'next/server';
// // // import { Agent, fetch as undiciFetch } from 'undici';
// // // import dns from 'node:dns';

// // // // Force IPv4 first to prevent DNS resolution hangs on serverless/Node environments
// // // dns.setDefaultResultOrder('ipv4first');

// // // export async function GET() {
// // //   const url = "https://apisaamar.jharkhand.gov.in/service.asmx/MTCRefferedChildList";
  
// // //   const params = new URLSearchParams();
// // //   params.append('user', 'Ar15025'); 
// // //   params.append('pass', 'Ar15025'); 

// // //   // Configure extended timeouts for slow response servers
// // //   const agent = new Agent({
// // //     connect: {
// // //       rejectUnauthorized: false,
// // //       timeout: 30000, // 30 seconds for initial connection TCP/TLS handshake
// // //     },
// // //     headersTimeout: 30000, // 30 seconds wait for server response headers
// // //     bodyTimeout: 30000,
// // //   });

// // //   try {
// // //     const response = await undiciFetch(url, {
// // //       method: 'POST', 
// // //       headers: {
// // //         'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
// // //         'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
// // //       },
// // //       body: params.toString(),
// // //       dispatcher: agent, 
// // //     });

// // //     if (!response.ok) {
// // //       return NextResponse.json({ error: `Remote server error: ${response.status}` }, { status: response.status });
// // //     }

// // //     const xmlData = await response.text(); 
// // //     return new NextResponse(xmlData, {
// // //       headers: { 'Content-Type': 'text/xml; charset=utf-8' }, 
// // //     });

// // //   } catch (error: unknown) {
// // //     let rootCause = "No additional cause provided";
// // //     let errorMessage = "Unknown error";

// // //     if (error instanceof Error) {
// // //       if (error.cause && typeof error.cause === 'object' && 'message' in error.cause) {
// // //         const causeObj = error.cause as Record<string, unknown>;
// // //         rootCause = String(causeObj.message);
// // //       }
// // //       errorMessage = `${error.message} - Cause: ${rootCause}`;
// // //     }
    
// // //     console.error("Proxy Fetch Error details:", error);
    
// // //     return NextResponse.json({ error: errorMessage }, { status: 500 }); 
// // //   }
// // // }

// import { NextResponse } from 'next/server';
// import { Agent, fetch as undiciFetch } from 'undici';

// // Extend Next.js API route execution limit for Vercel / serverless deployments
// export const maxDuration = 60; 
// export const dynamic = 'force-dynamic';

// export async function GET() {
//   const url = "https://apisaamar.jharkhand.gov.in/service.asmx/MTCRefferedChildList";

//   const params = new URLSearchParams();
//   params.append('user', 'Ar15025');
//   params.append('pass', 'Ar15025');

//   // Custom undici agent to bypass self-signed cert checks and extend connect/read timeouts
//   const agent = new Agent({
//     connect: {
//       rejectUnauthorized: false,
//       timeout: 30000, // 30-second connection timeout
//     },
//     headersTimeout: 30000,
//     bodyTimeout: 30000,
//   });

//   try {
//     const response = await undiciFetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
//       },
//       body: params.toString(),
//       dispatcher: agent,
//     });

//     if (!response.ok) {
//       return NextResponse.json(
//         { error: `Remote server error: ${response.status} ${response.statusText}` }, 
//         { status: 500 }
//       );
//     }

//     const xmlData = await response.text();
    
//     return new NextResponse(xmlData, {
//       headers: { 
//         'Content-Type': 'text/xml',
//         'Cache-Control': 'no-store, max-age=0',
//       },
//     });

//   } catch (error: unknown) {
//     let errorMessage = "Unknown server error";

//     if (error instanceof Error) {
//       let rootCause = "No additional cause provided";
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
import { Agent, fetch as undiciFetch } from 'undici';

export const maxDuration = 60; 
export const dynamic = 'force-dynamic';

export async function GET() {
  const url = "https://apisaamar.jharkhand.gov.in/service.asmx/MTCRefferedChildList";

  const params = new URLSearchParams();
  params.append('user', 'Ar15025');
  params.append('pass', 'Ar15025');

  // Agent configured specifically for resilient connectivity to NIC/Gov servers
  const agent = new Agent({
    connect: {
      rejectUnauthorized: false,
      timeout: 15000, // 15 seconds connection timeout per attempt
      family: 4,      // Force IPv4 to prevent hanging on unreachable IPv6 routes
    },
    headersTimeout: 20000,
    bodyTimeout: 20000,
    keepAliveTimeout: 1000,
    keepAliveMaxTimeout: 1000,
  });

  const maxRetries = 3;
  let lastError: unknown = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`[mtc-proxy] Attempt ${attempt} connecting to ${url}...`);

      const response = await undiciFetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Connection': 'keep-alive',
        },
        body: params.toString(),
        dispatcher: agent,
      });

      if (!response.ok) {
        return NextResponse.json(
          { error: `Remote server error: ${response.status} ${response.statusText}` }, 
          { status: 500 }
        );
      }

      const xmlData = await response.text();
      
      return new NextResponse(xmlData, {
        headers: { 
          'Content-Type': 'text/xml',
          'Cache-Control': 'no-store, max-age=0',
        },
      });

    } catch (error: unknown) {
      lastError = error;
      console.warn(`[mtc-proxy] Attempt ${attempt} failed:`, error instanceof Error ? error.message : error);

      // Wait 1 second before retrying
      if (attempt < maxRetries) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }
  }

  // Fallback error formatting if all retries fail
  let errorMessage = "Connection failed after multiple retries.";
  if (lastError instanceof Error) {
    let rootCause = "No additional cause provided";
    if (lastError.cause && typeof lastError.cause === 'object' && 'message' in lastError.cause) {
      const causeObj = lastError.cause as Record<string, unknown>;
      rootCause = String(causeObj.message);
    }
    errorMessage = `${lastError.message} - Cause: ${rootCause}`;
  }

  return NextResponse.json({ error: errorMessage }, { status: 504 });
}