// // "use client";

// // import React, { useState } from "react";
// // import { motion, Variants } from "framer-motion";
// // import { 
// //   Mail, 
// //   Phone, 
// //   Send, 
// //   HelpCircle, 
// //   MessageSquare,
// //   Building2,
// //   RefreshCw,
// //   ShieldCheck
// // } from "lucide-react";

// // // ==========================================
// // // ANIMATION VARIANTS
// // // ==========================================
// // const fadeUp: Variants = {
// //   hidden: { opacity: 0, y: 20 },
// //   show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
// // };

// // const staggerContainer: Variants = {
// //   hidden: { opacity: 0 },
// //   show: { opacity: 1, transition: { staggerChildren: 0.1 } }
// // };

// // // ==========================================
// // // MAIN COMPONENT
// // // ==========================================
// // export default function ContactPage() {
// //   const [isSubmitting, setIsSubmitting] = useState(false);
// //   const [isSubmitted, setIsSubmitted] = useState(false);

// //   const handleSubmit = (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setIsSubmitting(true);
// //     // Simulate API call
// //     setTimeout(() => {
// //       setIsSubmitting(false);
// //       setIsSubmitted(true);
// //     }, 1500);
// //   };

// //   return (
// //     <main className="min-h-screen bg-slate-950 font-sans text-slate-200 relative overflow-hidden selection:bg-amber-400/30 pb-24">
      
// //       {/* BACKGROUND GLOWS */}
// //       <div className="absolute top-[0%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-indigo-900/10 blur-[150px] pointer-events-none"></div>
// //       <div className="absolute bottom-[10%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-amber-500/5 blur-[150px] pointer-events-none"></div>

// //       {/* PAGE HEADER */}
// //       <section className="relative pt-24 pb-12 z-10 border-b border-white/5">
// //         <div className="container mx-auto px-6 lg:px-10">
// //           <motion.div initial="hidden" animate="show" variants={fadeUp} className="max-w-3xl">
// //             <div className="flex items-center gap-3 mb-4">
// //               <div className="h-[2px] w-12 bg-amber-400"></div>
// //               <span className="text-amber-400 font-semibold tracking-wider uppercase text-sm">Support & Assistance</span>
// //             </div>
// //             <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight">
// //               Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Touch</span>
// //             </h1>
// //             <p className="text-lg text-indigo-100/60 max-w-2xl">
// //               Have queries related to the website or dashboard? Reach out to the MTC Help Desk Jharkhand. We are here to help.
// //             </p>
// //           </motion.div>
// //         </div>
// //       </section>

// //       {/* MAIN CONTENT AREA */}
// //       <section className="container mx-auto px-6 lg:px-10 py-16 relative z-10">
// //         <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
// //           {/* LEFT COLUMN: CONTACT INFO */}
// //           <motion.div 
// //             variants={staggerContainer}
// //             initial="hidden"
// //             animate="show"
// //             className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-24"
// //           >
// //             {/* Info Card 1 */}
// //             <motion.div variants={fadeUp} className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl relative overflow-hidden group">
// //               <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-3xl rounded-full transition-colors group-hover:bg-amber-500/20"></div>
// //               <HelpCircle className="w-10 h-10 text-amber-400 mb-6" />
// //               <h3 className="text-2xl font-bold text-white mb-2">MTC Help Desk</h3>
// //               <p className="text-indigo-100/60 text-sm mb-6">Jharkhand</p>
              
// //               <div className="space-y-6">
// //                 <div className="flex items-center gap-4">
// //                   <div className="w-12 h-12 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center flex-shrink-0">
// //                     <Mail className="w-5 h-5 text-indigo-300" />
// //                   </div>
// //                   <div>
// //                     <p className="text-xs text-indigo-200/50 uppercase tracking-widest font-bold mb-1">Email Us</p>
// //                     <a href="mailto:mtchelpdeskjhk@gmail.com" className="text-white hover:text-amber-400 transition-colors font-medium break-all">
// //                       mtchelpdeskjhk@gmail.com
// //                     </a>
// //                   </div>
// //                 </div>

// //                 <div className="flex items-center gap-4">
// //                   <div className="w-12 h-12 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center flex-shrink-0">
// //                     <Phone className="w-5 h-5 text-indigo-300" />
// //                   </div>
// //                   <div>
// //                     <p className="text-xs text-indigo-200/50 uppercase tracking-widest font-bold mb-1">Call Us</p>
// //                     <a href="tel:+917419808558" className="text-white hover:text-amber-400 transition-colors font-medium">
// //                       +91 7419808558
// //                     </a>
// //                   </div>
// //                 </div>
// //               </div>
// //             </motion.div>

// //             {/* Note Card */}
// //             <motion.div variants={fadeUp} className="bg-indigo-950/30 border border-indigo-500/20 p-6 rounded-3xl">
// //               <h4 className="text-white font-semibold flex items-center gap-2 mb-2">
// //                 <ShieldCheck className="w-5 h-5 text-amber-400" /> Authorized Personnel Only
// //               </h4>
// //               <p className="text-sm text-indigo-200/70 leading-relaxed">
// //                 This help desk is strictly for MTC staff, District Nodal Officers, and state health officials. For general medical emergencies, please dial 104.
// //               </p>
// //             </motion.div>
// //           </motion.div>

// //           {/* RIGHT COLUMN: CONTACT FORM */}
// //           <motion.div 
// //             initial={{ opacity: 0, x: 20 }}
// //             animate={{ opacity: 1, x: 0 }}
// //             transition={{ duration: 0.6, delay: 0.2 }}
// //             className="lg:col-span-8 bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 lg:p-10 shadow-2xl"
// //           >
// //             {isSubmitted ? (
// //               <div className="flex flex-col items-center justify-center h-full py-20 text-center">
// //                 <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6">
// //                   <ShieldCheck className="w-10 h-10 text-emerald-400" />
// //                 </div>
// //                 <h3 className="text-3xl font-bold text-white mb-4">Query Submitted Successfully</h3>
// //                 <p className="text-indigo-100/70 max-w-md mx-auto mb-8">
// //                   Thank you for reaching out to the MTC Help Desk. Our support team will review your query and respond to your registered email shortly.
// //                 </p>
// //                 <button 
// //                   onClick={() => setIsSubmitted(false)}
// //                   className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-6 py-3 rounded-xl transition-colors"
// //                 >
// //                   Submit Another Query
// //                 </button>
// //               </div>
// //             ) : (
// //               <>
// //                 <div className="flex items-center gap-3 mb-8">
// //                   <MessageSquare className="w-6 h-6 text-amber-400" />
// //                   <h2 className="text-2xl font-bold text-white">Submit Your Query</h2>
// //                 </div>

// //                 <form onSubmit={handleSubmit} className="space-y-6">
                  
// //                   {/* Subject */}
// //                   <div>
// //                     <label className="block text-sm font-medium text-indigo-100/80 mb-2">Subject <span className="text-rose-500">*</span></label>
// //                     <input 
// //                       type="text" 
// //                       required
// //                       placeholder="Brief overview of your issue..."
// //                       className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/50 transition-all placeholder:text-slate-600"
// //                     />
// //                   </div>

// //                   {/* Name & Email */}
// //                   <div className="grid sm:grid-cols-2 gap-6">
// //                     <div>
// //                       <label className="block text-sm font-medium text-indigo-100/80 mb-2">Your Name <span className="text-rose-500">*</span></label>
// //                       <input 
// //                         type="text" 
// //                         required
// //                         placeholder="John Doe"
// //                         className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/50 transition-all placeholder:text-slate-600"
// //                       />
// //                     </div>
// //                     <div>
// //                       <label className="block text-sm font-medium text-indigo-100/80 mb-2">Your Email <span className="text-rose-500">*</span></label>
// //                       <input 
// //                         type="email" 
// //                         required
// //                         placeholder="john@example.com"
// //                         className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/50 transition-all placeholder:text-slate-600"
// //                       />
// //                     </div>
// //                   </div>

// //                   {/* Organization & Contact No */}
// //                   <div className="grid sm:grid-cols-2 gap-6">
// //                     <div>
// //                       <label className="block text-sm font-medium text-indigo-100/80 mb-2 flex items-center gap-2">
// //                         <Building2 className="w-4 h-4 text-indigo-300" /> Organization <span className="text-rose-500">*</span>
// //                       </label>
// //                       <input 
// //                         type="text" 
// //                         required
// //                         placeholder="e.g. District Hospital Ranchi"
// //                         className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/50 transition-all placeholder:text-slate-600"
// //                       />
// //                     </div>
// //                     <div>
// //                       <label className="block text-sm font-medium text-indigo-100/80 mb-2">Contact No <span className="text-rose-500">*</span></label>
// //                       <input 
// //                         type="tel" 
// //                         required
// //                         placeholder="+91"
// //                         className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/50 transition-all placeholder:text-slate-600"
// //                       />
// //                     </div>
// //                   </div>

// //                   {/* Query Type Dropdown */}
// //                   <div>
// //                     <label className="block text-sm font-medium text-indigo-100/80 mb-2">Query Type <span className="text-rose-500">*</span></label>
// //                     <div className="relative">
// //                       <select 
// //                         required
// //                         defaultValue=""
// //                         className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/50 transition-all appearance-none cursor-pointer"
// //                       >
// //                         <option value="" disabled>Select Query Type</option>
// //                         <option value="programme" className="bg-slate-900 text-white">Programme Related</option>
// //                         <option value="dashboard" className="bg-slate-900 text-white">Dashboard Related</option>
// //                       </select>
// //                       {/* Custom dropdown arrow to bypass native ugly styling */}
// //                       <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
// //                         <svg className="w-5 h-5 text-indigo-200/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
// //                       </div>
// //                     </div>
// //                   </div>

// //                   {/* Message Body */}
// //                   <div>
// //                     <label className="block text-sm font-medium text-indigo-100/80 mb-2">Message</label>
// //                     <textarea 
// //                       rows={5}
// //                       placeholder="Please describe your issue in detail..."
// //                       className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/50 transition-all placeholder:text-slate-600 resize-none"
// //                     ></textarea>
// //                   </div>

// //                   {/* CAPTCHA SECTION */}
// //                   <div className="bg-slate-950/50 border border-white/5 p-4 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
// //                     <div className="flex-1">
// //                       <label className="block text-sm font-medium text-indigo-100/80 mb-2">Captcha Verification <span className="text-rose-500">*</span></label>
// //                       <input 
// //                         type="text" 
// //                         required
// //                         placeholder="Enter code shown..."
// //                         className="w-full sm:w-48 bg-slate-900 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-amber-400/50 transition-all placeholder:text-slate-600"
// //                       />
// //                     </div>
                    
// //                     {/* Mock Captcha Image Block */}
// //                     <div className="flex items-center gap-3 bg-white/5 p-2 rounded-lg border border-white/10">
// //                       <div className="bg-gradient-to-r from-slate-800 to-slate-700 px-6 py-2 rounded pointer-events-none select-none relative overflow-hidden">
// //                         <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
// //                         <span className="relative z-10 text-xl font-mono font-bold tracking-widest text-white/90 line-through decoration-slate-500">
// //                           kX9pQ2
// //                         </span>
// //                       </div>
// //                       <button type="button" className="p-2 text-indigo-300 hover:text-white transition-colors" title="Reload Captcha">
// //                         <RefreshCw className="w-5 h-5" />
// //                       </button>
// //                     </div>
// //                   </div>

// //                   {/* Submit Button */}
// //                   <div className="pt-4 border-t border-white/10">
// //                     <button 
// //                       type="submit"
// //                       disabled={isSubmitting}
// //                       className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-bold px-8 py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:pointer-events-none shadow-[0_0_20px_rgba(245,158,11,0.2)]"
// //                     >
// //                       {isSubmitting ? (
// //                         <>
// //                           <RefreshCw className="w-5 h-5 animate-spin" />
// //                           Submitting...
// //                         </>
// //                       ) : (
// //                         <>
// //                           <Send className="w-5 h-5" />
// //                           Submit Query
// //                         </>
// //                       )}
// //                     </button>
// //                   </div>

// //                 </form>
// //               </>
// //             )}
// //           </motion.div>

// //         </div>
// //       </section>
// //     </main>
// //   );
// // }

// "use client";

// import React, { useState } from "react";
// import { motion, Variants } from "framer-motion";
// import { 
//   Mail, 
//   Phone, 
//   Send, 
//   HelpCircle, 
//   MessageSquare,
//   Building2,
//   RefreshCw,
//   ShieldCheck
// } from "lucide-react";

// // ==========================================
// // ANIMATION VARIANTS
// // ==========================================
// const fadeUp: Variants = {
//   hidden: { opacity: 0, y: 20 },
//   show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
// };

// const staggerContainer: Variants = {
//   hidden: { opacity: 0 },
//   show: { opacity: 1, transition: { staggerChildren: 0.1 } }
// };

// // ==========================================
// // MAIN COMPONENT
// // ==========================================
// export default function ContactPage() {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     // Simulate API call
//     setTimeout(() => {
//       setIsSubmitting(false);
//       setIsSubmitted(true);
//     }, 1500);
//   };

//   return (
//     <main className="min-h-screen bg-sky-50 font-sans text-sky-900 relative overflow-hidden selection:bg-sky-200 pb-24">
      
//       {/* BACKGROUND GLOWS */}
//       <div className="absolute top-[0%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-sky-300/30 blur-[150px] pointer-events-none"></div>
//       <div className="absolute bottom-[10%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-white/60 blur-[150px] pointer-events-none"></div>

//       {/* PAGE HEADER */}
//       <section className="relative pt-24 pb-12 z-10 border-b border-sky-100">
//         <div className="container mx-auto px-6 lg:px-10">
//           <motion.div initial="hidden" animate="show" variants={fadeUp} className="max-w-3xl">
//             <div className="flex items-center gap-3 mb-4">
//               <div className="h-[2px] w-12 bg-sky-500"></div>
//               <span className="text-sky-600 font-bold tracking-wider uppercase text-sm">Support & Assistance</span>
//             </div>
//             <h1 className="text-4xl lg:text-5xl font-extrabold text-sky-900 mb-4 tracking-tight">
//               Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600">Touch</span>
//             </h1>
//             <p className="text-lg text-sky-700 max-w-2xl font-medium leading-relaxed">
//               Have queries related to the website or dashboard? Reach out to the MTC Help Desk Jharkhand. We are here to help.
//             </p>
//           </motion.div>
//         </div>
//       </section>

//       {/* MAIN CONTENT AREA */}
//       <section className="container mx-auto px-6 lg:px-10 py-16 relative z-10">
//         <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
//           {/* LEFT COLUMN: CONTACT INFO */}
//           <motion.div 
//             variants={staggerContainer}
//             initial="hidden"
//             animate="show"
//             className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-24"
//           >
//             {/* Info Card 1 */}
//             <motion.div variants={fadeUp} className="bg-white/80 backdrop-blur-xl border border-sky-100 p-8 rounded-3xl relative overflow-hidden group shadow-sm hover:shadow-md transition-shadow">
//               <div className="absolute top-0 right-0 w-32 h-32 bg-sky-200/50 blur-3xl rounded-full transition-colors group-hover:bg-sky-300/40"></div>
//               <HelpCircle className="w-10 h-10 text-sky-500 mb-6" />
//               <h3 className="text-2xl font-bold text-sky-950 mb-2">MTC Help Desk</h3>
//               <p className="text-sky-600 font-medium text-sm mb-6 uppercase tracking-wider">Jharkhand</p>
              
//               <div className="space-y-6">
//                 <div className="flex items-center gap-4">
//                   <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center flex-shrink-0">
//                     <Mail className="w-5 h-5 text-sky-600" />
//                   </div>
//                   <div>
//                     <p className="text-xs text-sky-500 uppercase tracking-widest font-bold mb-1">Email Us</p>
//                     <a href="mailto:mtchelpdeskjhk@gmail.com" className="text-sky-900 hover:text-blue-600 transition-colors font-semibold break-all">
//                       mtchelpdeskjhk@gmail.com
//                     </a>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-4">
//                   <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center flex-shrink-0">
//                     <Phone className="w-5 h-5 text-sky-600" />
//                   </div>
//                   <div>
//                     <p className="text-xs text-sky-500 uppercase tracking-widest font-bold mb-1">Call Us</p>
//                     <a href="tel:+917419808558" className="text-sky-900 hover:text-blue-600 transition-colors font-semibold">
//                       +91 7419808558
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>

//             {/* Note Card */}
//             <motion.div variants={fadeUp} className="bg-sky-100/80 border border-sky-200 p-6 rounded-3xl shadow-sm">
//               <h4 className="text-sky-900 font-bold flex items-center gap-2 mb-2">
//                 <ShieldCheck className="w-5 h-5 text-sky-600" /> Authorized Personnel Only
//               </h4>
//               <p className="text-sm text-sky-700 leading-relaxed font-medium">
//                 This help desk is strictly for MTC staff, District Nodal Officers, and state health officials. For general medical emergencies, please dial 104.
//               </p>
//             </motion.div>
//           </motion.div>

//           {/* RIGHT COLUMN: CONTACT FORM */}
//           <motion.div 
//             initial={{ opacity: 0, x: 20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//             className="lg:col-span-8 bg-white/90 backdrop-blur-xl border border-sky-100 rounded-[2rem] p-8 lg:p-10 shadow-xl"
//           >
//             {isSubmitted ? (
//               <div className="flex flex-col items-center justify-center h-full py-20 text-center">
//                 <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
//                   <ShieldCheck className="w-10 h-10 text-emerald-600" />
//                 </div>
//                 <h3 className="text-3xl font-bold text-sky-950 mb-4">Query Submitted Successfully</h3>
//                 <p className="text-sky-700 max-w-md mx-auto mb-8 font-medium">
//                   Thank you for reaching out to the MTC Help Desk. Our support team will review your query and respond to your registered email shortly.
//                 </p>
//                 <button 
//                   onClick={() => setIsSubmitted(false)}
//                   className="bg-sky-50 hover:bg-sky-100 border border-sky-200 text-sky-800 font-semibold px-6 py-3 rounded-xl transition-colors"
//                 >
//                   Submit Another Query
//                 </button>
//               </div>
//             ) : (
//               <>
//                 <div className="flex items-center gap-3 mb-8">
//                   <MessageSquare className="w-6 h-6 text-sky-500" />
//                   <h2 className="text-2xl font-bold text-sky-950">Submit Your Query</h2>
//                 </div>

//                 <form onSubmit={handleSubmit} className="space-y-6">
                  
//                   {/* Subject */}
//                   <div>
//                     <label className="block text-sm font-bold text-sky-800 mb-2">Subject <span className="text-rose-500">*</span></label>
//                     <input 
//                       type="text" 
//                       required
//                       placeholder="Brief overview of your issue..."
//                       className="w-full bg-white border border-sky-200 rounded-xl px-4 py-3.5 text-sky-900 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400/50 transition-all placeholder:text-sky-400/70 shadow-sm"
//                     />
//                   </div>

//                   {/* Name & Email */}
//                   <div className="grid sm:grid-cols-2 gap-6">
//                     <div>
//                       <label className="block text-sm font-bold text-sky-800 mb-2">Your Name <span className="text-rose-500">*</span></label>
//                       <input 
//                         type="text" 
//                         required
//                         placeholder="John Doe"
//                         className="w-full bg-white border border-sky-200 rounded-xl px-4 py-3.5 text-sky-900 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400/50 transition-all placeholder:text-sky-400/70 shadow-sm"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-bold text-sky-800 mb-2">Your Email <span className="text-rose-500">*</span></label>
//                       <input 
//                         type="email" 
//                         required
//                         placeholder="john@example.com"
//                         className="w-full bg-white border border-sky-200 rounded-xl px-4 py-3.5 text-sky-900 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400/50 transition-all placeholder:text-sky-400/70 shadow-sm"
//                       />
//                     </div>
//                   </div>

//                   {/* Organization & Contact No */}
//                   <div className="grid sm:grid-cols-2 gap-6">
//                     <div>
//                       <label className="block text-sm font-bold text-sky-800 mb-2 flex items-center gap-2">
//                         <Building2 className="w-4 h-4 text-sky-500" /> Organization <span className="text-rose-500">*</span>
//                       </label>
//                       <input 
//                         type="text" 
//                         required
//                         placeholder="e.g. District Hospital Ranchi"
//                         className="w-full bg-white border border-sky-200 rounded-xl px-4 py-3.5 text-sky-900 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400/50 transition-all placeholder:text-sky-400/70 shadow-sm"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-bold text-sky-800 mb-2">Contact No <span className="text-rose-500">*</span></label>
//                       <input 
//                         type="tel" 
//                         required
//                         placeholder="+91"
//                         className="w-full bg-white border border-sky-200 rounded-xl px-4 py-3.5 text-sky-900 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400/50 transition-all placeholder:text-sky-400/70 shadow-sm"
//                       />
//                     </div>
//                   </div>

//                   {/* Query Type Dropdown */}
//                   <div>
//                     <label className="block text-sm font-bold text-sky-800 mb-2">Query Type <span className="text-rose-500">*</span></label>
//                     <div className="relative">
//                       <select 
//                         required
//                         defaultValue=""
//                         className="w-full bg-white border border-sky-200 rounded-xl px-4 py-3.5 text-sky-900 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400/50 transition-all appearance-none cursor-pointer shadow-sm"
//                       >
//                         <option value="" disabled>Select Query Type</option>
//                         <option value="programme" className="bg-white text-sky-900">Programme Related</option>
//                         <option value="dashboard" className="bg-white text-sky-900">Dashboard Related</option>
//                       </select>
//                       {/* Custom dropdown arrow to bypass native ugly styling */}
//                       <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
//                         <svg className="w-5 h-5 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Message Body */}
//                   <div>
//                     <label className="block text-sm font-bold text-sky-800 mb-2">Message</label>
//                     <textarea 
//                       rows={5}
//                       placeholder="Please describe your issue in detail..."
//                       className="w-full bg-white border border-sky-200 rounded-xl px-4 py-3.5 text-sky-900 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400/50 transition-all placeholder:text-sky-400/70 resize-none shadow-sm"
//                     ></textarea>
//                   </div>

//                   {/* CAPTCHA SECTION */}
//                   <div className="bg-sky-50 border border-sky-100 p-4 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//                     <div className="flex-1">
//                       <label className="block text-sm font-bold text-sky-800 mb-2">Captcha Verification <span className="text-rose-500">*</span></label>
//                       <input 
//                         type="text" 
//                         required
//                         placeholder="Enter code shown..."
//                         className="w-full sm:w-48 bg-white border border-sky-200 rounded-lg px-4 py-2.5 text-sky-900 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400/50 transition-all placeholder:text-sky-400/70 shadow-sm"
//                       />
//                     </div>
                    
//                     {/* Mock Captcha Image Block */}
//                     <div className="flex items-center gap-3 bg-white p-2 rounded-lg border border-sky-100 shadow-sm">
//                       <div className="bg-gradient-to-r from-sky-100 to-sky-200 px-6 py-2 rounded pointer-events-none select-none relative overflow-hidden">
//                         <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
//                         <span className="relative z-10 text-xl font-mono font-extrabold tracking-widest text-sky-900 line-through decoration-sky-400">
//                           kX9pQ2
//                         </span>
//                       </div>
//                       <button type="button" className="p-2 text-sky-500 hover:text-sky-700 transition-colors" title="Reload Captcha">
//                         <RefreshCw className="w-5 h-5" />
//                       </button>
//                     </div>
//                   </div>

//                   {/* Submit Button */}
//                   <div className="pt-4 border-t border-sky-100">
//                     <button 
//                       type="submit"
//                       disabled={isSubmitting}
//                       className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold px-8 py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:pointer-events-none shadow-md hover:shadow-lg"
//                     >
//                       {isSubmitting ? (
//                         <>
//                           <RefreshCw className="w-5 h-5 animate-spin" />
//                           Submitting...
//                         </>
//                       ) : (
//                         <>
//                           <Send className="w-5 h-5" />
//                           Submit Query
//                         </>
//                       )}
//                     </button>
//                   </div>

//                 </form>
//               </>
//             )}
//           </motion.div>

//         </div>
//       </section>
//     </main>
//   );
// }

"use client";

import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import { 
  Mail, 
  Phone, 
  Send, 
  HelpCircle, 
  MessageSquare,
  Building2,
  RefreshCw,
  ShieldCheck
} from "lucide-react";

// ==========================================
// ANIMATION VARIANTS
// ==========================================
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-sky-50 font-sans text-sky-900 relative overflow-hidden selection:bg-sky-200 pb-24">
      
      {/* BACKGROUND GLOWS */}
      <div className="absolute top-[0%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-sky-300/30 blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-[10%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-white/60 blur-[150px] pointer-events-none"></div>

      {/* PAGE HEADER */}
      <section className="relative pt-24 pb-12 z-10 border-b border-sky-100">
        <div className="container mx-auto px-6 lg:px-10">
          <motion.div initial="hidden" animate="show" variants={fadeUp} className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[2px] w-12 bg-sky-500"></div>
              <span className="text-sky-600 font-bold tracking-wider uppercase text-sm">Support & Assistance</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-sky-900 mb-4 tracking-tight">
              Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600">Touch</span>
            </h1>
            <p className="text-lg text-sky-700 max-w-2xl font-medium leading-relaxed">
              Have queries related to the website or dashboard? Reach out to the MTC Help Desk Jharkhand. We are here to help.
            </p>
          </motion.div>
        </div>
      </section>

      {/* MAIN CONTENT AREA */}
      <section className="container mx-auto px-6 lg:px-10 py-16 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* LEFT COLUMN: CONTACT INFO */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-24"
          >
            {/* Info Card 1 */}
            <motion.div variants={fadeUp} className="bg-white/80 backdrop-blur-xl border border-sky-100 p-8 rounded-3xl relative overflow-hidden group shadow-sm hover:shadow-md transition-shadow">
              <div className="absolute top-0 right-0 w-32 h-32 bg-sky-200/50 blur-3xl rounded-full transition-colors group-hover:bg-sky-300/40"></div>
              <HelpCircle className="w-10 h-10 text-sky-500 mb-6" />
              <h3 className="text-2xl font-bold text-sky-950 mb-2">MTC Help Desk</h3>
              <p className="text-sky-600 font-medium text-sm mb-6 uppercase tracking-wider">Jharkhand</p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-sky-600" />
                  </div>
                  <div>
                    <p className="text-xs text-sky-500 uppercase tracking-widest font-bold mb-1">Email Us</p>
                    <a href="mailto:chjharkand2@gmail.com" className="text-sky-900 hover:text-blue-600 transition-colors font-semibold break-all">
                      chjharkand2@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-sky-600" />
                  </div>
                  <div>
                    <p className="text-xs text-sky-500 uppercase tracking-widest font-bold mb-1">Call Us</p>
                    <div className="flex flex-col">
                      <a href="tel:06512261000" className="text-sky-900 hover:text-blue-600 transition-colors font-semibold">
                        0651 2261000
                      </a>
                      <a href="tel:06512261856" className="text-sky-900 hover:text-blue-600 transition-colors font-semibold mt-1">
                        0651 2261856
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Note Card */}
            <motion.div variants={fadeUp} className="bg-sky-100/80 border border-sky-200 p-6 rounded-3xl shadow-sm">
              <h4 className="text-sky-900 font-bold flex items-center gap-2 mb-2">
                <ShieldCheck className="w-5 h-5 text-sky-600" /> Authorized Personnel Only
              </h4>
              <p className="text-sm text-sky-700 leading-relaxed font-medium">
                This help desk is strictly for MTC staff, District Nodal Officers, and state health officials. For general medical emergencies, please dial 104.
              </p>
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN: CONTACT FORM */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-8 bg-white/90 backdrop-blur-xl border border-sky-100 rounded-[2rem] p-8 lg:p-10 shadow-xl"
          >
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center h-full py-20 text-center">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                  <ShieldCheck className="w-10 h-10 text-emerald-600" />
                </div>
                <h3 className="text-3xl font-bold text-sky-950 mb-4">Query Submitted Successfully</h3>
                <p className="text-sky-700 max-w-md mx-auto mb-8 font-medium">
                  Thank you for reaching out to the MTC Help Desk. Our support team will review your query and respond to your registered email shortly.
                </p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="bg-sky-50 hover:bg-sky-100 border border-sky-200 text-sky-800 font-semibold px-6 py-3 rounded-xl transition-colors"
                >
                  Submit Another Query
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-8">
                  <MessageSquare className="w-6 h-6 text-sky-500" />
                  <h2 className="text-2xl font-bold text-sky-950">Submit Your Query</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Subject */}
                  <div>
                    <label className="block text-sm font-bold text-sky-800 mb-2">Subject <span className="text-rose-500">*</span></label>
                    <input 
                      type="text" 
                      required
                      placeholder="Brief overview of your issue..."
                      className="w-full bg-white border border-sky-200 rounded-xl px-4 py-3.5 text-sky-900 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400/50 transition-all placeholder:text-sky-400/70 shadow-sm"
                    />
                  </div>

                  {/* Name & Email */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-sky-800 mb-2">Your Name <span className="text-rose-500">*</span></label>
                      <input 
                        type="text" 
                        required
                        placeholder="John Doe"
                        className="w-full bg-white border border-sky-200 rounded-xl px-4 py-3.5 text-sky-900 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400/50 transition-all placeholder:text-sky-400/70 shadow-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-sky-800 mb-2">Your Email <span className="text-rose-500">*</span></label>
                      <input 
                        type="email" 
                        required
                        placeholder="john@example.com"
                        className="w-full bg-white border border-sky-200 rounded-xl px-4 py-3.5 text-sky-900 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400/50 transition-all placeholder:text-sky-400/70 shadow-sm"
                      />
                    </div>
                  </div>

                  {/* Organization & Contact No */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-sky-800 mb-2 flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-sky-500" /> Organization <span className="text-rose-500">*</span>
                      </label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. District Hospital Ranchi"
                        className="w-full bg-white border border-sky-200 rounded-xl px-4 py-3.5 text-sky-900 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400/50 transition-all placeholder:text-sky-400/70 shadow-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-sky-800 mb-2">Contact No <span className="text-rose-500">*</span></label>
                      <input 
                        type="tel" 
                        required
                        placeholder="+91"
                        className="w-full bg-white border border-sky-200 rounded-xl px-4 py-3.5 text-sky-900 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400/50 transition-all placeholder:text-sky-400/70 shadow-sm"
                      />
                    </div>
                  </div>

                  {/* Query Type Dropdown */}
                  <div>
                    <label className="block text-sm font-bold text-sky-800 mb-2">Query Type <span className="text-rose-500">*</span></label>
                    <div className="relative">
                      <select 
                        required
                        defaultValue=""
                        className="w-full bg-white border border-sky-200 rounded-xl px-4 py-3.5 text-sky-900 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400/50 transition-all appearance-none cursor-pointer shadow-sm"
                      >
                        <option value="" disabled>Select Query Type</option>
                        <option value="programme" className="bg-white text-sky-900">Programme Related</option>
                        <option value="dashboard" className="bg-white text-sky-900">Dashboard Related</option>
                      </select>
                      {/* Custom dropdown arrow to bypass native ugly styling */}
                      <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                  </div>

                  {/* Message Body */}
                  <div>
                    <label className="block text-sm font-bold text-sky-800 mb-2">Message</label>
                    <textarea 
                      rows={5}
                      placeholder="Please describe your issue in detail..."
                      className="w-full bg-white border border-sky-200 rounded-xl px-4 py-3.5 text-sky-900 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400/50 transition-all placeholder:text-sky-400/70 resize-none shadow-sm"
                    ></textarea>
                  </div>

                  {/* CAPTCHA SECTION */}
                  <div className="bg-sky-50 border border-sky-100 p-4 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex-1">
                      <label className="block text-sm font-bold text-sky-800 mb-2">Captcha Verification <span className="text-rose-500">*</span></label>
                      <input 
                        type="text" 
                        required
                        placeholder="Enter code shown..."
                        className="w-full sm:w-48 bg-white border border-sky-200 rounded-lg px-4 py-2.5 text-sky-900 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400/50 transition-all placeholder:text-sky-400/70 shadow-sm"
                      />
                    </div>
                    
                    {/* Mock Captcha Image Block */}
                    <div className="flex items-center gap-3 bg-white p-2 rounded-lg border border-sky-100 shadow-sm">
                      <div className="bg-gradient-to-r from-sky-100 to-sky-200 px-6 py-2 rounded pointer-events-none select-none relative overflow-hidden">
                        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
                        <span className="relative z-10 text-xl font-mono font-extrabold tracking-widest text-sky-900 line-through decoration-sky-400">
                          kX9pQ2
                        </span>
                      </div>
                      <button type="button" className="p-2 text-sky-500 hover:text-sky-700 transition-colors" title="Reload Captcha">
                        <RefreshCw className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4 border-t border-sky-100">
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold px-8 py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:pointer-events-none shadow-md hover:shadow-lg"
                    >
                      {isSubmitting ? (
                        <>
                          <RefreshCw className="w-5 h-5 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Submit Query
                        </>
                      )}
                    </button>
                  </div>

                </form>
              </>
            )}
          </motion.div>

        </div>
      </section>
    </main>
  );
}