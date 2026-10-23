// lib/galleryData.ts
export type GalleryCategory =
  | "Facilities"
  | "Care & Recovery"
  | "Training"
  | "Community Outreach"
  | "Sliders"
  | "Clients";

export interface GalleryItem {
  id: string;
  src: string;
  category: GalleryCategory;
  title: string;
  description: string;
  size?: string;
  date?: string;
}

export const GALLERY_CATEGORIES: { id: GalleryCategory; label: string }[] = [
  { id: "Facilities", label: "Facilities" },
  { id: "Care & Recovery", label: "Care & Recovery" },
  { id: "Training", label: "Training" },
  { id: "Community Outreach", label: "Community Outreach" },
  { id: "Sliders", label: "Sliders" },
  { id: "Clients", label: "Clients" }
];

export const INITIAL_GALLERY_DATA: GalleryItem[] = [
  {
    id: "1",
    src: "/b4.jpg",
    category: "Care & Recovery",
    title: "Daily Nutritional Assessment",
    description: "Medical officer tracking the daily weight gain of an admitted child."
  },
  {
    id: "2",
    src: "/b1.jpg",
    category: "Facilities",
    title: "MTC Ward Overview",
    description: "Clean, sanitized beds prepared for incoming severe acute malnutrition patients."
  },
  {
    id: "3",
    src: "/director.jpg",
    category: "Training",
    title: "State Level Workshop",
    description: "Capacity building training for medical officers and MTC staff."
  },
  {
    id: "4",
    src: "/b4.jpg",
    category: "Community Outreach",
    title: "Sahiya Field Visit",
    description: "ASHA workers identifying children in the community for referral."
  },
  {
    id: "5",
    src: "/b1.jpg",
    category: "Care & Recovery",
    title: "Therapeutic Feeding",
    description: "Administering F-75 therapeutic milk as per protocol."
  },
  {
    id: "6",
    src: "/b4.jpg",
    category: "Facilities",
    title: "Play Therapy Area",
    description: "Dedicated play area inside the MTC to stimulate cognitive recovery."
  }
];

export const GALLERY_STORAGE_KEY = "mtc_gallery_data";

// Helper: Compress images via Canvas before saving to prevent localStorage quota crash
export const compressImageToBase64 = (
  file: File,
  maxWidth = 1200,
  maxHeight = 1200,
  quality = 0.75
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new window.Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);

        // Convert to WebP / JPEG with compression
        resolve(canvas.toDataURL("image/webp", quality));
      };
      img.onerror = (error) => reject(error);
    };
    reader.onerror = (error) => reject(error);
  });
};