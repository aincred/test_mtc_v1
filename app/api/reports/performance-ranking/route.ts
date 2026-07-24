import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

interface MtcRow {
  id: number;
  name: string;
  mtc_code: string;
  district: string;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const requestType = searchParams.get('type');

    // 1. Dynamic Dropdown Options Route
    if (requestType === 'options') {
      const districtsRes = await query<{ district: string }>(
        `SELECT DISTINCT UPPER(district) AS district FROM mtc_centers WHERE district IS NOT NULL ORDER BY district ASC`
      );

      return NextResponse.json({
        success: true,
        districts: districtsRes.rows.map((d, i) => ({
          id: String(i + 1),
          name: d.district,
        })),
      });
    }

    // 2. Parse Date Boundaries from Financial Year and Quarter params
    let fromDate = searchParams.get('fromDate');
    let toDate = searchParams.get('toDate');
    const year = searchParams.get('year');
    const quarter = searchParams.get('quarter');
    const districtName = searchParams.get('districtName') || 'RANCHI';

    if (year && quarter) {
      const yr = Number(year);
      if (quarter === '1') {
        // Annual: April (yr) to March (yr + 1)
        fromDate = `${yr}-04-01`;
        toDate = `${yr + 1}-03-31`;
      } else if (quarter === '2') {
        // Q1: April to June
        fromDate = `${yr}-04-01`;
        toDate = `${yr}-06-30`;
      } else if (quarter === '3') {
        // Q2: July to September
        fromDate = `${yr}-07-01`;
        toDate = `${yr}-09-30`;
      } else if (quarter === '4') {
        // Q3: October to December
        fromDate = `${yr}-10-01`;
        toDate = `${yr}-12-31`;
      } else if (quarter === '5') {
        // Q4: January to March (yr + 1)
        fromDate = `${yr + 1}-01-01`;
        toDate = `${yr + 1}-03-31`;
      }
    }

    // Default Fallback
    if (!fromDate || !toDate) {
      const currentYear = new Date().getFullYear();
      fromDate = `${currentYear}-04-01`;
      toDate = `${currentYear + 1}-03-31`;
    }

    // 3. Fetch MTC centers
    let mtcSql = `
      SELECT 
        mtc_id AS id, 
        mtc_name AS name, 
        mtc_code, 
        district 
      FROM mtc_centers 
    `;
    const queryParams: any[] = [];

    if (districtName && districtName.toUpperCase() !== 'ALL') {
      mtcSql += ` WHERE UPPER(district) = $1`;
      queryParams.push(districtName.toUpperCase());
    }

    mtcSql += ` ORDER BY mtc_name ASC`;

    const mtcResult = await query<MtcRow>(mtcSql, queryParams);
    const mtcs = mtcResult.rows;

    if (mtcs.length === 0) {
      return NextResponse.json({
        success: true,
        total: 0,
        data: [],
      });
    }

    const mtcIds = mtcs.map((m) => m.id);
    const mtcCodes = mtcs.map((m) => m.mtc_code);

    // 4. Fetch Bed Occupancy percentages
    const occupancySql = `
      SELECT 
        mtc_code,
        ROUND(AVG(bed_occupancy_percentage), 2) AS avg_occupancy
      FROM mtc_bed_occupancy
      WHERE record_date >= $1::DATE AND record_date <= $2::DATE
        AND mtc_code = ANY($3::text[])
      GROUP BY mtc_code
    `;

    // 5. Fetch Discharge Exits & Cure Counts
    const childMasterSql = `
      SELECT 
        mtc_id,
        COUNT(CASE WHEN discharge_date >= $1::DATE AND discharge_date <= $2::DATE THEN 1 END) AS exits,
        COUNT(CASE WHEN outcome_indicator_id = 1 AND discharge_date >= $1::DATE AND discharge_date <= $2::DATE THEN 1 END) AS cured
      FROM mtc_child_master
      WHERE mtc_id = ANY($3::int[])
      GROUP BY mtc_id
    `;

    const [occupancyRes, childRes] = await Promise.all([
      query<{ mtc_code: string; avg_occupancy: number }>(occupancySql, [fromDate, toDate, mtcCodes]),
      query<{ mtc_id: number; exits: number; cured: number }>(childMasterSql, [fromDate, toDate, mtcIds]),
    ]);

    const occupancyMap = new Map(occupancyRes.rows.map((r) => [r.mtc_code, Number(r.avg_occupancy) || 0]));
    const childMap = new Map(childRes.rows.map((r) => [r.mtc_id, r]));

    // 6. Compute Scores & Sort
    const rankedMtcList = mtcs.map((m) => {
      const childData = childMap.get(m.id) || { exits: 0, cured: 0 };
      const bedOccupancy = occupancyMap.get(m.mtc_code) || 0;

      const exits = Number(childData.exits) || 0;
      const cured = Number(childData.cured) || 0;
      const cureRate = exits > 0 ? (cured / exits) * 100 : 0;

      // Composite Index Score = Average of Bed Occupancy Rate and Cure Rate
      const compositeScore = Number(((bedOccupancy + cureRate) / 2).toFixed(1));

      return {
        id: m.id,
        mtcCode: m.mtc_code,
        mtcName: m.name,
        district: m.district ? m.district.toUpperCase() : 'N/A',
        bedOccupancy,
        cureRate: Number(cureRate.toFixed(1)),
        compositeScore,
      };
    });

    rankedMtcList.sort((a, b) => b.compositeScore - a.compositeScore);

    const finalRankings = rankedMtcList.map((item, index) => ({
      rank: index + 1,
      ...item,
    }));

    return NextResponse.json({
      success: true,
      total: finalRankings.length,
      period: { fromDate, toDate },
      data: finalRankings,
    });
  } catch (error: any) {
    console.error("Ranking API error:", error);
    return NextResponse.json(
      { error: "Failed to generate rankings", details: error.message },
      { status: 500 }
    );
  }
}