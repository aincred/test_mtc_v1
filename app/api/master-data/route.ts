// import { NextResponse } from 'next/server';
// import { 
//   getGenderList, 
//   getCastList, 
//   getDistrictList, 
//   getICDSList, 
//   getAnganwadiList,
//   getBlockList 
// } from '@/lib/db'; 

// // Force this route to be dynamic so it doesn't cache empty data during build
// export const dynamic = 'force-dynamic';

// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const type = searchParams.get('type');
//   const parentId = searchParams.get('parentId');

//   try {
//     // 1. Fetch Dynamic Data 
//     if (type === 'icds' && parentId) {
//       const data = await getICDSList(parentId);
//       return NextResponse.json(data);
//     }
    
//     // --- NEW BLOCK HANDLING ---
//     if (type === 'block' && parentId) {
//       const data = await getBlockList(parentId);
//       return NextResponse.json(data);
//     }
    
//     if (type === 'anganwadi' && parentId) {
//       const data = await getAnganwadiList(parentId);
//       return NextResponse.json(data);
//     }

//     // 2. Fetch Initial Master Data (Gender, Cast, District)
//     // We run these in parallel for speed
//     const [genders, casts, districts] = await Promise.all([
//       getGenderList(),
//       getCastList(),
//       getDistrictList()
//     ]);

//     return NextResponse.json({
//       genders,
//       casts,
//       districts
//     });

//   } catch (error: any) {
//     console.error('❌ API Database Error:', error);
//     return NextResponse.json(
//       { error: 'Failed to fetch data', details: error.message }, 
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from 'next/server';
import { 
  getGenderList, 
  getCastList, 
  getDistrictList, 
  getICDSList, 
  getAnganwadiList,
  getBlockList 
} from '@/lib/db'; 

// Force this route to be dynamic so it doesn't cache empty data during build
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const parentId = searchParams.get('parentId');

  try {
    // 1. Fetch Dynamic Data 
    if (type === 'icds' && parentId) {
      const data = await getICDSList(parentId);
      return NextResponse.json(data);
    }
    
    // --- NEW BLOCK HANDLING ---
    if (type === 'block' && parentId) {
      const data = await getBlockList(parentId);
      return NextResponse.json(data);
    }
    
    if (type === 'anganwadi' && parentId) {
      const data = await getAnganwadiList(parentId);
      return NextResponse.json(data);
    }

    // 2. Fetch Initial Master Data (Gender, Cast, District)
    // We run these in parallel for speed
    const [genders, casts, districts] = await Promise.all([
      getGenderList(),
      getCastList(),
      getDistrictList()
    ]);

    return NextResponse.json({
      genders,
      casts,
      districts
    });

  } catch (error: unknown) { // Changed 'any' to 'unknown'
    console.error('❌ API Database Error:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    return NextResponse.json(
      { error: 'Failed to fetch data', details: errorMessage }, 
      { status: 500 }
    );
  }
}