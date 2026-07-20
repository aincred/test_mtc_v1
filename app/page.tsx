// // // // // "use client";

// // // // // import React, { useState } from "react";
// // // // // import Image from "next/image";
// // // // // import { motion, type Variants } from "framer-motion";
// // // // // import { Button } from "@/components/ui/button";
// // // // // import { 
// // // // //   ArrowRight, 
// // // // //   ShieldCheck, 
// // // // //   Users, 
// // // // //   Activity, 
// // // // //   LineChart, 
// // // // //   Database, 
// // // // //   MapPin, 
// // // // //   HeartPulse, 
// // // // //   Scale,
// // // // //   Syringe,
// // // // //   TrendingUp,
// // // // //   Calculator
// // // // // } from "lucide-react";

// // // // // // ==========================================
// // // // // // ANIMATION VARIANTS
// // // // // // ==========================================
// // // // // const staggerContainer: Variants = {
// // // // //   hidden: { opacity: 0 },
// // // // //   show: {
// // // // //     opacity: 1,
// // // // //     transition: { staggerChildren: 0.15 }
// // // // //   }
// // // // // };

// // // // // const fadeUp: Variants = {
// // // // //   hidden: { opacity: 0, y: 30 },
// // // // //   show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
// // // // // };

// // // // // // ==========================================
// // // // // // 1. HERO SECTION
// // // // // // ==========================================
// // // // // function Hero() {
// // // // //   return (
// // // // //     <section id="home" className="relative w-full overflow-hidden bg-slate-950 min-h-[90vh] flex items-center">
// // // // //       {/* ====== BACKGROUND MESH ====== */}
// // // // //       <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
// // // // //         <Image
// // // // //           src="/b1.jpg"
// // // // //           alt="Background Texture"
// // // // //           fill
// // // // //           className="object-cover opacity-10 mix-blend-overlay grayscale"
// // // // //           priority
// // // // //         />
// // // // //         <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-violet-800/20 blur-[120px] animate-pulse" style={{ animationDuration: '8s' }}></div>
// // // // //         <div className="absolute bottom-[-20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-amber-500/15 blur-[120px] animate-pulse" style={{ animationDuration: '10s' }}></div>
// // // // //       </div>

// // // // //       <div className="container relative z-10 mx-auto px-6 lg:px-10 py-20">
// // // // //         <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
// // // // //           {/* LEFT: TYPOGRAPHY & ACTIONS */}
// // // // //           <motion.div 
// // // // //             variants={staggerContainer}
// // // // //             initial="hidden"
// // // // //             animate="show"
// // // // //             className="lg:col-span-6 flex flex-col items-start space-y-8 z-20"
// // // // //           >
// // // // //             <motion.div variants={fadeUp} className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 shadow-xl">
// // // // //               <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-tr from-amber-400 to-orange-400 shadow-inner">
// // // // //                 <ShieldCheck className="w-3.5 h-3.5 text-slate-950" />
// // // // //               </span>
// // // // //               <span className="text-sm font-semibold text-indigo-50 tracking-wide">
// // // // //                 Govt. of Jharkhand • NHM Initiative
// // // // //               </span>
// // // // //             </motion.div>

// // // // //             <motion.h1 variants={fadeUp} className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight">
// // // // //               Tracking <span className="text-transparent bg-clip-text bg-gradient-to-br from-white to-white/40">Health.</span><br />
// // // // //               Transforming <br />
// // // // //               <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500">Lives.</span>
// // // // //             </motion.h1>

// // // // //             <motion.p variants={fadeUp} className="text-lg text-indigo-100/70 max-w-lg leading-relaxed font-medium">
// // // // //               A state-of-the-art digital portal for monitoring and managing Severe Acute Malnutrition (SAM) treatment centers across the state.
// // // // //             </motion.p>

// // // // //             <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-4 pt-4 w-full sm:w-auto">
// // // // //               <Button className="w-full sm:w-auto h-14 px-8 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 text-lg font-bold shadow-[0_0_40px_-10px_rgba(245,158,11,0.4)] border-none transition-all hover:scale-105">
// // // // //                 Access Portal
// // // // //                 <ArrowRight className="ml-2 w-5 h-5" />
// // // // //               </Button>
// // // // //             </motion.div>
// // // // //           </motion.div>

// // // // //           {/* RIGHT: ANIMATED BENTO LAYOUT */}
// // // // //           <motion.div 
// // // // //             initial={{ opacity: 0, x: 50 }}
// // // // //             animate={{ opacity: 1, x: 0 }}
// // // // //             transition={{ duration: 0.8, delay: 0.2 }}
// // // // //             className="lg:col-span-6 relative w-full h-[500px] sm:h-[600px] flex items-center justify-center z-10 mt-10 lg:mt-0"
// // // // //           >
// // // // //             <div className="absolute right-0 top-10 w-[80%] h-[75%] bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] shadow-[0_0_50px_rgba(79,70,229,0.15)] rotate-6 transition-transform duration-700 hover:rotate-3 z-0"></div>

// // // // //             <div className="absolute left-0 sm:left-10 z-10 w-[85%] h-[80%] rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-white/10 transition-transform duration-700 hover:-translate-y-2 group">
// // // // //               <Image
// // // // //                 src="/b2.jpg"
// // // // //                 alt="Child health care at MTC"
// // // // //                 fill
// // // // //                 className="object-cover transition-transform duration-700 group-hover:scale-105"
// // // // //                 priority
// // // // //               />
// // // // //               <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent"></div>
// // // // //             </div>

// // // // //             {/* Floating Stats */}
// // // // //             <motion.div 
// // // // //               animate={{ y: [0, -10, 0] }}
// // // // //               transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
// // // // //               className="absolute bottom-4 -right-4 sm:right-4 z-20 bg-indigo-950/80 backdrop-blur-xl border border-indigo-500/20 p-5 rounded-3xl shadow-2xl flex items-center gap-4"
// // // // //             >
// // // // //               <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0 shadow-inner">
// // // // //                 <Activity className="w-6 h-6 text-slate-950" />
// // // // //               </div>
// // // // //               <div className="pr-2">
// // // // //                 <p className="text-2xl font-black text-white leading-none">90+</p>
// // // // //                 <p className="text-xs text-indigo-200/70 font-semibold uppercase mt-1">Active Centers</p>
// // // // //               </div>
// // // // //             </motion.div>
// // // // //           </motion.div>
// // // // //         </div>
// // // // //       </div>
// // // // //     </section>
// // // // //   );
// // // // // }

// // // // // // ==========================================
// // // // // // 2. CLINICAL TOOLS & CALCULATORS SECTION
// // // // // // ==========================================
// // // // // function ClinicalTools() {
// // // // //   const [w1, setW1] = useState("");
// // // // //   const [w2, setW2] = useState("");
// // // // //   const [days, setDays] = useState("");
// // // // //   const [rate, setRate] = useState<number | null>(null);

// // // // //   const calculateWeightGain = () => {
// // // // //     const weight1 = parseFloat(w1);
// // // // //     const weight2 = parseFloat(w2);
// // // // //     const d = parseFloat(days);
// // // // //     if (weight1 && weight2 && d && d > 0) {
// // // // //       // Formula: (W2 - W1) * 1000 / (W1 * days)
// // // // //       const result = ((weight2 - weight1) * 1000) / (weight1 * d);
// // // // //       setRate(parseFloat(result.toFixed(2)));
// // // // //     } else {
// // // // //       setRate(null);
// // // // //     }
// // // // //   };

// // // // //   const tools = [
// // // // //     {
// // // // //       title: "Z-Score (SD) Calculator",
// // // // //       desc: "Instantly calculate WHO standard deviations for weight-for-height and length-for-age.",
// // // // //       icon: Scale,
// // // // //       color: "text-blue-400",
// // // // //       bg: "bg-blue-400/10 border-blue-400/20"
// // // // //     },
// // // // //     {
// // // // //       title: "F-75 / F-100 Feed Planner",
// // // // //       desc: "Automated therapeutic milk volume calculations based on current body weight.",
// // // // //       icon: Calculator,
// // // // //       color: "text-amber-400",
// // // // //       bg: "bg-amber-400/10 border-amber-400/20"
// // // // //     },
// // // // //     {
// // // // //       title: "Micronutrient Dosing",
// // // // //       desc: "Generate accurate dosing schedules for Vitamin A, Iron, and Folic Acid.",
// // // // //       icon: Syringe,
// // // // //       color: "text-emerald-400",
// // // // //       bg: "bg-emerald-400/10 border-emerald-400/20"
// // // // //     }
// // // // //   ];

// // // // //   return (
// // // // //     <section className="py-24 bg-slate-900 relative z-10 border-t border-white/5">
// // // // //       <div className="container mx-auto px-6 lg:px-10">
// // // // //         <motion.div 
// // // // //           initial="hidden"
// // // // //           whileInView="show"
// // // // //           viewport={{ once: true, margin: "-100px" }}
// // // // //           variants={fadeUp}
// // // // //           className="mb-16"
// // // // //         >
// // // // //           <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
// // // // //             Advanced <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Clinical Utilities</span>
// // // // //           </h2>
// // // // //           <p className="text-indigo-100/70 text-lg max-w-2xl">
// // // // //             Built-in calculation tools designed to eliminate manual errors and speed up daily assessments for medical officers.
// // // // //           </p>
// // // // //         </motion.div>

// // // // //         <div className="grid lg:grid-cols-12 gap-8">
// // // // //           {/* STATIC FEATURE CARDS */}
// // // // //           <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
// // // // //             {tools.map((tool, idx) => (
// // // // //               <motion.div 
// // // // //                 key={idx}
// // // // //                 initial={{ opacity: 0, y: 20 }}
// // // // //                 whileInView={{ opacity: 1, y: 0 }}
// // // // //                 viewport={{ once: true }}
// // // // //                 transition={{ delay: idx * 0.1 }}
// // // // //                 className={`p-6 rounded-3xl border ${tool.bg} backdrop-blur-sm flex flex-col justify-between`}
// // // // //               >
// // // // //                 <div className="mb-4">
// // // // //                   <tool.icon className={`w-8 h-8 ${tool.color} mb-4`} />
// // // // //                   <h3 className="text-xl font-bold text-white mb-2">{tool.title}</h3>
// // // // //                   <p className="text-sm text-indigo-100/60 leading-relaxed">{tool.desc}</p>
// // // // //                 </div>
// // // // //                 <div className="text-xs font-semibold text-white/40 uppercase tracking-widest mt-4">Module Integrated</div>
// // // // //               </motion.div>
// // // // //             ))}
// // // // //           </div>

// // // // //           {/* INTERACTIVE CALCULATOR */}
// // // // //           <motion.div 
// // // // //             initial={{ opacity: 0, scale: 0.95 }}
// // // // //             whileInView={{ opacity: 1, scale: 1 }}
// // // // //             viewport={{ once: true }}
// // // // //             className="lg:col-span-5 bg-slate-800/50 border border-indigo-500/20 p-8 rounded-[2rem] shadow-2xl relative overflow-hidden"
// // // // //           >
// // // // //             <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl rounded-full pointer-events-none"></div>
            
// // // // //             <div className="flex items-center gap-3 mb-6">
// // // // //               <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center shadow-lg">
// // // // //                 <TrendingUp className="w-5 h-5 text-white" />
// // // // //               </div>
// // // // //               <h3 className="text-2xl font-bold text-white">Weight Gain Rate</h3>
// // // // //             </div>

// // // // //             <div className="space-y-4 relative z-10">
// // // // //               <div className="grid grid-cols-2 gap-4">
// // // // //                 <div>
// // // // //                   <label className="text-xs font-medium text-indigo-200/70 mb-1 block">W1 (Initial kg)</label>
// // // // //                   <input 
// // // // //                     type="number" 
// // // // //                     value={w1} onChange={(e) => setW1(e.target.value)}
// // // // //                     className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-400/50 transition-colors"
// // // // //                     placeholder="e.g. 5.2"
// // // // //                   />
// // // // //                 </div>
// // // // //                 <div>
// // // // //                   <label className="text-xs font-medium text-indigo-200/70 mb-1 block">W2 (Current kg)</label>
// // // // //                   <input 
// // // // //                     type="number" 
// // // // //                     value={w2} onChange={(e) => setW2(e.target.value)}
// // // // //                     className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-400/50 transition-colors"
// // // // //                     placeholder="e.g. 5.8"
// // // // //                   />
// // // // //                 </div>
// // // // //               </div>
// // // // //               <div>
// // // // //                 <label className="text-xs font-medium text-indigo-200/70 mb-1 block">Days between measurements</label>
// // // // //                 <input 
// // // // //                   type="number" 
// // // // //                   value={days} onChange={(e) => setDays(e.target.value)}
// // // // //                   className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-400/50 transition-colors"
// // // // //                   placeholder="e.g. 7"
// // // // //                 />
// // // // //               </div>

// // // // //               <Button 
// // // // //                 onClick={calculateWeightGain}
// // // // //                 className="w-full mt-2 h-12 bg-white/10 hover:bg-white/20 text-white rounded-xl border border-white/10 transition-colors"
// // // // //               >
// // // // //                 Calculate Rate
// // // // //               </Button>

// // // // //               {rate !== null && (
// // // // //                 <motion.div 
// // // // //                   initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
// // // // //                   className="mt-4 p-4 bg-gradient-to-br from-amber-500/20 to-orange-600/20 border border-amber-500/30 rounded-xl text-center"
// // // // //                 >
// // // // //                   <p className="text-sm text-amber-200/80 font-medium mb-1">Rate of Weight Gain</p>
// // // // //                   <p className="text-3xl font-black text-amber-400">{rate} <span className="text-sm font-medium text-amber-200/60">g/kg/day</span></p>
// // // // //                   {rate >= 5 ? (
// // // // //                     <p className="text-xs text-emerald-400 mt-2 font-semibold flex items-center justify-center gap-1">Target Met (≥ 5g/kg/day)</p>
// // // // //                   ) : (
// // // // //                     <p className="text-xs text-red-400 mt-2 font-semibold">Below Target Range</p>
// // // // //                   )}
// // // // //                 </motion.div>
// // // // //               )}
// // // // //             </div>
// // // // //           </motion.div>
// // // // //         </div>
// // // // //       </div>
// // // // //     </section>
// // // // //   );
// // // // // }

// // // // // // ==========================================
// // // // // // 3. FEATURES SECTION
// // // // // // ==========================================
// // // // // function Features() {
// // // // //   const features = [
// // // // //     { title: "Real-time Bed Tracking", description: "Monitor bed availability across all 90+ MTCs with live updates.", icon: MapPin, color: "from-blue-500 to-cyan-400" },
// // // // //     { title: "Patient Monitoring", description: "Track treatment progress and recovery metrics for every admitted child.", icon: HeartPulse, color: "from-amber-400 to-orange-500" },
// // // // //     { title: "Automated Reporting", description: "Generate district-wise, automated compliance reports.", icon: LineChart, color: "from-emerald-400 to-teal-500" },
// // // // //     { title: "Centralized Database", description: "Secure, encrypted storage of patient history and follow-up schedules.", icon: Database, color: "from-violet-400 to-indigo-500" }
// // // // //   ];

// // // // //   return (
// // // // //     <section className="py-24 bg-slate-950 relative z-10">
// // // // //       <div className="container mx-auto px-6 lg:px-10">
// // // // //         <motion.div 
// // // // //           initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
// // // // //           className="text-center max-w-2xl mx-auto mb-16"
// // // // //         >
// // // // //           <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
// // // // //             Empowering Health Officials with <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Actionable Data</span>
// // // // //           </h2>
// // // // //         </motion.div>

// // // // //         <motion.div 
// // // // //           variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }}
// // // // //           className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
// // // // //         >
// // // // //           {features.map((feature, idx) => (
// // // // //             <motion.div key={idx} variants={fadeUp} className="bg-white/5 border border-white/10 p-6 rounded-3xl hover:bg-white/10 transition-colors group cursor-default">
// // // // //               <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
// // // // //                 <feature.icon className="w-6 h-6 text-slate-950" />
// // // // //               </div>
// // // // //               <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
// // // // //               <p className="text-sm text-indigo-100/60 leading-relaxed">{feature.description}</p>
// // // // //             </motion.div>
// // // // //           ))}
// // // // //         </motion.div>
// // // // //       </div>
// // // // //     </section>
// // // // //   );
// // // // // }

// // // // // // ==========================================
// // // // // // 4. IMPACT STATS SECTION
// // // // // // ==========================================
// // // // // function ImpactStats() {
// // // // //   return (
// // // // //     <section className="py-20 bg-slate-900 relative z-10 border-y border-white/5">
// // // // //       <div className="container relative mx-auto px-6 lg:px-10 z-10">
// // // // //         <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-x divide-white/10">
// // // // //           <div className="text-center px-4">
// // // // //             <h4 className="text-4xl lg:text-5xl font-black text-white mb-2">24</h4>
// // // // //             <p className="text-amber-400 font-semibold uppercase tracking-wider text-sm">Districts</p>
// // // // //           </div>
// // // // //           <div className="text-center px-4">
// // // // //             <h4 className="text-4xl lg:text-5xl font-black text-white mb-2">1.2k+</h4>
// // // // //             <p className="text-amber-400 font-semibold uppercase tracking-wider text-sm">Total Beds</p>
// // // // //           </div>
// // // // //           <div className="text-center px-4">
// // // // //             <h4 className="text-4xl lg:text-5xl font-black text-white mb-2">85%</h4>
// // // // //             <p className="text-amber-400 font-semibold uppercase tracking-wider text-sm">Recovery</p>
// // // // //           </div>
// // // // //           <div className="text-center px-4">
// // // // //             <h4 className="text-4xl lg:text-5xl font-black text-white mb-2">10k+</h4>
// // // // //             <p className="text-amber-400 font-semibold uppercase tracking-wider text-sm">Lives Saved</p>
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>
// // // // //     </section>
// // // // //   );
// // // // // }

// // // // // // ==========================================
// // // // // // MAIN PAGE EXPORT
// // // // // // ==========================================
// // // // // export default function Home() {
// // // // //   return (
// // // // //     <main className="min-h-screen bg-slate-950 font-sans selection:bg-amber-400/30">
// // // // //       <Hero />
// // // // //       <ClinicalTools />
// // // // //       <Features />
// // // // //       <ImpactStats />
// // // // //     </main>
// // // // //   );
// // // // // }

// // // // "use client";

// // // // import React, { useState } from "react";
// // // // import Image from "next/image";
// // // // import { motion, type Variants } from "framer-motion";
// // // // import { Button } from "@/components/ui/button";
// // // // import { 
// // // //   ArrowRight, 
// // // //   ShieldCheck, 
// // // //   Activity, 
// // // //   LineChart, 
// // // //   Database, 
// // // //   MapPin, 
// // // //   HeartPulse, 
// // // //   Scale,
// // // //   Syringe,
// // // //   TrendingUp,
// // // //   Calculator,
// // // //   ArrowRightCircle,
// // // //   ChevronRight
// // // // } from "lucide-react";

// // // // // ==========================================
// // // // // ANIMATION VARIANTS
// // // // // ==========================================
// // // // const staggerContainer: Variants = {
// // // //   hidden: { opacity: 0 },
// // // //   show: {
// // // //     opacity: 1,
// // // //     transition: { staggerChildren: 0.15 }
// // // //   }
// // // // };

// // // // const fadeUp: Variants = {
// // // //   hidden: { opacity: 0, y: 30 },
// // // //   show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
// // // // };

// // // // // ==========================================
// // // // // 1. HERO SECTION
// // // // // ==========================================
// // // // function Hero() {
// // // //   return (
// // // //     <section id="home" className="relative w-full overflow-hidden bg-slate-950 min-h-[90vh] flex items-center">
// // // //       {/* ====== BACKGROUND MESH ====== */}
// // // //       <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
// // // //         <Image
// // // //           src="/b1.jpg"
// // // //           alt="Background Texture"
// // // //           fill
// // // //           className="object-cover opacity-10 mix-blend-overlay grayscale"
// // // //           priority
// // // //         />
// // // //         <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-violet-800/20 blur-[120px] animate-pulse" style={{ animationDuration: '8s' }}></div>
// // // //         <div className="absolute bottom-[-20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-amber-500/15 blur-[120px] animate-pulse" style={{ animationDuration: '10s' }}></div>
// // // //       </div>

// // // //       <div className="container relative z-10 mx-auto px-6 lg:px-10 py-20">
// // // //         <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
// // // //           {/* LEFT: TYPOGRAPHY & ACTIONS */}
// // // //           <motion.div 
// // // //             variants={staggerContainer}
// // // //             initial="hidden"
// // // //             animate="show"
// // // //             className="lg:col-span-6 flex flex-col items-start space-y-8 z-20"
// // // //           >
// // // //             <motion.div variants={fadeUp} className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 shadow-xl">
// // // //               <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-tr from-amber-400 to-orange-400 shadow-inner">
// // // //                 <ShieldCheck className="w-3.5 h-3.5 text-slate-950" />
// // // //               </span>
// // // //               <span className="text-sm font-semibold text-indigo-50 tracking-wide">
// // // //                 Govt. of Jharkhand • NHM Initiative
// // // //               </span>
// // // //             </motion.div>

// // // //             <motion.h1 variants={fadeUp} className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight">
// // // //               Tracking <span className="text-transparent bg-clip-text bg-gradient-to-br from-white to-white/40">Health.</span><br />
// // // //               Transforming <br />
// // // //               <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500">Lives.</span>
// // // //             </motion.h1>

// // // //             <motion.p variants={fadeUp} className="text-lg text-indigo-100/70 max-w-lg leading-relaxed font-medium">
// // // //               A state-of-the-art digital portal for monitoring and managing Severe Acute Malnutrition (SAM) treatment centers across the state.
// // // //             </motion.p>

// // // //             <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-4 pt-4 w-full sm:w-auto">
// // // //               <Button className="w-full sm:w-auto h-14 px-8 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 text-lg font-bold shadow-[0_0_40px_-10px_rgba(245,158,11,0.4)] border-none transition-all hover:scale-105">
// // // //                 Access Portal
// // // //                 <ArrowRight className="ml-2 w-5 h-5" />
// // // //               </Button>
// // // //             </motion.div>
// // // //           </motion.div>

// // // //           {/* RIGHT: ANIMATED BENTO LAYOUT */}
// // // //           <motion.div 
// // // //             initial={{ opacity: 0, x: 50 }}
// // // //             animate={{ opacity: 1, x: 0 }}
// // // //             transition={{ duration: 0.8, delay: 0.2 }}
// // // //             className="lg:col-span-6 relative w-full h-[500px] sm:h-[600px] flex items-center justify-center z-10 mt-10 lg:mt-0"
// // // //           >
// // // //             <div className="absolute right-0 top-10 w-[80%] h-[75%] bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] shadow-[0_0_50px_rgba(79,70,229,0.15)] rotate-6 transition-transform duration-700 hover:rotate-3 z-0"></div>

// // // //             <div className="absolute left-0 sm:left-10 z-10 w-[85%] h-[80%] rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-white/10 transition-transform duration-700 hover:-translate-y-2 group">
// // // //               <Image
// // // //                 src="/b2.jpg"
// // // //                 alt="Child health care at MTC"
// // // //                 fill
// // // //                 className="object-cover transition-transform duration-700 group-hover:scale-105"
// // // //                 priority
// // // //               />
// // // //               <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent"></div>
// // // //             </div>

// // // //             {/* Floating Stats */}
// // // //             <motion.div 
// // // //               animate={{ y: [0, -10, 0] }}
// // // //               transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
// // // //               className="absolute bottom-4 -right-4 sm:right-4 z-20 bg-indigo-950/80 backdrop-blur-xl border border-indigo-500/20 p-5 rounded-3xl shadow-2xl flex items-center gap-4"
// // // //             >
// // // //               <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0 shadow-inner">
// // // //                 <Activity className="w-6 h-6 text-slate-950" />
// // // //               </div>
// // // //               <div className="pr-2">
// // // //                 <p className="text-2xl font-black text-white leading-none">90+</p>
// // // //                 <p className="text-xs text-indigo-200/70 font-semibold uppercase mt-1">Active Centers</p>
// // // //               </div>
// // // //             </motion.div>
// // // //           </motion.div>
// // // //         </div>
// // // //       </div>
// // // //     </section>
// // // //   );
// // // // }

// // // // // ==========================================
// // // // // 2. CLINICAL TOOLS & CALCULATORS SECTION
// // // // // ==========================================
// // // // function ClinicalTools() {
// // // //   const [w1, setW1] = useState("");
// // // //   const [w2, setW2] = useState("");
// // // //   const [days, setDays] = useState("");
// // // //   const [rate, setRate] = useState<number | null>(null);

// // // //   const calculateWeightGain = () => {
// // // //     const weight1 = parseFloat(w1);
// // // //     const weight2 = parseFloat(w2);
// // // //     const d = parseFloat(days);
// // // //     if (weight1 && weight2 && d && d > 0) {
// // // //       const result = ((weight2 - weight1) * 1000) / (weight1 * d);
// // // //       setRate(parseFloat(result.toFixed(2)));
// // // //     } else {
// // // //       setRate(null);
// // // //     }
// // // //   };

// // // //   const tools = [
// // // //     { title: "Z-Score (SD) Calculator", desc: "Instantly calculate WHO standard deviations for weight-for-height and length-for-age.", icon: Scale, color: "text-blue-400", bg: "bg-blue-400/10 border-blue-400/20" },
// // // //     { title: "F-75 / F-100 Feed Planner", desc: "Automated therapeutic milk volume calculations based on current body weight.", icon: Calculator, color: "text-amber-400", bg: "bg-amber-400/10 border-amber-400/20" },
// // // //     { title: "Micronutrient Dosing", desc: "Generate accurate dosing schedules for Vitamin A, Iron, and Folic Acid.", icon: Syringe, color: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-400/20" }
// // // //   ];

// // // //   return (
// // // //     <section className="py-24 bg-slate-900 relative z-10 border-t border-white/5">
// // // //       <div className="container mx-auto px-6 lg:px-10">
// // // //         <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="mb-16">
// // // //           <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
// // // //             Advanced <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Clinical Utilities</span>
// // // //           </h2>
// // // //           <p className="text-indigo-100/70 text-lg max-w-2xl">
// // // //             Built-in calculation tools designed to eliminate manual errors and speed up daily assessments for medical officers.
// // // //           </p>
// // // //         </motion.div>

// // // //         <div className="grid lg:grid-cols-12 gap-8">
// // // //           <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
// // // //             {tools.map((tool, idx) => (
// // // //               <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className={`p-6 rounded-3xl border ${tool.bg} backdrop-blur-sm flex flex-col justify-between`}>
// // // //                 <div className="mb-4">
// // // //                   <tool.icon className={`w-8 h-8 ${tool.color} mb-4`} />
// // // //                   <h3 className="text-xl font-bold text-white mb-2">{tool.title}</h3>
// // // //                   <p className="text-sm text-indigo-100/60 leading-relaxed">{tool.desc}</p>
// // // //                 </div>
// // // //                 <div className="text-xs font-semibold text-white/40 uppercase tracking-widest mt-4">Module Integrated</div>
// // // //               </motion.div>
// // // //             ))}
// // // //           </div>

// // // //           <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="lg:col-span-5 bg-slate-800/50 border border-indigo-500/20 p-8 rounded-[2rem] shadow-2xl relative overflow-hidden">
// // // //             <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl rounded-full pointer-events-none"></div>
// // // //             <div className="flex items-center gap-3 mb-6">
// // // //               <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center shadow-lg">
// // // //                 <TrendingUp className="w-5 h-5 text-white" />
// // // //               </div>
// // // //               <h3 className="text-2xl font-bold text-white">Weight Gain Rate</h3>
// // // //             </div>

// // // //             <div className="space-y-4 relative z-10">
// // // //               <div className="grid grid-cols-2 gap-4">
// // // //                 <div>
// // // //                   <label className="text-xs font-medium text-indigo-200/70 mb-1 block">W1 (Initial kg)</label>
// // // //                   <input type="number" value={w1} onChange={(e) => setW1(e.target.value)} className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-400/50 transition-colors" placeholder="e.g. 5.2" />
// // // //                 </div>
// // // //                 <div>
// // // //                   <label className="text-xs font-medium text-indigo-200/70 mb-1 block">W2 (Current kg)</label>
// // // //                   <input type="number" value={w2} onChange={(e) => setW2(e.target.value)} className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-400/50 transition-colors" placeholder="e.g. 5.8" />
// // // //                 </div>
// // // //               </div>
// // // //               <div>
// // // //                 <label className="text-xs font-medium text-indigo-200/70 mb-1 block">Days between measurements</label>
// // // //                 <input type="number" value={days} onChange={(e) => setDays(e.target.value)} className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-400/50 transition-colors" placeholder="e.g. 7" />
// // // //               </div>

// // // //               <Button onClick={calculateWeightGain} className="w-full mt-2 h-12 bg-white/10 hover:bg-white/20 text-white rounded-xl border border-white/10 transition-colors">
// // // //                 Calculate Rate
// // // //               </Button>

// // // //               {rate !== null && (
// // // //                 <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 p-4 bg-gradient-to-br from-amber-500/20 to-orange-600/20 border border-amber-500/30 rounded-xl text-center">
// // // //                   <p className="text-sm text-amber-200/80 font-medium mb-1">Rate of Weight Gain</p>
// // // //                   <p className="text-3xl font-black text-amber-400">{rate} <span className="text-sm font-medium text-amber-200/60">g/kg/day</span></p>
// // // //                   {rate >= 5 ? (
// // // //                     <p className="text-xs text-emerald-400 mt-2 font-semibold flex items-center justify-center gap-1">Target Met (≥ 5g/kg/day)</p>
// // // //                   ) : (
// // // //                     <p className="text-xs text-red-400 mt-2 font-semibold">Below Target Range</p>
// // // //                   )}
// // // //                 </motion.div>
// // // //               )}
// // // //             </div>
// // // //           </motion.div>
// // // //         </div>
// // // //       </div>
// // // //     </section>
// // // //   );
// // // // }

// // // // // ==========================================
// // // // // 3. FEATURES SECTION
// // // // // ==========================================
// // // // function Features() {
// // // //   const features = [
// // // //     { title: "Real-time Bed Tracking", description: "Monitor bed availability across all 90+ MTCs with live updates.", icon: MapPin, color: "from-blue-500 to-cyan-400" },
// // // //     { title: "Patient Monitoring", description: "Track treatment progress and recovery metrics for every admitted child.", icon: HeartPulse, color: "from-amber-400 to-orange-500" },
// // // //     { title: "Automated Reporting", description: "Generate district-wise, automated compliance reports.", icon: LineChart, color: "from-emerald-400 to-teal-500" },
// // // //     { title: "Centralized Database", description: "Secure, encrypted storage of patient history and follow-up schedules.", icon: Database, color: "from-violet-400 to-indigo-500" }
// // // //   ];

// // // //   return (
// // // //     <section className="py-24 bg-slate-950 relative z-10">
// // // //       <div className="container mx-auto px-6 lg:px-10">
// // // //         <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="text-center max-w-2xl mx-auto mb-16">
// // // //           <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
// // // //             Empowering Health Officials with <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Actionable Data</span>
// // // //           </h2>
// // // //         </motion.div>

// // // //         <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
// // // //           {features.map((feature, idx) => (
// // // //             <motion.div key={idx} variants={fadeUp} className="bg-white/5 border border-white/10 p-6 rounded-3xl hover:bg-white/10 transition-colors group cursor-default">
// // // //               <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
// // // //                 <feature.icon className="w-6 h-6 text-slate-950" />
// // // //               </div>
// // // //               <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
// // // //               <p className="text-sm text-indigo-100/60 leading-relaxed">{feature.description}</p>
// // // //             </motion.div>
// // // //           ))}
// // // //         </motion.div>
// // // //       </div>
// // // //     </section>
// // // //   );
// // // // }

// // // // // ==========================================
// // // // // 4. SPOTLIGHT SECTION (News & Updates)
// // // // // ==========================================
// // // // function Spotlight() {
// // // //   return (
// // // //     <section className="py-24 bg-slate-900 relative z-10 border-t border-white/5">
// // // //       <div className="container mx-auto px-6 lg:px-10">
// // // //         <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="mb-12">
// // // //           <h2 className="text-3xl md:text-4xl font-bold text-white">
// // // //             Information <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-500">Spotlight</span>
// // // //           </h2>
// // // //         </motion.div>

// // // //         <motion.div 
// // // //           variants={staggerContainer} 
// // // //           initial="hidden" 
// // // //           whileInView="show" 
// // // //           viewport={{ once: true }} 
// // // //           className="grid md:grid-cols-3 gap-6"
// // // //         >
// // // //           {/* Spotlight Main Accent Card */}
// // // //           <motion.div variants={fadeUp} className="bg-gradient-to-br from-teal-600 to-emerald-800 rounded-[2rem] p-8 flex flex-col justify-center relative overflow-hidden group cursor-pointer shadow-xl">
// // // //             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
// // // //             <div className="relative z-10 flex flex-col items-center text-center">
// // // //               <h3 className="text-4xl font-black text-white mb-2">Spotlight</h3>
// // // //               <p className="text-teal-100 font-medium mb-8">The Latest Updates</p>
// // // //               <div className="flex items-center gap-2 text-white font-bold tracking-wide group-hover:translate-x-2 transition-transform">
// // // //                 Explore All <ArrowRightCircle className="w-6 h-6" />
// // // //               </div>
// // // //             </div>
// // // //           </motion.div>

// // // //           {/* Article Card 1 */}
// // // //           <motion.div variants={fadeUp} className="bg-slate-950 border border-white/10 rounded-[2rem] overflow-hidden group cursor-pointer hover:border-teal-500/50 transition-colors shadow-lg flex flex-col">
// // // //             <div className="relative h-48 w-full overflow-hidden">
// // // //               <Image 
// // // //                 src="/b1.jpg" 
// // // //                 alt="Anthropometry Measurement" 
// // // //                 fill 
// // // //                 className="object-cover group-hover:scale-105 transition-transform duration-700" 
// // // //               />
// // // //             </div>
// // // //             <div className="p-6 flex flex-col flex-1 relative">
// // // //               <h4 className="text-lg font-bold text-teal-400 mb-3 line-clamp-2">
// // // //                 Treatment at Malnutrition Treatment Centre
// // // //               </h4>
// // // //               <p className="text-sm text-indigo-100/60 line-clamp-3 mb-4">
// // // //                 Once the child is diagnosed through anthropometry examination as SAM, the child gets admitted to MTC ...
// // // //               </p>
// // // //               <div className="mt-auto flex items-center justify-between text-xs font-semibold text-slate-500">
// // // //                 <span>11-Jun-2021 10:00 AM</span>
// // // //                 <ChevronRight className="w-5 h-5 text-teal-500" />
// // // //               </div>
// // // //             </div>
// // // //           </motion.div>

// // // //           {/* Article Card 2 */}
// // // //           <motion.div variants={fadeUp} className="bg-slate-950 border border-white/10 rounded-[2rem] overflow-hidden group cursor-pointer hover:border-teal-500/50 transition-colors shadow-lg flex flex-col">
// // // //             <div className="relative h-48 w-full overflow-hidden">
// // // //               <Image 
// // // //                 src="/b2.jpg" 
// // // //                 alt="Mother and Child" 
// // // //                 fill 
// // // //                 className="object-cover group-hover:scale-105 transition-transform duration-700" 
// // // //               />
// // // //             </div>
// // // //             <div className="p-6 flex flex-col flex-1 relative">
// // // //               <h4 className="text-lg font-bold text-teal-400 mb-3 line-clamp-2">
// // // //                 What is Malnutrition Treatment Centre?
// // // //               </h4>
// // // //               <p className="text-sm text-indigo-100/60 line-clamp-3 mb-4">
// // // //                 A facility-based unit providing medical and nutritional therapeutic care for children suffering from severe acute malnutrition...
// // // //               </p>
// // // //               <div className="mt-auto flex items-center justify-between text-xs font-semibold text-slate-500">
// // // //                 <span>Information Guide</span>
// // // //                 <ChevronRight className="w-5 h-5 text-teal-500" />
// // // //               </div>
// // // //             </div>
// // // //           </motion.div>

// // // //         </motion.div>
// // // //       </div>
// // // //     </section>
// // // //   );
// // // // }

// // // // // ==========================================
// // // // // 5. IMPACT STATS SECTION
// // // // // ==========================================
// // // // function ImpactStats() {
// // // //   return (
// // // //     <section className="py-20 bg-slate-900 relative z-10 border-y border-white/5">
// // // //       <div className="container relative mx-auto px-6 lg:px-10 z-10">
// // // //         <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-x divide-white/10">
// // // //           <div className="text-center px-4">
// // // //             <h4 className="text-4xl lg:text-5xl font-black text-white mb-2">24</h4>
// // // //             <p className="text-amber-400 font-semibold uppercase tracking-wider text-sm">Districts</p>
// // // //           </div>
// // // //           <div className="text-center px-4">
// // // //             <h4 className="text-4xl lg:text-5xl font-black text-white mb-2">1.2k+</h4>
// // // //             <p className="text-amber-400 font-semibold uppercase tracking-wider text-sm">Total Beds</p>
// // // //           </div>
// // // //           <div className="text-center px-4">
// // // //             <h4 className="text-4xl lg:text-5xl font-black text-white mb-2">85%</h4>
// // // //             <p className="text-amber-400 font-semibold uppercase tracking-wider text-sm">Recovery</p>
// // // //           </div>
// // // //           <div className="text-center px-4">
// // // //             <h4 className="text-4xl lg:text-5xl font-black text-white mb-2">10k+</h4>
// // // //             <p className="text-amber-400 font-semibold uppercase tracking-wider text-sm">Lives Saved</p>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </section>
// // // //   );
// // // // }

// // // // // ==========================================
// // // // // 6. ANIMATED PARTNERS MARQUEE SECTION (From image_20bf06.png)
// // // // // ==========================================
// // // // function Partners() {
// // // //   // Repeating the array to ensure smooth seamless loop coverage on ultra-wide monitors
// // // //   const baseLogos = [
// // // //     { src: "/logo-jharkhand-govt.png", alt: "Government of Jharkhand", width: 75, height: 75 },
// // // //     { src: "/logo_1.png", alt: "Centre of Excellence for Management of Severe Acute Malnutrition (CoE-SAM) Network", width: 340, height: 75, isWide: true },
// // // //     { src: "/logo_2.png", alt: "National Centre of Excellence and Advanced Research on Diets", width: 310, height: 75, isWide: true },
// // // //     { src: "/logo_3.png", alt: "ICMR - National Institute of Nutrition", width: 240, height: 75, isWide: true }
// // // //     { src: "/logo_4.png", alt: "ICMR - National Institute of Nutrition", width: 240, height: 75, isWide: true }
// // // //     { src: "/logo_5.png", alt: "ICMR - National Institute of Nutrition", width: 240, height: 75, isWide: true }
// // // //     { src: "/logo_6.png", alt: "ICMR - National Institute of Nutrition", width: 240, height: 75, isWide: true }
// // // //     { src: "/logo_7.png", alt: "ICMR - National Institute of Nutrition", width: 240, height: 75, isWide: true }
// // // //     { src: "/logo_8.png", alt: "ICMR - National Institute of Nutrition", width: 240, height: 75, isWide: true }
// // // //     { src: "/logo_9.png", alt: "ICMR - National Institute of Nutrition", width: 240, height: 75, isWide: true }
// // // //     { src: "/logo_10.png", alt: "ICMR - National Institute of Nutrition", width: 240, height: 75, isWide: true }
// // // //   ];

// // // //   const marqueeLogos = [...baseLogos, ...baseLogos, ...baseLogos];

// // // //   return (
// // // //     <section className="bg-white py-12 border-t border-slate-200 relative z-20 overflow-hidden select-none">
// // // //       <div className="container mx-auto px-6 lg:px-10 mb-4 hidden">
// // // //         <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center">In Collaboration With</h4>
// // // //       </div>
      
// // // //       {/* Marquee Wrapper Container */}
// // // //       <div className="flex w-full relative">
// // // //         {/* Soft edge gradients for a fading enterprise look */}
// // // //         <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
// // // //         <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

// // // //         <motion.div 
// // // //           className="flex items-center gap-16 md:gap-24 flex-nowrap"
// // // //           animate={{ x: [0, -1200] }}
// // // //           transition={{
// // // //             ease: "linear",
// // // //             duration: 25,
// // // //             repeat: Infinity,
// // // //           }}
// // // //         >
// // // //           {marqueeLogos.map((logo, index) => (
// // // //             <div 
// // // //               key={index} 
// // // //               className={`relative h-16 flex-shrink-0 flex items-center justify-center transition-all duration-300 ${
// // // //                 logo.isWide ? "w-64 md:w-80" : "w-16 md:w-20"
// // // //               }`}
// // // //             >
// // // //               <Image 
// // // //                 src={logo.src} 
// // // //                 alt={logo.alt} 
// // // //                 fill 
// // // //                 className="object-contain" 
// // // //               />
// // // //             </div>
// // // //           ))}
// // // //         </motion.div>
// // // //       </div>
// // // //     </section>
// // // //   );
// // // // }

// // // // // ==========================================
// // // // // MAIN PAGE EXPORT
// // // // // ==========================================
// // // // export default function Home() {
// // // //   return (
// // // //     <main className="min-h-screen bg-slate-950 font-sans selection:bg-amber-400/30">
// // // //       <Hero />
// // // //       <ClinicalTools />
// // // //       <Features />
// // // //       <Spotlight />
// // // //       <ImpactStats />
// // // //       <Partners />
// // // //     </main>
// // // //   );
// // // // }


// // // "use client";

// // // import React, { useState } from "react";
// // // import Image from "next/image";
// // // import { motion, type Variants } from "framer-motion";
// // // import { Button } from "@/components/ui/button";
// // // import { 
// // //   ArrowRight, 
// // //   ShieldCheck, 
// // //   Activity, 
// // //   LineChart, 
// // //   Database, 
// // //   MapPin, 
// // //   HeartPulse, 
// // //   Scale,
// // //   Syringe,
// // //   TrendingUp,
// // //   Calculator,
// // //   ArrowRightCircle,
// // //   ChevronRight
// // // } from "lucide-react";

// // // // ==========================================
// // // // ANIMATION VARIANTS
// // // // ==========================================
// // // const staggerContainer: Variants = {
// // //   hidden: { opacity: 0 },
// // //   show: {
// // //     opacity: 1,
// // //     transition: { staggerChildren: 0.15 }
// // //   }
// // // };

// // // const fadeUp: Variants = {
// // //   hidden: { opacity: 0, y: 30 },
// // //   show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
// // // };

// // // // ==========================================
// // // // 1. HERO SECTION
// // // // ==========================================
// // // function Hero() {
// // //   return (
// // //     <section id="home" className="relative w-full overflow-hidden bg-slate-950 min-h-[90vh] flex items-center">
// // //       {/* ====== BACKGROUND MESH ====== */}
// // //       <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
// // //         <Image
// // //           src="/b1.jpg"
// // //           alt="Background Texture"
// // //           fill
// // //           className="object-cover opacity-10 mix-blend-overlay grayscale"
// // //           priority
// // //         />
// // //         <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-violet-800/20 blur-[120px] animate-pulse" style={{ animationDuration: '8s' }}></div>
// // //         <div className="absolute bottom-[-20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-amber-500/15 blur-[120px] animate-pulse" style={{ animationDuration: '10s' }}></div>
// // //       </div>

// // //       <div className="container relative z-10 mx-auto px-6 lg:px-10 py-20">
// // //         <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
// // //           {/* LEFT: TYPOGRAPHY & ACTIONS */}
// // //           <motion.div 
// // //             variants={staggerContainer}
// // //             initial="hidden"
// // //             animate="show"
// // //             className="lg:col-span-6 flex flex-col items-start space-y-8 z-20"
// // //           >
// // //             <motion.div variants={fadeUp} className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 shadow-xl">
// // //               <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-tr from-amber-400 to-orange-400 shadow-inner">
// // //                 <ShieldCheck className="w-3.5 h-3.5 text-slate-950" />
// // //               </span>
// // //               <span className="text-sm font-semibold text-indigo-50 tracking-wide">
// // //                 Govt. of Jharkhand • NHM Initiative
// // //               </span>
// // //             </motion.div>

// // //             <motion.h1 variants={fadeUp} className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight">
// // //               Tracking <span className="text-transparent bg-clip-text bg-gradient-to-br from-white to-white/40">Health.</span><br />
// // //               Transforming <br />
// // //               <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500">Lives.</span>
// // //             </motion.h1>

// // //             <motion.p variants={fadeUp} className="text-lg text-indigo-100/70 max-w-lg leading-relaxed font-medium">
// // //               A state-of-the-art digital portal for monitoring and managing Severe Acute Malnutrition (SAM) treatment centers across the state.
// // //             </motion.p>

// // //             <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-4 pt-4 w-full sm:w-auto">
// // //               <Button className="w-full sm:w-auto h-14 px-8 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 text-lg font-bold shadow-[0_0_40px_-10px_rgba(245,158,11,0.4)] border-none transition-all hover:scale-105">
// // //                 Access Portal
// // //                 <ArrowRight className="ml-2 w-5 h-5" />
// // //               </Button>
// // //             </motion.div>
// // //           </motion.div>

// // //           {/* RIGHT: ANIMATED BENTO LAYOUT */}
// // //           <motion.div 
// // //             initial={{ opacity: 0, x: 50 }}
// // //             animate={{ opacity: 1, x: 0 }}
// // //             transition={{ duration: 0.8, delay: 0.2 }}
// // //             className="lg:col-span-6 relative w-full h-[500px] sm:h-[600px] flex items-center justify-center z-10 mt-10 lg:mt-0"
// // //           >
// // //             <div className="absolute right-0 top-10 w-[80%] h-[75%] bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] shadow-[0_0_50px_rgba(79,70,229,0.15)] rotate-6 transition-transform duration-700 hover:rotate-3 z-0"></div>

// // //             <div className="absolute left-0 sm:left-10 z-10 w-[85%] h-[80%] rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-white/10 transition-transform duration-700 hover:-translate-y-2 group">
// // //               <Image
// // //                 src="/b2.jpg"
// // //                 alt="Child health care at MTC"
// // //                 fill
// // //                 className="object-cover transition-transform duration-700 group-hover:scale-105"
// // //                 priority
// // //               />
// // //               <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent"></div>
// // //             </div>

// // //             {/* Floating Stats */}
// // //             <motion.div 
// // //               animate={{ y: [0, -10, 0] }}
// // //               transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
// // //               className="absolute bottom-4 -right-4 sm:right-4 z-20 bg-indigo-950/80 backdrop-blur-xl border border-indigo-500/20 p-5 rounded-3xl shadow-2xl flex items-center gap-4"
// // //             >
// // //               <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0 shadow-inner">
// // //                 <Activity className="w-6 h-6 text-slate-950" />
// // //               </div>
// // //               <div className="pr-2">
// // //                 <p className="text-2xl font-black text-white leading-none">90+</p>
// // //                 <p className="text-xs text-indigo-200/70 font-semibold uppercase mt-1">Active Centers</p>
// // //               </div>
// // //             </motion.div>
// // //           </motion.div>
// // //         </div>
// // //       </div>
// // //     </section>
// // //   );
// // // }

// // // // ==========================================
// // // // 2. CLINICAL TOOLS & CALCULATORS SECTION
// // // // ==========================================
// // // function ClinicalTools() {
// // //   const [w1, setW1] = useState("");
// // //   const [w2, setW2] = useState("");
// // //   const [days, setDays] = useState("");
// // //   const [rate, setRate] = useState<number | null>(null);

// // //   const calculateWeightGain = () => {
// // //     const weight1 = parseFloat(w1);
// // //     const weight2 = parseFloat(w2);
// // //     const d = parseFloat(days);
// // //     if (weight1 && weight2 && d && d > 0) {
// // //       const result = ((weight2 - weight1) * 1000) / (weight1 * d);
// // //       setRate(parseFloat(result.toFixed(2)));
// // //     } else {
// // //       setRate(null);
// // //     }
// // //   };

// // //   const tools = [
// // //     { title: "Z-Score (SD) Calculator", desc: "Instantly calculate WHO standard deviations for weight-for-height and length-for-age.", icon: Scale, color: "text-blue-400", bg: "bg-blue-400/10 border-blue-400/20" },
// // //     { title: "F-75 / F-100 Feed Planner", desc: "Automated therapeutic milk volume calculations based on current body weight.", icon: Calculator, color: "text-amber-400", bg: "bg-amber-400/10 border-amber-400/20" },
// // //     { title: "Micronutrient Dosing", desc: "Generate accurate dosing schedules for Vitamin A, Iron, and Folic Acid.", icon: Syringe, color: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-400/20" }
// // //   ];

// // //   return (
// // //     <section className="py-24 bg-slate-900 relative z-10 border-t border-white/5">
// // //       <div className="container mx-auto px-6 lg:px-10">
// // //         <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="mb-16">
// // //           <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
// // //             Advanced <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Clinical Utilities</span>
// // //           </h2>
// // //           <p className="text-indigo-100/70 text-lg max-w-2xl">
// // //             Built-in calculation tools designed to eliminate manual errors and speed up daily assessments for medical officers.
// // //           </p>
// // //         </motion.div>

// // //         <div className="grid lg:grid-cols-12 gap-8">
// // //           <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
// // //             {tools.map((tool, idx) => (
// // //               <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className={`p-6 rounded-3xl border ${tool.bg} backdrop-blur-sm flex flex-col justify-between`}>
// // //                 <div className="mb-4">
// // //                   <tool.icon className={`w-8 h-8 ${tool.color} mb-4`} />
// // //                   <h3 className="text-xl font-bold text-white mb-2">{tool.title}</h3>
// // //                   <p className="text-sm text-indigo-100/60 leading-relaxed">{tool.desc}</p>
// // //                 </div>
// // //                 <div className="text-xs font-semibold text-white/40 uppercase tracking-widest mt-4">Module Integrated</div>
// // //               </motion.div>
// // //             ))}
// // //           </div>

// // //           <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="lg:col-span-5 bg-slate-800/50 border border-indigo-500/20 p-8 rounded-[2rem] shadow-2xl relative overflow-hidden">
// // //             <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl rounded-full pointer-events-none"></div>
// // //             <div className="flex items-center gap-3 mb-6">
// // //               <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center shadow-lg">
// // //                 <TrendingUp className="w-5 h-5 text-white" />
// // //               </div>
// // //               <h3 className="text-2xl font-bold text-white">Weight Gain Rate</h3>
// // //             </div>

// // //             <div className="space-y-4 relative z-10">
// // //               <div className="grid grid-cols-2 gap-4">
// // //                 <div>
// // //                   <label className="text-xs font-medium text-indigo-200/70 mb-1 block">W1 (Initial kg)</label>
// // //                   <input type="number" value={w1} onChange={(e) => setW1(e.target.value)} className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-400/50 transition-colors" placeholder="e.g. 5.2" />
// // //                 </div>
// // //                 <div>
// // //                   <label className="text-xs font-medium text-indigo-200/70 mb-1 block">W2 (Current kg)</label>
// // //                   <input type="number" value={w2} onChange={(e) => setW2(e.target.value)} className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-400/50 transition-colors" placeholder="e.g. 5.8" />
// // //                 </div>
// // //               </div>
// // //               <div>
// // //                 <label className="text-xs font-medium text-indigo-200/70 mb-1 block">Days between measurements</label>
// // //                 <input type="number" value={days} onChange={(e) => setDays(e.target.value)} className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-400/50 transition-colors" placeholder="e.g. 7" />
// // //               </div>

// // //               <Button onClick={calculateWeightGain} className="w-full mt-2 h-12 bg-white/10 hover:bg-white/20 text-white rounded-xl border border-white/10 transition-colors">
// // //                 Calculate Rate
// // //               </Button>

// // //               {rate !== null && (
// // //                 <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 p-4 bg-gradient-to-br from-amber-500/20 to-orange-600/20 border border-amber-500/30 rounded-xl text-center">
// // //                   <p className="text-sm text-amber-200/80 font-medium mb-1">Rate of Weight Gain</p>
// // //                   <p className="text-3xl font-black text-amber-400">{rate} <span className="text-sm font-medium text-amber-200/60">g/kg/day</span></p>
// // //                   {rate >= 5 ? (
// // //                     <p className="text-xs text-emerald-400 mt-2 font-semibold flex items-center justify-center gap-1">Target Met (≥ 5g/kg/day)</p>
// // //                   ) : (
// // //                     <p className="text-xs text-red-400 mt-2 font-semibold">Below Target Range</p>
// // //                   )}
// // //                 </motion.div>
// // //               )}
// // //             </div>
// // //           </motion.div>
// // //         </div>
// // //       </div>
// // //     </section>
// // //   );
// // // }

// // // // ==========================================
// // // // 3. FEATURES SECTION
// // // // ==========================================
// // // function Features() {
// // //   const features = [
// // //     { title: "Real-time Bed Tracking", description: "Monitor bed availability across all 90+ MTCs with live updates.", icon: MapPin, color: "from-blue-500 to-cyan-400" },
// // //     { title: "Patient Monitoring", description: "Track treatment progress and recovery metrics for every admitted child.", icon: HeartPulse, color: "from-amber-400 to-orange-500" },
// // //     { title: "Automated Reporting", description: "Generate district-wise, automated compliance reports.", icon: LineChart, color: "from-emerald-400 to-teal-500" },
// // //     { title: "Centralized Database", description: "Secure, encrypted storage of patient history and follow-up schedules.", icon: Database, color: "from-violet-400 to-indigo-500" }
// // //   ];

// // //   return (
// // //     <section className="py-24 bg-slate-950 relative z-10">
// // //       <div className="container mx-auto px-6 lg:px-10">
// // //         <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="text-center max-w-2xl mx-auto mb-16">
// // //           <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
// // //             Empowering Health Officials with <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Actionable Data</span>
// // //           </h2>
// // //         </motion.div>

// // //         <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
// // //           {features.map((feature, idx) => (
// // //             <motion.div key={idx} variants={fadeUp} className="bg-white/5 border border-white/10 p-6 rounded-3xl hover:bg-white/10 transition-colors group cursor-default">
// // //               <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
// // //                 <feature.icon className="w-6 h-6 text-slate-950" />
// // //               </div>
// // //               <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
// // //               <p className="text-sm text-indigo-100/60 leading-relaxed">{feature.description}</p>
// // //             </motion.div>
// // //           ))}
// // //         </motion.div>
// // //       </div>
// // //     </section>
// // //   );
// // // }

// // // // ==========================================
// // // // 4. SPOTLIGHT SECTION (News & Updates)
// // // // ==========================================
// // // function Spotlight() {
// // //   return (
// // //     <section className="py-24 bg-slate-900 relative z-10 border-t border-white/5">
// // //       <div className="container mx-auto px-6 lg:px-10">
// // //         <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="mb-12">
// // //           <h2 className="text-3xl md:text-4xl font-bold text-white">
// // //             Information <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-500">Spotlight</span>
// // //           </h2>
// // //         </motion.div>

// // //         <motion.div 
// // //           variants={staggerContainer} 
// // //           initial="hidden" 
// // //           whileInView="show" 
// // //           viewport={{ once: true }} 
// // //           className="grid md:grid-cols-3 gap-6"
// // //         >
// // //           {/* Spotlight Main Accent Card */}
// // //           <motion.div variants={fadeUp} className="bg-gradient-to-br from-teal-600 to-emerald-800 rounded-[2rem] p-8 flex flex-col justify-center relative overflow-hidden group cursor-pointer shadow-xl">
// // //             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
// // //             <div className="relative z-10 flex flex-col items-center text-center">
// // //               <h3 className="text-4xl font-black text-white mb-2">Spotlight</h3>
// // //               <p className="text-teal-100 font-medium mb-8">The Latest Updates</p>
// // //               <div className="flex items-center gap-2 text-white font-bold tracking-wide group-hover:translate-x-2 transition-transform">
// // //                 Explore All <ArrowRightCircle className="w-6 h-6" />
// // //               </div>
// // //             </div>
// // //           </motion.div>

// // //           {/* Article Card 1 */}
// // //           <motion.div variants={fadeUp} className="bg-slate-950 border border-white/10 rounded-[2rem] overflow-hidden group cursor-pointer hover:border-teal-500/50 transition-colors shadow-lg flex flex-col">
// // //             <div className="relative h-48 w-full overflow-hidden">
// // //               <Image 
// // //                 src="/b1.jpg" 
// // //                 alt="Anthropometry Measurement" 
// // //                 fill 
// // //                 className="object-cover group-hover:scale-105 transition-transform duration-700" 
// // //               />
// // //             </div>
// // //             <div className="p-6 flex flex-col flex-1 relative">
// // //               <h4 className="text-lg font-bold text-teal-400 mb-3 line-clamp-2">
// // //                 Treatment at Malnutrition Treatment Centre
// // //               </h4>
// // //               <p className="text-sm text-indigo-100/60 line-clamp-3 mb-4">
// // //                 Once the child is diagnosed through anthropometry examination as SAM, the child gets admitted to MTC ...
// // //               </p>
// // //               <div className="mt-auto flex items-center justify-between text-xs font-semibold text-slate-500">
// // //                 <span>11-Jun-2021 10:00 AM</span>
// // //                 <ChevronRight className="w-5 h-5 text-teal-500" />
// // //               </div>
// // //             </div>
// // //           </motion.div>

// // //           {/* Article Card 2 */}
// // //           <motion.div variants={fadeUp} className="bg-slate-950 border border-white/10 rounded-[2rem] overflow-hidden group cursor-pointer hover:border-teal-500/50 transition-colors shadow-lg flex flex-col">
// // //             <div className="relative h-48 w-full overflow-hidden">
// // //               <Image 
// // //                 src="/b2.jpg" 
// // //                 alt="Mother and Child" 
// // //                 fill 
// // //                 className="object-cover group-hover:scale-105 transition-transform duration-700" 
// // //               />
// // //             </div>
// // //             <div className="p-6 flex flex-col flex-1 relative">
// // //               <h4 className="text-lg font-bold text-teal-400 mb-3 line-clamp-2">
// // //                 What is Malnutrition Treatment Centre?
// // //               </h4>
// // //               <p className="text-sm text-indigo-100/60 line-clamp-3 mb-4">
// // //                 A facility-based unit providing medical and nutritional therapeutic care for children suffering from severe acute malnutrition...
// // //               </p>
// // //               <div className="mt-auto flex items-center justify-between text-xs font-semibold text-slate-500">
// // //                 <span>Information Guide</span>
// // //                 <ChevronRight className="w-5 h-5 text-teal-500" />
// // //               </div>
// // //             </div>
// // //           </motion.div>

// // //         </motion.div>
// // //       </div>
// // //     </section>
// // //   );
// // // }

// // // // ==========================================
// // // // 5. IMPACT STATS SECTION
// // // // ==========================================
// // // function ImpactStats() {
// // //   return (
// // //     <section className="py-20 bg-slate-900 relative z-10 border-y border-white/5">
// // //       <div className="container relative mx-auto px-6 lg:px-10 z-10">
// // //         <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-x divide-white/10">
// // //           <div className="text-center px-4">
// // //             <h4 className="text-4xl lg:text-5xl font-black text-white mb-2">24</h4>
// // //             <p className="text-amber-400 font-semibold uppercase tracking-wider text-sm">Districts</p>
// // //           </div>
// // //           <div className="text-center px-4">
// // //             <h4 className="text-4xl lg:text-5xl font-black text-white mb-2">1.2k+</h4>
// // //             <p className="text-amber-400 font-semibold uppercase tracking-wider text-sm">Total Beds</p>
// // //           </div>
// // //           <div className="text-center px-4">
// // //             <h4 className="text-4xl lg:text-5xl font-black text-white mb-2">85%</h4>
// // //             <p className="text-amber-400 font-semibold uppercase tracking-wider text-sm">Recovery</p>
// // //           </div>
// // //           <div className="text-center px-4">
// // //             <h4 className="text-4xl lg:text-5xl font-black text-white mb-2">10k+</h4>
// // //             <p className="text-amber-400 font-semibold uppercase tracking-wider text-sm">Lives Saved</p>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </section>
// // //   );
// // // }

// // // // ==========================================
// // // // 6. ANIMATED PARTNERS MARQUEE SECTION
// // // // ==========================================
// // // function Partners() {
// // //   const baseLogos = [
// // //     { src: "/logo-jharkhand-govt.png", alt: "Government of Jharkhand", width: 75, height: 75 },
// // //     { src: "/logo_1.png", alt: "Centre of Excellence for Management of Severe Acute Malnutrition (CoE-SAM) Network", width: 340, height: 75, isWide: true },
// // //     { src: "/logo_2.png", alt: "National Centre of Excellence and Advanced Research on Diets", width: 310, height: 75, isWide: true },
// // //     { src: "/logo_3.png", alt: "ICMR - National Institute of Nutrition", width: 240, height: 75, isWide: true },
// // //     { src: "/logo_4.png", alt: "Partner 4", width: 240, height: 75, isWide: true },
// // //     { src: "/logo_5.png", alt: "Partner 5", width: 240, height: 75, isWide: true },
// // //     { src: "/logo_6.png", alt: "Partner 6", width: 240, height: 75, isWide: true },
// // //     { src: "/logo_7.png", alt: "Partner 7", width: 240, height: 75, isWide: true },
// // //     { src: "/logo_8.png", alt: "Partner 8", width: 240, height: 75, isWide: true },
// // //     { src: "/logo_9.png", alt: "Partner 9", width: 240, height: 75, isWide: true },
// // //     { src: "/logo_10.png", alt: "Partner 10", width: 240, height: 75, isWide: true }
// // //   ];

// // //   // We only need two sets for a perfect 0% to -50% seamless loop
// // //   const marqueeLogos = [...baseLogos, ...baseLogos];

// // //   return (
// // //     <section className="bg-white py-12 border-t border-slate-200 relative z-20 overflow-hidden select-none">
// // //       <div className="container mx-auto px-6 lg:px-10 mb-4 hidden">
// // //         <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center">In Collaboration With</h4>
// // //       </div>
      
// // //       {/* Marquee Wrapper Container */}
// // //       <div className="flex w-full relative">
// // //         {/* Soft edge gradients for a fading enterprise look */}
// // //         <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
// // //         <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

// // //         <motion.div 
// // //           className="flex items-center gap-16 md:gap-24 flex-nowrap w-max"
// // //           animate={{ x: ["0%", "-50%"] }}
// // //           transition={{
// // //             ease: "linear",
// // //             duration: 40, // Slower duration because the list is much longer now
// // //             repeat: Infinity,
// // //           }}
// // //         >
// // //           {marqueeLogos.map((logo, index) => (
// // //             <div 
// // //               key={index} 
// // //               className={`relative h-16 flex-shrink-0 flex items-center justify-center transition-all duration-300 ${
// // //                 logo.isWide ? "w-64 md:w-80" : "w-16 md:w-20"
// // //               }`}
// // //             >
// // //               <Image 
// // //                 src={logo.src} 
// // //                 alt={logo.alt} 
// // //                 fill 
// // //                 className="object-contain" 
// // //               />
// // //             </div>
// // //           ))}
// // //         </motion.div>
// // //       </div>
// // //     </section>
// // //   );
// // // }

// // // // ==========================================
// // // // MAIN PAGE EXPORT
// // // // ==========================================
// // // export default function Home() {
// // //   return (
// // //     <main className="min-h-screen bg-slate-950 font-sans selection:bg-amber-400/30">
// // //       <Hero />
// // //       <ClinicalTools />
// // //       <Features />
// // //       <Spotlight />
// // //       <ImpactStats />
// // //       <Partners />
// // //     </main>
// // //   );
// // // }

// // "use client";

// // import React, { useState } from "react";
// // import Image from "next/image";
// // import { motion, type Variants } from "framer-motion";
// // import { Button } from "@/components/ui/button";
// // import { 
// //   ArrowRight, 
// //   ShieldCheck, 
// //   Activity, 
// //   LineChart, 
// //   Database, 
// //   MapPin, 
// //   HeartPulse, 
// //   Scale,
// //   Syringe,
// //   TrendingUp,
// //   Calculator,
// //   ArrowRightCircle,
// //   ChevronRight
// // } from "lucide-react";

// // // ==========================================
// // // ANIMATION VARIANTS
// // // ==========================================
// // const staggerContainer: Variants = {
// //   hidden: { opacity: 0 },
// //   show: {
// //     opacity: 1,
// //     transition: { staggerChildren: 0.15 }
// //   }
// // };

// // const fadeUp: Variants = {
// //   hidden: { opacity: 0, y: 30 },
// //   show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
// // };

// // // ==========================================
// // // 1. HERO SECTION
// // // ==========================================
// // function Hero() {
// //   return (
// //     <section id="home" className="relative w-full overflow-hidden bg-sky-50 min-h-[90vh] flex items-center">
// //       {/* ====== BACKGROUND MESH ====== */}
// //       <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
// //         <Image
// //           src="/b1.jpg"
// //           alt="Background Texture"
// //           fill
// //           className="object-cover opacity-5 mix-blend-overlay grayscale"
// //           priority
// //         />
// //         <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-sky-300/40 blur-[120px] animate-pulse" style={{ animationDuration: '8s' }}></div>
// //         <div className="absolute bottom-[-20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-white/60 blur-[120px] animate-pulse" style={{ animationDuration: '10s' }}></div>
// //       </div>

// //       <div className="container relative z-10 mx-auto px-6 lg:px-10 py-20">
// //         <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
// //           {/* LEFT: TYPOGRAPHY & ACTIONS */}
// //           <motion.div 
// //             variants={staggerContainer}
// //             initial="hidden"
// //             animate="show"
// //             className="lg:col-span-6 flex flex-col items-start space-y-8 z-20"
// //           >
// //             <motion.div variants={fadeUp} className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-sky-200 shadow-xl">
// //               <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-tr from-sky-400 to-sky-500 shadow-inner">
// //                 <ShieldCheck className="w-3.5 h-3.5 text-white" />
// //               </span>
// //               <span className="text-sm font-semibold text-sky-800 tracking-wide">
// //                 Govt. of Jharkhand • NHM Initiative
// //               </span>
// //             </motion.div>

// //             <motion.h1 variants={fadeUp} className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-sky-900 leading-[1.1] tracking-tight">
// //               Tracking <span className="text-transparent bg-clip-text bg-gradient-to-br from-sky-600 to-sky-400">Health.</span><br />
// //               Transforming <br />
// //               <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-500 to-blue-500">Lives.</span>
// //             </motion.h1>

// //             <motion.p variants={fadeUp} className="text-lg text-sky-700 max-w-lg leading-relaxed font-medium">
// //               A state-of-the-art digital portal for monitoring and managing Severe Acute Malnutrition (SAM) treatment centers across the state.
// //             </motion.p>

// //             <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-4 pt-4 w-full sm:w-auto">
// //               <Button className="w-full sm:w-auto h-14 px-8 rounded-2xl bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-white text-lg font-bold shadow-[0_0_40px_-10px_rgba(56,189,248,0.4)] border-none transition-all hover:scale-105">
// //                 Access Portal
// //                 <ArrowRight className="ml-2 w-5 h-5" />
// //               </Button>
// //             </motion.div>
// //           </motion.div>

// //           {/* RIGHT: ANIMATED BENTO LAYOUT */}
// //           <motion.div 
// //             initial={{ opacity: 0, x: 50 }}
// //             animate={{ opacity: 1, x: 0 }}
// //             transition={{ duration: 0.8, delay: 0.2 }}
// //             className="lg:col-span-6 relative w-full h-[500px] sm:h-[600px] flex items-center justify-center z-10 mt-10 lg:mt-0"
// //           >
// //             <div className="absolute right-0 top-10 w-[80%] h-[75%] bg-white/60 backdrop-blur-xl border border-sky-200 rounded-[2.5rem] shadow-[0_0_50px_rgba(56,189,248,0.15)] rotate-6 transition-transform duration-700 hover:rotate-3 z-0"></div>

// //             <div className="absolute left-0 sm:left-10 z-10 w-[85%] h-[80%] rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(2,132,199,0.2)] border border-sky-100 transition-transform duration-700 hover:-translate-y-2 group">
// //               <Image
// //                 src="/b2.jpg"
// //                 alt="Child health care at MTC"
// //                 fill
// //                 className="object-cover transition-transform duration-700 group-hover:scale-105"
// //                 priority
// //               />
// //               <div className="absolute inset-0 bg-gradient-to-t from-sky-100/80 via-sky-100/10 to-transparent"></div>
// //             </div>

// //             {/* Floating Stats */}
// //             <motion.div 
// //               animate={{ y: [0, -10, 0] }}
// //               transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
// //               className="absolute bottom-4 -right-4 sm:right-4 z-20 bg-white/95 backdrop-blur-xl border border-sky-200 p-5 rounded-3xl shadow-2xl flex items-center gap-4"
// //             >
// //               <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-400 to-sky-500 flex items-center justify-center flex-shrink-0 shadow-inner">
// //                 <Activity className="w-6 h-6 text-white" />
// //               </div>
// //               <div className="pr-2">
// //                 <p className="text-2xl font-black text-sky-900 leading-none">90+</p>
// //                 <p className="text-xs text-sky-600 font-semibold uppercase mt-1">Active Centers</p>
// //               </div>
// //             </motion.div>
// //           </motion.div>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // }

// // // ==========================================
// // // 2. CLINICAL TOOLS & CALCULATORS SECTION
// // // ==========================================
// // function ClinicalTools() {
// //   const [w1, setW1] = useState("");
// //   const [w2, setW2] = useState("");
// //   const [days, setDays] = useState("");
// //   const [rate, setRate] = useState<number | null>(null);

// //   const calculateWeightGain = () => {
// //     const weight1 = parseFloat(w1);
// //     const weight2 = parseFloat(w2);
// //     const d = parseFloat(days);
// //     if (weight1 && weight2 && d && d > 0) {
// //       const result = ((weight2 - weight1) * 1000) / (weight1 * d);
// //       setRate(parseFloat(result.toFixed(2)));
// //     } else {
// //       setRate(null);
// //     }
// //   };

// //   const tools = [
// //     { title: "Z-Score (SD) Calculator", desc: "Instantly calculate WHO standard deviations for weight-for-height and length-for-age.", icon: Scale, color: "text-sky-600", bg: "bg-sky-50 border-sky-200" },
// //     { title: "F-75 / F-100 Feed Planner", desc: "Automated therapeutic milk volume calculations based on current body weight.", icon: Calculator, color: "text-blue-600", bg: "bg-blue-50 border-blue-200" },
// //     { title: "Micronutrient Dosing", desc: "Generate accurate dosing schedules for Vitamin A, Iron, and Folic Acid.", icon: Syringe, color: "text-cyan-600", bg: "bg-cyan-50 border-cyan-200" }
// //   ];

// //   return (
// //     <section className="py-24 bg-white relative z-10 border-t border-sky-100">
// //       <div className="container mx-auto px-6 lg:px-10">
// //         <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="mb-16">
// //           <h2 className="text-3xl md:text-4xl font-bold text-sky-900 mb-4">
// //             Advanced <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-sky-600">Clinical Utilities</span>
// //           </h2>
// //           <p className="text-sky-600 text-lg max-w-2xl">
// //             Built-in calculation tools designed to eliminate manual errors and speed up daily assessments for medical officers.
// //           </p>
// //         </motion.div>

// //         <div className="grid lg:grid-cols-12 gap-8">
// //           <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
// //             {tools.map((tool, idx) => (
// //               <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className={`p-6 rounded-3xl border ${tool.bg} backdrop-blur-sm flex flex-col justify-between`}>
// //                 <div className="mb-4">
// //                   <tool.icon className={`w-8 h-8 ${tool.color} mb-4`} />
// //                   <h3 className="text-xl font-bold text-sky-900 mb-2">{tool.title}</h3>
// //                   <p className="text-sm text-sky-700/80 leading-relaxed">{tool.desc}</p>
// //                 </div>
// //                 <div className="text-xs font-semibold text-sky-500 uppercase tracking-widest mt-4">Module Integrated</div>
// //               </motion.div>
// //             ))}
// //           </div>

// //           <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="lg:col-span-5 bg-sky-50/50 border border-sky-200 p-8 rounded-[2rem] shadow-xl relative overflow-hidden">
// //             <div className="absolute top-0 right-0 w-32 h-32 bg-sky-400/10 blur-3xl rounded-full pointer-events-none"></div>
// //             <div className="flex items-center gap-3 mb-6">
// //               <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center shadow-lg">
// //                 <TrendingUp className="w-5 h-5 text-white" />
// //               </div>
// //               <h3 className="text-2xl font-bold text-sky-900">Weight Gain Rate</h3>
// //             </div>

// //             <div className="space-y-4 relative z-10">
// //               <div className="grid grid-cols-2 gap-4">
// //                 <div>
// //                   <label className="text-xs font-medium text-sky-700 mb-1 block">W1 (Initial kg)</label>
// //                   <input type="number" value={w1} onChange={(e) => setW1(e.target.value)} className="w-full bg-white border border-sky-200 rounded-xl px-4 py-3 text-sky-900 focus:outline-none focus:border-sky-400 transition-colors shadow-sm" placeholder="e.g. 5.2" />
// //                 </div>
// //                 <div>
// //                   <label className="text-xs font-medium text-sky-700 mb-1 block">W2 (Current kg)</label>
// //                   <input type="number" value={w2} onChange={(e) => setW2(e.target.value)} className="w-full bg-white border border-sky-200 rounded-xl px-4 py-3 text-sky-900 focus:outline-none focus:border-sky-400 transition-colors shadow-sm" placeholder="e.g. 5.8" />
// //                 </div>
// //               </div>
// //               <div>
// //                 <label className="text-xs font-medium text-sky-700 mb-1 block">Days between measurements</label>
// //                 <input type="number" value={days} onChange={(e) => setDays(e.target.value)} className="w-full bg-white border border-sky-200 rounded-xl px-4 py-3 text-sky-900 focus:outline-none focus:border-sky-400 transition-colors shadow-sm" placeholder="e.g. 7" />
// //               </div>

// //               <Button onClick={calculateWeightGain} className="w-full mt-2 h-12 bg-sky-100 hover:bg-sky-200 text-sky-800 rounded-xl border border-sky-200 transition-colors shadow-sm">
// //                 Calculate Rate
// //               </Button>

// //               {rate !== null && (
// //                 <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 p-4 bg-gradient-to-br from-sky-100 to-blue-100 border border-sky-300 rounded-xl text-center shadow-inner">
// //                   <p className="text-sm text-sky-700 font-medium mb-1">Rate of Weight Gain</p>
// //                   <p className="text-3xl font-black text-sky-600">{rate} <span className="text-sm font-medium text-sky-500">g/kg/day</span></p>
// //                   {rate >= 5 ? (
// //                     <p className="text-xs text-emerald-600 mt-2 font-semibold flex items-center justify-center gap-1">Target Met (≥ 5g/kg/day)</p>
// //                   ) : (
// //                     <p className="text-xs text-red-500 mt-2 font-semibold">Below Target Range</p>
// //                   )}
// //                 </motion.div>
// //               )}
// //             </div>
// //           </motion.div>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // }

// // // ==========================================
// // // 3. FEATURES SECTION
// // // ==========================================
// // function Features() {
// //   const features = [
// //     { title: "Real-time Bed Tracking", description: "Monitor bed availability across all 90+ MTCs with live updates.", icon: MapPin, color: "from-sky-400 to-blue-500" },
// //     { title: "Patient Monitoring", description: "Track treatment progress and recovery metrics for every admitted child.", icon: HeartPulse, color: "from-cyan-400 to-sky-500" },
// //     { title: "Automated Reporting", description: "Generate district-wise, automated compliance reports.", icon: LineChart, color: "from-blue-400 to-indigo-500" },
// //     { title: "Centralized Database", description: "Secure, encrypted storage of patient history and follow-up schedules.", icon: Database, color: "from-sky-300 to-cyan-500" }
// //   ];

// //   return (
// //     <section className="py-24 bg-sky-50 relative z-10">
// //       <div className="container mx-auto px-6 lg:px-10">
// //         <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="text-center max-w-2xl mx-auto mb-16">
// //           <h2 className="text-3xl md:text-4xl font-bold text-sky-900 mb-4">
// //             Empowering Health Officials with <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500">Actionable Data</span>
// //           </h2>
// //         </motion.div>

// //         <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
// //           {features.map((feature, idx) => (
// //             <motion.div key={idx} variants={fadeUp} className="bg-white/80 border border-sky-100 p-6 rounded-3xl hover:bg-white transition-colors group cursor-default shadow-sm hover:shadow-md">
// //               <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
// //                 <feature.icon className="w-6 h-6 text-white" />
// //               </div>
// //               <h3 className="text-xl font-semibold text-sky-900 mb-3">{feature.title}</h3>
// //               <p className="text-sm text-sky-700/80 leading-relaxed">{feature.description}</p>
// //             </motion.div>
// //           ))}
// //         </motion.div>
// //       </div>
// //     </section>
// //   );
// // }

// // // ==========================================
// // // 4. SPOTLIGHT SECTION (News & Updates)
// // // ==========================================
// // function Spotlight() {
// //   return (
// //     <section className="py-24 bg-white relative z-10 border-t border-sky-100">
// //       <div className="container mx-auto px-6 lg:px-10">
// //         <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="mb-12">
// //           <h2 className="text-3xl md:text-4xl font-bold text-sky-900">
// //             Information <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">Spotlight</span>
// //           </h2>
// //         </motion.div>

// //         <motion.div 
// //           variants={staggerContainer} 
// //           initial="hidden" 
// //           whileInView="show" 
// //           viewport={{ once: true }} 
// //           className="grid md:grid-cols-3 gap-6"
// //         >
// //           {/* Spotlight Main Accent Card */}
// //           <motion.div variants={fadeUp} className="bg-gradient-to-br from-sky-500 to-blue-600 rounded-[2rem] p-8 flex flex-col justify-center relative overflow-hidden group cursor-pointer shadow-xl">
// //             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
// //             <div className="relative z-10 flex flex-col items-center text-center">
// //               <h3 className="text-4xl font-black text-white mb-2">Spotlight</h3>
// //               <p className="text-sky-100 font-medium mb-8">The Latest Updates</p>
// //               <div className="flex items-center gap-2 text-white font-bold tracking-wide group-hover:translate-x-2 transition-transform">
// //                 Explore All <ArrowRightCircle className="w-6 h-6" />
// //               </div>
// //             </div>
// //           </motion.div>

// //           {/* Article Card 1 */}
// //           <motion.div variants={fadeUp} className="bg-sky-50 border border-sky-100 rounded-[2rem] overflow-hidden group cursor-pointer hover:border-sky-400 transition-colors shadow-sm hover:shadow-lg flex flex-col">
// //             <div className="relative h-48 w-full overflow-hidden">
// //               <Image 
// //                 src="/b1.jpg" 
// //                 alt="Anthropometry Measurement" 
// //                 fill 
// //                 className="object-cover group-hover:scale-105 transition-transform duration-700" 
// //               />
// //             </div>
// //             <div className="p-6 flex flex-col flex-1 relative">
// //               <h4 className="text-lg font-bold text-sky-700 mb-3 line-clamp-2">
// //                 Treatment at Malnutrition Treatment Centre
// //               </h4>
// //               <p className="text-sm text-sky-600 line-clamp-3 mb-4">
// //                 Once the child is diagnosed through anthropometry examination as SAM, the child gets admitted to MTC ...
// //               </p>
// //               <div className="mt-auto flex items-center justify-between text-xs font-semibold text-sky-500/80">
// //                 <span>11-Jun-2021 10:00 AM</span>
// //                 <ChevronRight className="w-5 h-5 text-sky-500" />
// //               </div>
// //             </div>
// //           </motion.div>

// //           {/* Article Card 2 */}
// //           <motion.div variants={fadeUp} className="bg-sky-50 border border-sky-100 rounded-[2rem] overflow-hidden group cursor-pointer hover:border-sky-400 transition-colors shadow-sm hover:shadow-lg flex flex-col">
// //             <div className="relative h-48 w-full overflow-hidden">
// //               <Image 
// //                 src="/b2.jpg" 
// //                 alt="Mother and Child" 
// //                 fill 
// //                 className="object-cover group-hover:scale-105 transition-transform duration-700" 
// //               />
// //             </div>
// //             <div className="p-6 flex flex-col flex-1 relative">
// //               <h4 className="text-lg font-bold text-sky-700 mb-3 line-clamp-2">
// //                 What is Malnutrition Treatment Centre?
// //               </h4>
// //               <p className="text-sm text-sky-600 line-clamp-3 mb-4">
// //                 A facility-based unit providing medical and nutritional therapeutic care for children suffering from severe acute malnutrition...
// //               </p>
// //               <div className="mt-auto flex items-center justify-between text-xs font-semibold text-sky-500/80">
// //                 <span>Information Guide</span>
// //                 <ChevronRight className="w-5 h-5 text-sky-500" />
// //               </div>
// //             </div>
// //           </motion.div>

// //         </motion.div>
// //       </div>
// //     </section>
// //   );
// // }

// // // ==========================================
// // // 5. IMPACT STATS SECTION
// // // ==========================================
// // function ImpactStats() {
// //   return (
// //     <section className="py-20 bg-sky-500 relative z-10 border-y border-sky-400">
// //       <div className="container relative mx-auto px-6 lg:px-10 z-10">
// //         <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-x divide-sky-400">
// //           <div className="text-center px-4">
// //             <h4 className="text-4xl lg:text-5xl font-black text-white mb-2">24</h4>
// //             <p className="text-sky-100 font-semibold uppercase tracking-wider text-sm">Districts</p>
// //           </div>
// //           <div className="text-center px-4">
// //             <h4 className="text-4xl lg:text-5xl font-black text-white mb-2">1.2k+</h4>
// //             <p className="text-sky-100 font-semibold uppercase tracking-wider text-sm">Total Beds</p>
// //           </div>
// //           <div className="text-center px-4">
// //             <h4 className="text-4xl lg:text-5xl font-black text-white mb-2">85%</h4>
// //             <p className="text-sky-100 font-semibold uppercase tracking-wider text-sm">Recovery</p>
// //           </div>
// //           <div className="text-center px-4">
// //             <h4 className="text-4xl lg:text-5xl font-black text-white mb-2">10k+</h4>
// //             <p className="text-sky-100 font-semibold uppercase tracking-wider text-sm">Lives Saved</p>
// //           </div>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // }

// // // ==========================================
// // // 6. ANIMATED PARTNERS MARQUEE SECTION
// // // ==========================================
// // function Partners() {
// //   const baseLogos = [
// //     { src: "/logo-jharkhand-govt.png", alt: "Government of Jharkhand", width: 75, height: 75 },
// //     { src: "/logo_1.png", alt: "Centre of Excellence for Management of Severe Acute Malnutrition (CoE-SAM) Network", width: 340, height: 75, isWide: true },
// //     { src: "/logo_2.png", alt: "National Centre of Excellence and Advanced Research on Diets", width: 310, height: 75, isWide: true },
// //     { src: "/logo_3.png", alt: "ICMR - National Institute of Nutrition", width: 240, height: 75, isWide: true },
// //     { src: "/logo_4.png", alt: "Partner 4", width: 240, height: 75, isWide: true },
// //     { src: "/logo_5.png", alt: "Partner 5", width: 240, height: 75, isWide: true },
// //     { src: "/logo_6.png", alt: "Partner 6", width: 240, height: 75, isWide: true },
// //     { src: "/logo_7.png", alt: "Partner 7", width: 240, height: 75, isWide: true },
// //     { src: "/logo_8.png", alt: "Partner 8", width: 240, height: 75, isWide: true },
// //     { src: "/logo_9.png", alt: "Partner 9", width: 240, height: 75, isWide: true },
// //     { src: "/logo_10.png", alt: "Partner 10", width: 240, height: 75, isWide: true }
// //   ];

// //   // We only need two sets for a perfect 0% to -50% seamless loop
// //   const marqueeLogos = [...baseLogos, ...baseLogos];

// //   return (
// //     <section className="bg-white py-12 border-t border-sky-100 relative z-20 overflow-hidden select-none">
// //       <div className="container mx-auto px-6 lg:px-10 mb-4 hidden">
// //         <h4 className="text-xs font-bold text-sky-400 uppercase tracking-widest text-center">In Collaboration With</h4>
// //       </div>
      
// //       {/* Marquee Wrapper Container */}
// //       <div className="flex w-full relative">
// //         {/* Soft edge gradients for a fading enterprise look */}
// //         <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
// //         <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

// //         <motion.div 
// //           className="flex items-center gap-16 md:gap-24 flex-nowrap w-max"
// //           animate={{ x: ["0%", "-50%"] }}
// //           transition={{
// //             ease: "linear",
// //             duration: 40, 
// //             repeat: Infinity,
// //           }}
// //         >
// //           {marqueeLogos.map((logo, index) => (
// //             <div 
// //               key={index} 
// //               className={`relative h-16 flex-shrink-0 flex items-center justify-center transition-all duration-300 ${
// //                 logo.isWide ? "w-64 md:w-80" : "w-16 md:w-20"
// //               }`}
// //             >
// //               <Image 
// //                 src={logo.src} 
// //                 alt={logo.alt} 
// //                 fill 
// //                 className="object-contain" 
// //               />
// //             </div>
// //           ))}
// //         </motion.div>
// //       </div>
// //     </section>
// //   );
// // }

// // // ==========================================
// // // MAIN PAGE EXPORT
// // // ==========================================
// // export default function Home() {
// //   return (
// //     <main className="min-h-screen bg-sky-50 font-sans selection:bg-sky-400/30">
// //       <Hero />
// //       <ClinicalTools />
// //       <Features />
// //       <Spotlight />
// //       <ImpactStats />
// //       <Partners />
// //     </main>
// //   );
// // }

// "use client";

// import React from "react";
// import Image from "next/image";
// import { motion, type Variants } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { 
//   ArrowRight, 
//   ShieldCheck, 
//   Activity, 
//   LineChart, 
//   Database, 
//   MapPin, 
//   HeartPulse, 
//   ArrowRightCircle,
//   ChevronRight
// } from "lucide-react";

// // ==========================================
// // ANIMATION VARIANTS
// // ==========================================
// const staggerContainer: Variants = {
//   hidden: { opacity: 0 },
//   show: {
//     opacity: 1,
//     transition: { staggerChildren: 0.15 }
//   }
// };

// const fadeUp: Variants = {
//   hidden: { opacity: 0, y: 30 },
//   show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
// };

// // ==========================================
// // 1. HERO SECTION
// // ==========================================
// function Hero() {
//   return (
//     <section id="home" className="relative w-full overflow-hidden bg-sky-50 min-h-[90vh] flex items-center">
//       {/* ====== BACKGROUND MESH ====== */}
//       <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
//         <Image
//           src="/b1.jpg"
//           alt="Background Texture"
//           fill
//           className="object-cover opacity-5 mix-blend-overlay grayscale"
//           priority
//         />
//         <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-sky-300/40 blur-[120px] animate-pulse" style={{ animationDuration: '8s' }}></div>
//         <div className="absolute bottom-[-20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-white/60 blur-[120px] animate-pulse" style={{ animationDuration: '10s' }}></div>
//       </div>

//       <div className="container relative z-10 mx-auto px-6 lg:px-10 py-20">
//         <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
//           {/* LEFT: TYPOGRAPHY & ACTIONS */}
//           <motion.div 
//             variants={staggerContainer}
//             initial="hidden"
//             animate="show"
//             className="lg:col-span-6 flex flex-col items-start space-y-8 z-20"
//           >
//             <motion.div variants={fadeUp} className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-sky-200 shadow-xl">
//               <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-tr from-sky-400 to-sky-500 shadow-inner">
//                 <ShieldCheck className="w-3.5 h-3.5 text-white" />
//               </span>
//               <span className="text-sm font-semibold text-sky-800 tracking-wide">
//                 Govt. of Jharkhand • NHM Initiative
//               </span>
//             </motion.div>

//             <motion.h1 variants={fadeUp} className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-sky-900 leading-[1.1] tracking-tight">
//               Tracking <span className="text-transparent bg-clip-text bg-gradient-to-br from-sky-600 to-sky-400">Health.</span><br />
//               Transforming <br />
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-500 to-blue-500">Lives.</span>
//             </motion.h1>

//             <motion.p variants={fadeUp} className="text-lg text-sky-700 max-w-lg leading-relaxed font-medium">
//               A state-of-the-art digital portal for monitoring and managing Severe Acute Malnutrition (SAM) treatment centers across the state.
//             </motion.p>

//             <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-4 pt-4 w-full sm:w-auto">
//               <Button className="w-full sm:w-auto h-14 px-8 rounded-2xl bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-white text-lg font-bold shadow-[0_0_40px_-10px_rgba(56,189,248,0.4)] border-none transition-all hover:scale-105">
//                 Access Portal
//                 <ArrowRight className="ml-2 w-5 h-5" />
//               </Button>
//             </motion.div>
//           </motion.div>

//           {/* RIGHT: ANIMATED BENTO LAYOUT */}
//           <motion.div 
//             initial={{ opacity: 0, x: 50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             className="lg:col-span-6 relative w-full h-[500px] sm:h-[600px] flex items-center justify-center z-10 mt-10 lg:mt-0"
//           >
//             <div className="absolute right-0 top-10 w-[80%] h-[75%] bg-white/60 backdrop-blur-xl border border-sky-200 rounded-[2.5rem] shadow-[0_0_50px_rgba(56,189,248,0.15)] rotate-6 transition-transform duration-700 hover:rotate-3 z-0"></div>

//             <div className="absolute left-0 sm:left-10 z-10 w-[85%] h-[80%] rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(2,132,199,0.2)] border border-sky-100 transition-transform duration-700 hover:-translate-y-2 group">
//               <Image
//                 src="/b2.jpg"
//                 alt="Child health care at MTC"
//                 fill
//                 className="object-cover transition-transform duration-700 group-hover:scale-105"
//                 priority
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-sky-100/80 via-sky-100/10 to-transparent"></div>
//             </div>

//             {/* Floating Stats */}
//             <motion.div 
//               animate={{ y: [0, -10, 0] }}
//               transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
//               className="absolute bottom-4 -right-4 sm:right-4 z-20 bg-white/95 backdrop-blur-xl border border-sky-200 p-5 rounded-3xl shadow-2xl flex items-center gap-4"
//             >
//               <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-400 to-sky-500 flex items-center justify-center flex-shrink-0 shadow-inner">
//                 <Activity className="w-6 h-6 text-white" />
//               </div>
//               <div className="pr-2">
//                 <p className="text-2xl font-black text-sky-900 leading-none">90+</p>
//                 <p className="text-xs text-sky-600 font-semibold uppercase mt-1">Active Centers</p>
//               </div>
//             </motion.div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// }

// // ==========================================
// // 2. FEATURES SECTION
// // ==========================================
// function Features() {
//   const features = [
//     { title: "Real-time Bed Tracking", description: "Monitor bed availability across all 90+ MTCs with live updates.", icon: MapPin, color: "from-sky-400 to-blue-500" },
//     { title: "Patient Monitoring", description: "Track treatment progress and recovery metrics for every admitted child.", icon: HeartPulse, color: "from-cyan-400 to-sky-500" },
//     { title: "Automated Reporting", description: "Generate district-wise, automated compliance reports.", icon: LineChart, color: "from-blue-400 to-indigo-500" },
//     { title: "Centralized Database", description: "Secure, encrypted storage of patient history and follow-up schedules.", icon: Database, color: "from-sky-300 to-cyan-500" }
//   ];

//   return (
//     <section className="py-24 bg-sky-50 relative z-10 border-t border-sky-100">
//       <div className="container mx-auto px-6 lg:px-10">
//         <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="text-center max-w-2xl mx-auto mb-16">
//           <h2 className="text-3xl md:text-4xl font-bold text-sky-900 mb-4">
//             Empowering Health Officials with <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500">Actionable Data</span>
//           </h2>
//         </motion.div>

//         <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {features.map((feature, idx) => (
//             <motion.div key={idx} variants={fadeUp} className="bg-white/80 border border-sky-100 p-6 rounded-3xl hover:bg-white transition-colors group cursor-default shadow-sm hover:shadow-md">
//               <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
//                 <feature.icon className="w-6 h-6 text-white" />
//               </div>
//               <h3 className="text-xl font-semibold text-sky-900 mb-3">{feature.title}</h3>
//               <p className="text-sm text-sky-700/80 leading-relaxed">{feature.description}</p>
//             </motion.div>
//           ))}
//         </motion.div>
//       </div>
//     </section>
//   );
// }

// // ==========================================
// // 3. SPOTLIGHT SECTION (News & Updates)
// // ==========================================
// function Spotlight() {
//   return (
//     <section className="py-24 bg-white relative z-10 border-t border-sky-100">
//       <div className="container mx-auto px-6 lg:px-10">
//         <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="mb-12">
//           <h2 className="text-3xl md:text-4xl font-bold text-sky-900">
//             Information <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">Spotlight</span>
//           </h2>
//         </motion.div>

//         <motion.div 
//           variants={staggerContainer} 
//           initial="hidden" 
//           whileInView="show" 
//           viewport={{ once: true }} 
//           className="grid md:grid-cols-3 gap-6"
//         >
//           {/* Spotlight Main Accent Card */}
//           <motion.div variants={fadeUp} className="bg-gradient-to-br from-sky-500 to-blue-600 rounded-[2rem] p-8 flex flex-col justify-center relative overflow-hidden group cursor-pointer shadow-xl">
//             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
//             <div className="relative z-10 flex flex-col items-center text-center">
//               <h3 className="text-4xl font-black text-white mb-2">Spotlight</h3>
//               <p className="text-sky-100 font-medium mb-8">The Latest Updates</p>
//               <div className="flex items-center gap-2 text-white font-bold tracking-wide group-hover:translate-x-2 transition-transform">
//                 Explore All <ArrowRightCircle className="w-6 h-6" />
//               </div>
//             </div>
//           </motion.div>

//           {/* Article Card 1 */}
//           <motion.div variants={fadeUp} className="bg-sky-50 border border-sky-100 rounded-[2rem] overflow-hidden group cursor-pointer hover:border-sky-400 transition-colors shadow-sm hover:shadow-lg flex flex-col">
//             <div className="relative h-48 w-full overflow-hidden">
//               <Image 
//                 src="/b1.jpg" 
//                 alt="Anthropometry Measurement" 
//                 fill 
//                 className="object-cover group-hover:scale-105 transition-transform duration-700" 
//               />
//             </div>
//             <div className="p-6 flex flex-col flex-1 relative">
//               <h4 className="text-lg font-bold text-sky-700 mb-3 line-clamp-2">
//                 Treatment at Malnutrition Treatment Centre
//               </h4>
//               <p className="text-sm text-sky-600 line-clamp-3 mb-4">
//                 Once the child is diagnosed through anthropometry examination as SAM, the child gets admitted to MTC ...
//               </p>
//               <div className="mt-auto flex items-center justify-between text-xs font-semibold text-sky-500/80">
//                 <span>11-Jun-2021 10:00 AM</span>
//                 <ChevronRight className="w-5 h-5 text-sky-500" />
//               </div>
//             </div>
//           </motion.div>

//           {/* Article Card 2 */}
//           <motion.div variants={fadeUp} className="bg-sky-50 border border-sky-100 rounded-[2rem] overflow-hidden group cursor-pointer hover:border-sky-400 transition-colors shadow-sm hover:shadow-lg flex flex-col">
//             <div className="relative h-48 w-full overflow-hidden">
//               <Image 
//                 src="/b2.jpg" 
//                 alt="Mother and Child" 
//                 fill 
//                 className="object-cover group-hover:scale-105 transition-transform duration-700" 
//               />
//             </div>
//             <div className="p-6 flex flex-col flex-1 relative">
//               <h4 className="text-lg font-bold text-sky-700 mb-3 line-clamp-2">
//                 What is Malnutrition Treatment Centre?
//               </h4>
//               <p className="text-sm text-sky-600 line-clamp-3 mb-4">
//                 A facility-based unit providing medical and nutritional therapeutic care for children suffering from severe acute malnutrition...
//               </p>
//               <div className="mt-auto flex items-center justify-between text-xs font-semibold text-sky-500/80">
//                 <span>Information Guide</span>
//                 <ChevronRight className="w-5 h-5 text-sky-500" />
//               </div>
//             </div>
//           </motion.div>

//         </motion.div>
//       </div>
//     </section>
//   );
// }

// // ==========================================
// // 4. IMPACT STATS SECTION
// // ==========================================
// function ImpactStats() {
//   return (
//     <section className="py-20 bg-sky-500 relative z-10 border-y border-sky-400">
//       <div className="container relative mx-auto px-6 lg:px-10 z-10">
//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-x divide-sky-400">
//           <div className="text-center px-4">
//             <h4 className="text-4xl lg:text-5xl font-black text-white mb-2">24</h4>
//             <p className="text-sky-100 font-semibold uppercase tracking-wider text-sm">Districts</p>
//           </div>
//           <div className="text-center px-4">
//             <h4 className="text-4xl lg:text-5xl font-black text-white mb-2">1.2k+</h4>
//             <p className="text-sky-100 font-semibold uppercase tracking-wider text-sm">Total Beds</p>
//           </div>
//           <div className="text-center px-4">
//             <h4 className="text-4xl lg:text-5xl font-black text-white mb-2">85%</h4>
//             <p className="text-sky-100 font-semibold uppercase tracking-wider text-sm">Recovery</p>
//           </div>
//           <div className="text-center px-4">
//             <h4 className="text-4xl lg:text-5xl font-black text-white mb-2">10k+</h4>
//             <p className="text-sky-100 font-semibold uppercase tracking-wider text-sm">Lives Saved</p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// // ==========================================
// // 5. ANIMATED PARTNERS MARQUEE SECTION
// // ==========================================
// function Partners() {
//   const baseLogos = [
//     { src: "/logo-jharkhand-govt.png", alt: "Government of Jharkhand", width: 75, height: 75 },
//     { src: "/logo_1.png", alt: "Centre of Excellence for Management of Severe Acute Malnutrition (CoE-SAM) Network", width: 340, height: 75, isWide: true },
//     { src: "/logo_2.png", alt: "National Centre of Excellence and Advanced Research on Diets", width: 310, height: 75, isWide: true },
//     { src: "/logo_3.png", alt: "ICMR - National Institute of Nutrition", width: 240, height: 75, isWide: true },
//     { src: "/logo_4.png", alt: "Partner 4", width: 240, height: 75, isWide: true },
//     { src: "/logo_5.png", alt: "Partner 5", width: 240, height: 75, isWide: true },
//     { src: "/logo_6.png", alt: "Partner 6", width: 240, height: 75, isWide: true },
//     { src: "/logo_7.png", alt: "Partner 7", width: 240, height: 75, isWide: true },
//     { src: "/logo_8.png", alt: "Partner 8", width: 240, height: 75, isWide: true },
//     { src: "/logo_9.png", alt: "Partner 9", width: 240, height: 75, isWide: true },
//     { src: "/logo_10.png", alt: "Partner 10", width: 240, height: 75, isWide: true }
//   ];

//   // We only need two sets for a perfect 0% to -50% seamless loop
//   const marqueeLogos = [...baseLogos, ...baseLogos];

//   return (
//     <section className="bg-white py-12 border-t border-sky-100 relative z-20 overflow-hidden select-none">
//       <div className="container mx-auto px-6 lg:px-10 mb-4 hidden">
//         <h4 className="text-xs font-bold text-sky-400 uppercase tracking-widest text-center">In Collaboration With</h4>
//       </div>
      
//       {/* Marquee Wrapper Container */}
//       <div className="flex w-full relative">
//         {/* Soft edge gradients for a fading enterprise look */}
//         <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
//         <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

//         <motion.div 
//           className="flex items-center gap-16 md:gap-24 flex-nowrap w-max"
//           animate={{ x: ["0%", "-50%"] }}
//           transition={{
//             ease: "linear",
//             duration: 40, 
//             repeat: Infinity,
//           }}
//         >
//           {marqueeLogos.map((logo, index) => (
//             <div 
//               key={index} 
//               className={`relative h-16 flex-shrink-0 flex items-center justify-center transition-all duration-300 ${
//                 logo.isWide ? "w-64 md:w-80" : "w-16 md:w-20"
//               }`}
//             >
//               <Image 
//                 src={logo.src} 
//                 alt={logo.alt} 
//                 fill 
//                 className="object-contain" 
//               />
//             </div>
//           ))}
//         </motion.div>
//       </div>
//     </section>
//   );
// }

// // ==========================================
// // MAIN PAGE EXPORT
// // ==========================================
// export default function Home() {
//   return (
//     <main className="min-h-screen bg-sky-50 font-sans selection:bg-sky-400/30">
//       <Hero />
//       <Features />
//       <Spotlight />
//       <ImpactStats />
//       <Partners />
//     </main>
//   );
// }


"use client";

import React from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  ShieldCheck, 
  Activity, 
  LineChart, 
  Database, 
  MapPin, 
  HeartPulse, 
  ArrowRightCircle,
  ChevronRight
} from "lucide-react";

// ==========================================
// ANIMATION VARIANTS
// ==========================================
const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
};

// ==========================================
// 1. HERO SECTION
// ==========================================
function Hero() {
  return (
    <section id="home" className="relative w-full overflow-hidden bg-sky-50 min-h-[90vh] flex items-center">
      {/* ====== BACKGROUND MESH ====== */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <Image
          src="/b1.jpg"
          alt="Background Texture"
          fill
          className="object-cover opacity-5 mix-blend-overlay grayscale"
          priority
        />
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-sky-300/40 blur-[120px] animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-white/60 blur-[120px] animate-pulse" style={{ animationDuration: '10s' }}></div>
      </div>

      <div className="container relative z-10 mx-auto px-6 lg:px-10 py-20">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT: TYPOGRAPHY & ACTIONS */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="lg:col-span-6 flex flex-col items-start space-y-8 z-20"
          >
            <motion.div variants={fadeUp} className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-sky-200 shadow-xl">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-tr from-sky-400 to-sky-500 shadow-inner">
                <ShieldCheck className="w-3.5 h-3.5 text-white" />
              </span>
              <span className="text-sm font-semibold text-sky-800 tracking-wide">
                Govt. of Jharkhand • NHM Initiative
              </span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-sky-900 leading-[1.1] tracking-tight">
              Tracking <span className="text-transparent bg-clip-text bg-gradient-to-br from-sky-600 to-sky-400">Health.</span><br />
              Transforming <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-500 to-blue-500">Lives.</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-lg text-sky-700 max-w-lg leading-relaxed font-medium">
              A state-of-the-art digital portal for monitoring and managing Severe Acute Malnutrition (SAM) and Moderate Acute Malnutrition (MAM) treatment centers across the state.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-4 pt-4 w-full sm:w-auto">
              <Button className="w-full sm:w-auto h-14 px-8 rounded-2xl bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-white text-lg font-bold shadow-[0_0_40px_-10px_rgba(56,189,248,0.4)] border-none transition-all hover:scale-105">
                Access Portal
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
          </motion.div>

          {/* RIGHT: ANIMATED BENTO LAYOUT */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-6 relative w-full h-[500px] sm:h-[600px] flex items-center justify-center z-10 mt-10 lg:mt-0"
          >
            <div className="absolute right-0 top-10 w-[80%] h-[75%] bg-white/60 backdrop-blur-xl border border-sky-200 rounded-[2.5rem] shadow-[0_0_50px_rgba(56,189,248,0.15)] rotate-6 transition-transform duration-700 hover:rotate-3 z-0"></div>

            <div className="absolute left-0 sm:left-10 z-10 w-[85%] h-[80%] rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(2,132,199,0.2)] border border-sky-100 transition-transform duration-700 hover:-translate-y-2 group">
              <Image
                src="/b2.jpg"
                alt="Child health care at MTC"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sky-100/80 via-sky-100/10 to-transparent"></div>
            </div>

            {/* Floating Stats */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute bottom-4 -right-4 sm:right-4 z-20 bg-white/95 backdrop-blur-xl border border-sky-200 p-5 rounded-3xl shadow-2xl flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-400 to-sky-500 flex items-center justify-center flex-shrink-0 shadow-inner">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div className="pr-2">
                <p className="text-2xl font-black text-sky-900 leading-none">90+</p>
                <p className="text-xs text-sky-600 font-semibold uppercase mt-1">Active Centers</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 2. FEATURES SECTION
// ==========================================
function Features() {
  const features = [
    { title: "Real-time Bed Tracking", description: "Monitor bed availability across all 90+ MTCs with live updates.", icon: MapPin, color: "from-sky-400 to-blue-500" },
    { title: "Patient Monitoring", description: "Track treatment progress and recovery metrics for every admitted child.", icon: HeartPulse, color: "from-cyan-400 to-sky-500" },
    { title: "Automated Reporting", description: "Generate district-wise, automated compliance reports.", icon: LineChart, color: "from-blue-400 to-indigo-500" },
    { title: "Centralized Database", description: "Secure, encrypted storage of patient history and follow-up schedules.", icon: Database, color: "from-sky-300 to-cyan-500" }
  ];

  return (
    <section className="py-24 bg-sky-50 relative z-10 border-t border-sky-100">
      <div className="container mx-auto px-6 lg:px-10">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-sky-900 mb-4">
            Empowering Health Officials with <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500">Actionable Data</span>
          </h2>
        </motion.div>

        <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <motion.div key={idx} variants={fadeUp} className="bg-white/80 border border-sky-100 p-6 rounded-3xl hover:bg-white transition-colors group cursor-default shadow-sm hover:shadow-md">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-sky-900 mb-3">{feature.title}</h3>
              <p className="text-sm text-sky-700/80 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ==========================================
// 3. SPOTLIGHT SECTION (News & Updates)
// ==========================================
function Spotlight() {
  return (
    <section className="py-24 bg-white relative z-10 border-t border-sky-100">
      <div className="container mx-auto px-6 lg:px-10">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-sky-900">
            Information <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">Spotlight</span>
          </h2>
        </motion.div>

        <motion.div 
          variants={staggerContainer} 
          initial="hidden" 
          whileInView="show" 
          viewport={{ once: true }} 
          className="grid md:grid-cols-3 gap-6"
        >
          {/* Spotlight Main Accent Card */}
          <motion.div variants={fadeUp} className="bg-gradient-to-br from-sky-500 to-blue-600 rounded-[2rem] p-8 flex flex-col justify-center relative overflow-hidden group cursor-pointer shadow-xl">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="relative z-10 flex flex-col items-center text-center">
              <h3 className="text-4xl font-black text-white mb-2">Spotlight</h3>
              <p className="text-sky-100 font-medium mb-8">The Latest Updates</p>
              <div className="flex items-center gap-2 text-white font-bold tracking-wide group-hover:translate-x-2 transition-transform">
                Explore All <ArrowRightCircle className="w-6 h-6" />
              </div>
            </div>
          </motion.div>

          {/* Article Card 1 */}
          <motion.div variants={fadeUp} className="bg-sky-50 border border-sky-100 rounded-[2rem] overflow-hidden group cursor-pointer hover:border-sky-400 transition-colors shadow-sm hover:shadow-lg flex flex-col">
            <div className="relative h-48 w-full overflow-hidden">
              <Image 
                src="/b1.jpg" 
                alt="Anthropometry Measurement" 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-700" 
              />
            </div>
            <div className="p-6 flex flex-col flex-1 relative">
              <h4 className="text-lg font-bold text-sky-700 mb-3 line-clamp-2">
                Treatment at Malnutrition Treatment Centre
              </h4>
              <p className="text-sm text-sky-600 line-clamp-3 mb-4">
                Once the child is diagnosed through anthropometry examination as SAM, the child gets admitted to MTC ...
              </p>
              <div className="mt-auto flex items-center justify-between text-xs font-semibold text-sky-500/80">
                <span>11-Jun-2021 10:00 AM</span>
                <ChevronRight className="w-5 h-5 text-sky-500" />
              </div>
            </div>
          </motion.div>

          {/* Article Card 2 */}
          <motion.div variants={fadeUp} className="bg-sky-50 border border-sky-100 rounded-[2rem] overflow-hidden group cursor-pointer hover:border-sky-400 transition-colors shadow-sm hover:shadow-lg flex flex-col">
            <div className="relative h-48 w-full overflow-hidden">
              <Image 
                src="/b2.jpg" 
                alt="Mother and Child" 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-700" 
              />
            </div>
            <div className="p-6 flex flex-col flex-1 relative">
              <h4 className="text-lg font-bold text-sky-700 mb-3 line-clamp-2">
                What is Malnutrition Treatment Centre?
              </h4>
              <p className="text-sm text-sky-600 line-clamp-3 mb-4">
                A facility-based unit providing medical and nutritional therapeutic care for children suffering from severe acute malnutrition...
              </p>
              <div className="mt-auto flex items-center justify-between text-xs font-semibold text-sky-500/80">
                <span>Information Guide</span>
                <ChevronRight className="w-5 h-5 text-sky-500" />
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}

// ==========================================
// 4. IMPACT STATS SECTION
// ==========================================
function ImpactStats() {
  return (
    <section className="py-20 bg-sky-500 relative z-10 border-y border-sky-400">
      <div className="container relative mx-auto px-6 lg:px-10 z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-x divide-sky-400">
          <div className="text-center px-4">
            <h4 className="text-4xl lg:text-5xl font-black text-white mb-2">24</h4>
            <p className="text-sky-100 font-semibold uppercase tracking-wider text-sm">Districts</p>
          </div>
          <div className="text-center px-4">
            <h4 className="text-4xl lg:text-5xl font-black text-white mb-2">1.2k+</h4>
            <p className="text-sky-100 font-semibold uppercase tracking-wider text-sm">Total Beds</p>
          </div>
          <div className="text-center px-4">
            <h4 className="text-4xl lg:text-5xl font-black text-white mb-2">85%</h4>
            <p className="text-sky-100 font-semibold uppercase tracking-wider text-sm">Recovery</p>
          </div>
          <div className="text-center px-4">
            <h4 className="text-4xl lg:text-5xl font-black text-white mb-2">10k+</h4>
            <p className="text-sky-100 font-semibold uppercase tracking-wider text-sm">Lives Saved</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 5. ANIMATED PARTNERS MARQUEE SECTION
// ==========================================
function Partners() {
  const baseLogos = [
    { src: "/logo-jharkhand-govt.png", alt: "Government of Jharkhand", width: 75, height: 75 },
    { src: "/logo_1.png", alt: "Centre of Excellence for Management of Severe Acute Malnutrition (CoE-SAM) Network", width: 340, height: 75, isWide: true },
    { src: "/logo_2.png", alt: "National Centre of Excellence and Advanced Research on Diets", width: 310, height: 75, isWide: true },
    { src: "/logo_3.png", alt: "ICMR - National Institute of Nutrition", width: 240, height: 75, isWide: true },
    { src: "/logo_4.png", alt: "Partner 4", width: 240, height: 75, isWide: true },
    { src: "/logo_5.png", alt: "Partner 5", width: 240, height: 75, isWide: true },
    { src: "/logo_6.png", alt: "Partner 6", width: 240, height: 75, isWide: true },
    { src: "/logo_7.png", alt: "Partner 7", width: 240, height: 75, isWide: true },
    { src: "/logo_8.png", alt: "Partner 8", width: 240, height: 75, isWide: true },
    { src: "/logo_9.png", alt: "Partner 9", width: 240, height: 75, isWide: true },
    { src: "/logo_10.png", alt: "Partner 10", width: 240, height: 75, isWide: true }
  ];

  // We only need two sets for a perfect 0% to -50% seamless loop
  const marqueeLogos = [...baseLogos, ...baseLogos];

  return (
    <section className="bg-white py-12 border-t border-sky-100 relative z-20 overflow-hidden select-none">
      <div className="container mx-auto px-6 lg:px-10 mb-4 hidden">
        <h4 className="text-xs font-bold text-sky-400 uppercase tracking-widest text-center">In Collaboration With</h4>
      </div>
      
      {/* Marquee Wrapper Container */}
      <div className="flex w-full relative">
        {/* Soft edge gradients for a fading enterprise look */}
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

        <motion.div 
          className="flex items-center gap-16 md:gap-24 flex-nowrap w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: 40, 
            repeat: Infinity,
          }}
        >
          {marqueeLogos.map((logo, index) => (
            <div 
              key={index} 
              className={`relative h-16 flex-shrink-0 flex items-center justify-center transition-all duration-300 ${
                logo.isWide ? "w-64 md:w-80" : "w-16 md:w-20"
              }`}
            >
              <Image 
                src={logo.src} 
                alt={logo.alt} 
                fill 
                className="object-contain" 
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ==========================================
// MAIN PAGE EXPORT
// ==========================================
export default function Home() {
  return (
    <main className="min-h-screen bg-sky-50 font-sans selection:bg-sky-400/30">
      <Hero />
      <Features />
      <Spotlight />
      <ImpactStats />
      <Partners />
    </main>
  );
}