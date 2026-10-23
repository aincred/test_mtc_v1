// lib/materialsData.ts
export type MediaType = "pdf" | "image" | "video" | "doc";

export interface ResourceItem {
  id: string;
  title: string;
  category: string;
  subcategory: string;
  mediaType: MediaType;
  mediaUrl: string;
  size?: string;
  date?: string;
}

export const CATEGORIES = [
  { id: "Guidelines & Training Modules", label: "Guidelines & Training Modules" },
  { id: "Awareness Generation- IPC", label: "Awareness Generation- IPC" },
  { id: "Mass Media", label: "Mass Media" },
  { id: "Social Media", label: "Social Media" },
  { id: "Case Studies", label: "Case Studies" },
  { id: "Other", label: "Other" }
];

export const SUBCATEGORIES = [
  "Guidelines",
  "Protocols",
  "Manuals",
  "MTC",
  "Corona Virus",
  "MTC MIS Training Video",
  "Case Studies",
  "General"
];

export const INITIAL_DATA: ResourceItem[] = [
  { id: "1", title: "FACILITATOR GUIDE FOR FACILITY BASED CARE OF CHILDREN WITH SAM- ENGLISH", category: "Guidelines & Training Modules", subcategory: "Guidelines", mediaType: "pdf", mediaUrl: "/materials/facilitator_guide.pdf", size: "2.4 MB", date: "2024-01-15" },
  { id: "2", title: "GUIDELINE FOR ESTABLISHMENT OF NEW 15 MTCS 2016-17", category: "Guidelines & Training Modules", subcategory: "Guidelines", mediaType: "pdf", mediaUrl: "/materials/guideline_establishment.pdf", size: "1.8 MB", date: "2024-01-15" },
  { id: "4", title: "MODULE-FACILITY BASED MANAGEMENT OF CHILDREN WITH SAM", category: "Guidelines & Training Modules", subcategory: "Guidelines", mediaType: "image", mediaUrl: "/materials/module_hindi.jpg", size: "950 KB", date: "2024-01-15" },
  { id: "8", title: "PROTOCOL POSTER - SET-A", category: "Guidelines & Training Modules", subcategory: "Protocols", mediaType: "image", mediaUrl: "/materials/protocol_a.jpg", size: "1.2 MB", date: "2024-02-01" },
  { id: "11", title: "Participant Manual MTC MoHFW", category: "Guidelines & Training Modules", subcategory: "Manuals", mediaType: "pdf", mediaUrl: "/materials/participant_manual_mtc.pdf", size: "4.1 MB", date: "2024-02-10" },
  { id: "19", title: "Child Case Sheet", category: "Awareness Generation- IPC", subcategory: "MTC", mediaType: "pdf", mediaUrl: "/materials/child_case_sheet.pdf", size: "650 KB", date: "2024-03-01" },
  { id: "20", title: "General Nutrition & Lifestyle Tips", category: "Mass Media", subcategory: "Corona Virus", mediaType: "pdf", mediaUrl: "/materials/nutrition_tips.pdf", size: "820 KB", date: "2024-03-05" },
  { id: "26", title: "MTC log in and data entry video", category: "Mass Media", subcategory: "MTC MIS Training Video", mediaType: "video", mediaUrl: "/materials/mtc_login_video.mp4", size: "18.4 MB", date: "2024-03-10" },
  { id: "28", title: "Communication", category: "Social Media", subcategory: "MTC", mediaType: "image", mediaUrl: "/materials/communication.jpg", size: "1.1 MB", date: "2024-03-12" },
  { id: "30", title: "Case Study Format", category: "Case Studies", subcategory: "Case Studies", mediaType: "pdf", mediaUrl: "/materials/case_study_format.pdf", size: "450 KB", date: "2024-03-15" },
  { id: "31", title: "Other Files", category: "Other", subcategory: "MTC", mediaType: "pdf", mediaUrl: "/materials/other_files.pdf", size: "300 KB", date: "2024-03-20" }
];

export const STORAGE_KEY = "app_communication_materials";