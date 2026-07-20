// // // // // "use client";

// // // // // import React, { useState, useEffect } from "react";
// // // // // import { useRouter } from "next/navigation";
// // // // // import { 
// // // // //   Calculator, Banknote, User, CheckCircle, ArrowLeft, CalendarDays, Receipt 
// // // // // } from "lucide-react";
// // // // // import toast, { Toaster } from "react-hot-toast";

// // // // // // --- UI Components ---
// // // // // import { clsx, type ClassValue } from "clsx";
// // // // // import { twMerge } from "tailwind-merge";

// // // // // function cn(...inputs: ClassValue[]) {
// // // // //   return twMerge(clsx(inputs));
// // // // // }

// // // // // const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
// // // // //   ({ className, type, ...props }, ref) => {
// // // // //     return (
// // // // //       <input
// // // // //         type={type}
// // // // //         className={cn(    
// // // // //           "flex h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 focus:bg-white transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50",
// // // // //           className
// // // // //         )}
// // // // //         ref={ref}
// // // // //         {...props}
// // // // //       />
// // // // //     );
// // // // //   }
// // // // // );
// // // // // Input.displayName = "Input";

// // // // // const Button = React.forwardRef<any, any>(
// // // // //   ({ className, variant = 'default', href, ...props }, ref) => {
// // // // //     const classes = cn(
// // // // //       "inline-flex items-center justify-center rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]",
// // // // //       variant === 'default' ? "bg-indigo-600 text-white shadow-md shadow-indigo-200 hover:bg-indigo-700 h-11 py-2 px-6" : "",
// // // // //       variant === 'outline' ? "border border-slate-200 bg-white shadow-sm hover:bg-slate-50 hover:text-slate-900 h-11 py-2 px-6 text-slate-700" : "",
// // // // //       variant === 'ghost' ? "hover:bg-slate-100 hover:text-slate-900 h-11 py-2 px-6 text-slate-600" : "",
// // // // //       className
// // // // //     );
// // // // //     if (href) return <a href={href} className={classes} ref={ref} {...props} />;
// // // // //     return <button ref={ref} className={classes} {...props} />;
// // // // //   }
// // // // // );
// // // // // Button.displayName = "Button";

// // // // // const Card = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
// // // // //   <div className={cn("rounded-2xl border border-slate-200 bg-white text-slate-950 shadow-sm", className)} {...props} />
// // // // // );
// // // // // const CardContent = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
// // // // //   <div className={cn("p-6 md:p-8", className)} {...props} />
// // // // // );

// // // // // const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
// // // // //   ({ className, ...props }, ref) => (
// // // // //     <label ref={ref} className={cn("text-sm font-semibold text-slate-700 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block", className)} {...props} />
// // // // //   )
// // // // // );
// // // // // Label.displayName = "Label";

// // // // // const Select = ({ name, value, onValueChange, required, children, disabled }: any) => {
// // // // //   const [internalValue, setInternalValue] = useState(value || "");
  
// // // // //   useEffect(() => {
// // // // //     if (value !== undefined) setInternalValue(value);
// // // // //   }, [value]);

// // // // //   const options: {value: string, label: string}[] = [];
// // // // //   let placeholder = "Select Option";
  
// // // // //   React.Children.forEach(children, child => {
// // // // //     if (child && child.type?.name === 'SelectTrigger') {
// // // // //       React.Children.forEach(child.props.children, triggerChild => {
// // // // //         if (triggerChild && triggerChild.type?.name === 'SelectValue') placeholder = triggerChild.props.placeholder || "Select";
// // // // //       });
// // // // //     }
// // // // //     if (child && child.type?.name === 'SelectContent') {
// // // // //       React.Children.forEach(child.props.children, itemChild => {
// // // // //         if (itemChild && itemChild.type?.name === 'SelectItem') {
// // // // //           options.push({ value: itemChild.props.value, label: itemChild.props.children });
// // // // //         }
// // // // //       });
// // // // //     }
// // // // //   });

// // // // //   const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
// // // // //     setInternalValue(e.target.value);
// // // // //     if (onValueChange) onValueChange(e.target.value);
// // // // //   };

// // // // //   return (
// // // // //     <select 
// // // // //       name={name} 
// // // // //       value={internalValue} 
// // // // //       onChange={handleChange}
// // // // //       required={required}
// // // // //       disabled={disabled}
// // // // //       className={cn(
// // // // //         "flex h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 focus:bg-white transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
// // // // //       )}
// // // // //     >
// // // // //       <option value="" disabled>{placeholder}</option>
// // // // //       {options.map((opt, i) => <option key={i} value={opt.value}>{opt.label}</option>)}
// // // // //     </select>
// // // // //   );
// // // // // };
// // // // // const SelectTrigger = ({ children }: any) => <>{children}</>;
// // // // // const SelectValue = ({ placeholder }: any) => <>{placeholder}</>;
// // // // // const SelectContent = ({ children }: any) => <>{children}</>;
// // // // // const SelectItem = ({ children }: any) => <>{children}</>;

// // // // // // --- Main Component ---
// // // // // export default function CompensationCalculationPage() {
// // // // //   const router = useRouter();
// // // // //   const [mounted, setMounted] = useState(false);
// // // // //   const [loading, setLoading] = useState(false);
// // // // //   const [isSubmitted, setIsSubmitted] = useState(false);

// // // // //   // Data States
// // // // //   const [registeredChildren, setRegisteredChildren] = useState<any[]>([]);
// // // // //   const [selectedChildId, setSelectedChildId] = useState("");
// // // // //   const [selectedChild, setSelectedChild] = useState<any>(null);

// // // // //   // Form States
// // // // //   const [noOfDays, setNoOfDays] = useState<string>("");
// // // // //   const [dailyRate, setDailyRate] = useState<string>("150"); // Default average payment (e.g., 150 per day)
// // // // //   const [approved, setApproved] = useState<string>("");

// // // // //   // Load children on mount
// // // // //   useEffect(() => {
// // // // //     setMounted(true);
// // // // //     const stored = localStorage.getItem('registeredChildren');
// // // // //     if (stored) {
// // // // //       setRegisteredChildren(JSON.parse(stored));
// // // // //     }
// // // // //   }, []);

// // // // //   // Update selected child details when ID changes
// // // // //   useEffect(() => {
// // // // //     if (selectedChildId) {
// // // // //       const child = registeredChildren.find(c => c.id === selectedChildId);
// // // // //       setSelectedChild(child || null);
// // // // //     } else {
// // // // //       setSelectedChild(null);
// // // // //     }
// // // // //   }, [selectedChildId, registeredChildren]);

// // // // //   // Calculate Total
// // // // //   const totalAmount = (parseFloat(noOfDays) || 0) * (parseFloat(dailyRate) || 0);

// // // // //   const handleSubmit = (e: React.FormEvent) => {
// // // // //     e.preventDefault();
// // // // //     if (!selectedChild) {
// // // // //       toast.error("Please select a child first");
// // // // //       return;
// // // // //     }
    
// // // // //     if (approved !== "yes") {
// // // // //       toast.error("You must approve the payment to submit");
// // // // //       return;
// // // // //     }

// // // // //     setLoading(true);

// // // // //     // Create payment record
// // // // //     const paymentRecord = {
// // // // //       id: Date.now().toString(),
// // // // //       childId: selectedChild.id,
// // // // //       childName: selectedChild.childName,
// // // // //       parentName: selectedChild.parentName,
// // // // //       samNumber: selectedChild.samNumber,
// // // // //       noOfDays: parseFloat(noOfDays),
// // // // //       dailyRate: parseFloat(dailyRate),
// // // // //       totalAmount: totalAmount,
// // // // //       dateSubmitted: new Date().toISOString()
// // // // //     };

// // // // //     // Save to local storage
// // // // //     const existingPayments = localStorage.getItem('compensationRecords');
// // // // //     const records = existingPayments ? JSON.parse(existingPayments) : [];
// // // // //     records.unshift(paymentRecord);
// // // // //     localStorage.setItem('compensationRecords', JSON.stringify(records));

// // // // //     setTimeout(() => {
// // // // //       toast.success("Compensation calculated and saved!");
// // // // //       setLoading(false);
// // // // //       setIsSubmitted(true);
// // // // //     }, 1500);
// // // // //   };

// // // // //   const handleReset = () => {
// // // // //     setSelectedChildId("");
// // // // //     setNoOfDays("");
// // // // //     setApproved("");
// // // // //     setIsSubmitted(false);
// // // // //   };

// // // // //   if (!mounted) return null;

// // // // //   if (isSubmitted) {
// // // // //     return (
// // // // //       <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
// // // // //         <Card className="max-w-md w-full p-8 text-center border-0 shadow-lg">
// // // // //           <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
// // // // //             <CheckCircle size={40} strokeWidth={2.5} />
// // // // //           </div>
// // // // //           <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Payment Recorded!</h2>
// // // // //           <p className="text-slate-500 mb-6">
// // // // //             Total compensation of <span className="font-bold text-slate-800">₹{totalAmount.toFixed(2)}</span> has been recorded for {selectedChild?.parentName}.
// // // // //           </p>
// // // // //           <div className="flex flex-col gap-3">
// // // // //             <Button onClick={handleReset} className="w-full">Calculate Another</Button>
// // // // //             <Button variant="outline" onClick={() => router.push('/mtc-user/dashboard/home')} className="w-full">Back to Home</Button>
// // // // //           </div>
// // // // //         </Card>
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   const SectionTitle = ({ icon: Icon, title }: { icon: any, title: string }) => (
// // // // //     <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
// // // // //       <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600"><Icon size={20} strokeWidth={2.5} /></div>
// // // // //       <h2 className="text-lg font-bold text-slate-800">{title}</h2>
// // // // //     </div>
// // // // //   );

// // // // //   return (
// // // // //     <div className="min-h-screen bg-[#F8FAFC] py-8 px-4 sm:px-6 lg:px-8">
// // // // //       <Toaster position="top-center" />
      
// // // // //       <div className="max-w-4xl mx-auto">
// // // // //         <div className="mb-4 flex items-center">
// // // // //           <Button variant="ghost" onClick={() => router.back()} className="pl-0 text-slate-500">
// // // // //             <ArrowLeft className="w-5 h-5 mr-2" /> Back
// // // // //           </Button>
// // // // //         </div>

// // // // //         <div className="mb-8">
// // // // //           <h1 className="text-3xl font-extrabold text-slate-900">Compensation Calculator</h1>
// // // // //           <p className="mt-2 text-sm text-slate-500">Calculate and record the daily wage compensation for parents/caregivers.</p>
// // // // //         </div>

// // // // //         <form onSubmit={handleSubmit} className="space-y-6">
          
// // // // //           {/* Section 1: Patient Selection */}
// // // // //           <Card className="border-0 shadow-sm">
// // // // //             <CardContent className="p-6">
// // // // //               <SectionTitle icon={User} title="Patient Selection" />
              
// // // // //               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // // // //                 <div className="md:col-span-2">
// // // // //                   <Label>Search & Select Registered Child <span className="text-red-500">*</span></Label>
// // // // //                   <Select name="childSelect" value={selectedChildId} onValueChange={setSelectedChildId} required>
// // // // //                     <SelectTrigger><SelectValue placeholder="Select a patient..." /></SelectTrigger>
// // // // //                     <SelectContent>
// // // // //                       {registeredChildren.length === 0 ? (
// // // // //                         <SelectItem value="none">No patients found</SelectItem>
// // // // //                       ) : (
// // // // //                         registeredChildren.map((child: any) => (
// // // // //                           <SelectItem key={child.id} value={child.id}>
// // // // //                             {child.childName} (SAM: {child.samNumber})
// // // // //                           </SelectItem>
// // // // //                         ))
// // // // //                       )}
// // // // //                     </SelectContent>
// // // // //                   </Select>
// // // // //                 </div>

// // // // //                 <div>
// // // // //                   <Label>Child Name</Label>
// // // // //                   <Input readOnly value={selectedChild ? selectedChild.childName : ""} className="bg-slate-100 font-medium" placeholder="Auto-filled" />
// // // // //                 </div>
                
// // // // //                 <div>
// // // // //                   <Label>Parent / Caregiver Name</Label>
// // // // //                   <Input readOnly value={selectedChild ? selectedChild.parentName : ""} className="bg-slate-100 font-medium" placeholder="Auto-filled" />
// // // // //                 </div>
// // // // //               </div>
// // // // //             </CardContent>
// // // // //           </Card>

// // // // //           {/* Section 2: Payment Calculation */}
// // // // //           <Card className="border-0 shadow-sm">
// // // // //             <CardContent className="p-6">
// // // // //               <SectionTitle icon={Calculator} title="Payment Details" />
              
// // // // //               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
// // // // //                 <div>
// // // // //                   <Label className="flex items-center gap-2"><CalendarDays size={16}/> Number of Days Stayed <span className="text-red-500">*</span></Label>
// // // // //                   <Input 
// // // // //                     type="number" 
// // // // //                     min="1" 
// // // // //                     value={noOfDays} 
// // // // //                     onChange={(e) => setNoOfDays(e.target.value)} 
// // // // //                     placeholder="e.g., 14" 
// // // // //                     required 
// // // // //                   />
// // // // //                 </div>
                
// // // // //                 <div>
// // // // //                   <Label className="flex items-center gap-2"><Banknote size={16}/> Average Payment / Daily Rate (₹) <span className="text-red-500">*</span></Label>
// // // // //                   <Input 
// // // // //                     type="number" 
// // // // //                     min="0" 
// // // // //                     value={dailyRate} 
// // // // //                     onChange={(e) => setDailyRate(e.target.value)} 
// // // // //                     placeholder="e.g., 150" 
// // // // //                     required 
// // // // //                   />
// // // // //                 </div>

// // // // //                 <div className="md:col-span-2 bg-indigo-50 border border-indigo-100 p-6 rounded-xl mt-2 flex flex-col sm:flex-row justify-between items-center gap-4">
// // // // //                   <div>
// // // // //                     <h3 className="text-indigo-900 font-semibold text-lg flex items-center gap-2">
// // // // //                       <Receipt size={20} /> Total Compensation Calculated
// // // // //                     </h3>
// // // // //                     <p className="text-indigo-700/80 text-sm mt-1">Formula: Days Stayed × Daily Rate</p>
// // // // //                   </div>
// // // // //                   <div className="text-3xl font-extrabold text-indigo-700 bg-white px-6 py-3 rounded-lg shadow-sm border border-indigo-100">
// // // // //                     ₹ {totalAmount.toFixed(2)}
// // // // //                   </div>
// // // // //                 </div>
// // // // //               </div>
// // // // //             </CardContent>
// // // // //           </Card>

// // // // //           {/* Section 3: Approval */}
// // // // //           <Card className="border-0 shadow-sm">
// // // // //             <CardContent className="p-6">
// // // // //               <SectionTitle icon={CheckCircle} title="Final Approval" />
              
// // // // //               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // // // //                 <div className="md:col-span-2">
// // // // //                   <Label>Do you approve this payment for submission? <span className="text-red-500">*</span></Label>
// // // // //                   <Select name="approval" value={approved} onValueChange={setApproved} required>
// // // // //                     <SelectTrigger><SelectValue placeholder="Select Yes or No" /></SelectTrigger>
// // // // //                     <SelectContent>
// // // // //                       <SelectItem value="yes">Yes, I approve and confirm this payment</SelectItem>
// // // // //                       <SelectItem value="no">No, do not submit yet</SelectItem>
// // // // //                     </SelectContent>
// // // // //                   </Select>
// // // // //                 </div>
// // // // //               </div>
// // // // //             </CardContent>
// // // // //           </Card>

// // // // //           {/* Action Bar */}
// // // // //           <div className="flex justify-end gap-4 mt-8">
// // // // //             <Button variant="outline" type="button" onClick={() => router.back()}>Cancel</Button>
// // // // //             <Button type="submit" disabled={loading} className="min-w-[160px]">
// // // // //               {loading ? "Processing..." : "Submit Payment"}
// // // // //             </Button>
// // // // //           </div>

// // // // //         </form>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // "use client";

// // // // import React, { useState, useEffect } from "react";
// // // // import { useRouter } from "next/navigation";
// // // // import { 
// // // //   Calculator, Banknote, User, CheckCircle, ArrowLeft, CalendarDays, Receipt 
// // // // } from "lucide-react";
// // // // import toast, { Toaster } from "react-hot-toast";
// // // // import { clsx, type ClassValue } from "clsx";
// // // // import { twMerge } from "tailwind-merge";

// // // // // --- UI Components ---
// // // // function cn(...inputs: ClassValue[]) {
// // // //   return twMerge(clsx(inputs));
// // // // }

// // // // const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
// // // //   ({ className, type, ...props }, ref) => {
// // // //     return (
// // // //       <input
// // // //         type={type}
// // // //         className={cn(    
// // // //           "flex h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 focus:bg-white transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50",
// // // //           className
// // // //         )}
// // // //         ref={ref}
// // // //         {...props}
// // // //       />
// // // //     );
// // // //   }
// // // // );
// // // // Input.displayName = "Input";

// // // // const Button = React.forwardRef<any, any>(
// // // //   ({ className, variant = 'default', href, ...props }, ref) => {
// // // //     const classes = cn(
// // // //       "inline-flex items-center justify-center rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]",
// // // //       variant === 'default' ? "bg-indigo-600 text-white shadow-md shadow-indigo-200 hover:bg-indigo-700 h-11 py-2 px-6" : "",
// // // //       variant === 'outline' ? "border border-slate-200 bg-white shadow-sm hover:bg-slate-50 hover:text-slate-900 h-11 py-2 px-6 text-slate-700" : "",
// // // //       variant === 'ghost' ? "hover:bg-slate-100 hover:text-slate-900 h-11 py-2 px-6 text-slate-600" : "",
// // // //       className
// // // //     );
// // // //     if (href) return <a href={href} className={classes} ref={ref} {...props} />;
// // // //     return <button ref={ref} className={classes} {...props} />;
// // // //   }
// // // // );
// // // // Button.displayName = "Button";

// // // // const Card = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
// // // //   <div className={cn("rounded-2xl border border-slate-200 bg-white text-slate-950 shadow-sm", className)} {...props} />
// // // // );
// // // // const CardContent = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
// // // //   <div className={cn("p-6 md:p-8", className)} {...props} />
// // // // );

// // // // const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
// // // //   ({ className, ...props }, ref) => (
// // // //     <label ref={ref} className={cn("text-sm font-semibold text-slate-700 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block", className)} {...props} />
// // // //   )
// // // // );
// // // // Label.displayName = "Label";

// // // // const Select = ({ name, value, onValueChange, required, children, disabled }: any) => {
// // // //   const [internalValue, setInternalValue] = useState(value || "");
  
// // // //   useEffect(() => {
// // // //     if (value !== undefined) setInternalValue(value);
// // // //   }, [value]);

// // // //   const options: {value: string, label: string}[] = [];
// // // //   let placeholder = "Select Option";
  
// // // //   React.Children.forEach(children, child => {
// // // //     if (child && child.type?.name === 'SelectTrigger') {
// // // //       React.Children.forEach(child.props.children, triggerChild => {
// // // //         if (triggerChild && triggerChild.type?.name === 'SelectValue') placeholder = triggerChild.props.placeholder || "Select";
// // // //       });
// // // //     }
// // // //     if (child && child.type?.name === 'SelectContent') {
// // // //       React.Children.forEach(child.props.children, itemChild => {
// // // //         if (itemChild && itemChild.type?.name === 'SelectItem') {
// // // //           options.push({ value: itemChild.props.value, label: itemChild.props.children });
// // // //         }
// // // //       });
// // // //     }
// // // //   });

// // // //   const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
// // // //     setInternalValue(e.target.value);
// // // //     if (onValueChange) onValueChange(e.target.value);
// // // //   };

// // // //   return (
// // // //     <select 
// // // //       name={name} 
// // // //       value={internalValue} 
// // // //       onChange={handleChange}
// // // //       required={required}
// // // //       disabled={disabled}
// // // //       className={cn(
// // // //         "flex h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 focus:bg-white transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
// // // //       )}
// // // //     >
// // // //       <option value="" disabled>{placeholder}</option>
// // // //       {options.map((opt, i) => <option key={i} value={opt.value}>{opt.label}</option>)}
// // // //     </select>
// // // //   );
// // // // };
// // // // const SelectTrigger = ({ children }: any) => <>{children}</>;
// // // // const SelectValue = ({ placeholder }: any) => <>{placeholder}</>;
// // // // const SelectContent = ({ children }: any) => <>{children}</>;
// // // // const SelectItem = ({ children }: any) => <>{children}</>;

// // // // // --- Main Component ---
// // // // export default function CompensationCalculationPage() {
// // // //   const router = useRouter();
// // // //   const [mounted, setMounted] = useState(false);
// // // //   const [loading, setLoading] = useState(false);
// // // //   const [isSubmitted, setIsSubmitted] = useState(false);

// // // //   // Data States
// // // //   const [registeredChildren, setRegisteredChildren] = useState<any[]>([]);
// // // //   const [selectedChildId, setSelectedChildId] = useState("");
// // // //   const [selectedChild, setSelectedChild] = useState<any>(null);

// // // //   // Form States
// // // //   const [noOfDays, setNoOfDays] = useState<string>("");
// // // //   const [dailyRate, setDailyRate] = useState<string>("150"); 
// // // //   const [approved, setApproved] = useState<string>("");

// // // //   // 1. Fetch children from Database on mount
// // // //   useEffect(() => {
// // // //     setMounted(true);
// // // //     const fetchChildren = async () => {
// // // //       try {
// // // //         const res = await fetch('/api/compensation');
// // // //         if (res.ok) {
// // // //           const data = await res.json();
// // // //           setRegisteredChildren(data);
// // // //         }
// // // //       } catch (error) {
// // // //         toast.error("Failed to load patient list");
// // // //       }
// // // //     };
// // // //     fetchChildren();
// // // //   }, []);

// // // //   // Update selected child details when ID changes
// // // //   useEffect(() => {
// // // //     if (selectedChildId) {
// // // //       const child = registeredChildren.find(c => c.id === selectedChildId);
// // // //       setSelectedChild(child || null);
// // // //     } else {
// // // //       setSelectedChild(null);
// // // //     }
// // // //   }, [selectedChildId, registeredChildren]);

// // // //   // Calculate Total
// // // //   const totalAmount = (parseFloat(noOfDays) || 0) * (parseFloat(dailyRate) || 0);

// // // //   const handleSubmit = async (e: React.FormEvent) => {
// // // //     e.preventDefault();
// // // //     if (!selectedChild) {
// // // //       toast.error("Please select a child first");
// // // //       return;
// // // //     }
    
// // // //     if (approved !== "yes") {
// // // //       toast.error("You must approve the payment to submit");
// // // //       return;
// // // //     }

// // // //     setLoading(true);

// // // //     try {
// // // //       const payload = {
// // // //         childId: selectedChild.id,
// // // //         noOfDays: parseFloat(noOfDays),
// // // //         dailyRate: parseFloat(dailyRate),
// // // //         totalAmount: totalAmount
// // // //       };

// // // //       const res = await fetch('/api/compensation', {
// // // //         method: 'POST',
// // // //         headers: { 'Content-Type': 'application/json' },
// // // //         body: JSON.stringify(payload)
// // // //       });

// // // //       if (!res.ok) throw new Error("Failed to save record");

// // // //       toast.success("Compensation calculated and saved to database!");
// // // //       setIsSubmitted(true);

// // // //     } catch (error) {
// // // //       toast.error("An error occurred while saving the payment.");
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   const handleReset = () => {
// // // //     setSelectedChildId("");
// // // //     setNoOfDays("");
// // // //     setApproved("");
// // // //     setIsSubmitted(false);
// // // //   };

// // // //   if (!mounted) return null;

// // // //   if (isSubmitted) {
// // // //     return (
// // // //       <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
// // // //         <Card className="max-w-md w-full p-8 text-center border-0 shadow-lg">
// // // //           <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
// // // //             <CheckCircle size={40} strokeWidth={2.5} />
// // // //           </div>
// // // //           <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Payment Recorded!</h2>
// // // //           <p className="text-slate-500 mb-6">
// // // //             Total compensation of <span className="font-bold text-slate-800">₹{totalAmount.toFixed(2)}</span> has been securely saved for {selectedChild?.parentName}.
// // // //           </p>
// // // //           <div className="flex flex-col gap-3">
// // // //             <Button onClick={handleReset} className="w-full">Calculate Another</Button>
// // // //             <Button variant="outline" onClick={() => router.push('/mtc-user/dashboard/home')} className="w-full">Back to Home</Button>
// // // //           </div>
// // // //         </Card>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   const SectionTitle = ({ icon: Icon, title }: { icon: any, title: string }) => (
// // // //     <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
// // // //       <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600"><Icon size={20} strokeWidth={2.5} /></div>
// // // //       <h2 className="text-lg font-bold text-slate-800">{title}</h2>
// // // //     </div>
// // // //   );

// // // //   return (
// // // //     <div className="min-h-screen bg-[#F8FAFC] py-8 px-4 sm:px-6 lg:px-8">
// // // //       <Toaster position="top-center" />
      
// // // //       <div className="max-w-4xl mx-auto">
// // // //         <div className="mb-4 flex items-center">
// // // //           <Button variant="ghost" onClick={() => router.back()} className="pl-0 text-slate-500">
// // // //             <ArrowLeft className="w-5 h-5 mr-2" /> Back
// // // //           </Button>
// // // //         </div>

// // // //         <div className="mb-8">
// // // //           <h1 className="text-3xl font-extrabold text-slate-900">Compensation Calculator</h1>
// // // //           <p className="mt-2 text-sm text-slate-500">Calculate and securely record the daily wage compensation for parents/caregivers.</p>
// // // //         </div>

// // // //         <form onSubmit={handleSubmit} className="space-y-6">
          
// // // //           {/* Section 1: Patient Selection */}
// // // //           <Card className="border-0 shadow-sm">
// // // //             <CardContent className="p-6">
// // // //               <SectionTitle icon={User} title="Patient Selection" />
              
// // // //               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // // //                 <div className="md:col-span-2">
// // // //                   <Label>Search & Select Registered Child <span className="text-red-500">*</span></Label>
// // // //                   <Select name="childSelect" value={selectedChildId} onValueChange={setSelectedChildId} required>
// // // //                     <SelectTrigger><SelectValue placeholder="Select a patient..." /></SelectTrigger>
// // // //                     <SelectContent>
// // // //                       {registeredChildren.length === 0 ? (
// // // //                         <SelectItem value="none">No patients found</SelectItem>
// // // //                       ) : (
// // // //                         registeredChildren.map((child: any) => (
// // // //                           <SelectItem key={child.id} value={child.id}>
// // // //                             {child.childName} (SAM: {child.samNumber})
// // // //                           </SelectItem>
// // // //                         ))
// // // //                       )}
// // // //                     </SelectContent>
// // // //                   </Select>
// // // //                 </div>

// // // //                 <div>
// // // //                   <Label>Child Name</Label>
// // // //                   <Input readOnly value={selectedChild ? selectedChild.childName : ""} className="bg-slate-100 font-medium" placeholder="Auto-filled" />
// // // //                 </div>
                
// // // //                 <div>
// // // //                   <Label>Parent / Caregiver Name</Label>
// // // //                   <Input readOnly value={selectedChild ? selectedChild.parentName : ""} className="bg-slate-100 font-medium" placeholder="Auto-filled" />
// // // //                 </div>
// // // //               </div>
// // // //             </CardContent>
// // // //           </Card>

// // // //           {/* Section 2: Payment Calculation */}
// // // //           <Card className="border-0 shadow-sm">
// // // //             <CardContent className="p-6">
// // // //               <SectionTitle icon={Calculator} title="Payment Details" />
              
// // // //               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
// // // //                 <div>
// // // //                   <Label className="flex items-center gap-2"><CalendarDays size={16}/> Number of Days Stayed <span className="text-red-500">*</span></Label>
// // // //                   <Input 
// // // //                     type="number" 
// // // //                     min="1" 
// // // //                     value={noOfDays} 
// // // //                     onChange={(e) => setNoOfDays(e.target.value)} 
// // // //                     placeholder="e.g., 14" 
// // // //                     required 
// // // //                   />
// // // //                 </div>
                
// // // //                 <div>
// // // //                   <Label className="flex items-center gap-2"><Banknote size={16}/> Average Payment / Daily Rate (₹) <span className="text-red-500">*</span></Label>
// // // //                   <Input 
// // // //                     type="number" 
// // // //                     min="0" 
// // // //                     value={dailyRate} 
// // // //                     onChange={(e) => setDailyRate(e.target.value)} 
// // // //                     placeholder="e.g., 150" 
// // // //                     required 
// // // //                   />
// // // //                 </div>

// // // //                 <div className="md:col-span-2 bg-indigo-50 border border-indigo-100 p-6 rounded-xl mt-2 flex flex-col sm:flex-row justify-between items-center gap-4">
// // // //                   <div>
// // // //                     <h3 className="text-indigo-900 font-semibold text-lg flex items-center gap-2">
// // // //                       <Receipt size={20} /> Total Compensation Calculated
// // // //                     </h3>
// // // //                     <p className="text-indigo-700/80 text-sm mt-1">Formula: Days Stayed × Daily Rate</p>
// // // //                   </div>
// // // //                   <div className="text-3xl font-extrabold text-indigo-700 bg-white px-6 py-3 rounded-lg shadow-sm border border-indigo-100">
// // // //                     ₹ {totalAmount.toFixed(2)}
// // // //                   </div>
// // // //                 </div>
// // // //               </div>
// // // //             </CardContent>
// // // //           </Card>

// // // //           {/* Section 3: Approval */}
// // // //           <Card className="border-0 shadow-sm">
// // // //             <CardContent className="p-6">
// // // //               <SectionTitle icon={CheckCircle} title="Final Approval" />
              
// // // //               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // // //                 <div className="md:col-span-2">
// // // //                   <Label>Do you approve this payment for submission? <span className="text-red-500">*</span></Label>
// // // //                   <Select name="approval" value={approved} onValueChange={setApproved} required>
// // // //                     <SelectTrigger><SelectValue placeholder="Select Yes or No" /></SelectTrigger>
// // // //                     <SelectContent>
// // // //                       <SelectItem value="yes">Yes, I approve and confirm this payment</SelectItem>
// // // //                       <SelectItem value="no">No, do not submit yet</SelectItem>
// // // //                     </SelectContent>
// // // //                   </Select>
// // // //                 </div>
// // // //               </div>
// // // //             </CardContent>
// // // //           </Card>

// // // //           {/* Action Bar */}
// // // //           <div className="flex justify-end gap-4 mt-8">
// // // //             <Button variant="outline" type="button" onClick={() => router.back()}>Cancel</Button>
// // // //             <Button type="submit" disabled={loading} className="min-w-40">
// // // //               {loading ? "Processing..." : "Submit Payment"}
// // // //             </Button>
// // // //           </div>

// // // //         </form>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }


// // // "use client";

// // // import React, { useState, useEffect } from "react";
// // // import { useRouter } from "next/navigation";
// // // import { 
// // //   Calculator, Banknote, User, CheckCircle, ArrowLeft, CalendarDays, Receipt, TableProperties, Loader2
// // // } from "lucide-react";
// // // import toast, { Toaster } from "react-hot-toast";
// // // import { clsx, type ClassValue } from "clsx";
// // // import { twMerge } from "tailwind-merge";

// // // // --- UI Components ---
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
// // //       const contentChildren = Array.isArray(child.props.children) ? child.props.children.flat() : [child.props.children];
// // //       React.Children.forEach(contentChildren, itemChild => {
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
// // // const SelectItem = ({ children, value }: any) => <>{children}</>;

// // // // --- Main Component ---
// // // export default function CompensationCalculationPage() {
// // //   const router = useRouter();
// // //   const [mounted, setMounted] = useState(false);
// // //   const [loading, setLoading] = useState(false);
// // //   const [isFetching, setIsFetching] = useState(true);
// // //   const [isSubmitted, setIsSubmitted] = useState(false);

// // //   // Data States
// // //   const [registeredChildren, setRegisteredChildren] = useState<any[]>([]);
// // //   const [pastRecords, setPastRecords] = useState<any[]>([]);
// // //   const [selectedChildId, setSelectedChildId] = useState("");
// // //   const [selectedChild, setSelectedChild] = useState<any>(null);

// // //   // Form States
// // //   const [noOfDays, setNoOfDays] = useState<string>("");
// // //   const [dailyRate, setDailyRate] = useState<string>("150"); 
// // //   const [approved, setApproved] = useState<string>("");

// // //   // 1. Fetch children AND past records on mount
// // //   useEffect(() => {
// // //     setMounted(true);
// // //     fetchData();
// // //   }, []);

// // //   const fetchData = async () => {
// // //     setIsFetching(true);
// // //     try {
// // //       // Fetch Children for Dropdown
// // //       const childRes = await fetch('/api/compensation');
// // //       if (childRes.ok) {
// // //         setRegisteredChildren(await childRes.json());
// // //       }
      
// // //       // Fetch Past Records for Monthly Report
// // //       const recordsRes = await fetch('/api/compensation/records');
// // //       if (recordsRes.ok) {
// // //         setPastRecords(await recordsRes.json());
// // //       }
// // //     } catch (error) {
// // //       toast.error("Failed to load data from database");
// // //     } finally {
// // //       setIsFetching(false);
// // //     }
// // //   };

// // //   // Update selected child details when ID changes
// // //   useEffect(() => {
// // //     if (selectedChildId) {
// // //       const child = registeredChildren.find(c => c.id.toString() === selectedChildId);
// // //       setSelectedChild(child || null);
// // //     } else {
// // //       setSelectedChild(null);
// // //     }
// // //   }, [selectedChildId, registeredChildren]);

// // //   // Calculate Total
// // //   const totalAmount = (parseFloat(noOfDays) || 0) * (parseFloat(dailyRate) || 0);

// // //   const handleSubmit = async (e: React.FormEvent) => {
// // //     e.preventDefault();
// // //     if (!selectedChild) {
// // //       toast.error("Please select a child first");
// // //       return;
// // //     }
    
// // //     if (approved !== "yes") {
// // //       toast.error("You must approve the payment to submit");
// // //       return;
// // //     }

// // //     setLoading(true);

// // //     try {
// // //       const payload = {
// // //         childId: selectedChild.id,
// // //         noOfDays: parseFloat(noOfDays),
// // //         dailyRate: parseFloat(dailyRate),
// // //         totalAmount: totalAmount
// // //       };

// // //       const res = await fetch('/api/compensation', {
// // //         method: 'POST',
// // //         headers: { 'Content-Type': 'application/json' },
// // //         body: JSON.stringify(payload)
// // //       });

// // //       if (!res.ok) throw new Error("Failed to save record");

// // //       toast.success("Compensation calculated and saved to database!");
// // //       setIsSubmitted(true);
// // //       await fetchData(); // Refresh table data

// // //     } catch (error) {
// // //       toast.error("An error occurred while saving the payment.");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleReset = () => {
// // //     setSelectedChildId("");
// // //     setNoOfDays("");
// // //     setApproved("");
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
// // //           <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Payment Recorded!</h2>
// // //           <p className="text-slate-500 mb-6">
// // //             Total compensation of <span className="font-bold text-slate-800">₹{totalAmount.toFixed(2)}</span> has been securely saved for {selectedChild?.parentName}.
// // //           </p>
// // //           <div className="flex flex-col gap-3">
// // //             <Button onClick={handleReset} className="w-full">Calculate Another</Button>
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
      
// // //       <div className="max-w-4xl mx-auto">
// // //         <div className="mb-4 flex items-center">
// // //           <Button variant="ghost" onClick={() => router.back()} className="pl-0 text-slate-500">
// // //             <ArrowLeft className="w-5 h-5 mr-2" /> Back
// // //           </Button>
// // //         </div>

// // //         <div className="mb-8">
// // //           <h1 className="text-3xl font-extrabold text-slate-900">Compensation Calculator</h1>
// // //           <p className="mt-2 text-sm text-slate-500">Calculate and securely record the daily wage compensation for parents/caregivers.</p>
// // //         </div>

// // //         {isFetching ? (
// // //            <div className="flex flex-col items-center justify-center py-20">
// // //              <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
// // //              <p className="text-slate-500 font-medium">Loading records...</p>
// // //            </div>
// // //         ) : (
// // //           <>
// // //             <form onSubmit={handleSubmit} className="space-y-6">
              
// // //               {/* Section 1: Patient Selection */}
// // //               <Card className="border-0 shadow-sm">
// // //                 <CardContent className="p-6">
// // //                   <SectionTitle icon={User} title="Patient Selection" />
                  
// // //                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // //                     <div className="md:col-span-2">
// // //                       <Label>Search & Select Registered Child <span className="text-red-500">*</span></Label>
// // //                       <Select name="childSelect" value={selectedChildId} onValueChange={setSelectedChildId} required>
// // //                         <SelectTrigger><SelectValue placeholder="Select a patient..." /></SelectTrigger>
// // //                         <SelectContent>
// // //                           {registeredChildren.length === 0 ? (
// // //                             <SelectItem value="none">No active patients found</SelectItem>
// // //                           ) : (
// // //                             registeredChildren.map((child: any) => (
// // //                               <SelectItem key={child.id} value={child.id.toString()}>
// // //                                 {child.childName} (SAM: {child.samNumber})
// // //                               </SelectItem>
// // //                             ))
// // //                           )}
// // //                         </SelectContent>
// // //                       </Select>
// // //                     </div>

// // //                     <div>
// // //                       <Label>Child Name</Label>
// // //                       <Input readOnly value={selectedChild ? selectedChild.childName : ""} className="bg-slate-100 font-medium" placeholder="Auto-filled" />
// // //                     </div>
                    
// // //                     <div>
// // //                       <Label>Parent / Caregiver Name</Label>
// // //                       <Input readOnly value={selectedChild ? selectedChild.parentName : ""} className="bg-slate-100 font-medium" placeholder="Auto-filled" />
// // //                     </div>
// // //                   </div>
// // //                 </CardContent>
// // //               </Card>

// // //               {/* Section 2: Payment Calculation */}
// // //               <Card className="border-0 shadow-sm">
// // //                 <CardContent className="p-6">
// // //                   <SectionTitle icon={Calculator} title="Payment Details" />
                  
// // //                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
// // //                     <div>
// // //                       <Label className="flex items-center gap-2"><CalendarDays size={16}/> Number of Days Stayed <span className="text-red-500">*</span></Label>
// // //                       <Input 
// // //                         type="number" 
// // //                         min="1" 
// // //                         value={noOfDays} 
// // //                         onChange={(e) => setNoOfDays(e.target.value)} 
// // //                         placeholder="e.g., 14" 
// // //                         required 
// // //                       />
// // //                     </div>
                    
// // //                     <div>
// // //                       <Label className="flex items-center gap-2"><Banknote size={16}/> Average Payment / Daily Rate (₹) <span className="text-red-500">*</span></Label>
// // //                       <Input 
// // //                         type="number" 
// // //                         min="0" 
// // //                         value={dailyRate} 
// // //                         onChange={(e) => setDailyRate(e.target.value)} 
// // //                         placeholder="e.g., 150" 
// // //                         required 
// // //                       />
// // //                     </div>

// // //                     <div className="md:col-span-2 bg-indigo-50 border border-indigo-100 p-6 rounded-xl mt-2 flex flex-col sm:flex-row justify-between items-center gap-4">
// // //                       <div>
// // //                         <h3 className="text-indigo-900 font-semibold text-lg flex items-center gap-2">
// // //                           <Receipt size={20} /> Total Compensation Calculated
// // //                         </h3>
// // //                         <p className="text-indigo-700/80 text-sm mt-1">Formula: Days Stayed × Daily Rate</p>
// // //                       </div>
// // //                       <div className="text-3xl font-extrabold text-indigo-700 bg-white px-6 py-3 rounded-lg shadow-sm border border-indigo-100">
// // //                         ₹ {totalAmount.toFixed(2)}
// // //                       </div>
// // //                     </div>
// // //                   </div>
// // //                 </CardContent>
// // //               </Card>

// // //               {/* Section 3: Approval */}
// // //               <Card className="border-0 shadow-sm">
// // //                 <CardContent className="p-6">
// // //                   <SectionTitle icon={CheckCircle} title="Final Approval" />
                  
// // //                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // //                     <div className="md:col-span-2">
// // //                       <Label>Do you approve this payment for submission? <span className="text-red-500">*</span></Label>
// // //                       <Select name="approval" value={approved} onValueChange={setApproved} required>
// // //                         <SelectTrigger><SelectValue placeholder="Select Yes or No" /></SelectTrigger>
// // //                         <SelectContent>
// // //                           <SelectItem value="yes">Yes, I approve and confirm this payment</SelectItem>
// // //                           <SelectItem value="no">No, do not submit yet</SelectItem>
// // //                         </SelectContent>
// // //                       </Select>
// // //                     </div>
// // //                   </div>
// // //                 </CardContent>
// // //               </Card>

// // //               {/* Action Bar */}
// // //               <div className="flex justify-end gap-4 mt-8">
// // //                 <Button variant="outline" type="button" onClick={() => router.back()}>Cancel</Button>
// // //                 <Button type="submit" disabled={loading} className="min-w-40">
// // //                   {loading ? "Processing..." : "Submit Payment"}
// // //                 </Button>
// // //               </div>

// // //             </form>

// // //             {/* --- MONTHLY REPORT TABLE SECTION --- */}
// // //             <div className="mt-16 pt-8 border-t border-slate-200">
// // //               <div className="mb-6 flex items-center gap-3">
// // //                 <TableProperties className="text-indigo-600 h-6 w-6" />
// // //                 <h2 className="text-2xl font-bold text-slate-900">Monthly Compensation Report</h2>
// // //               </div>

// // //               <Card className="border-0 shadow-sm">
// // //                 <div className="overflow-x-auto">
// // //                   <table className="w-full text-sm text-left">
// // //                     <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-semibold">
// // //                       <tr>
// // //                         <th className="px-6 py-4">Payment Date</th>
// // //                         <th className="px-6 py-4">Child Name</th>
// // //                         <th className="px-6 py-4">Caregiver</th>
// // //                         <th className="px-6 py-4 text-center">Days Stayed</th>
// // //                         <th className="px-6 py-4 text-right">Total Amount (₹)</th>
// // //                       </tr>
// // //                     </thead>
// // //                     <tbody className="divide-y divide-slate-100 bg-white">
// // //                       {pastRecords.length > 0 ? (
// // //                         pastRecords.map((record) => (
// // //                           <tr key={record.id} className="hover:bg-slate-50/80 transition-colors">
// // //                             <td className="px-6 py-4 whitespace-nowrap text-slate-600 font-medium">
// // //                               {new Date(record.paymentDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
// // //                               <div className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider">{record.monthYear}</div>
// // //                             </td>
// // //                             <td className="px-6 py-4 font-medium text-slate-900">
// // //                               {record.childName}
// // //                             </td>
// // //                             <td className="px-6 py-4 text-slate-600">
// // //                               {record.parentName}
// // //                             </td>
// // //                             <td className="px-6 py-4 text-center text-slate-600 font-medium">
// // //                               {record.noOfDays}
// // //                             </td>
// // //                             <td className="px-6 py-4 text-right font-bold text-indigo-600">
// // //                               ₹{parseFloat(record.totalAmount).toFixed(2)}
// // //                             </td>
// // //                           </tr>
// // //                         ))
// // //                       ) : (
// // //                         <tr>
// // //                           <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
// // //                             No compensation payments have been recorded yet.
// // //                           </td>
// // //                         </tr>
// // //                       )}
// // //                     </tbody>
// // //                   </table>
// // //                 </div>
// // //               </Card>
// // //             </div>
// // //           </>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // "use client";

// // import React, { useState, useEffect } from "react";
// // import { useRouter } from "next/navigation";
// // import { 
// //   Calculator, Banknote, User, CheckCircle, ArrowLeft, CalendarDays, Receipt, TableProperties, Loader2, Printer
// // } from "lucide-react";
// // import toast, { Toaster } from "react-hot-toast";
// // import { clsx, type ClassValue } from "clsx";
// // import { twMerge } from "tailwind-merge";

// // // --- UI Components ---
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
// // export default function CompensationCalculationPage() {
// //   const router = useRouter();
// //   const [mounted, setMounted] = useState(false);
// //   const [loading, setLoading] = useState(false);
// //   const [isFetching, setIsFetching] = useState(true);
// //   const [isSubmitted, setIsSubmitted] = useState(false);

// //   // Data States
// //   const [registeredChildren, setRegisteredChildren] = useState<any[]>([]);
// //   const [pastRecords, setPastRecords] = useState<any[]>([]);
// //   const [filteredRecords, setFilteredRecords] = useState<any[]>([]);
// //   const [selectedChildId, setSelectedChildId] = useState("");
// //   const [selectedChild, setSelectedChild] = useState<any>(null);

// //   // Form States
// //   const [noOfDays, setNoOfDays] = useState<string>("");
// //   const [dailyRate, setDailyRate] = useState<string>("150"); 
// //   const [approved, setApproved] = useState<string>("");

// //   // Filters
// //   const [fromDate, setFromDate] = useState("");
// //   const [toDate, setToDate] = useState("");

// //   // Print State
// //   const [printRecord, setPrintRecord] = useState<any>(null);

// //   // 1. Fetch children AND past records on mount
// //   useEffect(() => {
// //     setMounted(true);
// //     fetchData();
// //   }, []);

// //   const fetchData = async () => {
// //     setIsFetching(true);
// //     try {
// //       // Fetch Children for Dropdown
// //       const childRes = await fetch('/api/compensation');
// //       if (childRes.ok) {
// //         setRegisteredChildren(await childRes.json());
// //       }
      
// //       // Fetch Past Records for Monthly Report
// //       const recordsRes = await fetch('/api/compensation/records');
// //       if (recordsRes.ok) {
// //         const data = await recordsRes.json();
// //         setPastRecords(data);
// //         setFilteredRecords(data);
// //       }
// //     } catch (error) {
// //       toast.error("Failed to load data from database");
// //     } finally {
// //       setIsFetching(false);
// //     }
// //   };

// //   // Update selected child details when ID changes
// //   useEffect(() => {
// //     if (selectedChildId) {
// //       const child = registeredChildren.find(c => c.id.toString() === selectedChildId);
// //       setSelectedChild(child || null);
// //     } else {
// //       setSelectedChild(null);
// //     }
// //   }, [selectedChildId, registeredChildren]);

// //   // Handle Date Filtering for Table
// //   useEffect(() => {
// //     let result = pastRecords;
// //     if (fromDate) {
// //       result = result.filter(r => new Date(r.paymentDate) >= new Date(fromDate));
// //     }
// //     if (toDate) {
// //       const to = new Date(toDate);
// //       to.setHours(23, 59, 59, 999);
// //       result = result.filter(r => new Date(r.paymentDate) <= to);
// //     }
// //     setFilteredRecords(result);
// //   }, [fromDate, toDate, pastRecords]);

// //   // Calculate Total
// //   const totalAmount = (parseFloat(noOfDays) || 0) * (parseFloat(dailyRate) || 0);

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     if (!selectedChild) return toast.error("Please select a child first");
// //     if (approved !== "yes") return toast.error("You must approve the payment to submit");

// //     setLoading(true);

// //     try {
// //       const payload = {
// //         childId: selectedChild.id,
// //         noOfDays: parseFloat(noOfDays),
// //         dailyRate: parseFloat(dailyRate),
// //         totalAmount: totalAmount
// //       };

// //       const res = await fetch('/api/compensation', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify(payload)
// //       });

// //       if (!res.ok) throw new Error("Failed to save record");

// //       // Setup the invoice data for the print screen before showing success
// //       setPrintRecord({
// //         paymentDate: new Date().toISOString(),
// //         childName: selectedChild.childName,
// //         parentName: selectedChild.parentName,
// //         samNumber: selectedChild.samNumber,
// //         noOfDays: parseFloat(noOfDays),
// //         dailyRate: parseFloat(dailyRate),
// //         totalAmount: totalAmount
// //       });

// //       toast.success("Compensation calculated and saved to database!");
// //       setIsSubmitted(true);
// //       await fetchData(); // Refresh table data

// //     } catch (error) {
// //       toast.error("An error occurred while saving the payment.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handlePrintInvoice = (record: any) => {
// //     setPrintRecord(record);
// //     // Delay slightly to ensure React sets the state before opening print dialog
// //     setTimeout(() => {
// //       window.print();
// //     }, 100);
// //   };

// //   const handleReset = () => {
// //     setSelectedChildId("");
// //     setNoOfDays("");
// //     setApproved("");
// //     setPrintRecord(null);
// //     setIsSubmitted(false);
// //   };

// //   if (!mounted) return null;

// //   return (
// //     <>
// //       {/* ========================================================================
// //         MAIN APPLICATION VIEW (Hidden during print)
// //         ========================================================================
// //       */}
// //       <div className="print:hidden min-h-screen bg-[#F8FAFC]">
// //         {isSubmitted ? (
// //           <div className="flex items-center justify-center p-4 min-h-screen">
// //             <Card className="max-w-md w-full p-8 text-center border-0 shadow-lg">
// //               <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
// //                 <CheckCircle size={40} strokeWidth={2.5} />
// //               </div>
// //               <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Payment Recorded!</h2>
// //               <p className="text-slate-500 mb-6">
// //                 Total compensation of <span className="font-bold text-slate-800">₹{totalAmount.toFixed(2)}</span> has been securely saved for {selectedChild?.parentName}.
// //               </p>
// //               <div className="flex flex-col gap-3">
// //                 <Button onClick={() => handlePrintInvoice(printRecord)} className="w-full bg-indigo-600 hover:bg-indigo-700">
// //                   <Printer className="w-4 h-4 mr-2" /> Print Invoice
// //                 </Button>
// //                 <Button variant="outline" onClick={handleReset} className="w-full">Calculate Another</Button>
// //                 <Button variant="ghost" onClick={() => router.push('/mtc-user/dashboard/home')} className="w-full">Back to Home</Button>
// //               </div>
// //             </Card>
// //           </div>
// //         ) : (
// //           <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
// //             <Toaster position="top-center" />
// //             <div className="mb-4 flex items-center">
// //               <Button variant="ghost" onClick={() => router.back()} className="pl-0 text-slate-500">
// //                 <ArrowLeft className="w-5 h-5 mr-2" /> Back
// //               </Button>
// //             </div>

// //             <div className="mb-8">
// //               <h1 className="text-3xl font-extrabold text-slate-900">Compensation Dashboard</h1>
// //               <p className="mt-2 text-sm text-slate-500">Manage, record, and print daily wage compensation for parents/caregivers.</p>
// //             </div>

// //             {isFetching ? (
// //                <div className="flex flex-col items-center justify-center py-20">
// //                  <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
// //                  <p className="text-slate-500 font-medium">Loading records...</p>
// //                </div>
// //             ) : (
// //               <>
// //                 {/* --- MONTHLY REPORT TABLE SECTION (MOVED TO TOP) --- */}
// //                 <div className="mb-12 pb-8 border-b border-slate-200">
// //                   <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
// //                     <div className="flex items-center gap-3">
// //                       <TableProperties className="text-indigo-600 h-6 w-6" />
// //                       <h2 className="text-2xl font-bold text-slate-900">Monthly Compensation Report</h2>
// //                     </div>

// //                     {/* Date Filters */}
// //                     <div className="flex items-center gap-2">
// //                       <Input 
// //                         type="date" 
// //                         value={fromDate} 
// //                         onChange={(e) => setFromDate(e.target.value)} 
// //                         className="w-auto h-9 text-sm"
// //                         title="From Date"
// //                       />
// //                       <span className="text-slate-400">to</span>
// //                       <Input 
// //                         type="date" 
// //                         value={toDate} 
// //                         onChange={(e) => setToDate(e.target.value)} 
// //                         className="w-auto h-9 text-sm"
// //                         title="To Date"
// //                       />
// //                       {(fromDate || toDate) && (
// //                         <Button variant="ghost" size="sm" onClick={() => {setFromDate(''); setToDate('');}} className="h-9 px-2 text-slate-500">
// //                           Clear
// //                         </Button>
// //                       )}
// //                     </div>
// //                   </div>

// //                   <Card className="border-0 shadow-sm overflow-hidden">
// //                     <div className="overflow-x-auto">
// //                       <table className="w-full text-sm text-left">
// //                         <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-semibold">
// //                           <tr>
// //                             <th className="px-6 py-4">Payment Date</th>
// //                             <th className="px-6 py-4">Child Name</th>
// //                             <th className="px-6 py-4">Caregiver</th>
// //                             <th className="px-6 py-4 text-center">Days Stayed</th>
// //                             <th className="px-6 py-4 text-right">Total Amount (₹)</th>
// //                             <th className="px-6 py-4 text-center">Action</th>
// //                           </tr>
// //                         </thead>
// //                         <tbody className="divide-y divide-slate-100 bg-white">
// //                           {filteredRecords.length > 0 ? (
// //                             filteredRecords.map((record) => (
// //                               <tr key={record.id} className="hover:bg-slate-50/80 transition-colors">
// //                                 <td className="px-6 py-4 whitespace-nowrap text-slate-600 font-medium">
// //                                   {new Date(record.paymentDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
// //                                 </td>
// //                                 <td className="px-6 py-4 font-medium text-slate-900">
// //                                   {record.childName}
// //                                 </td>
// //                                 <td className="px-6 py-4 text-slate-600">
// //                                   {record.parentName}
// //                                 </td>
// //                                 <td className="px-6 py-4 text-center text-slate-600 font-medium">
// //                                   {record.noOfDays}
// //                                 </td>
// //                                 <td className="px-6 py-4 text-right font-bold text-indigo-600">
// //                                   ₹{parseFloat(record.totalAmount).toFixed(2)}
// //                                 </td>
// //                                 <td className="px-6 py-4 text-center">
// //                                   <Button 
// //                                     variant="outline" 
// //                                     size="sm" 
// //                                     className="h-8 px-3 text-indigo-600 border-indigo-200 hover:bg-indigo-50"
// //                                     onClick={() => handlePrintInvoice(record)}
// //                                   >
// //                                     <Printer className="w-3.5 h-3.5 mr-1" /> Print
// //                                   </Button>
// //                                 </td>
// //                               </tr>
// //                             ))
// //                           ) : (
// //                             <tr>
// //                               <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
// //                                 No records found for the selected dates.
// //                               </td>
// //                             </tr>
// //                           )}
// //                         </tbody>
// //                       </table>
// //                     </div>
// //                   </Card>
// //                 </div>

// //                 {/* --- CALCULATOR FORM SECTION (MOVED TO BOTTOM) --- */}
// //                 <form onSubmit={handleSubmit} className="space-y-6">
                  
// //                   {/* Section 1: Patient Selection */}
// //                   <Card className="border-0 shadow-sm">
// //                     <CardContent className="p-6">
// //                       <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
// //                         <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600"><User size={20} strokeWidth={2.5} /></div>
// //                         <h2 className="text-lg font-bold text-slate-800">Add New Payment: Patient Selection</h2>
// //                       </div>
                      
// //                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                         <div className="md:col-span-2">
// //                           <Label>Search & Select Registered Child <span className="text-red-500">*</span></Label>
// //                           <Select name="childSelect" value={selectedChildId} onValueChange={setSelectedChildId} required>
// //                             <SelectTrigger><SelectValue placeholder="Select a patient..." /></SelectTrigger>
// //                             <SelectContent>
// //                               {registeredChildren.length === 0 ? (
// //                                 <SelectItem value="none">No active patients found</SelectItem>
// //                               ) : (
// //                                 registeredChildren.map((child: any) => (
// //                                   <SelectItem key={child.id} value={child.id.toString()}>
// //                                     {child.childName} (SAM: {child.samNumber})
// //                                   </SelectItem>
// //                                 ))
// //                               )}
// //                             </SelectContent>
// //                           </Select>
// //                         </div>

// //                         <div>
// //                           <Label>Child Name</Label>
// //                           <Input readOnly value={selectedChild ? selectedChild.childName : ""} className="bg-slate-100 font-medium" placeholder="Auto-filled" />
// //                         </div>
                        
// //                         <div>
// //                           <Label>Parent / Caregiver Name</Label>
// //                           <Input readOnly value={selectedChild ? selectedChild.parentName : ""} className="bg-slate-100 font-medium" placeholder="Auto-filled" />
// //                         </div>
// //                       </div>
// //                     </CardContent>
// //                   </Card>

// //                   {/* Section 2: Payment Calculation */}
// //                   <Card className="border-0 shadow-sm">
// //                     <CardContent className="p-6">
// //                       <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
// //                         <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600"><Calculator size={20} strokeWidth={2.5} /></div>
// //                         <h2 className="text-lg font-bold text-slate-800">Payment Details</h2>
// //                       </div>
                      
// //                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
// //                         <div>
// //                           <Label className="flex items-center gap-2"><CalendarDays size={16}/> Number of Days Stayed <span className="text-red-500">*</span></Label>
// //                           <Input 
// //                             type="number" 
// //                             min="1" 
// //                             value={noOfDays} 
// //                             onChange={(e) => setNoOfDays(e.target.value)} 
// //                             placeholder="e.g., 14" 
// //                             required 
// //                           />
// //                         </div>
                        
// //                         <div>
// //                           <Label className="flex items-center gap-2"><Banknote size={16}/> Average Payment / Daily Rate (₹) <span className="text-red-500">*</span></Label>
// //                           <Input 
// //                             type="number" 
// //                             min="0" 
// //                             value={dailyRate} 
// //                             onChange={(e) => setDailyRate(e.target.value)} 
// //                             placeholder="e.g., 150" 
// //                             required 
// //                           />
// //                         </div>

// //                         <div className="md:col-span-2 bg-indigo-50 border border-indigo-100 p-6 rounded-xl mt-2 flex flex-col sm:flex-row justify-between items-center gap-4">
// //                           <div>
// //                             <h3 className="text-indigo-900 font-semibold text-lg flex items-center gap-2">
// //                               <Receipt size={20} /> Total Compensation Calculated
// //                             </h3>
// //                             <p className="text-indigo-700/80 text-sm mt-1">Formula: Days Stayed × Daily Rate</p>
// //                           </div>
// //                           <div className="text-3xl font-extrabold text-indigo-700 bg-white px-6 py-3 rounded-lg shadow-sm border border-indigo-100">
// //                             ₹ {totalAmount.toFixed(2)}
// //                           </div>
// //                         </div>
// //                       </div>
// //                     </CardContent>
// //                   </Card>

// //                   {/* Section 3: Approval */}
// //                   <Card className="border-0 shadow-sm">
// //                     <CardContent className="p-6">
// //                       <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
// //                         <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600"><CheckCircle size={20} strokeWidth={2.5} /></div>
// //                         <h2 className="text-lg font-bold text-slate-800">Final Approval</h2>
// //                       </div>
                      
// //                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                         <div className="md:col-span-2">
// //                           <Label>Do you approve this payment for submission? <span className="text-red-500">*</span></Label>
// //                           <Select name="approval" value={approved} onValueChange={setApproved} required>
// //                             <SelectTrigger><SelectValue placeholder="Select Yes or No" /></SelectTrigger>
// //                             <SelectContent>
// //                               <SelectItem value="yes">Yes, I approve and confirm this payment</SelectItem>
// //                               <SelectItem value="no">No, do not submit yet</SelectItem>
// //                             </SelectContent>
// //                           </Select>
// //                         </div>
// //                       </div>
// //                     </CardContent>
// //                   </Card>

// //                   {/* Action Bar */}
// //                   <div className="flex justify-end gap-4 mt-8">
// //                     <Button variant="outline" type="button" onClick={() => router.back()}>Cancel</Button>
// //                     <Button type="submit" disabled={loading} className="min-w-40">
// //                       {loading ? "Processing..." : "Submit Payment"}
// //                     </Button>
// //                   </div>
// //                 </form>
// //               </>
// //             )}
// //           </div>
// //         )}
// //       </div>

// //       {/* ========================================================================
// //         PRINTABLE INVOICE VIEW (Hidden on screen, Visible ONLY when printing)
// //         ========================================================================
// //       */}
// //       {printRecord && (
// //         <div className="hidden print:block bg-white text-black p-8 absolute top-0 left-0 w-full z-[100] min-h-screen">
          
// //           {/* Header with Logos */}
// //           <div className="flex justify-between items-center border-b-4 border-slate-900 pb-6 mb-8">
// //             {/* Jharkhand Logo Placeholder */}
// //             <div className="w-32 h-32 flex items-center justify-center">
// //               <img 
// //                 src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Jharkhand_Rajakiya_Chihna.jpg/200px-Jharkhand_Rajakiya_Chihna.jpg" 
// //                 alt="Government of Jharkhand Logo" 
// //                 className="max-h-full max-w-full object-contain grayscale"
// //               />
// //             </div>

// //             <div className="text-center">
// //               <h1 className="text-3xl font-extrabold tracking-wide uppercase">Government of Jharkhand</h1>
// //               <h2 className="text-2xl font-bold mt-1">National Health Mission (NHM)</h2>
// //               <h3 className="text-xl font-medium mt-1 text-slate-700">Malnutrition Treatment Center (MTC)</h3>
// //               <div className="mt-4 inline-block border-2 border-slate-900 px-6 py-2">
// //                 <p className="font-bold text-xl tracking-widest uppercase">Wage Compensation Receipt</p>
// //               </div>
// //             </div>

// //             {/* NHM Logo Placeholder */}
// //             <div className="w-32 h-32 flex items-center justify-center">
// //               <img 
// //                 src="https://nhm.gov.in/images/logo.png" 
// //                 alt="NHM Logo" 
// //                 className="max-h-full max-w-full object-contain grayscale"
// //               />
// //             </div>
// //           </div>

// //           {/* Invoice Meta */}
// //           <div className="flex justify-between mb-10 text-lg">
// //             <div>
// //               <p><span className="font-bold">Date of Issue:</span> {new Date(printRecord.paymentDate).toLocaleDateString('en-GB')}</p>
// //               <p><span className="font-bold">MTC Center:</span> CHAIBASA (Default)</p>
// //             </div>
// //             <div className="text-right">
// //               <p><span className="font-bold">Receipt No:</span> MTC/COMP/{new Date(printRecord.paymentDate).getFullYear()}/{Math.floor(1000 + Math.random() * 9000)}</p>
// //             </div>
// //           </div>

// //           {/* Beneficiary Details */}
// //           <div className="border border-slate-400 p-6 mb-8 bg-slate-50">
// //             <h4 className="font-bold text-xl mb-4 border-b border-slate-300 pb-2">Beneficiary Details</h4>
// //             <div className="grid grid-cols-2 gap-4 text-lg">
// //               <p><span className="font-semibold w-40 inline-block">Caregiver Name:</span> {printRecord.parentName}</p>
// //               <p><span className="font-semibold w-40 inline-block">Child Name:</span> {printRecord.childName}</p>
// //               <p><span className="font-semibold w-40 inline-block">SAM Number:</span> {printRecord.samNumber || "N/A"}</p>
// //             </div>
// //           </div>

// //           {/* Calculation Table */}
// //           <table className="w-full border-collapse border border-slate-400 text-lg mb-12">
// //             <thead>
// //               <tr className="bg-slate-200">
// //                 <th className="border border-slate-400 px-6 py-4 text-left font-bold w-1/2">Description</th>
// //                 <th className="border border-slate-400 px-6 py-4 text-center font-bold">Calculation</th>
// //                 <th className="border border-slate-400 px-6 py-4 text-right font-bold w-1/4">Amount (INR)</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               <tr>
// //                 <td className="border border-slate-400 px-6 py-6 font-medium">
// //                   Wage Loss Compensation for stay at MTC facility
// //                 </td>
// //                 <td className="border border-slate-400 px-6 py-6 text-center text-slate-700">
// //                   {printRecord.noOfDays} Days <br/>×<br/> ₹{printRecord.dailyRate} / Day
// //                 </td>
// //                 <td className="border border-slate-400 px-6 py-6 text-right font-bold">
// //                   ₹{parseFloat(printRecord.totalAmount).toFixed(2)}
// //                 </td>
// //               </tr>
// //               <tr className="bg-slate-100">
// //                 <td colSpan={2} className="border border-slate-400 px-6 py-4 text-right font-bold text-xl">
// //                   TOTAL COMPENSATED AMOUNT
// //                 </td>
// //                 <td className="border border-slate-400 px-6 py-4 text-right font-extrabold text-2xl">
// //                   ₹{parseFloat(printRecord.totalAmount).toFixed(2)}
// //                 </td>
// //               </tr>
// //             </tbody>
// //           </table>

// //           {/* Footer & Signatures */}
// //           <div className="mt-24 flex justify-between px-8 text-lg">
// //             <div className="text-center">
// //               <p>___________________________</p>
// //               <p className="mt-2 font-bold">Signature of Caregiver</p>
// //               <p className="text-sm text-slate-500">(Name: {printRecord.parentName})</p>
// //             </div>
            
// //             <div className="text-center">
// //               <p>___________________________</p>
// //               <p className="mt-2 font-bold">Authorized Signatory</p>
// //               <p className="text-sm text-slate-500">MTC Medical Officer / In-Charge</p>
// //             </div>
// //           </div>

// //           <div className="mt-16 text-center text-sm text-slate-500 border-t border-slate-300 pt-4">
// //             * This is a system generated receipt and is valid for record keeping under the National Health Mission guidelines.
// //           </div>
// //         </div>
// //       )}

// //       {/* Global CSS to handle print margins and hide next.js body defaults if needed */}
// //       <style jsx global>{`
// //         @media print {
// //           body * {
// //             visibility: hidden;
// //           }
// //           .print\\:block, .print\\:block * {
// //             visibility: visible;
// //           }
// //           .print\\:block {
// //             position: absolute;
// //             left: 0;
// //             top: 0;
// //             width: 100%;
// //           }
// //           @page {
// //             margin: 10mm;
// //             size: A4 portrait;
// //           }
// //         }
// //       `}</style>
// //     </>
// //   );
// // }

// "use client";

// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { 
//   Calculator, Banknote, User, CheckCircle, ArrowLeft, CalendarDays, Receipt, TableProperties, Loader2, Printer
// } from "lucide-react";
// import toast, { Toaster } from "react-hot-toast";
// import { clsx, type ClassValue } from "clsx";
// import { twMerge } from "tailwind-merge";

// // --- UI Components ---
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
// export default function CompensationCalculationPage() {
//   const router = useRouter();
//   const [mounted, setMounted] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [isFetching, setIsFetching] = useState(true);
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   // MTC ID State
//   const [currentMtcId, setCurrentMtcId] = useState<string>("");

//   // Data States
//   const [registeredChildren, setRegisteredChildren] = useState<any[]>([]);
//   const [pastRecords, setPastRecords] = useState<any[]>([]);
//   const [filteredRecords, setFilteredRecords] = useState<any[]>([]);
//   const [selectedChildId, setSelectedChildId] = useState("");
//   const [selectedChild, setSelectedChild] = useState<any>(null);

//   // Form States
//   const [noOfDays, setNoOfDays] = useState<string>("");
//   const [dailyRate, setDailyRate] = useState<string>("150"); 
//   const [approved, setApproved] = useState<string>("");

//   // Filters
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");

//   // Print State
//   const [printRecord, setPrintRecord] = useState<any>(null);

//   // 1. Fetch children AND past records securely filtered by MTC on mount
//   useEffect(() => {
//     setMounted(true);

//     const fetchAllData = async () => {
//       setIsFetching(true);
//       try {
//         // Extract MTC ID from session securely
//         const sessionData = sessionStorage.getItem("mtc_user");
//         let mtcId = "";
        
//         if (sessionData) {
//           try {
//             const user = JSON.parse(sessionData);
//             if (user.mtcId) {
//               mtcId = user.mtcId.toString();
//               setCurrentMtcId(mtcId);
//             }
//           } catch (err) {
//             console.error("Session parse error");
//           }
//         }

//         const queryParams = mtcId ? `?mtcId=${mtcId}` : "";

//         // Fetch Children for Dropdown
//         const childRes = await fetch(`/api/compensation${queryParams}`);
//         if (childRes.ok) {
//           setRegisteredChildren(await childRes.json());
//         }
        
//         // Fetch Past Records for Monthly Report
//         const recordsRes = await fetch(`/api/compensation/records${queryParams}`);
//         if (recordsRes.ok) {
//           const data = await recordsRes.json();
//           setPastRecords(data);
//           setFilteredRecords(data);
//         } else if (recordsRes.status === 400) {
//           toast.error("Unauthorized: Session missing MTC ID.");
//         }
//       } catch (error) {
//         toast.error("Failed to load data from database");
//       } finally {
//         setIsFetching(false);
//       }
//     };

//     fetchAllData();
//   }, []);

//   // Update selected child details when ID changes
//   useEffect(() => {
//     if (selectedChildId) {
//       const child = registeredChildren.find(c => c.id.toString() === selectedChildId || c.registration_id?.toString() === selectedChildId);
//       setSelectedChild(child || null);
//     } else {
//       setSelectedChild(null);
//     }
//   }, [selectedChildId, registeredChildren]);

//   // Handle Date Filtering for Table
//   useEffect(() => {
//     let result = pastRecords;
//     if (fromDate) {
//       result = result.filter(r => new Date(r.paymentDate || r.created_at) >= new Date(fromDate));
//     }
//     if (toDate) {
//       const to = new Date(toDate);
//       to.setHours(23, 59, 59, 999);
//       result = result.filter(r => new Date(r.paymentDate || r.created_at) <= to);
//     }
//     setFilteredRecords(result);
//   }, [fromDate, toDate, pastRecords]);

//   // Calculate Total
//   const totalAmount = (parseFloat(noOfDays) || 0) * (parseFloat(dailyRate) || 0);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!selectedChild) return toast.error("Please select a child first");
//     if (approved !== "yes") return toast.error("You must approve the payment to submit");

//     setLoading(true);

//     try {
//       const payload = {
//         childId: selectedChild.id || selectedChild.registration_id,
//         mtcId: currentMtcId, // Send MTC ID with payload to secure the save
//         noOfDays: parseFloat(noOfDays),
//         dailyRate: parseFloat(dailyRate),
//         totalAmount: totalAmount
//       };

//       const res = await fetch('/api/compensation', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload)
//       });

//       if (!res.ok) throw new Error("Failed to save record");

//       // Setup the invoice data for the print screen before showing success
//       setPrintRecord({
//         paymentDate: new Date().toISOString(),
//         childName: selectedChild.childName || selectedChild.child_full_name,
//         parentName: selectedChild.parentName || selectedChild.guardian_name,
//         samNumber: selectedChild.samNumber || selectedChild.sam_no,
//         noOfDays: parseFloat(noOfDays),
//         dailyRate: parseFloat(dailyRate),
//         totalAmount: totalAmount
//       });

//       toast.success("Compensation calculated and saved to database!");
//       setIsSubmitted(true);
      
//       // Manually refresh records table after saving
//       const queryParams = currentMtcId ? `?mtcId=${currentMtcId}` : "";
//       const recordsRes = await fetch(`/api/compensation/records${queryParams}`);
//       if (recordsRes.ok) {
//         const data = await recordsRes.json();
//         setPastRecords(data);
//         setFilteredRecords(data);
//       }

//     } catch (error) {
//       toast.error("An error occurred while saving the payment.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePrintInvoice = (record: any) => {
//     setPrintRecord(record);
//     setTimeout(() => {
//       window.print();
//     }, 100);
//   };

//   const handleReset = () => {
//     setSelectedChildId("");
//     setNoOfDays("");
//     setApproved("");
//     setPrintRecord(null);
//     setIsSubmitted(false);
//   };

//   if (!mounted) return null;

//   return (
//     <>
//       {/* ========================================================================
//         MAIN APPLICATION VIEW (Hidden during print)
//         ========================================================================
//       */}
//       <div className="print:hidden min-h-screen bg-[#F8FAFC]">
//         {isSubmitted ? (
//           <div className="flex items-center justify-center p-4 min-h-screen">
//             <Card className="max-w-md w-full p-8 text-center border-0 shadow-lg">
//               <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
//                 <CheckCircle size={40} strokeWidth={2.5} />
//               </div>
//               <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Payment Recorded!</h2>
//               <p className="text-slate-500 mb-6">
//                 Total compensation of <span className="font-bold text-slate-800">₹{totalAmount.toFixed(2)}</span> has been securely saved.
//               </p>
//               <div className="flex flex-col gap-3">
//                 <Button onClick={() => handlePrintInvoice(printRecord)} className="w-full bg-indigo-600 hover:bg-indigo-700">
//                   <Printer className="w-4 h-4 mr-2" /> Print Invoice
//                 </Button>
//                 <Button variant="outline" onClick={handleReset} className="w-full">Calculate Another</Button>
//                 <Button variant="ghost" onClick={() => router.push('/mtc-user/dashboard/home')} className="w-full">Back to Home</Button>
//               </div>
//             </Card>
//           </div>
//         ) : (
//           <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
//             <Toaster position="top-center" />
//             <div className="mb-4 flex items-center">
//               <Button variant="ghost" onClick={() => router.back()} className="pl-0 text-slate-500">
//                 <ArrowLeft className="w-5 h-5 mr-2" /> Back
//               </Button>
//             </div>

//             <div className="mb-8">
//               <h1 className="text-3xl font-extrabold text-slate-900">Compensation Dashboard</h1>
//               <p className="mt-2 text-sm text-slate-500">Manage, record, and print daily wage compensation for parents/caregivers.</p>
//             </div>

//             {isFetching ? (
//                <div className="flex flex-col items-center justify-center py-20">
//                  <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
//                  <p className="text-slate-500 font-medium">Loading records...</p>
//                </div>
//             ) : (
//               <>
//                 {/* --- MONTHLY REPORT TABLE SECTION --- */}
//                 <div className="mb-12 pb-8 border-b border-slate-200">
//                   <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//                     <div className="flex items-center gap-3">
//                       <TableProperties className="text-indigo-600 h-6 w-6" />
//                       <h2 className="text-2xl font-bold text-slate-900">Monthly Compensation Report</h2>
//                     </div>

//                     <div className="flex items-center gap-2">
//                       <Input 
//                         type="date" 
//                         value={fromDate} 
//                         onChange={(e) => setFromDate(e.target.value)} 
//                         className="w-auto h-9 text-sm"
//                         title="From Date"
//                       />
//                       <span className="text-slate-400">to</span>
//                       <Input 
//                         type="date" 
//                         value={toDate} 
//                         onChange={(e) => setToDate(e.target.value)} 
//                         className="w-auto h-9 text-sm"
//                         title="To Date"
//                       />
//                       {(fromDate || toDate) && (
//                         <Button variant="ghost" size="sm" onClick={() => {setFromDate(''); setToDate('');}} className="h-9 px-2 text-slate-500">
//                           Clear
//                         </Button>
//                       )}
//                     </div>
//                   </div>

//                   <Card className="border-0 shadow-sm overflow-hidden">
//                     <div className="overflow-x-auto">
//                       <table className="w-full text-sm text-left">
//                         <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-semibold">
//                           <tr>
//                             <th className="px-6 py-4">Payment Date</th>
//                             <th className="px-6 py-4">Child Name</th>
//                             <th className="px-6 py-4">Caregiver</th>
//                             <th className="px-6 py-4 text-center">Days Stayed</th>
//                             <th className="px-6 py-4 text-right">Total Amount (₹)</th>
//                             <th className="px-6 py-4 text-center">Action</th>
//                           </tr>
//                         </thead>
//                         <tbody className="divide-y divide-slate-100 bg-white">
//                           {filteredRecords.length > 0 ? (
//                             filteredRecords.map((record) => (
//                               <tr key={record.id} className="hover:bg-slate-50/80 transition-colors">
//                                 <td className="px-6 py-4 whitespace-nowrap text-slate-600 font-medium">
//                                   {new Date(record.paymentDate || record.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
//                                 </td>
//                                 <td className="px-6 py-4 font-medium text-slate-900">
//                                   {record.childName || record.child_full_name || 'N/A'}
//                                 </td>
//                                 <td className="px-6 py-4 text-slate-600">
//                                   {record.parentName || record.guardian_name || 'N/A'}
//                                 </td>
//                                 <td className="px-6 py-4 text-center text-slate-600 font-medium">
//                                   {record.noOfDays || record.no_of_days}
//                                 </td>
//                                 <td className="px-6 py-4 text-right font-bold text-indigo-600">
//                                   ₹{parseFloat(record.totalAmount || record.total_amount).toFixed(2)}
//                                 </td>
//                                 <td className="px-6 py-4 text-center">
//                                   <Button 
//                                     variant="outline" 
//                                     size="sm" 
//                                     className="h-8 px-3 text-indigo-600 border-indigo-200 hover:bg-indigo-50"
//                                     onClick={() => handlePrintInvoice(record)}
//                                   >
//                                     <Printer className="w-3.5 h-3.5 mr-1" /> Print
//                                   </Button>
//                                 </td>
//                               </tr>
//                             ))
//                           ) : (
//                             <tr>
//                               <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
//                                 No records found for the selected dates.
//                               </td>
//                             </tr>
//                           )}
//                         </tbody>
//                       </table>
//                     </div>
//                   </Card>
//                 </div>

//                 {/* --- CALCULATOR FORM SECTION --- */}
//                 <form onSubmit={handleSubmit} className="space-y-6">
                  
//                   {/* Section 1: Patient Selection */}
//                   <Card className="border-0 shadow-sm">
//                     <CardContent className="p-6">
//                       <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
//                         <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600"><User size={20} strokeWidth={2.5} /></div>
//                         <h2 className="text-lg font-bold text-slate-800">Add New Payment: Patient Selection</h2>
//                       </div>
                      
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         <div className="md:col-span-2">
//                           <Label>Search & Select Registered Child <span className="text-red-500">*</span></Label>
//                           <Select name="childSelect" value={selectedChildId} onValueChange={setSelectedChildId} required>
//                             <SelectTrigger><SelectValue placeholder="Select a patient..." /></SelectTrigger>
//                             <SelectContent>
//                               {registeredChildren.length === 0 ? (
//                                 <SelectItem value="none">No active patients found</SelectItem>
//                               ) : (
//                                 registeredChildren.map((child: any) => (
//                                   <SelectItem key={child.id || child.registration_id} value={(child.id || child.registration_id).toString()}>
//                                     {child.childName || child.child_full_name} (SAM: {child.samNumber || child.sam_no})
//                                   </SelectItem>
//                                 ))
//                               )}
//                             </SelectContent>
//                           </Select>
//                         </div>

//                         <div>
//                           <Label>Child Name</Label>
//                           <Input readOnly value={selectedChild ? (selectedChild.childName || selectedChild.child_full_name) : ""} className="bg-slate-100 font-medium" placeholder="Auto-filled" />
//                         </div>
                        
//                         <div>
//                           <Label>Parent / Caregiver Name</Label>
//                           <Input readOnly value={selectedChild ? (selectedChild.parentName || selectedChild.guardian_name) : ""} className="bg-slate-100 font-medium" placeholder="Auto-filled" />
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>

//                   {/* Section 2: Payment Calculation */}
//                   <Card className="border-0 shadow-sm">
//                     <CardContent className="p-6">
//                       <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
//                         <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600"><Calculator size={20} strokeWidth={2.5} /></div>
//                         <h2 className="text-lg font-bold text-slate-800">Payment Details</h2>
//                       </div>
                      
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
//                         <div>
//                           <Label className="flex items-center gap-2"><CalendarDays size={16}/> Number of Days Stayed <span className="text-red-500">*</span></Label>
//                           <Input 
//                             type="number" 
//                             min="1" 
//                             value={noOfDays} 
//                             onChange={(e) => setNoOfDays(e.target.value)} 
//                             placeholder="e.g., 14" 
//                             required 
//                           />
//                         </div>
                        
//                         <div>
//                           <Label className="flex items-center gap-2"><Banknote size={16}/> Average Payment / Daily Rate (₹) <span className="text-red-500">*</span></Label>
//                           <Input 
//                             type="number" 
//                             min="0" 
//                             value={dailyRate} 
//                             onChange={(e) => setDailyRate(e.target.value)} 
//                             placeholder="e.g., 150" 
//                             required 
//                           />
//                         </div>

//                         <div className="md:col-span-2 bg-indigo-50 border border-indigo-100 p-6 rounded-xl mt-2 flex flex-col sm:flex-row justify-between items-center gap-4">
//                           <div>
//                             <h3 className="text-indigo-900 font-semibold text-lg flex items-center gap-2">
//                               <Receipt size={20} /> Total Compensation Calculated
//                             </h3>
//                             <p className="text-indigo-700/80 text-sm mt-1">Formula: Days Stayed × Daily Rate</p>
//                           </div>
//                           <div className="text-3xl font-extrabold text-indigo-700 bg-white px-6 py-3 rounded-lg shadow-sm border border-indigo-100">
//                             ₹ {totalAmount.toFixed(2)}
//                           </div>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>

//                   {/* Section 3: Approval */}
//                   <Card className="border-0 shadow-sm">
//                     <CardContent className="p-6">
//                       <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
//                         <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600"><CheckCircle size={20} strokeWidth={2.5} /></div>
//                         <h2 className="text-lg font-bold text-slate-800">Final Approval</h2>
//                       </div>
                      
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         <div className="md:col-span-2">
//                           <Label>Do you approve this payment for submission? <span className="text-red-500">*</span></Label>
//                           <Select name="approval" value={approved} onValueChange={setApproved} required>
//                             <SelectTrigger><SelectValue placeholder="Select Yes or No" /></SelectTrigger>
//                             <SelectContent>
//                               <SelectItem value="yes">Yes, I approve and confirm this payment</SelectItem>
//                               <SelectItem value="no">No, do not submit yet</SelectItem>
//                             </SelectContent>
//                           </Select>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>

//                   <div className="flex justify-end gap-4 mt-8">
//                     <Button variant="outline" type="button" onClick={() => router.back()}>Cancel</Button>
//                     <Button type="submit" disabled={loading} className="min-w-40">
//                       {loading ? "Processing..." : "Submit Payment"}
//                     </Button>
//                   </div>
//                 </form>
//               </>
//             )}
//           </div>
//         )}
//       </div>

//       {/* ========================================================================
//         PRINTABLE INVOICE VIEW
//         ========================================================================
//       */}
//       {printRecord && (
//         <div className="hidden print:block bg-white text-black p-8 absolute top-0 left-0 w-full z-[100] min-h-screen">
//           <div className="flex justify-between items-center border-b-4 border-slate-900 pb-6 mb-8">
//             <div className="w-32 h-32 flex items-center justify-center">
//               <img 
//                 src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Jharkhand_Rajakiya_Chihna.jpg/200px-Jharkhand_Rajakiya_Chihna.jpg" 
//                 alt="Government of Jharkhand Logo" 
//                 className="max-h-full max-w-full object-contain grayscale"
//               />
//             </div>
//             <div className="text-center">
//               <h1 className="text-3xl font-extrabold tracking-wide uppercase">Government of Jharkhand</h1>
//               <h2 className="text-2xl font-bold mt-1">National Health Mission (NHM)</h2>
//               <h3 className="text-xl font-medium mt-1 text-slate-700">Malnutrition Treatment Center (MTC)</h3>
//               <div className="mt-4 inline-block border-2 border-slate-900 px-6 py-2">
//                 <p className="font-bold text-xl tracking-widest uppercase">Wage Compensation Receipt</p>
//               </div>
//             </div>
//             <div className="w-32 h-32 flex items-center justify-center">
//               <img 
//                 src="https://nhm.gov.in/images/logo.png" 
//                 alt="NHM Logo" 
//                 className="max-h-full max-w-full object-contain grayscale"
//               />
//             </div>
//           </div>

//           <div className="flex justify-between mb-10 text-lg">
//             <div>
//               <p><span className="font-bold">Date of Issue:</span> {new Date(printRecord.paymentDate || printRecord.created_at).toLocaleDateString('en-GB')}</p>
//             </div>
//             <div className="text-right">
//               <p><span className="font-bold">Receipt No:</span> MTC/COMP/{new Date(printRecord.paymentDate || printRecord.created_at).getFullYear()}/{Math.floor(1000 + Math.random() * 9000)}</p>
//             </div>
//           </div>

//           <div className="border border-slate-400 p-6 mb-8 bg-slate-50">
//             <h4 className="font-bold text-xl mb-4 border-b border-slate-300 pb-2">Beneficiary Details</h4>
//             <div className="grid grid-cols-2 gap-4 text-lg">
//               <p><span className="font-semibold w-40 inline-block">Caregiver Name:</span> {printRecord.parentName || printRecord.guardian_name}</p>
//               <p><span className="font-semibold w-40 inline-block">Child Name:</span> {printRecord.childName || printRecord.child_full_name}</p>
//               <p><span className="font-semibold w-40 inline-block">SAM Number:</span> {printRecord.samNumber || printRecord.sam_no || "N/A"}</p>
//             </div>
//           </div>

//           <table className="w-full border-collapse border border-slate-400 text-lg mb-12">
//             <thead>
//               <tr className="bg-slate-200">
//                 <th className="border border-slate-400 px-6 py-4 text-left font-bold w-1/2">Description</th>
//                 <th className="border border-slate-400 px-6 py-4 text-center font-bold">Calculation</th>
//                 <th className="border border-slate-400 px-6 py-4 text-right font-bold w-1/4">Amount (INR)</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td className="border border-slate-400 px-6 py-6 font-medium">
//                   Wage Loss Compensation for stay at MTC facility
//                 </td>
//                 <td className="border border-slate-400 px-6 py-6 text-center text-slate-700">
//                   {printRecord.noOfDays || printRecord.no_of_days} Days <br/>×<br/> ₹{printRecord.dailyRate || printRecord.daily_rate} / Day
//                 </td>
//                 <td className="border border-slate-400 px-6 py-6 text-right font-bold">
//                   ₹{parseFloat(printRecord.totalAmount || printRecord.total_amount).toFixed(2)}
//                 </td>
//               </tr>
//               <tr className="bg-slate-100">
//                 <td colSpan={2} className="border border-slate-400 px-6 py-4 text-right font-bold text-xl">
//                   TOTAL COMPENSATED AMOUNT
//                 </td>
//                 <td className="border border-slate-400 px-6 py-4 text-right font-extrabold text-2xl">
//                   ₹{parseFloat(printRecord.totalAmount || printRecord.total_amount).toFixed(2)}
//                 </td>
//               </tr>
//             </tbody>
//           </table>

//           <div className="mt-24 flex justify-between px-8 text-lg">
//             <div className="text-center">
//               <p>___________________________</p>
//               <p className="mt-2 font-bold">Signature of Caregiver</p>
//               <p className="text-sm text-slate-500">(Name: {printRecord.parentName || printRecord.guardian_name})</p>
//             </div>
            
//             <div className="text-center">
//               <p>___________________________</p>
//               <p className="mt-2 font-bold">Authorized Signatory</p>
//               <p className="text-sm text-slate-500">MTC Medical Officer / In-Charge</p>
//             </div>
//           </div>

//           <div className="mt-16 text-center text-sm text-slate-500 border-t border-slate-300 pt-4">
//             * This is a system generated receipt and is valid for record keeping under the National Health Mission guidelines.
//           </div>
//         </div>
//       )}

//       <style jsx global>{`
//         @media print {
//           body * { visibility: hidden; }
//           .print\\:block, .print\\:block * { visibility: visible; }
//           .print\\:block { position: absolute; left: 0; top: 0; width: 100%; }
//           @page { margin: 10mm; size: A4 portrait; }
//         }
//       `}</style>
//     </>
//   );
// }

"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { 
  Calculator, Banknote, User, CheckCircle, ArrowLeft, CalendarDays, Receipt, TableProperties, Loader2, Printer
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// --- Types & Interfaces ---
interface Child {
  id: string | number;
  registration_id?: string | number;
  childName?: string;
  child_full_name?: string;
  samNumber?: string;
  sam_no?: string;
  parentName?: string;
  guardian_name?: string;
}

interface CompensationRecord {
  id: string | number;
  paymentDate?: string;
  created_at: string;
  childName?: string;
  child_full_name?: string;
  parentName?: string;
  guardian_name?: string;
  samNumber?: string;
  sam_no?: string;
  noOfDays?: number;
  no_of_days?: number;
  dailyRate?: number;
  daily_rate?: number;
  totalAmount?: number | string;
  total_amount?: number | string;
}

interface SelectComponentProps {
  name?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  required?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
}

interface ElementPropsWithChildren {
  children?: React.ReactNode;
  placeholder?: string;
  value?: string;
}

// --- UI Components ---
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

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
  href?: string;
  size?: 'default' | 'sm';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', href, size = 'default', ...props }, ref) => {
    const classes = cn(
      "inline-flex items-center justify-center rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]",
      variant === 'default' ? "bg-indigo-600 text-white shadow-md shadow-indigo-200 hover:bg-indigo-700 h-11 py-2 px-6" : "",
      variant === 'outline' ? "border border-slate-200 bg-white shadow-sm hover:bg-slate-50 hover:text-slate-900 h-11 py-2 px-6 text-slate-700" : "",
      variant === 'ghost' ? "hover:bg-slate-100 hover:text-slate-900 h-11 py-2 px-6 text-slate-600" : "",
      size === 'sm' ? "h-8 px-3 text-xs" : "",
      className
    );
    if (href) return <a href={href} className={classes} {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)} />;
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

const Select = ({ name, value, onValueChange, required, children, disabled }: SelectComponentProps) => {
  const [internalValue, setInternalValue] = useState(value || "");
  
  useEffect(() => {
    if (value !== undefined) setInternalValue(value);
  }, [value]);

  const options: {value: string, label: string}[] = [];
  let placeholder = "Select Option";
  
  React.Children.forEach(children, child => {
    if (child && React.isValidElement(child)) {
      const validChild = child as React.ReactElement<ElementPropsWithChildren>;
      const childType = validChild.type as unknown as { displayName?: string; name?: string };
      const componentName = childType?.displayName || childType?.name;

      if (componentName === 'SelectTrigger') {
        React.Children.forEach(validChild.props.children, triggerChild => {
          if (triggerChild && React.isValidElement(triggerChild)) {
            const validTriggerChild = triggerChild as React.ReactElement<ElementPropsWithChildren>;
            const triggerChildType = validTriggerChild.type as unknown as { displayName?: string; name?: string };
            const triggerComponentName = triggerChildType?.displayName || triggerChildType?.name;

            if (triggerComponentName === 'SelectValue') {
              placeholder = validTriggerChild.props.placeholder || "Select";
            }
          }
        });
      }
      
      if (componentName === 'SelectContent') {
        const contentChildren = Array.isArray(validChild.props.children) 
          ? validChild.props.children.flat() 
          : [validChild.props.children];
          
        React.Children.forEach(contentChildren, itemChild => {
          if (itemChild && React.isValidElement(itemChild)) {
            const validItemChild = itemChild as React.ReactElement<ElementPropsWithChildren>;
            const itemChildType = validItemChild.type as unknown as { displayName?: string; name?: string };
            const itemComponentName = itemChildType?.displayName || itemChildType?.name;

            if (itemComponentName === 'SelectItem') {
              options.push({ 
                value: validItemChild.props.value || "", 
                label: typeof validItemChild.props.children === 'string' ? validItemChild.props.children : "" 
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
export default function CompensationCalculationPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // MTC ID State
  const [currentMtcId, setCurrentMtcId] = useState<string>("");

  // Data States
  const [registeredChildren, setRegisteredChildren] = useState<Child[]>([]);
  const [pastRecords, setPastRecords] = useState<CompensationRecord[]>([]);
  const [filteredRecords, setFilteredRecords] = useState<CompensationRecord[]>([]);
  const [selectedChildId, setSelectedChildId] = useState("");
  const [selectedChild, setSelectedChild] = useState<Child | null>(null);

  // Form States
  const [noOfDays, setNoOfDays] = useState<string>( "");
  const [dailyRate, setDailyRate] = useState<string>("150"); 
  const [approved, setApproved] = useState<string>( "");

  // Filters
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // Print State
  const [printRecord, setPrintRecord] = useState<CompensationRecord | null>(null);

  // 1. Fetch children secure filtering by MTC on mount
  useEffect(() => {
    setMounted(true);

    const fetchAllData = async () => {
      setIsFetching(true);
      try {
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

        // Fetch Children for Dropdown
        const childRes = await fetch(`/api/compensation${queryParams}`);
        if (childRes.ok) {
          setRegisteredChildren(await childRes.json() as Child[]);
        }
        
        // Fetch Past Records for Monthly Report
        const recordsRes = await fetch(`/api/compensation/records${queryParams}`);
        if (recordsRes.ok) {
          const data = await recordsRes.json() as CompensationRecord[];
          setPastRecords(data);
          setFilteredRecords(data);
        } else if (recordsRes.status === 400) {
          toast.error("Unauthorized: Session missing MTC ID.");
        }
      } catch {
        toast.error("Failed to load data from database");
      } finally {
        setIsFetching(false);
      }
    };

    fetchAllData();
  }, []);

  // Update selected child details when ID changes
  useEffect(() => {
    if (selectedChildId) {
      const child = registeredChildren.find(c => c.id.toString() === selectedChildId || c.registration_id?.toString() === selectedChildId);
      setSelectedChild(child || null);
    } else {
      setSelectedChild(null);
    }
  }, [selectedChildId, registeredChildren]);

  // Handle Date Filtering for Table
  useEffect(() => {
    let result = pastRecords;
    if (fromDate) {
      result = result.filter(r => new Date(r.paymentDate || r.created_at) >= new Date(fromDate));
    }
    if (toDate) {
      const to = new Date(toDate);
      to.setHours(23, 59, 59, 999);
      result = result.filter(r => new Date(r.paymentDate || r.created_at) <= to);
    }
    setFilteredRecords(result);
  }, [fromDate, toDate, pastRecords]);

  // Calculate Total
  const totalAmount = (parseFloat(noOfDays) || 0) * (parseFloat(dailyRate) || 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedChild) return toast.error("Please select a child first");
    if (approved !== "yes") return toast.error("You must approve the payment to submit");

    setLoading(true);

    try {
      const payload = {
        childId: selectedChild.id || selectedChild.registration_id,
        mtcId: currentMtcId,
        noOfDays: parseFloat(noOfDays),
        dailyRate: parseFloat(dailyRate),
        totalAmount: totalAmount
      };

      const res = await fetch('/api/compensation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error("Failed to save record");

      setPrintRecord({
        created_at: new Date().toISOString(),
        paymentDate: new Date().toISOString(),
        id: `temp-${Date.now()}`,
        childName: selectedChild.childName || selectedChild.child_full_name,
        parentName: selectedChild.parentName || selectedChild.guardian_name,
        samNumber: selectedChild.samNumber || selectedChild.sam_no,
        noOfDays: parseFloat(noOfDays),
        dailyRate: parseFloat(dailyRate),
        totalAmount: totalAmount
      });

      toast.success("Compensation calculated and saved to database!");
      setIsSubmitted(true);
      
      const queryParams = currentMtcId ? `?mtcId=${currentMtcId}` : "";
      const recordsRes = await fetch(`/api/compensation/records${queryParams}`);
      if (recordsRes.ok) {
        const data = await recordsRes.json() as CompensationRecord[];
        setPastRecords(data);
        setFilteredRecords(data);
      }

    } catch {
      toast.error("An error occurred while saving the payment.");
    } finally {
      setLoading(false);
    }
  };

  const handlePrintInvoice = (record: CompensationRecord) => {
    setPrintRecord(record);
    setTimeout(() => {
      window.print();
    }, 100);
  };

  const handleReset = () => {
    setSelectedChildId("");
    setNoOfDays("");
    setApproved("");
    setPrintRecord(null);
    setIsSubmitted(false);
  };

  if (!mounted) return null;

  return (
    <>
      <div className="print:hidden min-h-screen bg-[#F8FAFC]">
        {isSubmitted ? (
          <div className="flex items-center justify-center p-4 min-h-screen">
            <Card className="max-w-md w-full p-8 text-center border-0 shadow-lg">
              <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={40} strokeWidth={2.5} />
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Payment Recorded!</h2>
              <p className="text-slate-500 mb-6">
                Total compensation of <span className="font-bold text-slate-800">₹{totalAmount.toFixed(2)}</span> has been securely saved.
              </p>
              <div className="flex flex-col gap-3">
                {printRecord && (
                  <Button onClick={() => handlePrintInvoice(printRecord)} className="w-full bg-indigo-600 hover:bg-indigo-700">
                    <Printer className="w-4 h-4 mr-2" /> Print Invoice
                  </Button>
                )}
                <Button variant="outline" onClick={handleReset} className="w-full">Calculate Another</Button>
                <Button variant="ghost" onClick={() => router.push('/mtc-user/dashboard/home')} className="w-full">Back to Home</Button>
              </div>
            </Card>
          </div>
        ) : (
          <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
            <Toaster position="top-center" />
            <div className="mb-4 flex items-center">
              <Button variant="ghost" onClick={() => router.back()} className="pl-0 text-slate-500">
                <ArrowLeft className="w-5 h-5 mr-2" /> Back
              </Button>
            </div>

            <div className="mb-8">
              <h1 className="text-3xl font-extrabold text-slate-900">Compensation Dashboard</h1>
              <p className="mt-2 text-sm text-slate-500">Manage, record, and print daily wage compensation for parents/caregivers.</p>
            </div>

            {isFetching ? (
               <div className="flex flex-col items-center justify-center py-20">
                 <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
                 <p className="text-slate-500 font-medium">Loading records...</p>
               </div>
            ) : (
              <>
                {/* --- MONTHLY REPORT TABLE SECTION --- */}
                <div className="mb-12 pb-8 border-b border-slate-200">
                  <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <TableProperties className="text-indigo-600 h-6 w-6" />
                      <h2 className="text-2xl font-bold text-slate-900">Monthly Compensation Report</h2>
                    </div>

                    <div className="flex items-center gap-2">
                      <Input 
                        type="date" 
                        value={fromDate} 
                        onChange={(e) => setFromDate(e.target.value)} 
                        className="w-auto h-9 text-sm"
                        title="From Date"
                      />
                      <span className="text-slate-400">to</span>
                      <Input 
                        type="date" 
                        value={toDate} 
                        onChange={(e) => setToDate(e.target.value)} 
                        className="w-auto h-9 text-sm"
                        title="To Date"
                      />
                      {(fromDate || toDate) && (
                        <Button variant="ghost" size="sm" onClick={() => {setFromDate(''); setToDate('');}} className="h-9 px-2 text-slate-500">
                          Clear
                        </Button>
                      )}
                    </div>
                  </div>

                  <Card className="border-0 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-semibold">
                          <tr>
                            <th className="px-6 py-4">Payment Date</th>
                            <th className="px-6 py-4">Child Name</th>
                            <th className="px-6 py-4">Caregiver</th>
                            <th className="px-6 py-4 text-center">Days Stayed</th>
                            <th className="px-6 py-4 text-right">Total Amount (₹)</th>
                            <th className="px-6 py-4 text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                          {filteredRecords.length > 0 ? (
                            filteredRecords.map((record) => (
                              <tr key={record.id} className="hover:bg-slate-50/80 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-slate-600 font-medium">
                                  {new Date(record.paymentDate || record.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                                </td>
                                <td className="px-6 py-4 font-medium text-slate-900">
                                  {record.childName || record.child_full_name || 'N/A'}
                                </td>
                                <td className="px-6 py-4 text-slate-600">
                                  {record.parentName || record.guardian_name || 'N/A'}
                                </td>
                                <td className="px-6 py-4 text-center text-slate-600 font-medium">
                                  {record.noOfDays || record.no_of_days}
                                </td>
                                <td className="px-6 py-4 text-right font-bold text-indigo-600">
                                  ₹{parseFloat((record.totalAmount || record.total_amount || 0).toString()).toFixed(2)}
                                </td>
                                <td className="px-6 py-4 text-center">
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="h-8 px-3 text-indigo-600 border-indigo-200 hover:bg-indigo-50"
                                    onClick={() => handlePrintInvoice(record)}
                                  >
                                    <Printer className="w-3.5 h-3.5 mr-1" /> Print
                                  </Button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                                No records found for the selected dates.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </Card>
                </div>

                {/* --- CALCULATOR FORM SECTION --- */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Section 1: Patient Selection */}
                  <Card className="border-0 shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                        <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600"><User size={20} strokeWidth={2.5} /></div>
                        <h2 className="text-lg font-bold text-slate-800">Add New Payment: Patient Selection</h2>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                          <Label>Search & Select Registered Child <span className="text-red-500">*</span></Label>
                          <Select name="childSelect" value={selectedChildId} onValueChange={setSelectedChildId} required>
                            <SelectTrigger><SelectValue placeholder="Select a patient..." /></SelectTrigger>
                            <SelectContent>
                              {registeredChildren.length === 0 ? (
                                <SelectItem value="none">No active patients found</SelectItem>
                              ) : (
                                registeredChildren.map((child) => (
                                  <SelectItem key={child.id || child.registration_id} value={(child.id || child.registration_id || "").toString()}>
                                    {child.childName || child.child_full_name} (SAM: {child.samNumber || child.sam_no})
                                  </SelectItem>
                                ))
                              )}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label>Child Name</Label>
                          <Input readOnly value={selectedChild ? (selectedChild.childName || selectedChild.child_full_name) : ""} className="bg-slate-100 font-medium" placeholder="Auto-filled" />
                        </div>
                        
                        <div>
                          <Label>Parent / Caregiver Name</Label>
                          <Input readOnly value={selectedChild ? (selectedChild.parentName || selectedChild.guardian_name) : ""} className="bg-slate-100 font-medium" placeholder="Auto-filled" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Section 2: Payment Calculation */}
                  <Card className="border-0 shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                        <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600"><Calculator size={20} strokeWidth={2.5} /></div>
                        <h2 className="text-lg font-bold text-slate-800">Payment Details</h2>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                        <div>
                          <Label className="flex items-center gap-2"><CalendarDays size={16}/> Number of Days Stayed <span className="text-red-500">*</span></Label>
                          <Input 
                            type="number" 
                            min="1" 
                            value={noOfDays} 
                            onChange={(e) => setNoOfDays(e.target.value)} 
                            placeholder="e.g., 14" 
                            required 
                          />
                        </div>
                        
                        <div>
                          <Label className="flex items-center gap-2"><Banknote size={16}/> Average Payment / Daily Rate (₹) <span className="text-red-500">*</span></Label>
                          <Input 
                            type="number" 
                            min="0" 
                            value={dailyRate} 
                            onChange={(e) => setDailyRate(e.target.value)} 
                            placeholder="e.g., 150" 
                            required 
                          />
                        </div>

                        <div className="md:col-span-2 bg-indigo-50 border border-indigo-100 p-6 rounded-xl mt-2 flex flex-col sm:flex-row justify-between items-center gap-4">
                          <div>
                            <h3 className="text-indigo-900 font-semibold text-lg flex items-center gap-2">
                              <Receipt size={20} /> Total Compensation Calculated
                            </h3>
                            <p className="text-indigo-700/80 text-sm mt-1">Formula: Days Stayed × Daily Rate</p>
                          </div>
                          <div className="text-3xl font-extrabold text-indigo-700 bg-white px-6 py-3 rounded-lg shadow-sm border border-indigo-100">
                            ₹ {totalAmount.toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Section 3: Approval */}
                  <Card className="border-0 shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                        <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600"><CheckCircle size={20} strokeWidth={2.5} /></div>
                        <h2 className="text-lg font-bold text-slate-800">Final Approval</h2>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                          <Label>Do you approve this payment for submission? <span className="text-red-500">*</span></Label>
                          <Select name="approval" value={approved} onValueChange={setApproved} required>
                            <SelectTrigger><SelectValue placeholder="Select Yes or No" /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="yes">Yes, I approve and confirm this payment</SelectItem>
                              <SelectItem value="no">No, do not submit yet</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex justify-end gap-4 mt-8">
                    <Button variant="outline" type="button" onClick={() => router.back()}>Cancel</Button>
                    <Button type="submit" disabled={loading} className="min-w-40">
                      {loading ? "Processing..." : "Submit Payment"}
                    </Button>
                  </div>
                </form>
              </>
            )}
          </div>
        )}
      </div>

      {/* ========================================================================
        PRINTABLE INVOICE VIEW
        ========================================================================
      */}
      {printRecord && (
        <div className="hidden print:block bg-white text-black p-8 absolute top-0 left-0 w-full z-100 min-h-screen">
          <div className="flex justify-between items-center border-b-4 border-slate-900 pb-6 mb-8">
            <div className="relative w-32 h-32 flex items-center justify-center">
              <Image 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Jharkhand_Rajakiya_Chihna.jpg/200px-Jharkhand_Rajakiya_Chihna.jpg" 
                alt="Government of Jharkhand Logo" 
                fill
                sizes="128px"
                className="object-contain grayscale"
              />
            </div>
            <div className="text-center">
              <h1 className="text-3xl font-extrabold tracking-wide uppercase">Government of Jharkhand</h1>
              <h2 className="text-2xl font-bold mt-1">National Health Mission (NHM)</h2>
              <h3 className="text-xl font-medium mt-1 text-slate-700">Malnutrition Treatment Center (MTC)</h3>
              <div className="mt-4 inline-block border-2 border-slate-900 px-6 py-2">
                <p className="font-bold text-xl tracking-widest uppercase">Wage Compensation Receipt</p>
              </div>
            </div>
            <div className="relative w-32 h-32 flex items-center justify-center">
              <Image 
                src="https://nhm.gov.in/images/logo.png" 
                alt="NHM Logo" 
                fill
                sizes="128px"
                className="object-contain grayscale"
              />
            </div>
          </div>

          <div className="flex justify-between mb-10 text-lg">
            <div>
              <p><span className="font-bold">Date of Issue:</span> {new Date(printRecord.paymentDate || printRecord.created_at).toLocaleDateString('en-GB')}</p>
            </div>
            <div className="text-right">
              <p><span className="font-bold">Receipt No:</span> MTC/COMP/{new Date(printRecord.paymentDate || printRecord.created_at).getFullYear()}/{Math.floor(1000 + Math.random() * 9000)}</p>
            </div>
          </div>

          <div className="border border-slate-400 p-6 mb-8 bg-slate-50">
            <h4 className="font-bold text-xl mb-4 border-b border-slate-300 pb-2">Beneficiary Details</h4>
            <div className="grid grid-cols-2 gap-4 text-lg">
              <p><span className="font-semibold w-40 inline-block">Caregiver Name:</span> {printRecord.parentName || printRecord.guardian_name}</p>
              <p><span className="font-semibold w-40 inline-block">Child Name:</span> {printRecord.childName || printRecord.child_full_name}</p>
              <p><span className="font-semibold w-40 inline-block">SAM Number:</span> {printRecord.samNumber || printRecord.sam_no || "N/A"}</p>
            </div>
          </div>

          <table className="w-full border-collapse border border-slate-400 text-lg mb-12">
            <thead>
              <tr className="bg-slate-200">
                <th className="border border-slate-400 px-6 py-4 text-left font-bold w-1/2">Description</th>
                <th className="border border-slate-400 px-6 py-4 text-center font-bold">Calculation</th>
                <th className="border border-slate-400 px-6 py-4 text-right font-bold w-1/4">Amount (INR)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-400 px-6 py-6 font-medium">
                  Wage Loss Compensation for stay at MTC facility
                </td>
                <td className="border border-slate-400 px-6 py-6 text-center text-slate-700">
                  {printRecord.noOfDays || printRecord.no_of_days} Days <br/>×<br/> ₹{printRecord.dailyRate || printRecord.daily_rate} / Day
                </td>
                <td className="border border-slate-400 px-6 py-6 text-right font-bold">
                  ₹{parseFloat((printRecord.totalAmount || printRecord.total_amount || 0).toString()).toFixed(2)}
                </td>
              </tr>
              <tr className="bg-slate-100">
                <td colSpan={2} className="border border-slate-400 px-6 py-4 text-right font-bold text-xl">
                  TOTAL COMPENSATED AMOUNT
                </td>
                <td className="border border-slate-400 px-6 py-4 text-right font-extrabold text-2xl">
                  ₹{parseFloat((printRecord.totalAmount || printRecord.total_amount || 0).toString()).toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>

          <div className="mt-24 flex justify-between px-8 text-lg">
            <div className="text-center">
              <p>___________________________</p>
              <p className="mt-2 font-bold">Signature of Caregiver</p>
              <p className="text-sm text-slate-500">(Name: {printRecord.parentName || printRecord.guardian_name})</p>
            </div>
            
            <div className="text-center">
              <p>___________________________</p>
              <p className="mt-2 font-bold">Authorized Signatory</p>
              <p className="text-sm text-slate-500">MTC Medical Officer / In-Charge</p>
            </div>
          </div>

          <div className="mt-16 text-center text-sm text-slate-500 border-t border-slate-300 pt-4">
            * This is a system generated receipt and is valid for record keeping under the National Health Mission guidelines.
          </div>
        </div>
      )}

      <style jsx global>{`
        @media print {
          body * { visibility: hidden; }
          .print\:block, .print\:block * { visibility: visible; }
          .print\:block { position: absolute; left: 0; top: 0; width: 100%; }
          @page { margin: 10mm; size: A4 portrait; }
        }
      `}</style>
    </>
  );
}