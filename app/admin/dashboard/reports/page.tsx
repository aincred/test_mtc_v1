// 'use client';

// import React, { useState, useRef, useEffect } from 'react';
// import { Calendar, Search, ChevronDown, Check, Users } from 'lucide-react';

// // --- Constants & Mock Data ---
// const DISTRICTS = [
//   { id: '1', name: 'BOKARO' }, { id: '2', name: 'CHATRA' }, { id: '16', name: 'DEOGHAR' },
//   { id: '4', name: 'DHANBAD' }, { id: '17', name: 'DUMKA' }, { id: '22', name: 'EAST SINGHBHUM' },
//   { id: '14', name: 'GARHWA' }, { id: '3', name: 'GIRIDIH' }, { id: '18', name: 'GODDA' },
//   { id: '9', name: 'GUMLA' }, { id: '6', name: 'HAZARIBAGH' }, { id: '19', name: 'JAMTARA' },
//   { id: '10', name: 'KHUNTI' }, { id: '7', name: 'KODERMA' }, { id: '15', name: 'LATEHAR' },
//   { id: '11', name: 'LOHARDAGA' }, { id: '20', name: 'PAKUR' }, { id: '13', name: 'PALAMU' },
//   { id: '5', name: 'RAMGARH' }, { id: '8', name: 'RANCHI' }, { id: '21', name: 'SAHIBGANJ' },
//   { id: '23', name: 'SERAIKELA' }, { id: '12', name: 'SIMDEGA' }, { id: '24', name: 'WEST SINGHBHUM' }
// ];

// const STAFF_CATEGORIES = [
//   { id: '1', name: 'Medical Officer' },
//   { id: '2', name: 'ANM' },
//   { id: '3', name: 'Nutrition Counsellor' },
//   { id: '4', name: 'Cook cum Care Taker' },
//   { id: '5', name: 'Attendent Cleaner' },
//   { id: '6', name: 'Medical Social Worker' },
//   { id: '7', name: 'Block Data Manager' },
//   { id: '8', name: 'Block Programme Manager' },
//   { id: '9', name: 'Hospital Manager' },
//   { id: '10', name: 'Support Staff' }
// ];

// const MOCK_MTCS: Record<string, { id: string; name: string }[]> = {
//   '1': [{ id: '101', name: 'CHAS MTC' }, { id: '102', name: 'BERMO MTC' }],
//   '4': [{ id: '401', name: 'DHANBAD SADAR' }],
//   '7': [{ id: '69', name: 'DOMCHANCH' }, { id: '70', name: 'KODERMA' }, { id: '71', name: 'SATGAWA' }],
//   '8': [{ id: '801', name: 'RANCHI SADAR' }, { id: '802', name: 'RIMS MTC' }],
// };

// interface StaffReportEntry {
//   id: number;
//   district: string;
//   mtcName: string;
//   staffName: string;
//   designation: string;
//   mobile: string;
//   joiningDate: string;
//   status: 'Active' | 'Inactive';
// }

// const MOCK_REPORT_DATA: StaffReportEntry[] = [
//   { id: 1, district: 'BOKARO', mtcName: 'CHAS MTC', staffName: 'Dr. Rakesh Kumar', designation: 'Medical Officer', mobile: '9876543210', joiningDate: '12-Jan-2022', status: 'Active' },
//   { id: 2, district: 'BOKARO', mtcName: 'CHAS MTC', staffName: 'Sunita Devi', designation: 'ANM', mobile: '9876543211', joiningDate: '15-Mar-2022', status: 'Active' },
//   { id: 3, district: 'KODERMA', mtcName: 'DOMCHANCH', staffName: 'Priya Singh', designation: 'Nutrition Counsellor', mobile: '9876543212', joiningDate: '01-Jun-2023', status: 'Active' },
//   { id: 4, district: 'RANCHI', mtcName: 'RIMS MTC', staffName: 'Dr. Anita Sharma', designation: 'Medical Officer', mobile: '9876543213', joiningDate: '10-Feb-2021', status: 'Inactive' },
//   { id: 5, district: 'RANCHI', mtcName: 'RIMS MTC', staffName: 'Rahul Verma', designation: 'Block Data Manager', mobile: '9876543214', joiningDate: '20-Aug-2022', status: 'Active' },
// ];


// // --- Custom Multi-Select Dropdown Component ---
// interface MultiSelectProps {
//   options: { id: string; name: string }[];
//   selected: string[];
//   onChange: (selected: string[]) => void;
//   placeholder: string;
//   disabled?: boolean;
// }

// const MultiSelect: React.FC<MultiSelectProps> = ({ options, selected, onChange, placeholder, disabled }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const toggleOption = (id: string) => {
//     if (selected.includes(id)) {
//       onChange(selected.filter(item => item !== id));
//     } else {
//       onChange([...selected, id]);
//     }
//   };

//   const selectAll = () => {
//     if (selected.length === options.length) {
//       onChange([]);
//     } else {
//       onChange(options.map(opt => opt.id));
//     }
//   };

//   const displayText = selected.length === 0 
//     ? placeholder 
//     : selected.length === options.length 
//       ? 'All Selected' 
//       : `${selected.length} selected`;

//   return (
//     <div className="relative w-full" ref={dropdownRef}>
//       <button
//         type="button"
//         onClick={() => !disabled && setIsOpen(!isOpen)}
//         disabled={disabled}
//         className={`w-full flex items-center justify-between px-3 py-1.5 text-sm border rounded-md transition-colors ${
//           disabled 
//             ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed' 
//             : 'bg-white border-gray-300 hover:border-[#0b918c] focus:ring-1 focus:ring-[#0b918c]'
//         }`}
//       >
//         <span className="truncate mr-2">{displayText}</span>
//         <ChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
//       </button>

//       {isOpen && !disabled && (
//         <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
//           <div className="p-1">
//             <button
//               type="button"
//               onClick={selectAll}
//               className="w-full flex items-center px-2 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded"
//             >
//               <div className={`w-4 h-4 mr-2 border rounded flex items-center justify-center ${selected.length === options.length ? 'bg-[#0b918c] border-[#0b918c]' : 'border-gray-300'}`}>
//                 {selected.length === options.length && <Check size={12} className="text-white" />}
//               </div>
//               Select All
//             </button>
//             <div className="h-px bg-gray-200 my-1"></div>
//             {options.map(option => (
//               <button
//                 key={option.id}
//                 type="button"
//                 onClick={() => toggleOption(option.id)}
//                 className="w-full flex items-center px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-50 rounded"
//               >
//                 <div className={`w-4 h-4 mr-2 border rounded flex items-center justify-center transition-colors ${selected.includes(option.id) ? 'bg-[#0b918c] border-[#0b918c]' : 'border-gray-300'}`}>
//                   {selected.includes(option.id) && <Check size={12} className="text-white" />}
//                 </div>
//                 <span className="truncate text-left">{option.name}</span>
//               </button>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };


// // --- Main Report Component ---
// export default function StaffDetailsReport() {
//   // State
//   const [fromDate, setFromDate] = useState('');
//   const [toDate, setToDate] = useState('');
//   const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
//   const [selectedMtcs, setSelectedMtcs] = useState<string[]>([]);
//   const [selectedStaffCategories, setSelectedStaffCategories] = useState<string[]>([]);
  
//   const [hasSearched, setHasSearched] = useState(false);
//   const [isSearching, setIsSearching] = useState(false);
//   const [reportResults, setReportResults] = useState<StaffReportEntry[]>([]);

//   // Computed data for dependent dropdowns
//   const availableMtcs = selectedDistricts.flatMap(distId => MOCK_MTCS[distId] || []);

//   // Ensure MTC selections are valid if districts change
//   useEffect(() => {
//     const validMtcIds = availableMtcs.map(m => m.id);
//     const newSelectedMtcs = selectedMtcs.filter(id => validMtcIds.includes(id));
//     if (newSelectedMtcs.length !== selectedMtcs.length) {
//       setSelectedMtcs(newSelectedMtcs);
//     }
//   }, [selectedDistricts, availableMtcs]);

//   // Handlers
//   const handleSearch = async () => {
//     setIsSearching(true);
//     console.log("Searching with filters:", {
//       fromDate, toDate, selectedDistricts, selectedMtcs, selectedStaffCategories
//     });

//     try {
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 800));
      
//       // Filter mock data
//       let results = [...MOCK_REPORT_DATA];
      
//       // Apply District Filter
//       if (selectedDistricts.length > 0) {
//         const districtNames = DISTRICTS.filter(d => selectedDistricts.includes(d.id)).map(d => d.name);
//         results = results.filter(r => districtNames.includes(r.district));
//       }

//       // Apply MTC Filter
//       if (selectedMtcs.length > 0) {
//         const mtcNames = availableMtcs.filter(m => selectedMtcs.includes(m.id)).map(m => m.name);
//         results = results.filter(r => mtcNames.includes(r.mtcName));
//       }

//       // Apply Staff Category Filter
//       if (selectedStaffCategories.length > 0) {
//         const categoryNames = STAFF_CATEGORIES.filter(c => selectedStaffCategories.includes(c.id)).map(c => c.name);
//         results = results.filter(r => categoryNames.includes(r.designation));
//       }

//       setReportResults(results);
//       setHasSearched(true);
//     } catch (error) {
//       console.error("Error fetching report:", error);
//     } finally {
//       setIsSearching(false);
//     }
//   };

//   return (
//     <div className="w-full p-4 font-sans text-gray-800">
//       <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden relative mt-4">
        
//         {/* Card Header */}
//         <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
//           <h5 className="text-lg font-semibold m-0 text-[#0b918c]">Staff Details Report</h5>
//         </div>

//         {/* Card Body */}
//         <div className="p-6">
          
//           {/* Filters Area */}
//           <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end mb-6">
            
//             {/* From Date */}
//             <div className="md:col-span-2 flex flex-col">
//               <label className="text-xs font-medium text-gray-600 mb-1.5">From Date</label>
//               <div className="relative">
//                 <input 
//                   type="date" 
//                   value={fromDate} 
//                   onChange={(e) => setFromDate(e.target.value)} 
//                   className="w-full pl-3 pr-8 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0b918c] focus:border-[#0b918c] transition-colors" 
//                 />
//                 <Calendar size={14} className="absolute right-2 top-2.5 text-gray-400 pointer-events-none" />
//               </div>
//             </div>

//             {/* To Date */}
//             <div className="md:col-span-2 flex flex-col">
//               <label className="text-xs font-medium text-gray-600 mb-1.5">To Date</label>
//               <div className="relative">
//                 <input 
//                   type="date" 
//                   value={toDate} 
//                   onChange={(e) => setToDate(e.target.value)} 
//                   className="w-full pl-3 pr-8 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0b918c] focus:border-[#0b918c] transition-colors" 
//                 />
//                 <Calendar size={14} className="absolute right-2 top-2.5 text-gray-400 pointer-events-none" />
//               </div>
//             </div>

//             {/* District Multi-Select */}
//             <div className="md:col-span-3 flex flex-col">
//               <label className="text-xs font-medium text-gray-600 mb-1.5">District</label>
//               <MultiSelect 
//                 options={DISTRICTS}
//                 selected={selectedDistricts}
//                 onChange={setSelectedDistricts}
//                 placeholder="None selected"
//               />
//             </div>

//             {/* MTC Multi-Select */}
//             <div className="md:col-span-2 flex flex-col">
//               <label className="text-xs font-medium text-gray-600 mb-1.5">MTC</label>
//               <MultiSelect 
//                 options={availableMtcs}
//                 selected={selectedMtcs}
//                 onChange={setSelectedMtcs}
//                 placeholder="None selected"
//                 disabled={availableMtcs.length === 0}
//               />
//             </div>

//             {/* Staff Category Multi-Select */}
//             <div className="md:col-span-2 flex flex-col">
//               <label className="text-xs font-medium text-gray-600 mb-1.5">Staff by Category</label>
//               <MultiSelect 
//                 options={STAFF_CATEGORIES}
//                 selected={selectedStaffCategories}
//                 onChange={setSelectedStaffCategories}
//                 placeholder="None selected"
//               />
//             </div>

//             {/* Search Button */}
//             <div className="md:col-span-1 flex flex-col">
//               <button
//                 type="button"
//                 onClick={handleSearch}
//                 disabled={isSearching}
//                 className="inline-flex items-center justify-center w-full px-2 py-1.5 border border-[#17a2b8] text-sm font-medium rounded-md text-white bg-[#17a2b8] hover:bg-[#138496] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#17a2b8] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed shadow-sm"
//               >
//                 {isSearching ? (
//                   <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
//                 ) : (
//                   <>
//                     <Search size={14} className="mr-1" /> Search
//                   </>
//                 )}
//               </button>
//             </div>

//           </div>

//           {/* Results Area */}
//           <div id="div_Report" className="mt-8">
//             {!hasSearched ? (
//               <div className="flex flex-col items-center justify-center py-16 bg-gray-50/50 rounded-xl border border-dashed border-gray-200">
//                 <Users size={48} className="text-gray-300 mb-4" />
//                 <p className="text-gray-500 text-sm font-medium">Use the filters above to generate the staff report.</p>
//               </div>
//             ) : (
//               <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm animate-in fade-in duration-300">
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-16">S.No</th>
//                       <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">District</th>
//                       <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">MTC Name</th>
//                       <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Staff Name</th>
//                       <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Designation</th>
//                       <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Mobile</th>
//                       <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Joining Date</th>
//                       <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {reportResults.map((staff, index) => (
//                       <tr key={staff.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50 hover:bg-gray-50 transition-colors'}>
//                         <td className="px-4 py-3 text-sm text-gray-900">{index + 1}</td>
//                         <td className="px-4 py-3 text-sm text-gray-700">{staff.district}</td>
//                         <td className="px-4 py-3 text-sm text-gray-700">{staff.mtcName}</td>
//                         <td className="px-4 py-3 text-sm font-medium text-gray-900">{staff.staffName}</td>
//                         <td className="px-4 py-3 text-sm text-[#0b918c] font-medium">{staff.designation}</td>
//                         <td className="px-4 py-3 text-sm text-gray-600">{staff.mobile}</td>
//                         <td className="px-4 py-3 text-sm text-gray-600">{staff.joiningDate}</td>
//                         <td className="px-4 py-3 text-sm">
//                           <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
//                             staff.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
//                           }`}>
//                             {staff.status}
//                           </span>
//                         </td>
//                       </tr>
//                     ))}
//                     {reportResults.length === 0 && (
//                       <tr>
//                         <td colSpan={8} className="px-4 py-12 text-center text-sm text-gray-500 bg-white">
//                           No staff members found matching the selected criteria.
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//                 {reportResults.length > 0 && (
//                   <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 text-xs text-gray-500 flex justify-between items-center">
//                     <span>Showing {reportResults.length} entries</span>
//                     <button className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100 transition-colors">
//                       Export to Excel
//                     </button>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }


'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Calendar, Search, ChevronDown, Check, Users } from 'lucide-react';

// --- Constants & Mock Data ---
const DISTRICTS = [
  { id: '1', name: 'BOKARO' }, { id: '2', name: 'CHATRA' }, { id: '16', name: 'DEOGHAR' },
  { id: '4', name: 'DHANBAD' }, { id: '17', name: 'DUMKA' }, { id: '22', name: 'EAST SINGHBHUM' },
  { id: '14', name: 'GARHWA' }, { id: '3', name: 'GIRIDIH' }, { id: '18', name: 'GODDA' },
  { id: '9', name: 'GUMLA' }, { id: '6', name: 'HAZARIBAGH' }, { id: '19', name: 'JAMTARA' },
  { id: '10', name: 'KHUNTI' }, { id: '7', name: 'KODERMA' }, { id: '15', name: 'LATEHAR' },
  { id: '11', name: 'LOHARDAGA' }, { id: '20', name: 'PAKUR' }, { id: '13', name: 'PALAMU' },
  { id: '5', name: 'RAMGARH' }, { id: '8', name: 'RANCHI' }, { id: '21', name: 'SAHIBGANJ' },
  { id: '23', name: 'SERAIKELA' }, { id: '12', name: 'SIMDEGA' }, { id: '24', name: 'WEST SINGHBHUM' }
];

const STAFF_CATEGORIES = [
  { id: '1', name: 'Medical Officer' },
  { id: '2', name: 'ANM' },
  { id: '3', name: 'Nutrition Counsellor' },
  { id: '4', name: 'Cook cum Care Taker' },
  { id: '5', name: 'Attendent Cleaner' },
  { id: '6', name: 'Medical Social Worker' },
  { id: '7', name: 'Block Data Manager' },
  { id: '8', name: 'Block Programme Manager' },
  { id: '9', name: 'Hospital Manager' },
  { id: '10', name: 'Support Staff' }
];

const MOCK_MTCS: Record<string, { id: string; name: string }[]> = {
  '1': [{ id: '101', name: 'CHAS MTC' }, { id: '102', name: 'BERMO MTC' }],
  '4': [{ id: '401', name: 'DHANBAD SADAR' }],
  '7': [{ id: '69', name: 'DOMCHANCH' }, { id: '70', name: 'KODERMA' }, { id: '71', name: 'SATGAWA' }],
  '8': [{ id: '801', name: 'RANCHI SADAR' }, { id: '802', name: 'RIMS MTC' }],
};

interface StaffReportEntry {
  id: number;
  district: string;
  mtcName: string;
  staffName: string;
  designation: string;
  mobile: string;
  joiningDate: string;
  status: 'Active' | 'Inactive';
}

const MOCK_REPORT_DATA: StaffReportEntry[] = [
  { id: 1, district: 'BOKARO', mtcName: 'CHAS MTC', staffName: 'Dr. Rakesh Kumar', designation: 'Medical Officer', mobile: '9876543210', joiningDate: '12-Jan-2022', status: 'Active' },
  { id: 2, district: 'BOKARO', mtcName: 'CHAS MTC', staffName: 'Sunita Devi', designation: 'ANM', mobile: '9876543211', joiningDate: '15-Mar-2022', status: 'Active' },
  { id: 3, district: 'KODERMA', mtcName: 'DOMCHANCH', staffName: 'Priya Singh', designation: 'Nutrition Counsellor', mobile: '9876543212', joiningDate: '01-Jun-2023', status: 'Active' },
  { id: 4, district: 'RANCHI', mtcName: 'RIMS MTC', staffName: 'Dr. Anita Sharma', designation: 'Medical Officer', mobile: '9876543213', joiningDate: '10-Feb-2021', status: 'Inactive' },
  { id: 5, district: 'RANCHI', mtcName: 'RIMS MTC', staffName: 'Rahul Verma', designation: 'Block Data Manager', mobile: '9876543214', joiningDate: '20-Aug-2022', status: 'Active' },
];


// --- Custom Multi-Select Dropdown Component ---
interface MultiSelectProps {
  options: { id: string; name: string }[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder: string;
  disabled?: boolean;
}

const MultiSelect: React.FC<MultiSelectProps> = ({ options, selected, onChange, placeholder, disabled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOption = (id: string) => {
    if (selected.includes(id)) {
      onChange(selected.filter(item => item !== id));
    } else {
      onChange([...selected, id]);
    }
  };

  const selectAll = () => {
    if (selected.length === options.length) {
      onChange([]);
    } else {
      onChange(options.map(opt => opt.id));
    }
  };

  const displayText = selected.length === 0 
    ? placeholder 
    : selected.length === options.length 
      ? 'All Selected' 
      : `${selected.length} selected`;

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`w-full flex items-center justify-between px-3 py-1.5 text-sm border rounded-md transition-colors ${
          disabled 
            ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed' 
            : 'bg-white border-gray-300 hover:border-[#0b918c] focus:ring-1 focus:ring-[#0b918c]'
        }`}
      >
        <span className="truncate mr-2">{displayText}</span>
        <ChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && !disabled && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
          <div className="p-1">
            <button
              type="button"
              onClick={selectAll}
              className="w-full flex items-center px-2 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded"
            >
              <div className={`w-4 h-4 mr-2 border rounded flex items-center justify-center ${selected.length === options.length ? 'bg-[#0b918c] border-[#0b918c]' : 'border-gray-300'}`}>
                {selected.length === options.length && <Check size={12} className="text-white" />}
              </div>
              Select All
            </button>
            <div className="h-px bg-gray-200 my-1"></div>
            {options.map(option => (
              <button
                key={option.id}
                type="button"
                onClick={() => toggleOption(option.id)}
                className="w-full flex items-center px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-50 rounded"
              >
                <div className={`w-4 h-4 mr-2 border rounded flex items-center justify-center transition-colors ${selected.includes(option.id) ? 'bg-[#0b918c] border-[#0b918c]' : 'border-gray-300'}`}>
                  {selected.includes(option.id) && <Check size={12} className="text-white" />}
                </div>
                <span className="truncate text-left">{option.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};


// --- Main Report Component ---
export default function StaffDetailsReport() {
  // State
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
  const [selectedMtcs, setSelectedMtcs] = useState<string[]>([]);
  const [selectedStaffCategories, setSelectedStaffCategories] = useState<string[]>([]);
  
  const [hasSearched, setHasSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [reportResults, setReportResults] = useState<StaffReportEntry[]>([]);

  // Computed data for dependent dropdowns
  const availableMtcs = selectedDistricts.flatMap(distId => MOCK_MTCS[distId] || []);

  // Ensure MTC selections are valid if districts change (Dependency Warning Fixed)
  useEffect(() => {
    const validMtcIds = availableMtcs.map(m => m.id);
    const newSelectedMtcs = selectedMtcs.filter(id => validMtcIds.includes(id));
    if (newSelectedMtcs.length !== selectedMtcs.length) {
      setSelectedMtcs(newSelectedMtcs);
    }
  }, [availableMtcs, selectedMtcs]);

  // Handlers
  const handleSearch = async () => {
    setIsSearching(true);
    console.log("Searching with filters:", {
      fromDate, toDate, selectedDistricts, selectedMtcs, selectedStaffCategories
    });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Filter mock data
      let results = [...MOCK_REPORT_DATA];
      
      // Apply District Filter
      if (selectedDistricts.length > 0) {
        const districtNames = DISTRICTS.filter(d => selectedDistricts.includes(d.id)).map(d => d.name);
        results = results.filter(r => districtNames.includes(r.district));
      }

      // Apply MTC Filter
      if (selectedMtcs.length > 0) {
        const mtcNames = availableMtcs.filter(m => selectedMtcs.includes(m.id)).map(m => m.name);
        results = results.filter(r => mtcNames.includes(r.mtcName));
      }

      // Apply Staff Category Filter
      if (selectedStaffCategories.length > 0) {
        const categoryNames = STAFF_CATEGORIES.filter(c => selectedStaffCategories.includes(c.id)).map(c => c.name);
        results = results.filter(r => categoryNames.includes(r.designation));
      }

      setReportResults(results);
      setHasSearched(true);
    } catch (error) {
      console.error("Error fetching report:", error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="w-full p-4 font-sans text-gray-800">
      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden relative mt-4">
        
        {/* Card Header */}
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <h5 className="text-lg font-semibold m-0 text-[#0b918c]">Staff Details Report</h5>
        </div>

        {/* Card Body */}
        <div className="p-6">
          
          {/* Filters Area */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end mb-6">
            
            {/* From Date */}
            <div className="md:col-span-2 flex flex-col">
              <label className="text-xs font-medium text-gray-600 mb-1.5">From Date</label>
              <div className="relative">
                <input 
                  type="date" 
                  value={fromDate} 
                  onChange={(e) => setFromDate(e.target.value)} 
                  className="w-full pl-3 pr-8 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0b918c] focus:border-[#0b918c] transition-colors" 
                />
                <Calendar size={14} className="absolute right-2 top-2.5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* To Date */}
            <div className="md:col-span-2 flex flex-col">
              <label className="text-xs font-medium text-gray-600 mb-1.5">To Date</label>
              <div className="relative">
                <input 
                  type="date" 
                  value={toDate} 
                  onChange={(e) => setToDate(e.target.value)} 
                  className="w-full pl-3 pr-8 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0b918c] focus:border-[#0b918c] transition-colors" 
                />
                <Calendar size={14} className="absolute right-2 top-2.5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* District Multi-Select */}
            <div className="md:col-span-3 flex flex-col">
              <label className="text-xs font-medium text-gray-600 mb-1.5">District</label>
              <MultiSelect 
                options={DISTRICTS}
                selected={selectedDistricts}
                onChange={setSelectedDistricts}
                placeholder="None selected"
              />
            </div>

            {/* MTC Multi-Select */}
            <div className="md:col-span-2 flex flex-col">
              <label className="text-xs font-medium text-gray-600 mb-1.5">MTC</label>
              <MultiSelect 
                options={availableMtcs}
                selected={selectedMtcs}
                onChange={setSelectedMtcs}
                placeholder="None selected"
                disabled={availableMtcs.length === 0}
              />
            </div>

            {/* Staff Category Multi-Select */}
            <div className="md:col-span-2 flex flex-col">
              <label className="text-xs font-medium text-gray-600 mb-1.5">Staff by Category</label>
              <MultiSelect 
                options={STAFF_CATEGORIES}
                selected={selectedStaffCategories}
                onChange={setSelectedStaffCategories}
                placeholder="None selected"
              />
            </div>

            {/* Search Button */}
            <div className="md:col-span-1 flex flex-col">
              <button
                type="button"
                onClick={handleSearch}
                disabled={isSearching}
                className="inline-flex items-center justify-center w-full px-2 py-1.5 border border-[#17a2b8] text-sm font-medium rounded-md text-white bg-[#17a2b8] hover:bg-[#138496] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#17a2b8] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed shadow-sm"
              >
                {isSearching ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Search size={14} className="mr-1" /> Search
                  </>
                )}
              </button>
            </div>

          </div>

          {/* Results Area */}
          <div id="div_Report" className="mt-8">
            {!hasSearched ? (
              <div className="flex flex-col items-center justify-center py-16 bg-gray-50/50 rounded-xl border border-dashed border-gray-200">
                <Users size={48} className="text-gray-300 mb-4" />
                <p className="text-gray-500 text-sm font-medium">Use the filters above to generate the staff report.</p>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm animate-in fade-in duration-300">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-16">S.No</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">District</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">MTC Name</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Staff Name</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Designation</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Mobile</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Joining Date</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {reportResults.map((staff, index) => (
                      <tr key={staff.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50 hover:bg-gray-50 transition-colors'}>
                        <td className="px-4 py-3 text-sm text-gray-900">{index + 1}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{staff.district}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{staff.mtcName}</td>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">{staff.staffName}</td>
                        <td className="px-4 py-3 text-sm text-[#0b918c] font-medium">{staff.designation}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{staff.mobile}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{staff.joiningDate}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                            staff.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {staff.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {reportResults.length === 0 && (
                      <tr>
                        <td colSpan={8} className="px-4 py-12 text-center text-sm text-gray-500 bg-white">
                          No staff members found matching the selected criteria.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                {reportResults.length > 0 && (
                  <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 text-xs text-gray-500 flex justify-between items-center">
                    <span>Showing {reportResults.length} entries</span>
                    <button className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100 transition-colors">
                      Export to Excel
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}