// // "use client";

// // import React from 'react';
// // import { ExternalLink, Award, Users, BookOpen, Microscope, Activity } from 'lucide-react';

// // const JharkhandSCoE = () => {
// //   const medicalColleges = [
// //     "Dumka Medical College",
// //     "Hazaribagh Medical College",
// //     "MGM Jamshedpur",
// //     "Patliputra Medical College, Dhanbad",
// //     "Palamu Medical College"
// //   ];

// //   const pillars = [
// //     {
// //       title: "Capacity Building",
// //       description: "Enhancing skills of healthcare providers for better SAM management.",
// //       icon: <Users className="w-5 h-5" />
// //     },
// //     {
// //       title: "Policy Support",
// //       description: "Technical assistance in implementing state nutrition policies.",
// //       icon: <Award className="w-5 h-5" />
// //     },
// //     {
// //       title: "Knowledge Management",
// //       description: "Documenting best practices and research for scaled impact.",
// //       icon: <BookOpen className="w-5 h-5" />
// //     },
// //     {
// //       title: "Monitoring & Supervision",
// //       description: "Ensuring quality care in both facility and community settings.",
// //       icon: <Activity className="w-5 h-5" />
// //     }
// //   ];

// //   return (
// //     <div className="min-h-screen bg-gray-50 p-4 md:p-8">
// //       <div className="max-w-6xl mx-auto">
// //         {/* Main Header Card */}
// //         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
// //           <div className="bg-[#077c78] p-6 text-white">
// //             <div className="flex items-center gap-3 mb-2">
// //               <div className="p-2 bg-white/20 rounded-lg">
// //                 <Microscope className="w-6 h-6" />
// //               </div>
// //               <span className="text-sm font-medium uppercase tracking-wider opacity-90">State Centre of Excellence</span>
// //             </div>
// //             <h1 className="text-2xl md:text-3xl font-bold leading-tight">
// //               Management of Severe Acute Malnutrition (SAM)
// //             </h1>
// //             <p className="mt-2 text-teal-50 font-medium">
// //               Rajendra Institute of Medical Sciences (RIMS), Ranchi, Jharkhand
// //             </p>
// //           </div>

// //           <div className="p-6 md:p-8">
// //             <div className="grid md:grid-cols-3 gap-8">
// //               <div className="md:col-span-2">
// //                 <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
// //                   <Activity className="w-5 h-5 text-[#077c78]" />
// //                   About the Center
// //                 </h2>
// //                 <div className="space-y-4 text-gray-600 leading-relaxed">
// //                   <p>
// //                     Established in October 2019, the State Centre of Excellence (SCoE) at RIMS Ranchi functions in collaboration with the Department of Health, Medical Education & Family Welfare, State Nutrition Mission, and ICDS.
// //                   </p>
// //                   <p>
// //                     Supported technically by <span className="font-semibold">UNICEF Jharkhand</span> and <span className="font-semibold">NCoE-SAM, KSCH, New Delhi</span>, the center serves as a hub for quality care in facility-based and community-based SAM management programs.
// //                   </p>
// //                   <div className="pt-4 border-t border-gray-100">
// //                     <a 
// //                       href="http://coesamnetwork.in/AboutDetails.aspx?AboutId=7" 
// //                       target="_blank" 
// //                       rel="noopener noreferrer"
// //                       className="inline-flex items-center gap-2 text-[#077c78] font-medium hover:underline group"
// //                     >
// //                       Visit Official Portal
// //                       <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
// //                     </a>
// //                   </div>
// //                 </div>
// //               </div>

// //               <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
// //                 <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Network Partners</h3>
// //                 <ul className="space-y-3">
// //                   {medicalColleges.map((college, idx) => (
// //                     <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
// //                       <div className="w-1.5 h-1.5 rounded-full bg-[#077c78] mt-1.5 shrink-0" />
// //                       {college}
// //                     </li>
// //                   ))}
// //                 </ul>
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Pillars of Activity */}
// //         <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
// //           {pillars.map((pillar, idx) => (
// //             <div key={idx} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
// //               <div className="w-10 h-10 rounded-lg bg-teal-50 text-[#077c78] flex items-center justify-center mb-4">
// //                 {pillar.icon}
// //               </div>
// //               <h3 className="font-bold text-gray-900 mb-2">{pillar.title}</h3>
// //               <p className="text-sm text-gray-500 Shadcnleading-snug">{pillar.description}</p>
// //             </div>
// //           ))}
// //         </div>

// //         {/* Footer info */}
// //         <footer className="mt-12 text-center text-gray-400 text-xs">
// //           © {new Date().getFullYear()} SCoE-SAM Jharkhand • Supported by UNICEF
// //         </footer>
// //       </div>
// //     </div>
// //   );
// // };

// // export default JharkhandSCoE;

// "use client";

// import React, { useState, ChangeEvent } from 'react';
// import { Edit3, Save, Upload, UserCircle, Quote } from 'lucide-react';

// const MissionDirectorMessage = () => {
//   const [isAdminMode, setIsAdminMode] = useState(false);
//   const [directorData, setDirectorData] = useState({
//     name: "Mission Director Name",
//     title: "Mission Director, National Health Mission / State Nutrition Mission",
//     message: "Our commitment remains steadfast in eliminating severe acute malnutrition across Jharkhand through institutional excellence, inter-departmental convergence, and robust community engagement.",
//     photoUrl: ""
//   });

//   const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const imageUrl = URL.createObjectURL(file);
//       setDirectorData((prev) => ({ ...prev, photoUrl: imageUrl }));
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-4 md:p-6">
//       <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
//         <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
//           <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
//             <Quote className="w-5 h-5 text-[#077c78]" />
//             Message from the Mission Director
//           </h2>
//           <button
//             type="button"
//             onClick={() => setIsAdminMode(!isAdminMode)}
//             className="inline-flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-gray-700"
//           >
//             {isAdminMode ? (
//               <>
//                 <Save className="w-4 h-4 text-emerald-600" />
//                 Done Editing
//               </>
//             ) : (
//               <>
//                 <Edit3 className="w-4 h-4 text-[#077c78]" />
//                 Admin Edit
//               </>
//             )}
//           </button>
//         </div>

//         <div className="flex flex-col md:flex-row gap-6 items-start">
//           {/* Director Photo & Upload */}
//           <div className="flex flex-col items-center gap-3 w-full md:w-auto shrink-0">
//             <div className="w-32 h-32 md:w-36 md:h-36 rounded-2xl bg-gray-100 border border-gray-200 overflow-hidden flex items-center justify-center relative shadow-inner">
//               {directorData.photoUrl ? (
//                 <img
//                   src={directorData.photoUrl}
//                   alt={directorData.name}
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 <UserCircle className="w-20 h-20 text-gray-300" />
//               )}
//             </div>

//             {isAdminMode && (
//               <label className="cursor-pointer inline-flex items-center gap-2 text-xs font-medium text-[#077c78] bg-teal-50 px-3 py-1.5 rounded-md hover:bg-teal-100 transition-colors">
//                 <Upload className="w-3.5 h-3.5" />
//                 Upload Photo
//                 <input
//                   type="file"
//                   accept="image/*"
//                   className="hidden"
//                   onChange={handlePhotoUpload}
//                 />
//               </label>
//             )}
//           </div>

//           {/* Message Content & Inputs */}
//           <div className="flex-1 w-full space-y-4">
//             {isAdminMode ? (
//               <div className="space-y-3">
//                 <div>
//                   <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
//                     Director's Name
//                   </label>
//                   <input
//                     type="text"
//                     value={directorData.name}
//                     onChange={(e) => setDirectorData({ ...directorData, name: e.target.value })}
//                     className="w-full p-2 border border-gray-200 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#077c78]"
//                     placeholder="e.g. Dr. Jane Doe, IAS"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
//                     Designation
//                   </label>
//                   <input
//                     type="text"
//                     value={directorData.title}
//                     onChange={(e) => setDirectorData({ ...directorData, title: e.target.value })}
//                     className="w-full p-2 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#077c78]"
//                     placeholder="e.g. Mission Director, NHM Jharkhand"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
//                     Message
//                   </label>
//                   <textarea
//                     rows={4}
//                     value={directorData.message}
//                     onChange={(e) => setDirectorData({ ...directorData, message: e.target.value })}
//                     className="w-full p-2 border border-gray-200 rounded-lg text-sm text-gray-700 leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#077c78]"
//                     placeholder="Write message here..."
//                   />
//                 </div>
//               </div>
//             ) : (
//               <>
//                 <p className="text-gray-700 italic leading-relaxed text-base border-l-4 border-[#077c78] pl-4">
//                   "{directorData.message}"
//                 </p>
//                 <div className="pt-2">
//                   <h4 className="font-bold text-gray-900 text-base">{directorData.name}</h4>
//                   <p className="text-sm text-gray-500">{directorData.title}</p>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MissionDirectorMessage;

"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import Image from "next/image";
import {
  DirectorMessageData,
  INITIAL_DIRECTOR_DATA,
  getStoredDirectorData,
  saveDirectorData,
  compressImageToBase64
} from "@/lib/directorData";
import { Upload, Save, RotateCcw, CheckCircle } from "lucide-react";

export default function AdminDirectorMessagePage() {
  const [formData, setFormData] = useState<DirectorMessageData>(INITIAL_DIRECTOR_DATA);
  const [previewImage, setPreviewImage] = useState<string>("/director.jpg");
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const data = getStoredDirectorData();
    setFormData(data);
    setPreviewImage(data.photoUrl);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsProcessing(true);
      const base64 = await compressImageToBase64(file);
      setPreviewImage(base64);
      setFormData((prev) => ({ ...prev, photoUrl: base64 }));
    } catch (err) {
      console.error("Image processing error:", err);
      alert("Failed to process image. Please try another file.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveDirectorData(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleReset = () => {
    if (confirm("Reset message and photo back to system defaults?")) {
      saveDirectorData(INITIAL_DIRECTOR_DATA);
      setFormData(INITIAL_DIRECTOR_DATA);
      setPreviewImage(INITIAL_DIRECTOR_DATA.photoUrl);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Manage Director Message & Resources</h1>
            <p className="text-sm text-slate-500">Updates will sync live across the Public Message and Resources pages.</p>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-2 text-sm text-slate-600 hover:text-red-600 transition"
          >
            <RotateCcw className="w-4 h-4" /> Reset Defaults
          </button>
        </div>

        {savedSuccess && (
          <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3 text-emerald-800">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            <span>Updated successfully! Live data published.</span>
          </div>
        )}

        <form onSubmit={handleSave} className="mt-8 space-y-6">
          {/* PHOTO UPLOAD */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Director's Photo</label>
            <div className="flex items-center gap-6">
              <div className="relative w-24 h-32 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 flex-shrink-0">
                <Image src={previewImage} alt="Preview" fill className="object-cover" />
              </div>
              <div>
                <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white text-sm font-medium rounded-lg transition">
                  <Upload className="w-4 h-4" />
                  {isProcessing ? "Optimizing..." : "Upload New Photo"}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={isProcessing}
                  />
                </label>
                <p className="text-xs text-slate-500 mt-2">Automatically compressed and stored locally in base64 format.</p>
              </div>
            </div>
          </div>

          {/* BASIC INFO */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Designation</label>
              <input
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleInputChange}
                className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Organization / Department</label>
            <input
              type="text"
              name="organization"
              value={formData.organization}
              onChange={handleInputChange}
              className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none"
              required
            />
          </div>

          {/* PARAGRAPHS */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Lead Highlight Paragraph</label>
              <textarea
                name="leadParagraph"
                rows={3}
                value={formData.leadParagraph}
                onChange={handleInputChange}
                className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Body Paragraph 1</label>
              <textarea
                name="bodyParagraph1"
                rows={3}
                value={formData.bodyParagraph1}
                onChange={handleInputChange}
                className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none"
                required
              />
            </div>

            <div className="p-4 bg-sky-50/50 rounded-xl border border-sky-100 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Feature Box Title</label>
                <input
                  type="text"
                  name="keyFeatureHeading"
                  value={formData.keyFeatureHeading}
                  onChange={handleInputChange}
                  className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Feature Box Description</label>
                <textarea
                  name="keyFeatureText"
                  rows={3}
                  value={formData.keyFeatureText}
                  onChange={handleInputChange}
                  className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Body Paragraph 2</label>
              <textarea
                name="bodyParagraph2"
                rows={3}
                value={formData.bodyParagraph2}
                onChange={handleInputChange}
                className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Body Paragraph 3</label>
              <textarea
                name="bodyParagraph3"
                rows={3}
                value={formData.bodyParagraph3}
                onChange={handleInputChange}
                className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Acknowledgement Note</label>
              <input
                type="text"
                name="acknowledgementText"
                value={formData.acknowledgementText}
                onChange={handleInputChange}
                className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-xl shadow-sm transition"
          >
            <Save className="w-4 h-4" /> Save & Broadcast Changes
          </button>
        </form>
      </div>
    </main>
  );
}