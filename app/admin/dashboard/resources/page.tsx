// "use client";
// import React, { useState, useRef, useEffect } from 'react';
// import { 
//   Upload, 
//   X, 
//   Image as ImageIcon, 
//   File, 
//   Trash2, 
//   Eye, 
//   Download, 
//   Plus,
//   Filter,
//   Search,
//   CheckCircle2,
//   FileText,
//   Music,
//   Video,
//   ChevronRight
// } from 'lucide-react';

// /**
//  * Interface for the Media Item object
//  */
// interface MediaItem {
//   id: string;
//   name: string;
//   type: string;
//   size: string;
//   date: string;
//   category: string; // ID of the section
//   subcategory: string; // Specific group like "Guidelines", "Protocols", etc.
//   url: string;
//   rawFile: File;
// }

// const CATEGORIES = [
//   { id: "Guidelines___Training_Modules", label: "Guidelines & Training Modules" },
//   { id: "Awareness_Generation-_Interpersonal_Communication", label: "Awareness Generation- Interpersonal Communication" },
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
//   const [isDragging, setIsDragging] = useState<boolean>(false);
//   const [activeUploadCategory, setActiveUploadCategory] = useState<string>(CATEGORIES[0].id);
//   const [activeUploadSubcategory, setActiveUploadSubcategory] = useState<string>(SUBCATEGORIES[0]);
  
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const handleFileUpload = (files: FileList | File[]) => {
//     const newItems: MediaItem[] = Array.from(files).map(file => {
//       const item: MediaItem = {
//         id: Math.random().toString(36).substr(2, 9),
//         name: file.name,
//         type: file.type,
//         size: (file.size / 1024).toFixed(1) + ' KB',
//         date: new Date().toLocaleDateString(),
//         category: activeUploadCategory,
//         subcategory: activeUploadSubcategory,
//         url: URL.createObjectURL(file),
//         rawFile: file
//       };
//       return item;
//     });

//     setItems(prev => [...newItems, ...prev]);
//   };

//   const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       handleFileUpload(e.target.files);
//     }
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
//     if (type.startsWith('image/')) return <ImageIcon size={24} className="text-blue-500" />;
//     if (type.startsWith('video/')) return <Video size={24} className="text-purple-500" />;
//     if (type.startsWith('audio/')) return <Music size={24} className="text-pink-500" />;
//     return <FileText size={24} className="text-orange-500" />;
//   };

//   // Group items by category for rendering
//   const groupedItems = CATEGORIES.map(cat => ({
//     ...cat,
//     items: items.filter(item => 
//       item.category === cat.id && 
//       item.name.toLowerCase().includes(searchQuery.toLowerCase())
//     )
//   }));

//   return (
//     <div className="min-h-screen bg-[#f8f9fa] text-slate-900 font-sans pb-20">
//       {/* Header (Inspired by snippet) */}
//       <header className="bg-white border-b border-slate-200 px-6 py-6 mb-8 shadow-sm">
//         <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
//           <div>
//             <h1 className="text-2xl font-bold text-[#0b918c] tracking-tight">COMMUNICATION MATERIALS</h1>
//             <p className="text-slate-500 text-sm mt-1">Resource Repository Management</p>
//           </div>

//           <div className="flex items-center gap-4">
//             <div className="relative md:w-80">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
//               <input 
//                 type="text" 
//                 placeholder="Search resources..." 
//                 className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#0b918c] transition-all text-sm outline-none"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//             </div>
//           </div>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto px-6">
//         <div className="flex flex-col lg:flex-row gap-8">
          
//           {/* Left Column: Sidebar (Sticky as per snippet) */}
//           <aside className="lg:w-1/4">
//             <div className="sticky top-24 space-y-6">
//               {/* Category Menu */}
//               <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
//                 <div className="bg-white p-4 font-bold text-center border-b border-slate-100 text-sm text-slate-700 uppercase tracking-wider">
//                   Categories
//                 </div>
//                 <nav className="flex flex-col">
//                   {CATEGORIES.map(cat => (
//                     <a 
//                       key={cat.id}
//                       href={`#${cat.id}`}
//                       className="px-5 py-3.5 text-[13px] text-slate-600 hover:bg-[#f0f9f8] hover:text-[#0b918c] border-b border-slate-50 transition-colors flex items-center justify-between group"
//                     >
//                       <span>{cat.label}</span>
//                       <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
//                     </a>
//                   ))}
//                 </nav>
//               </div>

//               {/* Upload Controls Card */}
//               <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
//                 <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
//                   <Plus size={16} className="text-[#0b918c]" />
//                   Quick Upload
//                 </h3>
                
//                 <div className="space-y-4">
//                   <div>
//                     <label className="text-[11px] font-bold text-slate-400 uppercase mb-1 block">Target Category</label>
//                     <select 
//                       value={activeUploadCategory}
//                       onChange={(e) => setActiveUploadCategory(e.target.value)}
//                       className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs outline-none focus:border-[#0b918c]"
//                     >
//                       {CATEGORIES.map(cat => <option key={cat.id} value={cat.id}>{cat.label}</option>)}
//                     </select>
//                   </div>

//                   <div>
//                     <label className="text-[11px] font-bold text-slate-400 uppercase mb-1 block">Sub-header</label>
//                     <select 
//                       value={activeUploadSubcategory}
//                       onChange={(e) => setActiveUploadSubcategory(e.target.value)}
//                       className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs outline-none focus:border-[#0b918c]"
//                     >
//                       {SUBCATEGORIES.map(sub => <option key={sub} value={sub}>{sub}</option>)}
//                     </select>
//                   </div>

//                   <button 
//                     onClick={() => fileInputRef.current?.click()}
//                     className="w-full py-3 bg-[#0b918c] text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#087a75] transition-all shadow-md active:scale-95"
//                   >
//                     <Upload size={16} />
//                     Browse Files
//                   </button>
//                   <input type="file" ref={fileInputRef} onChange={onFileChange} className="hidden" multiple />
//                 </div>
//               </div>
//             </div>
//           </aside>

//           {/* Right Column: Main Content */}
//           <div className="lg:w-3/4 space-y-12">
//             {groupedItems.map(group => (
//               <section key={group.id} id={group.id} className="scroll-mt-24">
//                 <h6 className="text-lg font-bold text-[#0b918c] mb-4 ml-2">{group.label}</h6>
                
//                 <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-6 md:p-8">
//                   {group.items.length === 0 ? (
//                     <div className="py-12 flex flex-col items-center justify-center text-slate-300">
//                       <ImageIcon size={48} className="mb-2 opacity-20" />
//                       <p className="text-sm font-medium">No items uploaded to this category yet</p>
//                     </div>
//                   ) : (
//                     <div className="space-y-10">
//                       {/* Sub-grouping within categories if needed (e.g., Guidelines, Protocols) */}
//                       {Array.from(new Set(group.items.map(i => i.subcategory))).map(subcat => (
//                         <div key={subcat}>
//                           <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
//                             <span className="w-1.5 h-1.5 rounded-full bg-[#0b918c]"></span>
//                             {subcat}
//                           </p>
//                           <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
//                             {group.items.filter(i => i.subcategory === subcat).map(item => (
//                               <div key={item.id} className="group flex flex-col h-full bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300">
//                                 {/* Media Container */}
//                                 <div className="relative aspect-4/3 bg-slate-50 rounded-t-2xl overflow-hidden flex items-center justify-center">
//                                   {item.type.startsWith('image/') ? (
//                                     <img 
//                                       src={item.url} 
//                                       alt={item.name} 
//                                       className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
//                                     />
//                                   ) : (
//                                     <div className="flex flex-col items-center gap-3">
//                                       {getFileIcon(item.type)}
//                                       <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{item.type.split('/')[1] || 'FILE'}</span>
//                                     </div>
//                                   )}
                                  
//                                   {/* Actions Overlay */}
//                                   <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
//                                     {item.type.startsWith('image/') && (
//                                       <button onClick={() => setPreviewItem(item)} className="p-2.5 bg-white rounded-full text-slate-900 hover:text-[#0b918c] transition-colors"><Eye size={18} /></button>
//                                     )}
//                                     <a href={item.url} download={item.name} className="p-2.5 bg-white rounded-full text-slate-900 hover:text-[#0b918c] transition-colors"><Download size={18} /></a>
//                                     <button onClick={() => removeItem(item.id)} className="p-2.5 bg-white rounded-full text-slate-900 hover:text-red-600 transition-colors"><Trash2 size={18} /></button>
//                                   </div>
//                                 </div>

//                                 {/* Text Content */}
//                                 <div className="p-4 flex-1 flex flex-col justify-center text-center">
//                                   <p className="text-[13px] font-bold text-slate-800 leading-snug line-clamp-2 uppercase">
//                                     {item.name}
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
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 md:p-10 animate-in fade-in duration-200">
//           <button 
//             onClick={() => setPreviewItem(null)}
//             className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors p-2"
//           >
//             <X size={32} />
//           </button>
          
//           <div className="max-w-5xl w-full h-full flex flex-col items-center justify-center">
//             <img 
//               src={previewItem.url} 
//               alt={previewItem.name} 
//               className="max-w-full max-h-[80vh] object-contain shadow-2xl rounded-sm"
//             />
//             <div className="mt-8 text-center text-white">
//               <h2 className="text-xl font-bold uppercase tracking-wide">{previewItem.name}</h2>
//               <p className="text-white/40 text-sm mt-2">{previewItem.category.replace(/_/g, ' ')} • {previewItem.size}</p>
//               <div className="mt-6 flex justify-center gap-4">
//                 <a 
//                   href={previewItem.url} 
//                   download={previewItem.name}
//                   className="px-8 py-3 bg-[#0b918c] hover:bg-[#087a75] rounded-full flex items-center gap-2 font-bold transition-all"
//                 >
//                   <Download size={18} /> Download Material
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Persistence Note Footer */}
//       <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-3 md:px-10 flex items-center justify-between z-20 shadow-up">
//         <div className="flex items-center gap-6 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
//           <div className="flex items-center gap-1.5">
//             <span className="w-2 h-2 rounded-full bg-[#0b918c]"></span>
//             <span>{items.length} Total Resources</span>
//           </div>
//         </div>
//         <div className="flex items-center gap-2 text-[11px] text-slate-400 font-bold uppercase tracking-widest">
//           <CheckCircle2 size={14} className="text-green-500" />
//           <span>Local Dashboard Active</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// // export default App;


"use client";
import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { 
  Upload, 
  X, 
  Image as ImageIcon, 
  Trash2, 
  Eye, 
  Download, 
  Plus,
  Search,
  CheckCircle2,
  FileText,
  Music,
  Video,
  ChevronRight
} from 'lucide-react';

/**
 * Interface for the Media Item object
 */
interface MediaItem {
  id: string;
  name: string;
  type: string;
  size: string;
  date: string;
  category: string; // ID of the section
  subcategory: string; // Specific group like "Guidelines", "Protocols", etc.
  url: string;
  rawFile: File;
}

const CATEGORIES = [
  { id: "Guidelines___Training_Modules", label: "Guidelines & Training Modules" },
  { id: "Awareness_Generation-_Interpersonal_Communication", label: "Awareness Generation- Interpersonal Communication" },
  { id: "Mass_Media", label: "Mass Media" },
  { id: "Social_Media", label: "Social Media" },
  { id: "Case_Studies", label: "Case Studies" },
  { id: "Other", label: "Other" }
];

const SUBCATEGORIES = ["General", "Guidelines", "Protocols", "Manuals", "MTC", "Corona Virus"];

const App: React.FC = () => {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [previewItem, setPreviewItem] = useState<MediaItem | null>(null);
  const [activeUploadCategory, setActiveUploadCategory] = useState<string>(CATEGORIES[0].id);
  const [activeUploadSubcategory, setActiveUploadSubcategory] = useState<string>(SUBCATEGORIES[0]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (files: FileList | File[]) => {
    const newItems: MediaItem[] = Array.from(files).map(file => {
      const item: MediaItem = {
        id: Math.random().toString(36).substring(2, 11),
        name: file.name,
        type: file.type,
        size: (file.size / 1024).toFixed(1) + ' KB',
        date: new Date().toLocaleDateString(),
        category: activeUploadCategory,
        subcategory: activeUploadSubcategory,
        url: URL.createObjectURL(file),
        rawFile: file
      };
      return item;
    });

    setItems(prev => [...newItems, ...prev]);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileUpload(e.target.files);
    }
  };

  const removeItem = (id: string) => {
    setItems(prev => {
      const item = prev.find(i => i.id === id);
      if (item && item.url) URL.revokeObjectURL(item.url);
      return prev.filter(i => i.id !== id);
    });
    if (previewItem?.id === id) setPreviewItem(null);
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <ImageIcon size={24} className="text-blue-500" />;
    if (type.startsWith('video/')) return <Video size={24} className="text-purple-500" />;
    if (type.startsWith('audio/')) return <Music size={24} className="text-pink-500" />;
    return <FileText size={24} className="text-orange-500" />;
  };

  // Group items by category for rendering
  const groupedItems = CATEGORIES.map(cat => ({
    ...cat,
    items: items.filter(item => 
      item.category === cat.id && 
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }));

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-slate-900 font-sans pb-20">
      {/* Header (Inspired by snippet) */}
      <header className="bg-white border-b border-slate-200 px-6 py-6 mb-8 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-2xl font-bold text-[#0b918c] tracking-tight">COMMUNICATION MATERIALS</h1>
            <p className="text-slate-500 text-sm mt-1">Resource Repository Management</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search resources..." 
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#0b918c] transition-all text-sm outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Column: Sidebar (Sticky as per snippet) */}
          <aside className="lg:w-1/4">
            <div className="sticky top-24 space-y-6">
              {/* Category Menu */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="bg-white p-4 font-bold text-center border-b border-slate-100 text-sm text-slate-700 uppercase tracking-wider">
                  Categories
                </div>
                <nav className="flex flex-col">
                  {CATEGORIES.map(cat => (
                    <a 
                      key={cat.id}
                      href={`#${cat.id}`}
                      className="px-5 py-3.5 text-[13px] text-slate-600 hover:bg-[#f0f9f8] hover:text-[#0b918c] border-b border-slate-50 transition-colors flex items-center justify-between group"
                    >
                      <span>{cat.label}</span>
                      <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  ))}
                </nav>
              </div>

              {/* Upload Controls Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
                <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <Plus size={16} className="text-[#0b918c]" />
                  Quick Upload
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-[11px] font-bold text-slate-400 uppercase mb-1 block">Target Category</label>
                    <select 
                      value={activeUploadCategory}
                      onChange={(e) => setActiveUploadCategory(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs outline-none focus:border-[#0b918c]"
                    >
                      {CATEGORIES.map(cat => <option key={cat.id} value={cat.id}>{cat.label}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-400 uppercase mb-1 block">Sub-header</label>
                    <select 
                      value={activeUploadSubcategory}
                      onChange={(e) => setActiveUploadSubcategory(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs outline-none focus:border-[#0b918c]"
                    >
                      {SUBCATEGORIES.map(sub => <option key={sub} value={sub}>{sub}</option>)}
                    </select>
                  </div>

                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-3 bg-[#0b918c] text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#087a75] transition-all shadow-md active:scale-95"
                  >
                    <Upload size={16} />
                    Browse Files
                  </button>
                  <input type="file" ref={fileInputRef} onChange={onFileChange} className="hidden" multiple />
                </div>
              </div>
            </div>
          </aside>

          {/* Right Column: Main Content */}
          <div className="lg:w-3/4 space-y-12">
            {groupedItems.map(group => (
              <section key={group.id} id={group.id} className="scroll-mt-24">
                <h6 className="text-lg font-bold text-[#0b918c] mb-4 ml-2">{group.label}</h6>
                
                <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-6 md:p-8">
                  {group.items.length === 0 ? (
                    <div className="py-12 flex flex-col items-center justify-center text-slate-300">
                      <ImageIcon size={48} className="mb-2 opacity-20" />
                      <p className="text-sm font-medium">No items uploaded to this category yet</p>
                    </div>
                  ) : (
                    <div className="space-y-10">
                      {Array.from(new Set(group.items.map(i => i.subcategory))).map(subcat => (
                        <div key={subcat}>
                          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#0b918c]"></span>
                            {subcat}
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                            {group.items.filter(i => i.subcategory === subcat).map(item => (
                              <div key={item.id} className="group flex flex-col h-full bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300">
                                {/* Media Container */}
                                <div className="relative aspect-[4/3] bg-slate-50 rounded-t-2xl overflow-hidden flex items-center justify-center">
                                  {item.type.startsWith('image/') ? (
                                    <Image 
                                      src={item.url} 
                                      alt={item.name} 
                                      fill
                                      unoptimized
                                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                      className="object-cover group-hover:scale-110 transition-transform duration-500" 
                                    />
                                  ) : (
                                    <div className="flex flex-col items-center gap-3">
                                      {getFileIcon(item.type)}
                                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{item.type.split('/')[1] || 'FILE'}</span>
                                    </div>
                                  )}
                                  
                                  {/* Actions Overlay */}
                                  <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 z-10">
                                    {item.type.startsWith('image/') && (
                                      <button onClick={() => setPreviewItem(item)} className="p-2.5 bg-white rounded-full text-slate-900 hover:text-[#0b918c] transition-colors"><Eye size={18} /></button>
                                    )}
                                    <a href={item.url} download={item.name} className="p-2.5 bg-white rounded-full text-slate-900 hover:text-[#0b918c] transition-colors"><Download size={18} /></a>
                                    <button onClick={() => removeItem(item.id)} className="p-2.5 bg-white rounded-full text-slate-900 hover:text-red-600 transition-colors"><Trash2 size={18} /></button>
                                  </div>
                                </div>

                                {/* Text Content */}
                                <div className="p-4 flex-1 flex flex-col justify-center text-center">
                                  <p className="text-[13px] font-bold text-slate-800 leading-snug line-clamp-2 uppercase">
                                    {item.name}
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
            ))}
          </div>
        </div>
      </main>

      {/* Lightbox / Preview Modal */}
      {previewItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 md:p-10 animate-in fade-in duration-200">
          <button 
            onClick={() => setPreviewItem(null)}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors p-2 z-50"
          >
            <X size={32} />
          </button>
          
          <div className="max-w-5xl w-full h-full flex flex-col items-center justify-center">
            <div className="relative w-full h-[70vh]">
              <Image 
                src={previewItem.url} 
                alt={previewItem.name} 
                fill
                unoptimized
                priority
                className="object-contain shadow-2xl rounded-sm"
              />
            </div>
            <div className="mt-8 text-center text-white">
              <h2 className="text-xl font-bold uppercase tracking-wide">{previewItem.name}</h2>
              <p className="text-white/40 text-sm mt-2">{previewItem.category.replace(/_/g, ' ')} • {previewItem.size}</p>
              <div className="mt-6 flex justify-center gap-4">
                <a 
                  href={previewItem.url} 
                  download={previewItem.name}
                  className="px-8 py-3 bg-[#0b918c] hover:bg-[#087a75] rounded-full flex items-center gap-2 font-bold transition-all"
                >
                  <Download size={18} /> Download Material
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Persistence Note Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-3 md:px-10 flex items-center justify-between z-20 shadow-up">
        <div className="flex items-center gap-6 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#0b918c]"></span>
            <span>{items.length} Total Resources</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-slate-400 font-bold uppercase tracking-widest">
          <CheckCircle2 size={14} className="text-green-500" />
          <span>Local Dashboard Active</span>
        </div>
      </div>
    </div>
  );
};

export default App;