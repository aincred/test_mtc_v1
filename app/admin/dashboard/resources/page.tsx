// // // "use client";
// // // import React, { useState, useRef, useEffect } from 'react';
// // // import { 
// // //   Upload, 
// // //   X, 
// // //   Image as ImageIcon, 
// // //   File, 
// // //   Trash2, 
// // //   Eye, 
// // //   Download, 
// // //   Plus,
// // //   Filter,
// // //   Search,
// // //   CheckCircle2,
// // //   FileText,
// // //   Music,
// // //   Video,
// // //   ChevronRight
// // // } from 'lucide-react';

// // // /**
// // //  * Interface for the Media Item object
// // //  */
// // // interface MediaItem {
// // //   id: string;
// // //   name: string;
// // //   type: string;
// // //   size: string;
// // //   date: string;
// // //   category: string; // ID of the section
// // //   subcategory: string; // Specific group like "Guidelines", "Protocols", etc.
// // //   url: string;
// // //   rawFile: File;
// // // }

// // // const CATEGORIES = [
// // //   { id: "Guidelines___Training_Modules", label: "Guidelines & Training Modules" },
// // //   { id: "Awareness_Generation-_Interpersonal_Communication", label: "Awareness Generation- Interpersonal Communication" },
// // //   { id: "Mass_Media", label: "Mass Media" },
// // //   { id: "Social_Media", label: "Social Media" },
// // //   { id: "Case_Studies", label: "Case Studies" },
// // //   { id: "Other", label: "Other" }
// // // ];

// // // const SUBCATEGORIES = ["General", "Guidelines", "Protocols", "Manuals", "MTC", "Corona Virus"];

// // // const App: React.FC = () => {
// // //   const [items, setItems] = useState<MediaItem[]>([]);
// // //   const [searchQuery, setSearchQuery] = useState<string>('');
// // //   const [previewItem, setPreviewItem] = useState<MediaItem | null>(null);
// // //   const [isDragging, setIsDragging] = useState<boolean>(false);
// // //   const [activeUploadCategory, setActiveUploadCategory] = useState<string>(CATEGORIES[0].id);
// // //   const [activeUploadSubcategory, setActiveUploadSubcategory] = useState<string>(SUBCATEGORIES[0]);
  
// // //   const fileInputRef = useRef<HTMLInputElement>(null);

// // //   const handleFileUpload = (files: FileList | File[]) => {
// // //     const newItems: MediaItem[] = Array.from(files).map(file => {
// // //       const item: MediaItem = {
// // //         id: Math.random().toString(36).substr(2, 9),
// // //         name: file.name,
// // //         type: file.type,
// // //         size: (file.size / 1024).toFixed(1) + ' KB',
// // //         date: new Date().toLocaleDateString(),
// // //         category: activeUploadCategory,
// // //         subcategory: activeUploadSubcategory,
// // //         url: URL.createObjectURL(file),
// // //         rawFile: file
// // //       };
// // //       return item;
// // //     });

// // //     setItems(prev => [...newItems, ...prev]);
// // //   };

// // //   const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // //     if (e.target.files && e.target.files.length > 0) {
// // //       handleFileUpload(e.target.files);
// // //     }
// // //   };

// // //   const removeItem = (id: string) => {
// // //     setItems(prev => {
// // //       const item = prev.find(i => i.id === id);
// // //       if (item && item.url) URL.revokeObjectURL(item.url);
// // //       return prev.filter(i => i.id !== id);
// // //     });
// // //     if (previewItem?.id === id) setPreviewItem(null);
// // //   };

// // //   const getFileIcon = (type: string) => {
// // //     if (type.startsWith('image/')) return <ImageIcon size={24} className="text-blue-500" />;
// // //     if (type.startsWith('video/')) return <Video size={24} className="text-purple-500" />;
// // //     if (type.startsWith('audio/')) return <Music size={24} className="text-pink-500" />;
// // //     return <FileText size={24} className="text-orange-500" />;
// // //   };

// // //   // Group items by category for rendering
// // //   const groupedItems = CATEGORIES.map(cat => ({
// // //     ...cat,
// // //     items: items.filter(item => 
// // //       item.category === cat.id && 
// // //       item.name.toLowerCase().includes(searchQuery.toLowerCase())
// // //     )
// // //   }));

// // //   return (
// // //     <div className="min-h-screen bg-[#f8f9fa] text-slate-900 font-sans pb-20">
// // //       {/* Header (Inspired by snippet) */}
// // //       <header className="bg-white border-b border-slate-200 px-6 py-6 mb-8 shadow-sm">
// // //         <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
// // //           <div>
// // //             <h1 className="text-2xl font-bold text-[#0b918c] tracking-tight">COMMUNICATION MATERIALS</h1>
// // //             <p className="text-slate-500 text-sm mt-1">Resource Repository Management</p>
// // //           </div>

// // //           <div className="flex items-center gap-4">
// // //             <div className="relative md:w-80">
// // //               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
// // //               <input 
// // //                 type="text" 
// // //                 placeholder="Search resources..." 
// // //                 className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#0b918c] transition-all text-sm outline-none"
// // //                 value={searchQuery}
// // //                 onChange={(e) => setSearchQuery(e.target.value)}
// // //               />
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </header>

// // //       <main className="max-w-7xl mx-auto px-6">
// // //         <div className="flex flex-col lg:flex-row gap-8">
          
// // //           {/* Left Column: Sidebar (Sticky as per snippet) */}
// // //           <aside className="lg:w-1/4">
// // //             <div className="sticky top-24 space-y-6">
// // //               {/* Category Menu */}
// // //               <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
// // //                 <div className="bg-white p-4 font-bold text-center border-b border-slate-100 text-sm text-slate-700 uppercase tracking-wider">
// // //                   Categories
// // //                 </div>
// // //                 <nav className="flex flex-col">
// // //                   {CATEGORIES.map(cat => (
// // //                     <a 
// // //                       key={cat.id}
// // //                       href={`#${cat.id}`}
// // //                       className="px-5 py-3.5 text-[13px] text-slate-600 hover:bg-[#f0f9f8] hover:text-[#0b918c] border-b border-slate-50 transition-colors flex items-center justify-between group"
// // //                     >
// // //                       <span>{cat.label}</span>
// // //                       <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
// // //                     </a>
// // //                   ))}
// // //                 </nav>
// // //               </div>

// // //               {/* Upload Controls Card */}
// // //               <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
// // //                 <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
// // //                   <Plus size={16} className="text-[#0b918c]" />
// // //                   Quick Upload
// // //                 </h3>
                
// // //                 <div className="space-y-4">
// // //                   <div>
// // //                     <label className="text-[11px] font-bold text-slate-400 uppercase mb-1 block">Target Category</label>
// // //                     <select 
// // //                       value={activeUploadCategory}
// // //                       onChange={(e) => setActiveUploadCategory(e.target.value)}
// // //                       className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs outline-none focus:border-[#0b918c]"
// // //                     >
// // //                       {CATEGORIES.map(cat => <option key={cat.id} value={cat.id}>{cat.label}</option>)}
// // //                     </select>
// // //                   </div>

// // //                   <div>
// // //                     <label className="text-[11px] font-bold text-slate-400 uppercase mb-1 block">Sub-header</label>
// // //                     <select 
// // //                       value={activeUploadSubcategory}
// // //                       onChange={(e) => setActiveUploadSubcategory(e.target.value)}
// // //                       className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs outline-none focus:border-[#0b918c]"
// // //                     >
// // //                       {SUBCATEGORIES.map(sub => <option key={sub} value={sub}>{sub}</option>)}
// // //                     </select>
// // //                   </div>

// // //                   <button 
// // //                     onClick={() => fileInputRef.current?.click()}
// // //                     className="w-full py-3 bg-[#0b918c] text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#087a75] transition-all shadow-md active:scale-95"
// // //                   >
// // //                     <Upload size={16} />
// // //                     Browse Files
// // //                   </button>
// // //                   <input type="file" ref={fileInputRef} onChange={onFileChange} className="hidden" multiple />
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </aside>

// // //           {/* Right Column: Main Content */}
// // //           <div className="lg:w-3/4 space-y-12">
// // //             {groupedItems.map(group => (
// // //               <section key={group.id} id={group.id} className="scroll-mt-24">
// // //                 <h6 className="text-lg font-bold text-[#0b918c] mb-4 ml-2">{group.label}</h6>
                
// // //                 <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-6 md:p-8">
// // //                   {group.items.length === 0 ? (
// // //                     <div className="py-12 flex flex-col items-center justify-center text-slate-300">
// // //                       <ImageIcon size={48} className="mb-2 opacity-20" />
// // //                       <p className="text-sm font-medium">No items uploaded to this category yet</p>
// // //                     </div>
// // //                   ) : (
// // //                     <div className="space-y-10">
// // //                       {/* Sub-grouping within categories if needed (e.g., Guidelines, Protocols) */}
// // //                       {Array.from(new Set(group.items.map(i => i.subcategory))).map(subcat => (
// // //                         <div key={subcat}>
// // //                           <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
// // //                             <span className="w-1.5 h-1.5 rounded-full bg-[#0b918c]"></span>
// // //                             {subcat}
// // //                           </p>
// // //                           <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
// // //                             {group.items.filter(i => i.subcategory === subcat).map(item => (
// // //                               <div key={item.id} className="group flex flex-col h-full bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300">
// // //                                 {/* Media Container */}
// // //                                 <div className="relative aspect-4/3 bg-slate-50 rounded-t-2xl overflow-hidden flex items-center justify-center">
// // //                                   {item.type.startsWith('image/') ? (
// // //                                     <img 
// // //                                       src={item.url} 
// // //                                       alt={item.name} 
// // //                                       className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
// // //                                     />
// // //                                   ) : (
// // //                                     <div className="flex flex-col items-center gap-3">
// // //                                       {getFileIcon(item.type)}
// // //                                       <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{item.type.split('/')[1] || 'FILE'}</span>
// // //                                     </div>
// // //                                   )}
                                  
// // //                                   {/* Actions Overlay */}
// // //                                   <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
// // //                                     {item.type.startsWith('image/') && (
// // //                                       <button onClick={() => setPreviewItem(item)} className="p-2.5 bg-white rounded-full text-slate-900 hover:text-[#0b918c] transition-colors"><Eye size={18} /></button>
// // //                                     )}
// // //                                     <a href={item.url} download={item.name} className="p-2.5 bg-white rounded-full text-slate-900 hover:text-[#0b918c] transition-colors"><Download size={18} /></a>
// // //                                     <button onClick={() => removeItem(item.id)} className="p-2.5 bg-white rounded-full text-slate-900 hover:text-red-600 transition-colors"><Trash2 size={18} /></button>
// // //                                   </div>
// // //                                 </div>

// // //                                 {/* Text Content */}
// // //                                 <div className="p-4 flex-1 flex flex-col justify-center text-center">
// // //                                   <p className="text-[13px] font-bold text-slate-800 leading-snug line-clamp-2 uppercase">
// // //                                     {item.name}
// // //                                   </p>
// // //                                 </div>
// // //                               </div>
// // //                             ))}
// // //                           </div>
// // //                         </div>
// // //                       ))}
// // //                     </div>
// // //                   )}
// // //                 </div>
// // //               </section>
// // //             ))}
// // //           </div>
// // //         </div>
// // //       </main>

// // //       {/* Lightbox / Preview Modal */}
// // //       {previewItem && (
// // //         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 md:p-10 animate-in fade-in duration-200">
// // //           <button 
// // //             onClick={() => setPreviewItem(null)}
// // //             className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors p-2"
// // //           >
// // //             <X size={32} />
// // //           </button>
          
// // //           <div className="max-w-5xl w-full h-full flex flex-col items-center justify-center">
// // //             <img 
// // //               src={previewItem.url} 
// // //               alt={previewItem.name} 
// // //               className="max-w-full max-h-[80vh] object-contain shadow-2xl rounded-sm"
// // //             />
// // //             <div className="mt-8 text-center text-white">
// // //               <h2 className="text-xl font-bold uppercase tracking-wide">{previewItem.name}</h2>
// // //               <p className="text-white/40 text-sm mt-2">{previewItem.category.replace(/_/g, ' ')} • {previewItem.size}</p>
// // //               <div className="mt-6 flex justify-center gap-4">
// // //                 <a 
// // //                   href={previewItem.url} 
// // //                   download={previewItem.name}
// // //                   className="px-8 py-3 bg-[#0b918c] hover:bg-[#087a75] rounded-full flex items-center gap-2 font-bold transition-all"
// // //                 >
// // //                   <Download size={18} /> Download Material
// // //                 </a>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}

// // //       {/* Persistence Note Footer */}
// // //       <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-3 md:px-10 flex items-center justify-between z-20 shadow-up">
// // //         <div className="flex items-center gap-6 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
// // //           <div className="flex items-center gap-1.5">
// // //             <span className="w-2 h-2 rounded-full bg-[#0b918c]"></span>
// // //             <span>{items.length} Total Resources</span>
// // //           </div>
// // //         </div>
// // //         <div className="flex items-center gap-2 text-[11px] text-slate-400 font-bold uppercase tracking-widest">
// // //           <CheckCircle2 size={14} className="text-green-500" />
// // //           <span>Local Dashboard Active</span>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // // export default App;


// // "use client";
// // import React, { useState, useRef } from 'react';
// // import Image from 'next/image';
// // import { 
// //   Upload, 
// //   X, 
// //   Image as ImageIcon, 
// //   Trash2, 
// //   Eye, 
// //   Download, 
// //   Plus,
// //   Search,
// //   CheckCircle2,
// //   FileText,
// //   Music,
// //   Video,
// //   ChevronRight
// // } from 'lucide-react';

// // /**
// //  * Interface for the Media Item object
// //  */
// // interface MediaItem {
// //   id: string;
// //   name: string;
// //   type: string;
// //   size: string;
// //   date: string;
// //   category: string; // ID of the section
// //   subcategory: string; // Specific group like "Guidelines", "Protocols", etc.
// //   url: string;
// //   rawFile: File;
// // }

// // const CATEGORIES = [
// //   { id: "Guidelines___Training_Modules", label: "Guidelines & Training Modules" },
// //   { id: "Awareness_Generation-_Interpersonal_Communication", label: "Awareness Generation- Interpersonal Communication" },
// //   { id: "Mass_Media", label: "Mass Media" },
// //   { id: "Social_Media", label: "Social Media" },
// //   { id: "Case_Studies", label: "Case Studies" },
// //   { id: "Other", label: "Other" }
// // ];

// // const SUBCATEGORIES = ["General", "Guidelines", "Protocols", "Manuals", "MTC", "Corona Virus"];

// // const App: React.FC = () => {
// //   const [items, setItems] = useState<MediaItem[]>([]);
// //   const [searchQuery, setSearchQuery] = useState<string>('');
// //   const [previewItem, setPreviewItem] = useState<MediaItem | null>(null);
// //   const [activeUploadCategory, setActiveUploadCategory] = useState<string>(CATEGORIES[0].id);
// //   const [activeUploadSubcategory, setActiveUploadSubcategory] = useState<string>(SUBCATEGORIES[0]);
  
// //   const fileInputRef = useRef<HTMLInputElement>(null);

// //   const handleFileUpload = (files: FileList | File[]) => {
// //     const newItems: MediaItem[] = Array.from(files).map(file => {
// //       const item: MediaItem = {
// //         id: Math.random().toString(36).substring(2, 11),
// //         name: file.name,
// //         type: file.type,
// //         size: (file.size / 1024).toFixed(1) + ' KB',
// //         date: new Date().toLocaleDateString(),
// //         category: activeUploadCategory,
// //         subcategory: activeUploadSubcategory,
// //         url: URL.createObjectURL(file),
// //         rawFile: file
// //       };
// //       return item;
// //     });

// //     setItems(prev => [...newItems, ...prev]);
// //   };

// //   const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     if (e.target.files && e.target.files.length > 0) {
// //       handleFileUpload(e.target.files);
// //     }
// //   };

// //   const removeItem = (id: string) => {
// //     setItems(prev => {
// //       const item = prev.find(i => i.id === id);
// //       if (item && item.url) URL.revokeObjectURL(item.url);
// //       return prev.filter(i => i.id !== id);
// //     });
// //     if (previewItem?.id === id) setPreviewItem(null);
// //   };

// //   const getFileIcon = (type: string) => {
// //     if (type.startsWith('image/')) return <ImageIcon size={24} className="text-blue-500" />;
// //     if (type.startsWith('video/')) return <Video size={24} className="text-purple-500" />;
// //     if (type.startsWith('audio/')) return <Music size={24} className="text-pink-500" />;
// //     return <FileText size={24} className="text-orange-500" />;
// //   };

// //   // Group items by category for rendering
// //   const groupedItems = CATEGORIES.map(cat => ({
// //     ...cat,
// //     items: items.filter(item => 
// //       item.category === cat.id && 
// //       item.name.toLowerCase().includes(searchQuery.toLowerCase())
// //     )
// //   }));

// //   return (
// //     <div className="min-h-screen bg-[#f8f9fa] text-slate-900 font-sans pb-20">
// //       {/* Header (Inspired by snippet) */}
// //       <header className="bg-white border-b border-slate-200 px-6 py-6 mb-8 shadow-sm">
// //         <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
// //           <div>
// //             <h1 className="text-2xl font-bold text-[#0b918c] tracking-tight">COMMUNICATION MATERIALS</h1>
// //             <p className="text-slate-500 text-sm mt-1">Resource Repository Management</p>
// //           </div>

// //           <div className="flex items-center gap-4">
// //             <div className="relative md:w-80">
// //               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
// //               <input 
// //                 type="text" 
// //                 placeholder="Search resources..." 
// //                 className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#0b918c] transition-all text-sm outline-none"
// //                 value={searchQuery}
// //                 onChange={(e) => setSearchQuery(e.target.value)}
// //               />
// //             </div>
// //           </div>
// //         </div>
// //       </header>

// //       <main className="max-w-7xl mx-auto px-6">
// //         <div className="flex flex-col lg:flex-row gap-8">
          
// //           {/* Left Column: Sidebar (Sticky as per snippet) */}
// //           <aside className="lg:w-1/4">
// //             <div className="sticky top-24 space-y-6">
// //               {/* Category Menu */}
// //               <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
// //                 <div className="bg-white p-4 font-bold text-center border-b border-slate-100 text-sm text-slate-700 uppercase tracking-wider">
// //                   Categories
// //                 </div>
// //                 <nav className="flex flex-col">
// //                   {CATEGORIES.map(cat => (
// //                     <a 
// //                       key={cat.id}
// //                       href={`#${cat.id}`}
// //                       className="px-5 py-3.5 text-[13px] text-slate-600 hover:bg-[#f0f9f8] hover:text-[#0b918c] border-b border-slate-50 transition-colors flex items-center justify-between group"
// //                     >
// //                       <span>{cat.label}</span>
// //                       <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
// //                     </a>
// //                   ))}
// //                 </nav>
// //               </div>

// //               {/* Upload Controls Card */}
// //               <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
// //                 <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
// //                   <Plus size={16} className="text-[#0b918c]" />
// //                   Quick Upload
// //                 </h3>
                
// //                 <div className="space-y-4">
// //                   <div>
// //                     <label className="text-[11px] font-bold text-slate-400 uppercase mb-1 block">Target Category</label>
// //                     <select 
// //                       value={activeUploadCategory}
// //                       onChange={(e) => setActiveUploadCategory(e.target.value)}
// //                       className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs outline-none focus:border-[#0b918c]"
// //                     >
// //                       {CATEGORIES.map(cat => <option key={cat.id} value={cat.id}>{cat.label}</option>)}
// //                     </select>
// //                   </div>

// //                   <div>
// //                     <label className="text-[11px] font-bold text-slate-400 uppercase mb-1 block">Sub-header</label>
// //                     <select 
// //                       value={activeUploadSubcategory}
// //                       onChange={(e) => setActiveUploadSubcategory(e.target.value)}
// //                       className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs outline-none focus:border-[#0b918c]"
// //                     >
// //                       {SUBCATEGORIES.map(sub => <option key={sub} value={sub}>{sub}</option>)}
// //                     </select>
// //                   </div>

// //                   <button 
// //                     onClick={() => fileInputRef.current?.click()}
// //                     className="w-full py-3 bg-[#0b918c] text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#087a75] transition-all shadow-md active:scale-95"
// //                   >
// //                     <Upload size={16} />
// //                     Browse Files
// //                   </button>
// //                   <input type="file" ref={fileInputRef} onChange={onFileChange} className="hidden" multiple />
// //                 </div>
// //               </div>
// //             </div>
// //           </aside>

// //           {/* Right Column: Main Content */}
// //           <div className="lg:w-3/4 space-y-12">
// //             {groupedItems.map(group => (
// //               <section key={group.id} id={group.id} className="scroll-mt-24">
// //                 <h6 className="text-lg font-bold text-[#0b918c] mb-4 ml-2">{group.label}</h6>
                
// //                 <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-6 md:p-8">
// //                   {group.items.length === 0 ? (
// //                     <div className="py-12 flex flex-col items-center justify-center text-slate-300">
// //                       <ImageIcon size={48} className="mb-2 opacity-20" />
// //                       <p className="text-sm font-medium">No items uploaded to this category yet</p>
// //                     </div>
// //                   ) : (
// //                     <div className="space-y-10">
// //                       {Array.from(new Set(group.items.map(i => i.subcategory))).map(subcat => (
// //                         <div key={subcat}>
// //                           <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
// //                             <span className="w-1.5 h-1.5 rounded-full bg-[#0b918c]"></span>
// //                             {subcat}
// //                           </p>
// //                           <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
// //                             {group.items.filter(i => i.subcategory === subcat).map(item => (
// //                               <div key={item.id} className="group flex flex-col h-full bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300">
// //                                 {/* Media Container */}
// //                                 <div className="relative aspect-[4/3] bg-slate-50 rounded-t-2xl overflow-hidden flex items-center justify-center">
// //                                   {item.type.startsWith('image/') ? (
// //                                     <Image 
// //                                       src={item.url} 
// //                                       alt={item.name} 
// //                                       fill
// //                                       unoptimized
// //                                       sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
// //                                       className="object-cover group-hover:scale-110 transition-transform duration-500" 
// //                                     />
// //                                   ) : (
// //                                     <div className="flex flex-col items-center gap-3">
// //                                       {getFileIcon(item.type)}
// //                                       <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{item.type.split('/')[1] || 'FILE'}</span>
// //                                     </div>
// //                                   )}
                                  
// //                                   {/* Actions Overlay */}
// //                                   <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 z-10">
// //                                     {item.type.startsWith('image/') && (
// //                                       <button onClick={() => setPreviewItem(item)} className="p-2.5 bg-white rounded-full text-slate-900 hover:text-[#0b918c] transition-colors"><Eye size={18} /></button>
// //                                     )}
// //                                     <a href={item.url} download={item.name} className="p-2.5 bg-white rounded-full text-slate-900 hover:text-[#0b918c] transition-colors"><Download size={18} /></a>
// //                                     <button onClick={() => removeItem(item.id)} className="p-2.5 bg-white rounded-full text-slate-900 hover:text-red-600 transition-colors"><Trash2 size={18} /></button>
// //                                   </div>
// //                                 </div>

// //                                 {/* Text Content */}
// //                                 <div className="p-4 flex-1 flex flex-col justify-center text-center">
// //                                   <p className="text-[13px] font-bold text-slate-800 leading-snug line-clamp-2 uppercase">
// //                                     {item.name}
// //                                   </p>
// //                                 </div>
// //                               </div>
// //                             ))}
// //                           </div>
// //                         </div>
// //                       ))}
// //                     </div>
// //                   )}
// //                 </div>
// //               </section>
// //             ))}
// //           </div>
// //         </div>
// //       </main>

// //       {/* Lightbox / Preview Modal */}
// //       {previewItem && (
// //         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 md:p-10 animate-in fade-in duration-200">
// //           <button 
// //             onClick={() => setPreviewItem(null)}
// //             className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors p-2 z-50"
// //           >
// //             <X size={32} />
// //           </button>
          
// //           <div className="max-w-5xl w-full h-full flex flex-col items-center justify-center">
// //             <div className="relative w-full h-[70vh]">
// //               <Image 
// //                 src={previewItem.url} 
// //                 alt={previewItem.name} 
// //                 fill
// //                 unoptimized
// //                 priority
// //                 className="object-contain shadow-2xl rounded-sm"
// //               />
// //             </div>
// //             <div className="mt-8 text-center text-white">
// //               <h2 className="text-xl font-bold uppercase tracking-wide">{previewItem.name}</h2>
// //               <p className="text-white/40 text-sm mt-2">{previewItem.category.replace(/_/g, ' ')} • {previewItem.size}</p>
// //               <div className="mt-6 flex justify-center gap-4">
// //                 <a 
// //                   href={previewItem.url} 
// //                   download={previewItem.name}
// //                   className="px-8 py-3 bg-[#0b918c] hover:bg-[#087a75] rounded-full flex items-center gap-2 font-bold transition-all"
// //                 >
// //                   <Download size={18} /> Download Material
// //                 </a>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {/* Persistence Note Footer */}
// //       <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-3 md:px-10 flex items-center justify-between z-20 shadow-up">
// //         <div className="flex items-center gap-6 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
// //           <div className="flex items-center gap-1.5">
// //             <span className="w-2 h-2 rounded-full bg-[#0b918c]"></span>
// //             <span>{items.length} Total Resources</span>
// //           </div>
// //         </div>
// //         <div className="flex items-center gap-2 text-[11px] text-slate-400 font-bold uppercase tracking-widest">
// //           <CheckCircle2 size={14} className="text-green-500" />
// //           <span>Local Dashboard Active</span>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default App;

// "use client";
// import React, { useState, useRef } from 'react';
// import Image from 'next/image';
// import { 
//   UploadCloud, 
//   X, 
//   Image as ImageIcon, 
//   Trash2, 
//   Eye, 
//   Download, 
//   Search, 
//   CheckCircle2, 
//   FileText, 
//   Music, 
//   Video, 
//   ChevronRight,
//   SlidersHorizontal
// } from 'lucide-react';

// interface MediaItem {
//   id: string;
//   name: string;
//   type: string;
//   size: string;
//   date: string;
//   category: string;
//   subcategory: string;
//   url: string;
//   rawFile: File;
// }

// const CATEGORIES = [
//   { id: "Guidelines___Training_Modules", label: "Guidelines & Training Modules" },
//   { id: "Awareness_Generation-_Interpersonal_Communication", label: "Awareness Generation - Interpersonal Communication" },
//   { id: "Mass_Media", label: "Mass Media" },
//   { id: "Social_Media", label: "Social Media" },
//   { id: "Case_Studies", label: "Case Studies" },
//   { id: "Other", label: "Other" }
// ];

// const SUBCATEGORIES = ["General", "Guidelines", "Protocols", "Manuals", "MTC", "Corona Virus"];

// const App: React.FC = () => {
//   const [items, setItems] = useState<MediaItem[]>([]);
//   const [searchQuery, setSearchQuery] = useState<string>('');
//   const [previewItem, setPreviewItem] = useState<MediaItem | null>(null);
//   const [activeUploadCategory, setActiveUploadCategory] = useState<string>(CATEGORIES[0].id);
//   const [activeUploadSubcategory, setActiveUploadSubcategory] = useState<string>(SUBCATEGORIES[0]);
//   const [isDragging, setIsDragging] = useState<boolean>(false);
  
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const handleFileUpload = (files: FileList | File[]) => {
//     const newItems: MediaItem[] = Array.from(files).map(file => ({
//       id: Math.random().toString(36).substring(2, 11),
//       name: file.name,
//       type: file.type,
//       size: (file.size / 1024).toFixed(1) + ' KB',
//       date: new Date().toLocaleDateString(),
//       category: activeUploadCategory,
//       subcategory: activeUploadSubcategory,
//       url: URL.createObjectURL(file),
//       rawFile: file
//     }));

//     setItems(prev => [...newItems, ...prev]);
//   };

//   const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       handleFileUpload(e.target.files);
//     }
//   };

//   const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setIsDragging(false);
//     if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
//       handleFileUpload(e.dataTransfer.files);
//     }
//   };

//   const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setIsDragging(true);
//   };

//   const handleDragLeave = () => {
//     setIsDragging(false);
//   };

//   const removeItem = (id: string) => {
//     setItems(prev => {
//       const item = prev.find(i => i.id === id);
//       if (item && item.url) URL.revokeObjectURL(item.url);
//       return prev.filter(i => i.id !== id);
//     });
//     if (previewItem?.id === id) setPreviewItem(null);
//   };

//   const getFileIcon = (type: string) => {
//     if (type.startsWith('image/')) return <ImageIcon size={28} className="text-teal-600" />;
//     if (type.startsWith('video/')) return <Video size={28} className="text-indigo-500" />;
//     if (type.startsWith('audio/')) return <Music size={28} className="text-rose-500" />;
//     return <FileText size={28} className="text-amber-500" />;
//   };

//   const groupedItems = CATEGORIES.map(cat => ({
//     ...cat,
//     items: items.filter(item => 
//       item.category === cat.id && 
//       item.name.toLowerCase().includes(searchQuery.toLowerCase())
//     )
//   }));

//   return (
//     <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-24">
//       {/* Top Header */}
//       <header className="bg-white border-b border-slate-200 px-6 py-5 sticky top-0 z-30 shadow-xs">
//         <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//           <div>
//             <h1 className="text-xl font-bold text-[#0b918c] tracking-tight">COMMUNICATION MATERIALS</h1>
//             <p className="text-xs text-slate-500">Resource Repository & Media Center</p>
//           </div>

//           <div className="relative w-full sm:w-80">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
//             <input 
//               type="text" 
//               placeholder="Search resources by name..." 
//               className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#0b918c] focus:bg-white text-xs outline-none transition-all"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto px-6 py-8 space-y-10">
//         {/* Hero Section: Upload Zone on Home */}
//         <section className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
//           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
//             <div>
//               <h2 className="text-base font-bold text-slate-800">Upload Resources</h2>
//               <p className="text-xs text-slate-500 mt-0.5">Select a category and drop files below to publish to the repository</p>
//             </div>
            
//             {/* Category Selectors */}
//             <div className="flex flex-wrap sm:flex-nowrap gap-3">
//               <div className="w-full sm:w-auto">
//                 <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Target Category</label>
//                 <select 
//                   value={activeUploadCategory}
//                   onChange={(e) => setActiveUploadCategory(e.target.value)}
//                   className="w-full sm:w-60 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium text-slate-700 outline-none focus:border-[#0b918c]"
//                 >
//                   {CATEGORIES.map(cat => (
//                     <option key={cat.id} value={cat.id}>{cat.label}</option>
//                   ))}
//                 </select>
//               </div>

//               <div className="w-full sm:w-auto">
//                 <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Subcategory</label>
//                 <select 
//                   value={activeUploadSubcategory}
//                   onChange={(e) => setActiveUploadSubcategory(e.target.value)}
//                   className="w-full sm:w-44 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium text-slate-700 outline-none focus:border-[#0b918c]"
//                 >
//                   {SUBCATEGORIES.map(sub => (
//                     <option key={sub} value={sub}>{sub}</option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           </div>

//           {/* Drag & Drop Area */}
//           <div 
//             onDrop={handleDrop}
//             onDragOver={handleDragOver}
//             onDragLeave={handleDragLeave}
//             onClick={() => fileInputRef.current?.click()}
//             className={`mt-6 border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center ${
//               isDragging 
//                 ? 'border-[#0b918c] bg-[#f0fdfc]' 
//                 : 'border-slate-200 hover:border-[#0b918c] hover:bg-slate-50/50'
//             }`}
//           >
//             <div className="p-3 bg-[#e6f5f4] text-[#0b918c] rounded-full mb-3">
//               <UploadCloud size={28} />
//             </div>
//             <p className="text-sm font-semibold text-slate-700">
//               Click to upload or drag and drop files here
//             </p>
//             <p className="text-xs text-slate-400 mt-1">
//               Supports images, documents (PDF/DOCX), audio, and videos
//             </p>
//             <input 
//               type="file" 
//               ref={fileInputRef} 
//               onChange={onFileChange} 
//               className="hidden" 
//               multiple 
//             />
//           </div>
//         </section>

//         {/* Content Layout */}
//         <div className="flex flex-col lg:flex-row gap-8 items-start">
//           {/* Categories Quick-Nav Sticky Sidebar */}
//           <aside className="lg:w-1/4 w-full">
//             <div className="sticky top-24 bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
//               <div className="flex items-center gap-2 px-3 py-2 mb-2 text-slate-400 font-bold uppercase tracking-wider text-[11px]">
//                 <SlidersHorizontal size={14} /> Quick Navigation
//               </div>
//               <nav className="space-y-1">
//                 {CATEGORIES.map(cat => {
//                   const count = items.filter(i => i.category === cat.id).length;
//                   return (
//                     <a 
//                       key={cat.id}
//                       href={`#${cat.id}`}
//                       className="px-3 py-2.5 text-xs font-medium text-slate-600 hover:bg-[#f0f9f8] hover:text-[#0b918c] rounded-lg transition-colors flex items-center justify-between group"
//                     >
//                       <span className="truncate pr-2">{cat.label}</span>
//                       <span className="text-[11px] font-semibold text-slate-400 bg-slate-100 group-hover:bg-[#e0f4f2] group-hover:text-[#0b918c] px-2 py-0.5 rounded-full">
//                         {count}
//                       </span>
//                     </a>
//                   );
//                 })}
//               </nav>
//             </div>
//           </aside>

//           {/* Main Gallery Area */}
//           <div className="lg:w-3/4 w-full space-y-8">
//             {groupedItems.map(group => (
//               <section key={group.id} id={group.id} className="scroll-mt-24">
//                 <div className="flex items-center justify-between mb-4">
//                   <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
//                     <span className="w-2 h-2 rounded-full bg-[#0b918c]" />
//                     {group.label}
//                   </h3>
//                   <span className="text-xs text-slate-400 font-medium">
//                     {group.items.length} {group.items.length === 1 ? 'file' : 'files'}
//                   </span>
//                 </div>
                
//                 <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
//                   {group.items.length === 0 ? (
//                     <div className="py-10 flex flex-col items-center justify-center text-slate-400">
//                       <ImageIcon size={36} className="mb-2 opacity-30 text-slate-300" />
//                       <p className="text-xs font-medium">No resources found in this category</p>
//                     </div>
//                   ) : (
//                     <div className="space-y-8">
//                       {Array.from(new Set(group.items.map(i => i.subcategory))).map(subcat => (
//                         <div key={subcat}>
//                           <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-4">
//                             {subcat}
//                           </h4>
//                           <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
//                             {group.items.filter(i => i.subcategory === subcat).map(item => (
//                               <div 
//                                 key={item.id} 
//                                 className="group flex flex-col bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
//                               >
//                                 <div className="relative aspect-video bg-slate-50 flex items-center justify-center border-b border-slate-100">
//                                   {item.type.startsWith('image/') ? (
//                                     <Image 
//                                       src={item.url} 
//                                       alt={item.name} 
//                                       fill
//                                       unoptimized
//                                       sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
//                                       className="object-cover" 
//                                     />
//                                   ) : (
//                                     <div className="flex flex-col items-center gap-2">
//                                       {getFileIcon(item.type)}
//                                       <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
//                                         {item.type.split('/')[1] || 'FILE'}
//                                       </span>
//                                     </div>
//                                   )}
                                  
//                                   {/* Action Buttons */}
//                                   <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
//                                     {item.type.startsWith('image/') && (
//                                       <button 
//                                         onClick={() => setPreviewItem(item)} 
//                                         className="p-2 bg-white rounded-full text-slate-800 hover:text-[#0b918c] transition-colors"
//                                       >
//                                         <Eye size={16} />
//                                       </button>
//                                     )}
//                                     <a 
//                                       href={item.url} 
//                                       download={item.name} 
//                                       className="p-2 bg-white rounded-full text-slate-800 hover:text-[#0b918c] transition-colors"
//                                     >
//                                       <Download size={16} />
//                                     </a>
//                                     <button 
//                                       onClick={() => removeItem(item.id)} 
//                                       className="p-2 bg-white rounded-full text-slate-800 hover:text-rose-600 transition-colors"
//                                     >
//                                       <Trash2 size={16} />
//                                     </button>
//                                   </div>
//                                 </div>

//                                 <div className="p-3">
//                                   <p className="text-xs font-semibold text-slate-800 truncate" title={item.name}>
//                                     {item.name}
//                                   </p>
//                                   <p className="text-[10px] text-slate-400 mt-1">
//                                     {item.size} • {item.date}
//                                   </p>
//                                 </div>
//                               </div>
//                             ))}
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </section>
//             ))}
//           </div>
//         </div>
//       </main>

//       {/* Lightbox / Preview Modal */}
//       {previewItem && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 md:p-8">
//           <button 
//             onClick={() => setPreviewItem(null)} 
//             className="absolute top-5 right-5 text-white/70 hover:text-white transition-colors p-2"
//           >
//             <X size={28} />
//           </button>
          
//           <div className="max-w-4xl w-full flex flex-col items-center">
//             <div className="relative w-full h-[65vh]">
//               <Image 
//                 src={previewItem.url} 
//                 alt={previewItem.name} 
//                 fill
//                 unoptimized
//                 priority
//                 className="object-contain"
//               />
//             </div>
//             <div className="mt-6 text-center text-white">
//               <h2 className="text-base font-bold">{previewItem.name}</h2>
//               <p className="text-white/50 text-xs mt-1">{previewItem.size}</p>
//               <a 
//                 href={previewItem.url} 
//                 download={previewItem.name}
//                 className="mt-4 inline-flex items-center gap-2 px-6 py-2.5 bg-[#0b918c] hover:bg-[#087a75] rounded-lg text-xs font-semibold text-white transition-colors"
//               >
//                 <Download size={15} /> Download Resource
//               </a>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Persistent Bottom Bar */}
//       <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 py-2.5 flex items-center justify-between z-20 text-xs">
//         <div className="flex items-center gap-2 text-slate-500 font-medium">
//           <span className="w-2 h-2 rounded-full bg-[#0b918c]" />
//           <span>{items.length} Total Resources Loaded</span>
//         </div>
//         <div className="flex items-center gap-1.5 text-slate-500 font-medium">
//           <CheckCircle2 size={14} className="text-emerald-500" />
//           <span>Ready</span>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default App;

// app/admin/page.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  UploadCloud,
  X,
  Image as ImageIcon,
  Trash2,
  Eye,
  Download,
  Search,
  CheckCircle2,
  FileText,
  Music,
  Video,
  SlidersHorizontal
} from "lucide-react";
import { CATEGORIES, SUBCATEGORIES, INITIAL_DATA, STORAGE_KEY, ResourceItem, MediaType } from "@/lib/materialsData";

const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const determineMediaType = (mimeType: string): MediaType => {
  if (mimeType.startsWith("image/")) return "image";
  if (mimeType.startsWith("video/")) return "video";
  return "pdf";
};

export default function AdminUploadPage() {
  const [items, setItems] = useState<ResourceItem[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [previewItem, setPreviewItem] = useState<ResourceItem | null>(null);
  const [activeUploadCategory, setActiveUploadCategory] = useState<string>(CATEGORIES[0].id);
  const [activeUploadSubcategory, setActiveUploadSubcategory] = useState<string>(SUBCATEGORIES[0]);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load from local storage on mount
  useEffect(() => {
    setIsMounted(true);
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setItems(JSON.parse(stored));
      } catch {
        setItems(INITIAL_DATA);
      }
    } else {
      setItems(INITIAL_DATA);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DATA));
    }
  }, []);

  const saveItems = (updated: ResourceItem[]) => {
    setItems(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
  };

  const handleFileUpload = async (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    const newItems: ResourceItem[] = await Promise.all(
      fileArray.map(async (file) => {
        const base64Url = await fileToBase64(file);
        return {
          id: Math.random().toString(36).substring(2, 11),
          title: file.name,
          mediaType: determineMediaType(file.type),
          size: (file.size / 1024).toFixed(1) + " KB",
          date: new Date().toLocaleDateString(),
          category: activeUploadCategory,
          subcategory: activeUploadSubcategory,
          mediaUrl: base64Url
        };
      })
    );

    saveItems([...newItems, ...items]);
  };

  const removeItem = (id: string) => {
    const updated = items.filter((i) => i.id !== id);
    saveItems(updated);
    if (previewItem?.id === id) setPreviewItem(null);
  };

  const getFileIcon = (type: MediaType) => {
    if (type === "image") return <ImageIcon size={28} className="text-teal-600" />;
    if (type === "video") return <Video size={28} className="text-indigo-500" />;
    return <FileText size={28} className="text-amber-500" />;
  };

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-24">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-5 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-[#0b918c] tracking-tight">COMMUNICATION MATERIALS (ADMIN)</h1>
            <p className="text-xs text-slate-500">Resource Repository & Media Upload Portal</p>
          </div>

          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search resources by name..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#0b918c] focus:bg-white text-xs outline-none transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-10">
        {/* Upload Zone */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-800">Upload Resources</h2>
              <p className="text-xs text-slate-500 mt-0.5">Files uploaded here immediately appear on the Public Resource Page</p>
            </div>

            <div className="flex flex-wrap sm:flex-nowrap gap-3">
              <div className="w-full sm:w-auto">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Target Category</label>
                <select
                  value={activeUploadCategory}
                  onChange={(e) => setActiveUploadCategory(e.target.value)}
                  className="w-full sm:w-60 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium text-slate-700 outline-none focus:border-[#0b918c]"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.label}</option>
                  ))}
                </select>
              </div>

              <div className="w-full sm:w-auto">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Subcategory</label>
                <select
                  value={activeUploadSubcategory}
                  onChange={(e) => setActiveUploadSubcategory(e.target.value)}
                  className="w-full sm:w-44 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium text-slate-700 outline-none focus:border-[#0b918c]"
                >
                  {SUBCATEGORIES.map((sub) => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              if (e.dataTransfer.files?.length) handleFileUpload(e.dataTransfer.files);
            }}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onClick={() => fileInputRef.current?.click()}
            className={`mt-6 border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center ${
              isDragging ? "border-[#0b918c] bg-[#f0fdfc]" : "border-slate-200 hover:border-[#0b918c] hover:bg-slate-50/50"
            }`}
          >
            <div className="p-3 bg-[#e6f5f4] text-[#0b918c] rounded-full mb-3">
              <UploadCloud size={28} />
            </div>
            <p className="text-sm font-semibold text-slate-700">Click to upload or drag and drop files here</p>
            <p className="text-xs text-slate-400 mt-1">Supports images, documents (PDF), and videos</p>
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => { if (e.target.files?.length) handleFileUpload(e.target.files); }}
              className="hidden"
              multiple
            />
          </div>
        </section>

        {/* Gallery Content */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <aside className="lg:w-1/4 w-full">
            <div className="sticky top-24 bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
              <div className="flex items-center gap-2 px-3 py-2 mb-2 text-slate-400 font-bold uppercase tracking-wider text-[11px]">
                <SlidersHorizontal size={14} /> Quick Navigation
              </div>
              <nav className="space-y-1">
                {CATEGORIES.map((cat) => {
                  const count = items.filter((i) => i.category === cat.id).length;
                  return (
                    <a
                      key={cat.id}
                      href={`#${cat.id}`}
                      className="px-3 py-2.5 text-xs font-medium text-slate-600 hover:bg-[#f0f9f8] hover:text-[#0b918c] rounded-lg transition-colors flex items-center justify-between group"
                    >
                      <span className="truncate pr-2">{cat.label}</span>
                      <span className="text-[11px] font-semibold text-slate-400 bg-slate-100 group-hover:bg-[#e0f4f2] group-hover:text-[#0b918c] px-2 py-0.5 rounded-full">
                        {count}
                      </span>
                    </a>
                  );
                })}
              </nav>
            </div>
          </aside>

          <div className="lg:w-3/4 w-full space-y-8">
            {CATEGORIES.map((category) => {
              const categoryItems = items.filter(
                (item) => item.category === category.id && item.title.toLowerCase().includes(searchQuery.toLowerCase())
              );
              const subcategories = Array.from(new Set(categoryItems.map((i) => i.subcategory)));

              return (
                <section key={category.id} id={category.id} className="scroll-mt-24">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#0b918c]" />
                      {category.label}
                    </h3>
                    <span className="text-xs text-slate-400 font-medium">
                      {categoryItems.length} {categoryItems.length === 1 ? "file" : "files"}
                    </span>
                  </div>

                  <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                    {categoryItems.length === 0 ? (
                      <div className="py-10 flex flex-col items-center justify-center text-slate-400">
                        <ImageIcon size={36} className="mb-2 opacity-30 text-slate-300" />
                        <p className="text-xs font-medium">No resources found in this category</p>
                      </div>
                    ) : (
                      <div className="space-y-8">
                        {subcategories.map((subcat) => (
                          <div key={subcat}>
                            <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-4">{subcat}</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                              {categoryItems
                                .filter((i) => i.subcategory === subcat)
                                .map((item) => (
                                  <div
                                    key={item.id}
                                    className="group flex flex-col bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
                                  >
                                    <div className="relative aspect-video bg-slate-50 flex items-center justify-center border-b border-slate-100">
                                      {item.mediaType === "image" ? (
                                        <Image
                                          src={item.mediaUrl}
                                          alt={item.title}
                                          fill
                                          unoptimized
                                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                          className="object-cover"
                                        />
                                      ) : (
                                        <div className="flex flex-col items-center gap-2">
                                          {getFileIcon(item.mediaType)}
                                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                            {item.mediaType}
                                          </span>
                                        </div>
                                      )}

                                      <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                        {item.mediaType === "image" && (
                                          <button
                                            onClick={() => setPreviewItem(item)}
                                            className="p-2 bg-white rounded-full text-slate-800 hover:text-[#0b918c] transition-colors"
                                          >
                                            <Eye size={16} />
                                          </button>
                                        )}
                                        <a
                                          href={item.mediaUrl}
                                          download={item.title}
                                          className="p-2 bg-white rounded-full text-slate-800 hover:text-[#0b918c] transition-colors"
                                        >
                                          <Download size={16} />
                                        </a>
                                        <button
                                          onClick={() => removeItem(item.id)}
                                          className="p-2 bg-white rounded-full text-slate-800 hover:text-rose-600 transition-colors"
                                        >
                                          <Trash2 size={16} />
                                        </button>
                                      </div>
                                    </div>

                                    <div className="p-3">
                                      <p className="text-xs font-semibold text-slate-800 truncate" title={item.title}>
                                        {item.title}
                                      </p>
                                      <p className="text-[10px] text-slate-400 mt-1">
                                        {item.size} • {item.date}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </main>

      {/* Lightbox / Preview Modal */}
      {previewItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 md:p-8">
          <button
            onClick={() => setPreviewItem(null)}
            className="absolute top-5 right-5 text-white/70 hover:text-white transition-colors p-2"
          >
            <X size={28} />
          </button>
          <div className="max-w-4xl w-full flex flex-col items-center">
            <div className="relative w-full h-[65vh]">
              <Image
                src={previewItem.mediaUrl}
                alt={previewItem.title}
                fill
                unoptimized
                priority
                className="object-contain"
              />
            </div>
            <div className="mt-6 text-center text-white">
              <h2 className="text-base font-bold">{previewItem.title}</h2>
              <p className="text-white/50 text-xs mt-1">{previewItem.size}</p>
              <a
                href={previewItem.mediaUrl}
                download={previewItem.title}
                className="mt-4 inline-flex items-center gap-2 px-6 py-2.5 bg-[#0b918c] hover:bg-[#087a75] rounded-lg text-xs font-semibold text-white transition-colors"
              >
                <Download size={15} /> Download Resource
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Persistent Bottom Bar */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 py-2.5 flex items-center justify-between z-20 text-xs">
        <div className="flex items-center gap-2 text-slate-500 font-medium">
          <span className="w-2 h-2 rounded-full bg-[#0b918c]" />
          <span>{items.length} Total Resources Loaded</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-500 font-medium">
          <CheckCircle2 size={14} className="text-emerald-500" />
          <span>Ready & Synchronized</span>
        </div>
      </footer>
    </div>
  );
}