// // import { NextResponse } from 'next/server';
// // import { query } from '@/lib/db';

// // export const dynamic = 'force-dynamic';

// // export async function GET(request: Request) {
// //   try {
// //     const { searchParams } = new URL(request.url);
    
// //     // Filters
// //     const mode = searchParams.get('mode');
// //     const from = searchParams.get('from');
// //     const to = searchParams.get('to');
// //     const year = searchParams.get('year');
// //     const month = searchParams.get('month');
// //     const quarter = searchParams.get('quarter');
// //     const districtId = searchParams.get('districtId');
// //     const mtcIdsStr = searchParams.get('mtcIds'); // Comma-separated string

// //     // Base query
// //     let sqlText = `
// //       SELECT 
// //         sex_id, 
// //         caste_id, 
// //         admission_type_id, 
// //         dob, 
// //         admission_date 
// //       FROM mtc_child_master 
// //       WHERE 1=1
// //     `;
    
// //     let params: any[] = [];
// //     let paramIdx = 1;

// //     // 1. Date Logic
// //     if (mode === 'daily' && from && to) {
// //       sqlText += ` AND admission_date >= $${paramIdx++} AND admission_date <= $${paramIdx++}`;
// //       params.push(from, to);
// //     } 
// //     else if (mode === 'monthly' && year && month) {
// //       sqlText += ` AND EXTRACT(YEAR FROM admission_date) = $${paramIdx++} AND EXTRACT(MONTH FROM admission_date) = $${paramIdx++}`;
// //       params.push(parseInt(year, 10), parseInt(month, 10));
// //     } 
// //     else if (mode === 'quarterly' && year && quarter) {
// //       sqlText += ` AND EXTRACT(YEAR FROM admission_date) = $${paramIdx++}`;
// //       params.push(parseInt(year, 10));
      
// //       if (quarter === 'Q1') sqlText += ` AND EXTRACT(MONTH FROM admission_date) IN (1, 2, 3)`;
// //       else if (quarter === 'Q2') sqlText += ` AND EXTRACT(MONTH FROM admission_date) IN (4, 5, 6)`;
// //       else if (quarter === 'Q3') sqlText += ` AND EXTRACT(MONTH FROM admission_date) IN (7, 8, 9)`;
// //       else if (quarter === 'Q4') sqlText += ` AND EXTRACT(MONTH FROM admission_date) IN (10, 11, 12)`;
// //     }

// //     // 2. District Filter
// //     if (districtId && districtId !== 'null' && districtId !== 'undefined' && districtId !== '') {
// //       sqlText += ` AND district_id = $${paramIdx++}`;
// //       params.push(parseInt(districtId, 10));
// //     }

// //     // 3. MTC Filter
// //     if (mtcIdsStr && mtcIdsStr !== 'null') {
// //       const mtcIds = mtcIdsStr.split(',').map(id => parseInt(id.trim(), 10)).filter(id => !isNaN(id));
// //       if (mtcIds.length > 0) {
// //         sqlText += ` AND mtc_id = ANY($${paramIdx++}::int[])`;
// //         params.push(mtcIds);
// //       }
// //     }

// //     const result = await query(sqlText, params);
// //     const rows = result.rows;

// //     // =========================================================
// //     // DATA AGGREGATION ENGINE
// //     // =========================================================
    
// //     // Arrays map exactly to the Frontend label structures
// //     const genderCounts = [0, 0]; // [FEMALE, MALE]
// //     const casteCounts = [0, 0, 0, 0]; // [SC, ST, OBC, OTHERS]
// //     const ageCounts = [0, 0, 0, 0]; // [0-6M, 6-24 M, 24-36 M, >36 M]
// //     const admissionCounts = [0, 0]; // [NEW, RE-ADMIT]

// //     rows.forEach(row => {
// //       // Gender: 2=Female, 1=Male (Index 0 = Female, Index 1 = Male)
// //       if (row.sex_id == 2) genderCounts[0]++;
// //       else if (row.sex_id == 1) genderCounts[1]++;

// //       // Caste: 2=SC, 1=ST, 3=OBC, 4=Others 
// //       // Output order: SC (0), ST (1), OBC (2), OTHERS (3)
// //       if (row.caste_id == 2) casteCounts[0]++;
// //       else if (row.caste_id == 1) casteCounts[1]++;
// //       else if (row.caste_id == 3) casteCounts[2]++;
// //       else casteCounts[3]++;

// //       // Admission Type: 1=New, 2=Re-admit/Relapse
// //       if (row.admission_type_id == 1) admissionCounts[0]++;
// //       else if (row.admission_type_id == 2 || row.admission_type_id == 3) admissionCounts[1]++;

// //       // Age Calculation (Months)
// //       if (row.dob && row.admission_date) {
// //         const dob = new Date(row.dob);
// //         const adm = new Date(row.admission_date);
// //         const months = (adm.getTime() - dob.getTime()) / (1000 * 60 * 60 * 24 * 30.44);
        
// //         if (months <= 6) ageCounts[0]++;
// //         else if (months <= 24) ageCounts[1]++;
// //         else if (months <= 36) ageCounts[2]++;
// //         else ageCounts[3]++;
// //       }
// //     });

// //     const reportData = {
// //       gender: genderCounts,
// //       caste: casteCounts,
// //       age: ageCounts,
// //       admission: admissionCounts,
// //       total: rows.length
// //     };

// //     return NextResponse.json(reportData, { status: 200 });

// //   } catch (error) {
// //     console.error('Factsheet Aggregation Error:', error);
// //     return NextResponse.json({ error: 'Failed to generate factsheet' }, { status: 500 });
// //   }
// // }

// import { NextResponse } from 'next/server';
// import { query } from '@/lib/db';

// export const dynamic = 'force-dynamic';

// export async function GET(request: Request) {
//   try {
//     const { searchParams } = new URL(request.url);
    
//     // Filters
//     const mode = searchParams.get('mode');
//     const from = searchParams.get('from');
//     const to = searchParams.get('to');
//     const year = searchParams.get('year');
//     const month = searchParams.get('month');
//     const quarter = searchParams.get('quarter');
//     const districtId = searchParams.get('districtId');
//     const mtcIdsStr = searchParams.get('mtcIds'); // Comma-separated string

//     // Base query
//     let sqlText = `
//       SELECT 
//         sex_id, 
//         caste_id, 
//         admission_type_id, 
//         dob, 
//         admission_date 
//       FROM mtc_child_master 
//       WHERE 1=1
//     `;
    
//     const params: (string | number | number[])[] = []; // Fixes both prefer-const and no-explicit-any
//     let paramIdx = 1;

//     // 1. Date Logic
//     if (mode === 'daily' && from && to) {
//       sqlText += ` AND admission_date >= $${paramIdx++} AND admission_date <= $${paramIdx++}`;
//       params.push(from, to);
//     } 
//     else if (mode === 'monthly' && year && month) {
//       sqlText += ` AND EXTRACT(YEAR FROM admission_date) = $${paramIdx++} AND EXTRACT(MONTH FROM admission_date) = $${paramIdx++}`;
//       params.push(parseInt(year, 10), parseInt(month, 10));
//     } 
//     else if (mode === 'quarterly' && year && quarter) {
//       sqlText += ` AND EXTRACT(YEAR FROM admission_date) = $${paramIdx++}`;
//       params.push(parseInt(year, 10));
      
//       if (quarter === 'Q1') sqlText += ` AND EXTRACT(MONTH FROM admission_date) IN (1, 2, 3)`;
//       else if (quarter === 'Q2') sqlText += ` AND EXTRACT(MONTH FROM admission_date) IN (4, 5, 6)`;
//       else if (quarter === 'Q3') sqlText += ` AND EXTRACT(MONTH FROM admission_date) IN (7, 8, 9)`;
//       else if (quarter === 'Q4') sqlText += ` AND EXTRACT(MONTH FROM admission_date) IN (10, 11, 12)`;
//     }

//     // 2. District Filter
//     if (districtId && districtId !== 'null' && districtId !== 'undefined' && districtId !== '') {
//       sqlText += ` AND district_id = $${paramIdx++}`;
//       params.push(parseInt(districtId, 10));
//     }

//     // 3. MTC Filter
//     if (mtcIdsStr && mtcIdsStr !== 'null') {
//       const mtcIds = mtcIdsStr.split(',').map(id => parseInt(id.trim(), 10)).filter(id => !isNaN(id));
//       if (mtcIds.length > 0) {
//         sqlText += ` AND mtc_id = ANY($${paramIdx++}::int[])`;
//         params.push(mtcIds);
//       }
//     }

//     const result = await query(sqlText, params);
//     const rows = result.rows;

//     // =========================================================
//     // DATA AGGREGATION ENGINE
//     // =========================================================
    
//     // Arrays map exactly to the Frontend label structures
//     const genderCounts = [0, 0]; // [FEMALE, MALE]
//     const casteCounts = [0, 0, 0, 0]; // [SC, ST, OBC, OTHERS]
//     const ageCounts = [0, 0, 0, 0]; // [0-6M, 6-24 M, 24-36 M, >36 M]
//     const admissionCounts = [0, 0]; // [NEW, RE-ADMIT]

//     rows.forEach(row => {
//       // Gender: 2=Female, 1=Male (Index 0 = Female, Index 1 = Male)
//       if (row.sex_id == 2) genderCounts[0]++;
//       else if (row.sex_id == 1) genderCounts[1]++;

//       // Caste: 2=SC, 1=ST, 3=OBC, 4=Others 
//       // Output order: SC (0), ST (1), OBC (2), OTHERS (3)
//       if (row.caste_id == 2) casteCounts[0]++;
//       else if (row.caste_id == 1) casteCounts[1]++;
//       else if (row.caste_id == 3) casteCounts[2]++;
//       else casteCounts[3]++;

//       // Admission Type: 1=New, 2=Re-admit/Relapse
//       if (row.admission_type_id == 1) admissionCounts[0]++;
//       else if (row.admission_type_id == 2 || row.admission_type_id == 3) admissionCounts[1]++;

//       // Age Calculation (Months)
//       if (row.dob && row.admission_date) {
//         const dob = new Date(row.dob);
//         const adm = new Date(row.admission_date);
//         const months = (adm.getTime() - dob.getTime()) / (1000 * 60 * 60 * 24 * 30.44);
        
//         if (months <= 6) ageCounts[0]++;
//         else if (months <= 24) ageCounts[1]++;
//         else if (months <= 36) ageCounts[2]++;
//         else ageCounts[3]++;
//       }
//     });

//     const reportData = {
//       gender: genderCounts,
//       caste: casteCounts,
//       age: ageCounts,
//       admission: admissionCounts,
//       total: rows.length
//     };

//     return NextResponse.json(reportData, { status: 200 });

//   } catch (error) {
//     console.error('Factsheet Aggregation Error:', error);
//     return NextResponse.json({ error: 'Failed to generate factsheet' }, { status: 500 });
//   }
// }

import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

interface FactsheetChildRow {
  sex_id: number | null;
  caste_id: number | null;
  admission_type_id: number | null;
  dob: string | number | Date | null;
  admission_date: string | number | Date | null;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Filters
    const mode = searchParams.get('mode');
    const from = searchParams.get('from');
    const to = searchParams.get('to');
    const year = searchParams.get('year');
    const month = searchParams.get('month');
    const quarter = searchParams.get('quarter');
    const districtId = searchParams.get('districtId');
    const mtcIdsStr = searchParams.get('mtcIds'); // Comma-separated string

    // Base query
    let sqlText = `
      SELECT 
        sex_id, 
        caste_id, 
        admission_type_id, 
        dob, 
        admission_date 
      FROM mtc_child_master 
      WHERE 1=1
    `;
    
    const params: (string | number | number[])[] = [];
    let paramIdx = 1;

    // 1. Date Logic
    if (mode === 'daily' && from && to) {
      sqlText += ` AND admission_date >= $${paramIdx++} AND admission_date <= $${paramIdx++}`;
      params.push(from, to);
    } 
    else if (mode === 'monthly' && year && month) {
      sqlText += ` AND EXTRACT(YEAR FROM admission_date) = $${paramIdx++} AND EXTRACT(MONTH FROM admission_date) = $${paramIdx++}`;
      params.push(parseInt(year, 10), parseInt(month, 10));
    } 
    else if (mode === 'quarterly' && year && quarter) {
      sqlText += ` AND EXTRACT(YEAR FROM admission_date) = $${paramIdx++}`;
      params.push(parseInt(year, 10));
      
      if (quarter === 'Q1') sqlText += ` AND EXTRACT(MONTH FROM admission_date) IN (1, 2, 3)`;
      else if (quarter === 'Q2') sqlText += ` AND EXTRACT(MONTH FROM admission_date) IN (4, 5, 6)`;
      else if (quarter === 'Q3') sqlText += ` AND EXTRACT(MONTH FROM admission_date) IN (7, 8, 9)`;
      else if (quarter === 'Q4') sqlText += ` AND EXTRACT(MONTH FROM admission_date) IN (10, 11, 12)`;
    }

    // 2. District Filter
    if (districtId && districtId !== 'null' && districtId !== 'undefined' && districtId !== '') {
      sqlText += ` AND district_id = $${paramIdx++}`;
      params.push(parseInt(districtId, 10));
    }

    // 3. MTC Filter
    if (mtcIdsStr && mtcIdsStr !== 'null') {
      const mtcIds = mtcIdsStr.split(',').map(id => parseInt(id.trim(), 10)).filter(id => !isNaN(id));
      if (mtcIds.length > 0) {
        sqlText += ` AND mtc_id = ANY($${paramIdx++}::int[])`;
        params.push(mtcIds);
      }
    }

    // Supply the explicit FactsheetChildRow interface mapping to the database driver
    const result = await query<FactsheetChildRow>(sqlText, params);
    const rows = result.rows;

    // =========================================================
    // DATA AGGREGATION ENGINE
    // =========================================================
    
    const genderCounts = [0, 0]; // [FEMALE, MALE]
    const casteCounts = [0, 0, 0, 0]; // [SC, ST, OBC, OTHERS]
    const ageCounts = [0, 0, 0, 0]; // [0-6M, 6-24 M, 24-36 M, >36 M]
    const admissionCounts = [0, 0]; // [NEW, RE-ADMIT]

    rows.forEach(row => {
      // Gender: 2=Female, 1=Male (Index 0 = Female, Index 1 = Male)
      if (row.sex_id == 2) genderCounts[0]++;
      else if (row.sex_id == 1) genderCounts[1]++;

      // Caste: 2=SC, 1=ST, 3=OBC, 4=Others 
      if (row.caste_id == 2) casteCounts[0]++;
      else if (row.caste_id == 1) casteCounts[1]++;
      else if (row.caste_id == 3) casteCounts[2]++;
      else casteCounts[3]++;

      // Admission Type: 1=New, 2=Re-admit/Relapse
      if (row.admission_type_id == 1) admissionCounts[0]++;
      else if (row.admission_type_id == 2 || row.admission_type_id == 3) admissionCounts[1]++;

      // Age Calculation (Months) safely handled by strict interface constraints
      if (row.dob && row.admission_date) {
        const dob = new Date(row.dob);
        const adm = new Date(row.admission_date);
        const months = (adm.getTime() - dob.getTime()) / (1000 * 60 * 60 * 24 * 30.44);
        
        if (months <= 6) ageCounts[0]++;
        else if (months <= 24) ageCounts[1]++;
        else if (months <= 36) ageCounts[2]++;
        else ageCounts[3]++;
      }
    });

    const reportData = {
      gender: genderCounts,
      caste: casteCounts,
      age: ageCounts,
      admission: admissionCounts,
      total: rows.length
    };

    return NextResponse.json(reportData, { status: 200 });

  } catch (error) {
    console.error('Factsheet Aggregation Error:', error);
    return NextResponse.json({ error: 'Failed to generate factsheet' }, { status: 500 });
  }
}