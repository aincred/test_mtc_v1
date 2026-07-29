// // // lib/zScoreUtils.ts

// // /**
// //  * Calculates the Weight-for-Height Z-Score (WHZ) based on WHO standards.
// //  * Note: Real WHO calculation requires a Lookup Table (LMS parameters) or a simplified SD Table.
// //  * * @param weight - Weight in KG
// //  * @param height - Height/Length in CM
// //  * @param sex - '1' for Male, '2' for Female
// //  * @returns string - The calculated Z-Score (e.g., "-3.2 SD") or "N/A"
// //  */
// // export const calculateZScore = (
// //     weight: number, 
// //     height: number, 
// //     sex: string
// //   ): string => {
// //     if (!weight || !height || !sex) return "";
  
// //     // ---------------------------------------------------------
// //     // PLACEHOLDER LOGIC: 
// //     // In a real app, you would import a JSON dataset of WHO tables 
// //     // and find the reference median (M) and standard deviation (SD)
// //     // for the given height and sex.
// //     // ---------------------------------------------------------
    
// //     // Example: Simplified logic for demonstration
// //     // (This is NOT medically accurate - please insert real WHO Table logic here)
// //     const referenceMedianWeight = (height * 0.25); // Fake formula
// //     const referenceSD = 1.5; // Fake standard deviation
  
// //     // Z-Score Formula: (Observed Value - Median) / Standard Deviation
// //     const zScoreVal = (weight - referenceMedianWeight) / referenceSD;
  
// //     // Formatting: Round to 1 decimal place
// //     return zScoreVal.toFixed(1);
// //   };
  
// //   /**
// //    * Helper to determine color code based on Z-Score
// //    * @param zScore - The numeric Z-score string
// //    */
// //   export const getZScoreColor = (zScore: string): string => {
// //     const score = parseFloat(zScore);
// //     if (isNaN(score)) return "text-gray-900";
  
// //     if (score < -3) return "text-red-600 font-bold"; // SAM (Severe)
// //     if (score >= -3 && score < -2) return "text-yellow-600 font-bold"; // MAM (Moderate)
// //     return "text-green-600 font-bold"; // Normal
// //   };

// // lib/zScoreUtils.ts

// export type GenderKey = 'male' | 'female';

// export interface SDBands {
//   minus4: number;
//   minus3: number;
//   minus2: number;
//   minus1: number;
//   median: number;
// }

// export type GrowthChartData = {
//   [length in number]: {
//     male: SDBands;
//     female: SDBands;
//   };
// };

// // Extracted from WHO Annexure 9 Weight-for-length reference chart
// const growthData: GrowthChartData = {
//   45: {
//     male:   { minus4: 1.7, minus3: 1.9, minus2: 2.0, minus1: 2.2, median: 2.4 },
//     female: { minus4: 1.7, minus3: 1.9, minus2: 2.1, minus1: 2.3, median: 2.5 }
//   },
//   120: {
//     male:   { minus4: 15.5, minus3: 17.1, minus2: 18.6, minus1: 20.4, median: 22.4 },
//     female: { minus4: 15.6, minus3: 17.3, minus2: 18.9, minus1: 20.7, median: 22.8 }
//   }
//   // Add missing lengths (46-119) here later...
// };

// /**
//  * Calculates the Weight-for-Height Z-Score (WHZ) using piecewise linear interpolation 
//  * between the known SD bands from the reference table.
//  * * @param weight - Weight in KG
//  * @param height - Height/Length in CM
//  * @param sex - '1' for Male, '2' for Female
//  * @returns string - The calculated Z-Score (e.g., "-3.2") or "N/A"
//  */
// export const calculateZScore = (
//   weight: number, 
//   height: number, 
//   sex: string
// ): string => {
//   if (!weight || !height || !sex) return "N/A";

//   // Map '1' and '2' to our dictionary keys
//   const genderKey: GenderKey = sex === '1' ? 'male' : 'female';
  
//   const lengthData = growthData[height];
//   if (!lengthData) return "N/A"; // Return N/A if height is not in our lookup table

//   const bands = lengthData[genderKey];

//   // Piecewise interpolation logic
//   if (weight >= bands.median) {
//     // Estimating positive SD based on the gap between median and -1 SD
//     const sdSize = bands.median - bands.minus1;
//     const z = (weight - bands.median) / sdSize;
//     return z.toFixed(1);
//   } 
  
//   if (weight >= bands.minus1) {
//     const sdSize = bands.median - bands.minus1;
//     const fraction = (bands.median - weight) / sdSize;
//     return (0 - fraction).toFixed(1);
//   } 
  
//   if (weight >= bands.minus2) {
//     const sdSize = bands.minus1 - bands.minus2;
//     const fraction = (bands.minus1 - weight) / sdSize;
//     return (-1 - fraction).toFixed(1);
//   } 
  
//   if (weight >= bands.minus3) {
//     const sdSize = bands.minus2 - bands.minus3;
//     const fraction = (bands.minus2 - weight) / sdSize;
//     return (-2 - fraction).toFixed(1);
//   } 
  
//   if (weight >= bands.minus4) {
//     const sdSize = bands.minus3 - bands.minus4;
//     const fraction = (bands.minus3 - weight) / sdSize;
//     return (-3 - fraction).toFixed(1);
//   } 
  
//   // Below -4 SD: Extrapolate using the gap between -3 and -4
//   const sdSize = bands.minus3 - bands.minus4;
//   const fraction = (bands.minus4 - weight) / sdSize;
//   return (-4 - fraction).toFixed(1);
// };

// /**
//  * Helper to determine Tailwind color code based on Z-Score
//  * @param zScore - The numeric Z-score string
//  */
// export const getZScoreColor = (zScore: string): string => {
//   if (zScore === "N/A") return "text-gray-900";
  
//   const score = parseFloat(zScore);
//   if (isNaN(score)) return "text-gray-900";

//   if (score < -3) return "text-red-600 font-bold"; // SAM (Severe Acute Malnutrition)
//   if (score >= -3 && score < -2) return "text-yellow-600 font-bold"; // MAM (Moderate)
//   return "text-green-600 font-bold"; // Normal
// };

// lib/zScoreUtils.ts

export type GenderKey = 'male' | 'female';

export interface SDBands {
  minus4: number;
  minus3: number;
  minus2: number;
  minus1: number;
  median: number;
}

export type GrowthChartData = {
  [length in number]: {
    male: SDBands;
    female: SDBands;
  };
};

// Extracted from WHO Annexure 9 Weight-for-length reference chart
export const growthData: GrowthChartData = {
  45: {
    male:   { minus4: 1.7, minus3: 1.9, minus2: 2.0, minus1: 2.2, median: 2.4 },
    female: { minus4: 1.7, minus3: 1.9, minus2: 2.1, minus1: 2.3, median: 2.5 }
  },
  46: {
    male:   { minus4: 1.8, minus3: 2.0, minus2: 2.2, minus1: 2.4, median: 2.6 },
    female: { minus4: 1.9, minus3: 2.0, minus2: 2.2, minus1: 2.4, median: 2.6 }
  },
  47: {
    male:   { minus4: 2.0, minus3: 2.1, minus2: 2.3, minus1: 2.5, median: 2.8 },
    female: { minus4: 2.0, minus3: 2.2, minus2: 2.4, minus1: 2.6, median: 2.8 }
  },
  48: {
    male:   { minus4: 2.1, minus3: 2.3, minus2: 2.5, minus1: 2.7, median: 2.9 },
    female: { minus4: 2.1, minus3: 2.3, minus2: 2.5, minus1: 2.7, median: 3.0 }
  },
  49: {
    male:   { minus4: 2.2, minus3: 2.4, minus2: 2.6, minus1: 2.9, median: 3.1 },
    female: { minus4: 2.2, minus3: 2.4, minus2: 2.6, minus1: 2.9, median: 3.2 }
  },
  50: {
    male:   { minus4: 2.4, minus3: 2.6, minus2: 2.8, minus1: 3.0, median: 3.3 },
    female: { minus4: 2.4, minus3: 2.6, minus2: 2.8, minus1: 3.1, median: 3.4 }
  },
  51: {
    male:   { minus4: 2.5, minus3: 2.7, minus2: 3.0, minus1: 3.2, median: 3.5 },
    female: { minus4: 2.5, minus3: 2.8, minus2: 3.0, minus1: 3.3, median: 3.6 }
  },
  52: {
    male:   { minus4: 2.7, minus3: 2.9, minus2: 3.2, minus1: 3.5, median: 3.8 },
    female: { minus4: 2.7, minus3: 2.9, minus2: 3.2, minus1: 3.5, median: 3.8 }
  },
  53: {
    male:   { minus4: 2.9, minus3: 3.1, minus2: 3.4, minus1: 3.7, median: 4.0 },
    female: { minus4: 2.8, minus3: 3.1, minus2: 3.4, minus1: 3.7, median: 4.0 }
  },
  54: {
    male:   { minus4: 3.1, minus3: 3.3, minus2: 3.6, minus1: 3.9, median: 4.3 },
    female: { minus4: 3.0, minus3: 3.3, minus2: 3.6, minus1: 3.9, median: 4.3 }
  },
  55: {
    male:   { minus4: 3.3, minus3: 3.6, minus2: 3.8, minus1: 4.2, median: 4.5 },
    female: { minus4: 3.2, minus3: 3.5, minus2: 3.8, minus1: 4.2, median: 4.5 }
  },
  56: {
    male:   { minus4: 3.5, minus3: 3.8, minus2: 4.1, minus1: 4.4, median: 4.8 },
    female: { minus4: 3.4, minus3: 3.7, minus2: 4.0, minus1: 4.4, median: 4.8 }
  },
  57: {
    male:   { minus4: 3.7, minus3: 4.0, minus2: 4.3, minus1: 4.7, median: 5.1 },
    female: { minus4: 3.6, minus3: 3.9, minus2: 4.3, minus1: 4.6, median: 5.1 }
  },
  58: {
    male:   { minus4: 3.9, minus3: 4.3, minus2: 4.6, minus1: 5.0, median: 5.4 },
    female: { minus4: 3.8, minus3: 4.1, minus2: 4.5, minus1: 4.9, median: 5.4 }
  },
  59: {
    male:   { minus4: 4.1, minus3: 4.5, minus2: 4.8, minus1: 5.3, median: 5.7 },
    female: { minus4: 3.9, minus3: 4.3, minus2: 4.7, minus1: 5.1, median: 5.6 }
  },
  60: {
    male:   { minus4: 4.3, minus3: 4.7, minus2: 5.1, minus1: 5.5, median: 6.0 },
    female: { minus4: 4.1, minus3: 4.5, minus2: 4.9, minus1: 5.4, median: 5.9 }
  },
  61: {
    male:   { minus4: 4.5, minus3: 4.9, minus2: 5.3, minus1: 5.8, median: 6.3 },
    female: { minus4: 4.3, minus3: 4.7, minus2: 5.1, minus1: 5.6, median: 6.1 }
  },
  62: {
    male:   { minus4: 4.7, minus3: 5.1, minus2: 5.6, minus1: 6.0, median: 6.5 },
    female: { minus4: 4.5, minus3: 4.9, minus2: 5.3, minus1: 5.8, median: 6.4 }
  },
  63: {
    male:   { minus4: 4.9, minus3: 5.3, minus2: 5.8, minus1: 6.2, median: 6.8 },
    female: { minus4: 4.7, minus3: 5.1, minus2: 5.5, minus1: 6.0, median: 6.6 }
  },
  64: {
    male:   { minus4: 5.1, minus3: 5.5, minus2: 6.0, minus1: 6.5, median: 7.0 },
    female: { minus4: 4.8, minus3: 5.3, minus2: 5.7, minus1: 6.3, median: 6.9 }
  },
  65: {
    male:   { minus4: 5.3, minus3: 5.7, minus2: 6.2, minus1: 6.7, median: 7.3 },
    female: { minus4: 5.0, minus3: 5.5, minus2: 5.9, minus1: 6.5, median: 7.1 }
  },
  66: {
    male:   { minus4: 5.5, minus3: 5.9, minus2: 6.4, minus1: 6.9, median: 7.5 },
    female: { minus4: 5.1, minus3: 5.6, minus2: 6.1, minus1: 6.7, median: 7.3 }
  },
  67: {
    male:   { minus4: 5.6, minus3: 6.1, minus2: 6.6, minus1: 7.1, median: 7.7 },
    female: { minus4: 5.3, minus3: 5.8, minus2: 6.3, minus1: 6.9, median: 7.5 }
  },
  68: {
    male:   { minus4: 5.8, minus3: 6.3, minus2: 6.8, minus1: 7.3, median: 8.0 },
    female: { minus4: 5.5, minus3: 6.0, minus2: 6.5, minus1: 7.1, median: 7.7 }
  },
  69: {
    male:   { minus4: 6.0, minus3: 6.5, minus2: 7.0, minus1: 7.6, median: 8.2 },
    female: { minus4: 5.6, minus3: 6.1, minus2: 6.7, minus1: 7.3, median: 8.0 }
  },
  70: {
    male:   { minus4: 6.1, minus3: 6.6, minus2: 7.2, minus1: 7.8, median: 8.4 },
    female: { minus4: 5.8, minus3: 6.3, minus2: 6.9, minus1: 7.5, median: 8.2 }
  },
  71: {
    male:   { minus4: 6.3, minus3: 6.8, minus2: 7.4, minus1: 8.0, median: 8.6 },
    female: { minus4: 5.9, minus3: 6.5, minus2: 7.0, minus1: 7.7, median: 8.4 }
  },
  72: {
    male:   { minus4: 6.4, minus3: 7.0, minus2: 7.6, minus1: 8.2, median: 8.9 },
    female: { minus4: 6.0, minus3: 6.6, minus2: 7.2, minus1: 7.8, median: 8.6 }
  },
  73: {
    male:   { minus4: 6.6, minus3: 7.2, minus2: 7.7, minus1: 8.4, median: 9.1 },
    female: { minus4: 6.2, minus3: 6.8, minus2: 7.4, minus1: 8.0, median: 8.8 }
  },
  74: {
    male:   { minus4: 6.7, minus3: 7.3, minus2: 7.9, minus1: 8.6, median: 9.3 },
    female: { minus4: 6.3, minus3: 6.9, minus2: 7.5, minus1: 8.2, median: 9.0 }
  },
  75: {
    male:   { minus4: 6.9, minus3: 7.5, minus2: 8.1, minus1: 8.8, median: 9.5 },
    female: { minus4: 6.5, minus3: 7.1, minus2: 7.7, minus1: 8.4, median: 9.1 }
  },
  76: {
    male:   { minus4: 7.0, minus3: 7.6, minus2: 8.3, minus1: 8.9, median: 9.7 },
    female: { minus4: 6.6, minus3: 7.2, minus2: 7.8, minus1: 8.5, median: 9.3 }
  },
  77: {
    male:   { minus4: 7.2, minus3: 7.8, minus2: 8.4, minus1: 9.1, median: 9.9 },
    female: { minus4: 6.7, minus3: 7.4, minus2: 8.0, minus1: 8.7, median: 9.5 }
  },
  78: {
    male:   { minus4: 7.3, minus3: 7.9, minus2: 8.6, minus1: 9.3, median: 10.1 },
    female: { minus4: 6.9, minus3: 7.5, minus2: 8.2, minus1: 8.9, median: 9.7 }
  },
  79: {
    male:   { minus4: 7.4, minus3: 8.1, minus2: 8.7, minus1: 9.5, median: 10.3 },
    female: { minus4: 7.0, minus3: 7.7, minus2: 8.3, minus1: 9.1, median: 9.9 }
  },
  80: {
    male:   { minus4: 7.6, minus3: 8.2, minus2: 8.9, minus1: 9.6, median: 10.4 },
    female: { minus4: 7.1, minus3: 7.8, minus2: 8.5, minus1: 9.2, median: 10.1 }
  },
  81: {
    male:   { minus4: 7.7, minus3: 8.4, minus2: 9.1, minus1: 9.8, median: 10.6 },
    female: { minus4: 7.3, minus3: 8.0, minus2: 8.7, minus1: 9.4, median: 10.3 }
  },
  82: {
    male:   { minus4: 7.9, minus3: 8.5, minus2: 9.2, minus1: 10.0, median: 10.8 },
    female: { minus4: 7.5, minus3: 8.1, minus2: 8.8, minus1: 9.6, median: 10.5 }
  },
  83: {
    male:   { minus4: 8.0, minus3: 8.7, minus2: 9.4, minus1: 10.2, median: 11.0 },
    female: { minus4: 7.6, minus3: 8.3, minus2: 9.0, minus1: 9.8, median: 10.7 }
  },
  84: {
    male:   { minus4: 8.2, minus3: 8.9, minus2: 9.6, minus1: 10.4, median: 11.3 },
    female: { minus4: 7.8, minus3: 8.5, minus2: 9.2, minus1: 10.1, median: 11.0 }
  },
  85: {
    male:   { minus4: 8.4, minus3: 9.1, minus2: 9.8, minus1: 10.6, median: 11.5 },
    female: { minus4: 8.0, minus3: 8.7, minus2: 9.4, minus1: 10.3, median: 11.2 }
  },
  86: {
    male:   { minus4: 8.6, minus3: 9.3, minus2: 10.0, minus1: 10.8, median: 11.7 },
    female: { minus4: 8.1, minus3: 8.9, minus2: 9.7, minus1: 10.5, median: 11.5 }
  },
  87: {
    male:   { minus4: 8.9, minus3: 9.6, minus2: 10.4, minus1: 11.2, median: 12.2 },
    female: { minus4: 8.4, minus3: 9.2, minus2: 10.0, minus1: 10.9, median: 11.9 }
  },
  88: {
    male:   { minus4: 9.1, minus3: 9.8, minus2: 10.6, minus1: 11.5, median: 12.4 },
    female: { minus4: 8.6, minus3: 9.4, minus2: 10.2, minus1: 11.1, median: 12.1 }
  },
  89: {
    male:   { minus4: 9.3, minus3: 10.0, minus2: 10.8, minus1: 11.7, median: 12.6 },
    female: { minus4: 8.8, minus3: 9.6, minus2: 10.4, minus1: 11.4, median: 12.4 }
  },
  90: {
    male:   { minus4: 9.4, minus3: 10.2, minus2: 11.0, minus1: 11.9, median: 12.9 },
    female: { minus4: 9.0, minus3: 9.8, minus2: 10.6, minus1: 11.6, median: 12.6 }
  },
  91: {
    male:   { minus4: 9.6, minus3: 10.4, minus2: 11.2, minus1: 12.1, median: 13.1 },
    female: { minus4: 9.1, minus3: 10.0, minus2: 10.9, minus1: 11.8, median: 12.9 }
  },
  92: {
    male:   { minus4: 9.8, minus3: 10.6, minus2: 11.4, minus1: 12.3, median: 13.4 },
    female: { minus4: 9.3, minus3: 10.2, minus2: 11.1, minus1: 12.0, median: 13.1 }
  },
  93: {
    male:   { minus4: 9.9, minus3: 10.8, minus2: 11.6, minus1: 12.6, median: 13.6 },
    female: { minus4: 9.5, minus3: 10.4, minus2: 11.3, minus1: 12.3, median: 13.4 }
  },
  94: {
    male:   { minus4: 10.1, minus3: 11.0, minus2: 11.8, minus1: 12.8, median: 13.8 },
    female: { minus4: 9.7, minus3: 10.6, minus2: 11.5, minus1: 12.5, median: 13.6 }
  },
  95: {
    male:   { minus4: 10.3, minus3: 11.1, minus2: 12.0, minus1: 13.0, median: 14.1 },
    female: { minus4: 9.8, minus3: 10.8, minus2: 11.7, minus1: 12.7, median: 13.9 }
  },
  96: {
    male:   { minus4: 10.4, minus3: 11.3, minus2: 12.2, minus1: 13.2, median: 14.3 },
    female: { minus4: 10.0, minus3: 10.9, minus2: 11.9, minus1: 12.9, median: 14.1 }
  },
  97: {
    male:   { minus4: 10.6, minus3: 11.5, minus2: 12.4, minus1: 13.4, median: 14.6 },
    female: { minus4: 10.2, minus3: 11.1, minus2: 12.1, minus1: 13.2, median: 14.4 }
  },
  98: {
    male:   { minus4: 10.8, minus3: 11.7, minus2: 12.6, minus1: 13.7, median: 14.8 },
    female: { minus4: 10.4, minus3: 11.3, minus2: 12.3, minus1: 13.4, median: 14.7 }
  },
  99: {
    male:   { minus4: 11.0, minus3: 11.9, minus2: 12.9, minus1: 13.9, median: 15.1 },
    female: { minus4: 10.5, minus3: 11.5, minus2: 12.5, minus1: 13.7, median: 14.9 }
  },
  100: {
    male:   { minus4: 11.2, minus3: 12.1, minus2: 13.1, minus1: 14.2, median: 15.4 },
    female: { minus4: 10.7, minus3: 11.7, minus2: 12.8, minus1: 13.9, median: 15.2 }
  },
  101: {
    male:   { minus4: 11.3, minus3: 12.3, minus2: 13.3, minus1: 14.4, median: 15.6 },
    female: { minus4: 10.9, minus3: 12.0, minus2: 13.0, minus1: 14.2, median: 15.5 }
  },
  102: {
    male:   { minus4: 11.5, minus3: 12.5, minus2: 13.6, minus1: 14.7, median: 15.9 },
    female: { minus4: 11.1, minus3: 12.2, minus2: 13.3, minus1: 14.5, median: 15.8 }
  },
  103: {
    male:   { minus4: 11.7, minus3: 12.8, minus2: 13.8, minus1: 14.9, median: 16.2 },
    female: { minus4: 11.3, minus3: 12.4, minus2: 13.5, minus1: 14.7, median: 16.1 }
  },
  104: {
    male:   { minus4: 11.9, minus3: 13.0, minus2: 14.0, minus1: 15.2, median: 16.5 },
    female: { minus4: 11.5, minus3: 12.6, minus2: 13.8, minus1: 15.0, median: 16.4 }
  },
  105: {
    male:   { minus4: 12.1, minus3: 13.2, minus2: 14.3, minus1: 15.5, median: 16.8 },
    female: { minus4: 11.8, minus3: 12.9, minus2: 14.0, minus1: 15.3, median: 16.8 }
  },
  106: {
    male:   { minus4: 12.3, minus3: 13.4, minus2: 14.5, minus1: 15.8, median: 17.2 },
    female: { minus4: 12.0, minus3: 13.1, minus2: 14.3, minus1: 15.6, median: 17.1 }
  },
  107: {
    male:   { minus4: 12.5, minus3: 13.7, minus2: 14.8, minus1: 16.1, median: 17.5 },
    female: { minus4: 12.2, minus3: 13.4, minus2: 14.6, minus1: 15.9, median: 17.5 }
  },
  108: {
    male:   { minus4: 12.7, minus3: 13.9, minus2: 15.1, minus1: 16.4, median: 17.8 },
    female: { minus4: 12.4, minus3: 13.7, minus2: 14.9, minus1: 16.3, median: 17.8 }
  },
  109: {
    male:   { minus4: 12.9, minus3: 14.1, minus2: 15.3, minus1: 16.7, median: 18.2 },
    female: { minus4: 12.7, minus3: 13.9, minus2: 15.2, minus1: 16.6, median: 18.2 }
  },
  110: {
    male:   { minus4: 13.2, minus3: 14.4, minus2: 15.6, minus1: 17.0, median: 18.5 },
    female: { minus4: 12.9, minus3: 14.2, minus2: 15.5, minus1: 17.0, median: 18.6 }
  },
  111: {
    male:   { minus4: 13.4, minus3: 14.6, minus2: 15.9, minus1: 17.3, median: 18.9 },
    female: { minus4: 13.2, minus3: 14.5, minus2: 15.8, minus1: 17.3, median: 19.0 }
  },
  112: {
    male:   { minus4: 13.6, minus3: 14.9, minus2: 16.2, minus1: 17.6, median: 19.2 },
    female: { minus4: 13.5, minus3: 14.8, minus2: 16.2, minus1: 17.7, median: 19.4 }
  },
  113: {
    male:   { minus4: 13.8, minus3: 15.2, minus2: 16.5, minus1: 18.0, median: 19.6 },
    female: { minus4: 13.7, minus3: 15.1, minus2: 16.5, minus1: 18.0, median: 19.8 }
  },
  114: {
    male:   { minus4: 14.1, minus3: 15.4, minus2: 16.8, minus1: 18.3, median: 20.0 },
    female: { minus4: 14.0, minus3: 15.4, minus2: 16.8, minus1: 18.4, median: 20.2 }
  },
  115: {
    male:   { minus4: 14.3, minus3: 15.7, minus2: 17.1, minus1: 18.6, median: 20.4 },
    female: { minus4: 14.3, minus3: 15.7, minus2: 17.2, minus1: 18.8, median: 20.7 }
  },
  116: {
    male:   { minus4: 14.6, minus3: 16.0, minus2: 17.4, minus1: 19.0, median: 20.8 },
    female: { minus4: 14.5, minus3: 16.0, minus2: 17.5, minus1: 19.2, median: 21.1 }
  },
  117: {
    male:   { minus4: 14.8, minus3: 16.2, minus2: 17.7, minus1: 19.3, median: 21.2 },
    female: { minus4: 14.8, minus3: 16.3, minus2: 17.8, minus1: 19.6, median: 21.5 }
  },
  118: {
    male:   { minus4: 15.0, minus3: 16.5, minus2: 18.0, minus1: 19.7, median: 21.6 },
    female: { minus4: 15.1, minus3: 16.6, minus2: 18.2, minus1: 19.9, median: 22.0 }
  },
  119: {
    male:   { minus4: 15.3, minus3: 16.8, minus2: 18.3, minus1: 20.0, median: 22.0 },
    female: { minus4: 15.4, minus3: 16.9, minus2: 18.5, minus1: 20.3, median: 22.4 }
  },
  120: {
    male:   { minus4: 15.5, minus3: 17.1, minus2: 18.6, minus1: 20.4, median: 22.4 },
    female: { minus4: 15.6, minus3: 17.3, minus2: 18.9, minus1: 20.7, median: 22.8 }
  }
};

/**
 * Calculates the Weight-for-Height Z-Score (WHZ) using piecewise linear interpolation 
 * between the known SD bands from the reference table.
 * @param weight - Weight in KG
 * @param height - Height/Length in CM
 * @param sex - '1' for Male, '2' for Female
 * @returns string - The calculated Z-Score (e.g., "-3.2") or "N/A"
 */
export const calculateZScore = (
  weight: number, 
  height: number, 
  sex: string
): string => {
  if (!weight || !height || !sex) return "N/A";

  // Map '1' and '2' to our dictionary keys
  const genderKey: GenderKey = sex === '1' ? 'male' : 'female';
  
  const lengthData = growthData[height];
  if (!lengthData) return "N/A"; // Return N/A if height is not in our lookup table

  const bands = lengthData[genderKey];

  // Piecewise interpolation logic
  if (weight >= bands.median) {
    // Estimating positive SD based on the gap between median and -1 SD
    const sdSize = bands.median - bands.minus1;
    const z = (weight - bands.median) / sdSize;
    return z.toFixed(1);
  } 
  
  if (weight >= bands.minus1) {
    const sdSize = bands.median - bands.minus1;
    const fraction = (bands.median - weight) / sdSize;
    return (0 - fraction).toFixed(1);
  } 
  
  if (weight >= bands.minus2) {
    const sdSize = bands.minus1 - bands.minus2;
    const fraction = (bands.minus1 - weight) / sdSize;
    return (-1 - fraction).toFixed(1);
  } 
  
  if (weight >= bands.minus3) {
    const sdSize = bands.minus2 - bands.minus3;
    const fraction = (bands.minus2 - weight) / sdSize;
    return (-2 - fraction).toFixed(1);
  } 
  
  if (weight >= bands.minus4) {
    const sdSize = bands.minus3 - bands.minus4;
    const fraction = (bands.minus3 - weight) / sdSize;
    return (-3 - fraction).toFixed(1);
  } 
  
  // Below -4 SD: Extrapolate using the gap between -3 and -4
  const sdSize = bands.minus3 - bands.minus4;
  const fraction = (bands.minus4 - weight) / sdSize;
  return (-4 - fraction).toFixed(1);
};

/**
 * Helper to determine Tailwind color code based on Z-Score
 * @param zScore - The numeric Z-score string
 */
export const getZScoreColor = (zScore: string): string => {
  if (zScore === "N/A") return "text-gray-900";
  
  const score = parseFloat(zScore);
  if (isNaN(score)) return "text-gray-900";

  if (score < -3) return "text-red-600 font-bold"; // SAM (Severe Acute Malnutrition)
  if (score >= -3 && score < -2) return "text-yellow-600 font-bold"; // MAM (Moderate)
  return "text-green-600 font-bold"; // Normal
};