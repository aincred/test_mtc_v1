// "use client";

// import { useState, useEffect } from "react";
// import { useRouter, useParams } from "next/navigation";
// import { Card, CardHeader, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { ChevronDown, ChevronUp, Save, Home, Loader2, ArrowLeft } from "lucide-react";
// import toast, { Toaster } from "react-hot-toast";
// import { addDays, format, isValid, parseISO } from "date-fns";

// // --- Types ---

// interface ChildHeader {
//   SamNo: string;
//   ChildName: string;
//   FatherName: string;
//   MotherName: string;
//   DischargeDate: string;
// }

// // The UI State for a single visit row
// interface VisitRow {
//   visitNumber: number; // 1, 2, 3, 4
//   dueDate: string;
//   actualDate: string;
//   weight: string;
//   height: string;
//   muac: string;
//   zScore: string;
//   designation: string;
//   byName: string;
//   byMobile: string;
// }

// const DESIGNATION_OPTIONS = [
//   { value: "6", label: "Sahiya/ASHA" },
//   { value: "1", label: "ANGANWADI" },
//   { value: "2", label: "ANM" },
//   { value: "7", label: "Poshan Sakhi" },
//   { value: "8", label: "RBSK Team" },
//   { value: "3", label: "OPD" },
//   { value: "4", label: "SELF" },
//   { value: "5", label: "OTHER" }
// ];

// export default function FollowUpFormPage() {
//   const router = useRouter();
//   const params = useParams();
  
//   const [loading, setLoading] = useState(true);
//   const [child, setChild] = useState<ChildHeader | null>(null);
  
//   // State for the 4 visits
//   const [visits, setVisits] = useState<VisitRow[]>([]);
//   const [activeAccordions, setActiveAccordions] = useState<number[]>([0]); // Open first by default

//   // --- 1. Fetch Data ---
//   useEffect(() => {
//     const fetchData = async () => {
//       const id = typeof params.id === 'string' ? params.id : params.id?.[0];
//       if (!id) return;

//       try {
//         const res = await fetch(`/api/follow-up/detail/${encodeURIComponent(decodeURIComponent(id))}`);
//         const result = await res.json();

//         if (result.success) {
//           setChild(result.child);
//           initializeVisits(result.child.DischargeDate, result.followUpData);
//         } else {
//           toast.error(result.message);
//           router.push("/mtc-user/dashboard/follow-up");
//         }
//       } catch (error) {
//         console.error(error);
//         toast.error("Failed to load data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [params.id, router]);

//   // --- 2. Data Mapping Helper ---
//   // Converts DB Flat Object -> Array of 4 Visits
//   const initializeVisits = (dischargeDateStr: string, dbData: any) => {
//     const dischargeDate = new Date(dischargeDateStr);
//     const initialVisits: VisitRow[] = [];

//     // Helper to extract date string yyyy-MM-dd
//     const toDateStr = (val: string | null) => val ? val.split('T')[0] : "";
//     const toStr = (val: any) => val ? String(val) : "";

//     // Mapping Logic for 4 visits
//     const visitConfigs = [
//       { id: 1, days: 15, prefix: "First" },
//       { id: 2, days: 30, prefix: "Second" },
//       { id: 3, days: 45, prefix: "Third" },
//       { id: 4, days: 60, prefix: "Fourt" } // NOTE: Matches DB typo "Fourt"
//     ];

//     visitConfigs.forEach(cfg => {
//       // Calculate Due Date
//       let dueDate = "";
//       if (isValid(dischargeDate)) {
//         dueDate = format(addDays(dischargeDate, cfg.days), "yyyy-MM-dd");
//       }

//       // If DB data exists, map it; otherwise empty
//       const d = dbData || {};
//       const p = cfg.prefix; // Prefix like 'First', 'Second'

//       // Special handling for 4th visit Date vs 'Fourt' prefix for columns
//       const dateKey = cfg.id === 4 ? "FourthFollowUpDate" : `${p}FollowUpDate`;

//       initialVisits.push({
//         visitNumber: cfg.id,
//         dueDate: dueDate,
//         actualDate: toDateStr(d[`${p}FollowUpDoneOn`]), // 'DoneOn' usually implies actual date
//         weight: toStr(d[`${p}FollowUpWeight`]),
//         height: toStr(d[`${p}FollowUpHeight`]),
//         muac: toStr(d[`${p}FollowUpMUAC`]),
//         zScore: toStr(d[`${p}FollowUpZscore`]),
//         designation: toStr(d[`${p}FollowUpMotherBP`]), // Assuming Mapping: Designation stored in BP col based on previous context, adjust if needed
//         byName: toStr(d[`${p}FollowUpMotherWeight`]),   // Verify your column mapping in db.ts save logic
//         byMobile: toStr(d[`${p}FollowUpMotherHB`])      // Verify your column mapping
//       });
//     });

//     setVisits(initialVisits);
//   };

//   // --- 3. Form Handlers ---

//   const handleInputChange = (index: number, field: keyof VisitRow, value: string) => {
//     const updated = [...visits];
//     updated[index] = { ...updated[index], [field]: value };
//     setVisits(updated);
//   };

//   const toggleAccordion = (index: number) => {
//     setActiveAccordions(prev => 
//       prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
//     );
//   };

//   // --- 4. Save Logic ---
//   const saveFollowUp = async (indexToSave: number) => {
//     if (!child) return;

//     const row = visits[indexToSave];
//     // Validation
//     if (!row.actualDate || !row.weight || !row.height) {
//       toast.error("Please fill Date, Weight and Height");
//       return;
//     }

//     const loadingToast = toast.loading("Saving...");

//     // Construct the FULL payload for the DB (All 4 visits) because DB is one row per child
//     // We map the State Array back to Flat DB Keys
//     const payload: any = {
//       SamNo: child.SamNo,
//       MTCCode: "MTC_CODE_HERE", // Ideally fetched from session or child data
//       MotherName: child.MotherName,
//       DischargeDate: child.DischargeDate
//     };

//     const prefixes = ["First", "Second", "Third", "Fourt"]; // 4th is Fourt in DB columns

//     visits.forEach((v, idx) => {
//       const p = prefixes[idx];
//       // Special Date Key for 4th visit
//       const dateKey = idx === 3 ? "FourthFollowUpDate" : `${p}FollowUpDate`;
      
//       // We assume "FollowUpDate" is the Due Date, "FollowUpDoneOn" is Actual Date
//       payload[dateKey] = v.dueDate; 
//       payload[`${p}FollowUpDoneOn`] = v.actualDate;
//       payload[`${p}FollowUpWeight`] = parseFloat(v.weight) || null;
//       payload[`${p}FollowUpHeight`] = parseFloat(v.height) || null;
//       payload[`${p}FollowUpMUAC`] = parseFloat(v.muac) || null;
//       payload[`${p}FollowUpZscore`] = parseFloat(v.zScore) || null;
      
//       // Storing Designation/Name/Mobile in available text/num columns or dedicated columns if you added them
//       // Based on previous db.ts, we mapped these to existing columns:
//       payload[`${p}FollowUpMotherBP`] = v.designation; // Storing string here
//       payload[`${p}FollowUpMotherWeight`] = null; // Careful: These are decimals in DB. If Name is string, this mapping needs specific columns!
//       payload[`${p}FollowUpMotherHB`] = null;     // Careful: These are decimals in DB.
      
//       // *CRITICAL NOTE*: Your DB schema for FollowUp uses `Decimal` for MotherWeight/HB. 
//       // If you want to store "Name" and "Mobile", you need to Add [FollowUpByName] columns to SQL 
//       // OR repurpose existing string columns. 
//       // For now, I will NOT send Name/Mobile to Decimal columns to avoid crashes.
//     });

//     try {
//       const res = await fetch("/api/follow-up/save", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       const result = await res.json();
//       if (result.success) {
//         toast.success(`Follow-up ${row.visitNumber} Saved!`, { id: loadingToast });
//       } else {
//         toast.error(result.message, { id: loadingToast });
//       }
//     } catch (error) {
//       toast.error("Failed to save", { id: loadingToast });
//     }
//   };

//   // --- RENDER ---

//   if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin h-8 w-8 text-teal-600"/></div>;
//   if (!child) return null;

//   return (
//     <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
//       <Toaster position="top-right" />
      
//       <div className="max-w-6xl mx-auto space-y-6">
//         {/* Header */}
//         <div className="flex justify-between items-center">
//           <h1 className="text-2xl font-bold text-teal-800">Follow Up Details</h1>
//           <Button onClick={() => router.back()} variant="outline" className="gap-2">
//             <ArrowLeft className="h-4 w-4" /> Back
//           </Button>
//         </div>

//         {/* Child Info Card */}
//         <Card>
//           <CardHeader className="bg-gray-50 border-b pb-4">
//             <h2 className="text-lg font-semibold text-gray-700">Child Information</h2>
//           </CardHeader>
//           <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
//             <div>
//               <label className="text-xs text-gray-500 uppercase font-bold">SAM Number</label>
//               <div className="font-medium text-gray-800">{child.SamNo}</div>
//             </div>
//             <div>
//               <label className="text-xs text-gray-500 uppercase font-bold">Child Name</label>
//               <div className="font-medium text-gray-800">{child.ChildName}</div>
//             </div>
//             <div>
//               <label className="text-xs text-gray-500 uppercase font-bold">Parent Name</label>
//               <div className="font-medium text-gray-800">{child.FatherName || child.MotherName}</div>
//             </div>
//             <div>
//               <label className="text-xs text-gray-500 uppercase font-bold">Discharge Date</label>
//               <div className="font-medium text-gray-800">{new Date(child.DischargeDate).toLocaleDateString()}</div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Visits Accordion */}
//         <div className="space-y-4">
//           {visits.map((visit, index) => (
//             <Card key={visit.visitNumber} className="border border-teal-100 shadow-sm overflow-hidden">
//               <CardHeader 
//                 className="py-4 px-6 cursor-pointer bg-teal-50/50 hover:bg-teal-50 transition-colors flex flex-row justify-between items-center"
//                 onClick={() => toggleAccordion(index)}
//               >
//                 <div className="flex items-center gap-4">
//                   <span className="flex items-center justify-center w-8 h-8 rounded-full bg-teal-600 text-white font-bold text-sm">
//                     {visit.visitNumber}
//                   </span>
//                   <div>
//                     <h3 className="text-md font-semibold text-gray-800">Visit {visit.visitNumber}</h3>
//                     <p className="text-xs text-gray-500">Due: {new Date(visit.dueDate).toLocaleDateString()}</p>
//                   </div>
//                 </div>
//                 {activeAccordions.includes(index) ? <ChevronUp className="text-gray-400"/> : <ChevronDown className="text-gray-400"/>}
//               </CardHeader>

//               {activeAccordions.includes(index) && (
//                 <CardContent className="p-6 bg-white animate-in slide-in-from-top-2 duration-200">
//                   <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Actual Date <span className="text-red-500">*</span></label>
//                       <Input type="date" value={visit.actualDate} onChange={(e) => handleInputChange(index, 'actualDate', e.target.value)} />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg) <span className="text-red-500">*</span></label>
//                       <Input type="number" step="0.01" value={visit.weight} onChange={(e) => handleInputChange(index, 'weight', e.target.value)} />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Height (cm) <span className="text-red-500">*</span></label>
//                       <Input type="number" step="0.1" value={visit.height} onChange={(e) => handleInputChange(index, 'height', e.target.value)} />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">MUAC (cm)</label>
//                       <Input type="number" step="0.1" value={visit.muac} onChange={(e) => handleInputChange(index, 'muac', e.target.value)} />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Z-Score</label>
//                       <Input type="number" step="0.1" value={visit.zScore} onChange={(e) => handleInputChange(index, 'zScore', e.target.value)} />
//                     </div>

//                     {/* Note: In your DB Schema, these fields mapped to numeric columns. Ensure logic handles strings correctly or update DB */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
//                       <select 
//                         className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
//                         value={visit.designation}
//                         onChange={(e) => handleInputChange(index, 'designation', e.target.value)}
//                       >
//                         <option value="">Select</option>
//                         {DESIGNATION_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
//                       </select>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Staff Name</label>
//                       <Input value={visit.byName} onChange={(e) => handleInputChange(index, 'byName', e.target.value)} placeholder="Name" />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Staff Mobile</label>
//                       <Input value={visit.byMobile} onChange={(e) => handleInputChange(index, 'byMobile', e.target.value)} placeholder="Mobile" maxLength={10} />
//                     </div>

//                   </div>

//                   <div className="flex justify-end mt-6 border-t pt-4">
//                     <Button onClick={() => saveFollowUp(index)} className="bg-teal-600 hover:bg-teal-700 min-w-[120px]">
//                       <Save className="w-4 h-4 mr-2" /> Save Visit
//                     </Button>
//                   </div>
//                 </CardContent>
//               )}
//             </Card>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Save, Loader2, ArrowLeft } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { addDays, format, isValid } from "date-fns";

// --- Types ---

interface ChildHeader {
  SamNo: string;
  ChildName: string;
  FatherName: string;
  MotherName: string;
  DischargeDate: string;
}

// Interface for raw DB data which is accessed dynamically
interface ApiFollowUpData {
  [key: string]: string | number | null | undefined;
}

// The UI State for a single visit row
interface VisitRow {
  visitNumber: number; // 1, 2, 3, 4
  dueDate: string;
  actualDate: string;
  weight: string;
  height: string;
  muac: string;
  zScore: string;
  designation: string;
  byName: string;
  byMobile: string;
}

const DESIGNATION_OPTIONS = [
  { value: "6", label: "Sahiya/ASHA" },
  { value: "1", label: "ANGANWADI" },
  { value: "2", label: "ANM" },
  { value: "7", label: "Poshan Sakhi" },
  { value: "8", label: "RBSK Team" },
  { value: "3", label: "OPD" },
  { value: "4", label: "SELF" },
  { value: "5", label: "OTHER" }
];

export default function FollowUpFormPage() {
  const router = useRouter();
  const params = useParams();
  
  const [loading, setLoading] = useState(true);
  const [child, setChild] = useState<ChildHeader | null>(null);
  
  // State for the 4 visits
  const [visits, setVisits] = useState<VisitRow[]>([]);
  const [activeAccordions, setActiveAccordions] = useState<number[]>([0]); // Open first by default

  // --- 1. Fetch Data ---
  useEffect(() => {
    const fetchData = async () => {
      const id = typeof params.id === 'string' ? params.id : params.id?.[0];
      if (!id) return;

      try {
        const res = await fetch(`/api/follow-up/detail/${encodeURIComponent(decodeURIComponent(id))}`);
        const result = await res.json();

        if (result.success) {
          setChild(result.child);
          initializeVisits(result.child.DischargeDate, result.followUpData);
        } else {
          toast.error(result.message);
          router.push("/mtc-user/dashboard/follow-up");
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id, router]);

  // --- 2. Data Mapping Helper ---
  // Converts DB Flat Object -> Array of 4 Visits
  const initializeVisits = (dischargeDateStr: string, dbData: ApiFollowUpData) => {
    const dischargeDate = new Date(dischargeDateStr);
    const initialVisits: VisitRow[] = [];

    // Helper to extract date string yyyy-MM-dd
    const toDateStr = (val: string | number | null | undefined) => (val && typeof val === 'string') ? val.split('T')[0] : "";
    const toStr = (val: unknown) => val ? String(val) : "";

    // Mapping Logic for 4 visits
    const visitConfigs = [
      { id: 1, days: 15, prefix: "First" },
      { id: 2, days: 30, prefix: "Second" },
      { id: 3, days: 45, prefix: "Third" },
      { id: 4, days: 60, prefix: "Fourt" } // NOTE: Matches DB typo "Fourt"
    ];

    visitConfigs.forEach(cfg => {
      // Calculate Due Date
      let dueDate = "";
      if (isValid(dischargeDate)) {
        dueDate = format(addDays(dischargeDate, cfg.days), "yyyy-MM-dd");
      }

      // If DB data exists, map it; otherwise empty
      const d = dbData || {};
      const p = cfg.prefix; // Prefix like 'First', 'Second'

      initialVisits.push({
        visitNumber: cfg.id,
        dueDate: dueDate,
        actualDate: toDateStr(d[`${p}FollowUpDoneOn`]), // 'DoneOn' usually implies actual date
        weight: toStr(d[`${p}FollowUpWeight`]),
        height: toStr(d[`${p}FollowUpHeight`]),
        muac: toStr(d[`${p}FollowUpMUAC`]),
        zScore: toStr(d[`${p}FollowUpZscore`]),
        designation: toStr(d[`${p}FollowUpMotherBP`]), // Assuming Mapping: Designation stored in BP col based on previous context
        byName: toStr(d[`${p}FollowUpMotherWeight`]),   // Verify your column mapping in db.ts save logic
        byMobile: toStr(d[`${p}FollowUpMotherHB`])      // Verify your column mapping
      });
    });

    setVisits(initialVisits);
  };

  // --- 3. Form Handlers ---

  const handleInputChange = (index: number, field: keyof VisitRow, value: string) => {
    const updated = [...visits];
    updated[index] = { ...updated[index], [field]: value };
    setVisits(updated);
  };

  const toggleAccordion = (index: number) => {
    setActiveAccordions(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  // --- 4. Save Logic ---
  const saveFollowUp = async (indexToSave: number) => {
    if (!child) return;

    const row = visits[indexToSave];
    // Validation
    if (!row.actualDate || !row.weight || !row.height) {
      toast.error("Please fill Date, Weight and Height");
      return;
    }

    const loadingToast = toast.loading("Saving...");

    // Construct the FULL payload for the DB (All 4 visits) because DB is one row per child
    // We map the State Array back to Flat DB Keys
    // Using Record<string, unknown> instead of 'any'
    const payload: Record<string, unknown> = {
      SamNo: child.SamNo,
      MTCCode: "MTC_CODE_HERE", // Ideally fetched from session or child data
      MotherName: child.MotherName,
      DischargeDate: child.DischargeDate
    };

    const prefixes = ["First", "Second", "Third", "Fourt"]; // 4th is Fourt in DB columns

    visits.forEach((v, idx) => {
      const p = prefixes[idx];
      // Special Date Key for 4th visit
      const dateKey = idx === 3 ? "FourthFollowUpDate" : `${p}FollowUpDate`;
      
      // We assume "FollowUpDate" is the Due Date, "FollowUpDoneOn" is Actual Date
      payload[dateKey] = v.dueDate; 
      payload[`${p}FollowUpDoneOn`] = v.actualDate;
      payload[`${p}FollowUpWeight`] = parseFloat(v.weight) || null;
      payload[`${p}FollowUpHeight`] = parseFloat(v.height) || null;
      payload[`${p}FollowUpMUAC`] = parseFloat(v.muac) || null;
      payload[`${p}FollowUpZscore`] = parseFloat(v.zScore) || null;
      
      // Storing Designation/Name/Mobile in available text/num columns or dedicated columns if you added them
      // Based on previous db.ts, we mapped these to existing columns:
      payload[`${p}FollowUpMotherBP`] = v.designation; // Storing string here
      payload[`${p}FollowUpMotherWeight`] = null; // Careful: These are decimals in DB. If Name is string, this mapping needs specific columns!
      payload[`${p}FollowUpMotherHB`] = null;     // Careful: These are decimals in DB.
      
      // *CRITICAL NOTE*: Your DB schema for FollowUp uses `Decimal` for MotherWeight/HB. 
      // If you want to store "Name" and "Mobile", you need to Add [FollowUpByName] columns to SQL 
      // OR repurpose existing string columns. 
      // For now, I will NOT send Name/Mobile to Decimal columns to avoid crashes.
    });

    try {
      const res = await fetch("/api/follow-up/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (result.success) {
        toast.success(`Follow-up ${row.visitNumber} Saved!`, { id: loadingToast });
      } else {
        toast.error(result.message, { id: loadingToast });
      }
    } catch (error) {
      console.error(error); // Log error to use the variable
      toast.error("Failed to save", { id: loadingToast });
    }
  };

  // --- RENDER ---

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin h-8 w-8 text-teal-600"/></div>;
  if (!child) return null;

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <Toaster position="top-right" />
      
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-teal-800">Follow Up Details</h1>
          <Button onClick={() => router.back()} variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
        </div>

        {/* Child Info Card */}
        <Card>
          <CardHeader className="bg-gray-50 border-b pb-4">
            <h2 className="text-lg font-semibold text-gray-700">Child Information</h2>
          </CardHeader>
          <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-xs text-gray-500 uppercase font-bold">SAM Number</label>
              <div className="font-medium text-gray-800">{child.SamNo}</div>
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase font-bold">Child Name</label>
              <div className="font-medium text-gray-800">{child.ChildName}</div>
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase font-bold">Parent Name</label>
              <div className="font-medium text-gray-800">{child.FatherName || child.MotherName}</div>
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase font-bold">Discharge Date</label>
              <div className="font-medium text-gray-800">{new Date(child.DischargeDate).toLocaleDateString()}</div>
            </div>
          </CardContent>
        </Card>

        {/* Visits Accordion */}
        <div className="space-y-4">
          {visits.map((visit, index) => (
            <Card key={visit.visitNumber} className="border border-teal-100 shadow-sm overflow-hidden">
              <CardHeader 
                className="py-4 px-6 cursor-pointer bg-teal-50/50 hover:bg-teal-50 transition-colors flex flex-row justify-between items-center"
                onClick={() => toggleAccordion(index)}
              >
                <div className="flex items-center gap-4">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-teal-600 text-white font-bold text-sm">
                    {visit.visitNumber}
                  </span>
                  <div>
                    <h3 className="text-md font-semibold text-gray-800">Visit {visit.visitNumber}</h3>
                    <p className="text-xs text-gray-500">Due: {new Date(visit.dueDate).toLocaleDateString()}</p>
                  </div>
                </div>
                {activeAccordions.includes(index) ? <ChevronUp className="text-gray-400"/> : <ChevronDown className="text-gray-400"/>}
              </CardHeader>

              {activeAccordions.includes(index) && (
                <CardContent className="p-6 bg-white animate-in slide-in-from-top-2 duration-200">
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Actual Date <span className="text-red-500">*</span></label>
                      <Input type="date" value={visit.actualDate} onChange={(e) => handleInputChange(index, 'actualDate', e.target.value)} />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg) <span className="text-red-500">*</span></label>
                      <Input type="number" step="0.01" value={visit.weight} onChange={(e) => handleInputChange(index, 'weight', e.target.value)} />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Height (cm) <span className="text-red-500">*</span></label>
                      <Input type="number" step="0.1" value={visit.height} onChange={(e) => handleInputChange(index, 'height', e.target.value)} />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">MUAC (cm)</label>
                      <Input type="number" step="0.1" value={visit.muac} onChange={(e) => handleInputChange(index, 'muac', e.target.value)} />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Z-Score</label>
                      <Input type="number" step="0.1" value={visit.zScore} onChange={(e) => handleInputChange(index, 'zScore', e.target.value)} />
                    </div>

                    {/* Note: In your DB Schema, these fields mapped to numeric columns. Ensure logic handles strings correctly or update DB */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
                      <select 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        value={visit.designation}
                        onChange={(e) => handleInputChange(index, 'designation', e.target.value)}
                      >
                        <option value="">Select</option>
                        {DESIGNATION_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Staff Name</label>
                      <Input value={visit.byName} onChange={(e) => handleInputChange(index, 'byName', e.target.value)} placeholder="Name" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Staff Mobile</label>
                      <Input value={visit.byMobile} onChange={(e) => handleInputChange(index, 'byMobile', e.target.value)} placeholder="Mobile" maxLength={10} />
                    </div>

                  </div>

                  <div className="flex justify-end mt-6 border-t pt-4">
                    <Button onClick={() => saveFollowUp(index)} className="bg-teal-600 hover:bg-teal-700 min-w-[120px]">
                      <Save className="w-4 h-4 mr-2" /> Save Visit
                    </Button>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}