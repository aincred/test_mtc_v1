// // // // // import { NextResponse } from 'next/server';
// // // // // import { query } from '@/lib/db';

// // // // // export async function PUT(
// // // // //   request: Request, 
// // // // //   { params }: { params: Promise<{ id: string }> }
// // // // // ) {
// // // // //   try {
// // // // //     const { id } = await params;
// // // // //     const data = await request.json();

// // // // //     const sqlText = `
// // // // //       UPDATE mtc_child_master SET
// // // // //         discharge_date = $1,
// // // // //         discharge_weight_kg = $2,
// // // // //         discharge_height_cm = $3,
// // // // //         discharge_muac_cm = $4,
// // // // //         outcome_indicator_id = $5,
// // // // //         discharge_edema_id = $6,
// // // // //         hemoglobin_mother = $7,
// // // // //         ifa_given_to_mother = $8,
// // // // //         mother_wages_compensation = $9,
// // // // //         ifa_syrup_to_child = $10,
// // // // //         discharge_photo_path = $11,
// // // // //         updated_at = CURRENT_TIMESTAMP
// // // // //       WHERE registration_id = $12
// // // // //       RETURNING registration_id;
// // // // //     `;

// // // // //     const values = [
// // // // //       data.DischargeDate,
// // // // //       data.DischargeWeight,
// // // // //       data.DischargeHeight,
// // // // //       data.DischargeMuac,
// // // // //       data.OutcomeIndicator,
// // // // //       data.DischargeEdema,
// // // // //       data.HemoglobinMother,
// // // // //       data.IfaGivenToMother,
// // // // //       data.MotherWages,
// // // // //       data.IfaSyrupToChild,
// // // // //       data.DischargePhoto, // (Base64 string or URL)
// // // // //       id
// // // // //     ];

// // // // //     const result = await query(sqlText, values);

// // // // //     if (result.rowCount === 0) {
// // // // //       return NextResponse.json({ success: false, message: 'Child record not found' }, { status: 404 });
// // // // //     }

// // // // //     return NextResponse.json({ success: true, message: 'Discharged successfully' }, { status: 200 });

// // // // //   } catch (error) {
// // // // //     console.error('Save Discharge Error:', error);
// // // // //     return NextResponse.json({ success: false, error: 'Database update failed' }, { status: 500 });
// // // // //   }
// // // // // }


// // // // // app\api\discharge-child\[id]\route.ts
// // // // import { NextResponse } from 'next/server';
// // // // import { query } from '@/lib/db';

// // // // export async function PUT(
// // // //   request: Request, 
// // // //   { params }: { params: Promise<{ id: string }> }
// // // // ) {
// // // //   try {
// // // //     const { id } = await params;
// // // //     const data = await request.json();

// // // //     const sqlText = `
// // // //       UPDATE mtc_child_master SET
// // // //         discharge_date = $1,
// // // //         discharge_weight_kg = $2,
// // // //         discharge_height_cm = $3,
// // // //         discharge_muac_cm = $4,
// // // //         discharge_edema_id = $5,
// // // //         outcome_indicator_id = $6,
// // // //         hemoglobin_mother = $7,
// // // //         ifa_given_to_mother = $8,
// // // //         mother_payment_wages = $9,
// // // //         ifa_syrup_to_child = $10,
// // // //         total_stay_days = $11,
// // // //         minimum_weight_kg = $12,
// // // //         discharge_image_path = $13,
// // // //         updated_at = CURRENT_TIMESTAMP
// // // //       WHERE registration_id = $14
// // // //       RETURNING registration_id;
// // // //     `;

// // // //     const values = [
// // // //       data.DischargeDate,
// // // //       data.DischargeWeight,
// // // //       data.DischargeHeight,
// // // //       data.DischargeMuac,
// // // //       data.DischargeEdema,
// // // //       data.ExitIndicator,
// // // //       data.HemoglobinMother,
// // // //       data.IFAToMotherTablet,
// // // //       data.MotherWages,
// // // //       data.IFAToMotherSyrup,
// // // //       data.TotalStay,
// // // //       data.MinimumWeight,
// // // //       data.DischargeImage, // Consider saving to S3/AWS and storing the URL here instead of base64
// // // //       id
// // // //     ];

// // // //     const result = await query(sqlText, values);

// // // //     if (result.rowCount === 0) {
// // // //       return NextResponse.json({ success: false, message: 'Child record not found' }, { status: 404 });
// // // //     }

// // // //     return NextResponse.json({ success: true, message: 'Discharge data saved successfully' }, { status: 200 });

// // // //   } catch (error) {
// // // //     console.error('Save Discharge Error:', error);
// // // //     return NextResponse.json({ success: false, error: 'Database update failed' }, { status: 500 });
// // // //   }
// // // // }


// // // import { NextResponse } from 'next/server';
// // // import { query } from '@/lib/db';

// // // export async function PUT(
// // //   request: Request, 
// // //   { params }: { params: Promise<{ id: string }> }
// // // ) {
// // //   try {
// // //     const { id } = await params;
// // //     const data = await request.json();

// // //     // =========================================================================
// // //     // 1. UPDATE LOCAL POSTGRESQL DATABASE
// // //     // =========================================================================
// // //     const sqlText = `
// // //       UPDATE mtc_child_master SET
// // //         discharge_date = $1,
// // //         discharge_weight_kg = $2,
// // //         discharge_height_cm = $3,
// // //         discharge_muac_cm = $4,
// // //         discharge_edema_id = $5,
// // //         outcome_indicator_id = $6,
// // //         hemoglobin_mother = $7,
// // //         ifa_given_to_mother = $8,
// // //         mother_payment_wages = $9,
// // //         ifa_syrup_to_child = $10,
// // //         total_stay_days = $11,
// // //         minimum_weight_kg = $12,
// // //         discharge_image_path = $13,
// // //         updated_at = CURRENT_TIMESTAMP
// // //       WHERE registration_id = $14
// // //       RETURNING registration_id;
// // //     `;

// // //     const values = [
// // //       data.DischargeDate,
// // //       data.DischargeWeight,
// // //       data.DischargeHeight,
// // //       data.DischargeMuac,
// // //       data.DischargeEdema,
// // //       data.ExitIndicator,
// // //       data.HemoglobinMother,
// // //       data.IFAToMotherTablet,
// // //       data.MotherWages,
// // //       data.IFAToMotherSyrup,
// // //       data.TotalStay,
// // //       data.MinimumWeight,
// // //       data.DischargeImage, 
// // //       id
// // //     ];

// // //     const result = await query(sqlText, values);

// // //     if (result.rowCount === 0) {
// // //       return NextResponse.json({ success: false, message: 'Child record not found' }, { status: 404 });
// // //     }

// // //     // =========================================================================
// // //     // 2. SYNC WITH EXTERNAL SAAMAR API (JHARKHAND NHM)
// // //     // =========================================================================
// // //     let saamarSynced = false;
    
// // //     try {
// // //       // Map your data to the exact parameters expected by the SAAMAR endpoint
// // //       const saamarPayload = {
// // //         uuidChild: data.uuidChild || data.SamNo, // Passes the unique ID required by SAAMAR
// // //         MTCStatus: "Discharged",
// // //         DischargeDate: data.DischargeDate,
// // //         OutcomeIndicator: data.ExitIndicator,
// // //         DischargeWeight: data.DischargeWeight
// // //       };

// // //       const saamarResponse = await fetch("https://apisaamar.jharkhand.gov.in/Service.asmx/InsertChildMtcReferStatus", {
// // //         method: "POST",
// // //         headers: {
// // //           "Content-Type": "application/json; charset=utf-8",
// // //         },
// // //         body: JSON.stringify(saamarPayload) 
// // //       });

// // //       if (saamarResponse.ok) {
// // //         saamarSynced = true;
// // //       } else {
// // //         console.warn(`SAAMAR Sync returned non-200 status: ${saamarResponse.status}`);
// // //       }

// // //     } catch (externalError) {
// // //       // Caught separately so external downtime DOES NOT crash the local DB success
// // //       console.error("SAAMAR Sync failed (Server might be down):", externalError);
// // //     }

// // //     // =========================================================================
// // //     // 3. RETURN FINAL RESPONSE
// // //     // =========================================================================
// // //     return NextResponse.json({ 
// // //       success: true, 
// // //       message: 'Discharge data saved successfully',
// // //       saamarSynced: saamarSynced // Sent to frontend to display the correct toast message
// // //     }, { status: 200 });

// // //   } catch (error) {
// // //     console.error('Save Discharge Error:', error);
// // //     return NextResponse.json({ success: false, error: 'Database update failed' }, { status: 500 });
// // //   }
// // // }

// // import { NextResponse } from 'next/server';
// // import { query } from '@/lib/db';

// // export async function PUT(
// //   request: Request, 
// //   { params }: { params: Promise<{ id: string }> }
// // ) {
// //   try {
// //     const { id } = await params;
// //     const data = await request.json();

// //     // =========================================================================
// //     // 1. UPDATE LOCAL POSTGRESQL DATABASE
// //     // =========================================================================
// //     const sqlText = `
// //       UPDATE mtc_child_master SET
// //         discharge_date = $1,
// //         discharge_weight_kg = $2,
// //         discharge_height_cm = $3,
// //         discharge_muac_cm = $4,
// //         discharge_edema_id = $5,
// //         outcome_indicator_id = $6,
// //         hemoglobin_mother = $7,
// //         ifa_given_to_mother = $8,
// //         mother_payment_wages = $9,
// //         ifa_syrup_to_child = $10,
// //         total_stay_days = $11,
// //         minimum_weight_kg = $12,
// //         discharge_image_path = $13,
// //         updated_at = CURRENT_TIMESTAMP
// //       WHERE registration_id = $14
// //       RETURNING registration_id;
// //     `;

// //     const values = [
// //       data.DischargeDate,
// //       data.DischargeWeight,
// //       data.DischargeHeight,
// //       data.DischargeMuac,
// //       data.DischargeEdema,
// //       data.ExitIndicator,
// //       data.HemoglobinMother,
// //       data.IFAToMotherTablet,
// //       data.MotherWages,
// //       data.IFAToMotherSyrup,
// //       data.TotalStay,
// //       data.MinimumWeight,
// //       data.DischargeImage, 
// //       id
// //     ];

// //     const result = await query(sqlText, values);

// //     if (result.rowCount === 0) {
// //       return NextResponse.json({ success: false, message: 'Child record not found' }, { status: 404 });
// //     }

// //     // =========================================================================
// //     // 2. SYNC WITH EXTERNAL SAAMAR API (ONLY IF SAAMAR CHILD)
// //     // =========================================================================
// //     let saamarSynced = false;
    
// //     // ✅ Only attempt to sync if the frontend sent a valid SAAMAR UUID
// //     if (data.uuidChild) {
// //       try {
// //         const saamarPayload = {
// //           uuidChild: data.uuidChild, 
// //           MTCStatus: "Discharged",
// //           DischargeDate: data.DischargeDate,
// //           OutcomeIndicator: data.ExitIndicator,
// //           DischargeWeight: data.DischargeWeight
// //         };

// //         const saamarResponse = await fetch("https://apisaamar.jharkhand.gov.in/Service.asmx?op=InsertChildMtcReferStatus", {
// //           method: "POST",
// //           headers: {
// //             "Content-Type": "application/json; charset=utf-8",
// //           },
// //           body: JSON.stringify(saamarPayload) 
// //         });

// //         if (saamarResponse.ok) {
// //           saamarSynced = true;
// //         } else {
// //           console.warn(`SAAMAR Sync returned non-200 status: ${saamarResponse.status}`);
// //         }

// //       } catch (externalError) {
// //         // Caught separately so external downtime DOES NOT crash the local DB success
// //         console.error("SAAMAR Sync failed (Server might be down):", externalError);
// //       }
// //     }

// //     // =========================================================================
// //     // 3. RETURN FINAL RESPONSE
// //     // =========================================================================
// //     return NextResponse.json({ 
// //       success: true, 
// //       message: 'Discharge data saved successfully',
// //       saamarSynced: saamarSynced 
// //     }, { status: 200 });

// //   } catch (error) {
// //     console.error('Save Discharge Error:', error);
// //     return NextResponse.json({ success: false, error: 'Database update failed' }, { status: 500 });
// //   }
// // }

// import { NextResponse } from 'next/server';
// import { query } from '@/lib/db';

// export async function PUT(
//   request: Request, 
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   try {
//     const { id } = await params;
//     const data = await request.json();

//     // =========================================================================
//     // 1. UPDATE LOCAL POSTGRESQL DATABASE
//     // =========================================================================
//     const updateSql = `
//       UPDATE mtc_child_master SET
//         discharge_date = $1,
//         discharge_weight_kg = $2,
//         discharge_height_cm = $3,
//         discharge_muac_cm = $4,
//         discharge_edema_id = $5,
//         outcome_indicator_id = $6,
//         hemoglobin_mother = $7,
//         ifa_given_to_mother = $8,
//         mother_payment_wages = $9,
//         ifa_syrup_to_child = $10,
//         total_stay_days = $11,
//         minimum_weight_kg = $12,
//         discharge_image_path = $13,
//         updated_at = CURRENT_TIMESTAMP
//       WHERE registration_id = $14
//       RETURNING registration_id;
//     `;

//     const values = [
//       data.DischargeDate,
//       data.DischargeWeight,
//       data.DischargeHeight,
//       data.DischargeMuac,
//       data.DischargeEdema,
//       data.ExitIndicator,
//       data.HemoglobinMother,
//       data.IFAToMotherTablet,
//       data.MotherWages,
//       data.IFAToMotherSyrup,
//       data.TotalStay,
//       data.MinimumWeight,
//       data.DischargeImage, 
//       id
//     ];

//     const result = await query(updateSql, values);

//     if (result.rowCount === 0) {
//       return NextResponse.json({ success: false, message: 'Child record not found' }, { status: 404 });
//     }

//     // =========================================================================
//     // 2. FETCH FULL CHILD DATA & SYNC WITH SAAMAR API (IF SAAMAR CHILD)
//     // =========================================================================
//     let saamarSynced = false;
    
//     // ✅ Only attempt to sync if the frontend sent a valid SAAMAR UUID
//     if (data.uuidChild) {
//       try {
//         // Fetch the child's historical admission data to fulfill SAAMAR payload requirements
//         const childQuery = `SELECT * FROM mtc_child_master WHERE registration_id = $1`;
//         const childRes = await query(childQuery, [id]);
        
//         if (childRes.rows.length > 0) {
//             const c = childRes.rows[0];
//             const currentDate = new Date().toISOString();

//             // ✅ Map data EXACTLY as required by the SAAMAR API 
//             const saamarPayload = {
//               uuidChild: data.uuidChild, 
//               uuidAwc: c.uuid_awc || "", // Fallback if missing
//               NameOfChild: c.child_full_name || "",
//               Age: c.age_months?.toString() || "",
//               Gender: c.sex_id?.toString() || "",
//               AdmitDate: c.admission_date ? new Date(c.admission_date).toISOString().split('T')[0] : "",
//               ReferredBy: c.referred_by_id?.toString() || "",
//               AdmissionType: c.admission_type_id?.toString() || "",
//               DateOfBirth: c.dob ? new Date(c.dob).toISOString().split('T')[0] : "",
//               ParentName: c.guardian_name || "",
//               Caste: c.caste_id?.toString() || "",
//               AwcName: c.anganwadi_id?.toString() || "", // Map to actual name if JOIN available
//               AwcSevikaName: c.referred_by_name || "",
//               AwcSevikaMobileNo: c.referred_by_mobile || "",
//               AdmitWeight: c.admission_weight_kg?.toString() || "",
//               AdmitLengthHeight: c.length_height_cm?.toString() || "",
              
//               // Discharge Metrics directly from the current request
//               DischargeWeight: data.DischargeWeight?.toString() || "",
//               DischargeLengthHeight: data.DischargeHeight?.toString() || "",
//               MUAC: data.DischargeMuac?.toString() || "",
//               ZScore: data.DischargeZScore?.toString() || "",
              
//               // Medical Indicators
//               AdmissionEdema: c.odema_id?.toString() || "",
//               BreastfeedingStatus: c.breast_feeding_id?.toString() || "",
//               ComplementaryFeedingStatus: c.complementary_feeding ? "1" : "0",
//               AppetiteTestResult: c.appetite_test_id?.toString() || "",
//               MedicalComplicationsMarkResult: Array.isArray(c.medical_complications) ? c.medical_complications.join(',') : "",
              
//               // Status & Identifiers
//               MTCStatus: "Discharged",
//               MtcId: c.mtc_id?.toString() || "",
//               DischargeDate: data.DischargeDate || "",
//               DistrictName: c.district_id?.toString() || "",
//               MtcName: "", // Fill if you have MTC Name in DB
//               AppEntryDate: currentDate,
//               ServerEntryDate: currentDate
//             };

//             // ✅ Invoke the SAAMAR Link
//             const saamarResponse = await fetch("https://apisaamar.jharkhand.gov.in/Service.asmx/InsertChildMtcReferStatus", {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/json; charset=utf-8",
//               },
//               body: JSON.stringify(saamarPayload) 
//             });

//             if (saamarResponse.ok) {
//               saamarSynced = true;
//             } else {
//               console.warn(`SAAMAR Sync returned non-200 status: ${saamarResponse.status}`);
//             }
//         }
//       } catch (externalError) {
//         // Caught separately so external downtime DOES NOT crash your local application
//         console.error("SAAMAR Sync failed (Server might be down):", externalError);
//       }
//     }

//     // =========================================================================
//     // 3. RETURN FINAL RESPONSE
//     // =========================================================================
//     return NextResponse.json({ 
//       success: true, 
//       message: 'Discharge data saved successfully',
//       saamarSynced: saamarSynced 
//     }, { status: 200 });

//   } catch (error) {
//     console.error('Save Discharge Error:', error);
//     return NextResponse.json({ success: false, error: 'Database update failed' }, { status: 500 });
//   }
// }

import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

interface MtcChildMasterRow {
  uuid_awc?: string | null;
  child_full_name?: string | null;
  age_months?: number | string | null;
  sex_id?: number | string | null;
  admission_date?: string | number | Date | null;
  referred_by_id?: number | string | null;
  admission_type_id?: number | string | null;
  dob?: string | number | Date | null;
  guardian_name?: string | null;
  caste_id?: number | string | null;
  anganwadi_id?: number | string | null;
  referred_by_name?: string | null;
  referred_by_mobile?: string | null;
  admission_weight_kg?: number | string | null;
  length_height_cm?: number | string | null;
  odema_id?: number | string | null;
  breast_feeding_id?: number | string | null;
  complementary_feeding?: boolean | null;
  appetite_test_id?: number | string | null;
  medical_complications?: string | string[] | null;
  mtc_id?: number | string | null;
  district_id?: number | string | null;
}

export async function PUT(
  request: Request, 
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();

    // =========================================================================
    // 1. UPDATE LOCAL POSTGRESQL DATABASE
    // =========================================================================
    const updateSql = `
      UPDATE mtc_child_master SET
        discharge_date = $1,
        discharge_weight_kg = $2,
        discharge_height_cm = $3,
        discharge_muac_cm = $4,
        discharge_edema_id = $5,
        outcome_indicator_id = $6,
        hemoglobin_mother = $7,
        ifa_given_to_mother = $8,
        mother_payment_wages = $9,
        ifa_syrup_to_child = $10,
        total_stay_days = $11,
        minimum_weight_kg = $12,
        discharge_image_path = $13,
        updated_at = CURRENT_TIMESTAMP
      WHERE registration_id = $14
      RETURNING registration_id;
    `;

    const values = [
      data.DischargeDate,
      data.DischargeWeight,
      data.DischargeHeight,
      data.DischargeMuac,
      data.DischargeEdema,
      data.ExitIndicator,
      data.HemoglobinMother,
      data.IFAToMotherTablet,
      data.MotherWages,
      data.IFAToMotherSyrup,
      data.TotalStay,
      data.MinimumWeight,
      data.DischargeImage, 
      id
    ];

    const result = await query(updateSql, values);

    if (result.rowCount === 0) {
      return NextResponse.json({ success: false, message: 'Child record not found' }, { status: 404 });
    }

    // =========================================================================
    // 2. FETCH FULL CHILD DATA & SYNC WITH SAAMAR API (IF SAAMAR CHILD)
    // =========================================================================
    let saamarSynced = false;
    
    // ✅ Only attempt to sync if the frontend sent a valid SAAMAR UUID
    if (data.uuidChild) {
      try {
        // Fetch the child's historical admission data to fulfill SAAMAR payload requirements
        const childQuery = `SELECT * FROM mtc_child_master WHERE registration_id = $1`;
        const childRes = await query<MtcChildMasterRow>(childQuery, [id]);
        
        if (childRes.rows.length > 0) {
            const c = childRes.rows[0];
            const currentDate = new Date().toISOString();

            // ✅ Map data EXACTLY as required by the SAAMAR API 
            const saamarPayload = {
              uuidChild: data.uuidChild, 
              uuidAwc: c.uuid_awc || "", 
              NameOfChild: c.child_full_name || "",
              Age: c.age_months?.toString() || "",
              Gender: c.sex_id?.toString() || "",
              AdmitDate: c.admission_date ? new Date(c.admission_date).toISOString().split('T')[0] : "",
              ReferredBy: c.referred_by_id?.toString() || "",
              AdmissionType: c.admission_type_id?.toString() || "",
              DateOfBirth: c.dob ? new Date(c.dob).toISOString().split('T')[0] : "",
              ParentName: c.guardian_name || "",
              Caste: c.caste_id?.toString() || "",
              AwcName: c.anganwadi_id?.toString() || "", 
              AwcSevikaName: c.referred_by_name || "",
              AwcSevikaMobileNo: c.referred_by_mobile || "",
              AdmitWeight: c.admission_weight_kg?.toString() || "",
              AdmitLengthHeight: c.length_height_cm?.toString() || "",
              
              // Discharge Metrics directly from the current request
              DischargeWeight: data.DischargeWeight?.toString() || "",
              DischargeLengthHeight: data.DischargeHeight?.toString() || "",
              MUAC: data.DischargeMuac?.toString() || "",
              ZScore: data.DischargeZScore?.toString() || "",
              
              // Medical Indicators
              AdmissionEdema: c.odema_id?.toString() || "",
              BreastfeedingStatus: c.breast_feeding_id?.toString() || "",
              ComplementaryFeedingStatus: c.complementary_feeding ? "1" : "0",
              AppetiteTestResult: c.appetite_test_id?.toString() || "",
              MedicalComplicationsMarkResult: Array.isArray(c.medical_complications) ? c.medical_complications.join(',') : (c.medical_complications || ""),
              
              // Status & Identifiers
              MTCStatus: "Discharged",
              MtcId: c.mtc_id?.toString() || "",
              DischargeDate: data.DischargeDate || "",
              DistrictName: c.district_id?.toString() || "",
              MtcName: "", 
              AppEntryDate: currentDate,
              ServerEntryDate: currentDate
            };

            // ✅ Invoke the SAAMAR Link
            const saamarResponse = await fetch("https://apisaamar.jharkhand.gov.in/Service.asmx/InsertChildMtcReferStatus", {
              method: "POST",
              headers: {
                "Content-Type": "application/json; charset=utf-8",
              },
              body: JSON.stringify(saamarPayload) 
            });

            if (saamarResponse.ok) {
              saamarSynced = true;
            } else {
              console.warn(`SAAMAR Sync returned non-200 status: ${saamarResponse.status}`);
            }
        }
      } catch (externalError) {
        console.error("SAAMAR Sync failed (Server might be down):", externalError);
      }
    }

    // =========================================================================
    // 3. RETURN FINAL RESPONSE
    // =========================================================================
    return NextResponse.json({ 
      success: true, 
      message: 'Discharge data saved successfully',
      saamarSynced: saamarSynced 
    }, { status: 200 });

  } catch (error) {
    console.error('Save Discharge Error:', error);
    return NextResponse.json({ success: false, error: 'Database update failed' }, { status: 500 });
  }
}