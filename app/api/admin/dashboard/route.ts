import { NextResponse } from "next/server";
// Replace this with your actual database client (e.g., db from "@/lib/db", prisma, or pool)
import { query } from "@/lib/db"; 

export async function GET() {
  try {
    // 1. Fetch KPI metrics
    const statsResult = await query(`
      SELECT
        (SELECT COUNT(*) FROM admissions WHERE status = 'admitted') AS active_cases,
        (SELECT COUNT(*) FROM mtc_centers WHERE is_active = true) AS total_centers,
        (SELECT ROUND(AVG(occupancy_rate)::numeric, 1) FROM mtc_centers) AS avg_occupancy,
        (SELECT COUNT(*) FROM follow_ups WHERE due_date = CURRENT_DATE AND status = 'pending') AS pending_followups
    `);

    // 2. Fetch recent admissions
    const admissionsResult = await query(`
      SELECT 
        a.id,
        a.child_name AS "childName",
        a.caregiver_name AS "caregiverName",
        m.name AS "centerName",
        m.district,
        TO_CHAR(a.admission_date, 'Mon DD, YYYY') AS "admissionDate",
        a.sam_status AS "samStatus",
        a.status
      FROM admissions a
      JOIN mtc_centers m ON a.mtc_center_id = m.id
      ORDER BY a.admission_date DESC
      LIMIT 6
    `);

    // 3. Fetch cluster/district occupancy progress
    const districtProgress = await query(`
      SELECT 
        district,
        COUNT(*) AS total_beds,
        SUM(CASE WHEN status = 'admitted' THEN 1 ELSE 0 END) AS occupied_beds
      FROM admissions
      GROUP BY district
      LIMIT 4
    `);

    return NextResponse.json({
      stats: statsResult.rows[0],
      admissions: admissionsResult.rows,
      districts: districtProgress.rows,
    });
  } catch (error) {
    console.error("Dashboard API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
}