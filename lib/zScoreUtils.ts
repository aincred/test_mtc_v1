// lib/zScoreUtils.ts

/**
 * Calculates the Weight-for-Height Z-Score (WHZ) based on WHO standards.
 * Note: Real WHO calculation requires a Lookup Table (LMS parameters) or a simplified SD Table.
 * * @param weight - Weight in KG
 * @param height - Height/Length in CM
 * @param sex - '1' for Male, '2' for Female
 * @returns string - The calculated Z-Score (e.g., "-3.2 SD") or "N/A"
 */
export const calculateZScore = (
    weight: number, 
    height: number, 
    sex: string
  ): string => {
    if (!weight || !height || !sex) return "";
  
    // ---------------------------------------------------------
    // PLACEHOLDER LOGIC: 
    // In a real app, you would import a JSON dataset of WHO tables 
    // and find the reference median (M) and standard deviation (SD)
    // for the given height and sex.
    // ---------------------------------------------------------
    
    // Example: Simplified logic for demonstration
    // (This is NOT medically accurate - please insert real WHO Table logic here)
    const referenceMedianWeight = (height * 0.25); // Fake formula
    const referenceSD = 1.5; // Fake standard deviation
  
    // Z-Score Formula: (Observed Value - Median) / Standard Deviation
    const zScoreVal = (weight - referenceMedianWeight) / referenceSD;
  
    // Formatting: Round to 1 decimal place
    return zScoreVal.toFixed(1);
  };
  
  /**
   * Helper to determine color code based on Z-Score
   * @param zScore - The numeric Z-score string
   */
  export const getZScoreColor = (zScore: string): string => {
    const score = parseFloat(zScore);
    if (isNaN(score)) return "text-gray-900";
  
    if (score < -3) return "text-red-600 font-bold"; // SAM (Severe)
    if (score >= -3 && score < -2) return "text-yellow-600 font-bold"; // MAM (Moderate)
    return "text-green-600 font-bold"; // Normal
  };