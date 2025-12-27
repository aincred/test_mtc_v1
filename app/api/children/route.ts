// // app/api/children/route.ts
// import { NextResponse } from 'next/server';
// import { getChildrenFromDB } from '@/lib/db';

// export async function GET() {
//   try {
//     const data = await getChildrenFromDB();
    
//     // Format dates to strings so React can render them easily
//     const formattedData = data.map((child: any) => ({
//       id: child.SamNo, // Using SamNo as the unique ID
//       ...child,
//       DateofBirth: child.DateofBirth ? new Date(child.DateofBirth).toISOString() : null,
//       AdmissionDate: child.AdmissionDate ? new Date(child.AdmissionDate).toISOString() : null,
//     }));

//     return NextResponse.json(formattedData);
//   } catch (error) {
//     return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
//   }
// }

// app/api/children/route.ts
import { NextResponse } from 'next/server';
import { getChildrenFromDB, ChildData } from '@/lib/db';

export async function GET() {
  try {
    // Cast the result to ChildData[] to ensure type safety
    const data = await getChildrenFromDB() as ChildData[];
    
    // Format dates to strings so React can render them easily
    const formattedData = data.map((child: ChildData) => ({
      id: child.SamNo, // Using SamNo as the unique ID
      ...child,
      DateofBirth: child.DateofBirth ? new Date(child.DateofBirth).toISOString() : null,
      AdmissionDate: child.AdmissionDate ? new Date(child.AdmissionDate).toISOString() : null,
    }));

    return NextResponse.json(formattedData);
  } catch (error: unknown) {
    // Log the error to fix 'unused-vars' warning and help with debugging
    console.error("API Error fetching children:", error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}