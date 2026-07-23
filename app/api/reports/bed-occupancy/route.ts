// import { NextResponse } from 'next/server';
// import { query } from '@/lib/db';

// export const dynamic = 'force-dynamic';

// interface BedOccupancyRow {
//   mtc_name: string;
//   mtc_code: string;
//   bed_sanctioned: number;
//   total_utilized_beds: number;
//   total_possible_bed_days: number;
//   avg_occupancy_percentage: number;
// }

// export async function GET(request: Request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const range = searchParams.get('range') || 'monthly';
//     const districtName = searchParams.get('districtName') || 'RANCHI';

//     let startDateStr = '';
//     let endDateStr = '';

//     // Calculate Date Boundaries based on range selection
//     if (range === 'daily') {
//       const selectedDate = searchParams.get('fromDate') || new Date().toISOString().split('T')[0];
//       startDateStr = selectedDate;
//       endDateStr = selectedDate;
//     } else if (range === 'monthly') {
//       const year = searchParams.get('year') || new Date().getFullYear().toString();
//       const month = searchParams.get('month') || (new Date().getMonth() + 1).toString();
//       const paddedMonth = month.padStart(2, '0');
      
//       const lastDay = new Date(Number(year), Number(month), 0).getDate();
//       startDateStr = `${year}-${paddedMonth}-01`;
//       endDateStr = `${year}-${paddedMonth}-${lastDay}`;
//     } else if (range === 'quarterly') {
//       const year = searchParams.get('year') || new Date().getFullYear().toString();
//       const quarter = searchParams.get('quarter') || 'Q1';

//       if (quarter === 'Q1') {
//         startDateStr = `${year}-01-01`;
//         endDateStr = `${year}-03-31`;
//       } else if (quarter === 'Q2') {
//         startDateStr = `${year}-04-01`;
//         endDateStr = `${year}-06-30`;
//       } else if (quarter === 'Q3') {
//         startDateStr = `${year}-07-01`;
//         endDateStr = `${year}-09-30`;
//       } else if (quarter === 'Q4') {
//         startDateStr = `${year}-10-01`;
//         endDateStr = `${year}-12-31`;
//       }
//     }

//     // 1. Get MTC Centers in the logged-in district using district column directly
//     const mtcSql = `
//       SELECT mtc_id, mtc_name, mtc_code 
//       FROM mtc_centers 
//       WHERE UPPER(district) = $1
//     `;

//     const mtcRes = await query<{ mtc_id: number; mtc_name: string; mtc_code: string }>(
//       mtcSql, 
//       [districtName.toUpperCase()]
//     );
    
//     if (mtcRes.rows.length === 0) {
//       return NextResponse.json({
//         success: true,
//         summary: { totalSanctionedBeds: 0, totalPatientDays: 0, avgOccupancyRate: "0.0%" },
//         data: []
//       });
//     }

//     const targetMtcCodes = mtcRes.rows.map(m => m.mtc_code);

//     // 2. Query mtc_bed_occupancy aggregated by MTC over the calculated date range
//     const sqlText = `
//       SELECT 
//         mtc_name,
//         mtc_code,
//         MAX(bed_sanctioned)::INT AS bed_sanctioned,
//         SUM(utilized_bed)::INT AS total_utilized_beds,
//         SUM(bed_sanctioned)::INT AS total_possible_bed_days,
//         ROUND(AVG(bed_occupancy_percentage), 1)::FLOAT AS avg_occupancy_percentage
//       FROM public.mtc_bed_occupancy
//       WHERE record_date >= $1::DATE 
//         AND record_date <= $2::DATE
//         AND mtc_code = ANY($3::text[])
//       GROUP BY mtc_name, mtc_code
//       ORDER BY mtc_name ASC
//     `;

//     const reportRes = await query<BedOccupancyRow>(sqlText, [startDateStr, endDateStr, targetMtcCodes]);

//     // 3. Compute Summary Totals across all MTCs in the district
//     let totalSanctionedBeds = 0;
//     let totalPatientDays = 0;
//     let sumOccupancyPct = 0;

//     const reportData = reportRes.rows.map((row) => {
//       totalSanctionedBeds += Number(row.bed_sanctioned) || 0;
//       totalPatientDays += Number(row.total_utilized_beds) || 0;
//       sumOccupancyPct += Number(row.avg_occupancy_percentage) || 0;

//       return {
//         mtcName: row.mtc_name,
//         mtcCode: row.mtc_code,
//         sanctionedBeds: row.bed_sanctioned || 0,
//         availableBedDays: row.total_possible_bed_days || 0,
//         occupiedBedDays: row.total_utilized_beds || 0,
//         occupancyRate: `${(row.avg_occupancy_percentage || 0).toFixed(1)}%`
//       };
//     });

//     const overallAvgOccupancy = reportRes.rows.length > 0 
//       ? (sumOccupancyPct / reportRes.rows.length).toFixed(1) 
//       : "0.0";

//     return NextResponse.json({
//       success: true,
//       summary: {
//         totalSanctionedBeds,
//         totalPatientDays,
//         avgOccupancyRate: `${overallAvgOccupancy}%`
//       },
//       data: reportData
//     });

//   } catch (error: any) {
//     console.error("Bed Occupancy Report API Error:", error);
//     return NextResponse.json(
//       { error: "Failed to generate bed occupancy report", details: error.message },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const range = searchParams.get('range') || 'monthly';
    const districtName = searchParams.get('districtName') || 'RANCHI';

    let startDateStr = '';
    let endDateStr = '';

    // 1. Calculate Date Boundaries
    if (range === 'daily') {
      const selectedDate = searchParams.get('fromDate') || new Date().toISOString().split('T')[0];
      startDateStr = selectedDate;
      endDateStr = selectedDate;
    } else if (range === 'monthly') {
      const year = searchParams.get('year') || new Date().getFullYear().toString();
      const month = searchParams.get('month') || (new Date().getMonth() + 1).toString();
      const paddedMonth = month.padStart(2, '0');
      
      const lastDay = new Date(Number(year), Number(month), 0).getDate();
      startDateStr = `${year}-${paddedMonth}-01`;
      endDateStr = `${year}-${paddedMonth}-${lastDay}`;
    } else if (range === 'quarterly') {
      const year = searchParams.get('year') || new Date().getFullYear().toString();
      const quarter = searchParams.get('quarter') || 'Q1';

      if (quarter === 'Q1') { startDateStr = `${year}-01-01`; endDateStr = `${year}-03-31`; }
      else if (quarter === 'Q2') { startDateStr = `${year}-04-01`; endDateStr = `${year}-06-30`; }
      else if (quarter === 'Q3') { startDateStr = `${year}-07-01`; endDateStr = `${year}-09-30`; }
      else if (quarter === 'Q4') { startDateStr = `${year}-10-01`; endDateStr = `${year}-12-31`; }
    }

    // 2. Get ALL MTC Centers in the logged-in district (Guarantees no MTC is left behind)
    const mtcSql = `
      SELECT mtc_id, mtc_name, mtc_code 
      FROM mtc_centers 
      WHERE UPPER(district) = $1
      ORDER BY mtc_name ASC
    `;
    const mtcRes = await query<{ mtc_id: number; mtc_name: string; mtc_code: string }>(
      mtcSql, 
      [districtName.toUpperCase()]
    );
    
    if (mtcRes.rows.length === 0) {
      return NextResponse.json({
        success: true,
        summary: { totalSanctionedBeds: 0, totalPatientDays: 0, avgOccupancyRate: "0.0%" },
        data: []
      });
    }

    const targetMtcCodes = mtcRes.rows.map(m => m.mtc_code);

    // 3. Query mtc_bed_occupancy for the active ones
    const sqlText = `
      SELECT 
        mtc_code,
        MAX(bed_sanctioned)::INT AS bed_sanctioned,
        SUM(utilized_bed)::INT AS total_utilized_beds,
        SUM(bed_sanctioned)::INT AS total_possible_bed_days,
        ROUND(AVG(bed_occupancy_percentage), 1)::FLOAT AS avg_occupancy_percentage
      FROM public.mtc_bed_occupancy
      WHERE record_date >= $1::DATE 
        AND record_date <= $2::DATE
        AND mtc_code = ANY($3::text[])
      GROUP BY mtc_code
    `;
    const reportRes = await query<any>(sqlText, [startDateStr, endDateStr, targetMtcCodes]);

    // Create a map of the returned occupancy data
    const occupancyMap = new Map();
    reportRes.rows.forEach(row => occupancyMap.set(row.mtc_code, row));

    // 4. Merge ALL MTCs with their occupancy data (Defaults to 0 if they have no records)
    let totalSanctionedBeds = 0;
    let totalPatientDays = 0;
    let sumOccupancyPct = 0;
    let activeMtcCount = 0;

    const reportData = mtcRes.rows.map((mtc) => {
      const occ = occupancyMap.get(mtc.mtc_code);
      
      const sanctionedBeds = occ?.bed_sanctioned || 0; 
      const availableBedDays = occ?.total_possible_bed_days || 0;
      const occupiedBedDays = occ?.total_utilized_beds || 0;
      const occupancyRate = occ?.avg_occupancy_percentage || 0;

      totalSanctionedBeds += Number(sanctionedBeds);
      totalPatientDays += Number(occupiedBedDays);
      
      // Only count towards average if they actually submitted data
      if (occ) {
        sumOccupancyPct += Number(occupancyRate);
        activeMtcCount++;
      }

      return {
        mtcName: mtc.mtc_name,
        mtcCode: mtc.mtc_code,
        sanctionedBeds: sanctionedBeds,
        availableBedDays: availableBedDays,
        occupiedBedDays: occupiedBedDays,
        occupancyRate: `${occupancyRate.toFixed(1)}%`
      };
    });

    // Calculate district-wide average occupancy
    const overallAvgOccupancy = activeMtcCount > 0 
      ? (sumOccupancyPct / activeMtcCount).toFixed(1) 
      : "0.0";

    return NextResponse.json({
      success: true,
      summary: {
        totalSanctionedBeds,
        totalPatientDays,
        avgOccupancyRate: `${overallAvgOccupancy}%`
      },
      data: reportData
    });

  } catch (error: any) {
    console.error("Bed Occupancy Report API Error:", error);
    return NextResponse.json(
      { error: "Failed to generate bed occupancy report", details: error.message },
      { status: 500 }
    );
  }
}