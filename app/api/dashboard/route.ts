// // // // // // import { NextResponse } from 'next/server';
// // // // // // import { query } from '@/lib/db';

// // // // // // export async function GET(request: Request) {
// // // // // //   try {
// // // // // //     const { searchParams } = new URL(request.url);
// // // // // //     const fromDate = searchParams.get('from');
// // // // // //     const toDate = searchParams.get('to');
    
// // // // // //     // Get the district name from query params, fall back to 'RANCHI' if none provided
// // // // // //     const districtName = searchParams.get('districtName') || 'RANCHI';

// // // // // //     // 1. Fetch MTC facilities using the EXACT column names from your database schema
// // // // // //     const mtcSql = `
// // // // // //       SELECT 
// // // // // //         mtc_id AS id,
// // // // // //         mtc_name AS name,
// // // // // //         mtc_code
// // // // // //       FROM mtc_centers 
// // // // // //       WHERE UPPER(district) = $1
// // // // // //       ORDER BY mtc_name ASC
// // // // // //     `;
    
// // // // // //     const mtcResult = await query(mtcSql, [districtName.toUpperCase()]);
    
// // // // // //     // Map the database rows to include fallback values for fields not present in this table
// // // // // //     const locations = mtcResult.rows.map((row: any) => ({
// // // // // //       id: row.id,
// // // // // //       name: row.name,
// // // // // //       // Fallback values since 'mo_name', 'contact_no', and 'bed_capacity' aren't in mtc_centers
// // // // // //       mo: "Dr. Assigned MO", 
// // // // // //       contact: "+91 XXXXX XXXXX", 
// // // // // //       beds: 10 // Used to calculate the total beds KPI on your frontend
// // // // // //     }));

// // // // // //     /**
// // // // // //      * 2. Aggregations & Analytical Data (KPIs and Charts)
// // // // // //      */
// // // // // //     const kpi = {
// // // // // //       TotalAdmissions: 142,
// // // // // //       TotalExits: 110,
// // // // // //       TotalCured: 88,
// // // // // //       TotalDefaulters: 18,
// // // // // //       TotalDeaths: 4,
// // // // // //       AvgWeightGain: 7.8,
// // // // // //       AvgStay: 14.2,
// // // // // //     };

// // // // // //     const genderData = [
// // // // // //       { name: 'Male', value: 78 }, 
// // // // // //       { name: 'Female', value: 64 }
// // // // // //     ];

// // // // // //     const ageData = [
// // // // // //       { name: '0-6 Months', value: 18 }, 
// // // // // //       { name: '6M - 2 Years', value: 84 }, 
// // // // // //       { name: '2 - 5 Years', value: 40 }
// // // // // //     ];

// // // // // //     const complicationData = [
// // // // // //       { name: 'Complicated', value: 52 }, 
// // // // // //       { name: 'Non-Complicated', value: 90 }
// // // // // //     ];

// // // // // //     const referralData = [
// // // // // //       { name: 'Asha', value: 62 }, 
// // // // // //       { name: 'Self / Parent', value: 28 }, 
// // // // // //       { name: 'AWW (Anganwadi)', value: 52 }
// // // // // //     ];

// // // // // //     const casteData = [
// // // // // //       { name: 'ST', value: 68 }, 
// // // // // //       { name: 'SC', value: 34 }, 
// // // // // //       { name: 'OBC', value: 28 }, 
// // // // // //       { name: 'General', value: 12 }
// // // // // //     ];

// // // // // //     const outcomeData = [
// // // // // //       { name: 'Cured', value: 88 }, 
// // // // // //       { name: 'Defaulter', value: 18 }, 
// // // // // //       { name: 'Death', value: 4 }, 
// // // // // //       { name: 'Non-Responder', value: 0 }
// // // // // //     ];

// // // // // //     // Send the structured data package to the frontend
// // // // // //     return NextResponse.json({ 
// // // // // //       success: true,
// // // // // //       districtName: districtName.toUpperCase(),
// // // // // //       locations: locations, 
// // // // // //       kpi: kpi,
// // // // // //       gender: genderData,
// // // // // //       age: ageData,
// // // // // //       complications: complicationData,
// // // // // //       referral: referralData,
// // // // // //       caste: casteData,
// // // // // //       outcome: outcomeData
// // // // // //     });
    
// // // // // //   } catch (error: any) {
// // // // // //     console.error("Dashboard backend query error:", error.message);
// // // // // //     return NextResponse.json(
// // // // // //       { error: 'Database operations failed', details: error.message }, 
// // // // // //       { status: 500 }
// // // // // //     );
// // // // // //   }
// // // // // // }

// // // // // import { NextResponse } from 'next/server';
// // // // // import { query } from '@/lib/db';

// // // // // export async function GET(request: Request) {
// // // // //   try {
// // // // //     const { searchParams } = new URL(request.url);
// // // // //     const fromDate = searchParams.get('from');
// // // // //     const toDate = searchParams.get('to');
    
// // // // //     // Get the district name from query params, fall back to 'RANCHI' if none provided
// // // // //     const districtName = searchParams.get('districtName') || 'RANCHI';

// // // // //     // 1. Fetch MTC facilities and LEFT JOIN with the mtc_bed_capacity table
// // // // //     const mtcSql = `
// // // // //       SELECT 
// // // // //         c.mtc_id AS id,
// // // // //         c.mtc_name AS name,
// // // // //         c.mtc_code,
// // // // //         COALESCE(b.number_of_beds, 0) AS beds
// // // // //       FROM mtc_centers c
// // // // //       LEFT JOIN mtc_bed_capacity b 
// // // // //         ON UPPER(c.mtc_name) = UPPER(b.mtc_name) 
// // // // //         AND UPPER(c.district) = UPPER(b.district)
// // // // //       WHERE UPPER(c.district) = $1
// // // // //       ORDER BY c.mtc_name ASC
// // // // //     `;
    
// // // // //     const mtcResult = await query(mtcSql, [districtName.toUpperCase()]);
    
// // // // //     // Map the combined rows while keeping simple fallbacks for properties like MO/Contact 
// // // // //     // until those tables are also mapped in your project
// // // // //     const locations = mtcResult.rows.map((row: any) => ({
// // // // //       id: row.id,
// // // // //       name: row.name,
// // // // //       beds: Number(row.beds), // Real database value from mtc_bed_capacity table
// // // // //       mo: "Dr. Assigned MO", 
// // // // //       contact: "+91 XXXXX XXXXX"
// // // // //     }));

// // // // //     /**
// // // // //      * 2. Aggregations & Analytical Data (KPIs and Charts)
// // // // //      */
// // // // //     const kpi = {
// // // // //       TotalAdmissions: 142,
// // // // //       TotalExits: 110,
// // // // //       TotalCured: 88,
// // // // //       TotalDefaulters: 18,
// // // // //       TotalDeaths: 4,
// // // // //       AvgWeightGain: 7.8,
// // // // //       AvgStay: 14.2,
// // // // //     };

// // // // //     const genderData = [
// // // // //       { name: 'Male', value: 78 }, 
// // // // //       { name: 'Female', value: 64 }
// // // // //     ];

// // // // //     const ageData = [
// // // // //       { name: '0-6 Months', value: 18 }, 
// // // // //       { name: '6M - 2 Years', value: 84 }, 
// // // // //       { name: '2 - 5 Years', value: 40 }
// // // // //     ];

// // // // //     const complicationData = [
// // // // //       { name: 'Complicated', value: 52 }, 
// // // // //       { name: 'Non-Complicated', value: 90 }
// // // // //     ];

// // // // //     const referralData = [
// // // // //       { name: 'Asha', value: 62 }, 
// // // // //       { name: 'Self / Parent', value: 28 }, 
// // // // //       { name: 'AWW (Anganwadi)', value: 52 }
// // // // //     ];

// // // // //     const casteData = [
// // // // //       { name: 'ST', value: 68 }, 
// // // // //       { name: 'SC', value: 34 }, 
// // // // //       { name: 'OBC', value: 28 }, 
// // // // //       { name: 'General', value: 12 }
// // // // //     ];

// // // // //     const outcomeData = [
// // // // //       { name: 'Cured', value: 88 }, 
// // // // //       { name: 'Defaulter', value: 18 }, 
// // // // //       { name: 'Death', value: 4 }, 
// // // // //       { name: 'Non-Responder', value: 0 }
// // // // //     ];

// // // // //     // Send the structured data package to the frontend
// // // // //     return NextResponse.json({ 
// // // // //       success: true,
// // // // //       districtName: districtName.toUpperCase(),
// // // // //       locations: locations, 
// // // // //       kpi: kpi,
// // // // //       gender: genderData,
// // // // //       age: ageData,
// // // // //       complications: complicationData,
// // // // //       referral: referralData,
// // // // //       caste: casteData,
// // // // //       outcome: outcomeData
// // // // //     });
    
// // // // //   } catch (error: any) {
// // // // //     console.error("Dashboard backend query error:", error.message);
// // // // //     return NextResponse.json(
// // // // //       { error: 'Database operations failed', details: error.message }, 
// // // // //       { status: 500 }
// // // // //     );
// // // // //   }
// // // // // }

// // // // import { NextResponse } from 'next/server';
// // // // import { query } from '@/lib/db';

// // // // export async function GET(request: Request) {
// // // //   try {
// // // //     const { searchParams } = new URL(request.url);
// // // //     const fromDate = searchParams.get('from');
// // // //     const toDate = searchParams.get('to');
// // // //     const districtName = searchParams.get('districtName') || 'RANCHI';

// // // //     // 1. Fetch MTC facilities for this district and join with bed capacity
// // // //     const mtcSql = `
// // // //       SELECT 
// // // //         c.mtc_id AS id,
// // // //         c.mtc_name AS name,
// // // //         c.mtc_code,
// // // //         COALESCE(b.number_of_beds, 0) AS beds
// // // //       FROM mtc_centers c
// // // //       LEFT JOIN mtc_bed_capacity b 
// // // //         ON UPPER(c.mtc_name) = UPPER(b.mtc_name) 
// // // //         AND UPPER(c.district) = UPPER(b.district)
// // // //       WHERE UPPER(c.district) = $1
// // // //       ORDER BY c.mtc_name ASC
// // // //     `;
    
// // // //     const mtcResult = await query(mtcSql, [districtName.toUpperCase()]);
// // // //     const locations = mtcResult.rows.map((row: any) => ({
// // // //       id: row.id,
// // // //       name: row.name,
// // // //       beds: Number(row.beds),
// // // //       mo: "Dr. Assigned MO", 
// // // //       contact: "+91 XXXXX XXXXX"
// // // //     }));

// // // //     const districtMtcIds = mtcResult.rows.map((row: any) => row.id);

// // // //     // Hard fallback if no centers exist in the selected district
// // // //     if (districtMtcIds.length === 0) {
// // // //       return NextResponse.json({ 
// // // //         success: true, districtName: districtName.toUpperCase(), locations: [],
// // // //         kpi: { TotalAdmissions: 0, TotalExits: 0, TotalCured: 0, TotalDefaulters: 0, TotalDeaths: 0, AvgWeightGain: 0, BedOccupancyRate: "0.00", AvgStay: 0 },
// // // //         gender: [], age: [], complications: [], referral: [], caste: [], outcome: []
// // // //       });
// // // //     }

// // // //     const totalBeds = mtcResult.rows.reduce((sum: number, row: any) => sum + (Number(row.beds) || 0), 0);

// // // //     // 2. Main KPI Aggregations and Simple Chart Breakdowns
// // // //     const metricsSql = `
// // // //       SELECT
// // // //         COUNT(CASE WHEN m.admission_date BETWEEN $1 AND $2 THEN 1 END) AS total_admissions,
// // // //         COUNT(CASE WHEN m.discharge_date BETWEEN $1 AND $2 THEN 1 END) AS total_exits,
// // // //         COUNT(CASE WHEN m.outcome_indicator_id = 1 AND m.discharge_date BETWEEN $1 AND $2 THEN 1 END) AS total_cured,
// // // //         COUNT(CASE WHEN m.outcome_indicator_id = 2 AND m.discharge_date BETWEEN $1 AND $2 THEN 1 END) AS total_defaulters,
// // // //         COUNT(CASE WHEN m.outcome_indicator_id = 3 AND m.discharge_date BETWEEN $1 AND $2 THEN 1 END) AS total_deaths,
        
// // // //         -- Average stay duration calculated from total_stay_days
// // // //         ROUND(AVG(CASE WHEN m.discharge_date BETWEEN $1 AND $2 THEN m.total_stay_days END), 1) AS avg_stay,
        
// // // //         -- Average weight gain calculations matching clinical standards
// // // //         ROUND(AVG(CASE WHEN m.outcome_indicator_id = 1 AND m.discharge_date BETWEEN $1 AND $2 AND m.total_stay_days > 0 AND m.admission_weight_kg > 0
// // // //           THEN ((m.discharge_weight_kg - m.admission_weight_kg) * 1000) / (m.admission_weight_kg * m.total_stay_days) END), 2) AS avg_weight_gain,

// // // //         -- Chart Aggregations: Dynamic Age Group breakdowns using age_years & age_months
// // // //         COUNT(CASE WHEN m.admission_date BETWEEN $1 AND $2 AND (m.age_years = 0 AND m.age_months <= 6) THEN 1 END) AS age_0_6m,
// // // //         COUNT(CASE WHEN m.admission_date BETWEEN $1 AND $2 AND ((m.age_years = 0 AND m.age_months > 6) OR m.age_years = 1 OR (m.age_years = 2 AND m.age_months = 0)) THEN 1 END) AS age_6m_2y,
// // // //         COUNT(CASE WHEN m.admission_date BETWEEN $1 AND $2 AND ((m.age_years = 2 AND m.age_months > 0) OR m.age_years BETWEEN 3 AND 5) THEN 1 END) AS age_2y_5y,

// // // //         -- Chart Aggregations: Dynamic medical complications parsing via array search
// // // //         COUNT(CASE WHEN m.admission_date BETWEEN $1 AND $2 AND m.medical_complications @> ARRAY['NO COMPLICATION']::text[] THEN 1 END) AS non_complicated_count,
// // // //         COUNT(CASE WHEN m.admission_date BETWEEN $1 AND $2 AND NOT (m.medical_complications @> ARRAY['NO COMPLICATION']::text[]) THEN 1 END) AS complicated_count
        
// // // //       FROM mtc_child_master m
// // // //       WHERE m.mtc_id = ANY($3)
// // // //     `;

// // // //     const metricsResult = await query(metricsSql, [fromDate, toDate, districtMtcIds]);
// // // //     const dbMetrics = metricsResult.rows[0] || {};

// // // //     // 3. Dynamic Lookup-Table Chart Breakdown Queries (Gender, Caste, Referral Stream)
// // // //     // Gender Breakdown joined with lookup master data
// // // //     const genderSql = `
// // // //       SELECT l.sex_name AS name, COUNT(m.registration_id)::int AS value
// // // //       FROM mtc_sex l
// // // //       LEFT JOIN mtc_child_master m ON l.sex_id = m.sex_id AND m.mtc_id = ANY($3) AND m.admission_date BETWEEN $1 AND $2
// // // //       GROUP BY l.sex_name ORDER BY l.sex_name ASC
// // // //     `;

// // // //     // Caste Breakdown joined with lookup master data
// // // //     const casteSql = `
// // // //       SELECT l.caste_name AS name, COUNT(m.registration_id)::int AS value
// // // //       FROM mtc_caste l
// // // //       LEFT JOIN mtc_child_master m ON l.caste_id = m.caste_id AND m.mtc_id = ANY($3) AND m.admission_date BETWEEN $1 AND $2
// // // //       GROUP BY l.caste_name ORDER BY l.caste_name ASC
// // // //     `;

// // // //     // Referral Channels breakdown joined with lookup master data
// // // //     const referralSql = `
// // // //       SELECT l.referred_by_name AS name, COUNT(m.registration_id)::int AS value
// // // //       FROM mtc_referred_by l
// // // //       LEFT JOIN mtc_child_master m ON l.referred_by_id = m.referred_by_id AND m.mtc_id = ANY($3) AND m.admission_date BETWEEN $1 AND $2
// // // //       GROUP BY l.referred_by_name ORDER BY value DESC
// // // //     `;

// // // //     const [genderRes, casteRes, referralRes] = await Promise.all([
// // // //       query(genderSql, [fromDate, toDate, districtMtcIds]),
// // // //       query(casteSql, [fromDate, toDate, districtMtcIds]),
// // // //       query(referralSql, [fromDate, toDate, districtMtcIds])
// // // //     ]);

// // // //     // Calculate Dynamic Bed Occupancy Rate (%)
// // // //     const currentOccupancy = (Number(dbMetrics.total_admissions) || 0) - (Number(dbMetrics.total_exits) || 0);
// // // //     const occupancyRate = totalBeds > 0 ? ((currentOccupancy / totalBeds) * 100).toFixed(2) : "0.00";

// // // //     const kpi = {
// // // //       TotalAdmissions: Number(dbMetrics.total_admissions) || 0,
// // // //       TotalExits: Number(dbMetrics.total_exits) || 0,
// // // //       TotalCured: Number(dbMetrics.total_cured) || 0,
// // // //       TotalDefaulters: Number(dbMetrics.total_defaulters) || 0,
// // // //       TotalDeaths: Number(dbMetrics.total_deaths) || 0,
// // // //       AvgWeightGain: Number(dbMetrics.avg_weight_gain) || 0,
// // // //       BedOccupancyRate: occupancyRate, 
// // // //       AvgStay: Number(dbMetrics.avg_stay) || 0,
// // // //     };

// // // //     // Format final chart outputs matching frontend data requirements exactly
// // // //     const ageData = [
// // // //       { name: '0-6 Months', value: Number(dbMetrics.age_0_6m) || 0 },
// // // //       { name: '6M - 2 Years', value: Number(dbMetrics.age_6m_2y) || 0 },
// // // //       { name: '2 - 5 Years', value: Number(dbMetrics.age_2y_5y) || 0 }
// // // //     ];

// // // //     const complicationData = [
// // // //       { name: 'Complicated', value: Number(dbMetrics.complicated_count) || 0 },
// // // //       { name: 'Non-Complicated', value: Number(dbMetrics.non_complicated_count) || 0 }
// // // //     ];

// // // //     const outcomeData = [
// // // //       { name: 'Cured', value: kpi.TotalCured }, 
// // // //       { name: 'Defaulter', value: kpi.TotalDefaulters }, 
// // // //       { name: 'Death', value: kpi.TotalDeaths }
// // // //     ];

// // // //     return NextResponse.json({ 
// // // //       success: true,
// // // //       districtName: districtName.toUpperCase(),
// // // //       locations: locations, 
// // // //       kpi: kpi,
// // // //       gender: genderRes.rows,
// // // //       age: ageData,
// // // //       complications: complicationData,
// // // //       referral: referralRes.rows,
// // // //       caste: casteRes.rows,
// // // //       outcome: outcomeData
// // // //     });
    
// // // //   } catch (error: any) {
// // // //     console.error("Dashboard master data sync query error:", error.message);
// // // //     return NextResponse.json(
// // // //       { error: 'Database operations failed', details: error.message }, 
// // // //       { status: 500 }
// // // //     );
// // // //   }
// // // // }

// // // import { NextResponse } from 'next/server';
// // // import { query } from '@/lib/db';

// // // export async function GET(request: Request) {
// // //   try {
// // //     const { searchParams } = new URL(request.url);
// // //     const fromDate = searchParams.get('from');
// // //     const toDate = searchParams.get('to');
// // //     const districtName = searchParams.get('districtName') || 'RANCHI';

// // //     // 1. Fetch MTC facilities for this district and join with bed capacity
// // //     const mtcSql = `
// // //       SELECT 
// // //         c.mtc_id AS id,
// // //         c.mtc_name AS name,
// // //         c.mtc_code,
// // //         COALESCE(b.number_of_beds, 0) AS beds
// // //       FROM mtc_centers c
// // //       LEFT JOIN mtc_bed_capacity b 
// // //         ON UPPER(c.mtc_name) = UPPER(b.mtc_name) 
// // //         AND UPPER(c.district) = UPPER(b.district)
// // //       WHERE UPPER(c.district) = $1
// // //       ORDER BY c.mtc_name ASC
// // //     `;
    
// // //     const mtcResult = await query(mtcSql, [districtName.toUpperCase()]);
// // //     const locations = mtcResult.rows.map((row: any) => ({
// // //       id: row.id,
// // //       name: row.name,
// // //       beds: Number(row.beds),
// // //       mo: "Dr. Assigned MO", 
// // //       contact: "+91 XXXXX XXXXX"
// // //     }));

// // //     const districtMtcIds = mtcResult.rows.map((row: any) => row.id);
// // //     const districtMtcCodes = mtcResult.rows.map((row: any) => row.mtc_code);

// // //     // Hard fallback if no centers exist in the selected district to prevent query crashing
// // //     if (districtMtcIds.length === 0) {
// // //       return NextResponse.json({ 
// // //         success: true, districtName: districtName.toUpperCase(), locations: [],
// // //         kpi: { TotalAdmissions: 0, TotalExits: 0, TotalCured: 0, TotalDefaulters: 0, TotalDeaths: 0, AvgWeightGain: 0, BedOccupancyRate: "0.00", AvgStay: 0 },
// // //         gender: [], age: [], complications: [], referral: [], caste: [], outcome: []
// // //       });
// // //     }

// // //     const totalBeds = mtcResult.rows.reduce((sum: number, row: any) => sum + (Number(row.beds) || 0), 0);

// // //     // 2. Fetch Aggregations directly from mtc_child_master (FIXED OPERATOR MISS HERE)
// // //     const metricsSql = `
// // //       SELECT
// // //         COUNT(CASE WHEN m.admission_date BETWEEN $1 AND $2 THEN 1 END) AS total_admissions,
// // //         COUNT(CASE WHEN m.discharge_date BETWEEN $1 AND $2 THEN 1 END) AS total_exits,
// // //         COUNT(CASE WHEN m.outcome_indicator_id = 1 AND m.discharge_date BETWEEN $1 AND $2 THEN 1 END) AS total_cured,
// // //         COUNT(CASE WHEN m.outcome_indicator_id = 2 AND m.discharge_date BETWEEN $1 AND $2 THEN 1 END) AS total_defaulters,
// // //         COUNT(CASE WHEN m.outcome_indicator_id = 3 AND m.discharge_date BETWEEN $1 AND $2 THEN 1 END) AS total_deaths,
        
// // //         -- Average stay duration calculated from total_stay_days
// // //         ROUND(AVG(CASE WHEN m.discharge_date BETWEEN $1 AND $2 THEN m.total_stay_days END), 1) AS avg_stay,
        
// // //         -- Average weight gain calculation metric formula
// // //         ROUND(AVG(CASE WHEN m.outcome_indicator_id = 1 AND m.discharge_date BETWEEN $1 AND $2 AND m.total_stay_days > 0 AND m.admission_weight_kg > 0
// // //           THEN ((m.discharge_weight_kg - m.admission_weight_kg) * 1000) / (m.admission_weight_kg * m.total_stay_days) END), 2) AS avg_weight_gain,

// // //         -- Chart Aggregations: Dynamic Age Group breakdowns 
// // //         COUNT(CASE WHEN m.admission_date BETWEEN $1 AND $2 AND (m.age_years = 0 AND m.age_months <= 6) THEN 1 END) AS age_0_6m,
// // //         COUNT(CASE WHEN m.admission_date BETWEEN $1 AND $2 AND ((m.age_years = 0 AND m.age_months > 6) OR m.age_years = 1 OR (m.age_years = 2 AND m.age_months = 0)) THEN 1 END) AS age_6m_2y,
// // //         COUNT(CASE WHEN m.admission_date BETWEEN $1 AND $2 AND ((m.age_years = 2 AND m.age_months > 0) OR m.age_years BETWEEN 3 AND 5) THEN 1 END) AS age_2y_5y,

// // //         -- Chart Aggregations: Dynamic medical complications parsing
// // //         COUNT(CASE WHEN m.admission_date BETWEEN $1 AND $2 AND m.medical_complications @> ARRAY['NO COMPLICATION']::text[] THEN 1 END) AS non_complicated_count,
// // //         COUNT(CASE WHEN m.admission_date BETWEEN $1 AND $2 AND NOT (m.medical_complications @> ARRAY['NO COMPLICATION']::text[]) THEN 1 END) AS complicated_count
        
// // //       FROM mtc_child_master m
// // //       WHERE m.mtc_id = ANY($3)
// // //     `;

// // //     // 3. Fetch Bed Occupancy Rate directly from mtc_bed_occupancy
// // //     const occupancySql = `
// // //       SELECT 
// // //         ROUND(AVG(bed_occupancy_percentage), 2) AS avg_occupancy
// // //       FROM mtc_bed_occupancy
// // //       WHERE record_date BETWEEN $1 AND $2
// // //         AND EXISTS (
// // //           SELECT 1 FROM unnest($3::text[]) as code 
// // //           WHERE mtc_code LIKE code || '%' OR code LIKE mtc_code || '%'
// // //         )
// // //     `;

// // //     // 4. Run Lookups Chart Breakdowns (Gender, Caste, Referral Stream)
// // //     const genderSql = `
// // //       SELECT l.sex_name AS name, COUNT(m.registration_id)::int AS value
// // //       FROM mtc_sex l
// // //       LEFT JOIN mtc_child_master m ON l.sex_id = m.sex_id AND m.mtc_id = ANY($3) AND m.admission_date BETWEEN $1 AND $2
// // //       GROUP BY l.sex_name ORDER BY l.sex_name ASC
// // //     `;

// // //     const casteSql = `
// // //       SELECT l.caste_name AS name, COUNT(m.registration_id)::int AS value
// // //       FROM mtc_caste l
// // //       LEFT JOIN mtc_child_master m ON l.caste_id = m.caste_id AND m.mtc_id = ANY($3) AND m.admission_date BETWEEN $1 AND $2
// // //       GROUP BY l.caste_name ORDER BY l.caste_name ASC
// // //     `;

// // //     const referralSql = `
// // //       SELECT l.referred_by_name AS name, COUNT(m.registration_id)::int AS value
// // //       FROM mtc_referred_by l
// // //       LEFT JOIN mtc_child_master m ON l.referred_by_id = m.referred_by_id AND m.mtc_id = ANY($3) AND m.admission_date BETWEEN $1 AND $2
// // //       GROUP BY l.referred_by_name ORDER BY value DESC
// // //     `;

// // //     // Execute queries concurrently
// // //     const [metricsRes, occupancyRes, genderRes, casteRes, referralRes] = await Promise.all([
// // //       query(metricsSql, [fromDate, toDate, districtMtcIds]),
// // //       query(occupancySql, [fromDate, toDate, districtMtcCodes]),
// // //       query(genderSql, [fromDate, toDate, districtMtcIds]),
// // //       query(casteSql, [fromDate, toDate, districtMtcIds]),
// // //       query(referralSql, [fromDate, toDate, districtMtcIds])
// // //     ]);

// // //     const dbMetrics = metricsRes.rows[0] || {};
// // //     const dbOccupancy = occupancyRes.rows[0] || {};
    
// // //     const finalOccupancyRate = dbOccupancy.avg_occupancy !== null ? Number(dbOccupancy.avg_occupancy).toFixed(2) : "0.00";

// // //     const kpi = {
// // //       TotalAdmissions: Number(dbMetrics.total_admissions) || 0,
// // //       TotalExits: Number(dbMetrics.total_exits) || 0,
// // //       TotalCured: Number(dbMetrics.total_cured) || 0,
// // //       TotalDefaulters: Number(dbMetrics.total_defaulters) || 0,
// // //       TotalDeaths: Number(dbMetrics.total_deaths) || 0,
// // //       AvgWeightGain: Number(dbMetrics.avg_weight_gain) || 0,
// // //       BedOccupancyRate: finalOccupancyRate, 
// // //       AvgStay: Number(dbMetrics.avg_stay) || 0,
// // //     };

// // //     const ageData = [
// // //       { name: '0-6 Months', value: Number(dbMetrics.age_0_6m) || 0 },
// // //       { name: '6M - 2 Years', value: Number(dbMetrics.age_6m_2y) || 0 },
// // //       { name: '2 - 5 Years', value: Number(dbMetrics.age_2y_5y) || 0 }
// // //     ];

// // //     const complicationData = [
// // //       { name: 'Complicated', value: Number(dbMetrics.complicated_count) || 0 },
// // //       { name: 'Non-Complicated', value: Number(dbMetrics.non_complicated_count) || 0 }
// // //     ];

// // //     const outcomeData = [
// // //       { name: 'Cured', value: kpi.TotalCured }, 
// // //       { name: 'Defaulter', value: kpi.TotalDefaulters }, 
// // //       { name: 'Death', value: kpi.TotalDeaths }
// // //     ];

// // //     return NextResponse.json({ 
// // //       success: true,
// // //       districtName: districtName.toUpperCase(),
// // //       locations: locations, 
// // //       kpi: kpi,
// // //       gender: genderRes.rows,
// // //       age: ageData,
// // //       complications: complicationData,
// // //       referral: referralRes.rows,
// // //       caste: casteRes.rows,
// // //       outcome: outcomeData
// // //     });
    
// // //   } catch (error: any) {
// // //     console.error("Dashboard database transaction failed:", error.message);
// // //     return NextResponse.json(
// // //       { error: 'Database operations failed', details: error.message }, 
// // //       { status: 500 }
// // //     );
// // //   }
// // // }

// // import { NextResponse } from 'next/server';
// // import { query } from '@/lib/db';

// // export async function GET(request: Request) {
// //   try {
// //     const { searchParams } = new URL(request.url);
// //     const fromDate = searchParams.get('from');
// //     const toDate = searchParams.get('to');
// //     const districtName = searchParams.get('districtName') || 'RANCHI';

// //     // 1. Fetch MTC facilities for this district and join with bed capacity
// //     const mtcSql = `
// //       SELECT 
// //         c.mtc_id AS id,
// //         c.mtc_name AS name,
// //         c.mtc_code,
// //         COALESCE(b.number_of_beds, 0) AS beds
// //       FROM mtc_centers c
// //       LEFT JOIN mtc_bed_capacity b 
// //         ON UPPER(c.mtc_name) = UPPER(b.mtc_name) 
// //         AND UPPER(c.district) = UPPER(b.district)
// //       WHERE UPPER(c.district) = $1
// //       ORDER BY c.mtc_name ASC
// //     `;
    
// //     const mtcResult = await query(mtcSql, [districtName.toUpperCase()]);
// //     const locations = mtcResult.rows.map((row: any) => ({
// //       id: row.id,
// //       name: row.name,
// //       beds: Number(row.beds),
// //       mo: "Dr. Assigned MO", 
// //       contact: "+91 XXXXX XXXXX"
// //     }));

// //     const districtMtcIds = mtcResult.rows.map((row: any) => row.id);
// //     const districtMtcCodes = mtcResult.rows.map((row: any) => row.mtc_code);

// //     if (districtMtcIds.length === 0) {
// //       return NextResponse.json({ 
// //         success: true, districtName: districtName.toUpperCase(), locations: [],
// //         kpi: { TotalAdmissions: 0, TotalExits: 0, TotalCured: 0, TotalDefaulters: 0, TotalDeaths: 0, AvgWeightGain: 0, BedOccupancyRate: "0.00", AvgStay: 0 },
// //         gender: [], age: [], complications: [], referral: [], caste: [], outcome: []
// //       });
// //     }

// //     const totalBeds = mtcResult.rows.reduce((sum: number, row: any) => sum + (Number(row.beds) || 0), 0);

// //     // 2. Fetch Aggregations directly from mtc_child_master including all 6 dropdown options
// //     const metricsSql = `
// //       SELECT
// //         COUNT(CASE WHEN m.admission_date BETWEEN $1 AND $2 THEN 1 END) AS total_admissions,
// //         COUNT(CASE WHEN m.discharge_date BETWEEN $1 AND $2 THEN 1 END) AS total_exits,
        
// //         -- Mapping based on your 6 Dropdown Outcome Indicators
// //         COUNT(CASE WHEN m.outcome_indicator_id = 1 AND m.discharge_date BETWEEN $1 AND $2 THEN 1 END) AS total_cured,
// //         COUNT(CASE WHEN m.outcome_indicator_id = 2 AND m.discharge_date BETWEEN $1 AND $2 THEN 1 END) AS total_defaulters,
// //         COUNT(CASE WHEN m.outcome_indicator_id = 3 AND m.discharge_date BETWEEN $1 AND $2 THEN 1 END) AS total_medical_transfer,
// //         COUNT(CASE WHEN m.outcome_indicator_id = 4 AND m.discharge_date BETWEEN $1 AND $2 THEN 1 END) AS total_non_respondent,
// //         COUNT(CASE WHEN m.outcome_indicator_id = 5 AND m.discharge_date BETWEEN $1 AND $2 THEN 1 END) AS total_deaths,
// //         COUNT(CASE WHEN m.outcome_indicator_id = 6 AND m.discharge_date BETWEEN $1 AND $2 THEN 1 END) AS total_partial_improvement,
        
// //         -- Average stay duration 
// //         ROUND(AVG(CASE WHEN m.discharge_date BETWEEN $1 AND $2 THEN m.total_stay_days END), 1) AS avg_stay,
        
// //         -- Clinical average weight gain formula (gm/kg/day)
// //         ROUND(
// //           COALESCE(
// //             AVG(
// //               CASE 
// //                 WHEN m.outcome_indicator_id = 1 
// //                 AND m.discharge_date BETWEEN $1 AND $2 
// //                 AND m.total_stay_days > 0 
// //                 AND m.admission_weight_kg > 0
// //                 AND m.discharge_weight_kg >= m.admission_weight_kg
// //                 THEN ((m.discharge_weight_kg - m.admission_weight_kg) * 1000) / (m.admission_weight_kg * m.total_stay_days) 
// //               END
// //             ), 0
// //           ), 2
// //         ) AS avg_weight_gain,

// //         -- Chart Aggregations: Age Group Breakdowns 
// //         COUNT(CASE WHEN m.admission_date BETWEEN $1 AND $2 AND (m.age_years = 0 AND m.age_months <= 6) THEN 1 END) AS age_0_6m,
// //         COUNT(CASE WHEN m.admission_date BETWEEN $1 AND $2 AND ((m.age_years = 0 AND m.age_months > 6) OR m.age_years = 1 OR (m.age_years = 2 AND m.age_months = 0)) THEN 1 END) AS age_6m_2y,
// //         COUNT(CASE WHEN m.admission_date BETWEEN $1 AND $2 AND ((m.age_years = 2 AND m.age_months > 0) OR m.age_years BETWEEN 3 AND 5) THEN 1 END) AS age_2y_5y,

// //         -- Chart Aggregations: Medical Complications Parsing
// //         COUNT(CASE WHEN m.admission_date BETWEEN $1 AND $2 AND m.medical_complications @> ARRAY['NO COMPLICATION']::text[] THEN 1 END) AS non_complicated_count,
// //         COUNT(CASE WHEN m.admission_date BETWEEN $1 AND $2 AND NOT (m.medical_complications @> ARRAY['NO COMPLICATION']::text[]) THEN 1 END) AS complicated_count
        
// //       FROM mtc_child_master m
// //       WHERE m.mtc_id = ANY($3)
// //     `;

// //     // 3. Fetch Bed Occupancy Rate directly from mtc_bed_occupancy
// //     const occupancySql = `
// //       SELECT 
// //         ROUND(AVG(bed_occupancy_percentage), 2) AS avg_occupancy
// //       FROM mtc_bed_occupancy
// //       WHERE record_date BETWEEN $1 AND $2
// //         AND EXISTS (
// //           SELECT 1 FROM unnest($3::text[]) as code 
// //           WHERE mtc_code LIKE code || '%' OR code LIKE mtc_code || '%'
// //         )
// //     `;

// //     // 4. Run Lookups Chart Breakdowns (Gender, Caste, Referral Stream)
// //     const genderSql = `
// //       SELECT l.sex_name AS name, COUNT(m.registration_id)::int AS value
// //       FROM mtc_sex l
// //       LEFT JOIN mtc_child_master m ON l.sex_id = m.sex_id AND m.mtc_id = ANY($3) AND m.admission_date BETWEEN $1 AND $2
// //       GROUP BY l.sex_name ORDER BY l.sex_name ASC
// //     `;

// //     const casteSql = `
// //       SELECT l.caste_name AS name, COUNT(m.registration_id)::int AS value
// //       FROM mtc_caste l
// //       LEFT JOIN mtc_child_master m ON l.caste_id = m.caste_id AND m.mtc_id = ANY($3) AND m.admission_date BETWEEN $1 AND $2
// //       GROUP BY l.caste_name ORDER BY l.caste_name ASC
// //     `;

// //     const referralSql = `
// //       SELECT l.referred_by_name AS name, COUNT(m.registration_id)::int AS value
// //       FROM mtc_referred_by l
// //       LEFT JOIN mtc_child_master m ON l.referred_by_id = m.referred_by_id AND m.mtc_id = ANY($3) AND m.admission_date BETWEEN $1 AND $2
// //       GROUP BY l.referred_by_name ORDER BY value DESC
// //     `;

// //     // Execute queries concurrently
// //     const [metricsRes, occupancyRes, genderRes, casteRes, referralRes] = await Promise.all([
// //       query(metricsSql, [fromDate, toDate, districtMtcIds]),
// //       query(occupancySql, [fromDate, toDate, districtMtcCodes]),
// //       query(genderSql, [fromDate, toDate, districtMtcIds]),
// //       query(casteSql, [fromDate, toDate, districtMtcIds]),
// //       query(referralSql, [fromDate, toDate, districtMtcIds])
// //     ]);

// //     const dbMetrics = metricsRes.rows[0] || {};
// //     const dbOccupancy = occupancyRes.rows[0] || {};
    
// //     const finalOccupancyRate = dbOccupancy.avg_occupancy !== null ? Number(dbOccupancy.avg_occupancy).toFixed(2) : "0.00";

// //     const kpi = {
// //       TotalAdmissions: Number(dbMetrics.total_admissions) || 0,
// //       TotalExits: Number(dbMetrics.total_exits) || 0,
// //       TotalCured: Number(dbMetrics.total_cured) || 0,
// //       TotalDefaulters: Number(dbMetrics.total_defaulters) || 0,
// //       TotalDeaths: Number(dbMetrics.total_deaths) || 0,
// //       AvgWeightGain: Number(dbMetrics.avg_weight_gain) || 0,
// //       BedOccupancyRate: finalOccupancyRate, 
// //       AvgStay: Number(dbMetrics.avg_stay) || 0,
// //     };

// //     const ageData = [
// //       { name: '0-6 Months', value: Number(dbMetrics.age_0_6m) || 0 },
// //       { name: '6M - 2 Years', value: Number(dbMetrics.age_6m_2y) || 0 },
// //       { name: '2 - 5 Years', value: Number(dbMetrics.age_2y_5y) || 0 }
// //     ];

// //     const complicationData = [
// //       { name: 'Complicated', value: Number(dbMetrics.complicated_count) || 0 },
// //       { name: 'Non-Complicated', value: Number(dbMetrics.non_complicated_count) || 0 }
// //     ];

// //     // Populating all 6 outcome categories dynamically based on dropdown data matrix values
// //     const outcomeData = [
// //       { name: 'Cured', value: Number(dbMetrics.total_cured) || 0 }, 
// //       { name: 'Defaulter', value: Number(dbMetrics.total_defaulters) || 0 }, 
// //       { name: 'Medical Transfer', value: Number(dbMetrics.total_medical_transfer) || 0 }, 
// //       { name: 'Non Respondent', value: Number(dbMetrics.total_non_respondent) || 0 }, 
// //       { name: 'Death', value: Number(dbMetrics.total_deaths) || 0 }, 
// //       { name: 'Partial Improvement', value: Number(dbMetrics.total_partial_improvement) || 0 }
// //     ];

// //     return NextResponse.json({ 
// //       success: true,
// //       districtName: districtName.toUpperCase(),
// //       locations: locations, 
// //       kpi: kpi,
// //       gender: genderRes.rows,
// //       age: ageData,
// //       complications: complicationData,
// //       referral: referralRes.rows,
// //       caste: casteRes.rows,
// //       outcome: outcomeData
// //     });
    
// //   } catch (error: any) {
// //     console.error("Dashboard database transaction failed:", error.message);
// //     return NextResponse.json(
// //       { error: 'Database operations failed', details: error.message }, 
// //       { status: 500 }
// //     );
// //   }
// // }

// import { NextResponse } from 'next/server';
// import { query } from '@/lib/db';

// export const dynamic = 'force-dynamic';

// interface MtcCenterDbRow {
//   id: number | string;
//   name: string;
//   mtc_code: string;
//   beds: number | string;
// }

// export async function GET(request: Request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const fromDate = searchParams.get('from');
//     const toDate = searchParams.get('to');
//     const districtName = searchParams.get('districtName') || 'RANCHI';

//     // 1. Fetch MTC facilities for this district and join with bed capacity
//     const mtcSql = `
//       SELECT 
//         c.mtc_id AS id,
//         c.mtc_name AS name,
//         c.mtc_code,
//         COALESCE(b.number_of_beds, 0) AS beds
//       FROM mtc_centers c
//       LEFT JOIN mtc_bed_capacity b 
//         ON UPPER(c.mtc_name) = UPPER(b.mtc_name) 
//         AND UPPER(c.district) = UPPER(b.district)
//       WHERE UPPER(c.district) = $1
//       ORDER BY c.mtc_name ASC
//     `;
    
//     const mtcResult = await query(mtcSql, [districtName.toUpperCase()]);
//     const locations = (mtcResult.rows as MtcCenterDbRow[]).map((row) => ({
//       id: row.id,
//       name: row.name,
//       beds: Number(row.beds),
//       mo: "Dr. Assigned MO", 
//       contact: "+91 XXXXX XXXXX"
//     }));

//     const districtMtcIds = (mtcResult.rows as MtcCenterDbRow[]).map((row) => row.id);
//     const districtMtcCodes = (mtcResult.rows as MtcCenterDbRow[]).map((row) => row.mtc_code);

//     if (districtMtcIds.length === 0) {
//       return NextResponse.json({ 
//         success: true, districtName: districtName.toUpperCase(), locations: [],
//         kpi: { TotalAdmissions: 0, TotalExits: 0, TotalCured: 0, TotalDefaulters: 0, TotalDeaths: 0, AvgWeightGain: 0, BedOccupancyRate: "0.00", AvgStay: 0 },
//         gender: [], age: [], complications: [], referral: [], caste: [], outcome: []
//       });
//     }

//     // 2. Fetch Aggregations directly from mtc_child_master including all 6 dropdown options
//     const metricsSql = `
//       SELECT
//         COUNT(CASE WHEN m.admission_date BETWEEN $1 AND $2 THEN 1 END) AS total_admissions,
//         COUNT(CASE WHEN m.discharge_date BETWEEN $1 AND $2 THEN 1 END) AS total_exits,
        
//         -- Mapping based on your 6 Dropdown Outcome Indicators
//         COUNT(CASE WHEN m.outcome_indicator_id = 1 AND m.discharge_date BETWEEN $1 AND $2 THEN 1 END) AS total_cured,
//         COUNT(CASE WHEN m.outcome_indicator_id = 2 AND m.discharge_date BETWEEN $1 AND $2 THEN 1 END) AS total_defaulters,
//         COUNT(CASE WHEN m.outcome_indicator_id = 3 AND m.discharge_date BETWEEN $1 AND $2 THEN 1 END) AS total_medical_transfer,
//         COUNT(CASE WHEN m.outcome_indicator_id = 4 AND m.discharge_date BETWEEN $1 AND $2 THEN 1 END) AS total_non_respondent,
//         COUNT(CASE WHEN m.outcome_indicator_id = 5 AND m.discharge_date BETWEEN $1 AND $2 THEN 1 END) AS total_deaths,
//         COUNT(CASE WHEN m.outcome_indicator_id = 6 AND m.discharge_date BETWEEN $1 AND $2 THEN 1 END) AS total_partial_improvement,
        
//         -- Average stay duration 
//         ROUND(AVG(CASE WHEN m.discharge_date BETWEEN $1 AND $2 THEN m.total_stay_days END), 1) AS avg_stay,
        
//         -- Clinical average weight gain formula (gm/kg/day)
//         ROUND(
//           COALESCE(
//             AVG(
//               CASE 
//                 WHEN m.outcome_indicator_id = 1 
//                 AND m.discharge_date BETWEEN $1 AND $2 
//                 AND m.total_stay_days > 0 
//                 AND m.admission_weight_kg > 0
//                 AND m.discharge_weight_kg >= m.admission_weight_kg
//                 THEN ((m.discharge_weight_kg - m.admission_weight_kg) * 1000) / (m.admission_weight_kg * m.total_stay_days) 
//               END
//             ), 0
//           ), 2
//         ) AS avg_weight_gain,

//         -- Chart Aggregations: Age Group Breakdowns 
//         COUNT(CASE WHEN m.admission_date BETWEEN $1 AND $2 AND (m.age_years = 0 AND m.age_months <= 6) THEN 1 END) AS age_0_6m,
//         COUNT(CASE WHEN m.admission_date BETWEEN $1 AND $2 AND ((m.age_years = 0 AND m.age_months > 6) OR m.age_years = 1 OR (m.age_years = 2 AND m.age_months = 0)) THEN 1 END) AS age_6m_2y,
//         COUNT(CASE WHEN m.admission_date BETWEEN $1 AND $2 AND ((m.age_years = 2 AND m.age_months > 0) OR m.age_years BETWEEN 3 AND 5) THEN 1 END) AS age_2y_5y,

//         -- Chart Aggregations: Medical Complications Parsing
//         COUNT(CASE WHEN m.admission_date BETWEEN $1 AND $2 AND m.medical_complications @> ARRAY['NO COMPLICATION']::text[] THEN 1 END) AS non_complicated_count,
//         COUNT(CASE WHEN m.admission_date BETWEEN $1 AND $2 AND NOT (m.medical_complications @> ARRAY['NO COMPLICATION']::text[]) THEN 1 END) AS complicated_count
        
//       FROM mtc_child_master m
//       WHERE m.mtc_id = ANY($3)
//     `;

//     // 3. Fetch Bed Occupancy Rate directly from mtc_bed_occupancy
//     const occupancySql = `
//       SELECT 
//         ROUND(AVG(bed_occupancy_percentage), 2) AS avg_occupancy
//       FROM mtc_bed_occupancy
//       WHERE record_date BETWEEN $1 AND $2
//         AND EXISTS (
//           SELECT 1 FROM unnest($3::text[]) as code 
//           WHERE mtc_code LIKE code || '%' OR code LIKE mtc_code || '%'
//         )
//     `;

//     // 4. Run Lookups Chart Breakdowns (Gender, Caste, Referral Stream)
//     const genderSql = `
//       SELECT l.sex_name AS name, COUNT(m.registration_id)::int AS value
//       FROM mtc_sex l
//       LEFT JOIN mtc_child_master m ON l.sex_id = m.sex_id AND m.mtc_id = ANY($3) AND m.admission_date BETWEEN $1 AND $2
//       GROUP BY l.sex_name ORDER BY l.sex_name ASC
//     `;

//     const casteSql = `
//       SELECT l.caste_name AS name, COUNT(m.registration_id)::int AS value
//       FROM mtc_caste l
//       LEFT JOIN mtc_child_master m ON l.caste_id = m.caste_id AND m.mtc_id = ANY($3) AND m.admission_date BETWEEN $1 AND $2
//       GROUP BY l.caste_name ORDER BY l.caste_name ASC
//     `;

//     const referralSql = `
//       SELECT l.referred_by_name AS name, COUNT(m.registration_id)::int AS value
//       FROM mtc_referred_by l
//       LEFT JOIN mtc_child_master m ON l.referred_by_id = m.referred_by_id AND m.mtc_id = ANY($3) AND m.admission_date BETWEEN $1 AND $2
//       GROUP BY l.referred_by_name ORDER BY value DESC
//     `;

//     // Execute queries concurrently
//     const [metricsRes, occupancyRes, genderRes, casteRes, referralRes] = await Promise.all([
//       query(metricsSql, [fromDate, toDate, districtMtcIds]),
//       query(occupancySql, [fromDate, toDate, districtMtcCodes]),
//       query(genderSql, [fromDate, toDate, districtMtcIds]),
//       query(casteSql, [fromDate, toDate, districtMtcIds]),
//       query(referralSql, [fromDate, toDate, districtMtcIds])
//     ]);

//     const dbMetrics = metricsRes.rows[0] || {};
//     const dbOccupancy = occupancyRes.rows[0] || {};
    
//     const finalOccupancyRate = dbOccupancy.avg_occupancy !== null ? Number(dbOccupancy.avg_occupancy).toFixed(2) : "0.00";

//     const kpi = {
//       TotalAdmissions: Number(dbMetrics.total_admissions) || 0,
//       TotalExits: Number(dbMetrics.total_exits) || 0,
//       TotalCured: Number(dbMetrics.total_cured) || 0,
//       TotalDefaulters: Number(dbMetrics.total_defaulters) || 0,
//       TotalDeaths: Number(dbMetrics.total_deaths) || 0,
//       AvgWeightGain: Number(dbMetrics.avg_weight_gain) || 0,
//       BedOccupancyRate: finalOccupancyRate, 
//       AvgStay: Number(dbMetrics.avg_stay) || 0,
//     };

//     const ageData = [
//       { name: '0-6 Months', value: Number(dbMetrics.age_0_6m) || 0 },
//       { name: '6M - 2 Years', value: Number(dbMetrics.age_6m_2y) || 0 },
//       { name: '2 - 5 Years', value: Number(dbMetrics.age_2y_5y) || 0 }
//     ];

//     const complicationData = [
//       { name: 'Complicated', value: Number(dbMetrics.complicated_count) || 0 },
//       { name: 'Non-Complicated', value: Number(dbMetrics.non_complicated_count) || 0 }
//     ];

//     // Populating all 6 outcome categories dynamically based on dropdown data matrix values
//     const outcomeData = [
//       { name: 'Cured', value: Number(dbMetrics.total_cured) || 0 }, 
//       { name: 'Defaulter', value: Number(dbMetrics.total_defaulters) || 0 }, 
//       { name: 'Medical Transfer', value: Number(dbMetrics.total_medical_transfer) || 0 }, 
//       { name: 'Non Respondent', value: Number(dbMetrics.total_non_respondent) || 0 }, 
//       { name: 'Death', value: Number(dbMetrics.total_deaths) || 0 }, 
//       { name: 'Partial Improvement', value: Number(dbMetrics.total_partial_improvement) || 0 }
//     ];

//     return NextResponse.json({ 
//       success: true,
//       districtName: districtName.toUpperCase(),
//       locations: locations, 
//       kpi: kpi,
//       gender: genderRes.rows,
//       age: ageData,
//       complications: complicationData,
//       referral: referralRes.rows,
//       caste: casteRes.rows,
//       outcome: outcomeData
//     });
    
//   } catch (error: unknown) {
//     const errorMsg = error instanceof Error ? error.message : "An unexpected dashboard operation failure occurred";
//     console.error("Dashboard database transaction failed:", errorMsg);
//     return NextResponse.json(
//       { error: 'Database operations failed', details: errorMsg }, 
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

interface MtcCenterDbRow {
  id: number | string;
  name: string;
  mtc_code: string;
  beds: number | string;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const fromDate = searchParams.get('from');
    const toDate = searchParams.get('to');
    const districtName = searchParams.get('districtName') || 'RANCHI';

    // 1. Fetch MTC facilities for this district and join with bed capacity
    const mtcSql = `
      SELECT 
        c.mtc_id AS id,
        c.mtc_name AS name,
        c.mtc_code,
        COALESCE(b.number_of_beds, 0) AS beds
      FROM mtc_centers c
      LEFT JOIN mtc_bed_capacity b 
        ON UPPER(c.mtc_name) = UPPER(b.mtc_name) 
        AND UPPER(c.district) = UPPER(b.district)
      WHERE UPPER(c.district) = $1
      ORDER BY c.mtc_name ASC
    `;
    
    // Explicitly pass the MtcCenterDbRow type parameter here
    const mtcResult = await query<MtcCenterDbRow>(mtcSql, [districtName.toUpperCase()]);
    const locations = mtcResult.rows.map((row) => ({
      id: row.id,
      name: row.name,
      beds: Number(row.beds),
      mo: "Dr. Assigned MO", 
      contact: "+91 XXXXX XXXXX"
    }));

    const districtMtcIds = mtcResult.rows.map((row) => row.id);
    const districtMtcCodes = mtcResult.rows.map((row) => row.mtc_code);

    if (districtMtcIds.length === 0) {
      return NextResponse.json({ 
        success: true, districtName: districtName.toUpperCase(), locations: [],
        kpi: { TotalAdmissions: 0, TotalExits: 0, TotalCured: 0, TotalDefaulters: 0, TotalDeaths: 0, AvgWeightGain: 0, BedOccupancyRate: "0.00", AvgStay: 0 },
        gender: [], age: [], complications: [], referral: [], caste: [], outcome: []
      });
    }

    // 2. Fetch Aggregations directly from mtc_child_master including all 6 dropdown options
    const metricsSql = `
      SELECT
        COUNT(CASE WHEN m.admission_date BETWEEN $1 AND $2 THEN 1 END) AS total_admissions,
        COUNT(CASE WHEN m.discharge_date BETWEEN $1 AND $2 THEN 1 END) AS total_exits,
        
        -- Mapping based on your 6 Dropdown Outcome Indicators
        COUNT(CASE WHEN m.outcome_indicator_id = 1 AND m.discharge_date BETWEEN $1 AND $2 THEN 1 END) AS total_cured,
        COUNT(CASE WHEN m.outcome_indicator_id = 2 AND m.discharge_date BETWEEN $1 AND $2 THEN 1 END) AS total_defaulters,
        COUNT(CASE WHEN m.outcome_indicator_id = 3 AND m.discharge_date BETWEEN $1 AND $2 THEN 1 END) AS total_medical_transfer,
        COUNT(CASE WHEN m.outcome_indicator_id = 4 AND m.discharge_date BETWEEN $1 AND $2 THEN 1 END) AS total_non_respondent,
        COUNT(CASE WHEN m.outcome_indicator_id = 5 AND m.discharge_date BETWEEN $1 AND $2 THEN 1 END) AS total_deaths,
        COUNT(CASE WHEN m.outcome_indicator_id = 6 AND m.discharge_date BETWEEN $1 AND $2 THEN 1 END) AS total_partial_improvement,
        
        -- Average stay duration 
        ROUND(AVG(CASE WHEN m.discharge_date BETWEEN $1 AND $2 THEN m.total_stay_days END), 1) AS avg_stay,
        
        -- Clinical average weight gain formula (gm/kg/day)
        ROUND(
          COALESCE(
            AVG(
              CASE 
                WHEN m.outcome_indicator_id = 1 
                AND m.discharge_date BETWEEN $1 AND $2 
                AND m.total_stay_days > 0 
                AND m.admission_weight_kg > 0
                AND m.discharge_weight_kg >= m.admission_weight_kg
                THEN ((m.discharge_weight_kg - m.admission_weight_kg) * 1000) / (m.admission_weight_kg * m.total_stay_days) 
              END
            ), 0
          ), 2
        ) AS avg_weight_gain,

        -- Chart Aggregations: Age Group Breakdowns 
        COUNT(CASE WHEN m.admission_date BETWEEN $1 AND $2 AND (m.age_years = 0 AND m.age_months <= 6) THEN 1 END) AS age_0_6m,
        COUNT(CASE WHEN m.admission_date BETWEEN $1 AND $2 AND ((m.age_years = 0 AND m.age_months > 6) OR m.age_years = 1 OR (m.age_years = 2 AND m.age_months = 0)) THEN 1 END) AS age_6m_2y,
        COUNT(CASE WHEN m.admission_date BETWEEN $1 AND $2 AND ((m.age_years = 2 AND m.age_months > 0) OR m.age_years BETWEEN 3 AND 5) THEN 1 END) AS age_2y_5y,

        -- Chart Aggregations: Medical Complications Parsing
        COUNT(CASE WHEN m.admission_date BETWEEN $1 AND $2 AND m.medical_complications @> ARRAY['NO COMPLICATION']::text[] THEN 1 END) AS non_complicated_count,
        COUNT(CASE WHEN m.admission_date BETWEEN $1 AND $2 AND NOT (m.medical_complications @> ARRAY['NO COMPLICATION']::text[]) THEN 1 END) AS complicated_count
        
      FROM mtc_child_master m
      WHERE m.mtc_id = ANY($3)
    `;

    // 3. Fetch Bed Occupancy Rate directly from mtc_bed_occupancy
    const occupancySql = `
      SELECT 
        ROUND(AVG(bed_occupancy_percentage), 2) AS avg_occupancy
      FROM mtc_bed_occupancy
      WHERE record_date BETWEEN $1 AND $2
        AND EXISTS (
          SELECT 1 FROM unnest($3::text[]) as code 
          WHERE mtc_code LIKE code || '%' OR code LIKE mtc_code || '%'
        )
    `;

    // 4. Run Lookups Chart Breakdowns (Gender, Caste, Referral Stream)
    const genderSql = `
      SELECT l.sex_name AS name, COUNT(m.registration_id)::int AS value
      FROM mtc_sex l
      LEFT JOIN mtc_child_master m ON l.sex_id = m.sex_id AND m.mtc_id = ANY($3) AND m.admission_date BETWEEN $1 AND $2
      GROUP BY l.sex_name ORDER BY l.sex_name ASC
    `;

    const casteSql = `
      SELECT l.caste_name AS name, COUNT(m.registration_id)::int AS value
      FROM mtc_caste l
      LEFT JOIN mtc_child_master m ON l.caste_id = m.caste_id AND m.mtc_id = ANY($3) AND m.admission_date BETWEEN $1 AND $2
      GROUP BY l.caste_name ORDER BY l.caste_name ASC
    `;

    const referralSql = `
      SELECT l.referred_by_name AS name, COUNT(m.registration_id)::int AS value
      FROM mtc_referred_by l
      LEFT JOIN mtc_child_master m ON l.referred_by_id = m.referred_by_id AND m.mtc_id = ANY($3) AND m.admission_date BETWEEN $1 AND $2
      GROUP BY l.referred_by_name ORDER BY value DESC
    `;

    // Execute queries concurrently
    const [metricsRes, occupancyRes, genderRes, casteRes, referralRes] = await Promise.all([
      query(metricsSql, [fromDate, toDate, districtMtcIds]),
      query(occupancySql, [fromDate, toDate, districtMtcCodes]),
      query(genderSql, [fromDate, toDate, districtMtcIds]),
      query(casteSql, [fromDate, toDate, districtMtcIds]),
      query(referralSql, [fromDate, toDate, districtMtcIds])
    ]);

    const dbMetrics = metricsRes.rows[0] || {};
    const dbOccupancy = occupancyRes.rows[0] || {};
    
    const finalOccupancyRate = dbOccupancy.avg_occupancy !== null ? Number(dbOccupancy.avg_occupancy).toFixed(2) : "0.00";

    const kpi = {
      TotalAdmissions: Number(dbMetrics.total_admissions) || 0,
      TotalExits: Number(dbMetrics.total_exits) || 0,
      TotalCured: Number(dbMetrics.total_cured) || 0,
      TotalDefaulters: Number(dbMetrics.total_defaulters) || 0,
      TotalDeaths: Number(dbMetrics.total_deaths) || 0,
      AvgWeightGain: Number(dbMetrics.avg_weight_gain) || 0,
      BedOccupancyRate: finalOccupancyRate, 
      AvgStay: Number(dbMetrics.avg_stay) || 0,
    };

    const ageData = [
      { name: '0-6 Months', value: Number(dbMetrics.age_0_6m) || 0 },
      { name: '6M - 2 Years', value: Number(dbMetrics.age_6m_2y) || 0 },
      { name: '2 - 5 Years', value: Number(dbMetrics.age_2y_5y) || 0 }
    ];

    const complicationData = [
      { name: 'Complicated', value: Number(dbMetrics.complicated_count) || 0 },
      { name: 'Non-Complicated', value: Number(dbMetrics.non_complicated_count) || 0 }
    ];

    // Populating all 6 outcome categories dynamically based on dropdown data matrix values
    const outcomeData = [
      { name: 'Cured', value: Number(dbMetrics.total_cured) || 0 }, 
      { name: 'Defaulter', value: Number(dbMetrics.total_defaulters) || 0 }, 
      { name: 'Medical Transfer', value: Number(dbMetrics.total_medical_transfer) || 0 }, 
      { name: 'Non Respondent', value: Number(dbMetrics.total_non_respondent) || 0 }, 
      { name: 'Death', value: Number(dbMetrics.total_deaths) || 0 }, 
      { name: 'Partial Improvement', value: Number(dbMetrics.total_partial_improvement) || 0 }
    ];

    return NextResponse.json({ 
      success: true,
      districtName: districtName.toUpperCase(),
      locations: locations, 
      kpi: kpi,
      gender: genderRes.rows,
      age: ageData,
      complications: complicationData,
      referral: referralRes.rows,
      caste: casteRes.rows,
      outcome: outcomeData
    });
    
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : "An unexpected dashboard operation failure occurred";
    console.error("Dashboard database transaction failed:", errorMsg);
    return NextResponse.json(
      { error: 'Database operations failed', details: errorMsg }, 
      { status: 500 }
    );
  }
}