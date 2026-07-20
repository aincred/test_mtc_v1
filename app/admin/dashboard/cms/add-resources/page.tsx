// 'use client';

// import React, { useState, ChangeEvent, FormEvent } from 'react';
// import { Save, Trash2, UploadCloud, X } from 'lucide-react';

// // Mock data for dependent subcategories
// const MOCK_SUBCATEGORIES: Record<string, { id: string; name: string }[]> = {
//   '3': [{ id: '31', name: 'Training Module A' }, { id: '32', name: 'Guidelines 2024' }],
//   '5': [{ id: '51', name: 'Community Posters' }],
//   '6': [{ id: '61', name: 'Radio Jingles' }, { id: '62', name: 'TV Ads' }],
//   // Add other mappings as needed...
// };

// export default function AddResources() {
//   // Form State
//   const [categoryId, setCategoryId] = useState<string>('');
//   const [categoryName, setCategoryName] = useState<string>('');
//   const [subCategoryId, setSubCategoryId] = useState<string>('');
//   const [subCategoryName, setSubCategoryName] = useState<string>('');
//   const [fileDisplayName, setFileDisplayName] = useState<string>('');
//   const [file, setFile] = useState<File | null>(null);
//   const [displayImage, setDisplayImage] = useState<File | null>(null);

//   // UI State
//   const [availableSubcategories, setAvailableSubcategories] = useState<{ id: string; name: string }[]>([]);
//   const [isUploading, setIsUploading] = useState<boolean>(false);

//   // Handlers
//   const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
//     const val = e.target.value;
//     setCategoryId(val);
//     setSubCategoryId(''); // Reset subcategory when category changes
    
//     if (val && val !== '-1' && MOCK_SUBCATEGORIES[val]) {
//       setAvailableSubcategories(MOCK_SUBCATEGORIES[val]);
//     } else {
//       setAvailableSubcategories([]);
//     }
//   };

//   const handleSubCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
//     setSubCategoryId(e.target.value);
//   };

//   const handleDeleteCategory = () => {
//     if (confirm("Are you sure you want to remove this Category?")) {
//       console.log("Deleted Category ID:", categoryId);
//       setCategoryId('');
//       setCategoryName('');
//     }
//   };

//   const handleDeleteSubCategory = () => {
//     if (confirm("Are you sure you want to remove this Sub Category?")) {
//       console.log("Deleted Sub Category ID:", subCategoryId);
//       setSubCategoryId('');
//       setSubCategoryName('');
//     }
//   };

//   const handleSave = async (e: FormEvent) => {
//     e.preventDefault();
    
//     // Basic validation
//     if (!categoryId) {
//       alert("Please select a Category.");
//       return;
//     }

//     // Show upload modal
//     setIsUploading(true);

//     const formData = new FormData();
//     formData.append('categoryId', categoryId);
//     if (categoryId === '-1') formData.append('categoryName', categoryName);
//     formData.append('subCategoryId', subCategoryId);
//     if (subCategoryId === '-1') formData.append('subCategoryName', subCategoryName);
//     formData.append('fileDisplayName', fileDisplayName);
//     if (file) formData.append('file', file);
//     if (displayImage) formData.append('displayImage', displayImage);

//     console.log("Submitting Resource Data...");
//     for (let [key, value] of formData.entries()) {
//       console.log(`${key}:`, value);
//     }

//     // Simulate API Call Upload Time
//     try {
//       await new Promise((resolve) => setTimeout(resolve, 2000));
//       // alertify.success("Resource saved successfully!");
//       console.log("Upload Complete!");
//     } catch (error) {
//       console.error("Failed to upload resource", error);
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   return (
//     <div className="w-full p-4 font-sans text-gray-800">
//       <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden relative">
        
//         {/* Card Header */}
//         <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
//           <h5 className="text-lg font-semibold m-0 text-[#0b918c]">Add Resources</h5>
//         </div>

//         {/* Card Body */}
//         <div className="p-6">
//           <form onSubmit={handleSave}>
            
//             {/* Row 1: Categories & Subcategories */}
//             <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start mb-6">
              
//               {/* Category Dropdown */}
//               <div className="md:col-span-3 flex flex-col">
//                 <label className="text-sm font-medium text-gray-600 mb-1.5">Category</label>
//                 <div className="flex gap-2">
//                   <select
//                     value={categoryId}
//                     onChange={handleCategoryChange}
//                     className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0b918c] focus:border-[#0b918c] transition-colors bg-white"
//                   >
//                     <option value="">Select Category</option>
//                     <option value="3">Guidelines & Training Modules</option>
//                     <option value="5">Awareness Generation- Interpersonal Communication</option>
//                     <option value="6">Mass Media</option>
//                     <option value="7">Social Media</option>
//                     <option value="9">Case Studies</option>
//                     <option value="10">Other</option>
//                     <option value="-1" className="font-semibold text-[#0b918c]">Add New Category</option>
//                   </select>
//                   {/* Delete Button (Shows only when an existing category is selected) */}
//                   {categoryId && categoryId !== '-1' && (
//                     <button
//                       type="button"
//                       onClick={handleDeleteCategory}
//                       className="p-2 bg-red-50 text-red-600 border border-red-200 rounded-md hover:bg-red-100 transition-colors"
//                       title="Remove this Category"
//                     >
//                       <Trash2 size={16} />
//                     </button>
//                   )}
//                 </div>
//               </div>

//               {/* Conditional Category Name Input */}
//               {categoryId === '-1' && (
//                 <div className="md:col-span-3 flex flex-col">
//                   <label className="text-sm font-medium text-gray-600 mb-1.5">Category Name</label>
//                   <input
//                     type="text"
//                     value={categoryName}
//                     onChange={(e) => setCategoryName(e.target.value)}
//                     placeholder="Enter new category name"
//                     className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0b918c] focus:border-[#0b918c] transition-colors"
//                     required
//                   />
//                 </div>
//               )}

//               {/* SubCategory Dropdown */}
//               <div className="md:col-span-3 flex flex-col">
//                 <label className="text-sm font-medium text-gray-600 mb-1.5">SubCategory</label>
//                 <div className="flex gap-2">
//                   <select
//                     value={subCategoryId}
//                     onChange={handleSubCategoryChange}
//                     disabled={!categoryId}
//                     className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0b918c] focus:border-[#0b918c] transition-colors bg-white disabled:bg-gray-100 disabled:text-gray-400"
//                   >
//                     <option value="">Select SubCategory</option>
//                     {availableSubcategories.map((sub) => (
//                       <option key={sub.id} value={sub.id}>{sub.name}</option>
//                     ))}
//                     {categoryId && (
//                       <option value="-1" className="font-semibold text-[#0b918c]">Add New Sub Category</option>
//                     )}
//                   </select>
//                   {/* Delete Button (Shows only when an existing subcategory is selected) */}
//                   {subCategoryId && subCategoryId !== '-1' && (
//                     <button
//                       type="button"
//                       onClick={handleDeleteSubCategory}
//                       className="p-2 bg-red-50 text-red-600 border border-red-200 rounded-md hover:bg-red-100 transition-colors"
//                       title="Remove this Sub Category"
//                     >
//                       <Trash2 size={16} />
//                     </button>
//                   )}
//                 </div>
//               </div>

//               {/* Conditional SubCategory Name Input */}
//               {subCategoryId === '-1' && (
//                 <div className="md:col-span-3 flex flex-col">
//                   <label className="text-sm font-medium text-gray-600 mb-1.5">Sub Category Name</label>
//                   <input
//                     type="text"
//                     value={subCategoryName}
//                     onChange={(e) => setSubCategoryName(e.target.value)}
//                     placeholder="Enter new subcategory name"
//                     className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0b918c] focus:border-[#0b918c] transition-colors"
//                     required
//                   />
//                 </div>
//               )}
//             </div>

//             {/* SubCategory Items Render Area (Placeholder for `div_ItemsInSubCategory`) */}
//             <div className="w-full mb-6 empty:hidden" id="div_ItemsInSubCategory">
//                 {/* Dynamically loaded items would appear here based on selected subcategory */}
//             </div>

//             {/* Row 2: File Uploads */}
//             <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end mb-8">
              
//               {/* Display File Name */}
//               <div className="md:col-span-3 flex flex-col">
//                 <label className="text-sm font-medium text-gray-600 mb-1.5">Display File Name</label>
//                 <input
//                   type="text"
//                   value={fileDisplayName}
//                   onChange={(e) => setFileDisplayName(e.target.value)}
//                   className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0b918c] focus:border-[#0b918c] transition-colors"
//                   placeholder="Enter file display name"
//                 />
//               </div>

//               {/* File Upload */}
//               <div className="md:col-span-5 flex flex-col">
//                 <label className="text-sm font-medium text-gray-600 mb-1.5">File</label>
//                 <div className="relative">
//                   <input
//                     type="file"
//                     onChange={(e) => setFile(e.target.files?.[0] || null)}
//                     className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#0b918c]/10 file:text-[#0b918c] hover:file:bg-[#0b918c]/20 focus:outline-none focus:ring-1 focus:ring-[#0b918c] transition-colors bg-white cursor-pointer"
//                   />
//                 </div>
//               </div>

//               {/* Image for Display */}
//               <div className="md:col-span-4 flex flex-col">
//                 <label className="text-sm font-medium text-gray-600 mb-1.5">Image To Display For File</label>
//                 <input
//                   type="file"
//                   accept="image/png, image/gif, image/jpeg"
//                   onChange={(e) => setDisplayImage(e.target.files?.[0] || null)}
//                   className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#0b918c]/10 file:text-[#0b918c] hover:file:bg-[#0b918c]/20 focus:outline-none focus:ring-1 focus:ring-[#0b918c] transition-colors bg-white cursor-pointer"
//                 />
//               </div>
//             </div>

//             {/* Form Actions */}
//             <div className="flex justify-center mt-6 pt-6 border-t border-gray-100">
//               <button
//                 type="submit"
//                 disabled={isUploading}
//                 className="inline-flex items-center justify-center px-8 py-2.5 text-sm font-medium rounded-md text-white bg-gradient-to-r from-[#0b918c] to-[#087874] hover:from-[#087874] hover:to-[#065b58] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0b918c] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed shadow-sm"
//               >
//                 <Save size={16} className="mr-2" />
//                 Save Resource
//               </button>
//             </div>
//           </form>
//         </div>

//         {/* Upload Modal Overlay */}
//         {isUploading && (
//           <div className="absolute inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm">
//             <div className="bg-white rounded-lg shadow-xl w-full max-w-sm mx-4 overflow-hidden animate-in fade-in zoom-in duration-200">
//               <div className="flex justify-between items-center px-4 py-3 border-b border-gray-100 bg-gray-50/50">
//                 <h4 className="text-base font-semibold text-gray-800">File Uploading</h4>
//                 <button 
//                   onClick={() => setIsUploading(false)}
//                   className="text-gray-400 hover:text-gray-600 transition-colors"
//                 >
//                   <X size={18} />
//                 </button>
//               </div>
//               <div className="px-6 py-8 text-center flex flex-col items-center">
//                 <UploadCloud size={40} className="text-[#0b918c] mb-4 animate-bounce" />
//                 <p className="text-gray-600 font-medium">
//                   Please wait till the file uploads...
//                 </p>
//                 <div className="w-full bg-gray-200 rounded-full h-1.5 mt-6 overflow-hidden">
//                   <div className="bg-[#0b918c] h-1.5 rounded-full animate-pulse w-full"></div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// }

'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Save, Trash2, UploadCloud, X } from 'lucide-react';

// Mock data for dependent subcategories
const MOCK_SUBCATEGORIES: Record<string, { id: string; name: string }[]> = {
  '3': [{ id: '31', name: 'Training Module A' }, { id: '32', name: 'Guidelines 2024' }],
  '5': [{ id: '51', name: 'Community Posters' }],
  '6': [{ id: '61', name: 'Radio Jingles' }, { id: '62', name: 'TV Ads' }],
  // Add other mappings as needed...
};

export default function AddResources() {
  // Form State
  const [categoryId, setCategoryId] = useState<string>('');
  const [categoryName, setCategoryName] = useState<string>('');
  const [subCategoryId, setSubCategoryId] = useState<string>('');
  const [subCategoryName, setSubCategoryName] = useState<string>('');
  const [fileDisplayName, setFileDisplayName] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [displayImage, setDisplayImage] = useState<File | null>(null);

  // UI State
  const [availableSubcategories, setAvailableSubcategories] = useState<{ id: string; name: string }[]>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  // Handlers
  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setCategoryId(val);
    setSubCategoryId(''); // Reset subcategory when category changes
    
    if (val && val !== '-1' && MOCK_SUBCATEGORIES[val]) {
      setAvailableSubcategories(MOCK_SUBCATEGORIES[val]);
    } else {
      setAvailableSubcategories([]);
    }
  };

  const handleSubCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSubCategoryId(e.target.value);
  };

  const handleDeleteCategory = () => {
    if (confirm("Are you sure you want to remove this Category?")) {
      console.log("Deleted Category ID:", categoryId);
      setCategoryId('');
      setCategoryName('');
    }
  };

  const handleDeleteSubCategory = () => {
    if (confirm("Are you sure you want to remove this Sub Category?")) {
      console.log("Deleted Sub Category ID:", subCategoryId);
      setSubCategoryId('');
      setSubCategoryName('');
    }
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!categoryId) {
      alert("Please select a Category.");
      return;
    }

    // Show upload modal
    setIsUploading(true);

    const formData = new FormData();
    formData.append('categoryId', categoryId);
    if (categoryId === '-1') formData.append('categoryName', categoryName);
    formData.append('subCategoryId', subCategoryId);
    if (subCategoryId === '-1') formData.append('subCategoryName', subCategoryName);
    formData.append('fileDisplayName', fileDisplayName);
    if (file) formData.append('file', file);
    if (displayImage) formData.append('displayImage', displayImage);

    console.log("Submitting Resource Data...");
    // Fixes the prefer-const validation warnings by capturing immutable variables correctly
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    // Simulate API Call Upload Time
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // alertify.success("Resource saved successfully!");
      console.log("Upload Complete!");
    } catch (error) {
      console.error("Failed to upload resource", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full p-4 font-sans text-gray-800">
      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden relative">
        
        {/* Card Header */}
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <h5 className="text-lg font-semibold m-0 text-[#0b918c]">Add Resources</h5>
        </div>

        {/* Card Body */}
        <div className="p-6">
          <form onSubmit={handleSave}>
            
            {/* Row 1: Categories & Subcategories */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start mb-6">
              
              {/* Category Dropdown */}
              <div className="md:col-span-3 flex flex-col">
                <label className="text-sm font-medium text-gray-600 mb-1.5">Category</label>
                <div className="flex gap-2">
                  <select
                    value={categoryId}
                    onChange={handleCategoryChange}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0b918c] focus:border-[#0b918c] transition-colors bg-white"
                  >
                    <option value="">Select Category</option>
                    <option value="3">Guidelines & Training Modules</option>
                    <option value="5">Awareness Generation- Interpersonal Communication</option>
                    <option value="6">Mass Media</option>
                    <option value="7">Social Media</option>
                    <option value="9">Case Studies</option>
                    <option value="10">Other</option>
                    <option value="-1" className="font-semibold text-[#0b918c]">Add New Category</option>
                  </select>
                  {/* Delete Button (Shows only when an existing category is selected) */}
                  {categoryId && categoryId !== '-1' && (
                    <button
                      type="button"
                      onClick={handleDeleteCategory}
                      className="p-2 bg-red-50 text-red-600 border border-red-200 rounded-md hover:bg-red-100 transition-colors"
                      title="Remove this Category"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </div>

              {/* Conditional Category Name Input */}
              {categoryId === '-1' && (
                <div className="md:col-span-3 flex flex-col">
                  <label className="text-sm font-medium text-gray-600 mb-1.5">Category Name</label>
                  <input
                    type="text"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    placeholder="Enter new category name"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0b918c] focus:border-[#0b918c] transition-colors"
                    required
                  />
                </div>
              )}

              {/* SubCategory Dropdown */}
              <div className="md:col-span-3 flex flex-col">
                <label className="text-sm font-medium text-gray-600 mb-1.5">SubCategory</label>
                <div className="flex gap-2">
                  <select
                    value={subCategoryId}
                    onChange={handleSubCategoryChange}
                    disabled={!categoryId}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0b918c] focus:border-[#0b918c] transition-colors bg-white disabled:bg-gray-100 disabled:text-gray-400"
                  >
                    <option value="">Select SubCategory</option>
                    {availableSubcategories.map((sub) => (
                      <option key={sub.id} value={sub.id}>{sub.name}</option>
                    ))}
                    {categoryId && (
                      <option value="-1" className="font-semibold text-[#0b918c]">Add New Sub Category</option>
                    )}
                  </select>
                  {/* Delete Button (Shows only when an existing subcategory is selected) */}
                  {subCategoryId && subCategoryId !== '-1' && (
                    <button
                      type="button"
                      onClick={handleDeleteSubCategory}
                      className="p-2 bg-red-50 text-red-600 border border-red-200 rounded-md hover:bg-red-100 transition-colors"
                      title="Remove this Sub Category"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </div>

              {/* Conditional SubCategory Name Input */}
              {subCategoryId === '-1' && (
                <div className="md:col-span-3 flex flex-col">
                  <label className="text-sm font-medium text-gray-600 mb-1.5">Sub Category Name</label>
                  <input
                    type="text"
                    value={subCategoryName}
                    onChange={(e) => setSubCategoryName(e.target.value)}
                    placeholder="Enter new subcategory name"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0b918c] focus:border-[#0b918c] transition-colors"
                    required
                  />
                </div>
              )}
            </div>

            {/* SubCategory Items Render Area (Placeholder for `div_ItemsInSubCategory`) */}
            <div className="w-full mb-6 empty:hidden" id="div_ItemsInSubCategory">
                {/* Dynamically loaded items would appear here based on selected subcategory */}
            </div>

            {/* Row 2: File Uploads */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end mb-8">
              
              {/* Display File Name */}
              <div className="md:col-span-3 flex flex-col">
                <label className="text-sm font-medium text-gray-600 mb-1.5">Display File Name</label>
                <input
                  type="text"
                  value={fileDisplayName}
                  onChange={(e) => setFileDisplayName(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0b918c] focus:border-[#0b918c] transition-colors"
                  placeholder="Enter file display name"
                />
              </div>

              {/* File Upload */}
              <div className="md:col-span-5 flex flex-col">
                <label className="text-sm font-medium text-gray-600 mb-1.5">File</label>
                <div className="relative">
                  <input
                    type="file"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#0b918c]/10 file:text-[#0b918c] hover:file:bg-[#0b918c]/20 focus:outline-none focus:ring-1 focus:ring-[#0b918c] transition-colors bg-white cursor-pointer"
                  />
                </div>
              </div>

              {/* Image for Display */}
              <div className="md:col-span-4 flex flex-col">
                <label className="text-sm font-medium text-gray-600 mb-1.5">Image To Display For File</label>
                <input
                  type="file"
                  accept="image/png, image/gif, image/jpeg"
                  onChange={(e) => setDisplayImage(e.target.files?.[0] || null)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#0b918c]/10 file:text-[#0b918c] hover:file:bg-[#0b918c]/20 focus:outline-none focus:ring-1 focus:ring-[#0b918c] transition-colors bg-white cursor-pointer"
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-center mt-6 pt-6 border-t border-gray-100">
              <button
                type="submit"
                disabled={isUploading}
                className="inline-flex items-center justify-center px-8 py-2.5 text-sm font-medium rounded-md text-white bg-gradient-to-r from-[#0b918c] to-[#087874] hover:from-[#087874] hover:to-[#065b58] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0b918c] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed shadow-sm"
              >
                <Save size={16} className="mr-2" />
                Save Resource
              </button>
            </div>
          </form>
        </div>

        {/* Upload Modal Overlay */}
        {isUploading && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-sm mx-4 overflow-hidden animate-in fade-in zoom-in duration-200">
              <div className="flex justify-between items-center px-4 py-3 border-b border-gray-100 bg-gray-50/50">
                <h4 className="text-base font-semibold text-gray-800">File Uploading</h4>
                <button 
                  onClick={() => setIsUploading(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="px-6 py-8 text-center flex flex-col items-center">
                <UploadCloud size={40} className="text-[#0b918c] mb-4 animate-bounce" />
                <p className="text-gray-600 font-medium">
                  Please wait till the file uploads...
                </p>
                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-6 overflow-hidden">
                  <div className="bg-[#0b918c] h-1.5 rounded-full animate-pulse w-full"></div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}