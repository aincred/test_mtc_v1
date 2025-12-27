// "use client";

// import { useState, useEffect } from "react";
// import { useRouter, useParams } from "next/navigation";
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
// import { Home, Save, X, CheckCircle, Loader2, ArrowRight } from "lucide-react";
// import Image from "next/image";
// import toast, { Toaster } from "react-hot-toast";
// import { differenceInDays, parseISO, isValid } from "date-fns";

// // Interface for Child Data (from DB)
// interface ChildData {
//   SamNo: string;
//   ChildName: string;
//   FatherName: string;
//   MotherName: string;
//   AdmissionDate: string;
//   AdmissionWeight: number;
//   AdmissionHeight: number;
//   AdmissionEdema: string; // "No", "++", etc.
//   AdmissionMuac: number;
//   TargetWeight: number;
//   AdmissionHemoglobin: number;
// }

// export default function DischargeFormPage() {
//   const router = useRouter();
//   const params = useParams();
  
//   // --- State Management ---
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [child, setChild] = useState<ChildData | null>(null);
  
//   // Form Fields
//   const [dischargeDate, setDischargeDate] = useState(new Date().toISOString().split('T')[0]);
//   const [dischargeWeight, setDischargeWeight] = useState("");
//   const [dischargeHeight, setDischargeHeight] = useState("");
//   const [dischargeMuac, setDischargeMuac] = useState("");
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

//   // Photo
//   const [photoPreview, setPhotoPreview] = useState<string>("");

//   // --- 1. Fetch Child Data ---
//   useEffect(() => {
//     const fetchChild = async () => {
//       const id = typeof params.id === 'string' ? params.id : params.id?.[0];
//       if (!id) return;

//       try {
//         const decodedId = decodeURIComponent(id);
//         const res = await fetch(`/api/child/${encodeURIComponent(decodedId)}`);
//         const result = await res.json();

//         if (result.success && result.data) {
//           setChild(result.data);
//           // Initial calculation for total stay based on today
//           if (result.data.AdmissionDate) {
//              calculateTotalStay(result.data.AdmissionDate, new Date().toISOString().split('T')[0]);
//           }
//         } else {
//           toast.error("Child not found");
//           router.push("/mtc-user/dashboard/discharge");
//         }
//       } catch (error) {
//         toast.error("Error loading data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchChild();
//   }, [params.id, router]);

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
//         setDischargeDate(""); // Reset
//         setTotalStay("0");
//       } else {
//         calculateTotalStay(child.AdmissionDate, newDate);
//       }
//     }
//   };

//   // Validations (Height > 150, Weight > 100)
//   const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const val = parseFloat(e.target.value);
//     if (val > 100) {
//       toast.error("Weight cannot be greater than 100kg");
//       setDischargeWeight("");
//     } else {
//       setDischargeWeight(e.target.value);
//     }
//   };

//   const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const val = parseFloat(e.target.value);
//     if (val > 150) {
//       toast.error("Height cannot be greater than 150cm");
//       setDischargeHeight("");
//     } else {
//       setDischargeHeight(e.target.value);
//     }
//   };

//   // Photo Upload (Max 2MB)
//   const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
      
//       // Validation: Type
//       if (!["image/jpeg", "image/png"].includes(file.type)) {
//         toast.error("Please upload a valid image file (JPEG/PNG)");
//         e.target.value = "";
//         return;
//       }

//       // Validation: Size (2MB = 2048 KB)
//       if (file.size > 2 * 1024 * 1024) {
//         toast.error("Please upload file size Less than 2 MB");
//         e.target.value = "";
//         return;
//       }

//       const reader = new FileReader();
//       reader.onload = () => setPhotoPreview(reader.result as string);
//       reader.readAsDataURL(file);
//     }
//   };

//   // --- 3. Submit Handler ---
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // Required Field Validations
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
//     // Conditional Validation for Edema
//     if (child?.AdmissionEdema !== "No" && !minimumWeight) {
//         toast.error("Please enter Minimum Weight");
//         return;
//     }

//     setSubmitting(true);

//     try {
//       const payload = {
//         SamNo: child?.SamNo,
//         DischargeDate: dischargeDate,
//         DischargeWeight: parseFloat(dischargeWeight),
//         DischargeHeight: parseFloat(dischargeHeight),
//         DischargeMuac: parseFloat(dischargeMuac),
//         DischargeEdema: parseInt(dischargeEdema),
//         ExitIndicator: parseInt(outcomeIndicator),
//         IFAToMotherTablet: parseInt(ifaGivenToMother),
//         MotherWages: parseInt(motherPayment),
//         IFAToMotherSyrup: parseInt(ifaSyrup),
//         HemoglobinMother: parseFloat(hemoglobinMother),
//         DischargeImage: photoPreview || null,
//         // Include calculated fields if your API needs them
//         TotalStay: parseInt(totalStay), 
//         MinimumWeight: minimumWeight ? parseFloat(minimumWeight) : null
//       };

//       const res = await fetch("/api/discharge-child", {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       const result = await res.json();

//       if (!res.ok) throw new Error(result.message || "Failed to save");

//       toast.success("Record Saved Successfully!");
      
//       // Optional: Redirect to Next Step (Follow Up) Logic
//       setTimeout(() => {
//          router.push("/mtc-user/dashboard/discharge");
//       }, 2000);

//     } catch (error: any) {
//       console.error(error);
//       toast.error(error.message || "Something went wrong");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   // --- RENDER ---

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//         <div className="flex items-center gap-2 text-teal-700">
//             <Loader2 className="animate-spin h-6 w-6" /> Loading...
//         </div>
//       </div>
//     );
//   }

//   if (!child) return null;

//   return (
//     <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6">
//       <Toaster position="top-right" />
      
//       <div className="max-w-7xl mx-auto">
//         <Card className="shadow-lg border-0 rounded-xl overflow-hidden">
          
//           {/* Header */}
//           <CardHeader className="bg-white border-b px-6 py-4">
//             <h5 className="text-xl font-bold text-teal-700 m-0">Child Discharge</h5>
//           </CardHeader>

//           <CardContent className="p-6 bg-gray-50/30">
//             <form onSubmit={handleSubmit}>
                
//                 {/* --- SECTION 1: Read Only Details --- */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
//                     <div>
//                         <label className="text-xs font-semibold text-gray-500 uppercase">SAM Number</label>
//                         <Input value={child.SamNo} readOnly className="bg-gray-100 font-medium mt-1" />
//                     </div>
//                     <div>
//                         <label className="text-xs font-semibold text-gray-500 uppercase">Child Name</label>
//                         <Input value={child.ChildName} readOnly className="bg-gray-100 font-medium mt-1" />
//                     </div>
//                     <div>
//                         <label className="text-xs font-semibold text-gray-500 uppercase">Admission Date</label>
//                         <div className="relative mt-1">
//                             <Input value={new Date(child.AdmissionDate).toLocaleDateString()} readOnly className="bg-gray-100 font-medium pr-10" />
//                             <div className="absolute right-3 top-2.5 text-gray-400"><i className="fas fa-calendar"></i></div>
//                         </div>
//                     </div>
//                     <div>
//                         <label className="text-xs font-semibold text-gray-500 uppercase">Admission Weight</label>
//                         <Input value={child.AdmissionWeight} readOnly className="bg-gray-100 font-medium mt-1" />
//                     </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 border-b pb-8">
//                     <div>
//                         <label className="text-xs font-semibold text-gray-500 uppercase">Admission Height (cm)</label>
//                         <Input value={child.AdmissionHeight} readOnly className="bg-gray-100 font-medium mt-1" />
//                     </div>
//                     <div>
//                         <label className="text-xs font-semibold text-gray-500 uppercase">Admission Edema</label>
//                         <Input value={child.AdmissionEdema} readOnly className="bg-gray-100 font-medium mt-1" />
//                     </div>
//                     <div>
//                         <label className="text-xs font-semibold text-gray-500 uppercase">Admission MUAC (cm)</label>
//                         <Input value={child.AdmissionMuac} readOnly className="bg-gray-100 font-medium mt-1" />
//                     </div>
//                     <div>
//                         <label className="text-xs font-semibold text-gray-500 uppercase">Target Weight (kg)</label>
//                         <Input value={child.TargetWeight} readOnly className="bg-gray-100 font-medium mt-1" />
//                     </div>
//                 </div>

//                 {/* --- SECTION 2: Discharge Vitals --- */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
//                     <div>
//                         <label className="text-sm font-medium text-gray-700">Discharge Date <span className="text-red-500">*</span></label>
//                         <Input 
//                             type="date" 
//                             value={dischargeDate} 
//                             onChange={handleDateChange} 
//                             max={new Date().toISOString().split('T')[0]}
//                             className="mt-1" 
//                         />
//                     </div>
//                     <div>
//                         <label className="text-sm font-medium text-gray-700">Discharge Weight (kg) <span className="text-red-500">*</span></label>
//                         <Input 
//                             type="number" step="0.01" 
//                             value={dischargeWeight} 
//                             onChange={handleWeightChange} 
//                             placeholder="Max 100"
//                             className="mt-1" 
//                         />
//                     </div>
//                     <div>
//                         <label className="text-sm font-medium text-gray-700">Discharge Height (cm) <span className="text-red-500">*</span></label>
//                         <Input 
//                             type="number" step="0.1" 
//                             value={dischargeHeight} 
//                             onChange={handleHeightChange} 
//                             placeholder="Max 150"
//                             className="mt-1" 
//                         />
//                     </div>
//                     <div>
//                         <label className="text-sm font-medium text-gray-700">Discharge MUAC (cm) <span className="text-red-500">*</span></label>
//                         <Input 
//                             type="number" step="0.1" 
//                             value={dischargeMuac} 
//                             onChange={(e) => setDischargeMuac(e.target.value)} 
//                             className="mt-1" 
//                         />
//                     </div>
//                 </div>

//                 {/* --- SECTION 3: Photo Upload --- */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//                     <div>
//                         <label className="text-sm font-medium text-gray-700 block mb-2">Upload Photo (max 2MB, png/jpeg only)</label>
//                         <div className="flex gap-4 items-start">
//                             <Input 
//                                 type="file" 
//                                 accept="image/png, image/jpeg" 
//                                 onChange={handlePhotoChange} 
//                                 className="cursor-pointer file:text-teal-700 file:font-semibold"
//                             />
//                         </div>
//                     </div>
//                     <div className="flex justify-center md:justify-start">
//                         {photoPreview ? (
//                             <Image 
//                                 src={photoPreview} 
//                                 alt="Child" 
//                                 width={240} 
//                                 height={140} 
//                                 className="rounded-lg shadow-sm border object-cover h-[140px] w-60" 
//                             />
//                         ) : (
//                             <div className="h-[140px] w-60 bg-gray-100 rounded-lg border-2 border-dashed flex items-center justify-center text-gray-400">
//                                 <span className="text-sm">No Image</span>
//                             </div>
//                         )}
//                     </div>
//                 </div>

//                 {/* --- SECTION 4: Outcomes & Medical --- */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
//                     <div>
//                         <label className="text-sm font-medium text-gray-700">Outcome Indicator <span className="text-red-500">*</span></label>
//                         <Select value={outcomeIndicator} onValueChange={setOutcomeIndicator}>
//                             <SelectTrigger className="mt-1"><SelectValue placeholder="Select" /></SelectTrigger>
//                             <SelectContent>
//                                 <SelectItem value="1">CURED</SelectItem>
//                                 <SelectItem value="2">DEFAULTER</SelectItem>
//                                 <SelectItem value="3">MEDICAL TRANSFER</SelectItem>
//                                 <SelectItem value="4">NON RESPONDENT</SelectItem>
//                                 <SelectItem value="5">DEATH</SelectItem>
//                                 <SelectItem value="6">PARTIAL IMPROVEMENT</SelectItem>
//                             </SelectContent>
//                         </Select>
//                     </div>
//                     <div>
//                         <label className="text-sm font-medium text-gray-700">Discharge EDEMA <span className="text-red-500">*</span></label>
//                         <Select value={dischargeEdema} onValueChange={setDischargeEdema}>
//                             <SelectTrigger className="mt-1"><SelectValue placeholder="Select" /></SelectTrigger>
//                             <SelectContent>
//                                 <SelectItem value="4">No Edema</SelectItem>
//                                 <SelectItem value="1">+</SelectItem>
//                                 <SelectItem value="2">++</SelectItem>
//                                 <SelectItem value="3">+++</SelectItem>
//                             </SelectContent>
//                         </Select>
//                     </div>
//                     <div>
//                         <label className="text-sm font-medium text-gray-700">Adm. Hemoglobin (gm/dl)</label>
//                         <Input value={child.AdmissionHemoglobin || "N/A"} readOnly className="bg-gray-100 font-medium mt-1" />
//                     </div>
//                     <div>
//                         <label className="text-sm font-medium text-gray-700">Mother's Hb (gm/dl) <span className="text-red-500">*</span></label>
//                         <Input 
//                             type="number" step="0.1" 
//                             value={hemoglobinMother} 
//                             onChange={(e) => setHemoglobinMother(e.target.value)} 
//                             className="mt-1"
//                         />
//                     </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
//                     <div>
//                         <label className="text-sm font-medium text-gray-700">IFA Given To Mother <span className="text-red-500">*</span></label>
//                         <Select value={ifaGivenToMother} onValueChange={setIfaGivenToMother}>
//                             <SelectTrigger className="mt-1"><SelectValue placeholder="Select" /></SelectTrigger>
//                             <SelectContent>
//                                 <SelectItem value="0">Select</SelectItem>
//                                 <SelectItem value="1">Yes</SelectItem>
//                                 <SelectItem value="2">No</SelectItem>
//                             </SelectContent>
//                         </Select>
//                     </div>
//                     <div>
//                         <label className="text-sm font-medium text-gray-700">Mother's Wage Comp. <span className="text-red-500">*</span></label>
//                         <Select value={motherPayment} onValueChange={setMotherPayment}>
//                             <SelectTrigger className="mt-1"><SelectValue placeholder="Select" /></SelectTrigger>
//                             <SelectContent>
//                                 <SelectItem value="0">Select</SelectItem>
//                                 <SelectItem value="1">Yes</SelectItem>
//                                 <SelectItem value="2">No</SelectItem>
//                             </SelectContent>
//                         </Select>
//                     </div>
//                     <div>
//                         <label className="text-sm font-medium text-gray-700">IFA Syrup to Child <span className="text-red-500">*</span></label>
//                         <Select value={ifaSyrup} onValueChange={setIfaSyrup}>
//                             <SelectTrigger className="mt-1"><SelectValue placeholder="Select" /></SelectTrigger>
//                             <SelectContent>
//                                 <SelectItem value="0">Select</SelectItem>
//                                 <SelectItem value="1">Yes</SelectItem>
//                                 <SelectItem value="2">No</SelectItem>
//                             </SelectContent>
//                         </Select>
//                     </div>
//                 </div>

//                 {/* --- SECTION 5: Conditional Edema Fields --- */}
//                 {child.AdmissionEdema && child.AdmissionEdema.trim() !== "No" && (
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-yellow-50 p-4 rounded-md border border-yellow-100 mb-6 animate-in fade-in">
//                         <div>
//                             <label className="text-sm font-medium text-gray-700">Minimum Weight <span className="text-red-500">*</span></label>
//                             <Input 
//                                 type="number" step="0.01" 
//                                 value={minimumWeight} 
//                                 onChange={(e) => setMinimumWeight(e.target.value)} 
//                                 className="mt-1 border-yellow-300 focus-visible:ring-yellow-400" 
//                             />
//                         </div>
//                         <div>
//                             <label className="text-sm font-medium text-gray-700">Total Stay (Days)</label>
//                             <Input 
//                                 value={totalStay} 
//                                 readOnly 
//                                 className="bg-yellow-100 font-bold mt-1 text-gray-700 border-yellow-300" 
//                             />
//                         </div>
//                     </div>
//                 )}

//                 {/* --- Footer Buttons --- */}
//                 <div className="flex flex-col sm:flex-row justify-end gap-3 mt-8 pt-6 border-t">
//                     <Button 
//                         type="submit" 
//                         disabled={submitting} 
//                         className="bg-linear-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white min-w-[140px]"
//                     >
//                         {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
//                         Submit
//                     </Button>
                    
//                     <Button 
//                         type="button" 
//                         variant="outline" 
//                         className="border-teal-200 text-teal-700 hover:bg-teal-50"
//                         onClick={() => router.push("/mtc-user/dashboard/discharge")}
//                     >
//                         <X className="mr-2 h-4 w-4" /> Cancel
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

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
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
import { Save, X, Loader2 } from "lucide-react"; // Removed unused icons
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { differenceInDays, isValid } from "date-fns"; // Removed parseISO

// Interface for Child Data (from DB)
interface ChildData {
  SamNo: string;
  ChildName: string;
  FatherName: string;
  MotherName: string;
  AdmissionDate: string;
  AdmissionWeight: number;
  AdmissionHeight: number;
  AdmissionEdema: string; // "No", "++", etc.
  AdmissionMuac: number;
  TargetWeight: number;
  AdmissionHemoglobin: number;
}

export default function DischargeFormPage() {
  const router = useRouter();
  const params = useParams();
  
  // --- State Management ---
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [child, setChild] = useState<ChildData | null>(null);
  
  // Form Fields
  const [dischargeDate, setDischargeDate] = useState(new Date().toISOString().split('T')[0]);
  const [dischargeWeight, setDischargeWeight] = useState("");
  const [dischargeHeight, setDischargeHeight] = useState("");
  const [dischargeMuac, setDischargeMuac] = useState("");
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

  // Photo
  const [photoPreview, setPhotoPreview] = useState<string>("");

  // --- 1. Fetch Child Data ---
  useEffect(() => {
    const fetchChild = async () => {
      const id = typeof params.id === 'string' ? params.id : params.id?.[0];
      if (!id) return;

      try {
        const decodedId = decodeURIComponent(id);
        const res = await fetch(`/api/child/${encodeURIComponent(decodedId)}`);
        const result = await res.json();

        if (result.success && result.data) {
          setChild(result.data);
          // Initial calculation for total stay based on today
          if (result.data.AdmissionDate) {
             calculateTotalStay(result.data.AdmissionDate, new Date().toISOString().split('T')[0]);
          }
        } else {
          toast.error("Child not found");
          router.push("/mtc-user/dashboard/discharge");
        }
      } catch (error) {
        console.error("Fetch error:", error); // Used variable to satisfy linter
        toast.error("Error loading data");
      } finally {
        setLoading(false);
      }
    };

    fetchChild();
  }, [params.id, router]);

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
        setDischargeDate(""); // Reset
        setTotalStay("0");
      } else {
        calculateTotalStay(child.AdmissionDate, newDate);
      }
    }
  };

  // Validations (Height > 150, Weight > 100)
  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (val > 100) {
      toast.error("Weight cannot be greater than 100kg");
      setDischargeWeight("");
    } else {
      setDischargeWeight(e.target.value);
    }
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (val > 150) {
      toast.error("Height cannot be greater than 150cm");
      setDischargeHeight("");
    } else {
      setDischargeHeight(e.target.value);
    }
  };

  // Photo Upload (Max 2MB)
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validation: Type
      if (!["image/jpeg", "image/png"].includes(file.type)) {
        toast.error("Please upload a valid image file (JPEG/PNG)");
        e.target.value = "";
        return;
      }

      // Validation: Size (2MB = 2048 KB)
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Please upload file size Less than 2 MB");
        e.target.value = "";
        return;
      }

      const reader = new FileReader();
      reader.onload = () => setPhotoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // --- 3. Submit Handler ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Required Field Validations
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
    // Conditional Validation for Edema
    if (child?.AdmissionEdema !== "No" && !minimumWeight) {
        toast.error("Please enter Minimum Weight");
        return;
    }

    setSubmitting(true);

    try {
      const payload = {
        SamNo: child?.SamNo,
        DischargeDate: dischargeDate,
        DischargeWeight: parseFloat(dischargeWeight),
        DischargeHeight: parseFloat(dischargeHeight),
        DischargeMuac: parseFloat(dischargeMuac),
        DischargeEdema: parseInt(dischargeEdema),
        ExitIndicator: parseInt(outcomeIndicator),
        IFAToMotherTablet: parseInt(ifaGivenToMother),
        MotherWages: parseInt(motherPayment),
        IFAToMotherSyrup: parseInt(ifaSyrup),
        HemoglobinMother: parseFloat(hemoglobinMother),
        DischargeImage: photoPreview || null,
        // Include calculated fields if your API needs them
        TotalStay: parseInt(totalStay), 
        MinimumWeight: minimumWeight ? parseFloat(minimumWeight) : null
      };

      const res = await fetch("/api/discharge-child", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.message || "Failed to save");

      toast.success("Record Saved Successfully!");
      
      // Optional: Redirect to Next Step (Follow Up) Logic
      setTimeout(() => {
         router.push("/mtc-user/dashboard/discharge");
      }, 2000);

    } catch (error: unknown) { // Use unknown instead of any
      console.error(error);
      const errorMessage = error instanceof Error ? error.message : "Something went wrong";
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  // --- RENDER ---

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="flex items-center gap-2 text-teal-700">
            <Loader2 className="animate-spin h-6 w-6" /> Loading...
        </div>
      </div>
    );
  }

  if (!child) return null;

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6">
      <Toaster position="top-right" />
      
      <div className="max-w-7xl mx-auto">
        <Card className="shadow-lg border-0 rounded-xl overflow-hidden">
          
          {/* Header */}
          <CardHeader className="bg-white border-b px-6 py-4">
            <h5 className="text-xl font-bold text-teal-700 m-0">Child Discharge</h5>
          </CardHeader>

          <CardContent className="p-6 bg-gray-50/30">
            <form onSubmit={handleSubmit}>
                
                {/* --- SECTION 1: Read Only Details --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase">SAM Number</label>
                        <Input value={child.SamNo} readOnly className="bg-gray-100 font-medium mt-1" />
                    </div>
                    <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase">Child Name</label>
                        <Input value={child.ChildName} readOnly className="bg-gray-100 font-medium mt-1" />
                    </div>
                    <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase">Admission Date</label>
                        <div className="relative mt-1">
                            <Input value={new Date(child.AdmissionDate).toLocaleDateString()} readOnly className="bg-gray-100 font-medium pr-10" />
                            <div className="absolute right-3 top-2.5 text-gray-400"><i className="fas fa-calendar"></i></div>
                        </div>
                    </div>
                    <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase">Admission Weight</label>
                        <Input value={child.AdmissionWeight} readOnly className="bg-gray-100 font-medium mt-1" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 border-b pb-8">
                    <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase">Admission Height (cm)</label>
                        <Input value={child.AdmissionHeight} readOnly className="bg-gray-100 font-medium mt-1" />
                    </div>
                    <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase">Admission Edema</label>
                        <Input value={child.AdmissionEdema} readOnly className="bg-gray-100 font-medium mt-1" />
                    </div>
                    <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase">Admission MUAC (cm)</label>
                        <Input value={child.AdmissionMuac} readOnly className="bg-gray-100 font-medium mt-1" />
                    </div>
                    <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase">Target Weight (kg)</label>
                        <Input value={child.TargetWeight} readOnly className="bg-gray-100 font-medium mt-1" />
                    </div>
                </div>

                {/* --- SECTION 2: Discharge Vitals --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <div>
                        <label className="text-sm font-medium text-gray-700">Discharge Date <span className="text-red-500">*</span></label>
                        <Input 
                            type="date" 
                            value={dischargeDate} 
                            onChange={handleDateChange} 
                            max={new Date().toISOString().split('T')[0]}
                            className="mt-1" 
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700">Discharge Weight (kg) <span className="text-red-500">*</span></label>
                        <Input 
                            type="number" step="0.01" 
                            value={dischargeWeight} 
                            onChange={handleWeightChange} 
                            placeholder="Max 100"
                            className="mt-1" 
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700">Discharge Height (cm) <span className="text-red-500">*</span></label>
                        <Input 
                            type="number" step="0.1" 
                            value={dischargeHeight} 
                            onChange={handleHeightChange} 
                            placeholder="Max 150"
                            className="mt-1" 
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700">Discharge MUAC (cm) <span className="text-red-500">*</span></label>
                        <Input 
                            type="number" step="0.1" 
                            value={dischargeMuac} 
                            onChange={(e) => setDischargeMuac(e.target.value)} 
                            className="mt-1" 
                        />
                    </div>
                </div>

                {/* --- SECTION 3: Photo Upload --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                        <label className="text-sm font-medium text-gray-700 block mb-2">Upload Photo (max 2MB, png/jpeg only)</label>
                        <div className="flex gap-4 items-start">
                            <Input 
                                type="file" 
                                accept="image/png, image/jpeg" 
                                onChange={handlePhotoChange} 
                                className="cursor-pointer file:text-teal-700 file:font-semibold"
                            />
                        </div>
                    </div>
                    <div className="flex justify-center md:justify-start">
                        {photoPreview ? (
                            <Image 
                                src={photoPreview} 
                                alt="Child" 
                                width={240} 
                                height={140} 
                                className="rounded-lg shadow-sm border object-cover h-[140px] w-60" 
                            />
                        ) : (
                            <div className="h-[140px] w-60 bg-gray-100 rounded-lg border-2 border-dashed flex items-center justify-center text-gray-400">
                                <span className="text-sm">No Image</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* --- SECTION 4: Outcomes & Medical --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <div>
                        <label className="text-sm font-medium text-gray-700">Outcome Indicator <span className="text-red-500">*</span></label>
                        <Select value={outcomeIndicator} onValueChange={setOutcomeIndicator}>
                            <SelectTrigger className="mt-1"><SelectValue placeholder="Select" /></SelectTrigger>
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
                        <label className="text-sm font-medium text-gray-700">Discharge EDEMA <span className="text-red-500">*</span></label>
                        <Select value={dischargeEdema} onValueChange={setDischargeEdema}>
                            <SelectTrigger className="mt-1"><SelectValue placeholder="Select" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="4">No Edema</SelectItem>
                                <SelectItem value="1">+</SelectItem>
                                <SelectItem value="2">++</SelectItem>
                                <SelectItem value="3">+++</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700">Adm. Hemoglobin (gm/dl)</label>
                        <Input value={child.AdmissionHemoglobin || "N/A"} readOnly className="bg-gray-100 font-medium mt-1" />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700">Mother&apos;s Hb (gm/dl) <span className="text-red-500">*</span></label>
                        <Input 
                            type="number" step="0.1" 
                            value={hemoglobinMother} 
                            onChange={(e) => setHemoglobinMother(e.target.value)} 
                            className="mt-1"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                    <div>
                        <label className="text-sm font-medium text-gray-700">IFA Given To Mother <span className="text-red-500">*</span></label>
                        <Select value={ifaGivenToMother} onValueChange={setIfaGivenToMother}>
                            <SelectTrigger className="mt-1"><SelectValue placeholder="Select" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="0">Select</SelectItem>
                                <SelectItem value="1">Yes</SelectItem>
                                <SelectItem value="2">No</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700">Mother&apos;s Wage Comp. <span className="text-red-500">*</span></label>
                        <Select value={motherPayment} onValueChange={setMotherPayment}>
                            <SelectTrigger className="mt-1"><SelectValue placeholder="Select" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="0">Select</SelectItem>
                                <SelectItem value="1">Yes</SelectItem>
                                <SelectItem value="2">No</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700">IFA Syrup to Child <span className="text-red-500">*</span></label>
                        <Select value={ifaSyrup} onValueChange={setIfaSyrup}>
                            <SelectTrigger className="mt-1"><SelectValue placeholder="Select" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="0">Select</SelectItem>
                                <SelectItem value="1">Yes</SelectItem>
                                <SelectItem value="2">No</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* --- SECTION 5: Conditional Edema Fields --- */}
                {child.AdmissionEdema && child.AdmissionEdema.trim() !== "No" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-yellow-50 p-4 rounded-md border border-yellow-100 mb-6 animate-in fade-in">
                        <div>
                            <label className="text-sm font-medium text-gray-700">Minimum Weight <span className="text-red-500">*</span></label>
                            <Input 
                                type="number" step="0.01" 
                                value={minimumWeight} 
                                onChange={(e) => setMinimumWeight(e.target.value)} 
                                className="mt-1 border-yellow-300 focus-visible:ring-yellow-400" 
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700">Total Stay (Days)</label>
                            <Input 
                                value={totalStay} 
                                readOnly 
                                className="bg-yellow-100 font-bold mt-1 text-gray-700 border-yellow-300" 
                            />
                        </div>
                    </div>
                )}

                {/* --- Footer Buttons --- */}
                <div className="flex flex-col sm:flex-row justify-end gap-3 mt-8 pt-6 border-t">
                    <Button 
                        type="submit" 
                        disabled={submitting} 
                        className="bg-linear-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white min-w-[140px]"
                    >
                        {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                        Submit
                    </Button>
                    
                    <Button 
                        type="button" 
                        variant="outline" 
                        className="border-teal-200 text-teal-700 hover:bg-teal-50"
                        onClick={() => router.push("/mtc-user/dashboard/discharge")}
                    >
                        <X className="mr-2 h-4 w-4" /> Cancel
                    </Button>
                </div>

            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}