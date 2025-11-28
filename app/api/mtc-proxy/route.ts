// app/api/mtc-proxy/route.ts
import { NextResponse } from 'next/server';
import { URLSearchParams } from 'url';

// Configuration interface
interface ProxyConfig {
  serviceUrl: string;
  credentials: {
    user: string;
    pass: string;
  };
  timeout: number;
}

// Proxy configuration
const config: ProxyConfig = {
  serviceUrl: 'http://testservice.saamar.in/Service.asmx/MTCRefferedChildList',
  credentials: {
    user: process.env.MTC_USER || 'Ar15025',
    pass: process.env.MTC_PASS || 'Ar15025',
  },
  timeout: 30000, // 30 seconds
};

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Handle OPTIONS requests for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders,
  });
}

// Main GET handler (for the frontend)
export async function GET() {
  try {
    // Validate environment variables in production
    if (process.env.NODE_ENV === 'production') {
      if (!process.env.MTC_USER || !process.env.MTC_PASS) {
        throw new Error('Missing required environment variables');
      }
    }

    // Prepare form data
    const formData = new URLSearchParams();
    formData.append('user', config.credentials.user);
    formData.append('pass', config.credentials.pass);

    // Create AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), config.timeout);

    try {
      // Make request to external service
      const response = await fetch(config.serviceUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
          'User-Agent': 'MTC-Proxy/1.0',
        },
        body: formData.toString(),
        signal: controller.signal,
      });

      // Clear timeout
      clearTimeout(timeoutId);

      // Handle non-successful responses
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP ${response.status}: ${response.statusText}. Response: ${errorText}`
        );
      }

      // Get response content type
      const contentType = response.headers.get('content-type') || 'text/xml';
      
      // Get response data
      const data = await response.arrayBuffer();

      // Return successful response
      return new NextResponse(data, {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': contentType,
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
      });

    } catch (fetchError) {
      clearTimeout(timeoutId);
      throw fetchError;
    }

  } catch (error) {
    console.error('MTC Proxy Error:', error);

    // Determine error type
    let errorMessage = 'Internal server error';
    let statusCode = 500;

    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        errorMessage = 'Request timeout';
        statusCode = 408;
      } else if (error.message.includes('ECONNREFUSED')) {
        errorMessage = 'Service unavailable';
        statusCode = 503;
      } else {
        errorMessage = error.message;
      }
    }

    // Return error response
    return NextResponse.json(
      {
        error: 'MTC Proxy Error',
        message: errorMessage,
        timestamp: new Date().toISOString(),
      },
      {
        status: statusCode,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
}

// POST handler (if needed for other use cases)
export async function POST() {
  // You can implement this if needed
  return GET();
}