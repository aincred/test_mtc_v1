// import { NextRequest, NextResponse } from 'next/server';
// import { getEquipmentData, saveEquipmentData, EquipmentData as DBEquipmentData } from '@/lib/db'; // Adjust path to your db.ts

// // MAPPING: Frontend ID -> Database Column Prefix
// // This handles the specific spelling variations in your SQL Schema
// const ID_TO_DB_MAP: Record<number, string> = {
//   // Screening Room
//   1: "DigitalWeighingScale",
//   2: "Stadiometer",
//   3: "Infantometer", // DB has "InfantometerWroking"
//   4: "MUACTape",      // DB is "Available" only, handled in logic
//   5: "WeingScales",
//   6: "Clock",
//   7: "Calculator",
//   8: "SAMChart",      // Available only
//   9: "SAMRegister",   // Available only
//   10: "Camera",
//   11: "File",         // Available only
//   12: "AlmiraRake",   // Available only
//   13: "Almira",       // Available only
//   14: "ProtocolPoster",// Available only
//   15: "Marker",       // Available only
//   16: "WhiteBoard",   // Available only
//   17: "DisplayBoard", // Available only
//   18: "Tab",

//   // Equipment For Examine
//   19: "Thermometers",
//   20: "ResuscitationEquipment", // Aval
//   21: "NGTube6/8",             // Available
//   22: "SuctionEquipment",
//   23: "BloodTransfusionKit",   // Aval
//   24: "HbMeter",
//   25: "Glucometer",

//   // Ward
//   26: "Bed",
//   27: "SideTable",
//   28: "IVStand",
//   29: "RoomHeater",
//   30: "CoolerAC",
//   31: "Fan",
//   32: "TabaleChair", // Matches DB typo
//   33: "Dustbin",     // Available
//   34: "ShoeRack",    // Available
//   35: "TVWardandPlayArea", // Special case (boolean in DB?)
//   36: "Inverter",
//   37: "Toys",        // Available
//   38: "NutritionCousellingFlipBooks", // Special

//   // Other
//   39: "WashingMachine",
//   40: "Geyser",
//   41: "Computer",
//   42: "BedSeat",      // Available
//   43: "MedicineTray", // Available
//   44: "curtans",      // Available
//   45: "Tubelight",
//   46: "PradaWindow",  // Note: This column might not exist in your provided db.ts interface? Skipping if not in DB.

//   // Kitchen
//   47: "CookingGas",       // Available
//   48: "DietaryScale",     // Available
//   49: "MeasuringJar",     // Available
//   50: "ElectricMixerBlende", // Available
//   51: "WaterFilterRO",    // Available
//   52: "Refrigerator",     // Available
//   53: "UtensilforKitchen",// Available
//   54: "MassacringCupGlassSpoon", // Matches DB typo
//   55: "Pressercooker",    // Matches DB typo
//   56: "SteelCacontner",   // Matches DB typo
//   // 57-60 might not map directly to the DB interface provided in previous prompt.
//   // If they don't exist in DB, they won't save.
// };

// export async function GET(req: NextRequest) {
//   try {
//     // In a real app, get MTCCode from session/auth
//     const mtcCode = "JH/WSB/CBS"; 
    
//     const dbData = await getEquipmentData(mtcCode);
    
//     if (!dbData) {
//       return NextResponse.json({ message: "No data found" }, { status: 404 });
//     }

//     return NextResponse.json({ 
//       data: dbData, 
//       lastUpdated: dbData.LastUpdated 
//     });
//   } catch (error) {
//     console.error("API Error:", error);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();
//     const { equipmentData, mtcCode } = body;
    
//     // Prepare object for DB
//     const dbPayload: any = {
//       MTCCode: mtcCode || "JH/WSB/CBS",
//     };

//     // Helper to flatten the nested frontend arrays
//     const allItems = [
//       ...equipmentData.screeningRoom,
//       ...equipmentData.equipmentForExamine,
//       ...equipmentData.ward,
//       ...equipmentData.other,
//       ...equipmentData.kitchenEquipment
//     ];

//     allItems.forEach((item: any) => {
//       const prefix = ID_TO_DB_MAP[item.id];
//       if (!prefix) return;

//       // Logic to map Frontend "Quantity/Working" to DB "Working/NotWorking"
//       // DB Schema usually splits them: [Name]Working, [Name]NotWorking
//       // Or just [Name]Available for simple items.
      
//       const workingVal = parseInt(item.workingQuantity) || 0;
//       const totalVal = parseInt(item.quantity) || 0;
//       const notWorkingVal = totalVal - workingVal;

//       // Handle specific spelling cases based on db.ts interface
//       if (prefix === "Infantometer") {
//         dbPayload["InfantometerWroking"] = workingVal; // DB Typo
//         dbPayload["InfantometerNotWroking"] = notWorkingVal;
//       } 
//       else if (prefix === "WeingScales") {
//         dbPayload["WeingScalesWorking"] = workingVal;
//         dbPayload["WeingScalesNotworking"] = notWorkingVal;
//       }
//       else {
//         // Generic Try: Prefix + "Working" / "NotWorking"
//         // If DB only has "Available", we usually sum them or take quantity
//         dbPayload[`${prefix}Working`] = workingVal;
//         dbPayload[`${prefix}NotWorking`] = notWorkingVal;
//         dbPayload[`${prefix}Available`] = totalVal; // Some cols are just "Available" (count)
//       }
//     });

//     const result = await saveEquipmentData(dbPayload);
//     return NextResponse.json(result);

//   } catch (error) {
//     console.error("Save Error:", error);
//     return NextResponse.json({ error: "Failed to save" }, { status: 500 });
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import { getEquipmentData, saveEquipmentData } from "@/lib/db";

/* ---------------------------------- TYPES --------------------------------- */

interface EquipmentItem {
  id: number;
  quantity: number | string;
  workingQuantity: number | string;
}

interface EquipmentPayload {
  screeningRoom: EquipmentItem[];
  equipmentForExamine: EquipmentItem[];
  ward: EquipmentItem[];
  other: EquipmentItem[];
  kitchenEquipment: EquipmentItem[];
}

interface EquipmentPostBody {
  mtcCode?: string;
  equipmentData: EquipmentPayload;
}

/**
 * Generic DB payload.
 * Keys are dynamic because DB column names vary heavily.
 */
type EquipmentDBPayload = {
  MTCCode: string;
} & Record<string, number | string>;

/* -------------------- Frontend ID → DB Column Prefix ----------------------- */

const ID_TO_DB_MAP: Record<number, string> = {
  1: "DigitalWeighingScale",
  2: "Stadiometer",
  3: "Infantometer",
  4: "MUACTape",
  5: "WeingScales",
  6: "Clock",
  7: "Calculator",
  8: "SAMChart",
  9: "SAMRegister",
  10: "Camera",
  11: "File",
  12: "AlmiraRake",
  13: "Almira",
  14: "ProtocolPoster",
  15: "Marker",
  16: "WhiteBoard",
  17: "DisplayBoard",
  18: "Tab",

  19: "Thermometers",
  20: "ResuscitationEquipment",
  21: "NGTube6/8",
  22: "SuctionEquipment",
  23: "BloodTransfusionKit",
  24: "HbMeter",
  25: "Glucometer",

  26: "Bed",
  27: "SideTable",
  28: "IVStand",
  29: "RoomHeater",
  30: "CoolerAC",
  31: "Fan",
  32: "TabaleChair",
  33: "Dustbin",
  34: "ShoeRack",
  35: "TVWardandPlayArea",
  36: "Inverter",
  37: "Toys",
  38: "NutritionCousellingFlipBooks",

  39: "WashingMachine",
  40: "Geyser",
  41: "Computer",
  42: "BedSeat",
  43: "MedicineTray",
  44: "curtans",
  45: "Tubelight",
  46: "PradaWindow",

  47: "CookingGas",
  48: "DietaryScale",
  49: "MeasuringJar",
  50: "ElectricMixerBlende",
  51: "WaterFilterRO",
  52: "Refrigerator",
  53: "UtensilforKitchen",
  54: "MassacringCupGlassSpoon",
  55: "Pressercooker",
  56: "SteelCacontner",
};

/* ---------------------------------- GET ---------------------------------- */

export async function GET() {
  try {
    const mtcCode = "JH/WSB/CBS"; // TODO: from session/auth

    const dbData = await getEquipmentData(mtcCode);

    if (!dbData) {
      return NextResponse.json(
        { message: "No data found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      data: dbData,
      lastUpdated: dbData.LastUpdated,
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

/* ---------------------------------- POST --------------------------------- */

export async function POST(req: NextRequest) {
  try {
    const body: EquipmentPostBody = await req.json();
    const { equipmentData, mtcCode } = body;

    const dbPayload: EquipmentDBPayload = {
      MTCCode: mtcCode ?? "JH/WSB/CBS",
    };

    const allItems: EquipmentItem[] = [
      ...equipmentData.screeningRoom,
      ...equipmentData.equipmentForExamine,
      ...equipmentData.ward,
      ...equipmentData.other,
      ...equipmentData.kitchenEquipment,
    ];

    allItems.forEach((item: EquipmentItem) => {
      const prefix = ID_TO_DB_MAP[item.id];
      if (!prefix) return;

      const workingVal = Number(item.workingQuantity) || 0;
      const totalVal = Number(item.quantity) || 0;
      const notWorkingVal = Math.max(totalVal - workingVal, 0);

      // Handle DB typos & special cases
      if (prefix === "Infantometer") {
        dbPayload.InfantometerWroking = workingVal;
        dbPayload.InfantometerNotWroking = notWorkingVal;
      } else if (prefix === "WeingScales") {
        dbPayload.WeingScalesWorking = workingVal;
        dbPayload.WeingScalesNotworking = notWorkingVal;
      } else {
        dbPayload[`${prefix}Working`] = workingVal;
        dbPayload[`${prefix}NotWorking`] = notWorkingVal;
        dbPayload[`${prefix}Available`] = totalVal;
      }
    });

    const result = await saveEquipmentData(dbPayload);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Save Error:", error);
    return NextResponse.json(
      { error: "Failed to save" },
      { status: 500 }
    );
  }
}
