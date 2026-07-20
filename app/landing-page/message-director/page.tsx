// // "use client";

// // import React from "react";
// // import Image from "next/image";
// // import { motion, Variants } from "framer-motion";
// // import { Quote, HeartHandshake, CheckCircle2 } from "lucide-react";

// // // ==========================================
// // // ANIMATION VARIANTS
// // // ==========================================
// // const fadeUp: Variants = {
// //   hidden: { opacity: 0, y: 30 },
// //   show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
// // };

// // const staggerContainer: Variants = {
// //   hidden: { opacity: 0 },
// //   show: {
// //     opacity: 1,
// //     transition: { staggerChildren: 0.15 }
// //   }
// // };

// // export default function DirectorMessagePage() {
// //   return (
// //     <main className="min-h-screen bg-slate-950 font-sans text-slate-200 relative overflow-hidden">
      
// //       {/* BACKGROUND GLOWS */}
// //       <div className="absolute top-0 left-0 w-[50vw] h-[50vw] rounded-full bg-indigo-900/10 blur-[150px] pointer-events-none"></div>
// //       <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] rounded-full bg-amber-500/5 blur-[150px] pointer-events-none"></div>

// //       {/* PAGE HEADER */}
// //       <section className="relative pt-24 pb-12 border-b border-white/5 z-10">
// //         <div className="container mx-auto px-6 lg:px-10">
// //           <motion.div initial="hidden" animate="show" variants={fadeUp} className="max-w-3xl">
// //             <div className="flex items-center gap-3 mb-4">
// //               <div className="h-[2px] w-12 bg-amber-400"></div>
// //               <span className="text-amber-400 font-semibold tracking-wider uppercase text-sm">Official Communication</span>
// //             </div>
// //             <h1 className="text-4xl lg:text-6xl font-extrabold text-white mb-6">
// //               Message from the <br />
// //               <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Mission Director</span>
// //             </h1>
// //           </motion.div>
// //         </div>
// //       </section>

// //       {/* MAIN CONTENT SECTION */}
// //       <section className="py-16 relative z-10">
// //         <div className="container mx-auto px-6 lg:px-10">
// //           <motion.div 
// //             variants={staggerContainer}
// //             initial="hidden"
// //             animate="show"
// //             className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start"
// //           >
            
// //             {/* LEFT COL: PHOTO SECTION */}
// //             <motion.div variants={fadeUp} className="lg:col-span-4 flex flex-col items-center lg:items-start lg:sticky lg:top-24">
// //               <div className="relative w-64 h-80 sm:w-80 sm:h-96 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 group">
// //                 {/* 
// //                   NOTE: Ensure you have an image named 'director-photo.jpg' 
// //                   in your 'public' directory, or change this src to match your file.
// //                 */}
// //                 <Image
// //                   src="/director.jpg" 
// //                   alt="Shri Shashi Prakash Jha, IAS - Mission Director, NHM Jharkhand"
// //                   fill
// //                   className="object-cover transition-transform duration-700 group-hover:scale-105"
// //                 />
// //                 <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                
// //                 {/* Photo Caption Overlay */}
// //                 <div className="absolute bottom-6 left-6 right-6">
// //                   <h3 className="text-xl font-bold text-white leading-tight">Shri Shashi Prakash Jha, IAS</h3>
// //                   <p className="text-sm text-amber-400 font-medium mt-1">Mission Director</p>
// //                   <p className="text-xs text-indigo-100/60 mt-1">National Health Mission, Jharkhand</p>
// //                 </div>
// //               </div>
// //             </motion.div>

// //             {/* RIGHT COL: MESSAGE CONTENT */}
// //             <motion.div variants={fadeUp} className="lg:col-span-8 relative">
// //               <Quote className="absolute -top-10 -left-10 w-32 h-32 text-white/5 -z-10 rotate-180" />
              
// //               <div className="prose prose-lg prose-invert max-w-none text-indigo-100/80 leading-relaxed space-y-6">
// //                 <p className="text-xl text-white font-medium leading-relaxed">
// //                   Government of Jharkhand is committed to improve the nutrition status of all children and put extra focus on treatment of most vulnerable children with Severe Acute Malnutrition (SAM) through a wide network of 96 Malnutrition Treatment Centers (MTC).
// //                 </p>

// //                 <p>
// //                   I am happy to share the revised online Malnutrition Treatment Center Management Information System (MTC-MIS) which is an extremely helpful management tool that will go a long way towards monitoring and alleviating the malnutrition in children. 
// //                 </p>

// //                 {/* Highlight Box for Key Features */}
// //                 <div className="my-8 bg-indigo-950/40 border border-indigo-500/20 rounded-2xl p-6 shadow-inner">
// //                   <h4 className="text-white font-semibold flex items-center gap-2 mb-4">
// //                     <CheckCircle2 className="w-5 h-5 text-amber-400" />
// //                     Key Capabilities of the Revised Portal
// //                   </h4>
// //                   <p className="text-sm mb-0">
// //                     The latest revised version not only allows <strong className="text-indigo-200">Real Time Data entry and management</strong> but also simultaneously enables MTC Staff to register children, update and keep a track of their daily weight as well as intake of micronutrients and antibiotics with discharge summary thereby providing a holistic and comprehensive track of all important indicators and quality of care and coverage.
// //                   </p>
// //                 </div>

// //                 <p>
// //                   The information thus generated from 96 functional MTCs to manage children with Severe Acute Malnutrition (SAM) with medical complications will not only be helpful in the programmatic management but also in informing and reforming policy frameworks on nutrition across the state.
// //                 </p>

// //                 <p>
// //                   I am confident and certain that the present dashboard of MTC in this website would enhance the technical and management expertise for treatment of Children with Severe Acute Malnutrition. The envisioned purpose of the revised MTC MIS online website is to become a handy tool to monitor and improve care and treatment to the children and not necessarily remain just a reporting dashboard.
// //                 </p>

// //                 {/* Acknowledgements Section */}
// //                 <div className="mt-12 pt-8 border-t border-white/10 flex items-start gap-4">
// //                   <HeartHandshake className="w-8 h-8 text-amber-400 flex-shrink-0" />
// //                   <div>
// //                     <p className="text-sm text-indigo-200/70 italic m-0">
// //                       I thank <strong className="text-white">UNICEF</strong> and the <strong className="text-white">State Center of Excellence – SAM at RIMS</strong> in supporting this important initiative.
// //                     </p>
// //                   </div>
// //                 </div>

// //                 {/* Sign-off */}
// //                 <div className="mt-12">
// //                   <h3 className="text-2xl font-bold text-white">Shri Shashi Prakash Jha, IAS</h3>
// //                   <p className="text-indigo-200/70">Mission Director</p>
// //                   <p className="text-indigo-200/70">National Health Mission, Jharkhand</p>
// //                 </div>
// //               </div>
// //             </motion.div>

// //           </motion.div>
// //         </div>
// //       </section>

// //     </main>
// //   );
// // }

// "use client";

// import React from "react";
// import Image from "next/image";
// import { motion, Variants } from "framer-motion";
// import { Quote, HeartHandshake, CheckCircle2 } from "lucide-react";

// // ==========================================
// // ANIMATION VARIANTS
// // ==========================================
// const fadeUp: Variants = {
//   hidden: { opacity: 0, y: 30 },
//   show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
// };

// const staggerContainer: Variants = {
//   hidden: { opacity: 0 },
//   show: {
//     opacity: 1,
//     transition: { staggerChildren: 0.15 }
//   }
// };

// export default function DirectorMessagePage() {
//   return (
//     <main className="min-h-screen bg-sky-50 font-sans text-sky-900 relative overflow-hidden selection:bg-sky-200">
      
//       {/* BACKGROUND GLOWS */}
//       <div className="absolute top-0 left-0 w-[50vw] h-[50vw] rounded-full bg-sky-300/30 blur-[150px] pointer-events-none"></div>
//       <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] rounded-full bg-white/60 blur-[150px] pointer-events-none"></div>

//       {/* PAGE HEADER */}
//       <section className="relative pt-24 pb-12 border-b border-sky-200 z-10">
//         <div className="container mx-auto px-6 lg:px-10">
//           <motion.div initial="hidden" animate="show" variants={fadeUp} className="max-w-3xl">
//             <div className="flex items-center gap-3 mb-4">
//               <div className="h-[2px] w-12 bg-sky-500"></div>
//               <span className="text-sky-600 font-semibold tracking-wider uppercase text-sm">Official Communication</span>
//             </div>
//             <h1 className="text-4xl lg:text-6xl font-extrabold text-sky-900 mb-6">
//               Message from the <br />
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600">Mission Director</span>
//             </h1>
//           </motion.div>
//         </div>
//       </section>

//       {/* MAIN CONTENT SECTION */}
//       <section className="py-16 relative z-10">
//         <div className="container mx-auto px-6 lg:px-10">
//           <motion.div 
//             variants={staggerContainer}
//             initial="hidden"
//             animate="show"
//             className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start"
//           >
            
//             {/* LEFT COL: PHOTO SECTION */}
//             <motion.div variants={fadeUp} className="lg:col-span-4 flex flex-col items-center lg:items-start lg:sticky lg:top-24">
//               <div className="relative w-64 h-80 sm:w-80 sm:h-96 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(2,132,199,0.15)] border border-sky-200 group">
//                 {/* 
//                   NOTE: Ensure you have an image named 'director.jpg' 
//                   in your 'public' directory, or change this src to match your file.
//                 */}
//                 <Image
//                   src="/director.jpg" 
//                   alt="Shri Shashi Prakash Jha, IAS - Mission Director, NHM Jharkhand"
//                   fill
//                   className="object-cover transition-transform duration-700 group-hover:scale-105"
//                 />
//                 {/* Darker blue gradient just at the bottom to ensure the white text is legible over the photo */}
//                 <div className="absolute inset-0 bg-gradient-to-t from-sky-950 via-sky-900/40 to-transparent"></div>
                
//                 {/* Photo Caption Overlay */}
//                 <div className="absolute bottom-6 left-6 right-6">
//                   <h3 className="text-xl font-bold text-white leading-tight">Shri Shashi Prakash Jha, IAS</h3>
//                   <p className="text-sm text-sky-300 font-medium mt-1">Mission Director</p>
//                   <p className="text-xs text-sky-100/80 mt-1">National Health Mission, Jharkhand</p>
//                 </div>
//               </div>
//             </motion.div>

//             {/* RIGHT COL: MESSAGE CONTENT */}
//             <motion.div variants={fadeUp} className="lg:col-span-8 relative">
//               <Quote className="absolute -top-10 -left-10 w-32 h-32 text-sky-200 -z-10 rotate-180" />
              
//               <div className="prose prose-lg max-w-none text-sky-800 leading-relaxed space-y-6">
//                 <p className="text-xl text-sky-950 font-semibold leading-relaxed">
//                   Government of Jharkhand is committed to improve the nutrition status of all children and put extra focus on treatment of most vulnerable children with Severe Acute Malnutrition (SAM) through a wide network of 96 Malnutrition Treatment Centers (MTC).
//                 </p>

//                 <p>
//                   I am happy to share the revised online Malnutrition Treatment Center Management Information System (MTC-MIS) which is an extremely helpful management tool that will go a long way towards monitoring and alleviating the malnutrition in children. 
//                 </p>

//                 {/* Highlight Box for Key Features */}
//                 <div className="my-8 bg-white border border-sky-200 rounded-2xl p-6 shadow-sm">
//                   <h4 className="text-sky-950 font-bold flex items-center gap-2 mb-4">
//                     <CheckCircle2 className="w-5 h-5 text-sky-500" />
//                     Key Capabilities of the Revised Portal
//                   </h4>
//                   <p className="text-sm mb-0 text-sky-700 leading-relaxed">
//                     The latest revised version not only allows <strong className="text-blue-600 font-semibold">Real Time Data entry and management</strong> but also simultaneously enables MTC Staff to register children, update and keep a track of their daily weight as well as intake of micronutrients and antibiotics with discharge summary thereby providing a holistic and comprehensive track of all important indicators and quality of care and coverage.
//                   </p>
//                 </div>

//                 <p>
//                   The information thus generated from 96 functional MTCs to manage children with Severe Acute Malnutrition (SAM) with medical complications will not only be helpful in the programmatic management but also in informing and reforming policy frameworks on nutrition across the state.
//                 </p>

//                 <p>
//                   I am confident and certain that the present dashboard of MTC in this website would enhance the technical and management expertise for treatment of Children with Severe Acute Malnutrition. The envisioned purpose of the revised MTC MIS online website is to become a handy tool to monitor and improve care and treatment to the children and not necessarily remain just a reporting dashboard.
//                 </p>

//                 {/* Acknowledgements Section */}
//                 <div className="mt-12 pt-8 border-t border-sky-200 flex items-start gap-4">
//                   <HeartHandshake className="w-8 h-8 text-sky-500 flex-shrink-0" />
//                   <div>
//                     <p className="text-sm text-sky-700 italic m-0">
//                       I thank <strong className="text-sky-950 font-semibold">UNICEF</strong> and the <strong className="text-sky-950 font-semibold">State Center of Excellence – SAM at RIMS</strong> in supporting this important initiative.
//                     </p>
//                   </div>
//                 </div>

//                 {/* Sign-off */}
//                 <div className="mt-12">
//                   <h3 className="text-2xl font-bold text-sky-950">Shri Shashi Prakash Jha, IAS</h3>
//                   <p className="text-sky-700 font-medium">Mission Director</p>
//                   <p className="text-sky-600 text-sm">National Health Mission, Jharkhand</p>
//                 </div>
//               </div>
//             </motion.div>

//           </motion.div>
//         </div>
//       </section>

//     </main>
//   );
// }

"use client";

import React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { Quote, HeartHandshake, CheckCircle2 } from "lucide-react";

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

export default function DirectorMessagePage() {
  return (
    <main className="min-h-screen bg-sky-50 font-sans text-sky-900 relative overflow-hidden selection:bg-sky-200">
      
      {/* BACKGROUND GLOWS */}
      <div className="absolute top-0 left-0 w-[50vw] h-[50vw] rounded-full bg-sky-300/30 blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] rounded-full bg-white/60 blur-[150px] pointer-events-none"></div>

      {/* PAGE HEADER */}
      <section className="relative pt-24 pb-12 border-b border-sky-200 z-10">
        <div className="container mx-auto px-6 lg:px-10">
          <motion.div initial="hidden" animate="show" variants={fadeUp} className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[2px] w-12 bg-sky-500"></div>
              <span className="text-sky-600 font-semibold tracking-wider uppercase text-sm">Official Communication</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-extrabold text-sky-900 mb-6">
              Message from the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600">Mission Director</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* MAIN CONTENT SECTION */}
      <section className="py-16 relative z-10">
        <div className="container mx-auto px-6 lg:px-10">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start"
          >
            
            {/* LEFT COL: PHOTO SECTION */}
            <motion.div variants={fadeUp} className="lg:col-span-4 flex flex-col items-center lg:items-start lg:sticky lg:top-24">
              <div className="relative w-64 h-80 sm:w-80 sm:h-96 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(2,132,199,0.15)] border border-sky-200 group">
                {/* 
                  NOTE: Ensure you have an image named 'director.jpg' 
                  in your 'public' directory, or change this src to match your file.
                */}
                <Image
                  src="/director.jpg" 
                  alt="Shri Shashi Prakash Jha, IAS - Mission Director, NHM Jharkhand"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Darker blue gradient just at the bottom to ensure the white text is legible over the photo */}
                <div className="absolute inset-0 bg-gradient-to-t from-sky-950 via-sky-900/40 to-transparent"></div>
                
                {/* Photo Caption Overlay */}
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-xl font-bold text-white leading-tight">Shri Shashi Prakash Jha, IAS</h3>
                  <p className="text-sm text-sky-300 font-medium mt-1">Mission Director</p>
                  <p className="text-xs text-sky-100/80 mt-1">National Health Mission, Jharkhand</p>
                </div>
              </div>
            </motion.div>

            {/* RIGHT COL: MESSAGE CONTENT */}
            <motion.div variants={fadeUp} className="lg:col-span-8 relative">
              <Quote className="absolute -top-10 -left-10 w-32 h-32 text-sky-200 -z-10 rotate-180" />
              
              <div className="prose prose-lg max-w-none text-sky-800 leading-relaxed space-y-6">
                <p className="text-xl text-sky-950 font-semibold leading-relaxed">
                  Government of Jharkhand is committed to improve the nutrition status of all children and put extra focus on treatment of most vulnerable children with Severe Acute Malnutrition (SAM) and Moderate Acute Malnutrition (MAM) through a wide network of 101 Malnutrition Treatment Centers (MTC).
                </p>

                <p>
                  I am happy to share the revised online Malnutrition Treatment Center Management Information System (MTC-MIS) which is an extremely helpful management tool that will go a long way towards monitoring and alleviating the malnutrition in children. 
                </p>

                {/* Highlight Box for Key Features */}
                <div className="my-8 bg-white border border-sky-200 rounded-2xl p-6 shadow-sm">
                  <h4 className="text-sky-950 font-bold flex items-center gap-2 mb-4">
                    <CheckCircle2 className="w-5 h-5 text-sky-500" />
                    Key Capabilities of the Revised Portal
                  </h4>
                  <p className="text-sm mb-0 text-sky-700 leading-relaxed">
                    The latest revised version not only allows <strong className="text-blue-600 font-semibold">Real Time Data entry and management</strong> but also simultaneously enables MTC Staff to register children, update and keep a track of their daily weight as well as intake of micronutrients and antibiotics with discharge summary thereby providing a holistic and comprehensive track of all important indicators and quality of care and coverage.
                  </p>
                </div>

                <p>
                  The information thus generated from 101 functional MTCs to manage children with Severe Acute Malnutrition (SAM) and Moderate Acute Malnutrition (MAM) with medical complications will not only be helpful in the programmatic management but also in informing and reforming policy frameworks on nutrition across the state.
                </p>

                <p>
                  I am confident and certain that the present dashboard of MTC in this website would enhance the technical and management expertise for treatment of Children with Severe Acute Malnutrition (SAM) and Moderate Acute Malnutrition (MAM). The envisioned purpose of the revised MTC MIS online website is to become a handy tool to monitor and improve care and treatment to the children and not necessarily remain just a reporting dashboard.
                </p>

                {/* Acknowledgements Section */}
                <div className="mt-12 pt-8 border-t border-sky-200 flex items-start gap-4">
                  <HeartHandshake className="w-8 h-8 text-sky-500 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-sky-700 italic m-0">
                      I thank <strong className="text-sky-950 font-semibold">UNICEF</strong> and the <strong className="text-sky-950 font-semibold">State Center of Excellence – SAM and MAM at RIMS</strong> in supporting this important initiative.
                    </p>
                  </div>
                </div>

                {/* Sign-off */}
                <div className="mt-12">
                  <h3 className="text-2xl font-bold text-sky-950">Shri Shashi Prakash Jha, IAS</h3>
                  <p className="text-sky-700 font-medium">Mission Director</p>
                  <p className="text-sky-600 text-sm">National Health Mission, Jharkhand</p>
                </div>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </section>

    </main>
  );
}