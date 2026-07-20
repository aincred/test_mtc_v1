// // // // // // // // // // "use client";

// // // // // // // // // // import { useState, useEffect } from "react";
// // // // // // // // // // import { useRouter, useParams } from "next/navigation";
// // // // // // // // // // import { Button } from "@/components/ui/button";
// // // // // // // // // // import { Input } from "@/components/ui/input";
// // // // // // // // // // import { Card, CardHeader, CardContent } from "@/components/ui/card";
// // // // // // // // // // import { 
// // // // // // // // // //   Select, 
// // // // // // // // // //   SelectContent, 
// // // // // // // // // //   SelectItem, 
// // // // // // // // // //   SelectTrigger, 
// // // // // // // // // //   SelectValue 
// // // // // // // // // // } from "@/components/ui/select";
// // // // // // // // // // import { Home, Save, X, CheckCircle, Loader2, ArrowRight } from "lucide-react";
// // // // // // // // // // import Image from "next/image";
// // // // // // // // // // import toast, { Toaster } from "react-hot-toast";
// // // // // // // // // // import { differenceInDays, parseISO, isValid } from "date-fns";

// // // // // // // // // // // Interface for Child Data (from DB)
// // // // // // // // // // interface ChildData {
// // // // // // // // // //   SamNo: string;
// // // // // // // // // //   ChildName: string;
// // // // // // // // // //   FatherName: string;
// // // // // // // // // //   MotherName: string;
// // // // // // // // // //   AdmissionDate: string;
// // // // // // // // // //   AdmissionWeight: number;
// // // // // // // // // //   AdmissionHeight: number;
// // // // // // // // // //   AdmissionEdema: string; // "No", "++", etc.
// // // // // // // // // //   AdmissionMuac: number;
// // // // // // // // // //   TargetWeight: number;
// // // // // // // // // //   AdmissionHemoglobin: number;
// // // // // // // // // // }

// // // // // // // // // // export default function DischargeFormPage() {
// // // // // // // // // //   const router = useRouter();
// // // // // // // // // //   const params = useParams();
  
// // // // // // // // // //   // --- State Management ---
// // // // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // // // //   const [submitting, setSubmitting] = useState(false);
// // // // // // // // // //   const [child, setChild] = useState<ChildData | null>(null);
  
// // // // // // // // // //   // Form Fields
// // // // // // // // // //   const [dischargeDate, setDischargeDate] = useState(new Date().toISOString().split('T')[0]);
// // // // // // // // // //   const [dischargeWeight, setDischargeWeight] = useState("");
// // // // // // // // // //   const [dischargeHeight, setDischargeHeight] = useState("");
// // // // // // // // // //   const [dischargeMuac, setDischargeMuac] = useState("");
// // // // // // // // // //   const [outcomeIndicator, setOutcomeIndicator] = useState("");
// // // // // // // // // //   const [dischargeEdema, setDischargeEdema] = useState("");
  
// // // // // // // // // //   // Medical / Social
// // // // // // // // // //   const [hemoglobinMother, setHemoglobinMother] = useState("");
// // // // // // // // // //   const [ifaGivenToMother, setIfaGivenToMother] = useState("0");
// // // // // // // // // //   const [motherPayment, setMotherPayment] = useState("0");
// // // // // // // // // //   const [ifaSyrup, setIfaSyrup] = useState("0");
  
// // // // // // // // // //   // Conditional Fields (Only if Admission Edema != "No")
// // // // // // // // // //   const [minimumWeight, setMinimumWeight] = useState("");
// // // // // // // // // //   const [totalStay, setTotalStay] = useState("0");

// // // // // // // // // //   // Photo
// // // // // // // // // //   const [photoPreview, setPhotoPreview] = useState<string>("");

// // // // // // // // // //   // --- 1. Fetch Child Data ---
// // // // // // // // // //   useEffect(() => {
// // // // // // // // // //     const fetchChild = async () => {
// // // // // // // // // //       const id = typeof params.id === 'string' ? params.id : params.id?.[0];
// // // // // // // // // //       if (!id) return;

// // // // // // // // // //       try {
// // // // // // // // // //         const decodedId = decodeURIComponent(id);
// // // // // // // // // //         const res = await fetch(`/api/child/${encodeURIComponent(decodedId)}`);
// // // // // // // // // //         const result = await res.json();

// // // // // // // // // //         if (result.success && result.data) {
// // // // // // // // // //           setChild(result.data);
// // // // // // // // // //           // Initial calculation for total stay based on today
// // // // // // // // // //           if (result.data.AdmissionDate) {
// // // // // // // // // //              calculateTotalStay(result.data.AdmissionDate, new Date().toISOString().split('T')[0]);
// // // // // // // // // //           }
// // // // // // // // // //         } else {
// // // // // // // // // //           toast.error("Child not found");
// // // // // // // // // //           router.push("/mtc-user/dashboard/discharge");
// // // // // // // // // //         }
// // // // // // // // // //       } catch (error) {
// // // // // // // // // //         toast.error("Error loading data");
// // // // // // // // // //       } finally {
// // // // // // // // // //         setLoading(false);
// // // // // // // // // //       }
// // // // // // // // // //     };

// // // // // // // // // //     fetchChild();
// // // // // // // // // //   }, [params.id, router]);

// // // // // // // // // //   // --- 2. Logic & Calculations ---

// // // // // // // // // //   // Calculate Total Stay Days
// // // // // // // // // //   const calculateTotalStay = (admDateStr: string, disDateStr: string) => {
// // // // // // // // // //     const admDate = new Date(admDateStr);
// // // // // // // // // //     const disDate = new Date(disDateStr);
    
// // // // // // // // // //     if (isValid(admDate) && isValid(disDate)) {
// // // // // // // // // //       const days = differenceInDays(disDate, admDate);
// // // // // // // // // //       setTotalStay(days >= 0 ? days.toString() : "0");
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   // Handle Date Change
// // // // // // // // // //   const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // // // // //     const newDate = e.target.value;
// // // // // // // // // //     setDischargeDate(newDate);
    
// // // // // // // // // //     if (child?.AdmissionDate) {
// // // // // // // // // //       const adm = new Date(child.AdmissionDate);
// // // // // // // // // //       const dis = new Date(newDate);
      
// // // // // // // // // //       if (dis < adm) {
// // // // // // // // // //         toast.error("Discharge date cannot be before Admission Date");
// // // // // // // // // //         setDischargeDate(""); // Reset
// // // // // // // // // //         setTotalStay("0");
// // // // // // // // // //       } else {
// // // // // // // // // //         calculateTotalStay(child.AdmissionDate, newDate);
// // // // // // // // // //       }
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   // Validations (Height > 150, Weight > 100)
// // // // // // // // // //   const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // // // // //     const val = parseFloat(e.target.value);
// // // // // // // // // //     if (val > 100) {
// // // // // // // // // //       toast.error("Weight cannot be greater than 100kg");
// // // // // // // // // //       setDischargeWeight("");
// // // // // // // // // //     } else {
// // // // // // // // // //       setDischargeWeight(e.target.value);
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // // // // //     const val = parseFloat(e.target.value);
// // // // // // // // // //     if (val > 150) {
// // // // // // // // // //       toast.error("Height cannot be greater than 150cm");
// // // // // // // // // //       setDischargeHeight("");
// // // // // // // // // //     } else {
// // // // // // // // // //       setDischargeHeight(e.target.value);
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   // Photo Upload (Max 2MB)
// // // // // // // // // //   const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // // // // //     if (e.target.files && e.target.files[0]) {
// // // // // // // // // //       const file = e.target.files[0];
      
// // // // // // // // // //       // Validation: Type
// // // // // // // // // //       if (!["image/jpeg", "image/png"].includes(file.type)) {
// // // // // // // // // //         toast.error("Please upload a valid image file (JPEG/PNG)");
// // // // // // // // // //         e.target.value = "";
// // // // // // // // // //         return;
// // // // // // // // // //       }

// // // // // // // // // //       // Validation: Size (2MB = 2048 KB)
// // // // // // // // // //       if (file.size > 2 * 1024 * 1024) {
// // // // // // // // // //         toast.error("Please upload file size Less than 2 MB");
// // // // // // // // // //         e.target.value = "";
// // // // // // // // // //         return;
// // // // // // // // // //       }

// // // // // // // // // //       const reader = new FileReader();
// // // // // // // // // //       reader.onload = () => setPhotoPreview(reader.result as string);
// // // // // // // // // //       reader.readAsDataURL(file);
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   // --- 3. Submit Handler ---
// // // // // // // // // //   const handleSubmit = async (e: React.FormEvent) => {
// // // // // // // // // //     e.preventDefault();

// // // // // // // // // //     // Required Field Validations
// // // // // // // // // //     if (!dischargeDate || !dischargeWeight || !dischargeHeight || !dischargeMuac || !outcomeIndicator || !dischargeEdema) {
// // // // // // // // // //       toast.error("Please fill all compulsory fields marked with *");
// // // // // // // // // //       return;
// // // // // // // // // //     }
// // // // // // // // // //     if (ifaGivenToMother === "0" || motherPayment === "0" || ifaSyrup === "0") {
// // // // // // // // // //       toast.error("Please select all Yes/No dropdowns");
// // // // // // // // // //       return;
// // // // // // // // // //     }
// // // // // // // // // //     if (!hemoglobinMother) {
// // // // // // // // // //         toast.error("Please enter Mother's Hemoglobin");
// // // // // // // // // //         return;
// // // // // // // // // //     }
// // // // // // // // // //     // Conditional Validation for Edema
// // // // // // // // // //     if (child?.AdmissionEdema !== "No" && !minimumWeight) {
// // // // // // // // // //         toast.error("Please enter Minimum Weight");
// // // // // // // // // //         return;
// // // // // // // // // //     }

// // // // // // // // // //     setSubmitting(true);

// // // // // // // // // //     try {
// // // // // // // // // //       const payload = {
// // // // // // // // // //         SamNo: child?.SamNo,
// // // // // // // // // //         DischargeDate: dischargeDate,
// // // // // // // // // //         DischargeWeight: parseFloat(dischargeWeight),
// // // // // // // // // //         DischargeHeight: parseFloat(dischargeHeight),
// // // // // // // // // //         DischargeMuac: parseFloat(dischargeMuac),
// // // // // // // // // //         DischargeEdema: parseInt(dischargeEdema),
// // // // // // // // // //         ExitIndicator: parseInt(outcomeIndicator),
// // // // // // // // // //         IFAToMotherTablet: parseInt(ifaGivenToMother),
// // // // // // // // // //         MotherWages: parseInt(motherPayment),
// // // // // // // // // //         IFAToMotherSyrup: parseInt(ifaSyrup),
// // // // // // // // // //         HemoglobinMother: parseFloat(hemoglobinMother),
// // // // // // // // // //         DischargeImage: photoPreview || null,
// // // // // // // // // //         // Include calculated fields if your API needs them
// // // // // // // // // //         TotalStay: parseInt(totalStay), 
// // // // // // // // // //         MinimumWeight: minimumWeight ? parseFloat(minimumWeight) : null
// // // // // // // // // //       };

// // // // // // // // // //       const res = await fetch("/api/discharge-child", {
// // // // // // // // // //         method: "PUT",
// // // // // // // // // //         headers: { "Content-Type": "application/json" },
// // // // // // // // // //         body: JSON.stringify(payload),
// // // // // // // // // //       });

// // // // // // // // // //       const result = await res.json();

// // // // // // // // // //       if (!res.ok) throw new Error(result.message || "Failed to save");

// // // // // // // // // //       toast.success("Record Saved Successfully!");
      
// // // // // // // // // //       // Optional: Redirect to Next Step (Follow Up) Logic
// // // // // // // // // //       setTimeout(() => {
// // // // // // // // // //          router.push("/mtc-user/dashboard/discharge");
// // // // // // // // // //       }, 2000);

// // // // // // // // // //     } catch (error: any) {
// // // // // // // // // //       console.error(error);
// // // // // // // // // //       toast.error(error.message || "Something went wrong");
// // // // // // // // // //     } finally {
// // // // // // // // // //       setSubmitting(false);
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   // --- RENDER ---

// // // // // // // // // //   if (loading) {
// // // // // // // // // //     return (
// // // // // // // // // //       <div className="min-h-screen bg-gray-100 flex items-center justify-center">
// // // // // // // // // //         <div className="flex items-center gap-2 text-teal-700">
// // // // // // // // // //             <Loader2 className="animate-spin h-6 w-6" /> Loading...
// // // // // // // // // //         </div>
// // // // // // // // // //       </div>
// // // // // // // // // //     );
// // // // // // // // // //   }

// // // // // // // // // //   if (!child) return null;

// // // // // // // // // //   return (
// // // // // // // // // //     <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6">
// // // // // // // // // //       <Toaster position="top-right" />
      
// // // // // // // // // //       <div className="max-w-7xl mx-auto">
// // // // // // // // // //         <Card className="shadow-lg border-0 rounded-xl overflow-hidden">
          
// // // // // // // // // //           {/* Header */}
// // // // // // // // // //           <CardHeader className="bg-white border-b px-6 py-4">
// // // // // // // // // //             <h5 className="text-xl font-bold text-teal-700 m-0">Child Discharge</h5>
// // // // // // // // // //           </CardHeader>

// // // // // // // // // //           <CardContent className="p-6 bg-gray-50/30">
// // // // // // // // // //             <form onSubmit={handleSubmit}>
                
// // // // // // // // // //                 {/* --- SECTION 1: Read Only Details --- */}
// // // // // // // // // //                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
// // // // // // // // // //                     <div>
// // // // // // // // // //                         <label className="text-xs font-semibold text-gray-500 uppercase">SAM Number</label>
// // // // // // // // // //                         <Input value={child.SamNo} readOnly className="bg-gray-100 font-medium mt-1" />
// // // // // // // // // //                     </div>
// // // // // // // // // //                     <div>
// // // // // // // // // //                         <label className="text-xs font-semibold text-gray-500 uppercase">Child Name</label>
// // // // // // // // // //                         <Input value={child.ChildName} readOnly className="bg-gray-100 font-medium mt-1" />
// // // // // // // // // //                     </div>
// // // // // // // // // //                     <div>
// // // // // // // // // //                         <label className="text-xs font-semibold text-gray-500 uppercase">Admission Date</label>
// // // // // // // // // //                         <div className="relative mt-1">
// // // // // // // // // //                             <Input value={new Date(child.AdmissionDate).toLocaleDateString()} readOnly className="bg-gray-100 font-medium pr-10" />
// // // // // // // // // //                             <div className="absolute right-3 top-2.5 text-gray-400"><i className="fas fa-calendar"></i></div>
// // // // // // // // // //                         </div>
// // // // // // // // // //                     </div>
// // // // // // // // // //                     <div>
// // // // // // // // // //                         <label className="text-xs font-semibold text-gray-500 uppercase">Admission Weight</label>
// // // // // // // // // //                         <Input value={child.AdmissionWeight} readOnly className="bg-gray-100 font-medium mt-1" />
// // // // // // // // // //                     </div>
// // // // // // // // // //                 </div>

// // // // // // // // // //                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 border-b pb-8">
// // // // // // // // // //                     <div>
// // // // // // // // // //                         <label className="text-xs font-semibold text-gray-500 uppercase">Admission Height (cm)</label>
// // // // // // // // // //                         <Input value={child.AdmissionHeight} readOnly className="bg-gray-100 font-medium mt-1" />
// // // // // // // // // //                     </div>
// // // // // // // // // //                     <div>
// // // // // // // // // //                         <label className="text-xs font-semibold text-gray-500 uppercase">Admission Edema</label>
// // // // // // // // // //                         <Input value={child.AdmissionEdema} readOnly className="bg-gray-100 font-medium mt-1" />
// // // // // // // // // //                     </div>
// // // // // // // // // //                     <div>
// // // // // // // // // //                         <label className="text-xs font-semibold text-gray-500 uppercase">Admission MUAC (cm)</label>
// // // // // // // // // //                         <Input value={child.AdmissionMuac} readOnly className="bg-gray-100 font-medium mt-1" />
// // // // // // // // // //                     </div>
// // // // // // // // // //                     <div>
// // // // // // // // // //                         <label className="text-xs font-semibold text-gray-500 uppercase">Target Weight (kg)</label>
// // // // // // // // // //                         <Input value={child.TargetWeight} readOnly className="bg-gray-100 font-medium mt-1" />
// // // // // // // // // //                     </div>
// // // // // // // // // //                 </div>

// // // // // // // // // //                 {/* --- SECTION 2: Discharge Vitals --- */}
// // // // // // // // // //                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
// // // // // // // // // //                     <div>
// // // // // // // // // //                         <label className="text-sm font-medium text-gray-700">Discharge Date <span className="text-red-500">*</span></label>
// // // // // // // // // //                         <Input 
// // // // // // // // // //                             type="date" 
// // // // // // // // // //                             value={dischargeDate} 
// // // // // // // // // //                             onChange={handleDateChange} 
// // // // // // // // // //                             max={new Date().toISOString().split('T')[0]}
// // // // // // // // // //                             className="mt-1" 
// // // // // // // // // //                         />
// // // // // // // // // //                     </div>
// // // // // // // // // //                     <div>
// // // // // // // // // //                         <label className="text-sm font-medium text-gray-700">Discharge Weight (kg) <span className="text-red-500">*</span></label>
// // // // // // // // // //                         <Input 
// // // // // // // // // //                             type="number" step="0.01" 
// // // // // // // // // //                             value={dischargeWeight} 
// // // // // // // // // //                             onChange={handleWeightChange} 
// // // // // // // // // //                             placeholder="Max 100"
// // // // // // // // // //                             className="mt-1" 
// // // // // // // // // //                         />
// // // // // // // // // //                     </div>
// // // // // // // // // //                     <div>
// // // // // // // // // //                         <label className="text-sm font-medium text-gray-700">Discharge Height (cm) <span className="text-red-500">*</span></label>
// // // // // // // // // //                         <Input 
// // // // // // // // // //                             type="number" step="0.1" 
// // // // // // // // // //                             value={dischargeHeight} 
// // // // // // // // // //                             onChange={handleHeightChange} 
// // // // // // // // // //                             placeholder="Max 150"
// // // // // // // // // //                             className="mt-1" 
// // // // // // // // // //                         />
// // // // // // // // // //                     </div>
// // // // // // // // // //                     <div>
// // // // // // // // // //                         <label className="text-sm font-medium text-gray-700">Discharge MUAC (cm) <span className="text-red-500">*</span></label>
// // // // // // // // // //                         <Input 
// // // // // // // // // //                             type="number" step="0.1" 
// // // // // // // // // //                             value={dischargeMuac} 
// // // // // // // // // //                             onChange={(e) => setDischargeMuac(e.target.value)} 
// // // // // // // // // //                             className="mt-1" 
// // // // // // // // // //                         />
// // // // // // // // // //                     </div>
// // // // // // // // // //                 </div>

// // // // // // // // // //                 {/* --- SECTION 3: Photo Upload --- */}
// // // // // // // // // //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
// // // // // // // // // //                     <div>
// // // // // // // // // //                         <label className="text-sm font-medium text-gray-700 block mb-2">Upload Photo (max 2MB, png/jpeg only)</label>
// // // // // // // // // //                         <div className="flex gap-4 items-start">
// // // // // // // // // //                             <Input 
// // // // // // // // // //                                 type="file" 
// // // // // // // // // //                                 accept="image/png, image/jpeg" 
// // // // // // // // // //                                 onChange={handlePhotoChange} 
// // // // // // // // // //                                 className="cursor-pointer file:text-teal-700 file:font-semibold"
// // // // // // // // // //                             />
// // // // // // // // // //                         </div>
// // // // // // // // // //                     </div>
// // // // // // // // // //                     <div className="flex justify-center md:justify-start">
// // // // // // // // // //                         {photoPreview ? (
// // // // // // // // // //                             <Image 
// // // // // // // // // //                                 src={photoPreview} 
// // // // // // // // // //                                 alt="Child" 
// // // // // // // // // //                                 width={240} 
// // // // // // // // // //                                 height={140} 
// // // // // // // // // //                                 className="rounded-lg shadow-sm border object-cover h-[140px] w-60" 
// // // // // // // // // //                             />
// // // // // // // // // //                         ) : (
// // // // // // // // // //                             <div className="h-[140px] w-60 bg-gray-100 rounded-lg border-2 border-dashed flex items-center justify-center text-gray-400">
// // // // // // // // // //                                 <span className="text-sm">No Image</span>
// // // // // // // // // //                             </div>
// // // // // // // // // //                         )}
// // // // // // // // // //                     </div>
// // // // // // // // // //                 </div>

// // // // // // // // // //                 {/* --- SECTION 4: Outcomes & Medical --- */}
// // // // // // // // // //                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
// // // // // // // // // //                     <div>
// // // // // // // // // //                         <label className="text-sm font-medium text-gray-700">Outcome Indicator <span className="text-red-500">*</span></label>
// // // // // // // // // //                         <Select value={outcomeIndicator} onValueChange={setOutcomeIndicator}>
// // // // // // // // // //                             <SelectTrigger className="mt-1"><SelectValue placeholder="Select" /></SelectTrigger>
// // // // // // // // // //                             <SelectContent>
// // // // // // // // // //                                 <SelectItem value="1">CURED</SelectItem>
// // // // // // // // // //                                 <SelectItem value="2">DEFAULTER</SelectItem>
// // // // // // // // // //                                 <SelectItem value="3">MEDICAL TRANSFER</SelectItem>
// // // // // // // // // //                                 <SelectItem value="4">NON RESPONDENT</SelectItem>
// // // // // // // // // //                                 <SelectItem value="5">DEATH</SelectItem>
// // // // // // // // // //                                 <SelectItem value="6">PARTIAL IMPROVEMENT</SelectItem>
// // // // // // // // // //                             </SelectContent>
// // // // // // // // // //                         </Select>
// // // // // // // // // //                     </div>
// // // // // // // // // //                     <div>
// // // // // // // // // //                         <label className="text-sm font-medium text-gray-700">Discharge EDEMA <span className="text-red-500">*</span></label>
// // // // // // // // // //                         <Select value={dischargeEdema} onValueChange={setDischargeEdema}>
// // // // // // // // // //                             <SelectTrigger className="mt-1"><SelectValue placeholder="Select" /></SelectTrigger>
// // // // // // // // // //                             <SelectContent>
// // // // // // // // // //                                 <SelectItem value="4">No Edema</SelectItem>
// // // // // // // // // //                                 <SelectItem value="1">+</SelectItem>
// // // // // // // // // //                                 <SelectItem value="2">++</SelectItem>
// // // // // // // // // //                                 <SelectItem value="3">+++</SelectItem>
// // // // // // // // // //                             </SelectContent>
// // // // // // // // // //                         </Select>
// // // // // // // // // //                     </div>
// // // // // // // // // //                     <div>
// // // // // // // // // //                         <label className="text-sm font-medium text-gray-700">Adm. Hemoglobin (gm/dl)</label>
// // // // // // // // // //                         <Input value={child.AdmissionHemoglobin || "N/A"} readOnly className="bg-gray-100 font-medium mt-1" />
// // // // // // // // // //                     </div>
// // // // // // // // // //                     <div>
// // // // // // // // // //                         <label className="text-sm font-medium text-gray-700">Mother's Hb (gm/dl) <span className="text-red-500">*</span></label>
// // // // // // // // // //                         <Input 
// // // // // // // // // //                             type="number" step="0.1" 
// // // // // // // // // //                             value={hemoglobinMother} 
// // // // // // // // // //                             onChange={(e) => setHemoglobinMother(e.target.value)} 
// // // // // // // // // //                             className="mt-1"
// // // // // // // // // //                         />
// // // // // // // // // //                     </div>
// // // // // // // // // //                 </div>

// // // // // // // // // //                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
// // // // // // // // // //                     <div>
// // // // // // // // // //                         <label className="text-sm font-medium text-gray-700">IFA Given To Mother <span className="text-red-500">*</span></label>
// // // // // // // // // //                         <Select value={ifaGivenToMother} onValueChange={setIfaGivenToMother}>
// // // // // // // // // //                             <SelectTrigger className="mt-1"><SelectValue placeholder="Select" /></SelectTrigger>
// // // // // // // // // //                             <SelectContent>
// // // // // // // // // //                                 <SelectItem value="0">Select</SelectItem>
// // // // // // // // // //                                 <SelectItem value="1">Yes</SelectItem>
// // // // // // // // // //                                 <SelectItem value="2">No</SelectItem>
// // // // // // // // // //                             </SelectContent>
// // // // // // // // // //                         </Select>
// // // // // // // // // //                     </div>
// // // // // // // // // //                     <div>
// // // // // // // // // //                         <label className="text-sm font-medium text-gray-700">Mother's Wage Comp. <span className="text-red-500">*</span></label>
// // // // // // // // // //                         <Select value={motherPayment} onValueChange={setMotherPayment}>
// // // // // // // // // //                             <SelectTrigger className="mt-1"><SelectValue placeholder="Select" /></SelectTrigger>
// // // // // // // // // //                             <SelectContent>
// // // // // // // // // //                                 <SelectItem value="0">Select</SelectItem>
// // // // // // // // // //                                 <SelectItem value="1">Yes</SelectItem>
// // // // // // // // // //                                 <SelectItem value="2">No</SelectItem>
// // // // // // // // // //                             </SelectContent>
// // // // // // // // // //                         </Select>
// // // // // // // // // //                     </div>
// // // // // // // // // //                     <div>
// // // // // // // // // //                         <label className="text-sm font-medium text-gray-700">IFA Syrup to Child <span className="text-red-500">*</span></label>
// // // // // // // // // //                         <Select value={ifaSyrup} onValueChange={setIfaSyrup}>
// // // // // // // // // //                             <SelectTrigger className="mt-1"><SelectValue placeholder="Select" /></SelectTrigger>
// // // // // // // // // //                             <SelectContent>
// // // // // // // // // //                                 <SelectItem value="0">Select</SelectItem>
// // // // // // // // // //                                 <SelectItem value="1">Yes</SelectItem>
// // // // // // // // // //                                 <SelectItem value="2">No</SelectItem>
// // // // // // // // // //                             </SelectContent>
// // // // // // // // // //                         </Select>
// // // // // // // // // //                     </div>
// // // // // // // // // //                 </div>

// // // // // // // // // //                 {/* --- SECTION 5: Conditional Edema Fields --- */}
// // // // // // // // // //                 {child.AdmissionEdema && child.AdmissionEdema.trim() !== "No" && (
// // // // // // // // // //                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-yellow-50 p-4 rounded-md border border-yellow-100 mb-6 animate-in fade-in">
// // // // // // // // // //                         <div>
// // // // // // // // // //                             <label className="text-sm font-medium text-gray-700">Minimum Weight <span className="text-red-500">*</span></label>
// // // // // // // // // //                             <Input 
// // // // // // // // // //                                 type="number" step="0.01" 
// // // // // // // // // //                                 value={minimumWeight} 
// // // // // // // // // //                                 onChange={(e) => setMinimumWeight(e.target.value)} 
// // // // // // // // // //                                 className="mt-1 border-yellow-300 focus-visible:ring-yellow-400" 
// // // // // // // // // //                             />
// // // // // // // // // //                         </div>
// // // // // // // // // //                         <div>
// // // // // // // // // //                             <label className="text-sm font-medium text-gray-700">Total Stay (Days)</label>
// // // // // // // // // //                             <Input 
// // // // // // // // // //                                 value={totalStay} 
// // // // // // // // // //                                 readOnly 
// // // // // // // // // //                                 className="bg-yellow-100 font-bold mt-1 text-gray-700 border-yellow-300" 
// // // // // // // // // //                             />
// // // // // // // // // //                         </div>
// // // // // // // // // //                     </div>
// // // // // // // // // //                 )}

// // // // // // // // // //                 {/* --- Footer Buttons --- */}
// // // // // // // // // //                 <div className="flex flex-col sm:flex-row justify-end gap-3 mt-8 pt-6 border-t">
// // // // // // // // // //                     <Button 
// // // // // // // // // //                         type="submit" 
// // // // // // // // // //                         disabled={submitting} 
// // // // // // // // // //                         className="bg-linear-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white min-w-[140px]"
// // // // // // // // // //                     >
// // // // // // // // // //                         {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
// // // // // // // // // //                         Submit
// // // // // // // // // //                     </Button>
                    
// // // // // // // // // //                     <Button 
// // // // // // // // // //                         type="button" 
// // // // // // // // // //                         variant="outline" 
// // // // // // // // // //                         className="border-teal-200 text-teal-700 hover:bg-teal-50"
// // // // // // // // // //                         onClick={() => router.push("/mtc-user/dashboard/discharge")}
// // // // // // // // // //                     >
// // // // // // // // // //                         <X className="mr-2 h-4 w-4" /> Cancel
// // // // // // // // // //                     </Button>
// // // // // // // // // //                 </div>

// // // // // // // // // //             </form>
// // // // // // // // // //           </CardContent>
// // // // // // // // // //         </Card>
// // // // // // // // // //       </div>
// // // // // // // // // //     </div>
// // // // // // // // // //   );
// // // // // // // // // // }

// // // // // // // // // // // "use client";

// // // // // // // // // // // import { useState, useEffect } from "react";
// // // // // // // // // // // import { useRouter, useParams } from "next/navigation";
// // // // // // // // // // // import { Button } from "@/components/ui/button";
// // // // // // // // // // // import { Input } from "@/components/ui/input";
// // // // // // // // // // // import { Card, CardHeader, CardContent } from "@/components/ui/card";
// // // // // // // // // // // import { 
// // // // // // // // // // //   Select, 
// // // // // // // // // // //   SelectContent, 
// // // // // // // // // // //   SelectItem, 
// // // // // // // // // // //   SelectTrigger, 
// // // // // // // // // // //   SelectValue 
// // // // // // // // // // // } from "@/components/ui/select";
// // // // // // // // // // // import { Save, X, Loader2 } from "lucide-react"; // Removed unused icons
// // // // // // // // // // // import Image from "next/image";
// // // // // // // // // // // import toast, { Toaster } from "react-hot-toast";
// // // // // // // // // // // import { differenceInDays, isValid } from "date-fns"; // Removed parseISO

// // // // // // // // // // // // Interface for Child Data (from DB)
// // // // // // // // // // // interface ChildData {
// // // // // // // // // // //   SamNo: string;
// // // // // // // // // // //   ChildName: string;
// // // // // // // // // // //   FatherName: string;
// // // // // // // // // // //   MotherName: string;
// // // // // // // // // // //   AdmissionDate: string;
// // // // // // // // // // //   AdmissionWeight: number;
// // // // // // // // // // //   AdmissionHeight: number;
// // // // // // // // // // //   AdmissionEdema: string; // "No", "++", etc.
// // // // // // // // // // //   AdmissionMuac: number;
// // // // // // // // // // //   TargetWeight: number;
// // // // // // // // // // //   AdmissionHemoglobin: number;
// // // // // // // // // // // }

// // // // // // // // // // // export default function DischargeFormPage() {
// // // // // // // // // // //   const router = useRouter();
// // // // // // // // // // //   const params = useParams();
  
// // // // // // // // // // //   // --- State Management ---
// // // // // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // // // // //   const [submitting, setSubmitting] = useState(false);
// // // // // // // // // // //   const [child, setChild] = useState<ChildData | null>(null);
  
// // // // // // // // // // //   // Form Fields
// // // // // // // // // // //   const [dischargeDate, setDischargeDate] = useState(new Date().toISOString().split('T')[0]);
// // // // // // // // // // //   const [dischargeWeight, setDischargeWeight] = useState("");
// // // // // // // // // // //   const [dischargeHeight, setDischargeHeight] = useState("");
// // // // // // // // // // //   const [dischargeMuac, setDischargeMuac] = useState("");
// // // // // // // // // // //   const [outcomeIndicator, setOutcomeIndicator] = useState("");
// // // // // // // // // // //   const [dischargeEdema, setDischargeEdema] = useState("");
  
// // // // // // // // // // //   // Medical / Social
// // // // // // // // // // //   const [hemoglobinMother, setHemoglobinMother] = useState("");
// // // // // // // // // // //   const [ifaGivenToMother, setIfaGivenToMother] = useState("0");
// // // // // // // // // // //   const [motherPayment, setMotherPayment] = useState("0");
// // // // // // // // // // //   const [ifaSyrup, setIfaSyrup] = useState("0");
  
// // // // // // // // // // //   // Conditional Fields (Only if Admission Edema != "No")
// // // // // // // // // // //   const [minimumWeight, setMinimumWeight] = useState("");
// // // // // // // // // // //   const [totalStay, setTotalStay] = useState("0");

// // // // // // // // // // //   // Photo
// // // // // // // // // // //   const [photoPreview, setPhotoPreview] = useState<string>("");

// // // // // // // // // // //   // --- 1. Fetch Child Data ---
// // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // //     const fetchChild = async () => {
// // // // // // // // // // //       const id = typeof params.id === 'string' ? params.id : params.id?.[0];
// // // // // // // // // // //       if (!id) return;

// // // // // // // // // // //       try {
// // // // // // // // // // //         const decodedId = decodeURIComponent(id);
// // // // // // // // // // //         const res = await fetch(`/api/child/${encodeURIComponent(decodedId)}`);
// // // // // // // // // // //         const result = await res.json();

// // // // // // // // // // //         if (result.success && result.data) {
// // // // // // // // // // //           setChild(result.data);
// // // // // // // // // // //           // Initial calculation for total stay based on today
// // // // // // // // // // //           if (result.data.AdmissionDate) {
// // // // // // // // // // //              calculateTotalStay(result.data.AdmissionDate, new Date().toISOString().split('T')[0]);
// // // // // // // // // // //           }
// // // // // // // // // // //         } else {
// // // // // // // // // // //           toast.error("Child not found");
// // // // // // // // // // //           router.push("/mtc-user/dashboard/discharge");
// // // // // // // // // // //         }
// // // // // // // // // // //       } catch (error) {
// // // // // // // // // // //         console.error("Fetch error:", error); // Used variable to satisfy linter
// // // // // // // // // // //         toast.error("Error loading data");
// // // // // // // // // // //       } finally {
// // // // // // // // // // //         setLoading(false);
// // // // // // // // // // //       }
// // // // // // // // // // //     };

// // // // // // // // // // //     fetchChild();
// // // // // // // // // // //   }, [params.id, router]);

// // // // // // // // // // //   // --- 2. Logic & Calculations ---

// // // // // // // // // // //   // Calculate Total Stay Days
// // // // // // // // // // //   const calculateTotalStay = (admDateStr: string, disDateStr: string) => {
// // // // // // // // // // //     const admDate = new Date(admDateStr);
// // // // // // // // // // //     const disDate = new Date(disDateStr);
    
// // // // // // // // // // //     if (isValid(admDate) && isValid(disDate)) {
// // // // // // // // // // //       const days = differenceInDays(disDate, admDate);
// // // // // // // // // // //       setTotalStay(days >= 0 ? days.toString() : "0");
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   // Handle Date Change
// // // // // // // // // // //   const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // // // // // //     const newDate = e.target.value;
// // // // // // // // // // //     setDischargeDate(newDate);
    
// // // // // // // // // // //     if (child?.AdmissionDate) {
// // // // // // // // // // //       const adm = new Date(child.AdmissionDate);
// // // // // // // // // // //       const dis = new Date(newDate);
      
// // // // // // // // // // //       if (dis < adm) {
// // // // // // // // // // //         toast.error("Discharge date cannot be before Admission Date");
// // // // // // // // // // //         setDischargeDate(""); // Reset
// // // // // // // // // // //         setTotalStay("0");
// // // // // // // // // // //       } else {
// // // // // // // // // // //         calculateTotalStay(child.AdmissionDate, newDate);
// // // // // // // // // // //       }
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   // Validations (Height > 150, Weight > 100)
// // // // // // // // // // //   const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // // // // // //     const val = parseFloat(e.target.value);
// // // // // // // // // // //     if (val > 100) {
// // // // // // // // // // //       toast.error("Weight cannot be greater than 100kg");
// // // // // // // // // // //       setDischargeWeight("");
// // // // // // // // // // //     } else {
// // // // // // // // // // //       setDischargeWeight(e.target.value);
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // // // // // //     const val = parseFloat(e.target.value);
// // // // // // // // // // //     if (val > 150) {
// // // // // // // // // // //       toast.error("Height cannot be greater than 150cm");
// // // // // // // // // // //       setDischargeHeight("");
// // // // // // // // // // //     } else {
// // // // // // // // // // //       setDischargeHeight(e.target.value);
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   // Photo Upload (Max 2MB)
// // // // // // // // // // //   const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // // // // // //     if (e.target.files && e.target.files[0]) {
// // // // // // // // // // //       const file = e.target.files[0];
      
// // // // // // // // // // //       // Validation: Type
// // // // // // // // // // //       if (!["image/jpeg", "image/png"].includes(file.type)) {
// // // // // // // // // // //         toast.error("Please upload a valid image file (JPEG/PNG)");
// // // // // // // // // // //         e.target.value = "";
// // // // // // // // // // //         return;
// // // // // // // // // // //       }

// // // // // // // // // // //       // Validation: Size (2MB = 2048 KB)
// // // // // // // // // // //       if (file.size > 2 * 1024 * 1024) {
// // // // // // // // // // //         toast.error("Please upload file size Less than 2 MB");
// // // // // // // // // // //         e.target.value = "";
// // // // // // // // // // //         return;
// // // // // // // // // // //       }

// // // // // // // // // // //       const reader = new FileReader();
// // // // // // // // // // //       reader.onload = () => setPhotoPreview(reader.result as string);
// // // // // // // // // // //       reader.readAsDataURL(file);
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   // --- 3. Submit Handler ---
// // // // // // // // // // //   const handleSubmit = async (e: React.FormEvent) => {
// // // // // // // // // // //     e.preventDefault();

// // // // // // // // // // //     // Required Field Validations
// // // // // // // // // // //     if (!dischargeDate || !dischargeWeight || !dischargeHeight || !dischargeMuac || !outcomeIndicator || !dischargeEdema) {
// // // // // // // // // // //       toast.error("Please fill all compulsory fields marked with *");
// // // // // // // // // // //       return;
// // // // // // // // // // //     }
// // // // // // // // // // //     if (ifaGivenToMother === "0" || motherPayment === "0" || ifaSyrup === "0") {
// // // // // // // // // // //       toast.error("Please select all Yes/No dropdowns");
// // // // // // // // // // //       return;
// // // // // // // // // // //     }
// // // // // // // // // // //     if (!hemoglobinMother) {
// // // // // // // // // // //         toast.error("Please enter Mother's Hemoglobin");
// // // // // // // // // // //         return;
// // // // // // // // // // //     }
// // // // // // // // // // //     // Conditional Validation for Edema
// // // // // // // // // // //     if (child?.AdmissionEdema !== "No" && !minimumWeight) {
// // // // // // // // // // //         toast.error("Please enter Minimum Weight");
// // // // // // // // // // //         return;
// // // // // // // // // // //     }

// // // // // // // // // // //     setSubmitting(true);

// // // // // // // // // // //     try {
// // // // // // // // // // //       const payload = {
// // // // // // // // // // //         SamNo: child?.SamNo,
// // // // // // // // // // //         DischargeDate: dischargeDate,
// // // // // // // // // // //         DischargeWeight: parseFloat(dischargeWeight),
// // // // // // // // // // //         DischargeHeight: parseFloat(dischargeHeight),
// // // // // // // // // // //         DischargeMuac: parseFloat(dischargeMuac),
// // // // // // // // // // //         DischargeEdema: parseInt(dischargeEdema),
// // // // // // // // // // //         ExitIndicator: parseInt(outcomeIndicator),
// // // // // // // // // // //         IFAToMotherTablet: parseInt(ifaGivenToMother),
// // // // // // // // // // //         MotherWages: parseInt(motherPayment),
// // // // // // // // // // //         IFAToMotherSyrup: parseInt(ifaSyrup),
// // // // // // // // // // //         HemoglobinMother: parseFloat(hemoglobinMother),
// // // // // // // // // // //         DischargeImage: photoPreview || null,
// // // // // // // // // // //         // Include calculated fields if your API needs them
// // // // // // // // // // //         TotalStay: parseInt(totalStay), 
// // // // // // // // // // //         MinimumWeight: minimumWeight ? parseFloat(minimumWeight) : null
// // // // // // // // // // //       };

// // // // // // // // // // //       const res = await fetch("/api/discharge-child", {
// // // // // // // // // // //         method: "PUT",
// // // // // // // // // // //         headers: { "Content-Type": "application/json" },
// // // // // // // // // // //         body: JSON.stringify(payload),
// // // // // // // // // // //       });

// // // // // // // // // // //       const result = await res.json();

// // // // // // // // // // //       if (!res.ok) throw new Error(result.message || "Failed to save");

// // // // // // // // // // //       toast.success("Record Saved Successfully!");
      
// // // // // // // // // // //       // Optional: Redirect to Next Step (Follow Up) Logic
// // // // // // // // // // //       setTimeout(() => {
// // // // // // // // // // //          router.push("/mtc-user/dashboard/discharge");
// // // // // // // // // // //       }, 2000);

// // // // // // // // // // //     } catch (error: unknown) { // Use unknown instead of any
// // // // // // // // // // //       console.error(error);
// // // // // // // // // // //       const errorMessage = error instanceof Error ? error.message : "Something went wrong";
// // // // // // // // // // //       toast.error(errorMessage);
// // // // // // // // // // //     } finally {
// // // // // // // // // // //       setSubmitting(false);
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   // --- RENDER ---

// // // // // // // // // // //   if (loading) {
// // // // // // // // // // //     return (
// // // // // // // // // // //       <div className="min-h-screen bg-gray-100 flex items-center justify-center">
// // // // // // // // // // //         <div className="flex items-center gap-2 text-teal-700">
// // // // // // // // // // //             <Loader2 className="animate-spin h-6 w-6" /> Loading...
// // // // // // // // // // //         </div>
// // // // // // // // // // //       </div>
// // // // // // // // // // //     );
// // // // // // // // // // //   }

// // // // // // // // // // //   if (!child) return null;

// // // // // // // // // // //   return (
// // // // // // // // // // //     <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6">
// // // // // // // // // // //       <Toaster position="top-right" />
      
// // // // // // // // // // //       <div className="max-w-7xl mx-auto">
// // // // // // // // // // //         <Card className="shadow-lg border-0 rounded-xl overflow-hidden">
          
// // // // // // // // // // //           {/* Header */}
// // // // // // // // // // //           <CardHeader className="bg-white border-b px-6 py-4">
// // // // // // // // // // //             <h5 className="text-xl font-bold text-teal-700 m-0">Child Discharge</h5>
// // // // // // // // // // //           </CardHeader>

// // // // // // // // // // //           <CardContent className="p-6 bg-gray-50/30">
// // // // // // // // // // //             <form onSubmit={handleSubmit}>
                
// // // // // // // // // // //                 {/* --- SECTION 1: Read Only Details --- */}
// // // // // // // // // // //                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
// // // // // // // // // // //                     <div>
// // // // // // // // // // //                         <label className="text-xs font-semibold text-gray-500 uppercase">SAM Number</label>
// // // // // // // // // // //                         <Input value={child.SamNo} readOnly className="bg-gray-100 font-medium mt-1" />
// // // // // // // // // // //                     </div>
// // // // // // // // // // //                     <div>
// // // // // // // // // // //                         <label className="text-xs font-semibold text-gray-500 uppercase">Child Name</label>
// // // // // // // // // // //                         <Input value={child.ChildName} readOnly className="bg-gray-100 font-medium mt-1" />
// // // // // // // // // // //                     </div>
// // // // // // // // // // //                     <div>
// // // // // // // // // // //                         <label className="text-xs font-semibold text-gray-500 uppercase">Admission Date</label>
// // // // // // // // // // //                         <div className="relative mt-1">
// // // // // // // // // // //                             <Input value={new Date(child.AdmissionDate).toLocaleDateString()} readOnly className="bg-gray-100 font-medium pr-10" />
// // // // // // // // // // //                             <div className="absolute right-3 top-2.5 text-gray-400"><i className="fas fa-calendar"></i></div>
// // // // // // // // // // //                         </div>
// // // // // // // // // // //                     </div>
// // // // // // // // // // //                     <div>
// // // // // // // // // // //                         <label className="text-xs font-semibold text-gray-500 uppercase">Admission Weight</label>
// // // // // // // // // // //                         <Input value={child.AdmissionWeight} readOnly className="bg-gray-100 font-medium mt-1" />
// // // // // // // // // // //                     </div>
// // // // // // // // // // //                 </div>

// // // // // // // // // // //                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 border-b pb-8">
// // // // // // // // // // //                     <div>
// // // // // // // // // // //                         <label className="text-xs font-semibold text-gray-500 uppercase">Admission Height (cm)</label>
// // // // // // // // // // //                         <Input value={child.AdmissionHeight} readOnly className="bg-gray-100 font-medium mt-1" />
// // // // // // // // // // //                     </div>
// // // // // // // // // // //                     <div>
// // // // // // // // // // //                         <label className="text-xs font-semibold text-gray-500 uppercase">Admission Edema</label>
// // // // // // // // // // //                         <Input value={child.AdmissionEdema} readOnly className="bg-gray-100 font-medium mt-1" />
// // // // // // // // // // //                     </div>
// // // // // // // // // // //                     <div>
// // // // // // // // // // //                         <label className="text-xs font-semibold text-gray-500 uppercase">Admission MUAC (cm)</label>
// // // // // // // // // // //                         <Input value={child.AdmissionMuac} readOnly className="bg-gray-100 font-medium mt-1" />
// // // // // // // // // // //                     </div>
// // // // // // // // // // //                     <div>
// // // // // // // // // // //                         <label className="text-xs font-semibold text-gray-500 uppercase">Target Weight (kg)</label>
// // // // // // // // // // //                         <Input value={child.TargetWeight} readOnly className="bg-gray-100 font-medium mt-1" />
// // // // // // // // // // //                     </div>
// // // // // // // // // // //                 </div>

// // // // // // // // // // //                 {/* --- SECTION 2: Discharge Vitals --- */}
// // // // // // // // // // //                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
// // // // // // // // // // //                     <div>
// // // // // // // // // // //                         <label className="text-sm font-medium text-gray-700">Discharge Date <span className="text-red-500">*</span></label>
// // // // // // // // // // //                         <Input 
// // // // // // // // // // //                             type="date" 
// // // // // // // // // // //                             value={dischargeDate} 
// // // // // // // // // // //                             onChange={handleDateChange} 
// // // // // // // // // // //                             max={new Date().toISOString().split('T')[0]}
// // // // // // // // // // //                             className="mt-1" 
// // // // // // // // // // //                         />
// // // // // // // // // // //                     </div>
// // // // // // // // // // //                     <div>
// // // // // // // // // // //                         <label className="text-sm font-medium text-gray-700">Discharge Weight (kg) <span className="text-red-500">*</span></label>
// // // // // // // // // // //                         <Input 
// // // // // // // // // // //                             type="number" step="0.01" 
// // // // // // // // // // //                             value={dischargeWeight} 
// // // // // // // // // // //                             onChange={handleWeightChange} 
// // // // // // // // // // //                             placeholder="Max 100"
// // // // // // // // // // //                             className="mt-1" 
// // // // // // // // // // //                         />
// // // // // // // // // // //                     </div>
// // // // // // // // // // //                     <div>
// // // // // // // // // // //                         <label className="text-sm font-medium text-gray-700">Discharge Height (cm) <span className="text-red-500">*</span></label>
// // // // // // // // // // //                         <Input 
// // // // // // // // // // //                             type="number" step="0.1" 
// // // // // // // // // // //                             value={dischargeHeight} 
// // // // // // // // // // //                             onChange={handleHeightChange} 
// // // // // // // // // // //                             placeholder="Max 150"
// // // // // // // // // // //                             className="mt-1" 
// // // // // // // // // // //                         />
// // // // // // // // // // //                     </div>
// // // // // // // // // // //                     <div>
// // // // // // // // // // //                         <label className="text-sm font-medium text-gray-700">Discharge MUAC (cm) <span className="text-red-500">*</span></label>
// // // // // // // // // // //                         <Input 
// // // // // // // // // // //                             type="number" step="0.1" 
// // // // // // // // // // //                             value={dischargeMuac} 
// // // // // // // // // // //                             onChange={(e) => setDischargeMuac(e.target.value)} 
// // // // // // // // // // //                             className="mt-1" 
// // // // // // // // // // //                         />
// // // // // // // // // // //                     </div>
// // // // // // // // // // //                 </div>

// // // // // // // // // // //                 {/* --- SECTION 3: Photo Upload --- */}
// // // // // // // // // // //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
// // // // // // // // // // //                     <div>
// // // // // // // // // // //                         <label className="text-sm font-medium text-gray-700 block mb-2">Upload Photo (max 2MB, png/jpeg only)</label>
// // // // // // // // // // //                         <div className="flex gap-4 items-start">
// // // // // // // // // // //                             <Input 
// // // // // // // // // // //                                 type="file" 
// // // // // // // // // // //                                 accept="image/png, image/jpeg" 
// // // // // // // // // // //                                 onChange={handlePhotoChange} 
// // // // // // // // // // //                                 className="cursor-pointer file:text-teal-700 file:font-semibold"
// // // // // // // // // // //                             />
// // // // // // // // // // //                         </div>
// // // // // // // // // // //                     </div>
// // // // // // // // // // //                     <div className="flex justify-center md:justify-start">
// // // // // // // // // // //                         {photoPreview ? (
// // // // // // // // // // //                             <Image 
// // // // // // // // // // //                                 src={photoPreview} 
// // // // // // // // // // //                                 alt="Child" 
// // // // // // // // // // //                                 width={240} 
// // // // // // // // // // //                                 height={140} 
// // // // // // // // // // //                                 className="rounded-lg shadow-sm border object-cover h-[140px] w-60" 
// // // // // // // // // // //                             />
// // // // // // // // // // //                         ) : (
// // // // // // // // // // //                             <div className="h-[140px] w-60 bg-gray-100 rounded-lg border-2 border-dashed flex items-center justify-center text-gray-400">
// // // // // // // // // // //                                 <span className="text-sm">No Image</span>
// // // // // // // // // // //                             </div>
// // // // // // // // // // //                         )}
// // // // // // // // // // //                     </div>
// // // // // // // // // // //                 </div>

// // // // // // // // // // //                 {/* --- SECTION 4: Outcomes & Medical --- */}
// // // // // // // // // // //                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
// // // // // // // // // // //                     <div>
// // // // // // // // // // //                         <label className="text-sm font-medium text-gray-700">Outcome Indicator <span className="text-red-500">*</span></label>
// // // // // // // // // // //                         <Select value={outcomeIndicator} onValueChange={setOutcomeIndicator}>
// // // // // // // // // // //                             <SelectTrigger className="mt-1"><SelectValue placeholder="Select" /></SelectTrigger>
// // // // // // // // // // //                             <SelectContent>
// // // // // // // // // // //                                 <SelectItem value="1">CURED</SelectItem>
// // // // // // // // // // //                                 <SelectItem value="2">DEFAULTER</SelectItem>
// // // // // // // // // // //                                 <SelectItem value="3">MEDICAL TRANSFER</SelectItem>
// // // // // // // // // // //                                 <SelectItem value="4">NON RESPONDENT</SelectItem>
// // // // // // // // // // //                                 <SelectItem value="5">DEATH</SelectItem>
// // // // // // // // // // //                                 <SelectItem value="6">PARTIAL IMPROVEMENT</SelectItem>
// // // // // // // // // // //                             </SelectContent>
// // // // // // // // // // //                         </Select>
// // // // // // // // // // //                     </div>
// // // // // // // // // // //                     <div>
// // // // // // // // // // //                         <label className="text-sm font-medium text-gray-700">Discharge EDEMA <span className="text-red-500">*</span></label>
// // // // // // // // // // //                         <Select value={dischargeEdema} onValueChange={setDischargeEdema}>
// // // // // // // // // // //                             <SelectTrigger className="mt-1"><SelectValue placeholder="Select" /></SelectTrigger>
// // // // // // // // // // //                             <SelectContent>
// // // // // // // // // // //                                 <SelectItem value="4">No Edema</SelectItem>
// // // // // // // // // // //                                 <SelectItem value="1">+</SelectItem>
// // // // // // // // // // //                                 <SelectItem value="2">++</SelectItem>
// // // // // // // // // // //                                 <SelectItem value="3">+++</SelectItem>
// // // // // // // // // // //                             </SelectContent>
// // // // // // // // // // //                         </Select>
// // // // // // // // // // //                     </div>
// // // // // // // // // // //                     <div>
// // // // // // // // // // //                         <label className="text-sm font-medium text-gray-700">Adm. Hemoglobin (gm/dl)</label>
// // // // // // // // // // //                         <Input value={child.AdmissionHemoglobin || "N/A"} readOnly className="bg-gray-100 font-medium mt-1" />
// // // // // // // // // // //                     </div>
// // // // // // // // // // //                     <div>
// // // // // // // // // // //                         <label className="text-sm font-medium text-gray-700">Mother&apos;s Hb (gm/dl) <span className="text-red-500">*</span></label>
// // // // // // // // // // //                         <Input 
// // // // // // // // // // //                             type="number" step="0.1" 
// // // // // // // // // // //                             value={hemoglobinMother} 
// // // // // // // // // // //                             onChange={(e) => setHemoglobinMother(e.target.value)} 
// // // // // // // // // // //                             className="mt-1"
// // // // // // // // // // //                         />
// // // // // // // // // // //                     </div>
// // // // // // // // // // //                 </div>

// // // // // // // // // // //                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
// // // // // // // // // // //                     <div>
// // // // // // // // // // //                         <label className="text-sm font-medium text-gray-700">IFA Given To Mother <span className="text-red-500">*</span></label>
// // // // // // // // // // //                         <Select value={ifaGivenToMother} onValueChange={setIfaGivenToMother}>
// // // // // // // // // // //                             <SelectTrigger className="mt-1"><SelectValue placeholder="Select" /></SelectTrigger>
// // // // // // // // // // //                             <SelectContent>
// // // // // // // // // // //                                 <SelectItem value="0">Select</SelectItem>
// // // // // // // // // // //                                 <SelectItem value="1">Yes</SelectItem>
// // // // // // // // // // //                                 <SelectItem value="2">No</SelectItem>
// // // // // // // // // // //                             </SelectContent>
// // // // // // // // // // //                         </Select>
// // // // // // // // // // //                     </div>
// // // // // // // // // // //                     <div>
// // // // // // // // // // //                         <label className="text-sm font-medium text-gray-700">Mother&apos;s Wage Comp. <span className="text-red-500">*</span></label>
// // // // // // // // // // //                         <Select value={motherPayment} onValueChange={setMotherPayment}>
// // // // // // // // // // //                             <SelectTrigger className="mt-1"><SelectValue placeholder="Select" /></SelectTrigger>
// // // // // // // // // // //                             <SelectContent>
// // // // // // // // // // //                                 <SelectItem value="0">Select</SelectItem>
// // // // // // // // // // //                                 <SelectItem value="1">Yes</SelectItem>
// // // // // // // // // // //                                 <SelectItem value="2">No</SelectItem>
// // // // // // // // // // //                             </SelectContent>
// // // // // // // // // // //                         </Select>
// // // // // // // // // // //                     </div>
// // // // // // // // // // //                     <div>
// // // // // // // // // // //                         <label className="text-sm font-medium text-gray-700">IFA Syrup to Child <span className="text-red-500">*</span></label>
// // // // // // // // // // //                         <Select value={ifaSyrup} onValueChange={setIfaSyrup}>
// // // // // // // // // // //                             <SelectTrigger className="mt-1"><SelectValue placeholder="Select" /></SelectTrigger>
// // // // // // // // // // //                             <SelectContent>
// // // // // // // // // // //                                 <SelectItem value="0">Select</SelectItem>
// // // // // // // // // // //                                 <SelectItem value="1">Yes</SelectItem>
// // // // // // // // // // //                                 <SelectItem value="2">No</SelectItem>
// // // // // // // // // // //                             </SelectContent>
// // // // // // // // // // //                         </Select>
// // // // // // // // // // //                     </div>
// // // // // // // // // // //                 </div>

// // // // // // // // // // //                 {/* --- SECTION 5: Conditional Edema Fields --- */}
// // // // // // // // // // //                 {child.AdmissionEdema && child.AdmissionEdema.trim() !== "No" && (
// // // // // // // // // // //                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-yellow-50 p-4 rounded-md border border-yellow-100 mb-6 animate-in fade-in">
// // // // // // // // // // //                         <div>
// // // // // // // // // // //                             <label className="text-sm font-medium text-gray-700">Minimum Weight <span className="text-red-500">*</span></label>
// // // // // // // // // // //                             <Input 
// // // // // // // // // // //                                 type="number" step="0.01" 
// // // // // // // // // // //                                 value={minimumWeight} 
// // // // // // // // // // //                                 onChange={(e) => setMinimumWeight(e.target.value)} 
// // // // // // // // // // //                                 className="mt-1 border-yellow-300 focus-visible:ring-yellow-400" 
// // // // // // // // // // //                             />
// // // // // // // // // // //                         </div>
// // // // // // // // // // //                         <div>
// // // // // // // // // // //                             <label className="text-sm font-medium text-gray-700">Total Stay (Days)</label>
// // // // // // // // // // //                             <Input 
// // // // // // // // // // //                                 value={totalStay} 
// // // // // // // // // // //                                 readOnly 
// // // // // // // // // // //                                 className="bg-yellow-100 font-bold mt-1 text-gray-700 border-yellow-300" 
// // // // // // // // // // //                             />
// // // // // // // // // // //                         </div>
// // // // // // // // // // //                     </div>
// // // // // // // // // // //                 )}

// // // // // // // // // // //                 {/* --- Footer Buttons --- */}
// // // // // // // // // // //                 <div className="flex flex-col sm:flex-row justify-end gap-3 mt-8 pt-6 border-t">
// // // // // // // // // // //                     <Button 
// // // // // // // // // // //                         type="submit" 
// // // // // // // // // // //                         disabled={submitting} 
// // // // // // // // // // //                         className="bg-linear-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white min-w-[140px]"
// // // // // // // // // // //                     >
// // // // // // // // // // //                         {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
// // // // // // // // // // //                         Submit
// // // // // // // // // // //                     </Button>
                    
// // // // // // // // // // //                     <Button 
// // // // // // // // // // //                         type="button" 
// // // // // // // // // // //                         variant="outline" 
// // // // // // // // // // //                         className="border-teal-200 text-teal-700 hover:bg-teal-50"
// // // // // // // // // // //                         onClick={() => router.push("/mtc-user/dashboard/discharge")}
// // // // // // // // // // //                     >
// // // // // // // // // // //                         <X className="mr-2 h-4 w-4" /> Cancel
// // // // // // // // // // //                     </Button>
// // // // // // // // // // //                 </div>

// // // // // // // // // // //             </form>
// // // // // // // // // // //           </CardContent>
// // // // // // // // // // //         </Card>
// // // // // // // // // // //       </div>
// // // // // // // // // // //     </div>
// // // // // // // // // // //   );
// // // // // // // // // // // }

// // // // // // // // // "use client";

// // // // // // // // // import { useState, useEffect } from "react";
// // // // // // // // // import { useRouter, useParams } from "next/navigation";
// // // // // // // // // import { Button } from "@/components/ui/button";
// // // // // // // // // import { Input } from "@/components/ui/input";
// // // // // // // // // import { Card, CardHeader, CardContent } from "@/components/ui/card";
// // // // // // // // // import { 
// // // // // // // // //   Select, 
// // // // // // // // //   SelectContent, 
// // // // // // // // //   SelectItem, 
// // // // // // // // //   SelectTrigger, 
// // // // // // // // //   SelectValue 
// // // // // // // // // } from "@/components/ui/select";
// // // // // // // // // import { Save, X, Loader2 } from "lucide-react";
// // // // // // // // // import Image from "next/image";
// // // // // // // // // import toast, { Toaster } from "react-hot-toast";
// // // // // // // // // import { differenceInDays, isValid } from "date-fns";

// // // // // // // // // // Interface for Child Data (from DB)
// // // // // // // // // interface ChildData {
// // // // // // // // //   SamNo: string;
// // // // // // // // //   ChildName: string;
// // // // // // // // //   FatherName: string;
// // // // // // // // //   MotherName: string;
// // // // // // // // //   AdmissionDate: string;
// // // // // // // // //   AdmissionWeight: number;
// // // // // // // // //   AdmissionHeight: number;
// // // // // // // // //   AdmissionEdema: string; // "No", "++", etc.
// // // // // // // // //   AdmissionMuac: number;
// // // // // // // // //   TargetWeight: number;
// // // // // // // // //   AdmissionHemoglobin: number;
// // // // // // // // // }

// // // // // // // // // export default function DischargeFormPage() {
// // // // // // // // //   const router = useRouter();
// // // // // // // // //   const params = useParams();
  
// // // // // // // // //   // --- State Management ---
// // // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // // //   const [submitting, setSubmitting] = useState(false);
// // // // // // // // //   const [child, setChild] = useState<ChildData | null>(null);
  
// // // // // // // // //   // Form Fields
// // // // // // // // //   const [dischargeDate, setDischargeDate] = useState(new Date().toISOString().split('T')[0]);
// // // // // // // // //   const [dischargeWeight, setDischargeWeight] = useState("");
// // // // // // // // //   const [dischargeHeight, setDischargeHeight] = useState("");
// // // // // // // // //   const [dischargeMuac, setDischargeMuac] = useState("");
// // // // // // // // //   const [outcomeIndicator, setOutcomeIndicator] = useState("");
// // // // // // // // //   const [dischargeEdema, setDischargeEdema] = useState("");
  
// // // // // // // // //   // Medical / Social
// // // // // // // // //   const [hemoglobinMother, setHemoglobinMother] = useState("");
// // // // // // // // //   const [ifaGivenToMother, setIfaGivenToMother] = useState("0");
// // // // // // // // //   const [motherPayment, setMotherPayment] = useState("0");
// // // // // // // // //   const [ifaSyrup, setIfaSyrup] = useState("0");
  
// // // // // // // // //   // Conditional Fields (Only if Admission Edema != "No")
// // // // // // // // //   const [minimumWeight, setMinimumWeight] = useState("");
// // // // // // // // //   const [totalStay, setTotalStay] = useState("0");

// // // // // // // // //   // Photo
// // // // // // // // //   const [photoPreview, setPhotoPreview] = useState<string>("");

// // // // // // // // //   // --- 1. Fetch Child Data ---
// // // // // // // // //   useEffect(() => {
// // // // // // // // //     const fetchChild = async () => {
// // // // // // // // //       const id = typeof params.id === 'string' ? params.id : params.id?.[0];
// // // // // // // // //       if (!id) return;

// // // // // // // // //       try {
// // // // // // // // //         const decodedId = decodeURIComponent(id);
// // // // // // // // //         const res = await fetch(`/api/child/${encodeURIComponent(decodedId)}`);
// // // // // // // // //         const result = await res.json();

// // // // // // // // //         if (result.success && result.data) {
// // // // // // // // //           setChild(result.data);
// // // // // // // // //           // Initial calculation for total stay based on today
// // // // // // // // //           if (result.data.AdmissionDate) {
// // // // // // // // //              calculateTotalStay(result.data.AdmissionDate, new Date().toISOString().split('T')[0]);
// // // // // // // // //           }
// // // // // // // // //         } else {
// // // // // // // // //           toast.error("Child not found");
// // // // // // // // //           router.push("/mtc-user/dashboard/discharge");
// // // // // // // // //         }
// // // // // // // // //       } catch (error) {
// // // // // // // // //         toast.error("Error loading data");
// // // // // // // // //       } finally {
// // // // // // // // //         setLoading(false);
// // // // // // // // //       }
// // // // // // // // //     };

// // // // // // // // //     fetchChild();
// // // // // // // // //   }, [params.id, router]);

// // // // // // // // //   // --- 2. Logic & Calculations ---

// // // // // // // // //   // Calculate Total Stay Days
// // // // // // // // //   const calculateTotalStay = (admDateStr: string, disDateStr: string) => {
// // // // // // // // //     const admDate = new Date(admDateStr);
// // // // // // // // //     const disDate = new Date(disDateStr);
    
// // // // // // // // //     if (isValid(admDate) && isValid(disDate)) {
// // // // // // // // //       const days = differenceInDays(disDate, admDate);
// // // // // // // // //       setTotalStay(days >= 0 ? days.toString() : "0");
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   // Handle Date Change
// // // // // // // // //   const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // // // //     const newDate = e.target.value;
// // // // // // // // //     setDischargeDate(newDate);
    
// // // // // // // // //     if (child?.AdmissionDate) {
// // // // // // // // //       const adm = new Date(child.AdmissionDate);
// // // // // // // // //       const dis = new Date(newDate);
      
// // // // // // // // //       if (dis < adm) {
// // // // // // // // //         toast.error("Discharge date cannot be before Admission Date");
// // // // // // // // //         setDischargeDate(""); // Reset
// // // // // // // // //         setTotalStay("0");
// // // // // // // // //       } else {
// // // // // // // // //         calculateTotalStay(child.AdmissionDate, newDate);
// // // // // // // // //       }
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   // Validations (Height > 150, Weight > 100)
// // // // // // // // //   const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // // // //     const val = parseFloat(e.target.value);
// // // // // // // // //     if (val > 100) {
// // // // // // // // //       toast.error("Weight cannot be greater than 100kg");
// // // // // // // // //       setDischargeWeight("");
// // // // // // // // //     } else {
// // // // // // // // //       setDischargeWeight(e.target.value);
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // // // //     const val = parseFloat(e.target.value);
// // // // // // // // //     if (val > 150) {
// // // // // // // // //       toast.error("Height cannot be greater than 150cm");
// // // // // // // // //       setDischargeHeight("");
// // // // // // // // //     } else {
// // // // // // // // //       setDischargeHeight(e.target.value);
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   // Photo Upload (Max 2MB)
// // // // // // // // //   const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // // // //     if (e.target.files && e.target.files[0]) {
// // // // // // // // //       const file = e.target.files[0];
      
// // // // // // // // //       // Validation: Type
// // // // // // // // //       if (!["image/jpeg", "image/png"].includes(file.type)) {
// // // // // // // // //         toast.error("Please upload a valid image file (JPEG/PNG)");
// // // // // // // // //         e.target.value = "";
// // // // // // // // //         return;
// // // // // // // // //       }

// // // // // // // // //       // Validation: Size (2MB = 2048 KB)
// // // // // // // // //       if (file.size > 2 * 1024 * 1024) {
// // // // // // // // //         toast.error("Please upload file size Less than 2 MB");
// // // // // // // // //         e.target.value = "";
// // // // // // // // //         return;
// // // // // // // // //       }

// // // // // // // // //       const reader = new FileReader();
// // // // // // // // //       reader.onload = () => setPhotoPreview(reader.result as string);
// // // // // // // // //       reader.readAsDataURL(file);
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   // --- 3. Submit Handler ---
// // // // // // // // //   const handleSubmit = async (e: React.FormEvent) => {
// // // // // // // // //     e.preventDefault();

// // // // // // // // //     // Required Field Validations
// // // // // // // // //     if (!dischargeDate || !dischargeWeight || !dischargeHeight || !dischargeMuac || !outcomeIndicator || !dischargeEdema) {
// // // // // // // // //       toast.error("Please fill all compulsory fields marked with *");
// // // // // // // // //       return;
// // // // // // // // //     }
// // // // // // // // //     if (ifaGivenToMother === "0" || motherPayment === "0" || ifaSyrup === "0") {
// // // // // // // // //       toast.error("Please select all Yes/No dropdowns");
// // // // // // // // //       return;
// // // // // // // // //     }
// // // // // // // // //     if (!hemoglobinMother) {
// // // // // // // // //         toast.error("Please enter Mother's Hemoglobin");
// // // // // // // // //         return;
// // // // // // // // //     }
// // // // // // // // //     // Conditional Validation for Edema
// // // // // // // // //     if (child?.AdmissionEdema && child.AdmissionEdema.trim() !== "No" && !minimumWeight) {
// // // // // // // // //         toast.error("Please enter Minimum Weight");
// // // // // // // // //         return;
// // // // // // // // //     }

// // // // // // // // //     setSubmitting(true);

// // // // // // // // //     try {
// // // // // // // // //       const payload = {
// // // // // // // // //         SamNo: child?.SamNo,
// // // // // // // // //         DischargeDate: dischargeDate,
// // // // // // // // //         DischargeWeight: parseFloat(dischargeWeight),
// // // // // // // // //         DischargeHeight: parseFloat(dischargeHeight),
// // // // // // // // //         DischargeMuac: parseFloat(dischargeMuac),
// // // // // // // // //         DischargeEdema: parseInt(dischargeEdema),
// // // // // // // // //         ExitIndicator: parseInt(outcomeIndicator),
// // // // // // // // //         IFAToMotherTablet: parseInt(ifaGivenToMother),
// // // // // // // // //         MotherWages: parseInt(motherPayment),
// // // // // // // // //         IFAToMotherSyrup: parseInt(ifaSyrup),
// // // // // // // // //         HemoglobinMother: parseFloat(hemoglobinMother),
// // // // // // // // //         DischargeImage: photoPreview || null,
// // // // // // // // //         // Include calculated fields if your API needs them
// // // // // // // // //         TotalStay: parseInt(totalStay), 
// // // // // // // // //         MinimumWeight: minimumWeight ? parseFloat(minimumWeight) : null
// // // // // // // // //       };

// // // // // // // // //       const res = await fetch("/api/discharge-child", {
// // // // // // // // //         method: "PUT",
// // // // // // // // //         headers: { "Content-Type": "application/json" },
// // // // // // // // //         body: JSON.stringify(payload),
// // // // // // // // //       });

// // // // // // // // //       const result = await res.json();

// // // // // // // // //       if (!res.ok) throw new Error(result.message || "Failed to save");

// // // // // // // // //       toast.success("Record Saved Successfully!");
      
// // // // // // // // //       // Optional: Redirect to Next Step (Follow Up) Logic
// // // // // // // // //       setTimeout(() => {
// // // // // // // // //          router.push("/mtc-user/dashboard/discharge");
// // // // // // // // //       }, 2000);

// // // // // // // // //     } catch (error: any) {
// // // // // // // // //       console.error(error);
// // // // // // // // //       toast.error(error.message || "Something went wrong");
// // // // // // // // //     } finally {
// // // // // // // // //       setSubmitting(false);
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   // --- RENDER ---

// // // // // // // // //   if (loading) {
// // // // // // // // //     return (
// // // // // // // // //       <div className="min-h-screen bg-gray-100 flex items-center justify-center">
// // // // // // // // //         <div className="flex items-center gap-2 text-teal-700">
// // // // // // // // //             <Loader2 className="animate-spin h-6 w-6" /> Loading...
// // // // // // // // //         </div>
// // // // // // // // //       </div>
// // // // // // // // //     );
// // // // // // // // //   }

// // // // // // // // //   if (!child) return null;

// // // // // // // // //   return (
// // // // // // // // //     <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6">
// // // // // // // // //       <Toaster position="top-right" />
      
// // // // // // // // //       <div className="max-w-7xl mx-auto">
// // // // // // // // //         <Card className="shadow-lg border-0 rounded-xl overflow-hidden">
          
// // // // // // // // //           {/* Header */}
// // // // // // // // //           <CardHeader className="bg-white border-b px-6 py-4">
// // // // // // // // //             <h5 className="text-xl font-bold text-teal-700 m-0">Child Discharge</h5>
// // // // // // // // //           </CardHeader>

// // // // // // // // //           <CardContent className="p-6 bg-gray-50/30">
// // // // // // // // //             <form onSubmit={handleSubmit}>
                
// // // // // // // // //                 {/* --- SECTION 1: Read Only Details --- */}
// // // // // // // // //                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
// // // // // // // // //                     <div>
// // // // // // // // //                         <label className="text-xs font-semibold text-gray-500 uppercase">SAM Number</label>
// // // // // // // // //                         <Input value={child.SamNo} readOnly className="bg-gray-100 font-medium mt-1" />
// // // // // // // // //                     </div>
// // // // // // // // //                     <div>
// // // // // // // // //                         <label className="text-xs font-semibold text-gray-500 uppercase">Child Name</label>
// // // // // // // // //                         <Input value={child.ChildName} readOnly className="bg-gray-100 font-medium mt-1" />
// // // // // // // // //                     </div>
// // // // // // // // //                     <div>
// // // // // // // // //                         <label className="text-xs font-semibold text-gray-500 uppercase">Admission Date</label>
// // // // // // // // //                         <div className="relative mt-1">
// // // // // // // // //                             <Input value={new Date(child.AdmissionDate).toLocaleDateString()} readOnly className="bg-gray-100 font-medium pr-10" />
// // // // // // // // //                             <div className="absolute right-3 top-2.5 text-gray-400"><i className="fas fa-calendar"></i></div>
// // // // // // // // //                         </div>
// // // // // // // // //                     </div>
// // // // // // // // //                     <div>
// // // // // // // // //                         <label className="text-xs font-semibold text-gray-500 uppercase">Admission Weight</label>
// // // // // // // // //                         <Input value={child.AdmissionWeight} readOnly className="bg-gray-100 font-medium mt-1" />
// // // // // // // // //                     </div>
// // // // // // // // //                 </div>

// // // // // // // // //                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 border-b pb-8">
// // // // // // // // //                     <div>
// // // // // // // // //                         <label className="text-xs font-semibold text-gray-500 uppercase">Admission Height (cm)</label>
// // // // // // // // //                         <Input value={child.AdmissionHeight} readOnly className="bg-gray-100 font-medium mt-1" />
// // // // // // // // //                     </div>
// // // // // // // // //                     <div>
// // // // // // // // //                         <label className="text-xs font-semibold text-gray-500 uppercase">Admission Edema</label>
// // // // // // // // //                         <Input value={child.AdmissionEdema} readOnly className="bg-gray-100 font-medium mt-1" />
// // // // // // // // //                     </div>
// // // // // // // // //                     <div>
// // // // // // // // //                         <label className="text-xs font-semibold text-gray-500 uppercase">Admission MUAC (cm)</label>
// // // // // // // // //                         <Input value={child.AdmissionMuac} readOnly className="bg-gray-100 font-medium mt-1" />
// // // // // // // // //                     </div>
// // // // // // // // //                     <div>
// // // // // // // // //                         <label className="text-xs font-semibold text-gray-500 uppercase">Target Weight (kg)</label>
// // // // // // // // //                         <Input value={child.TargetWeight} readOnly className="bg-gray-100 font-medium mt-1" />
// // // // // // // // //                     </div>
// // // // // // // // //                 </div>

// // // // // // // // //                 {/* --- SECTION 2: Discharge Vitals --- */}
// // // // // // // // //                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
// // // // // // // // //                     <div>
// // // // // // // // //                         <label className="text-sm font-medium text-gray-700">Discharge Date <span className="text-red-500">*</span></label>
// // // // // // // // //                         <Input 
// // // // // // // // //                             type="date" 
// // // // // // // // //                             value={dischargeDate} 
// // // // // // // // //                             onChange={handleDateChange} 
// // // // // // // // //                             max={new Date().toISOString().split('T')[0]}
// // // // // // // // //                             className="mt-1" 
// // // // // // // // //                         />
// // // // // // // // //                     </div>
// // // // // // // // //                     <div>
// // // // // // // // //                         <label className="text-sm font-medium text-gray-700">Discharge Weight (kg) <span className="text-red-500">*</span></label>
// // // // // // // // //                         <Input 
// // // // // // // // //                             type="number" step="0.01" 
// // // // // // // // //                             value={dischargeWeight} 
// // // // // // // // //                             onChange={handleWeightChange} 
// // // // // // // // //                             placeholder="Max 100"
// // // // // // // // //                             className="mt-1" 
// // // // // // // // //                         />
// // // // // // // // //                     </div>
// // // // // // // // //                     <div>
// // // // // // // // //                         <label className="text-sm font-medium text-gray-700">Discharge Height (cm) <span className="text-red-500">*</span></label>
// // // // // // // // //                         <Input 
// // // // // // // // //                             type="number" step="0.1" 
// // // // // // // // //                             value={dischargeHeight} 
// // // // // // // // //                             onChange={handleHeightChange} 
// // // // // // // // //                             placeholder="Max 150"
// // // // // // // // //                             className="mt-1" 
// // // // // // // // //                         />
// // // // // // // // //                     </div>
// // // // // // // // //                     <div>
// // // // // // // // //                         <label className="text-sm font-medium text-gray-700">Discharge MUAC (cm) <span className="text-red-500">*</span></label>
// // // // // // // // //                         <Input 
// // // // // // // // //                             type="number" step="0.1" 
// // // // // // // // //                             value={dischargeMuac} 
// // // // // // // // //                             onChange={(e) => setDischargeMuac(e.target.value)} 
// // // // // // // // //                             className="mt-1" 
// // // // // // // // //                         />
// // // // // // // // //                     </div>
// // // // // // // // //                 </div>

// // // // // // // // //                 {/* --- SECTION 3: Photo Upload --- */}
// // // // // // // // //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
// // // // // // // // //                     <div>
// // // // // // // // //                         <label className="text-sm font-medium text-gray-700 block mb-2">Upload Photo (max 2MB, png/jpeg only)</label>
// // // // // // // // //                         <div className="flex gap-4 items-start">
// // // // // // // // //                             <Input 
// // // // // // // // //                                 type="file" 
// // // // // // // // //                                 accept="image/png, image/jpeg" 
// // // // // // // // //                                 onChange={handlePhotoChange} 
// // // // // // // // //                                 className="cursor-pointer file:text-teal-700 file:font-semibold"
// // // // // // // // //                             />
// // // // // // // // //                         </div>
// // // // // // // // //                     </div>
// // // // // // // // //                     <div className="flex justify-center md:justify-start">
// // // // // // // // //                         {photoPreview ? (
// // // // // // // // //                             <Image 
// // // // // // // // //                                 src={photoPreview} 
// // // // // // // // //                                 alt="Child" 
// // // // // // // // //                                 width={240} 
// // // // // // // // //                                 height={140} 
// // // // // // // // //                                 className="rounded-lg shadow-sm border object-cover h-[140px] w-60" 
// // // // // // // // //                             />
// // // // // // // // //                         ) : (
// // // // // // // // //                             <div className="h-[140px] w-60 bg-gray-100 rounded-lg border-2 border-dashed flex items-center justify-center text-gray-400">
// // // // // // // // //                                 <span className="text-sm">No Image</span>
// // // // // // // // //                             </div>
// // // // // // // // //                         )}
// // // // // // // // //                     </div>
// // // // // // // // //                 </div>

// // // // // // // // //                 {/* --- SECTION 4: Outcomes & Medical --- */}
// // // // // // // // //                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
// // // // // // // // //                     <div>
// // // // // // // // //                         <label className="text-sm font-medium text-gray-700">Outcome Indicator <span className="text-red-500">*</span></label>
// // // // // // // // //                         <Select value={outcomeIndicator} onValueChange={setOutcomeIndicator}>
// // // // // // // // //                             <SelectTrigger className="mt-1"><SelectValue placeholder="Select" /></SelectTrigger>
// // // // // // // // //                             <SelectContent>
// // // // // // // // //                                 <SelectItem value="1">CURED</SelectItem>
// // // // // // // // //                                 <SelectItem value="2">DEFAULTER</SelectItem>
// // // // // // // // //                                 <SelectItem value="3">MEDICAL TRANSFER</SelectItem>
// // // // // // // // //                                 <SelectItem value="4">NON RESPONDENT</SelectItem>
// // // // // // // // //                                 <SelectItem value="5">DEATH</SelectItem>
// // // // // // // // //                                 <SelectItem value="6">PARTIAL IMPROVEMENT</SelectItem>
// // // // // // // // //                             </SelectContent>
// // // // // // // // //                         </Select>
// // // // // // // // //                     </div>
// // // // // // // // //                     <div>
// // // // // // // // //                         <label className="text-sm font-medium text-gray-700">Discharge EDEMA <span className="text-red-500">*</span></label>
// // // // // // // // //                         <Select value={dischargeEdema} onValueChange={setDischargeEdema}>
// // // // // // // // //                             <SelectTrigger className="mt-1"><SelectValue placeholder="Select" /></SelectTrigger>
// // // // // // // // //                             <SelectContent>
// // // // // // // // //                                 <SelectItem value="4">No Edema</SelectItem>
// // // // // // // // //                                 <SelectItem value="1">+</SelectItem>
// // // // // // // // //                                 <SelectItem value="2">++</SelectItem>
// // // // // // // // //                                 <SelectItem value="3">+++</SelectItem>
// // // // // // // // //                             </SelectContent>
// // // // // // // // //                         </Select>
// // // // // // // // //                     </div>
// // // // // // // // //                     <div>
// // // // // // // // //                         <label className="text-sm font-medium text-gray-700">Adm. Hemoglobin (gm/dl)</label>
// // // // // // // // //                         <Input value={child.AdmissionHemoglobin || "N/A"} readOnly className="bg-gray-100 font-medium mt-1" />
// // // // // // // // //                     </div>
// // // // // // // // //                     <div>
// // // // // // // // //                         <label className="text-sm font-medium text-gray-700">Mother's Hb (gm/dl) <span className="text-red-500">*</span></label>
// // // // // // // // //                         <Input 
// // // // // // // // //                             type="number" step="0.1" 
// // // // // // // // //                             value={hemoglobinMother} 
// // // // // // // // //                             onChange={(e) => setHemoglobinMother(e.target.value)} 
// // // // // // // // //                             className="mt-1"
// // // // // // // // //                         />
// // // // // // // // //                     </div>
// // // // // // // // //                 </div>

// // // // // // // // //                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
// // // // // // // // //                     <div>
// // // // // // // // //                         <label className="text-sm font-medium text-gray-700">IFA Given To Mother <span className="text-red-500">*</span></label>
// // // // // // // // //                         <Select value={ifaGivenToMother} onValueChange={setIfaGivenToMother}>
// // // // // // // // //                             <SelectTrigger className="mt-1"><SelectValue placeholder="Select" /></SelectTrigger>
// // // // // // // // //                             <SelectContent>
// // // // // // // // //                                 <SelectItem value="0">Select</SelectItem>
// // // // // // // // //                                 <SelectItem value="1">Yes</SelectItem>
// // // // // // // // //                                 <SelectItem value="2">No</SelectItem>
// // // // // // // // //                             </SelectContent>
// // // // // // // // //                         </Select>
// // // // // // // // //                     </div>
// // // // // // // // //                     <div>
// // // // // // // // //                         <label className="text-sm font-medium text-gray-700">Mother's Wage Comp. <span className="text-red-500">*</span></label>
// // // // // // // // //                         <Select value={motherPayment} onValueChange={setMotherPayment}>
// // // // // // // // //                             <SelectTrigger className="mt-1"><SelectValue placeholder="Select" /></SelectTrigger>
// // // // // // // // //                             <SelectContent>
// // // // // // // // //                                 <SelectItem value="0">Select</SelectItem>
// // // // // // // // //                                 <SelectItem value="1">Yes</SelectItem>
// // // // // // // // //                                 <SelectItem value="2">No</SelectItem>
// // // // // // // // //                             </SelectContent>
// // // // // // // // //                         </Select>
// // // // // // // // //                     </div>
// // // // // // // // //                     <div>
// // // // // // // // //                         <label className="text-sm font-medium text-gray-700">IFA Syrup to Child <span className="text-red-500">*</span></label>
// // // // // // // // //                         <Select value={ifaSyrup} onValueChange={setIfaSyrup}>
// // // // // // // // //                             <SelectTrigger className="mt-1"><SelectValue placeholder="Select" /></SelectTrigger>
// // // // // // // // //                             <SelectContent>
// // // // // // // // //                                 <SelectItem value="0">Select</SelectItem>
// // // // // // // // //                                 <SelectItem value="1">Yes</SelectItem>
// // // // // // // // //                                 <SelectItem value="2">No</SelectItem>
// // // // // // // // //                             </SelectContent>
// // // // // // // // //                         </Select>
// // // // // // // // //                     </div>
// // // // // // // // //                 </div>

// // // // // // // // //                 {/* --- SECTION 5: Conditional Edema Fields --- */}
// // // // // // // // //                 {child.AdmissionEdema && child.AdmissionEdema.trim() !== "No" && (
// // // // // // // // //                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-yellow-50 p-4 rounded-md border border-yellow-100 mb-6 animate-in fade-in">
// // // // // // // // //                         <div>
// // // // // // // // //                             <label className="text-sm font-medium text-gray-700">Minimum Weight <span className="text-red-500">*</span></label>
// // // // // // // // //                             <Input 
// // // // // // // // //                                 type="number" step="0.01" 
// // // // // // // // //                                 value={minimumWeight} 
// // // // // // // // //                                 onChange={(e) => setMinimumWeight(e.target.value)} 
// // // // // // // // //                                 className="mt-1 border-yellow-300 focus-visible:ring-yellow-400" 
// // // // // // // // //                             />
// // // // // // // // //                         </div>
// // // // // // // // //                         <div>
// // // // // // // // //                             <label className="text-sm font-medium text-gray-700">Total Stay (Days)</label>
// // // // // // // // //                             <Input 
// // // // // // // // //                                 value={totalStay} 
// // // // // // // // //                                 readOnly 
// // // // // // // // //                                 className="bg-yellow-100 font-bold mt-1 text-gray-700 border-yellow-300" 
// // // // // // // // //                             />
// // // // // // // // //                         </div>
// // // // // // // // //                     </div>
// // // // // // // // //                 )}

// // // // // // // // //                 {/* --- Footer Buttons --- */}
// // // // // // // // //                 <div className="flex flex-col sm:flex-row justify-end gap-3 mt-8 pt-6 border-t">
// // // // // // // // //                     <Button 
// // // // // // // // //                         type="submit" 
// // // // // // // // //                         disabled={submitting} 
// // // // // // // // //                         className="bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white min-w-[140px]"
// // // // // // // // //                     >
// // // // // // // // //                         {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
// // // // // // // // //                         Submit
// // // // // // // // //                     </Button>
                    
// // // // // // // // //                     <Button 
// // // // // // // // //                         type="button" 
// // // // // // // // //                         variant="outline" 
// // // // // // // // //                         className="border-teal-200 text-teal-700 hover:bg-teal-50"
// // // // // // // // //                         onClick={() => router.push("/mtc-user/dashboard/discharge")}
// // // // // // // // //                     >
// // // // // // // // //                         <X className="mr-2 h-4 w-4" /> Cancel
// // // // // // // // //                     </Button>
// // // // // // // // //                 </div>

// // // // // // // // //             </form>
// // // // // // // // //           </CardContent>
// // // // // // // // //         </Card>
// // // // // // // // //       </div>
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // }

// // // // // // // // // app/mtc-user/dashboard/discharge/discharge-form/[id]/page.tsx
// // // // // // // // "use client";

// // // // // // // // import { useState, useEffect, use } from "react";
// // // // // // // // import { useRouter } from "next/navigation";
// // // // // // // // import { Button } from "@/components/ui/button";
// // // // // // // // import { Input } from "@/components/ui/input";
// // // // // // // // import { Card, CardContent } from "@/components/ui/card";
// // // // // // // // import { 
// // // // // // // //   Select, 
// // // // // // // //   SelectContent, 
// // // // // // // //   SelectItem, 
// // // // // // // //   SelectTrigger, 
// // // // // // // //   SelectValue 
// // // // // // // // } from "@/components/ui/select";
// // // // // // // // import { LogOut, X, Loader2, ArrowLeft, Image as ImageIcon } from "lucide-react"; 
// // // // // // // // import Image from "next/image";
// // // // // // // // import toast, { Toaster } from "react-hot-toast";
// // // // // // // // import { differenceInDays, isValid } from "date-fns"; 

// // // // // // // // // Interface for Child Data (from DB)
// // // // // // // // interface ChildData {
// // // // // // // //   id: string;
// // // // // // // //   SamNo: string;
// // // // // // // //   ChildName: string;
// // // // // // // //   FatherName: string;
// // // // // // // //   MotherName: string;
// // // // // // // //   AdmissionDate: string;
// // // // // // // //   AdmissionWeight: number;
// // // // // // // //   AdmissionHeight: number;
// // // // // // // //   AdmissionEdema: string; // "No", "++", etc.
// // // // // // // //   AdmissionMuac: number;
// // // // // // // //   TargetWeight: number;
// // // // // // // //   AdmissionHemoglobin: number;
// // // // // // // // }

// // // // // // // // export default function DischargeFormPage({ params }: { params: Promise<{ id: string }> }) {
// // // // // // // //   const router = useRouter();
  
// // // // // // // //   // Unwrap Next.js 15 async params securely
// // // // // // // //   const { id: childId } = use(params);
  
// // // // // // // //   // --- State Management ---
// // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // //   const [submitting, setSubmitting] = useState(false);
// // // // // // // //   const [child, setChild] = useState<ChildData | null>(null);
  
// // // // // // // //   // Form Fields
// // // // // // // //   const [dischargeDate, setDischargeDate] = useState(new Date().toISOString().split('T')[0]);
// // // // // // // //   const [dischargeWeight, setDischargeWeight] = useState("");
// // // // // // // //   const [dischargeHeight, setDischargeHeight] = useState("");
// // // // // // // //   const [dischargeMuac, setDischargeMuac] = useState("");
// // // // // // // //   const [outcomeIndicator, setOutcomeIndicator] = useState("");
// // // // // // // //   const [dischargeEdema, setDischargeEdema] = useState("");
  
// // // // // // // //   // Medical / Social
// // // // // // // //   const [hemoglobinMother, setHemoglobinMother] = useState("");
// // // // // // // //   const [ifaGivenToMother, setIfaGivenToMother] = useState("0");
// // // // // // // //   const [motherPayment, setMotherPayment] = useState("0");
// // // // // // // //   const [ifaSyrup, setIfaSyrup] = useState("0");
  
// // // // // // // //   // Conditional Fields (Only if Admission Edema != "No")
// // // // // // // //   const [minimumWeight, setMinimumWeight] = useState("");
// // // // // // // //   const [totalStay, setTotalStay] = useState("0");

// // // // // // // //   // Photo
// // // // // // // //   const [photoPreview, setPhotoPreview] = useState<string>("");

// // // // // // // //   // --- 1. Fetch Child Data ---
// // // // // // // //   useEffect(() => {
// // // // // // // //     const fetchChild = async () => {
// // // // // // // //       if (!childId) return;

// // // // // // // //       try {
// // // // // // // //         const res = await fetch(`/api/child/${childId}`);
// // // // // // // //         const result = await res.json();

// // // // // // // //         if (result.success && result.data) {
// // // // // // // //           setChild(result.data);
// // // // // // // //           // Initial calculation for total stay based on today
// // // // // // // //           if (result.data.AdmissionDate) {
// // // // // // // //              calculateTotalStay(result.data.AdmissionDate, new Date().toISOString().split('T')[0]);
// // // // // // // //           }
// // // // // // // //         } else {
// // // // // // // //           toast.error("Child not found");
// // // // // // // //           router.push("/mtc-user/dashboard/discharge");
// // // // // // // //         }
// // // // // // // //       } catch (error) {
// // // // // // // //         console.error("Fetch error:", error); 
// // // // // // // //         toast.error("Error loading data from database");
// // // // // // // //       } finally {
// // // // // // // //         setLoading(false);
// // // // // // // //       }
// // // // // // // //     };

// // // // // // // //     fetchChild();
// // // // // // // //   }, [childId, router]);

// // // // // // // //   // --- 2. Logic & Calculations ---

// // // // // // // //   const calculateTotalStay = (admDateStr: string, disDateStr: string) => {
// // // // // // // //     const admDate = new Date(admDateStr);
// // // // // // // //     const disDate = new Date(disDateStr);
    
// // // // // // // //     if (isValid(admDate) && isValid(disDate)) {
// // // // // // // //       const days = differenceInDays(disDate, admDate);
// // // // // // // //       setTotalStay(days >= 0 ? days.toString() : "0");
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // // //     const newDate = e.target.value;
// // // // // // // //     setDischargeDate(newDate);
    
// // // // // // // //     if (child?.AdmissionDate) {
// // // // // // // //       const adm = new Date(child.AdmissionDate);
// // // // // // // //       const dis = new Date(newDate);
      
// // // // // // // //       if (dis < adm) {
// // // // // // // //         toast.error("Discharge date cannot be before Admission Date");
// // // // // // // //         setDischargeDate(""); 
// // // // // // // //         setTotalStay("0");
// // // // // // // //       } else {
// // // // // // // //         calculateTotalStay(child.AdmissionDate, newDate);
// // // // // // // //       }
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // // //     const val = parseFloat(e.target.value);
// // // // // // // //     if (val > 100) {
// // // // // // // //       toast.error("Weight cannot be greater than 100kg");
// // // // // // // //       setDischargeWeight("");
// // // // // // // //     } else {
// // // // // // // //       setDischargeWeight(e.target.value);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // // //     const val = parseFloat(e.target.value);
// // // // // // // //     if (val > 150) {
// // // // // // // //       toast.error("Height cannot be greater than 150cm");
// // // // // // // //       setDischargeHeight("");
// // // // // // // //     } else {
// // // // // // // //       setDischargeHeight(e.target.value);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // // //     if (e.target.files && e.target.files[0]) {
// // // // // // // //       const file = e.target.files[0];
      
// // // // // // // //       if (!["image/jpeg", "image/png"].includes(file.type)) {
// // // // // // // //         toast.error("Please upload a valid image file (JPEG/PNG)");
// // // // // // // //         e.target.value = "";
// // // // // // // //         return;
// // // // // // // //       }

// // // // // // // //       if (file.size > 2 * 1024 * 1024) {
// // // // // // // //         toast.error("Please upload file size Less than 2 MB");
// // // // // // // //         e.target.value = "";
// // // // // // // //         return;
// // // // // // // //       }

// // // // // // // //       const reader = new FileReader();
// // // // // // // //       reader.onload = () => setPhotoPreview(reader.result as string);
// // // // // // // //       reader.readAsDataURL(file);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   // --- 3. Submit Handler ---
// // // // // // // //   const handleSubmit = async (e: React.FormEvent) => {
// // // // // // // //     e.preventDefault();

// // // // // // // //     if (!dischargeDate || !dischargeWeight || !dischargeHeight || !dischargeMuac || !outcomeIndicator || !dischargeEdema) {
// // // // // // // //       toast.error("Please fill all compulsory fields marked with *");
// // // // // // // //       return;
// // // // // // // //     }
// // // // // // // //     if (ifaGivenToMother === "0" || motherPayment === "0" || ifaSyrup === "0") {
// // // // // // // //       toast.error("Please select all Yes/No dropdowns");
// // // // // // // //       return;
// // // // // // // //     }
// // // // // // // //     if (!hemoglobinMother) {
// // // // // // // //         toast.error("Please enter Mother's Hemoglobin");
// // // // // // // //         return;
// // // // // // // //     }
// // // // // // // //     if (child?.AdmissionEdema && child.AdmissionEdema.trim() !== "No" && !minimumWeight) {
// // // // // // // //         toast.error("Please enter Minimum Weight");
// // // // // // // //         return;
// // // // // // // //     }

// // // // // // // //     setSubmitting(true);

// // // // // // // //     try {
// // // // // // // //       const payload = {
// // // // // // // //         DischargeDate: dischargeDate,
// // // // // // // //         DischargeWeight: parseFloat(dischargeWeight),
// // // // // // // //         DischargeHeight: parseFloat(dischargeHeight),
// // // // // // // //         DischargeMuac: parseFloat(dischargeMuac),
// // // // // // // //         DischargeEdema: parseInt(dischargeEdema),
// // // // // // // //         ExitIndicator: parseInt(outcomeIndicator),
// // // // // // // //         IFAToMotherTablet: parseInt(ifaGivenToMother),
// // // // // // // //         MotherWages: parseInt(motherPayment),
// // // // // // // //         IFAToMotherSyrup: parseInt(ifaSyrup),
// // // // // // // //         HemoglobinMother: parseFloat(hemoglobinMother),
// // // // // // // //         DischargeImage: photoPreview || null,
// // // // // // // //         TotalStay: parseInt(totalStay), 
// // // // // // // //         MinimumWeight: minimumWeight ? parseFloat(minimumWeight) : null
// // // // // // // //       };

// // // // // // // //       // Push to the new Database API route
// // // // // // // //       const res = await fetch(`/api/discharge-child/${childId}`, {
// // // // // // // //         method: "PUT",
// // // // // // // //         headers: { "Content-Type": "application/json" },
// // // // // // // //         body: JSON.stringify(payload),
// // // // // // // //       });

// // // // // // // //       const result = await res.json();

// // // // // // // //       if (!res.ok) throw new Error(result.error || "Failed to save");

// // // // // // // //       toast.success("Patient Discharged Successfully!");
      
// // // // // // // //       setTimeout(() => {
// // // // // // // //          router.push("/mtc-user/dashboard/discharge");
// // // // // // // //       }, 1500);

// // // // // // // //     } catch (error: unknown) { 
// // // // // // // //       console.error(error);
// // // // // // // //       const errorMessage = error instanceof Error ? error.message : "Something went wrong";
// // // // // // // //       toast.error(errorMessage);
// // // // // // // //     } finally {
// // // // // // // //       setSubmitting(false);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   if (loading) {
// // // // // // // //     return (
// // // // // // // //       <div className="min-h-screen bg-slate-50 flex items-center justify-center">
// // // // // // // //         <div className="flex flex-col items-center">
// // // // // // // //           <Loader2 className="animate-spin h-10 w-10 text-blue-600 mb-4" />
// // // // // // // //           <p className="text-slate-500 font-medium">Loading admission records...</p>
// // // // // // // //         </div>
// // // // // // // //       </div>
// // // // // // // //     );
// // // // // // // //   }

// // // // // // // //   if (!child) return null;

// // // // // // // //   return (
// // // // // // // //     <div className="min-h-screen bg-slate-50 pb-28 font-sans">
// // // // // // // //       <Toaster position="top-center" toastOptions={{ className: 'rounded-xl shadow-lg font-medium' }} />
      
// // // // // // // //       {/* Sticky Top Navigation Bar */}
// // // // // // // //       <div className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
// // // // // // // //         <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
// // // // // // // //           <div className="flex items-center gap-4">
// // // // // // // //             <Button onClick={() => router.push("/mtc-user/dashboard/discharge")} variant="ghost" size="icon" className="text-slate-500 hover:text-blue-600 hover:bg-blue-50">
// // // // // // // //               <ArrowLeft className="h-5 w-5" />
// // // // // // // //             </Button>
// // // // // // // //             <div>
// // // // // // // //               <h1 className="text-lg font-bold text-slate-900 leading-tight">Discharge Process</h1>
// // // // // // // //               <p className="text-xs font-medium text-slate-500">MTC Departure Form</p>
// // // // // // // //             </div>
// // // // // // // //           </div>
          
// // // // // // // //           <div className="flex items-center gap-2">
// // // // // // // //             <Button variant="outline" onClick={() => router.push("/mtc-user/dashboard/discharge")} className="border-slate-200 text-slate-600 hidden sm:flex hover:bg-slate-50">
// // // // // // // //               <X className="mr-2 h-4 w-4" /> Cancel
// // // // // // // //             </Button>
// // // // // // // //             <Button onClick={handleSubmit} disabled={submitting} className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
// // // // // // // //               {submitting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <LogOut className="mr-2 h-4 w-4" />}
// // // // // // // //               {submitting ? "Processing..." : "Discharge Patient"}
// // // // // // // //             </Button>
// // // // // // // //           </div>
// // // // // // // //         </div>
// // // // // // // //       </div>

// // // // // // // //       <main className="max-w-5xl mx-auto px-4 sm:px-6 mt-8 space-y-6">
// // // // // // // //         <form onSubmit={handleSubmit}>
            
// // // // // // // //             {/* --- Read Only Admission Data --- */}
// // // // // // // //             <Card className="border-0 shadow-sm mb-6 overflow-hidden">
// // // // // // // //               <div className="bg-slate-50 border-b border-slate-100 px-6 py-4 flex items-center gap-2">
// // // // // // // //                  <div className="w-2 h-6 bg-blue-500 rounded-full"></div>
// // // // // // // //                  <h2 className="text-lg font-bold text-slate-800">Admission Snapshot</h2>
// // // // // // // //               </div>
// // // // // // // //               <CardContent className="p-6">
// // // // // // // //                 <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
// // // // // // // //                     <div>
// // // // // // // //                         <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">SAM Number</label>
// // // // // // // //                         <Input value={child.SamNo} readOnly className="bg-slate-50 font-mono" />
// // // // // // // //                     </div>
// // // // // // // //                     <div>
// // // // // // // //                         <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Child Name</label>
// // // // // // // //                         <Input value={child.ChildName} readOnly className="bg-slate-50 font-semibold" />
// // // // // // // //                     </div>
// // // // // // // //                     <div>
// // // // // // // //                         <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Admission Date</label>
// // // // // // // //                         <Input value={new Date(child.AdmissionDate).toLocaleDateString()} readOnly className="bg-slate-50" />
// // // // // // // //                     </div>
// // // // // // // //                     <div>
// // // // // // // //                         <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Adm. Hemoglobin (gm/dl)</label>
// // // // // // // //                         <Input value={child.AdmissionHemoglobin || "N/A"} readOnly className="bg-slate-50" />
// // // // // // // //                     </div>
                    
// // // // // // // //                     <div className="md:col-span-3 lg:col-span-4 grid grid-cols-2 md:grid-cols-5 gap-4 pt-4 border-t border-slate-100">
// // // // // // // //                         <div>
// // // // // // // //                             <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Weight</label>
// // // // // // // //                             <Input value={`${child.AdmissionWeight} kg`} readOnly className="bg-slate-50" />
// // // // // // // //                         </div>
// // // // // // // //                         <div>
// // // // // // // //                             <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Height</label>
// // // // // // // //                             <Input value={`${child.AdmissionHeight} cm`} readOnly className="bg-slate-50" />
// // // // // // // //                         </div>
// // // // // // // //                         <div>
// // // // // // // //                             <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">MUAC</label>
// // // // // // // //                             <Input value={`${child.AdmissionMuac} cm`} readOnly className="bg-slate-50" />
// // // // // // // //                         </div>
// // // // // // // //                         <div>
// // // // // // // //                             <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Edema</label>
// // // // // // // //                             <Input value={child.AdmissionEdema} readOnly className="bg-slate-50" />
// // // // // // // //                         </div>
// // // // // // // //                         <div>
// // // // // // // //                             <label className="text-[10px] font-bold text-blue-500 uppercase block mb-1">Target Weight</label>
// // // // // // // //                             <Input value={`${child.TargetWeight} kg`} readOnly className="bg-blue-50 text-blue-700 font-bold border-blue-200" />
// // // // // // // //                         </div>
// // // // // // // //                     </div>
// // // // // // // //                 </div>
// // // // // // // //               </CardContent>
// // // // // // // //             </Card>

// // // // // // // //             {/* --- Discharge Form Fields --- */}
// // // // // // // //             <Card className="border-0 shadow-sm mb-6 overflow-hidden">
// // // // // // // //               <div className="bg-white border-b border-slate-100 px-6 py-4 flex items-center gap-2">
// // // // // // // //                  <div className="w-2 h-6 bg-blue-500 rounded-full"></div>
// // // // // // // //                  <h2 className="text-lg font-bold text-slate-800">Discharge Details</h2>
// // // // // // // //               </div>
// // // // // // // //               <CardContent className="p-6">
                
// // // // // // // //                 {/* Row 1: Vitals */}
// // // // // // // //                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
// // // // // // // //                     <div>
// // // // // // // //                         <label className="text-sm font-semibold text-slate-700 block mb-2">Discharge Date <span className="text-red-500">*</span></label>
// // // // // // // //                         <Input type="date" value={dischargeDate} onChange={(e) => setDischargeDate(e.target.value)} max={new Date().toISOString().split('T')[0]} className="bg-white" />
// // // // // // // //                     </div>
// // // // // // // //                     <div>
// // // // // // // //                         <label className="text-sm font-semibold text-slate-700 block mb-2">Discharge Weight (kg) <span className="text-red-500">*</span></label>
// // // // // // // //                         <Input type="number" step="0.01" value={dischargeWeight} onChange={(e) => setDischargeWeight(e.target.value)} className="bg-white" />
// // // // // // // //                     </div>
// // // // // // // //                     <div>
// // // // // // // //                         <label className="text-sm font-semibold text-slate-700 block mb-2">Discharge Height (cm) <span className="text-red-500">*</span></label>
// // // // // // // //                         <Input type="number" step="0.1" value={dischargeHeight} onChange={(e) => setDischargeHeight(e.target.value)} className="bg-white" />
// // // // // // // //                     </div>
// // // // // // // //                     <div>
// // // // // // // //                         <label className="text-sm font-semibold text-slate-700 block mb-2">Discharge MUAC (cm) <span className="text-red-500">*</span></label>
// // // // // // // //                         <Input type="number" step="0.1" value={dischargeMuac} onChange={(e) => setDischargeMuac(e.target.value)} className="bg-white" />
// // // // // // // //                     </div>
// // // // // // // //                 </div>

// // // // // // // //                 {/* Row 2: Indicators */}
// // // // // // // //                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-100 mb-6">
// // // // // // // //                     <div>
// // // // // // // //                         <label className="text-sm font-semibold text-slate-700 block mb-2">Outcome Indicator <span className="text-red-500">*</span></label>
// // // // // // // //                         <Select value={outcomeIndicator} onValueChange={setOutcomeIndicator}>
// // // // // // // //                             <SelectTrigger className="bg-white"><SelectValue placeholder="Select Outcome" /></SelectTrigger>
// // // // // // // //                             <SelectContent>
// // // // // // // //                                 <SelectItem value="1">CURED</SelectItem>
// // // // // // // //                                 <SelectItem value="2">DEFAULTER</SelectItem>
// // // // // // // //                                 <SelectItem value="3">MEDICAL TRANSFER</SelectItem>
// // // // // // // //                                 <SelectItem value="4">NON RESPONDENT</SelectItem>
// // // // // // // //                                 <SelectItem value="5">DEATH</SelectItem>
// // // // // // // //                                 <SelectItem value="6">PARTIAL IMPROVEMENT</SelectItem>
// // // // // // // //                             </SelectContent>
// // // // // // // //                         </Select>
// // // // // // // //                     </div>
// // // // // // // //                     <div>
// // // // // // // //                         <label className="text-sm font-semibold text-slate-700 block mb-2">Discharge EDEMA <span className="text-red-500">*</span></label>
// // // // // // // //                         <Select value={dischargeEdema} onValueChange={setDischargeEdema}>
// // // // // // // //                             <SelectTrigger className="bg-white"><SelectValue placeholder="Select Edema" /></SelectTrigger>
// // // // // // // //                             <SelectContent>
// // // // // // // //                                 <SelectItem value="4">No Edema</SelectItem>
// // // // // // // //                                 <SelectItem value="1">+</SelectItem>
// // // // // // // //                                 <SelectItem value="2">++</SelectItem>
// // // // // // // //                                 <SelectItem value="3">+++</SelectItem>
// // // // // // // //                             </SelectContent>
// // // // // // // //                         </Select>
// // // // // // // //                     </div>
// // // // // // // //                     <div>
// // // // // // // //                         <label className="text-sm font-semibold text-slate-700 block mb-2">Hemoglobin Of Mother (gm/dl) <span className="text-red-500">*</span></label>
// // // // // // // //                         <Input type="number" step="0.1" value={hemoglobinMother} onChange={(e) => setHemoglobinMother(e.target.value)} className="bg-white" />
// // // // // // // //                     </div>
// // // // // // // //                 </div>

// // // // // // // //                 {/* Row 3: Social & Supplements */}
// // // // // // // //                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-100">
// // // // // // // //                     <div>
// // // // // // // //                         <label className="text-sm font-semibold text-slate-700 block mb-2">IFA Given To Mother <span className="text-xs text-slate-400 font-normal">(min 30 tabs)</span> <span className="text-red-500">*</span></label>
// // // // // // // //                         <Select value={ifaGivenToMother} onValueChange={setIfaGivenToMother}>
// // // // // // // //                             <SelectTrigger className="bg-white"><SelectValue placeholder="Select" /></SelectTrigger>
// // // // // // // //                             <SelectContent>
// // // // // // // //                                 <SelectItem value="1">Yes</SelectItem>
// // // // // // // //                                 <SelectItem value="2">No</SelectItem>
// // // // // // // //                             </SelectContent>
// // // // // // // //                         </Select>
// // // // // // // //                     </div>
// // // // // // // //                     <div>
// // // // // // // //                         <label className="text-sm font-semibold text-slate-700 block mb-2">Mother's wage compensation <span className="text-red-500">*</span></label>
// // // // // // // //                         <Select value={motherPayment} onValueChange={setMotherPayment}>
// // // // // // // //                             <SelectTrigger className="bg-white"><SelectValue placeholder="Select" /></SelectTrigger>
// // // // // // // //                             <SelectContent>
// // // // // // // //                                 <SelectItem value="1">Yes</SelectItem>
// // // // // // // //                                 <SelectItem value="2">No</SelectItem>
// // // // // // // //                             </SelectContent>
// // // // // // // //                         </Select>
// // // // // // // //                     </div>
// // // // // // // //                     <div>
// // // // // // // //                         <label className="text-sm font-semibold text-slate-700 block mb-2">IFA Syrup (50ml) Given To Child <span className="text-red-500">*</span></label>
// // // // // // // //                         <Select value={ifaSyrup} onValueChange={setIfaSyrup}>
// // // // // // // //                             <SelectTrigger className="bg-white"><SelectValue placeholder="Select" /></SelectTrigger>
// // // // // // // //                             <SelectContent>
// // // // // // // //                                 <SelectItem value="1">Yes</SelectItem>
// // // // // // // //                                 <SelectItem value="2">No</SelectItem>
// // // // // // // //                             </SelectContent>
// // // // // // // //                         </Select>
// // // // // // // //                     </div>
// // // // // // // //                 </div>
// // // // // // // //               </CardContent>
// // // // // // // //             </Card>

// // // // // // // //             {/* --- SECTION 4: Conditional Edema & Photo --- */}
// // // // // // // //             <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
// // // // // // // //               <div className="lg:col-span-8">
// // // // // // // //                 {child.AdmissionEdema && child.AdmissionEdema.trim() !== "No" && (
// // // // // // // //                   <Card className="border-0 shadow-[0_2px_10px_-3px_rgba(234,88,12,0.15)] mb-6 bg-orange-50 border-l-4 border-l-orange-500">
// // // // // // // //                       <CardContent className="p-6">
// // // // // // // //                         <h3 className="text-sm font-bold text-orange-800 uppercase tracking-wider mb-4 flex items-center gap-2">
// // // // // // // //                           Edema Patient Requirements
// // // // // // // //                         </h3>
// // // // // // // //                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // // // // // // //                             <div>
// // // // // // // //                                 <label className="text-sm font-semibold text-orange-900 block mb-2">Minimum Weight Reached? <span className="text-red-500">*</span></label>
// // // // // // // //                                 <Input 
// // // // // // // //                                     type="number" step="0.01" 
// // // // // // // //                                     value={minimumWeight} 
// // // // // // // //                                     onChange={(e) => setMinimumWeight(e.target.value)} 
// // // // // // // //                                     className="bg-white border-orange-200 focus-visible:ring-orange-500" 
// // // // // // // //                                 />
// // // // // // // //                             </div>
// // // // // // // //                             <div>
// // // // // // // //                                 <label className="text-sm font-semibold text-orange-900 block mb-2">Total Stay (Days)</label>
// // // // // // // //                                 <Input 
// // // // // // // //                                     value={totalStay} 
// // // // // // // //                                     readOnly 
// // // // // // // //                                     className="bg-orange-100/50 font-bold text-orange-900 border-orange-200" 
// // // // // // // //                                 />
// // // // // // // //                             </div>
// // // // // // // //                         </div>
// // // // // // // //                       </CardContent>
// // // // // // // //                   </Card>
// // // // // // // //                 )}
// // // // // // // //               </div>

// // // // // // // //               <div className={child.AdmissionEdema && child.AdmissionEdema.trim() !== "No" ? "lg:col-span-4" : "lg:col-span-12"}>
// // // // // // // //                 <Card className="border-0 shadow-sm overflow-hidden h-full">
// // // // // // // //                   <div className="bg-white border-b border-slate-100 px-6 py-4 flex items-center gap-2">
// // // // // // // //                     <div className="w-2 h-6 bg-blue-500 rounded-full"></div>
// // // // // // // //                     <h2 className="text-lg font-bold text-slate-800">Discharge Photo</h2>
// // // // // // // //                   </div>
// // // // // // // //                   <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6">
// // // // // // // //                       <div className="flex-1 w-full">
// // // // // // // //                           <label className="text-sm font-medium text-slate-500 block mb-3">Upload Photo (max 2MB, png/jpeg only)</label>
// // // // // // // //                           <Input 
// // // // // // // //                               type="file" 
// // // // // // // //                               accept="image/png, image/jpeg" 
// // // // // // // //                               onChange={handlePhotoChange} 
// // // // // // // //                               className="cursor-pointer file:text-blue-700 file:font-semibold file:bg-blue-50 file:border-0 file:mr-4 file:py-1 file:px-3 file:rounded-md bg-white w-full"
// // // // // // // //                           />
// // // // // // // //                       </div>
// // // // // // // //                       <div className="shrink-0">
// // // // // // // //                           {photoPreview ? (
// // // // // // // //                               <Image 
// // // // // // // //                                   src={photoPreview} 
// // // // // // // //                                   alt="Child" width={160} height={120} 
// // // // // // // //                                   className="rounded-lg shadow-sm border border-slate-200 object-cover h-[120px] w-[160px]" 
// // // // // // // //                               />
// // // // // // // //                           ) : (
// // // // // // // //                               <div className="h-[120px] w-[160px] bg-slate-50 rounded-lg border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400">
// // // // // // // //                                   <ImageIcon className="w-8 h-8 mb-1 opacity-20" />
// // // // // // // //                                   <span className="text-xs font-semibold">No Image</span>
// // // // // // // //                               </div>
// // // // // // // //                           )}
// // // // // // // //                       </div>
// // // // // // // //                   </CardContent>
// // // // // // // //                 </Card>
// // // // // // // //               </div>

// // // // // // // //             </div>
// // // // // // // //         </form>
// // // // // // // //       </main>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // }


// // // // // // // "use client";

// // // // // // // import { useState, useEffect, use } from "react";
// // // // // // // import { useRouter } from "next/navigation";
// // // // // // // import { Button } from "@/components/ui/button";
// // // // // // // import { Input } from "@/components/ui/input";
// // // // // // // import { Card, CardHeader, CardContent } from "@/components/ui/card";
// // // // // // // import { 
// // // // // // //   Select, 
// // // // // // //   SelectContent, 
// // // // // // //   SelectItem, 
// // // // // // //   SelectTrigger, 
// // // // // // //   SelectValue 
// // // // // // // } from "@/components/ui/select";
// // // // // // // import { Save, X, Loader2, Calendar, User, FileText } from "lucide-react";
// // // // // // // import toast, { Toaster } from "react-hot-toast";
// // // // // // // import { differenceInDays, isValid } from "date-fns";

// // // // // // // // Interface for Child Data (from DB)
// // // // // // // interface ChildData {
// // // // // // //   SamNo: string;
// // // // // // //   ChildName: string;
// // // // // // //   FatherName: string;
// // // // // // //   MotherName: string;
// // // // // // //   AdmissionDate: string;
// // // // // // //   AdmissionWeight: number;
// // // // // // //   AdmissionHeight: number;
// // // // // // //   AdmissionEdema: string; // "No", "++", etc.
// // // // // // //   AdmissionMuac: number;
// // // // // // //   TargetWeight: number;
// // // // // // //   AdmissionHemoglobin: number;
// // // // // // // }

// // // // // // // export default function DischargeFormPage({ params }: { params: Promise<{ id: string }> }) {
// // // // // // //   const router = useRouter();
  
// // // // // // //   // Next.js 15 Fix: Unwrap params securely
// // // // // // //   const resolvedParams = use(params);
// // // // // // //   const childId = resolvedParams.id;
  
// // // // // // //   // --- State Management ---
// // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // //   const [submitting, setSubmitting] = useState(false);
// // // // // // //   const [child, setChild] = useState<ChildData | null>(null);
  
// // // // // // //   // Form Fields
// // // // // // //   const [dischargeDate, setDischargeDate] = useState(new Date().toISOString().split('T')[0]);
// // // // // // //   const [dischargeWeight, setDischargeWeight] = useState("");
// // // // // // //   const [dischargeHeight, setDischargeHeight] = useState("");
// // // // // // //   const [dischargeMuac, setDischargeMuac] = useState("");
// // // // // // //   const [outcomeIndicator, setOutcomeIndicator] = useState("");
// // // // // // //   const [dischargeEdema, setDischargeEdema] = useState("");
  
// // // // // // //   // Medical / Social
// // // // // // //   const [hemoglobinMother, setHemoglobinMother] = useState("");
// // // // // // //   const [ifaGivenToMother, setIfaGivenToMother] = useState("0");
// // // // // // //   const [motherPayment, setMotherPayment] = useState("0");
// // // // // // //   const [ifaSyrup, setIfaSyrup] = useState("0");
  
// // // // // // //   // Conditional Fields (Only if Admission Edema != "No")
// // // // // // //   const [minimumWeight, setMinimumWeight] = useState("");
// // // // // // //   const [totalStay, setTotalStay] = useState("0");

// // // // // // //   // --- 1. Fetch Child Data ---
// // // // // // //   useEffect(() => {
// // // // // // //     const fetchChild = async () => {
// // // // // // //       if (!childId) return;

// // // // // // //       try {
// // // // // // //         const res = await fetch(`/api/child/${childId}`);

// // // // // // //         // FIX: Ensure the response is actually JSON before parsing
// // // // // // //         const contentType = res.headers.get("content-type");
// // // // // // //         if (!contentType || !contentType.includes("application/json")) {
// // // // // // //           const errorText = await res.text();
// // // // // // //           console.error("Expected JSON, got HTML/Text:", errorText);
// // // // // // //           throw new Error("Server returned an invalid format. Check your API route.");
// // // // // // //         }

// // // // // // //         if (!res.ok) {
// // // // // // //            throw new Error(`API returned status ${res.status}`);
// // // // // // //         }

// // // // // // //         const result = await res.json();

// // // // // // //         if (result.success && result.data) {
// // // // // // //           setChild(result.data);
// // // // // // //           // Initial calculation for total stay based on today
// // // // // // //           if (result.data.AdmissionDate) {
// // // // // // //              calculateTotalStay(result.data.AdmissionDate, new Date().toISOString().split('T')[0]);
// // // // // // //           }
// // // // // // //         } else {
// // // // // // //           toast.error("Child not found");
// // // // // // //           router.push("/mtc-user/dashboard/discharge");
// // // // // // //         }
// // // // // // //       } catch (error: any) {
// // // // // // //         console.error("Fetch Error:", error);
// // // // // // //         toast.error(error.message || "Error loading data");
// // // // // // //       } finally {
// // // // // // //         setLoading(false);
// // // // // // //       }
// // // // // // //     };

// // // // // // //     fetchChild();
// // // // // // //   }, [childId, router]);

// // // // // // //   // --- 2. Logic & Calculations ---

// // // // // // //   // Calculate Total Stay Days
// // // // // // //   const calculateTotalStay = (admDateStr: string, disDateStr: string) => {
// // // // // // //     const admDate = new Date(admDateStr);
// // // // // // //     const disDate = new Date(disDateStr);
    
// // // // // // //     if (isValid(admDate) && isValid(disDate)) {
// // // // // // //       const days = differenceInDays(disDate, admDate);
// // // // // // //       setTotalStay(days >= 0 ? days.toString() : "0");
// // // // // // //     }
// // // // // // //   };

// // // // // // //   // Handle Date Change
// // // // // // //   const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // //     const newDate = e.target.value;
// // // // // // //     setDischargeDate(newDate);
    
// // // // // // //     if (child?.AdmissionDate) {
// // // // // // //       const adm = new Date(child.AdmissionDate);
// // // // // // //       const dis = new Date(newDate);
      
// // // // // // //       if (dis < adm) {
// // // // // // //         toast.error("Discharge date cannot be before Admission Date");
// // // // // // //         setDischargeDate(""); // Reset
// // // // // // //         setTotalStay("0");
// // // // // // //       } else {
// // // // // // //         calculateTotalStay(child.AdmissionDate, newDate);
// // // // // // //       }
// // // // // // //     }
// // // // // // //   };

// // // // // // //   // Validations (Height > 150, Weight > 100)
// // // // // // //   const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // //     const val = parseFloat(e.target.value);
// // // // // // //     if (val > 100) {
// // // // // // //       toast.error("Weight cannot be greater than 100kg");
// // // // // // //       setDischargeWeight("");
// // // // // // //     } else {
// // // // // // //       setDischargeWeight(e.target.value);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // //     const val = parseFloat(e.target.value);
// // // // // // //     if (val > 150) {
// // // // // // //       toast.error("Height cannot be greater than 150cm");
// // // // // // //       setDischargeHeight("");
// // // // // // //     } else {
// // // // // // //       setDischargeHeight(e.target.value);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   // --- 3. Submit Handler ---
// // // // // // //   const handleSubmit = async (e: React.FormEvent) => {
// // // // // // //     e.preventDefault();

// // // // // // //     // Required Field Validations
// // // // // // //     if (!dischargeDate || !dischargeWeight || !dischargeHeight || !dischargeMuac || !outcomeIndicator || !dischargeEdema) {
// // // // // // //       toast.error("Please fill all compulsory fields marked with *");
// // // // // // //       return;
// // // // // // //     }
// // // // // // //     if (ifaGivenToMother === "0" || motherPayment === "0" || ifaSyrup === "0") {
// // // // // // //       toast.error("Please select all Yes/No dropdowns");
// // // // // // //       return;
// // // // // // //     }
// // // // // // //     if (!hemoglobinMother) {
// // // // // // //         toast.error("Please enter Mother's Hemoglobin");
// // // // // // //         return;
// // // // // // //     }
// // // // // // //     // Conditional Validation for Edema
// // // // // // //     if (child?.AdmissionEdema && child.AdmissionEdema.trim() !== "No" && !minimumWeight) {
// // // // // // //         toast.error("Please enter Minimum Weight");
// // // // // // //         return;
// // // // // // //     }

// // // // // // //     setSubmitting(true);

// // // // // // //     try {
// // // // // // //       const payload = {
// // // // // // //         SamNo: child?.SamNo,
// // // // // // //         DischargeDate: dischargeDate,
// // // // // // //         DischargeWeight: parseFloat(dischargeWeight),
// // // // // // //         DischargeHeight: parseFloat(dischargeHeight),
// // // // // // //         DischargeMuac: parseFloat(dischargeMuac),
// // // // // // //         DischargeEdema: parseInt(dischargeEdema),
// // // // // // //         ExitIndicator: parseInt(outcomeIndicator),
// // // // // // //         IFAToMotherTablet: parseInt(ifaGivenToMother),
// // // // // // //         MotherWages: parseInt(motherPayment),
// // // // // // //         IFAToMotherSyrup: parseInt(ifaSyrup),
// // // // // // //         HemoglobinMother: parseFloat(hemoglobinMother),
// // // // // // //         DischargeImage: null,
// // // // // // //         TotalStay: parseInt(totalStay), 
// // // // // // //         MinimumWeight: minimumWeight ? parseFloat(minimumWeight) : null
// // // // // // //       };

// // // // // // //       // FIX: Added childId to the PUT request URL
// // // // // // //       const res = await fetch(`/api/discharge-child/${childId}`, {
// // // // // // //         method: "PUT",
// // // // // // //         headers: { "Content-Type": "application/json" },
// // // // // // //         body: JSON.stringify(payload),
// // // // // // //       });

// // // // // // //       // FIX: Ensure the response is actually JSON before parsing
// // // // // // //       const contentType = res.headers.get("content-type");
// // // // // // //       if (!contentType || !contentType.includes("application/json")) {
// // // // // // //         const errorText = await res.text();
// // // // // // //         console.error("Expected JSON, got HTML/Text:", errorText);
// // // // // // //         throw new Error("Server returned an invalid format. Check your API route or network tab.");
// // // // // // //       }

// // // // // // //       const result = await res.json();

// // // // // // //       if (!res.ok) throw new Error(result.message || "Failed to save");

// // // // // // //       toast.success("Record Saved Successfully!");
      
// // // // // // //       setTimeout(() => {
// // // // // // //          router.push("/mtc-user/dashboard/discharge");
// // // // // // //       }, 2000);

// // // // // // //     } catch (error: any) {
// // // // // // //       console.error("Submit Error:", error);
// // // // // // //       toast.error(error.message || "Something went wrong");
// // // // // // //     } finally {
// // // // // // //       setSubmitting(false);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   if (loading) {
// // // // // // //     return (
// // // // // // //       <div className="min-h-screen bg-slate-50 flex items-center justify-center">
// // // // // // //         <div className="flex items-center gap-3 text-blue-700 text-lg font-medium">
// // // // // // //             <Loader2 className="animate-spin h-6 w-6" /> Loading details...
// // // // // // //         </div>
// // // // // // //       </div>
// // // // // // //     );
// // // // // // //   }

// // // // // // //   if (!child) return null;

// // // // // // //   return (
// // // // // // //     <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6">
// // // // // // //       <Toaster position="top-right" />
// // // // // // //       <div className="max-w-7xl mx-auto">
// // // // // // //         <Card className="shadow-xl border-0 rounded-2xl overflow-hidden bg-white">
// // // // // // //           <CardHeader className="bg-gradient-to-r from-blue-700 to-blue-500 px-8 py-6">
// // // // // // //             <div className="flex items-center gap-3 text-white">
// // // // // // //               <FileText className="h-6 w-6" />
// // // // // // //               <h5 className="text-2xl font-bold m-0 tracking-tight">Child Discharge Form</h5>
// // // // // // //             </div>
// // // // // // //           </CardHeader>

// // // // // // //           <CardContent className="p-8">
// // // // // // //             <form onSubmit={handleSubmit} className="space-y-10">
                
// // // // // // //                 {/* --- SECTION 1: Read Only Details --- */}
// // // // // // //                 <div className="bg-slate-50/50 rounded-xl p-6 border border-slate-100">
// // // // // // //                   <h6 className="flex items-center gap-2 text-sm font-bold text-blue-800 uppercase tracking-wider mb-6">
// // // // // // //                     <User className="h-4 w-4" /> Admission Information
// // // // // // //                   </h6>
// // // // // // //                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// // // // // // //                       <div>
// // // // // // //                           <label className="text-xs font-semibold text-slate-500 uppercase">SAM Number</label>
// // // // // // //                           <Input value={child.SamNo} readOnly className="bg-slate-100 border-transparent text-slate-700 font-medium mt-1 focus-visible:ring-0" />
// // // // // // //                       </div>
// // // // // // //                       <div>
// // // // // // //                           <label className="text-xs font-semibold text-slate-500 uppercase">Child Name</label>
// // // // // // //                           <Input value={child.ChildName} readOnly className="bg-slate-100 border-transparent text-slate-700 font-medium mt-1 focus-visible:ring-0" />
// // // // // // //                       </div>
// // // // // // //                       <div>
// // // // // // //                           <label className="text-xs font-semibold text-slate-500 uppercase">Admission Date</label>
// // // // // // //                           <div className="relative mt-1">
// // // // // // //                               <Input value={new Date(child.AdmissionDate).toLocaleDateString()} readOnly className="bg-slate-100 border-transparent text-slate-700 font-medium pr-10 focus-visible:ring-0" />
// // // // // // //                               <div className="absolute right-3 top-2.5 text-slate-400"><Calendar className="h-4 w-4" /></div>
// // // // // // //                           </div>
// // // // // // //                       </div>
// // // // // // //                       <div>
// // // // // // //                           <label className="text-xs font-semibold text-slate-500 uppercase">Adm. Weight (kg)</label>
// // // // // // //                           <Input value={child.AdmissionWeight} readOnly className="bg-slate-100 border-transparent text-slate-700 font-medium mt-1 focus-visible:ring-0" />
// // // // // // //                       </div>
// // // // // // //                       <div>
// // // // // // //                           <label className="text-xs font-semibold text-slate-500 uppercase">Adm. Height (cm)</label>
// // // // // // //                           <Input value={child.AdmissionHeight} readOnly className="bg-slate-100 border-transparent text-slate-700 font-medium mt-1 focus-visible:ring-0" />
// // // // // // //                       </div>
// // // // // // //                       <div>
// // // // // // //                           <label className="text-xs font-semibold text-slate-500 uppercase">Adm. Edema</label>
// // // // // // //                           <Input value={child.AdmissionEdema} readOnly className="bg-slate-100 border-transparent text-slate-700 font-medium mt-1 focus-visible:ring-0" />
// // // // // // //                       </div>
// // // // // // //                       <div>
// // // // // // //                           <label className="text-xs font-semibold text-slate-500 uppercase">Adm. MUAC (cm)</label>
// // // // // // //                           <Input value={child.AdmissionMuac} readOnly className="bg-slate-100 border-transparent text-slate-700 font-medium mt-1 focus-visible:ring-0" />
// // // // // // //                       </div>
// // // // // // //                       <div>
// // // // // // //                           <label className="text-xs font-semibold text-slate-500 uppercase">Target Weight (kg)</label>
// // // // // // //                           <Input value={child.TargetWeight} readOnly className="bg-slate-100 border-transparent text-slate-700 font-medium mt-1 focus-visible:ring-0" />
// // // // // // //                       </div>
// // // // // // //                   </div>
// // // // // // //                 </div>

// // // // // // //                 {/* --- SECTION 2: Discharge Vitals --- */}
// // // // // // //                 <div>
// // // // // // //                   <h6 className="text-sm font-bold text-blue-800 uppercase tracking-wider mb-5 border-b pb-2">Discharge Vitals</h6>
// // // // // // //                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// // // // // // //                       <div>
// // // // // // //                           <label className="text-sm font-medium text-slate-700">Discharge Date <span className="text-red-500">*</span></label>
// // // // // // //                           <Input 
// // // // // // //                               type="date" 
// // // // // // //                               value={dischargeDate} 
// // // // // // //                               onChange={handleDateChange} 
// // // // // // //                               max={new Date().toISOString().split('T')[0]}
// // // // // // //                               className="mt-1 focus-visible:ring-blue-500 border-slate-200" 
// // // // // // //                           />
// // // // // // //                       </div>
// // // // // // //                       <div>
// // // // // // //                           <label className="text-sm font-medium text-slate-700">Discharge Weight (kg) <span className="text-red-500">*</span></label>
// // // // // // //                           <Input 
// // // // // // //                               type="number" step="0.01" 
// // // // // // //                               value={dischargeWeight} 
// // // // // // //                               onChange={handleWeightChange} 
// // // // // // //                               placeholder="Max 100"
// // // // // // //                               className="mt-1 focus-visible:ring-blue-500 border-slate-200" 
// // // // // // //                           />
// // // // // // //                       </div>
// // // // // // //                       <div>
// // // // // // //                           <label className="text-sm font-medium text-slate-700">Discharge Height (cm) <span className="text-red-500">*</span></label>
// // // // // // //                           <Input 
// // // // // // //                               type="number" step="0.1" 
// // // // // // //                               value={dischargeHeight} 
// // // // // // //                               onChange={handleHeightChange} 
// // // // // // //                               placeholder="Max 150"
// // // // // // //                               className="mt-1 focus-visible:ring-blue-500 border-slate-200" 
// // // // // // //                           />
// // // // // // //                       </div>
// // // // // // //                       <div>
// // // // // // //                           <label className="text-sm font-medium text-slate-700">Discharge MUAC (cm) <span className="text-red-500">*</span></label>
// // // // // // //                           <Input 
// // // // // // //                               type="number" step="0.1" 
// // // // // // //                               value={dischargeMuac} 
// // // // // // //                               onChange={(e) => setDischargeMuac(e.target.value)} 
// // // // // // //                               className="mt-1 focus-visible:ring-blue-500 border-slate-200" 
// // // // // // //                           />
// // // // // // //                       </div>
// // // // // // //                   </div>
// // // // // // //                 </div>

// // // // // // //                 {/* --- SECTION 3: Outcomes & Medical Indicators --- */}
// // // // // // //                 <div>
// // // // // // //                   <h6 className="text-sm font-bold text-blue-800 uppercase tracking-wider mb-5 border-b pb-2">Outcomes & Medical Indicators</h6>
// // // // // // //                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
// // // // // // //                       <div>
// // // // // // //                           <label className="text-sm font-medium text-slate-700">Outcome Indicator <span className="text-red-500">*</span></label>
// // // // // // //                           <Select value={outcomeIndicator} onValueChange={setOutcomeIndicator}>
// // // // // // //                               <SelectTrigger className="mt-1 focus:ring-blue-500 border-slate-200"><SelectValue placeholder="Select" /></SelectTrigger>
// // // // // // //                               <SelectContent>
// // // // // // //                                   <SelectItem value="1">CURED</SelectItem>
// // // // // // //                                   <SelectItem value="2">DEFAULTER</SelectItem>
// // // // // // //                                   <SelectItem value="3">MEDICAL TRANSFER</SelectItem>
// // // // // // //                                   <SelectItem value="4">NON RESPONDENT</SelectItem>
// // // // // // //                                   <SelectItem value="5">DEATH</SelectItem>
// // // // // // //                                   <SelectItem value="6">PARTIAL IMPROVEMENT</SelectItem>
// // // // // // //                               </SelectContent>
// // // // // // //                           </Select>
// // // // // // //                       </div>
// // // // // // //                       <div>
// // // // // // //                           <label className="text-sm font-medium text-slate-700">Discharge EDEMA <span className="text-red-500">*</span></label>
// // // // // // //                           <Select value={dischargeEdema} onValueChange={setDischargeEdema}>
// // // // // // //                               <SelectTrigger className="mt-1 focus:ring-blue-500 border-slate-200"><SelectValue placeholder="Select" /></SelectTrigger>
// // // // // // //                               <SelectContent>
// // // // // // //                                   <SelectItem value="4">No Edema</SelectItem>
// // // // // // //                                   <SelectItem value="1">+</SelectItem>
// // // // // // //                                   <SelectItem value="2">++</SelectItem>
// // // // // // //                                   <SelectItem value="3">+++</SelectItem>
// // // // // // //                               </SelectContent>
// // // // // // //                           </Select>
// // // // // // //                       </div>
// // // // // // //                       <div>
// // // // // // //                           <label className="text-sm font-medium text-slate-700">Adm. Hemoglobin (gm/dl)</label>
// // // // // // //                           <Input value={child.AdmissionHemoglobin || "N/A"} readOnly className="bg-slate-100 border-transparent text-slate-700 font-medium mt-1 focus-visible:ring-0" />
// // // // // // //                       </div>
// // // // // // //                       <div>
// // // // // // //                           <label className="text-sm font-medium text-slate-700">Mother's Hb (gm/dl) <span className="text-red-500">*</span></label>
// // // // // // //                           <Input 
// // // // // // //                               type="number" step="0.1" 
// // // // // // //                               value={hemoglobinMother} 
// // // // // // //                               onChange={(e) => setHemoglobinMother(e.target.value)} 
// // // // // // //                               className="mt-1 focus-visible:ring-blue-500 border-slate-200"
// // // // // // //                           />
// // // // // // //                       </div>
// // // // // // //                   </div>

// // // // // // //                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // // // // // //                       <div>
// // // // // // //                           <label className="text-sm font-medium text-slate-700">IFA Given To Mother <span className="text-red-500">*</span></label>
// // // // // // //                           <Select value={ifaGivenToMother} onValueChange={setIfaGivenToMother}>
// // // // // // //                               <SelectTrigger className="mt-1 focus:ring-blue-500 border-slate-200"><SelectValue placeholder="Select" /></SelectTrigger>
// // // // // // //                               <SelectContent>
// // // // // // //                                   <SelectItem value="0">Select</SelectItem>
// // // // // // //                                   <SelectItem value="1">Yes</SelectItem>
// // // // // // //                                   <SelectItem value="2">No</SelectItem>
// // // // // // //                               </SelectContent>
// // // // // // //                           </Select>
// // // // // // //                       </div>
// // // // // // //                       <div>
// // // // // // //                           <label className="text-sm font-medium text-slate-700">Mother's Wage Comp. <span className="text-red-500">*</span></label>
// // // // // // //                           <Select value={motherPayment} onValueChange={setMotherPayment}>
// // // // // // //                               <SelectTrigger className="mt-1 focus:ring-blue-500 border-slate-200"><SelectValue placeholder="Select" /></SelectTrigger>
// // // // // // //                               <SelectContent>
// // // // // // //                                   <SelectItem value="0">Select</SelectItem>
// // // // // // //                                   <SelectItem value="1">Yes</SelectItem>
// // // // // // //                                   <SelectItem value="2">No</SelectItem>
// // // // // // //                               </SelectContent>
// // // // // // //                           </Select>
// // // // // // //                       </div>
// // // // // // //                       <div>
// // // // // // //                           <label className="text-sm font-medium text-slate-700">IFA Syrup to Child <span className="text-red-500">*</span></label>
// // // // // // //                           <Select value={ifaSyrup} onValueChange={setIfaSyrup}>
// // // // // // //                               <SelectTrigger className="mt-1 focus:ring-blue-500 border-slate-200"><SelectValue placeholder="Select" /></SelectTrigger>
// // // // // // //                               <SelectContent>
// // // // // // //                                   <SelectItem value="0">Select</SelectItem>
// // // // // // //                                   <SelectItem value="1">Yes</SelectItem>
// // // // // // //                                   <SelectItem value="2">No</SelectItem>
// // // // // // //                               </SelectContent>
// // // // // // //                           </Select>
// // // // // // //                       </div>
// // // // // // //                   </div>
// // // // // // //                 </div>

// // // // // // //                 {/* --- SECTION 4: Conditional Edema Fields --- */}
// // // // // // //                 {child.AdmissionEdema && child.AdmissionEdema.trim() !== "No" && (
// // // // // // //                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-amber-50 p-5 rounded-xl border border-amber-200 animate-in fade-in">
// // // // // // //                         <div>
// // // // // // //                             <label className="text-sm font-medium text-amber-900">Minimum Weight <span className="text-red-500">*</span></label>
// // // // // // //                             <Input 
// // // // // // //                                 type="number" step="0.01" 
// // // // // // //                                 value={minimumWeight} 
// // // // // // //                                 onChange={(e) => setMinimumWeight(e.target.value)} 
// // // // // // //                                 className="mt-1 bg-white border-amber-300 focus-visible:ring-amber-500" 
// // // // // // //                             />
// // // // // // //                         </div>
// // // // // // //                         <div>
// // // // // // //                             <label className="text-sm font-medium text-amber-900">Total Stay (Days)</label>
// // // // // // //                             <Input 
// // // // // // //                                 value={totalStay} 
// // // // // // //                                 readOnly 
// // // // // // //                                 className="mt-1 bg-amber-100 font-bold text-amber-900 border-transparent focus-visible:ring-0" 
// // // // // // //                             />
// // // // // // //                         </div>
// // // // // // //                     </div>
// // // // // // //                 )}

// // // // // // //                 {/* --- Footer Buttons --- */}
// // // // // // //                 <div className="flex flex-col sm:flex-row justify-end gap-4 pt-8 border-t border-slate-100">
// // // // // // //                     <Button 
// // // // // // //                         type="button" 
// // // // // // //                         variant="outline" 
// // // // // // //                         className="border-slate-300 text-slate-700 hover:bg-slate-100 min-w-[120px]"
// // // // // // //                         onClick={() => router.push("/mtc-user/dashboard/discharge")}
// // // // // // //                     >
// // // // // // //                         <X className="mr-2 h-4 w-4" /> Cancel
// // // // // // //                     </Button>
// // // // // // //                     <Button 
// // // // // // //                         type="submit" 
// // // // // // //                         disabled={submitting} 
// // // // // // //                         className="bg-blue-600 hover:bg-blue-700 text-white min-w-[150px] shadow-md shadow-blue-500/20"
// // // // // // //                     >
// // // // // // //                         {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
// // // // // // //                         Submit Discharge
// // // // // // //                     </Button>
// // // // // // //                 </div>

// // // // // // //             </form>
// // // // // // //           </CardContent>
// // // // // // //         </Card>
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }

// // // // // // "use client";

// // // // // // import { useState, useEffect, use } from "react";
// // // // // // import { useRouter } from "next/navigation";
// // // // // // import { Button } from "@/components/ui/button";
// // // // // // import { Input } from "@/components/ui/input";
// // // // // // import { Card, CardHeader, CardContent } from "@/components/ui/card";
// // // // // // import { 
// // // // // //   Select, 
// // // // // //   SelectContent, 
// // // // // //   SelectItem, 
// // // // // //   SelectTrigger, 
// // // // // //   SelectValue 
// // // // // // } from "@/components/ui/select";
// // // // // // import { Save, X, Loader2, Calendar, User, FileText, Activity, CheckSquare } from "lucide-react";
// // // // // // import toast, { Toaster } from "react-hot-toast";
// // // // // // import { differenceInDays, isValid } from "date-fns";
// // // // // // import { clsx, type ClassValue } from "clsx";
// // // // // // import { twMerge } from "tailwind-merge";

// // // // // // function cn(...inputs: ClassValue[]) {
// // // // // //   return twMerge(clsx(inputs));
// // // // // // }

// // // // // // // Interface for Child Data (from DB)
// // // // // // interface ChildData {
// // // // // //   SamNo: string;
// // // // // //   ChildName: string;
// // // // // //   FatherName: string;
// // // // // //   MotherName: string;
// // // // // //   AdmissionDate: string;
// // // // // //   AdmissionWeight: number;
// // // // // //   AdmissionHeight: number;
// // // // // //   AdmissionEdema: string; 
// // // // // //   AdmissionMuac: number;
// // // // // //   TargetWeight: number;
// // // // // //   AdmissionHemoglobin: number;
// // // // // //   Sex?: string;
// // // // // // }

// // // // // // export default function DischargeFormPage({ params }: { params: Promise<{ id: string }> }) {
// // // // // //   const router = useRouter();
  
// // // // // //   // Next.js 15 Fix: Unwrap params securely
// // // // // //   const resolvedParams = use(params);
// // // // // //   const childId = resolvedParams.id;
  
// // // // // //   // --- State Management ---
// // // // // //   const [loading, setLoading] = useState(true);
// // // // // //   const [submitting, setSubmitting] = useState(false);
// // // // // //   const [child, setChild] = useState<ChildData | null>(null);
  
// // // // // //   // Form Fields
// // // // // //   const [dischargeDate, setDischargeDate] = useState(new Date().toISOString().split('T')[0]);
// // // // // //   const [dischargeWeight, setDischargeWeight] = useState("");
// // // // // //   const [dischargeHeight, setDischargeHeight] = useState("");
// // // // // //   const [dischargeMuac, setDischargeMuac] = useState("");
// // // // // //   const [dischargeZScore, setDischargeZScore] = useState(""); // <-- ADDED Z-SCORE STATE
// // // // // //   const [outcomeIndicator, setOutcomeIndicator] = useState("");
// // // // // //   const [dischargeEdema, setDischargeEdema] = useState("");
  
// // // // // //   // Medical / Social
// // // // // //   const [hemoglobinMother, setHemoglobinMother] = useState("");
// // // // // //   const [ifaGivenToMother, setIfaGivenToMother] = useState("0");
// // // // // //   const [motherPayment, setMotherPayment] = useState("0");
// // // // // //   const [ifaSyrup, setIfaSyrup] = useState("0");
  
// // // // // //   // Conditional Fields (Only if Admission Edema != "No")
// // // // // //   const [minimumWeight, setMinimumWeight] = useState("");
// // // // // //   const [totalStay, setTotalStay] = useState("0");

// // // // // //   // Confirmation Checkbox
// // // // // //   const [isConfirmed, setIsConfirmed] = useState(false); // <-- ADDED CONFIRMATION STATE

// // // // // //   // --- 1. Fetch Child Data ---
// // // // // //   useEffect(() => {
// // // // // //     const fetchChild = async () => {
// // // // // //       if (!childId) return;

// // // // // //       try {
// // // // // //         const res = await fetch(`/api/child/${childId}`);

// // // // // //         const contentType = res.headers.get("content-type");
// // // // // //         if (!contentType || !contentType.includes("application/json")) {
// // // // // //           throw new Error("Server returned an invalid format. Check your API route.");
// // // // // //         }

// // // // // //         if (!res.ok) throw new Error(`API returned status ${res.status}`);

// // // // // //         const result = await res.json();

// // // // // //         if (result.success && result.data) {
// // // // // //           setChild(result.data);
// // // // // //           if (result.data.AdmissionDate) {
// // // // // //              calculateTotalStay(result.data.AdmissionDate, new Date().toISOString().split('T')[0]);
// // // // // //           }
// // // // // //         } else {
// // // // // //           toast.error("Child not found");
// // // // // //           router.push("/mtc-user/dashboard/discharge");
// // // // // //         }
// // // // // //       } catch (error: any) {
// // // // // //         toast.error(error.message || "Error loading data");
// // // // // //       } finally {
// // // // // //         setLoading(false);
// // // // // //       }
// // // // // //     };

// // // // // //     fetchChild();
// // // // // //   }, [childId, router]);

// // // // // //   // --- 2. Logic & Calculations ---

// // // // // //   // Calculate Total Stay Days
// // // // // //   const calculateTotalStay = (admDateStr: string, disDateStr: string) => {
// // // // // //     const admDate = new Date(admDateStr);
// // // // // //     const disDate = new Date(disDateStr);
    
// // // // // //     if (isValid(admDate) && isValid(disDate)) {
// // // // // //       const days = differenceInDays(disDate, admDate);
// // // // // //       setTotalStay(days >= 0 ? days.toString() : "0");
// // // // // //     }
// // // // // //   };

// // // // // //   // Handle Date Change
// // // // // //   const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // //     const newDate = e.target.value;
// // // // // //     setDischargeDate(newDate);
    
// // // // // //     if (child?.AdmissionDate) {
// // // // // //       const adm = new Date(child.AdmissionDate);
// // // // // //       const dis = new Date(newDate);
      
// // // // // //       if (dis < adm) {
// // // // // //         toast.error("Discharge date cannot be before Admission Date");
// // // // // //         setDischargeDate(""); 
// // // // // //         setTotalStay("0");
// // // // // //       } else {
// // // // // //         calculateTotalStay(child.AdmissionDate, newDate);
// // // // // //       }
// // // // // //     }
// // // // // //   };

// // // // // //   // Weight Limits
// // // // // //   const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // //     const val = parseFloat(e.target.value);
// // // // // //     if (val > 100) {
// // // // // //       toast.error("Weight cannot be greater than 100kg");
// // // // // //       setDischargeWeight("");
// // // // // //     } else {
// // // // // //       setDischargeWeight(e.target.value);
// // // // // //     }
// // // // // //   };

// // // // // //   // Height Limits (Min 45cm, Max 130cm)
// // // // // //   const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // //     const val = parseFloat(e.target.value);
// // // // // //     if (val > 130) {
// // // // // //       toast.error("Height cannot be greater than 130cm");
// // // // // //       setDischargeHeight("");
// // // // // //     } else {
// // // // // //       setDischargeHeight(e.target.value);
// // // // // //     }
// // // // // //   };

// // // // // //   // DYNAMIC Z-SCORE CALCULATION
// // // // // //   useEffect(() => {
// // // // // //     if (dischargeWeight && dischargeHeight) {
// // // // // //       const score = (parseFloat(dischargeWeight) / (parseFloat(dischargeHeight) / 100) ** 2) - 15;
// // // // // //       setDischargeZScore(isFinite(score) && score < 99 && score > -99 ? score.toFixed(2) : "Error");
// // // // // //     } else {
// // // // // //       setDischargeZScore("");
// // // // // //     }
// // // // // //   }, [dischargeWeight, dischargeHeight]);

// // // // // //   // --- 3. Submit Handler ---
// // // // // //   const handleSubmit = async (e: React.FormEvent) => {
// // // // // //     e.preventDefault();

// // // // // //     // Custom Validations
// // // // // //     if (!isConfirmed) {
// // // // // //       toast.error("Please confirm that Daily Weight and Micronutrients are updated.");
// // // // // //       return;
// // // // // //     }

// // // // // //     if (parseFloat(dischargeHeight) < 45) {
// // // // // //        toast.error("Height must be at least 45cm.");
// // // // // //        return;
// // // // // //     }

// // // // // //     if (!dischargeDate || !dischargeWeight || !dischargeHeight || !dischargeMuac || !outcomeIndicator || !dischargeEdema) {
// // // // // //       toast.error("Please fill all compulsory fields marked with *");
// // // // // //       return;
// // // // // //     }
// // // // // //     if (ifaGivenToMother === "0" || motherPayment === "0" || ifaSyrup === "0") {
// // // // // //       toast.error("Please select all Yes/No dropdowns");
// // // // // //       return;
// // // // // //     }
// // // // // //     if (!hemoglobinMother) {
// // // // // //         toast.error("Please enter Mother's Hemoglobin");
// // // // // //         return;
// // // // // //     }
    
// // // // // //     if (child?.AdmissionEdema && child.AdmissionEdema.trim() !== "No" && !minimumWeight) {
// // // // // //         toast.error("Please enter Minimum Weight");
// // // // // //         return;
// // // // // //     }

// // // // // //     setSubmitting(true);

// // // // // //     try {
// // // // // //       const payload = {
// // // // // //         SamNo: child?.SamNo,
// // // // // //         DischargeDate: dischargeDate,
// // // // // //         DischargeWeight: parseFloat(dischargeWeight),
// // // // // //         DischargeHeight: parseFloat(dischargeHeight),
// // // // // //         DischargeMuac: parseFloat(dischargeMuac),
// // // // // //         DischargeZScore: parseFloat(dischargeZScore), // Added to payload
// // // // // //         DischargeEdema: parseInt(dischargeEdema),
// // // // // //         ExitIndicator: parseInt(outcomeIndicator),
// // // // // //         IFAToMotherTablet: parseInt(ifaGivenToMother),
// // // // // //         MotherWages: parseInt(motherPayment),
// // // // // //         IFAToMotherSyrup: parseInt(ifaSyrup),
// // // // // //         HemoglobinMother: parseFloat(hemoglobinMother),
// // // // // //         DischargeImage: null,
// // // // // //         TotalStay: parseInt(totalStay), 
// // // // // //         MinimumWeight: minimumWeight ? parseFloat(minimumWeight) : null
// // // // // //       };

// // // // // //       const res = await fetch(`/api/discharge-child/${childId}`, {
// // // // // //         method: "PUT",
// // // // // //         headers: { "Content-Type": "application/json" },
// // // // // //         body: JSON.stringify(payload),
// // // // // //       });

// // // // // //       const contentType = res.headers.get("content-type");
// // // // // //       if (!contentType || !contentType.includes("application/json")) {
// // // // // //         throw new Error("Server returned an invalid format. Check your API route.");
// // // // // //       }

// // // // // //       const result = await res.json();
// // // // // //       if (!res.ok) throw new Error(result.message || "Failed to save");

// // // // // //       toast.success("Record Saved Successfully!");
// // // // // //       setTimeout(() => router.push("/mtc-user/dashboard/discharge"), 2000);

// // // // // //     } catch (error: any) {
// // // // // //       toast.error(error.message || "Something went wrong");
// // // // // //     } finally {
// // // // // //       setSubmitting(false);
// // // // // //     }
// // // // // //   };

// // // // // //   if (loading) {
// // // // // //     return (
// // // // // //       <div className="min-h-screen bg-slate-50 flex items-center justify-center">
// // // // // //         <div className="flex items-center gap-3 text-blue-700 text-lg font-medium">
// // // // // //             <Loader2 className="animate-spin h-6 w-6" /> Loading details...
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     );
// // // // // //   }

// // // // // //   if (!child) return null;

// // // // // //   return (
// // // // // //     <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6">
// // // // // //       <Toaster position="top-right" />
// // // // // //       <div className="max-w-7xl mx-auto">
// // // // // //         <Card className="shadow-xl border-0 rounded-2xl overflow-hidden bg-white">
// // // // // //           <CardHeader className="bg-gradient-to-r from-blue-700 to-blue-500 px-8 py-6">
// // // // // //             <div className="flex items-center gap-3 text-white">
// // // // // //               <FileText className="h-6 w-6" />
// // // // // //               <h5 className="text-2xl font-bold m-0 tracking-tight">Child Discharge Form</h5>
// // // // // //             </div>
// // // // // //           </CardHeader>

// // // // // //           <CardContent className="p-8">
// // // // // //             <form onSubmit={handleSubmit} className="space-y-10">
                
// // // // // //                 {/* --- SECTION 1: Read Only Details --- */}
// // // // // //                 <div className="bg-slate-50/50 rounded-xl p-6 border border-slate-100">
// // // // // //                   <h6 className="flex items-center gap-2 text-sm font-bold text-blue-800 uppercase tracking-wider mb-6">
// // // // // //                     <User className="h-4 w-4" /> Admission Information
// // // // // //                   </h6>
// // // // // //                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// // // // // //                       <div>
// // // // // //                           <label className="text-xs font-semibold text-slate-500 uppercase">SAM Number</label>
// // // // // //                           <Input value={child.SamNo} readOnly className="bg-slate-100 border-transparent text-slate-700 font-medium mt-1 focus-visible:ring-0" />
// // // // // //                       </div>
// // // // // //                       <div>
// // // // // //                           <label className="text-xs font-semibold text-slate-500 uppercase">Child Name</label>
// // // // // //                           <Input value={child.ChildName} readOnly className="bg-slate-100 border-transparent text-slate-700 font-medium mt-1 focus-visible:ring-0" />
// // // // // //                       </div>
// // // // // //                       <div>
// // // // // //                           <label className="text-xs font-semibold text-slate-500 uppercase">Admission Date</label>
// // // // // //                           <div className="relative mt-1">
// // // // // //                               <Input value={new Date(child.AdmissionDate).toLocaleDateString()} readOnly className="bg-slate-100 border-transparent text-slate-700 font-medium pr-10 focus-visible:ring-0" />
// // // // // //                               <div className="absolute right-3 top-2.5 text-slate-400"><Calendar className="h-4 w-4" /></div>
// // // // // //                           </div>
// // // // // //                       </div>
// // // // // //                       <div>
// // // // // //                           <label className="text-xs font-semibold text-slate-500 uppercase">Adm. Weight (kg)</label>
// // // // // //                           <Input value={child.AdmissionWeight} readOnly className="bg-slate-100 border-transparent text-slate-700 font-medium mt-1 focus-visible:ring-0" />
// // // // // //                       </div>
// // // // // //                       <div>
// // // // // //                           <label className="text-xs font-semibold text-slate-500 uppercase">Adm. Height (cm)</label>
// // // // // //                           <Input value={child.AdmissionHeight} readOnly className="bg-slate-100 border-transparent text-slate-700 font-medium mt-1 focus-visible:ring-0" />
// // // // // //                       </div>
// // // // // //                       <div>
// // // // // //                           <label className="text-xs font-semibold text-slate-500 uppercase">Adm. Edema</label>
// // // // // //                           <Input value={child.AdmissionEdema} readOnly className="bg-slate-100 border-transparent text-slate-700 font-medium mt-1 focus-visible:ring-0" />
// // // // // //                       </div>
// // // // // //                       <div>
// // // // // //                           <label className="text-xs font-semibold text-slate-500 uppercase">Adm. MUAC (cm)</label>
// // // // // //                           <Input value={child.AdmissionMuac} readOnly className="bg-slate-100 border-transparent text-slate-700 font-medium mt-1 focus-visible:ring-0" />
// // // // // //                       </div>
// // // // // //                       <div>
// // // // // //                           <label className="text-xs font-semibold text-slate-500 uppercase">Target Weight (kg)</label>
// // // // // //                           <Input value={child.TargetWeight} readOnly className="bg-slate-100 border-transparent text-slate-700 font-medium mt-1 focus-visible:ring-0" />
// // // // // //                       </div>
// // // // // //                   </div>
// // // // // //                 </div>

// // // // // //                 {/* --- SECTION 2: Discharge Vitals --- */}
// // // // // //                 <div>
// // // // // //                   <h6 className="flex items-center gap-2 text-sm font-bold text-blue-800 uppercase tracking-wider mb-5 border-b pb-2">
// // // // // //                     <Activity className="h-4 w-4" /> Discharge Vitals
// // // // // //                   </h6>
// // // // // //                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// // // // // //                       <div>
// // // // // //                           <label className="text-sm font-medium text-slate-700">Discharge Date <span className="text-red-500">*</span></label>
// // // // // //                           <Input 
// // // // // //                               type="date" 
// // // // // //                               value={dischargeDate} 
// // // // // //                               onChange={handleDateChange} 
// // // // // //                               max={new Date().toISOString().split('T')[0]}
// // // // // //                               className="mt-1 focus-visible:ring-blue-500 border-slate-200" 
// // // // // //                           />
// // // // // //                       </div>
// // // // // //                       <div>
// // // // // //                           <label className="text-sm font-medium text-slate-700">Discharge Weight (kg) <span className="text-red-500">*</span></label>
// // // // // //                           <Input 
// // // // // //                               type="number" step="0.01" 
// // // // // //                               value={dischargeWeight} 
// // // // // //                               onChange={handleWeightChange} 
// // // // // //                               placeholder="Max 100"
// // // // // //                               className="mt-1 focus-visible:ring-blue-500 border-slate-200" 
// // // // // //                           />
// // // // // //                       </div>
// // // // // //                       <div>
// // // // // //                           <label className="text-sm font-medium text-slate-700">Discharge Height (cm) <span className="text-red-500">*</span></label>
// // // // // //                           <Input 
// // // // // //                               type="number" step="0.1" 
// // // // // //                               min="45" max="130"
// // // // // //                               value={dischargeHeight} 
// // // // // //                               onChange={handleHeightChange} 
// // // // // //                               placeholder="45cm - 130cm"
// // // // // //                               className="mt-1 focus-visible:ring-blue-500 border-slate-200" 
// // // // // //                           />
// // // // // //                       </div>
// // // // // //                       <div>
// // // // // //                           <label className="text-sm font-medium text-slate-700">Discharge MUAC (cm) <span className="text-red-500">*</span></label>
// // // // // //                           <Input 
// // // // // //                               type="number" step="0.1" 
// // // // // //                               value={dischargeMuac} 
// // // // // //                               onChange={(e) => setDischargeMuac(e.target.value)} 
// // // // // //                               className="mt-1 focus-visible:ring-blue-500 border-slate-200" 
// // // // // //                           />
// // // // // //                       </div>

// // // // // //                       {/* ---> NEW Z-SCORE FIELD <--- */}
// // // // // //                       <div>
// // // // // //                           <label className="text-sm font-medium text-slate-700">Z-Score (SD)</label>
// // // // // //                           <Input 
// // // // // //                               readOnly 
// // // // // //                               value={dischargeZScore} 
// // // // // //                               className={cn("mt-1 font-semibold focus:ring-0 cursor-not-allowed", dischargeZScore === "Error" ? "bg-red-50 text-red-600 border-red-200" : "bg-slate-100 text-blue-700 border-transparent")} 
// // // // // //                           />
// // // // // //                       </div>
// // // // // //                   </div>
// // // // // //                 </div>

// // // // // //                 {/* --- SECTION 3: Outcomes & Medical Indicators --- */}
// // // // // //                 <div>
// // // // // //                   <h6 className="text-sm font-bold text-blue-800 uppercase tracking-wider mb-5 border-b pb-2">Outcomes & Medical Indicators</h6>
// // // // // //                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
// // // // // //                       <div>
// // // // // //                           <label className="text-sm font-medium text-slate-700">Outcome Indicator <span className="text-red-500">*</span></label>
// // // // // //                           <Select value={outcomeIndicator} onValueChange={setOutcomeIndicator}>
// // // // // //                               <SelectTrigger className="mt-1 focus:ring-blue-500 border-slate-200"><SelectValue placeholder="Select" /></SelectTrigger>
// // // // // //                               <SelectContent>
// // // // // //                                   <SelectItem value="1">CURED</SelectItem>
// // // // // //                                   <SelectItem value="2">DEFAULTER</SelectItem>
// // // // // //                                   <SelectItem value="3">MEDICAL TRANSFER</SelectItem>
// // // // // //                                   <SelectItem value="4">NON RESPONDENT</SelectItem>
// // // // // //                                   <SelectItem value="5">DEATH</SelectItem>
// // // // // //                                   <SelectItem value="6">PARTIAL IMPROVEMENT</SelectItem>
// // // // // //                               </SelectContent>
// // // // // //                           </Select>
// // // // // //                       </div>
// // // // // //                       <div>
// // // // // //                           <label className="text-sm font-medium text-slate-700">Discharge EDEMA <span className="text-red-500">*</span></label>
// // // // // //                           <Select value={dischargeEdema} onValueChange={setDischargeEdema}>
// // // // // //                               <SelectTrigger className="mt-1 focus:ring-blue-500 border-slate-200"><SelectValue placeholder="Select" /></SelectTrigger>
// // // // // //                               <SelectContent>
// // // // // //                                   <SelectItem value="4">No Edema</SelectItem>
// // // // // //                                   <SelectItem value="1">+</SelectItem>
// // // // // //                                   <SelectItem value="2">++</SelectItem>
// // // // // //                                   <SelectItem value="3">+++</SelectItem>
// // // // // //                               </SelectContent>
// // // // // //                           </Select>
// // // // // //                       </div>
// // // // // //                       <div>
// // // // // //                           <label className="text-sm font-medium text-slate-700">Adm. Hemoglobin (gm/dl)</label>
// // // // // //                           <Input value={child.AdmissionHemoglobin || "N/A"} readOnly className="bg-slate-100 border-transparent text-slate-700 font-medium mt-1 focus-visible:ring-0" />
// // // // // //                       </div>
// // // // // //                       <div>
// // // // // //                           <label className="text-sm font-medium text-slate-700">Mother's Hb (gm/dl) <span className="text-red-500">*</span></label>
// // // // // //                           <Input 
// // // // // //                               type="number" step="0.1" 
// // // // // //                               value={hemoglobinMother} 
// // // // // //                               onChange={(e) => setHemoglobinMother(e.target.value)} 
// // // // // //                               className="mt-1 focus-visible:ring-blue-500 border-slate-200"
// // // // // //                           />
// // // // // //                       </div>
// // // // // //                   </div>

// // // // // //                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // // // // //                       <div>
// // // // // //                           <label className="text-sm font-medium text-slate-700">IFA Given To Mother <span className="text-red-500">*</span></label>
// // // // // //                           <Select value={ifaGivenToMother} onValueChange={setIfaGivenToMother}>
// // // // // //                               <SelectTrigger className="mt-1 focus:ring-blue-500 border-slate-200"><SelectValue placeholder="Select" /></SelectTrigger>
// // // // // //                               <SelectContent>
// // // // // //                                   <SelectItem value="0">Select</SelectItem>
// // // // // //                                   <SelectItem value="1">Yes</SelectItem>
// // // // // //                                   <SelectItem value="2">No</SelectItem>
// // // // // //                               </SelectContent>
// // // // // //                           </Select>
// // // // // //                       </div>
// // // // // //                       <div>
// // // // // //                           <label className="text-sm font-medium text-slate-700">Mother's Wage Comp. <span className="text-red-500">*</span></label>
// // // // // //                           <Select value={motherPayment} onValueChange={setMotherPayment}>
// // // // // //                               <SelectTrigger className="mt-1 focus:ring-blue-500 border-slate-200"><SelectValue placeholder="Select" /></SelectTrigger>
// // // // // //                               <SelectContent>
// // // // // //                                   <SelectItem value="0">Select</SelectItem>
// // // // // //                                   <SelectItem value="1">Yes</SelectItem>
// // // // // //                                   <SelectItem value="2">No</SelectItem>
// // // // // //                               </SelectContent>
// // // // // //                           </Select>
// // // // // //                       </div>
// // // // // //                       <div>
// // // // // //                           <label className="text-sm font-medium text-slate-700">IFA Syrup to Child <span className="text-red-500">*</span></label>
// // // // // //                           <Select value={ifaSyrup} onValueChange={setIfaSyrup}>
// // // // // //                               <SelectTrigger className="mt-1 focus:ring-blue-500 border-slate-200"><SelectValue placeholder="Select" /></SelectTrigger>
// // // // // //                               <SelectContent>
// // // // // //                                   <SelectItem value="0">Select</SelectItem>
// // // // // //                                   <SelectItem value="1">Yes</SelectItem>
// // // // // //                                   <SelectItem value="2">No</SelectItem>
// // // // // //                               </SelectContent>
// // // // // //                           </Select>
// // // // // //                       </div>
// // // // // //                   </div>
// // // // // //                 </div>

// // // // // //                 {/* --- SECTION 4: Conditional Edema Fields --- */}
// // // // // //                 {child.AdmissionEdema && child.AdmissionEdema.trim() !== "No" && (
// // // // // //                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-amber-50 p-5 rounded-xl border border-amber-200 animate-in fade-in">
// // // // // //                         <div>
// // // // // //                             <label className="text-sm font-medium text-amber-900">Minimum Weight <span className="text-red-500">*</span></label>
// // // // // //                             <Input 
// // // // // //                                 type="number" step="0.01" 
// // // // // //                                 value={minimumWeight} 
// // // // // //                                 onChange={(e) => setMinimumWeight(e.target.value)} 
// // // // // //                                 className="mt-1 bg-white border-amber-300 focus-visible:ring-amber-500" 
// // // // // //                             />
// // // // // //                         </div>
// // // // // //                         <div>
// // // // // //                             <label className="text-sm font-medium text-amber-900">Total Stay (Days)</label>
// // // // // //                             <Input 
// // // // // //                                 value={totalStay} 
// // // // // //                                 readOnly 
// // // // // //                                 className="mt-1 bg-amber-100 font-bold text-amber-900 border-transparent focus-visible:ring-0" 
// // // // // //                             />
// // // // // //                         </div>
// // // // // //                     </div>
// // // // // //                 )}

// // // // // //                 {/* ---> NEW MANDATORY CONFIRMATION CHECKBOX <--- */}
// // // // // //                 <div className="flex items-center space-x-3 bg-blue-50 p-5 rounded-xl border border-blue-100 mt-8 shadow-sm">
// // // // // //                   <input 
// // // // // //                     type="checkbox" 
// // // // // //                     id="confirmUpdate" 
// // // // // //                     checked={isConfirmed} 
// // // // // //                     onChange={(e) => setIsConfirmed(e.target.checked)} 
// // // // // //                     className="h-5 w-5 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
// // // // // //                   />
// // // // // //                   <label htmlFor="confirmUpdate" className="text-sm font-semibold text-blue-900 cursor-pointer select-none">
// // // // // //                     I confirm that Daily Weight and Micronutrient details have been updated before discharge. <span className="text-red-500">*</span>
// // // // // //                   </label>
// // // // // //                 </div>

// // // // // //                 {/* --- Footer Buttons --- */}
// // // // // //                 <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t border-slate-100">
// // // // // //                     <Button 
// // // // // //                         type="button" 
// // // // // //                         variant="outline" 
// // // // // //                         className="border-slate-300 text-slate-700 hover:bg-slate-100 min-w-[120px]"
// // // // // //                         onClick={() => router.push("/mtc-user/dashboard/discharge")}
// // // // // //                     >
// // // // // //                         <X className="mr-2 h-4 w-4" /> Cancel
// // // // // //                     </Button>
// // // // // //                     <Button 
// // // // // //                         type="submit" 
// // // // // //                         disabled={submitting} 
// // // // // //                         className="bg-blue-600 hover:bg-blue-700 text-white min-w-[150px] shadow-md shadow-blue-500/20"
// // // // // //                     >
// // // // // //                         {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
// // // // // //                         Submit Discharge
// // // // // //                     </Button>
// // // // // //                 </div>

// // // // // //             </form>
// // // // // //           </CardContent>
// // // // // //         </Card>
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // }


// // // // // "use client";

// // // // // import { useState, useEffect, use } from "react";
// // // // // import { useRouter } from "next/navigation";
// // // // // import { Button } from "@/components/ui/button";
// // // // // import { Input } from "@/components/ui/input";
// // // // // import { Card, CardHeader, CardContent } from "@/components/ui/card";
// // // // // import { 
// // // // //   Select, 
// // // // //   SelectContent, 
// // // // //   SelectItem, 
// // // // //   SelectTrigger, 
// // // // //   SelectValue 
// // // // // } from "@/components/ui/select";
// // // // // import { Save, X, Loader2, Calendar, User, FileText, Activity, CheckSquare } from "lucide-react";
// // // // // import toast, { Toaster } from "react-hot-toast";
// // // // // import { differenceInDays, isValid } from "date-fns";
// // // // // import { clsx, type ClassValue } from "clsx";
// // // // // import { twMerge } from "tailwind-merge";

// // // // // function cn(...inputs: ClassValue[]) {
// // // // //   return twMerge(clsx(inputs));
// // // // // }

// // // // // // Interface for Child Data (from DB)
// // // // // interface ChildData {
// // // // //   SamNo: string;
// // // // //   ChildName: string;
// // // // //   FatherName: string;
// // // // //   MotherName: string;
// // // // //   AdmissionDate: string;
// // // // //   AdmissionWeight: number;
// // // // //   AdmissionHeight: number;
// // // // //   AdmissionEdema: string; 
// // // // //   AdmissionMuac: number;
// // // // //   TargetWeight: number;
// // // // //   AdmissionHemoglobin: number;
// // // // //   Sex?: string;
// // // // // }

// // // // // export default function DischargeFormPage({ params }: { params: Promise<{ id: string }> }) {
// // // // //   const router = useRouter();
  
// // // // //   // Next.js 15 Fix: Unwrap params securely
// // // // //   const resolvedParams = use(params);
// // // // //   const childId = resolvedParams.id;
  
// // // // //   // --- State Management ---
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [submitting, setSubmitting] = useState(false);
// // // // //   const [child, setChild] = useState<ChildData | null>(null);
  
// // // // //   // Form Fields
// // // // //   const [dischargeDate, setDischargeDate] = useState(new Date().toISOString().split('T')[0]);
// // // // //   const [dischargeWeight, setDischargeWeight] = useState("");
// // // // //   const [dischargeHeight, setDischargeHeight] = useState("");
// // // // //   const [dischargeMuac, setDischargeMuac] = useState("");
// // // // //   const [dischargeZScore, setDischargeZScore] = useState(""); // <-- ADDED Z-SCORE STATE
// // // // //   const [outcomeIndicator, setOutcomeIndicator] = useState("");
// // // // //   const [dischargeEdema, setDischargeEdema] = useState("");
  
// // // // //   // Medical / Social
// // // // //   const [hemoglobinMother, setHemoglobinMother] = useState("");
// // // // //   const [ifaGivenToMother, setIfaGivenToMother] = useState("0");
// // // // //   const [motherPayment, setMotherPayment] = useState("0");
// // // // //   const [ifaSyrup, setIfaSyrup] = useState("0");
  
// // // // //   // Conditional Fields (Only if Admission Edema != "No")
// // // // //   const [minimumWeight, setMinimumWeight] = useState("");
// // // // //   const [totalStay, setTotalStay] = useState("0");

// // // // //   // Confirmation Checkbox
// // // // //   const [isConfirmed, setIsConfirmed] = useState(false); // <-- ADDED CONFIRMATION STATE

// // // // //   // --- 1. Fetch Child Data ---
// // // // //   useEffect(() => {
// // // // //     const fetchChild = async () => {
// // // // //       if (!childId) return;

// // // // //       try {
// // // // //         const res = await fetch(`/api/child/${childId}`);

// // // // //         const contentType = res.headers.get("content-type");
// // // // //         if (!contentType || !contentType.includes("application/json")) {
// // // // //           throw new Error("Server returned an invalid format. Check your API route.");
// // // // //         }

// // // // //         if (!res.ok) throw new Error(`API returned status ${res.status}`);

// // // // //         const result = await res.json();

// // // // //         if (result.success && result.data) {
// // // // //           setChild(result.data);
// // // // //           if (result.data.AdmissionDate) {
// // // // //              calculateTotalStay(result.data.AdmissionDate, new Date().toISOString().split('T')[0]);
// // // // //           }
// // // // //         } else {
// // // // //           toast.error("Child not found");
// // // // //           router.push("/mtc-user/dashboard/discharge");
// // // // //         }
// // // // //       } catch (error: any) {
// // // // //         toast.error(error.message || "Error loading data");
// // // // //       } finally {
// // // // //         setLoading(false);
// // // // //       }
// // // // //     };

// // // // //     fetchChild();
// // // // //   }, [childId, router]);

// // // // //   // --- 2. Logic & Calculations ---

// // // // //   // Calculate Total Stay Days
// // // // //   const calculateTotalStay = (admDateStr: string, disDateStr: string) => {
// // // // //     const admDate = new Date(admDateStr);
// // // // //     const disDate = new Date(disDateStr);
    
// // // // //     if (isValid(admDate) && isValid(disDate)) {
// // // // //       const days = differenceInDays(disDate, admDate);
// // // // //       setTotalStay(days >= 0 ? days.toString() : "0");
// // // // //     }
// // // // //   };

// // // // //   // Handle Date Change
// // // // //   const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // //     const newDate = e.target.value;
// // // // //     setDischargeDate(newDate);
    
// // // // //     if (child?.AdmissionDate) {
// // // // //       const adm = new Date(child.AdmissionDate);
// // // // //       const dis = new Date(newDate);
      
// // // // //       if (dis < adm) {
// // // // //         toast.error("Discharge date cannot be before Admission Date");
// // // // //         setDischargeDate(""); 
// // // // //         setTotalStay("0");
// // // // //       } else {
// // // // //         calculateTotalStay(child.AdmissionDate, newDate);
// // // // //       }
// // // // //     }
// // // // //   };

// // // // //   // Weight Limits
// // // // //   const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // //     const val = parseFloat(e.target.value);
// // // // //     if (val > 100) {
// // // // //       toast.error("Weight cannot be greater than 100kg");
// // // // //       setDischargeWeight("");
// // // // //     } else {
// // // // //       setDischargeWeight(e.target.value);
// // // // //     }
// // // // //   };

// // // // //   // Height Limits (Min 45cm, Max 120cm)
// // // // //   const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // //     const val = parseFloat(e.target.value);
// // // // //     if (val > 120) {
// // // // //       toast.error("Height cannot be greater than 120cm");
// // // // //       setDischargeHeight("");
// // // // //     } else {
// // // // //       setDischargeHeight(e.target.value);
// // // // //     }
// // // // //   };

// // // // //   // DYNAMIC Z-SCORE CALCULATION
// // // // //   useEffect(() => {
// // // // //     if (dischargeWeight && dischargeHeight) {
// // // // //       const score = (parseFloat(dischargeWeight) / (parseFloat(dischargeHeight) / 100) ** 2) - 15;
// // // // //       setDischargeZScore(isFinite(score) && score < 99 && score > -99 ? score.toFixed(2) : "Error");
// // // // //     } else {
// // // // //       setDischargeZScore("");
// // // // //     }
// // // // //   }, [dischargeWeight, dischargeHeight]);

// // // // //   // --- 3. Submit Handler ---
// // // // //   const handleSubmit = async (e: React.FormEvent) => {
// // // // //     e.preventDefault();

// // // // //     // Custom Validations
// // // // //     if (!isConfirmed) {
// // // // //       toast.error("Please confirm that Daily Weight and Micronutrients are updated.");
// // // // //       return;
// // // // //     }

// // // // //     if (parseFloat(dischargeHeight) < 45) {
// // // // //        toast.error("Height must be at least 45cm.");
// // // // //        return;
// // // // //     }

// // // // //     if (!dischargeDate || !dischargeWeight || !dischargeHeight || !dischargeMuac || !outcomeIndicator || !dischargeEdema) {
// // // // //       toast.error("Please fill all compulsory fields marked with *");
// // // // //       return;
// // // // //     }
// // // // //     if (ifaGivenToMother === "0" || motherPayment === "0" || ifaSyrup === "0") {
// // // // //       toast.error("Please select all Yes/No dropdowns");
// // // // //       return;
// // // // //     }
// // // // //     if (!hemoglobinMother) {
// // // // //         toast.error("Please enter Mother's Hemoglobin");
// // // // //         return;
// // // // //     }
    
// // // // //     if (child?.AdmissionEdema && child.AdmissionEdema.trim() !== "No" && !minimumWeight) {
// // // // //         toast.error("Please enter Minimum Weight");
// // // // //         return;
// // // // //     }

// // // // //     setSubmitting(true);

// // // // //     try {
// // // // //       const payload = {
// // // // //         SamNo: child?.SamNo,
// // // // //         DischargeDate: dischargeDate,
// // // // //         DischargeWeight: parseFloat(dischargeWeight),
// // // // //         DischargeHeight: parseFloat(dischargeHeight),
// // // // //         DischargeMuac: parseFloat(dischargeMuac),
// // // // //         DischargeZScore: parseFloat(dischargeZScore), // Added to payload
// // // // //         DischargeEdema: parseInt(dischargeEdema),
// // // // //         ExitIndicator: parseInt(outcomeIndicator),
// // // // //         IFAToMotherTablet: parseInt(ifaGivenToMother),
// // // // //         MotherWages: parseInt(motherPayment),
// // // // //         IFAToMotherSyrup: parseInt(ifaSyrup),
// // // // //         HemoglobinMother: parseFloat(hemoglobinMother),
// // // // //         DischargeImage: null,
// // // // //         TotalStay: parseInt(totalStay), 
// // // // //         MinimumWeight: minimumWeight ? parseFloat(minimumWeight) : null
// // // // //       };

// // // // //       const res = await fetch(`/api/discharge-child/${childId}`, {
// // // // //         method: "PUT",
// // // // //         headers: { "Content-Type": "application/json" },
// // // // //         body: JSON.stringify(payload),
// // // // //       });

// // // // //       const contentType = res.headers.get("content-type");
// // // // //       if (!contentType || !contentType.includes("application/json")) {
// // // // //         throw new Error("Server returned an invalid format. Check your API route.");
// // // // //       }

// // // // //       const result = await res.json();
// // // // //       if (!res.ok) throw new Error(result.message || "Failed to save");

// // // // //       toast.success("Record Saved Successfully!");
// // // // //       setTimeout(() => router.push("/mtc-user/dashboard/discharge"), 2000);

// // // // //     } catch (error: any) {
// // // // //       toast.error(error.message || "Something went wrong");
// // // // //     } finally {
// // // // //       setSubmitting(false);
// // // // //     }
// // // // //   };

// // // // //   if (loading) {
// // // // //     return (
// // // // //       <div className="min-h-screen bg-slate-50 flex items-center justify-center">
// // // // //         <div className="flex items-center gap-3 text-blue-700 text-lg font-medium">
// // // // //             <Loader2 className="animate-spin h-6 w-6" /> Loading details...
// // // // //         </div>
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   if (!child) return null;

// // // // //   return (
// // // // //     <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6">
// // // // //       <Toaster position="top-right" />
// // // // //       <div className="max-w-7xl mx-auto">
// // // // //         <Card className="shadow-xl border-0 rounded-2xl overflow-hidden bg-white">
// // // // //           <CardHeader className="bg-gradient-to-r from-blue-700 to-blue-500 px-8 py-6">
// // // // //             <div className="flex items-center gap-3 text-white">
// // // // //               <FileText className="h-6 w-6" />
// // // // //               <h5 className="text-2xl font-bold m-0 tracking-tight">Child Discharge Form</h5>
// // // // //             </div>
// // // // //           </CardHeader>

// // // // //           <CardContent className="p-8">
// // // // //             <form onSubmit={handleSubmit} className="space-y-10">
                
// // // // //                 {/* --- SECTION 1: Read Only Details --- */}
// // // // //                 <div className="bg-slate-50/50 rounded-xl p-6 border border-slate-100">
// // // // //                   <h6 className="flex items-center gap-2 text-sm font-bold text-blue-800 uppercase tracking-wider mb-6">
// // // // //                     <User className="h-4 w-4" /> Admission Information
// // // // //                   </h6>
// // // // //                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// // // // //                       <div>
// // // // //                           <label className="text-xs font-semibold text-slate-500 uppercase">SAM Number</label>
// // // // //                           <Input value={child.SamNo} readOnly className="bg-slate-100 border-transparent text-slate-700 font-medium mt-1 focus-visible:ring-0" />
// // // // //                       </div>
// // // // //                       <div>
// // // // //                           <label className="text-xs font-semibold text-slate-500 uppercase">Child Name</label>
// // // // //                           <Input value={child.ChildName} readOnly className="bg-slate-100 border-transparent text-slate-700 font-medium mt-1 focus-visible:ring-0" />
// // // // //                       </div>
// // // // //                       <div>
// // // // //                           <label className="text-xs font-semibold text-slate-500 uppercase">Admission Date</label>
// // // // //                           <div className="relative mt-1">
// // // // //                               <Input value={new Date(child.AdmissionDate).toLocaleDateString()} readOnly className="bg-slate-100 border-transparent text-slate-700 font-medium pr-10 focus-visible:ring-0" />
// // // // //                               <div className="absolute right-3 top-2.5 text-slate-400"><Calendar className="h-4 w-4" /></div>
// // // // //                           </div>
// // // // //                       </div>
// // // // //                       <div>
// // // // //                           <label className="text-xs font-semibold text-slate-500 uppercase">Adm. Weight (kg)</label>
// // // // //                           <Input value={child.AdmissionWeight} readOnly className="bg-slate-100 border-transparent text-slate-700 font-medium mt-1 focus-visible:ring-0" />
// // // // //                       </div>
// // // // //                       <div>
// // // // //                           <label className="text-xs font-semibold text-slate-500 uppercase">Adm. Height (cm)</label>
// // // // //                           <Input value={child.AdmissionHeight} readOnly className="bg-slate-100 border-transparent text-slate-700 font-medium mt-1 focus-visible:ring-0" />
// // // // //                       </div>
// // // // //                       <div>
// // // // //                           <label className="text-xs font-semibold text-slate-500 uppercase">Adm. Edema</label>
// // // // //                           <Input value={child.AdmissionEdema} readOnly className="bg-slate-100 border-transparent text-slate-700 font-medium mt-1 focus-visible:ring-0" />
// // // // //                       </div>
// // // // //                       <div>
// // // // //                           <label className="text-xs font-semibold text-slate-500 uppercase">Adm. MUAC (cm)</label>
// // // // //                           <Input value={child.AdmissionMuac} readOnly className="bg-slate-100 border-transparent text-slate-700 font-medium mt-1 focus-visible:ring-0" />
// // // // //                       </div>
// // // // //                       <div>
// // // // //                           <label className="text-xs font-semibold text-slate-500 uppercase">Target Weight (kg)</label>
// // // // //                           <Input value={child.TargetWeight} readOnly className="bg-slate-100 border-transparent text-slate-700 font-medium mt-1 focus-visible:ring-0" />
// // // // //                       </div>
// // // // //                   </div>
// // // // //                 </div>

// // // // //                 {/* --- SECTION 2: Discharge Vitals --- */}
// // // // //                 <div>
// // // // //                   <h6 className="flex items-center gap-2 text-sm font-bold text-blue-800 uppercase tracking-wider mb-5 border-b pb-2">
// // // // //                     <Activity className="h-4 w-4" /> Discharge Vitals
// // // // //                   </h6>
// // // // //                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// // // // //                       <div>
// // // // //                           <label className="text-sm font-medium text-slate-700">Discharge Date <span className="text-red-500">*</span></label>
// // // // //                           <Input 
// // // // //                               type="date" 
// // // // //                               value={dischargeDate} 
// // // // //                               onChange={handleDateChange} 
// // // // //                               max={new Date().toISOString().split('T')[0]}
// // // // //                               className="mt-1 focus-visible:ring-blue-500 border-slate-200" 
// // // // //                           />
// // // // //                       </div>
// // // // //                       <div>
// // // // //                           <label className="text-sm font-medium text-slate-700">Discharge Weight (kg) <span className="text-red-500">*</span></label>
// // // // //                           <Input 
// // // // //                               type="number" step="0.01" 
// // // // //                               value={dischargeWeight} 
// // // // //                               onChange={handleWeightChange} 
// // // // //                               placeholder="Max 100"
// // // // //                               className="mt-1 focus-visible:ring-blue-500 border-slate-200" 
// // // // //                           />
// // // // //                       </div>
// // // // //                       <div>
// // // // //                           <label className="text-sm font-medium text-slate-700">Discharge Height (cm) <span className="text-red-500">*</span></label>
// // // // //                           <Input 
// // // // //                               type="number" step="0.1" 
// // // // //                               min="45" max="120"
// // // // //                               value={dischargeHeight} 
// // // // //                               onChange={handleHeightChange} 
// // // // //                               placeholder="45cm - 120cm"
// // // // //                               className="mt-1 focus-visible:ring-blue-500 border-slate-200" 
// // // // //                           />
// // // // //                       </div>
// // // // //                       <div>
// // // // //                           <label className="text-sm font-medium text-slate-700">Discharge MUAC (cm) <span className="text-red-500">*</span></label>
// // // // //                           <Input 
// // // // //                               type="number" step="0.1" 
// // // // //                               value={dischargeMuac} 
// // // // //                               onChange={(e) => setDischargeMuac(e.target.value)} 
// // // // //                               className="mt-1 focus-visible:ring-blue-500 border-slate-200" 
// // // // //                           />
// // // // //                       </div>

// // // // //                       {/* ---> NEW Z-SCORE FIELD <--- */}
// // // // //                       <div>
// // // // //                           <label className="text-sm font-medium text-slate-700">Z-Score (SD)</label>
// // // // //                           <Input 
// // // // //                               readOnly 
// // // // //                               value={dischargeZScore} 
// // // // //                               className={cn("mt-1 font-semibold focus:ring-0 cursor-not-allowed", dischargeZScore === "Error" ? "bg-red-50 text-red-600 border-red-200" : "bg-slate-100 text-blue-700 border-transparent")} 
// // // // //                           />
// // // // //                       </div>
// // // // //                   </div>
// // // // //                 </div>

// // // // //                 {/* --- SECTION 3: Outcomes & Medical Indicators --- */}
// // // // //                 <div>
// // // // //                   <h6 className="text-sm font-bold text-blue-800 uppercase tracking-wider mb-5 border-b pb-2">Outcomes & Medical Indicators</h6>
// // // // //                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
// // // // //                       <div>
// // // // //                           <label className="text-sm font-medium text-slate-700">Outcome Indicator <span className="text-red-500">*</span></label>
// // // // //                           <Select value={outcomeIndicator} onValueChange={setOutcomeIndicator}>
// // // // //                               <SelectTrigger className="mt-1 focus:ring-blue-500 border-slate-200"><SelectValue placeholder="Select" /></SelectTrigger>
// // // // //                               <SelectContent>
// // // // //                                   <SelectItem value="1">CURED</SelectItem>
// // // // //                                   <SelectItem value="2">DEFAULTER</SelectItem>
// // // // //                                   <SelectItem value="3">MEDICAL TRANSFER</SelectItem>
// // // // //                                   <SelectItem value="4">NON RESPONDENT</SelectItem>
// // // // //                                   <SelectItem value="5">DEATH</SelectItem>
// // // // //                                   <SelectItem value="6">PARTIAL IMPROVEMENT</SelectItem>
// // // // //                               </SelectContent>
// // // // //                           </Select>
// // // // //                       </div>
// // // // //                       <div>
// // // // //                           <label className="text-sm font-medium text-slate-700">Discharge EDEMA <span className="text-red-500">*</span></label>
// // // // //                           <Select value={dischargeEdema} onValueChange={setDischargeEdema}>
// // // // //                               <SelectTrigger className="mt-1 focus:ring-blue-500 border-slate-200"><SelectValue placeholder="Select" /></SelectTrigger>
// // // // //                               <SelectContent>
// // // // //                                   <SelectItem value="4">No Edema</SelectItem>
// // // // //                                   <SelectItem value="1">+</SelectItem>
// // // // //                                   <SelectItem value="2">++</SelectItem>
// // // // //                                   <SelectItem value="3">+++</SelectItem>
// // // // //                               </SelectContent>
// // // // //                           </Select>
// // // // //                       </div>
// // // // //                       <div>
// // // // //                           <label className="text-sm font-medium text-slate-700">Adm. Hemoglobin (gm/dl)</label>
// // // // //                           <Input value={child.AdmissionHemoglobin || "N/A"} readOnly className="bg-slate-100 border-transparent text-slate-700 font-medium mt-1 focus-visible:ring-0" />
// // // // //                       </div>
// // // // //                       <div>
// // // // //                           <label className="text-sm font-medium text-slate-700">Mother's Hb (gm/dl) <span className="text-red-500">*</span></label>
// // // // //                           <Input 
// // // // //                               type="number" step="0.1" 
// // // // //                               value={hemoglobinMother} 
// // // // //                               onChange={(e) => setHemoglobinMother(e.target.value)} 
// // // // //                               className="mt-1 focus-visible:ring-blue-500 border-slate-200"
// // // // //                           />
// // // // //                       </div>
// // // // //                   </div>

// // // // //                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // // // //                       <div>
// // // // //                           <label className="text-sm font-medium text-slate-700">IFA Given To Mother <span className="text-red-500">*</span></label>
// // // // //                           <Select value={ifaGivenToMother} onValueChange={setIfaGivenToMother}>
// // // // //                               <SelectTrigger className="mt-1 focus:ring-blue-500 border-slate-200"><SelectValue placeholder="Select" /></SelectTrigger>
// // // // //                               <SelectContent>
// // // // //                                   <SelectItem value="0">Select</SelectItem>
// // // // //                                   <SelectItem value="1">Yes</SelectItem>
// // // // //                                   <SelectItem value="2">No</SelectItem>
// // // // //                               </SelectContent>
// // // // //                           </Select>
// // // // //                       </div>
// // // // //                       <div>
// // // // //                           <label className="text-sm font-medium text-slate-700">Mother's Wage Comp. <span className="text-red-500">*</span></label>
// // // // //                           <Select value={motherPayment} onValueChange={setMotherPayment}>
// // // // //                               <SelectTrigger className="mt-1 focus:ring-blue-500 border-slate-200"><SelectValue placeholder="Select" /></SelectTrigger>
// // // // //                               <SelectContent>
// // // // //                                   <SelectItem value="0">Select</SelectItem>
// // // // //                                   <SelectItem value="1">Yes</SelectItem>
// // // // //                                   <SelectItem value="2">No</SelectItem>
// // // // //                               </SelectContent>
// // // // //                           </Select>
// // // // //                       </div>
// // // // //                       <div>
// // // // //                           <label className="text-sm font-medium text-slate-700">IFA Syrup to Child <span className="text-red-500">*</span></label>
// // // // //                           <Select value={ifaSyrup} onValueChange={setIfaSyrup}>
// // // // //                               <SelectTrigger className="mt-1 focus:ring-blue-500 border-slate-200"><SelectValue placeholder="Select" /></SelectTrigger>
// // // // //                               <SelectContent>
// // // // //                                   <SelectItem value="0">Select</SelectItem>
// // // // //                                   <SelectItem value="1">Yes</SelectItem>
// // // // //                                   <SelectItem value="2">No</SelectItem>
// // // // //                               </SelectContent>
// // // // //                           </Select>
// // // // //                       </div>
// // // // //                   </div>
// // // // //                 </div>

// // // // //                 {/* --- SECTION 4: Conditional Edema Fields --- */}
// // // // //                 {child.AdmissionEdema && child.AdmissionEdema.trim() !== "No" && (
// // // // //                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-amber-50 p-5 rounded-xl border border-amber-200 animate-in fade-in">
// // // // //                         <div>
// // // // //                             <label className="text-sm font-medium text-amber-900">Minimum Weight <span className="text-red-500">*</span></label>
// // // // //                             <Input 
// // // // //                                 type="number" step="0.01" 
// // // // //                                 value={minimumWeight} 
// // // // //                                 onChange={(e) => setMinimumWeight(e.target.value)} 
// // // // //                                 className="mt-1 bg-white border-amber-300 focus-visible:ring-amber-500" 
// // // // //                             />
// // // // //                         </div>
// // // // //                         <div>
// // // // //                             <label className="text-sm font-medium text-amber-900">Total Stay (Days)</label>
// // // // //                             <Input 
// // // // //                                 value={totalStay} 
// // // // //                                 readOnly 
// // // // //                                 className="mt-1 bg-amber-100 font-bold text-amber-900 border-transparent focus-visible:ring-0" 
// // // // //                             />
// // // // //                         </div>
// // // // //                     </div>
// // // // //                 )}

// // // // //                 {/* ---> NEW MANDATORY CONFIRMATION CHECKBOX <--- */}
// // // // //                 <div className="flex items-center space-x-3 bg-blue-50 p-5 rounded-xl border border-blue-100 mt-8 shadow-sm">
// // // // //                   <input 
// // // // //                     type="checkbox" 
// // // // //                     id="confirmUpdate" 
// // // // //                     checked={isConfirmed} 
// // // // //                     onChange={(e) => setIsConfirmed(e.target.checked)} 
// // // // //                     className="h-5 w-5 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
// // // // //                   />
// // // // //                   <label htmlFor="confirmUpdate" className="text-sm font-semibold text-blue-900 cursor-pointer select-none">
// // // // //                     I confirm that Daily Weight and Micronutrient details have been updated before discharge. <span className="text-red-500">*</span>
// // // // //                   </label>
// // // // //                 </div>

// // // // //                 {/* --- Footer Buttons --- */}
// // // // //                 <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t border-slate-100">
// // // // //                     <Button 
// // // // //                         type="button" 
// // // // //                         variant="outline" 
// // // // //                         className="border-slate-300 text-slate-700 hover:bg-slate-100 min-w-[120px]"
// // // // //                         onClick={() => router.push("/mtc-user/dashboard/discharge")}
// // // // //                     >
// // // // //                         <X className="mr-2 h-4 w-4" /> Cancel
// // // // //                     </Button>
// // // // //                     <Button 
// // // // //                         type="submit" 
// // // // //                         disabled={submitting} 
// // // // //                         className="bg-blue-600 hover:bg-blue-700 text-white min-w-[150px] shadow-md shadow-blue-500/20"
// // // // //                     >
// // // // //                         {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
// // // // //                         Submit Discharge
// // // // //                     </Button>
// // // // //                 </div>

// // // // //             </form>
// // // // //           </CardContent>
// // // // //         </Card>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }


// // // // "use client";

// // // // import { useState, useEffect, use } from "react";
// // // // import { useRouter } from "next/navigation";
// // // // import { Button } from "@/components/ui/button";
// // // // import { Input } from "@/components/ui/input";
// // // // import { Card, CardHeader, CardContent } from "@/components/ui/card";
// // // // import { 
// // // //   Select, 
// // // //   SelectContent, 
// // // //   SelectItem, 
// // // //   SelectTrigger, 
// // // //   SelectValue 
// // // // } from "@/components/ui/select";
// // // // import { Save, X, Loader2, Calendar, User, FileText, Activity, CheckSquare } from "lucide-react";
// // // // import toast, { Toaster } from "react-hot-toast";
// // // // import { differenceInDays, isValid } from "date-fns";
// // // // import { clsx, type ClassValue } from "clsx";
// // // // import { twMerge } from "tailwind-merge";

// // // // function cn(...inputs: ClassValue[]) {
// // // //   return twMerge(clsx(inputs));
// // // // }

// // // // // Interface for Child Data (from DB)
// // // // interface ChildData {
// // // //   SamNo: string;
// // // //   ChildName: string;
// // // //   FatherName: string;
// // // //   MotherName: string;
// // // //   AdmissionDate: string;
// // // //   AdmissionWeight: number;
// // // //   AdmissionHeight: number;
// // // //   AdmissionEdema: string; 
// // // //   AdmissionMuac: number;
// // // //   TargetWeight: number;
// // // //   AdmissionHemoglobin: number;
// // // //   Sex?: string;
// // // //   uuidChild?: string; // Often required by the external SAAMAR API
// // // // }

// // // // export default function DischargeFormPage({ params }: { params: Promise<{ id: string }> }) {
// // // //   const router = useRouter();
  
// // // //   // Next.js 15 Fix: Unwrap params securely
// // // //   const resolvedParams = use(params);
// // // //   const childId = resolvedParams.id;
  
// // // //   // --- State Management ---
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [submitting, setSubmitting] = useState(false);
// // // //   const [child, setChild] = useState<ChildData | null>(null);
  
// // // //   // Form Fields
// // // //   const [dischargeDate, setDischargeDate] = useState(new Date().toISOString().split('T')[0]);
// // // //   const [dischargeWeight, setDischargeWeight] = useState("");
// // // //   const [dischargeHeight, setDischargeHeight] = useState("");
// // // //   const [dischargeMuac, setDischargeMuac] = useState("");
// // // //   const [dischargeZScore, setDischargeZScore] = useState("");
// // // //   const [outcomeIndicator, setOutcomeIndicator] = useState("");
// // // //   const [dischargeEdema, setDischargeEdema] = useState("");
  
// // // //   // Medical / Social
// // // //   const [hemoglobinMother, setHemoglobinMother] = useState("");
// // // //   const [ifaGivenToMother, setIfaGivenToMother] = useState("0");
// // // //   const [motherPayment, setMotherPayment] = useState("0");
// // // //   const [ifaSyrup, setIfaSyrup] = useState("0");
  
// // // //   // Conditional Fields (Only if Admission Edema != "No")
// // // //   const [minimumWeight, setMinimumWeight] = useState("");
// // // //   const [totalStay, setTotalStay] = useState("0");

// // // //   // Confirmation Checkbox
// // // //   const [isConfirmed, setIsConfirmed] = useState(false);

// // // //   // --- 1. Fetch Child Data ---
// // // //   useEffect(() => {
// // // //     const fetchChild = async () => {
// // // //       if (!childId) return;

// // // //       try {
// // // //         const res = await fetch(`/api/child/${childId}`);

// // // //         const contentType = res.headers.get("content-type");
// // // //         if (!contentType || !contentType.includes("application/json")) {
// // // //           throw new Error("Server returned an invalid format. Check your API route.");
// // // //         }

// // // //         if (!res.ok) throw new Error(`API returned status ${res.status}`);

// // // //         const result = await res.json();

// // // //         if (result.success && result.data) {
// // // //           setChild(result.data);
// // // //           if (result.data.AdmissionDate) {
// // // //              calculateTotalStay(result.data.AdmissionDate, new Date().toISOString().split('T')[0]);
// // // //           }
// // // //         } else {
// // // //           toast.error("Child not found");
// // // //           router.push("/mtc-user/dashboard/discharge");
// // // //         }
// // // //       } catch (error: any) {
// // // //         toast.error(error.message || "Error loading data");
// // // //       } finally {
// // // //         setLoading(false);
// // // //       }
// // // //     };

// // // //     fetchChild();
// // // //   }, [childId, router]);

// // // //   // --- 2. Logic & Calculations ---

// // // //   // Calculate Total Stay Days
// // // //   const calculateTotalStay = (admDateStr: string, disDateStr: string) => {
// // // //     const admDate = new Date(admDateStr);
// // // //     const disDate = new Date(disDateStr);
    
// // // //     if (isValid(admDate) && isValid(disDate)) {
// // // //       const days = differenceInDays(disDate, admDate);
// // // //       setTotalStay(days >= 0 ? days.toString() : "0");
// // // //     }
// // // //   };

// // // //   // Handle Date Change
// // // //   const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // //     const newDate = e.target.value;
// // // //     setDischargeDate(newDate);
    
// // // //     if (child?.AdmissionDate) {
// // // //       const adm = new Date(child.AdmissionDate);
// // // //       const dis = new Date(newDate);
      
// // // //       if (dis < adm) {
// // // //         toast.error("Discharge date cannot be before Admission Date");
// // // //         setDischargeDate(""); 
// // // //         setTotalStay("0");
// // // //       } else {
// // // //         calculateTotalStay(child.AdmissionDate, newDate);
// // // //       }
// // // //     }
// // // //   };

// // // //   // Weight Limits
// // // //   const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // //     const val = parseFloat(e.target.value);
// // // //     if (val > 100) {
// // // //       toast.error("Weight cannot be greater than 100kg");
// // // //       setDischargeWeight("");
// // // //     } else {
// // // //       setDischargeWeight(e.target.value);
// // // //     }
// // // //   };

// // // //   // Height Limits (Min 45cm, Max 120cm)
// // // //   const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // //     const val = parseFloat(e.target.value);
// // // //     if (val > 120) {
// // // //       toast.error("Height cannot be greater than 120cm");
// // // //       setDischargeHeight("");
// // // //     } else {
// // // //       setDischargeHeight(e.target.value);
// // // //     }
// // // //   };

// // // //   // DYNAMIC Z-SCORE CALCULATION
// // // //   useEffect(() => {
// // // //     if (dischargeWeight && dischargeHeight) {
// // // //       const score = (parseFloat(dischargeWeight) / (parseFloat(dischargeHeight) / 100) ** 2) - 15;
// // // //       setDischargeZScore(isFinite(score) && score < 99 && score > -99 ? score.toFixed(2) : "Error");
// // // //     } else {
// // // //       setDischargeZScore("");
// // // //     }
// // // //   }, [dischargeWeight, dischargeHeight]);

// // // //   // --- 3. Submit Handler ---
// // // //   const handleSubmit = async (e: React.FormEvent) => {
// // // //     e.preventDefault();

// // // //     // Custom Validations
// // // //     if (!isConfirmed) {
// // // //       toast.error("Please confirm that Daily Weight and Micronutrients are updated.");
// // // //       return;
// // // //     }

// // // //     if (parseFloat(dischargeHeight) < 45) {
// // // //        toast.error("Height must be at least 45cm.");
// // // //        return;
// // // //     }

// // // //     if (!dischargeDate || !dischargeWeight || !dischargeHeight || !dischargeMuac || !outcomeIndicator || !dischargeEdema) {
// // // //       toast.error("Please fill all compulsory fields marked with *");
// // // //       return;
// // // //     }
// // // //     if (ifaGivenToMother === "0" || motherPayment === "0" || ifaSyrup === "0") {
// // // //       toast.error("Please select all Yes/No dropdowns");
// // // //       return;
// // // //     }
// // // //     if (!hemoglobinMother) {
// // // //         toast.error("Please enter Mother's Hemoglobin");
// // // //         return;
// // // //     }
    
// // // //     if (child?.AdmissionEdema && child.AdmissionEdema.trim() !== "No" && !minimumWeight) {
// // // //         toast.error("Please enter Minimum Weight");
// // // //         return;
// // // //     }

// // // //     setSubmitting(true);

// // // //     try {
// // // //       const payload = {
// // // //         SamNo: child?.SamNo,
// // // //         DischargeDate: dischargeDate,
// // // //         DischargeWeight: parseFloat(dischargeWeight),
// // // //         DischargeHeight: parseFloat(dischargeHeight),
// // // //         DischargeMuac: parseFloat(dischargeMuac),
// // // //         DischargeZScore: parseFloat(dischargeZScore),
// // // //         DischargeEdema: parseInt(dischargeEdema),
// // // //         ExitIndicator: parseInt(outcomeIndicator),
// // // //         IFAToMotherTablet: parseInt(ifaGivenToMother),
// // // //         MotherWages: parseInt(motherPayment),
// // // //         IFAToMotherSyrup: parseInt(ifaSyrup),
// // // //         HemoglobinMother: parseFloat(hemoglobinMother),
// // // //         DischargeImage: null,
// // // //         TotalStay: parseInt(totalStay), 
// // // //         MinimumWeight: minimumWeight ? parseFloat(minimumWeight) : null
// // // //       };

// // // //       // 1. Save to Internal Database First
// // // //       const res = await fetch(`/api/discharge-child/${childId}`, {
// // // //         method: "PUT",
// // // //         headers: { "Content-Type": "application/json" },
// // // //         body: JSON.stringify(payload),
// // // //       });

// // // //       const contentType = res.headers.get("content-type");
// // // //       if (!contentType || !contentType.includes("application/json")) {
// // // //         throw new Error("Server returned an invalid format. Check your API route.");
// // // //       }

// // // //       const result = await res.json();
// // // //       if (!res.ok) throw new Error(result.message || "Failed to save locally");

// // // //       toast.success("Record Saved Locally!");

// // // //       // 2. Sync with External Jharkhand SAAMAR API
// // // //       try {
// // // //         const saamarPayload = {
// // // //           // You may need to map these exact keys to what the .asmx endpoint strictly expects
// // // //           uuidChild: child?.uuidChild || child?.SamNo,
// // // //           MTCStatus: "Discharged",
// // // //           DischargeDate: dischargeDate,
// // // //           OutcomeIndicator: outcomeIndicator,
// // // //           DischargeWeight: parseFloat(dischargeWeight)
// // // //         };

// // // //         // Note: Used /InsertChildMtcReferStatus pattern standard for .asmx JSON POST calls
// // // //         await fetch("https://apisaamar.jharkhand.gov.in/Service.asmx/InsertChildMtcReferStatus", {
// // // //           method: "POST",
// // // //           headers: {
// // // //             "Content-Type": "application/json; charset=utf-8",
// // // //           },
// // // //           body: JSON.stringify(saamarPayload) // If it expects { data: ... } wrap accordingly
// // // //         });
// // // //         toast.success("Synced with SAAMAR State Registry.");
// // // //       } catch (externalError) {
// // // //         console.error("SAAMAR Sync Error:", externalError);
// // // //         // Non-blocking error: We don't crash if the external server is down.
// // // //         toast.error("Saved locally, but failed to sync with SAAMAR registry. Note: You may face CORS issues if calling directly from client.");
// // // //       }

// // // //       setTimeout(() => router.push("/mtc-user/dashboard/discharge"), 2000);

// // // //     } catch (error: any) {
// // // //       toast.error(error.message || "Something went wrong");
// // // //     } finally {
// // // //       setSubmitting(false);
// // // //     }
// // // //   };

// // // //   if (loading) {
// // // //     return (
// // // //       <div className="min-h-screen bg-slate-50 flex items-center justify-center">
// // // //         <div className="flex items-center gap-3 text-blue-700 text-lg font-medium">
// // // //             <Loader2 className="animate-spin h-6 w-6" /> Loading details...
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   if (!child) return null;

// // // //   return (
// // // //     <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6">
// // // //       <Toaster position="top-right" />
// // // //       <div className="max-w-7xl mx-auto">
// // // //         <Card className="shadow-xl border-0 rounded-2xl overflow-hidden bg-white">
// // // //           <CardHeader className="bg-gradient-to-r from-blue-700 to-blue-500 px-8 py-6">
// // // //             <div className="flex items-center gap-3 text-white">
// // // //               <FileText className="h-6 w-6" />
// // // //               <h5 className="text-2xl font-bold m-0 tracking-tight">Child Discharge Form</h5>
// // // //             </div>
// // // //           </CardHeader>

// // // //           <CardContent className="p-8">
// // // //             <form onSubmit={handleSubmit} className="space-y-10">
                
// // // //                 {/* --- SECTION 1: Read Only Details --- */}
// // // //                 <div className="bg-slate-50/50 rounded-xl p-6 border border-slate-100">
// // // //                   <h6 className="flex items-center gap-2 text-sm font-bold text-blue-800 uppercase tracking-wider mb-6">
// // // //                     <User className="h-4 w-4" /> Admission Information
// // // //                   </h6>
// // // //                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// // // //                       <div>
// // // //                           <label className="text-xs font-semibold text-slate-500 uppercase">SAM Number</label>
// // // //                           <Input value={child.SamNo} readOnly className="bg-slate-100 border-transparent text-slate-700 font-medium mt-1 focus-visible:ring-0" />
// // // //                       </div>
// // // //                       <div>
// // // //                           <label className="text-xs font-semibold text-slate-500 uppercase">Child Name</label>
// // // //                           <Input value={child.ChildName} readOnly className="bg-slate-100 border-transparent text-slate-700 font-medium mt-1 focus-visible:ring-0" />
// // // //                       </div>
// // // //                       <div>
// // // //                           <label className="text-xs font-semibold text-slate-500 uppercase">Admission Date</label>
// // // //                           <div className="relative mt-1">
// // // //                               <Input value={new Date(child.AdmissionDate).toLocaleDateString()} readOnly className="bg-slate-100 border-transparent text-slate-700 font-medium pr-10 focus-visible:ring-0" />
// // // //                               <div className="absolute right-3 top-2.5 text-slate-400"><Calendar className="h-4 w-4" /></div>
// // // //                           </div>
// // // //                       </div>
// // // //                       <div>
// // // //                           <label className="text-xs font-semibold text-slate-500 uppercase">Adm. Weight (kg)</label>
// // // //                           <Input value={child.AdmissionWeight} readOnly className="bg-slate-100 border-transparent text-slate-700 font-medium mt-1 focus-visible:ring-0" />
// // // //                       </div>
// // // //                       <div>
// // // //                           <label className="text-xs font-semibold text-slate-500 uppercase">Adm. Height (cm)</label>
// // // //                           <Input value={child.AdmissionHeight} readOnly className="bg-slate-100 border-transparent text-slate-700 font-medium mt-1 focus-visible:ring-0" />
// // // //                       </div>
// // // //                       <div>
// // // //                           <label className="text-xs font-semibold text-slate-500 uppercase">Adm. Edema</label>
// // // //                           <Input value={child.AdmissionEdema} readOnly className="bg-slate-100 border-transparent text-slate-700 font-medium mt-1 focus-visible:ring-0" />
// // // //                       </div>
// // // //                       <div>
// // // //                           <label className="text-xs font-semibold text-slate-500 uppercase">Adm. MUAC (cm)</label>
// // // //                           <Input value={child.AdmissionMuac} readOnly className="bg-slate-100 border-transparent text-slate-700 font-medium mt-1 focus-visible:ring-0" />
// // // //                       </div>
// // // //                       <div>
// // // //                           <label className="text-xs font-semibold text-slate-500 uppercase">Target Weight (kg)</label>
// // // //                           <Input value={child.TargetWeight} readOnly className="bg-slate-100 border-transparent text-slate-700 font-medium mt-1 focus-visible:ring-0" />
// // // //                       </div>
// // // //                   </div>
// // // //                 </div>

// // // //                 {/* --- SECTION 2: Discharge Vitals --- */}
// // // //                 <div>
// // // //                   <h6 className="flex items-center gap-2 text-sm font-bold text-blue-800 uppercase tracking-wider mb-5 border-b pb-2">
// // // //                     <Activity className="h-4 w-4" /> Discharge Vitals
// // // //                   </h6>
// // // //                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// // // //                       <div>
// // // //                           <label className="text-sm font-medium text-slate-700">Discharge Date <span className="text-red-500">*</span></label>
// // // //                           <Input 
// // // //                               type="date" 
// // // //                               value={dischargeDate} 
// // // //                               onChange={handleDateChange} 
// // // //                               max={new Date().toISOString().split('T')[0]}
// // // //                               className="mt-1 focus-visible:ring-blue-500 border-slate-200" 
// // // //                           />
// // // //                       </div>
// // // //                       <div>
// // // //                           <label className="text-sm font-medium text-slate-700">Discharge Weight (kg) <span className="text-red-500">*</span></label>
// // // //                           <Input 
// // // //                               type="number" step="0.01" 
// // // //                               value={dischargeWeight} 
// // // //                               onChange={handleWeightChange} 
// // // //                               placeholder="Max 100"
// // // //                               className="mt-1 focus-visible:ring-blue-500 border-slate-200" 
// // // //                           />
// // // //                       </div>
// // // //                       <div>
// // // //                           <label className="text-sm font-medium text-slate-700">Discharge Height (cm) <span className="text-red-500">*</span></label>
// // // //                           <Input 
// // // //                               type="number" step="0.1" 
// // // //                               min="45" max="120"
// // // //                               value={dischargeHeight} 
// // // //                               onChange={handleHeightChange} 
// // // //                               placeholder="45cm - 120cm"
// // // //                               className="mt-1 focus-visible:ring-blue-500 border-slate-200" 
// // // //                           />
// // // //                       </div>
// // // //                       <div>
// // // //                           <label className="text-sm font-medium text-slate-700">Discharge MUAC (cm) <span className="text-red-500">*</span></label>
// // // //                           <Input 
// // // //                               type="number" step="0.1" 
// // // //                               value={dischargeMuac} 
// // // //                               onChange={(e) => setDischargeMuac(e.target.value)} 
// // // //                               className="mt-1 focus-visible:ring-blue-500 border-slate-200" 
// // // //                           />
// // // //                       </div>

// // // //                       <div>
// // // //                           <label className="text-sm font-medium text-slate-700">Z-Score (SD)</label>
// // // //                           <Input 
// // // //                               readOnly 
// // // //                               value={dischargeZScore} 
// // // //                               className={cn("mt-1 font-semibold focus:ring-0 cursor-not-allowed", dischargeZScore === "Error" ? "bg-red-50 text-red-600 border-red-200" : "bg-slate-100 text-blue-700 border-transparent")} 
// // // //                           />
// // // //                       </div>
// // // //                   </div>
// // // //                 </div>

// // // //                 {/* --- SECTION 3: Outcomes & Medical Indicators --- */}
// // // //                 <div>
// // // //                   <h6 className="text-sm font-bold text-blue-800 uppercase tracking-wider mb-5 border-b pb-2">Outcomes & Medical Indicators</h6>
// // // //                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
// // // //                       <div>
// // // //                           <label className="text-sm font-medium text-slate-700">Outcome Indicator <span className="text-red-500">*</span></label>
// // // //                           <Select value={outcomeIndicator} onValueChange={setOutcomeIndicator}>
// // // //                               <SelectTrigger className="mt-1 focus:ring-blue-500 border-slate-200"><SelectValue placeholder="Select" /></SelectTrigger>
// // // //                               <SelectContent>
// // // //                                   <SelectItem value="1">CURED</SelectItem>
// // // //                                   <SelectItem value="2">DEFAULTER</SelectItem>
// // // //                                   <SelectItem value="3">MEDICAL TRANSFER</SelectItem>
// // // //                                   <SelectItem value="4">NON RESPONDENT</SelectItem>
// // // //                                   <SelectItem value="5">DEATH</SelectItem>
// // // //                                   <SelectItem value="6">PARTIAL IMPROVEMENT</SelectItem>
// // // //                               </SelectContent>
// // // //                           </Select>
// // // //                       </div>
// // // //                       <div>
// // // //                           <label className="text-sm font-medium text-slate-700">Discharge EDEMA <span className="text-red-500">*</span></label>
// // // //                           <Select value={dischargeEdema} onValueChange={setDischargeEdema}>
// // // //                               <SelectTrigger className="mt-1 focus:ring-blue-500 border-slate-200"><SelectValue placeholder="Select" /></SelectTrigger>
// // // //                               <SelectContent>
// // // //                                   <SelectItem value="4">No Edema</SelectItem>
// // // //                                   <SelectItem value="1">+</SelectItem>
// // // //                                   <SelectItem value="2">++</SelectItem>
// // // //                                   <SelectItem value="3">+++</SelectItem>
// // // //                               </SelectContent>
// // // //                           </Select>
// // // //                       </div>
// // // //                       <div>
// // // //                           <label className="text-sm font-medium text-slate-700">Adm. Hemoglobin (gm/dl)</label>
// // // //                           <Input value={child.AdmissionHemoglobin || "N/A"} readOnly className="bg-slate-100 border-transparent text-slate-700 font-medium mt-1 focus-visible:ring-0" />
// // // //                       </div>
// // // //                       <div>
// // // //                           <label className="text-sm font-medium text-slate-700">Mother's Hb (gm/dl) <span className="text-red-500">*</span></label>
// // // //                           <Input 
// // // //                               type="number" step="0.1" 
// // // //                               value={hemoglobinMother} 
// // // //                               onChange={(e) => setHemoglobinMother(e.target.value)} 
// // // //                               className="mt-1 focus-visible:ring-blue-500 border-slate-200"
// // // //                           />
// // // //                       </div>
// // // //                   </div>

// // // //                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // // //                       <div>
// // // //                           <label className="text-sm font-medium text-slate-700">IFA Given To Mother <span className="text-red-500">*</span></label>
// // // //                           <Select value={ifaGivenToMother} onValueChange={setIfaGivenToMother}>
// // // //                               <SelectTrigger className="mt-1 focus:ring-blue-500 border-slate-200"><SelectValue placeholder="Select" /></SelectTrigger>
// // // //                               <SelectContent>
// // // //                                   <SelectItem value="0">Select</SelectItem>
// // // //                                   <SelectItem value="1">Yes</SelectItem>
// // // //                                   <SelectItem value="2">No</SelectItem>
// // // //                               </SelectContent>
// // // //                           </Select>
// // // //                       </div>
// // // //                       <div>
// // // //                           <label className="text-sm font-medium text-slate-700">Mother's Wage Comp. <span className="text-red-500">*</span></label>
// // // //                           <Select value={motherPayment} onValueChange={setMotherPayment}>
// // // //                               <SelectTrigger className="mt-1 focus:ring-blue-500 border-slate-200"><SelectValue placeholder="Select" /></SelectTrigger>
// // // //                               <SelectContent>
// // // //                                   <SelectItem value="0">Select</SelectItem>
// // // //                                   <SelectItem value="1">Yes</SelectItem>
// // // //                                   <SelectItem value="2">No</SelectItem>
// // // //                               </SelectContent>
// // // //                           </Select>
// // // //                       </div>
// // // //                       <div>
// // // //                           <label className="text-sm font-medium text-slate-700">IFA Syrup to Child <span className="text-red-500">*</span></label>
// // // //                           <Select value={ifaSyrup} onValueChange={setIfaSyrup}>
// // // //                               <SelectTrigger className="mt-1 focus:ring-blue-500 border-slate-200"><SelectValue placeholder="Select" /></SelectTrigger>
// // // //                               <SelectContent>
// // // //                                   <SelectItem value="0">Select</SelectItem>
// // // //                                   <SelectItem value="1">Yes</SelectItem>
// // // //                                   <SelectItem value="2">No</SelectItem>
// // // //                               </SelectContent>
// // // //                           </Select>
// // // //                       </div>
// // // //                   </div>
// // // //                 </div>

// // // //                 {/* --- SECTION 4: Conditional Edema Fields --- */}
// // // //                 {child.AdmissionEdema && child.AdmissionEdema.trim() !== "No" && (
// // // //                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-amber-50 p-5 rounded-xl border border-amber-200 animate-in fade-in">
// // // //                         <div>
// // // //                             <label className="text-sm font-medium text-amber-900">Minimum Weight <span className="text-red-500">*</span></label>
// // // //                             <Input 
// // // //                                 type="number" step="0.01" 
// // // //                                 value={minimumWeight} 
// // // //                                 onChange={(e) => setMinimumWeight(e.target.value)} 
// // // //                                 className="mt-1 bg-white border-amber-300 focus-visible:ring-amber-500" 
// // // //                             />
// // // //                         </div>
// // // //                         <div>
// // // //                             <label className="text-sm font-medium text-amber-900">Total Stay (Days)</label>
// // // //                             <Input 
// // // //                                 value={totalStay} 
// // // //                                 readOnly 
// // // //                                 className="mt-1 bg-amber-100 font-bold text-amber-900 border-transparent focus-visible:ring-0" 
// // // //                             />
// // // //                         </div>
// // // //                     </div>
// // // //                 )}

// // // //                 <div className="flex items-center space-x-3 bg-blue-50 p-5 rounded-xl border border-blue-100 mt-8 shadow-sm">
// // // //                   <input 
// // // //                     type="checkbox" 
// // // //                     id="confirmUpdate" 
// // // //                     checked={isConfirmed} 
// // // //                     onChange={(e) => setIsConfirmed(e.target.checked)} 
// // // //                     className="h-5 w-5 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
// // // //                   />
// // // //                   <label htmlFor="confirmUpdate" className="text-sm font-semibold text-blue-900 cursor-pointer select-none">
// // // //                     I confirm that Daily Weight and Micronutrient details have been updated before discharge. <span className="text-red-500">*</span>
// // // //                   </label>
// // // //                 </div>

// // // //                 {/* --- Footer Buttons --- */}
// // // //                 <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t border-slate-100">
// // // //                     <Button 
// // // //                         type="button" 
// // // //                         variant="outline" 
// // // //                         className="border-slate-300 text-slate-700 hover:bg-slate-100 min-w-[120px]"
// // // //                         onClick={() => router.push("/mtc-user/dashboard/discharge")}
// // // //                     >
// // // //                         <X className="mr-2 h-4 w-4" /> Cancel
// // // //                     </Button>
// // // //                     <Button 
// // // //                         type="submit" 
// // // //                         disabled={submitting} 
// // // //                         className="bg-blue-600 hover:bg-blue-700 text-white min-w-[150px] shadow-md shadow-blue-500/20"
// // // //                     >
// // // //                         {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
// // // //                         Submit Discharge
// // // //                     </Button>
// // // //                 </div>

// // // //             </form>
// // // //           </CardContent>
// // // //         </Card>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }


// // // "use client";

// // // import { useState, useEffect, use } from "react";
// // // import { useRouter } from "next/navigation";
// // // import { Button } from "@/components/ui/button";
// // // import { Input } from "@/components/ui/input";
// // // import { Card, CardHeader, CardContent } from "@/components/ui/card";
// // // import { 
// // //   Select, 
// // //   SelectContent, 
// // //   SelectItem, 
// // //   SelectTrigger, 
// // //   SelectValue 
// // // } from "@/components/ui/select";
// // // import { Save, X, Loader2, Calendar, User, FileText, Activity, CheckSquare } from "lucide-react";
// // // import toast, { Toaster } from "react-hot-toast";
// // // import { differenceInDays, isValid } from "date-fns";
// // // import { clsx, type ClassValue } from "clsx";
// // // import { twMerge } from "tailwind-merge";

// // // function cn(...inputs: ClassValue[]) {
// // //   return twMerge(clsx(inputs));
// // // }

// // // // Interface for Child Data (from DB)
// // // interface ChildData {
// // //   SamNo: string;
// // //   ChildName: string;
// // //   FatherName: string;
// // //   MotherName: string;
// // //   AdmissionDate: string;
// // //   AdmissionWeight: number;
// // //   AdmissionHeight: number;
// // //   AdmissionEdema: string; 
// // //   AdmissionMuac: number;
// // //   TargetWeight: number;
// // //   AdmissionHemoglobin: number;
// // //   Sex?: string;
// // //   uuidChild?: string; // Often required by the external SAAMAR API
// // // }

// // // export default function DischargeFormPage({ params }: { params: Promise<{ id: string }> }) {
// // //   const router = useRouter();
  
// // //   // Next.js 15 Fix: Unwrap params securely
// // //   const resolvedParams = use(params);
// // //   const childId = resolvedParams.id;
  
// // //   // --- State Management ---
// // //   const [loading, setLoading] = useState(true);
// // //   const [submitting, setSubmitting] = useState(false);
// // //   const [child, setChild] = useState<ChildData | null>(null);
  
// // //   // Form Fields
// // //   const [dischargeDate, setDischargeDate] = useState(new Date().toISOString().split('T')[0]);
// // //   const [dischargeWeight, setDischargeWeight] = useState("");
// // //   const [dischargeHeight, setDischargeHeight] = useState("");
// // //   const [dischargeMuac, setDischargeMuac] = useState("");
// // //   const [dischargeZScore, setDischargeZScore] = useState("");
// // //   const [outcomeIndicator, setOutcomeIndicator] = useState("");
// // //   const [dischargeEdema, setDischargeEdema] = useState("");
  
// // //   // Medical / Social
// // //   const [hemoglobinMother, setHemoglobinMother] = useState("");
// // //   const [ifaGivenToMother, setIfaGivenToMother] = useState("0");
// // //   const [motherPayment, setMotherPayment] = useState("0");
// // //   const [ifaSyrup, setIfaSyrup] = useState("0");
  
// // //   // Conditional Fields (Only if Admission Edema != "No")
// // //   const [minimumWeight, setMinimumWeight] = useState("");
// // //   const [totalStay, setTotalStay] = useState("0");

// // //   // Confirmation Checkbox
// // //   const [isConfirmed, setIsConfirmed] = useState(false);

// // //   // --- 1. Fetch Child Data ---
// // //   useEffect(() => {
// // //     const fetchChild = async () => {
// // //       if (!childId) return;

// // //       try {
// // //         const res = await fetch(`/api/child/${childId}`);

// // //         const contentType = res.headers.get("content-type");
// // //         if (!contentType || !contentType.includes("application/json")) {
// // //           throw new Error("Server returned an invalid format. Check your API route.");
// // //         }

// // //         if (!res.ok) throw new Error(`API returned status ${res.status}`);

// // //         const result = await res.json();

// // //         if (result.success && result.data) {
// // //           setChild(result.data);
// // //           if (result.data.AdmissionDate) {
// // //              calculateTotalStay(result.data.AdmissionDate, new Date().toISOString().split('T')[0]);
// // //           }
// // //         } else {
// // //           toast.error("Child not found");
// // //           router.push("/mtc-user/dashboard/discharge");
// // //         }
// // //       } catch (error: any) {
// // //         toast.error(error.message || "Error loading data");
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchChild();
// // //   }, [childId, router]);

// // //   // --- 2. Logic & Calculations ---

// // //   // Calculate Total Stay Days
// // //   const calculateTotalStay = (admDateStr: string, disDateStr: string) => {
// // //     const admDate = new Date(admDateStr);
// // //     const disDate = new Date(disDateStr);
    
// // //     if (isValid(admDate) && isValid(disDate)) {
// // //       const days = differenceInDays(disDate, admDate);
// // //       setTotalStay(days >= 0 ? days.toString() : "0");
// // //     }
// // //   };

// // //   // Handle Date Change
// // //   const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // //     const newDate = e.target.value;
// // //     setDischargeDate(newDate);
    
// // //     if (child?.AdmissionDate) {
// // //       const adm = new Date(child.AdmissionDate);
// // //       const dis = new Date(newDate);
      
// // //       if (dis < adm) {
// // //         toast.error("Discharge date cannot be before Admission Date");
// // //         setDischargeDate(""); 
// // //         setTotalStay("0");
// // //       } else {
// // //         calculateTotalStay(child.AdmissionDate, newDate);
// // //       }
// // //     }
// // //   };

// // //   // Weight Limits
// // //   const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // //     const val = parseFloat(e.target.value);
// // //     if (val > 100) {
// // //       toast.error("Weight cannot be greater than 100kg");
// // //       setDischargeWeight("");
// // //     } else {
// // //       setDischargeWeight(e.target.value);
// // //     }
// // //   };

// // //   // Height Limits (Min 45cm, Max 120cm)
// // //   const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // //     const val = parseFloat(e.target.value);
// // //     if (val > 120) {
// // //       toast.error("Height cannot be greater than 120cm");
// // //       setDischargeHeight("");
// // //     } else {
// // //       setDischargeHeight(e.target.value);
// // //     }
// // //   };

// // //   // DYNAMIC Z-SCORE CALCULATION
// // //   useEffect(() => {
// // //     if (dischargeWeight && dischargeHeight) {
// // //       const score = (parseFloat(dischargeWeight) / (parseFloat(dischargeHeight) / 100) ** 2) - 15;
// // //       setDischargeZScore(isFinite(score) && score < 99 && score > -99 ? score.toFixed(2) : "Error");
// // //     } else {
// // //       setDischargeZScore("");
// // //     }
// // //   }, [dischargeWeight, dischargeHeight]);

// // //   // --- 3. Submit Handler ---
// // //   const handleSubmit = async (e: React.FormEvent) => {
// // //     e.preventDefault();

// // //     // Custom Validations
// // //     if (!isConfirmed) {
// // //       toast.error("Please confirm that Daily Weight and Micronutrients are updated.");
// // //       return;
// // //     }

// // //     if (parseFloat(dischargeHeight) < 45) {
// // //        toast.error("Height must be at least 45cm.");
// // //        return;
// // //     }

// // //     if (!dischargeDate || !dischargeWeight || !dischargeHeight || !dischargeMuac || !outcomeIndicator || !dischargeEdema) {
// // //       toast.error("Please fill all compulsory fields marked with *");
// // //       return;
// // //     }
// // //     if (ifaGivenToMother === "0" || motherPayment === "0" || ifaSyrup === "0") {
// // //       toast.error("Please select all Yes/No dropdowns");
// // //       return;
// // //     }
// // //     if (!hemoglobinMother) {
// // //         toast.error("Please enter Mother's Hemoglobin");
// // //         return;
// // //     }
    
// // //     if (child?.AdmissionEdema && child.AdmissionEdema.trim() !== "No" && !minimumWeight) {
// // //         toast.error("Please enter Minimum Weight");
// // //         return;
// // //     }

// // //     setSubmitting(true);

// // //     try {
// // //       const payload = {
// // //         SamNo: child?.SamNo,
// // //         DischargeDate: dischargeDate,
// // //         DischargeWeight: parseFloat(dischargeWeight),
// // //         DischargeHeight: parseFloat(dischargeHeight),
// // //         DischargeMuac: parseFloat(dischargeMuac),
// // //         DischargeZScore: parseFloat(dischargeZScore),
// // //         DischargeEdema: parseInt(dischargeEdema),
// // //         ExitIndicator: parseInt(outcomeIndicator),
// // //         IFAToMotherTablet: parseInt(ifaGivenToMother),
// // //         MotherWages: parseInt(motherPayment),
// // //         IFAToMotherSyrup: parseInt(ifaSyrup),
// // //         HemoglobinMother: parseFloat(hemoglobinMother),
// // //         DischargeImage: null,
// // //         TotalStay: parseInt(totalStay), 
// // //         MinimumWeight: minimumWeight ? parseFloat(minimumWeight) : null
// // //       };

// // //       // 1. Save to Internal Database First
// // //       const res = await fetch(`/api/discharge-child/${childId}`, {
// // //         method: "PUT",
// // //         headers: { "Content-Type": "application/json" },
// // //         body: JSON.stringify(payload),
// // //       });

// // //       const contentType = res.headers.get("content-type");
// // //       if (!contentType || !contentType.includes("application/json")) {
// // //         throw new Error("Server returned an invalid format. Check your API route.");
// // //       }

// // //       const result = await res.json();
// // //       if (!res.ok) throw new Error(result.message || "Failed to save locally");

// // //       toast.success("Record Saved Locally!");

// // //       // 2. Sync with External Jharkhand SAAMAR API
// // //       try {
// // //         const saamarPayload = {
// // //           uuidChild: child?.uuidChild || child?.SamNo,
// // //           MTCStatus: "Discharged",
// // //           DischargeDate: dischargeDate,
// // //           OutcomeIndicator: outcomeIndicator,
// // //           DischargeWeight: parseFloat(dischargeWeight)
// // //         };

// // //         await fetch("https://apisaamar.jharkhand.gov.in/Service.asmx/InsertChildMtcReferStatus", {
// // //           method: "POST",
// // //           headers: {
// // //             "Content-Type": "application/json; charset=utf-8",
// // //           },
// // //           body: JSON.stringify(saamarPayload) 
// // //         });
// // //         toast.success("Synced with SAAMAR State Registry.");
// // //       } catch (externalError) {
// // //         console.error("SAAMAR Sync Error:", externalError);
// // //         toast.error("Saved locally, but failed to sync with SAAMAR registry. Note: You may face CORS issues if calling directly from client.");
// // //       }

// // //       setTimeout(() => router.push("/mtc-user/dashboard/discharge"), 2000);

// // //     } catch (error: any) {
// // //       toast.error(error.message || "Something went wrong");
// // //     } finally {
// // //       setSubmitting(false);
// // //     }
// // //   };

// // //   if (loading) {
// // //     return (
// // //       <div className="min-h-screen bg-slate-50 flex items-center justify-center">
// // //         <div className="flex items-center gap-3 text-blue-700 text-lg font-medium">
// // //             <Loader2 className="animate-spin h-6 w-6" /> Loading details...
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   if (!child) return null;

// // //   return (
// // //     <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6">
// // //       <Toaster position="top-right" />
// // //       <div className="max-w-7xl mx-auto">
// // //         <Card className="shadow-xl border-0 rounded-2xl overflow-hidden bg-white">
// // //           <CardHeader className="bg-gradient-to-r from-blue-700 to-blue-500 px-8 py-6">
// // //             <div className="flex items-center gap-3 text-white">
// // //               <FileText className="h-6 w-6" />
// // //               <h5 className="text-2xl font-bold m-0 tracking-tight">Child Discharge Form</h5>
// // //             </div>
// // //           </CardHeader>

// // //           <CardContent className="p-8">
// // //             <form onSubmit={handleSubmit} className="space-y-10">
                
// // //                 {/* --- SECTION 1: Read Only Details --- */}
// // //                 {/* FIX: Appended ?? "" to all database-driven value props to resolve the null warning */}
// // //                 <div className="bg-slate-50/50 rounded-xl p-6 border border-slate-100">
// // //                   <h6 className="flex items-center gap-2 text-sm font-bold text-blue-800 uppercase tracking-wider mb-6">
// // //                     <User className="h-4 w-4" /> Admission Information
// // //                   </h6>
// // //                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// // //                       <div>
// // //                           <label className="text-xs font-semibold text-slate-500 uppercase">SAM Number</label>
// // //                           <Input value={child.SamNo ?? ""} readOnly className="bg-slate-100 border-transparent text-slate-700 font-medium mt-1 focus-visible:ring-0" />
// // //                       </div>
// // //                       <div>
// // //                           <label className="text-xs font-semibold text-slate-500 uppercase">Child Name</label>
// // //                           <Input value={child.ChildName ?? ""} readOnly className="bg-slate-100 border-transparent text-slate-700 font-medium mt-1 focus-visible:ring-0" />
// // //                       </div>
// // //                       <div>
// // //                           <label className="text-xs font-semibold text-slate-500 uppercase">Admission Date</label>
// // //                           <div className="relative mt-1">
// // //                               <Input value={child.AdmissionDate ? new Date(child.AdmissionDate).toLocaleDateString() : ""} readOnly className="bg-slate-100 border-transparent text-slate-700 font-medium pr-10 focus-visible:ring-0" />
// // //                               <div className="absolute right-3 top-2.5 text-slate-400"><Calendar className="h-4 w-4" /></div>
// // //                           </div>
// // //                       </div>
// // //                       <div>
// // //                           <label className="text-xs font-semibold text-slate-500 uppercase">Adm. Weight (kg)</label>
// // //                           <Input value={child.AdmissionWeight ?? ""} readOnly className="bg-slate-100 border-transparent text-slate-700 font-medium mt-1 focus-visible:ring-0" />
// // //                       </div>
// // //                       <div>
// // //                           <label className="text-xs font-semibold text-slate-500 uppercase">Adm. Height (cm)</label>
// // //                           <Input value={child.AdmissionHeight ?? ""} readOnly className="bg-slate-100 border-transparent text-slate-700 font-medium mt-1 focus-visible:ring-0" />
// // //                       </div>
// // //                       <div>
// // //                           <label className="text-xs font-semibold text-slate-500 uppercase">Adm. Edema</label>
// // //                           <Input value={child.AdmissionEdema ?? ""} readOnly className="bg-slate-100 border-transparent text-slate-700 font-medium mt-1 focus-visible:ring-0" />
// // //                       </div>
// // //                       <div>
// // //                           <label className="text-xs font-semibold text-slate-500 uppercase">Adm. MUAC (cm)</label>
// // //                           <Input value={child.AdmissionMuac ?? ""} readOnly className="bg-slate-100 border-transparent text-slate-700 font-medium mt-1 focus-visible:ring-0" />
// // //                       </div>
// // //                       <div>
// // //                           <label className="text-xs font-semibold text-slate-500 uppercase">Target Weight (kg)</label>
// // //                           <Input value={child.TargetWeight ?? ""} readOnly className="bg-slate-100 border-transparent text-slate-700 font-medium mt-1 focus-visible:ring-0" />
// // //                       </div>
// // //                   </div>
// // //                 </div>

// // //                 {/* --- SECTION 2: Discharge Vitals --- */}
// // //                 <div>
// // //                   <h6 className="flex items-center gap-2 text-sm font-bold text-blue-800 uppercase tracking-wider mb-5 border-b pb-2">
// // //                     <Activity className="h-4 w-4" /> Discharge Vitals
// // //                   </h6>
// // //                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// // //                       <div>
// // //                           <label className="text-sm font-medium text-slate-700">Discharge Date <span className="text-red-500">*</span></label>
// // //                           <Input 
// // //                               type="date" 
// // //                               value={dischargeDate} 
// // //                               onChange={handleDateChange} 
// // //                               max={new Date().toISOString().split('T')[0]}
// // //                               className="mt-1 focus-visible:ring-blue-500 border-slate-200" 
// // //                           />
// // //                       </div>
// // //                       <div>
// // //                           <label className="text-sm font-medium text-slate-700">Discharge Weight (kg) <span className="text-red-500">*</span></label>
// // //                           <Input 
// // //                               type="number" step="0.01" 
// // //                               value={dischargeWeight} 
// // //                               onChange={handleWeightChange} 
// // //                               placeholder="Max 100"
// // //                               className="mt-1 focus-visible:ring-blue-500 border-slate-200" 
// // //                           />
// // //                       </div>
// // //                       <div>
// // //                           <label className="text-sm font-medium text-slate-700">Discharge Height (cm) <span className="text-red-500">*</span></label>
// // //                           <Input 
// // //                               type="number" step="0.1" 
// // //                               min="45" max="120"
// // //                               value={dischargeHeight} 
// // //                               onChange={handleHeightChange} 
// // //                               placeholder="45cm - 120cm"
// // //                               className="mt-1 focus-visible:ring-blue-500 border-slate-200" 
// // //                           />
// // //                       </div>
// // //                       <div>
// // //                           <label className="text-sm font-medium text-slate-700">Discharge MUAC (cm) <span className="text-red-500">*</span></label>
// // //                           <Input 
// // //                               type="number" step="0.1" 
// // //                               value={dischargeMuac} 
// // //                               onChange={(e) => setDischargeMuac(e.target.value)} 
// // //                               className="mt-1 focus-visible:ring-blue-500 border-slate-200" 
// // //                           />
// // //                       </div>

// // //                       <div>
// // //                           <label className="text-sm font-medium text-slate-700">Z-Score (SD)</label>
// // //                           <Input 
// // //                               readOnly 
// // //                               value={dischargeZScore} 
// // //                               className={cn("mt-1 font-semibold focus:ring-0 cursor-not-allowed", dischargeZScore === "Error" ? "bg-red-50 text-red-600 border-red-200" : "bg-slate-100 text-blue-700 border-transparent")} 
// // //                           />
// // //                       </div>
// // //                   </div>
// // //                 </div>

// // //                 {/* --- SECTION 3: Outcomes & Medical Indicators --- */}
// // //                 <div>
// // //                   <h6 className="text-sm font-bold text-blue-800 uppercase tracking-wider mb-5 border-b pb-2">Outcomes & Medical Indicators</h6>
// // //                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
// // //                       <div>
// // //                           <label className="text-sm font-medium text-slate-700">Outcome Indicator <span className="text-red-500">*</span></label>
// // //                           <Select value={outcomeIndicator} onValueChange={setOutcomeIndicator}>
// // //                               <SelectTrigger className="mt-1 focus:ring-blue-500 border-slate-200"><SelectValue placeholder="Select" /></SelectTrigger>
// // //                               <SelectContent>
// // //                                   <SelectItem value="1">CURED</SelectItem>
// // //                                   <SelectItem value="2">DEFAULTER</SelectItem>
// // //                                   <SelectItem value="3">MEDICAL TRANSFER</SelectItem>
// // //                                   <SelectItem value="4">NON RESPONDENT</SelectItem>
// // //                                   <SelectItem value="5">DEATH</SelectItem>
// // //                                   <SelectItem value="6">PARTIAL IMPROVEMENT</SelectItem>
// // //                               </SelectContent>
// // //                           </Select>
// // //                       </div>
// // //                       <div>
// // //                           <label className="text-sm font-medium text-slate-700">Discharge EDEMA <span className="text-red-500">*</span></label>
// // //                           <Select value={dischargeEdema} onValueChange={setDischargeEdema}>
// // //                               <SelectTrigger className="mt-1 focus:ring-blue-500 border-slate-200"><SelectValue placeholder="Select" /></SelectTrigger>
// // //                               <SelectContent>
// // //                                   <SelectItem value="4">No Edema</SelectItem>
// // //                                   <SelectItem value="1">+</SelectItem>
// // //                                   <SelectItem value="2">++</SelectItem>
// // //                                   <SelectItem value="3">+++</SelectItem>
// // //                               </SelectContent>
// // //                           </Select>
// // //                       </div>
// // //                       <div>
// // //                           <label className="text-sm font-medium text-slate-700">Adm. Hemoglobin (gm/dl)</label>
// // //                           {/* FIX: Handled null specifically with ?? fallback */}
// // //                           <Input value={child.AdmissionHemoglobin ?? "N/A"} readOnly className="bg-slate-100 border-transparent text-slate-700 font-medium mt-1 focus-visible:ring-0" />
// // //                       </div>
// // //                       <div>
// // //                           <label className="text-sm font-medium text-slate-700">Mother's Hb (gm/dl) <span className="text-red-500">*</span></label>
// // //                           <Input 
// // //                               type="number" step="0.1" 
// // //                               value={hemoglobinMother} 
// // //                               onChange={(e) => setHemoglobinMother(e.target.value)} 
// // //                               className="mt-1 focus-visible:ring-blue-500 border-slate-200"
// // //                           />
// // //                       </div>
// // //                   </div>

// // //                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // //                       <div>
// // //                           <label className="text-sm font-medium text-slate-700">IFA Given To Mother <span className="text-red-500">*</span></label>
// // //                           <Select value={ifaGivenToMother} onValueChange={setIfaGivenToMother}>
// // //                               <SelectTrigger className="mt-1 focus:ring-blue-500 border-slate-200"><SelectValue placeholder="Select" /></SelectTrigger>
// // //                               <SelectContent>
// // //                                   <SelectItem value="0">Select</SelectItem>
// // //                                   <SelectItem value="1">Yes</SelectItem>
// // //                                   <SelectItem value="2">No</SelectItem>
// // //                               </SelectContent>
// // //                           </Select>
// // //                       </div>
// // //                       <div>
// // //                           <label className="text-sm font-medium text-slate-700">Mother's Wage Comp. <span className="text-red-500">*</span></label>
// // //                           <Select value={motherPayment} onValueChange={setMotherPayment}>
// // //                               <SelectTrigger className="mt-1 focus:ring-blue-500 border-slate-200"><SelectValue placeholder="Select" /></SelectTrigger>
// // //                               <SelectContent>
// // //                                   <SelectItem value="0">Select</SelectItem>
// // //                                   <SelectItem value="1">Yes</SelectItem>
// // //                                   <SelectItem value="2">No</SelectItem>
// // //                               </SelectContent>
// // //                           </Select>
// // //                       </div>
// // //                       <div>
// // //                           <label className="text-sm font-medium text-slate-700">IFA Syrup to Child <span className="text-red-500">*</span></label>
// // //                           <Select value={ifaSyrup} onValueChange={setIfaSyrup}>
// // //                               <SelectTrigger className="mt-1 focus:ring-blue-500 border-slate-200"><SelectValue placeholder="Select" /></SelectTrigger>
// // //                               <SelectContent>
// // //                                   <SelectItem value="0">Select</SelectItem>
// // //                                   <SelectItem value="1">Yes</SelectItem>
// // //                                   <SelectItem value="2">No</SelectItem>
// // //                               </SelectContent>
// // //                           </Select>
// // //                       </div>
// // //                   </div>
// // //                 </div>

// // //                 {/* --- SECTION 4: Conditional Edema Fields --- */}
// // //                 {child.AdmissionEdema && child.AdmissionEdema.trim() !== "No" && (
// // //                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-amber-50 p-5 rounded-xl border border-amber-200 animate-in fade-in">
// // //                         <div>
// // //                             <label className="text-sm font-medium text-amber-900">Minimum Weight <span className="text-red-500">*</span></label>
// // //                             <Input 
// // //                                 type="number" step="0.01" 
// // //                                 value={minimumWeight} 
// // //                                 onChange={(e) => setMinimumWeight(e.target.value)} 
// // //                                 className="mt-1 bg-white border-amber-300 focus-visible:ring-amber-500" 
// // //                             />
// // //                         </div>
// // //                         <div>
// // //                             <label className="text-sm font-medium text-amber-900">Total Stay (Days)</label>
// // //                             <Input 
// // //                                 value={totalStay} 
// // //                                 readOnly 
// // //                                 className="mt-1 bg-amber-100 font-bold text-amber-900 border-transparent focus-visible:ring-0" 
// // //                             />
// // //                         </div>
// // //                     </div>
// // //                 )}

// // //                 <div className="flex items-center space-x-3 bg-blue-50 p-5 rounded-xl border border-blue-100 mt-8 shadow-sm">
// // //                   <input 
// // //                     type="checkbox" 
// // //                     id="confirmUpdate" 
// // //                     checked={isConfirmed} 
// // //                     onChange={(e) => setIsConfirmed(e.target.checked)} 
// // //                     className="h-5 w-5 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
// // //                   />
// // //                   <label htmlFor="confirmUpdate" className="text-sm font-semibold text-blue-900 cursor-pointer select-none">
// // //                     I confirm that Daily Weight and Micronutrient details have been updated before discharge. <span className="text-red-500">*</span>
// // //                   </label>
// // //                 </div>

// // //                 {/* --- Footer Buttons --- */}
// // //                 <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t border-slate-100">
// // //                     <Button 
// // //                         type="button" 
// // //                         variant="outline" 
// // //                         className="border-slate-300 text-slate-700 hover:bg-slate-100 min-w-[120px]"
// // //                         onClick={() => router.push("/mtc-user/dashboard/discharge")}
// // //                     >
// // //                         <X className="mr-2 h-4 w-4" /> Cancel
// // //                     </Button>
// // //                     <Button 
// // //                         type="submit" 
// // //                         disabled={submitting} 
// // //                         className="bg-blue-600 hover:bg-blue-700 text-white min-w-[150px] shadow-md shadow-blue-500/20"
// // //                     >
// // //                         {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
// // //                         Submit Discharge
// // //                     </Button>
// // //                 </div>

// // //             </form>
// // //           </CardContent>
// // //         </Card>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // "use client";

// // import { useState, useEffect, use } from "react";
// // import { useRouter } from "next/navigation";
// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import { Card, CardHeader, CardContent } from "@/components/ui/card";
// // import { 
// //   Select, 
// //   SelectContent, 
// //   SelectItem, 
// //   SelectTrigger, 
// //   SelectValue 
// // } from "@/components/ui/select";
// // import { Save, X, Loader2, Calendar, User, FileText, Activity } from "lucide-react";
// // import toast, { Toaster } from "react-hot-toast";
// // import { differenceInDays, isValid } from "date-fns";
// // import { clsx, type ClassValue } from "clsx";
// // import { twMerge } from "tailwind-merge";

// // function cn(...inputs: ClassValue[]) {
// //   return twMerge(clsx(inputs));
// // }

// // // Interface for Child Data (from DB)
// // interface ChildData {
// //   SamNo: string;
// //   ChildName: string;
// //   FatherName: string;
// //   MotherName: string;
// //   AdmissionDate: string;
// //   AdmissionWeight: number;
// //   AdmissionHeight: number;
// //   AdmissionEdema: string; 
// //   AdmissionMuac: number;
// //   TargetWeight: number;
// //   AdmissionHemoglobin: number;
// //   Sex?: string;
// //   uuidChild?: string; // Often required by the external SAAMAR API
// // }

// // export default function DischargeFormPage({ params }: { params: Promise<{ id: string }> }) {
// //   const router = useRouter();
  
// //   // Next.js 15 Fix: Unwrap params securely
// //   const resolvedParams = use(params);
// //   const childId = resolvedParams.id;
  
// //   // --- State Management ---
// //   const [loading, setLoading] = useState(true);
// //   const [submitting, setSubmitting] = useState(false);
// //   const [child, setChild] = useState<ChildData | null>(null);
  
// //   // Form Fields
// //   const [dischargeDate, setDischargeDate] = useState(new Date().toISOString().split('T')[0]);
// //   const [dischargeWeight, setDischargeWeight] = useState("");
// //   const [dischargeHeight, setDischargeHeight] = useState("");
// //   const [dischargeMuac, setDischargeMuac] = useState("");
// //   const [dischargeZScore, setDischargeZScore] = useState("");
// //   const [outcomeIndicator, setOutcomeIndicator] = useState("");
// //   const [dischargeEdema, setDischargeEdema] = useState("");
  
// //   // Medical / Social
// //   const [hemoglobinMother, setHemoglobinMother] = useState("");
// //   const [ifaGivenToMother, setIfaGivenToMother] = useState("0");
// //   const [motherPayment, setMotherPayment] = useState("0");
// //   const [ifaSyrup, setIfaSyrup] = useState("0");
  
// //   // Conditional Fields (Only if Admission Edema != "No")
// //   const [minimumWeight, setMinimumWeight] = useState("");
// //   const [totalStay, setTotalStay] = useState("0");

// //   // Confirmation Checkbox
// //   const [isConfirmed, setIsConfirmed] = useState(false);

// //   // --- 1. Fetch Child Data ---
// //   useEffect(() => {
// //     const fetchChild = async () => {
// //       if (!childId) return;

// //       try {
// //         const res = await fetch(`/api/child/${childId}`);

// //         const contentType = res.headers.get("content-type");
// //         if (!contentType || !contentType.includes("application/json")) {
// //           throw new Error("Server returned an invalid format. Check your API route.");
// //         }

// //         if (!res.ok) throw new Error(`API returned status ${res.status}`);

// //         const result = await res.json();

// //         if (result.success && result.data) {
// //           setChild(result.data);
// //           if (result.data.AdmissionDate) {
// //              calculateTotalStay(result.data.AdmissionDate, new Date().toISOString().split('T')[0]);
// //           }
// //         } else {
// //           toast.error("Child not found");
// //           router.push("/mtc-user/dashboard/discharge");
// //         }
// //       } catch (error: any) {
// //         toast.error(error.message || "Error loading data");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchChild();
// //   }, [childId, router]);

// //   // --- 2. Logic & Calculations ---

// //   // Calculate Total Stay Days
// //   const calculateTotalStay = (admDateStr: string, disDateStr: string) => {
// //     const admDate = new Date(admDateStr);
// //     const disDate = new Date(disDateStr);
    
// //     if (isValid(admDate) && isValid(disDate)) {
// //       const days = differenceInDays(disDate, admDate);
// //       setTotalStay(days >= 0 ? days.toString() : "0");
// //     }
// //   };

// //   // Handle Date Change
// //   const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const newDate = e.target.value;
// //     setDischargeDate(newDate);
    
// //     if (child?.AdmissionDate) {
// //       const adm = new Date(child.AdmissionDate);
// //       const dis = new Date(newDate);
      
// //       if (dis < adm) {
// //         toast.error("Discharge date cannot be before Admission Date");
// //         setDischargeDate(""); 
// //         setTotalStay("0");
// //       } else {
// //         calculateTotalStay(child.AdmissionDate, newDate);
// //       }
// //     }
// //   };

// //   // Weight Limits
// //   const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const val = parseFloat(e.target.value);
// //     if (val > 100) {
// //       toast.error("Weight cannot be greater than 100kg");
// //       setDischargeWeight("");
// //     } else {
// //       setDischargeWeight(e.target.value);
// //     }
// //   };

// //   // Height Limits (Min 45cm, Max 120cm)
// //   const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const val = parseFloat(e.target.value);
// //     if (val > 120) {
// //       toast.error("Height cannot be greater than 120cm");
// //       setDischargeHeight("");
// //     } else {
// //       setDischargeHeight(e.target.value);
// //     }
// //   };

// //   // DYNAMIC Z-SCORE CALCULATION
// //   useEffect(() => {
// //     if (dischargeWeight && dischargeHeight) {
// //       const score = (parseFloat(dischargeWeight) / (parseFloat(dischargeHeight) / 100) ** 2) - 15;
// //       setDischargeZScore(isFinite(score) && score < 99 && score > -99 ? score.toFixed(2) : "Error");
// //     } else {
// //       setDischargeZScore("");
// //     }
// //   }, [dischargeWeight, dischargeHeight]);

// //   // --- 3. Submit Handler ---
// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();

// //     if (!isConfirmed) {
// //       toast.error("Please confirm that Daily Weight and Micronutrients are updated.");
// //       return;
// //     }

// //     if (parseFloat(dischargeHeight) < 45) {
// //        toast.error("Height must be at least 45cm.");
// //        return;
// //     }

// //     if (!dischargeDate || !dischargeWeight || !dischargeHeight || !dischargeMuac || !outcomeIndicator || !dischargeEdema) {
// //       toast.error("Please fill all compulsory fields marked with *");
// //       return;
// //     }
// //     if (ifaGivenToMother === "0" || motherPayment === "0" || ifaSyrup === "0") {
// //       toast.error("Please select all Yes/No dropdowns");
// //       return;
// //     }
// //     if (!hemoglobinMother) {
// //         toast.error("Please enter Mother's Hemoglobin");
// //         return;
// //     }
    
// //     if (child?.AdmissionEdema && child.AdmissionEdema.trim() !== "No" && !minimumWeight) {
// //         toast.error("Please enter Minimum Weight");
// //         return;
// //     }

// //     setSubmitting(true);

// //     try {
// //       const payload = {
// //         SamNo: child?.SamNo,
// //         uuidChild: child?.uuidChild, // Send to backend for SAAMAR sync
// //         DischargeDate: dischargeDate,
// //         DischargeWeight: parseFloat(dischargeWeight),
// //         DischargeHeight: parseFloat(dischargeHeight),
// //         DischargeMuac: parseFloat(dischargeMuac),
// //         DischargeZScore: parseFloat(dischargeZScore),
// //         DischargeEdema: parseInt(dischargeEdema),
// //         ExitIndicator: parseInt(outcomeIndicator),
// //         IFAToMotherTablet: parseInt(ifaGivenToMother),
// //         MotherWages: parseInt(motherPayment),
// //         IFAToMotherSyrup: parseInt(ifaSyrup),
// //         HemoglobinMother: parseFloat(hemoglobinMother),
// //         DischargeImage: null,
// //         TotalStay: parseInt(totalStay), 
// //         MinimumWeight: minimumWeight ? parseFloat(minimumWeight) : null
// //       };

// //       // Push to our backend (which will handle both local DB and SAAMAR sync)
// //       const res = await fetch(`/api/discharge-child/${childId}`, {
// //         method: "PUT",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(payload),
// //       });

// //       const contentType = res.headers.get("content-type");
// //       if (!contentType || !contentType.includes("application/json")) {
// //         throw new Error("Server returned an invalid format. Check your API route.");
// //       }

// //       const result = await res.json();
// //       if (!res.ok) throw new Error(result.message || "Failed to save record");

// //       if (result.saamarSynced) {
// //         toast.success("Discharged Locally & Synced with SAAMAR State Registry!");
// //       } else {
// //         toast.success("Record Saved Locally!");
// //         toast.error("Note: SAAMAR State Registry sync failed or is offline.", { duration: 5000 });
// //       }

// //       setTimeout(() => router.push("/mtc-user/dashboard/discharge"), 2500);

// //     } catch (error: any) {
// //       toast.error(error.message || "Something went wrong");
// //     } finally {
// //       setSubmitting(false);
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-slate-50 flex items-center justify-center">
// //         <div className="flex items-center gap-3 text-blue-700 text-lg font-medium">
// //             <Loader2 className="animate-spin h-6 w-6" /> Loading details...
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (!child) return null;

// //   return (
// //     <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6">
// //       <Toaster position="top-right" />
// //       <div className="max-w-7xl mx-auto">
// //         <Card className="shadow-xl border-0 rounded-2xl overflow-hidden bg-white">
// //           <CardHeader className="bg-gradient-to-r from-blue-700 to-blue-500 px-8 py-6">
// //             <div className="flex items-center gap-3 text-white">
// //               <FileText className="h-6 w-6" />
// //               <h5 className="text-2xl font-bold m-0 tracking-tight">Child Discharge Form</h5>
// //             </div>
// //           </CardHeader>

// //           <CardContent className="p-8">
// //             <form onSubmit={handleSubmit} className="space-y-10">
                
// //                 {/* --- SECTION 1: Read Only Details --- */}
// //                 <div className="bg-slate-50/50 rounded-xl p-6 border border-slate-100">
// //                   <h6 className="flex items-center gap-2 text-sm font-bold text-blue-800 uppercase tracking-wider mb-6">
// //                     <User className="h-4 w-4" /> Admission Information
// //                   </h6>
// //                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// //                       <div>
// //                           <label className="text-xs font-semibold text-slate-500 uppercase">SAM Number</label>
// //                           <Input value={child.SamNo ?? ""} readOnly className="bg-slate-100 border-transparent text-slate-700 font-medium mt-1 focus-visible:ring-0" />
// //                       </div>
// //                       <div>
// //                           <label className="text-xs font-semibold text-slate-500 uppercase">Child Name</label>
// //                           <Input value={child.ChildName ?? ""} readOnly className="bg-slate-100 border-transparent text-slate-700 font-medium mt-1 focus-visible:ring-0" />
// //                       </div>
// //                       <div>
// //                           <label className="text-xs font-semibold text-slate-500 uppercase">Admission Date</label>
// //                           <div className="relative mt-1">
// //                               <Input value={child.AdmissionDate ? new Date(child.AdmissionDate).toLocaleDateString() : ""} readOnly className="bg-slate-100 border-transparent text-slate-700 font-medium pr-10 focus-visible:ring-0" />
// //                               <div className="absolute right-3 top-2.5 text-slate-400"><Calendar className="h-4 w-4" /></div>
// //                           </div>
// //                       </div>
// //                       <div>
// //                           <label className="text-xs font-semibold text-slate-500 uppercase">Adm. Weight (kg)</label>
// //                           <Input value={child.AdmissionWeight ?? ""} readOnly className="bg-slate-100 border-transparent text-slate-700 font-medium mt-1 focus-visible:ring-0" />
// //                       </div>
// //                       <div>
// //                           <label className="text-xs font-semibold text-slate-500 uppercase">Adm. Height (cm)</label>
// //                           <Input value={child.AdmissionHeight ?? ""} readOnly className="bg-slate-100 border-transparent text-slate-700 font-medium mt-1 focus-visible:ring-0" />
// //                       </div>
// //                       <div>
// //                           <label className="text-xs font-semibold text-slate-500 uppercase">Adm. Edema</label>
// //                           <Input value={child.AdmissionEdema ?? ""} readOnly className="bg-slate-100 border-transparent text-slate-700 font-medium mt-1 focus-visible:ring-0" />
// //                       </div>
// //                       <div>
// //                           <label className="text-xs font-semibold text-slate-500 uppercase">Adm. MUAC (cm)</label>
// //                           <Input value={child.AdmissionMuac ?? ""} readOnly className="bg-slate-100 border-transparent text-slate-700 font-medium mt-1 focus-visible:ring-0" />
// //                       </div>
// //                       <div>
// //                           <label className="text-xs font-semibold text-slate-500 uppercase">Target Weight (kg)</label>
// //                           <Input value={child.TargetWeight ?? ""} readOnly className="bg-slate-100 border-transparent text-slate-700 font-medium mt-1 focus-visible:ring-0" />
// //                       </div>
// //                   </div>
// //                 </div>

// //                 {/* --- SECTION 2: Discharge Vitals --- */}
// //                 <div>
// //                   <h6 className="flex items-center gap-2 text-sm font-bold text-blue-800 uppercase tracking-wider mb-5 border-b pb-2">
// //                     <Activity className="h-4 w-4" /> Discharge Vitals
// //                   </h6>
// //                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// //                       <div>
// //                           <label className="text-sm font-medium text-slate-700">Discharge Date <span className="text-red-500">*</span></label>
// //                           <Input 
// //                               type="date" 
// //                               value={dischargeDate} 
// //                               onChange={handleDateChange} 
// //                               max={new Date().toISOString().split('T')[0]}
// //                               className="mt-1 focus-visible:ring-blue-500 border-slate-200" 
// //                           />
// //                       </div>
// //                       <div>
// //                           <label className="text-sm font-medium text-slate-700">Discharge Weight (kg) <span className="text-red-500">*</span></label>
// //                           <Input 
// //                               type="number" step="0.01" 
// //                               value={dischargeWeight} 
// //                               onChange={handleWeightChange} 
// //                               placeholder="Max 100"
// //                               className="mt-1 focus-visible:ring-blue-500 border-slate-200" 
// //                           />
// //                       </div>
// //                       <div>
// //                           <label className="text-sm font-medium text-slate-700">Discharge Height (cm) <span className="text-red-500">*</span></label>
// //                           <Input 
// //                               type="number" step="0.1" 
// //                               min="45" max="120"
// //                               value={dischargeHeight} 
// //                               onChange={handleHeightChange} 
// //                               placeholder="45cm - 120cm"
// //                               className="mt-1 focus-visible:ring-blue-500 border-slate-200" 
// //                           />
// //                       </div>
// //                       <div>
// //                           <label className="text-sm font-medium text-slate-700">Discharge MUAC (cm) <span className="text-red-500">*</span></label>
// //                           <Input 
// //                               type="number" step="0.1" 
// //                               value={dischargeMuac} 
// //                               onChange={(e) => setDischargeMuac(e.target.value)} 
// //                               className="mt-1 focus-visible:ring-blue-500 border-slate-200" 
// //                           />
// //                       </div>

// //                       <div>
// //                           <label className="text-sm font-medium text-slate-700">Z-Score (SD)</label>
// //                           <Input 
// //                               readOnly 
// //                               value={dischargeZScore} 
// //                               className={cn("mt-1 font-semibold focus:ring-0 cursor-not-allowed", dischargeZScore === "Error" ? "bg-red-50 text-red-600 border-red-200" : "bg-slate-100 text-blue-700 border-transparent")} 
// //                           />
// //                       </div>
// //                   </div>
// //                 </div>

// //                 {/* --- SECTION 3: Outcomes & Medical Indicators --- */}
// //                 <div>
// //                   <h6 className="text-sm font-bold text-blue-800 uppercase tracking-wider mb-5 border-b pb-2">Outcomes & Medical Indicators</h6>
// //                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
// //                       <div>
// //                           <label className="text-sm font-medium text-slate-700">Outcome Indicator <span className="text-red-500">*</span></label>
// //                           <Select value={outcomeIndicator} onValueChange={setOutcomeIndicator}>
// //                               <SelectTrigger className="mt-1 focus:ring-blue-500 border-slate-200"><SelectValue placeholder="Select" /></SelectTrigger>
// //                               <SelectContent>
// //                                   <SelectItem value="1">CURED</SelectItem>
// //                                   <SelectItem value="2">DEFAULTER</SelectItem>
// //                                   <SelectItem value="3">MEDICAL TRANSFER</SelectItem>
// //                                   <SelectItem value="4">NON RESPONDENT</SelectItem>
// //                                   <SelectItem value="5">DEATH</SelectItem>
// //                                   <SelectItem value="6">PARTIAL IMPROVEMENT</SelectItem>
// //                               </SelectContent>
// //                           </Select>
// //                       </div>
// //                       <div>
// //                           <label className="text-sm font-medium text-slate-700">Discharge EDEMA <span className="text-red-500">*</span></label>
// //                           <Select value={dischargeEdema} onValueChange={setDischargeEdema}>
// //                               <SelectTrigger className="mt-1 focus:ring-blue-500 border-slate-200"><SelectValue placeholder="Select" /></SelectTrigger>
// //                               <SelectContent>
// //                                   <SelectItem value="4">No Edema</SelectItem>
// //                                   <SelectItem value="1">+</SelectItem>
// //                                   <SelectItem value="2">++</SelectItem>
// //                                   <SelectItem value="3">+++</SelectItem>
// //                               </SelectContent>
// //                           </Select>
// //                       </div>
// //                       <div>
// //                           <label className="text-sm font-medium text-slate-700">Adm. Hemoglobin (gm/dl)</label>
// //                           <Input value={child.AdmissionHemoglobin ?? "N/A"} readOnly className="bg-slate-100 border-transparent text-slate-700 font-medium mt-1 focus-visible:ring-0" />
// //                       </div>
// //                       <div>
// //                           <label className="text-sm font-medium text-slate-700">Mother's Hb (gm/dl) <span className="text-red-500">*</span></label>
// //                           <Input 
// //                               type="number" step="0.1" 
// //                               value={hemoglobinMother} 
// //                               onChange={(e) => setHemoglobinMother(e.target.value)} 
// //                               className="mt-1 focus-visible:ring-blue-500 border-slate-200"
// //                           />
// //                       </div>
// //                   </div>

// //                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //                       <div>
// //                           <label className="text-sm font-medium text-slate-700">IFA Given To Mother <span className="text-red-500">*</span></label>
// //                           <Select value={ifaGivenToMother} onValueChange={setIfaGivenToMother}>
// //                               <SelectTrigger className="mt-1 focus:ring-blue-500 border-slate-200"><SelectValue placeholder="Select" /></SelectTrigger>
// //                               <SelectContent>
// //                                   <SelectItem value="0">Select</SelectItem>
// //                                   <SelectItem value="1">Yes</SelectItem>
// //                                   <SelectItem value="2">No</SelectItem>
// //                               </SelectContent>
// //                           </Select>
// //                       </div>
// //                       <div>
// //                           <label className="text-sm font-medium text-slate-700">Mother's Wage Comp. <span className="text-red-500">*</span></label>
// //                           <Select value={motherPayment} onValueChange={setMotherPayment}>
// //                               <SelectTrigger className="mt-1 focus:ring-blue-500 border-slate-200"><SelectValue placeholder="Select" /></SelectTrigger>
// //                               <SelectContent>
// //                                   <SelectItem value="0">Select</SelectItem>
// //                                   <SelectItem value="1">Yes</SelectItem>
// //                                   <SelectItem value="2">No</SelectItem>
// //                               </SelectContent>
// //                           </Select>
// //                       </div>
// //                       <div>
// //                           <label className="text-sm font-medium text-slate-700">IFA Syrup to Child <span className="text-red-500">*</span></label>
// //                           <Select value={ifaSyrup} onValueChange={setIfaSyrup}>
// //                               <SelectTrigger className="mt-1 focus:ring-blue-500 border-slate-200"><SelectValue placeholder="Select" /></SelectTrigger>
// //                               <SelectContent>
// //                                   <SelectItem value="0">Select</SelectItem>
// //                                   <SelectItem value="1">Yes</SelectItem>
// //                                   <SelectItem value="2">No</SelectItem>
// //                               </SelectContent>
// //                           </Select>
// //                       </div>
// //                   </div>
// //                 </div>

// //                 {/* --- SECTION 4: Conditional Edema Fields --- */}
// //                 {child.AdmissionEdema && child.AdmissionEdema.trim() !== "No" && (
// //                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-amber-50 p-5 rounded-xl border border-amber-200 animate-in fade-in">
// //                         <div>
// //                             <label className="text-sm font-medium text-amber-900">Minimum Weight <span className="text-red-500">*</span></label>
// //                             <Input 
// //                                 type="number" step="0.01" 
// //                                 value={minimumWeight} 
// //                                 onChange={(e) => setMinimumWeight(e.target.value)} 
// //                                 className="mt-1 bg-white border-amber-300 focus-visible:ring-amber-500" 
// //                             />
// //                         </div>
// //                         <div>
// //                             <label className="text-sm font-medium text-amber-900">Total Stay (Days)</label>
// //                             <Input 
// //                                 value={totalStay} 
// //                                 readOnly 
// //                                 className="mt-1 bg-amber-100 font-bold text-amber-900 border-transparent focus-visible:ring-0" 
// //                             />
// //                         </div>
// //                     </div>
// //                 )}

// //                 <div className="flex items-center space-x-3 bg-blue-50 p-5 rounded-xl border border-blue-100 mt-8 shadow-sm">
// //                   <input 
// //                     type="checkbox" 
// //                     id="confirmUpdate" 
// //                     checked={isConfirmed} 
// //                     onChange={(e) => setIsConfirmed(e.target.checked)} 
// //                     className="h-5 w-5 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
// //                   />
// //                   <label htmlFor="confirmUpdate" className="text-sm font-semibold text-blue-900 cursor-pointer select-none">
// //                     I confirm that Daily Weight and Micronutrient details have been updated before discharge. <span className="text-red-500">*</span>
// //                   </label>
// //                 </div>

// //                 {/* --- Footer Buttons --- */}
// //                 <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t border-slate-100">
// //                     <Button 
// //                         type="button" 
// //                         variant="outline" 
// //                         className="border-slate-300 text-slate-700 hover:bg-slate-100 min-w-[120px]"
// //                         onClick={() => router.push("/mtc-user/dashboard/discharge")}
// //                     >
// //                         <X className="mr-2 h-4 w-4" /> Cancel
// //                     </Button>
// //                     <Button 
// //                         type="submit" 
// //                         disabled={submitting} 
// //                         className="bg-blue-600 hover:bg-blue-700 text-white min-w-[150px] shadow-md shadow-blue-500/20"
// //                     >
// //                         {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
// //                         Submit Discharge
// //                     </Button>
// //                 </div>

// //             </form>
// //           </CardContent>
// //         </Card>
// //       </div>
// //     </div>
// //   );
// // }


// "use client";

// import { useState, useEffect, use } from "react";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardHeader, CardContent } from "@/components/ui/card";
// import { 
//   Select, 
//   SelectContent, 
//   SelectItem, 
//   SelectTrigger, 
//   SelectValue 
// } from "@/components/ui/select";
// import { Save, X, Loader2, Calendar, User, FileText, Activity } from "lucide-react";
// import toast, { Toaster } from "react-hot-toast";
// import { differenceInDays, isValid } from "date-fns";
// import { clsx, type ClassValue } from "clsx";
// import { twMerge } from "tailwind-merge";

// function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs));
// }

// // Interface for Child Data (from DB)
// interface ChildData {
//   SamNo: string;
//   ChildName: string;
//   FatherName: string;
//   MotherName: string;
//   AdmissionDate: string;
//   AdmissionWeight: number;
//   AdmissionHeight: number;
//   AdmissionEdema: string; 
//   AdmissionMuac: number;
//   TargetWeight: number;
//   AdmissionHemoglobin: number;
//   Sex?: string;
//   isSamarRegistered?: boolean; // ✅ Added SAAMAR Check
//   samarUuid?: string;          // ✅ Added SAAMAR UUID
// }

// export default function DischargeFormPage({ params }: { params: Promise<{ id: string }> }) {
//   const router = useRouter();
  
//   // Next.js 15 Fix: Unwrap params securely
//   const resolvedParams = use(params);
//   const childId = resolvedParams.id;
  
//   // --- State Management ---
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [child, setChild] = useState<ChildData | null>(null);
  
//   // Form Fields
//   const [dischargeDate, setDischargeDate] = useState(new Date().toISOString().split('T')[0]);
//   const [dischargeWeight, setDischargeWeight] = useState("");
//   const [dischargeHeight, setDischargeHeight] = useState("");
//   const [dischargeMuac, setDischargeMuac] = useState("");
//   const [dischargeZScore, setDischargeZScore] = useState("");
//   const [outcomeIndicator, setOutcomeIndicator] = useState("");
//   const [dischargeEdema, setDischargeEdema] = useState("");
  
//   // Medical / Social
//   const [hemoglobinMother, setHemoglobinMother] = useState("");
//   const [ifaGivenToMother, setIfaGivenToMother] = useState("0");
//   const [motherPayment, setMotherPayment] = useState("0");
//   const [ifaSyrup, setIfaSyrup] = useState("0");
  
//   // Conditional Fields (Only if Admission Edema != "No")
//   const [minimumWeight, setMinimumWeight] = useState("");
//   const [totalStay, setTotalStay] = useState("0");

//   // Confirmation Checkbox
//   const [isConfirmed, setIsConfirmed] = useState(false);

//   // --- 1. Fetch Child Data ---
//   useEffect(() => {
//     const fetchChild = async () => {
//       if (!childId) return;

//       try {
//         const res = await fetch(`/api/child/${childId}`);

//         const contentType = res.headers.get("content-type");
//         if (!contentType || !contentType.includes("application/json")) {
//           throw new Error("Server returned an invalid format. Check your API route.");
//         }

//         if (!res.ok) throw new Error(`API returned status ${res.status}`);

//         const result = await res.json();

//         if (result.success && result.data) {
//           // ✅ Map backend variables including SAAMAR Data safely
//           const mappedData = {
//             ...result.data,
//             isSamarRegistered: result.data.isSamarRegistered || result.data.is_samar_registered === true,
//             samarUuid: result.data.samarUuid || result.data.samar_uuid || result.data.uuidChild || ""
//           };
          
//           setChild(mappedData);
          
//           if (result.data.AdmissionDate) {
//              calculateTotalStay(result.data.AdmissionDate, new Date().toISOString().split('T')[0]);
//           }
//         } else {
//           toast.error("Child not found");
//           router.push("/mtc-user/dashboard/discharge");
//         }
//       } catch (error: any) {
//         toast.error(error.message || "Error loading data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchChild();
//   }, [childId, router]);

//   // --- 2. Logic & Calculations ---

//   // Calculate Total Stay Days
//   const calculateTotalStay = (admDateStr: string, disDateStr: string) => {
//     const admDate = new Date(admDateStr);
//     const disDate = new Date(disDateStr);
    
//     if (isValid(admDate) && isValid(disDate)) {
//       const days = differenceInDays(disDate, admDate);
//       setTotalStay(days >= 0 ? days.toString() : "0");
//     }
//   };

//   // Handle Date Change
//   const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const newDate = e.target.value;
//     setDischargeDate(newDate);
    
//     if (child?.AdmissionDate) {
//       const adm = new Date(child.AdmissionDate);
//       const dis = new Date(newDate);
      
//       if (dis < adm) {
//         toast.error("Discharge date cannot be before Admission Date");
//         setDischargeDate(""); 
//         setTotalStay("0");
//       } else {
//         calculateTotalStay(child.AdmissionDate, newDate);
//       }
//     }
//   };

//   // Weight Limits
//   const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const val = parseFloat(e.target.value);
//     if (val > 100) {
//       toast.error("Weight cannot be greater than 100kg");
//       setDischargeWeight("");
//     } else {
//       setDischargeWeight(e.target.value);
//     }
//   };

//   // Height Limits (Min 45cm, Max 120cm)
//   const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const val = parseFloat(e.target.value);
//     if (val > 120) {
//       toast.error("Height cannot be greater than 120cm");
//       setDischargeHeight("");
//     } else {
//       setDischargeHeight(e.target.value);
//     }
//   };

//   // DYNAMIC Z-SCORE CALCULATION
//   useEffect(() => {
//     if (dischargeWeight && dischargeHeight) {
//       const score = (parseFloat(dischargeWeight) / (parseFloat(dischargeHeight) / 100) ** 2) - 15;
//       setDischargeZScore(isFinite(score) && score < 99 && score > -99 ? score.toFixed(2) : "Error");
//     } else {
//       setDischargeZScore("");
//     }
//   }, [dischargeWeight, dischargeHeight]);

//   // --- 3. Submit Handler ---
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!isConfirmed) {
//       toast.error("Please confirm that Daily Weight and Micronutrients are updated.");
//       return;
//     }

//     if (parseFloat(dischargeHeight) < 45) {
//        toast.error("Height must be at least 45cm.");
//        return;
//     }

//     if (!dischargeDate || !dischargeWeight || !dischargeHeight || !dischargeMuac || !outcomeIndicator || !dischargeEdema) {
//       toast.error("Please fill all compulsory fields marked with *");
//       return;
//     }
//     if (ifaGivenToMother === "0" || motherPayment === "0" || ifaSyrup === "0") {
//       toast.error("Please select all Yes/No dropdowns");
//       return;
//     }
//     if (!hemoglobinMother) {
//         toast.error("Please enter Mother's Hemoglobin");
//         return;
//     }
    
//     if (child?.AdmissionEdema && child.AdmissionEdema.trim() !== "No" && !minimumWeight) {
//         toast.error("Please enter Minimum Weight");
//         return;
//     }

//     setSubmitting(true);

//     try {
//       const payload = {
//         SamNo: child?.SamNo,
//         // ✅ Only send SAAMAR UUID if the child is SAAMAR registered
//         uuidChild: child?.isSamarRegistered ? child.samarUuid : null, 
//         DischargeDate: dischargeDate,
//         DischargeWeight: parseFloat(dischargeWeight),
//         DischargeHeight: parseFloat(dischargeHeight),
//         DischargeMuac: parseFloat(dischargeMuac),
//         DischargeZScore: parseFloat(dischargeZScore),
//         DischargeEdema: parseInt(dischargeEdema),
//         ExitIndicator: parseInt(outcomeIndicator),
//         IFAToMotherTablet: parseInt(ifaGivenToMother),
//         MotherWages: parseInt(motherPayment),
//         IFAToMotherSyrup: parseInt(ifaSyrup),
//         HemoglobinMother: parseFloat(hemoglobinMother),
//         DischargeImage: null,
//         TotalStay: parseInt(totalStay), 
//         MinimumWeight: minimumWeight ? parseFloat(minimumWeight) : null
//       };

//       // Push to our backend (which will handle both local DB and SAAMAR sync)
//       const res = await fetch(`/api/discharge-child/${childId}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       const contentType = res.headers.get("content-type");
//       if (!contentType || !contentType.includes("application/json")) {
//         throw new Error("Server returned an invalid format. Check your API route.");
//       }

//       const result = await res.json();
//       if (!res.ok) throw new Error(result.message || "Failed to save record");

//       if (result.saamarSynced) {
//         toast.success("Discharged Locally & Synced with SAAMAR State Registry!");
//       } else {
//         toast.success("Record Saved Locally!");
//         if (child?.isSamarRegistered) {
//           toast.error("Note: SAAMAR State Registry sync failed or is offline.", { duration: 5000 });
//         }
//       }

//       setTimeout(() => router.push("/mtc-user/dashboard/discharge"), 2500);

//     } catch (error: any) {
//       toast.error(error.message || "Something went wrong");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-slate-50 flex items-center justify-center">
//         <div className="flex items-center gap-3 text-blue-700 text-lg font-medium">
//             <Loader2 className="animate-spin h-6 w-6" /> Loading details...
//         </div>
//       </div>
//     );
//   }

//   if (!child) return null;

//   return (
//     <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6">
//       <Toaster position="top-right" />
//       <div className="max-w-7xl mx-auto">
//         <Card className="shadow-xl border-0 rounded-2xl overflow-hidden bg-white">
//           <CardHeader className="bg-gradient-to-r from-blue-700 to-blue-500 px-8 py-6">
//             <div className="flex items-center gap-3 text-white">
//               <FileText className="h-6 w-6" />
//               <h5 className="text-2xl font-bold m-0 tracking-tight">Child Discharge Form</h5>
//             </div>
//           </CardHeader>

//           <CardContent className="p-8">
//             <form onSubmit={handleSubmit} className="space-y-10">
                
//                 {/* --- SECTION 1: Read Only Details --- */}
//                 <div className="bg-slate-50/50 rounded-xl p-6 border border-slate-100">
//                   <div className="flex items-center justify-between mb-6">
//                     <h6 className="flex items-center gap-2 text-sm font-bold text-blue-800 uppercase tracking-wider">
//                       <User className="h-4 w-4" /> Admission Information
//                     </h6>
//                     {/* ✅ Display SAAMAR badge if applicable */}
//                     {child.isSamarRegistered && (
//                       <span className="bg-purple-100 text-purple-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-purple-200">
//                         SAAMAR Active
//                       </span>
//                     )}
//                   </div>
                  
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      
//                       {/* ✅ Conditionally show UUID only for SAAMAR Children */}
//                       {child.isSamarRegistered && (
//                         <div className="lg:col-span-4 bg-purple-50 p-4 rounded-xl border border-purple-100/50 mb-2">
//                             <label className="text-xs font-bold text-purple-800 uppercase">SAAMAR Child UUID</label>
//                             <Input value={child.samarUuid ?? ""} readOnly className="bg-white border-purple-200 text-purple-700 font-bold mt-1 focus-visible:ring-0" />
//                         </div>
//                       )}

//                       <div>
//                           <label className="text-xs font-semibold text-slate-500 uppercase">SAM Number</label>
//                           <Input value={child.SamNo ?? ""} readOnly className="bg-slate-100 border-transparent text-slate-700 font-medium mt-1 focus-visible:ring-0" />
//                       </div>
//                       <div>
//                           <label className="text-xs font-semibold text-slate-500 uppercase">Child Name</label>
//                           <Input value={child.ChildName ?? ""} readOnly className="bg-slate-100 border-transparent text-slate-700 font-medium mt-1 focus-visible:ring-0" />
//                       </div>
//                       <div>
//                           <label className="text-xs font-semibold text-slate-500 uppercase">Admission Date</label>
//                           <div className="relative mt-1">
//                               <Input value={child.AdmissionDate ? new Date(child.AdmissionDate).toLocaleDateString() : ""} readOnly className="bg-slate-100 border-transparent text-slate-700 font-medium pr-10 focus-visible:ring-0" />
//                               <div className="absolute right-3 top-2.5 text-slate-400"><Calendar className="h-4 w-4" /></div>
//                           </div>
//                       </div>
//                       <div>
//                           <label className="text-xs font-semibold text-slate-500 uppercase">Adm. Weight (kg)</label>
//                           <Input value={child.AdmissionWeight ?? ""} readOnly className="bg-slate-100 border-transparent text-slate-700 font-medium mt-1 focus-visible:ring-0" />
//                       </div>
//                       <div>
//                           <label className="text-xs font-semibold text-slate-500 uppercase">Adm. Height (cm)</label>
//                           <Input value={child.AdmissionHeight ?? ""} readOnly className="bg-slate-100 border-transparent text-slate-700 font-medium mt-1 focus-visible:ring-0" />
//                       </div>
//                       <div>
//                           <label className="text-xs font-semibold text-slate-500 uppercase">Adm. Edema</label>
//                           <Input value={child.AdmissionEdema ?? ""} readOnly className="bg-slate-100 border-transparent text-slate-700 font-medium mt-1 focus-visible:ring-0" />
//                       </div>
//                       <div>
//                           <label className="text-xs font-semibold text-slate-500 uppercase">Adm. MUAC (cm)</label>
//                           <Input value={child.AdmissionMuac ?? ""} readOnly className="bg-slate-100 border-transparent text-slate-700 font-medium mt-1 focus-visible:ring-0" />
//                       </div>
//                       <div>
//                           <label className="text-xs font-semibold text-slate-500 uppercase">Target Weight (kg)</label>
//                           <Input value={child.TargetWeight ?? ""} readOnly className="bg-slate-100 border-transparent text-slate-700 font-medium mt-1 focus-visible:ring-0" />
//                       </div>
//                   </div>
//                 </div>

//                 {/* --- SECTION 2: Discharge Vitals --- */}
//                 <div>
//                   <h6 className="flex items-center gap-2 text-sm font-bold text-blue-800 uppercase tracking-wider mb-5 border-b pb-2">
//                     <Activity className="h-4 w-4" /> Discharge Vitals
//                   </h6>
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//                       <div>
//                           <label className="text-sm font-medium text-slate-700">Discharge Date <span className="text-red-500">*</span></label>
//                           <Input 
//                               type="date" 
//                               value={dischargeDate} 
//                               onChange={handleDateChange} 
//                               max={new Date().toISOString().split('T')[0]}
//                               className="mt-1 focus-visible:ring-blue-500 border-slate-200" 
//                           />
//                       </div>
//                       <div>
//                           <label className="text-sm font-medium text-slate-700">Discharge Weight (kg) <span className="text-red-500">*</span></label>
//                           <Input 
//                               type="number" step="0.01" 
//                               value={dischargeWeight} 
//                               onChange={handleWeightChange} 
//                               placeholder="Max 100"
//                               className="mt-1 focus-visible:ring-blue-500 border-slate-200" 
//                           />
//                       </div>
//                       <div>
//                           <label className="text-sm font-medium text-slate-700">Discharge Height (cm) <span className="text-red-500">*</span></label>
//                           <Input 
//                               type="number" step="0.1" 
//                               min="45" max="120"
//                               value={dischargeHeight} 
//                               onChange={handleHeightChange} 
//                               placeholder="45cm - 120cm"
//                               className="mt-1 focus-visible:ring-blue-500 border-slate-200" 
//                           />
//                       </div>
//                       <div>
//                           <label className="text-sm font-medium text-slate-700">Discharge MUAC (cm) <span className="text-red-500">*</span></label>
//                           <Input 
//                               type="number" step="0.1" 
//                               value={dischargeMuac} 
//                               onChange={(e) => setDischargeMuac(e.target.value)} 
//                               className="mt-1 focus-visible:ring-blue-500 border-slate-200" 
//                           />
//                       </div>

//                       <div>
//                           <label className="text-sm font-medium text-slate-700">Z-Score (SD)</label>
//                           <Input 
//                               readOnly 
//                               value={dischargeZScore} 
//                               className={cn("mt-1 font-semibold focus:ring-0 cursor-not-allowed", dischargeZScore === "Error" ? "bg-red-50 text-red-600 border-red-200" : "bg-slate-100 text-blue-700 border-transparent")} 
//                           />
//                       </div>
//                   </div>
//                 </div>

//                 {/* --- SECTION 3: Outcomes & Medical Indicators --- */}
//                 <div>
//                   <h6 className="text-sm font-bold text-blue-800 uppercase tracking-wider mb-5 border-b pb-2">Outcomes & Medical Indicators</h6>
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
//                       <div>
//                           <label className="text-sm font-medium text-slate-700">Outcome Indicator <span className="text-red-500">*</span></label>
//                           <Select value={outcomeIndicator} onValueChange={setOutcomeIndicator}>
//                               <SelectTrigger className="mt-1 focus:ring-blue-500 border-slate-200"><SelectValue placeholder="Select" /></SelectTrigger>
//                               <SelectContent>
//                                   <SelectItem value="1">CURED</SelectItem>
//                                   <SelectItem value="2">DEFAULTER</SelectItem>
//                                   <SelectItem value="3">MEDICAL TRANSFER</SelectItem>
//                                   <SelectItem value="4">NON RESPONDENT</SelectItem>
//                                   <SelectItem value="5">DEATH</SelectItem>
//                                   <SelectItem value="6">PARTIAL IMPROVEMENT</SelectItem>
//                               </SelectContent>
//                           </Select>
//                       </div>
//                       <div>
//                           <label className="text-sm font-medium text-slate-700">Discharge EDEMA <span className="text-red-500">*</span></label>
//                           <Select value={dischargeEdema} onValueChange={setDischargeEdema}>
//                               <SelectTrigger className="mt-1 focus:ring-blue-500 border-slate-200"><SelectValue placeholder="Select" /></SelectTrigger>
//                               <SelectContent>
//                                   <SelectItem value="4">No Edema</SelectItem>
//                                   <SelectItem value="1">+</SelectItem>
//                                   <SelectItem value="2">++</SelectItem>
//                                   <SelectItem value="3">+++</SelectItem>
//                               </SelectContent>
//                           </Select>
//                       </div>
//                       <div>
//                           <label className="text-sm font-medium text-slate-700">Adm. Hemoglobin (gm/dl)</label>
//                           <Input value={child.AdmissionHemoglobin ?? "N/A"} readOnly className="bg-slate-100 border-transparent text-slate-700 font-medium mt-1 focus-visible:ring-0" />
//                       </div>
//                       <div>
//                           <label className="text-sm font-medium text-slate-700">Mother's Hb (gm/dl) <span className="text-red-500">*</span></label>
//                           <Input 
//                               type="number" step="0.1" 
//                               value={hemoglobinMother} 
//                               onChange={(e) => setHemoglobinMother(e.target.value)} 
//                               className="mt-1 focus-visible:ring-blue-500 border-slate-200"
//                           />
//                       </div>
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                       <div>
//                           <label className="text-sm font-medium text-slate-700">IFA Given To Mother <span className="text-red-500">*</span></label>
//                           <Select value={ifaGivenToMother} onValueChange={setIfaGivenToMother}>
//                               <SelectTrigger className="mt-1 focus:ring-blue-500 border-slate-200"><SelectValue placeholder="Select" /></SelectTrigger>
//                               <SelectContent>
//                                   <SelectItem value="0">Select</SelectItem>
//                                   <SelectItem value="1">Yes</SelectItem>
//                                   <SelectItem value="2">No</SelectItem>
//                               </SelectContent>
//                           </Select>
//                       </div>
//                       <div>
//                           <label className="text-sm font-medium text-slate-700">Mother's Wage Comp. <span className="text-red-500">*</span></label>
//                           <Select value={motherPayment} onValueChange={setMotherPayment}>
//                               <SelectTrigger className="mt-1 focus:ring-blue-500 border-slate-200"><SelectValue placeholder="Select" /></SelectTrigger>
//                               <SelectContent>
//                                   <SelectItem value="0">Select</SelectItem>
//                                   <SelectItem value="1">Yes</SelectItem>
//                                   <SelectItem value="2">No</SelectItem>
//                               </SelectContent>
//                           </Select>
//                       </div>
//                       <div>
//                           <label className="text-sm font-medium text-slate-700">IFA Syrup to Child <span className="text-red-500">*</span></label>
//                           <Select value={ifaSyrup} onValueChange={setIfaSyrup}>
//                               <SelectTrigger className="mt-1 focus:ring-blue-500 border-slate-200"><SelectValue placeholder="Select" /></SelectTrigger>
//                               <SelectContent>
//                                   <SelectItem value="0">Select</SelectItem>
//                                   <SelectItem value="1">Yes</SelectItem>
//                                   <SelectItem value="2">No</SelectItem>
//                               </SelectContent>
//                           </Select>
//                       </div>
//                   </div>
//                 </div>

//                 {/* --- SECTION 4: Conditional Edema Fields --- */}
//                 {child.AdmissionEdema && child.AdmissionEdema.trim() !== "No" && (
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-amber-50 p-5 rounded-xl border border-amber-200 animate-in fade-in">
//                         <div>
//                             <label className="text-sm font-medium text-amber-900">Minimum Weight <span className="text-red-500">*</span></label>
//                             <Input 
//                                 type="number" step="0.01" 
//                                 value={minimumWeight} 
//                                 onChange={(e) => setMinimumWeight(e.target.value)} 
//                                 className="mt-1 bg-white border-amber-300 focus-visible:ring-amber-500" 
//                             />
//                         </div>
//                         <div>
//                             <label className="text-sm font-medium text-amber-900">Total Stay (Days)</label>
//                             <Input 
//                                 value={totalStay} 
//                                 readOnly 
//                                 className="mt-1 bg-amber-100 font-bold text-amber-900 border-transparent focus-visible:ring-0" 
//                             />
//                         </div>
//                     </div>
//                 )}

//                 <div className="flex items-center space-x-3 bg-blue-50 p-5 rounded-xl border border-blue-100 mt-8 shadow-sm">
//                   <input 
//                     type="checkbox" 
//                     id="confirmUpdate" 
//                     checked={isConfirmed} 
//                     onChange={(e) => setIsConfirmed(e.target.checked)} 
//                     className="h-5 w-5 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
//                   />
//                   <label htmlFor="confirmUpdate" className="text-sm font-semibold text-blue-900 cursor-pointer select-none">
//                     I confirm that Daily Weight and Micronutrient details have been updated before discharge. <span className="text-red-500">*</span>
//                   </label>
//                 </div>

//                 {/* --- Footer Buttons --- */}
//                 <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t border-slate-100">
//                     <Button 
//                         type="button" 
//                         variant="outline" 
//                         className="border-slate-300 text-slate-700 hover:bg-slate-100 min-w-[120px]"
//                         onClick={() => router.push("/mtc-user/dashboard/discharge")}
//                     >
//                         <X className="mr-2 h-4 w-4" /> Cancel
//                     </Button>
//                     <Button 
//                         type="submit" 
//                         disabled={submitting} 
//                         className="bg-blue-600 hover:bg-blue-700 text-white min-w-[150px] shadow-md shadow-blue-500/20"
//                     >
//                         {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
//                         Submit Discharge
//                     </Button>
//                 </div>

//             </form>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Save, X, Loader2, Calendar, User, FileText, Activity } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { differenceInDays, isValid } from "date-fns";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Interface for Child Data (from DB)
interface ChildData {
  SamNo: string;
  ChildName: string;
  FatherName: string;
  MotherName: string;
  AdmissionDate: string;
  AdmissionWeight: number;
  AdmissionHeight: number;
  AdmissionEdema: string; 
  AdmissionMuac: number;
  TargetWeight: number;
  AdmissionHemoglobin: number;
  Sex?: string;
  isSamarRegistered?: boolean; // ✅ Added SAAMAR Check
  samarUuid?: string;          // ✅ Added SAAMAR UUID
}

interface DBChildResponse extends Omit<ChildData, 'isSamarRegistered' | 'samarUuid'> {
  is_samar_registered?: boolean;
  samar_uuid?: string;
  uuidChild?: string;
}

export default function DischargeFormPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  
  // Next.js 15 Fix: Unwrap params securely
  const resolvedParams = use(params);
  const childId = resolvedParams.id;
  
  // --- State Management ---
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [child, setChild] = useState<ChildData | null>(null);
  
  // Form Fields
  const [dischargeDate, setDischargeDate] = useState(new Date().toISOString().split('T')[0]);
  const [dischargeWeight, setDischargeWeight] = useState("");
  const [dischargeHeight, setDischargeHeight] = useState("");
  const [dischargeMuac, setDischargeMuac] = useState("");
  const [dischargeZScore, setDischargeZScore] = useState("");
  const [outcomeIndicator, setOutcomeIndicator] = useState("");
  const [dischargeEdema, setDischargeEdema] = useState("");
  
  // Medical / Social
  const [hemoglobinMother, setHemoglobinMother] = useState("");
  const [ifaGivenToMother, setIfaGivenToMother] = useState("0");
  const [motherPayment, setMotherPayment] = useState("0");
  const [ifaSyrup, setIfaSyrup] = useState("0");
  
  // Conditional Fields (Only if Admission Edema != "No")
  const [minimumWeight, setMinimumWeight] = useState("");
  const [totalStay, setTotalStay] = useState("0");

  // Confirmation Checkbox
  const [isConfirmed, setIsConfirmed] = useState(false);

  // --- 1. Fetch Child Data ---
  useEffect(() => {
    const fetchChild = async () => {
      if (!childId) return;

      try {
        const res = await fetch(`/api/child/${childId}`);

        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Server returned an invalid format. Check your API route.");
        }

        if (!res.ok) throw new Error(`API returned status ${res.status}`);

        const result = await res.json() as { success: boolean; data?: DBChildResponse };

        if (result.success && result.data) {
          // ✅ Map backend variables including SAAMAR Data safely
          const mappedData: ChildData = {
            ...result.data,
            isSamarRegistered: result.data.is_samar_registered === true,
            samarUuid: result.data.samar_uuid || result.data.uuidChild || ""
          };
          
          setChild(mappedData);
          
          if (result.data.AdmissionDate) {
             calculateTotalStay(result.data.AdmissionDate, new Date().toISOString().split('T')[0]);
          }
        } else {
          toast.error("Child not found");
          router.push("/mtc-user/dashboard/discharge");
        }
      } catch (error) {
        const err = error as Error;
        toast.error(err.message || "Error loading data");
      } finally {
        setLoading(false);
      }
    };

    fetchChild();
  }, [childId, router]);

  // --- 2. Logic & Calculations ---

  // Calculate Total Stay Days
  const calculateTotalStay = (admDateStr: string, disDateStr: string) => {
    const admDate = new Date(admDateStr);
    const disDate = new Date(disDateStr);
    
    if (isValid(admDate) && isValid(disDate)) {
      const days = differenceInDays(disDate, admDate);
      setTotalStay(days >= 0 ? days.toString() : "0");
    }
  };

  // Handle Date Change
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    setDischargeDate(newDate);
    
    if (child?.AdmissionDate) {
      const adm = new Date(child.AdmissionDate);
      const dis = new Date(newDate);
      
      if (dis < adm) {
        toast.error("Discharge date cannot be before Admission Date");
        setDischargeDate(""); 
        setTotalStay("0");
      } else {
        calculateTotalStay(child.AdmissionDate, newDate);
      }
    }
  };

  // Weight Limits
  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (val > 100) {
      toast.error("Weight cannot be greater than 100kg");
      setDischargeWeight("");
    } else {
      setDischargeWeight(e.target.value);
    }
  };

  // Height Limits (Min 45cm, Max 120cm)
  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (val > 120) {
      toast.error("Height cannot be greater than 120cm");
      setDischargeHeight("");
    } else {
      setDischargeHeight(e.target.value);
    }
  };

  // DYNAMIC Z-SCORE CALCULATION
  useEffect(() => {
    if (dischargeWeight && dischargeHeight) {
      const score = (parseFloat(dischargeWeight) / (parseFloat(dischargeHeight) / 100) ** 2) - 15;
      setDischargeZScore(isFinite(score) && score < 99 && score > -99 ? score.toFixed(2) : "Error");
    } else {
      setDischargeZScore("");
    }
  }, [dischargeWeight, dischargeHeight]);

  // --- 3. Submit Handler ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isConfirmed) {
      toast.error("Please confirm that Daily Weight and Micronutrients are updated.");
      return;
    }

    if (parseFloat(dischargeHeight) < 45) {
       toast.error("Height must be at least 45cm.");
       return;
    }

    if (!dischargeDate || !dischargeWeight || !dischargeHeight || !dischargeMuac || !outcomeIndicator || !dischargeEdema) {
      toast.error("Please fill all compulsory fields marked with *");
      return;
    }
    if (ifaGivenToMother === "0" || motherPayment === "0" || ifaSyrup === "0") {
      toast.error("Please select all Yes/No dropdowns");
      return;
    }
    if (!hemoglobinMother) {
        toast.error("Please enter Mother's Hemoglobin");
        return;
    }
    
    if (child?.AdmissionEdema && child.AdmissionEdema.trim() !== "No" && !minimumWeight) {
        toast.error("Please enter Minimum Weight");
        return;
    }

    setSubmitting(true);

    try {
      const payload = {
        SamNo: child?.SamNo,
        // ✅ Only send SAAMAR UUID if the child is SAAMAR registered
        uuidChild: child?.isSamarRegistered ? child.samarUuid : null, 
        DischargeDate: dischargeDate,
        DischargeWeight: parseFloat(dischargeWeight),
        DischargeHeight: parseFloat(dischargeHeight),
        DischargeMuac: parseFloat(dischargeMuac),
        DischargeZScore: parseFloat(dischargeZScore),
        DischargeEdema: parseInt(dischargeEdema),
        ExitIndicator: parseInt(outcomeIndicator),
        IFAToMotherTablet: parseInt(ifaGivenToMother),
        MotherWages: parseInt(motherPayment),
        IFAToMotherSyrup: parseInt(ifaSyrup),
        HemoglobinMother: parseFloat(hemoglobinMother),
        DischargeImage: null,
        TotalStay: parseInt(totalStay), 
        MinimumWeight: minimumWeight ? parseFloat(minimumWeight) : null
      };

      // Push to our backend (which will handle both local DB and SAAMAR sync)
      const res = await fetch(`/api/discharge-child/${childId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server returned an invalid format. Check your API route.");
      }

      const result = await res.json() as { success: boolean; saamarSynced?: boolean; message?: string };
      if (!res.ok) throw new Error(result.message || "Failed to save record");

      if (result.saamarSynced) {
        toast.success("Discharged Locally & Synced with SAAMAR State Registry!");
      } else {
        toast.success("Record Saved Locally!");
        if (child?.isSamarRegistered) {
          toast.error("Note: SAAMAR State Registry sync failed or is offline.", { duration: 5000 });
        }
      }

      setTimeout(() => router.push("/mtc-user/dashboard/discharge"), 2500);

    } catch (error) {
      const err = error as Error;
      toast.error(err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex items-center gap-3 text-blue-700 text-lg font-medium">
            <Loader2 className="animate-spin h-6 w-6" /> Loading details...
        </div>
      </div>
    );
  }

  if (!child) return null;

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6">
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto">
        <Card className="shadow-xl border-0 rounded-2xl overflow-hidden bg-white">
          <CardHeader className="bg-gradient-to-r from-blue-700 to-blue-500 px-8 py-6">
            <div className="flex items-center gap-3 text-white">
              <FileText className="h-6 w-6" />
              <h5 className="text-2xl font-bold m-0 tracking-tight">Child Discharge Form</h5>
            </div>
          </CardHeader>

          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-10">
                
              {/* --- SECTION 1: Read Only Details --- */}
              <div className="bg-slate-50/50 rounded-xl p-6 border border-slate-100">
                <div className="flex items-center justify-between mb-6">
                  <h6 className="flex items-center gap-2 text-sm font-bold text-blue-800 uppercase tracking-wider">
                    <User className="h-4 w-4" /> Admission Information
                  </h6>
                  {/* ✅ Display SAAMAR badge if applicable */}
                  {child.isSamarRegistered && (
                    <span className="bg-purple-100 text-purple-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-purple-200">
                      SAAMAR Active
                    </span>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    
                  {/* ✅ Conditionally show UUID only for SAAMAR Children */}
                  {child.isSamarRegistered && (
                    <div className="lg:col-span-4 bg-purple-50 p-4 rounded-xl border border-purple-100/50 mb-2">
                        <label className="text-xs font-bold text-purple-800 uppercase">SAAMAR Child UUID</label>
                        <Input value={child.samarUuid ?? ""} readOnly className="bg-white border-purple-200 text-purple-700 font-bold mt-1 focus-visible:ring-0" />
                    </div>
                  )}

                  <div>
                      <label className="text-xs font-semibold text-slate-500 uppercase">SAM Number</label>
                      <Input value={child.SamNo ?? ""} readOnly className="bg-slate-100 border-transparent text-slate-700 font-medium mt-1 focus-visible:ring-0" />
                  </div>
                  <div>
                      <label className="text-xs font-semibold text-slate-500 uppercase">Child Name</label>
                      <Input value={child.ChildName ?? ""} readOnly className="bg-slate-100 border-transparent text-slate-700 font-medium mt-1 focus-visible:ring-0" />
                  </div>
                  <div>
                      <label className="text-xs font-semibold text-slate-500 uppercase">Admission Date</label>
                      <div className="relative mt-1">
                          <Input value={child.AdmissionDate ? new Date(child.AdmissionDate).toLocaleDateString() : ""} readOnly className="bg-slate-100 border-transparent text-slate-700 font-medium pr-10 focus-visible:ring-0" />
                          <div className="absolute right-3 top-2.5 text-slate-400"><Calendar className="h-4 w-4" /></div>
                      </div>
                  </div>
                  <div>
                      <label className="text-xs font-semibold text-slate-500 uppercase">Adm. Weight (kg)</label>
                      <Input value={child.AdmissionWeight ?? ""} readOnly className="bg-slate-100 border-transparent text-slate-700 font-medium mt-1 focus-visible:ring-0" />
                  </div>
                  <div>
                      <label className="text-xs font-semibold text-slate-500 uppercase">Adm. Height (cm)</label>
                      <Input value={child.AdmissionHeight ?? ""} readOnly className="bg-slate-100 border-transparent text-slate-700 font-medium mt-1 focus-visible:ring-0" />
                  </div>
                  <div>
                      <label className="text-xs font-semibold text-slate-500 uppercase">Adm. Edema</label>
                      <Input value={child.AdmissionEdema ?? ""} readOnly className="bg-slate-100 border-transparent text-slate-700 font-medium mt-1 focus-visible:ring-0" />
                  </div>
                  <div>
                      <label className="text-xs font-semibold text-slate-500 uppercase">Adm. MUAC (cm)</label>
                      <Input value={child.AdmissionMuac ?? ""} readOnly className="bg-slate-100 border-transparent text-slate-700 font-medium mt-1 focus-visible:ring-0" />
                  </div>
                  <div>
                      <label className="text-xs font-semibold text-slate-500 uppercase">Target Weight (kg)</label>
                      <Input value={child.TargetWeight ?? ""} readOnly className="bg-slate-100 border-transparent text-slate-700 font-medium mt-1 focus-visible:ring-0" />
                  </div>
                </div>
              </div>

              {/* --- SECTION 2: Discharge Vitals --- */}
              <div>
                <h6 className="flex items-center gap-2 text-sm font-bold text-blue-800 uppercase tracking-wider mb-5 border-b pb-2">
                  <Activity className="h-4 w-4" /> Discharge Vitals
                </h6>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div>
                        <label className="text-sm font-medium text-slate-700">Discharge Date <span className="text-red-500">*</span></label>
                        <Input 
                            type="date" 
                            value={dischargeDate} 
                            onChange={handleDateChange} 
                            max={new Date().toISOString().split('T')[0]}
                            className="mt-1 focus-visible:ring-blue-500 border-slate-200" 
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-slate-700">Discharge Weight (kg) <span className="text-red-500">*</span></label>
                        <Input 
                            type="number" step="0.01" 
                            value={dischargeWeight} 
                            onChange={handleWeightChange} 
                            placeholder="Max 100"
                            className="mt-1 focus-visible:ring-blue-500 border-slate-200" 
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-slate-700">Discharge Height (cm) <span className="text-red-500">*</span></label>
                        <Input 
                            type="number" step="0.1" 
                            min="45" max="120"
                            value={dischargeHeight} 
                            onChange={handleHeightChange} 
                            placeholder="45cm - 120cm"
                            className="mt-1 focus-visible:ring-blue-500 border-slate-200" 
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-slate-700">Discharge MUAC (cm) <span className="text-red-500">*</span></label>
                        <Input 
                            type="number" step="0.1" 
                            value={dischargeMuac} 
                            onChange={(e) => setDischargeMuac(e.target.value)} 
                            className="mt-1 focus-visible:ring-blue-500 border-slate-200" 
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-slate-700">Z-Score (SD)</label>
                        <Input 
                            readOnly 
                            value={dischargeZScore} 
                            className={cn("mt-1 font-semibold focus:ring-0 cursor-not-allowed", dischargeZScore === "Error" ? "bg-red-50 text-red-600 border-red-200" : "bg-slate-100 text-blue-700 border-transparent")} 
                        />
                    </div>
                </div>
              </div>

              {/* --- SECTION 3: Outcomes & Medical Indicators --- */}
              <div>
                <h6 className="text-sm font-bold text-blue-800 uppercase tracking-wider mb-5 border-b pb-2">Outcomes & Medical Indicators</h6>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <div>
                        <label className="text-sm font-medium text-slate-700">Outcome Indicator <span className="text-red-500">*</span></label>
                        <Select value={outcomeIndicator} onValueChange={setOutcomeIndicator}>
                            <SelectTrigger className="mt-1 focus:ring-blue-500 border-slate-200"><SelectValue placeholder="Select" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1">CURED</SelectItem>
                                <SelectItem value="2">DEFAULTER</SelectItem>
                                <SelectItem value="3">MEDICAL TRANSFER</SelectItem>
                                <SelectItem value="4">NON RESPONDENT</SelectItem>
                                <SelectItem value="5">DEATH</SelectItem>
                                <SelectItem value="6">PARTIAL IMPROVEMENT</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-slate-700">Discharge EDEMA <span className="text-red-500">*</span></label>
                        <Select value={dischargeEdema} onValueChange={setDischargeEdema}>
                            <SelectTrigger className="mt-1 focus:ring-blue-500 border-slate-200"><SelectValue placeholder="Select" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="4">No Edema</SelectItem>
                                <SelectItem value="1">+</SelectItem>
                                <SelectItem value="2">++</SelectItem>
                                <SelectItem value="3">+++</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-slate-700">Adm. Hemoglobin (gm/dl)</label>
                        <Input value={child.AdmissionHemoglobin ?? "N/A"} readOnly className="bg-slate-100 border-transparent text-slate-700 font-medium mt-1 focus-visible:ring-0" />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-slate-700">Mother&apos;s Hb (gm/dl) <span className="text-red-500">*</span></label>
                        <Input 
                            type="number" step="0.1" 
                            value={hemoglobinMother} 
                            onChange={(e) => setHemoglobinMother(e.target.value)} 
                            className="mt-1 focus-visible:ring-blue-500 border-slate-200"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div>
                        <label className="text-sm font-medium text-slate-700">IFA Given To Mother <span className="text-red-500">*</span></label>
                        <Select value={ifaGivenToMother} onValueChange={setIfaGivenToMother}>
                            <SelectTrigger className="mt-1 focus:ring-blue-500 border-slate-200"><SelectValue placeholder="Select" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="0">Select</SelectItem>
                                <SelectItem value="1">Yes</SelectItem>
                                <SelectItem value="2">No</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-slate-700">Mother&apos;s Wage Comp. <span className="text-red-500">*</span></label>
                        <Select value={motherPayment} onValueChange={setMotherPayment}>
                            <SelectTrigger className="mt-1 focus:ring-blue-500 border-slate-200"><SelectValue placeholder="Select" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="0">Select</SelectItem>
                                <SelectItem value="1">Yes</SelectItem>
                                <SelectItem value="2">No</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-slate-700">IFA Syrup to Child <span className="text-red-500">*</span></label>
                        <Select value={ifaSyrup} onValueChange={setIfaSyrup}>
                            <SelectTrigger className="mt-1 focus:ring-blue-500 border-slate-200"><SelectValue placeholder="Select" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="0">Select</SelectItem>
                                <SelectItem value="1">Yes</SelectItem>
                                <SelectItem value="2">No</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
              </div>

              {/* --- SECTION 4: Conditional Edema Fields --- */}
              {child.AdmissionEdema && child.AdmissionEdema.trim() !== "No" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-amber-50 p-5 rounded-xl border border-amber-200 animate-in fade-in">
                      <div>
                          <label className="text-sm font-medium text-amber-900">Minimum Weight <span className="text-red-500">*</span></label>
                          <Input 
                              type="number" step="0.01" 
                              value={minimumWeight} 
                              onChange={(e) => setMinimumWeight(e.target.value)} 
                              className="mt-1 bg-white border-amber-300 focus-visible:ring-amber-500" 
                          />
                      </div>
                      <div>
                          <label className="text-sm font-medium text-amber-900">Total Stay (Days)</label>
                          <Input 
                              value={totalStay} 
                              readOnly 
                              className="mt-1 bg-amber-100 font-bold text-amber-900 border-transparent focus-visible:ring-0" 
                          />
                      </div>
                  </div>
              )}

              <div className="flex items-center space-x-3 bg-blue-50 p-5 rounded-xl border border-blue-100 mt-8 shadow-sm">
                <input 
                  type="checkbox" 
                  id="confirmUpdate" 
                  checked={isConfirmed} 
                  onChange={(e) => setIsConfirmed(e.target.checked)} 
                  className="h-5 w-5 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
                />
                <label htmlFor="confirmUpdate" className="text-sm font-semibold text-blue-900 cursor-pointer select-none">
                  I confirm that Daily Weight and Micronutrient details have been updated before discharge. <span className="text-red-500">*</span>
                </label>
              </div>

              {/* --- Footer Buttons --- */}
              <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t border-slate-100">
                  <Button 
                      type="button" 
                      variant="outline" 
                      className="border-slate-300 text-slate-700 hover:bg-slate-100 min-w-[120px]"
                      onClick={() => router.push("/mtc-user/dashboard/discharge")}
                  >
                      <X className="mr-2 h-4 w-4" /> Cancel
                  </Button>
                  <Button 
                      type="submit" 
                      disabled={submitting} 
                      className="bg-blue-600 hover:bg-blue-700 text-white min-w-[150px] shadow-md shadow-blue-500/20"
                  >
                      {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                      Submit Discharge
                  </Button>
              </div>

            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}