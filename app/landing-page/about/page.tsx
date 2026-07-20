// // // // "use client";

// // // // import React from "react";
// // // // import { motion, Variants } from "framer-motion";
// // // // import { 
// // // //   ShieldCheck, 
// // // //   Users, 
// // // //   Activity, 
// // // //   ClipboardList, 
// // // //   Stethoscope, 
// // // //   TrendingUp, 
// // // //   ArrowRight,
// // // //   HandCoins
// // // // } from "lucide-react";

// // // // const fadeUp: Variants = {
// // // //   hidden: { opacity: 0, y: 30 },
// // // //   show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } }
// // // // };

// // // // export default function AboutPage() {
// // // //   return (
// // // //     <main className="min-h-screen bg-slate-950 font-sans text-slate-200">
      
// // // //       {/* HERO SECTION */}
// // // //       <section className="relative py-24 border-b border-white/5 overflow-hidden">
// // // //         <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/30 to-slate-950/50"></div>
// // // //         <div className="container relative z-10 mx-auto px-6 lg:px-10">
// // // //           <motion.div initial="hidden" animate="show" variants={fadeUp} className="max-w-3xl">
// // // //             <h1 className="text-5xl lg:text-6xl font-extrabold text-white mb-6">
// // // //               About <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">MTC Jharkhand</span>
// // // //             </h1>
// // // //             <p className="text-xl text-indigo-100/70 leading-relaxed">
// // // //               Establishing a facility-based network to address Severe Acute Malnutrition (SAM) through targeted therapeutic care and medical oversight.
// // // //             </p>
// // // //           </motion.div>
// // // //         </div>
// // // //       </section>

// // // //       {/* BACKGROUND CONTEXT */}
// // // //       <section className="py-20">
// // // //         <div className="container mx-auto px-6 lg:px-10">
// // // //           <div className="grid lg:grid-cols-2 gap-12 items-center">
// // // //             <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
// // // //               <h2 className="text-3xl font-bold text-white mb-6">The Challenge & The Mission</h2>
// // // //               <p className="text-indigo-100/70 mb-6 leading-relaxed">
// // // //                 As per the MoHFW CNNS 2016-17, 6.7% of children under 5 years in Jharkhand suffer from Severe Acute Malnutrition (SAM). SAM is a preventable cause of high morbidity and mortality in early childhood.
// // // //               </p>
// // // //               <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
// // // //                 <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
// // // //                   <ShieldCheck className="text-amber-400" /> Current Infrastructure
// // // //                 </h4>
// // // //                 <p className="text-sm text-indigo-100/60">
// // // //                   Under the National Health Mission (NHM), the Government of Jharkhand has sanctioned 103 dedicated Malnutrition Treatment Centres (MTCs), with 96 currently fully operational across CHCs and District Hospitals.
// // // //                 </p>
// // // //               </div>
// // // //             </motion.div>

// // // //             {/* QUICK STATS CARD */}
// // // //             <motion.div 
// // // //               initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
// // // //               className="bg-indigo-950/30 border border-indigo-500/20 p-8 rounded-[2rem]"
// // // //             >
// // // //               <div className="grid grid-cols-2 gap-6">
// // // //                 <div>
// // // //                   <p className="text-4xl font-black text-white">96</p>
// // // //                   <p className="text-indigo-200/60 text-sm mt-1">Operational Centers</p>
// // // //                 </div>
// // // //                 <div>
// // // //                   <p className="text-4xl font-black text-white">103</p>
// // // //                   <p className="text-indigo-200/60 text-sm mt-1">Total Sanctioned</p>
// // // //                 </div>
// // // //               </div>
// // // //             </motion.div>
// // // //           </div>
// // // //         </div>
// // // //       </section>

// // // //       {/* TREATMENT PROTOCOL FLOW */}
// // // //       <section className="py-20 bg-slate-900/50">
// // // //         <div className="container mx-auto px-6 lg:px-10">
// // // //           <motion.h2 initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="text-3xl font-bold text-white mb-12 text-center">The Treatment Pathway</motion.h2>
          
// // // //           <div className="grid md:grid-cols-3 gap-6">
// // // //             {[
// // // //               { title: "Admission", desc: "Anthropometry screening identifies SAM; child admitted based on medical complications and appetite test.", icon: Stethoscope },
// // // //               { title: "Therapeutic Care", desc: "Treatment as per MoHFW protocols, including daily growth tracking, feeding plans, and specialized micronutrients.", icon: Activity },
// // // //               { title: "Discharge", desc: "Criteria: 15% weight gain, stable health for 3 consecutive days (>5 gm/kg/day), and no illness.", icon: TrendingUp }
// // // //             ].map((step, idx) => (
// // // //               <motion.div 
// // // //                 key={idx}
// // // //                 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
// // // //                 className="bg-white/5 border border-white/10 p-8 rounded-3xl"
// // // //               >
// // // //                 <step.icon className="w-10 h-10 text-amber-400 mb-6" />
// // // //                 <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
// // // //                 <p className="text-indigo-100/60 text-sm leading-relaxed">{step.desc}</p>
// // // //               </motion.div>
// // // //             ))}
// // // //           </div>
// // // //         </div>
// // // //       </section>

// // // //       {/* SUPPORT & FOLLOW-UP */}
// // // //       <section className="py-20">
// // // //         <div className="container mx-auto px-6 lg:px-10">
// // // //           <div className="bg-gradient-to-br from-indigo-900/20 to-slate-900 border border-white/10 rounded-[2rem] p-8 lg:p-12">
// // // //             <div className="grid lg:grid-cols-2 gap-12 items-center">
// // // //               <div>
// // // //                 <h2 className="text-3xl font-bold text-white mb-6">Care Beyond Discharge</h2>
// // // //                 <p className="text-indigo-100/70 mb-6 leading-relaxed">
// // // //                   Treatment doesn't end at the center. We prioritize continuity of care through a structured follow-up system:
// // // //                 </p>
// // // //                 <ul className="space-y-4">
// // // //                   <li className="flex items-start gap-3 text-indigo-100/80">
// // // //                     <ClipboardList className="w-6 h-6 text-amber-400 flex-shrink-0" />
// // // //                     Four mandatory follow-ups at 15-day intervals post-discharge.
// // // //                   </li>
// // // //                   <li className="flex items-start gap-3 text-indigo-100/80">
// // // //                     <Users className="w-6 h-6 text-amber-400 flex-shrink-0" />
// // // //                     ASHA (Sahiya) workers are incentivized for both referral and ensuring follow-up compliance.
// // // //                   </li>
// // // //                 </ul>
// // // //               </div>

// // // //               {/* INCENTIVE BOX */}
// // // //               <div className="bg-slate-950/50 p-8 rounded-3xl border border-amber-500/20 shadow-2xl relative">
// // // //                 <HandCoins className="w-12 h-12 text-amber-400 mb-4" />
// // // //                 <h3 className="text-xl font-bold text-white mb-2">Wage Compensation</h3>
// // // //                 <p className="text-indigo-100/60 text-sm mb-6">
// // // //                   To ensure mothers can stay with their child throughout the treatment period without financial burden, we provide:
// // // //                 </p>
// // // //                 <div className="text-4xl font-black text-white">
// // // //                   ₹150<span className="text-lg font-normal text-indigo-100/60"> /day</span>
// // // //                 </div>
// // // //                 <p className="text-xs text-amber-400/80 mt-2 font-medium">Provided to mother as wage compensation</p>
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </section>

// // // //     </main>
// // // //   );
// // // // }

// // // "use client";

// // // import React from "react";
// // // import { motion, Variants } from "framer-motion";
// // // import { 
// // //   ShieldCheck, 
// // //   Users, 
// // //   Activity, 
// // //   ClipboardList, 
// // //   Stethoscope, 
// // //   TrendingUp, 
// // //   HandCoins
// // // } from "lucide-react";

// // // const fadeUp: Variants = {
// // //   hidden: { opacity: 0, y: 30 },
// // //   show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } }
// // // };

// // // export default function AboutPage() {
// // //   return (
// // //     <main className="min-h-screen bg-sky-50 font-sans text-sky-900 selection:bg-sky-200">
      
// // //       {/* HERO SECTION */}
// // //       <section className="relative py-24 border-b border-sky-100 overflow-hidden">
// // //         <div className="absolute inset-0 bg-gradient-to-br from-sky-100/50 to-white/50"></div>
// // //         <div className="container relative z-10 mx-auto px-6 lg:px-10">
// // //           <motion.div initial="hidden" animate="show" variants={fadeUp} className="max-w-3xl">
// // //             <h1 className="text-5xl lg:text-6xl font-extrabold text-sky-900 mb-6">
// // //               About <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600">MTC Jharkhand</span>
// // //             </h1>
// // //             <p className="text-xl text-sky-700 leading-relaxed font-medium">
// // //               Establishing a facility-based network to address Severe Acute Malnutrition (SAM) through targeted therapeutic care and medical oversight.
// // //             </p>
// // //           </motion.div>
// // //         </div>
// // //       </section>

// // //       {/* BACKGROUND CONTEXT */}
// // //       <section className="py-20 bg-white">
// // //         <div className="container mx-auto px-6 lg:px-10">
// // //           <div className="grid lg:grid-cols-2 gap-12 items-center">
// // //             <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
// // //               <h2 className="text-3xl font-bold text-sky-900 mb-6">The Challenge & The Mission</h2>
// // //               <p className="text-sky-700 mb-6 leading-relaxed">
// // //                 As per the MoHFW CNNS 2016-17, 6.7% of children under 5 years in Jharkhand suffer from Severe Acute Malnutrition (SAM). SAM is a preventable cause of high morbidity and mortality in early childhood.
// // //               </p>
// // //               <div className="bg-sky-50 p-6 rounded-3xl border border-sky-100 shadow-sm">
// // //                 <h4 className="text-lg font-bold text-sky-900 mb-2 flex items-center gap-2">
// // //                   <ShieldCheck className="text-sky-500" /> Current Infrastructure
// // //                 </h4>
// // //                 <p className="text-sm text-sky-700/90 leading-relaxed">
// // //                   Under the National Health Mission (NHM), the Government of Jharkhand has sanctioned 103 dedicated Malnutrition Treatment Centres (MTCs), with 96 currently fully operational across CHCs and District Hospitals.
// // //                 </p>
// // //               </div>
// // //             </motion.div>

// // //             {/* QUICK STATS CARD */}
// // //             <motion.div 
// // //               initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
// // //               className="bg-sky-100 border border-sky-200 p-8 rounded-[2rem] shadow-sm"
// // //             >
// // //               <div className="grid grid-cols-2 gap-6">
// // //                 <div>
// // //                   <p className="text-4xl font-black text-sky-900">96</p>
// // //                   <p className="text-sky-700 font-medium text-sm mt-1">Operational Centers</p>
// // //                 </div>
// // //                 <div>
// // //                   <p className="text-4xl font-black text-sky-900">103</p>
// // //                   <p className="text-sky-700 font-medium text-sm mt-1">Total Sanctioned</p>
// // //                 </div>
// // //               </div>
// // //             </motion.div>
// // //           </div>
// // //         </div>
// // //       </section>

// // //       {/* TREATMENT PROTOCOL FLOW */}
// // //       <section className="py-20 bg-sky-50/50">
// // //         <div className="container mx-auto px-6 lg:px-10">
// // //           <motion.h2 initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="text-3xl font-bold text-sky-900 mb-12 text-center">The Treatment Pathway</motion.h2>
          
// // //           <div className="grid md:grid-cols-3 gap-6">
// // //             {[
// // //               { title: "Admission", desc: "Anthropometry screening identifies SAM; child admitted based on medical complications and appetite test.", icon: Stethoscope },
// // //               { title: "Therapeutic Care", desc: "Treatment as per MoHFW protocols, including daily growth tracking, feeding plans, and specialized micronutrients.", icon: Activity },
// // //               { title: "Discharge", desc: "Criteria: 15% weight gain, stable health for 3 consecutive days (>5 gm/kg/day), and no illness.", icon: TrendingUp }
// // //             ].map((step, idx) => (
// // //               <motion.div 
// // //                 key={idx}
// // //                 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
// // //                 className="bg-white border border-sky-100 p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow"
// // //               >
// // //                 <step.icon className="w-10 h-10 text-sky-500 mb-6" />
// // //                 <h3 className="text-xl font-bold text-sky-900 mb-3">{step.title}</h3>
// // //                 <p className="text-sky-700 text-sm leading-relaxed">{step.desc}</p>
// // //               </motion.div>
// // //             ))}
// // //           </div>
// // //         </div>
// // //       </section>

// // //       {/* SUPPORT & FOLLOW-UP */}
// // //       <section className="py-20 bg-white">
// // //         <div className="container mx-auto px-6 lg:px-10">
// // //           <div className="bg-gradient-to-br from-white to-sky-50 border border-sky-100 rounded-[2rem] p-8 lg:p-12 shadow-sm">
// // //             <div className="grid lg:grid-cols-2 gap-12 items-center">
// // //               <div>
// // //                 <h2 className="text-3xl font-bold text-sky-900 mb-6">Care Beyond Discharge</h2>
// // //                 <p className="text-sky-700 mb-6 leading-relaxed">
// // //                   Treatment doesn't end at the center. We prioritize continuity of care through a structured follow-up system:
// // //                 </p>
// // //                 <ul className="space-y-4">
// // //                   <li className="flex items-start gap-3 text-sky-800">
// // //                     <ClipboardList className="w-6 h-6 text-sky-500 flex-shrink-0" />
// // //                     Four mandatory follow-ups at 15-day intervals post-discharge.
// // //                   </li>
// // //                   <li className="flex items-start gap-3 text-sky-800">
// // //                     <Users className="w-6 h-6 text-sky-500 flex-shrink-0" />
// // //                     ASHA (Sahiya) workers are incentivized for both referral and ensuring follow-up compliance.
// // //                   </li>
// // //                 </ul>
// // //               </div>

// // //               {/* INCENTIVE BOX */}
// // //               <div className="bg-sky-100/80 p-8 rounded-3xl border border-sky-200 shadow-md relative">
// // //                 <HandCoins className="w-12 h-12 text-sky-600 mb-4" />
// // //                 <h3 className="text-xl font-bold text-sky-900 mb-2">Wage Compensation</h3>
// // //                 <p className="text-sky-700 text-sm mb-6 leading-relaxed">
// // //                   To ensure mothers can stay with their child throughout the treatment period without financial burden, we provide:
// // //                 </p>
// // //                 <div className="text-4xl font-black text-sky-900">
// // //                   ₹130<span className="text-lg font-medium text-sky-600"> /day</span>
// // //                 </div>
// // //                 <p className="text-xs text-sky-600 mt-3 font-semibold uppercase tracking-wider">Provided to mother as wage compensation</p>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </section>

// // //     </main>
// // //   );
// // // }

// // "use client";

// // import React from "react";
// // import { motion, Variants } from "framer-motion";
// // import { 
// //   ShieldCheck, 
// //   Users, 
// //   Activity, 
// //   ClipboardList, 
// //   Stethoscope, 
// //   TrendingUp, 
// //   HandCoins
// // } from "lucide-react";

// // const fadeUp: Variants = {
// //   hidden: { opacity: 0, y: 30 },
// //   show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } }
// // };

// // export default function AboutPage() {
// //   return (
// //     <main className="min-h-screen bg-sky-50 font-sans text-sky-900 selection:bg-sky-200">
      
// //       {/* HERO SECTION */}
// //       <section className="relative py-24 border-b border-sky-100 overflow-hidden">
// //         <div className="absolute inset-0 bg-gradient-to-br from-sky-100/50 to-white/50"></div>
// //         <div className="container relative z-10 mx-auto px-6 lg:px-10">
// //           <motion.div initial="hidden" animate="show" variants={fadeUp} className="max-w-3xl">
// //             <h1 className="text-5xl lg:text-6xl font-extrabold text-sky-900 mb-6">
// //               About <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600">MTC Jharkhand</span>
// //             </h1>
// //             <p className="text-xl text-sky-700 leading-relaxed font-medium">
// //               Establishing a facility-based network to address medical complications related to SAM and MAM through targeted therapeutic care and medical oversight.
// //             </p>
// //           </motion.div>
// //         </div>
// //       </section>

// //       {/* BACKGROUND CONTEXT */}
// //       <section className="py-20 bg-white">
// //         <div className="container mx-auto px-6 lg:px-10">
// //           <div className="grid lg:grid-cols-2 gap-12 items-center">
// //             <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
// //               <h2 className="text-3xl font-bold text-sky-900 mb-6">Mission & Vision</h2>
// //               <p className="text-sky-700 mb-6 leading-relaxed">
// //                 As per the MoHFW CNNS 2016-17, 6.7% of children under 5 years in Jharkhand suffer from Severe Acute Malnutrition (SAM). SAM is a preventable cause of high morbidity and mortality in early childhood.
// //               </p>
// //               <div className="bg-sky-50 p-6 rounded-3xl border border-sky-100 shadow-sm">
// //                 <h4 className="text-lg font-bold text-sky-900 mb-2 flex items-center gap-2">
// //                   <ShieldCheck className="text-sky-500" /> Current Infrastructure
// //                 </h4>
// //                 <p className="text-sm text-sky-700/90 leading-relaxed">
// //                   Under the National Health Mission (NHM), the Government of Jharkhand has sanctioned dedicated Malnutrition Treatment Centres (MTCs) to ensure full operational coverage across CHCs and District Hospitals.
// //                 </p>
// //               </div>
// //             </motion.div>

// //             {/* QUICK STATS CARD */}
// //             <motion.div 
// //               initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
// //               className="bg-sky-100 border border-sky-200 p-8 rounded-[2rem] shadow-sm flex flex-col justify-center items-center text-center lg:h-48"
// //             >
// //               <div>
// //                 <p className="text-6xl font-black text-sky-900">101</p>
// //                 <p className="text-sky-700 font-semibold text-base mt-2">Operational Centers</p>
// //               </div>
// //             </motion.div>
// //           </div>
// //         </div>
// //       </section>

// //       {/* TREATMENT PROTOCOL FLOW */}
// //       <section className="py-20 bg-sky-50/50">
// //         <div className="container mx-auto px-6 lg:px-10">
// //           <motion.h2 initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="text-3xl font-bold text-sky-900 mb-12 text-center">The Treatment Pathway</motion.h2>
          
// //           <div className="grid md:grid-cols-3 gap-6">
// //             {[
// //               { title: "Admission", desc: "Anthropometry screening identifies SAM; child admitted based on medical complications and appetite test.", icon: Stethoscope },
// //               { title: "Therapeutic Care", desc: "Treatment as per MoHFW protocols, including daily growth tracking, feeding plans, and specialized micronutrients.", icon: Activity },
// //               { title: "Discharge", desc: "Criteria: 15% weight gain, stable health for 3 consecutive days (>5 gm/kg/day), and no illness.", icon: TrendingUp }
// //             ].map((step, idx) => (
// //               <motion.div 
// //                 key={idx}
// //                 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
// //                 className="bg-white border border-sky-100 p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow"
// //               >
// //                 <step.icon className="w-10 h-10 text-sky-500 mb-6" />
// //                 <h3 className="text-xl font-bold text-sky-900 mb-3">{step.title}</h3>
// //                 <p className="text-sky-700 text-sm leading-relaxed">{step.desc}</p>
// //               </motion.div>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* SUPPORT & FOLLOW-UP */}
// //       <section className="py-20 bg-white">
// //         <div className="container mx-auto px-6 lg:px-10">
// //           <div className="bg-gradient-to-br from-white to-sky-50 border border-sky-100 rounded-[2rem] p-8 lg:p-12 shadow-sm">
// //             <div className="grid lg:grid-cols-2 gap-12 items-center">
// //               <div>
// //                 <h2 className="text-3xl font-bold text-sky-900 mb-6">Care Beyond Discharge</h2>
// //                 <p className="text-sky-700 mb-6 leading-relaxed">
// //                   Treatment doesn't end at the center. We prioritize continuity of care through a structured follow-up system:
// //                 </p>
// //                 <ul className="space-y-4">
// //                   <li className="flex items-start gap-3 text-sky-800">
// //                     <ClipboardList className="w-6 h-6 text-sky-500 flex-shrink-0" />
// //                     Four mandatory follow-ups at 15-day intervals post-discharge.
// //                   </li>
// //                   <li className="flex items-start gap-3 text-sky-800">
// //                     <Users className="w-6 h-6 text-sky-500 flex-shrink-0" />
// //                     ASHA (Sahiya) workers are incentivized for both referral and ensuring follow-up compliance.
// //                   </li>
// //                 </ul>
// //               </div>

// //               {/* INCENTIVE BOX */}
// //               <div className="bg-sky-100/80 p-8 rounded-3xl border border-sky-200 shadow-md relative">
// //                 <HandCoins className="w-12 h-12 text-sky-600 mb-4" />
// //                 <h3 className="text-xl font-bold text-sky-900 mb-2">Wage Compensation</h3>
// //                 <p className="text-sky-700 text-sm mb-6 leading-relaxed">
// //                   To ensure mothers can stay with their child throughout the treatment period without financial burden, we provide:
// //                 </p>
// //                 <div className="text-4xl font-black text-sky-900">
// //                   ₹130<span className="text-lg font-medium text-sky-600"> /day</span>
// //                 </div>
// //                 <p className="text-xs text-sky-600 mt-3 font-semibold uppercase tracking-wider">Provided to mother as wage compensation</p>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //     </main>
// //   );
// // }

// "use client";

// import React from "react";
// import { motion, Variants } from "framer-motion";
// import { 
//   ShieldCheck, 
//   Users, 
//   Activity, 
//   ClipboardList, 
//   Stethoscope, 
//   TrendingUp, 
//   HandCoins,
//   CheckCircle2
// } from "lucide-react";

// const fadeUp: Variants = {
//   hidden: { opacity: 0, y: 30 },
//   show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } }
// };

// export default function AboutPage() {
//   return (
//     <main className="min-h-screen bg-sky-50 font-sans text-sky-900 selection:bg-sky-200">
      
//       {/* HERO SECTION */}
//       <section className="relative py-20 border-b border-sky-100 overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-br from-sky-100/50 to-white/50"></div>
//         <div className="container relative z-10 mx-auto px-6 lg:px-10">
//           <motion.div initial="hidden" animate="show" variants={fadeUp} className="max-w-4xl">
//             <h1 className="text-4xl lg:text-5xl font-extrabold text-sky-900 mb-4">
//               About <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600">MTC Jharkhand</span>
//             </h1>
            
//             <div className="bg-white/60 backdrop-blur-md p-8 rounded-3xl border border-sky-100 shadow-sm mt-8 space-y-6">
//               <h2 className="text-2xl font-bold text-sky-800">Every Child Deserves a Healthy Start</h2>
              
//               <p className="text-lg text-sky-700 leading-relaxed">
//                 The Malnutrition Treatment Centre (MTC) online MIS is a comprehensive digital platform developed by the National Health Mission, Government of Jharkhand to strengthen the management of children suffering from Severe Acute Malnutrition (SAM) and Moderate Acute Malnutrition (MAM) with medical complications.
//               </p>
              
//               <p className="text-sky-700 leading-relaxed">
//                 The portal serves as a centralized platform for monitoring MTC performance, tracking child admissions and treatment outcomes, strengthening supportive supervision and facilitating evidence-based decision making. By integrating real-time data, standardized reporting and digital monitoring tools, the portal aims to improve the quality of facility-based management of severe wasting across all districts of Jharkhand.
//               </p>
              
//               <p className="text-sky-700 leading-relaxed">
//                 The platform supports health functionaries, programme managers, district administrators and development partners in ensuring that every eligible child receives timely, quality and life-saving nutrition care.
//               </p>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* MISSION & VISION */}
//       <section className="py-20 bg-white">
//         <div className="container mx-auto px-6 lg:px-10">
//           <div className="grid lg:grid-cols-12 gap-12 items-start">
//             <motion.div 
//               className="lg:col-span-8 space-y-10"
//               initial="hidden" 
//               whileInView="show" 
//               viewport={{ once: true }} 
//               variants={fadeUp}
//             >
//               <div>
//                 <h2 className="text-3xl font-bold text-sky-900 mb-6">Mission & Vision</h2>
                
//                 <h3 className="text-xl font-bold text-sky-800 mb-3">Our Vision</h3>
//                 <p className="text-sky-700 leading-relaxed bg-sky-50/50 p-6 rounded-2xl border border-sky-100">
//                   To build a malnutrition free Jharkhand where every child has equitable access to quality nutrition services, survives, thrives and reaches their full potential through a strengthened, responsive and technology enabled health system.
//                 </p>
//               </div>

//               <div>
//                 <h3 className="text-xl font-bold text-sky-800 mb-4">Our Mission</h3>
//                 <ul className="space-y-4">
//                   {[
//                     "Strengthen the quality of care across all Malnutrition Treatment Centres in Jharkhand.",
//                     "Improve early identification, referral, treatment, and follow-up of children with Severe and Moderate Acute Malnutrition.",
//                     "Enable real-time monitoring and data-driven programme management through digital technologies.",
//                     "Enhance accountability through supportive supervision, performance monitoring and transparent reporting.",
//                     "Build the capacity of service providers to deliver standardized, evidence based nutrition care.",
//                     "Foster convergence among Health, Women & Child Development and community stakeholders to improve child nutrition outcomes."
//                   ].map((item, idx) => (
//                     <li key={idx} className="flex items-start gap-3">
//                       <CheckCircle2 className="w-6 h-6 text-sky-500 flex-shrink-0 mt-0.5" />
//                       <span className="text-sky-700 leading-relaxed">{item}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </motion.div>

//             {/* SIDEBAR: STATS & INFRASTRUCTURE */}
//             <div className="lg:col-span-4 space-y-6">
//               <motion.div 
//                 initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
//                 className="bg-sky-100 border border-sky-200 p-8 rounded-[2rem] shadow-sm flex flex-col justify-center items-center text-center"
//               >
//                 <p className="text-6xl font-black text-sky-900">101</p>
//                 <p className="text-sky-700 font-semibold text-lg mt-2">Operational Centers</p>
//               </motion.div>

//               <motion.div 
//                 initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
//                 className="bg-sky-50 p-6 rounded-[2rem] border border-sky-100 shadow-sm"
//               >
//                 <h4 className="text-lg font-bold text-sky-900 mb-3 flex items-center gap-2">
//                   <ShieldCheck className="text-sky-500 w-6 h-6" /> Infrastructure
//                 </h4>
//                 <p className="text-sm text-sky-700 leading-relaxed">
//                   Under the National Health Mission (NHM), the Government of Jharkhand has sanctioned dedicated Malnutrition Treatment Centres (MTCs) to ensure full operational coverage across CHCs and District Hospitals.
//                 </p>
//               </motion.div>
//             </div>
            
//           </div>
//         </div>
//       </section>

//       {/* TREATMENT PROTOCOL FLOW */}
//       <section className="py-20 bg-sky-50/50">
//         <div className="container mx-auto px-6 lg:px-10">
//           <motion.h2 initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="text-3xl font-bold text-sky-900 mb-12 text-center">The Treatment Pathway</motion.h2>
          
//           <div className="grid md:grid-cols-3 gap-6">
//             {[
//               { title: "Admission", desc: "Anthropometry screening identifies SAM; child admitted based on medical complications and appetite test.", icon: Stethoscope },
//               { title: "Therapeutic Care", desc: "Treatment as per MoHFW protocols, including daily growth tracking, feeding plans, and specialized micronutrients.", icon: Activity },
//               { title: "Discharge", desc: "Criteria: 15% weight gain, stable health for 3 consecutive days (>5 gm/kg/day), and no illness.", icon: TrendingUp }
//             ].map((step, idx) => (
//               <motion.div 
//                 key={idx}
//                 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
//                 className="bg-white border border-sky-100 p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow"
//               >
//                 <step.icon className="w-10 h-10 text-sky-500 mb-6" />
//                 <h3 className="text-xl font-bold text-sky-900 mb-3">{step.title}</h3>
//                 <p className="text-sky-700 text-sm leading-relaxed">{step.desc}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* SUPPORT & FOLLOW-UP */}
//       <section className="py-20 bg-white">
//         <div className="container mx-auto px-6 lg:px-10">
//           <div className="bg-gradient-to-br from-white to-sky-50 border border-sky-100 rounded-[2rem] p-8 lg:p-12 shadow-sm">
//             <div className="grid lg:grid-cols-2 gap-12 items-center">
//               <div>
//                 <h2 className="text-3xl font-bold text-sky-900 mb-6">Care Beyond Discharge</h2>
//                 <p className="text-sky-700 mb-6 leading-relaxed">
//                   Treatment doesn't end at the center. We prioritize continuity of care through a structured follow-up system:
//                 </p>
//                 <ul className="space-y-4">
//                   <li className="flex items-start gap-3 text-sky-800">
//                     <ClipboardList className="w-6 h-6 text-sky-500 flex-shrink-0" />
//                     Four mandatory follow-ups at 15-day intervals post-discharge.
//                   </li>
//                   <li className="flex items-start gap-3 text-sky-800">
//                     <Users className="w-6 h-6 text-sky-500 flex-shrink-0" />
//                     ASHA (Sahiya) workers are incentivized for both referral and ensuring follow-up compliance.
//                   </li>
//                 </ul>
//               </div>

//               {/* INCENTIVE BOX */}
//               <div className="bg-sky-100/80 p-8 rounded-3xl border border-sky-200 shadow-md relative">
//                 <HandCoins className="w-12 h-12 text-sky-600 mb-4" />
//                 <h3 className="text-xl font-bold text-sky-900 mb-2">Wage Compensation</h3>
//                 <p className="text-sky-700 text-sm mb-6 leading-relaxed">
//                   To ensure mothers can stay with their child throughout the treatment period without financial burden, we provide:
//                 </p>
//                 <div className="text-4xl font-black text-sky-900">
//                   ₹130<span className="text-lg font-medium text-sky-600"> /day</span>
//                 </div>
//                 <p className="text-xs text-sky-600 mt-3 font-semibold uppercase tracking-wider">Provided to mother as wage compensation</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//     </main>
//   );
// }

"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { 
  ShieldCheck, 
  Users, 
  Activity, 
  ClipboardList, 
  Stethoscope, 
  TrendingUp, 
  HandCoins,
  CheckCircle2
} from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } }
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-sky-50 font-sans text-sky-900 selection:bg-sky-200">
      
      {/* HERO SECTION */}
      <section className="relative py-20 border-b border-sky-100 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-100/50 to-white/50"></div>
        <div className="container relative z-10 mx-auto px-6 lg:px-10">
          <motion.div initial="hidden" animate="show" variants={fadeUp} className="max-w-4xl">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-sky-900 mb-4">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600">MTC Jharkhand</span>
            </h1>
            
            <div className="bg-white/60 backdrop-blur-md p-8 rounded-3xl border border-sky-100 shadow-sm mt-8 space-y-6">
              <h2 className="text-2xl font-bold text-sky-800">Every Child Deserves a Healthy Start</h2>
              
              <p className="text-lg text-sky-700 leading-relaxed">
                The Malnutrition Treatment Centre (MTC) online MIS is a comprehensive digital platform developed by the National Health Mission, Government of Jharkhand to strengthen the management of children suffering from Severe Acute Malnutrition (SAM) and Moderate Acute Malnutrition (MAM) with medical complications.
              </p>
              
              <p className="text-sky-700 leading-relaxed">
                The portal serves as a centralized platform for monitoring MTC performance, tracking child admissions and treatment outcomes, strengthening supportive supervision and facilitating evidence-based decision making. By integrating real-time data, standardized reporting and digital monitoring tools, the portal aims to improve the quality of facility-based management of severe wasting across all districts of Jharkhand.
              </p>
              
              <p className="text-sky-700 leading-relaxed">
                The platform supports health functionaries, programme managers, district administrators and development partners in ensuring that every eligible child receives timely, quality and life-saving nutrition care.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <motion.div 
              className="lg:col-span-8 space-y-10"
              initial="hidden" 
              whileInView="show" 
              viewport={{ once: true }} 
              variants={fadeUp}
            >
              <div>
                <h2 className="text-3xl font-bold text-sky-900 mb-6">Mission & Vision</h2>
                
                <h3 className="text-xl font-bold text-sky-800 mb-3">Our Vision</h3>
                <p className="text-sky-700 leading-relaxed bg-sky-50/50 p-6 rounded-2xl border border-sky-100">
                  To build a malnutrition free Jharkhand where every child has equitable access to quality nutrition services, survives, thrives and reaches their full potential through a strengthened, responsive and technology enabled health system.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-sky-800 mb-4">Our Mission</h3>
                <ul className="space-y-4">
                  {[
                    "Strengthen the quality of care across all Malnutrition Treatment Centres in Jharkhand.",
                    "Improve early identification, referral, treatment, and follow-up of children with Severe and Moderate Acute Malnutrition.",
                    "Enable real-time monitoring and data-driven programme management through digital technologies.",
                    "Enhance accountability through supportive supervision, performance monitoring and transparent reporting.",
                    "Build the capacity of service providers to deliver standardized, evidence based nutrition care.",
                    "Foster convergence among Health, Women & Child Development and community stakeholders to improve child nutrition outcomes."
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-sky-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sky-700 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* SIDEBAR: STATS & INFRASTRUCTURE */}
            <div className="lg:col-span-4 space-y-6">
              <motion.div 
                initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                className="bg-sky-100 border border-sky-200 p-8 rounded-[2rem] shadow-sm flex flex-col justify-center items-center text-center"
              >
                <p className="text-6xl font-black text-sky-900">101</p>
                <p className="text-sky-700 font-semibold text-lg mt-2">Operational Centers</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                className="bg-sky-50 p-6 rounded-[2rem] border border-sky-100 shadow-sm"
              >
                <h4 className="text-lg font-bold text-sky-900 mb-3 flex items-center gap-2">
                  <ShieldCheck className="text-sky-500 w-6 h-6" /> Infrastructure
                </h4>
                <p className="text-sm text-sky-700 leading-relaxed">
                  Under the National Health Mission (NHM), the Government of Jharkhand has sanctioned dedicated Malnutrition Treatment Centres (MTCs) to ensure full operational coverage across CHCs and District Hospitals.
                </p>
              </motion.div>
            </div>
            
          </div>
        </div>
      </section>

      {/* TREATMENT PROTOCOL FLOW */}
      <section className="py-20 bg-sky-50/50">
        <div className="container mx-auto px-6 lg:px-10">
          <motion.h2 initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="text-3xl font-bold text-sky-900 mb-12 text-center">The Treatment Pathway</motion.h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Admission", desc: "Anthropometry screening identifies SAM; child admitted based on medical complications and appetite test.", icon: Stethoscope },
              { title: "Therapeutic Care", desc: "Treatment as per MoHFW protocols, including daily growth tracking, feeding plans, and specialized micronutrients.", icon: Activity },
              { title: "Discharge", desc: "Criteria: 15% weight gain, stable health for 3 consecutive days (>5 gm/kg/day), and no illness.", icon: TrendingUp }
            ].map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="bg-white border border-sky-100 p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow"
              >
                <step.icon className="w-10 h-10 text-sky-500 mb-6" />
                <h3 className="text-xl font-bold text-sky-900 mb-3">{step.title}</h3>
                <p className="text-sky-700 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SUPPORT & FOLLOW-UP */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-10">
          <div className="bg-gradient-to-br from-white to-sky-50 border border-sky-100 rounded-[2rem] p-8 lg:p-12 shadow-sm">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-sky-900 mb-6">Care Beyond Discharge</h2>
                <p className="text-sky-700 mb-6 leading-relaxed">
                  Treatment doesn&apos;t end at the center. We prioritize continuity of care through a structured follow-up system:
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3 text-sky-800">
                    <ClipboardList className="w-6 h-6 text-sky-500 flex-shrink-0" />
                    Four mandatory follow-ups at 15-day intervals post-discharge.
                  </li>
                  <li className="flex items-start gap-3 text-sky-800">
                    <Users className="w-6 h-6 text-sky-500 flex-shrink-0" />
                    ASHA (Sahiya) workers are incentivized for both referral and ensuring follow-up compliance.
                  </li>
                </ul>
              </div>

              {/* INCENTIVE BOX */}
              <div className="bg-sky-100/80 p-8 rounded-3xl border border-sky-200 shadow-md relative">
                <HandCoins className="w-12 h-12 text-sky-600 mb-4" />
                <h3 className="text-xl font-bold text-sky-900 mb-2">Wage Compensation</h3>
                <p className="text-sky-700 text-sm mb-6 leading-relaxed">
                  To ensure mothers can stay with their child throughout the treatment period without financial burden, we provide:
                </p>
                <div className="text-4xl font-black text-sky-900">
                  An amount of ₹130<span className="text-lg font-medium text-sky-600"> /day</span>
                </div>
                <p className="text-xs text-sky-600 mt-3 font-semibold uppercase tracking-wider">Provided to mother as wage compensation</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}