// 'use client';

// import React, { useState, ChangeEvent, FormEvent } from 'react';
// import { Plus, Edit, Trash2, Calendar, Save, X, Image as ImageIcon } from 'lucide-react';

// // --- Types & Interfaces ---
// interface SpotlightEntry {
//   id: number;
//   heading: string;
//   description: string;
//   fileName: string;
//   fromDate: string;
//   toDate: string;
// }

// interface SpotlightFormData {
//   id: number;
//   heading: string;
//   description: string;
//   fromDate: string;
//   toDate: string;
//   file: File | null;
// }

// // --- Mock Data ---
// const INITIAL_SPOTLIGHTS: SpotlightEntry[] = [
//   {
//     id: 1,
//     heading: 'Treatment at Malnutrition Treatment Centre',
//     description: 'Once the child is diagnosed through anthropometry examination as SAM, the child gets admitted to MTC and treated based medical complication and result of appetite test. The child undergoes medical che...',
//     fileName: '3rd-section-bg.jpg',
//     fromDate: '2021-06-11T10:00',
//     toDate: '',
//   },
//   {
//     id: 2,
//     heading: 'What is Malnutrition Treatment Centre?',
//     description: 'It is a unit in a health facility where children with Severe Acute Malnutrition (SAM) are admitted and managed. Children are admitted as per the defined admission criteria and provided with medical an...',
//     fileName: 'b3.jpg',
//     fromDate: '2021-06-08T10:00',
//     toDate: '',
//   },
//   {
//     id: 3,
//     heading: 'Malnutrition Treatment Center',
//     description: 'Malnutrition is a serious public health problem in Jharkhand. As per MoHFW CNNS 2016-17, 6.7% children under the age of 5 years are Severe Acute Malnourished (SAM) in Jharkhand. SAM is an important pr...',
//     fileName: 'b1.jpg',
//     fromDate: '2021-06-04T10:00',
//     toDate: '2021-06-10T17:00',
//   },
// ];

// const INITIAL_FORM_STATE: SpotlightFormData = {
//   id: 0,
//   heading: '',
//   description: '',
//   fromDate: '',
//   toDate: '',
//   file: null,
// };

// export default function SpotlightManager() {
//   // --- State ---
//   const [view, setView] = useState<'list' | 'form'>('list');
//   const [spotlights, setSpotlights] = useState<SpotlightEntry[]>(INITIAL_SPOTLIGHTS);
//   const [formData, setFormData] = useState<SpotlightFormData>(INITIAL_FORM_STATE);
//   const [isSaving, setIsSaving] = useState(false);

//   // --- Handlers: List View ---
//   const handleAddClick = () => {
//     setFormData(INITIAL_FORM_STATE);
//     setView('form');
//   };

//   const handleEditClick = (spotlight: SpotlightEntry) => {
//     setFormData({
//       id: spotlight.id,
//       heading: spotlight.heading,
//       description: spotlight.description,
//       fromDate: spotlight.fromDate,
//       toDate: spotlight.toDate,
//       file: null, // Don't pre-fill file input for security/browser reasons
//     });
//     setView('form');
//   };

//   const handleDeleteClick = (id: number) => {
//     if (window.confirm('Are you sure you want to delete this Spotlight?')) {
//       setSpotlights((prev) => prev.filter((item) => item.id !== id));
//       // Add real API delete call here
//     }
//   };

//   // --- Handlers: Form View ---
//   const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       setFormData((prev) => ({ ...prev, file: e.target.files![0] }));
//     }
//   };

//   const handleCancel = () => {
//     setFormData(INITIAL_FORM_STATE);
//     setView('list');
//   };

//   const handleSave = async (e: FormEvent) => {
//     e.preventDefault();

//     if (!formData.heading.trim() || !formData.fromDate) {
//       alert('Please fill out all required fields (*).');
//       return;
//     }

//     if (formData.id === 0 && !formData.file) {
//       alert('An image is required for new spotlights.');
//       return;
//     }

//     setIsSaving(true);

//     try {
//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 1500));

//       if (formData.id === 0) {
//         // Create new
//         const newEntry: SpotlightEntry = {
//           id: Math.max(...spotlights.map((s) => s.id), 0) + 1,
//           heading: formData.heading,
//           description: formData.description,
//           fromDate: formData.fromDate,
//           toDate: formData.toDate,
//           fileName: formData.file ? formData.file.name : 'new-image.jpg',
//         };
//         setSpotlights([newEntry, ...spotlights]);
//       } else {
//         // Update existing
//         setSpotlights((prev) =>
//           prev.map((item) =>
//             item.id === formData.id
//               ? {
//                   ...item,
//                   heading: formData.heading,
//                   description: formData.description,
//                   fromDate: formData.fromDate,
//                   toDate: formData.toDate,
//                   fileName: formData.file ? formData.file.name : item.fileName,
//                 }
//               : item
//           )
//         );
//       }

//       console.log('Saved successfully!');
//       setView('list');
//       setFormData(INITIAL_FORM_STATE);
//     } catch (error) {
//       console.error('Failed to save', error);
//       alert('An error occurred while saving.');
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   // --- Formatting Helpers ---
//   const formatDate = (dateString: string) => {
//     if (!dateString) return '';
//     try {
//       const date = new Date(dateString);
//       return new Intl.DateTimeFormat('en-GB', {
//         day: '2-digit',
//         month: 'short',
//         year: 'numeric',
//         hour: '2-digit',
//         minute: '2-digit',
//         hour12: true,
//       }).format(date);
//     } catch {
//       return dateString;
//     }
//   };

//   // --- Render functions ---
//   const renderList = () => (
//     <>
//       <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
//         <h5 className="text-lg font-semibold m-0 text-[#0b918c]">Spotlight</h5>
//         <button
//           onClick={handleAddClick}
//           className="inline-flex items-center px-4 py-2 bg-[#17a2b8] text-white text-sm font-medium rounded hover:bg-[#138496] transition-colors shadow-sm"
//         >
//           <Plus size={16} className="mr-1.5" /> Add Spotlight
//         </button>
//       </div>
//       <div className="p-6">
//         <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-16">ID</th>
//                 <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Heading</th>
//                 <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-1/3">Description</th>
//                 <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">FileName</th>
//                 <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">From Date</th>
//                 <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">To Date</th>
//                 <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider w-24">Action</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {spotlights.map((spotlight, index) => (
//                 <tr key={spotlight.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
//                   <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">{spotlight.id}</td>
//                   <td className="px-4 py-3 text-sm font-medium text-gray-900">{spotlight.heading}</td>
//                   <td className="px-4 py-3 text-sm text-gray-600">
//                     <p className="line-clamp-2" title={spotlight.description}>
//                       {spotlight.description}
//                     </p>
//                   </td>
//                   <td className="px-4 py-3 text-sm text-[#0b918c] whitespace-nowrap hover:underline cursor-pointer">
//                     {spotlight.fileName}
//                   </td>
//                   <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{formatDate(spotlight.fromDate)}</td>
//                   <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{formatDate(spotlight.toDate)}</td>
//                   <td className="px-4 py-3 whitespace-nowrap text-center">
//                     <div className="flex justify-center space-x-2">
//                       <button
//                         onClick={() => handleEditClick(spotlight)}
//                         className="p-1.5 bg-[#17a2b8] text-white rounded hover:bg-[#138496] transition-colors"
//                         title="Edit"
//                       >
//                         <Edit size={14} />
//                       </button>
//                       <button
//                         onClick={() => handleDeleteClick(spotlight.id)}
//                         className="p-1.5 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
//                         title="Delete"
//                       >
//                         <Trash2 size={14} />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//               {spotlights.length === 0 && (
//                 <tr>
//                   <td colSpan={7} className="px-4 py-8 text-center text-sm text-gray-500">
//                     No spotlights found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//         <div className="flex items-center justify-between mt-4">
//           <div className="text-sm text-gray-500">
//             Showing {spotlights.length > 0 ? 1 : 0} to {spotlights.length} of {spotlights.length} entries
//           </div>
//         </div>
//       </div>
//     </>
//   );

//   const renderForm = () => (
//     <>
//       <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
//         <h5 className="text-lg font-semibold m-0 text-[#0b918c]">
//           {formData.id === 0 ? 'Add Spotlight' : 'Edit Spotlight'}
//         </h5>
//       </div>
//       <div className="p-6">
//         <form onSubmit={handleSave} className="space-y-6">
//           {/* Row 1: Heading */}
//           <div className="flex flex-col">
//             <label className="text-sm font-medium text-gray-700 mb-1.5">
//               Heading <span className="text-red-500 font-bold">*</span>
//             </label>
//             <textarea
//               name="heading"
//               value={formData.heading}
//               onChange={handleInputChange}
//               rows={2}
//               className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0b918c]/20 focus:border-[#0b918c] transition-colors"
//               required
//             />
//           </div>

//           {/* Row 2: Description */}
//           <div className="flex flex-col">
//             <label className="text-sm font-medium text-gray-700 mb-1.5">Description</label>
//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleInputChange}
//               rows={3}
//               className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0b918c]/20 focus:border-[#0b918c] transition-colors"
//             />
//           </div>

//           {/* Row 3: Dates & Image */}
//           <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
//             <div className="md:col-span-3 flex flex-col">
//               <label className="text-sm font-medium text-gray-700 mb-1.5">
//                 From Date <span className="text-red-500 font-bold">*</span>
//               </label>
//               <div className="relative">
//                 <input
//                   type="datetime-local"
//                   name="fromDate"
//                   value={formData.fromDate}
//                   onChange={handleInputChange}
//                   className="w-full pl-3 pr-10 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0b918c]/20 focus:border-[#0b918c] transition-colors"
//                   required
//                 />
//               </div>
//             </div>

//             <div className="md:col-span-3 flex flex-col">
//               <label className="text-sm font-medium text-gray-700 mb-1.5">To Date</label>
//               <div className="relative">
//                 <input
//                   type="datetime-local"
//                   name="toDate"
//                   value={formData.toDate}
//                   onChange={handleInputChange}
//                   className="w-full pl-3 pr-10 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0b918c]/20 focus:border-[#0b918c] transition-colors"
//                 />
//               </div>
//             </div>

//             <div className="md:col-span-6 flex flex-col">
//               <label className="text-sm font-medium text-gray-700 mb-1.5">
//                 Image {formData.id === 0 && <span className="text-red-500 font-bold">*</span>}
//               </label>
//               <input
//                 type="file"
//                 name="file"
//                 accept="image/png, image/gif, image/jpeg"
//                 onChange={handleFileChange}
//                 className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#0b918c]/10 file:text-[#0b918c] hover:file:bg-[#0b918c]/20 focus:outline-none focus:ring-2 focus:ring-[#0b918c]/20 transition-colors bg-white cursor-pointer"
//                 required={formData.id === 0}
//               />
//               {formData.id !== 0 && (
//                 <p className="text-xs text-gray-500 mt-1">Leave empty to keep existing image.</p>
//               )}
//             </div>
//           </div>

//           {/* Form Actions */}
//           <div className="flex justify-center items-center gap-4 mt-8 pt-6 border-t border-gray-100">
//             <button
//               type="submit"
//               disabled={isSaving}
//               className="inline-flex items-center justify-center px-8 py-2.5 text-sm font-medium rounded-md text-white bg-gradient-to-r from-[#0b918c] to-[#087874] hover:from-[#087874] hover:to-[#065b58] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0b918c] transition-all duration-200 disabled:opacity-70 shadow-sm"
//             >
//               <Save size={16} className="mr-2" />
//               {isSaving ? 'Saving...' : 'Save'}
//             </button>
//             <button
//               type="button"
//               onClick={handleCancel}
//               disabled={isSaving}
//               className="inline-flex items-center justify-center px-8 py-2.5 text-sm font-medium rounded-md text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-all duration-200 disabled:opacity-70 shadow-sm"
//             >
//               <X size={16} className="mr-2" />
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </>
//   );

//   return (
//     <div className="w-full p-4 font-sans text-gray-800">
//       <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden relative">
//         {view === 'list' ? renderList() : renderForm()}
//       </div>
//     </div>
//   );
// }

'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';

// --- Types & Interfaces ---
interface SpotlightEntry {
  id: number;
  heading: string;
  description: string;
  fileName: string;
  fromDate: string;
  toDate: string;
}

interface SpotlightFormData {
  id: number;
  heading: string;
  description: string;
  fromDate: string;
  toDate: string;
  file: File | null;
}

// --- Mock Data ---
const INITIAL_SPOTLIGHTS: SpotlightEntry[] = [
  {
    id: 1,
    heading: 'Treatment at Malnutrition Treatment Centre',
    description: 'Once the child is diagnosed through anthropometry examination as SAM, the child gets admitted to MTC and treated based medical complication and result of appetite test. The child undergoes medical che...',
    fileName: '3rd-section-bg.jpg',
    fromDate: '2021-06-11T10:00',
    toDate: '',
  },
  {
    id: 2,
    heading: 'What is Malnutrition Treatment Centre?',
    description: 'It is a unit in a health facility where children with Severe Acute Malnutrition (SAM) are admitted and managed. Children are admitted as per the defined admission criteria and provided with medical an...',
    fileName: 'b3.jpg',
    fromDate: '2021-06-08T10:00',
    toDate: '',
  },
  {
    id: 3,
    heading: 'Malnutrition Treatment Center',
    description: 'Malnutrition is a serious public health problem in Jharkhand. As per MoHFW CNNS 2016-17, 6.7% children under the age of 5 years are Severe Acute Malnourished (SAM) in Jharkhand. SAM is an important pr...',
    fileName: 'b1.jpg',
    fromDate: '2021-06-04T10:00',
    toDate: '2021-06-10T17:00',
  },
];

const INITIAL_FORM_STATE: SpotlightFormData = {
  id: 0,
  heading: '',
  description: '',
  fromDate: '',
  toDate: '',
  file: null,
};

export default function SpotlightManager() {
  // --- State ---
  const [view, setView] = useState<'list' | 'form'>('list');
  const [spotlights, setSpotlights] = useState<SpotlightEntry[]>(INITIAL_SPOTLIGHTS);
  const [formData, setFormData] = useState<SpotlightFormData>(INITIAL_FORM_STATE);
  const [isSaving, setIsSaving] = useState(false);

  // --- Handlers: List View ---
  const handleAddClick = () => {
    setFormData(INITIAL_FORM_STATE);
    setView('form');
  };

  const handleEditClick = (spotlight: SpotlightEntry) => {
    setFormData({
      id: spotlight.id,
      heading: spotlight.heading,
      description: spotlight.description,
      fromDate: spotlight.fromDate,
      toDate: spotlight.toDate,
      file: null, // Don't pre-fill file input for security/browser reasons
    });
    setView('form');
  };

  const handleDeleteClick = (id: number) => {
    if (window.confirm('Are you sure you want to delete this Spotlight?')) {
      setSpotlights((prev) => prev.filter((item) => item.id !== id));
      // Add real API delete call here
    }
  };

  // --- Handlers: Form View ---
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData((prev) => ({ ...prev, file: e.target.files![0] }));
    }
  };

  const handleCancel = () => {
    setFormData(INITIAL_FORM_STATE);
    setView('list');
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.heading.trim() || !formData.fromDate) {
      alert('Please fill out all required fields (*).');
      return;
    }

    if (formData.id === 0 && !formData.file) {
      alert('An image is required for new spotlights.');
      return;
    }

    setIsSaving(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (formData.id === 0) {
        // Create new
        const newEntry: SpotlightEntry = {
          id: Math.max(...spotlights.map((s) => s.id), 0) + 1,
          heading: formData.heading,
          description: formData.description,
          fromDate: formData.fromDate,
          toDate: formData.toDate,
          fileName: formData.file ? formData.file.name : 'new-image.jpg',
        };
        setSpotlights([newEntry, ...spotlights]);
      } else {
        // Update existing
        setSpotlights((prev) =>
          prev.map((item) =>
            item.id === formData.id
              ? {
                  ...item,
                  heading: formData.heading,
                  description: formData.description,
                  fromDate: formData.fromDate,
                  toDate: formData.toDate,
                  fileName: formData.file ? formData.file.name : item.fileName,
                }
              : item
          )
        );
      }

      console.log('Saved successfully!');
      setView('list');
      setFormData(INITIAL_FORM_STATE);
    } catch (error) {
      console.error('Failed to save', error);
      alert('An error occurred while saving.');
    } finally {
      setIsSaving(false);
    }
  };

  // --- Formatting Helpers ---
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }).format(date);
    } catch {
      return dateString;
    }
  };

  // --- Render functions ---
  const renderList = () => (
    <>
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
        <h5 className="text-lg font-semibold m-0 text-[#0b918c]">Spotlight</h5>
        <button
          onClick={handleAddClick}
          className="inline-flex items-center px-4 py-2 bg-[#17a2b8] text-white text-sm font-medium rounded hover:bg-[#138496] transition-colors shadow-sm"
        >
          <Plus size={16} className="mr-1.5" /> Add Spotlight
        </button>
      </div>
      <div className="p-6">
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-16">ID</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Heading</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-1/3">Description</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">FileName</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">From Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">To Date</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider w-24">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {spotlights.map((spotlight, index) => (
                <tr key={spotlight.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                  <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">{spotlight.id}</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{spotlight.heading}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    <p className="line-clamp-2" title={spotlight.description}>
                      {spotlight.description}
                    </p>
                  </td>
                  <td className="px-4 py-3 text-sm text-[#0b918c] whitespace-nowrap hover:underline cursor-pointer">
                    {spotlight.fileName}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{formatDate(spotlight.fromDate)}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{formatDate(spotlight.toDate)}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-center">
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => handleEditClick(spotlight)}
                        className="p-1.5 bg-[#17a2b8] text-white rounded hover:bg-[#138496] transition-colors"
                        title="Edit"
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(spotlight.id)}
                        className="p-1.5 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {spotlights.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-sm text-gray-500">
                    No spotlights found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-500">
            Showing {spotlights.length > 0 ? 1 : 0} to {spotlights.length} of {spotlights.length} entries
          </div>
        </div>
      </div>
    </>
  );

  const renderForm = () => (
    <>
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
        <h5 className="text-lg font-semibold m-0 text-[#0b918c]">
          {formData.id === 0 ? 'Add Spotlight' : 'Edit Spotlight'}
        </h5>
      </div>
      <div className="p-6">
        <form onSubmit={handleSave} className="space-y-6">
          {/* Row 1: Heading */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1.5">
              Heading <span className="text-red-500 font-bold">*</span>
            </label>
            <textarea
              name="heading"
              value={formData.heading}
              onChange={handleInputChange}
              rows={2}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0b918c]/20 focus:border-[#0b918c] transition-colors"
              required
            />
          </div>

          {/* Row 2: Description */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1.5">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0b918c]/20 focus:border-[#0b918c] transition-colors"
            />
          </div>

          {/* Row 3: Dates & Image */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-3 flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1.5">
                From Date <span className="text-red-500 font-bold">*</span>
              </label>
              <div className="relative">
                <input
                  type="datetime-local"
                  name="fromDate"
                  value={formData.fromDate}
                  onChange={handleInputChange}
                  className="w-full pl-3 pr-10 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0b918c]/20 focus:border-[#0b918c] transition-colors"
                  required
                />
              </div>
            </div>

            <div className="md:col-span-3 flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1.5">To Date</label>
              <div className="relative">
                <input
                  type="datetime-local"
                  name="toDate"
                  value={formData.toDate}
                  onChange={handleInputChange}
                  className="w-full pl-3 pr-10 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0b918c]/20 focus:border-[#0b918c] transition-colors"
                />
              </div>
            </div>

            <div className="md:col-span-6 flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1.5">
                Image {formData.id === 0 && <span className="text-red-500 font-bold">*</span>}
              </label>
              <input
                type="file"
                name="file"
                accept="image/png, image/gif, image/jpeg"
                onChange={handleFileChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#0b918c]/10 file:text-[#0b918c] hover:file:bg-[#0b918c]/20 focus:outline-none focus:ring-2 focus:ring-[#0b918c]/20 transition-colors bg-white cursor-pointer"
                required={formData.id === 0}
              />
              {formData.id !== 0 && (
                <p className="text-xs text-gray-500 mt-1">Leave empty to keep existing image.</p>
              )}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-center items-center gap-4 mt-8 pt-6 border-t border-gray-100">
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center justify-center px-8 py-2.5 text-sm font-medium rounded-md text-white bg-gradient-to-r from-[#0b918c] to-[#087874] hover:from-[#087874] hover:to-[#065b58] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0b918c] transition-all duration-200 disabled:opacity-70 shadow-sm"
            >
              <Save size={16} className="mr-2" />
              {isSaving ? 'Saving...' : 'Save'}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              disabled={isSaving}
              className="inline-flex items-center justify-center px-8 py-2.5 text-sm font-medium rounded-md text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-all duration-200 disabled:opacity-70 shadow-sm"
            >
              <X size={16} className="mr-2" />
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );

  return (
    <div className="w-full p-4 font-sans text-gray-800">
      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden relative">
        {view === 'list' ? renderList() : renderForm()}
      </div>
    </div>
  );
}