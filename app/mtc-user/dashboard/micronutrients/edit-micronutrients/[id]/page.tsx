// // // app/mtc-user/dashboard/antibiotics-micronutrients/edit/[id]/page.tsx
// // "use client";

// // import { useState, useEffect, use } from "react";
// // import { useRouter } from "next/navigation";
// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import { Card, CardHeader, CardContent } from "@/components/ui/card";
// // import { ArrowLeft, Save, X, Loader2, Pill, Activity } from "lucide-react";
// // import toast, { Toaster } from "react-hot-toast";
// // import { cn } from "@/lib/utils";

// // // Type definitions
// // interface Child {
// //   id: string;
// //   recordNo: string;
// //   samNumber: string;
// //   childName: string;
// //   parentName: string;
// // }

// // interface TreatmentEntry {
// //   sectionId: number;
// //   day0: number; day1: number; day2: number; day3: number; day4: number; day5: number;
// //   day6: number; day7: number; day8: number; day9: number; day10: number; day11: number;
// //   day12: number; day13: number; day14: number; day15: number; day16: number; day17: number;
// //   day18: number; day19: number; day20: number; day21: number; day22: number; day23: number;
// //   day24: number; day25: number; day26: number; day27: number; day28: number; day29: number;
// //   otherRoutine?: string;
// // }

// // interface LabTestEntry {
// //   sectionId: number;
// //   day0: number;
// //   result?: string;
// //   others?: string;
// // }

// // const TREATMENT_NAMES = [
// //   "Deworming(Albendazole)", "Zinc Syrup (ml)", "Magsulph (ml)", "Potchlor (ml)",
// //   "Folic Acid (mg)", "Anti-Malarial", "Iron Syrup (ml)", "Vit A........iu",
// //   "Amoxicillin/Antibiotic", "Multivitamin (ml)", "Other Medicine"
// // ];

// // const LAB_TEST_NAMES = [
// //   "Haemoglobin (gm/dl)", "Other Tests (For repeated tests)", "TB Test",
// //   "Urine Test", "TC/DC of WBC", "Chest X-ray", "Malaria Test", "Blood Sugar"
// // ];

// // const SECTION_IDS = {
// //   routine: [5, 6, 7, 8, 2, 4, 9, 1, 3, 10, 19],
// //   lab: [11, 18, 13, 14, 15, 16, 12, 17]
// // };

// // export default function EditMicronutrientsPage({ params }: { params: Promise<{ id: string }> }) {
// //   const router = useRouter();
// //   // Unwrap params using React.use()
// //   const { id: childId } = use(params);
  
// //   const [child, setChild] = useState<Child | null>(null);
// //   const [routineTreatments, setRoutineTreatments] = useState<TreatmentEntry[]>([]);
// //   const [labTests, setLabTests] = useState<LabTestEntry[]>([]);
// //   const [loading, setLoading] = useState(true);
// //   const [saving, setSaving] = useState(false);

// //   useEffect(() => {
// //     if (!childId) return;

// //     const loadData = async () => {
// //       try {
// //         // 1. Fetch Patient Details
// //         const childrenRes = await fetch('/api/child-registration');
// //         if (!childrenRes.ok) throw new Error('Failed to fetch patient data');
// //         const dbChildren = await childrenRes.json();
        
// //         const foundChildRaw = dbChildren.find((c: any) => c.registration_id?.toString() === childId || c.id === childId);
        
// //         if (!foundChildRaw) {
// //           toast.error("Child not found");
// //           router.push("/mtc-user/dashboard/micronutrients");
// //           return;
// //         }

// //         const foundChild = {
// //           id: foundChildRaw.registration_id?.toString() || foundChildRaw.id,
// //           recordNo: foundChildRaw.registration_id?.toString() || "N/A",
// //           samNumber: foundChildRaw.sam_no || foundChildRaw.samNumber,
// //           childName: foundChildRaw.child_full_name || foundChildRaw.childName,
// //           parentName: foundChildRaw.guardian_name || foundChildRaw.parentName,
// //         };
// //         setChild(foundChild);

// //         // 2. Fetch Micronutrients Data from DB
// //         const dataRes = await fetch(`/api/micronutrients?childId=${childId}`);
// //         const dbResult = await dataRes.json();

// //         if (dbResult.success && dbResult.data) {
// //           // If data exists, use it
// //           setRoutineTreatments(dbResult.data.routine_data);
// //           setLabTests(dbResult.data.lab_data);
// //         } else {
// //           // Initialize Defaults if no data exists
// //           const initialRoutineTreatments = TREATMENT_NAMES.map((_, index) => {
// //             const entry: any = { sectionId: SECTION_IDS.routine[index] };
// //             for (let i = 0; i < 30; i++) {
// //               entry[`day${i}`] = index === 8 && i >= 7 ? 1 : 0; // Amoxicillin logic
// //             }
// //             if (index === 10) entry.otherRoutine = "";
// //             return entry as TreatmentEntry;
// //           });

// //           const initialLabTests = LAB_TEST_NAMES.map((_, index) => ({
// //             sectionId: SECTION_IDS.lab[index],
// //             day0: 0,
// //             result: index === 7 ? "" : undefined,
// //             others: index === 7 ? "" : undefined
// //           }));

// //           setRoutineTreatments(initialRoutineTreatments);
// //           setLabTests(initialLabTests);
// //         }
// //       } catch (error) {
// //         console.error("Error loading data:", error);
// //         toast.error("Failed to load clinical data");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     loadData();
// //   }, [childId, router]);

// //   // Handlers
// //   const handleCheckboxChange = (treatmentIndex: number, dayIndex: number) => {
// //     setRoutineTreatments(prev => {
// //       const updated = [...prev];
// //       const dayKey = `day${dayIndex}` as keyof TreatmentEntry;
// //       updated[treatmentIndex] = {
// //         ...updated[treatmentIndex],
// //         [dayKey]: updated[treatmentIndex][dayKey] === 0 ? 1 : 0
// //       };
// //       return updated;
// //     });
// //   };

// //   const handleLabTestStatusChange = (testIndex: number, value: string) => {
// //     setLabTests(prev => {
// //       const updated = [...prev];
// //       updated[testIndex] = { ...updated[testIndex], day0: parseInt(value) };
// //       if (value !== "1") updated[testIndex].result = "";
// //       return updated;
// //     });
// //   };

// //   const handleLabTestResultChange = (testIndex: number, value: string) => {
// //     setLabTests(prev => {
// //       const updated = [...prev];
// //       updated[testIndex] = { ...updated[testIndex], result: value };
// //       return updated;
// //     });
// //   };

// //   const handleOtherMedicineChange = (value: string) => {
// //     setRoutineTreatments(prev => {
// //       const updated = [...prev];
// //       updated[10] = { ...updated[10], otherRoutine: value };
// //       return updated;
// //     });
// //   };

// //   const handleChestXRayChange = (value: string) => {
// //     setLabTests(prev => {
// //       const updated = [...prev];
// //       updated[7] = { ...updated[7], others: value };
// //       return updated;
// //     });
// //   };

// //   const handleSave = async () => {
// //     setSaving(true);
// //     try {
// //       const payload = {
// //         childId,
// //         routineTreatments,
// //         labTests
// //       };

// //       const response = await fetch('/api/micronutrients', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify(payload)
// //       });

// //       if (!response.ok) throw new Error('Failed to save to database');

// //       toast.success("Treatment data saved securely!");
// //       setTimeout(() => router.push("/mtc-user/dashboard/micronutrients"), 1500);
// //     } catch (error) {
// //       console.error("Error saving data:", error);
// //       toast.error("Failed to save data to the server.");
// //     } finally {
// //       setSaving(false);
// //     }
// //   };

// //   if (loading || !child) {
// //     return (
// //       <div className="min-h-screen bg-slate-50 flex items-center justify-center">
// //         <div className="flex flex-col items-center">
// //           <Loader2 className="animate-spin h-10 w-10 text-blue-600 mb-4" />
// //           <p className="text-slate-500 font-medium">Loading clinical records...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   const SectionTitle = ({ icon: Icon, title }: { icon: any, title: string }) => (
// //     <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
// //       <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><Icon size={20} strokeWidth={2.5} /></div>
// //       <h2 className="text-lg font-bold text-slate-800">{title}</h2>
// //     </div>
// //   );

// //   return (
// //     <div className="min-h-screen bg-slate-50 pb-28 font-sans">
// //       <Toaster position="top-center" toastOptions={{ className: 'rounded-xl shadow-lg font-medium' }} />
      
// //       {/* Sticky Top Navigation Bar */}
// //       <div className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
// //           <div className="flex items-center gap-4">
// //             <Button onClick={() => router.push("/mtc-user/dashboard/micronutrients")} variant="ghost" size="icon" className="text-slate-500 hover:text-blue-600 hover:bg-blue-50">
// //               <ArrowLeft className="h-5 w-5" />
// //             </Button>
// //             <div>
// //               <h1 className="text-lg font-bold text-slate-900 leading-tight">Antibiotics & Micronutrients</h1>
// //               <p className="text-xs font-medium text-slate-500">Treatment Flowsheet</p>
// //             </div>
// //           </div>
          
// //           <div className="flex items-center gap-2">
// //             <Button variant="outline" onClick={() => router.push("/mtc-user/dashboard/micronutrients")} className="border-slate-200 text-slate-600 hidden sm:flex">
// //               <X className="mr-2 h-4 w-4" /> Cancel
// //             </Button>
// //             <Button onClick={handleSave} disabled={saving} className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
// //               {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
// //               {saving ? "Saving..." : "Save Changes"}
// //             </Button>
// //           </div>
// //         </div>
// //       </div>

// //       <main className="max-w-7xl mx-auto px-4 sm:px-6 mt-8 space-y-6">
        
// //         {/* Child Information Header */}
// //         <div className="bg-white px-6 py-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
// //            <div className="flex items-center gap-4">
// //              <div className="h-12 w-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xl border-2 border-blue-200 shrink-0">
// //                {child.childName.charAt(0)}
// //              </div>
// //              <div>
// //                <h2 className="text-lg font-bold text-slate-900">{child.childName}</h2>
// //                <p className="text-sm text-slate-500 font-medium">Guardian: {child.parentName}</p>
// //              </div>
// //            </div>
// //            <div className="px-4 py-2 bg-slate-50 rounded-xl border border-slate-100 text-right">
// //              <span className="text-[10px] font-bold text-slate-400 uppercase block mb-0.5">SAM Number</span>
// //              <span className="text-sm font-mono font-bold text-blue-700">{child.samNumber}</span>
// //            </div>
// //         </div>

// //         {/* Routine Treatment Grid */}
// //         <Card className="border-0 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] overflow-hidden">
// //           <CardContent className="p-6 sm:p-8">
// //             <SectionTitle icon={Pill} title="Routine Treatments (30-Day Grid)" />
// //             <div className="overflow-x-auto rounded-xl border border-slate-200 custom-scrollbar">
// //               <table className="min-w-full text-sm text-slate-700 border-collapse">
// //                 <thead>
// //                   <tr className="bg-slate-50 border-b border-slate-200">
// //                     <th className="py-3 px-4 text-left font-bold text-slate-800 sticky left-0 bg-slate-50 z-10 border-r border-slate-200">Medication</th>
// //                     {Array.from({ length: 30 }, (_, i) => (
// //                       <th key={i} className="py-3 px-2 text-center font-bold text-slate-500 min-w-[40px]">
// //                         D{i}
// //                       </th>
// //                     ))}
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   {routineTreatments.map((treatment, index) => (
// //                     <tr key={index} className="border-b border-slate-100 hover:bg-blue-50/50 transition-colors">
// //                       <td className="py-3 px-4 font-semibold text-slate-700 sticky left-0 bg-white z-10 border-r border-slate-200 group-hover:bg-blue-50/50">
// //                         {TREATMENT_NAMES[index]}
// //                       </td>
// //                       {Array.from({ length: 30 }, (_, dayIndex) => {
// //                         const dayKey = `day${dayIndex}` as keyof TreatmentEntry;
// //                         const isChecked = treatment[dayKey] === 1;
// //                         const isDisabled = index === 8 && dayIndex < 7; // Amoxicillin disabled logic
                        
// //                         return (
// //                           <td key={dayIndex} className="py-2 px-1 text-center">
// //                             <input
// //                               type="checkbox"
// //                               className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500/30 disabled:opacity-30 cursor-pointer"
// //                               checked={isChecked}
// //                               onChange={() => handleCheckboxChange(index, dayIndex)}
// //                               disabled={isDisabled}
// //                             />
// //                           </td>
// //                         );
// //                       })}
// //                     </tr>
// //                   ))}
// //                   <tr className="bg-slate-50/50">
// //                     <td className="py-3 px-4 font-semibold text-slate-700 sticky left-0 bg-slate-50/50 z-10 border-r border-slate-200">
// //                       Other Medicine Details
// //                     </td>
// //                     <td colSpan={30} className="py-2 px-4">
// //                       <Input
// //                         value={routineTreatments[10]?.otherRoutine || ""}
// //                         onChange={(e) => handleOtherMedicineChange(e.target.value)}
// //                         placeholder="Specify if 'Other Medicine' was administered..."
// //                         className="bg-white"
// //                       />
// //                     </td>
// //                   </tr>
// //                 </tbody>
// //               </table>
// //             </div>
// //           </CardContent>
// //         </Card>

// //         {/* Laboratory Tests */}
// //         <Card className="border-0 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)]">
// //           <CardContent className="p-6 sm:p-8">
// //             <SectionTitle icon={Activity} title="Laboratory Investigations" />
// //             <div className="overflow-x-auto rounded-xl border border-slate-200">
// //               <table className="min-w-full text-sm text-slate-700 border-collapse">
// //                 <thead>
// //                   <tr className="bg-slate-50 border-b border-slate-200">
// //                     <th className="py-3 px-4 text-left font-bold text-slate-800">Test Name</th>
// //                     <th className="py-3 px-4 text-left font-bold text-slate-800 w-48">Conducted?</th>
// //                     <th className="py-3 px-4 text-left font-bold text-slate-800">Result / Value</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody className="divide-y divide-slate-100">
// //                   {labTests.map((test, index) => (
// //                     <tr key={index} className="hover:bg-blue-50/50 transition-colors">
// //                       <td className="py-3 px-4 font-semibold text-slate-700">
// //                         {LAB_TEST_NAMES[index]}
// //                       </td>
                      
// //                       {index < 7 ? (
// //                         <>
// //                           <td className="py-3 px-4">
// //                             <select
// //                               className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
// //                               value={test.day0}
// //                               onChange={(e) => handleLabTestStatusChange(index, e.target.value)}
// //                             >
// //                               <option value="0">Select</option>
// //                               <option value="1">Yes</option>
// //                               <option value="2">No</option>
// //                             </select>
// //                           </td>
// //                           <td className="py-3 px-4">
// //                             <Input
// //                               value={test.result || ""}
// //                               onChange={(e) => handleLabTestResultChange(index, e.target.value)}
// //                               placeholder="Enter lab result"
// //                               disabled={test.day0 !== 1}
// //                               className={test.day0 !== 1 ? "bg-slate-100" : "bg-white"}
// //                             />
// //                           </td>
// //                         </>
// //                       ) : (
// //                         <td colSpan={2} className="py-3 px-4">
// //                           <Input
// //                             value={test.others || ""}
// //                             onChange={(e) => handleChestXRayChange(e.target.value)}
// //                             placeholder="Enter X-Ray details"
// //                             className="bg-white"
// //                           />
// //                         </td>
// //                       )}
// //                     </tr>
// //                   ))}
// //                 </tbody>
// //               </table>
// //             </div>
// //           </CardContent>
// //         </Card>
// //       </main>
// //     </div>
// //   );
// // }


// // app/mtc-user/dashboard/antibiotics-micronutrients/edit/[id]/page.tsx
// "use client";

// import { useState, useEffect, use } from "react";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent } from "@/components/ui/card";
// import { ArrowLeft, Save, X, Loader2, Pill, Activity } from "lucide-react";
// import toast, { Toaster } from "react-hot-toast";

// // Type definitions
// interface Child {
//   id: string;
//   recordNo: string;
//   samNumber: string;
//   childName: string;
//   parentName: string;
// }

// interface TreatmentEntry {
//   sectionId: number;
//   day0: number; day1: number; day2: number; day3: number; day4: number; day5: number;
//   day6: number; day7: number; day8: number; day9: number; day10: number; day11: number;
//   day12: number; day13: number; day14: number; day15: number; day16: number; day17: number;
//   day18: number; day19: number; day20: number; day21: number; day22: number; day23: number;
//   day24: number; day25: number; day26: number; day27: number; day28: number; day29: number;
//   otherRoutine?: string;
// }

// interface LabTestEntry {
//   sectionId: number;
//   day0: number;
//   result?: string;
//   others?: string;
// }

// const TREATMENT_NAMES = [
//   "Deworming(Albendazole)", "Zinc Syrup (ml)", "Magsulph (ml)", "Potchlor (ml)",
//   "Folic Acid (mg)", "Anti-Malarial", "Iron Syrup (ml)", "Vit A........iu",
//   "Amoxicillin/Antibiotic", "Multivitamin (ml)", "Other Medicine"
// ];

// const LAB_TEST_NAMES = [
//   "Haemoglobin (gm/dl)", "Other Tests (For repeated tests)", "TB Test",
//   "Urine Test", "TC/DC of WBC", "Chest X-ray", "Malaria Test", "Blood Sugar"
// ];

// const SECTION_IDS = {
//   routine: [5, 6, 7, 8, 2, 4, 9, 1, 3, 10, 19],
//   lab: [11, 18, 13, 14, 15, 16, 12, 17]
// };

// export default function EditMicronutrientsPage({ params }: { params: Promise<{ id: string }> }) {
//   const router = useRouter();
//   const { id: childId } = use(params);
  
//   const [child, setChild] = useState<Child | null>(null);
//   const [routineTreatments, setRoutineTreatments] = useState<TreatmentEntry[]>([]);
//   const [labTests, setLabTests] = useState<LabTestEntry[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);

//   useEffect(() => {
//     if (!childId) return;

//     const loadData = async () => {
//       try {
//         // 1. Fetch Patient Details
//         const childrenRes = await fetch('/api/child-registration');
//         if (!childrenRes.ok) throw new Error('Failed to fetch patient data');
//         const dbChildren = await childrenRes.json();
        
//         const foundChildRaw = dbChildren.find((c: any) => c.registration_id?.toString() === childId || c.id === childId);
        
//         if (!foundChildRaw) {
//           toast.error("Child not found");
//           router.push("/mtc-user/dashboard/micronutrients");
//           return;
//         }

//         const foundChild = {
//           id: foundChildRaw.registration_id?.toString() || foundChildRaw.id,
//           recordNo: foundChildRaw.registration_id?.toString() || "N/A",
//           samNumber: foundChildRaw.sam_no || foundChildRaw.samNumber,
//           childName: foundChildRaw.child_full_name || foundChildRaw.childName,
//           parentName: foundChildRaw.guardian_name || foundChildRaw.parentName,
//         };
//         setChild(foundChild);

//         // 2. Fetch Micronutrients Data from DB
//         const dataRes = await fetch(`/api/micronutrients?childId=${childId}`);
//         const dbResult = await dataRes.json();

//         if (dbResult.success && dbResult.data) {
//           setRoutineTreatments(dbResult.data.routine_data);
//           setLabTests(dbResult.data.lab_data);
//         } else {
//           // Initialize Defaults if no data exists
//           const initialRoutineTreatments = TREATMENT_NAMES.map((_, index) => {
//             const entry: any = { sectionId: SECTION_IDS.routine[index] };
//             for (let i = 0; i < 30; i++) {
//               // FIX: Removed the Amoxicillin lock. All boxes default to 0 and are unlocked.
//               entry[`day${i}`] = 0; 
//             }
//             if (index === 10) entry.otherRoutine = "";
//             return entry as TreatmentEntry;
//           });

//           const initialLabTests = LAB_TEST_NAMES.map((_, index) => ({
//             sectionId: SECTION_IDS.lab[index],
//             day0: 0,
//             result: index === 7 ? "" : undefined,
//             others: index === 7 ? "" : undefined
//           }));

//           setRoutineTreatments(initialRoutineTreatments);
//           setLabTests(initialLabTests);
//         }
//       } catch (error) {
//         console.error("Error loading data:", error);
//         toast.error("Failed to load clinical data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadData();
//   }, [childId, router]);

//   // Handlers
//   const handleCheckboxChange = (treatmentIndex: number, dayIndex: number) => {
//     setRoutineTreatments(prev => {
//       const updated = [...prev];
//       const dayKey = `day${dayIndex}` as keyof TreatmentEntry;
//       updated[treatmentIndex] = {
//         ...updated[treatmentIndex],
//         [dayKey]: updated[treatmentIndex][dayKey] === 0 ? 1 : 0
//       };
//       return updated;
//     });
//   };

//   const handleLabTestStatusChange = (testIndex: number, value: string) => {
//     setLabTests(prev => {
//       const updated = [...prev];
//       updated[testIndex] = { ...updated[testIndex], day0: parseInt(value) };
//       if (value !== "1") updated[testIndex].result = "";
//       return updated;
//     });
//   };

//   const handleLabTestResultChange = (testIndex: number, value: string) => {
//     setLabTests(prev => {
//       const updated = [...prev];
//       updated[testIndex] = { ...updated[testIndex], result: value };
//       return updated;
//     });
//   };

//   const handleOtherMedicineChange = (value: string) => {
//     setRoutineTreatments(prev => {
//       const updated = [...prev];
//       updated[10] = { ...updated[10], otherRoutine: value };
//       return updated;
//     });
//   };

//   const handleChestXRayChange = (value: string) => {
//     setLabTests(prev => {
//       const updated = [...prev];
//       updated[7] = { ...updated[7], others: value };
//       return updated;
//     });
//   };

//   const handleSave = async () => {
//     setSaving(true);
//     try {
//       const payload = {
//         childId,
//         routineTreatments,
//         labTests
//       };

//       const response = await fetch('/api/micronutrients', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload)
//       });

//       if (!response.ok) throw new Error('Failed to save to database');

//       toast.success("Treatment data saved securely!");
//       setTimeout(() => router.push("/mtc-user/dashboard/micronutrients"), 1500);
//     } catch (error) {
//       console.error("Error saving data:", error);
//       toast.error("Failed to save data to the server.");
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (loading || !child) {
//     return (
//       <div className="min-h-screen bg-slate-50 flex items-center justify-center">
//         <div className="flex flex-col items-center">
//           <Loader2 className="animate-spin h-10 w-10 text-blue-600 mb-4" />
//           <p className="text-slate-500 font-medium">Loading clinical records...</p>
//         </div>
//       </div>
//     );
//   }

//   const SectionTitle = ({ icon: Icon, title }: { icon: any, title: string }) => (
//     <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
//       <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><Icon size={20} strokeWidth={2.5} /></div>
//       <h2 className="text-lg font-bold text-slate-800">{title}</h2>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-slate-50 pb-28 font-sans">
//       <Toaster position="top-center" toastOptions={{ className: 'rounded-xl shadow-lg font-medium' }} />
      
//       {/* Sticky Top Navigation Bar */}
//       <div className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
//           <div className="flex items-center gap-4">
//             <Button onClick={() => router.push("/mtc-user/dashboard/micronutrients")} variant="ghost" size="icon" className="text-slate-500 hover:text-blue-600 hover:bg-blue-50">
//               <ArrowLeft className="h-5 w-5" />
//             </Button>
//             <div>
//               <h1 className="text-lg font-bold text-slate-900 leading-tight">Antibiotics & Micronutrients</h1>
//               <p className="text-xs font-medium text-slate-500">Treatment Flowsheet</p>
//             </div>
//           </div>
          
//           <div className="flex items-center gap-2">
//             <Button variant="outline" onClick={() => router.push("/mtc-user/dashboard/micronutrients")} className="border-slate-200 text-slate-600 hidden sm:flex">
//               <X className="mr-2 h-4 w-4" /> Cancel
//             </Button>
//             <Button onClick={handleSave} disabled={saving} className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
//               {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
//               {saving ? "Saving..." : "Save Changes"}
//             </Button>
//           </div>
//         </div>
//       </div>

//       <main className="max-w-7xl mx-auto px-4 sm:px-6 mt-8 space-y-6">
        
//         {/* Child Information Header */}
//         <div className="bg-white px-6 py-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//            <div className="flex items-center gap-4">
//              <div className="h-12 w-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xl border-2 border-blue-200 shrink-0">
//                {child.childName.charAt(0)}
//              </div>
//              <div>
//                <h2 className="text-lg font-bold text-slate-900">{child.childName}</h2>
//                <p className="text-sm text-slate-500 font-medium">Guardian: {child.parentName}</p>
//              </div>
//            </div>
//            <div className="px-4 py-2 bg-slate-50 rounded-xl border border-slate-100 text-right">
//              <span className="text-[10px] font-bold text-slate-400 uppercase block mb-0.5">SAM Number</span>
//              <span className="text-sm font-mono font-bold text-blue-700">{child.samNumber}</span>
//            </div>
//         </div>

//         {/* Routine Treatment Grid */}
//         <Card className="border-0 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] overflow-hidden">
//           <CardContent className="p-6 sm:p-8">
//             <SectionTitle icon={Pill} title="Routine Treatments (30-Day Grid)" />
//             <div className="overflow-x-auto rounded-xl border border-slate-200 custom-scrollbar">
//               <table className="min-w-full text-sm text-slate-700 border-collapse">
//                 <thead>
//                   <tr className="bg-slate-50 border-b border-slate-200">
//                     <th className="py-3 px-4 text-left font-bold text-slate-800 sticky left-0 bg-slate-50 z-10 border-r border-slate-200">Medication</th>
//                     {Array.from({ length: 30 }, (_, i) => (
//                       <th key={i} className="py-3 px-2 text-center font-bold text-slate-500 min-w-[40px]">
//                         D{i}
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {routineTreatments.map((treatment, index) => (
//                     <tr key={index} className="border-b border-slate-100 hover:bg-blue-50/50 transition-colors">
//                       <td className="py-3 px-4 font-semibold text-slate-700 sticky left-0 bg-white z-10 border-r border-slate-200 group-hover:bg-blue-50/50">
//                         {TREATMENT_NAMES[index]}
//                       </td>
//                       {Array.from({ length: 30 }, (_, dayIndex) => {
//                         const dayKey = `day${dayIndex}` as keyof TreatmentEntry;
//                         const isChecked = treatment[dayKey] === 1;
                        
//                         // FIX: Amoxicillin is no longer forcibly disabled.
//                         const isDisabled = false; 
                        
//                         return (
//                           <td key={dayIndex} className="py-2 px-1 text-center">
//                             <input
//                               type="checkbox"
//                               className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500/30 disabled:opacity-30 cursor-pointer"
//                               checked={isChecked}
//                               onChange={() => handleCheckboxChange(index, dayIndex)}
//                               disabled={isDisabled}
//                             />
//                           </td>
//                         );
//                       })}
//                     </tr>
//                   ))}
//                   <tr className="bg-slate-50/50">
//                     <td className="py-3 px-4 font-semibold text-slate-700 sticky left-0 bg-slate-50/50 z-10 border-r border-slate-200">
//                       Other Medicine Details
//                     </td>
//                     <td colSpan={30} className="py-2 px-4">
//                       <Input
//                         value={routineTreatments[10]?.otherRoutine || ""}
//                         onChange={(e) => handleOtherMedicineChange(e.target.value)}
//                         placeholder="Specify if 'Other Medicine' was administered..."
//                         className="bg-white"
//                       />
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Laboratory Tests */}
//         <Card className="border-0 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)]">
//           <CardContent className="p-6 sm:p-8">
//             <SectionTitle icon={Activity} title="Laboratory Investigations" />
//             <div className="overflow-x-auto rounded-xl border border-slate-200">
//               <table className="min-w-full text-sm text-slate-700 border-collapse">
//                 <thead>
//                   <tr className="bg-slate-50 border-b border-slate-200">
//                     <th className="py-3 px-4 text-left font-bold text-slate-800">Test Name</th>
//                     <th className="py-3 px-4 text-left font-bold text-slate-800 w-48">Conducted?</th>
//                     <th className="py-3 px-4 text-left font-bold text-slate-800">Result / Value</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-slate-100">
//                   {labTests.map((test, index) => (
//                     <tr key={index} className="hover:bg-blue-50/50 transition-colors">
//                       <td className="py-3 px-4 font-semibold text-slate-700">
//                         {LAB_TEST_NAMES[index]}
//                       </td>
                      
//                       {index < 7 ? (
//                         <>
//                           <td className="py-3 px-4">
//                             <select
//                               className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
//                               value={test.day0}
//                               onChange={(e) => handleLabTestStatusChange(index, e.target.value)}
//                             >
//                               <option value="0">Select</option>
//                               <option value="1">Yes</option>
//                               <option value="2">No</option>
//                             </select>
//                           </td>
//                           <td className="py-3 px-4">
//                             <Input
//                               value={test.result || ""}
//                               onChange={(e) => handleLabTestResultChange(index, e.target.value)}
//                               placeholder="Enter lab result"
//                               disabled={test.day0 !== 1}
//                               className={test.day0 !== 1 ? "bg-slate-100" : "bg-white"}
//                             />
//                           </td>
//                         </>
//                       ) : (
//                         <td colSpan={2} className="py-3 px-4">
//                           <Input
//                             value={test.others || ""}
//                             onChange={(e) => handleChestXRayChange(e.target.value)}
//                             placeholder="Enter X-Ray details"
//                             className="bg-white"
//                           />
//                         </td>
//                       )}
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </CardContent>
//         </Card>
//       </main>
//     </div>
//   );
// }

"use client";

import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Save, X, Loader2, Pill, Activity } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

// Type definitions
interface Child {
  id: string;
  recordNo: string;
  samNumber: string;
  childName: string;
  parentName: string;
}

interface RawChildItem {
  registration_id?: string | number;
  id: string;
  sam_no?: string;
  samNumber?: string;
  child_full_name?: string;
  childName?: string;
  guardian_name?: string;
  parentName?: string;
}

interface TreatmentEntry {
  sectionId: number;
  day0: number; day1: number; day2: number; day3: number; day4: number; day5: number;
  day6: number; day7: number; day8: number; day9: number; day10: number; day11: number;
  day12: number; day13: number; day14: number; day15: number; day16: number; day17: number;
  day18: number; day19: number; day20: number; day21: number; day22: number; day23: number;
  day24: number; day25: number; day26: number; day27: number; day28: number; day29: number;
  otherRoutine?: string;
}

interface InitializeRoutineEntry extends Record<string, string | number | undefined> {
  sectionId: number;
  otherRoutine?: string;
}

interface LabTestEntry {
  sectionId: number;
  day0: number;
  result?: string;
  others?: string;
}

const TREATMENT_NAMES = [
  "Deworming(Albendazole)", "Zinc Syrup (ml)", "Magsulph (ml)", "Potchlor (ml)",
  "Folic Acid (mg)", "Anti-Malarial", "Iron Syrup (ml)", "Vit A........iu",
  "Amoxicillin/Antibiotic", "Multivitamin (ml)", "Other Medicine"
];

const LAB_TEST_NAMES = [
  "Haemoglobin (gm/dl)", "Other Tests (For repeated tests)", "TB Test",
  "Urine Test", "TC/DC of WBC", "Chest X-ray", "Malaria Test", "Blood Sugar"
];

const SECTION_IDS = {
  routine: [5, 6, 7, 8, 2, 4, 9, 1, 3, 10, 19],
  lab: [11, 18, 13, 14, 15, 16, 12, 17]
};

export default function EditMicronutrientsPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id: childId } = use(params);
  
  const [child, setChild] = useState<Child | null>(null);
  const [routineTreatments, setRoutineTreatments] = useState<TreatmentEntry[]>([]);
  const [labTests, setLabTests] = useState<LabTestEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!childId) return;

    const loadData = async () => {
      try {
        // 1. Fetch Patient Details
        const childrenRes = await fetch('/api/child-registration');
        if (!childrenRes.ok) throw new Error('Failed to fetch patient data');
        const dbChildren = await childrenRes.json() as RawChildItem[];
        
        const foundChildRaw = dbChildren.find((c) => c.registration_id?.toString() === childId || c.id === childId);
        
        if (!foundChildRaw) {
          toast.error("Child not found");
          router.push("/mtc-user/dashboard/micronutrients");
          return;
        }

        const foundChild = {
          id: foundChildRaw.registration_id?.toString() || foundChildRaw.id,
          recordNo: foundChildRaw.registration_id?.toString() || "N/A",
          samNumber: foundChildRaw.sam_no || foundChildRaw.samNumber || "",
          childName: foundChildRaw.child_full_name || foundChildRaw.childName || "",
          parentName: foundChildRaw.guardian_name || foundChildRaw.parentName || "",
        };
        setChild(foundChild);

        // 2. Fetch Micronutrients Data from DB
        const dataRes = await fetch(`/api/micronutrients?childId=${childId}`);
        const dbResult = await dataRes.json() as { success: boolean; data?: { routine_data: TreatmentEntry[]; lab_data: LabTestEntry[] } };

        if (dbResult.success && dbResult.data) {
          setRoutineTreatments(dbResult.data.routine_data);
          setLabTests(dbResult.data.lab_data);
        } else {
          // Initialize Defaults if no data exists
          const initialRoutineTreatments = TREATMENT_NAMES.map((_, index) => {
            const entry: InitializeRoutineEntry = { sectionId: SECTION_IDS.routine[index] };
            for (let i = 0; i < 30; i++) {
              entry[`day${i}`] = 0; 
            }
            if (index === 10) entry.otherRoutine = "";
            return entry as unknown as TreatmentEntry;
          });

          const initialLabTests = LAB_TEST_NAMES.map((_, index) => ({
            sectionId: SECTION_IDS.lab[index],
            day0: 0,
            result: index === 7 ? "" : undefined,
            others: index === 7 ? "" : undefined
          }));

          setRoutineTreatments(initialRoutineTreatments);
          setLabTests(initialLabTests);
        }
      } catch (error) {
        console.error("Error loading data:", error);
        toast.error("Failed to load clinical data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [childId, router]);

  // Handlers
  const handleCheckboxChange = (treatmentIndex: number, dayIndex: number) => {
    setRoutineTreatments(prev => {
      const updated = [...prev];
      const dayKey = `day${dayIndex}` as keyof TreatmentEntry;
      updated[treatmentIndex] = {
        ...updated[treatmentIndex],
        [dayKey]: updated[treatmentIndex][dayKey] === 0 ? 1 : 0
      };
      return updated;
    });
  };

  const handleLabTestStatusChange = (testIndex: number, value: string) => {
    setLabTests(prev => {
      const updated = [...prev];
      updated[testIndex] = { ...updated[testIndex], day0: parseInt(value) };
      if (value !== "1") updated[testIndex].result = "";
      return updated;
    });
  };

  const handleLabTestResultChange = (testIndex: number, value: string) => {
    setLabTests(prev => {
      const updated = [...prev];
      updated[testIndex] = { ...updated[testIndex], result: value };
      return updated;
    });
  };

  const handleOtherMedicineChange = (value: string) => {
    setRoutineTreatments(prev => {
      const updated = [...prev];
      updated[10] = { ...updated[10], otherRoutine: value };
      return updated;
    });
  };

  const handleChestXRayChange = (value: string) => {
    setLabTests(prev => {
      const updated = [...prev];
      updated[7] = { ...updated[7], others: value };
      return updated;
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = {
        childId,
        routineTreatments,
        labTests
      };

      const response = await fetch('/api/micronutrients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('Failed to save to database');

      toast.success("Treatment data saved securely!");
      setTimeout(() => router.push("/mtc-user/dashboard/micronutrients"), 1500);
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error("Failed to save data to the server.");
    } finally {
      setSaving(false);
    }
  };

  if (loading || !child) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader2 className="animate-spin h-10 w-10 text-blue-600 mb-4" />
          <p className="text-slate-500 font-medium">Loading clinical records...</p>
        </div>
      </div>
    );
  }

  const SectionTitle = ({ icon: Icon, title }: { icon: React.ComponentType<{ size: number, strokeWidth: number }>, title: string }) => (
    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
      <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><Icon size={20} strokeWidth={2.5} /></div>
      <h2 className="text-lg font-bold text-slate-800">{title}</h2>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 pb-28 font-sans">
      <Toaster position="top-center" toastOptions={{ className: 'rounded-xl shadow-lg font-medium' }} />
      
      {/* Sticky Top Navigation Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button onClick={() => router.push("/mtc-user/dashboard/micronutrients")} variant="ghost" size="icon" className="text-slate-500 hover:text-blue-600 hover:bg-blue-50">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-lg font-bold text-slate-900 leading-tight">Antibiotics & Micronutrients</h1>
              <p className="text-xs font-medium text-slate-500">Treatment Flowsheet</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => router.push("/mtc-user/dashboard/micronutrients")} className="border-slate-200 text-slate-600 hidden sm:flex">
              <X className="mr-2 h-4 w-4" /> Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving} className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
              {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 mt-8 space-y-6">
        
        {/* Child Information Header */}
        <div className="bg-white px-6 py-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
           <div className="flex items-center gap-4">
             <div className="h-12 w-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xl border-2 border-blue-200 shrink-0">
               {child.childName.charAt(0)}
             </div>
             <div>
               <h2 className="text-lg font-bold text-slate-900">{child.childName}</h2>
               <p className="text-sm text-slate-500 font-medium">Guardian: {child.parentName}</p>
             </div>
           </div>
           <div className="px-4 py-2 bg-slate-50 rounded-xl border border-slate-100 text-right">
             <span className="text-[10px] font-bold text-slate-400 uppercase block mb-0.5">SAM Number</span>
             <span className="text-sm font-mono font-bold text-blue-700">{child.samNumber}</span>
           </div>
        </div>

        {/* Routine Treatment Grid */}
        <Card className="border-0 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] overflow-hidden">
          <CardContent className="p-6 sm:p-8">
            <SectionTitle icon={Pill} title="Routine Treatments (30-Day Grid)" />
            <div className="overflow-x-auto rounded-xl border border-slate-200 custom-scrollbar">
              <table className="min-w-full text-sm text-slate-700 border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="py-3 px-4 text-left font-bold text-slate-800 sticky left-0 bg-slate-50 z-10 border-r border-slate-200">Medication</th>
                    {Array.from({ length: 30 }, (_, i) => (
                      <th key={i} className="py-3 px-2 text-center font-bold text-slate-500 min-w-10">
                        D{i}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {routineTreatments.map((treatment, index) => (
                    <tr key={index} className="border-b border-slate-100 hover:bg-blue-50/50 transition-colors">
                      <td className="py-3 px-4 font-semibold text-slate-700 sticky left-0 bg-white z-10 border-r border-slate-200 group-hover:bg-blue-50/50">
                        {TREATMENT_NAMES[index]}
                      </td>
                      {Array.from({ length: 30 }, (_, dayIndex) => {
                        const dayKey = `day${dayIndex}` as keyof TreatmentEntry;
                        const isChecked = treatment[dayKey] === 1;
                        const isDisabled = false; 
                        
                        return (
                          <td key={dayIndex} className="py-2 px-1 text-center">
                            <input
                              type="checkbox"
                              className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500/30 disabled:opacity-30 cursor-pointer"
                              checked={isChecked}
                              onChange={() => handleCheckboxChange(index, dayIndex)}
                              disabled={isDisabled}
                            />
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                  <tr className="bg-slate-50/50">
                    <td className="py-3 px-4 font-semibold text-slate-700 sticky left-0 bg-slate-50/50 z-10 border-r border-slate-200">
                      Other Medicine Details
                    </td>
                    <td colSpan={30} className="py-2 px-4">
                      <Input
                        value={routineTreatments[10]?.otherRoutine || ""}
                        onChange={(e) => handleOtherMedicineChange(e.target.value)}
                        placeholder="Specify if 'Other Medicine' was administered..."
                        className="bg-white"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Laboratory Tests */}
        <Card className="border-0 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)]">
          <CardContent className="p-6 sm:p-8">
            <SectionTitle icon={Activity} title="Laboratory Investigations" />
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="min-w-full text-sm text-slate-700 border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="py-3 px-4 text-left font-bold text-slate-800">Test Name</th>
                    <th className="py-3 px-4 text-left font-bold text-slate-800 w-48">Conducted?</th>
                    <th className="py-3 px-4 text-left font-bold text-slate-800">Result / Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {labTests.map((test, index) => (
                    <tr key={index} className="hover:bg-blue-50/50 transition-colors">
                      <td className="py-3 px-4 font-semibold text-slate-700">
                        {LAB_TEST_NAMES[index]}
                      </td>
                      
                      {index < 7 ? (
                        <>
                          <td className="py-3 px-4">
                            <select
                              className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                              value={test.day0}
                              onChange={(e) => handleLabTestStatusChange(index, e.target.value)}
                            >
                              <option value="0">Select</option>
                              <option value="1">Yes</option>
                              <option value="2">No</option>
                            </select>
                          </td>
                          <td className="py-3 px-4">
                            <Input
                              value={test.result || ""}
                              onChange={(e) => handleLabTestResultChange(index, e.target.value)}
                              placeholder="Enter lab result"
                              disabled={test.day0 !== 1}
                              className={test.day0 !== 1 ? "bg-slate-100" : "bg-white"}
                            />
                          </td>
                        </>
                      ) : (
                        <td colSpan={2} className="py-3 px-4">
                          <Input
                            value={test.others || ""}
                            onChange={(e) => handleChestXRayChange(e.target.value)}
                            placeholder="Enter X-Ray details"
                            className="bg-white"
                          />
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}