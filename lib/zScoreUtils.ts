// // lib/zScoreUtils.ts

// /**
//  * Calculates the Weight-for-Height Z-Score (WHZ) based on WHO standards.
//  * Note: Real WHO calculation requires a Lookup Table (LMS parameters) or a simplified SD Table.
//  * * @param weight - Weight in KG
//  * @param height - Height/Length in CM
//  * @param sex - '1' for Male, '2' for Female
//  * @returns string - The calculated Z-Score (e.g., "-3.2 SD") or "N/A"
//  */
// export const calculateZScore = (
//     weight: number, 
//     height: number, 
//     sex: string
//   ): string => {
//     if (!weight || !height || !sex) return "";
  
//     // ---------------------------------------------------------
//     // PLACEHOLDER LOGIC: 
//     // In a real app, you would import a JSON dataset of WHO tables 
//     // and find the reference median (M) and standard deviation (SD)
//     // for the given height and sex.
//     // ---------------------------------------------------------
    
//     // Example: Simplified logic for demonstration
//     // (This is NOT medically accurate - please insert real WHO Table logic here)
//     const referenceMedianWeight = (height * 0.25); // Fake formula
//     const referenceSD = 1.5; // Fake standard deviation
  
//     // Z-Score Formula: (Observed Value - Median) / Standard Deviation
//     const zScoreVal = (weight - referenceMedianWeight) / referenceSD;
  
//     // Formatting: Round to 1 decimal place
//     return zScoreVal.toFixed(1);
//   };
  
//   /**
//    * Helper to determine color code based on Z-Score
//    * @param zScore - The numeric Z-score string
//    */
//   export const getZScoreColor = (zScore: string): string => {
//     const score = parseFloat(zScore);
//     if (isNaN(score)) return "text-gray-900";
  
//     if (score < -3) return "text-red-600 font-bold"; // SAM (Severe)
//     if (score >= -3 && score < -2) return "text-yellow-600 font-bold"; // MAM (Moderate)
//     return "text-green-600 font-bold"; // Normal
//   };

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
const growthData: GrowthChartData = {
  45: {
    male:   { minus4: 1.7, minus3: 1.9, minus2: 2.0, minus1: 2.2, median: 2.4 },
    female: { minus4: 1.7, minus3: 1.9, minus2: 2.1, minus1: 2.3, median: 2.5 }
  },
  120: {
    male:   { minus4: 15.5, minus3: 17.1, minus2: 18.6, minus1: 20.4, median: 22.4 },
    female: { minus4: 15.6, minus3: 17.3, minus2: 18.9, minus1: 20.7, median: 22.8 }
  }
  // Add missing lengths (46-119) here later...
};

/**
 * Calculates the Weight-for-Height Z-Score (WHZ) using piecewise linear interpolation 
 * between the known SD bands from the reference table.
 * * @param weight - Weight in KG
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