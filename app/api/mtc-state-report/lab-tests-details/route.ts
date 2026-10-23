import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

// Section ID Map for Routine Data
const ROUTINE_SECTION_MAP: Record<number, string> = {
  1: "Amoxicillin / Antibiotics",
  2: "Mebendazole / Deworming",
  3: "Vitamin A",
  4: "Multivitamin",
  5: "Folic Acid",
  6: "Iron Syrup",
  7: "Zinc",
  8: "Magnesium",
  9: "Potassium",
  10: "Antifungal / Nystatin",
  19: "Other Routine Medicines",
};

// Section ID Map for Lab Data
const LAB_SECTION_MAP: Record<number, string> = {
  11: "Hemoglobin (Hb)",
  12: "Blood Sugar (RBS/FBS)",
  13: "Urine Routine & Microscopy",
  14: "Stool Test / Parasites",
  15: "Malaria Test (RDT/Smear)",
  16: "TB Screening / Mantoux",
  17: "Other Lab Investigations",
  18: "Chest X-Ray",
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const recordId = searchParams.get("recordId");
    const fromDate = searchParams.get("fromDate");
    const toDate = searchParams.get("toDate");
    const districtParams = searchParams.get("districts");
    const mtcParams = searchParams.get("mtc");

    // Single Record Full Detail Request
    if (recordId) {
      const detailSql = `
        SELECT 
          mn.id AS micronutrient_record_id,
          mn.child_id,
          m.sam_no,
          m.child_full_name,
          COALESCE(m.mother_name, m.father_name, m.guardian_name, 'N/A') AS parent_name,
          TO_CHAR(m.admission_date, 'DD-Mon-YYYY') AS admission_date_formatted,
          TO_CHAR(m.dob, 'DD-Mon-YYYY') AS dob_formatted,
          COALESCE(c.district, 'N/A') AS district_name,
          COALESCE(c.mtc_name, 'N/A') AS mtc_name,
          mn.routine_data,
          mn.lab_data,
          TO_CHAR(mn.created_at, 'DD-Mon-YYYY HH12:MI AM') AS created_at_formatted
        FROM public.mtc_micronutrients mn
        INNER JOIN public.mtc_child_master m ON mn.child_id = m.registration_id
        LEFT JOIN public.mtc_centers c ON m.mtc_id = c.mtc_id
        WHERE mn.id = $1
      `;

      const detailRes = await query(detailSql, [Number(recordId)]);

      if (detailRes.rows.length === 0) {
        return NextResponse.json({ success: false, error: "Record not found" }, { status: 404 });
      }

      const row = detailRes.rows[0];
      const parsedRoutine = typeof row.routine_data === "string" ? JSON.parse(row.routine_data) : row.routine_data || [];
      const parsedLab = typeof row.lab_data === "string" ? JSON.parse(row.lab_data) : row.lab_data || [];

      // Format full routine medicines with 30-day breakdown
      const fullRoutineBreakdown = parsedRoutine.map((item: any) => {
        const secId = Number(item.sectionId);
        const name = ROUTINE_SECTION_MAP[secId] || `Section #${secId}`;
        const days: number[] = [];
        for (let i = 0; i <= 29; i++) {
          days.push(item[`day${i}`] ?? 0);
        }
        return {
          sectionId: secId,
          name,
          days,
          otherRoutine: item.otherRoutine || "",
        };
      });

      // Format full lab tests
      const fullLabBreakdown = parsedLab.map((item: any) => {
        const secId = Number(item.sectionId);
        const name = LAB_SECTION_MAP[secId] || `Section #${secId}`;
        return {
          sectionId: secId,
          name,
          result: item.result || item.others || "-",
          tested: item.day0 === 1 || Boolean(item.result || item.others),
        };
      });

      return NextResponse.json({
        success: true,
        data: {
          recordId: row.micronutrient_record_id,
          childId: row.child_id,
          samNo: row.sam_no || "-",
          childName: row.child_full_name || "-",
          parentName: row.parent_name || "-",
          districtName: row.district_name || "-",
          mtcName: row.mtc_name || "-",
          admissionDate: row.admission_date_formatted || "-",
          dobDate: row.dob_formatted || "-",
          createdAt: row.created_at_formatted || "-",
          routineBreakdown: fullRoutineBreakdown,
          labBreakdown: fullLabBreakdown,
        },
      });
    }

    // List Query with Filters
    let whereClauses: string[] = [];
    let queryParams: any[] = [];
    let paramIndex = 1;

    if (fromDate) {
      whereClauses.push(`m.admission_date >= $${paramIndex}::DATE`);
      queryParams.push(fromDate);
      paramIndex++;
    }

    if (toDate) {
      whereClauses.push(`m.admission_date <= $${paramIndex}::DATE`);
      queryParams.push(toDate);
      paramIndex++;
    }

    if (districtParams && districtParams.trim() !== "") {
      const districtsList = districtParams.split(",").map((d) => d.trim().toUpperCase()).filter(Boolean);
      if (districtsList.length > 0) {
        whereClauses.push(`UPPER(c.district) = ANY($${paramIndex})`);
        queryParams.push(districtsList);
        paramIndex++;
      }
    }

    if (mtcParams && mtcParams.trim() !== "") {
      const mtcList = mtcParams.split(",").map((m) => m.trim().toUpperCase()).filter(Boolean);
      if (mtcList.length > 0) {
        whereClauses.push(`UPPER(c.mtc_name) = ANY($${paramIndex})`);
        queryParams.push(mtcList);
        paramIndex++;
      }
    }

    const whereString = whereClauses.length > 0 ? `WHERE ${whereClauses.join(" AND ")}` : "";

    const sqlText = `
      SELECT 
        mn.id AS micronutrient_record_id,
        mn.child_id,
        m.sam_no,
        m.child_full_name,
        COALESCE(m.mother_name, m.father_name, m.guardian_name, 'N/A') AS parent_name,
        TO_CHAR(m.admission_date, 'DD-Mon-YYYY') AS admission_date_formatted,
        COALESCE(c.district, 'N/A') AS district_name,
        COALESCE(c.mtc_name, 'N/A') AS mtc_name,
        mn.routine_data,
        mn.lab_data,
        TO_CHAR(mn.created_at, 'DD-Mon-YYYY HH12:MI AM') AS created_at_formatted
      FROM public.mtc_micronutrients mn
      INNER JOIN public.mtc_child_master m ON mn.child_id = m.registration_id
      LEFT JOIN public.mtc_centers c ON m.mtc_id = c.mtc_id
      ${whereString}
      ORDER BY mn.created_at DESC, mn.id DESC
    `;

    const res = await query(sqlText, queryParams);

    const processedRows: any[] = [];

    res.rows.forEach((row: any) => {
      let parsedRoutine: any[] = [];
      let parsedLab: any[] = [];

      try {
        parsedRoutine = typeof row.routine_data === "string" ? JSON.parse(row.routine_data) : row.routine_data || [];
      } catch (err) {}

      try {
        parsedLab = typeof row.lab_data === "string" ? JSON.parse(row.lab_data) : row.lab_data || [];
      } catch (err) {}

      let labCount = parsedLab.filter((l: any) => l.day0 === 1 || Boolean(l.result || l.others)).length;
      let routineCount = 0;

      parsedRoutine.forEach((item: any) => {
        for (let i = 0; i <= 29; i++) {
          if (item[`day${i}`] === 1) routineCount++;
        }
      });

      processedRows.push({
        recordId: row.micronutrient_record_id.toString(),
        childId: row.child_id.toString(),
        samNo: row.sam_no || "-",
        childName: row.child_full_name || "-",
        parentName: row.parent_name || "-",
        districtName: row.district_name || "-",
        mtcName: row.mtc_name || "-",
        totalLabTests: `${labCount} Tests Performed`,
        totalMedicinesGiven: `${routineCount} Administered Doses`,
        admissionDate: row.admission_date_formatted || "-",
        createdDate: row.created_at_formatted || "-",
      });
    });

    return NextResponse.json({
      success: true,
      count: processedRows.length,
      data: processedRows,
    });
  } catch (error: any) {
    console.error("Laboratory Tests Details API Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch laboratory tests report", details: error.message },
      { status: 500 }
    );
  }
}