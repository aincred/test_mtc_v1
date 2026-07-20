
// // "use client";

// // import { useState, useEffect, useRef } from "react";
// // import { useRouter, useParams } from "next/navigation";
// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // import { 
// //   ArrowLeft, Save, X, Download, Activity, User, Target, AlertCircle, CalendarDays, Loader2
// // } from "lucide-react";
// // import toast, { Toaster } from "react-hot-toast";
// // import { cn } from "@/lib/utils";

// // interface Child {
// //   id: string;
// //   recordNo: string;
// //   samNumber: string;
// //   childName: string;
// //   parentName: string;
// //   admissionWeight: string;
// // }

// // interface WeightEntry {
// //   day: string;
// //   value: string;
// // }

// // interface WeightData {
// //   childId: string;
// //   samNumber: string;
// //   name: string;
// //   weightEntries: WeightEntry[];
// //   minimumWeight: string;
// //   targetWeight: string;
// // }

// // export default function EditWeightEntryPage() {
// //   const router = useRouter();
// //   const params = useParams();
// //   const childId = params.id as string;
// //   const chartRef = useRef<HTMLDivElement>(null);
  
// //   const [child, setChild] = useState<Child | null>(null);
// //   const [weightData, setWeightData] = useState<WeightData | null>(null);
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [isSaving, setIsSaving] = useState(false);

// //   useEffect(() => {
// //     const loadData = async () => {
// //       try {
// //         // 1. Fetch Patient Profile Details
// //         const childrenRes = await fetch('/api/child-registration');
// //         if (!childrenRes.ok) throw new Error('Failed to fetch patient data');
// //         const dbChildren = await childrenRes.json();
        
// //         // Find specific child. Mapping snake_case DB columns to our interface
// //         const foundChildRaw = dbChildren.find((c: any) => c.registration_id?.toString() === childId || c.id === childId);
        
// //         if (!foundChildRaw) {
// //           toast.error("Child not found");
// //           router.push("/mtc-user/dashboard/daily-weight");
// //           return;
// //         }

// //         const foundChild: Child = {
// //           id: foundChildRaw.registration_id?.toString() || foundChildRaw.id,
// //           recordNo: foundChildRaw.registration_id?.toString() || "N/A",
// //           samNumber: foundChildRaw.sam_no || foundChildRaw.samNumber,
// //           childName: foundChildRaw.child_full_name || foundChildRaw.childName,
// //           parentName: foundChildRaw.guardian_name || foundChildRaw.parentName,
// //           admissionWeight: foundChildRaw.admission_weight_kg?.toString() || foundChildRaw.admissionWeight || "0"
// //         };
        
// //         setChild(foundChild);

// //         // 2. Fetch Weight Records from API
// //         const weightsRes = await fetch(`/api/daily-weights?childId=${childId}`);
// //         const weightsDbResult = await weightsRes.json();

// //         let dbWeights: Record<string, string> = {};
// //         let savedMin = "";
// //         let savedTarget = "";

// //         if (weightsDbResult.success && weightsDbResult.data) {
// //           dbWeights = weightsDbResult.data.weights_data || {};
// //           savedMin = weightsDbResult.data.minimum_weight?.toString() || "";
// //           savedTarget = weightsDbResult.data.target_weight?.toString() || "";
// //         }

// //         // Calculate defaults if no records exist yet
// //         const admissionWeightNum = parseFloat(foundChild.admissionWeight) || 0;
// //         const defaultTarget = savedTarget || (admissionWeightNum * 1.15).toFixed(2);
// //         const defaultMin = savedMin || (admissionWeightNum * 1.05).toFixed(2);

// //         // Generate the 60-day array
// //         const allDays: WeightEntry[] = [];
// //         for (let i = 0; i < 60; i++) {
// //           const dayKey = `day${i}`; 
// //           let val = dbWeights[dayKey] || "";
          
// //           // Fallback: Populate Day 0 with admission weight if blank
// //           if (i === 0 && val === "" && admissionWeightNum > 0) {
// //             val = foundChild.admissionWeight;
// //           }

// //           allDays.push({ day: dayKey, value: val });
// //         }

// //         setWeightData({
// //           childId: foundChild.id,
// //           samNumber: foundChild.samNumber,
// //           name: foundChild.childName,
// //           weightEntries: allDays,
// //           minimumWeight: defaultMin,
// //           targetWeight: defaultTarget
// //         });

// //       } catch (error) {
// //         console.error("Error loading clinical data:", error);
// //         toast.error("Failed to load clinical data from server.");
// //       } finally {
// //         setIsLoading(false);
// //       }
// //     };

// //     loadData();
// //   }, [childId, router]);

// //   const handleWeightChange = (dayIndex: number, value: string) => {
// //     if (!weightData) return;
// //     const updatedEntries = [...weightData.weightEntries];
// //     updatedEntries[dayIndex] = { ...updatedEntries[dayIndex], value: value };
// //     setWeightData({ ...weightData, weightEntries: updatedEntries });
// //   };

// //   const handleMinimumWeightChange = (value: string) => {
// //     if (!weightData) return;
// //     setWeightData({ ...weightData, minimumWeight: value });
// //   };

// //   const handleSave = async () => {
// //     if (!weightData || !child) return;
// //     setIsSaving(true);

// //     try {
// //       // Format array back into flat JSON dictionary for PostgreSQL
// //       const formattedWeights: Record<string, string> = {};
// //       weightData.weightEntries.forEach(entry => {
// //         if (entry.value !== "") {
// //           formattedWeights[entry.day] = entry.value;
// //         }
// //       });

// //       const payload = {
// //         childId: child.id,
// //         minimumWeight: weightData.minimumWeight,
// //         targetWeight: weightData.targetWeight,
// //         weightEntries: formattedWeights
// //       };

// //       const response = await fetch('/api/daily-weights', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify(payload)
// //       });

// //       if (!response.ok) throw new Error('Failed to save to database');

// //       toast.success("Weight entries saved securely!");
// //       router.push("/mtc-user/dashboard/daily-weight");
// //     } catch (error) {
// //       console.error("Error saving data:", error);
// //       toast.error("Failed to save data to the server.");
// //     } finally {
// //       setIsSaving(false);
// //     }
// //   };

// //   const downloadChart = async () => {
// //     if (!chartRef.current) return;
// //     try {
// //       const canvas = document.createElement('canvas');
// //       const ctx = canvas.getContext('2d');
// //       if (!ctx) return;
      
// //       const svgElement = chartRef.current.querySelector('svg');
// //       if (!svgElement) return;
      
// //       const svgRect = svgElement.getBoundingClientRect();
// //       canvas.width = svgRect.width;
// //       canvas.height = svgRect.height;
      
// //       const svgData = new XMLSerializer().serializeToString(svgElement);
// //       const img = new Image();
      
// //       img.onload = () => {
// //         ctx.fillStyle = "white";
// //         ctx.fillRect(0, 0, canvas.width, canvas.height);
// //         ctx.drawImage(img, 0, 0);
        
// //         canvas.toBlob((blob) => {
// //           if (!blob) return;
// //           const url = URL.createObjectURL(blob);
// //           const link = document.createElement('a');
// //           link.download = `weight-chart-${child?.childName?.replace(/\s+/g, '-') || 'patient'}.png`;
// //           link.href = url;
// //           link.click();
// //           URL.revokeObjectURL(url);
// //         }, 'image/png');
// //       };
// //       img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
// //     } catch (error) {
// //       console.error("Error downloading chart:", error);
// //       toast.error("Failed to download chart");
// //     }
// //   };

// //   const WeightChart = () => {
// //     if (!weightData) return null;

// //     const width = 800;
// //     const height = 350;
// //     const padding = 45;
// //     const chartWidth = width - 2 * padding;
// //     const chartHeight = height - 2 * padding;

// //     const dataPoints = weightData.weightEntries
// //       .map((entry, index) => ({ day: index, value: entry.value ? parseFloat(entry.value) : null }))
// //       .filter(point => point.value !== null);

// //     if (dataPoints.length === 0) {
// //       return (
// //         <div className="flex flex-col items-center justify-center h-full text-slate-400">
// //           <Activity className="h-10 w-10 mb-2 opacity-20" />
// //           <p className="text-sm font-medium">No weight data available to graph</p>
// //         </div>
// //       );
// //     }

// //     const allValues = [
// //       ...dataPoints.map(p => p.value!),
// //       parseFloat(weightData.targetWeight) || 0,
// //       parseFloat(weightData.minimumWeight) || 0
// //     ].filter(v => v > 0);
    
// //     const minValue = Math.min(...allValues) * 0.95;
// //     const maxValue = Math.max(...allValues) * 1.05;
// //     const valueRange = maxValue - minValue || 1; 

// //     const xScale = (day: number) => padding + (day / 59) * chartWidth;
// //     const yScale = (value: number) => padding + chartHeight - ((value - minValue) / valueRange) * chartHeight;

// //     const pathData = dataPoints.map((point, index) => `${index === 0 ? 'M' : 'L'} ${xScale(point.day)} ${yScale(point.value!)}`).join(' ');
// //     const areaData = `${pathData} L ${xScale(dataPoints[dataPoints.length-1].day)} ${padding + chartHeight} L ${xScale(dataPoints[0].day)} ${padding + chartHeight} Z`;

// //     return (
// //       <div className="w-full overflow-x-auto custom-scrollbar">
// //         <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="w-full min-w-[600px]">
          
// //           {/* Grid lines */}
// //           {Array.from({ length: 6 }).map((_, i) => {
// //             const y = padding + (i / 5) * chartHeight;
// //             const value = maxValue - (i / 5) * valueRange;
// //             return (
// //               <g key={`h-grid-${i}`}>
// //                 <line x1={padding} y1={y} x2={padding + chartWidth} y2={y} stroke="#f1f5f9" strokeWidth="1" />
// //                 <text x={padding - 10} y={y + 4} textAnchor="end" fontSize="11" fontWeight="600" fill="#94a3b8">{value.toFixed(1)}</text>
// //               </g>
// //             );
// //           })}
          
// //           {Array.from({ length: 7 }).map((_, i) => {
// //             const x = padding + (i / 6) * chartWidth;
// //             const day = Math.round((i / 6) * 59);
// //             return (
// //               <g key={`v-grid-${i}`}>
// //                 <line x1={x} y1={padding} x2={x} y2={padding + chartHeight} stroke="#f1f5f9" strokeWidth="1" />
// //                 <text x={x} y={padding + chartHeight + 20} textAnchor="middle" fontSize="11" fontWeight="600" fill="#94a3b8">Day {day}</text>
// //               </g>
// //             );
// //           })}
          
// //           {/* Target & Min Lines */}
// //           <line x1={padding} y1={yScale(parseFloat(weightData.targetWeight))} x2={padding + chartWidth} y2={yScale(parseFloat(weightData.targetWeight))} stroke="#e11d48" strokeWidth="2" strokeDasharray="6,4" />
// //           <line x1={padding} y1={yScale(parseFloat(weightData.minimumWeight))} x2={padding + chartWidth} y2={yScale(parseFloat(weightData.minimumWeight))} stroke="#ea580c" strokeWidth="2" strokeDasharray="6,4" />
          
// //           {/* Growth Curve */}
// //           <path d={areaData} fill="rgba(13, 148, 136, 0.1)" />
// //           <path d={pathData} fill="none" stroke="#0d9488" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          
// //           {/* Data Points */}
// //           {dataPoints.map((point) => (
// //             <circle key={`point-${point.day}`} cx={xScale(point.day)} cy={yScale(point.value!)} r="4" fill="white" stroke="#0d9488" strokeWidth="2" />
// //           ))}
          
// //           {/* Axes */}
// //           <line x1={padding} y1={padding} x2={padding} y2={padding + chartHeight} stroke="#cbd5e1" strokeWidth="2" />
// //           <line x1={padding} y1={padding + chartHeight} x2={padding + chartWidth} y2={padding + chartHeight} stroke="#cbd5e1" strokeWidth="2" />
// //           <text x={15} y={height / 2} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#64748b" transform={`rotate(-90 15 ${height / 2})`}>Weight (kg)</text>
          
// //           {/* Legend */}
// //           <g transform={`translate(${width - 240}, 10)`}>
// //             <rect x="0" y="0" width="220" height="30" fill="white" rx="6" className="shadow-sm" />
// //             <line x1="10" y1="15" x2="25" y2="15" stroke="#0d9488" strokeWidth="3" />
// //             <text x="30" y="19" fontSize="11" fontWeight="600" fill="#475569">Actual</text>
// //             <line x1="75" y1="15" x2="90" y2="15" stroke="#e11d48" strokeWidth="2" strokeDasharray="4,2" />
// //             <text x="95" y="19" fontSize="11" fontWeight="600" fill="#475569">Target</text>
// //             <line x1="145" y1="15" x2="160" y2="15" stroke="#ea580c" strokeWidth="2" strokeDasharray="4,2" />
// //             <text x="165" y="19" fontSize="11" fontWeight="600" fill="#475569">Min</text>
// //           </g>
// //         </svg>
// //       </div>
// //     );
// //   };

// //   if (isLoading || !weightData || !child) {
// //     return (
// //       <div className="min-h-screen bg-slate-50 flex items-center justify-center">
// //         <div className="flex flex-col items-center">
// //           <Loader2 className="h-10 w-10 animate-spin text-teal-600 mb-4" />
// //           <p className="text-slate-500 font-medium">Loading clinical data...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-slate-50 pb-12">
// //       <Toaster position="top-center" />
      
// //       {/* Sticky Top Navigation Bar */}
// //       <div className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
// //           <div className="flex items-center gap-4">
// //             <Button onClick={() => router.push("/mtc-user/dashboard/daily-weight")} variant="ghost" size="icon" className="text-slate-500 hover:text-slate-900">
// //               <ArrowLeft className="h-5 w-5" />
// //             </Button>
// //             <div>
// //               <h1 className="text-lg font-bold text-slate-900 leading-tight">Update Flow Sheet</h1>
// //               <p className="text-xs font-medium text-slate-500">60-Day Nutritional Monitoring</p>
// //             </div>
// //           </div>
          
// //           <div className="flex items-center gap-2">
// //             <Button variant="outline" onClick={() => router.push("/mtc-user/dashboard/daily-weight")} className="border-slate-200 text-slate-600 hidden sm:flex">
// //               <X className="mr-2 h-4 w-4" /> Cancel
// //             </Button>
// //             <Button onClick={handleSave} disabled={isSaving} className="bg-teal-600 hover:bg-teal-700 text-white shadow-sm">
// //               {isSaving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
// //               {isSaving ? "Saving..." : "Save Changes"}
// //             </Button>
// //           </div>
// //         </div>
// //       </div>

// //       <main className="max-w-7xl mx-auto px-4 sm:px-6 mt-8">
// //         <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
// //           {/* Left Column: Patient Profile & Targets */}
// //           <div className="lg:col-span-4 space-y-6">
// //             <Card className="border-slate-200 shadow-sm">
// //               <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
// //                 <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
// //                   <User className="h-4 w-4" /> Patient Profile
// //                 </CardTitle>
// //               </CardHeader>
// //               <CardContent className="pt-6">
// //                 <div className="flex items-center gap-4 mb-6">
// //                   <div className="h-14 w-14 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-2xl border-2 border-teal-200 shrink-0">
// //                     {weightData.name.charAt(0)}
// //                   </div>
// //                   <div>
// //                     <h2 className="text-xl font-bold text-slate-900">{weightData.name}</h2>
// //                     <p className="text-sm text-slate-500 font-medium mt-0.5">SAM ID: {weightData.samNumber}</p>
// //                   </div>
// //                 </div>
                
// //                 <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
// //                   <div>
// //                     <p className="text-xs text-slate-400 font-bold uppercase mb-1">Record No</p>
// //                     <p className="text-sm font-semibold text-slate-700">{child?.recordNo}</p>
// //                   </div>
// //                   <div>
// //                     <p className="text-xs text-slate-400 font-bold uppercase mb-1">Adm Weight</p>
// //                     <p className="text-sm font-semibold text-slate-700">{child?.admissionWeight} kg</p>
// //                   </div>
// //                 </div>
// //               </CardContent>
// //             </Card>

// //             <Card className="border-slate-200 shadow-sm overflow-hidden">
// //               <div className="h-1 w-full bg-linear-to-r from-orange-400 to-rose-500"></div>
// //               <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
// //                 <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
// //                   <Target className="h-4 w-4" /> Clinical Targets
// //                 </CardTitle>
// //               </CardHeader>
// //               <CardContent className="pt-6 space-y-5">
// //                 <div className="bg-orange-50 border border-orange-100 rounded-lg p-3">
// //                   <label className="text-xs font-bold text-orange-700 uppercase flex items-center gap-1.5 mb-2">
// //                     <AlertCircle className="h-3.5 w-3.5" /> Minimum Weight (5% Gain)
// //                   </label>
// //                   <div className="flex items-center gap-2">
// //                     <Input type="number" step="0.01" value={weightData.minimumWeight} onChange={(e) => handleMinimumWeightChange(e.target.value)} className="bg-white border-orange-200 font-bold text-slate-700 focus-visible:ring-orange-500" />
// //                     <span className="text-sm font-bold text-slate-400">kg</span>
// //                   </div>
// //                 </div>
// //                 <div className="bg-rose-50 border border-rose-100 rounded-lg p-3">
// //                   <label className="text-xs font-bold text-rose-700 uppercase flex items-center gap-1.5 mb-2">
// //                     <Target className="h-3.5 w-3.5" /> Target Weight (15% Gain)
// //                   </label>
// //                   <div className="flex items-center gap-2">
// //                     <Input value={weightData.targetWeight} readOnly className="bg-white/50 border-rose-200 font-bold text-slate-700 opacity-80 cursor-not-allowed" />
// //                     <span className="text-sm font-bold text-slate-400">kg</span>
// //                   </div>
// //                 </div>
// //               </CardContent>
// //             </Card>
// //           </div>

// //           {/* Right Column: Chart & Data Entry */}
// //           <div className="lg:col-span-8 space-y-6">
// //             <Card className="border-slate-200 shadow-sm">
// //               <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4 flex flex-row items-center justify-between">
// //                 <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
// //                   <Activity className="h-4 w-4" /> Growth Trajectory
// //                 </CardTitle>
// //                 <Button variant="ghost" size="sm" onClick={downloadChart} className="h-8 text-teal-600 hover:text-teal-700 hover:bg-teal-50 -my-2">
// //                   <Download className="h-4 w-4 mr-1.5" /> Export
// //                 </Button>
// //               </CardHeader>
// //               <CardContent className="pt-6">
// //                 <div ref={chartRef} className="h-[350px] w-full">
// //                   <WeightChart />
// //                 </div>
// //               </CardContent>
// //             </Card>

// //             <Card className="border-slate-200 shadow-sm">
// //               <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4 flex flex-row items-center justify-between">
// //                 <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
// //                   <CalendarDays className="h-4 w-4" /> Daily Log (kg)
// //                 </CardTitle>
// //               </CardHeader>
// //               <CardContent className="pt-6">
// //                 <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-x-3 gap-y-4">
// //                   {weightData.weightEntries.map((entry, index) => {
// //                     const isDayZero = index === 0;
// //                     const hasValue = entry.value !== "";
                    
// //                     return (
// //                       <div key={entry.day} className="flex flex-col group">
// //                         <label className={cn(
// //                           "text-[10px] font-bold text-center mb-1.5 uppercase tracking-wide",
// //                           isDayZero ? "text-teal-600" : "text-slate-400 group-hover:text-slate-600"
// //                         )}>
// //                           {isDayZero ? "Adm" : `Day ${index}`}
// //                         </label>
// //                         <Input
// //                           type="number"
// //                           step="0.01"
// //                           min="1"
// //                           max="30"
// //                           value={entry.value}
// //                           onChange={(e) => handleWeightChange(index, e.target.value)}
// //                           className={cn(
// //                             "text-center h-9 text-sm font-semibold transition-all",
// //                             isDayZero ? "bg-teal-50 border-teal-200 text-teal-900 focus-visible:ring-teal-500" :
// //                             hasValue ? "bg-white border-slate-300 text-slate-900 focus-visible:ring-teal-500 shadow-sm" :
// //                             "bg-slate-50 border-slate-200 border-dashed text-slate-900 focus-visible:ring-teal-500 focus:border-solid hover:bg-white"
// //                           )}
// //                           placeholder="--"
// //                         />
// //                       </div>
// //                     );
// //                   })}
// //                 </div>
// //               </CardContent>
// //             </Card>
// //           </div>
// //         </div>
// //       </main>
// //     </div>
// //   );
// // }

// "use client";

// import { useState, useEffect, useRef } from "react";
// import { useRouter, useParams } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { 
//   ArrowLeft, Save, X, Download, Activity, User, Target, AlertCircle, CalendarDays, Loader2
// } from "lucide-react";
// import toast, { Toaster } from "react-hot-toast";
// import { cn } from "@/lib/utils";

// interface Child {
//   id: string;
//   recordNo: string;
//   samNumber: string;
//   childName: string;
//   parentName: string;
//   admissionWeight: string;
// }

// interface WeightEntry {
//   day: string;
//   value: string;
// }

// interface WeightData {
//   childId: string;
//   samNumber: string;
//   name: string;
//   weightEntries: WeightEntry[];
//   minimumWeight: string;
//   targetWeight: string;
// }

// export default function EditWeightEntryPage() {
//   const router = useRouter();
//   const params = useParams();
//   const childId = params.id as string;
//   const chartRef = useRef<HTMLDivElement>(null);
  
//   const [child, setChild] = useState<Child | null>(null);
//   const [weightData, setWeightData] = useState<WeightData | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSaving, setIsSaving] = useState(false);

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         // 1. Fetch Patient Profile Details
//         const childrenRes = await fetch('/api/child-registration');
//         if (!childrenRes.ok) throw new Error('Failed to fetch patient data');
//         const dbChildren = await childrenRes.json();
        
//         // Find specific child. Mapping snake_case DB columns to our interface
//         const foundChildRaw = dbChildren.find((c: any) => c.registration_id?.toString() === childId || c.id === childId);
        
//         if (!foundChildRaw) {
//           toast.error("Child not found");
//           router.push("/mtc-user/dashboard/daily-weight");
//           return;
//         }

//         const foundChild: Child = {
//           id: foundChildRaw.registration_id?.toString() || foundChildRaw.id,
//           recordNo: foundChildRaw.registration_id?.toString() || "N/A",
//           samNumber: foundChildRaw.sam_no || foundChildRaw.samNumber,
//           childName: foundChildRaw.child_full_name || foundChildRaw.childName,
//           parentName: foundChildRaw.guardian_name || foundChildRaw.parentName,
//           admissionWeight: foundChildRaw.admission_weight_kg?.toString() || foundChildRaw.admissionWeight || "0"
//         };
        
//         setChild(foundChild);

//         // 2. Fetch Weight Records from API
//         const weightsRes = await fetch(`/api/daily-weights?childId=${childId}`);
//         const weightsDbResult = await weightsRes.json();

//         let dbWeights: Record<string, string> = {};
//         let savedMin = "";
//         let savedTarget = "";

//         if (weightsDbResult.success && weightsDbResult.data) {
//           dbWeights = weightsDbResult.data.weights_data || {};
//           savedMin = weightsDbResult.data.minimum_weight?.toString() || "";
//           savedTarget = weightsDbResult.data.target_weight?.toString() || "";
//         }

//         // Calculate defaults if no records exist yet
//         const admissionWeightNum = parseFloat(foundChild.admissionWeight) || 0;
//         const defaultTarget = savedTarget || (admissionWeightNum * 1.15).toFixed(2);
//         const defaultMin = savedMin || (admissionWeightNum * 1.05).toFixed(2);

//         // Generate the 60-day array
//         const allDays: WeightEntry[] = [];
//         for (let i = 0; i < 60; i++) {
//           const dayKey = `day${i}`; 
//           let val = dbWeights[dayKey] || "";
          
//           // Fallback: Populate Day 0 with admission weight if blank
//           if (i === 0 && val === "" && admissionWeightNum > 0) {
//             val = foundChild.admissionWeight;
//           }

//           allDays.push({ day: dayKey, value: val });
//         }

//         setWeightData({
//           childId: foundChild.id,
//           samNumber: foundChild.samNumber,
//           name: foundChild.childName,
//           weightEntries: allDays,
//           minimumWeight: defaultMin,
//           targetWeight: defaultTarget
//         });

//       } catch (error) {
//         console.error("Error loading clinical data:", error);
//         toast.error("Failed to load clinical data from server.");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     loadData();
//   }, [childId, router]);

//   const handleWeightChange = (dayIndex: number, value: string) => {
//     if (!weightData) return;
//     const updatedEntries = [...weightData.weightEntries];
//     updatedEntries[dayIndex] = { ...updatedEntries[dayIndex], value: value };
//     setWeightData({ ...weightData, weightEntries: updatedEntries });
//   };

//   const handleMinimumWeightChange = (value: string) => {
//     if (!weightData) return;
//     setWeightData({ ...weightData, minimumWeight: value });
//   };

//   const handleSave = async () => {
//     if (!weightData || !child) return;
//     setIsSaving(true);

//     try {
//       // Format array back into flat JSON dictionary for PostgreSQL
//       const formattedWeights: Record<string, string> = {};
//       weightData.weightEntries.forEach(entry => {
//         if (entry.value !== "") {
//           formattedWeights[entry.day] = entry.value;
//         }
//       });

//       const payload = {
//         childId: child.id,
//         minimumWeight: weightData.minimumWeight,
//         targetWeight: weightData.targetWeight,
//         weightEntries: formattedWeights
//       };

//       const response = await fetch('/api/daily-weights', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload)
//       });

//       if (!response.ok) throw new Error('Failed to save to database');

//       toast.success("Weight entries saved securely!");
//       router.push("/mtc-user/dashboard/daily-weight");
//     } catch (error) {
//       console.error("Error saving data:", error);
//       toast.error("Failed to save data to the server.");
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const downloadChart = async () => {
//     if (!chartRef.current) return;
//     try {
//       const canvas = document.createElement('canvas');
//       const ctx = canvas.getContext('2d');
//       if (!ctx) return;
      
//       const svgElement = chartRef.current.querySelector('svg');
//       if (!svgElement) return;
      
//       const svgRect = svgElement.getBoundingClientRect();
//       canvas.width = svgRect.width;
//       canvas.height = svgRect.height;
      
//       const svgData = new XMLSerializer().serializeToString(svgElement);
//       const img = new Image();
      
//       img.onload = () => {
//         ctx.fillStyle = "white";
//         ctx.fillRect(0, 0, canvas.width, canvas.height);
//         ctx.drawImage(img, 0, 0);
        
//         canvas.toBlob((blob) => {
//           if (!blob) return;
//           const url = URL.createObjectURL(blob);
//           const link = document.createElement('a');
//           link.download = `weight-chart-${child?.childName?.replace(/\s+/g, '-') || 'patient'}.png`;
//           link.href = url;
//           link.click();
//           URL.revokeObjectURL(url);
//         }, 'image/png');
//       };
//       img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
//     } catch (error) {
//       console.error("Error downloading chart:", error);
//       toast.error("Failed to download chart");
//     }
//   };

//   const WeightChart = () => {
//     if (!weightData) return null;

//     const width = 800;
//     const height = 350;
//     const padding = 45;
//     const chartWidth = width - 2 * padding;
//     const chartHeight = height - 2 * padding;

//     const dataPoints = weightData.weightEntries
//       .map((entry, index) => ({ day: index, value: entry.value ? parseFloat(entry.value) : null }))
//       .filter(point => point.value !== null);

//     if (dataPoints.length === 0) {
//       return (
//         <div className="flex flex-col items-center justify-center h-full text-slate-400">
//           <Activity className="h-10 w-10 mb-2 opacity-20" />
//           <p className="text-sm font-medium">No weight data available to graph</p>
//         </div>
//       );
//     }

//     const allValues = [
//       ...dataPoints.map(p => p.value!),
//       parseFloat(weightData.targetWeight) || 0,
//       parseFloat(weightData.minimumWeight) || 0
//     ].filter(v => v > 0);
    
//     const minValue = Math.min(...allValues) * 0.95;
//     const maxValue = Math.max(...allValues) * 1.05;
//     const valueRange = maxValue - minValue || 1; 

//     const xScale = (day: number) => padding + (day / 59) * chartWidth;
//     const yScale = (value: number) => padding + chartHeight - ((value - minValue) / valueRange) * chartHeight;

//     const pathData = dataPoints.map((point, index) => `${index === 0 ? 'M' : 'L'} ${xScale(point.day)} ${yScale(point.value!)}`).join(' ');
//     const areaData = `${pathData} L ${xScale(dataPoints[dataPoints.length-1].day)} ${padding + chartHeight} L ${xScale(dataPoints[0].day)} ${padding + chartHeight} Z`;

//     return (
//       <div className="w-full overflow-x-auto custom-scrollbar">
//         <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="w-full min-w-[600px]">
          
//           {/* Grid lines */}
//           {Array.from({ length: 6 }).map((_, i) => {
//             const y = padding + (i / 5) * chartHeight;
//             const value = maxValue - (i / 5) * valueRange;
//             return (
//               <g key={`h-grid-${i}`}>
//                 <line x1={padding} y1={y} x2={padding + chartWidth} y2={y} stroke="#f1f5f9" strokeWidth="1" />
//                 <text x={padding - 10} y={y + 4} textAnchor="end" fontSize="11" fontWeight="600" fill="#94a3b8">{value.toFixed(1)}</text>
//               </g>
//             );
//           })}
          
//           {Array.from({ length: 7 }).map((_, i) => {
//             const x = padding + (i / 6) * chartWidth;
//             const day = Math.round((i / 6) * 59);
//             return (
//               <g key={`v-grid-${i}`}>
//                 <line x1={x} y1={padding} x2={x} y2={padding + chartHeight} stroke="#f1f5f9" strokeWidth="1" />
//                 <text x={x} y={padding + chartHeight + 20} textAnchor="middle" fontSize="11" fontWeight="600" fill="#94a3b8">Day {day}</text>
//               </g>
//             );
//           })}
          
//           {/* Target & Min Lines */}
//           <line x1={padding} y1={yScale(parseFloat(weightData.targetWeight))} x2={padding + chartWidth} y2={yScale(parseFloat(weightData.targetWeight))} stroke="#6366f1" strokeWidth="2" strokeDasharray="6,4" />
//           <line x1={padding} y1={yScale(parseFloat(weightData.minimumWeight))} x2={padding + chartWidth} y2={yScale(parseFloat(weightData.minimumWeight))} stroke="#0ea5e9" strokeWidth="2" strokeDasharray="6,4" />
          
//           {/* Growth Curve */}
//           <path d={areaData} fill="rgba(37, 99, 235, 0.08)" />
//           <path d={pathData} fill="none" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          
//           {/* Data Points */}
//           {dataPoints.map((point) => (
//             <circle key={`point-${point.day}`} cx={xScale(point.day)} cy={yScale(point.value!)} r="4" fill="white" stroke="#2563eb" strokeWidth="2" className="hover:r-6 transition-all duration-300" />
//           ))}
          
//           {/* Axes */}
//           <line x1={padding} y1={padding} x2={padding} y2={padding + chartHeight} stroke="#cbd5e1" strokeWidth="2" />
//           <line x1={padding} y1={padding + chartHeight} x2={padding + chartWidth} y2={padding + chartHeight} stroke="#cbd5e1" strokeWidth="2" />
//           <text x={15} y={height / 2} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#64748b" transform={`rotate(-90 15 ${height / 2})`}>Weight (kg)</text>
          
//           {/* Legend */}
//           <g transform={`translate(${width - 240}, 10)`}>
//             <rect x="0" y="0" width="220" height="30" fill="white" rx="6" className="shadow-sm border border-slate-100" />
//             <line x1="10" y1="15" x2="25" y2="15" stroke="#2563eb" strokeWidth="3" />
//             <text x="30" y="19" fontSize="11" fontWeight="600" fill="#475569">Actual</text>
//             <line x1="75" y1="15" x2="90" y2="15" stroke="#6366f1" strokeWidth="2" strokeDasharray="4,2" />
//             <text x="95" y="19" fontSize="11" fontWeight="600" fill="#475569">Target</text>
//             <line x1="145" y1="15" x2="160" y2="15" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="4,2" />
//             <text x="165" y="19" fontSize="11" fontWeight="600" fill="#475569">Min</text>
//           </g>
//         </svg>
//       </div>
//     );
//   };

//   if (isLoading || !weightData || !child) {
//     return (
//       <div className="min-h-screen bg-slate-50 flex items-center justify-center">
//         <div className="flex flex-col items-center">
//           <Loader2 className="h-10 w-10 animate-spin text-blue-600 mb-4" />
//           <p className="text-slate-500 font-medium tracking-wide">Loading clinical data...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-slate-50/50 pb-12 font-sans selection:bg-blue-100 selection:text-blue-900">
//       <Toaster position="top-center" />
      
//       {/* Sticky Top Navigation Bar - Glass Effect */}
//       <div className="bg-white/80 backdrop-blur-md border-b border-slate-200/70 sticky top-0 z-30 shadow-sm transition-all duration-300">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
//           <div className="flex items-center gap-4">
//             <Button onClick={() => router.push("/mtc-user/dashboard/daily-weight")} variant="ghost" size="icon" className="text-slate-500 hover:text-blue-700 hover:bg-blue-50 rounded-full transition-colors">
//               <ArrowLeft className="h-5 w-5" />
//             </Button>
//             <div>
//               <h1 className="text-lg font-bold text-slate-900 leading-tight">Update Flow Sheet</h1>
//               <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">60-Day Nutritional Monitoring</p>
//             </div>
//           </div>
          
//           <div className="flex items-center gap-3">
//             <Button variant="outline" onClick={() => router.push("/mtc-user/dashboard/daily-weight")} className="border-slate-200 text-slate-600 hover:bg-slate-50 hidden sm:flex rounded-xl transition-colors">
//               <X className="mr-2 h-4 w-4" /> Cancel
//             </Button>
//             <Button onClick={handleSave} disabled={isSaving} className="bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20 rounded-xl transition-all">
//               {isSaving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
//               {isSaving ? "Saving..." : "Save Changes"}
//             </Button>
//           </div>
//         </div>
//       </div>

//       <main className="max-w-7xl mx-auto px-4 sm:px-6 mt-8">
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
//           {/* Left Column: Patient Profile & Targets */}
//           <div className="lg:col-span-4 space-y-6">
//             <Card className="border-slate-200/70 shadow-sm hover:shadow-md transition-shadow duration-300 rounded-2xl overflow-hidden bg-white">
//               <CardHeader className="bg-slate-50/50 border-b border-slate-100/80 pb-4">
//                 <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
//                   <User className="h-4 w-4 text-blue-500" /> Patient Profile
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="pt-6">
//                 <div className="flex items-center gap-4 mb-6">
//                   <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-700 flex items-center justify-center font-bold text-2xl border-2 border-white shadow-sm shrink-0">
//                     {weightData.name.charAt(0)}
//                   </div>
//                   <div>
//                     <h2 className="text-xl font-bold text-slate-900">{weightData.name}</h2>
//                     <p className="text-sm text-slate-500 font-medium mt-0.5 flex items-center gap-1.5">
//                       <span className="bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200 text-xs text-slate-600">ID: {weightData.samNumber}</span>
//                     </p>
//                   </div>
//                 </div>
                
//                 <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
//                   <div className="bg-slate-50 rounded-xl p-3 border border-slate-100/50">
//                     <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Record No</p>
//                     <p className="text-sm font-semibold text-slate-800">{child?.recordNo}</p>
//                   </div>
//                   <div className="bg-slate-50 rounded-xl p-3 border border-slate-100/50">
//                     <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Adm Weight</p>
//                     <p className="text-sm font-semibold text-slate-800">{child?.admissionWeight} kg</p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card className="border-slate-200/70 shadow-sm hover:shadow-md transition-shadow duration-300 rounded-2xl overflow-hidden bg-white">
//               <div className="h-1.5 w-full bg-gradient-to-r from-sky-400 to-indigo-500"></div>
//               <CardHeader className="bg-slate-50/50 border-b border-slate-100/80 pb-4">
//                 <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
//                   <Target className="h-4 w-4 text-indigo-500" /> Clinical Targets
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="pt-6 space-y-5">
//                 <div className="bg-sky-50/50 border border-sky-100 rounded-xl p-4 transition-colors hover:bg-sky-50">
//                   <label className="text-xs font-bold text-sky-700 uppercase tracking-wide flex items-center gap-1.5 mb-2.5">
//                     <AlertCircle className="h-4 w-4" /> Minimum Weight (5% Gain)
//                   </label>
//                   <div className="flex items-center gap-3">
//                     <Input type="number" step="0.01" value={weightData.minimumWeight} onChange={(e) => handleMinimumWeightChange(e.target.value)} className="bg-white border-sky-200/80 font-bold text-slate-800 focus-visible:ring-sky-500 shadow-sm rounded-lg" />
//                     <span className="text-sm font-bold text-slate-400">kg</span>
//                   </div>
//                 </div>
//                 <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-4 transition-colors hover:bg-indigo-50">
//                   <label className="text-xs font-bold text-indigo-700 uppercase tracking-wide flex items-center gap-1.5 mb-2.5">
//                     <Target className="h-4 w-4" /> Target Weight (15% Gain)
//                   </label>
//                   <div className="flex items-center gap-3">
//                     <Input value={weightData.targetWeight} readOnly className="bg-white/60 border-indigo-200/80 font-bold text-slate-800 opacity-80 cursor-not-allowed shadow-sm rounded-lg" />
//                     <span className="text-sm font-bold text-slate-400">kg</span>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Right Column: Chart & Data Entry */}
//           <div className="lg:col-span-8 space-y-6">
//             <Card className="border-slate-200/70 shadow-sm hover:shadow-md transition-shadow duration-300 rounded-2xl bg-white">
//               <CardHeader className="bg-slate-50/50 border-b border-slate-100/80 pb-4 flex flex-row items-center justify-between">
//                 <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
//                   <Activity className="h-4 w-4 text-blue-500" /> Growth Trajectory
//                 </CardTitle>
//                 <Button variant="ghost" size="sm" onClick={downloadChart} className="h-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50 -my-2 rounded-lg transition-colors">
//                   <Download className="h-4 w-4 mr-1.5" /> Export
//                 </Button>
//               </CardHeader>
//               <CardContent className="pt-6">
//                 <div ref={chartRef} className="h-[350px] w-full">
//                   <WeightChart />
//                 </div>
//               </CardContent>
//             </Card>

//             <Card className="border-slate-200/70 shadow-sm hover:shadow-md transition-shadow duration-300 rounded-2xl bg-white">
//               <CardHeader className="bg-slate-50/50 border-b border-slate-100/80 pb-4 flex flex-row items-center justify-between">
//                 <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
//                   <CalendarDays className="h-4 w-4 text-blue-500" /> Daily Log (kg)
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="pt-6">
//                 <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-x-3 gap-y-5">
//                   {weightData.weightEntries.map((entry, index) => {
//                     const isDayZero = index === 0;
//                     const hasValue = entry.value !== "";
                    
//                     return (
//                       <div key={entry.day} className="flex flex-col group">
//                         <label className={cn(
//                           "text-[10px] font-bold text-center mb-1.5 uppercase tracking-wide transition-colors",
//                           isDayZero ? "text-blue-600" : "text-slate-400 group-hover:text-blue-500"
//                         )}>
//                           {isDayZero ? "Adm" : `Day ${index}`}
//                         </label>
//                         <Input
//                           type="number"
//                           step="0.01"
//                           min="1"
//                           max="30"
//                           value={entry.value}
//                           onChange={(e) => handleWeightChange(index, e.target.value)}
//                           className={cn(
//                             "text-center h-10 text-sm font-semibold transition-all duration-200 rounded-lg",
//                             isDayZero ? "bg-blue-50 border-blue-200 text-blue-900 focus-visible:ring-blue-500 shadow-inner" :
//                             hasValue ? "bg-white border-slate-300 text-slate-900 focus-visible:ring-blue-500 shadow-sm" :
//                             "bg-slate-50 border-slate-200 border-dashed text-slate-900 focus-visible:ring-blue-500 focus:border-solid hover:bg-white hover:border-blue-300"
//                           )}
//                           placeholder="--"
//                         />
//                       </div>
//                     );
//                   })}
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ArrowLeft, Save, X, Download, Activity, User, Target, AlertCircle, CalendarDays, Loader2
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { cn } from "@/lib/utils";

interface Child {
  id: string;
  recordNo: string;
  samNumber: string;
  childName: string;
  parentName: string;
  admissionWeight: string;
}

interface WeightEntry {
  day: string;
  value: string;
}

interface WeightData {
  childId: string;
  samNumber: string;
  name: string;
  weightEntries: WeightEntry[];
  minimumWeight: string;
  targetWeight: string;
}

interface RawChildFromDB {
  id: string;
  registration_id?: string | number;
  sam_no?: string;
  samNumber?: string;
  child_full_name?: string;
  childName?: string;
  guardian_name?: string;
  parentName?: string;
  admission_weight_kg?: string | number;
  admissionWeight?: string;
}

export default function EditWeightEntryPage() {
  const router = useRouter();
  const params = useParams();
  const childId = params.id as string;
  const chartRef = useRef<HTMLDivElement>(null);
  
  const [child, setChild] = useState<Child | null>(null);
  const [weightData, setWeightData] = useState<WeightData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        // 1. Fetch Patient Profile Details
        const childrenRes = await fetch('/api/child-registration');
        if (!childrenRes.ok) throw new Error('Failed to fetch patient data');
        const dbChildren = await childrenRes.json() as RawChildFromDB[];
        
        // Find specific child. Mapping snake_case DB columns to our interface
        const foundChildRaw = dbChildren.find((c) => c.registration_id?.toString() === childId || c.id === childId);
        
        if (!foundChildRaw) {
          toast.error("Child not found");
          router.push("/mtc-user/dashboard/daily-weight");
          return;
        }

        const foundChild: Child = {
          id: foundChildRaw.registration_id?.toString() || foundChildRaw.id,
          recordNo: foundChildRaw.registration_id?.toString() || "N/A",
          samNumber: foundChildRaw.sam_no || foundChildRaw.samNumber || "",
          childName: foundChildRaw.child_full_name || foundChildRaw.childName || "",
          parentName: foundChildRaw.guardian_name || foundChildRaw.parentName || "",
          admissionWeight: foundChildRaw.admission_weight_kg?.toString() || foundChildRaw.admissionWeight || "0"
        };
        
        setChild(foundChild);

        // 2. Fetch Weight Records from API
        const weightsRes = await fetch(`/api/daily-weights?childId=${childId}`);
        const weightsDbResult = await weightsRes.json() as { 
          success: boolean; 
          data?: { weights_data?: Record<string, string>; minimum_weight?: string | number; target_weight?: string | number } 
        };

        let dbWeights: Record<string, string> = {};
        let savedMin = "";
        let savedTarget = "";

        if (weightsDbResult.success && weightsDbResult.data) {
          dbWeights = weightsDbResult.data.weights_data || {};
          savedMin = weightsDbResult.data.minimum_weight?.toString() || "";
          savedTarget = weightsDbResult.data.target_weight?.toString() || "";
        }

        // Calculate defaults if no records exist yet
        const admissionWeightNum = parseFloat(foundChild.admissionWeight) || 0;
        const defaultTarget = savedTarget || (admissionWeightNum * 1.15).toFixed(2);
        const defaultMin = savedMin || (admissionWeightNum * 1.05).toFixed(2);

        // Generate the 60-day array
        const allDays: WeightEntry[] = [];
        for (let i = 0; i < 60; i++) {
          const dayKey = `day${i}`; 
          let val = dbWeights[dayKey] || "";
          
          // Fallback: Populate Day 0 with admission weight if blank
          if (i === 0 && val === "" && admissionWeightNum > 0) {
            val = foundChild.admissionWeight;
          }

          allDays.push({ day: dayKey, value: val });
        }

        setWeightData({
          childId: foundChild.id,
          samNumber: foundChild.samNumber,
          name: foundChild.childName,
          weightEntries: allDays,
          minimumWeight: defaultMin,
          targetWeight: defaultTarget
        });

      } catch (error) {
        console.error("Error loading clinical data:", error);
        toast.error("Failed to load clinical data from server.");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [childId, router]);

  const handleWeightChange = (dayIndex: number, value: string) => {
    if (!weightData) return;
    const updatedEntries = [...weightData.weightEntries];
    updatedEntries[dayIndex] = { ...updatedEntries[dayIndex], value: value };
    setWeightData({ ...weightData, weightEntries: updatedEntries });
  };

  const handleMinimumWeightChange = (value: string) => {
    if (!weightData) return;
    setWeightData({ ...weightData, minimumWeight: value });
  };

  const handleSave = async () => {
    if (!weightData || !child) return;
    setIsSaving(true);

    try {
      // Format array back into flat JSON dictionary for PostgreSQL
      const formattedWeights: Record<string, string> = {};
      weightData.weightEntries.forEach(entry => {
        if (entry.value !== "") {
          formattedWeights[entry.day] = entry.value;
        }
      });

      const payload = {
        childId: child.id,
        minimumWeight: weightData.minimumWeight,
        targetWeight: weightData.targetWeight,
        weightEntries: formattedWeights
      };

      const response = await fetch('/api/daily-weights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('Failed to save to database');

      toast.success("Weight entries saved securely!");
      router.push("/mtc-user/dashboard/daily-weight");
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error("Failed to save data to the server.");
    } finally {
      setIsSaving(false);
    }
  };

  const downloadChart = async () => {
    if (!chartRef.current) return;
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      const svgElement = chartRef.current.querySelector('svg');
      if (!svgElement) return;
      
      const svgRect = svgElement.getBoundingClientRect();
      canvas.width = svgRect.width;
      canvas.height = svgRect.height;
      
      const svgData = new XMLSerializer().serializeToString(svgElement);
      const img = new Image();
      
      img.onload = () => {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        
        canvas.toBlob((blob) => {
          if (!blob) return;
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.download = `weight-chart-${child?.childName?.replace(/\s+/g, '-') || 'patient'}.png`;
          link.href = url;
          link.click();
          URL.revokeObjectURL(url);
        }, 'image/png');
      };
      img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    } catch (error) {
      console.error("Error downloading chart:", error);
      toast.error("Failed to download chart");
    }
  };

  const WeightChart = () => {
    if (!weightData) return null;

    const width = 800;
    const height = 350;
    const padding = 45;
    const chartWidth = width - 2 * padding;
    const chartHeight = height - 2 * padding;

    const dataPoints = weightData.weightEntries
      .map((entry, index) => ({ day: index, value: entry.value ? parseFloat(entry.value) : null }))
      .filter((point): point is { day: number; value: number } => point.value !== null);

    if (dataPoints.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-slate-400">
          <Activity className="h-10 w-10 mb-2 opacity-20" />
          <p className="text-sm font-medium">No weight data available to graph</p>
        </div>
      );
    }

    const allValues = [
      ...dataPoints.map(p => p.value),
      parseFloat(weightData.targetWeight) || 0,
      parseFloat(weightData.minimumWeight) || 0
    ].filter(v => v > 0);
    
    const minValue = Math.min(...allValues) * 0.95;
    const maxValue = Math.max(...allValues) * 1.05;
    const valueRange = maxValue - minValue || 1; 

    const xScale = (day: number) => padding + (day / 59) * chartWidth;
    const yScale = (value: number) => padding + chartHeight - ((value - minValue) / valueRange) * chartHeight;

    const pathData = dataPoints.map((point, index) => `${index === 0 ? 'M' : 'L'} ${xScale(point.day)} ${yScale(point.value)}`).join(' ');
    const areaData = `${pathData} L ${xScale(dataPoints[dataPoints.length-1].day)} ${padding + chartHeight} L ${xScale(dataPoints[0].day)} ${padding + chartHeight} Z`;

    return (
      <div className="w-full overflow-x-auto custom-scrollbar">
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="w-full min-w-[600px]">
          
          {/* Grid lines */}
          {Array.from({ length: 6 }).map((_, i) => {
            const y = padding + (i / 5) * chartHeight;
            const value = maxValue - (i / 5) * valueRange;
            return (
              <g key={`h-grid-${i}`}>
                <line x1={padding} y1={y} x2={padding + chartWidth} y2={y} stroke="#f1f5f9" strokeWidth="1" />
                <text x={padding - 10} y={y + 4} textAnchor="end" fontSize="11" fontWeight="600" fill="#94a3b8">{value.toFixed(1)}</text>
              </g>
            );
          })}
          
          {Array.from({ length: 7 }).map((_, i) => {
            const x = padding + (i / 6) * chartWidth;
            const day = Math.round((i / 6) * 59);
            return (
              <g key={`v-grid-${i}`}>
                <line x1={x} y1={padding} x2={x} y2={padding + chartHeight} stroke="#f1f5f9" strokeWidth="1" />
                <text x={x} y={padding + chartHeight + 20} textAnchor="middle" fontSize="11" fontWeight="600" fill="#94a3b8">Day {day}</text>
              </g>
            );
          })}
          
          {/* Target & Min Lines */}
          <line x1={padding} y1={yScale(parseFloat(weightData.targetWeight))} x2={padding + chartWidth} y2={yScale(parseFloat(weightData.targetWeight))} stroke="#6366f1" strokeWidth="2" strokeDasharray="6,4" />
          <line x1={padding} y1={yScale(parseFloat(weightData.minimumWeight))} x2={padding + chartWidth} y2={yScale(parseFloat(weightData.minimumWeight))} stroke="#0ea5e9" strokeWidth="2" strokeDasharray="6,4" />
          
          {/* Growth Curve */}
          <path d={areaData} fill="rgba(37, 99, 235, 0.08)" />
          <path d={pathData} fill="none" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          
          {/* Data Points */}
          {dataPoints.map((point) => (
            <circle key={`point-${point.day}`} cx={xScale(point.day)} cy={yScale(point.value)} r="4" fill="white" stroke="#2563eb" strokeWidth="2" className="hover:r-6 transition-all duration-300" />
          ))}
          
          {/* Axes */}
          <line x1={padding} y1={padding} x2={padding} y2={padding + chartHeight} stroke="#cbd5e1" strokeWidth="2" />
          <line x1={padding} y1={padding + chartHeight} x2={padding + chartWidth} y2={padding + chartHeight} stroke="#cbd5e1" strokeWidth="2" />
          <text x={15} y={height / 2} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#64748b" transform={`rotate(-90 15 ${height / 2})`}>Weight (kg)</text>
          
          {/* Legend */}
          <g transform={`translate(${width - 240}, 10)`}>
            <rect x="0" y="0" width="220" height="30" fill="white" rx="6" className="shadow-sm border border-slate-100" />
            <line x1="10" y1="15" x2="25" y2="15" stroke="#2563eb" strokeWidth="3" />
            <text x="30" y="19" fontSize="11" fontWeight="600" fill="#475569">Actual</text>
            <line x1="75" y1="15" x2="90" y2="15" stroke="#6366f1" strokeWidth="2" strokeDasharray="4,2" />
            <text x="95" y="19" fontSize="11" fontWeight="600" fill="#475569">Target</text>
            <line x1="145" y1="15" x2="160" y2="15" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="4,2" />
            <text x="165" y="19" fontSize="11" fontWeight="600" fill="#475569">Min</text>
          </g>
        </svg>
      </div>
    );
  };

  if (isLoading || !weightData || !child) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader2 className="h-10 w-10 animate-spin text-blue-600 mb-4" />
          <p className="text-slate-500 font-medium tracking-wide">Loading clinical data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 pb-12 font-sans selection:bg-blue-100 selection:text-blue-900">
      <Toaster position="top-center" />
      
      {/* Sticky Top Navigation Bar - Glass Effect */}
      <div className="bg-white/80 backdrop-blur-md border-b border-slate-200/70 sticky top-0 z-30 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button onClick={() => router.push("/mtc-user/dashboard/daily-weight")} variant="ghost" size="icon" className="text-slate-500 hover:text-blue-700 hover:bg-blue-50 rounded-full transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-lg font-bold text-slate-900 leading-tight">Update Flow Sheet</h1>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">60-Day Nutritional Monitoring</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => router.push("/mtc-user/dashboard/daily-weight")} className="border-slate-200 text-slate-600 hover:bg-slate-50 hidden sm:flex rounded-xl transition-colors">
              <X className="mr-2 h-4 w-4" /> Cancel
            </Button>
            <Button onClick={handleSave} disabled={isSaving} className="bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20 rounded-xl transition-all">
              {isSaving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Patient Profile & Targets */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="border-slate-200/70 shadow-sm hover:shadow-md transition-shadow duration-300 rounded-2xl overflow-hidden bg-white">
              <CardHeader className="bg-slate-50/50 border-b border-slate-100/80 pb-4">
                <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                  <User className="h-4 w-4 text-blue-500" /> Patient Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-700 flex items-center justify-center font-bold text-2xl border-2 border-white shadow-sm shrink-0">
                    {weightData.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">{weightData.name}</h2>
                    <p className="text-sm text-slate-500 font-medium mt-0.5 flex items-center gap-1.5">
                      <span className="bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200 text-xs text-slate-600">ID: {weightData.samNumber}</span>
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100/50">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Record No</p>
                    <p className="text-sm font-semibold text-slate-800">{child?.recordNo}</p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100/50">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Adm Weight</p>
                    <p className="text-sm font-semibold text-slate-800">{child?.admissionWeight} kg</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200/70 shadow-sm hover:shadow-md transition-shadow duration-300 rounded-2xl overflow-hidden bg-white">
              <div className="h-1.5 w-full bg-gradient-to-r from-sky-400 to-indigo-500"></div>
              <CardHeader className="bg-slate-50/50 border-b border-slate-100/80 pb-4">
                <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                  <Target className="h-4 w-4 text-indigo-500" /> Clinical Targets
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-5">
                <div className="bg-sky-50/50 border border-sky-100 rounded-xl p-4 transition-colors hover:bg-sky-50">
                  <label className="text-xs font-bold text-sky-700 uppercase tracking-wide flex items-center gap-1.5 mb-2.5">
                    <AlertCircle className="h-4 w-4" /> Minimum Weight (5% Gain)
                  </label>
                  <div className="flex items-center gap-3">
                    <Input type="number" step="0.01" value={weightData.minimumWeight} onChange={(e) => handleMinimumWeightChange(e.target.value)} className="bg-white border-sky-200/80 font-bold text-slate-800 focus-visible:ring-sky-500 shadow-sm rounded-lg" />
                    <span className="text-sm font-bold text-slate-400">kg</span>
                  </div>
                </div>
                <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-4 transition-colors hover:bg-indigo-50">
                  <label className="text-xs font-bold text-indigo-700 uppercase tracking-wide flex items-center gap-1.5 mb-2.5">
                    <Target className="h-4 w-4" /> Target Weight (15% Gain)
                  </label>
                  <div className="flex items-center gap-3">
                    <Input value={weightData.targetWeight} readOnly className="bg-white/60 border-indigo-200/80 font-bold text-slate-800 opacity-80 cursor-not-allowed shadow-sm rounded-lg" />
                    <span className="text-sm font-bold text-slate-400">kg</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Chart & Data Entry */}
          <div className="lg:col-span-8 space-y-6">
            <Card className="border-slate-200/70 shadow-sm hover:shadow-md transition-shadow duration-300 rounded-2xl bg-white">
              <CardHeader className="bg-slate-50/50 border-b border-slate-100/80 pb-4 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                  <Activity className="h-4 w-4 text-blue-500" /> Growth Trajectory
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={downloadChart} className="h-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50 -my-2 rounded-lg transition-colors">
                  <Download className="h-4 w-4 mr-1.5" /> Export
                </Button>
              </CardHeader>
              <CardContent className="pt-6">
                <div ref={chartRef} className="h-[350px] w-full">
                  <WeightChart />
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200/70 shadow-sm hover:shadow-md transition-shadow duration-300 rounded-2xl bg-white">
              <CardHeader className="bg-slate-50/50 border-b border-slate-100/80 pb-4 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-blue-500" /> Daily Log (kg)
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-x-3 gap-y-5">
                  {weightData.weightEntries.map((entry, index) => {
                    const isDayZero = index === 0;
                    const hasValue = entry.value !== "";
                    
                    return (
                      <div key={entry.day} className="flex flex-col group">
                        <label className={cn(
                          "text-[10px] font-bold text-center mb-1.5 uppercase tracking-wide transition-colors",
                          isDayZero ? "text-blue-600" : "text-slate-400 group-hover:text-blue-500"
                        )}>
                          {isDayZero ? "Adm" : `Day ${index}`}
                        </label>
                        <Input
                          type="number"
                          step="0.01"
                          min="1"
                          max="30"
                          value={entry.value}
                          onChange={(e) => handleWeightChange(index, e.target.value)}
                          className={cn(
                            "text-center h-10 text-sm font-semibold transition-all duration-200 rounded-lg",
                            isDayZero ? "bg-blue-50 border-blue-200 text-blue-900 focus-visible:ring-blue-500 shadow-inner" :
                            hasValue ? "bg-white border-slate-300 text-slate-900 focus-visible:ring-blue-500 shadow-sm" :
                            "bg-slate-50 border-slate-200 border-dashed text-slate-900 focus-visible:ring-blue-500 focus:border-solid hover:bg-white hover:border-blue-300"
                          )}
                          placeholder="--"
                        />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}