// // app/api/mtc/daily-weight/route.ts
// import { NextResponse } from 'next/server';
// import { getChildrenFromDB, getDailyWeights } from '@/lib/db';

// export async function GET() {
//   try {
//     // 1. Fetch all children
//     const children = await getChildrenFromDB();

//     // 2. Fetch weight data for each child
//     // Note: In a larger app, you would optimize this with a single JOIN query,
//     // but this works with your existing db.ts functions.
//     const combinedData = await Promise.all(
//       children.map(async (child: any) => {
//         const weightData = await getDailyWeights(child.SamNo);
//         return {
//           ...child,
//           weights: weightData || {} // Attach weights to the child object
//         };
//       })
//     );

//     return NextResponse.json(combinedData);
//   } catch (error) {
//     console.error("API Error:", error);
//     return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";
import { getChildrenFromDB, getDailyWeights } from "@/lib/db";

/* ---------------------------------- TYPES --------------------------------- */

interface Child {
  SamNo: string;
  Name?: string;
  Gender?: string;
  Age?: number;
  // add more fields if your children table has them
}

interface DailyWeightRecord {
  date: string;
  weight: number;
}

interface ChildWithWeights extends Child {
  weights: DailyWeightRecord[] | [];
}

/* ---------------------------------- GET ---------------------------------- */

export async function GET() {
  try {
    // 1. Fetch all children
    const children: Child[] = await getChildrenFromDB();

    // 2. Fetch daily weight data for each child
    const combinedData: ChildWithWeights[] = await Promise.all(
      children.map(async (child: Child) => {
        const weightData: DailyWeightRecord[] | null =
          await getDailyWeights(child.SamNo);

        return {
          ...child,
          weights: weightData ?? []
        };
      })
    );

    return NextResponse.json(combinedData);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
