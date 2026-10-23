import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") || "Monthly";
    const selectedDistrict = searchParams.get("district") || "";

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

    // 2. Fetch master MTC records from public.mtc_bed_capacity
    let mtcMasterSql = `
      SELECT 
        id, 
        district, 
        mtc_name, 
        number_of_beds 
      FROM public.mtc_bed_capacity
    `;
    const queryParams: any[] = [];

    if (selectedDistrict) {
      mtcMasterSql += ` WHERE UPPER(district) = UPPER($1)`;
      queryParams.push(selectedDistrict);
    }

    mtcMasterSql += ` ORDER BY district ASC, mtc_name ASC`;

    const mtcMasterRes = await query<{
      id: number;
      district: string;
      mtc_name: string;
      number_of_beds: number;
    }>(mtcMasterSql, queryParams);

    if (mtcMasterRes.rows.length === 0) {
      return NextResponse.json({
        success: true,
        data: [],
      });
    }

    // 3. Query aggregated bed occupancy from public.mtc_bed_occupancy
    const occSql = `
      SELECT 
        UPPER(c.district) AS district_name,
        UPPER(c.mtc_name) AS mtc_name,
        SUM(b.bed_sanctioned)::INT AS total_available_beds,
        SUM(b.utilized_bed)::INT AS beds_occupied
      FROM public.mtc_bed_occupancy b
      INNER JOIN public.mtc_centers c ON b.mtc_code = c.mtc_code
      WHERE b.record_date >= $1::DATE 
        AND b.record_date <= $2::DATE
      GROUP BY UPPER(c.district), UPPER(c.mtc_name)
    `;

    const reportRes = await query<{
      district_name: string;
      mtc_name: string;
      total_available_beds: number;
      beds_occupied: number;
    }>(occSql, [startDateStr, endDateStr]);

    // Map occupancy by key: "DISTRICT_MTC"
    const occupancyMap = new Map<string, { total_available_beds: number; beds_occupied: number }>();
    reportRes.rows.forEach((row) => {
      const key = `${row.district_name.trim().toUpperCase()}_${row.mtc_name.trim().toUpperCase()}`;
      occupancyMap.set(key, {
        total_available_beds: row.total_available_beds,
        beds_occupied: row.beds_occupied,
      });
    });

    // 4. Merge master capacity data with actual occupancy
    const reportData = mtcMasterRes.rows.map((mtc) => {
      const key = `${mtc.district.trim().toUpperCase()}_${mtc.mtc_name.trim().toUpperCase()}`;
      const occ = occupancyMap.get(key);

      const available = occ?.total_available_beds && occ.total_available_beds > 0
        ? Number(occ.total_available_beds)
        : Number(mtc.number_of_beds || 0);

      const occupied = Number(occ?.beds_occupied || 0);
      const occupancyRate = available > 0 ? Number(((occupied / available) * 100).toFixed(2)) : 0;

      return {
        id: mtc.id.toString(),
        districtName: mtc.district,
        mtcName: mtc.mtc_name,
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
    console.error("MTC Bed Occupancy Report API Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to generate MTC bed occupancy report", details: error.message },
      { status: 500 }
    );
  }
}