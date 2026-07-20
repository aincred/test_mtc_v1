// "use client";

// import React, { useState } from "react";
// import Image from "next/image";
// import { motion, AnimatePresence, Variants } from "framer-motion";
// import { X, Maximize2, ImageIcon, Filter } from "lucide-react";

// // ==========================================
// // TYPES & MOCK DATA
// // ==========================================
// type Category = "All" | "Facilities" | "Care & Recovery" | "Training" | "Community Outreach";

// interface GalleryItem {
//   id: string;
//   src: string;
//   category: Category;
//   title: string;
//   description: string;
// }

// const CATEGORIES: Category[] = ["All", "Facilities", "Care & Recovery", "Training", "Community Outreach"];

// // NOTE: Replace the 'src' paths with your actual images placed in the /public/gallery/ folder.
// const GALLERY_DATA: GalleryItem[] = [
//   { id: "1", src: "/b4.jpg", category: "Care & Recovery", title: "Daily Nutritional Assessment", description: "Medical officer tracking the daily weight gain of an admitted child." },
//   { id: "2", src: "/b1.jpg", category: "Facilities", title: "MTC Ward Overview", description: "Clean, sanitized beds prepared for incoming severe acute malnutrition patients." },
//   { id: "3", src: "/director-photo.jpg", category: "Training", title: "State Level Workshop", description: "Capacity building training for medical officers and MTC staff." },
//   { id: "4", src: "/b4.jpg", category: "Community Outreach", title: "Sahiya Field Visit", description: "ASHA workers identifying children in the community for referral." },
//   { id: "5", src: "/b1.jpg", category: "Care & Recovery", title: "Therapeutic Feeding", description: "Administering F-75 therapeutic milk as per protocol." },
//   { id: "6", src: "/b4.jpg", category: "Facilities", title: "Play Therapy Area", description: "Dedicated play area inside the MTC to stimulate cognitive recovery." },
//   { id: "7", src: "/b1.jpg", category: "Training", title: "Data Entry Training", description: "District managers receiving training on the new MTC-MIS portal." },
//   { id: "8", src: "/b4.jpg", category: "Care & Recovery", title: "Discharge Counseling", description: "Counseling mothers on dietary diversity before patient discharge." },
// ];

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
// export default function GalleryPage() {
//   const [activeCategory, setActiveCategory] = useState<Category>("All");
//   const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

//   const filteredImages = activeCategory === "All" 
//     ? GALLERY_DATA 
//     : GALLERY_DATA.filter(img => img.category === activeCategory);

//   return (
//     <main className="min-h-screen bg-slate-950 font-sans text-slate-200 relative overflow-hidden selection:bg-amber-400/30 pb-24">
      
//       {/* BACKGROUND GLOWS */}
//       <div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-violet-900/10 blur-[120px] pointer-events-none"></div>
//       <div className="absolute bottom-[10%] left-[-10%] w-[30vw] h-[30vw] rounded-full bg-amber-500/5 blur-[120px] pointer-events-none"></div>

//       {/* PAGE HEADER */}
//       <section className="relative pt-24 pb-12 z-10 border-b border-white/5">
//         <div className="container mx-auto px-6 lg:px-10">
//           <motion.div initial="hidden" animate="show" variants={fadeUp} className="max-w-3xl">
//             <div className="flex items-center gap-3 mb-4">
//               <div className="h-[2px] w-12 bg-amber-400"></div>
//               <span className="text-amber-400 font-semibold tracking-wider uppercase text-sm">Visual Impact</span>
//             </div>
//             <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight">
//               Photo <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Gallery</span>
//             </h1>
//             <p className="text-lg text-indigo-100/60 max-w-2xl">
//               Glimpses of Malnutrition Treatment Centers across Jharkhand, showcasing our facilities, training programs, and the path to recovery.
//             </p>
//           </motion.div>
//         </div>
//       </section>

//       {/* FILTERS & GALLERY SECTION */}
//       <section className="container mx-auto px-6 lg:px-10 py-12 relative z-10">
        
//         {/* Category Filters */}
//         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-6">
//           <div className="flex items-center gap-2 text-indigo-200/50 text-sm font-semibold uppercase tracking-widest">
//             <Filter className="w-4 h-4" /> Filter by
//           </div>
          
//           <div className="flex flex-wrap gap-2 sm:gap-3">
//             {CATEGORIES.map((category) => {
//               const isActive = activeCategory === category;
//               return (
//                 <button
//                   key={category}
//                   onClick={() => setActiveCategory(category)}
//                   className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
//                     isActive 
//                       ? "bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-amber-500/40 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.15)]" 
//                       : "bg-white/5 border-white/10 text-indigo-100/70 hover:bg-white/10 hover:text-white"
//                   }`}
//                 >
//                   {category}
//                 </button>
//               );
//             })}
//           </div>
//         </div>

//         {/* Image Grid */}
//         <motion.div 
//           layout
//           variants={staggerContainer}
//           initial="hidden"
//           animate="show"
//           className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
//         >
//           <AnimatePresence mode="popLayout">
//             {filteredImages.map((item) => (
//               <motion.div
//                 layout
//                 key={item.id}
//                 variants={fadeUp}
//                 initial="hidden"
//                 animate="show"
//                 exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
//                 className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer bg-slate-900 border border-white/10 shadow-lg"
//                 onClick={() => setSelectedImage(item)}
//               >
//                 <Image
//                   src={item.src}
//                   alt={item.title}
//                   fill
//                   className="object-cover transition-transform duration-700 group-hover:scale-110"
//                 />
                
//                 {/* Hover Overlay */}
//                 <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
//                   <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
//                     <Maximize2 className="w-4 h-4 text-white" />
//                   </div>
//                   <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 mb-1">
//                     {item.category}
//                   </span>
//                   <h3 className="text-white font-semibold leading-tight">
//                     {item.title}
//                   </h3>
//                 </div>
//               </motion.div>
//             ))}
//           </AnimatePresence>
//         </motion.div>

//         {/* Empty State Fallback */}
//         {filteredImages.length === 0 && (
//           <div className="py-20 text-center flex flex-col items-center justify-center bg-white/5 border border-white/10 border-dashed rounded-3xl">
//             <ImageIcon className="w-12 h-12 text-indigo-200/20 mb-4" />
//             <p className="text-indigo-200/50">No images found in this category.</p>
//           </div>
//         )}

//       </section>

//       {/* LIGHTBOX / MODAL */}
//       <AnimatePresence>
//         {selectedImage && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/90 backdrop-blur-xl"
//             onClick={() => setSelectedImage(null)}
//           >
//             {/* Close Button */}
//             <button 
//               className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-colors z-50"
//               onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
//             >
//               <X className="w-6 h-6" />
//             </button>

//             {/* Modal Content */}
//             <motion.div
//               initial={{ scale: 0.95, opacity: 0, y: 20 }}
//               animate={{ scale: 1, opacity: 1, y: 0 }}
//               exit={{ scale: 0.95, opacity: 0, y: 20 }}
//               transition={{ type: "spring", stiffness: 200, damping: 20 }}
//               className="relative w-full max-w-5xl bg-slate-900 border border-white/10 rounded-2xl sm:rounded-[2rem] overflow-hidden flex flex-col lg:flex-row shadow-2xl"
//               onClick={(e) => e.stopPropagation()} // Prevent clicking modal from closing it
//             >
//               {/* Image Container */}
//               <div className="relative w-full h-[40vh] sm:h-[50vh] lg:h-[70vh] lg:w-2/3 bg-black">
//                 <Image
//                   src={selectedImage.src}
//                   alt={selectedImage.title}
//                   fill
//                   className="object-contain"
//                 />
//               </div>

//               {/* Text Container */}
//               <div className="p-6 sm:p-8 lg:w-1/3 flex flex-col justify-center bg-gradient-to-br from-slate-900 to-slate-950 border-t lg:border-t-0 lg:border-l border-white/10">
//                 <span className="inline-block px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-widest w-fit mb-4">
//                   {selectedImage.category}
//                 </span>
//                 <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 leading-tight">
//                   {selectedImage.title}
//                 </h2>
//                 <p className="text-indigo-100/70 leading-relaxed text-sm sm:text-base">
//                   {selectedImage.description}
//                 </p>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//     </main>
//   );
// }

"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { X, Maximize2, ImageIcon, Filter } from "lucide-react";

// ==========================================
// TYPES & MOCK DATA
// ==========================================
type Category = "All" | "Facilities" | "Care & Recovery" | "Training" | "Community Outreach";

interface GalleryItem {
  id: string;
  src: string;
  category: Category;
  title: string;
  description: string;
}

const CATEGORIES: Category[] = ["All", "Facilities", "Care & Recovery", "Training", "Community Outreach"];

// NOTE: Replace the 'src' paths with your actual images placed in the /public/gallery/ folder.
const GALLERY_DATA: GalleryItem[] = [
  { id: "1", src: "/b4.jpg", category: "Care & Recovery", title: "Daily Nutritional Assessment", description: "Medical officer tracking the daily weight gain of an admitted child." },
  { id: "2", src: "/b1.jpg", category: "Facilities", title: "MTC Ward Overview", description: "Clean, sanitized beds prepared for incoming severe acute malnutrition patients." },
  { id: "3", src: "/director.jpg", category: "Training", title: "State Level Workshop", description: "Capacity building training for medical officers and MTC staff." },
  { id: "4", src: "/b4.jpg", category: "Community Outreach", title: "Sahiya Field Visit", description: "ASHA workers identifying children in the community for referral." },
  { id: "5", src: "/b1.jpg", category: "Care & Recovery", title: "Therapeutic Feeding", description: "Administering F-75 therapeutic milk as per protocol." },
  { id: "6", src: "/b4.jpg", category: "Facilities", title: "Play Therapy Area", description: "Dedicated play area inside the MTC to stimulate cognitive recovery." },
  { id: "7", src: "/b1.jpg", category: "Training", title: "Data Entry Training", description: "District managers receiving training on the new MTC-MIS portal." },
  { id: "8", src: "/b4.jpg", category: "Care & Recovery", title: "Discharge Counseling", description: "Counseling mothers on dietary diversity before patient discharge." },
];

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
export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const filteredImages = activeCategory === "All" 
    ? GALLERY_DATA 
    : GALLERY_DATA.filter(img => img.category === activeCategory);

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
              <span className="text-sky-600 font-bold tracking-wider uppercase text-sm">Visual Impact</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-sky-900 mb-4 tracking-tight">
              Photo <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600">Gallery</span>
            </h1>
            <p className="text-lg text-sky-700 max-w-2xl font-medium leading-relaxed">
              Glimpses of Malnutrition Treatment Centers across Jharkhand, showcasing our facilities, training programs, and the path to recovery.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FILTERS & GALLERY SECTION */}
      <section className="container mx-auto px-6 lg:px-10 py-12 relative z-10">
        
        {/* Category Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-6">
          <div className="flex items-center gap-2 text-sky-600 text-sm font-bold uppercase tracking-widest">
            <Filter className="w-4 h-4" /> Filter by
          </div>
          
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 border ${
                    isActive 
                      ? "bg-gradient-to-r from-sky-500 to-blue-600 border-transparent text-white shadow-md" 
                      : "bg-white border-sky-200 text-sky-700 hover:bg-sky-50 hover:text-sky-900 hover:border-sky-300"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Image Grid */}
        <motion.div 
          layout
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((item) => (
              <motion.div
                layout
                key={item.id}
                variants={fadeUp}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer bg-white border border-sky-100 shadow-sm hover:shadow-lg transition-shadow"
                onClick={() => setSelectedImage(item)}
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-sky-950/90 via-sky-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                    <Maximize2 className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-sky-300 mb-1">
                    {item.category}
                  </span>
                  <h3 className="text-white font-semibold leading-tight">
                    {item.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State Fallback */}
        {filteredImages.length === 0 && (
          <div className="py-20 text-center flex flex-col items-center justify-center bg-white/50 border border-sky-200 border-dashed rounded-3xl">
            <ImageIcon className="w-12 h-12 text-sky-300 mb-4" />
            <p className="text-sky-600 font-medium">No images found in this category.</p>
          </div>
        )}

      </section>

      {/* LIGHTBOX / MODAL */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-sky-950/90 backdrop-blur-xl"
            onClick={() => setSelectedImage(null)}
          >
            {/* Close Button */}
            <button 
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-colors z-50"
              onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
            >
              <X className="w-6 h-6" />
            </button>

            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="relative w-full max-w-5xl bg-white border border-sky-100 rounded-2xl sm:rounded-[2rem] overflow-hidden flex flex-col lg:flex-row shadow-2xl"
              onClick={(e) => e.stopPropagation()} // Prevent clicking modal from closing it
            >
              {/* Image Container */}
              <div className="relative w-full h-[40vh] sm:h-[50vh] lg:h-[70vh] lg:w-2/3 bg-sky-50/50 flex items-center justify-center">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Text Container */}
              <div className="p-6 sm:p-8 lg:w-1/3 flex flex-col justify-center bg-gradient-to-br from-white to-sky-50 border-t lg:border-t-0 lg:border-l border-sky-100">
                <span className="inline-block px-3 py-1 rounded-full bg-sky-100 border border-sky-200 text-sky-700 text-xs font-bold uppercase tracking-widest w-fit mb-4">
                  {selectedImage.category}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-sky-950 mb-4 leading-tight">
                  {selectedImage.title}
                </h2>
                <p className="text-sky-700 leading-relaxed font-medium text-sm sm:text-base">
                  {selectedImage.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}