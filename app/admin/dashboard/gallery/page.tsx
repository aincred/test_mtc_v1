// // // "use client";

// // // import React, { useState, useEffect, useCallback } from 'react';
// // // import { X, Image as ImageIcon, Users, MonitorPlay, FileText } from 'lucide-react';

// // // // --- Types ---
// // // type GalleryItem = {
// // //   id: string;
// // //   originalSrc: string;
// // //   displaySrc: string;
// // //   alt: string;
// // // };

// // // type GallerySection = {
// // //   title: string;
// // //   items: GalleryItem[];
// // //   icon: React.ElementType;
// // // };

// // // // --- Mock Data mapped from original HTML ---
// // // const galleryData: GallerySection[] = [
// // //   {
// // //     title: 'Sliders',
// // //     icon: ImageIcon,
// // //     items: [
// // //       { id: 'b1', originalSrc: '20210602164002845b1.jpg', displaySrc: 'https://picsum.photos/seed/slider1/800/600', alt: 'Slider image 1 showing landscape' },
// // //       { id: 'b2', originalSrc: '20210602164002845b2.jpg', displaySrc: 'https://picsum.photos/seed/slider2/800/600', alt: 'Slider image 2 showing city' },
// // //       { id: 'b3', originalSrc: '20210602164002845b3.jpg', displaySrc: 'https://picsum.photos/seed/slider3/800/600', alt: 'Slider image 3 showing nature' },
// // //       { id: 'b5', originalSrc: '20210602164002845b5.jpg', displaySrc: 'https://picsum.photos/seed/slider4/800/600', alt: 'Slider image 4 showing architecture' },
// // //     ],
// // //   },
// // //   {
// // //     title: 'Clients',
// // //     icon: Users,
// // //     items: Array.from({ length: 9 }).map((_, i) => ({
// // //       id: `logo_${i + 1}`,
// // //       originalSrc: `logo_${i + 1}.png`,
// // //       displaySrc: `https://ui-avatars.com/api/?name=Client+${i + 1}&background=f8fafc&color=1e3a8a&size=200&font-size=0.33&bold=true`,
// // //       alt: `Client ${i + 1} Company Logo`,
// // //     })),
// // //   },
// // //   {
// // //     title: 'Corosials',
// // //     icon: MonitorPlay,
// // //     items: [
// // //       { id: 's1', originalSrc: 's1.jpg', displaySrc: 'https://picsum.photos/seed/coro1/800/600', alt: 'Corosial presentation 1' },
// // //       { id: 's2', originalSrc: 's2.jpg', displaySrc: 'https://picsum.photos/seed/coro2/800/600', alt: 'Corosial presentation 2' },
// // //       { id: 's3', originalSrc: 's3.jpg', displaySrc: 'https://picsum.photos/seed/coro3/800/600', alt: 'Corosial presentation 3' },
// // //       { id: 'cb1', originalSrc: 'b1.jpg', displaySrc: 'https://picsum.photos/seed/coro4/800/600', alt: 'Corosial presentation 4' },
// // //     ],
// // //   },
// // //   {
// // //     title: 'Types of files',
// // //     icon: FileText,
// // //     items: ['CSV', 'DOC', 'DOCX', 'EXE', 'FOLDER', 'JPG', 'MAP', 'MP3', 'MP4', 'PDF', 'PNG', 'PPT'].map((type) => ({
// // //       id: type.toLowerCase(),
// // //       originalSrc: `${type.toLowerCase()}.png`,
// // //       displaySrc: `https://ui-avatars.com/api/?name=${type}&background=e0e7ff&color=312e81&size=150&font-size=0.35&bold=true&rounded=true`,
// // //       alt: `${type} file format icon`,
// // //     })),
// // //   },
// // // ];

// // // export default function App() {
// // //   const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

// // //   // GIGW Accessibility requirement: Close modal on Escape key
// // //   const handleKeyDown = useCallback((e: KeyboardEvent) => {
// // //     if (e.key === 'Escape') {
// // //       setSelectedImage(null);
// // //     }
// // //   }, []);

// // //   useEffect(() => {
// // //     if (selectedImage) {
// // //       document.addEventListener('keydown', handleKeyDown);
// // //       document.body.style.overflow = 'hidden';
// // //     } else {
// // //       document.removeEventListener('keydown', handleKeyDown);
// // //       document.body.style.overflow = 'unset';
// // //     }
// // //     return () => {
// // //       document.removeEventListener('keydown', handleKeyDown);
// // //       document.body.style.overflow = 'unset';
// // //     };
// // //   }, [selectedImage, handleKeyDown]);

// // //   const closeModal = () => setSelectedImage(null);

// // //   return (
// // //     <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-300 selection:text-indigo-900">
      
// // //       {/* Redesigned Hero Header */}
// // //       <header className="bg-indigo-900 text-white py-16 px-4 sm:px-6 lg:px-8 shadow-lg relative overflow-hidden">
// // //         {/* Subtle background pattern */}
// // //         <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
// // //         <div className="max-w-7xl mx-auto relative z-10">
// // //           <div className="inline-block px-3 py-1 mb-4 rounded-full bg-indigo-800 text-indigo-200 text-sm font-semibold tracking-wide border border-indigo-700">
// // //             Official Portal
// // //           </div>
// // //           <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight" id="gallery-heading">
// // //             Media Gallery
// // //           </h1>
// // //           <p className="mt-4 text-indigo-200 max-w-2xl text-base md:text-lg">
// // //             Explore our curated repository of operational sliders, partnered client identities, and accessible digital assets.
// // //           </p>
// // //         </div>
// // //       </header>

// // //       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" aria-labelledby="gallery-heading">
// // //         {galleryData.map((section) => {
// // //           const Icon = section.icon;
// // //           return (
// // //             <section key={section.title} className="mb-20">
              
// // //               {/* Redesigned Section Headers */}
// // //               <div className="flex items-center mb-8 border-b-2 border-indigo-100 pb-4">
// // //                 <div className="bg-indigo-100 p-2.5 rounded-lg mr-4">
// // //                   <Icon className="w-6 h-6 text-indigo-700" aria-hidden="true" />
// // //                 </div>
// // //                 <h2 className="text-2xl md:text-3xl font-bold text-slate-800 capitalize tracking-tight">
// // //                   {section.title}
// // //                 </h2>
// // //               </div>

// // //               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 md:gap-8">
// // //                 {section.items.map((item) => (
// // //                   <button
// // //                     key={item.id}
// // //                     onClick={() => setSelectedImage(item)}
// // //                     className="group relative flex flex-col items-center justify-center bg-white rounded-xl shadow-sm border border-slate-200 p-3 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-indigo-400 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-500/50 focus-visible:border-indigo-500 focus-visible:translate-y-0"
// // //                     aria-label={`View larger image of ${item.alt}`}
// // //                   >
// // //                     <div className="w-full aspect-[4/3] overflow-hidden rounded-lg bg-slate-100 flex items-center justify-center">
// // //                       <img
// // //                         src={item.displaySrc}
// // //                         alt={item.alt}
// // //                         className="max-w-full max-h-full object-cover transition-transform duration-500 group-hover:scale-110"
// // //                         loading="lazy"
// // //                       />
// // //                     </div>
// // //                     {/* File type label */}
// // //                     {section.title === 'Types of files' && (
// // //                       <span className="mt-4 px-3 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded-full uppercase tracking-wider group-hover:bg-indigo-50 group-hover:text-indigo-700 transition-colors">
// // //                         {item.id}
// // //                       </span>
// // //                     )}
// // //                   </button>
// // //                 ))}
// // //               </div>
// // //             </section>
// // //           );
// // //         })}
// // //       </main>

// // //       {/* Redesigned Immersive Dark Modal */}
// // //       {selectedImage && (
// // //         <div
// // //           className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 backdrop-blur-md p-4 sm:p-8"
// // //           role="dialog"
// // //           aria-modal="true"
// // //           aria-labelledby="modal-title"
// // //           onClick={closeModal}
// // //         >
// // //           {/* Floating Close Button */}
// // //           <button
// // //             onClick={closeModal}
// // //             className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-sm transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-400 z-50"
// // //             aria-label="Close image dialog"
// // //             autoFocus
// // //           >
// // //             <X className="w-6 h-6" />
// // //           </button>

// // //           <div
// // //             className="relative w-full max-w-6xl flex flex-col items-center justify-center animate-in fade-in zoom-in duration-200"
// // //             onClick={(e) => e.stopPropagation()} 
// // //           >
// // //             <div className="w-full flex-1 flex items-center justify-center overflow-hidden mb-6">
// // //               <img
// // //                 src={selectedImage.displaySrc}
// // //                 alt={`Enlarged view of ${selectedImage.alt}`}
// // //                 className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl ring-1 ring-white/10"
// // //               />
// // //             </div>
            
// // //             {/* Modal Info Footer */}
// // //             <div className="w-full max-w-3xl bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
// // //               <h3 id="modal-title" className="text-white font-medium text-lg truncate flex-1 text-center sm:text-left">
// // //                 {selectedImage.alt}
// // //               </h3>
// // //               <div className="text-sm text-slate-400 flex items-center bg-slate-950 px-3 py-1.5 rounded-lg border border-white/5">
// // //                 <span className="mr-2">File:</span>
// // //                 <code className="text-indigo-300 select-all">{selectedImage.originalSrc}</code>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }


// // "use client";

// // import React, { useState, useEffect, useCallback } from 'react';
// // import Image from 'next/image';
// // import { X, Image as ImageIcon, Users, MonitorPlay, FileText } from 'lucide-react';

// // // --- Types ---
// // type GalleryItem = {
// //   id: string;
// //   originalSrc: string;
// //   displaySrc: string;
// //   alt: string;
// // };

// // type GallerySection = {
// //   title: string;
// //   items: GalleryItem[];
// //   icon: React.ElementType;
// // };

// // // --- Mock Data mapped from original HTML ---
// // const galleryData: GallerySection[] = [
// //   {
// //     title: 'Sliders',
// //     icon: ImageIcon,
// //     items: [
// //       { id: 'b1', originalSrc: '20210602164002845b1.jpg', displaySrc: 'https://picsum.photos/seed/slider1/800/600', alt: 'Slider image 1 showing landscape' },
// //       { id: 'b2', originalSrc: '20210602164002845b2.jpg', displaySrc: 'https://picsum.photos/seed/slider2/800/600', alt: 'Slider image 2 showing city' },
// //       { id: 'b3', originalSrc: '20210602164002845b3.jpg', displaySrc: 'https://picsum.photos/seed/slider3/800/600', alt: 'Slider image 3 showing nature' },
// //       { id: 'b5', originalSrc: '20210602164002845b5.jpg', displaySrc: 'https://picsum.photos/seed/slider4/800/600', alt: 'Slider image 4 showing architecture' },
// //     ],
// //   },
// //   {
// //     title: 'Clients',
// //     icon: Users,
// //     items: Array.from({ length: 9 }).map((_, i) => ({
// //       id: `logo_${i + 1}`,
// //       originalSrc: `logo_${i + 1}.png`,
// //       displaySrc: `https://ui-avatars.com/api/?name=Client+${i + 1}&background=f8fafc&color=1e3a8a&size=200&font-size=0.33&bold=true`,
// //       alt: `Client ${i + 1} Company Logo`,
// //     })),
// //   },
// //   {
// //     title: 'Corosials',
// //     icon: MonitorPlay,
// //     items: [
// //       { id: 's1', originalSrc: 's1.jpg', displaySrc: 'https://picsum.photos/seed/coro1/800/600', alt: 'Corosial presentation 1' },
// //       { id: 's2', originalSrc: 's2.jpg', displaySrc: 'https://picsum.photos/seed/coro2/800/600', alt: 'Corosial presentation 2' },
// //       { id: 's3', originalSrc: 's3.jpg', displaySrc: 'https://picsum.photos/seed/coro3/800/600', alt: 'Corosial presentation 3' },
// //       { id: 'cb1', originalSrc: 'b1.jpg', displaySrc: 'https://picsum.photos/seed/coro4/800/600', alt: 'Corosial presentation 4' },
// //     ],
// //   },
// //   {
// //     title: 'Types of files',
// //     icon: FileText,
// //     items: ['CSV', 'DOC', 'DOCX', 'EXE', 'FOLDER', 'JPG', 'MAP', 'MP3', 'MP4', 'PDF', 'PNG', 'PPT'].map((type) => ({
// //       id: type.toLowerCase(),
// //       originalSrc: `${type.toLowerCase()}.png`,
// //       displaySrc: `https://ui-avatars.com/api/?name=${type}&background=e0e7ff&color=312e81&size=150&font-size=0.35&bold=true&rounded=true`,
// //       alt: `${type} file format icon`,
// //     })),
// //   },
// // ];

// // export default function App() {
// //   const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

// //   // GIGW Accessibility requirement: Close modal on Escape key
// //   const handleKeyDown = useCallback((e: KeyboardEvent) => {
// //     if (e.key === 'Escape') {
// //       setSelectedImage(null);
// //     }
// //   }, []);

// //   useEffect(() => {
// //     if (selectedImage) {
// //       document.addEventListener('keydown', handleKeyDown);
// //       document.body.style.overflow = 'hidden';
// //     } else {
// //       document.removeEventListener('keydown', handleKeyDown);
// //       document.body.style.overflow = 'unset';
// //     }
// //     return () => {
// //       document.removeEventListener('keydown', handleKeyDown);
// //       document.body.style.overflow = 'unset';
// //     };
// //   }, [selectedImage, handleKeyDown]);

// //   const closeModal = () => setSelectedImage(null);

// //   return (
// //     <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-300 selection:text-indigo-900">
      
// //       {/* Redesigned Hero Header */}
// //       <header className="bg-indigo-900 text-white py-16 px-4 sm:px-6 lg:px-8 shadow-lg relative overflow-hidden">
// //         {/* Subtle background pattern */}
// //         <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
// //         <div className="max-w-7xl mx-auto relative z-10">
// //           <div className="inline-block px-3 py-1 mb-4 rounded-full bg-indigo-800 text-indigo-200 text-sm font-semibold tracking-wide border border-indigo-700">
// //             Official Portal
// //           </div>
// //           <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight" id="gallery-heading">
// //             Media Gallery
// //           </h1>
// //           <p className="mt-4 text-indigo-200 max-w-2xl text-base md:text-lg">
// //             Explore our curated repository of operational sliders, partnered client identities, and accessible digital assets.
// //           </p>
// //         </div>
// //       </header>

// //       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" aria-labelledby="gallery-heading">
// //         {galleryData.map((section) => {
// //           const Icon = section.icon;
// //           return (
// //             <section key={section.title} className="mb-20">
              
// //               {/* Redesigned Section Headers */}
// //               <div className="flex items-center mb-8 border-b-2 border-indigo-100 pb-4">
// //                 <div className="bg-indigo-100 p-2.5 rounded-lg mr-4">
// //                   <Icon className="w-6 h-6 text-indigo-700" aria-hidden="true" />
// //                 </div>
// //                 <h2 className="text-2xl md:text-3xl font-bold text-slate-800 capitalize tracking-tight">
// //                   {section.title}
// //                 </h2>
// //               </div>

// //               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 md:gap-8">
// //                 {section.items.map((item) => (
// //                   <button
// //                     key={item.id}
// //                     onClick={() => setSelectedImage(item)}
// //                     className="w-full group relative flex flex-col items-center justify-center bg-white rounded-xl shadow-sm border border-slate-200 p-3 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-indigo-400 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-500/50 focus-visible:border-indigo-500 focus-visible:translate-y-0"
// //                     aria-label={`View larger image of ${item.alt}`}
// //                   >
// //                     {/* Relative container wrapper added to solve Next Image layout specs */}
// //                     <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg bg-slate-100">
// //                       <Image
// //                         src={item.displaySrc}
// //                         alt={item.alt}
// //                         fill
// //                         sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
// //                         unoptimized
// //                         className="object-cover transition-transform duration-500 group-hover:scale-110"
// //                       />
// //                     </div>
// //                     {/* File type label */}
// //                     {section.title === 'Types of files' && (
// //                       <span className="mt-4 px-3 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded-full uppercase tracking-wider group-hover:bg-indigo-50 group-hover:text-indigo-700 transition-colors">
// //                         {item.id}
// //                       </span>
// //                     )}
// //                   </button>
// //                 ))}
// //               </div>
// //             </section>
// //           );
// //         })}
// //       </main>

// //       {/* Redesigned Immersive Dark Modal */}
// //       {selectedImage && (
// //         <div
// //           className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 backdrop-blur-md p-4 sm:p-8"
// //           role="dialog"
// //           aria-modal="true"
// //           aria-labelledby="modal-title"
// //           onClick={closeModal}
// //         >
// //           {/* Floating Close Button */}
// //           <button
// //             onClick={closeModal}
// //             className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-sm transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-400 z-50"
// //             aria-label="Close image dialog"
// //             autoFocus
// //           >
// //             <X className="w-6 h-6" />
// //           </button>

// //           <div
// //             className="relative w-full max-w-6xl flex flex-col items-center justify-center animate-in fade-in zoom-in duration-200"
// //             onClick={(e) => e.stopPropagation()} 
// //           >
// //             {/* Box wrapper optimization to hold exact fluid dimensions correctly */}
// //             <div className="relative w-full h-[75vh] mb-6">
// //               <Image
// //                 src={selectedImage.displaySrc}
// //                 alt={`Enlarged view of ${selectedImage.alt}`}
// //                 fill
// //                 unoptimized
// //                 priority
// //                 className="object-contain rounded-lg shadow-2xl ring-1 ring-white/10"
// //               />
// //             </div>
            
// //             {/* Modal Info Footer */}
// //             <div className="w-full max-w-3xl bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
// //               <h3 id="modal-title" className="text-white font-medium text-lg truncate flex-1 text-center sm:text-left">
// //                 {selectedImage.alt}
// //               </h3>
// //               <div className="text-sm text-slate-400 flex items-center bg-slate-950 px-3 py-1.5 rounded-lg border border-white/5">
// //                 <span className="mr-2">File:</span>
// //                 <code className="text-indigo-300 select-all">{selectedImage.originalSrc}</code>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// "use client";

// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import Image from 'next/image';
// import { 
//   X, 
//   ImageIcon, 
//   Users, 
//   MonitorPlay, 
//   FileText, 
//   UploadCloud, 
//   Trash2, 
//   FolderPlus,
//   CheckCircle2,
//   FolderOpen
// } from 'lucide-react';

// // --- Types ---
// type UploadedItem = {
//   id: string;
//   name: string;
//   url: string;
//   size: string;
//   category: string;
//   rawFile: File;
// };

// type CategoryDef = {
//   id: string;
//   title: string;
//   icon: React.ElementType;
// };

// const CATEGORIES: CategoryDef[] = [
//   { id: 'sliders', title: 'Sliders', icon: ImageIcon },
//   { id: 'clients', title: 'Clients', icon: Users },
//   { id: 'corosials', title: 'Corosials', icon: MonitorPlay },
//   { id: 'files', title: 'Types of files', icon: FileText },
// ];

// export default function GalleryPage() {
//   const [items, setItems] = useState<UploadedItem[]>([]);
//   const [selectedItem, setSelectedItem] = useState<UploadedItem | null>(null);
//   const [targetCategory, setTargetCategory] = useState<string>(CATEGORIES[0].id);
//   const [isDragging, setIsDragging] = useState<boolean>(false);
//   const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);

//   const fileInputRef = useRef<HTMLInputElement>(null);

//   // Handle uploaded files
//   const processFiles = (files: FileList | File[]) => {
//     const fileArray = Array.from(files).filter(f => f.type.startsWith('image/'));
//     if (fileArray.length === 0) return;

//     const newItems: UploadedItem[] = fileArray.map(file => ({
//       id: `img_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
//       name: file.name,
//       url: URL.createObjectURL(file),
//       size: (file.size / 1024).toFixed(1) + ' KB',
//       category: targetCategory,
//       rawFile: file,
//     }));

//     setItems(prev => [...newItems, ...prev]);
//     setUploadSuccess(true);
//     setTimeout(() => setUploadSuccess(false), 3000);
//   };

//   const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       processFiles(e.target.files);
//       e.target.value = ''; // Reset input to allow re-uploading the same file
//     }
//   };

//   const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setIsDragging(false);
//     if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
//       processFiles(e.dataTransfer.files);
//     }
//   };

//   const removeItem = (id: string, e: React.MouseEvent) => {
//     e.stopPropagation();
//     setItems(prev => {
//       const itemToDelete = prev.find(item => item.id === id);
//       if (itemToDelete?.url) {
//         URL.revokeObjectURL(itemToDelete.url);
//       }
//       return prev.filter(item => item.id !== id);
//     });
//     if (selectedItem?.id === id) {
//       setSelectedItem(null);
//     }
//   };

//   // Keyboard accessibility
//   const handleKeyDown = useCallback((e: KeyboardEvent) => {
//     if (e.key === 'Escape') setSelectedItem(null);
//   }, []);

//   useEffect(() => {
//     if (selectedItem) {
//       document.addEventListener('keydown', handleKeyDown);
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.removeEventListener('keydown', handleKeyDown);
//       document.body.style.overflow = 'unset';
//     }
//     return () => {
//       document.removeEventListener('keydown', handleKeyDown);
//       document.body.style.overflow = 'unset';
//     };
//   }, [selectedItem, handleKeyDown]);

//   // Cleanup object URLs on unmount to avoid memory leaks
//   useEffect(() => {
//     return () => {
//       items.forEach(item => URL.revokeObjectURL(item.url));
//     };
//   }, [items]);

//   // Group items by category
//   const activeSections = CATEGORIES.map(cat => ({
//     ...cat,
//     items: items.filter(item => item.category === cat.id),
//   })).filter(section => section.items.length > 0);

//   return (
//     <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-24">
//       {/* Header */}
//       <header className="bg-indigo-950 text-white py-10 px-4 sm:px-6 lg:px-8 shadow-sm">
//         <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//           <div>
//             <div className="inline-block px-3 py-0.5 mb-2 rounded-full bg-indigo-900 text-indigo-300 text-xs font-semibold tracking-wide border border-indigo-700/50">
//               Asset Manager
//             </div>
//             <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
//               Media Gallery &amp; Uploader
//             </h1>
//           </div>

//           <div className="bg-indigo-900/40 border border-indigo-800 px-4 py-2 rounded-xl flex items-center gap-3 text-xs self-start sm:self-auto">
//             <span className="text-indigo-300 uppercase tracking-wider font-semibold text-[10px]">Uploaded Photos:</span>
//             <span className="text-base font-bold text-white">{items.length}</span>
//           </div>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
//         {/* Upload Zone */}
//         <section className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-xs">
//           <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
//             <div className="flex items-center gap-3">
//               <div className="p-2.5 bg-indigo-50 text-indigo-700 rounded-xl">
//                 <FolderPlus size={22} />
//               </div>
//               <div>
//                 <h2 className="text-base font-bold text-slate-800">Upload Resources</h2>
//                 <p className="text-xs text-slate-500 mt-0.5">Select a destination category and upload images</p>
//               </div>
//             </div>

//             <div className="flex items-center gap-3">
//               <label htmlFor="category-select" className="text-xs font-semibold text-slate-600 whitespace-nowrap">
//                 Upload Target:
//               </label>
//               <select
//                 id="category-select"
//                 value={targetCategory}
//                 onChange={(e) => setTargetCategory(e.target.value)}
//                 className="bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
//               >
//                 {CATEGORIES.map(cat => (
//                   <option key={cat.id} value={cat.id}>
//                     {cat.title}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           {/* Drag & Drop Surface */}
//           <div
//             onDrop={handleDrop}
//             onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
//             onDragLeave={() => setIsDragging(false)}
//             onClick={() => fileInputRef.current?.click()}
//             className={`mt-6 border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center ${
//               isDragging
//                 ? 'border-indigo-600 bg-indigo-50/50'
//                 : 'border-slate-200 hover:border-indigo-400 hover:bg-slate-50/60'
//             }`}
//           >
//             <div className="p-3 bg-indigo-50 text-indigo-600 rounded-full mb-3">
//               <UploadCloud size={28} />
//             </div>
//             <p className="text-sm font-semibold text-slate-700">
//               Click to browse or drag and drop photos here
//             </p>
//             <p className="text-xs text-slate-400 mt-1">
//               PNG, JPG, WEBP, or SVG
//             </p>
//             <input
//               type="file"
//               ref={fileInputRef}
//               onChange={onFileInputChange}
//               accept="image/*"
//               multiple
//               className="hidden"
//             />
//           </div>

//           {uploadSuccess && (
//             <div className="mt-4 flex items-center justify-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 py-2.5 rounded-lg border border-emerald-200">
//               <CheckCircle2 size={16} /> Photos successfully added to gallery!
//             </div>
//           )}
//         </section>

//         {/* Gallery Display Sections (Only rendered when populated) */}
//         {activeSections.length === 0 ? (
//           <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center flex flex-col items-center justify-center text-slate-400 shadow-xs">
//             <FolderOpen size={48} className="text-slate-300 mb-3 stroke-[1.5]" />
//             <h3 className="text-sm font-semibold text-slate-600">No photos in the gallery yet</h3>
//             <p className="text-xs text-slate-400 mt-1 max-w-sm">
//               Upload photos above to create categories and display your media library.
//             </p>
//           </div>
//         ) : (
//           <div className="space-y-10">
//             {activeSections.map((section) => {
//               const Icon = section.icon;
//               return (
//                 <section key={section.id} id={section.id}>
//                   <div className="flex items-center justify-between mb-4 border-b border-slate-200 pb-3">
//                     <div className="flex items-center gap-2.5">
//                       <div className="bg-indigo-100 p-2 rounded-lg text-indigo-700">
//                         <Icon size={18} />
//                       </div>
//                       <h2 className="text-lg font-bold text-slate-800">
//                         {section.title}
//                       </h2>
//                     </div>
//                     <span className="text-xs font-semibold bg-slate-100 text-slate-500 px-2.5 py-1 rounded-full">
//                       {section.items.length} {section.items.length === 1 ? 'item' : 'items'}
//                     </span>
//                   </div>

//                   <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
//                     {section.items.map((item) => (
//                       <div
//                         key={item.id}
//                         onClick={() => setSelectedItem(item)}
//                         className="group relative flex flex-col bg-white rounded-xl shadow-xs border border-slate-200 p-2 transition-all duration-200 hover:shadow-md hover:border-indigo-300 cursor-pointer"
//                       >
//                         <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg bg-slate-100">
//                           <Image
//                             src={item.url}
//                             alt={item.name}
//                             fill
//                             sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
//                             unoptimized
//                             className="object-cover transition-transform duration-300 group-hover:scale-105"
//                           />

//                           <button
//                             onClick={(e) => removeItem(item.id, e)}
//                             title="Remove photo"
//                             className="absolute top-2 right-2 p-1.5 bg-rose-600 text-white rounded-md shadow-md opacity-0 group-hover:opacity-100 hover:bg-rose-700 transition-opacity z-10"
//                           >
//                             <Trash2 size={13} />
//                           </button>
//                         </div>

//                         <div className="mt-2 px-1 text-center">
//                           <p className="text-[11px] font-semibold text-slate-700 truncate" title={item.name}>
//                             {item.name}
//                           </p>
//                           <p className="text-[10px] text-slate-400 mt-0.5">{item.size}</p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </section>
//               );
//             })}
//           </div>
//         )}
//       </main>

//       {/* Lightbox Modal */}
//       {selectedItem && (
//         <div
//           className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-xs p-4 sm:p-8"
//           role="dialog"
//           aria-modal="true"
//           onClick={() => setSelectedItem(null)}
//         >
//           <button
//             onClick={() => setSelectedItem(null)}
//             className="absolute top-5 right-5 p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-50"
//             aria-label="Close dialog"
//           >
//             <X size={20} />
//           </button>

//           <div
//             className="relative w-full max-w-5xl flex flex-col items-center"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="relative w-full h-[70vh] mb-4">
//               <Image
//                 src={selectedItem.url}
//                 alt={selectedItem.name}
//                 fill
//                 unoptimized
//                 priority
//                 className="object-contain rounded-lg shadow-2xl"
//               />
//             </div>

//             <div className="w-full max-w-2xl bg-slate-900 border border-white/10 rounded-xl p-3.5 flex items-center justify-between text-white text-xs">
//               <span className="font-semibold truncate pr-4">{selectedItem.name}</span>
//               <span className="text-slate-400 font-mono">{selectedItem.size}</span>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import {
  X,
  UploadCloud,
  Trash2,
  FolderPlus,
  CheckCircle2,
  FolderOpen,
  Eye,
  ImageIcon,
  AlertCircle
} from "lucide-react";
import {
  GALLERY_CATEGORIES,
  INITIAL_GALLERY_DATA,
  GALLERY_STORAGE_KEY,
  GalleryItem,
  GalleryCategory,
  compressImageToBase64
} from "@/lib/galleryData";

export default function AdminGalleryUploader() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [targetCategory, setTargetCategory] = useState<GalleryCategory>("Sliders");
  const [customTitle, setCustomTitle] = useState<string>("");
  const [customDescription, setCustomDescription] = useState<string>("");
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load from local storage
  const loadData = () => {
    const stored = localStorage.getItem(GALLERY_STORAGE_KEY);
    if (stored) {
      try {
        setItems(JSON.parse(stored));
      } catch {
        setItems(INITIAL_GALLERY_DATA);
      }
    } else {
      setItems(INITIAL_GALLERY_DATA);
      localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(INITIAL_GALLERY_DATA));
    }
  };

  useEffect(() => {
    setIsMounted(true);
    loadData();

    const handleStorage = () => loadData();
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const saveItems = (updated: GalleryItem[]) => {
    try {
      localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(updated));
      setItems(updated);
      setErrorMessage("");
      // Trigger update event
      window.dispatchEvent(new Event("storage"));
    } catch {
      setErrorMessage("Storage limit reached. Try removing older images or uploading smaller files.");
    }
  };

  const processFiles = async (files: FileList | File[]) => {
    setErrorMessage("");
    const fileArray = Array.from(files).filter((f) => f.type.startsWith("image/"));
    if (fileArray.length === 0) return;

    try {
      const newItems: GalleryItem[] = await Promise.all(
        fileArray.map(async (file, index) => {
          // Compress image to ~50-80KB to fit localStorage limits
          const compressedBase64 = await compressImageToBase64(file);
          const nameWithoutExt = file.name.replace(/\.[^/.]+$/, "");
          
          return {
            id: `img_${Date.now()}_${Math.random().toString(36).substring(2, 7)}_${index}`,
            title: customTitle.trim()
              ? fileArray.length > 1
                ? `${customTitle} (${index + 1})`
                : customTitle
              : nameWithoutExt,
            description: customDescription.trim() || "Uploaded via Admin repository.",
            src: compressedBase64,
            category: targetCategory,
            size: `${(compressedBase64.length / 1024).toFixed(1)} KB (Compressed)`,
            date: new Date().toLocaleDateString()
          };
        })
      );

      const updatedList = [...newItems, ...items];
      saveItems(updatedList);

      setCustomTitle("");
      setCustomDescription("");
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3500);
    } catch {
      setErrorMessage("Failed to process and compress image. Please try another file.");
    }
  };

  const removeItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = items.filter((item) => item.id !== id);
    saveItems(updated);
    if (selectedItem?.id === id) setSelectedItem(null);
  };

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setSelectedItem(null);
  }, []);

  useEffect(() => {
    if (selectedItem) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [selectedItem, handleKeyDown]);

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-24">
      {/* Header */}
      <header className="bg-indigo-950 text-white py-10 px-4 sm:px-6 lg:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-block px-3 py-0.5 mb-2 rounded-full bg-indigo-900 text-indigo-300 text-xs font-semibold tracking-wide border border-indigo-700/50">
              Admin Portal
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Media Gallery Uploader
            </h1>
            <p className="text-xs text-indigo-200 mt-1">
              Photos uploaded here sync immediately with the public Photo Gallery.
            </p>
          </div>

          <div className="bg-indigo-900/40 border border-indigo-800 px-4 py-2 rounded-xl flex items-center gap-3 text-xs self-start sm:self-auto">
            <span className="text-indigo-300 uppercase tracking-wider font-semibold text-[10px]">
              Total Photos:
            </span>
            <span className="text-base font-bold text-white">{items.length}</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Upload Form Box */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-indigo-50 text-indigo-700 rounded-xl">
                <FolderPlus size={22} />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-800">Upload Photos</h2>
                <p className="text-xs text-slate-500 mt-0.5">Select a category and upload</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <label htmlFor="category-select" className="text-xs font-semibold text-slate-600 whitespace-nowrap">
                Upload Target:
              </label>
              <select
                id="category-select"
                value={targetCategory}
                onChange={(e) => setTargetCategory(e.target.value as GalleryCategory)}
                className="bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {GALLERY_CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Title & Description Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div>
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Photo Title (Optional)
              </label>
              <input
                type="text"
                placeholder="Leave blank to use file name"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Description / Caption (Optional)
              </label>
              <input
                type="text"
                placeholder="Brief summary for the gallery lightbox"
                value={customDescription}
                onChange={(e) => setCustomDescription(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Drag & Drop Surface */}
          <div
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              if (e.dataTransfer.files?.length) processFiles(e.dataTransfer.files);
            }}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onClick={() => fileInputRef.current?.click()}
            className={`mt-6 border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center ${
              isDragging
                ? "border-indigo-600 bg-indigo-50/50"
                : "border-slate-200 hover:border-indigo-400 hover:bg-slate-50/60"
            }`}
          >
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-full mb-3">
              <UploadCloud size={28} />
            </div>
            <p className="text-sm font-semibold text-slate-700">
              Click to browse or drag and drop photos here
            </p>
            <p className="text-xs text-slate-400 mt-1">PNG, JPG, WEBP, or SVG (Auto-compressed for local storage)</p>
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => {
                if (e.target.files?.length) {
                  processFiles(e.target.files);
                  e.target.value = "";
                }
              }}
              accept="image/*"
              multiple
              className="hidden"
            />
          </div>

          {uploadSuccess && (
            <div className="mt-4 flex items-center justify-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 py-2.5 rounded-lg border border-emerald-200">
              <CheckCircle2 size={16} /> Photos successfully added to {targetCategory}!
            </div>
          )}

          {errorMessage && (
            <div className="mt-4 flex items-center justify-center gap-2 text-xs font-semibold text-rose-700 bg-rose-50 py-2.5 rounded-lg border border-rose-200">
              <AlertCircle size={16} /> {errorMessage}
            </div>
          )}
        </section>

        {/* Display Grouped Category Previews */}
        {items.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center flex flex-col items-center justify-center text-slate-400 shadow-xs">
            <FolderOpen size={48} className="text-slate-300 mb-3 stroke-[1.5]" />
            <h3 className="text-sm font-semibold text-slate-600">No photos uploaded yet</h3>
          </div>
        ) : (
          <div className="space-y-10">
            {GALLERY_CATEGORIES.map((cat) => {
              const categoryItems = items.filter((i) => i.category === cat.id);
              if (categoryItems.length === 0) return null;

              return (
                <section key={cat.id} id={cat.id}>
                  <div className="flex items-center justify-between mb-4 border-b border-slate-200 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="bg-indigo-100 p-2 rounded-lg text-indigo-700">
                        <ImageIcon size={18} />
                      </div>
                      <h2 className="text-lg font-bold text-slate-800">{cat.label}</h2>
                    </div>
                    <span className="text-xs font-semibold bg-slate-100 text-slate-500 px-2.5 py-1 rounded-full">
                      {categoryItems.length} {categoryItems.length === 1 ? "item" : "items"}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
                    {categoryItems.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => setSelectedItem(item)}
                        className="group relative flex flex-col bg-white rounded-xl shadow-xs border border-slate-200 p-2 transition-all duration-200 hover:shadow-md hover:border-indigo-300 cursor-pointer"
                      >
                        <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg bg-slate-100">
                          <Image
                            src={item.src}
                            alt={item.title}
                            fill
                            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
                            unoptimized
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />

                          <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <button
                              onClick={(e) => { e.stopPropagation(); setSelectedItem(item); }}
                              title="Preview"
                              className="p-1.5 bg-white text-slate-800 rounded-md shadow-md hover:text-indigo-600 transition-colors"
                            >
                              <Eye size={14} />
                            </button>
                            <button
                              onClick={(e) => removeItem(item.id, e)}
                              title="Remove photo"
                              className="p-1.5 bg-rose-600 text-white rounded-md shadow-md hover:bg-rose-700 transition-colors"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>

                        <div className="mt-2 px-1 text-center">
                          <p className="text-[11px] font-semibold text-slate-700 truncate" title={item.title}>
                            {item.title}
                          </p>
                          <p className="text-[10px] text-slate-400 mt-0.5">{item.size || "Local"}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </main>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-xs p-4 sm:p-8"
          role="dialog"
          onClick={() => setSelectedItem(null)}
        >
          <button
            onClick={() => setSelectedItem(null)}
            className="absolute top-5 right-5 p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-50"
          >
            <X size={20} />
          </button>

          <div
            className="relative w-full max-w-5xl flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-[70vh] mb-4">
              <Image
                src={selectedItem.src}
                alt={selectedItem.title}
                fill
                unoptimized
                priority
                className="object-contain rounded-lg shadow-2xl"
              />
            </div>

            <div className="w-full max-w-2xl bg-slate-900 border border-white/10 rounded-xl p-3.5 flex flex-col gap-1 text-white text-xs">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm truncate pr-4">{selectedItem.title}</span>
                <span className="text-slate-400 font-mono">{selectedItem.category}</span>
              </div>
              <p className="text-slate-300 text-[11px]">{selectedItem.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}