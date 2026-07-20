// "use client";

// import React, { useState, useEffect, useCallback } from 'react';
// import { X, Image as ImageIcon, Users, MonitorPlay, FileText } from 'lucide-react';

// // --- Types ---
// type GalleryItem = {
//   id: string;
//   originalSrc: string;
//   displaySrc: string;
//   alt: string;
// };

// type GallerySection = {
//   title: string;
//   items: GalleryItem[];
//   icon: React.ElementType;
// };

// // --- Mock Data mapped from original HTML ---
// const galleryData: GallerySection[] = [
//   {
//     title: 'Sliders',
//     icon: ImageIcon,
//     items: [
//       { id: 'b1', originalSrc: '20210602164002845b1.jpg', displaySrc: 'https://picsum.photos/seed/slider1/800/600', alt: 'Slider image 1 showing landscape' },
//       { id: 'b2', originalSrc: '20210602164002845b2.jpg', displaySrc: 'https://picsum.photos/seed/slider2/800/600', alt: 'Slider image 2 showing city' },
//       { id: 'b3', originalSrc: '20210602164002845b3.jpg', displaySrc: 'https://picsum.photos/seed/slider3/800/600', alt: 'Slider image 3 showing nature' },
//       { id: 'b5', originalSrc: '20210602164002845b5.jpg', displaySrc: 'https://picsum.photos/seed/slider4/800/600', alt: 'Slider image 4 showing architecture' },
//     ],
//   },
//   {
//     title: 'Clients',
//     icon: Users,
//     items: Array.from({ length: 9 }).map((_, i) => ({
//       id: `logo_${i + 1}`,
//       originalSrc: `logo_${i + 1}.png`,
//       displaySrc: `https://ui-avatars.com/api/?name=Client+${i + 1}&background=f8fafc&color=1e3a8a&size=200&font-size=0.33&bold=true`,
//       alt: `Client ${i + 1} Company Logo`,
//     })),
//   },
//   {
//     title: 'Corosials',
//     icon: MonitorPlay,
//     items: [
//       { id: 's1', originalSrc: 's1.jpg', displaySrc: 'https://picsum.photos/seed/coro1/800/600', alt: 'Corosial presentation 1' },
//       { id: 's2', originalSrc: 's2.jpg', displaySrc: 'https://picsum.photos/seed/coro2/800/600', alt: 'Corosial presentation 2' },
//       { id: 's3', originalSrc: 's3.jpg', displaySrc: 'https://picsum.photos/seed/coro3/800/600', alt: 'Corosial presentation 3' },
//       { id: 'cb1', originalSrc: 'b1.jpg', displaySrc: 'https://picsum.photos/seed/coro4/800/600', alt: 'Corosial presentation 4' },
//     ],
//   },
//   {
//     title: 'Types of files',
//     icon: FileText,
//     items: ['CSV', 'DOC', 'DOCX', 'EXE', 'FOLDER', 'JPG', 'MAP', 'MP3', 'MP4', 'PDF', 'PNG', 'PPT'].map((type) => ({
//       id: type.toLowerCase(),
//       originalSrc: `${type.toLowerCase()}.png`,
//       displaySrc: `https://ui-avatars.com/api/?name=${type}&background=e0e7ff&color=312e81&size=150&font-size=0.35&bold=true&rounded=true`,
//       alt: `${type} file format icon`,
//     })),
//   },
// ];

// export default function App() {
//   const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

//   // GIGW Accessibility requirement: Close modal on Escape key
//   const handleKeyDown = useCallback((e: KeyboardEvent) => {
//     if (e.key === 'Escape') {
//       setSelectedImage(null);
//     }
//   }, []);

//   useEffect(() => {
//     if (selectedImage) {
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
//   }, [selectedImage, handleKeyDown]);

//   const closeModal = () => setSelectedImage(null);

//   return (
//     <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-300 selection:text-indigo-900">
      
//       {/* Redesigned Hero Header */}
//       <header className="bg-indigo-900 text-white py-16 px-4 sm:px-6 lg:px-8 shadow-lg relative overflow-hidden">
//         {/* Subtle background pattern */}
//         <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
//         <div className="max-w-7xl mx-auto relative z-10">
//           <div className="inline-block px-3 py-1 mb-4 rounded-full bg-indigo-800 text-indigo-200 text-sm font-semibold tracking-wide border border-indigo-700">
//             Official Portal
//           </div>
//           <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight" id="gallery-heading">
//             Media Gallery
//           </h1>
//           <p className="mt-4 text-indigo-200 max-w-2xl text-base md:text-lg">
//             Explore our curated repository of operational sliders, partnered client identities, and accessible digital assets.
//           </p>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" aria-labelledby="gallery-heading">
//         {galleryData.map((section) => {
//           const Icon = section.icon;
//           return (
//             <section key={section.title} className="mb-20">
              
//               {/* Redesigned Section Headers */}
//               <div className="flex items-center mb-8 border-b-2 border-indigo-100 pb-4">
//                 <div className="bg-indigo-100 p-2.5 rounded-lg mr-4">
//                   <Icon className="w-6 h-6 text-indigo-700" aria-hidden="true" />
//                 </div>
//                 <h2 className="text-2xl md:text-3xl font-bold text-slate-800 capitalize tracking-tight">
//                   {section.title}
//                 </h2>
//               </div>

//               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 md:gap-8">
//                 {section.items.map((item) => (
//                   <button
//                     key={item.id}
//                     onClick={() => setSelectedImage(item)}
//                     className="group relative flex flex-col items-center justify-center bg-white rounded-xl shadow-sm border border-slate-200 p-3 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-indigo-400 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-500/50 focus-visible:border-indigo-500 focus-visible:translate-y-0"
//                     aria-label={`View larger image of ${item.alt}`}
//                   >
//                     <div className="w-full aspect-[4/3] overflow-hidden rounded-lg bg-slate-100 flex items-center justify-center">
//                       <img
//                         src={item.displaySrc}
//                         alt={item.alt}
//                         className="max-w-full max-h-full object-cover transition-transform duration-500 group-hover:scale-110"
//                         loading="lazy"
//                       />
//                     </div>
//                     {/* File type label */}
//                     {section.title === 'Types of files' && (
//                       <span className="mt-4 px-3 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded-full uppercase tracking-wider group-hover:bg-indigo-50 group-hover:text-indigo-700 transition-colors">
//                         {item.id}
//                       </span>
//                     )}
//                   </button>
//                 ))}
//               </div>
//             </section>
//           );
//         })}
//       </main>

//       {/* Redesigned Immersive Dark Modal */}
//       {selectedImage && (
//         <div
//           className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 backdrop-blur-md p-4 sm:p-8"
//           role="dialog"
//           aria-modal="true"
//           aria-labelledby="modal-title"
//           onClick={closeModal}
//         >
//           {/* Floating Close Button */}
//           <button
//             onClick={closeModal}
//             className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-sm transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-400 z-50"
//             aria-label="Close image dialog"
//             autoFocus
//           >
//             <X className="w-6 h-6" />
//           </button>

//           <div
//             className="relative w-full max-w-6xl flex flex-col items-center justify-center animate-in fade-in zoom-in duration-200"
//             onClick={(e) => e.stopPropagation()} 
//           >
//             <div className="w-full flex-1 flex items-center justify-center overflow-hidden mb-6">
//               <img
//                 src={selectedImage.displaySrc}
//                 alt={`Enlarged view of ${selectedImage.alt}`}
//                 className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl ring-1 ring-white/10"
//               />
//             </div>
            
//             {/* Modal Info Footer */}
//             <div className="w-full max-w-3xl bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
//               <h3 id="modal-title" className="text-white font-medium text-lg truncate flex-1 text-center sm:text-left">
//                 {selectedImage.alt}
//               </h3>
//               <div className="text-sm text-slate-400 flex items-center bg-slate-950 px-3 py-1.5 rounded-lg border border-white/5">
//                 <span className="mr-2">File:</span>
//                 <code className="text-indigo-300 select-all">{selectedImage.originalSrc}</code>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { X, Image as ImageIcon, Users, MonitorPlay, FileText } from 'lucide-react';

// --- Types ---
type GalleryItem = {
  id: string;
  originalSrc: string;
  displaySrc: string;
  alt: string;
};

type GallerySection = {
  title: string;
  items: GalleryItem[];
  icon: React.ElementType;
};

// --- Mock Data mapped from original HTML ---
const galleryData: GallerySection[] = [
  {
    title: 'Sliders',
    icon: ImageIcon,
    items: [
      { id: 'b1', originalSrc: '20210602164002845b1.jpg', displaySrc: 'https://picsum.photos/seed/slider1/800/600', alt: 'Slider image 1 showing landscape' },
      { id: 'b2', originalSrc: '20210602164002845b2.jpg', displaySrc: 'https://picsum.photos/seed/slider2/800/600', alt: 'Slider image 2 showing city' },
      { id: 'b3', originalSrc: '20210602164002845b3.jpg', displaySrc: 'https://picsum.photos/seed/slider3/800/600', alt: 'Slider image 3 showing nature' },
      { id: 'b5', originalSrc: '20210602164002845b5.jpg', displaySrc: 'https://picsum.photos/seed/slider4/800/600', alt: 'Slider image 4 showing architecture' },
    ],
  },
  {
    title: 'Clients',
    icon: Users,
    items: Array.from({ length: 9 }).map((_, i) => ({
      id: `logo_${i + 1}`,
      originalSrc: `logo_${i + 1}.png`,
      displaySrc: `https://ui-avatars.com/api/?name=Client+${i + 1}&background=f8fafc&color=1e3a8a&size=200&font-size=0.33&bold=true`,
      alt: `Client ${i + 1} Company Logo`,
    })),
  },
  {
    title: 'Corosials',
    icon: MonitorPlay,
    items: [
      { id: 's1', originalSrc: 's1.jpg', displaySrc: 'https://picsum.photos/seed/coro1/800/600', alt: 'Corosial presentation 1' },
      { id: 's2', originalSrc: 's2.jpg', displaySrc: 'https://picsum.photos/seed/coro2/800/600', alt: 'Corosial presentation 2' },
      { id: 's3', originalSrc: 's3.jpg', displaySrc: 'https://picsum.photos/seed/coro3/800/600', alt: 'Corosial presentation 3' },
      { id: 'cb1', originalSrc: 'b1.jpg', displaySrc: 'https://picsum.photos/seed/coro4/800/600', alt: 'Corosial presentation 4' },
    ],
  },
  {
    title: 'Types of files',
    icon: FileText,
    items: ['CSV', 'DOC', 'DOCX', 'EXE', 'FOLDER', 'JPG', 'MAP', 'MP3', 'MP4', 'PDF', 'PNG', 'PPT'].map((type) => ({
      id: type.toLowerCase(),
      originalSrc: `${type.toLowerCase()}.png`,
      displaySrc: `https://ui-avatars.com/api/?name=${type}&background=e0e7ff&color=312e81&size=150&font-size=0.35&bold=true&rounded=true`,
      alt: `${type} file format icon`,
    })),
  },
];

export default function App() {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  // GIGW Accessibility requirement: Close modal on Escape key
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setSelectedImage(null);
    }
  }, []);

  useEffect(() => {
    if (selectedImage) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage, handleKeyDown]);

  const closeModal = () => setSelectedImage(null);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-300 selection:text-indigo-900">
      
      {/* Redesigned Hero Header */}
      <header className="bg-indigo-900 text-white py-16 px-4 sm:px-6 lg:px-8 shadow-lg relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-block px-3 py-1 mb-4 rounded-full bg-indigo-800 text-indigo-200 text-sm font-semibold tracking-wide border border-indigo-700">
            Official Portal
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight" id="gallery-heading">
            Media Gallery
          </h1>
          <p className="mt-4 text-indigo-200 max-w-2xl text-base md:text-lg">
            Explore our curated repository of operational sliders, partnered client identities, and accessible digital assets.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" aria-labelledby="gallery-heading">
        {galleryData.map((section) => {
          const Icon = section.icon;
          return (
            <section key={section.title} className="mb-20">
              
              {/* Redesigned Section Headers */}
              <div className="flex items-center mb-8 border-b-2 border-indigo-100 pb-4">
                <div className="bg-indigo-100 p-2.5 rounded-lg mr-4">
                  <Icon className="w-6 h-6 text-indigo-700" aria-hidden="true" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 capitalize tracking-tight">
                  {section.title}
                </h2>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 md:gap-8">
                {section.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedImage(item)}
                    className="w-full group relative flex flex-col items-center justify-center bg-white rounded-xl shadow-sm border border-slate-200 p-3 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-indigo-400 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-500/50 focus-visible:border-indigo-500 focus-visible:translate-y-0"
                    aria-label={`View larger image of ${item.alt}`}
                  >
                    {/* Relative container wrapper added to solve Next Image layout specs */}
                    <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg bg-slate-100">
                      <Image
                        src={item.displaySrc}
                        alt={item.alt}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                        unoptimized
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    {/* File type label */}
                    {section.title === 'Types of files' && (
                      <span className="mt-4 px-3 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded-full uppercase tracking-wider group-hover:bg-indigo-50 group-hover:text-indigo-700 transition-colors">
                        {item.id}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </section>
          );
        })}
      </main>

      {/* Redesigned Immersive Dark Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 backdrop-blur-md p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          onClick={closeModal}
        >
          {/* Floating Close Button */}
          <button
            onClick={closeModal}
            className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-sm transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-400 z-50"
            aria-label="Close image dialog"
            autoFocus
          >
            <X className="w-6 h-6" />
          </button>

          <div
            className="relative w-full max-w-6xl flex flex-col items-center justify-center animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()} 
          >
            {/* Box wrapper optimization to hold exact fluid dimensions correctly */}
            <div className="relative w-full h-[75vh] mb-6">
              <Image
                src={selectedImage.displaySrc}
                alt={`Enlarged view of ${selectedImage.alt}`}
                fill
                unoptimized
                priority
                className="object-contain rounded-lg shadow-2xl ring-1 ring-white/10"
              />
            </div>
            
            {/* Modal Info Footer */}
            <div className="w-full max-w-3xl bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <h3 id="modal-title" className="text-white font-medium text-lg truncate flex-1 text-center sm:text-left">
                {selectedImage.alt}
              </h3>
              <div className="text-sm text-slate-400 flex items-center bg-slate-950 px-3 py-1.5 rounded-lg border border-white/5">
                <span className="mr-2">File:</span>
                <code className="text-indigo-300 select-all">{selectedImage.originalSrc}</code>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}