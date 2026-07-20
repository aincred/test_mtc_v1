// "use client"

// import React, { useState, useMemo } from 'react';
// import { 
//   Search, 
//   Plus, 
//   Edit2, 
//   ChevronLeft, 
//   ChevronRight, 
//   Hospital, 
//   MapPin, 
//   Bed,
//   Filter,
//   MoreVertical,
//   CheckCircle2,
//   Clock,
//   ArrowLeft,
//   Save,
//   X
// } from 'lucide-react';

// // Type Definitions
// interface Mtc {
//   id: number;
//   name: string;
//   code: string;
//   district: string;
//   block: string;
//   totalBeds: number;
//   availableBeds: number;
//   status: string;
// }

// interface District {
//   id: number;
//   name: string;
// }

// interface MtcFormData {
//   id: number;
//   code: string;
//   name: string;
//   districtId: string | number;
//   blockId: string;
//   totalBeds: string | number;
//   availableBeds: string | number;
//   status: string;
// }

// // Sample data extracted from the user's HTML + extra mock data
// const INITIAL_DATA: Mtc[] = [
//   { id: 1, name: "CHAS", code: "JH/BOK/BOK/", district: "BOKARO", block: "CHAS", totalBeds: 20, availableBeds: 20, status: "Active" },
//   { id: 2, name: "GOMIA", code: "JH/BOK/GOM/", district: "BOKARO", block: "GOMIA", totalBeds: 10, availableBeds: 10, status: "Active" },
//   { id: 3, name: "PETERWAR", code: "JH/BOK/NAW/", district: "BOKARO", block: "PETERWAR", totalBeds: 10, availableBeds: 10, status: "Active" },
//   { id: 4, name: "FUSARO", code: "JH/BOK/FUS/", district: "BOKARO", block: "FUSARO", totalBeds: 10, availableBeds: 10, status: "Active" },
//   { id: 5, name: "CHATRA", code: "JH/CHT/CHT/", district: "CHATRA", block: "CHATRA", totalBeds: 15, availableBeds: 15, status: "Active" },
//   { id: 6, name: "HUNTERGUNJ", code: "JH/CHT/PRT/", district: "CHATRA", block: "HUNTERGUNJ", totalBeds: 10, availableBeds: 10, status: "Active" },
//   { id: 7, name: "SIMARIA", code: "JH/CHT/SIM/", district: "CHATRA", block: "SIMARIA", totalBeds: 10, availableBeds: 10, status: "Active" },
//   { id: 8, name: "TANDWA", code: "JH/CHT/TAN/", district: "CHATRA", block: "TANDWA", totalBeds: 10, availableBeds: 10, status: "Active" },
//   { id: 9, name: "DUMRI", code: "JH/GRD/DMR/", district: "GIRIDIH", block: "DUMRI", totalBeds: 10, availableBeds: 10, status: "Active" },
//   { id: 10, name: "GIRIDIH", code: "JH/GRD/GRD/", district: "GIRIDIH", block: "GIRIDIH", totalBeds: 10, availableBeds: 10, status: "Active" },
//   { id: 11, name: "DHANBAD DH", code: "JH/DHN/DHN/", district: "DHANBAD", block: "DHANBAD", totalBeds: 25, availableBeds: 5, status: "Active" },
//   { id: 12, name: "RANCHI SADAR", code: "JH/RAN/SDR/", district: "RANCHI", block: "RANCHI", totalBeds: 30, availableBeds: 2, status: "Inactive" },
// ];

// const DISTRICTS: District[] = [
//   { id: 1, name: "BOKARO" }, { id: 2, name: "CHATRA" }, { id: 16, name: "DEOGHAR" },
//   { id: 4, name: "DHANBAD" }, { id: 17, name: "DUMKA" }, { id: 22, name: "EAST SINGHBHUM" },
//   { id: 14, name: "GARHWA" }, { id: 3, name: "GIRIDIH" }, { id: 18, name: "GODDA" },
//   { id: 9, name: "GUMLA" }, { id: 6, name: "HAZARIBAGH" }, { id: 19, name: "JAMTARA" },
//   { id: 10, name: "KHUNTI" }, { id: 7, name: "KODERMA" }, { id: 15, name: "LATEHAR" },
//   { id: 11, name: "LOHARDAGA" }, { id: 20, name: "PAKUR" }, { id: 13, name: "PALAMU" },
//   { id: 5, name: "RAMGARH" }, { id: 8, name: "RANCHI" }, { id: 21, name: "SAHIBGANJ" },
//   { id: 23, name: "SERAIKELA" }, { id: 12, name: "SIMDEGA" }, { id: 24, name: "WEST SINGHBHUM" }
// ];

// export default function App() {
//   const [view, setView] = useState<'list' | 'details'>('list');
//   const [data, setData] = useState<Mtc[]>(INITIAL_DATA);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
  
//   // Form State
//   const [formData, setFormData] = useState<MtcFormData>({
//     id: 0,
//     code: '',
//     name: '',
//     districtId: '',
//     blockId: '',
//     totalBeds: '',
//     availableBeds: '',
//     status: 'Active'
//   });

//   // Filter logic
//   const filteredData = useMemo(() => {
//     return data.filter(item => 
//       item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.code.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   }, [searchTerm, data]);

//   // Pagination logic
//   const totalPages = Math.ceil(filteredData.length / rowsPerPage);
//   const paginatedData = filteredData.slice(
//     (currentPage - 1) * rowsPerPage,
//     currentPage * rowsPerPage
//   );

//   const handleEdit = (mtc: Mtc) => {
//     setFormData({
//       id: mtc.id,
//       code: mtc.code,
//       name: mtc.name,
//       districtId: DISTRICTS.find(d => d.name === mtc.district)?.id || '',
//       blockId: mtc.block,
//       totalBeds: mtc.totalBeds,
//       availableBeds: mtc.availableBeds,
//       status: mtc.status
//     });
//     setView('details');
//   };

//   const handleAddNew = () => {
//     setFormData({
//       id: 0,
//       code: '',
//       name: '',
//       districtId: '',
//       blockId: '',
//       totalBeds: '',
//       availableBeds: '',
//       status: 'Active'
//     });
//     setView('details');
//   };

//   const handleSave = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log("Saving MTC Data:", formData);
//     setView('list');
//   };

//   return (
//     <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-900">
//       <div className="max-w-7xl mx-auto">
        
//         {view === 'list' ? (
//           <>
//             {/* List Header Section */}
//             <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
//               <div>
//                 <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
//                   <Hospital className="w-8 h-8 text-teal-600" />
//                   MTC's List
//                 </h1>
//                 <p className="text-slate-500 text-sm mt-1">Manage and monitor Malnutrition Treatment Centres across districts</p>
//               </div>
              
//               <button 
//                 className="flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2.5 rounded-lg font-medium transition-all shadow-sm active:scale-95"
//                 onClick={handleAddNew}
//               >
//                 <Plus className="w-5 h-5" />
//                 Add New MTC
//               </button>
//             </div>

//             {/* List Filters and Search Card */}
//             <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-6">
//               <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
//                 <div className="relative w-full md:w-96">
//                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
//                   <input 
//                     type="text" 
//                     placeholder="Search by name, district, or code..." 
//                     className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-sm"
//                     value={searchTerm}
//                     onChange={(e) => {
//                       setSearchTerm(e.target.value);
//                       setCurrentPage(1);
//                     }}
//                   />
//                 </div>
                
//                 <div className="flex items-center gap-3 w-full md:w-auto">
//                   <div className="flex items-center gap-2 text-sm text-slate-600 whitespace-nowrap">
//                     <span>Show</span>
//                     <select 
//                       className="bg-slate-50 border border-slate-200 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
//                       value={rowsPerPage}
//                       onChange={(e) => setRowsPerPage(Number(e.target.value))}
//                     >
//                       <option value={10}>10</option>
//                       <option value={25}>25</option>
//                       <option value={50}>50</option>
//                     </select>
//                     <span>entries</span>
//                   </div>
//                   <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-slate-600">
//                     <Filter className="w-4 h-4" />
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* List Table Content */}
//             <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
//               <div className="overflow-x-auto">
//                 <table className="w-full text-left border-collapse">
//                   <thead>
//                     <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-xs uppercase tracking-wider font-semibold">
//                       <th className="px-6 py-4 w-16">S.No</th>
//                       <th className="px-6 py-4">MTC Name</th>
//                       <th className="px-6 py-4">MTC Code</th>
//                       <th className="px-6 py-4">District / Block</th>
//                       <th className="px-6 py-4 text-center">Beds (T/A)</th>
//                       <th className="px-6 py-4">Status</th>
//                       <th className="px-6 py-4 text-right">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-slate-100">
//                     {paginatedData.length > 0 ? paginatedData.map((mtc, index) => (
//                       <tr key={mtc.id} className="hover:bg-slate-50/80 transition-colors group">
//                         <td className="px-6 py-4 text-sm text-slate-500">
//                           {(currentPage - 1) * rowsPerPage + index + 1}
//                         </td>
//                         <td className="px-6 py-4">
//                           <div className="font-semibold text-slate-800">{mtc.name}</div>
//                           <div className="text-xs text-slate-400 mt-0.5">Facility ID: {mtc.id + 1000}</div>
//                         </td>
//                         <td className="px-6 py-4">
//                           <code className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
//                             {mtc.code}
//                           </code>
//                         </td>
//                         <td className="px-6 py-4">
//                           <div className="flex items-center gap-1.5 text-sm text-slate-700">
//                             <MapPin className="w-3.5 h-3.5 text-slate-400" />
//                             {mtc.district}
//                           </div>
//                           <div className="text-xs text-slate-500 ml-5">{mtc.block}</div>
//                         </td>
//                         <td className="px-6 py-4">
//                           <div className="flex flex-col items-center">
//                             <div className="flex items-center gap-1 text-sm font-medium text-slate-700">
//                               <Bed className="w-4 h-4 text-teal-600" />
//                               {mtc.availableBeds} / {mtc.totalBeds}
//                             </div>
//                             <div className="w-20 h-1 bg-slate-100 rounded-full mt-1.5 overflow-hidden">
//                               <div 
//                                 className={`h-full rounded-full transition-all duration-500 ${
//                                   (mtc.availableBeds / mtc.totalBeds) < 0.2 ? 'bg-red-500' : 'bg-teal-500'
//                                 }`}
//                                 style={{ width: `${(mtc.availableBeds / mtc.totalBeds) * 100}%` }}
//                               ></div>
//                             </div>
//                           </div>
//                         </td>
//                         <td className="px-6 py-4">
//                           {mtc.status === 'Active' ? (
//                             <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
//                               <CheckCircle2 className="w-3 h-3" />
//                               Active
//                             </span>
//                           ) : (
//                             <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
//                               <Clock className="w-3 h-3" />
//                               Inactive
//                             </span>
//                           )}
//                         </td>
//                         <td className="px-6 py-4 text-right">
//                           <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
//                             <button 
//                               onClick={() => handleEdit(mtc)}
//                               className="p-2 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
//                               title="Edit Details"
//                             >
//                               <Edit2 className="w-4 h-4" />
//                             </button>
//                             <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg transition-colors">
//                               <MoreVertical className="w-4 h-4" />
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     )) : (
//                       <tr>
//                         <td colSpan={7} className="px-6 py-12 text-center text-slate-400 italic">
//                           No MTCs found matching your search criteria.
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>

//               {/* Pagination Footer */}
//               <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
//                 <div className="text-sm text-slate-500">
//                   Showing <span className="font-medium text-slate-700">{Math.min(filteredData.length, (currentPage - 1) * rowsPerPage + 1)}</span> to <span className="font-medium text-slate-700">{Math.min(filteredData.length, currentPage * rowsPerPage)}</span> of <span className="font-medium text-slate-700">{filteredData.length}</span> entries
//                 </div>
                
//                 <div className="flex items-center gap-2">
//                   <button 
//                     onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
//                     disabled={currentPage === 1}
//                     className="p-2 border border-slate-200 rounded-lg bg-white hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
//                   >
//                     <ChevronLeft className="w-4 h-4" />
//                   </button>
                  
//                   <div className="flex items-center gap-1">
//                     {[...Array(totalPages)].map((_, i) => (
//                       <button
//                         key={i}
//                         onClick={() => setCurrentPage(i + 1)}
//                         className={`min-w-[32px] h-8 rounded-lg text-sm font-medium transition-all shadow-sm ${
//                           currentPage === i + 1 
//                           ? 'bg-teal-600 text-white border border-teal-600' 
//                           : 'bg-white text-slate-600 border border-slate-200 hover:border-teal-300'
//                         }`}
//                       >
//                         {i + 1}
//                       </button>
//                     ))}
//                   </div>

//                   <button 
//                     onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
//                     disabled={currentPage === totalPages}
//                     className="p-2 border border-slate-200 rounded-lg bg-white hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
//                   >
//                     <ChevronRight className="w-4 h-4" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </>
//         ) : (
//           /* MTC Details / Add Form Section */
//           <div className="max-w-4xl mx-auto">
//             <div className="flex items-center justify-between mb-8">
//               <button 
//                 onClick={() => setView('list')}
//                 className="flex items-center gap-2 text-slate-600 hover:text-teal-600 transition-colors font-medium"
//               >
//                 <ArrowLeft className="w-5 h-5" />
//                 Back to List
//               </button>
//               <h2 className="text-xl font-bold text-slate-800">
//                 {formData.id === 0 ? 'Add New MTC Centre' : 'Edit MTC Details'}
//               </h2>
//             </div>

//             <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
//               <div className="bg-slate-50 border-b border-slate-200 px-6 py-4">
//                 <h3 className="text-sm font-semibold text-teal-700 uppercase tracking-wider">Centre Information</h3>
//               </div>
              
//               <form onSubmit={handleSave} className="p-8">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//                   {/* MTC Code */}
//                   <div className="space-y-1.5">
//                     <label className="text-sm font-semibold text-slate-700 flex items-center gap-1">
//                       MTC Code <span className="text-red-500">*</span>
//                     </label>
//                     <input 
//                       type="text"
//                       placeholder="e.g. JH/BOK/GOM/"
//                       className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-sm uppercase"
//                       value={formData.code}
//                       onChange={(e) => setFormData({...formData, code: e.target.value})}
//                       required
//                     />
//                     <p className="text-[10px] text-slate-400">State Code / District Code / Block Code /</p>
//                   </div>

//                   {/* MTC Name */}
//                   <div className="space-y-1.5">
//                     <label className="text-sm font-semibold text-slate-700 flex items-center gap-1">
//                       MTC Name <span className="text-red-500">*</span>
//                     </label>
//                     <input 
//                       type="text"
//                       placeholder="Enter Centre Name"
//                       className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-sm uppercase"
//                       value={formData.name}
//                       onChange={(e) => setFormData({...formData, name: e.target.value})}
//                       required
//                     />
//                   </div>

//                   {/* District Selection */}
//                   <div className="space-y-1.5">
//                     <label className="text-sm font-semibold text-slate-700 flex items-center gap-1">
//                       District <span className="text-red-500">*</span>
//                     </label>
//                     <select 
//                       className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-sm bg-white"
//                       value={formData.districtId}
//                       onChange={(e) => setFormData({...formData, districtId: e.target.value})}
//                       required
//                     >
//                       <option value="">Select District</option>
//                       {DISTRICTS.map(dist => (
//                         <option key={dist.id} value={dist.id}>{dist.name}</option>
//                       ))}
//                     </select>
//                   </div>

//                   {/* Block Selection */}
//                   <div className="space-y-1.5">
//                     <label className="text-sm font-semibold text-slate-700">Block</label>
//                     <select 
//                       className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-sm bg-white"
//                       value={formData.blockId}
//                       onChange={(e) => setFormData({...formData, blockId: e.target.value})}
//                     >
//                       <option value="">Select Block</option>
//                       <option value="BLOCK_1">BLOCK 1</option>
//                       <option value="BLOCK_2">BLOCK 2</option>
//                     </select>
//                   </div>

//                   {/* Total Beds */}
//                   <div className="space-y-1.5">
//                     <label className="text-sm font-semibold text-slate-700 flex items-center gap-1">
//                       Total Beds <span className="text-red-500">*</span>
//                     </label>
//                     <input 
//                       type="number"
//                       placeholder="0"
//                       className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-sm"
//                       value={formData.totalBeds}
//                       onChange={(e) => setFormData({...formData, totalBeds: e.target.value})}
//                       required
//                     />
//                   </div>

//                   {/* Available Beds */}
//                   <div className="space-y-1.5">
//                     <label className="text-sm font-semibold text-slate-700 flex items-center gap-1">
//                       Available Beds <span className="text-red-500">*</span>
//                     </label>
//                     <input 
//                       type="number"
//                       placeholder="0"
//                       className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-sm"
//                       value={formData.availableBeds}
//                       onChange={(e) => setFormData({...formData, availableBeds: e.target.value})}
//                       required
//                     />
//                   </div>

//                   {/* Status */}
//                   <div className="col-span-full">
//                     <label className="text-sm font-semibold text-slate-700 mb-3 block">Centre Status</label>
//                     <div className="flex gap-6">
//                       <label className="relative flex items-center gap-2 cursor-pointer group">
//                         <input 
//                           type="radio" 
//                           name="status"
//                           value="Active"
//                           className="w-4 h-4 text-teal-600 focus:ring-teal-500 border-slate-300"
//                           checked={formData.status === 'Active'}
//                           onChange={(e) => setFormData({...formData, status: e.target.value})}
//                         />
//                         <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">Active</span>
//                       </label>
//                       <label className="relative flex items-center gap-2 cursor-pointer group">
//                         <input 
//                           type="radio" 
//                           name="status"
//                           value="Inactive"
//                           className="w-4 h-4 text-teal-600 focus:ring-teal-500 border-slate-300"
//                           checked={formData.status === 'Inactive'}
//                           onChange={(e) => setFormData({...formData, status: e.target.value})}
//                         />
//                         <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">Inactive</span>
//                       </label>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Form Actions */}
//                 <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
//                   <button 
//                     type="button"
//                     onClick={() => setView('list')}
//                     className="flex items-center gap-2 px-6 py-2.5 rounded-lg border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-50 transition-all active:scale-95"
//                   >
//                     <X className="w-4 h-4" />
//                     Cancel
//                   </button>
//                   <button 
//                     type="submit"
//                     className="flex items-center gap-2 px-8 py-2.5 rounded-lg bg-teal-600 text-white font-semibold text-sm hover:bg-teal-700 shadow-md shadow-teal-600/20 transition-all active:scale-95"
//                   >
//                     <Save className="w-4 h-4" />
//                     Save Centre
//                   </button>
//                 </div>
//               </form>
//             </div>
            
//             <div className="mt-6 p-4 rounded-lg bg-amber-50 border border-amber-100 flex gap-3 items-start">
//               <div className="bg-amber-100 p-1.5 rounded-full text-amber-600">
//                 <Clock className="w-4 h-4" />
//               </div>
//               <p className="text-xs text-amber-800 leading-relaxed">
//                 <strong>Note:</strong> Please ensure the MTC Code follows the standard format as per state guidelines. 
//                 Incorrect codes may lead to data synchronization issues in the central repository.
//               </p>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }    


"use client"

import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Plus, 
  Edit2, 
  ChevronLeft, 
  ChevronRight, 
  Hospital, 
  MapPin, 
  Bed,
  Filter,
  MoreVertical,
  CheckCircle2,
  Clock,
  ArrowLeft,
  Save,
  X,
  ShieldCheck,
  LayoutGrid,
  TrendingUp
} from 'lucide-react';

// Type Definitions
interface Mtc {
  id: number;
  name: string;
  code: string;
  district: string;
  block: string;
  totalBeds: number;
  availableBeds: number;
  status: string;
}

interface District {
  id: number;
  name: string;
}

interface MtcFormData {
  id: number;
  code: string;
  name: string;
  districtId: string | number;
  blockId: string;
  totalBeds: string | number;
  availableBeds: string | number;
  status: string;
}

const INITIAL_DATA: Mtc[] = [
  { id: 1, name: "CHAS", code: "JH/BOK/BOK/", district: "BOKARO", block: "CHAS", totalBeds: 20, availableBeds: 20, status: "Active" },
  { id: 2, name: "GOMIA", code: "JH/BOK/GOM/", district: "BOKARO", block: "GOMIA", totalBeds: 10, availableBeds: 10, status: "Active" },
  { id: 3, name: "PETERWAR", code: "JH/BOK/NAW/", district: "BOKARO", block: "PETERWAR", totalBeds: 10, availableBeds: 8, status: "Active" },
  { id: 4, name: "FUSARO", code: "JH/BOK/FUS/", district: "BOKARO", block: "FUSARO", totalBeds: 10, availableBeds: 1, status: "Active" },
  { id: 5, name: "CHATRA", code: "JH/CHT/CHT/", district: "CHATRA", block: "CHATRA", totalBeds: 15, availableBeds: 15, status: "Active" },
  { id: 6, name: "HUNTERGUNJ", code: "JH/CHT/PRT/", district: "CHATRA", block: "HUNTERGUNJ", totalBeds: 10, availableBeds: 10, status: "Active" },
  { id: 7, name: "SIMARIA", code: "JH/CHT/SIM/", district: "CHATRA", block: "SIMARIA", totalBeds: 10, availableBeds: 0, status: "Active" },
  { id: 8, name: "TANDWA", code: "JH/CHT/TAN/", district: "CHATRA", block: "TANDWA", totalBeds: 10, availableBeds: 10, status: "Active" },
  { id: 9, name: "DUMRI", code: "JH/GRD/DMR/", district: "GIRIDIH", block: "DUMRI", totalBeds: 10, availableBeds: 10, status: "Active" },
  { id: 10, name: "GIRIDIH", code: "JH/GRD/GRD/", district: "GIRIDIH", block: "GIRIDIH", totalBeds: 10, availableBeds: 10, status: "Active" },
  { id: 11, name: "DHANBAD DH", code: "JH/DHN/DHN/", district: "DHANBAD", block: "DHANBAD", totalBeds: 25, availableBeds: 5, status: "Active" },
  { id: 12, name: "RANCHI SADAR", code: "JH/RAN/SDR/", district: "RANCHI", block: "RANCHI", totalBeds: 30, availableBeds: 2, status: "Inactive" },
];

const DISTRICTS: District[] = [
  { id: 1, name: "BOKARO" }, { id: 2, name: "CHATRA" }, { id: 16, name: "DEOGHAR" },
  { id: 4, name: "DHANBAD" }, { id: 17, name: "DUMKA" }, { id: 22, name: "EAST SINGHBHUM" },
  { id: 14, name: "GARHWA" }, { id: 3, name: "GIRIDIH" }, { id: 18, name: "GODDA" },
  { id: 9, name: "GUMLA" }, { id: 6, name: "HAZARIBAGH" }, { id: 19, name: "JAMTARA" },
  { id: 10, name: "KHUNTI" }, { id: 7, name: "KODERMA" }, { id: 15, name: "LATEHAR" },
  { id: 11, name: "LOHARDAGA" }, { id: 20, name: "PAKUR" }, { id: 13, name: "PALAMU" },
  { id: 5, name: "RAMGARH" }, { id: 8, name: "RANCHI" }, { id: 21, name: "SAHIBGANJ" },
  { id: 23, name: "SERAIKELA" }, { id: 12, name: "SIMDEGA" }, { id: 24, name: "WEST SINGHBHUM" }
];

export default function App() {
  const [view, setView] = useState<'list' | 'details'>('list');
  const [data, setData] = useState<Mtc[]>(INITIAL_DATA);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  // Form State
  const [formData, setFormData] = useState<MtcFormData>({
    id: 0,
    code: '',
    name: '',
    districtId: '',
    blockId: '',
    totalBeds: '',
    availableBeds: '',
    status: 'Active'
  });

  // Derived Analytics Indicators
  const totalAllocatedBeds = useMemo(() => data.reduce((acc, curr) => acc + curr.totalBeds, 0), [data]);
  const totalVacantBeds = useMemo(() => data.reduce((acc, curr) => acc + curr.availableBeds, 0), [data]);

  // Filter logic
  const filteredData = useMemo(() => {
    return data.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.code.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, data]);

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleEdit = (mtc: Mtc) => {
    setFormData({
      id: mtc.id,
      code: mtc.code,
      name: mtc.name,
      districtId: DISTRICTS.find(d => d.name === mtc.district)?.id || '',
      blockId: mtc.block,
      totalBeds: mtc.totalBeds,
      availableBeds: mtc.availableBeds,
      status: mtc.status
    });
    setView('details');
  };

  const handleAddNew = () => {
    setFormData({
      id: 0,
      code: '',
      name: '',
      districtId: '',
      blockId: '',
      totalBeds: '',
      availableBeds: '',
      status: 'Active'
    });
    setView('details');
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const targetDistrict = DISTRICTS.find(d => d.id === Number(formData.districtId))?.name || 'UNKNOWN';
    
    if (formData.id === 0) {
      const newItem: Mtc = {
        id: Date.now(),
        name: formData.name.toUpperCase(),
        code: formData.code.toUpperCase(),
        district: targetDistrict,
        block: formData.blockId || 'N/A',
        totalBeds: Number(formData.totalBeds),
        availableBeds: Number(formData.availableBeds),
        status: formData.status
      };
      setData([newItem, ...data]);
    } else {
      setData(data.map(item => item.id === formData.id ? {
        ...item,
        name: formData.name.toUpperCase(),
        code: formData.code.toUpperCase(),
        district: targetDistrict,
        block: formData.blockId || 'N/A',
        totalBeds: Number(formData.totalBeds),
        availableBeds: Number(formData.availableBeds),
        status: formData.status
      } : item));
    }
    setView('list');
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-3 md:p-6 font-sans text-slate-900 selection:bg-indigo-500 selection:text-white">
      <div className="max-w-7xl mx-auto">
        
        {view === 'list' ? (
          <>
            {/* Minimal High-Contrast Executive Header */}
            <div className="bg-slate-900 text-white rounded-2xl p-6 mb-6 shadow-xl shadow-slate-900/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none -mr-20 -mt-20" />
              <div>
                <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold tracking-widest uppercase mb-1">
                  <ShieldCheck className="w-4 h-4" /> Comprehensive Administration
                </div>
                <h1 className="text-2xl font-black tracking-tight flex items-center gap-2">
                  MTC Central Directory
                </h1>
                <p className="text-slate-400 text-xs mt-1">Real-time occupancy metrics across regional clinical frameworks.</p>
              </div>
              
              <button 
                className="w-full md:w-auto flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-3 rounded-xl font-bold tracking-wide text-xs uppercase transition-all shadow-lg shadow-indigo-600/20 active:translate-y-px"
                onClick={handleAddNew}
              >
                <Plus className="w-4 h-4 stroke-3" />
                Add New Record
              </button>
            </div>

            {/* Quick Metrics Streamlined Panel */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-slate-400 text-[11px] font-bold uppercase tracking-wider block">Total Hubs</span>
                  <span className="text-xl font-black text-slate-800">{data.length}</span>
                </div>
                <div className="bg-slate-50 p-2 rounded-lg text-slate-600"><LayoutGrid className="w-4 h-4" /></div>
              </div>
              <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-slate-400 text-[11px] font-bold uppercase tracking-wider block">Gross Capacity</span>
                  <span className="text-xl font-black text-slate-800">{totalAllocatedBeds}</span>
                </div>
                <div className="bg-indigo-50 p-2 rounded-lg text-indigo-600"><Bed className="w-4 h-4" /></div>
              </div>
              <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-slate-400 text-[11px] font-bold uppercase tracking-wider block">Net Vacancies</span>
                  <span className="text-xl font-black text-indigo-600">{totalVacantBeds}</span>
                </div>
                <div className="bg-emerald-50 p-2 rounded-lg text-emerald-600"><TrendingUp className="w-4 h-4" /></div>
              </div>
              <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-slate-400 text-[11px] font-bold uppercase tracking-wider block">Active Rate</span>
                  <span className="text-xl font-black text-slate-800">
                    {Math.round((data.filter(d => d.status === 'Active').length / data.length) * 100)}%
                  </span>
                </div>
                <div className="bg-slate-50 p-2 rounded-lg text-slate-600"><Hospital className="w-4 h-4" /></div>
              </div>
            </div>

            {/* Matrix Filters Layout */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 mb-6">
              <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
                <div className="relative w-full sm:w-80">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Filter by keyword index..." 
                    className="w-full pl-9 pr-4 py-2 bg-slate-50/50 border border-slate-200 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-800 placeholder:text-slate-400"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                  />
                </div>
                
                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1.5 rounded-lg">
                    <span>Rows:</span>
                    <select 
                      className="bg-transparent font-bold text-slate-800 focus:outline-none cursor-pointer"
                      value={rowsPerPage}
                      onChange={(e) => setRowsPerPage(Number(e.target.value))}
                    >
                      <option value={10}>10</option>
                      <option value={25}>25</option>
                      <option value={50}>50</option>
                    </select>
                  </div>
                  <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-500 transition-colors">
                    <Filter className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Streamlined Modern Grid Table */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/70 border-b border-slate-200 text-slate-500 text-[11px] font-bold uppercase tracking-wider">
                      <th className="px-5 py-3 w-14 text-center">Ref</th>
                      <th className="px-5 py-3">Facility Matrix</th>
                      <th className="px-5 py-3">Registry Code</th>
                      <th className="px-5 py-3">Jurisdiction Area</th>
                      <th className="px-5 py-3 text-center">Available / Total Beds</th>
                      <th className="px-5 py-3">Status</th>
                      <th className="px-5 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {paginatedData.length > 0 ? paginatedData.map((mtc, index) => {
                      const percentage = (mtc.availableBeds / mtc.totalBeds) * 100;
                      return (
                        <tr key={mtc.id} className="hover:bg-slate-50/50 transition-colors group">
                          <td className="px-5 py-4 text-xs font-mono text-slate-400 text-center">
                            {String((currentPage - 1) * rowsPerPage + index + 1).padStart(2, '0')}
                          </td>
                          <td className="px-5 py-4">
                            <div className="font-bold text-slate-900 text-sm tracking-tight">{mtc.name}</div>
                            <div className="text-[10px] text-slate-400 font-mono mt-0.5">ID: {mtc.id + 4300}</div>
                          </td>
                          <td className="px-5 py-4">
                            <code className="text-xs font-mono bg-slate-50 border border-slate-200/60 px-1.5 py-0.5 rounded text-slate-600">
                              {mtc.code}
                            </code>
                          </td>
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-1 text-xs font-semibold text-slate-700">
                              <MapPin className="w-3 h-3 text-slate-400" />
                              {mtc.district}
                            </div>
                            <div className="text-[11px] text-slate-400 ml-4 mt-0.5">{mtc.block}</div>
                          </td>
                          <td className="px-5 py-4">
                            <div className="flex flex-col items-center max-w-[130px] mx-auto">
                              <div className="text-xs font-bold text-slate-800 flex items-center gap-1">
                                <span className={mtc.availableBeds === 0 ? "text-rose-600" : "text-indigo-600"}>
                                  {mtc.availableBeds}
                                </span>
                                <span className="text-slate-300 font-normal">/</span>
                                <span className="text-slate-500 font-medium">{mtc.totalBeds}</span>
                              </div>
                              <div className="w-full h-1 bg-slate-100 rounded-full mt-1.5 overflow-hidden">
                                <div 
                                  className={`h-full rounded-full transition-all duration-300 ${
                                    percentage === 0 ? 'bg-rose-500' : percentage <= 20 ? 'bg-amber-500' : 'bg-indigo-600'
                                  }`}
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-4">
                            {mtc.status === 'Active' ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200/40">
                                <CheckCircle2 className="w-2.5 h-2.5" />
                                Active
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-500 border border-slate-200">
                                <Clock className="w-2.5 h-2.5" />
                                Hold
                              </span>
                            )}
                          </td>
                          <td className="px-5 py-4 text-right">
                            <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button 
                                onClick={() => handleEdit(mtc)}
                                className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded transition-colors">
                                <MoreVertical className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    }) : (
                      <tr>
                        <td colSpan={7} className="px-5 py-12 text-center text-slate-400 text-xs italic bg-slate-50/20">
                          No indices correspond to the existing query constraints.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Minimal Streamlined Pagination */}
              <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-[11px] font-semibold text-slate-500">
                  Showing <span className="text-slate-800">{Math.min(filteredData.length, (currentPage - 1) * rowsPerPage + 1)}</span>–<span className="text-slate-800">{Math.min(filteredData.length, currentPage * rowsPerPage)}</span> of <span className="text-slate-800">{filteredData.length}</span> entries
                </div>
                
                <div className="flex items-center gap-1">
                  <button 
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-1.5 border border-slate-200 rounded-lg bg-white hover:bg-slate-50 disabled:opacity-40 transition-all shadow-sm"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  
                  <div className="flex items-center gap-0.5">
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all ${
                          currentPage === i + 1 
                          ? 'bg-slate-900 text-white' 
                          : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>

                  <button 
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages || totalPages === 0}
                    className="p-1.5 border border-slate-200 rounded-lg bg-white hover:bg-slate-50 disabled:opacity-40 transition-all shadow-sm"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Profile Registry Configuration Section */
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-5">
              <button 
                onClick={() => setView('list')}
                className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-slate-900 transition-colors bg-white px-3 py-2 rounded-xl border border-slate-200 shadow-sm"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to Master Index
              </button>
              <span className="text-[10px] font-mono uppercase bg-indigo-50 border border-indigo-100 text-indigo-700 px-2.5 py-1 rounded-md">
                Protocol Override
              </span>
            </div>

            <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden">
              <div className="border-b border-slate-200 px-6 py-4 bg-slate-50">
                <h3 className="text-base font-black text-slate-900">
                  {formData.id === 0 ? 'Initialize New Facility Profile' : 'Edit Institutional Registry'}
                </h3>
              </div>
              
              <form onSubmit={handleSave} className="p-6 md:p-8 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* MTC Code */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      System Identifier Tag <span className="text-rose-500">*</span>
                    </label>
                    <input 
                      type="text"
                      placeholder="e.g. JH/BOK/GOM/"
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all text-xs font-mono uppercase text-slate-800"
                      value={formData.code}
                      onChange={(e) => setFormData({...formData, code: e.target.value})}
                      required
                    />
                  </div>

                  {/* MTC Name */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Corporate Name Designation <span className="text-rose-500">*</span>
                    </label>
                    <input 
                      type="text"
                      placeholder="Enter designation specifications..."
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all text-xs uppercase font-semibold text-slate-800"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>

                  {/* District Selection */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Assigned District Jurisdiction <span className="text-rose-500">*</span>
                    </label>
                    <select 
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all text-xs font-medium text-slate-800 cursor-pointer"
                      value={formData.districtId}
                      onChange={(e) => setFormData({...formData, districtId: e.target.value})}
                      required
                    >
                      <option value="">Select Target Node...</option>
                      {DISTRICTS.map(dist => (
                        <option key={dist.id} value={dist.id}>{dist.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Block Selection */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Sector Block Name</label>
                    <input 
                      type="text"
                      placeholder="Specify structural block location..."
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all text-xs uppercase text-slate-800"
                      value={formData.blockId}
                      onChange={(e) => setFormData({...formData, blockId: e.target.value})}
                    />
                  </div>

                  {/* Total Beds */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Gross Allocated Capacity <span className="text-rose-500">*</span>
                    </label>
                    <input 
                      type="number"
                      placeholder="0"
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all text-xs font-bold text-slate-800"
                      value={formData.totalBeds}
                      onChange={(e) => setFormData({...formData, totalBeds: e.target.value})}
                      required
                    />
                  </div>

                  {/* Available Beds */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Net Vacant Allocations <span className="text-rose-500">*</span>
                    </label>
                    <input 
                      type="number"
                      placeholder="0"
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all text-xs font-bold text-slate-800"
                      value={formData.availableBeds}
                      onChange={(e) => setFormData({...formData, availableBeds: e.target.value})}
                      required
                    />
                  </div>
                </div>

                {/* Status Selection Panel */}
                <div className="bg-slate-50 border border-slate-200/60 p-4 rounded-xl">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">Administrative Status Blueprint</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input 
                        type="radio" 
                        name="status"
                        value="Active"
                        className="w-3.5 h-3.5 text-indigo-600 focus:ring-indigo-500 border-slate-300"
                        checked={formData.status === 'Active'}
                        onChange={(e) => setFormData({...formData, status: e.target.value})}
                      />
                      <span className="text-xs font-bold text-slate-600 group-hover:text-slate-900 transition-colors">Operational Deployment</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input 
                        type="radio" 
                        name="status"
                        value="Inactive"
                        className="w-3.5 h-3.5 text-indigo-600 focus:ring-indigo-500 border-slate-300"
                        checked={formData.status === 'Inactive'}
                        onChange={(e) => setFormData({...formData, status: e.target.value})}
                      />
                      <span className="text-xs font-bold text-slate-600 group-hover:text-slate-900 transition-colors">Suspended Inactive State</span>
                    </label>
                  </div>
                </div>

                {/* Controls Form Footer */}
                <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
                  <button 
                    type="button"
                    onClick={() => setView('list')}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-slate-200 text-slate-600 font-bold text-[11px] uppercase tracking-wider hover:bg-slate-50 transition-all"
                  >
                    <X className="w-3.5 h-3.5" />
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-indigo-600 text-white font-bold text-[11px] uppercase tracking-wider hover:bg-indigo-500 transition-all shadow-md shadow-indigo-600/10"
                  >
                    <Save className="w-3.5 h-3.5" />
                    Commit Metrics
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}