// // // "use client";

// // // import React, { useState, useEffect } from "react";
// // // import { useRouter } from "next/navigation";
// // // import { 
// // //   HeartPulse, Apple, Baby, User, CheckCircle, ArrowLeft, 
// // //   Activity, MessageCircle, Pill, ClipboardList
// // // } from "lucide-react";
// // // import toast, { Toaster } from "react-hot-toast";

// // // // --- Utility for BMI Calculation ---
// // // const calculateBMI = (weight: number, heightCm: number) => {
// // //   if (!weight || !heightCm) return "";
// // //   const heightM = heightCm / 100;
// // //   const bmi = weight / (heightM * heightM);
// // //   return bmi.toFixed(1);
// // // };

// // // // --- UI Components ---
// // // import { clsx, type ClassValue } from "clsx";
// // // import { twMerge } from "tailwind-merge";

// // // function cn(...inputs: ClassValue[]) {
// // //   return twMerge(clsx(inputs));
// // // }

// // // const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
// // //   ({ className, type, ...props }, ref) => {
// // //     return (
// // //       <input
// // //         type={type}
// // //         className={cn(
// // //           "flex h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 focus:bg-white transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50",
// // //           className
// // //         )}
// // //         ref={ref}
// // //         {...props}
// // //       />
// // //     );
// // //   }
// // // );
// // // Input.displayName = "Input";

// // // const Button = React.forwardRef<any, any>(
// // //   ({ className, variant = 'default', href, ...props }, ref) => {
// // //     const classes = cn(
// // //       "inline-flex items-center justify-center rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]",
// // //       variant === 'default' ? "bg-indigo-600 text-white shadow-md shadow-indigo-200 hover:bg-indigo-700 h-11 py-2 px-6" : "",
// // //       variant === 'outline' ? "border border-slate-200 bg-white shadow-sm hover:bg-slate-50 hover:text-slate-900 h-11 py-2 px-6 text-slate-700" : "",
// // //       variant === 'ghost' ? "hover:bg-slate-100 hover:text-slate-900 h-11 py-2 px-6 text-slate-600" : "",
// // //       className
// // //     );
// // //     if (href) return <a href={href} className={classes} ref={ref} {...props} />;
// // //     return <button ref={ref} className={classes} {...props} />;
// // //   }
// // // );
// // // Button.displayName = "Button";

// // // const Card = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
// // //   <div className={cn("rounded-2xl border border-slate-200 bg-white text-slate-950 shadow-sm", className)} {...props} />
// // // );
// // // const CardHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
// // //   <div className={cn("flex flex-col space-y-1.5 p-6 md:p-8 border-b border-slate-100", className)} {...props} />
// // // );
// // // const CardContent = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
// // //   <div className={cn("p-6 md:p-8", className)} {...props} />
// // // );

// // // const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
// // //   ({ className, ...props }, ref) => (
// // //     <label ref={ref} className={cn("text-sm font-semibold text-slate-700 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block", className)} {...props} />
// // //   )
// // // );
// // // Label.displayName = "Label";

// // // const Select = ({ name, value, onValueChange, required, children, disabled }: any) => {
// // //   const [internalValue, setInternalValue] = useState(value || "");
  
// // //   useEffect(() => {
// // //     if (value !== undefined) setInternalValue(value);
// // //   }, [value]);

// // //   const options: {value: string, label: string}[] = [];
// // //   let placeholder = "Select Option";
  
// // //   React.Children.forEach(children, child => {
// // //     if (child && child.type?.name === 'SelectTrigger') {
// // //       React.Children.forEach(child.props.children, triggerChild => {
// // //         if (triggerChild && triggerChild.type?.name === 'SelectValue') placeholder = triggerChild.props.placeholder || "Select";
// // //       });
// // //     }
// // //     if (child && child.type?.name === 'SelectContent') {
// // //       React.Children.forEach(child.props.children, itemChild => {
// // //         if (itemChild && itemChild.type?.name === 'SelectItem') {
// // //           options.push({ value: itemChild.props.value, label: itemChild.props.children });
// // //         }
// // //       });
// // //     }
// // //   });

// // //   const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
// // //     setInternalValue(e.target.value);
// // //     if (onValueChange) onValueChange(e.target.value);
// // //   };

// // //   return (
// // //     <select 
// // //       name={name} 
// // //       value={internalValue} 
// // //       onChange={handleChange}
// // //       required={required}
// // //       disabled={disabled}
// // //       className={cn(
// // //         "flex h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 focus:bg-white transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
// // //       )}
// // //     >
// // //       <option value="" disabled>{placeholder}</option>
// // //       {options.map((opt, i) => <option key={i} value={opt.value}>{opt.label}</option>)}
// // //     </select>
// // //   );
// // // };
// // // const SelectTrigger = ({ children }: any) => <>{children}</>;
// // // const SelectValue = ({ placeholder }: any) => <>{placeholder}</>;
// // // const SelectContent = ({ children }: any) => <>{children}</>;
// // // const SelectItem = ({ children }: any) => <>{children}</>;

// // // // --- Main Component ---
// // // export default function MaternalNutritionPage() {
// // //   const router = useRouter();
// // //   const [mounted, setMounted] = useState(false);
// // //   const [loading, setLoading] = useState(false);
// // //   const [isSubmitted, setIsSubmitted] = useState(false);

// // //   // Data States
// // //   const [registeredChildren, setRegisteredChildren] = useState<any[]>([]);
// // //   const [savedRecords, setSavedRecords] = useState<any[]>([]);
// // //   const [selectedChildId, setSelectedChildId] = useState("");
// // //   const [selectedChild, setSelectedChild] = useState<any>(null);

// // //   // Form States - Vitals
// // //   const [motherWeight, setMotherWeight] = useState("");
// // //   const [motherHeight, setMotherHeight] = useState("");
// // //   const [bmi, setBmi] = useState("");
  
// // //   // Counseling Multi-select
// // //   const [counselingTopics, setCounselingTopics] = useState<{ [key: string]: boolean }>({});

// // //   // Load children and previous records on mount
// // //   useEffect(() => {
// // //     setMounted(true);
// // //     const storedChildren = localStorage.getItem('registeredChildren');
// // //     if (storedChildren) {
// // //       setRegisteredChildren(JSON.parse(storedChildren));
// // //     }
// // //     loadRecords();
// // //   }, []);

// // //   const loadRecords = () => {
// // //     const storedRecords = localStorage.getItem('maternalNutritionRecords');
// // //     if (storedRecords) {
// // //       setSavedRecords(JSON.parse(storedRecords));
// // //     }
// // //   };

// // //   // Auto-fill selected child data
// // //   useEffect(() => {
// // //     if (selectedChildId) {
// // //       const child = registeredChildren.find(c => c.id === selectedChildId);
// // //       setSelectedChild(child || null);
// // //     } else {
// // //       setSelectedChild(null);
// // //     }
// // //   }, [selectedChildId, registeredChildren]);

// // //   // Auto-calculate BMI
// // //   useEffect(() => {
// // //     if (motherWeight && motherHeight) {
// // //       setBmi(calculateBMI(parseFloat(motherWeight), parseFloat(motherHeight)));
// // //     } else {
// // //       setBmi("");
// // //     }
// // //   }, [motherWeight, motherHeight]);

// // //   const handleCounselingChange = (id: string, checked: boolean) => {
// // //     setCounselingTopics(prev => ({ ...prev, [id]: checked }));
// // //   };

// // //   const handleSubmit = (e: React.FormEvent) => {
// // //     e.preventDefault();
// // //     if (!selectedChild) {
// // //       toast.error("Please select a patient first");
// // //       return;
// // //     }
    
// // //     setLoading(true);
// // //     const formData = new FormData(e.currentTarget as HTMLFormElement);
// // //     const selectedTopics = Object.keys(counselingTopics).filter(key => counselingTopics[key]);

// // //     const maternalRecord = {
// // //       id: Date.now().toString(),
// // //       childId: selectedChild.id,
// // //       childName: selectedChild.childName,
// // //       motherName: selectedChild.parentName, 
// // //       samNumber: selectedChild.samNumber,
      
// // //       // Anthropometry
// // //       weight: motherWeight,
// // //       height: motherHeight,
// // //       bmi: bmi,
// // //       muac: formData.get('motherMuac') as string,
// // //       hbLevel: formData.get('hbLevel') as string,
      
// // //       // Diet & Supplements
// // //       lactating: formData.get('lactatingStatus') as string,
// // //       mealsPerDay: formData.get('mealsPerDay') as string,
// // //       ifaGiven: formData.get('ifaGiven') as string,
// // //       calciumGiven: formData.get('calciumGiven') as string,
      
// // //       // Counseling
// // //       counselingTopics: selectedTopics,
// // //       notes: formData.get('notes') as string,
// // //       dateSubmitted: new Date().toISOString()
// // //     };

// // //     // Save to local storage
// // //     const existingRecords = localStorage.getItem('maternalNutritionRecords');
// // //     const records = existingRecords ? JSON.parse(existingRecords) : [];
// // //     records.unshift(maternalRecord);
// // //     localStorage.setItem('maternalNutritionRecords', JSON.stringify(records));

// // //     setTimeout(() => {
// // //       toast.success("Maternal assessment saved!");
// // //       setLoading(false);
// // //       setIsSubmitted(true);
// // //       loadRecords(); // Refresh the table
// // //     }, 1500);
// // //   };

// // //   const handleReset = () => {
// // //     setSelectedChildId("");
// // //     setMotherWeight("");
// // //     setMotherHeight("");
// // //     setBmi("");
// // //     setCounselingTopics({});
// // //     setIsSubmitted(false);
// // //   };

// // //   if (!mounted) return null;

// // //   if (isSubmitted) {
// // //     return (
// // //       <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
// // //         <Card className="max-w-md w-full p-8 text-center border-0 shadow-lg">
// // //           <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
// // //             <CheckCircle size={40} strokeWidth={2.5} />
// // //           </div>
// // //           <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Assessment Recorded!</h2>
// // //           <p className="text-slate-500 mb-6">
// // //             Maternal nutrition and counseling data for <span className="font-bold text-slate-800">{selectedChild?.parentName}</span> has been saved.
// // //           </p>
// // //           <div className="flex flex-col gap-3">
// // //             <Button onClick={handleReset} className="w-full">Assess Another Mother</Button>
// // //             <Button variant="outline" onClick={() => router.push('/mtc-user/dashboard/home')} className="w-full">Back to Home</Button>
// // //           </div>
// // //         </Card>
// // //       </div>
// // //     );
// // //   }

// // //   const SectionTitle = ({ icon: Icon, title }: { icon: any, title: string }) => (
// // //     <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
// // //       <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600"><Icon size={20} strokeWidth={2.5} /></div>
// // //       <h2 className="text-lg font-bold text-slate-800">{title}</h2>
// // //     </div>
// // //   );

// // //   return (
// // //     <div className="min-h-screen bg-[#F8FAFC] py-8 px-4 sm:px-6 lg:px-8">
// // //       <Toaster position="top-center" />
      
// // //       <div className="max-w-6xl mx-auto">
// // //         <div className="mb-4 flex items-center">
// // //           <Button variant="ghost" onClick={() => router.back()} className="pl-0 text-slate-500">
// // //             <ArrowLeft className="w-5 h-5 mr-2" /> Back
// // //           </Button>
// // //         </div>

// // //         <div className="mb-8">
// // //           <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3">
// // //             <HeartPulse className="text-rose-500 h-8 w-8" />
// // //             Maternal Nutrition Assessment
// // //           </h1>
// // //           <p className="mt-2 text-sm text-slate-500">Record health, dietary intake, and counseling details for the mother/caregiver.</p>
// // //         </div>

// // //         {/* --- FORM SECTION --- */}
// // //         <form onSubmit={handleSubmit} className="space-y-6">
          
// // //           {/* Section 1: Patient Selection */}
// // //           <Card className="border-0 shadow-sm border-t-4 border-t-indigo-500">
// // //             <CardContent className="p-6">
// // //               <SectionTitle icon={User} title="Link to Admitted Child" />
              
// // //               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // //                 <div className="md:col-span-2">
// // //                   <Label>Select Admitted Child <span className="text-red-500">*</span></Label>
// // //                   <Select name="childSelect" value={selectedChildId} onValueChange={setSelectedChildId} required>
// // //                     <SelectTrigger><SelectValue placeholder="Search by child name or SAM number..." /></SelectTrigger>
// // //                     <SelectContent>
// // //                       {registeredChildren.length === 0 ? (
// // //                         <SelectItem value="none">No patients found</SelectItem>
// // //                       ) : (
// // //                         registeredChildren.map((child: any) => (
// // //                           <SelectItem key={child.id} value={child.id}>
// // //                             {child.childName} (SAM: {child.samNumber}) - Caregiver: {child.parentName}
// // //                           </SelectItem>
// // //                         ))
// // //                       )}
// // //                     </SelectContent>
// // //                   </Select>
// // //                 </div>

// // //                 <div>
// // //                   <Label>Mother / Caregiver Name</Label>
// // //                   <Input readOnly value={selectedChild ? selectedChild.parentName : ""} className="bg-slate-100 font-medium" placeholder="Auto-filled from child record" />
// // //                 </div>
                
// // //                 <div>
// // //                   <Label>Lactating Mother? <span className="text-red-500">*</span></Label>
// // //                   <Select name="lactatingStatus" required>
// // //                     <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
// // //                     <SelectContent>
// // //                       <SelectItem value="yes">Yes</SelectItem>
// // //                       <SelectItem value="no">No</SelectItem>
// // //                     </SelectContent>
// // //                   </Select>
// // //                 </div>
// // //               </div>
// // //             </CardContent>
// // //           </Card>

// // //           {/* Section 2: Anthropometry & Clinical */}
// // //           <Card className="border-0 shadow-sm">
// // //             <CardContent className="p-6">
// // //               <SectionTitle icon={Activity} title="Maternal Vitals & Anthropometry" />
              
// // //               <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
// // //                 <div>
// // //                   <Label>Weight (kg) <span className="text-red-500">*</span></Label>
// // //                   <Input 
// // //                     type="number" step="0.1" 
// // //                     value={motherWeight} 
// // //                     onChange={(e) => setMotherWeight(e.target.value)} 
// // //                     placeholder="e.g., 55.2" required 
// // //                   />
// // //                 </div>
// // //                 <div>
// // //                   <Label>Height (cm) <span className="text-red-500">*</span></Label>
// // //                   <Input 
// // //                     type="number" step="0.1" 
// // //                     value={motherHeight} 
// // //                     onChange={(e) => setMotherHeight(e.target.value)} 
// // //                     placeholder="e.g., 155" required 
// // //                   />
// // //                 </div>
// // //                 <div>
// // //                   <Label>Calculated BMI</Label>
// // //                   <Input 
// // //                     readOnly value={bmi} 
// // //                     className={cn(
// // //                       "font-bold cursor-not-allowed",
// // //                       bmi && parseFloat(bmi) < 18.5 ? "bg-red-50 text-red-700 border-red-200" : "bg-slate-100 text-indigo-700"
// // //                     )} 
// // //                     placeholder="Auto-calculated" 
// // //                   />
// // //                   {bmi && parseFloat(bmi) < 18.5 && <p className="text-xs text-red-600 mt-1">Underweight warning</p>}
// // //                 </div>
// // //                 <div>
// // //                   <Label>Hemoglobin (Hb) g/dL</Label>
// // //                   <Input name="hbLevel" type="number" step="0.1" placeholder="e.g., 10.5" />
// // //                 </div>
// // //               </div>
// // //             </CardContent>
// // //           </Card>

// // //           {/* Section 3: Diet & Supplements */}
// // //           <Card className="border-0 shadow-sm">
// // //             <CardContent className="p-6">
// // //               <SectionTitle icon={Apple} title="Dietary Assessment & Supplements" />
              
// // //               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// // //                 <div>
// // //                   <Label>Meals per Day <span className="text-red-500">*</span></Label>
// // //                   <Select name="mealsPerDay" required>
// // //                     <SelectTrigger><SelectValue placeholder="Select frequency" /></SelectTrigger>
// // //                     <SelectContent>
// // //                       <SelectItem value="1-2">1-2 meals</SelectItem>
// // //                       <SelectItem value="3">3 meals</SelectItem>
// // //                       <SelectItem value="4+">4 or more meals</SelectItem>
// // //                     </SelectContent>
// // //                   </Select>
// // //                 </div>
                
// // //                 <div>
// // //                   <Label className="flex items-center gap-2"><Pill size={14}/> IFA Tablets Given? <span className="text-red-500">*</span></Label>
// // //                   <Select name="ifaGiven" required>
// // //                     <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
// // //                     <SelectContent>
// // //                       <SelectItem value="yes">Yes</SelectItem>
// // //                       <SelectItem value="no">No</SelectItem>
// // //                       <SelectItem value="already_taking">Already Taking</SelectItem>
// // //                     </SelectContent>
// // //                   </Select>
// // //                 </div>

// // //                 <div>
// // //                   <Label className="flex items-center gap-2"><Pill size={14}/> Calcium Tablets Given? <span className="text-red-500">*</span></Label>
// // //                   <Select name="calciumGiven" required>
// // //                     <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
// // //                     <SelectContent>
// // //                       <SelectItem value="yes">Yes</SelectItem>
// // //                       <SelectItem value="no">No</SelectItem>
// // //                       <SelectItem value="already_taking">Already Taking</SelectItem>
// // //                     </SelectContent>
// // //                   </Select>
// // //                 </div>
// // //               </div>
// // //             </CardContent>
// // //           </Card>

// // //           {/* Section 4: Counseling */}
// // //           <Card className="border-0 shadow-sm">
// // //             <CardContent className="p-6">
// // //               <SectionTitle icon={MessageCircle} title="Counseling & Education Provided" />
              
// // //               <Label className="mb-4 block">Select all topics covered during this session: <span className="text-red-500">*</span></Label>
// // //               <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
// // //                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-6">
// // //                   {[
// // //                     { id: "iycf", label: "Infant & Young Child Feeding (IYCF)" },
// // //                     { id: "ebf", label: "Exclusive Breastfeeding (0-6 months)" },
// // //                     { id: "comp_feeding", label: "Complementary Feeding Practices" },
// // //                     { id: "maternal_diet", label: "Dietary Diversity for Mother" },
// // //                     { id: "wash", label: "WASH (Water, Sanitation, Hygiene)" },
// // //                     { id: "family_planning", label: "Family Planning Methods" },
// // //                     { id: "anemia", label: "Anemia Prevention" },
// // //                     { id: "danger_signs", label: "Identifying Danger Signs in Child" },
// // //                   ].map((topic) => (
// // //                     <div key={topic.id} className="flex items-start space-x-3">
// // //                       <input
// // //                         type="checkbox"
// // //                         id={`topic-${topic.id}`}
// // //                         checked={counselingTopics[topic.id] || false}
// // //                         onChange={(e) => handleCounselingChange(topic.id, e.target.checked)}
// // //                         className="mt-1 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded cursor-pointer transition-colors"
// // //                       />
// // //                       <label htmlFor={`topic-${topic.id}`} className="text-sm font-medium text-slate-700 cursor-pointer leading-tight pt-0.5">
// // //                         {topic.label}
// // //                       </label>
// // //                     </div>
// // //                   ))}
// // //                 </div>
// // //               </div>

// // //               <div className="mt-6">
// // //                 <Label>Additional Notes / Observations</Label>
// // //                 <textarea 
// // //                   name="notes"
// // //                   className="w-full min-h-[100px] rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
// // //                   placeholder="Record any specific concerns, willingness to adopt practices, etc."
// // //                 ></textarea>
// // //               </div>
// // //             </CardContent>
// // //           </Card>

// // //           {/* Action Bar */}
// // //           <div className="flex justify-end gap-4 mt-8 pb-10">
// // //             <Button variant="outline" type="button" onClick={() => router.back()}>Cancel</Button>
// // //             <Button type="submit" disabled={loading} className="min-w-[160px]">
// // //               {loading ? "Saving..." : "Save Assessment"}
// // //             </Button>
// // //           </div>

// // //         </form>

// // //         {/* --- TABLE SECTION --- */}
// // //         <div className="mt-12 pt-8 border-t border-slate-200">
// // //           <div className="mb-6 flex items-center gap-3">
// // //             <ClipboardList className="text-indigo-600 h-6 w-6" />
// // //             <h2 className="text-2xl font-bold text-slate-900">Recent Assessments</h2>
// // //           </div>

// // //           <Card className="border-0 shadow-sm">
// // //             <div className="overflow-x-auto">
// // //               <table className="w-full text-sm text-left">
// // //                 <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-semibold">
// // //                   <tr>
// // //                     <th className="px-6 py-4">Date</th>
// // //                     <th className="px-6 py-4">Mother's Name</th>
// // //                     <th className="px-6 py-4">Linked Child (SAM No.)</th>
// // //                     <th className="px-6 py-4">BMI</th>
// // //                     <th className="px-6 py-4 text-center">IFA Given</th>
// // //                     <th className="px-6 py-4 text-center">Calcium Given</th>
// // //                   </tr>
// // //                 </thead>
// // //                 <tbody className="divide-y divide-slate-100 bg-white">
// // //                   {savedRecords.length > 0 ? (
// // //                     savedRecords.map((record) => (
// // //                       <tr key={record.id} className="hover:bg-slate-50/80 transition-colors">
// // //                         <td className="px-6 py-4 whitespace-nowrap text-slate-500">
// // //                           {new Date(record.dateSubmitted).toLocaleDateString()}
// // //                         </td>
// // //                         <td className="px-6 py-4 font-medium text-slate-900">
// // //                           {record.motherName}
// // //                         </td>
// // //                         <td className="px-6 py-4 text-slate-600">
// // //                           {record.childName} <br/>
// // //                           <span className="text-xs text-indigo-600">{record.samNumber}</span>
// // //                         </td>
// // //                         <td className="px-6 py-4">
// // //                           <span className={cn(
// // //                             "px-2 py-1 rounded text-xs font-semibold",
// // //                             parseFloat(record.bmi) < 18.5 ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"
// // //                           )}>
// // //                             {record.bmi}
// // //                           </span>
// // //                         </td>
// // //                         <td className="px-6 py-4 text-center">
// // //                           <span className="capitalize text-slate-700">{record.ifaGiven.replace('_', ' ')}</span>
// // //                         </td>
// // //                         <td className="px-6 py-4 text-center">
// // //                           <span className="capitalize text-slate-700">{record.calciumGiven.replace('_', ' ')}</span>
// // //                         </td>
// // //                       </tr>
// // //                     ))
// // //                   ) : (
// // //                     <tr>
// // //                       <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
// // //                         No maternal nutrition assessments have been recorded yet.
// // //                       </td>
// // //                     </tr>
// // //                   )}
// // //                 </tbody>
// // //               </table>
// // //             </div>
// // //           </Card>
// // //         </div>

// // //       </div>3
// // //     </div>
// // //   );
// // // }\

// // // app\mtc-user\dashboard\maternal-nutrition
// // "use client";

// // import React, { useState, useEffect } from "react";
// // import { useRouter } from "next/navigation";
// // import { 
// //   HeartPulse, Apple, User, CheckCircle, ArrowLeft, 
// //   Activity, MessageCircle, Pill, ClipboardList, Loader2
// // } from "lucide-react";
// // import toast, { Toaster } from "react-hot-toast";

// // // --- Utility for BMI Calculation ---
// // const calculateBMI = (weight: number, heightCm: number) => {
// //   if (!weight || !heightCm) return "";
// //   const heightM = heightCm / 100;
// //   const bmi = weight / (heightM * heightM);
// //   return bmi.toFixed(1);
// // };

// // // --- UI Components ---
// // import { clsx, type ClassValue } from "clsx";
// // import { twMerge } from "tailwind-merge";

// // function cn(...inputs: ClassValue[]) {
// //   return twMerge(clsx(inputs));
// // }

// // const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
// //   ({ className, type, ...props }, ref) => {
// //     return (
// //       <input
// //         type={type}
// //         className={cn(
// //           "flex h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 focus:bg-white transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50",
// //           className
// //         )}
// //         ref={ref}
// //         {...props}
// //       />
// //     );
// //   }
// // );
// // Input.displayName = "Input";

// // const Button = React.forwardRef<any, any>(
// //   ({ className, variant = 'default', href, ...props }, ref) => {
// //     const classes = cn(
// //       "inline-flex items-center justify-center rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]",
// //       variant === 'default' ? "bg-indigo-600 text-white shadow-md shadow-indigo-200 hover:bg-indigo-700 h-11 py-2 px-6" : "",
// //       variant === 'outline' ? "border border-slate-200 bg-white shadow-sm hover:bg-slate-50 hover:text-slate-900 h-11 py-2 px-6 text-slate-700" : "",
// //       variant === 'ghost' ? "hover:bg-slate-100 hover:text-slate-900 h-11 py-2 px-6 text-slate-600" : "",
// //       className
// //     );
// //     if (href) return <a href={href} className={classes} ref={ref} {...props} />;
// //     return <button ref={ref} className={classes} {...props} />;
// //   }
// // );
// // Button.displayName = "Button";

// // const Card = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
// //   <div className={cn("rounded-2xl border border-slate-200 bg-white text-slate-950 shadow-sm", className)} {...props} />
// // );
// // const CardHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
// //   <div className={cn("flex flex-col space-y-1.5 p-6 md:p-8 border-b border-slate-100", className)} {...props} />
// // );
// // const CardContent = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
// //   <div className={cn("p-6 md:p-8", className)} {...props} />
// // );
// // const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
// //   ({ className, ...props }, ref) => (
// //     <label ref={ref} className={cn("text-sm font-semibold text-slate-700 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block", className)} {...props} />
// //   )
// // );
// // Label.displayName = "Label";

// // const Select = ({ name, value, onValueChange, required, children, disabled }: any) => {
// //   const [internalValue, setInternalValue] = useState(value || "");
  
// //   useEffect(() => {
// //     if (value !== undefined) setInternalValue(value);
// //   }, [value]);

// //   const options: {value: string, label: string}[] = [];
// //   let placeholder = "Select Option";
  
// //   React.Children.forEach(children, child => {
// //     if (child && child.type?.name === 'SelectTrigger') {
// //       React.Children.forEach(child.props.children, triggerChild => {
// //         if (triggerChild && triggerChild.type?.name === 'SelectValue') placeholder = triggerChild.props.placeholder || "Select";
// //       });
// //     }
// //     if (child && child.type?.name === 'SelectContent') {
// //       const contentChildren = Array.isArray(child.props.children) ? child.props.children.flat() : [child.props.children];
// //       React.Children.forEach(contentChildren, itemChild => {
// //         if (itemChild && itemChild.type?.name === 'SelectItem') {
// //           options.push({ value: itemChild.props.value, label: itemChild.props.children });
// //         }
// //       });
// //     }
// //   });

// //   const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
// //     setInternalValue(e.target.value);
// //     if (onValueChange) onValueChange(e.target.value);
// //   };

// //   return (
// //     <select 
// //       name={name} 
// //       value={internalValue} 
// //       onChange={handleChange}
// //       required={required}
// //       disabled={disabled}
// //       className={cn(
// //         "flex h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 focus:bg-white transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
// //       )}
// //     >
// //       <option value="" disabled>{placeholder}</option>
// //       {options.map((opt, i) => <option key={i} value={opt.value}>{opt.label}</option>)}
// //     </select>
// //   );
// // };
// // const SelectTrigger = ({ children }: any) => <>{children}</>;
// // const SelectValue = ({ placeholder }: any) => <>{placeholder}</>;
// // const SelectContent = ({ children }: any) => <>{children}</>;
// // const SelectItem = ({ children, value }: any) => <>{children}</>;

// // // --- Main Component ---
// // export default function MaternalNutritionPage() {
// //   const router = useRouter();
// //   const [mounted, setMounted] = useState(false);
// //   const [loading, setLoading] = useState(false);
// //   const [isFetching, setIsFetching] = useState(true);
// //   const [isSubmitted, setIsSubmitted] = useState(false);

// //   // Data States
// //   const [registeredChildren, setRegisteredChildren] = useState<any[]>([]);
// //   const [savedRecords, setSavedRecords] = useState<any[]>([]);
// //   const [selectedChildId, setSelectedChildId] = useState("");
// //   const [selectedChild, setSelectedChild] = useState<any>(null);

// //   // Form States - Vitals
// //   const [motherWeight, setMotherWeight] = useState("");
// //   const [motherHeight, setMotherHeight] = useState("");
// //   const [bmi, setBmi] = useState("");
  
// //   // Counseling Multi-select
// //   const [counselingTopics, setCounselingTopics] = useState<{ [key: string]: boolean }>({});

// //   // Load children and previous records from API
// //   useEffect(() => {
// //     setMounted(true);
    
// //     const fetchData = async () => {
// //       try {
// //         setIsFetching(true);
// //         // 1. Fetch currently admitted children for the dropdown
// //         const childRes = await fetch('/api/child-registration');
// //         if (childRes.ok) {
// //           const children = await childRes.json();
// //           setRegisteredChildren(children);
// //         }

// //         // 2. Fetch past maternal records for the table
// //         await loadRecords();
// //       } catch (error) {
// //         toast.error("Failed to load database records.");
// //       } finally {
// //         setIsFetching(false);
// //       }
// //     };
// //     fetchData();
// //   }, []);

// //   const loadRecords = async () => {
// //     try {
// //       const res = await fetch('/api/maternal-nutrition');
// //       if (res.ok) {
// //         const records = await res.json();
// //         setSavedRecords(records);
// //       }
// //     } catch (error) {
// //       console.error(error);
// //     }
// //   };

// //   // Auto-fill selected child data
// //   useEffect(() => {
// //     if (selectedChildId) {
// //       const child = registeredChildren.find(c => c.registration_id.toString() === selectedChildId);
// //       setSelectedChild(child || null);
// //     } else {
// //       setSelectedChild(null);
// //     }
// //   }, [selectedChildId, registeredChildren]);

// //   // Auto-calculate BMI
// //   useEffect(() => {
// //     if (motherWeight && motherHeight) {
// //       setBmi(calculateBMI(parseFloat(motherWeight), parseFloat(motherHeight)));
// //     } else {
// //       setBmi("");
// //     }
// //   }, [motherWeight, motherHeight]);

// //   const handleCounselingChange = (id: string, checked: boolean) => {
// //     setCounselingTopics(prev => ({ ...prev, [id]: checked }));
// //   };

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     if (!selectedChild) {
// //       toast.error("Please select a patient first");
// //       return;
// //     }
    
// //     setLoading(true);
// //     const formData = new FormData(e.currentTarget as HTMLFormElement);
// //     const selectedTopics = Object.keys(counselingTopics).filter(key => counselingTopics[key]);

// //     const payload = {
// //       childId: selectedChild.registration_id,
// //       weight: motherWeight,
// //       height: motherHeight,
// //       bmi: bmi,
// //       muac: formData.get('motherMuac') as string,
// //       hbLevel: formData.get('hbLevel') as string,
// //       lactating: formData.get('lactatingStatus') as string,
// //       mealsPerDay: formData.get('mealsPerDay') as string,
// //       ifaGiven: formData.get('ifaGiven') as string,
// //       calciumGiven: formData.get('calciumGiven') as string,
// //       counselingTopics: selectedTopics,
// //       notes: formData.get('notes') as string
// //     };

// //     try {
// //       const res = await fetch('/api/maternal-nutrition', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify(payload)
// //       });

// //       if (!res.ok) throw new Error("Failed to save record");

// //       toast.success("Maternal assessment saved!");
// //       setIsSubmitted(true);
// //       await loadRecords(); // Refresh the table from the database
// //       router.refresh();
      
// //     } catch (error) {
// //       toast.error("An error occurred while saving.");
// //       console.error(error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleReset = () => {
// //     setSelectedChildId("");
// //     setMotherWeight("");
// //     setMotherHeight("");
// //     setBmi("");
// //     setCounselingTopics({});
// //     setIsSubmitted(false);
// //   };

// //   if (!mounted) return null;

// //   if (isSubmitted) {
// //     return (
// //       <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
// //         <Card className="max-w-md w-full p-8 text-center border-0 shadow-lg">
// //           <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
// //             <CheckCircle size={40} strokeWidth={2.5} />
// //           </div>
// //           <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Assessment Recorded!</h2>
// //           <p className="text-slate-500 mb-6">
// //             Maternal nutrition and counseling data for <span className="font-bold text-slate-800">{selectedChild?.guardian_name}</span> has been saved to the database.
// //           </p>
// //           <div className="flex flex-col gap-3">
// //             <Button onClick={handleReset} className="w-full">Assess Another Mother</Button>
// //             <Button variant="outline" onClick={() => router.push('/mtc-user/dashboard/home')} className="w-full">Back to Home</Button>
// //           </div>
// //         </Card>
// //       </div>
// //     );
// //   }

// //   const SectionTitle = ({ icon: Icon, title }: { icon: any, title: string }) => (
// //     <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
// //       <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600"><Icon size={20} strokeWidth={2.5} /></div>
// //       <h2 className="text-lg font-bold text-slate-800">{title}</h2>
// //     </div>
// //   );

// //   return (
// //     <div className="min-h-screen bg-[#F8FAFC] py-8 px-4 sm:px-6 lg:px-8">
// //       <Toaster position="top-center" />
      
// //       <div className="max-w-6xl mx-auto">
// //         <div className="mb-4 flex items-center">
// //           <Button variant="ghost" onClick={() => router.back()} className="pl-0 text-slate-500">
// //             <ArrowLeft className="w-5 h-5 mr-2" /> Back
// //           </Button>
// //         </div>

// //         <div className="mb-8">
// //           <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3">
// //             <HeartPulse className="text-rose-500 h-8 w-8" />
// //             Maternal Nutrition Assessment
// //           </h1>
// //           <p className="mt-2 text-sm text-slate-500">Record health, dietary intake, and counseling details for the mother/caregiver.</p>
// //         </div>

// //         {isFetching ? (
// //            <div className="flex flex-col items-center justify-center py-20">
// //              <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
// //              <p className="text-slate-500 font-medium">Loading patients...</p>
// //            </div>
// //         ) : (
// //           <>
// //             {/* --- FORM SECTION --- */}
// //             <form onSubmit={handleSubmit} className="space-y-6">
              
// //               {/* Section 1: Patient Selection */}
// //               <Card className="border-0 shadow-sm border-t-4 border-t-indigo-500">
// //                 <CardContent className="p-6">
// //                   <SectionTitle icon={User} title="Link to Admitted Child" />
                  
// //                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                     <div className="md:col-span-2">
// //                       <Label>Select Admitted Child <span className="text-red-500">*</span></Label>
// //                       <Select name="childSelect" value={selectedChildId} onValueChange={setSelectedChildId} required>
// //                         <SelectTrigger><SelectValue placeholder="Search by child name or SAM number..." /></SelectTrigger>
// //                         <SelectContent>
// //                           {registeredChildren.length === 0 ? (
// //                             <SelectItem value="none">No active patients found</SelectItem>
// //                           ) : (
// //                             registeredChildren.map((child: any) => (
// //                               <SelectItem key={child.registration_id} value={child.registration_id.toString()}>
// //                                 {child.child_full_name} (SAM: {child.sam_no}) - Caregiver: {child.guardian_name}
// //                               </SelectItem>
// //                             ))
// //                           )}
// //                         </SelectContent>
// //                       </Select>
// //                     </div>

// //                     <div>
// //                       <Label>Mother / Caregiver Name</Label>
// //                       <Input readOnly value={selectedChild ? selectedChild.guardian_name : ""} className="bg-slate-100 font-medium" placeholder="Auto-filled from child record" />
// //                     </div>
                    
// //                     <div>
// //                       <Label>Lactating Mother? <span className="text-red-500">*</span></Label>
// //                       <Select name="lactatingStatus" required>
// //                         <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
// //                         <SelectContent>
// //                           <SelectItem value="yes">Yes</SelectItem>
// //                           <SelectItem value="no">No</SelectItem>
// //                         </SelectContent>
// //                       </Select>
// //                     </div>
// //                   </div>
// //                 </CardContent>
// //               </Card>

// //               {/* Section 2: Anthropometry & Clinical */}
// //               <Card className="border-0 shadow-sm">
// //                 <CardContent className="p-6">
// //                   <SectionTitle icon={Activity} title="Maternal Vitals & Anthropometry" />
                  
// //                   <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
// //                     <div>
// //                       <Label>Weight (kg) <span className="text-red-500">*</span></Label>
// //                       <Input 
// //                         type="number" step="0.1" 
// //                         value={motherWeight} 
// //                         onChange={(e) => setMotherWeight(e.target.value)} 
// //                         placeholder="e.g., 55.2" required 
// //                       />
// //                     </div>
// //                     <div>
// //                       <Label>Height (cm) <span className="text-red-500">*</span></Label>
// //                       <Input 
// //                         type="number" step="0.1" 
// //                         value={motherHeight} 
// //                         onChange={(e) => setMotherHeight(e.target.value)} 
// //                         placeholder="e.g., 155" required 
// //                       />
// //                     </div>
// //                     <div>
// //                       <Label>Calculated BMI</Label>
// //                       <Input 
// //                         readOnly value={bmi} 
// //                         className={cn(
// //                           "font-bold cursor-not-allowed",
// //                           bmi && parseFloat(bmi) < 18.5 ? "bg-red-50 text-red-700 border-red-200" : "bg-slate-100 text-indigo-700"
// //                         )} 
// //                         placeholder="Auto-calculated" 
// //                       />
// //                       {bmi && parseFloat(bmi) < 18.5 && <p className="text-xs text-red-600 mt-1">Underweight warning</p>}
// //                     </div>
// //                     <div>
// //                       <Label>Hemoglobin (Hb) g/dL</Label>
// //                       <Input name="hbLevel" type="number" step="0.1" placeholder="e.g., 10.5" />
// //                     </div>
// //                   </div>
// //                 </CardContent>
// //               </Card>

// //               {/* Section 3: Diet & Supplements */}
// //               <Card className="border-0 shadow-sm">
// //                 <CardContent className="p-6">
// //                   <SectionTitle icon={Apple} title="Dietary Assessment & Supplements" />
                  
// //                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// //                     <div>
// //                       <Label>Meals per Day <span className="text-red-500">*</span></Label>
// //                       <Select name="mealsPerDay" required>
// //                         <SelectTrigger><SelectValue placeholder="Select frequency" /></SelectTrigger>
// //                         <SelectContent>
// //                           <SelectItem value="1-2">1-2 meals</SelectItem>
// //                           <SelectItem value="3">3 meals</SelectItem>
// //                           <SelectItem value="4+">4 or more meals</SelectItem>
// //                         </SelectContent>
// //                       </Select>
// //                     </div>
                    
// //                     <div>
// //                       <Label className="flex items-center gap-2"><Pill size={14}/> IFA Tablets Given? <span className="text-red-500">*</span></Label>
// //                       <Select name="ifaGiven" required>
// //                         <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
// //                         <SelectContent>
// //                           <SelectItem value="yes">Yes</SelectItem>
// //                           <SelectItem value="no">No</SelectItem>
// //                           <SelectItem value="already_taking">Already Taking</SelectItem>
// //                         </SelectContent>
// //                       </Select>
// //                     </div>

// //                     <div>
// //                       <Label className="flex items-center gap-2"><Pill size={14}/> Calcium Tablets Given? <span className="text-red-500">*</span></Label>
// //                       <Select name="calciumGiven" required>
// //                         <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
// //                         <SelectContent>
// //                           <SelectItem value="yes">Yes</SelectItem>
// //                           <SelectItem value="no">No</SelectItem>
// //                           <SelectItem value="already_taking">Already Taking</SelectItem>
// //                         </SelectContent>
// //                       </Select>
// //                     </div>
// //                   </div>
// //                 </CardContent>
// //               </Card>

// //               {/* Section 4: Counseling */}
// //               <Card className="border-0 shadow-sm">
// //                 <CardContent className="p-6">
// //                   <SectionTitle icon={MessageCircle} title="Counseling & Education Provided" />
                  
// //                   <Label className="mb-4 block">Select all topics covered during this session: <span className="text-red-500">*</span></Label>
// //                   <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
// //                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-6">
// //                       {[
// //                         { id: "iycf", label: "Infant & Young Child Feeding (IYCF)" },
// //                         { id: "ebf", label: "Exclusive Breastfeeding (0-6 months)" },
// //                         { id: "comp_feeding", label: "Complementary Feeding Practices" },
// //                         { id: "maternal_diet", label: "Dietary Diversity for Mother" },
// //                         { id: "wash", label: "WASH (Water, Sanitation, Hygiene)" },
// //                         { id: "family_planning", label: "Family Planning Methods" },
// //                         { id: "anemia", label: "Anemia Prevention" },
// //                         { id: "danger_signs", label: "Identifying Danger Signs in Child" },
// //                       ].map((topic) => (
// //                         <div key={topic.id} className="flex items-start space-x-3">
// //                           <input
// //                             type="checkbox"
// //                             id={`topic-${topic.id}`}
// //                             checked={counselingTopics[topic.id] || false}
// //                             onChange={(e) => handleCounselingChange(topic.id, e.target.checked)}
// //                             className="mt-1 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded cursor-pointer transition-colors"
// //                           />
// //                           <label htmlFor={`topic-${topic.id}`} className="text-sm font-medium text-slate-700 cursor-pointer leading-tight pt-0.5">
// //                             {topic.label}
// //                           </label>
// //                         </div>
// //                       ))}
// //                     </div>
// //                   </div>

// //                   <div className="mt-6">
// //                     <Label>Additional Notes / Observations</Label>
// //                     <textarea 
// //                       name="notes"
// //                       className="w-full min-h-[100px] rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
// //                       placeholder="Record any specific concerns, willingness to adopt practices, etc."
// //                     ></textarea>
// //                   </div>
// //                 </CardContent>
// //               </Card>

// //               {/* Action Bar */}
// //               <div className="flex justify-end gap-4 mt-8 pb-10">
// //                 <Button variant="outline" type="button" onClick={() => router.back()}>Cancel</Button>
// //                 <Button type="submit" disabled={loading} className="min-w-40">
// //                   {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/> Saving...</> : "Save Assessment"}
// //                 </Button>
// //               </div>
// //             </form>

// //             {/* --- TABLE SECTION --- */}
// //             <div className="mt-12 pt-8 border-t border-slate-200">
// //               <div className="mb-6 flex items-center gap-3">
// //                 <ClipboardList className="text-indigo-600 h-6 w-6" />
// //                 <h2 className="text-2xl font-bold text-slate-900">Recent Assessments</h2>
// //               </div>

// //               <Card className="border-0 shadow-sm">
// //                 <div className="overflow-x-auto">
// //                   <table className="w-full text-sm text-left">
// //                     <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-semibold">
// //                       <tr>
// //                         <th className="px-6 py-4">Date</th>
// //                         <th className="px-6 py-4">Mother's Name</th>
// //                         <th className="px-6 py-4">Linked Child (SAM No.)</th>
// //                         <th className="px-6 py-4">BMI</th>
// //                         <th className="px-6 py-4 text-center">IFA Given</th>
// //                         <th className="px-6 py-4 text-center">Calcium Given</th>
// //                       </tr>
// //                     </thead>
// //                     <tbody className="divide-y divide-slate-100 bg-white">
// //                       {savedRecords.length > 0 ? (
// //                         savedRecords.map((record) => (
// //                           <tr key={record.id} className="hover:bg-slate-50/80 transition-colors">
// //                             <td className="px-6 py-4 whitespace-nowrap text-slate-500">
// //                               {new Date(record.dateSubmitted).toLocaleDateString()}
// //                             </td>
// //                             <td className="px-6 py-4 font-medium text-slate-900">
// //                               {record.motherName}
// //                             </td>
// //                             <td className="px-6 py-4 text-slate-600">
// //                               {record.childName} <br/>
// //                               <span className="text-xs text-indigo-600">{record.samNumber}</span>
// //                             </td>
// //                             <td className="px-6 py-4">
// //                               <span className={cn(
// //                                 "px-2 py-1 rounded text-xs font-semibold",
// //                                 parseFloat(record.bmi) < 18.5 ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"
// //                               )}>
// //                                 {record.bmi}
// //                               </span>
// //                             </td>
// //                             <td className="px-6 py-4 text-center">
// //                               <span className="capitalize text-slate-700">{record.ifaGiven?.replace('_', ' ')}</span>
// //                             </td>
// //                             <td className="px-6 py-4 text-center">
// //                               <span className="capitalize text-slate-700">{record.calciumGiven?.replace('_', ' ')}</span>
// //                             </td>
// //                           </tr>
// //                         ))
// //                       ) : (
// //                         <tr>
// //                           <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
// //                             No maternal nutrition assessments have been recorded yet.
// //                           </td>
// //                         </tr>
// //                       )}
// //                     </tbody>
// //                   </table>
// //                 </div>
// //               </Card>
// //             </div>
// //           </>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// "use client";

// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { 
//   HeartPulse, Apple, User, CheckCircle, ArrowLeft, 
//   Activity, MessageCircle, Pill, ClipboardList, Loader2
// } from "lucide-react";
// import toast, { Toaster } from "react-hot-toast";

// // --- Utility for BMI Calculation ---
// const calculateBMI = (weight: number, heightCm: number) => {
//   if (!weight || !heightCm) return "";
//   const heightM = heightCm / 100;
//   const bmi = weight / (heightM * heightM);
//   return bmi.toFixed(1);
// };

// // --- UI Components ---
// import { clsx, type ClassValue } from "clsx";
// import { twMerge } from "tailwind-merge";

// function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs));
// }

// const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
//   ({ className, type, ...props }, ref) => {
//     return (
//       <input
//         type={type}
//         className={cn(
//           "flex h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 focus:bg-white transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50",
//           className
//         )}
//         ref={ref}
//         {...props}
//       />
//     );
//   }
// );
// Input.displayName = "Input";

// const Button = React.forwardRef<any, any>(
//   ({ className, variant = 'default', href, ...props }, ref) => {
//     const classes = cn(
//       "inline-flex items-center justify-center rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]",
//       variant === 'default' ? "bg-indigo-600 text-white shadow-md shadow-indigo-200 hover:bg-indigo-700 h-11 py-2 px-6" : "",
//       variant === 'outline' ? "border border-slate-200 bg-white shadow-sm hover:bg-slate-50 hover:text-slate-900 h-11 py-2 px-6 text-slate-700" : "",
//       variant === 'ghost' ? "hover:bg-slate-100 hover:text-slate-900 h-11 py-2 px-6 text-slate-600" : "",
//       className
//     );
//     if (href) return <a href={href} className={classes} ref={ref} {...props} />;
//     return <button ref={ref} className={classes} {...props} />;
//   }
// );
// Button.displayName = "Button";

// const Card = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
//   <div className={cn("rounded-2xl border border-slate-200 bg-white text-slate-950 shadow-sm", className)} {...props} />
// );
// const CardHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
//   <div className={cn("flex flex-col space-y-1.5 p-6 md:p-8 border-b border-slate-100", className)} {...props} />
// );
// const CardContent = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
//   <div className={cn("p-6 md:p-8", className)} {...props} />
// );
// const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
//   ({ className, ...props }, ref) => (
//     <label ref={ref} className={cn("text-sm font-semibold text-slate-700 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block", className)} {...props} />
//   )
// );
// Label.displayName = "Label";

// const Select = ({ name, value, onValueChange, required, children, disabled }: any) => {
//   const [internalValue, setInternalValue] = useState(value || "");
  
//   useEffect(() => {
//     if (value !== undefined) setInternalValue(value);
//   }, [value]);

//   const options: {value: string, label: string}[] = [];
//   let placeholder = "Select Option";
  
//   React.Children.forEach(children, child => {
//     if (child && child.type?.name === 'SelectTrigger') {
//       React.Children.forEach(child.props.children, triggerChild => {
//         if (triggerChild && triggerChild.type?.name === 'SelectValue') placeholder = triggerChild.props.placeholder || "Select";
//       });
//     }
//     if (child && child.type?.name === 'SelectContent') {
//       const contentChildren = Array.isArray(child.props.children) ? child.props.children.flat() : [child.props.children];
//       React.Children.forEach(contentChildren, itemChild => {
//         if (itemChild && itemChild.type?.name === 'SelectItem') {
//           options.push({ value: itemChild.props.value, label: itemChild.props.children });
//         }
//       });
//     }
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setInternalValue(e.target.value);
//     if (onValueChange) onValueChange(e.target.value);
//   };

//   return (
//     <select 
//       name={name} 
//       value={internalValue} 
//       onChange={handleChange}
//       required={required}
//       disabled={disabled}
//       className={cn(
//         "flex h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 focus:bg-white transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
//       )}
//     >
//       <option value="" disabled>{placeholder}</option>
//       {options.map((opt, i) => <option key={i} value={opt.value}>{opt.label}</option>)}
//     </select>
//   );
// };
// const SelectTrigger = ({ children }: any) => <>{children}</>;
// const SelectValue = ({ placeholder }: any) => <>{placeholder}</>;
// const SelectContent = ({ children }: any) => <>{children}</>;
// const SelectItem = ({ children, value }: any) => <>{children}</>;

// // --- Main Component ---
// export default function MaternalNutritionPage() {
//   const router = useRouter();
//   const [mounted, setMounted] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [isFetching, setIsFetching] = useState(true);
//   const [isSubmitted, setIsSubmitted] = useState(false);
  
//   // Track MTC ID locally to pass into fetch functions
//   const [currentMtcId, setCurrentMtcId] = useState<string>("");

//   // Data States
//   const [registeredChildren, setRegisteredChildren] = useState<any[]>([]);
//   const [savedRecords, setSavedRecords] = useState<any[]>([]);
//   const [selectedChildId, setSelectedChildId] = useState("");
//   const [selectedChild, setSelectedChild] = useState<any>(null);

//   // Form States - Vitals
//   const [motherWeight, setMotherWeight] = useState("");
//   const [motherHeight, setMotherHeight] = useState("");
//   const [bmi, setBmi] = useState("");
  
//   // Counseling Multi-select
//   const [counselingTopics, setCounselingTopics] = useState<{ [key: string]: boolean }>({});

//   // Load children and previous records from API securely filtered by MTC
//   useEffect(() => {
//     setMounted(true);
    
//     const fetchData = async () => {
//       try {
//         setIsFetching(true);

//         // Extract MTC ID from session securely
//         const sessionData = sessionStorage.getItem("mtc_user");
//         let mtcId = "";
//         if (sessionData) {
//           try {
//             const user = JSON.parse(sessionData);
//             if (user.mtcId) {
//               mtcId = user.mtcId;
//               setCurrentMtcId(mtcId.toString());
//             }
//           } catch (err) {
//             console.error("Session parse error");
//           }
//         }

//         const queryParams = mtcId ? `?mtcId=${mtcId}` : "";

//         // 1. Fetch currently admitted children for the dropdown (Filtered by MTC)
//         const childRes = await fetch(`/api/child-registration${queryParams}`);
//         if (childRes.ok) {
//           const children = await childRes.json();
//           setRegisteredChildren(children);
//         } else {
//           console.error("Failed to fetch children dropdown");
//         }

//         // 2. Fetch past maternal records for the table (Filtered by MTC)
//         await loadRecords(mtcId.toString());

//       } catch (error) {
//         toast.error("Failed to load database records.");
//       } finally {
//         setIsFetching(false);
//       }
//     };
//     fetchData();
//   }, []);

//   const loadRecords = async (mtcId: string) => {
//     try {
//       const queryParams = mtcId ? `?mtcId=${mtcId}` : "";
//       const res = await fetch(`/api/maternal-nutrition${queryParams}`);
//       if (res.ok) {
//         const records = await res.json();
//         setSavedRecords(records);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   // Auto-fill selected child data
//   useEffect(() => {
//     if (selectedChildId) {
//       const child = registeredChildren.find(c => c.registration_id.toString() === selectedChildId);
//       setSelectedChild(child || null);
//     } else {
//       setSelectedChild(null);
//     }
//   }, [selectedChildId, registeredChildren]);

//   // Auto-calculate BMI
//   useEffect(() => {
//     if (motherWeight && motherHeight) {
//       setBmi(calculateBMI(parseFloat(motherWeight), parseFloat(motherHeight)));
//     } else {
//       setBmi("");
//     }
//   }, [motherWeight, motherHeight]);

//   const handleCounselingChange = (id: string, checked: boolean) => {
//     setCounselingTopics(prev => ({ ...prev, [id]: checked }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!selectedChild) {
//       toast.error("Please select a patient first");
//       return;
//     }
    
//     setLoading(true);
//     const formData = new FormData(e.currentTarget as HTMLFormElement);
//     const selectedTopics = Object.keys(counselingTopics).filter(key => counselingTopics[key]);

//     const payload = {
//       childId: selectedChild.registration_id,
//       mtcId: currentMtcId, // Send MTC ID with payload to secure the save
//       weight: motherWeight,
//       height: motherHeight,
//       bmi: bmi,
//       muac: formData.get('motherMuac') as string,
//       hbLevel: formData.get('hbLevel') as string,
//       lactating: formData.get('lactatingStatus') as string,
//       mealsPerDay: formData.get('mealsPerDay') as string,
//       ifaGiven: formData.get('ifaGiven') as string,
//       calciumGiven: formData.get('calciumGiven') as string,
//       counselingTopics: selectedTopics,
//       notes: formData.get('notes') as string
//     };

//     try {
//       const res = await fetch('/api/maternal-nutrition', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload)
//       });

//       if (!res.ok) throw new Error("Failed to save record");

//       toast.success("Maternal assessment saved!");
//       setIsSubmitted(true);
//       await loadRecords(currentMtcId); // Refresh table with correct MTC ID
//       router.refresh();
      
//     } catch (error) {
//       toast.error("An error occurred while saving.");
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleReset = () => {
//     setSelectedChildId("");
//     setMotherWeight("");
//     setMotherHeight("");
//     setBmi("");
//     setCounselingTopics({});
//     setIsSubmitted(false);
//   };

//   if (!mounted) return null;

//   if (isSubmitted) {
//     return (
//       <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
//         <Card className="max-w-md w-full p-8 text-center border-0 shadow-lg">
//           <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
//             <CheckCircle size={40} strokeWidth={2.5} />
//           </div>
//           <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Assessment Recorded!</h2>
//           <p className="text-slate-500 mb-6">
//             Maternal nutrition and counseling data for <span className="font-bold text-slate-800">{selectedChild?.guardian_name}</span> has been saved to the database.
//           </p>
//           <div className="flex flex-col gap-3">
//             <Button onClick={handleReset} className="w-full">Assess Another Mother</Button>
//             <Button variant="outline" onClick={() => router.push('/mtc-user/dashboard/home')} className="w-full">Back to Home</Button>
//           </div>
//         </Card>
//       </div>
//     );
//   }

//   const SectionTitle = ({ icon: Icon, title }: { icon: any, title: string }) => (
//     <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
//       <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600"><Icon size={20} strokeWidth={2.5} /></div>
//       <h2 className="text-lg font-bold text-slate-800">{title}</h2>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-[#F8FAFC] py-8 px-4 sm:px-6 lg:px-8">
//       <Toaster position="top-center" />
      
//       <div className="max-w-6xl mx-auto">
//         <div className="mb-4 flex items-center">
//           <Button variant="ghost" onClick={() => router.back()} className="pl-0 text-slate-500">
//             <ArrowLeft className="w-5 h-5 mr-2" /> Back
//           </Button>
//         </div>

//         <div className="mb-8">
//           <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3">
//             <HeartPulse className="text-rose-500 h-8 w-8" />
//             Maternal Nutrition Assessment
//           </h1>
//           <p className="mt-2 text-sm text-slate-500">Record health, dietary intake, and counseling details for the mother/caregiver.</p>
//         </div>

//         {isFetching ? (
//            <div className="flex flex-col items-center justify-center py-20">
//              <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
//              <p className="text-slate-500 font-medium">Loading patients...</p>
//            </div>
//         ) : (
//           <>
//             {/* --- FORM SECTION --- */}
//             <form onSubmit={handleSubmit} className="space-y-6">
              
//               {/* Section 1: Patient Selection */}
//               <Card className="border-0 shadow-sm border-t-4 border-t-indigo-500">
//                 <CardContent className="p-6">
//                   <SectionTitle icon={User} title="Link to Admitted Child" />
                  
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div className="md:col-span-2">
//                       <Label>Select Admitted Child <span className="text-red-500">*</span></Label>
//                       <Select name="childSelect" value={selectedChildId} onValueChange={setSelectedChildId} required>
//                         <SelectTrigger><SelectValue placeholder="Search by child name or SAM number..." /></SelectTrigger>
//                         <SelectContent>
//                           {registeredChildren.length === 0 ? (
//                             <SelectItem value="none">No active patients found</SelectItem>
//                           ) : (
//                             registeredChildren.map((child: any) => (
//                               <SelectItem key={child.registration_id} value={child.registration_id.toString()}>
//                                 {child.child_full_name} (SAM: {child.sam_no}) - Caregiver: {child.guardian_name}
//                               </SelectItem>
//                             ))
//                           )}
//                         </SelectContent>
//                       </Select>
//                     </div>

//                     <div>
//                       <Label>Mother / Caregiver Name</Label>
//                       <Input readOnly value={selectedChild ? selectedChild.guardian_name : ""} className="bg-slate-100 font-medium" placeholder="Auto-filled from child record" />
//                     </div>
                    
//                     <div>
//                       <Label>Lactating Mother? <span className="text-red-500">*</span></Label>
//                       <Select name="lactatingStatus" required>
//                         <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="yes">Yes</SelectItem>
//                           <SelectItem value="no">No</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>

//               {/* Section 2: Anthropometry & Clinical */}
//               <Card className="border-0 shadow-sm">
//                 <CardContent className="p-6">
//                   <SectionTitle icon={Activity} title="Maternal Vitals & Anthropometry" />
                  
//                   <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//                     <div>
//                       <Label>Weight (kg) <span className="text-red-500">*</span></Label>
//                       <Input 
//                         type="number" step="0.1" 
//                         value={motherWeight} 
//                         onChange={(e) => setMotherWeight(e.target.value)} 
//                         placeholder="e.g., 55.2" required 
//                       />
//                     </div>
//                     <div>
//                       <Label>Height (cm) <span className="text-red-500">*</span></Label>
//                       <Input 
//                         type="number" step="0.1" 
//                         value={motherHeight} 
//                         onChange={(e) => setMotherHeight(e.target.value)} 
//                         placeholder="e.g., 155" required 
//                       />
//                     </div>
//                     <div>
//                       <Label>Calculated BMI</Label>
//                       <Input 
//                         readOnly value={bmi} 
//                         className={cn(
//                           "font-bold cursor-not-allowed",
//                           bmi && parseFloat(bmi) < 18.5 ? "bg-red-50 text-red-700 border-red-200" : "bg-slate-100 text-indigo-700"
//                         )} 
//                         placeholder="Auto-calculated" 
//                       />
//                       {bmi && parseFloat(bmi) < 18.5 && <p className="text-xs text-red-600 mt-1">Underweight warning</p>}
//                     </div>
//                     <div>
//                       <Label>Hemoglobin (Hb) g/dL</Label>
//                       <Input name="hbLevel" type="number" step="0.1" placeholder="e.g., 10.5" />
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>

//               {/* Section 3: Diet & Supplements */}
//               <Card className="border-0 shadow-sm">
//                 <CardContent className="p-6">
//                   <SectionTitle icon={Apple} title="Dietary Assessment & Supplements" />
                  
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                     <div>
//                       <Label>Meals per Day <span className="text-red-500">*</span></Label>
//                       <Select name="mealsPerDay" required>
//                         <SelectTrigger><SelectValue placeholder="Select frequency" /></SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="1-2">1-2 meals</SelectItem>
//                           <SelectItem value="3">3 meals</SelectItem>
//                           <SelectItem value="4+">4 or more meals</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </div>
                    
//                     <div>
//                       <Label className="flex items-center gap-2"><Pill size={14}/> IFA Tablets Given? <span className="text-red-500">*</span></Label>
//                       <Select name="ifaGiven" required>
//                         <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="yes">Yes</SelectItem>
//                           <SelectItem value="no">No</SelectItem>
//                           <SelectItem value="already_taking">Already Taking</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </div>

//                     <div>
//                       <Label className="flex items-center gap-2"><Pill size={14}/> Calcium Tablets Given? <span className="text-red-500">*</span></Label>
//                       <Select name="calciumGiven" required>
//                         <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="yes">Yes</SelectItem>
//                           <SelectItem value="no">No</SelectItem>
//                           <SelectItem value="already_taking">Already Taking</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>

//               {/* Section 4: Counseling */}
//               <Card className="border-0 shadow-sm">
//                 <CardContent className="p-6">
//                   <SectionTitle icon={MessageCircle} title="Counseling & Education Provided" />
                  
//                   <Label className="mb-4 block">Select all topics covered during this session: <span className="text-red-500">*</span></Label>
//                   <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-6">
//                       {[
//                         { id: "iycf", label: "Infant & Young Child Feeding (IYCF)" },
//                         { id: "ebf", label: "Exclusive Breastfeeding (0-6 months)" },
//                         { id: "comp_feeding", label: "Complementary Feeding Practices" },
//                         { id: "maternal_diet", label: "Dietary Diversity for Mother" },
//                         { id: "wash", label: "WASH (Water, Sanitation, Hygiene)" },
//                         { id: "family_planning", label: "Family Planning Methods" },
//                         { id: "anemia", label: "Anemia Prevention" },
//                         { id: "danger_signs", label: "Identifying Danger Signs in Child" },
//                       ].map((topic) => (
//                         <div key={topic.id} className="flex items-start space-x-3">
//                           <input
//                             type="checkbox"
//                             id={`topic-${topic.id}`}
//                             checked={counselingTopics[topic.id] || false}
//                             onChange={(e) => handleCounselingChange(topic.id, e.target.checked)}
//                             className="mt-1 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded cursor-pointer transition-colors"
//                           />
//                           <label htmlFor={`topic-${topic.id}`} className="text-sm font-medium text-slate-700 cursor-pointer leading-tight pt-0.5">
//                             {topic.label}
//                           </label>
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   <div className="mt-6">
//                     <Label>Additional Notes / Observations</Label>
//                     <textarea 
//                       name="notes"
//                       className="w-full min-h-[100px] rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
//                       placeholder="Record any specific concerns, willingness to adopt practices, etc."
//                     ></textarea>
//                   </div>
//                 </CardContent>
//               </Card>

//               {/* Action Bar */}
//               <div className="flex justify-end gap-4 mt-8 pb-10">
//                 <Button variant="outline" type="button" onClick={() => router.back()}>Cancel</Button>
//                 <Button type="submit" disabled={loading} className="min-w-40">
//                   {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/> Saving...</> : "Save Assessment"}
//                 </Button>
//               </div>
//             </form>

//             {/* --- TABLE SECTION --- */}
//             <div className="mt-12 pt-8 border-t border-slate-200">
//               <div className="mb-6 flex items-center gap-3">
//                 <ClipboardList className="text-indigo-600 h-6 w-6" />
//                 <h2 className="text-2xl font-bold text-slate-900">Recent Assessments</h2>
//               </div>

//               <Card className="border-0 shadow-sm">
//                 <div className="overflow-x-auto">
//                   <table className="w-full text-sm text-left">
//                     <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-semibold">
//                       <tr>
//                         <th className="px-6 py-4">Date</th>
//                         <th className="px-6 py-4">Mother's Name</th>
//                         <th className="px-6 py-4">Linked Child (SAM No.)</th>
//                         <th className="px-6 py-4">BMI</th>
//                         <th className="px-6 py-4 text-center">IFA Given</th>
//                         <th className="px-6 py-4 text-center">Calcium Given</th>
//                       </tr>
//                     </thead>
//                     <tbody className="divide-y divide-slate-100 bg-white">
//                       {savedRecords.length > 0 ? (
//                         savedRecords.map((record) => (
//                           <tr key={record.id} className="hover:bg-slate-50/80 transition-colors">
//                             <td className="px-6 py-4 whitespace-nowrap text-slate-500">
//                               {new Date(record.dateSubmitted || record.createdAt || Date.now()).toLocaleDateString('en-GB')}
//                             </td>
//                             <td className="px-6 py-4 font-medium text-slate-900">
//                               {record.motherName}
//                             </td>
//                             <td className="px-6 py-4 text-slate-600">
//                               {record.childName} <br/>
//                               <span className="text-xs text-indigo-600">{record.samNumber}</span>
//                             </td>
//                             <td className="px-6 py-4">
//                               <span className={cn(
//                                 "px-2 py-1 rounded text-xs font-semibold",
//                                 parseFloat(record.bmi) < 18.5 ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"
//                               )}>
//                                 {record.bmi}
//                               </span>
//                             </td>
//                             <td className="px-6 py-4 text-center">
//                               <span className="capitalize text-slate-700">{record.ifaGiven?.replace('_', ' ')}</span>
//                             </td>
//                             <td className="px-6 py-4 text-center">
//                               <span className="capitalize text-slate-700">{record.calciumGiven?.replace('_', ' ')}</span>
//                             </td>
//                           </tr>
//                         ))
//                       ) : (
//                         <tr>
//                           <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
//                             No maternal nutrition assessments have been recorded yet.
//                           </td>
//                         </tr>
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
//               </Card>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  HeartPulse, Apple, User, CheckCircle, ArrowLeft, 
  Activity, MessageCircle, Pill, ClipboardList, Loader2
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

// --- Types & Interfaces ---
interface ChildDropdownItem {
  registration_id: string | number;
  child_full_name: string;
  sam_no: string;
  guardian_name: string;
}

interface MaternalAssessmentRecord {
  id: string | number;
  dateSubmitted?: string;
  createdAt?: string;
  motherName: string;
  childName: string;
  samNumber: string;
  bmi: string;
  ifaGiven: string;
  calciumGiven: string;
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
  href?: string;
}

interface CustomSelectProps {
  name?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  required?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
}

interface ElementWithChildren {
  children?: React.ReactNode;
  placeholder?: string;
  value?: string;
}

// --- Utility for BMI Calculation ---
const calculateBMI = (weight: number, heightCm: number) => {
  if (!weight || !heightCm) return "";
  const heightM = heightCm / 100;
  const bmi = weight / (heightM * heightM);
  return bmi.toFixed(1);
};

// --- UI Components ---
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 focus:bg-white transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", href, ...props }, ref) => {
    const classes = cn(
      "inline-flex items-center justify-center rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]",
      variant === "default" ? "bg-indigo-600 text-white shadow-md shadow-indigo-200 hover:bg-indigo-700 h-11 py-2 px-6" : "",
      variant === "outline" ? "border border-slate-200 bg-white shadow-sm hover:bg-slate-50 hover:text-slate-900 h-11 py-2 px-6 text-slate-700" : "",
      variant === "ghost" ? "hover:bg-slate-100 hover:text-slate-900 h-11 py-2 px-6 text-slate-600" : "",
      className
    );
    if (href)
      return (
        <a
          href={href}
          className={classes}
          {...(props as Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">)}
        />
      );
    return <button ref={ref} className={classes} {...props} />;
  }
);
Button.displayName = "Button";

const Card = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("rounded-2xl border border-slate-200 bg-white text-slate-950 shadow-sm", className)} {...props} />
);

const CardContent = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("p-6 md:p-8", className)} {...props} />
);

const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => (
    <label ref={ref} className={cn("text-sm font-semibold text-slate-700 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block", className)} {...props} />
  )
);
Label.displayName = "Label";

const Select = ({ name, value, onValueChange, required, children, disabled }: CustomSelectProps) => {
  const [internalValue, setInternalValue] = useState(value || "");
  
  useEffect(() => {
    if (value !== undefined) setInternalValue(value);
  }, [value]);

  const options: {value: string, label: string}[] = [];
  let placeholder = "Select Option";
  
  React.Children.forEach(children, child => {
    if (child && React.isValidElement(child)) {
      const validChild = child as React.ReactElement<ElementWithChildren>;
      const childType = validChild.type as unknown as { displayName?: string; name?: string };
      const componentName = childType?.displayName || childType?.name;

      if (componentName === "SelectTrigger") {
        React.Children.forEach(validChild.props.children, triggerChild => {
          if (triggerChild && React.isValidElement(triggerChild)) {
            const validTriggerChild = triggerChild as React.ReactElement<ElementWithChildren>;
            const triggerChildType = validTriggerChild.type as unknown as { displayName?: string; name?: string };
            const triggerComponentName = triggerChildType?.displayName || triggerChildType?.name;

            if (triggerComponentName === "SelectValue") {
              placeholder = validTriggerChild.props.placeholder || "Select";
            }
          }
        });
      }
      if (componentName === "SelectContent") {
        const contentChildren = Array.isArray(validChild.props.children) ? validChild.props.children.flat() : [validChild.props.children];
        React.Children.forEach(contentChildren, itemChild => {
          if (itemChild && React.isValidElement(itemChild)) {
            const validItemChild = itemChild as React.ReactElement<ElementWithChildren>;
            const itemChildType = validItemChild.type as unknown as { displayName?: string; name?: string };
            const itemComponentName = itemChildType?.displayName || itemChildType?.name;

            if (itemComponentName === "SelectItem") {
              options.push({ 
                value: validItemChild.props.value || "", 
                label: typeof validItemChild.props.children === "string" ? validItemChild.props.children : "" 
              });
            }
          }
        });
      }
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInternalValue(e.target.value);
    if (onValueChange) onValueChange(e.target.value);
  };

  return (
    <select 
      name={name} 
      value={internalValue} 
      onChange={handleChange}
      required={required}
      disabled={disabled}
      className={cn(
        "flex h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 focus:bg-white transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
      )}
    >
      <option value="" disabled>{placeholder}</option>
      {options.map((opt, i) => <option key={i} value={opt.value}>{opt.label}</option>)}
    </select>
  );
};
const SelectTrigger = ({ children }: { children: React.ReactNode }) => <>{children}</>;
SelectTrigger.displayName = "SelectTrigger";
const SelectValue = ({ placeholder }: { placeholder?: string }) => <>{placeholder}</>;
SelectValue.displayName = "SelectValue";
const SelectContent = ({ children }: { children: React.ReactNode }) => <>{children}</>;
SelectContent.displayName = "SelectContent";
const SelectItem = ({ children }: { children: React.ReactNode; value: string }) => <>{children}</>;
SelectItem.displayName = "SelectItem";

// --- Main Component ---
export default function MaternalNutritionPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [currentMtcId, setCurrentMtcId] = useState<string>("");

  // Data States
  const [registeredChildren, setRegisteredChildren] = useState<ChildDropdownItem[]>([]);
  const [savedRecords, setSavedRecords] = useState<MaternalAssessmentRecord[]>([]);
  const [selectedChildId, setSelectedChildId] = useState("");
  const [selectedChild, setSelectedChild] = useState<ChildDropdownItem | null>(null);

  // Form States - Vitals
  const [motherWeight, setMotherWeight] = useState("");
  const [motherHeight, setMotherHeight] = useState("");
  const [bmi, setBmi] = useState("");
  
  // Counseling Multi-select
  const [counselingTopics, setCounselingTopics] = useState<{ [key: string]: boolean }>({});

  // Load children and previous records from API securely filtered by MTC
  useEffect(() => {
    setMounted(true);
    
    const fetchData = async () => {
      try {
        setIsFetching(true);

        const sessionData = sessionStorage.getItem("mtc_user");
        let mtcId = "";
        if (sessionData) {
          try {
            const user = JSON.parse(sessionData) as { mtcId?: string | number };
            if (user.mtcId) {
              mtcId = user.mtcId.toString();
              setCurrentMtcId(mtcId);
            }
          } catch {
            console.error("Session parse error");
          }
        }

        const queryParams = mtcId ? `?mtcId=${mtcId}` : "";

        // 1. Fetch currently admitted children for the dropdown (Filtered by MTC)
        const childRes = await fetch(`/api/child-registration${queryParams}`);
        if (childRes.ok) {
          const children = await childRes.json() as ChildDropdownItem[];
          setRegisteredChildren(children);
        } else {
          console.error("Failed to fetch children dropdown");
        }

        // 2. Fetch past maternal records for the table (Filtered by MTC)
        await loadRecords(mtcId);

      } catch {
        toast.error("Failed to load database records.");
      } finally {
        setIsFetching(false);
      }
    };
    fetchData();
  }, []);

  const loadRecords = async (mtcId: string) => {
    try {
      const queryParams = mtcId ? `?mtcId=${mtcId}` : "";
      const res = await fetch(`/api/maternal-nutrition${queryParams}`);
      if (res.ok) {
        const records = await res.json() as MaternalAssessmentRecord[];
        setSavedRecords(records);
      }
    } catch {
      console.error("Failed to refresh table lookup");
    }
  };

  // Auto-fill selected child data
  useEffect(() => {
    if (selectedChildId) {
      const child = registeredChildren.find(c => c.registration_id.toString() === selectedChildId);
      setSelectedChild(child || null);
    } else {
      setSelectedChild(null);
    }
  }, [selectedChildId, registeredChildren]);

  // Auto-calculate BMI
  useEffect(() => {
    if (motherWeight && motherHeight) {
      setBmi(calculateBMI(parseFloat(motherWeight), parseFloat(motherHeight)));
    } else {
      setBmi("");
    }
  }, [motherWeight, motherHeight]);

  const handleCounselingChange = (id: string, checked: boolean) => {
    setCounselingTopics(prev => ({ ...prev, [id]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedChild) {
      toast.error("Please select a patient first");
      return;
    }
    
    setLoading(true);
    const formElement = e.currentTarget as HTMLFormElement;
    const webFormData = new FormData(formElement);
    const selectedTopics = Object.keys(counselingTopics).filter(key => counselingTopics[key]);

    const payload = {
      childId: selectedChild.registration_id,
      mtcId: currentMtcId,
      weight: motherWeight,
      height: motherHeight,
      bmi: bmi,
      muac: webFormData.get("motherMuac") as string,
      hbLevel: webFormData.get("hbLevel") as string,
      lactating: webFormData.get("lactatingStatus") as string,
      mealsPerDay: webFormData.get("mealsPerDay") as string,
      ifaGiven: webFormData.get("ifaGiven") as string,
      calciumGiven: webFormData.get("calciumGiven") as string,
      counselingTopics: selectedTopics,
      notes: webFormData.get("notes") as string
    };

    try {
      const res = await fetch("/api/maternal-nutrition", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error("Failed to save record");

      toast.success("Maternal assessment saved!");
      setIsSubmitted(true);
      await loadRecords(currentMtcId);
      router.refresh();
      
    } catch {
      toast.error("An error occurred while saving.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedChildId("");
    setMotherWeight("");
    setMotherHeight("");
    setBmi("");
    setCounselingTopics({});
    setIsSubmitted(false);
  };

  if (!mounted) return null;

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 text-center border-0 shadow-lg">
          <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} strokeWidth={2.5} />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Assessment Recorded!</h2>
          <p className="text-slate-500 mb-6">
            Maternal nutrition and counseling data for <span className="font-bold text-slate-800">{selectedChild?.guardian_name}</span> has been saved to the database.
          </p>
          <div className="flex flex-col gap-3">
            <Button onClick={handleReset} className="w-full">Assess Another Mother</Button>
            <Button variant="outline" onClick={() => router.push("/mtc-user/dashboard/home")} className="w-full">Back to Home</Button>
          </div>
        </Card>
      </div>
    );
  }

  const SectionTitle = ({ icon: Icon, title }: { icon: React.ComponentType<{ size: number, strokeWidth: number }>, title: string }) => (
    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
      <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600"><Icon size={20} strokeWidth={2.5} /></div>
      <h2 className="text-lg font-bold text-slate-800">{title}</h2>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-center" />
      
      <div className="max-w-6xl mx-auto">
        <div className="mb-4 flex items-center">
          <Button variant="ghost" onClick={() => router.back()} className="pl-0 text-slate-500">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back
          </Button>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3">
            <HeartPulse className="text-rose-500 h-8 w-8" />
            Maternal Nutrition Assessment
          </h1>
          <p className="mt-2 text-sm text-slate-500">Record health, dietary intake, and counseling details for the mother/caregiver.</p>
        </div>

        {isFetching ? (
           <div className="flex flex-col items-center justify-center py-20">
             <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
             <p className="text-slate-500 font-medium">Loading patients...</p>
           </div>
        ) : (
          <>
            {/* --- FORM SECTION --- */}
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Section 1: Patient Selection */}
              <Card className="border-0 shadow-sm border-t-4 border-t-indigo-500">
                <CardContent className="p-6">
                  <SectionTitle icon={User} title="Link to Admitted Child" />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <Label>Select Admitted Child <span className="text-red-500">*</span></Label>
                      <Select name="childSelect" value={selectedChildId} onValueChange={setSelectedChildId} required>
                        <SelectTrigger><SelectValue placeholder="Search by child name or SAM number..." /></SelectTrigger>
                        <SelectContent>
                          {registeredChildren.length === 0 ? (
                            <SelectItem value="none">No active patients found</SelectItem>
                          ) : (
                            registeredChildren.map((child) => (
                              <SelectItem key={child.registration_id} value={child.registration_id.toString()}>
                                {child.child_full_name} (SAM: {child.sam_no}) - Caregiver: {child.guardian_name}
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Mother / Caregiver Name</Label>
                      <Input readOnly value={selectedChild ? selectedChild.guardian_name : ""} className="bg-slate-100 font-medium" placeholder="Auto-filled from child record" />
                    </div>
                    
                    <div>
                      <Label>Lactating Mother? <span className="text-red-500">*</span></Label>
                      <Select name="lactatingStatus" required>
                        <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Section 2: Anthropometry & Clinical */}
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <SectionTitle icon={Activity} title="Maternal Vitals & Anthropometry" />
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div>
                      <Label>Weight (kg) <span className="text-red-500">*</span></Label>
                      <Input 
                        type="number" step="0.1" 
                        value={motherWeight} 
                        onChange={(e) => setMotherWeight(e.target.value)} 
                        placeholder="e.g., 55.2" required 
                      />
                    </div>
                    <div>
                      <Label>Height (cm) <span className="text-red-500">*</span></Label>
                      <Input 
                        type="number" step="0.1" 
                        value={motherHeight} 
                        onChange={(e) => setMotherHeight(e.target.value)} 
                        placeholder="e.g., 155" required 
                      />
                    </div>
                    <div>
                      <Label>Calculated BMI</Label>
                      <Input 
                        readOnly value={bmi} 
                        className={cn(
                          "font-bold cursor-not-allowed",
                          bmi && parseFloat(bmi) < 18.5 ? "bg-red-50 text-red-700 border-red-200" : "bg-slate-100 text-indigo-700"
                        )} 
                        placeholder="Auto-calculated" 
                      />
                      {bmi && parseFloat(bmi) < 18.5 && <p className="text-xs text-red-600 mt-1">Underweight warning</p>}
                    </div>
                    <div>
                      <Label>Hemoglobin (Hb) g/dL</Label>
                      <Input name="hbLevel" type="number" step="0.1" placeholder="e.g., 10.5" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Section 3: Diet & Supplements */}
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <SectionTitle icon={Apple} title="Dietary Assessment & Supplements" />
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <Label>Meals per Day <span className="text-red-500">*</span></Label>
                      <Select name="mealsPerDay" required>
                        <SelectTrigger><SelectValue placeholder="Select frequency" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-2">1-2 meals</SelectItem>
                          <SelectItem value="3">3 meals</SelectItem>
                          <SelectItem value="4+">4 or more meals</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label className="flex items-center gap-2"><Pill size={14}/> IFA Tablets Given? <span className="text-red-500">*</span></Label>
                      <Select name="ifaGiven" required>
                        <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                          <SelectItem value="already_taking">Already Taking</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="flex items-center gap-2"><Pill size={14}/> Calcium Tablets Given? <span className="text-red-500">*</span></Label>
                      <Select name="calciumGiven" required>
                        <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                          <SelectItem value="already_taking">Already Taking</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Section 4: Counseling */}
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <SectionTitle icon={MessageCircle} title="Counseling & Education Provided" />
                  
                  <Label className="mb-4 block">Select all topics covered during this session: <span className="text-red-500">*</span></Label>
                  <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-6">
                      {[
                        { id: "iycf", label: "Infant & Young Child Feeding (IYCF)" },
                        { id: "ebf", label: "Exclusive Breastfeeding (0-6 months)" },
                        { id: "comp_feeding", label: "Complementary Feeding Practices" },
                        { id: "maternal_diet", label: "Dietary Diversity for Mother" },
                        { id: "wash", label: "WASH (Water, Sanitation, Hygiene)" },
                        { id: "family_planning", label: "Family Planning Methods" },
                        { id: "anemia", label: "Anemia Prevention" },
                        { id: "danger_signs", label: "Identifying Danger Signs in Child" },
                      ].map((topic) => (
                        <div key={topic.id} className="flex items-start space-x-3">
                          <input
                            type="checkbox"
                            id={`topic-${topic.id}`}
                            checked={counselingTopics[topic.id] || false}
                            onChange={(e) => handleCounselingChange(topic.id, e.target.checked)}
                            className="mt-1 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded cursor-pointer transition-colors"
                          />
                          <label htmlFor={`topic-${topic.id}`} className="text-sm font-medium text-slate-700 cursor-pointer leading-tight pt-0.5">
                            {topic.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6">
                    <Label>Additional Notes / Observations</Label>
                    <textarea 
                      name="notes"
                      className="w-full min-h-[100px] rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                      placeholder="Record any specific concerns, willingness to adopt practices, etc."
                    ></textarea>
                  </div>
                </CardContent>
              </Card>

              {/* Action Bar */}
              <div className="flex justify-end gap-4 mt-8 pb-10">
                <Button variant="outline" type="button" onClick={() => router.back()}>Cancel</Button>
                <Button type="submit" disabled={loading} className="min-w-40">
                  {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/> Saving...</> : "Save Assessment"}
                </Button>
              </div>
            </form>

            {/* --- TABLE SECTION --- */}
            <div className="mt-12 pt-8 border-t border-slate-200">
              <div className="mb-6 flex items-center gap-3">
                <ClipboardList className="text-indigo-600 h-6 w-6" />
                <h2 className="text-2xl font-bold text-slate-900">Recent Assessments</h2>
              </div>

              <Card className="border-0 shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-semibold">
                      <tr>
                        <th className="px-6 py-4">Date</th>
                        <th className="px-6 py-4">Mother&apos;s Name</th>
                        <th className="px-6 py-4">Linked Child (SAM No.)</th>
                        <th className="px-6 py-4">BMI</th>
                        <th className="px-6 py-4 text-center">IFA Given</th>
                        <th className="px-6 py-4 text-center">Calcium Given</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {savedRecords.length > 0 ? (
                        savedRecords.map((record) => (
                          <tr key={record.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-slate-500">
                              {new Date(record.dateSubmitted || record.createdAt || Date.now()).toLocaleDateString("en-GB")}
                            </td>
                            <td className="px-6 py-4 font-medium text-slate-900">
                              {record.motherName}
                            </td>
                            <td className="px-6 py-4 text-slate-600">
                              {record.childName} <br/>
                              <span className="text-xs text-indigo-600">{record.samNumber}</span>
                            </td>
                            <td className="px-6 py-4">
                              <span className={cn(
                                "px-2 py-1 rounded text-xs font-semibold",
                                parseFloat(record.bmi) < 18.5 ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"
                              )}>
                                {record.bmi}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <span className="capitalize text-slate-700">{record.ifaGiven?.replace("_", " ")}</span>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <span className="capitalize text-slate-700">{record.calciumGiven?.replace("_", " ")}</span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                            No maternal nutrition assessments have been recorded yet.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          </>
        )}
      </div>
    </div>
  );
}