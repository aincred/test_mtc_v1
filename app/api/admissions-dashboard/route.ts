import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fromDate, toDate, mtcIds } = body;

    if (!fromDate || !toDate || !mtcIds || mtcIds.length === 0) {
      return NextResponse.json({ success: false, error: "Missing required parameters" }, { status: 400 });
    }

    // Convert array of strings/numbers to a format suitable for the IN clause
    const placeholders = mtcIds.map((_: any, i: number) => `$${i + 3}`).join(',');
    const queryParams = [fromDate, toDate, ...mtcIds];

    const baseWhere = `
      a.admission_date >= $1 
      AND a.admission_date <= $2 
      AND m.mtc_id IN (${placeholders})
    `;

    // 1. Top Level KPIs
    const kpiQuery = `
      SELECT 
        COUNT(a.registration_id) AS total_admissions,
        COUNT(CASE WHEN a.admission_type_id = 1 THEN 1 END) AS new_cases,
        COUNT(CASE WHEN a.admission_type_id = 2 THEN 1 END) AS re_admissions,
        COUNT(CASE WHEN a.admission_type_id = 3 THEN 1 END) AS relapses
      FROM public.YOUR_ACTUAL_TABLE_NAME a -- ⚠️ REPLACE WITH YOUR REAL TABLE NAME
      INNER JOIN public.mtc_centers m ON a.mtc_id = m.mtc_id
      WHERE ${baseWhere}
    `;

    // 2. Gender Distribution (assuming 1=Male, 2=Female, 3=Transgender)
    const genderQuery = `
      SELECT 
        COUNT(CASE WHEN a.sex_id = 2 THEN 1 END) AS female,
        COUNT(CASE WHEN a.sex_id = 1 THEN 1 END) AS male,
        COUNT(CASE WHEN a.sex_id = 3 THEN 1 END) AS transgender
      FROM public.YOUR_ACTUAL_TABLE_NAME a -- ⚠️ REPLACE WITH YOUR REAL TABLE NAME
      INNER JOIN public.mtc_centers m ON a.mtc_id = m.mtc_id
      WHERE ${baseWhere}
    `;

    // 3. Age Group Profile
    const ageQuery = `
      SELECT 
        COUNT(CASE WHEN a.age_months BETWEEN 0 AND 6 THEN 1 END) AS "zero_to_six",
        COUNT(CASE WHEN a.age_months > 6 AND a.age_months <= 24 THEN 1 END) AS "six_to_twentyfour",
        COUNT(CASE WHEN a.age_months > 24 AND a.age_months <= 36 THEN 1 END) AS "twentyfour_to_thirtysix",
        COUNT(CASE WHEN a.age_months > 36 THEN 1 END) AS "above_thirtysix"
      FROM public.YOUR_ACTUAL_TABLE_NAME a -- ⚠️ REPLACE WITH YOUR REAL TABLE NAME
      INNER JOIN public.mtc_centers m ON a.mtc_id = m.mtc_id
      WHERE ${baseWhere}
    `;

    // Run all queries concurrently
    const [kpiResult, genderResult, ageResult] = await Promise.all([
      query(kpiQuery, queryParams),
      query(genderQuery, queryParams),
      query(ageQuery, queryParams)
    ]);

    return NextResponse.json({
      success: true,
      data: {
        kpis: kpiResult.rows[0],
        gender: genderResult.rows[0],
        ageGroups: ageResult.rows[0]
      }
    });

  } catch (error) {
    console.error("Dashboard calculation error:", error);
    return NextResponse.json({ success: false, error: "Failed to calculate dashboard data" }, { status: 500 });
  }
}