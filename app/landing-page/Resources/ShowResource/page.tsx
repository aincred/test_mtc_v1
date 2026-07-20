// "use client";

// import { useState } from "react";
// import { motion, AnimatePresence, Variants } from "framer-motion";
// import { 
//   FileText, 
//   Image as ImageIcon, 
//   Play, 
//   FolderOpen, 
//   ExternalLink,
//   ChevronRight,
//   Download,
//   BookOpen
// } from "lucide-react";

// // ==========================================
// // TYPES & DATA
// // ==========================================
// type Item = {
//   id: string;
//   title: string;
//   mediaType: "pdf" | "image" | "video";
//   mediaUrl: string;
// };

// type Section = {
//   title: string;
//   items: Item[];
// };

// type Category = {
//   name: string;
//   sections: Section[];
// };

// const DATA: Category[] = [
//   {
//     name: "Guidelines & Training Modules",
//     sections: [
//       {
//         title: "Guidelines",
//         items: [
//           { id: "1", title: "FACILITATOR GUIDE FOR FACILITY BASED CARE OF CHILDREN WITH SAM- ENGLISH", mediaType: "pdf", mediaUrl: "/materials/facilitator_guide.pdf" },
//           { id: "2", title: "GUIDELINE FOR ESTABLISHMENT OF NEW 15 MTCS 2016-17", mediaType: "pdf", mediaUrl: "/materials/guideline_establishment.pdf" },
//           { id: "3", title: "IYCF GUIDELINE FOR MTCS DURING COVID-19", mediaType: "pdf", mediaUrl: "/materials/iycf_guideline.pdf" },
//           { id: "4", title: "MODULE-FACILITY BASED MANAGEMENT OF CHILDREN WITH SAM", mediaType: "image", mediaUrl: "/materials/module_hindi.jpg" },
//           { id: "5", title: "MoHFW F-SAM Operational Guidelines on SAM_2011", mediaType: "pdf", mediaUrl: "/materials/f_sam_guidelines.pdf" },
//           { id: "6", title: "MUAC-GUIDELINE", mediaType: "pdf", mediaUrl: "/materials/muac_guideline.pdf" },
//           { id: "7", title: "Guide23", mediaType: "pdf", mediaUrl: "/materials/guide23.pdf" },
//         ],
//       },
//       {
//         title: "Protocols",
//         items: [
//           { id: "8", title: "PROTOCOL POSTER - SET-A", mediaType: "image", mediaUrl: "/materials/protocol_a.jpg" },
//           { id: "9", title: "PROTOCOL POSTER - SET-B", mediaType: "image", mediaUrl: "/materials/protocol_b.jpg" },
//           { id: "10", title: "PROTOCOL POSTER - SET-D", mediaType: "pdf", mediaUrl: "/materials/protocol_d.pdf" },
//         ],
//       },
//       {
//         title: "Manuals",
//         items: [
//           { id: "11", title: "Participant Manual MTC MoHFW", mediaType: "pdf", mediaUrl: "/materials/participant_manual_mtc.pdf" },
//           { id: "12", title: "Participant Manual_ Facility Based Management of Children With SAM", mediaType: "pdf", mediaUrl: "/materials/participant_manual_sam.pdf" },
//           { id: "13", title: "Compendium of Letters", mediaType: "pdf", mediaUrl: "/materials/compendium_letters.pdf" },
//           { id: "14", title: "Discharge Card", mediaType: "pdf", mediaUrl: "/materials/discharge_card.pdf" },
//           { id: "15", title: "List of Malnutrition Treatment Centers", mediaType: "pdf", mediaUrl: "/materials/mtc_list.pdf" },
//           { id: "16", title: "SAM Chart", mediaType: "pdf", mediaUrl: "/materials/sam_chart.pdf" },
//           { id: "17", title: "MTC_MIS_User_Manual for MTC Staff", mediaType: "pdf", mediaUrl: "/materials/mtc_mis_user_manual.pdf" },
//           { id: "18", title: "MTC MIS Manual for State and District Users", mediaType: "pdf", mediaUrl: "/materials/mtc_mis_state_manual.pdf" },
//         ],
//       },
//     ],
//   },
//   {
//     name: "Awareness Generation- IPC",
//     sections: [
//       {
//         title: "MTC",
//         items: [
//           { id: "19", title: "Child Case Sheet", mediaType: "pdf", mediaUrl: "/materials/child_case_sheet.pdf" },
//         ],
//       },
//     ],
//   },
//   {
//     name: "Mass Media",
//     sections: [
//       {
//         title: "Corona Virus",
//         items: [
//           { id: "20", title: "General Nutrition & Lifestyle Tips", mediaType: "pdf", mediaUrl: "/materials/nutrition_tips.pdf" },
//           { id: "21", title: "Does Corona Virus Spread Through Food", mediaType: "pdf", mediaUrl: "/materials/corona_food.pdf" },
//           { id: "22", title: "Alternatives To Fresh Foods In The Time of Covid 19", mediaType: "pdf", mediaUrl: "/materials/alternatives_fresh_foods.pdf" },
//           { id: "23", title: "Can Corona Virus Spread Through Food Packaging?", mediaType: "pdf", mediaUrl: "/materials/corona_food_packaging.pdf" },
//           { id: "24", title: "Covid 19 & Nutrition Myths & Facts", mediaType: "pdf", mediaUrl: "/materials/covid_nutrition_myths.pdf" },
//           { id: "25", title: "Nutrition in Pregnancy During Covid 19", mediaType: "image", mediaUrl: "/materials/nutrition_pregnancy_covid.jpg" },
//         ],
//       },
//       {
//         title: "MTC MIS Training Video",
//         items: [
//           { id: "26", title: "MTC log in and data entry video", mediaType: "video", mediaUrl: "/materials/mtc_login_video.mp4" },
//           { id: "27", title: "MTC MIS State and District user video", mediaType: "video", mediaUrl: "/materials/mtc_state_district_video.mp4" },
//         ],
//       },
//     ],
//   },
//   {
//     name: "Social Media",
//     sections: [
//       {
//         title: "MTC",
//         items: [
//           { id: "28", title: "Communication", mediaType: "image", mediaUrl: "/materials/communication.jpg" },
//           { id: "29", title: "new343", mediaType: "image", mediaUrl: "/materials/new343.jpg" },
//         ],
//       },
//     ],
//   },
//   {
//     name: "Case Studies",
//     sections: [
//       {
//         title: "Case Studies",
//         items: [
//           { id: "30", title: "Case Study Format", mediaType: "pdf", mediaUrl: "/materials/case_study_format.pdf" },
//         ],
//       },
//     ],
//   },
//   {
//     name: "Other",
//     sections: [
//       {
//         title: "MTC",
//         items: [
//           { id: "31", title: "Other Files", mediaType: "pdf", mediaUrl: "/materials/other_files.pdf" },
//         ],
//       },
//     ],
//   },
// ];

// // ==========================================
// // ANIMATION VARIANTS
// // ==========================================
// const fadeUp: Variants = {
//   hidden: { opacity: 0, y: 15 },
//   show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120 } }
// };

// const staggerContainer: Variants = {
//   hidden: { opacity: 0 },
//   show: { opacity: 1, transition: { staggerChildren: 0.08 } }
// };

// const slideIn: Variants = {
//   hidden: { opacity: 0, x: -10 },
//   show: { opacity: 1, x: 0, transition: { type: "tween", ease: "easeOut", duration: 0.2 } }
// };

// // ==========================================
// // HELPER COMPONENTS
// // ==========================================
// const TypeIcon = ({ type }: { type: Item["mediaType"] }) => {
//   switch (type) {
//     case "pdf":
//       return (
//         <div className="w-12 h-12 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-400 border border-rose-500/20 flex-shrink-0 shadow-[0_0_15px_rgba(244,63,94,0.1)]">
//           <FileText className="w-6 h-6" />
//         </div>
//       );
//     case "video":
//       return (
//         <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20 flex-shrink-0 shadow-[0_0_15px_rgba(99,102,241,0.1)]">
//           <Play className="w-6 h-6 ml-0.5" />
//         </div>
//       );
//     case "image":
//       return (
//         <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20 flex-shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
//           <ImageIcon className="w-6 h-6" />
//         </div>
//       );
//   }
// };

// // ==========================================
// // MAIN COMPONENT
// // ==========================================
// export default function CommunicationMaterialsPage() {
//   const [selectedCategory, setSelectedCategory] = useState<Category>(DATA[0]);

//   return (
//     <main className="min-h-screen bg-slate-950 font-sans text-slate-200 relative overflow-hidden selection:bg-amber-400/30 pb-24">
      
//       {/* BACKGROUND GLOWS */}
//       <div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-violet-900/10 blur-[120px] pointer-events-none"></div>
//       <div className="absolute bottom-[10%] left-[-10%] w-[30vw] h-[30vw] rounded-full bg-amber-500/5 blur-[120px] pointer-events-none"></div>

//       {/* PAGE HEADER */}
//       <section className="relative pt-24 pb-12 z-10">
//         <div className="container mx-auto px-6 lg:px-10">
//           <motion.div initial="hidden" animate="show" variants={fadeUp} className="max-w-3xl">
//             <div className="flex items-center gap-3 mb-4">
//               <div className="h-[2px] w-12 bg-amber-400"></div>
//               <span className="text-amber-400 font-semibold tracking-wider uppercase text-sm">Resource Center</span>
//             </div>
//             <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight">
//               Communication <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Materials</span>
//             </h1>
//             <p className="text-lg text-indigo-100/60 max-w-2xl">
//               Access guidelines, training modules, protocols, and IEC materials for the facility-based management of children with SAM.
//             </p>
//           </motion.div>
//         </div>
//       </section>

//       {/* MAIN CONTENT AREA */}
//       <div className="container mx-auto px-6 lg:px-10 relative z-10">
//         <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          
//           {/* SIDEBAR (CATEGORIES) */}
//           <aside className="w-full lg:w-1/3 xl:w-1/4 lg:sticky lg:top-24 z-20">
//             <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 shadow-2xl">
//               <h2 className="text-xs font-bold text-indigo-200/50 uppercase tracking-widest mb-6 flex items-center gap-2">
//                 <FolderOpen className="w-4 h-4" /> Directories
//               </h2>
//               <ul className="space-y-2">
//                 {DATA.map((cat) => {
//                   const isActive = selectedCategory.name === cat.name;
//                   return (
//                     <li key={cat.name}>
//                       <button
//                         onClick={() => setSelectedCategory(cat)}
//                         className={`w-full text-left px-5 py-3.5 rounded-2xl font-medium transition-all duration-300 flex items-center justify-between group ${
//                           isActive
//                             ? "bg-gradient-to-r from-amber-500/20 to-orange-500/10 border border-amber-500/30 text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.1)]"
//                             : "bg-transparent border border-transparent text-indigo-100/70 hover:bg-white/5 hover:border-white/10 hover:text-white"
//                         }`}
//                       >
//                         <span className="line-clamp-2 pr-2 text-sm lg:text-base leading-tight">
//                           {cat.name}
//                         </span>
//                         <ChevronRight className={`w-4 h-4 flex-shrink-0 transition-transform ${isActive ? "text-amber-400" : "text-white/20 group-hover:text-white/50"}`} />
//                       </button>
//                     </li>
//                   );
//                 })}
//               </ul>
//             </div>
//           </aside>

//           {/* DOCUMENT LIST VIEW */}
//           <main className="flex-1 w-full min-h-[500px]">
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={selectedCategory.name}
//                 variants={staggerContainer}
//                 initial="hidden"
//                 animate="show"
//                 exit={{ opacity: 0, y: -10, transition: { duration: 0.15 } }}
//               >
//                 <div className="mb-8 border-b border-white/10 pb-4">
//                   <h2 className="text-2xl font-bold text-white">{selectedCategory.name}</h2>
//                 </div>

//                 {selectedCategory.sections.length === 0 ? (
//                   <div className="p-16 text-center border border-white/5 bg-white/5 rounded-3xl border-dashed">
//                     <FolderOpen className="w-12 h-12 text-indigo-200/20 mx-auto mb-4" />
//                     <p className="text-indigo-200/50">This directory is currently empty.</p>
//                   </div>
//                 ) : (
//                   selectedCategory.sections.map((section) => (
//                     <div key={section.title} className="mb-12 last:mb-0">
//                       <h3 className="text-sm font-bold text-amber-400 uppercase tracking-widest mb-4 flex items-center gap-3">
//                         <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
//                         {section.title}
//                       </h3>

//                       <div className="flex flex-col space-y-3">
//                         {section.items.map((item) => (
//                           <motion.div
//                             variants={slideIn}
//                             key={item.id}
//                             className="group flex flex-col sm:flex-row sm:items-center gap-4 bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 hover:border-white/10 p-4 rounded-2xl transition-all duration-300"
//                           >
//                             {/* Icon & Title Area */}
//                             <div className="flex items-center gap-5 flex-1 min-w-0">
//                               <TypeIcon type={item.mediaType} />
                              
//                               <div className="flex flex-col min-w-0 pr-4">
//                                 <h4 className="text-base font-medium text-white/90 truncate group-hover:text-amber-300 transition-colors">
//                                   {item.title}
//                                 </h4>
//                                 <div className="flex items-center gap-3 mt-1.5">
//                                   <span className="text-[10px] uppercase tracking-widest font-bold text-indigo-200/50">
//                                     {item.mediaType} Document
//                                   </span>
//                                 </div>
//                               </div>
//                             </div>

//                             {/* Action Button Area */}
//                             <div className="sm:ml-auto pt-4 sm:pt-0 border-t border-white/5 sm:border-0">
//                               <a
//                                 href={item.mediaUrl}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-amber-500 text-indigo-100 hover:text-slate-950 text-sm font-semibold px-6 py-3 rounded-xl transition-all duration-300 w-full sm:w-auto"
//                               >
//                                 {item.mediaType === "pdf" ? (
//                                   <><Download size={16} /> Download</>
//                                 ) : item.mediaType === "video" ? (
//                                   <><Play size={16} /> Watch</>
//                                 ) : (
//                                   <><ExternalLink size={16} /> View</>
//                                 )}
//                               </a>
//                             </div>
//                           </motion.div>
//                         ))}
//                       </div>
//                     </div>
//                   ))
//                 )}
//               </motion.div>
//             </AnimatePresence>
//           </main>
//         </div>
//       </div>
//     </main>
//   );
// }

"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { 
  FileText, 
  Image as ImageIcon, 
  Play, 
  FolderOpen, 
  ExternalLink,
  ChevronRight,
  Download
} from "lucide-react";

// ==========================================
// TYPES & DATA
// ==========================================
type Item = {
  id: string;
  title: string;
  mediaType: "pdf" | "image" | "video";
  mediaUrl: string;
};

type Section = {
  title: string;
  items: Item[];
};

type Category = {
  name: string;
  sections: Section[];
};

const DATA: Category[] = [
  {
    name: "Guidelines & Training Modules",
    sections: [
      {
        title: "Guidelines",
        items: [
          { id: "1", title: "FACILITATOR GUIDE FOR FACILITY BASED CARE OF CHILDREN WITH SAM- ENGLISH", mediaType: "pdf", mediaUrl: "/materials/facilitator_guide.pdf" },
          { id: "2", title: "GUIDELINE FOR ESTABLISHMENT OF NEW 15 MTCS 2016-17", mediaType: "pdf", mediaUrl: "/materials/guideline_establishment.pdf" },
          { id: "3", title: "IYCF GUIDELINE FOR MTCS DURING COVID-19", mediaType: "pdf", mediaUrl: "/materials/iycf_guideline.pdf" },
          { id: "4", title: "MODULE-FACILITY BASED MANAGEMENT OF CHILDREN WITH SAM", mediaType: "image", mediaUrl: "/materials/module_hindi.jpg" },
          { id: "5", title: "MoHFW F-SAM Operational Guidelines on SAM_2011", mediaType: "pdf", mediaUrl: "/materials/f_sam_guidelines.pdf" },
          { id: "6", title: "MUAC-GUIDELINE", mediaType: "pdf", mediaUrl: "/materials/muac_guideline.pdf" },
          { id: "7", title: "Guide23", mediaType: "pdf", mediaUrl: "/materials/guide23.pdf" },
        ],
      },
      {
        title: "Protocols",
        items: [
          { id: "8", title: "PROTOCOL POSTER - SET-A", mediaType: "image", mediaUrl: "/materials/protocol_a.jpg" },
          { id: "9", title: "PROTOCOL POSTER - SET-B", mediaType: "image", mediaUrl: "/materials/protocol_b.jpg" },
          { id: "10", title: "PROTOCOL POSTER - SET-D", mediaType: "pdf", mediaUrl: "/materials/protocol_d.pdf" },
        ],
      },
      {
        title: "Manuals",
        items: [
          { id: "11", title: "Participant Manual MTC MoHFW", mediaType: "pdf", mediaUrl: "/materials/participant_manual_mtc.pdf" },
          { id: "12", title: "Participant Manual_ Facility Based Management of Children With SAM", mediaType: "pdf", mediaUrl: "/materials/participant_manual_sam.pdf" },
          { id: "13", title: "Compendium of Letters", mediaType: "pdf", mediaUrl: "/materials/compendium_letters.pdf" },
          { id: "14", title: "Discharge Card", mediaType: "pdf", mediaUrl: "/materials/discharge_card.pdf" },
          { id: "15", title: "List of Malnutrition Treatment Centers", mediaType: "pdf", mediaUrl: "/materials/mtc_list.pdf" },
          { id: "16", title: "SAM Chart", mediaType: "pdf", mediaUrl: "/materials/sam_chart.pdf" },
          { id: "17", title: "MTC_MIS_User_Manual for MTC Staff", mediaType: "pdf", mediaUrl: "/materials/mtc_mis_user_manual.pdf" },
          { id: "18", title: "MTC MIS Manual for State and District Users", mediaType: "pdf", mediaUrl: "/materials/mtc_mis_state_manual.pdf" },
        ],
      },
    ],
  },
  {
    name: "Awareness Generation- IPC",
    sections: [
      {
        title: "MTC",
        items: [
          { id: "19", title: "Child Case Sheet", mediaType: "pdf", mediaUrl: "/materials/child_case_sheet.pdf" },
        ],
      },
    ],
  },
  {
    name: "Mass Media",
    sections: [
      {
        title: "Corona Virus",
        items: [
          { id: "20", title: "General Nutrition & Lifestyle Tips", mediaType: "pdf", mediaUrl: "/materials/nutrition_tips.pdf" },
          { id: "21", title: "Does Corona Virus Spread Through Food", mediaType: "pdf", mediaUrl: "/materials/corona_food.pdf" },
          { id: "22", title: "Alternatives To Fresh Foods In The Time of Covid 19", mediaType: "pdf", mediaUrl: "/materials/alternatives_fresh_foods.pdf" },
          { id: "23", title: "Can Corona Virus Spread Through Food Packaging?", mediaType: "pdf", mediaUrl: "/materials/corona_food_packaging.pdf" },
          { id: "24", title: "Covid 19 & Nutrition Myths & Facts", mediaType: "pdf", mediaUrl: "/materials/covid_nutrition_myths.pdf" },
          { id: "25", title: "Nutrition in Pregnancy During Covid 19", mediaType: "image", mediaUrl: "/materials/nutrition_pregnancy_covid.jpg" },
        ],
      },
      {
        title: "MTC MIS Training Video",
        items: [
          { id: "26", title: "MTC log in and data entry video", mediaType: "video", mediaUrl: "/materials/mtc_login_video.mp4" },
          { id: "27", title: "MTC MIS State and District user video", mediaType: "video", mediaUrl: "/materials/mtc_state_district_video.mp4" },
        ],
      },
    ],
  },
  {
    name: "Social Media",
    sections: [
      {
        title: "MTC",
        items: [
          { id: "28", title: "Communication", mediaType: "image", mediaUrl: "/materials/communication.jpg" },
          { id: "29", title: "new343", mediaType: "image", mediaUrl: "/materials/new343.jpg" },
        ],
      },
    ],
  },
  {
    name: "Case Studies",
    sections: [
      {
        title: "Case Studies",
        items: [
          { id: "30", title: "Case Study Format", mediaType: "pdf", mediaUrl: "/materials/case_study_format.pdf" },
        ],
      },
    ],
  },
  {
    name: "Other",
    sections: [
      {
        title: "MTC",
        items: [
          { id: "31", title: "Other Files", mediaType: "pdf", mediaUrl: "/materials/other_files.pdf" },
        ],
      },
    ],
  },
];

// ==========================================
// ANIMATION VARIANTS
// ==========================================
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120 } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const slideIn: Variants = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0, transition: { type: "tween", ease: "easeOut", duration: 0.2 } }
};

// ==========================================
// HELPER COMPONENTS
// ==========================================
const TypeIcon = ({ type }: { type: Item["mediaType"] }) => {
  switch (type) {
    case "pdf":
      return (
        <div className="w-12 h-12 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600 border border-rose-200 flex-shrink-0 shadow-sm">
          <FileText className="w-6 h-6" />
        </div>
      );
    case "video":
      return (
        <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 border border-indigo-200 flex-shrink-0 shadow-sm">
          <Play className="w-6 h-6 ml-0.5" />
        </div>
      );
    case "image":
      return (
        <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 border border-emerald-200 flex-shrink-0 shadow-sm">
          <ImageIcon className="w-6 h-6" />
        </div>
      );
  }
};

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function CommunicationMaterialsPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>(DATA[0]);

  return (
    <main className="min-h-screen bg-sky-50 font-sans text-sky-900 relative overflow-hidden selection:bg-sky-200 pb-24">
      
      {/* BACKGROUND GLOWS */}
      <div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-sky-300/30 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[10%] left-[-10%] w-[30vw] h-[30vw] rounded-full bg-white/60 blur-[120px] pointer-events-none"></div>

      {/* PAGE HEADER */}
      <section className="relative pt-24 pb-12 z-10 border-b border-sky-100">
        <div className="container mx-auto px-6 lg:px-10">
          <motion.div initial="hidden" animate="show" variants={fadeUp} className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[2px] w-12 bg-sky-500"></div>
              <span className="text-sky-600 font-bold tracking-wider uppercase text-sm">Resource Center</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-sky-900 mb-4 tracking-tight">
              Communication <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600">Materials</span>
            </h1>
            <p className="text-lg text-sky-700 font-medium max-w-2xl leading-relaxed">
              Access guidelines, training modules, protocols, and IEC materials for the facility-based management of children with SAM.
            </p>
          </motion.div>
        </div>
      </section>

      {/* MAIN CONTENT AREA */}
      <div className="container mx-auto px-6 lg:px-10 relative z-10 mt-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          
          {/* SIDEBAR (CATEGORIES) */}
          <aside className="w-full lg:w-1/3 xl:w-1/4 lg:sticky lg:top-24 z-20">
            <div className="bg-white/80 backdrop-blur-xl border border-sky-200 rounded-[2rem] p-6 shadow-xl">
              <h2 className="text-xs font-bold text-sky-600 uppercase tracking-widest mb-6 flex items-center gap-2">
                <FolderOpen className="w-4 h-4" /> Directories
              </h2>
              <ul className="space-y-2">
                {DATA.map((cat) => {
                  const isActive = selectedCategory.name === cat.name;
                  return (
                    <li key={cat.name}>
                      <button
                        onClick={() => setSelectedCategory(cat)}
                        className={`w-full text-left px-5 py-3.5 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-between group ${
                          isActive
                            ? "bg-sky-100 border border-sky-300 text-sky-900 shadow-sm"
                            : "bg-transparent border border-transparent text-sky-700 hover:bg-sky-50 hover:border-sky-200 hover:text-sky-900"
                        }`}
                      >
                        <span className="line-clamp-2 pr-2 text-sm lg:text-base leading-tight">
                          {cat.name}
                        </span>
                        <ChevronRight className={`w-4 h-4 flex-shrink-0 transition-transform ${isActive ? "text-sky-600" : "text-sky-400 group-hover:text-sky-600"}`} />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>

          {/* DOCUMENT LIST VIEW */}
          <main className="flex-1 w-full min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory.name}
                variants={staggerContainer}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, y: -10, transition: { duration: 0.15 } }}
              >
                <div className="mb-8 border-b border-sky-200 pb-4">
                  <h2 className="text-2xl font-bold text-sky-950">{selectedCategory.name}</h2>
                </div>

                {selectedCategory.sections.length === 0 ? (
                  <div className="p-16 text-center border border-sky-200 bg-sky-100/50 rounded-3xl border-dashed">
                    <FolderOpen className="w-12 h-12 text-sky-400 mx-auto mb-4" />
                    <p className="text-sky-600 font-medium">This directory is currently empty.</p>
                  </div>
                ) : (
                  selectedCategory.sections.map((section) => (
                    <div key={section.title} className="mb-12 last:mb-0">
                      <h3 className="text-sm font-bold text-sky-600 uppercase tracking-widest mb-4 flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-sky-500"></span>
                        {section.title}
                      </h3>

                      <div className="flex flex-col space-y-4">
                        {section.items.map((item) => (
                          <motion.div
                            variants={slideIn}
                            key={item.id}
                            className="group flex flex-col sm:flex-row sm:items-center gap-4 bg-white hover:bg-sky-50 border border-sky-100 hover:border-sky-200 p-4 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
                          >
                            {/* Icon & Title Area */}
                            <div className="flex items-center gap-5 flex-1 min-w-0">
                              <TypeIcon type={item.mediaType} />
                              
                              <div className="flex flex-col min-w-0 pr-4">
                                <h4 className="text-base font-bold text-sky-950 truncate group-hover:text-blue-700 transition-colors">
                                  {item.title}
                                </h4>
                                <div className="flex items-center gap-3 mt-1">
                                  <span className="text-[10px] uppercase tracking-widest font-bold text-sky-500">
                                    {item.mediaType} Document
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Action Button Area */}
                            <div className="sm:ml-auto pt-4 sm:pt-0 border-t border-sky-100 sm:border-0">
                              <a
                                href={item.mediaUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 bg-sky-50 hover:bg-sky-500 border border-sky-200 hover:border-transparent text-sky-700 hover:text-white text-sm font-bold px-6 py-3 rounded-xl transition-all duration-300 w-full sm:w-auto shadow-sm"
                              >
                                {item.mediaType === "pdf" ? (
                                  <><Download size={16} /> Download</>
                                ) : item.mediaType === "video" ? (
                                  <><Play size={16} /> Watch</>
                                ) : (
                                  <><ExternalLink size={16} /> View</>
                                )}
                              </a>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </main>
  );
}