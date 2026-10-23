// // import { NextResponse } from 'next/server';
// // import { query } from '@/lib/db';

// // export const dynamic = 'force-dynamic';

// // export async function GET(request: Request) {
// //   try {
// //     const { searchParams } = new URL(request.url);
// //     const range = searchParams.get('range')?.toLowerCase() || 'monthly';
// //     const districtName = searchParams.get('districtName') || 'RANCHI';

// //     let startDateStr = '';
// //     let endDateStr = '';

// //     // 1. Calculate Date Boundaries based on range selection
// //     if (range === 'daily') {
// //       const selectedDate = searchParams.get('fromDate') || new Date().toISOString().split('T')[0];
// //       startDateStr = selectedDate;
// //       endDateStr = selectedDate;
// //     } else if (range === 'monthly') {
// //       const year = searchParams.get('year') || new Date().getFullYear().toString();
// //       const month = searchParams.get('month') || (new Date().getMonth() + 1).toString();
// //       const paddedMonth = month.padStart(2, '0');
      
// //       const lastDay = new Date(Number(year), Number(month), 0).getDate();
// //       const paddedLastDay = String(lastDay).padStart(2, '0');
// //       startDateStr = `${year}-${paddedMonth}-01`;
// //       endDateStr = `${year}-${paddedMonth}-${paddedLastDay}`;
// //     } else if (range === 'quarterly') {
// //       const year = searchParams.get('year') || new Date().getFullYear().toString();
// //       const quarter = searchParams.get('quarter') || 'Q1';

// //       if (quarter === 'Q1') { startDateStr = `${year}-01-01`; endDateStr = `${year}-03-31`; }
// //       else if (quarter === 'Q2') { startDateStr = `${year}-04-01`; endDateStr = `${year}-06-30`; }
// //       else if (quarter === 'Q3') { startDateStr = `${year}-07-01`; endDateStr = `${year}-09-30`; }
// //       else if (quarter === 'Q4') { startDateStr = `${year}-10-01`; endDateStr = `${year}-12-31`; }
// //     }

// //     // 2. Retrieve all MTC centers within the given district
// //     const mtcSql = `
// //       SELECT mtc_id, mtc_name, mtc_code 
// //       FROM mtc_centers 
// //       WHERE UPPER(district) = $1
// //       ORDER BY mtc_name ASC
// //     `;
// //     const mtcRes = await query<{ mtc_id: number; mtc_name: string; mtc_code: string }>(
// //       mtcSql, 
// //       [districtName.toUpperCase()]
// //     );
    
// //     if (mtcRes.rows.length === 0) {
// //       return NextResponse.json({
// //         success: true,
// //         summary: { totalSanctionedBeds: 0, totalPatientDays: 0, avgOccupancyRate: "0.0%" },
// //         data: []
// //       });
// //     }

// //     const targetMtcCodes = mtcRes.rows.map(m => m.mtc_code);

// //     // 3. Query bed occupancy metrics for active centers
// //     const sqlText = `
// //       SELECT 
// //         mtc_code,
// //         MAX(bed_sanctioned)::INT AS bed_sanctioned,
// //         SUM(utilized_bed)::INT AS total_utilized_beds,
// //         SUM(bed_sanctioned)::INT AS total_possible_bed_days,
// //         ROUND(AVG(bed_occupancy_percentage), 1)::FLOAT AS avg_occupancy_percentage
// //       FROM public.mtc_bed_occupancy
// //       WHERE record_date >= $1::DATE 
// //         AND record_date <= $2::DATE
// //         AND mtc_code = ANY($3::text[])
// //       GROUP BY mtc_code
// //     `;
// //     const reportRes = await query<any>(sqlText, [startDateStr, endDateStr, targetMtcCodes]);

// //     // Index occupancy data by mtc_code
// //     const occupancyMap = new Map();
// //     reportRes.rows.forEach(row => occupancyMap.set(row.mtc_code, row));

// //     // 4. Merge all district MTCs with occupancy statistics
// //     let totalSanctionedBeds = 0;
// //     let totalPatientDays = 0;
// //     let sumOccupancyPct = 0;
// //     let activeMtcCount = 0;

// //     const reportData = mtcRes.rows.map((mtc) => {
// //       const occ = occupancyMap.get(mtc.mtc_code);
      
// //       const sanctionedBeds = occ?.bed_sanctioned || 0; 
// //       const availableBedDays = occ?.total_possible_bed_days || 0;
// //       const occupiedBedDays = occ?.total_utilized_beds || 0;
// //       const occupancyRate = occ?.avg_occupancy_percentage || 0;

// //       totalSanctionedBeds += Number(sanctionedBeds);
// //       totalPatientDays += Number(occupiedBedDays);
      
// //       if (occ) {
// //         sumOccupancyPct += Number(occupancyRate);
// //         activeMtcCount++;
// //       }

// //       return {
// //         mtcName: mtc.mtc_name,
// //         mtcCode: mtc.mtc_code,
// //         sanctionedBeds: Number(sanctionedBeds),
// //         availableBedDays: Number(availableBedDays),
// //         occupiedBedDays: Number(occupiedBedDays),
// //         occupancyRate: `${Number(occupancyRate).toFixed(1)}%`
// //       };
// //     });

// //     const overallAvgOccupancy = activeMtcCount > 0 
// //       ? (sumOccupancyPct / activeMtcCount).toFixed(1) 
// //       : "0.0";

// //     return NextResponse.json({
// //       success: true,
// //       summary: {
// //         totalSanctionedBeds,
// //         totalPatientDays,
// //         avgOccupancyRate: `${overallAvgOccupancy}%`
// //       },
// //       data: reportData
// //     });

// //   } catch (error: any) {
// //     console.error("Bed Occupancy Report API Error:", error);
// //     return NextResponse.json(
// //       { error: "Failed to generate bed occupancy report", details: error.message },
// //       { status: 500 }
// //     );
// //   }
// // }

// import { NextResponse } from 'next/server';
// import { query } from '@/lib/db';

// export const dynamic = 'force-dynamic';

// export async function GET(request: Request) {
//   try {
//     const { searchParams } = new URL(request.url);

//     // Endpoint extension: Return distinct list of districts for the UI dropdown
//     if (searchParams.get('getDistricts') === 'true') {
//       const districtsSql = `
//         SELECT DISTINCT UPPER(district) as district_name 
//         FROM mtc_centers 
//         WHERE district IS NOT NULL AND district != ''
//         ORDER BY district_name ASC
//       `;
//       const districtsRes = await query<{ district_name: string }>(districtsSql, []);
//       return NextResponse.json({
//         success: true,
//         districts: districtsRes.rows.map((r) => r.district_name),
//       });
//     }

//     const range = searchParams.get('range')?.toLowerCase() || 'monthly';
//     const districtName = searchParams.get('districtName') || 'RANCHI';

//     let startDateStr = '';
//     let endDateStr = '';

//     // 1. Calculate Date Boundaries
//     if (range === 'daily') {
//       const selectedDate = searchParams.get('fromDate') || new Date().toISOString().split('T')[0];
//       startDateStr = selectedDate;
//       endDateStr = selectedDate;
//     } else if (range === 'monthly') {
//       const year = searchParams.get('year') || new Date().getFullYear().toString();
//       const month = searchParams.get('month') || (new Date().getMonth() + 1).toString();
//       const paddedMonth = month.padStart(2, '0');
      
//       const lastDay = new Date(Number(year), Number(month), 0).getDate();
//       const paddedLastDay = String(lastDay).padStart(2, '0');
//       startDateStr = `${year}-${paddedMonth}-01`;
//       endDateStr = `${year}-${paddedMonth}-${paddedLastDay}`;
//     } else if (range === 'quarterly') {
//       const year = searchParams.get('year') || new Date().getFullYear().toString();
//       const quarter = searchParams.get('quarter') || 'Q1';

//       if (quarter === 'Q1') { startDateStr = `${year}-01-01`; endDateStr = `${year}-03-31`; }
//       else if (quarter === 'Q2') { startDateStr = `${year}-04-01`; endDateStr = `${year}-06-30`; }
//       else if (quarter === 'Q3') { startDateStr = `${year}-07-01`; endDateStr = `${year}-09-30`; }
//       else if (quarter === 'Q4') { startDateStr = `${year}-10-01`; endDateStr = `${year}-12-31`; }
//     }

//     // 2. Fetch all MTC centers for the selected district
//     const mtcSql = `
//       SELECT mtc_id, mtc_name, mtc_code, block, capacity 
//       FROM mtc_centers 
//       WHERE UPPER(district) = $1
//       ORDER BY mtc_name ASC
//     `;
//     const mtcRes = await query<{ 
//       mtc_id: number; 
//       mtc_name: string; 
//       mtc_code: string; 
//       block?: string; 
//       capacity?: number;
//     }>(mtcSql, [districtName.toUpperCase()]);
    
//     if (mtcRes.rows.length === 0) {
//       return NextResponse.json({
//         success: true,
//         district: districtName.toUpperCase(),
//         summary: { 
//           totalMtcCenters: 0, 
//           totalSanctionedBeds: 0, 
//           totalPatientDays: 0, 
//           avgOccupancyRate: "0.0%" 
//         },
//         data: []
//       });
//     }

//     const targetMtcCodes = mtcRes.rows.map(m => m.mtc_code);

//     // 3. Query bed occupancy metrics
//     const sqlText = `
//       SELECT 
//         mtc_code,
//         MAX(bed_sanctioned)::INT AS bed_sanctioned,
//         SUM(utilized_bed)::INT AS total_utilized_beds,
//         SUM(bed_sanctioned)::INT AS total_possible_bed_days,
//         ROUND(AVG(bed_occupancy_percentage), 1)::FLOAT AS avg_occupancy_percentage
//       FROM public.mtc_bed_occupancy
//       WHERE record_date >= $1::DATE 
//         AND record_date <= $2::DATE
//         AND mtc_code = ANY($3::text[])
//       GROUP BY mtc_code
//     `;
//     const reportRes = await query<any>(sqlText, [startDateStr, endDateStr, targetMtcCodes]);

//     const occupancyMap = new Map();
//     reportRes.rows.forEach(row => occupancyMap.set(row.mtc_code, row));

//     // 4. Combine data and calculate district metrics
//     let totalSanctionedBeds = 0;
//     let totalPatientDays = 0;
//     let sumOccupancyPct = 0;
//     let activeMtcCount = 0;

//     const reportData = mtcRes.rows.map((mtc) => {
//       const occ = occupancyMap.get(mtc.mtc_code);
      
//       const sanctionedBeds = occ?.bed_sanctioned || mtc.capacity || 0; 
//       const availableBedDays = occ?.total_possible_bed_days || 0;
//       const occupiedBedDays = occ?.total_utilized_beds || 0;
//       const occupancyRate = occ?.avg_occupancy_percentage || 0;

//       totalSanctionedBeds += Number(sanctionedBeds);
//       totalPatientDays += Number(occupiedBedDays);
      
//       if (occ) {
//         sumOccupancyPct += Number(occupancyRate);
//         activeMtcCount++;
//       }

//       return {
//         mtcName: mtc.mtc_name,
//         mtcCode: mtc.mtc_code,
//         block: mtc.block || 'N/A',
//         sanctionedBeds: Number(sanctionedBeds),
//         availableBedDays: Number(availableBedDays),
//         occupiedBedDays: Number(occupiedBedDays),
//         occupancyRate: `${Number(occupancyRate).toFixed(1)}%`
//       };
//     });

//     const overallAvgOccupancy = activeMtcCount > 0 
//       ? (sumOccupancyPct / activeMtcCount).toFixed(1) 
//       : "0.0";

//     return NextResponse.json({
//       success: true,
//       district: districtName.toUpperCase(),
//       dateRange: { startDate: startDateStr, endDate: endDateStr },
//       summary: {
//         totalMtcCenters: mtcRes.rows.length,
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


// app\api\mtc-state-report\bed-occupancy-district
import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") || "Monthly";

    let startDateStr = "";
    let endDateStr = "";

    // 1. Calculate Date Boundaries
    if (type === "Daily") {
      const selectedDate = searchParams.get("fromDate") || new Date().toISOString().split("T")[0];
      startDateStr = selectedDate;
      endDateStr = selectedDate;
    } else if (type === "Monthly") {
      const year = searchParams.get("year") || new Date().getFullYear().toString();
      const month = searchParams.get("month") || (new Date().getMonth() + 1).toString();
      const paddedMonth = month.padStart(2, "0");

      const lastDay = new Date(Number(year), Number(month), 0).getDate();
      startDateStr = `${year}-${paddedMonth}-01`;
      endDateStr = `${year}-${paddedMonth}-${lastDay}`;
    } else if (type === "Quarterly") {
      const year = searchParams.get("year") || new Date().getFullYear().toString();
      const quarter = searchParams.get("quarter") || "Q1";

      if (quarter === "Q1") { startDateStr = `${year}-01-01`; endDateStr = `${year}-03-31`; }
      else if (quarter === "Q2") { startDateStr = `${year}-04-01`; endDateStr = `${year}-06-30`; }
      else if (quarter === "Q3") { startDateStr = `${year}-07-01`; endDateStr = `${year}-09-30`; }
      else if (quarter === "Q4") { startDateStr = `${year}-10-01`; endDateStr = `${year}-12-31`; }
    }

    // 2. Fetch all districts to ensure none are missing
    const districtRes = await query<{ district_id: number; district_name: string }>(
      `SELECT district_id, district_name FROM public.mtc_district ORDER BY district_name ASC`
    );

    if (districtRes.rows.length === 0) {
      return NextResponse.json({
        success: true,
        data: [],
      });
    }

    // 3. Query aggregated bed occupancy grouped by district
    const sqlText = `
      SELECT 
        UPPER(c.district) AS district_name,
        SUM(b.bed_sanctioned)::INT AS total_available_beds,
        SUM(b.utilized_bed)::INT AS beds_occupied
      FROM public.mtc_bed_occupancy b
      INNER JOIN public.mtc_centers c ON b.mtc_code = c.mtc_code
      WHERE b.record_date >= $1::DATE 
        AND b.record_date <= $2::DATE
      GROUP BY UPPER(c.district)
    `;

    const reportRes = await query<{
      district_name: string;
      total_available_beds: number;
      beds_occupied: number;
    }>(sqlText, [startDateStr, endDateStr]);

    // Map query results by district name (uppercase)
    const occupancyMap = new Map();
    reportRes.rows.forEach((row) => occupancyMap.set(row.district_name.toUpperCase(), row));

    // 4. Merge all districts with occupancy records
    const reportData = districtRes.rows.map((dist) => {
      const occ = occupancyMap.get(dist.district_name.toUpperCase());

      const available = Number(occ?.total_available_beds || 0);
      const occupied = Number(occ?.beds_occupied || 0);
      const occupancyRate = available > 0 ? Number(((occupied / available) * 100).toFixed(2)) : 0;

      return {
        id: dist.district_id.toString(),
        districtName: dist.district_name,
        totalAvailableBeds: available,
        bedsOccupied: occupied,
        occupancyRate: occupancyRate,
      };
    });

    return NextResponse.json({
      success: true,
      data: reportData,
    });
  } catch (error: any) {
    console.error("State Bed Occupancy Report API Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to generate district bed occupancy report", details: error.message },
      { status: 500 }
    );
  }
}