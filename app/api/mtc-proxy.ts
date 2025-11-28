// app\api\mtc-proxy.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { URLSearchParams } from 'url';

interface ProxyConfig {
  serviceUrl: string;
  credentials: {
    user: string;
    pass: string;
  };
  timeout: number;
}

const config: ProxyConfig = {
  serviceUrl: 'http://testservice.saamar.in/Service.asmx/MTCRefferedChildList',
  credentials: {
    user: process.env.MTC_USER || 'Ar15025',
    pass: process.env.MTC_PASS || 'Ar15025',
  },
  timeout: 30000,
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    // Validate environment in production
    if (process.env.NODE_ENV === 'production') {
      if (!process.env.MTC_USER || !process.env.MTC_PASS) {
        throw new Error('Missing required environment variables');
      }
    }

    // Prepare form data
    const formData = new URLSearchParams();
    formData.append('user', config.credentials.user);
    formData.append('pass', config.credentials.pass);

    // Create timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), config.timeout);

    try {
      // Make request
      const response = await fetch(config.serviceUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
          'User-Agent': 'MTC-Proxy/1.0',
        },
        body: formData.toString(),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP ${response.status}: ${response.statusText}. Response: ${errorText}`
        );
      }

      const contentType = response.headers.get('content-type') || 'text/xml';
      const data = await response.arrayBuffer();

      res.setHeader('Content-Type', contentType);
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.status(200).send(Buffer.from(data));

    } catch (fetchError) {
      clearTimeout(timeoutId);
      throw fetchError;
    }

  } catch (error) {
    console.error('MTC Proxy Error:', error);

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

    res.status(statusCode).json({
      error: 'MTC Proxy Error',
      message: errorMessage,
      timestamp: new Date().toISOString(),
    });
  }
}