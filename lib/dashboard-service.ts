// // lib\dashboard-service.ts

// import sql from 'mssql';
// import { getDBConnection } from './db'; // Ensure this path points to your existing db.ts

// export async function getDashboardStats(fromDate: string, toDate: string) {
//   const db = await getDBConnection();

//   try {
//     // 1. KPI Aggregate Data
//     // Note: Adjust ExitIndicator IDs based on your actual master table (1=Cured, 2=Defaulter, 3=Transfer, 4=Death, etc.)
//     const kpiQuery = `
//       SELECT 
//         COUNT(*) as TotalAdmissions,
//         SUM(CASE WHEN DischargeDate IS NOT NULL THEN 1 ELSE 0 END) as TotalExits,
//         SUM(CASE WHEN ExitIndicator = 1 THEN 1 ELSE 0 END) as TotalCured,
//         SUM(CASE WHEN ExitIndicator = 2 THEN 1 ELSE 0 END) as TotalDefaulters,
//         SUM(CASE WHEN ExitIndicator = 4 THEN 1 ELSE 0 END) as TotalDeaths,
        
//         -- Avg Weight Gain: (DischargeWeight - AdmissionWeight) / (AdmissionWeight in kg) / Days
//         -- Simplified logic: Average Grams gained per day
//         AVG(CASE 
//           WHEN DischargeWeight > AdmissionWeight AND DATEDIFF(day, AdmissionDate, DischargeDate) > 0 
//           THEN ((DischargeWeight - AdmissionWeight) * 1000) / NULLIF(DATEDIFF(day, AdmissionDate, DischargeDate), 0)
//           ELSE 0 
//         END) as AvgWeightGain,

//         AVG(CASE 
//           WHEN DischargeDate IS NOT NULL 
//           THEN DATEDIFF(day, AdmissionDate, DischargeDate) 
//           ELSE 0 
//         END) as AvgStay
//       FROM [MTCJharkhand].[dbo].[MTCSAMChildren]
//       WHERE AdmissionDate BETWEEN @fromDate AND @toDate
//     `;

//     // 2. Gender Distribution
//     const genderQuery = `
//       SELECT 
//         g.GenderName as name,
//         COUNT(s.SamNo) as value
//       FROM [MTCJharkhand].[dbo].[MTCSAMChildren] s
//       LEFT JOIN [MTCJharkhand].[dbo].[MTCGender] g ON s.GenderId = g.GenderId
//       WHERE s.AdmissionDate BETWEEN @fromDate AND @toDate
//       GROUP BY g.GenderName
//     `;

//     // 3. Age Group (Logic: 0-6m, 6-24m, 24-36m, >36m)
//     const ageQuery = `
//       SELECT 
//         AgeGroup as name,
//         COUNT(*) as value
//       FROM (
//         SELECT 
//           CASE 
//             WHEN DATEDIFF(month, DateofBirth, AdmissionDate) < 6 THEN '0-6M'
//             WHEN DATEDIFF(month, DateofBirth, AdmissionDate) BETWEEN 6 AND 24 THEN '6-24M'
//             WHEN DATEDIFF(month, DateofBirth, AdmissionDate) BETWEEN 25 AND 36 THEN '24-36M'
//             ELSE '>36M'
//           END as AgeGroup
//         FROM [MTCJharkhand].[dbo].[MTCSAMChildren]
//         WHERE AdmissionDate BETWEEN @fromDate AND @toDate
//       ) as GroupedData
//       GROUP BY AgeGroup
//     `;

//     // 4. Caste Distribution
//     const casteQuery = `
//       SELECT 
//         c.CastName as name,
//         COUNT(s.SamNo) as value
//       FROM [MTCJharkhand].[dbo].[MTCSAMChildren] s
//       LEFT JOIN [MTCJharkhand].[dbo].[MTCCasts] c ON s.CastId = c.CastId
//       WHERE s.AdmissionDate BETWEEN @fromDate AND @toDate
//       GROUP BY c.CastName
//     `;

//     // 5. Outcome Indicators (Using ExitIndicator)
//     // Assuming table [MTCExitIndicator] exists, otherwise mapping manually
//     const outcomeQuery = `
//       SELECT 
//         CASE 
//           WHEN ExitIndicator = 1 THEN 'Cured'
//           WHEN ExitIndicator = 2 THEN 'Defaulter'
//           WHEN ExitIndicator = 3 THEN 'Transfer'
//           WHEN ExitIndicator = 4 THEN 'Death'
//           WHEN ExitIndicator = 5 THEN 'Non Resp.'
//           ELSE 'Unknown'
//         END as name,
//         COUNT(*) as value
//       FROM [MTCJharkhand].[dbo].[MTCSAMChildren]
//       WHERE DischargeDate IS NOT NULL 
//       AND AdmissionDate BETWEEN @fromDate AND @toDate
//       GROUP BY ExitIndicator
//     `;

//     // 6. Referral Source
//     // Assuming [MTCReferer] table exists
//     const referralQuery = `
//       SELECT 
//         r.RefererName as name,
//         COUNT(s.SamNo) as value
//       FROM [MTCJharkhand].[dbo].[MTCSAMChildren] s
//       LEFT JOIN [MTCJharkhand].[dbo].[MTCReferer] r ON s.RefererId = r.RefererId
//       WHERE s.AdmissionDate BETWEEN @fromDate AND @toDate
//       GROUP BY r.RefererName
//     `;

//     // 7. Complications
//     // Logic: If MedicalComplication column is NULL or empty -> 'Non Complicated', else 'Complicated'
//     const complicationQuery = `
//       SELECT 
//         CASE 
//           WHEN MedicalComplication IS NULL OR LEN(MedicalComplication) = 0 THEN 'Non Complicated' 
//           ELSE 'Complicated' 
//         END as name,
//         COUNT(*) as value
//       FROM [MTCJharkhand].[dbo].[MTCSAMChildren]
//       WHERE AdmissionDate BETWEEN @fromDate AND @toDate
//       GROUP BY 
//         CASE 
//           WHEN MedicalComplication IS NULL OR LEN(MedicalComplication) = 0 THEN 'Non Complicated' 
//           ELSE 'Complicated' 
//         END
//     `;

//     const request = db.request();
//     request.input('fromDate', sql.Date, new Date(fromDate));
//     request.input('toDate', sql.Date, new Date(toDate));

//     const [kpiRes, genderRes, ageRes, casteRes, outcomeRes, referRes, compRes] = await Promise.all([
//       request.query(kpiQuery),
//       request.query(genderQuery),
//       request.query(ageQuery),
//       request.query(casteQuery),
//       request.query(outcomeQuery),
//       request.query(referralQuery),
//       request.query(complicationQuery)
//     ]);

//     return {
//       kpi: kpiRes.recordset[0],
//       gender: genderRes.recordset,
//       age: ageRes.recordset,
//       caste: casteRes.recordset,
//       outcome: outcomeRes.recordset,
//       referral: referRes.recordset,
//       complications: compRes.recordset
//     };

//   } catch (error) {
//     console.error("❌ Dashboard Stats Error:", error);
//     throw error;
//   }
// }