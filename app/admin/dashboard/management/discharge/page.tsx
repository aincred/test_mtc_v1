// 'use client';

// import React, { useState, ChangeEvent } from 'react';
// import { Calendar, Search, Edit } from 'lucide-react';

// // Define the shape of our form state
// interface SearchFormData {
//   fromDate: string;
//   toDate: string;
//   recordNo: string;
//   samNo: string;
//   childName: string;
// }

// // Define the shape of our table data
// interface ChildRecord {
//   recordNo: string;
//   samNo: string;
//   name: string;
//   sex: 'Male' | 'Female';
//   admissionDate: string;
//   lengthHeight: number;
//   weight: number;
//   muac: number | string;
//   edema: string;
//   zScore: string;
//   targetWeight: number;
//   phone: string;
// }

// // Mock data extracted from the HTML
// const MOCK_RECORDS: ChildRecord[] = [
//   {
//     recordNo: '563728',
//     samNo: 'JH/BOK/BOK/2480',
//     name: 'SHIV KUMAR SOREN',
//     sex: 'Male',
//     admissionDate: '05-Apr-2026',
//     lengthHeight: 69.0,
//     weight: 6.3,
//     muac: 11.4,
//     edema: 'No',
//     zScore: '<-3SD',
//     targetWeight: 7.245,
//     phone: '9102896621',
//   },
//   {
//     recordNo: '563873',
//     samNo: 'JH/BOK/BOK/2481',
//     name: 'ASHA KUMARI',
//     sex: 'Female',
//     admissionDate: '13-Apr-2026',
//     lengthHeight: 108.0,
//     weight: 13.1,
//     muac: 11,
//     edema: 'No',
//     zScore: '<-3SD',
//     targetWeight: 15.065,
//     phone: '8388867013',
//   },
//   {
//     recordNo: '563993',
//     samNo: 'JH/BOK/BOK/2482',
//     name: 'MEERA KARMKAR',
//     sex: 'Female',
//     admissionDate: '18-Apr-2026',
//     lengthHeight: 53.0,
//     weight: 3.0,
//     muac: 0,
//     edema: 'No',
//     zScore: '<-3SD',
//     targetWeight: 3.45,
//     phone: '9647384064',
//   },
// ];

// export default function ChildDischarge() {
//   const [formData, setFormData] = useState<SearchFormData>({
//     fromDate: '',
//     toDate: '',
//     recordNo: '',
//     samNo: '',
//     childName: '',
//   });

//   const [records, setRecords] = useState<ChildRecord[]>(MOCK_RECORDS);

//   // Handle standard text/date inputs
//   const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
    
//     // Validation for Record No (Numbers only)
//     if (name === 'recordNo' && value !== '' && !/^\d+$/.test(value)) {
//       return; 
//     }

//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSearch = () => {
//     console.log('Searching discharge records with payload:', formData);
//     // Add your API call logic here, e.g., filtering the mock records
//   };

//   const handleDischargeAction = (recordNo: string) => {
//     console.log(`Navigating to discharge page for record ID: ${recordNo}`);
//     // Simulate navigation: window.location.href = `GetDischarge?recordId=${recordNo}`
//   };

//   return (
//     <div className="w-full p-4 font-sans text-gray-800">
//       <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
//         {/* Card Header */}
//         <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
//           <h5 className="text-lg font-semibold m-0 text-[#0b918c]">Child Discharge</h5>
//         </div>

//         {/* Card Body */}
//         <div className="p-6">
//           {/* Search Row */}
//           <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-4 items-end mb-8">
//             {/* From Date */}
//             <div className="flex flex-col">
//               <label className="text-xs font-medium text-gray-600 mb-1.5">From Date</label>
//               <div className="relative">
//                 <input
//                   type="date"
//                   name="fromDate"
//                   value={formData.fromDate}
//                   onChange={handleInputChange}
//                   className="w-full pl-3 pr-8 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0b918c] focus:border-[#0b918c] transition-colors"
//                 />
//                 <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
//                   <Calendar size={14} className="text-gray-400" />
//                 </div>
//               </div>
//             </div>

//             {/* To Date */}
//             <div className="flex flex-col">
//               <label className="text-xs font-medium text-gray-600 mb-1.5">To Date</label>
//               <div className="relative">
//                 <input
//                   type="date"
//                   name="toDate"
//                   value={formData.toDate}
//                   onChange={handleInputChange}
//                   className="w-full pl-3 pr-8 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0b918c] focus:border-[#0b918c] transition-colors"
//                 />
//                 <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
//                   <Calendar size={14} className="text-gray-400" />
//                 </div>
//               </div>
//             </div>

//             {/* Record No */}
//             <div className="flex flex-col">
//               <label className="text-xs font-medium text-gray-600 mb-1.5">Record No</label>
//               <input
//                 type="text"
//                 name="recordNo"
//                 value={formData.recordNo}
//                 onChange={handleInputChange}
//                 className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0b918c] focus:border-[#0b918c] transition-colors"
//               />
//             </div>

//             {/* SAM Number */}
//             <div className="flex flex-col">
//               <label className="text-xs font-medium text-gray-600 mb-1.5">SAM Number</label>
//               <input
//                 type="text"
//                 name="samNo"
//                 value={formData.samNo}
//                 onChange={handleInputChange}
//                 className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0b918c] focus:border-[#0b918c] transition-colors"
//               />
//             </div>

//             {/* Child Name */}
//             <div className="flex flex-col">
//               <label className="text-xs font-medium text-gray-600 mb-1.5">Child Name</label>
//               <input
//                 type="text"
//                 name="childName"
//                 value={formData.childName}
//                 onChange={handleInputChange}
//                 className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0b918c] focus:border-[#0b918c] transition-colors"
//               />
//             </div>

//             {/* Search Button */}
//             <div className="flex flex-col">
//               <button
//                 type="button"
//                 onClick={handleSearch}
//                 className="inline-flex items-center justify-center w-full px-4 py-2 border border-[#0b918c] text-sm font-medium rounded-md text-[#0b918c] bg-white hover:bg-[#0b918c] hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0b918c] transition-all duration-200"
//               >
//                 <Search size={16} className="mr-2" />
//                 Search
//               </button>
//             </div>
//           </div>

//           {/* Results Section */}
//           <div className="mt-8 flex flex-col">
//             <div className="text-center mb-6">
//               <h5 className="text-lg font-medium text-[#026158]">Select a Child from the list to Discharge</h5>
//             </div>

//             <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Record Number</th>
//                     <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">SAM Number</th>
//                     <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Child Name</th>
//                     <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Sex</th>
//                     <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Admission Date</th>
//                     <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Length/Height (cm)</th>
//                     <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Weight (kg)</th>
//                     <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">MUAC (cm)</th>
//                     <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Edema</th>
//                     <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Z-Score (SD)</th>
//                     <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Target Weight (kg)</th>
//                     <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Phone</th>
//                     <th scope="col" className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Select</th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {records.length > 0 ? (
//                     records.map((record, index) => (
//                       <tr key={record.recordNo} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
//                         <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">{record.recordNo}</td>
//                         <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">{record.samNo}</td>
//                         <td className="px-4 py-3 text-sm font-medium text-gray-900 whitespace-nowrap">{record.name}</td>
//                         <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{record.sex}</td>
//                         <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{record.admissionDate}</td>
//                         <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{record.lengthHeight.toFixed(2)}</td>
//                         <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{record.weight.toFixed(2)}</td>
//                         <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{record.muac}</td>
//                         <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{record.edema}</td>
//                         <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{record.zScore}</td>
//                         <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{record.targetWeight.toFixed(3)}</td>
//                         <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{record.phone}</td>
//                         <td className="px-4 py-3 text-sm text-center whitespace-nowrap">
//                           <button
//                             onClick={() => handleDischargeAction(record.recordNo)}
//                             className="inline-flex items-center justify-center p-1.5 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
//                             title="Discharge"
//                           >
//                             <Edit size={16} />
//                           </button>
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan={13} className="px-4 py-8 text-center text-sm text-gray-500">
//                         No child records found.
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
            
//             {/* Simple Pagination Footer Mockup */}
//             <div className="flex items-center justify-between mt-4">
//               <div className="text-sm text-gray-500">
//                 Showing {records.length > 0 ? 1 : 0} to {records.length} of {records.length} entries
//               </div>
//               <div className="flex space-x-1">
//                 <button disabled className="px-3 py-1 text-sm border border-gray-300 rounded bg-gray-100 text-gray-400 cursor-not-allowed">Previous</button>
//                 <button className="px-3 py-1 text-sm border border-[#0b918c] rounded bg-[#0b918c] text-white">1</button>
//                 <button disabled className="px-3 py-1 text-sm border border-gray-300 rounded bg-gray-100 text-gray-400 cursor-not-allowed">Next</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

'use client';

import React, { useState, ChangeEvent } from 'react';
import { Calendar, Search, Edit } from 'lucide-react';

// Define the shape of our form state
interface SearchFormData {
  fromDate: string;
  toDate: string;
  recordNo: string;
  samNo: string;
  childName: string;
}

// Define the shape of our table data
interface ChildRecord {
  recordNo: string;
  samNo: string;
  name: string;
  sex: 'Male' | 'Female';
  admissionDate: string;
  lengthHeight: number;
  weight: number;
  muac: number | string;
  edema: string;
  zScore: string;
  targetWeight: number;
  phone: string;
}

// Mock data extracted from the HTML
const MOCK_RECORDS: ChildRecord[] = [
  {
    recordNo: '563728',
    samNo: 'JH/BOK/BOK/2480',
    name: 'SHIV KUMAR SOREN',
    sex: 'Male',
    admissionDate: '05-Apr-2026',
    lengthHeight: 69.0,
    weight: 6.3,
    muac: 11.4,
    edema: 'No',
    zScore: '<-3SD',
    targetWeight: 7.245,
    phone: '9102896621',
  },
  {
    recordNo: '563873',
    samNo: 'JH/BOK/BOK/2481',
    name: 'ASHA KUMARI',
    sex: 'Female',
    admissionDate: '13-Apr-2026',
    lengthHeight: 108.0,
    weight: 13.1,
    muac: 11,
    edema: 'No',
    zScore: '<-3SD',
    targetWeight: 15.065,
    phone: '8388867013',
  },
  {
    recordNo: '563993',
    samNo: 'JH/BOK/BOK/2482',
    name: 'MEERA KARMKAR',
    sex: 'Female',
    admissionDate: '18-Apr-2026',
    lengthHeight: 53.0,
    weight: 3.0,
    muac: 0,
    edema: 'No',
    zScore: '<-3SD',
    targetWeight: 3.45,
    phone: '9647384064',
  },
];

export default function ChildDischarge() {
  const [formData, setFormData] = useState<SearchFormData>({
    fromDate: '',
    toDate: '',
    recordNo: '',
    samNo: '',
    childName: '',
  });

  const [records, setRecords] = useState<ChildRecord[]>(MOCK_RECORDS);

  // Handle standard text/date inputs
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Validation for Record No (Numbers only)
    if (name === 'recordNo' && value !== '' && !/^\d+$/.test(value)) {
      return; 
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    console.log('Searching discharge records with payload:', formData);
    
    // Dynamically filter the data to use setRecords and fix the linting error
    const filtered = MOCK_RECORDS.filter((record) => {
      const matchRecordNo = formData.recordNo ? record.recordNo.includes(formData.recordNo) : true;
      const matchSamNo = formData.samNo ? record.samNo.toLowerCase().includes(formData.samNo.toLowerCase()) : true;
      const matchName = formData.childName ? record.name.toLowerCase().includes(formData.childName.toLowerCase()) : true;
      return matchRecordNo && matchSamNo && matchName;
    });

    setRecords(filtered);
  };

  const handleDischargeAction = (recordNo: string) => {
    console.log(`Navigating to discharge page for record ID: ${recordNo}`);
    // Simulate navigation: window.location.href = `GetDischarge?recordId=${recordNo}`
  };

  return (
    <div className="w-full p-4 font-sans text-gray-800">
      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
        {/* Card Header */}
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <h5 className="text-lg font-semibold m-0 text-[#0b918c]">Child Discharge</h5>
        </div>

        {/* Card Body */}
        <div className="p-6">
          {/* Search Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-4 items-end mb-8">
            {/* From Date */}
            <div className="flex flex-col">
              <label className="text-xs font-medium text-gray-600 mb-1.5">From Date</label>
              <div className="relative">
                <input
                  type="date"
                  name="fromDate"
                  value={formData.fromDate}
                  onChange={handleInputChange}
                  className="w-full pl-3 pr-8 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0b918c] focus:border-[#0b918c] transition-colors"
                />
                <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                  <Calendar size={14} className="text-gray-400" />
                </div>
              </div>
            </div>

            {/* To Date */}
            <div className="flex flex-col">
              <label className="text-xs font-medium text-gray-600 mb-1.5">To Date</label>
              <div className="relative">
                <input
                  type="date"
                  name="toDate"
                  value={formData.toDate}
                  onChange={handleInputChange}
                  className="w-full pl-3 pr-8 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0b918c] focus:border-[#0b918c] transition-colors"
                />
                <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                  <Calendar size={14} className="text-gray-400" />
                </div>
              </div>
            </div>

            {/* Record No */}
            <div className="flex flex-col">
              <label className="text-xs font-medium text-gray-600 mb-1.5">Record No</label>
              <input
                type="text"
                name="recordNo"
                value={formData.recordNo}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0b918c] focus:border-[#0b918c] transition-colors"
              />
            </div>

            {/* SAM Number */}
            <div className="flex flex-col">
              <label className="text-xs font-medium text-gray-600 mb-1.5">SAM Number</label>
              <input
                type="text"
                name="samNo"
                value={formData.samNo}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0b918c] focus:border-[#0b918c] transition-colors"
              />
            </div>

            {/* Child Name */}
            <div className="flex flex-col">
              <label className="text-xs font-medium text-gray-600 mb-1.5">Child Name</label>
              <input
                type="text"
                name="childName"
                value={formData.childName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0b918c] focus:border-[#0b918c] transition-colors"
              />
            </div>

            {/* Search Button */}
            <div className="flex flex-col">
              <button
                type="button"
                onClick={handleSearch}
                className="inline-flex items-center justify-center w-full px-4 py-2 border border-[#0b918c] text-sm font-medium rounded-md text-[#0b918c] bg-white hover:bg-[#0b918c] hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0b918c] transition-all duration-200"
              >
                <Search size={16} className="mr-2" />
                Search
              </button>
            </div>
          </div>

          {/* Results Section */}
          <div className="mt-8 flex flex-col">
            <div className="text-center mb-6">
              <h5 className="text-lg font-medium text-[#026158]">Select a Child from the list to Discharge</h5>
            </div>

            <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Record Number</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">SAM Number</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Child Name</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Sex</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Admission Date</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Length/Height (cm)</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Weight (kg)</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">MUAC (cm)</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Edema</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Z-Score (SD)</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Target Weight (kg)</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Phone</th>
                    <th scope="col" className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Select</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {records.length > 0 ? (
                    records.map((record, index) => (
                      <tr key={record.recordNo} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">{record.recordNo}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">{record.samNo}</td>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900 whitespace-nowrap">{record.name}</td>
                        <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{record.sex}</td>
                        <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{record.admissionDate}</td>
                        <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{record.lengthHeight.toFixed(2)}</td>
                        <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{record.weight.toFixed(2)}</td>
                        <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{record.muac}</td>
                        <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{record.edema}</td>
                        <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{record.zScore}</td>
                        <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{record.targetWeight.toFixed(3)}</td>
                        <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{record.phone}</td>
                        <td className="px-4 py-3 text-sm text-center whitespace-nowrap">
                          <button
                            onClick={() => handleDischargeAction(record.recordNo)}
                            className="inline-flex items-center justify-center p-1.5 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                            title="Discharge"
                          >
                            <Edit size={16} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={13} className="px-4 py-8 text-center text-sm text-gray-500">
                        No child records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            {/* Simple Pagination Footer Mockup */}
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-gray-500">
                Showing {records.length > 0 ? 1 : 0} to {records.length} of {records.length} entries
              </div>
              <div className="flex space-x-1">
                <button disabled className="px-3 py-1 text-sm border border-gray-300 rounded bg-gray-100 text-gray-400 cursor-not-allowed">Previous</button>
                <button className="px-3 py-1 text-sm border border-[#0b918c] rounded bg-[#0b918c] text-white">1</button>
                <button disabled className="px-3 py-1 text-sm border border-gray-300 rounded bg-gray-100 text-gray-400 cursor-not-allowed">Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}