"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { 
  Calculator, 
  Scale, 
  Syringe, 
  TrendingUp, 
  ChevronRight,
  Activity
} from "lucide-react";

// ==========================================
// ANIMATION VARIANTS
// ==========================================
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

export default function CalculatorsPage() {
  const calculators = [
    {
      title: "Feed Planner",
      description: "Plan and automate therapeutic milk volumes.",
      icon: Calculator,
      gradient: "from-blue-500 to-blue-700",
      shadowHover: "hover:shadow-blue-500/20",
      iconColor: "text-blue-500",
      onClick: () => console.log("OpenFeedPlannerCalculator()")
    },
    {
      title: "Z-Score (SD) Calculator",
      description: "Calculate standard deviations effortlessly.",
      icon: Scale,
      gradient: "from-sky-400 to-sky-600",
      shadowHover: "hover:shadow-sky-500/20",
      iconColor: "text-sky-500",
      onClick: () => console.log("OpenZScoreCalculator()")
    },
    {
      title: "Micronutrient Planner",
      description: "Generate accurate dosing schedules.",
      icon: Syringe,
      gradient: "from-cyan-400 to-teal-500",
      shadowHover: "hover:shadow-cyan-500/20",
      iconColor: "text-cyan-500",
      onClick: () => console.log("OpenMicroPlannerCalculator()")
    },
    {
      title: "Weight Gain Rate",
      description: "Track and calculate daily weight gain rates.",
      icon: TrendingUp,
      gradient: "from-indigo-400 to-indigo-600",
      shadowHover: "hover:shadow-indigo-500/20",
      iconColor: "text-indigo-500",
      onClick: () => console.log("OpenWeightGainCalculator()")
    }
  ];

  return (
    <main className="min-h-screen bg-sky-50 font-sans text-sky-900 selection:bg-sky-200">
      
      {/* PAGE HEADER */}
      <section className="relative pt-24 pb-16 border-b border-sky-100 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/4 w-[40vw] h-[40vw] rounded-full bg-sky-200/40 blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-[30vw] h-[30vw] rounded-full bg-white/60 blur-[100px] pointer-events-none"></div>

        <div className="container relative z-10 mx-auto px-6 lg:px-10 text-center">
          <motion.div initial="hidden" animate="show" variants={fadeUp} className="max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Activity className="w-5 h-5 text-sky-500" />
              <span className="text-sky-600 font-bold tracking-wider uppercase text-sm">Advanced Clinical Utilities</span>
              <Activity className="w-5 h-5 text-sky-500" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-sky-900 mb-6">
              Medical <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600">Calculators</span>
            </h1>
            <p className="text-lg text-sky-700 leading-relaxed font-medium">
              Built-in calculation tools designed to eliminate manual errors and speed up daily assessments for medical officers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CALCULATORS GRID */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-6 lg:px-10">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {calculators.map((calc, idx) => (
              <motion.div 
                key={idx} 
                variants={fadeUp}
                onClick={calc.onClick}
                className={`group cursor-pointer bg-white rounded-[2rem] border border-sky-100 shadow-sm transition-all duration-300 hover:-translate-y-2 ${calc.shadowHover} hover:shadow-2xl flex flex-col overflow-hidden`}
              >
                {/* Visual Header Section (Replacing Image) */}
                <div className={`relative h-40 w-full overflow-hidden bg-gradient-to-br ${calc.gradient}`}>
                  
                  {/* Glassmorphism Badge */}
                  <div className="absolute top-6 left-6 w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 flex items-center justify-center z-10 shadow-inner">
                    <calc.icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Large Decorative Icon */}
                  <calc.icon className="absolute -bottom-6 -right-6 w-40 h-40 text-white opacity-[0.15] transform rotate-12 transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-12" />
                  
                  {/* Subtle Light Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex flex-col flex-1 relative bg-white">
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-sky-950 mb-2">
                      {calc.title}
                    </h4>
                    <p className="text-sm text-sky-700/80 leading-relaxed font-medium">
                      {calc.description}
                    </p>
                  </div>

                  {/* Action Button Area */}
                  <div className="mt-8 flex items-center justify-between border-t border-sky-50 pt-4">
                    <span className={`text-sm font-bold ${calc.iconColor}`}>
                      Open Tool
                    </span>
                    <div className="w-10 h-10 rounded-full bg-sky-50 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 border border-sky-100">
                      <ChevronRight className={`w-5 h-5 ${calc.iconColor}`} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

    </main>
  );
}