// // // import { NextResponse } from "next/server";
// // // import { getChildBySamNo } from "@/lib/db";

// // // export async function GET(
// // //   request: Request,
// // //   { params }: { params: Promise<{ id: string }> } // Fix for Next.js 15
// // // ) {
// // //   try {
// // //     const { id } = await params;
    
// // //     // Decode the ID (e.g. "JH%2FWSB" -> "JH/WSB")
// // //     const samNo = decodeURIComponent(id);
    
// // //     const child = await getChildBySamNo(samNo);

// // //     if (!child) {
// // //       return NextResponse.json(
// // //         { success: false, message: "Child not found" },
// // //         { status: 404 }
// // //       );
// // //     }

// // //     return NextResponse.json({
// // //       success: true,
// // //       data: child
// // //     });
// // //   } catch (error: any) {
// // //     console.error("API Error:", error);
// // //     return NextResponse.json(
// // //       { success: false, message: "Server error" },
// // //       { status: 500 }
// // //     );
// // //   }
// // // }

// // // app/api/child
// // import { NextResponse } from "next/server";
// // import { getChildBySamNo } from "@/lib/db";

// // export async function GET(
// //   request: Request,
// //   { params }: { params: Promise<{ id: string }> } // Fix for Next.js 15
// // ) {
// //   try {
// //     const { id } = await params;
    
// //     // Decode the ID (e.g. "JH%2FWSB" -> "JH/WSB")
// //     const samNo = decodeURIComponent(id);
    
// //     const child = await getChildBySamNo(samNo);

// //     if (!child) {
// //       return NextResponse.json(
// //         { success: false, message: "Child not found" },
// //         { status: 404 }
// //       );
// //     }

// //     return NextResponse.json({
// //       success: true,
// //       data: child
// //     });
// //   } catch (error: unknown) { // Changed from 'any' to 'unknown'
// //     console.error("API Error:", error);
// //     return NextResponse.json(
// //       { success: false, message: "Server error" },
// //       { status: 500 }
// //     );
// //   }
// // }

// import { NextResponse } from "next/server";
// import { getChildForEdit, updateChildRegistration } from "@/lib/db";
// import { writeFile, mkdir } from "fs/promises";
// import path from "path";

// // Fix for Next.js 15: Params are promises
// export async function GET(
//   request: Request,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   try {
//     const { id } = await params;
//     const samNo = decodeURIComponent(id);

//     const child = await getChildForEdit(samNo);

//     if (!child) {
//       return NextResponse.json({ success: false, message: "Child not found" }, { status: 404 });
//     }

//     // Map DB columns to Frontend State keys
//     const mappedData = {
//       id: child.SamNo, // using SamNo as ID
//       samNumber: child.SamNo,
//       admissionType: child.AtId?.toString() || "1",
//       referredBy: child.RefererId?.toString() || "",
//       childName: child.ChildName,
//       parentName: child.FatherName || child.MotherName,
//       relationship: child.FatherName ? "1" : "2", // Simple guess
//       mobileNumber: child.MobileNumber,
//       bplNumber: child.BPLNo,
//       dateOfBirth: child.DateofBirth,
//       sex: child.GenderId?.toString(),
//       address: child.Address,
//       caste: child.CastId?.toString(),
//       district: child.DistrictId?.toString(),
//       block: child.BlockId?.toString(),
//       icdsProject: child.ICDSId?.toString(),
//       anganwadiCenter: child.AnganwadiId?.toString(),
//       village: child.VillageName,
//       admissionDate: child.AdmissionDate,
//       admissionTime: new Date(child.AdmissionDate).toTimeString().substring(0,5), // Extract HH:MM
//       admissionWeight: child.AdmissionWeight?.toString(),
//       admissionHeight: child.AdmissionHeight?.toString(),
//       admissionOdema: child.AdmissionEdema?.toString(),
//       admissionMuac: child.AdmissionMuac?.toString(),
//       breastFeeding: child.BreastFeeding?.toString(),
//       complementaryFeeding: child.ComplementaryFeeding?.toString(),
//       appetiteTest: child.AdmissionAppetite?.toString(),
//       complications: child.MedicalComplication ? child.MedicalComplication.split(',') : [],
//       photo: child.RegistrationImage
//     };

//     return NextResponse.json({ success: true, data: mappedData });
//   } catch (error) {
//     console.error("API GET Error:", error);
//     return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
//   }
// }

// export async function PUT(
//   request: Request,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   try {
//     const { id } = await params;
//     const samNo = decodeURIComponent(id);
    
//     const formData = await request.formData();
    
//     // --- 1. Handle File Upload ---
//     const file = formData.get("photo") as File | null;
//     let photoUrl = null;

//     if (file && file.size > 0) {
//       const buffer = Buffer.from(await file.arrayBuffer());
//       const filename = `${Date.now()}_${file.name.replace(/\s/g, '_')}`;
      
//       // Ensure directory exists
//       const uploadDir = path.join(process.cwd(), "public/uploads/children");
//       await mkdir(uploadDir, { recursive: true });
      
//       await writeFile(path.join(uploadDir, filename), buffer);
//       photoUrl = `/uploads/children/${filename}`;
//     }

//     // --- 2. Extract Data ---
//     const getStr = (key: string) => formData.get(key) as string;
    
//     // Combine Date and Time for AdmissionDate
//     const dateStr = getStr("admissionDate"); // dd-MMM-yyyy or ISO
//     const timeStr = getStr("admissionTime");
//     const admissionDateTime = new Date(`${dateStr} ${timeStr}`);

//     const updateData = {
//       childName: getStr("childName"),
//       parentName: getStr("parentName"),
//       relationship: getStr("relationship"),
//       mobileNumber: getStr("mobileNumber"),
//       bplNumber: getStr("bplNumber"),
//       dateOfBirth: getStr("dateOfBirth"),
//       sex: getStr("sex"),
//       address: getStr("address"),
//       caste: getStr("caste"),
//       district: getStr("district"),
//       block: getStr("block"),
//       icdsProject: getStr("icdsProject"),
//       anganwadiCenter: getStr("anganwadiCenter"),
//       village: getStr("village"),
//       admissionDate: admissionDateTime.toISOString(),
//       admissionWeight: getStr("admissionWeight"),
//       admissionHeight: getStr("admissionHeight"),
//       admissionOdema: getStr("admissionOdema"),
//       admissionMuac: getStr("admissionMuac"),
//       breastFeeding: getStr("breastFeeding"),
//       complementaryFeeding: getStr("complementaryFeeding"),
//       appetiteTest: getStr("appetiteTest"),
//       complications: formData.getAll("complications"),
//       // If photoUrl is null (no new file), existing photo remains in logic inside updateChildRegistration
//       photo: photoUrl 
//     };

//     await updateChildRegistration(samNo, updateData);

//     return NextResponse.json({ success: true, message: "Child updated successfully" });

//   } catch (error) {
//     console.error("API PUT Error:", error);
//     return NextResponse.json({ success: false, message: "Update failed" }, { status: 500 });
//   }
// }


import { NextResponse } from "next/server";
import { getChildForEdit, updateChildRegistration } from "@/lib/db";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

// Fix for Next.js 15: Params are promises
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const samNo = decodeURIComponent(id);

    const child = await getChildForEdit(samNo);

    if (!child) {
      return NextResponse.json({ success: false, message: "Child not found" }, { status: 404 });
    }

    // Map DB columns to Frontend State keys
    const mappedData = {
      id: child.SamNo, // using SamNo as ID
      samNumber: child.SamNo,
      admissionType: child.AtId?.toString() || "1",
      referredBy: child.RefererId?.toString() || "",
      childName: child.ChildName,
      parentName: child.FatherName || child.MotherName,
      relationship: child.FatherName ? "1" : "2", // Simple guess
      mobileNumber: child.MobileNumber,
      bplNumber: child.BPLNo,
      dateOfBirth: child.DateofBirth,
      sex: child.GenderId?.toString(),
      address: child.Address,
      caste: child.CastId?.toString(),
      district: child.DistrictId?.toString(),
      block: child.BlockId?.toString(),
      icdsProject: child.ICDSId?.toString(),
      anganwadiCenter: child.AnganwadiId?.toString(),
      village: child.VillageName,
      admissionDate: child.AdmissionDate,
      admissionTime: new Date(child.AdmissionDate).toTimeString().substring(0,5), // Extract HH:MM
      admissionWeight: child.AdmissionWeight?.toString(),
      admissionHeight: child.AdmissionHeight?.toString(),
      admissionOdema: child.AdmissionEdema?.toString(),
      admissionMuac: child.AdmissionMuac?.toString(),
      breastFeeding: child.BreastFeeding?.toString(),
      complementaryFeeding: child.ComplementaryFeeding?.toString(),
      appetiteTest: child.AdmissionAppetite?.toString(),
      complications: child.MedicalComplication ? child.MedicalComplication.split(',') : [],
      photo: child.RegistrationImage
    };

    return NextResponse.json({ success: true, data: mappedData });
  } catch (error) {
    console.error("API GET Error:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const samNo = decodeURIComponent(id);
    
    const formData = await request.formData();
    
    // --- 1. Handle File Upload ---
    const file = formData.get("photo") as File | null;
    let photoUrl = null;

    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = `${Date.now()}_${file.name.replace(/\s/g, '_')}`;
      
      // Ensure directory exists
      const uploadDir = path.join(process.cwd(), "public/uploads/children");
      await mkdir(uploadDir, { recursive: true });
      
      await writeFile(path.join(uploadDir, filename), buffer);
      photoUrl = `/uploads/children/${filename}`;
    }

    // --- 2. Extract Data ---
    const getStr = (key: string) => formData.get(key) as string;
    
    // Combine Date and Time for AdmissionDate
    const dateStr = getStr("admissionDate"); // dd-MMM-yyyy or ISO
    const timeStr = getStr("admissionTime");
    const admissionDateTime = new Date(`${dateStr} ${timeStr}`);

    const updateData = {
      childName: getStr("childName"),
      parentName: getStr("parentName"),
      relationship: getStr("relationship"),
      mobileNumber: getStr("mobileNumber"),
      bplNumber: getStr("bplNumber"),
      dateOfBirth: getStr("dateOfBirth"),
      sex: getStr("sex"),
      address: getStr("address"),
      caste: getStr("caste"),
      district: getStr("district"),
      block: getStr("block"),
      icdsProject: getStr("icdsProject"),
      anganwadiCenter: getStr("anganwadiCenter"),
      village: getStr("village"),
      admissionDate: admissionDateTime.toISOString(),
      admissionWeight: getStr("admissionWeight"),
      admissionHeight: getStr("admissionHeight"),
      admissionOdema: getStr("admissionOdema"),
      admissionMuac: getStr("admissionMuac"),
      breastFeeding: getStr("breastFeeding"),
      complementaryFeeding: getStr("complementaryFeeding"),
      appetiteTest: getStr("appetiteTest"),
      // FIX: Explicitly convert FormDataEntryValue[] to string[]
      complications: formData.getAll("complications").map(c => c.toString()), 
      // If photoUrl is null (no new file), existing photo remains in logic inside updateChildRegistration
      photo: photoUrl 
    };

    await updateChildRegistration(samNo, updateData);

    return NextResponse.json({ success: true, message: "Child updated successfully" });

  } catch (error) {
    console.error("API PUT Error:", error);
    return NextResponse.json({ success: false, message: "Update failed" }, { status: 500 });
  }
}