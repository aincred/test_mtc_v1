// // "use client";

// // import Link from "next/link";
// // import { ClipboardList, CalendarClock } from "lucide-react";

// // export default function FollowUpPage() {
// //   return (
// //     <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
// //       <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-6xl relative">
// //         {/* Back Button */}
// //         <Link
// //           href="\mtc-user\dashboard\home"
// //           className="absolute top-4 right-4 bg-red-500 text-white py-2 px-4 rounded-lg flex items-center gap-2 text-sm hover:bg-red-600"
// //         >
// //           <span className="text-xs">⏪</span> Back
// //         </Link>

// //         <div className="flex gap-8 mt-10">
// //           {/* Follow-Up Card */}
// //           <Link
// //             href="/follow-up"
// //             className="flex-1 bg-gradient-to-r from-orange-400 to-orange-600 text-white p-6 rounded-3xl shadow-lg flex items-center gap-4 hover:scale-105 transition-transform"
// //           >
// //             <div className="bg-white/20 p-4 rounded-full">
// //               <ClipboardList size={48} />
// //             </div>
// //             <div className="text-3xl font-semibold">Follow-Up</div>
// //           </Link>

// //           {/* SMS Follow-up Due Dates Card */}
// //           <Link
// //             href="/sms-follow-up"
// //             className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-3xl shadow-lg flex items-center gap-4 hover:scale-105 transition-transform"
// //           >
// //             <div className="bg-white/20 p-4 rounded-full">
// //               <CalendarClock size={48} />
// //             </div>
// //             <div className="text-3xl font-semibold leading-tight">
// //               SMS Follow-up<br /> Due Dates
// //             </div>
// //           </Link>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// "use client";

// import Link from "next/link";
// import { ClipboardList, CalendarClock } from "lucide-react";

// export default function FollowUpPage() {
//   return (
//     <div className="min-h-screen  bg-linear-to-br from-gray-50 to-gray-100 p-4 flex justify-center items-center">
//       <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-3xl relative">
//         {/* Back Button */}
//         <Link
//           href="\mtc-user\dashboard\home"
//           className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg flex items-center gap-2 text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg"
//         >
//           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//           </svg>
//           Back
//         </Link>

//         <div className="flex flex-col sm:flex-row gap-6 mt-8">
//           {/* Follow-Up Card */}
//           <Link
//             href="/mtc-user/dashboard/follow-up-report/follow-up"
//             className="flex-1 group relative overflow-hidden  bg-linear-to-br from-orange-400 via-orange-500 to-orange-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
//           >
//             <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
//             <div className="relative z-10 flex items-center gap-4">
//               <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl group-hover:bg-white/30 transition-colors">
//                 <ClipboardList size={36} strokeWidth={2} />
//               </div>
//               <div>
//                 <h2 className="text-2xl font-bold">Follow-Up</h2>
//                 <p className="text-orange-100 text-sm mt-1">Manage patient follow-ups</p>
//               </div>
//             </div>
//           </Link>

//           {/* SMS Follow-up Due Dates Card */}
//           <Link
//             href="/mtc-user/dashboard/follow-up-report/sms-follow-up/${id}"
//             className="flex-1 group relative overflow-hidden  bg-linear-to-br from-blue-500 via-blue-600 to-purple-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
//           >
//             <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
//             <div className="relative z-10 flex items-center gap-4">
//               <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl group-hover:bg-white/30 transition-colors">
//                 <CalendarClock size={36} strokeWidth={2} />
//               </div>
//               <div>
//                 <h2 className="text-2xl font-bold">SMS Follow-up</h2>
//                 <p className="text-blue-100 text-sm mt-1">View due dates</p>
//               </div>
//             </div>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import Link from "next/link";
import { FileText, Share2, FilePlus, MailCheck, ArrowLeft } from "lucide-react";

export default function ReportsMenuPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-8 flex justify-center items-start pt-12 sm:pt-20">
      <div className="bg-white shadow-xl border border-slate-100 rounded-2xl p-6 sm:p-8 w-full max-w-7xl relative">
        
        {/* Header Area with Back Button */}
        <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Reports & Follow-ups</h1>
            <p className="text-sm text-slate-500 mt-1">Select a module to view or generate reports</p>
          </div>
          <Link
            href="/mtc-user/dashboard/home"
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg flex items-center gap-2 text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
        </div>

        {/* 4-Column Grid for the Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* 1. M.P.R Card (Green) */}
          <Link
            href="/mtc-user/dashboard/mrp/monthly-report"
            className="group relative overflow-hidden bg-gradient-to-br from-emerald-500 to-green-600 text-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl group-hover:bg-white/30 transition-colors shrink-0">
                <FileText size={32} strokeWidth={2} />
              </div>
              <div className="flex items-center h-full sm:mt-2">
                <h2 className="text-xl font-bold leading-tight">M.P.R</h2>
              </div>
            </div>
          </Link>

          {/* 2. Sahiya Referral Report (Blue/Purple) */}
          <Link
            href="/mtc-user/dashboard/mrp/sahiya-referral"
            className="group relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl group-hover:bg-white/30 transition-colors shrink-0">
                <Share2 size={32} strokeWidth={2} />
              </div>
              <div className="flex items-center h-full">
                <h2 className="text-lg font-bold leading-tight">Sahiya Referral Report</h2>
              </div>
            </div>
          </Link>

          {/* 3. Generate Letters for Follow-up (Dark Purple/Slate) */}
          <Link
            href="/mtc-user/dashboard/mrp/generate-letters"
            className="group relative overflow-hidden bg-gradient-to-br from-slate-600 to-purple-800 text-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl group-hover:bg-white/30 transition-colors shrink-0">
                <FilePlus size={32} strokeWidth={2} />
              </div>
              <div className="flex items-center h-full">
                <h2 className="text-lg font-bold leading-tight">Generate Letters for Follow-up</h2>
              </div>
            </div>
          </Link>

          {/* 4. Follow-Up Report (Pink/Red) */}
          <Link
            href="/mtc-user/dashboard/follow-up-report"
            className="group relative overflow-hidden bg-gradient-to-br from-pink-500 to-rose-600 text-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl group-hover:bg-white/30 transition-colors shrink-0">
                <MailCheck size={32} strokeWidth={2} />
              </div>
              <div className="flex items-center h-full sm:mt-2">
                <h2 className="text-lg font-bold leading-tight">Follow-Up Report</h2>
              </div>
            </div>
          </Link>

        </div>
      </div>
    </div>
  );
}