'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import Image from 'next/image';
import { Save, Trash2, UploadCloud, X, Image as ImageIcon, CheckSquare, Maximize2 } from 'lucide-react';

// Define shapes for our data structures
interface GalleryImage {
  id: string;
  url: string;
  name: string;
}

// Mock data to simulate existing images when a folder is selected
const MOCK_GALLERY_IMAGES: Record<string, GalleryImage[]> = {
  '1': [
    { id: 'img-101', url: 'https://images.unsplash.com/photo-1506744626753-1fa44df14c28?auto=format&fit=crop&w=400&q=80', name: 'mountain_slider.jpg' },
    { id: 'img-102', url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=400&q=80', name: 'foggy_morning.jpg' },
  ],
  '2': [
    { id: 'img-201', url: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=400&q=80', name: 'client_meeting.jpg' },
  ],
  '3': [
    { id: 'img-301', url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80', name: 'team_collab.jpg' },
    { id: 'img-302', url: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=400&q=80', name: 'office_space.jpg' },
    { id: 'img-303', url: 'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&w=400&q=80', name: 'carousel_3.jpg' },
  ],
};

export default function AddGallery() {
  // Form State
  const [folderId, setFolderId] = useState<string>('');
  const [newFolderName, setNewFolderName] = useState<string>('');
  const [files, setFiles] = useState<FileList | null>(null);

  // Gallery Viewer State
  const [existingImages, setExistingImages] = useState<GalleryImage[]>([]);
  const [selectedImageIds, setSelectedImageIds] = useState<Set<string>>(new Set());
  
  // UI / Modal State
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Handlers
  const handleFolderChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setFolderId(val);
    setNewFolderName('');
    setSelectedImageIds(new Set()); // Reset selections
    
    if (val && val !== '-1' && MOCK_GALLERY_IMAGES[val]) {
      setExistingImages(MOCK_GALLERY_IMAGES[val]);
    } else {
      setExistingImages([]);
    }
  };

  const handleDeleteFolder = () => {
    if (window.confirm("Are you sure you want to remove this Gallery?")) {
      console.log("Deleted Gallery ID:", folderId);
      setFolderId('');
      setExistingImages([]);
    }
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!folderId) {
      alert("Please select a Folder.");
      return;
    }

    if (folderId === '-1' && !newFolderName.trim()) {
      alert("Please enter a name for the new gallery.");
      return;
    }

    setIsUploading(true);

    const formData = new FormData();
    formData.append('folderId', folderId);
    if (folderId === '-1') formData.append('folderName', newFolderName);
    
    if (files) {
      Array.from(files).forEach((file, index) => {
        formData.append(`file_${index}`, file);
      });
    }

    console.log("Saving Gallery Data...");
    // FIXED: Enforced const assignment parameters across keys and values iteration
    for (const [key, value] of Array.from(formData.entries())) {
      console.log(`${key}:`, value instanceof File ? value.name : value);
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Upload Complete!");
      setFiles(null);
      const fileInput = document.getElementById('txt_Images') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    } catch (error) {
      console.error("Failed to upload", error);
    } finally {
      setIsUploading(false);
    }
  };

  const toggleImageSelection = (id: string) => {
    setSelectedImageIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleDeleteSelectedImages = () => {
    if (selectedImageIds.size === 0) {
      alert("Please Select At least One Image To Delete");
      return;
    }

    if (window.confirm(`Are you sure you want to delete ${selectedImageIds.size} selected image(s)?`)) {
      console.log("Deleting images:", Array.from(selectedImageIds));
      setExistingImages(prev => prev.filter(img => !selectedImageIds.has(img.id)));
      setSelectedImageIds(new Set());
    }
  };

  const deleteSingleImage = (id: string) => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      console.log("Deleting image:", id);
      setExistingImages(prev => prev.filter(img => img.id !== id));
      setSelectedImageIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  return (
    <div className="w-full p-4 font-sans text-gray-800">
      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden relative">
        
        {/* Card Header */}
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <h5 className="text-lg font-semibold m-0 text-[#0b918c]">Add Gallery</h5>
        </div>

        {/* Card Body */}
        <div className="p-6">
          <form onSubmit={handleSave}>
            
            {/* Row 1: Folders Selection */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start mb-6">
              
              {/* Folders Dropdown */}
              <div className="md:col-span-3 flex flex-col">
                <label className="text-sm font-medium text-gray-600 mb-1.5">Folders</label>
                <div className="flex gap-2">
                  <select
                    value={folderId}
                    onChange={handleFolderChange}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0b918c] focus:border-[#0b918c] transition-colors bg-white"
                  >
                    <option value="">Select</option>
                    <option value="1">Sliders</option>
                    <option value="2">clients</option>
                    <option value="3">Corosials</option>
                    <option value="4">Types of files</option>
                    <option value="-1" className="font-semibold text-[#0b918c]">Add New Gallery</option>
                  </select>
                  {folderId && folderId !== '-1' && (
                    <button
                      type="button"
                      onClick={handleDeleteFolder}
                      className="p-2 bg-red-50 text-red-600 border border-red-200 rounded-md hover:bg-red-100 transition-colors"
                      title="Remove this Gallery"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </div>

              {/* Conditional Gallery Name Input */}
              {folderId === '-1' && (
                <div className="md:col-span-3 flex flex-col">
                  <label className="text-sm font-medium text-gray-600 mb-1.5">Gallery Name</label>
                  <input
                    type="text"
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                    placeholder="Enter new gallery name"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0b918c] focus:border-[#0b918c] transition-colors"
                    required
                  />
                </div>
              )}
            </div>

            {/* Row 2: File Upload */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end mb-8">
              <div className="md:col-span-6 flex flex-col">
                <label className="text-sm font-medium text-gray-600 mb-1.5">Images (Multiple)</label>
                <div className="relative">
                  <input
                    id="txt_Images"
                    type="file"
                    multiple
                    accept="image/png, image/gif, image/jpeg"
                    onChange={(e) => setFiles(e.target.files)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#0b918c]/10 file:text-[#0b918c] hover:file:bg-[#0b918c]/20 focus:outline-none focus:ring-1 focus:ring-[#0b918c] transition-colors bg-white cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-center mb-8 pb-8 border-b border-gray-100">
              <button
                type="submit"
                disabled={isUploading}
                className="inline-flex items-center justify-center px-8 py-2.5 text-sm font-medium rounded-md text-white bg-gradient-to-r from-[#0b918c] to-[#087874] hover:from-[#087874] hover:to-[#065b58] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0b918c] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed shadow-sm"
              >
                <Save size={16} className="mr-2" />
                Save Gallery Images
              </button>
            </div>
          </form>

          {/* Existing Images Gallery Viewer */}
          {folderId && folderId !== '-1' && (
            <div className="w-full">
              <div className="flex justify-between items-center mb-4">
                <h6 className="text-md font-semibold text-gray-700 flex items-center">
                  <ImageIcon size={18} className="mr-2 text-[#0b918c]" />
                  Images in selected gallery
                </h6>
                {existingImages.length > 0 && (
                  <button
                    type="button"
                    onClick={handleDeleteSelectedImages}
                    disabled={selectedImageIds.size === 0}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-md hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Trash2 size={16} className="mr-2" />
                    Delete Selected ({selectedImageIds.size})
                  </button>
                )}
              </div>

              {existingImages.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                  <ImageIcon size={32} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">No images found in this gallery folder.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {existingImages.map((image) => {
                    const isSelected = selectedImageIds.has(image.id);
                    return (
                      <div 
                        key={image.id} 
                        className={`relative group rounded-lg overflow-hidden border-2 transition-all duration-200 ${isSelected ? 'border-[#0b918c] ring-2 ring-[#0b918c]/30' : 'border-gray-200 hover:border-gray-300'}`}
                      >
                        {/* Image Container using optimized Next.js layout mechanics */}
                        <div className="aspect-square bg-gray-100 overflow-hidden relative cursor-pointer" onClick={() => toggleImageSelection(image.id)}>
                          <Image 
                            src={image.url} 
                            alt={image.name}
                            fill
                            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                            unoptimized
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className={`absolute inset-0 bg-[#0b918c]/20 transition-opacity duration-200 ${isSelected ? 'opacity-100' : 'opacity-0'}`}></div>
                        </div>

                        {/* Top Action Bar */}
                        <div className="absolute top-2 right-2 flex gap-1.5 z-10">
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); setPreviewImage(image.url); }}
                            className="p-1.5 bg-white/90 backdrop-blur-sm text-gray-700 rounded shadow hover:bg-white hover:text-[#0b918c] transition-colors"
                            title="Preview Image"
                          >
                            <Maximize2 size={14} />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); deleteSingleImage(image.id); }}
                            className="p-1.5 bg-white/90 backdrop-blur-sm text-red-600 rounded shadow hover:bg-red-50 transition-colors"
                            title="Delete Image"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>

                        {/* Checkbox Overlay toggle icon layout */}
                        <div className="absolute top-2 left-2 z-10">
                          <div 
                            className={`w-6 h-6 rounded flex items-center justify-center cursor-pointer shadow backdrop-blur-sm transition-colors ${isSelected ? 'bg-[#0b918c] text-white' : 'bg-white/90 text-gray-300 hover:text-gray-400'}`}
                            onClick={(e) => { e.stopPropagation(); toggleImageSelection(image.id); }}
                          >
                            <CheckSquare size={16} className={isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} />
                          </div>
                        </div>

                        {/* Image Label text footer segment */}
                        <div className="p-2 bg-white text-xs text-gray-600 truncate border-t border-gray-100" title={image.name}>
                          {image.name}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Uploading Modal Overlay Context Section */}
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
                  Please wait till the files upload...
                </p>
                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-6 overflow-hidden">
                  <div className="bg-[#0b918c] h-1.5 rounded-full animate-pulse w-full"></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Full View Screen Overlay Preview Panel Block */}
        {previewImage && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-gray-900/90 backdrop-blur-md p-4">
            <div className="relative max-w-5xl w-full flex flex-col items-center animate-in fade-in zoom-in duration-200">
              <button 
                onClick={() => setPreviewImage(null)}
                className="absolute -top-12 right-0 p-2 text-white/70 hover:text-white transition-colors"
              >
                <X size={32} />
              </button>
              <div className="relative w-full h-[80vh]">
                <Image 
                  src={previewImage} 
                  alt="Preview Image Window Frame" 
                  fill
                  unoptimized
                  priority
                  className="object-contain rounded-md"
                />
              </div>
              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => setPreviewImage(null)}
                  className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-sm transition-colors border border-white/20"
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}