// // app/api/bed-occupancy/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import { saveBedOccupancy, getBedOccupancyHistory } from "@/lib/db"; // Adjust path to your db.ts

// // GET: Fetch records for a specific year
// export async function GET(req: NextRequest) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const year = searchParams.get("year");
//     // TODO: Get real MTCCode from user session
//     const mtcCode = searchParams.get("mtcCode") || "JH/WSB/CBS"; 

//     if (!year) {
//       return NextResponse.json({ error: "Year is required" }, { status: 400 });
//     }

//     const data = await getBedOccupancyHistory(mtcCode, parseInt(year));
    
//     // Transform data to match frontend interface if necessary
//     const formattedData = data.map((record: any) => {
//       const dateObj = new Date(record.date);
//       return {
//         id: record.id,
//         date: record.date,
//         year: dateObj.getFullYear(),
//         month: dateObj.getMonth() + 1,
//         day: dateObj.getDate(),
//         bedSanctioned: record.BedSanctioned,
//         utilizedBed: record.UtilizedBed,
//         bedOccupancyPercentage: record.bedOccupancyPercentage,
//         createdAt: record.date // Using record date as creation date
//       };
//     });

//     return NextResponse.json(formattedData);
//   } catch (error) {
//     console.error("API Error:", error);
//     return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
//   }
// }

// // POST: Save or Update a record
// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();
    
//     // TODO: Get real MTCCode from session
//     const mtcCode = body.mtcCode || "JH/WSB/CBS"; 

//     const saveResult = await saveBedOccupancy({
//       MTCCode: mtcCode,
//       BedSanctioned: parseFloat(body.bedSanctioned),
//       UtilizedBed: parseFloat(body.utilizedBed),
//       RecordDate: body.date,
//       BedOccupency: parseFloat(body.bedOccupancyPercentage)
//     });

//     return NextResponse.json(saveResult);
//   } catch (error) {
//     console.error("API Save Error:", error);
//     return NextResponse.json({ error: "Failed to save data" }, { status: 500 });
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import { saveBedOccupancy, getBedOccupancyHistory } from "@/lib/db";

/**
 * DB record shape returned by getBedOccupancyHistory
 */
interface BedOccupancyDBRecord {
  id: number;
  date: string; // or Date if your DB returns Date objects
  BedSanctioned: number;
  UtilizedBed: number;
  bedOccupancyPercentage: number;
}

/**
 * Frontend response shape
 */
interface BedOccupancyResponse {
  id: number;
  date: string;
  year: number;
  month: number;
  day: number;
  bedSanctioned: number;
  utilizedBed: number;
  bedOccupancyPercentage: number;
  createdAt: string;
}

// GET: Fetch records for a specific year
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const yearParam = searchParams.get("year");

    // TODO: Replace with real MTCCode from session
    const mtcCode = searchParams.get("mtcCode") ?? "JH/WSB/CBS";

    if (!yearParam) {
      return NextResponse.json(
        { error: "Year is required" },
        { status: 400 }
      );
    }

    const year = Number(yearParam);

    if (Number.isNaN(year)) {
      return NextResponse.json(
        { error: "Invalid year" },
        { status: 400 }
      );
    }

    const data: BedOccupancyDBRecord[] =
      await getBedOccupancyHistory(mtcCode, year);

    const formattedData: BedOccupancyResponse[] = data.map(
      (record: BedOccupancyDBRecord) => {
        const dateObj = new Date(record.date);

        return {
          id: record.id,
          date: record.date,
          year: dateObj.getFullYear(),
          month: dateObj.getMonth() + 1,
          day: dateObj.getDate(),
          bedSanctioned: record.BedSanctioned,
          utilizedBed: record.UtilizedBed,
          bedOccupancyPercentage: record.bedOccupancyPercentage,
          createdAt: record.date
        };
      }
    );

    return NextResponse.json(formattedData);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}

// POST: Save or Update a record
export async function POST(req: NextRequest) {
  try {
    const body: {
      mtcCode?: string;
      bedSanctioned: number | string;
      utilizedBed: number | string;
      bedOccupancyPercentage: number | string;
      date: string;
    } = await req.json();

    // TODO: Replace with real MTCCode from session
    const mtcCode = body.mtcCode ?? "JH/WSB/CBS";

    const saveResult = await saveBedOccupancy({
      MTCCode: mtcCode,
      BedSanctioned: Number(body.bedSanctioned),
      UtilizedBed: Number(body.utilizedBed),
      RecordDate: body.date,
      BedOccupency: Number(body.bedOccupancyPercentage)
    });

    return NextResponse.json(saveResult);
  } catch (error) {
    console.error("API Save Error:", error);
    return NextResponse.json(
      { error: "Failed to save data" },
      { status: 500 }
    );
  }
}
