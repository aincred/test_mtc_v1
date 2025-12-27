// // // app/api/children/route.ts
// // import { NextResponse } from 'next/server';
// // import { getChildrenFromDB } from '@/lib/db';

// // export async function GET() {
// //   try {
// //     const data = await getChildrenFromDB();
    
// //     // Format dates to strings so React can render them easily
// //     const formattedData = data.map((child: any) => ({
// //       id: child.SamNo, // Using SamNo as the unique ID
// //       ...child,
// //       DateofBirth: child.DateofBirth ? new Date(child.DateofBirth).toISOString() : null,
// //       AdmissionDate: child.AdmissionDate ? new Date(child.AdmissionDate).toISOString() : null,
// //     }));

// //     return NextResponse.json(formattedData);
// //   } catch (error) {
// //     return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
// //   }
// // }

// // app/api/children/route.ts
// // app/api/children/route.ts
// import { NextResponse } from 'next/server';
// import { getChildrenFromDB } from '@/lib/db'; // Adjust path to where you saved the DAL file

// export async function GET(request: Request) {
//   try {
//     // 1. Fetch raw data from SQL Server
//     const dbData = await getChildrenFromDB();

//     // 2. Map SQL columns (PascalCase) to Frontend Interface (camelCase)
//     // SQL: SamNo, ChildName, MotherName, DateofBirth, AdmissionWeight
//     // UI:  samNumber, childName, parentName, dateOfBirth, admissionWeight
//     const formattedData = dbData.map((child: any) => ({
//       id: child.SamNo,             // specific unique ID
//       recordNo: child.SamNo,       // Using SamNo as RecordNo for now
//       samNumber: child.SamNo,
//       childName: child.ChildName,
//       parentName: child.MotherName, // Defaulting to Mother's name
//       dateOfBirth: child.DateofBirth ? new Date(child.DateofBirth).toISOString().split('T')[0] : '',
//       admissionWeight: child.AdmissionWeight?.toString() || '0',
//       admissionHeight: child.AdmissionHeight?.toString() || '0',
//       createdAt: child.AdmissionDate // Used for the Date Filter
//     }));

//     return NextResponse.json(formattedData);
//   } catch (error) {
//     console.error("API Error:", error);
//     return NextResponse.json({ error: "Failed to fetch children" }, { status: 500 });
//   }
// }

import { NextResponse } from 'next/server';
import { getChildrenFromDB } from '@/lib/db'; 

// 1. Define the shape of the raw data coming from your DB
interface DBChild {
  SamNo: string;
  ChildName: string;
  MotherName: string;
  DateofBirth: string | Date;
  AdmissionWeight: number | string;
  AdmissionHeight: number | string;
  AdmissionDate: string | Date;
}

// 2. Removed unused 'request' parameter
export async function GET() {
  try {
    const dbData = await getChildrenFromDB();

    // 3. Typed 'child' as DBChild instead of 'any'
    const formattedData = dbData.map((child: DBChild) => ({
      id: child.SamNo,             
      recordNo: child.SamNo,       
      samNumber: child.SamNo,
      childName: child.ChildName,
      parentName: child.MotherName, 
      // Handle Date conversion safely
      dateOfBirth: child.DateofBirth 
        ? new Date(child.DateofBirth).toISOString().split('T')[0] 
        : '',
      admissionWeight: child.AdmissionWeight?.toString() || '0',
      admissionHeight: child.AdmissionHeight?.toString() || '0',
      createdAt: child.AdmissionDate 
    }));

    return NextResponse.json(formattedData);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Failed to fetch children" }, { status: 500 });
  }
}