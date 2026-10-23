// lib/directorData.ts

export interface DirectorMessageData {
  name: string;
  designation: string;
  organization: string;
  photoUrl: string;
  leadParagraph: string;
  bodyParagraph1: string;
  keyFeatureHeading: string;
  keyFeatureText: string;
  bodyParagraph2: string;
  bodyParagraph3: string;
  acknowledgementText: string;
  updatedAt?: string;
}

export const INITIAL_DIRECTOR_DATA: DirectorMessageData = {
  name: "Shri Shashi Prakash Jha, IAS",
  designation: "Mission Director",
  organization: "National Health Mission, Jharkhand",
  photoUrl: "/director.jpg",
  leadParagraph:
    "Government of Jharkhand is committed to improve the nutrition status of all children and put extra focus on treatment of most vulnerable children with Severe Acute Malnutrition (SAM) and Moderate Acute Malnutrition (MAM) through a wide network of 101 Malnutrition Treatment Centers (MTC).",
  bodyParagraph1:
    "I am happy to share the revised online Malnutrition Treatment Center Management Information System (MTC-MIS) which is an extremely helpful management tool that will go a long way towards monitoring and alleviating the malnutrition in children.",
  keyFeatureHeading: "Key Capabilities of the Revised Portal",
  keyFeatureText:
    "The latest revised version not only allows Real Time Data entry and management but also simultaneously enables MTC Staff to register children, update and keep a track of their daily weight as well as intake of micronutrients and antibiotics with discharge summary thereby providing a holistic and comprehensive track of all important indicators and quality of care and coverage.",
  bodyParagraph2:
    "The information thus generated from 101 functional MTCs to manage children with Severe Acute Malnutrition (SAM) and Moderate Acute Malnutrition (MAM) with medical complications will not only be helpful in the programmatic management but also in informing and reforming policy frameworks on nutrition across the state.",
  bodyParagraph3:
    "I am confident and certain that the present dashboard of MTC in this website would enhance the technical and management expertise for treatment of Children with Severe Acute Malnutrition (SAM) and Moderate Acute Malnutrition (MAM). The envisioned purpose of the revised MTC MIS online website is to become a handy tool to monitor and improve care and treatment to the children and not necessarily remain just a reporting dashboard.",
  acknowledgementText:
    "I thank UNICEF and the State Center of Excellence – SAM and MAM at RIMS in supporting this important initiative.",
  updatedAt: new Date().toISOString()
};

export const DIRECTOR_STORAGE_KEY = "mtc_director_message_data";

export const getStoredDirectorData = (): DirectorMessageData => {
  if (typeof window === "undefined") return INITIAL_DIRECTOR_DATA;
  try {
    const raw = localStorage.getItem(DIRECTOR_STORAGE_KEY);
    return raw ? JSON.parse(raw) : INITIAL_DIRECTOR_DATA;
  } catch {
    return INITIAL_DIRECTOR_DATA;
  }
};

export const saveDirectorData = (data: DirectorMessageData): void => {
  if (typeof window === "undefined") return;
  const payload = { ...data, updatedAt: new Date().toISOString() };
  localStorage.setItem(DIRECTOR_STORAGE_KEY, JSON.stringify(payload));
  window.dispatchEvent(new Event("mtc_director_data_updated"));
};

export const compressImageToBase64 = (
  file: File,
  maxWidth = 800,
  maxHeight = 1000,
  quality = 0.8
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
        resolve(canvas.toDataURL("image/webp", quality));
      };
      img.onerror = (error) => reject(error);
    };
    reader.onerror = (error) => reject(error);
  });
};