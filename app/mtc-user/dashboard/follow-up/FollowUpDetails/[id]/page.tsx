// // // "use client";

// // // import { useState, useEffect, use } from "react";
// // // import { useRouter } from "next/navigation";
// // // import { Card, CardHeader, CardContent } from "@/components/ui/card";
// // // import { Input } from "@/components/ui/input";
// // // import { Button } from "@/components/ui/button";
// // // import { 
// // //   ArrowLeft, Save, User, CalendarClock, Activity, 
// // //   Phone, ChevronDown, ChevronUp, CheckCircle2, PlusCircle, Loader2
// // // } from "lucide-react";
// // // import toast, { Toaster } from "react-hot-toast";

// // // interface FollowUpData {
// // //   visitNumber: number;
// // //   actualDate: string;
// // //   weight: string;
// // //   height: string;
// // //   muac: string;
// // //   zScore?: string;
// // //   designation?: string;
// // //   followedBy: string;
// // //   mobile?: string;
// // // }

// // // export default function FollowUpDetailsPage({ params }: { params: Promise<{ id: string }> }) {
// // //   const router = useRouter();
// // //   const { id: childId } = use(params); // Next.js 15 Fix
  
// // //   // --- STATE ---
// // //   const [loading, setLoading] = useState(true);
// // //   const [submitting, setSubmitting] = useState(false);
// // //   const [isFormOpen, setIsFormOpen] = useState(true);
// // //   const [expandedSavedId, setExpandedSavedId] = useState<number | null>(null);

// // //   // Patient Info from DB
// // //   const [patientData, setPatientData] = useState({
// // //     samNumber: "",
// // //     childName: "",
// // //     recordId: childId,
// // //     dischargeDate: "",
// // //     dueDate: "Calculating...",
// // //   });

// // //   // Completed Visits from DB
// // //   const [savedFollowUps, setSavedFollowUps] = useState<FollowUpData[]>([]);

// // //   // Form State
// // //   const [formData, setFormData] = useState({
// // //     actualDate: new Date().toISOString().split('T')[0],
// // //     weight: "",
// // //     height: "",
// // //     muac: "",
// // //     zScore: "",
// // //     designation: "",
// // //     followedBy: "",
// // //     mobile: ""
// // //   });

// // //   const currentVisitNumber = savedFollowUps.length + 1;
// // //   const maxVisits = 4;

// // //   // --- 1. FETCH DATA ---
// // //   useEffect(() => {
// // //     const fetchDetails = async () => {
// // //       try {
// // //         const response = await fetch(`/api/follow-up/${childId}`);
// // //         if (!response.ok) throw new Error("Failed to fetch");
        
// // //         const data = await response.json();
        
// // //         // Map completed visits
// // //         const mappedVisits = data.visits.map((v: any) => ({
// // //            visitNumber: v.visit_number,
// // //            actualDate: new Date(v.actual_date).toLocaleDateString(),
// // //            weight: v.weight_kg,
// // //            height: v.height_cm,
// // //            muac: v.muac_cm,
// // //            followedBy: v.followed_by_name
// // //         }));

// // //         setSavedFollowUps(mappedVisits);

// // //         // Calculate Due Date based on current visit number
// // //         const nextVisit = mappedVisits.length + 1;
// // //         let dueDateString = "N/A";
        
// // //         if (data.child.discharge_date) {
// // //             const discharge = new Date(data.child.discharge_date);
// // //             const due = new Date(discharge);
            
// // //             if (nextVisit === 1) due.setDate(due.getDate() + 15);
// // //             else if (nextVisit === 2) due.setMonth(due.getMonth() + 1);
// // //             else if (nextVisit === 3) due.setMonth(due.getMonth() + 2);
// // //             else if (nextVisit === 4) due.setMonth(due.getMonth() + 3);

// // //             dueDateString = due.toLocaleDateString();
// // //         }

// // //         setPatientData({
// // //           recordId: childId,
// // //           samNumber: data.child.sam_no || "N/A",
// // //           childName: data.child.child_full_name || "Unknown",
// // //           dischargeDate: data.child.discharge_date || "",
// // //           dueDate: dueDateString
// // //         });

// // //       } catch (error) {
// // //         toast.error("Failed to load patient history.");
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchDetails();
// // //   }, [childId]);

// // //   // --- HANDLERS ---
// // //   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
// // //     const { name, value } = e.target;
// // //     if (['weight', 'height', 'muac'].includes(name) && value !== "" && isNaN(Number(value))) return;
// // //     if (name === 'mobile' && value.length > 10) return;
// // //     setFormData(prev => ({ ...prev, [name]: value }));
// // //   };

// // //   const handleSave = async (e: React.FormEvent) => {
// // //     e.preventDefault();
    
// // //     if (!formData.actualDate || !formData.weight || !formData.height || !formData.designation || !formData.followedBy || !formData.mobile) {
// // //       toast.error("Please fill in all required fields marked with *");
// // //       return;
// // //     }

// // //     setSubmitting(true);

// // //     try {
// // //       const payload = {
// // //         ...formData,
// // //         visitNumber: currentVisitNumber,
// // //         weight: parseFloat(formData.weight),
// // //         height: parseFloat(formData.height),
// // //         muac: formData.muac ? parseFloat(formData.muac) : null,
// // //         designation: parseInt(formData.designation)
// // //       };

// // //       const response = await fetch(`/api/follow-up/${childId}`, {
// // //         method: 'POST',
// // //         headers: { 'Content-Type': 'application/json' },
// // //         body: JSON.stringify(payload)
// // //       });

// // //       if (!response.ok) {
// // //         const errorData = await response.json();
// // //         throw new Error(errorData.error || "Failed to save");
// // //       }

// // //       toast.success(`Follow-up ${currentVisitNumber} saved successfully!`);
      
// // //       // Update UI optimistically
// // //       setSavedFollowUps(prev => [...prev, {
// // //         ...formData,
// // //         visitNumber: currentVisitNumber,
// // //         actualDate: new Date(formData.actualDate).toLocaleDateString()
// // //       }]);
      
// // //       setFormData({
// // //         actualDate: new Date().toISOString().split('T')[0],
// // //         weight: "", height: "", muac: "", zScore: "",
// // //         designation: "", followedBy: "", mobile: ""
// // //       });
      
// // //       setExpandedSavedId(null); 
// // //     } catch (error: any) {
// // //       toast.error(error.message);
// // //     } finally {
// // //       setSubmitting(false);
// // //     }
// // //   };

// // //   const toggleSavedAccordion = (visitNum: number) => {
// // //     setExpandedSavedId(expandedSavedId === visitNum ? null : visitNum);
// // //   };

// // //   // --- RENDER ---
// // //   if (loading) {
// // //     return (
// // //       <div className="min-h-screen bg-slate-50 flex items-center justify-center">
// // //         <Loader2 className="animate-spin h-8 w-8 text-blue-600 mb-4" />
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8 font-sans">
// // //       <Toaster position="top-right" />

// // //       <div className="max-w-5xl mx-auto space-y-6">
        
// // //         {/* Header */}
// // //         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
// // //           <div>
// // //             <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">Child Follow Up</h1>
// // //             <p className="text-sm text-slate-500 font-medium mt-0.5">Record and update patient follow-up details</p>
// // //           </div>
// // //           <Button onClick={() => router.back()} variant="outline" className="bg-white shadow-sm">
// // //             <ArrowLeft className="mr-2 h-4 w-4" /> Back to List
// // //           </Button>
// // //         </div>

// // //         {/* Top Patient Info Card */}
// // //         <Card className="border border-slate-200 shadow-sm rounded-xl overflow-hidden bg-white">
// // //           <CardContent className="p-6">
// // //             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
// // //               <div>
// // //                 <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 block">Record Number</label>
// // //                 <div className="font-semibold text-slate-900 bg-slate-50 px-3 py-2 rounded-md border border-slate-100">
// // //                   {patientData.recordId}
// // //                 </div>
// // //               </div>
// // //               <div>
// // //                 <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 block">SAM Number</label>
// // //                 <div className="font-semibold text-blue-700 bg-blue-50 px-3 py-2 rounded-md border border-blue-100">
// // //                   {patientData.samNumber}
// // //                 </div>
// // //               </div>
// // //               <div className="sm:col-span-2">
// // //                 <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 block">Child Name</label>
// // //                 <div className="font-semibold text-slate-900 bg-slate-50 px-3 py-2 rounded-md border border-slate-100 flex items-center gap-2">
// // //                   <User className="w-4 h-4 text-slate-400" />
// // //                   {patientData.childName}
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </CardContent>
// // //         </Card>

// // //         {/* --- COMPLETED FOLLOW-UPS --- */}
// // //         {savedFollowUps.length > 0 && (
// // //           <div className="space-y-4">
// // //             <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 mt-8">
// // //               <CheckCircle2 className="w-5 h-5 text-green-600" /> Completed Visits
// // //             </h2>
            
// // //             {savedFollowUps.map((visit) => (
// // //               <Card key={visit.visitNumber} className="border border-green-200 shadow-sm rounded-xl overflow-hidden bg-green-50/40 transition-all">
// // //                 <button 
// // //                   onClick={() => toggleSavedAccordion(visit.visitNumber)}
// // //                   className="w-full flex items-center justify-between p-4 hover:bg-green-100/50 transition-colors"
// // //                 >
// // //                   <div className="flex items-center gap-3">
// // //                     <div className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-sm">
// // //                       {visit.visitNumber}
// // //                     </div>
// // //                     <div className="text-left">
// // //                       <h3 className="text-md font-bold text-slate-800">Follow-up Visit {visit.visitNumber}</h3>
// // //                       <p className="text-xs text-slate-500 font-medium">Completed on {visit.actualDate}</p>
// // //                     </div>
// // //                   </div>
// // //                   {expandedSavedId === visit.visitNumber ? <ChevronUp className="w-5 h-5 text-slate-500" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
// // //                 </button>

// // //                 {expandedSavedId === visit.visitNumber && (
// // //                   <CardContent className="p-6 border-t border-green-100 bg-white">
// // //                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
// // //                       <div>
// // //                         <span className="block text-xs font-bold text-slate-500 uppercase mb-1">Weight</span>
// // //                         <span className="font-semibold text-slate-900 bg-slate-50 px-2 py-1 rounded border border-slate-100">{visit.weight} kg</span>
// // //                       </div>
// // //                       <div>
// // //                         <span className="block text-xs font-bold text-slate-500 uppercase mb-1">Height</span>
// // //                         <span className="font-semibold text-slate-900 bg-slate-50 px-2 py-1 rounded border border-slate-100">{visit.height} cm</span>
// // //                       </div>
// // //                       <div>
// // //                         <span className="block text-xs font-bold text-slate-500 uppercase mb-1">MUAC</span>
// // //                         <span className="font-semibold text-slate-900 bg-slate-50 px-2 py-1 rounded border border-slate-100">{visit.muac || "N/A"}</span>
// // //                       </div>
// // //                       <div>
// // //                         <span className="block text-xs font-bold text-slate-500 uppercase mb-1">Staff</span>
// // //                         <span className="font-semibold text-slate-900 bg-slate-50 px-2 py-1 rounded border border-slate-100">{visit.followedBy}</span>
// // //                       </div>
// // //                     </div>
// // //                   </CardContent>
// // //                 )}
// // //               </Card>
// // //             ))}
// // //           </div>
// // //         )}

// // //         {/* --- PENDING FOLLOW-UP FORM --- */}
// // //         {currentVisitNumber <= maxVisits ? (
// // //           <form onSubmit={handleSave} className="space-y-6 pt-4">
// // //             <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 mt-4">
// // //               <PlusCircle className="w-5 h-5 text-blue-600" /> Record Next Visit
// // //             </h2>

// // //             <Card className="border border-blue-200 shadow-md rounded-xl overflow-hidden bg-white transition-all ring-2 ring-blue-50">
// // //               <button 
// // //                 type="button"
// // //                 onClick={() => setIsFormOpen(!isFormOpen)}
// // //                 className="w-full flex items-center justify-between p-5 bg-blue-50/50 hover:bg-blue-50 transition-colors border-b border-blue-100"
// // //               >
// // //                 <div className="flex items-center gap-3">
// // //                   <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-sm ring-4 ring-blue-100">
// // //                     {currentVisitNumber}
// // //                   </div>
// // //                   <h2 className="text-lg font-bold text-blue-950">Follow-up Visit {currentVisitNumber}</h2>
// // //                 </div>
// // //                 {isFormOpen ? <ChevronUp className="w-5 h-5 text-blue-600" /> : <ChevronDown className="w-5 h-5 text-blue-600" />}
// // //               </button>

// // //               {isFormOpen && (
// // //                 <CardContent className="p-6">
// // //                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    
// // //                     {/* Scheduling Info */}
// // //                     <div className="space-y-1.5">
// // //                       <label className="text-sm font-semibold text-slate-700">Calculated Due Date</label>
// // //                       <div className="relative">
// // //                         <Input value={patientData.dueDate} readOnly className="bg-slate-50 border-slate-200 text-slate-500 pl-9" />
// // //                         <CalendarClock className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
// // //                       </div>
// // //                     </div>

// // //                     <div className="space-y-1.5">
// // //                       <label className="text-sm font-semibold text-slate-700">Actual Date <span className="text-red-500">*</span></label>
// // //                       <Input 
// // //                         type="date" 
// // //                         name="actualDate" 
// // //                         value={formData.actualDate} 
// // //                         onChange={handleInputChange} 
// // //                         className="border-slate-300 focus-visible:ring-blue-600" 
// // //                         required 
// // //                       />
// // //                     </div>

// // //                     <div className="hidden lg:block"></div>

// // //                     {/* Vitals Section */}
// // //                     <div className="col-span-full mt-2 border-t border-slate-100 pt-5">
// // //                       <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2 mb-4">
// // //                         <Activity className="w-4 h-4 text-blue-500" /> Vitals & Measurements
// // //                       </h3>
// // //                     </div>

// // //                     <div className="space-y-1.5">
// // //                       <label className="text-sm font-semibold text-slate-700">Weight (kg) <span className="text-red-500">*</span></label>
// // //                       <Input 
// // //                         type="text" 
// // //                         name="weight" 
// // //                         value={formData.weight} 
// // //                         onChange={handleInputChange} 
// // //                         placeholder="e.g. 8.5"
// // //                         className="border-slate-300 focus-visible:ring-blue-600" 
// // //                         required 
// // //                       />
// // //                     </div>

// // //                     <div className="space-y-1.5">
// // //                       <label className="text-sm font-semibold text-slate-700">Length/Height (cm) <span className="text-red-500">*</span></label>
// // //                       <Input 
// // //                         type="text" 
// // //                         name="height" 
// // //                         value={formData.height} 
// // //                         onChange={handleInputChange} 
// // //                         placeholder="e.g. 75.2"
// // //                         className="border-slate-300 focus-visible:ring-blue-600" 
// // //                         required 
// // //                       />
// // //                     </div>

// // //                     <div className="space-y-1.5">
// // //                       <label className="text-sm font-semibold text-slate-700">MUAC (cm)</label>
// // //                       <Input 
// // //                         type="text" 
// // //                         name="muac" 
// // //                         value={formData.muac} 
// // //                         onChange={handleInputChange} 
// // //                         placeholder="e.g. 11.5"
// // //                         className="border-slate-300 focus-visible:ring-blue-600" 
// // //                       />
// // //                     </div>

// // //                     {/* Staff Details Section */}
// // //                     <div className="col-span-full mt-2 border-t border-slate-100 pt-5">
// // //                       <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2 mb-4">
// // //                         <User className="w-4 h-4 text-blue-500" /> Followed Up By
// // //                       </h3>
// // //                     </div>

// // //                     <div className="space-y-1.5">
// // //                       <label className="text-sm font-semibold text-slate-700">Designation <span className="text-red-500">*</span></label>
// // //                       <select 
// // //                         name="designation"
// // //                         value={formData.designation}
// // //                         onChange={handleInputChange}
// // //                         className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
// // //                         required
// // //                       >
// // //                         <option value="">Select Designation</option>
// // //                         <option value="1">ANGANWADI</option>
// // //                         <option value="2">ANM</option>
// // //                         <option value="6">Sahiya/ASHA</option>
// // //                         <option value="3">OPD</option>
// // //                         <option value="7">Poshan Sakhi</option>
// // //                         <option value="8">RBSK Team</option>
// // //                         <option value="4">SELF</option>
// // //                         <option value="5">OTHER</option>
// // //                       </select>
// // //                     </div>

// // //                     <div className="space-y-1.5">
// // //                       <label className="text-sm font-semibold text-slate-700">Staff Name <span className="text-red-500">*</span></label>
// // //                       <Input 
// // //                         type="text" 
// // //                         name="followedBy" 
// // //                         value={formData.followedBy} 
// // //                         onChange={handleInputChange} 
// // //                         placeholder="Enter name"
// // //                         className="border-slate-300 focus-visible:ring-blue-600" 
// // //                         required 
// // //                       />
// // //                     </div>

// // //                     <div className="space-y-1.5">
// // //                       <label className="text-sm font-semibold text-slate-700">Mobile Number <span className="text-red-500">*</span></label>
// // //                       <div className="relative">
// // //                         <Input 
// // //                           type="text" 
// // //                           name="mobile" 
// // //                           value={formData.mobile} 
// // //                           onChange={handleInputChange} 
// // //                           placeholder="10-digit number"
// // //                           className="border-slate-300 pl-9 focus-visible:ring-blue-600" 
// // //                           required 
// // //                         />
// // //                         <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
// // //                       </div>
// // //                     </div>

// // //                   </div>
// // //                 </CardContent>
// // //               )}
// // //             </Card>

// // //             <div className="flex items-center justify-end gap-3 pt-4">
// // //               <Button type="button" variant="outline" onClick={() => router.back()} className="px-6 border-slate-300 text-slate-700 hover:bg-slate-100">
// // //                 Cancel
// // //               </Button>
// // //               <Button type="submit" disabled={submitting} className="px-8 bg-blue-600 hover:bg-blue-700 text-white shadow-md">
// // //                 {submitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />} 
// // //                 {submitting ? "Saving..." : `Save Follow-up ${currentVisitNumber}`}
// // //               </Button>
// // //             </div>
// // //           </form>
// // //         ) : (
// // //           /* --- ALL DONE SUCCESS STATE --- */
// // //           <div className="bg-emerald-50 text-emerald-900 p-8 rounded-xl border border-emerald-200 text-center mt-8 shadow-sm flex flex-col items-center">
// // //             <div className="bg-emerald-100 p-4 rounded-full mb-4">
// // //               <CheckCircle2 className="w-12 h-12 text-emerald-600" />
// // //             </div>
// // //             <h3 className="text-2xl font-bold tracking-tight">Protocol Complete</h3>
// // //             <p className="text-emerald-700 font-medium mt-2 max-w-md">
// // //               This patient has successfully completed all {maxVisits} standard SAM follow-up visits.
// // //             </p>
// // //             <Button onClick={() => router.push("/mtc-user/dashboard/follow-up")} className="mt-6 bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm">
// // //               Return to Patient List
// // //             </Button>
// // //           </div>
// // //         )}

// // //       </div>
// // //     </div>
// // //   );
// // // }

// // "use client";

// // import { useState, useEffect, use } from "react";
// // import { useRouter } from "next/navigation";
// // import { Card, CardHeader, CardContent } from "@/components/ui/card";
// // import { Input } from "@/components/ui/input";
// // import { Button } from "@/components/ui/button";
// // import { 
// //   ArrowLeft, Save, User, CalendarClock, Activity, 
// //   Phone, ChevronDown, ChevronUp, CheckCircle2, PlusCircle, Loader2
// // } from "lucide-react";
// // import toast, { Toaster } from "react-hot-toast";

// // interface FollowUpData {
// //   visitNumber: number;
// //   actualDate: string;
// //   weight: string;
// //   height: string;
// //   muac: string;
// //   zScore?: string;
// //   designation?: string;
// //   followedBy: string;
// //   mobile?: string;
// // }

// // export default function FollowUpDetailsPage({ params }: { params: Promise<{ id: string }> }) {
// //   const router = useRouter();
// //   const { id: childId } = use(params); // Next.js 15 Fix
  
// //   // --- STATE ---
// //   const [loading, setLoading] = useState(true);
// //   const [submitting, setSubmitting] = useState(false);
// //   const [isFormOpen, setIsFormOpen] = useState(true);
// //   const [expandedSavedId, setExpandedSavedId] = useState<number | null>(null);

// //   // Patient Info from DB
// //   const [patientData, setPatientData] = useState({
// //     samNumber: "",
// //     childName: "",
// //     recordId: childId,
// //     dischargeDate: "",
// //     dueDate: "Calculating...",
// //   });

// //   // Completed Visits from DB
// //   const [savedFollowUps, setSavedFollowUps] = useState<FollowUpData[]>([]);

// //   // Form State
// //   const [formData, setFormData] = useState({
// //     actualDate: new Date().toISOString().split('T')[0],
// //     weight: "",
// //     height: "",
// //     muac: "",
// //     zScore: "",
// //     designation: "",
// //     followedBy: "",
// //     mobile: ""
// //   });

// //   const currentVisitNumber = savedFollowUps.length + 1;
// //   const maxVisits = 4;

// //   // --- 1. FETCH DATA ---
// //   useEffect(() => {
// //     const fetchDetails = async () => {
// //       try {
// //         const response = await fetch(`/api/follow-up/${childId}`);
// //         if (!response.ok) throw new Error("Failed to fetch");
        
// //         const data = await response.json();
        
// //         // Map completed visits (Now including Mobile and Z-Score)
// //         const mappedVisits = data.visits.map((v: any) => ({
// //            visitNumber: v.visit_number,
// //            actualDate: new Date(v.actual_date).toLocaleDateString(),
// //            weight: v.weight_kg,
// //            height: v.height_cm,
// //            muac: v.muac_cm,
// //            zScore: v.z_score,
// //            followedBy: v.followed_by_name,
// //            mobile: v.mobile_number
// //         }));

// //         setSavedFollowUps(mappedVisits);

// //         // Calculate Due Date based on current visit number
// //         const nextVisit = mappedVisits.length + 1;
// //         let dueDateString = "N/A";
        
// //         if (data.child.discharge_date) {
// //             const discharge = new Date(data.child.discharge_date);
// //             const due = new Date(discharge);
            
// //             if (nextVisit === 1) due.setDate(due.getDate() + 15);
// //             else if (nextVisit === 2) due.setMonth(due.getMonth() + 1);
// //             else if (nextVisit === 3) due.setMonth(due.getMonth() + 2);
// //             else if (nextVisit === 4) due.setMonth(due.getMonth() + 3);

// //             dueDateString = due.toLocaleDateString();
// //         }

// //         setPatientData({
// //           recordId: childId,
// //           samNumber: data.child.sam_no || "N/A",
// //           childName: data.child.child_full_name || "Unknown",
// //           dischargeDate: data.child.discharge_date || "",
// //           dueDate: dueDateString
// //         });

// //       } catch (error) {
// //         toast.error("Failed to load patient history.");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchDetails();
// //   }, [childId]);

// //   // --- HANDLERS ---
// //   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
// //     const { name, value } = e.target;
// //     if (['weight', 'height', 'muac', 'zScore'].includes(name) && value !== "" && isNaN(Number(value)) && value !== "-") return;
// //     if (name === 'mobile' && value.length > 10) return;
// //     setFormData(prev => ({ ...prev, [name]: value }));
// //   };

// //   const handleSave = async (e: React.FormEvent) => {
// //     e.preventDefault();
    
// //     if (!formData.actualDate || !formData.weight || !formData.height || !formData.designation || !formData.followedBy || !formData.mobile) {
// //       toast.error("Please fill in all required fields marked with *");
// //       return;
// //     }

// //     setSubmitting(true);

// //     try {
// //       const payload = {
// //         ...formData,
// //         visitNumber: currentVisitNumber,
// //         weight: parseFloat(formData.weight),
// //         height: parseFloat(formData.height),
// //         muac: formData.muac ? parseFloat(formData.muac) : null,
// //         zScore: formData.zScore ? parseFloat(formData.zScore) : null,
// //         designation: parseInt(formData.designation)
// //       };

// //       const response = await fetch(`/api/follow-up/${childId}`, {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify(payload)
// //       });

// //       if (!response.ok) {
// //         const errorData = await response.json();
// //         throw new Error(errorData.error || "Failed to save");
// //       }

// //       toast.success(`Follow-up ${currentVisitNumber} saved successfully!`);
      
// //       // Update UI optimistically
// //       setSavedFollowUps(prev => [...prev, {
// //         ...formData,
// //         visitNumber: currentVisitNumber,
// //         actualDate: new Date(formData.actualDate).toLocaleDateString()
// //       }]);
      
// //       setFormData({
// //         actualDate: new Date().toISOString().split('T')[0],
// //         weight: "", height: "", muac: "", zScore: "",
// //         designation: "", followedBy: "", mobile: ""
// //       });
      
// //       setExpandedSavedId(null); 
// //     } catch (error: any) {
// //       toast.error(error.message);
// //     } finally {
// //       setSubmitting(false);
// //     }
// //   };

// //   const toggleSavedAccordion = (visitNum: number) => {
// //     setExpandedSavedId(expandedSavedId === visitNum ? null : visitNum);
// //   };

// //   // --- RENDER ---
// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-slate-50 flex items-center justify-center">
// //         <Loader2 className="animate-spin h-8 w-8 text-blue-600 mb-4" />
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8 font-sans">
// //       <Toaster position="top-right" />

// //       <div className="max-w-5xl mx-auto space-y-6">
        
// //         {/* Header */}
// //         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
// //           <div>
// //             <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">Child Follow Up</h1>
// //             <p className="text-sm text-slate-500 font-medium mt-0.5">Record and update patient follow-up details</p>
// //           </div>
// //           <Button onClick={() => router.back()} variant="outline" className="bg-white shadow-sm">
// //             <ArrowLeft className="mr-2 h-4 w-4" /> Back to List
// //           </Button>
// //         </div>

// //         {/* Top Patient Info Card */}
// //         <Card className="border border-slate-200 shadow-sm rounded-xl overflow-hidden bg-white">
// //           <CardContent className="p-6">
// //             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
// //               <div>
// //                 <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 block">Record Number</label>
// //                 <div className="font-semibold text-slate-900 bg-slate-50 px-3 py-2 rounded-md border border-slate-100">
// //                   {patientData.recordId}
// //                 </div>
// //               </div>
// //               <div>
// //                 <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 block">SAM Number</label>
// //                 <div className="font-semibold text-blue-700 bg-blue-50 px-3 py-2 rounded-md border border-blue-100">
// //                   {patientData.samNumber}
// //                 </div>
// //               </div>
// //               <div className="sm:col-span-2">
// //                 <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 block">Child Name</label>
// //                 <div className="font-semibold text-slate-900 bg-slate-50 px-3 py-2 rounded-md border border-slate-100 flex items-center gap-2">
// //                   <User className="w-4 h-4 text-slate-400" />
// //                   {patientData.childName}
// //                 </div>
// //               </div>
// //             </div>
// //           </CardContent>
// //         </Card>

// //         {/* --- COMPLETED FOLLOW-UPS --- */}
// //         {savedFollowUps.length > 0 && (
// //           <div className="space-y-4">
// //             <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 mt-8">
// //               <CheckCircle2 className="w-5 h-5 text-green-600" /> Completed Visits
// //             </h2>
            
// //             {savedFollowUps.map((visit) => (
// //               <Card key={visit.visitNumber} className="border border-green-200 shadow-sm rounded-xl overflow-hidden bg-green-50/40 transition-all">
// //                 <button 
// //                   onClick={() => toggleSavedAccordion(visit.visitNumber)}
// //                   className="w-full flex items-center justify-between p-4 hover:bg-green-100/50 transition-colors"
// //                 >
// //                   <div className="flex items-center gap-3">
// //                     <div className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-sm">
// //                       {visit.visitNumber}
// //                     </div>
// //                     <div className="text-left">
// //                       <h3 className="text-md font-bold text-slate-800">Follow-up Visit {visit.visitNumber}</h3>
// //                       <p className="text-xs text-slate-500 font-medium">Completed on {visit.actualDate}</p>
// //                     </div>
// //                   </div>
// //                   {expandedSavedId === visit.visitNumber ? <ChevronUp className="w-5 h-5 text-slate-500" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
// //                 </button>

// //                 {expandedSavedId === visit.visitNumber && (
// //                   <CardContent className="p-6 border-t border-green-100 bg-white">
// //                     <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4 text-sm">
                      
// //                       {/* Row 1: Vitals */}
// //                       <div>
// //                         <span className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Weight</span>
// //                         <span className="font-semibold text-slate-900 bg-slate-50 px-2.5 py-1.5 rounded border border-slate-200">{visit.weight} kg</span>
// //                       </div>
// //                       <div>
// //                         <span className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Height</span>
// //                         <span className="font-semibold text-slate-900 bg-slate-50 px-2.5 py-1.5 rounded border border-slate-200">{visit.height} cm</span>
// //                       </div>
// //                       <div>
// //                         <span className="block text-xs font-bold text-slate-500 uppercase mb-1.5">MUAC</span>
// //                         <span className="font-semibold text-slate-900 bg-slate-50 px-2.5 py-1.5 rounded border border-slate-200">{visit.muac || "N/A"} cm</span>
// //                       </div>
// //                       <div>
// //                         <span className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Z-Score</span>
// //                         <span className="font-semibold text-slate-900 bg-slate-50 px-2.5 py-1.5 rounded border border-slate-200">{visit.zScore || "N/A"}</span>
// //                       </div>

// //                       {/* Row 2: Staff Details */}
// //                       <div className="col-span-2">
// //                         <span className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Staff Name</span>
// //                         <span className="font-semibold text-slate-900 bg-slate-50 px-2.5 py-1.5 rounded border border-slate-200 flex items-center gap-2 w-fit">
// //                           <User className="w-3.5 h-3.5 text-slate-400" />
// //                           {visit.followedBy}
// //                         </span>
// //                       </div>
// //                       <div className="col-span-2">
// //                         <span className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Staff Mobile</span>
// //                         <span className="font-semibold text-slate-900 bg-slate-50 px-2.5 py-1.5 rounded border border-slate-200 flex items-center gap-2 w-fit">
// //                           <Phone className="w-3.5 h-3.5 text-slate-400" />
// //                           {visit.mobile || "N/A"}
// //                         </span>
// //                       </div>

// //                     </div>
// //                   </CardContent>
// //                 )}
// //               </Card>
// //             ))}
// //           </div>
// //         )}

// //         {/* --- PENDING FOLLOW-UP FORM --- */}
// //         {currentVisitNumber <= maxVisits ? (
// //           <form onSubmit={handleSave} className="space-y-6 pt-4">
// //             <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 mt-4">
// //               <PlusCircle className="w-5 h-5 text-blue-600" /> Record Next Visit
// //             </h2>

// //             <Card className="border border-blue-200 shadow-md rounded-xl overflow-hidden bg-white transition-all ring-2 ring-blue-50">
// //               <button 
// //                 type="button"
// //                 onClick={() => setIsFormOpen(!isFormOpen)}
// //                 className="w-full flex items-center justify-between p-5 bg-blue-50/50 hover:bg-blue-50 transition-colors border-b border-blue-100"
// //               >
// //                 <div className="flex items-center gap-3">
// //                   <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-sm ring-4 ring-blue-100">
// //                     {currentVisitNumber}
// //                   </div>
// //                   <h2 className="text-lg font-bold text-blue-950">Follow-up Visit {currentVisitNumber}</h2>
// //                 </div>
// //                 {isFormOpen ? <ChevronUp className="w-5 h-5 text-blue-600" /> : <ChevronDown className="w-5 h-5 text-blue-600" />}
// //               </button>

// //               {isFormOpen && (
// //                 <CardContent className="p-6">
// //                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    
// //                     {/* Scheduling Info */}
// //                     <div className="space-y-1.5">
// //                       <label className="text-sm font-semibold text-slate-700">Calculated Due Date</label>
// //                       <div className="relative">
// //                         <Input value={patientData.dueDate} readOnly className="bg-slate-50 border-slate-200 text-slate-500 pl-9" />
// //                         <CalendarClock className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
// //                       </div>
// //                     </div>

// //                     <div className="space-y-1.5">
// //                       <label className="text-sm font-semibold text-slate-700">Actual Date <span className="text-red-500">*</span></label>
// //                       <Input 
// //                         type="date" 
// //                         name="actualDate" 
// //                         value={formData.actualDate} 
// //                         onChange={handleInputChange} 
// //                         className="border-slate-300 focus-visible:ring-blue-600" 
// //                         required 
// //                       />
// //                     </div>

// //                     <div className="hidden lg:block"></div>

// //                     {/* Vitals Section */}
// //                     <div className="col-span-full mt-2 border-t border-slate-100 pt-5">
// //                       <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2 mb-4">
// //                         <Activity className="w-4 h-4 text-blue-500" /> Vitals & Measurements
// //                       </h3>
// //                     </div>

// //                     <div className="space-y-1.5">
// //                       <label className="text-sm font-semibold text-slate-700">Weight (kg) <span className="text-red-500">*</span></label>
// //                       <Input 
// //                         type="text" 
// //                         name="weight" 
// //                         value={formData.weight} 
// //                         onChange={handleInputChange} 
// //                         placeholder="e.g. 8.5"
// //                         className="border-slate-300 focus-visible:ring-blue-600" 
// //                         required 
// //                       />
// //                     </div>

// //                     <div className="space-y-1.5">
// //                       <label className="text-sm font-semibold text-slate-700">Length/Height (cm) <span className="text-red-500">*</span></label>
// //                       <Input 
// //                         type="text" 
// //                         name="height" 
// //                         value={formData.height} 
// //                         onChange={handleInputChange} 
// //                         placeholder="e.g. 75.2"
// //                         className="border-slate-300 focus-visible:ring-blue-600" 
// //                         required 
// //                       />
// //                     </div>

// //                     <div className="space-y-1.5">
// //                       <label className="text-sm font-semibold text-slate-700">MUAC (cm)</label>
// //                       <Input 
// //                         type="text" 
// //                         name="muac" 
// //                         value={formData.muac} 
// //                         onChange={handleInputChange} 
// //                         placeholder="e.g. 11.5"
// //                         className="border-slate-300 focus-visible:ring-blue-600" 
// //                       />
// //                     </div>

// //                     <div className="space-y-1.5">
// //                       <label className="text-sm font-semibold text-slate-700">Z-Score</label>
// //                       <Input 
// //                         type="text" 
// //                         name="zScore" 
// //                         value={formData.zScore} 
// //                         onChange={handleInputChange} 
// //                         placeholder="e.g. -2.5"
// //                         className="border-slate-300 focus-visible:ring-blue-600" 
// //                       />
// //                     </div>

// //                     {/* Staff Details Section */}
// //                     <div className="col-span-full mt-2 border-t border-slate-100 pt-5">
// //                       <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2 mb-4">
// //                         <User className="w-4 h-4 text-blue-500" /> Followed Up By
// //                       </h3>
// //                     </div>

// //                     <div className="space-y-1.5">
// //                       <label className="text-sm font-semibold text-slate-700">Designation <span className="text-red-500">*</span></label>
// //                       <select 
// //                         name="designation"
// //                         value={formData.designation}
// //                         onChange={handleInputChange}
// //                         className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
// //                         required
// //                       >
// //                         <option value="">Select Designation</option>
// //                         <option value="1">ANGANWADI</option>
// //                         <option value="2">ANM</option>
// //                         <option value="6">Sahiya/ASHA</option>
// //                         <option value="3">OPD</option>
// //                         <option value="7">Poshan Sakhi</option>
// //                         <option value="8">RBSK Team</option>
// //                         <option value="4">SELF</option>
// //                         <option value="5">OTHER</option>
// //                       </select>
// //                     </div>

// //                     <div className="space-y-1.5">
// //                       <label className="text-sm font-semibold text-slate-700">Staff Name <span className="text-red-500">*</span></label>
// //                       <Input 
// //                         type="text" 
// //                         name="followedBy" 
// //                         value={formData.followedBy} 
// //                         onChange={handleInputChange} 
// //                         placeholder="Enter name"
// //                         className="border-slate-300 focus-visible:ring-blue-600" 
// //                         required 
// //                       />
// //                     </div>

// //                     <div className="space-y-1.5">
// //                       <label className="text-sm font-semibold text-slate-700">Mobile Number <span className="text-red-500">*</span></label>
// //                       <div className="relative">
// //                         <Input 
// //                           type="text" 
// //                           name="mobile" 
// //                           value={formData.mobile} 
// //                           onChange={handleInputChange} 
// //                           placeholder="10-digit number"
// //                           className="border-slate-300 pl-9 focus-visible:ring-blue-600" 
// //                           required 
// //                         />
// //                         <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
// //                       </div>
// //                     </div>

// //                   </div>
// //                 </CardContent>
// //               )}
// //             </Card>

// //             <div className="flex items-center justify-end gap-3 pt-4">
// //               <Button type="button" variant="outline" onClick={() => router.back()} className="px-6 border-slate-300 text-slate-700 hover:bg-slate-100">
// //                 Cancel
// //               </Button>
// //               <Button type="submit" disabled={submitting} className="px-8 bg-blue-600 hover:bg-blue-700 text-white shadow-md">
// //                 {submitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />} 
// //                 {submitting ? "Saving..." : `Save Follow-up ${currentVisitNumber}`}
// //               </Button>
// //             </div>
// //           </form>
// //         ) : (
// //           /* --- ALL DONE SUCCESS STATE --- */
// //           <div className="bg-emerald-50 text-emerald-900 p-8 rounded-xl border border-emerald-200 text-center mt-8 shadow-sm flex flex-col items-center">
// //             <div className="bg-emerald-100 p-4 rounded-full mb-4">
// //               <CheckCircle2 className="w-12 h-12 text-emerald-600" />
// //             </div>
// //             <h3 className="text-2xl font-bold tracking-tight">Protocol Complete</h3>
// //             <p className="text-emerald-700 font-medium mt-2 max-w-md">
// //               This patient has successfully completed all {maxVisits} standard SAM follow-up visits.
// //             </p>
// //             <Button onClick={() => router.push("/mtc-user/dashboard/follow-up")} className="mt-6 bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm">
// //               Return to Patient List
// //             </Button>
// //           </div>
// //         )}

// //       </div>
// //     </div>
// //   );
// // }

// "use client";

// import { useState, useEffect, use } from "react";
// import { useRouter } from "next/navigation";
// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { 
//   ArrowLeft, Save, User, CalendarClock, Activity, 
//   Phone, ChevronDown, ChevronUp, CheckCircle2, PlusCircle, Loader2
// } from "lucide-react";
// import toast, { Toaster } from "react-hot-toast";

// // IMPORT YOUR Z-SCORE UTILITIES HERE
// import { calculateZScore, getZScoreColor } from "@/lib/zScoreUtils";

// interface FollowUpData {
//   visitNumber: number;
//   actualDate: string;
//   weight: string;
//   height: string;
//   muac: string;
//   zScore?: string;
//   designation?: string;
//   followedBy: string;
//   mobile?: string;
// }

// export default function FollowUpDetailsPage({ params }: { params: Promise<{ id: string }> }) {
//   const router = useRouter();
//   const { id: childId } = use(params); 
  
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [isFormOpen, setIsFormOpen] = useState(true);
//   const [expandedSavedId, setExpandedSavedId] = useState<number | null>(null);

//   // Added 'sex' to patient data to ensure accurate WHO calculations
//   const [patientData, setPatientData] = useState({
//     samNumber: "",
//     childName: "",
//     recordId: childId,
//     dischargeDate: "",
//     dueDate: "Calculating...",
//     sex: "1", // Defaulting to '1' (Male). Update your backend API to fetch sex_id!
//   });

//   const [savedFollowUps, setSavedFollowUps] = useState<FollowUpData[]>([]);

//   const [formData, setFormData] = useState({
//     actualDate: new Date().toISOString().split('T')[0],
//     weight: "", height: "", muac: "", zScore: "",
//     designation: "", followedBy: "", mobile: ""
//   });

//   const currentVisitNumber = savedFollowUps.length + 1;
//   const maxVisits = 4;

//   // --- 1. FETCH DATA ---
//   useEffect(() => {
//     const fetchDetails = async () => {
//       try {
//         const response = await fetch(`/api/follow-up/${childId}`);
//         if (!response.ok) throw new Error("Failed to fetch");
        
//         const data = await response.json();
        
//         const mappedVisits = data.visits.map((v: any) => ({
//            visitNumber: v.visit_number,
//            actualDate: new Date(v.actual_date).toLocaleDateString(),
//            weight: v.weight_kg,
//            height: v.height_cm,
//            muac: v.muac_cm,
//            zScore: v.z_score,
//            followedBy: v.followed_by_name,
//            mobile: v.mobile_number
//         }));

//         setSavedFollowUps(mappedVisits);

//         const nextVisit = mappedVisits.length + 1;
//         let dueDateString = "N/A";
        
//         if (data.child.discharge_date) {
//             const discharge = new Date(data.child.discharge_date);
//             const due = new Date(discharge);
            
//             if (nextVisit === 1) due.setDate(due.getDate() + 15);
//             else if (nextVisit === 2) due.setMonth(due.getMonth() + 1);
//             else if (nextVisit === 3) due.setMonth(due.getMonth() + 2);
//             else if (nextVisit === 4) due.setMonth(due.getMonth() + 3);

//             dueDateString = due.toLocaleDateString();
//         }

//         setPatientData({
//           recordId: childId,
//           samNumber: data.child.sam_no || "N/A",
//           childName: data.child.child_full_name || "Unknown",
//           dischargeDate: data.child.discharge_date || "",
//           dueDate: dueDateString,
//           sex: data.child.sex_id?.toString() || "1" // Fetches sex if you add it to the SQL query
//         });

//       } catch (error) {
//         toast.error("Failed to load patient history.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDetails();
//   }, [childId]);

//   // --- 2. AUTO-CALCULATE Z-SCORE ---
//   // This useEffect watches the weight and height fields. 
//   // If they change, it runs your function and updates the Z-Score immediately.
//   useEffect(() => {
//     const w = parseFloat(formData.weight);
//     const h = parseFloat(formData.height);

//     if (!isNaN(w) && !isNaN(h) && w > 0 && h > 0) {
//       const calculatedZ = calculateZScore(w, h, patientData.sex);
//       setFormData(prev => ({ ...prev, zScore: calculatedZ }));
//     } else if (formData.zScore !== "") {
//       // Clear Z-score if weight/height are deleted
//       setFormData(prev => ({ ...prev, zScore: "" }));
//     }
//   }, [formData.weight, formData.height, patientData.sex]);

//   // --- HANDLERS ---
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     // Removed zScore from here so the user cannot manually overwrite the auto-calculation
//     if (['weight', 'height', 'muac'].includes(name) && value !== "" && isNaN(Number(value)) && value !== "-") return;
//     if (name === 'mobile' && value.length > 10) return;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSave = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!formData.actualDate || !formData.weight || !formData.height || !formData.designation || !formData.followedBy || !formData.mobile) {
//       toast.error("Please fill in all required fields marked with *");
//       return;
//     }

//     setSubmitting(true);

//     try {
//       const payload = {
//         ...formData,
//         visitNumber: currentVisitNumber,
//         weight: parseFloat(formData.weight),
//         height: parseFloat(formData.height),
//         muac: formData.muac ? parseFloat(formData.muac) : null,
//         zScore: formData.zScore ? parseFloat(formData.zScore) : null,
//         designation: parseInt(formData.designation)
//       };

//       const response = await fetch(`/api/follow-up/${childId}`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload)
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || "Failed to save");
//       }

//       toast.success(`Follow-up ${currentVisitNumber} saved successfully!`);
      
//       setSavedFollowUps(prev => [...prev, {
//         ...formData,
//         visitNumber: currentVisitNumber,
//         actualDate: new Date(formData.actualDate).toLocaleDateString()
//       }]);
      
//       setFormData({
//         actualDate: new Date().toISOString().split('T')[0],
//         weight: "", height: "", muac: "", zScore: "",
//         designation: "", followedBy: "", mobile: ""
//       });
      
//       setExpandedSavedId(null); 
//     } catch (error: any) {
//       toast.error(error.message);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const toggleSavedAccordion = (visitNum: number) => {
//     setExpandedSavedId(expandedSavedId === visitNum ? null : visitNum);
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-slate-50 flex items-center justify-center">
//         <Loader2 className="animate-spin h-8 w-8 text-blue-600 mb-4" />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8 font-sans">
//       <Toaster position="top-right" />

//       <div className="max-w-5xl mx-auto space-y-6">
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//           <div>
//             <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">Child Follow Up</h1>
//             <p className="text-sm text-slate-500 font-medium mt-0.5">Record and update patient follow-up details</p>
//           </div>
//           <Button onClick={() => router.back()} variant="outline" className="bg-white shadow-sm">
//             <ArrowLeft className="mr-2 h-4 w-4" /> Back to List
//           </Button>
//         </div>

//         <Card className="border border-slate-200 shadow-sm rounded-xl overflow-hidden bg-white">
//           <CardContent className="p-6">
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
//               <div>
//                 <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 block">Record Number</label>
//                 <div className="font-semibold text-slate-900 bg-slate-50 px-3 py-2 rounded-md border border-slate-100">
//                   {patientData.recordId}
//                 </div>
//               </div>
//               <div>
//                 <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 block">SAM Number</label>
//                 <div className="font-semibold text-blue-700 bg-blue-50 px-3 py-2 rounded-md border border-blue-100">
//                   {patientData.samNumber}
//                 </div>
//               </div>
//               <div className="sm:col-span-2">
//                 <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 block">Child Name</label>
//                 <div className="font-semibold text-slate-900 bg-slate-50 px-3 py-2 rounded-md border border-slate-100 flex items-center gap-2">
//                   <User className="w-4 h-4 text-slate-400" />
//                   {patientData.childName}
//                 </div>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {savedFollowUps.length > 0 && (
//           <div className="space-y-4">
//             <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 mt-8">
//               <CheckCircle2 className="w-5 h-5 text-green-600" /> Completed Visits
//             </h2>
            
//             {savedFollowUps.map((visit) => (
//               <Card key={visit.visitNumber} className="border border-green-200 shadow-sm rounded-xl overflow-hidden bg-green-50/40 transition-all">
//                 <button 
//                   onClick={() => toggleSavedAccordion(visit.visitNumber)}
//                   className="w-full flex items-center justify-between p-4 hover:bg-green-100/50 transition-colors"
//                 >
//                   <div className="flex items-center gap-3">
//                     <div className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-sm">
//                       {visit.visitNumber}
//                     </div>
//                     <div className="text-left">
//                       <h3 className="text-md font-bold text-slate-800">Follow-up Visit {visit.visitNumber}</h3>
//                       <p className="text-xs text-slate-500 font-medium">Completed on {visit.actualDate}</p>
//                     </div>
//                   </div>
//                   {expandedSavedId === visit.visitNumber ? <ChevronUp className="w-5 h-5 text-slate-500" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
//                 </button>

//                 {expandedSavedId === visit.visitNumber && (
//                   <CardContent className="p-6 border-t border-green-100 bg-white">
//                     <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4 text-sm">
//                       <div>
//                         <span className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Weight</span>
//                         <span className="font-semibold text-slate-900 bg-slate-50 px-2.5 py-1.5 rounded border border-slate-200">{visit.weight} kg</span>
//                       </div>
//                       <div>
//                         <span className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Height</span>
//                         <span className="font-semibold text-slate-900 bg-slate-50 px-2.5 py-1.5 rounded border border-slate-200">{visit.height} cm</span>
//                       </div>
//                       <div>
//                         <span className="block text-xs font-bold text-slate-500 uppercase mb-1.5">MUAC</span>
//                         <span className="font-semibold text-slate-900 bg-slate-50 px-2.5 py-1.5 rounded border border-slate-200">{visit.muac || "N/A"} cm</span>
//                       </div>
//                       <div>
//                         <span className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Z-Score</span>
//                         <span className={`font-semibold bg-slate-50 px-2.5 py-1.5 rounded border border-slate-200 ${visit.zScore ? getZScoreColor(visit.zScore) : "text-slate-900"}`}>
//                           {visit.zScore || "N/A"}
//                         </span>
//                       </div>
//                       <div className="col-span-2">
//                         <span className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Staff Name</span>
//                         <span className="font-semibold text-slate-900 bg-slate-50 px-2.5 py-1.5 rounded border border-slate-200 flex items-center gap-2 w-fit">
//                           <User className="w-3.5 h-3.5 text-slate-400" />
//                           {visit.followedBy}
//                         </span>
//                       </div>
//                       <div className="col-span-2">
//                         <span className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Staff Mobile</span>
//                         <span className="font-semibold text-slate-900 bg-slate-50 px-2.5 py-1.5 rounded border border-slate-200 flex items-center gap-2 w-fit">
//                           <Phone className="w-3.5 h-3.5 text-slate-400" />
//                           {visit.mobile || "N/A"}
//                         </span>
//                       </div>
//                     </div>
//                   </CardContent>
//                 )}
//               </Card>
//             ))}
//           </div>
//         )}

//         {currentVisitNumber <= maxVisits ? (
//           <form onSubmit={handleSave} className="space-y-6 pt-4">
//             <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 mt-4">
//               <PlusCircle className="w-5 h-5 text-blue-600" /> Record Next Visit
//             </h2>

//             <Card className="border border-blue-200 shadow-md rounded-xl overflow-hidden bg-white transition-all ring-2 ring-blue-50">
//               <button 
//                 type="button"
//                 onClick={() => setIsFormOpen(!isFormOpen)}
//                 className="w-full flex items-center justify-between p-5 bg-blue-50/50 hover:bg-blue-50 transition-colors border-b border-blue-100"
//               >
//                 <div className="flex items-center gap-3">
//                   <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-sm ring-4 ring-blue-100">
//                     {currentVisitNumber}
//                   </div>
//                   <h2 className="text-lg font-bold text-blue-950">Follow-up Visit {currentVisitNumber}</h2>
//                 </div>
//                 {isFormOpen ? <ChevronUp className="w-5 h-5 text-blue-600" /> : <ChevronDown className="w-5 h-5 text-blue-600" />}
//               </button>

//               {isFormOpen && (
//                 <CardContent className="p-6">
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     <div className="space-y-1.5">
//                       <label className="text-sm font-semibold text-slate-700">Calculated Due Date</label>
//                       <div className="relative">
//                         <Input value={patientData.dueDate} readOnly className="bg-slate-50 border-slate-200 text-slate-500 pl-9" />
//                         <CalendarClock className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
//                       </div>
//                     </div>

//                     <div className="space-y-1.5">
//                       <label className="text-sm font-semibold text-slate-700">Actual Date <span className="text-red-500">*</span></label>
//                       <Input type="date" name="actualDate" value={formData.actualDate} onChange={handleInputChange} className="border-slate-300 focus-visible:ring-blue-600" required />
//                     </div>

//                     <div className="hidden lg:block"></div>

//                     <div className="col-span-full mt-2 border-t border-slate-100 pt-5">
//                       <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2 mb-4">
//                         <Activity className="w-4 h-4 text-blue-500" /> Vitals & Measurements
//                       </h3>
//                     </div>

//                     <div className="space-y-1.5">
//                       <label className="text-sm font-semibold text-slate-700">Weight (kg) <span className="text-red-500">*</span></label>
//                       <Input type="text" name="weight" value={formData.weight} onChange={handleInputChange} placeholder="e.g. 8.5" className="border-slate-300 focus-visible:ring-blue-600" required />
//                     </div>

//                     <div className="space-y-1.5">
//                       <label className="text-sm font-semibold text-slate-700">Length/Height (cm) <span className="text-red-500">*</span></label>
//                       <Input type="text" name="height" value={formData.height} onChange={handleInputChange} placeholder="e.g. 75.2" className="border-slate-300 focus-visible:ring-blue-600" required />
//                     </div>

//                     <div className="space-y-1.5">
//                       <label className="text-sm font-semibold text-slate-700">MUAC (cm)</label>
//                       <Input type="text" name="muac" value={formData.muac} onChange={handleInputChange} placeholder="e.g. 11.5" className="border-slate-300 focus-visible:ring-blue-600" />
//                     </div>

//                     <div className="space-y-1.5">
//                       <label className="text-sm font-semibold text-slate-700">Z-Score (Auto-Calculated)</label>
//                       <Input 
//                         type="text" 
//                         name="zScore" 
//                         value={formData.zScore} 
//                         readOnly // Prevent manual typing since it calculates automatically
//                         placeholder="Pending..." 
//                         className={`bg-slate-50 border-slate-300 focus-visible:ring-0 cursor-not-allowed ${formData.zScore ? getZScoreColor(formData.zScore) : ""}`} 
//                       />
//                     </div>

//                     <div className="col-span-full mt-2 border-t border-slate-100 pt-5">
//                       <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2 mb-4">
//                         <User className="w-4 h-4 text-blue-500" /> Followed Up By
//                       </h3>
//                     </div>

//                     <div className="space-y-1.5">
//                       <label className="text-sm font-semibold text-slate-700">Designation <span className="text-red-500">*</span></label>
//                       <select name="designation" value={formData.designation} onChange={handleInputChange} className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600" required>
//                         <option value="">Select Designation</option>
//                         <option value="1">ANM</option>
//                         <option value="2">NUTRITIONAL COUNSELOR</option>
//                         <option value="3">OTHER</option>
//                       </select>
//                     </div>

//                     <div className="space-y-1.5">
//                       <label className="text-sm font-semibold text-slate-700">Staff Name <span className="text-red-500">*</span></label>
//                       <Input type="text" name="followedBy" value={formData.followedBy} onChange={handleInputChange} placeholder="Enter name" className="border-slate-300 focus-visible:ring-blue-600" required />
//                     </div>

//                     <div className="space-y-1.5">
//                       <label className="text-sm font-semibold text-slate-700">Mobile Number <span className="text-red-500">*</span></label>
//                       <div className="relative">
//                         <Input type="text" name="mobile" value={formData.mobile} onChange={handleInputChange} placeholder="10-digit number" className="border-slate-300 pl-9 focus-visible:ring-blue-600" required />
//                         <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
//                       </div>
//                     </div>

//                   </div>
//                 </CardContent>
//               )}
//             </Card>

//             <div className="flex items-center justify-end gap-3 pt-4">
//               <Button type="button" variant="outline" onClick={() => router.back()} className="px-6 border-slate-300 text-slate-700 hover:bg-slate-100">
//                 Cancel
//               </Button>
//               <Button type="submit" disabled={submitting} className="px-8 bg-blue-600 hover:bg-blue-700 text-white shadow-md">
//                 {submitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />} 
//                 {submitting ? "Saving..." : `Save Follow-up ${currentVisitNumber}`}
//               </Button>
//             </div>
//           </form>
//         ) : (
//           <div className="bg-emerald-50 text-emerald-900 p-8 rounded-xl border border-emerald-200 text-center mt-8 shadow-sm flex flex-col items-center">
//             <div className="bg-emerald-100 p-4 rounded-full mb-4">
//               <CheckCircle2 className="w-12 h-12 text-emerald-600" />
//             </div>
//             <h3 className="text-2xl font-bold tracking-tight">Protocol Complete</h3>
//             <p className="text-emerald-700 font-medium mt-2 max-w-md">
//               This patient has successfully completed all {maxVisits} standard SAM follow-up visits.
//             </p>
//             <Button onClick={() => router.push("/mtc-user/dashboard/follow-up")} className="mt-6 bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm">
//               Return to Patient List
//             </Button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, Save, User, CalendarClock, Activity, 
  Phone, ChevronDown, ChevronUp, CheckCircle2, PlusCircle, Loader2
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

// IMPORT YOUR Z-SCORE UTILITIES HERE
import { calculateZScore, getZScoreColor } from "@/lib/zScoreUtils";

interface FollowUpData {
  visitNumber: number;
  actualDate: string;
  weight: string;
  height: string;
  muac: string;
  zScore?: string;
  designation?: string;
  followedBy: string;
  mobile?: string;
}

interface RawVisitItem {
  visit_number: number;
  actual_date: string;
  weight_kg: string;
  height_cm: string;
  muac_cm: string;
  z_score: string;
  followed_by_name: string;
  mobile_number: string;
}

interface DBFollowUpResponse {
  visits: RawVisitItem[];
  child: {
    discharge_date?: string;
    sam_no?: string;
    child_full_name?: string;
    sex_id?: string | number;
  };
}

export default function FollowUpDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  
  // Next.js 15 Fix: Unwrap params cleanly
  const [childId, setChildId] = useState<string>("");
  useEffect(() => {
    params.then((p) => setChildId(p.id)).catch(() => toast.error("Failed to unwrap parameters"));
  }, [params]);
  
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(true);
  const [expandedSavedId, setExpandedSavedId] = useState<number | null>(null);

  const isCalculatingRef = useRef(false);

  // Patient Metadata State
  const [patientData, setPatientData] = useState({
    samNumber: "",
    childName: "",
    recordId: "",
    dischargeDate: "",
    dueDate: "Calculating...",
    sex: "1", // Defaulting to '1' (Male).
  });

  const [savedFollowUps, setSavedFollowUps] = useState<FollowUpData[]>([]);

  const [formData, setFormData] = useState({
    actualDate: new Date().toISOString().split('T')[0],
    weight: "", height: "", muac: "", zScore: "",
    designation: "", followedBy: "", mobile: ""
  });

  const currentVisitNumber = savedFollowUps.length + 1;
  const maxVisits = 4;

  // --- 1. FETCH DATA ---
  useEffect(() => {
    if (!childId) return;
    
    const fetchDetails = async () => {
      try {
        const response = await fetch(`/api/follow-up/${childId}`);
        if (!response.ok) throw new Error("Failed to fetch");
        
        const data = await response.json() as DBFollowUpResponse;
        
        const mappedVisits = data.visits.map((v) => ({
           visitNumber: v.visit_number,
           actualDate: new Date(v.actual_date).toLocaleDateString(),
           weight: v.weight_kg,
           height: v.height_cm,
           muac: v.muac_cm,
           zScore: v.z_score,
           followedBy: v.followed_by_name,
           mobile: v.mobile_number
        }));

        setSavedFollowUps(mappedVisits);

        const nextVisit = mappedVisits.length + 1;
        let dueDateString = "N/A";
        
        if (data.child.discharge_date) {
            const discharge = new Date(data.child.discharge_date);
            const due = new Date(discharge);
            
            if (nextVisit === 1) due.setDate(due.getDate() + 15);
            else if (nextVisit === 2) due.setMonth(due.getMonth() + 1);
            else if (nextVisit === 3) due.setMonth(due.getMonth() + 2);
            else if (nextVisit === 4) due.setMonth(due.getMonth() + 3);

            dueDateString = due.toLocaleDateString();
        }

        setPatientData({
          recordId: childId,
          samNumber: data.child.sam_no || "N/A",
          childName: data.child.child_full_name || "Unknown",
          dischargeDate: data.child.discharge_date || "",
          dueDate: dueDateString,
          sex: data.child.sex_id?.toString() || "1"
        });

      } catch {
        toast.error("Failed to load patient history.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [childId]);

  // --- 2. AUTO-CALCULATE Z-SCORE ---
  useEffect(() => {
    if (isCalculatingRef.current) return;

    const w = parseFloat(formData.weight);
    const h = parseFloat(formData.height);

    if (!isNaN(w) && !isNaN(h) && w > 0 && h > 0) {
      isCalculatingRef.current = true;
      const calculatedZ = calculateZScore(w, h, patientData.sex);
      setFormData(prev => ({ ...prev, zScore: calculatedZ }));
      isCalculatingRef.current = false;
    } else if (formData.zScore !== "") {
      isCalculatingRef.current = true;
      setFormData(prev => ({ ...prev, zScore: "" }));
      isCalculatingRef.current = false;
    }
  }, [formData.weight, formData.height, patientData.sex, formData.zScore]);

  // --- HANDLERS ---
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (['weight', 'height', 'muac'].includes(name) && value !== "" && isNaN(Number(value)) && value !== "-") return;
    if (name === 'mobile' && value.length > 10) return;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.actualDate || !formData.weight || !formData.height || !formData.designation || !formData.followedBy || !formData.mobile) {
      toast.error("Please fill in all required fields marked with *");
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        ...formData,
        visitNumber: currentVisitNumber,
        weight: parseFloat(formData.weight),
        height: parseFloat(formData.height),
        muac: formData.muac ? parseFloat(formData.muac) : null,
        zScore: formData.zScore ? parseFloat(formData.zScore) : null,
        designation: parseInt(formData.designation)
      };

      const response = await fetch(`/api/follow-up/${childId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json() as { error?: string };
        throw new Error(errorData.error || "Failed to save");
      }

      toast.success(`Follow-up ${currentVisitNumber} saved successfully!`);
      
      setSavedFollowUps(prev => [...prev, {
        ...formData,
        visitNumber: currentVisitNumber,
        actualDate: new Date(formData.actualDate).toLocaleDateString()
      }]);
      
      setFormData({
        actualDate: new Date().toISOString().split('T')[0],
        weight: "", height: "", muac: "", zScore: "",
        designation: "", followedBy: "", mobile: ""
      });
      
      setExpandedSavedId(null); 
    } catch (error) {
      const err = error as Error;
      toast.error(err.message || "An unexpected error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  const toggleSavedAccordion = (visitNum: number) => {
    setExpandedSavedId(expandedSavedId === visitNum ? null : visitNum);
  };

  if (loading || !childId) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="animate-spin h-8 w-8 text-blue-600 mb-4" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8 font-sans">
      <Toaster position="top-right" />

      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">Child Follow Up</h1>
            <p className="text-sm text-slate-500 font-medium mt-0.5">Record and update patient follow-up details</p>
          </div>
          <Button onClick={() => router.back()} variant="outline" className="bg-white shadow-sm">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to List
          </Button>
        </div>

        <Card className="border border-slate-200 shadow-sm rounded-xl overflow-hidden bg-white">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 block">Record Number</label>
                <div className="font-semibold text-slate-900 bg-slate-50 px-3 py-2 rounded-md border border-slate-100">
                  {patientData.recordId}
                </div>
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 block">SAM Number</label>
                <div className="font-semibold text-blue-700 bg-blue-50 px-3 py-2 rounded-md border border-blue-100">
                  {patientData.samNumber}
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 block">Child Name</label>
                <div className="font-semibold text-slate-900 bg-slate-50 px-3 py-2 rounded-md border border-slate-100 flex items-center gap-2">
                  <User className="w-4 h-4 text-slate-400" />
                  {patientData.childName}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {savedFollowUps.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 mt-8">
              <CheckCircle2 className="w-5 h-5 text-green-600" /> Completed Visits
            </h2>
            
            {savedFollowUps.map((visit) => (
              <Card key={visit.visitNumber} className="border border-green-200 shadow-sm rounded-xl overflow-hidden bg-green-50/40 transition-all">
                <button 
                  type="button"
                  onClick={() => toggleSavedAccordion(visit.visitNumber)}
                  className="w-full flex items-center justify-between p-4 hover:bg-green-100/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-sm">
                      {visit.visitNumber}
                    </div>
                    <div className="text-left">
                      <h3 className="text-md font-bold text-slate-800">Follow-up Visit {visit.visitNumber}</h3>
                      <p className="text-xs text-slate-500 font-medium">Completed on {visit.actualDate}</p>
                    </div>
                  </div>
                  {expandedSavedId === visit.visitNumber ? <ChevronUp className="w-5 h-5 text-slate-500" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
                </button>

                {expandedSavedId === visit.visitNumber && (
                  <CardContent className="p-6 border-t border-green-100 bg-white">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4 text-sm">
                      <div>
                        <span className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Weight</span>
                        <span className="font-semibold text-slate-900 bg-slate-50 px-2.5 py-1.5 rounded border border-slate-200">{visit.weight} kg</span>
                      </div>
                      <div>
                        <span className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Height</span>
                        <span className="font-semibold text-slate-900 bg-slate-50 px-2.5 py-1.5 rounded border border-slate-200">{visit.height} cm</span>
                      </div>
                      <div>
                        <span className="block text-xs font-bold text-slate-500 uppercase mb-1.5">MUAC</span>
                        <span className="font-semibold text-slate-900 bg-slate-50 px-2.5 py-1.5 rounded border border-slate-200">{visit.muac || "N/A"} cm</span>
                      </div>
                      <div>
                        <span className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Z-Score</span>
                        <span className={`font-semibold bg-slate-50 px-2.5 py-1.5 rounded border border-slate-200 ${visit.zScore ? getZScoreColor(visit.zScore) : "text-slate-900"}`}>
                          {visit.zScore || "N/A"}
                        </span>
                      </div>
                      <div className="col-span-2">
                        <span className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Staff Name</span>
                        <span className="font-semibold text-slate-900 bg-slate-50 px-2.5 py-1.5 rounded border border-slate-200 flex items-center gap-2 w-fit">
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          {visit.followedBy}
                        </span>
                      </div>
                      <div className="col-span-2">
                        <span className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Staff Mobile</span>
                        <span className="font-semibold text-slate-900 bg-slate-50 px-2.5 py-1.5 rounded border border-slate-200 flex items-center gap-2 w-fit">
                          <Phone className="w-3.5 h-3.5 text-slate-400" />
                          {visit.mobile || "N/A"}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        )}

        {currentVisitNumber <= maxVisits ? (
          <form onSubmit={handleSave} className="space-y-6 pt-4">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 mt-4">
              <PlusCircle className="w-5 h-5 text-blue-600" /> Record Next Visit
            </h2>

            <Card className="border border-blue-200 shadow-md rounded-xl overflow-hidden bg-white transition-all ring-2 ring-blue-50">
              <button 
                type="button"
                onClick={() => setIsFormOpen(!isFormOpen)}
                className="w-full flex items-center justify-between p-5 bg-blue-50/50 hover:bg-blue-50 transition-colors border-b border-blue-100"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-sm ring-4 ring-blue-100">
                    {currentVisitNumber}
                  </div>
                  <h2 className="text-lg font-bold text-blue-950">Follow-up Visit {currentVisitNumber}</h2>
                </div>
                {isFormOpen ? <ChevronUp className="w-5 h-5 text-blue-600" /> : <ChevronDown className="w-5 h-5 text-blue-600" />}
              </button>

              {isFormOpen && (
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-slate-700">Calculated Due Date</label>
                      <div className="relative">
                        <Input value={patientData.dueDate} readOnly className="bg-slate-50 border-slate-200 text-slate-500 pl-9" />
                        <CalendarClock className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-slate-700">Actual Date <span className="text-red-500">*</span></label>
                      <Input type="date" name="actualDate" value={formData.actualDate} onChange={handleInputChange} className="border-slate-300 focus-visible:ring-blue-600" required />
                    </div>

                    <div className="hidden lg:block"></div>

                    <div className="col-span-full mt-2 border-t border-slate-100 pt-5">
                      <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2 mb-4">
                        <Activity className="w-4 h-4 text-blue-500" /> Vitals & Measurements
                      </h3>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-slate-700">Weight (kg) <span className="text-red-500">*</span></label>
                      <Input type="text" name="weight" value={formData.weight} onChange={handleInputChange} placeholder="e.g. 8.5" className="border-slate-300 focus-visible:ring-blue-600" required />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-slate-700">Length/Height (cm) <span className="text-red-500">*</span></label>
                      <Input type="text" name="height" value={formData.height} onChange={handleInputChange} placeholder="e.g. 75.2" className="border-slate-300 focus-visible:ring-blue-600" required />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-slate-700">MUAC (cm)</label>
                      <Input type="text" name="muac" value={formData.muac} onChange={handleInputChange} placeholder="e.g. 11.5" className="border-slate-300 focus-visible:ring-blue-600" />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-slate-700">Z-Score (Auto-Calculated)</label>
                      <Input 
                        type="text" 
                        name="zScore" 
                        value={formData.zScore} 
                        readOnly 
                        placeholder="Pending..." 
                        className={`bg-slate-50 border-slate-300 focus-visible:ring-0 cursor-not-allowed ${formData.zScore ? getZScoreColor(formData.zScore) : ""}`} 
                      />
                    </div>

                    <div className="col-span-full mt-2 border-t border-slate-100 pt-5">
                      <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2 mb-4">
                        <User className="w-4 h-4 text-blue-500" /> Followed Up By
                      </h3>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-slate-700">Designation <span className="text-red-500">*</span></label>
                      <select name="designation" value={formData.designation} onChange={handleInputChange} className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600" required>
                        <option value="">Select Designation</option>
                        <option value="1">ANM</option>
                        <option value="2">NUTRITIONAL COUNSELOR</option>
                        <option value="3">OTHER</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-slate-700">Staff Name <span className="text-red-500">*</span></label>
                      <Input type="text" name="followedBy" value={formData.followedBy} onChange={handleInputChange} placeholder="Enter name" className="border-slate-300 focus-visible:ring-blue-600" required />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-slate-700">Mobile Number <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <Input type="text" name="mobile" value={formData.mobile} onChange={handleInputChange} placeholder="10-digit number" className="border-slate-300 pl-9 focus-visible:ring-blue-600" required />
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                      </div>
                    </div>

                  </div>
                </CardContent>
              )}
            </Card>

            <div className="flex items-center justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => router.back()} className="px-6 border-slate-300 text-slate-700 hover:bg-slate-100">
                Cancel
              </Button>
              <Button type="submit" disabled={submitting} className="px-8 bg-blue-600 hover:bg-blue-700 text-white shadow-md">
                {submitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />} 
                {submitting ? "Saving..." : `Save Follow-up ${currentVisitNumber}`}
              </Button>
            </div>
          </form>
        ) : (
          <div className="bg-emerald-50 text-emerald-900 p-8 rounded-xl border border-emerald-200 text-center mt-8 shadow-sm flex flex-col items-center">
            <div className="bg-emerald-100 p-4 rounded-full mb-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-600" />
            </div>
            <h3 className="text-2xl font-bold tracking-tight">Protocol Complete</h3>
            <p className="text-emerald-700 font-medium mt-2 max-w-md">
              This patient has successfully completed all {maxVisits} standard SAM follow-up visits.
            </p>
            <Button onClick={() => router.push("/mtc-user/dashboard/follow-up")} className="mt-6 bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm">
              Return to Patient List
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}