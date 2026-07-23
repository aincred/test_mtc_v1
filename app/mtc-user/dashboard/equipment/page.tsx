// // // "use client";

// // // import { useState, useEffect } from "react";
// // // import { useRouter } from "next/navigation";
// // // import { Button } from "@/components/ui/button";
// // // import { Input } from "@/components/ui/input";
// // // import { Card, CardHeader, CardContent } from "@/components/ui/card";
// // // import { Edit, Eye, Home, Save, Loader2 } from "lucide-react";
// // // import toast, { Toaster } from "react-hot-toast";

// // // interface EquipmentItem {
// // //   id: number;
// // //   name: string;
// // //   availability: string;
// // //   quantity: number;
// // //   workingStatus: string;
// // //   workingQuantity: number;
// // // }

// // // interface EquipmentData {
// // //   screeningRoom: EquipmentItem[];
// // //   equipmentForExamine: EquipmentItem[];
// // //   ward: EquipmentItem[];
// // //   other: EquipmentItem[];
// // //   kitchenEquipment: EquipmentItem[];
// // // }

// // // export default function EquipmentStatus() {
// // //   const router = useRouter();
// // //   const [selectedYear, setSelectedYear] = useState("");
// // //   const [selectedQuarter, setSelectedQuarter] = useState("");
// // //   const [isEditing, setIsEditing] = useState(false);
// // //   const [isLoading, setIsLoading] = useState(false);
// // //   const [lastUpdated, setLastUpdated] = useState("Not updated yet");
// // //   const [mtcCode, setMtcCode] = useState<string>("");
  
// // //   const [equipmentData, setEquipmentData] = useState<EquipmentData>({
// // //       screeningRoom: [
// // //         { id: 1, name: "Digital Weighing Scale", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// // //         { id: 2, name: "Stadiometer", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// // //         { id: 3, name: "Infantometer", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// // //         { id: 4, name: "MUAC Tape", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// // //         { id: 5, name: "Weighing scales (to weigh to 5 gms.)", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// // //         { id: 6, name: "Clock", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// // //         { id: 7, name: "Calculator", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// // //         { id: 8, name: "SAM Chart", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// // //         { id: 9, name: "SAM Register", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// // //         { id: 10, name: "Camera", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// // //         { id: 11, name: "File", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// // //         { id: 12, name: "Almirah Rack", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// // //         { id: 13, name: "Almirah", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// // //         { id: 14, name: "Protocol Poster", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// // //         { id: 15, name: "Marker", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// // //         { id: 16, name: "White Board", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// // //         { id: 17, name: "Display Board", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// // //         { id: 18, name: "Tablet", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// // //       ],
// // //       equipmentForExamine: [
// // //         { id: 19, name: "Thermometers", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// // //         { id: 20, name: "Resuscitation equipment", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// // //         { id: 21, name: "NG Tube 6/8 No", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// // //         { id: 22, name: "Suction equipment (low pressure)", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// // //         { id: 23, name: "Blood Transfusion Kit", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// // //         { id: 24, name: "Hb Meter", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// // //         { id: 25, name: "Glucometer", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// // //       ],
// // //       ward: [
// // //         { id: 26, name: "Bed", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// // //         { id: 27, name: "Side Table", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// // //         { id: 28, name: "IV Stand", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// // //         { id: 29, name: "Room Heater", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// // //         { id: 30, name: "Cooler / AC", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// // //         { id: 31, name: "Fan (inward/ weighing area/playing area)", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// // //         { id: 32, name: "Table / Chair", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// // //         { id: 33, name: "Dustbin", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// // //         { id: 34, name: "Shoe Rack", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// // //         { id: 35, name: "TV - Ward and Play Area", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// // //         { id: 36, name: "Inverter", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// // //         { id: 37, name: "Toys for structural play", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// // //         { id: 38, name: "Nutrition Counselling Flip Books", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// // //       ],
// // //       other: [
// // //         { id: 39, name: "Washing Machine Automatic", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// // //         { id: 40, name: "Geyser", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// // //         { id: 41, name: "Computer With Colour printer For reporting", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// // //         { id: 42, name: "Bed Sheet - for Ward", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// // //         { id: 43, name: "Medicine Tray", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// // //         { id: 44, name: "Curtains for Window and Door", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// // //         { id: 45, name: "Tube light", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// // //         { id: 46, name: "Bulb", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// // //       ],
// // //       kitchenEquipment: [
// // //         { id: 47, name: "Cooking Gas", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// // //         { id: 48, name: "Dietary Scale (Upto 1 gm Sensitive)", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// // //         { id: 49, name: "Measuring Jar", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// // //         { id: 50, name: "Electric Mixer Blender", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// // //         { id: 51, name: "Water Filter / RO", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// // //         { id: 52, name: "Refrigerator", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// // //         { id: 53, name: "Utensils for Kitchen", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// // //         { id: 54, name: "Measuring Cup, Glass, Spoon", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// // //         { id: 55, name: "Pressure Cooker", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// // //         { id: 56, name: "Steel Container", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// // //         { id: 57, name: "Tablet", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// // //         { id: 58, name: "Steel Bucket with Mug", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// // //         { id: 59, name: "Steel Plate, Bowl, Glass, Spoon", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// // //         { id: 60, name: "Storage Rack", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// // //       ]
// // //     });

// // //   // Extract Logged-in MTC Code and Auto-Fetch
// // //   useEffect(() => {
// // //     const sessionData = sessionStorage.getItem("mtc_user");
// // //     if (sessionData) {
// // //       try {
// // //         const user = JSON.parse(sessionData);
// // //         if (user.mtcCode) {
// // //           setMtcCode(user.mtcCode);
// // //           fetchEquipmentData(user.mtcCode);
// // //         }
// // //       } catch (err) {
// // //         console.error("Session parse error", err);
// // //       }
// // //     }
// // //   }, []);

// // //   // HELPER: Map DB keys back to Frontend Structure
// // //   const mapDBToFrontend = (dbData: Record<string, unknown>): EquipmentData => {
    
// // //     const mapItem = (item: EquipmentItem, prefix: string) => {
// // //       let working = 0;
// // //       let notWorking = 0;
// // //       let total = 0;

// // //       if (prefix === "Infantometer") {
// // //         working = Number(dbData["InfantometerWroking"]) || 0;
// // //         notWorking = Number(dbData["InfantometerNotWroking"]) || 0;
// // //         total = working + notWorking;
// // //       } else if (prefix === "WeingScales") {
// // //         working = Number(dbData["WeingScalesWorking"]) || 0;
// // //         notWorking = Number(dbData["WeingScalesNotworking"]) || 0;
// // //         total = working + notWorking;
// // //       } else {
// // //         working = Number(dbData[`${prefix}Working`]) || 0;
// // //         notWorking = Number(dbData[`${prefix}NotWorking`]) || 0;
        
// // //         const availableCol = dbData[`${prefix}Available`];
// // //         if (availableCol !== undefined && availableCol !== null) {
// // //            total = Number(availableCol);
// // //         } else {
// // //            total = working + notWorking;
// // //         }
// // //       }

// // //       return {
// // //         ...item,
// // //         quantity: total,
// // //         workingQuantity: working,
// // //         availability: total > 0 ? "Available" : "Not Available",
// // //         workingStatus: working > 0 ? "Working" : "Not Working"
// // //       };
// // //     };

// // //     const ID_PREFIX_MAP: Record<number, string> = {
// // //         1: "DigitalWeighingScale", 2: "Stadiometer", 3: "Infantometer", 4: "MUACTape", 
// // //         5: "WeingScales", 6: "Clock", 7: "Calculator", 8: "SAMChart", 9: "SAMRegister", 
// // //         10: "Camera", 11: "File", 12: "AlmiraRake", 13: "Almira", 14: "ProtocolPoster", 
// // //         15: "Marker", 16: "WhiteBoard", 17: "DisplayBoard", 18: "Tab", 
// // //         19: "Thermometers", 20: "Resuscitationequipment", 21: "NGTube68No", 22: "Suctionequipmentlowpressure", 
// // //         23: "BloodTransfusionKit", 24: "HbMeter", 25: "Glucometer", 
// // //         26: "Bed", 27: "SideTable", 28: "IVStand", 29: "RoomHeater", 30: "CoolerAC", 
// // //         31: "Fan", 32: "TabaleChair", 33: "Dustbin", 34: "ShoeRack", 35: "TV", 36: "Inverter", 
// // //         37: "Toys", 38: "NutritionCounselling", 
// // //         39: "WashingMachine", 40: "Geyser", 41: "Computer", 42: "BedSeat", 43: "MedicineTray", 
// // //         44: "PradaWindow", 45: "Tubelight", 46: "Bulb", 
// // //         47: "CookingGas", 48: "DietaryScale", 49: "MeasuringJar", 50: "ElectricMixer", 
// // //         51: "WaterFilter", 52: "Refrigerator", 53: "Utensil", 54: "MeasuringCup", 
// // //         55: "PressureCooker", 56: "SteelContainer", 57: "TabKitchen", 58: "BaltiSteel", 
// // //         59: "SteelPlate", 60: "StoreRack"
// // //     };
    
// // //     const newScreeningRoom = equipmentData.screeningRoom.map(item => 
// // //       ID_PREFIX_MAP[item.id] ? mapItem(item, ID_PREFIX_MAP[item.id]) : item
// // //     );

// // //     const newEquipmentForExamine = equipmentData.equipmentForExamine.map(item => 
// // //       ID_PREFIX_MAP[item.id] ? mapItem(item, ID_PREFIX_MAP[item.id]) : item
// // //     );

// // //     const newWard = equipmentData.ward.map(item => 
// // //       ID_PREFIX_MAP[item.id] ? mapItem(item, ID_PREFIX_MAP[item.id]) : item
// // //     );

// // //     const newOther = equipmentData.other.map(item => 
// // //       ID_PREFIX_MAP[item.id] ? mapItem(item, ID_PREFIX_MAP[item.id]) : item
// // //     );

// // //     const newKitchenEquipment = equipmentData.kitchenEquipment.map(item => 
// // //       ID_PREFIX_MAP[item.id] ? mapItem(item, ID_PREFIX_MAP[item.id]) : item
// // //     );

// // //     if (dbData.LastUpdated && typeof dbData.LastUpdated === 'string') {
// // //         setLastUpdated(new Date(dbData.LastUpdated).toLocaleString());
// // //     }

// // //     return {
// // //       screeningRoom: newScreeningRoom,
// // //       equipmentForExamine: newEquipmentForExamine,
// // //       ward: newWard,
// // //       other: newOther,
// // //       kitchenEquipment: newKitchenEquipment
// // //     };
// // //   };

// // //   const fetchEquipmentData = async (code: string) => {
// // //     setIsLoading(true);
// // //     try {
// // //       const response = await fetch(`/api/equipment?mtcCode=${encodeURIComponent(code)}`);
// // //       const json = await response.json();
      
// // //       if (response.ok) {
// // //         if(json.lastUpdated) {
// // //             setLastUpdated(new Date(json.lastUpdated).toLocaleDateString());
// // //         }
        
// // //         if (json.data) {
// // //           const mappedData = mapDBToFrontend(json.data);
// // //           setEquipmentData(mappedData);
// // //           toast.success("Data loaded for " + code);
// // //         }
// // //       } else {
// // //         toast.error("No equipment data found for " + code);
// // //       }
// // //     } catch (error) {
// // //       console.error("Fetch error:", error);
// // //       toast.error("Failed to fetch data");
// // //     } finally {
// // //       setIsLoading(false);
// // //     }
// // //   };

// // //   const handleView = () => {
// // //     if (!mtcCode) {
// // //       toast.error("MTC Code not found. Please log in again.");
// // //       return;
// // //     }
// // //     fetchEquipmentData(mtcCode);
// // //   };

// // //   const handleEdit = async () => {
// // //     if (!mtcCode) {
// // //       toast.error("MTC Code not found. Please log in again.");
// // //       return;
// // //     }

// // //     if (!isEditing) {
// // //       setIsEditing(true);
// // //       toast.success("Edit mode enabled for " + mtcCode);
// // //     } else {
// // //       setIsLoading(true);
// // //       try {
// // //         const response = await fetch('/api/equipment', {
// // //           method: 'POST',
// // //           headers: { 'Content-Type': 'application/json' },
// // //           body: JSON.stringify({ 
// // //             equipmentData,
// // //             mtcCode: mtcCode 
// // //           })
// // //         });

// // //         if (response.ok) {
// // //           toast.success("Changes saved successfully");
// // //           setLastUpdated(new Date().toLocaleDateString());
// // //           setIsEditing(false);
// // //         } else {
// // //           toast.error("Failed to save changes");
// // //         }
// // //       } catch (error) {
// // //         console.error(error);
// // //         toast.error("Server error while saving");
// // //       } finally {
// // //         setIsLoading(false);
// // //       }
// // //     }
// // //   };

// // //   const handleBackToHome = () => {
// // //     router.push("/mtc-user/dashboard/home");
// // //   };

// // //   const updateEquipmentField = (
// // //     category: keyof EquipmentData,
// // //     id: number,
// // //     field: keyof EquipmentItem,
// // //     value: string | number
// // //   ) => {
// // //     setEquipmentData(prev => ({
// // //       ...prev,
// // //       [category]: prev[category].map(item =>
// // //         item.id === id ? { ...item, [field]: value } : item
// // //       )
// // //     }));
// // //   };

// // //   const renderEquipmentRow = (item: EquipmentItem, category: keyof EquipmentData) => (
// // //     <tr key={item.id} className={item.id % 2 === 0 ? "bg-white" : "bg-gray-50"}>
// // //       <td className="py-2 px-2 sm:px-4 text-xs sm:text-sm">
// // //         {item.name}
// // //       </td>
// // //       <td className="py-2 px-2 sm:px-4 text-center">
// // //         {isEditing ? (
// // //           <select
// // //             className="w-full px-2 py-1 text-xs border rounded"
// // //             value={item.availability}
// // //             onChange={(e) => updateEquipmentField(category, item.id, "availability", e.target.value)}
// // //           >
// // //             <option value="">Select</option>
// // //             <option value="Available">Available</option>
// // //             <option value="Not Available">Not Available</option>
// // //           </select>
// // //         ) : (
// // //           <span className="text-xs sm:text-sm">{item.availability}</span>
// // //         )}
// // //       </td>
// // //       <td className="py-2 px-2 sm:px-4 text-center">
// // //         {isEditing ? (
// // //           <Input
// // //             type="number"
// // //             className="w-full text-xs"
// // //             value={item.quantity}
// // //             onChange={(e) => updateEquipmentField(category, item.id, "quantity", parseInt(e.target.value) || 0)}
// // //           />
// // //         ) : (
// // //           <span className="text-xs sm:text-sm">{item.quantity}</span>
// // //         )}
// // //       </td>
// // //       <td className="py-2 px-2 sm:px-4 text-center">
// // //         {isEditing ? (
// // //           <select
// // //             className="w-full px-2 py-1 text-xs border rounded"
// // //             value={item.workingStatus}
// // //             onChange={(e) => updateEquipmentField(category, item.id, "workingStatus", e.target.value)}
// // //           >
// // //             <option value="">Select</option>
// // //             <option value="Working">Working</option>
// // //             <option value="Not Working">Not Working</option>
// // //           </select>
// // //         ) : (
// // //           <span className="text-xs sm:text-sm">{item.workingStatus}</span>
// // //         )}
// // //       </td>
// // //       <td className="py-2 px-2 sm:px-4 text-center">
// // //         {isEditing ? (
// // //           <Input
// // //             type="number"
// // //             className="w-full text-xs"
// // //             value={item.workingQuantity}
// // //             onChange={(e) => updateEquipmentField(category, item.id, "workingQuantity", parseInt(e.target.value) || 0)}
// // //           />
// // //         ) : (
// // //           <span className="text-xs sm:text-sm">{item.workingQuantity}</span>
// // //         )}
// // //       </td>
// // //     </tr>
// // //   );

// // //   return (
// // //     <div className="min-h-screen bg-gray-100 py-4 sm:py-6 md:py-8 lg:py-10 px-2 sm:px-4 md:px-6">
// // //       <Toaster position="top-right" />

// // //       <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
// // //         {/* Header */}
// // //         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
// // //           <div>
// // //              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">
// // //                Equipment Status
// // //              </h1>
// // //              {mtcCode && <p className="text-sm font-medium text-gray-500 mt-1">Logged in as: {mtcCode}</p>}
// // //           </div>
// // //           <div className="flex gap-2 sm:gap-3">
// // //             <Button
// // //               onClick={handleBackToHome}
// // //               variant="outline"
// // //               className="border-gray-600 text-gray-700 hover:bg-gray-100 transition text-xs sm:text-sm"
// // //             >
// // //               <Home className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" /> 
// // //               <span className="hidden sm:inline">Back to Home</span>
// // //               <span className="sm:hidden">Home</span>
// // //             </Button>
// // //           </div>
// // //         </div>

// // //         {/* Filters Section */}
// // //         <Card className="shadow-sm border border-gray-200">
// // //           <CardContent className="pt-4 sm:pt-6">
// // //             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 items-end">
// // //               <div>
// // //                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
// // //                   Year
// // //                 </label>
// // //                 <select 
// // //                   className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
// // //                   value={selectedYear}
// // //                   onChange={(e) => setSelectedYear(e.target.value)}
// // //                 >
// // //                   <option value="">Select Year</option>
// // //                   <option value="2023">2023</option>
// // //                   <option value="2024">2024</option>
// // //                   <option value="2025">2025</option>
// // //                   <option value="2026">2026</option>
// // //                 </select>
// // //               </div>
              
// // //               <div>
// // //                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
// // //                   Quarter
// // //                 </label>
// // //                 <select 
// // //                   className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
// // //                   value={selectedQuarter}
// // //                   onChange={(e) => setSelectedQuarter(e.target.value)}
// // //                 >
// // //                   <option value="">Select Quarter</option>
// // //                   <option value="1">Q1</option>
// // //                   <option value="2">Q2</option>
// // //                   <option value="3">Q3</option>
// // //                   <option value="4">Q4</option>
// // //                 </select>
// // //               </div>
              
// // //               <div className="flex gap-2">
// // //                 <Button
// // //                   onClick={handleView}
// // //                   disabled={isLoading}
// // //                   className="bg-indigo-600 hover:bg-indigo-700 flex-1"
// // //                 >
// // //                   {isLoading ? <Loader2 className="animate-spin h-4 w-4 mr-1" /> : <Eye className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />}
// // //                   <span className="text-xs sm:text-sm">View</span>
// // //                 </Button>
                
// // //                 <Button
// // //                   onClick={handleEdit}
// // //                   disabled={isLoading}
// // //                   className={isEditing ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"}
// // //                 >
// // //                   {isLoading ? (
// // //                     <Loader2 className="animate-spin h-4 w-4 mr-1" />
// // //                   ) : isEditing ? (
// // //                     <>
// // //                       <Save className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
// // //                       <span className="text-xs sm:text-sm">Save</span>
// // //                     </>
// // //                   ) : (
// // //                     <>
// // //                       <Edit className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
// // //                       <span className="text-xs sm:text-sm">Edit</span>
// // //                     </>
// // //                   )}
// // //                 </Button>
// // //               </div>
// // //             </div>
// // //           </CardContent>
// // //         </Card>

// // //         {/* Equipment Table */}
// // //         <Card className="shadow-sm border border-gray-200">
// // //           <CardHeader className="pb-2 sm:pb-4">
// // //             <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
// // //               Summary Table <span className="text-sm font-normal">(Last Updated on {lastUpdated})</span>
// // //             </h2>
// // //           </CardHeader>
// // //           <CardContent>
// // //             <div className="overflow-x-auto rounded-lg">
// // //               <table className="min-w-full text-xs sm:text-sm text-gray-700 border-collapse">
// // //                 <thead>
// // //                   <tr className="bg-indigo-50 text-indigo-700 border-b border-gray-200">
// // //                     <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold">Equipment</th>
// // //                     <th className="py-2 sm:py-3 px-2 sm:px-4 text-center font-semibold">Availability</th>
// // //                     <th className="py-2 sm:py-3 px-2 sm:px-4 text-center font-semibold">Number of items</th>
// // //                     <th className="py-2 sm:py-3 px-2 sm:px-4 text-center font-semibold">Working/Not Working</th>
// // //                     <th className="py-2 sm:py-3 px-2 sm:px-4 text-center font-semibold">Number of Working items</th>
// // //                   </tr>
// // //                 </thead>
// // //                 <tbody>
// // //                   <tr className="bg-gray-100 font-semibold">
// // //                     <td colSpan={5} className="py-2 px-2 sm:px-4">A. SCREENING ROOM</td>
// // //                   </tr>
// // //                   {equipmentData.screeningRoom.map(item => renderEquipmentRow(item, "screeningRoom"))}
                  
// // //                   <tr className="bg-gray-100 font-semibold"><td colSpan={5} className="py-2 px-2 sm:px-4">B. EQUIPMENT FOR EXAMINE</td></tr>
// // //                   {equipmentData.equipmentForExamine.map(item => renderEquipmentRow(item, "equipmentForExamine"))}

// // //                   <tr className="bg-gray-100 font-semibold"><td colSpan={5} className="py-2 px-2 sm:px-4">C. WARD</td></tr>
// // //                   {equipmentData.ward.map(item => renderEquipmentRow(item, "ward"))}

// // //                   <tr className="bg-gray-100 font-semibold"><td colSpan={5} className="py-2 px-2 sm:px-4">D. OTHER</td></tr>
// // //                   {equipmentData.other.map(item => renderEquipmentRow(item, "other"))}

// // //                   <tr className="bg-gray-100 font-semibold"><td colSpan={5} className="py-2 px-2 sm:px-4">E. KITCHEN EQUIPMENT UTENSILS</td></tr>
// // //                   {equipmentData.kitchenEquipment.map(item => renderEquipmentRow(item, "kitchenEquipment"))}
// // //                 </tbody>
// // //               </table>
// // //             </div>
// // //           </CardContent>
// // //         </Card>
// // //       </div>
// // //     </div>
// // //   );
// // // }\


// // "use client";

// // import { useState, useEffect } from "react";
// // import { useRouter } from "next/navigation";
// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import { Card, CardHeader, CardContent } from "@/components/ui/card";
// // import { Edit, Eye, Home, Save, Loader2 } from "lucide-react";
// // import toast, { Toaster } from "react-hot-toast";

// // interface EquipmentItem {
// //   id: number;
// //   name: string;
// //   availability: string;
// //   quantity: number;
// //   workingStatus: string;
// //   workingQuantity: number;
// // }

// // interface EquipmentData {
// //   screeningRoom: EquipmentItem[];
// //   equipmentForExamine: EquipmentItem[];
// //   ward: EquipmentItem[];
// //   other: EquipmentItem[];
// //   kitchenEquipment: EquipmentItem[];
// // }

// // export default function EquipmentStatus() {
// //   const router = useRouter();
// //   const [selectedYear, setSelectedYear] = useState("");
// //   const [selectedQuarter, setSelectedQuarter] = useState("");
// //   const [isEditing, setIsEditing] = useState(false);
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [lastUpdated, setLastUpdated] = useState("Not updated yet");
// //   const [mtcCode, setMtcCode] = useState<string>("");
  
// //   // Default State (Used if a new MTC logs in and has no data yet)
// //   const [equipmentData, setEquipmentData] = useState<EquipmentData>({
// //       screeningRoom: [
// //         { id: 1, name: "Digital Weighing Scale", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// //         { id: 2, name: "Stadiometer", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// //         { id: 3, name: "Infantometer", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// //         { id: 4, name: "MUAC Tape", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// //         { id: 5, name: "Weighing scales (to weigh to 5 gms.)", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// //         { id: 6, name: "Clock", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// //         { id: 7, name: "Calculator", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// //         { id: 8, name: "SAM Chart", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// //         { id: 9, name: "SAM Register", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// //         { id: 10, name: "Camera", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// //         { id: 11, name: "File", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// //         { id: 12, name: "Almirah Rack", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// //         { id: 13, name: "Almirah", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// //         { id: 14, name: "Protocol Poster", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// //         { id: 15, name: "Marker", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// //         { id: 16, name: "White Board", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// //         { id: 17, name: "Display Board", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// //         { id: 18, name: "Tablet", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// //       ],
// //       equipmentForExamine: [
// //         { id: 19, name: "Thermometers", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// //         { id: 20, name: "Resuscitation equipment", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// //         { id: 21, name: "NG Tube 6/8 No", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// //         { id: 22, name: "Suction equipment (low pressure)", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// //         { id: 23, name: "Blood Transfusion Kit", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// //         { id: 24, name: "Hb Meter", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// //         { id: 25, name: "Glucometer", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// //       ],
// //       ward: [
// //         { id: 26, name: "Bed", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// //         { id: 27, name: "Side Table", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// //         { id: 28, name: "IV Stand", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// //         { id: 29, name: "Room Heater", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// //         { id: 30, name: "Cooler / AC", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// //         { id: 31, name: "Fan (inward/ weighing area/playing area)", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// //         { id: 32, name: "Table / Chair", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// //         { id: 33, name: "Dustbin", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// //         { id: 34, name: "Shoe Rack", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// //         { id: 35, name: "TV - Ward and Play Area", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// //         { id: 36, name: "Inverter", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// //         { id: 37, name: "Toys for structural play", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// //         { id: 38, name: "Nutrition Counselling Flip Books", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// //       ],
// //       other: [
// //         { id: 39, name: "Washing Machine Automatic", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// //         { id: 40, name: "Geyser", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// //         { id: 41, name: "Computer With Colour printer For reporting", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// //         { id: 42, name: "Bed Sheet - for Ward", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// //         { id: 43, name: "Medicine Tray", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// //         { id: 44, name: "Curtains for Window and Door", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// //         { id: 45, name: "Tube light", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// //         { id: 46, name: "Bulb", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// //       ],
// //       kitchenEquipment: [
// //         { id: 47, name: "Cooking Gas", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// //         { id: 48, name: "Dietary Scale (Upto 1 gm Sensitive)", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// //         { id: 49, name: "Measuring Jar", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// //         { id: 50, name: "Electric Mixer Blender", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// //         { id: 51, name: "Water Filter / RO", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// //         { id: 52, name: "Refrigerator", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// //         { id: 53, name: "Utensils for Kitchen", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// //         { id: 54, name: "Measuring Cup, Glass, Spoon", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// //         { id: 55, name: "Pressure Cooker", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// //         { id: 56, name: "Steel Container", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// //         { id: 57, name: "Tablet", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// //         { id: 58, name: "Steel Bucket with Mug", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// //         { id: 59, name: "Steel Plate, Bowl, Glass, Spoon", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// //         { id: 60, name: "Storage Rack", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
// //       ]
// //     });

// //   // Extract Logged-in MTC Code and Auto-Fetch
// //   useEffect(() => {
// //     const sessionData = sessionStorage.getItem("mtc_user");
// //     if (sessionData) {
// //       try {
// //         const user = JSON.parse(sessionData);
// //         if (user.mtcCode) {
// //           setMtcCode(user.mtcCode);
// //           fetchEquipmentData(user.mtcCode);
// //         }
// //       } catch (err) {
// //         console.error("Session parse error", err);
// //       }
// //     }
// //   }, []);

// //   // Fetch Data from DB
// //   const fetchEquipmentData = async (code: string) => {
// //     setIsLoading(true);
// //     try {
// //       const response = await fetch(`/api/equipment?mtcCode=${encodeURIComponent(code)}`);
// //       const json = await response.json();
      
// //       if (response.ok && json.success) {
// //         if (json.data) {
// //           // Returning user: Load their saved data
// //           if(json.lastUpdated) {
// //               setLastUpdated(new Date(json.lastUpdated).toLocaleString());
// //           }
// //           setEquipmentData(json.data);
// //           toast.success("Equipment data loaded for " + code);
// //         } else {
// //           // First-time user: No data yet, just show them the default empty form
// //           toast.success("Ready to record equipment for " + code);
// //         }
// //       } else {
// //         toast.error("Failed to load equipment data.");
// //       }
// //     } catch (error) {
// //       console.error("Fetch error:", error);
// //       toast.error("Failed to fetch data");
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const handleView = () => {
// //     if (!mtcCode) {
// //       toast.error("MTC Code not found. Please log in again.");
// //       return;
// //     }
// //     fetchEquipmentData(mtcCode);
// //   };

// //   const handleEdit = async () => {
// //     if (!mtcCode) {
// //       toast.error("MTC Code not found. Please log in again.");
// //       return;
// //     }

// //     if (!isEditing) {
// //       setIsEditing(true);
// //       toast.success("Edit mode enabled for " + mtcCode);
// //     } else {
// //       setIsLoading(true);
// //       try {
// //         const response = await fetch('/api/equipment', {
// //           method: 'POST',
// //           headers: { 'Content-Type': 'application/json' },
// //           body: JSON.stringify({ 
// //             equipmentData,
// //             mtcCode: mtcCode 
// //           })
// //         });

// //         if (response.ok) {
// //           toast.success("Changes saved successfully");
// //           setLastUpdated(new Date().toLocaleString());
// //           setIsEditing(false);
// //         } else {
// //           toast.error("Failed to save changes");
// //         }
// //       } catch (error) {
// //         console.error(error);
// //         toast.error("Server error while saving");
// //       } finally {
// //         setIsLoading(false);
// //       }
// //     }
// //   };

// //   const handleBackToHome = () => {
// //     router.push("/mtc-user/dashboard/home");
// //   };

// //   const updateEquipmentField = (
// //     category: keyof EquipmentData,
// //     id: number,
// //     field: keyof EquipmentItem,
// //     value: string | number
// //   ) => {
// //     setEquipmentData(prev => ({
// //       ...prev,
// //       [category]: prev[category].map(item =>
// //         item.id === id ? { ...item, [field]: value } : item
// //       )
// //     }));
// //   };

// //   const renderEquipmentRow = (item: EquipmentItem, category: keyof EquipmentData) => (
// //     <tr key={item.id} className={item.id % 2 === 0 ? "bg-white" : "bg-gray-50"}>
// //       <td className="py-2 px-2 sm:px-4 text-xs sm:text-sm">
// //         {item.name}
// //       </td>
// //       <td className="py-2 px-2 sm:px-4 text-center">
// //         {isEditing ? (
// //           <select
// //             className="w-full px-2 py-1 text-xs border rounded"
// //             value={item.availability}
// //             onChange={(e) => updateEquipmentField(category, item.id, "availability", e.target.value)}
// //           >
// //             <option value="">Select</option>
// //             <option value="Available">Available</option>
// //             <option value="Not Available">Not Available</option>
// //           </select>
// //         ) : (
// //           <span className="text-xs sm:text-sm">{item.availability}</span>
// //         )}
// //       </td>
// //       <td className="py-2 px-2 sm:px-4 text-center">
// //         {isEditing ? (
// //           <Input
// //             type="number"
// //             className="w-full text-xs"
// //             value={item.quantity}
// //             onChange={(e) => updateEquipmentField(category, item.id, "quantity", parseInt(e.target.value) || 0)}
// //           />
// //         ) : (
// //           <span className="text-xs sm:text-sm">{item.quantity}</span>
// //         )}
// //       </td>
// //       <td className="py-2 px-2 sm:px-4 text-center">
// //         {isEditing ? (
// //           <select
// //             className="w-full px-2 py-1 text-xs border rounded"
// //             value={item.workingStatus}
// //             onChange={(e) => updateEquipmentField(category, item.id, "workingStatus", e.target.value)}
// //           >
// //             <option value="">Select</option>
// //             <option value="Working">Working</option>
// //             <option value="Not Working">Not Working</option>
// //           </select>
// //         ) : (
// //           <span className="text-xs sm:text-sm">{item.workingStatus}</span>
// //         )}
// //       </td>
// //       <td className="py-2 px-2 sm:px-4 text-center">
// //         {isEditing ? (
// //           <Input
// //             type="number"
// //             className="w-full text-xs"
// //             value={item.workingQuantity}
// //             onChange={(e) => updateEquipmentField(category, item.id, "workingQuantity", parseInt(e.target.value) || 0)}
// //           />
// //         ) : (
// //           <span className="text-xs sm:text-sm">{item.workingQuantity}</span>
// //         )}
// //       </td>
// //     </tr>
// //   );

// //   return (
// //     <div className="min-h-screen bg-gray-100 py-4 sm:py-6 md:py-8 lg:py-10 px-2 sm:px-4 md:px-6">
// //       <Toaster position="top-right" />

// //       <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
// //         {/* Header */}
// //         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
// //           <div>
// //              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">
// //                Equipment Status
// //              </h1>
// //              {mtcCode && <p className="text-sm font-medium text-gray-500 mt-1">Logged in as: {mtcCode}</p>}
// //           </div>
// //           <div className="flex gap-2 sm:gap-3">
// //             <Button
// //               onClick={handleBackToHome}
// //               variant="outline"
// //               className="border-gray-600 text-gray-700 hover:bg-gray-100 transition text-xs sm:text-sm"
// //             >
// //               <Home className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" /> 
// //               <span className="hidden sm:inline">Back to Home</span>
// //               <span className="sm:hidden">Home</span>
// //             </Button>
// //           </div>
// //         </div>

// //         {/* Filters Section */}
// //         <Card className="shadow-sm border border-gray-200">
// //           <CardContent className="pt-4 sm:pt-6">
// //             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 items-end">
// //               <div>
// //                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
// //                   Year
// //                 </label>
// //                 <select 
// //                   className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
// //                   value={selectedYear}
// //                   onChange={(e) => setSelectedYear(e.target.value)}
// //                 >
// //                   <option value="">Select Year</option>
// //                   <option value="2023">2023</option>
// //                   <option value="2024">2024</option>
// //                   <option value="2025">2025</option>
// //                   <option value="2026">2026</option>
// //                 </select>
// //               </div>
              
// //               <div>
// //                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
// //                   Quarter
// //                 </label>
// //                 <select 
// //                   className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
// //                   value={selectedQuarter}
// //                   onChange={(e) => setSelectedQuarter(e.target.value)}
// //                 >
// //                   <option value="">Select Quarter</option>
// //                   <option value="1">Q1</option>
// //                   <option value="2">Q2</option>
// //                   <option value="3">Q3</option>
// //                   <option value="4">Q4</option>
// //                 </select>
// //               </div>
              
// //               <div className="flex gap-2">
// //                 <Button
// //                   onClick={handleView}
// //                   disabled={isLoading}
// //                   className="bg-indigo-600 hover:bg-indigo-700 flex-1"
// //                 >
// //                   {isLoading ? <Loader2 className="animate-spin h-4 w-4 mr-1" /> : <Eye className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />}
// //                   <span className="text-xs sm:text-sm">View</span>
// //                 </Button>
                
// //                 <Button
// //                   onClick={handleEdit}
// //                   disabled={isLoading}
// //                   className={isEditing ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"}
// //                 >
// //                   {isLoading ? (
// //                     <Loader2 className="animate-spin h-4 w-4 mr-1" />
// //                   ) : isEditing ? (
// //                     <>
// //                       <Save className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
// //                       <span className="text-xs sm:text-sm">Save</span>
// //                     </>
// //                   ) : (
// //                     <>
// //                       <Edit className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
// //                       <span className="text-xs sm:text-sm">Edit</span>
// //                     </>
// //                   )}
// //                 </Button>
// //               </div>
// //             </div>
// //           </CardContent>
// //         </Card>

// //         {/* Equipment Table */}
// //         <Card className="shadow-sm border border-gray-200">
// //           <CardHeader className="pb-2 sm:pb-4">
// //             <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
// //               Summary Table <span className="text-sm font-normal">(Last Updated on {lastUpdated})</span>
// //             </h2>
// //           </CardHeader>
// //           <CardContent>
// //             <div className="overflow-x-auto rounded-lg">
// //               <table className="min-w-full text-xs sm:text-sm text-gray-700 border-collapse">
// //                 <thead>
// //                   <tr className="bg-indigo-50 text-indigo-700 border-b border-gray-200">
// //                     <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold">Equipment</th>
// //                     <th className="py-2 sm:py-3 px-2 sm:px-4 text-center font-semibold">Availability</th>
// //                     <th className="py-2 sm:py-3 px-2 sm:px-4 text-center font-semibold">Number of items</th>
// //                     <th className="py-2 sm:py-3 px-2 sm:px-4 text-center font-semibold">Working/Not Working</th>
// //                     <th className="py-2 sm:py-3 px-2 sm:px-4 text-center font-semibold">Number of Working items</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   <tr className="bg-gray-100 font-semibold">
// //                     <td colSpan={5} className="py-2 px-2 sm:px-4">A. SCREENING ROOM</td>
// //                   </tr>
// //                   {equipmentData.screeningRoom.map(item => renderEquipmentRow(item, "screeningRoom"))}
                  
// //                   <tr className="bg-gray-100 font-semibold"><td colSpan={5} className="py-2 px-2 sm:px-4">B. EQUIPMENT FOR EXAMINE</td></tr>
// //                   {equipmentData.equipmentForExamine.map(item => renderEquipmentRow(item, "equipmentForExamine"))}

// //                   <tr className="bg-gray-100 font-semibold"><td colSpan={5} className="py-2 px-2 sm:px-4">C. WARD</td></tr>
// //                   {equipmentData.ward.map(item => renderEquipmentRow(item, "ward"))}

// //                   <tr className="bg-gray-100 font-semibold"><td colSpan={5} className="py-2 px-2 sm:px-4">D. OTHER</td></tr>
// //                   {equipmentData.other.map(item => renderEquipmentRow(item, "other"))}

// //                   <tr className="bg-gray-100 font-semibold"><td colSpan={5} className="py-2 px-2 sm:px-4">E. KITCHEN EQUIPMENT UTENSILS</td></tr>
// //                   {equipmentData.kitchenEquipment.map(item => renderEquipmentRow(item, "kitchenEquipment"))}
// //                 </tbody>
// //               </table>
// //             </div>
// //           </CardContent>
// //         </Card>
// //       </div>
// //     </div>
// //   );
// // }

// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardHeader, CardContent } from "@/components/ui/card";
// import { Edit, Eye, Home, Save, Loader2 } from "lucide-react";
// import toast, { Toaster } from "react-hot-toast";

// interface EquipmentItem {
//   id: number;
//   name: string;
//   availability: string;
//   quantity: number;
//   workingStatus: string;
//   workingQuantity: number;
// }

// interface EquipmentData {
//   screeningRoom: EquipmentItem[];
//   equipmentForExamine: EquipmentItem[];
//   ward: EquipmentItem[];
//   other: EquipmentItem[];
//   kitchenEquipment: EquipmentItem[];
// }

// export default function EquipmentStatus() {
//   const router = useRouter();
//   const [selectedYear, setSelectedYear] = useState("");
//   const [selectedQuarter, setSelectedQuarter] = useState("");
//   const [isEditing, setIsEditing] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [lastUpdated, setLastUpdated] = useState("Not updated yet");
//   const [mtcCode, setMtcCode] = useState<string>("");
  
//   // 1. Added state for mtcName
//   const [mtcName, setMtcName] = useState<string>("");

//   // Default State
//   const [equipmentData, setEquipmentData] = useState<EquipmentData>({
//     screeningRoom: [
//       { id: 1, name: "Digital Weighing Scale", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
//       { id: 2, name: "Stadiometer", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
//       { id: 3, name: "Infantometer", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
//       { id: 4, name: "MUAC Tape", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
//       { id: 5, name: "Weighing scales (to weigh to 5 gms.)", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
//       { id: 6, name: "Clock", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
//       { id: 7, name: "Calculator", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
//       { id: 8, name: "SAM Chart", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
//       { id: 9, name: "SAM Register", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
//       { id: 10, name: "Camera", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
//       { id: 11, name: "File", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
//       { id: 12, name: "Almirah Rack", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
//       { id: 13, name: "Almirah", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
//       { id: 14, name: "Protocol Poster", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
//       { id: 15, name: "Marker", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
//       { id: 16, name: "White Board", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
//       { id: 17, name: "Display Board", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
//       { id: 18, name: "Tablet", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
//     ],
//     equipmentForExamine: [
//       { id: 19, name: "Thermometers", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
//       { id: 20, name: "Resuscitation equipment", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
//       { id: 21, name: "NG Tube 6/8 No", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
//       { id: 22, name: "Suction equipment (low pressure)", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
//       { id: 23, name: "Blood Transfusion Kit", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
//       { id: 24, name: "Hb Meter", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
//       { id: 25, name: "Glucometer", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
//     ],
//     ward: [
//       { id: 26, name: "Bed", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
//       { id: 27, name: "Side Table", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
//       { id: 28, name: "IV Stand", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
//       { id: 29, name: "Room Heater", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
//       { id: 30, name: "Cooler / AC", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
//       { id: 31, name: "Fan (inward/ weighing area/playing area)", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
//       { id: 32, name: "Table / Chair", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
//       { id: 33, name: "Dustbin", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
//       { id: 34, name: "Shoe Rack", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
//       { id: 35, name: "TV - Ward and Play Area", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
//       { id: 36, name: "Inverter", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
//       { id: 37, name: "Toys for structural play", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
//       { id: 38, name: "Nutrition Counselling Flip Books", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
//     ],
//     other: [
//       { id: 39, name: "Washing Machine Automatic", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
//       { id: 40, name: "Geyser", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
//       { id: 41, name: "Computer With Colour printer For reporting", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
//       { id: 42, name: "Bed Sheet - for Ward", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
//       { id: 43, name: "Medicine Tray", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
//       { id: 44, name: "Curtains for Window and Door", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
//       { id: 45, name: "Tube light", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
//       { id: 46, name: "Bulb", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
//     ],
//     kitchenEquipment: [
//       { id: 47, name: "Cooking Gas", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
//       { id: 48, name: "Dietary Scale (Upto 1 gm Sensitive)", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
//       { id: 49, name: "Measuring Jar", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
//       { id: 50, name: "Electric Mixer Blender", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
//       { id: 51, name: "Water Filter / RO", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
//       { id: 52, name: "Refrigerator", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
//       { id: 53, name: "Utensils for Kitchen", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
//       { id: 54, name: "Measuring Cup, Glass, Spoon", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
//       { id: 55, name: "Pressure Cooker", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
//       { id: 56, name: "Steel Container", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
//       { id: 57, name: "Tablet", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
//       { id: 58, name: "Steel Bucket with Mug", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
//       { id: 59, name: "Steel Plate, Bowl, Glass, Spoon", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
//       { id: 60, name: "Storage Rack", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
//     ]
//   });

//   // 2. Extract Logged-in MTC Name & Code
//   useEffect(() => {
//     const sessionData = sessionStorage.getItem("mtc_user");
//     if (sessionData) {
//       try {
//         const user = JSON.parse(sessionData);
//         if (user.mtcCode) setMtcCode(user.mtcCode);
//         if (user.mtcName) setMtcName(user.mtcName); // Read mtcName from session
        
//         if (user.mtcCode) {
//           fetchEquipmentData(user.mtcCode);
//         }
//       } catch (err) {
//         console.error("Session parse error", err);
//       }
//     }
//   }, []);

//   // Fetch Data from DB
//   const fetchEquipmentData = async (code: string) => {
//     setIsLoading(true);
//     try {
//       const response = await fetch(`/api/equipment?mtcCode=${encodeURIComponent(code)}`);
//       const json = await response.json();
      
//       if (response.ok && json.success) {
//         if (json.data) {
//           if (json.lastUpdated) {
//             setLastUpdated(new Date(json.lastUpdated).toLocaleString());
//           }
//           setEquipmentData(json.data);
//           toast.success("Equipment data loaded");
//         } else {
//           toast.success("Ready to record equipment");
//         }
//       } else {
//         toast.error("Failed to load equipment data.");
//       }
//     } catch (error) {
//       console.error("Fetch error:", error);
//       toast.error("Failed to fetch data");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleView = () => {
//     if (!mtcCode) {
//       toast.error("MTC Code not found. Please log in again.");
//       return;
//     }
//     fetchEquipmentData(mtcCode);
//   };

//   const handleEdit = async () => {
//     if (!mtcCode) {
//       toast.error("MTC Code not found. Please log in again.");
//       return;
//     }

//     if (!isEditing) {
//       setIsEditing(true);
//       toast.success("Edit mode enabled");
//     } else {
//       setIsLoading(true);
//       try {
//         const response = await fetch('/api/equipment', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ 
//             equipmentData,
//             mtcCode: mtcCode 
//           })
//         });

//         if (response.ok) {
//           toast.success("Changes saved successfully");
//           setLastUpdated(new Date().toLocaleString());
//           setIsEditing(false);
//         } else {
//           toast.error("Failed to save changes");
//         }
//       } catch (error) {
//         console.error(error);
//         toast.error("Server error while saving");
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };

//   const handleBackToHome = () => {
//     router.push("/mtc-user/dashboard/home");
//   };

//   const updateEquipmentField = (
//     category: keyof EquipmentData,
//     id: number,
//     field: keyof EquipmentItem,
//     value: string | number
//   ) => {
//     setEquipmentData(prev => ({
//       ...prev,
//       [category]: prev[category].map(item =>
//         item.id === id ? { ...item, [field]: value } : item
//       )
//     }));
//   };

//   const renderEquipmentRow = (item: EquipmentItem, category: keyof EquipmentData) => (
//     <tr key={item.id} className={item.id % 2 === 0 ? "bg-white" : "bg-gray-50"}>
//       <td className="py-2 px-2 sm:px-4 text-xs sm:text-sm font-medium">
//         {item.name}
//       </td>
//       <td className="py-2 px-2 sm:px-4 text-center">
//         {isEditing ? (
//           <select
//             className="w-full px-2 py-1 text-xs border rounded focus:ring-1 focus:ring-indigo-500"
//             value={item.availability}
//             onChange={(e) => updateEquipmentField(category, item.id, "availability", e.target.value)}
//           >
//             <option value="">Select</option>
//             <option value="Available">Available</option>
//             <option value="Not Available">Not Available</option>
//           </select>
//         ) : (
//           <span className={`text-xs sm:text-sm ${item.availability === 'Available' ? 'text-green-600 font-medium' : item.availability === 'Not Available' ? 'text-red-500 font-medium' : ''}`}>
//             {item.availability || "-"}
//           </span>
//         )}
//       </td>
//       <td className="py-2 px-2 sm:px-4 text-center">
//         {isEditing ? (
//           <Input
//             type="number"
//             className="w-full text-xs"
//             value={item.quantity}
//             onChange={(e) => updateEquipmentField(category, item.id, "quantity", parseInt(e.target.value) || 0)}
//           />
//         ) : (
//           <span className="text-xs sm:text-sm">{item.quantity}</span>
//         )}
//       </td>
//       <td className="py-2 px-2 sm:px-4 text-center">
//         {isEditing ? (
//           <select
//             className="w-full px-2 py-1 text-xs border rounded focus:ring-1 focus:ring-indigo-500"
//             value={item.workingStatus}
//             onChange={(e) => updateEquipmentField(category, item.id, "workingStatus", e.target.value)}
//           >
//             <option value="">Select</option>
//             <option value="Working">Working</option>
//             <option value="Not Working">Not Working</option>
//           </select>
//         ) : (
//           <span className={`text-xs sm:text-sm ${item.workingStatus === 'Working' ? 'text-green-600 font-medium' : item.workingStatus === 'Not Working' ? 'text-red-500 font-medium' : ''}`}>
//             {item.workingStatus || "-"}
//           </span>
//         )}
//       </td>
//       <td className="py-2 px-2 sm:px-4 text-center">
//         {isEditing ? (
//           <Input
//             type="number"
//             className="w-full text-xs"
//             value={item.workingQuantity}
//             onChange={(e) => updateEquipmentField(category, item.id, "workingQuantity", parseInt(e.target.value) || 0)}
//           />
//         ) : (
//           <span className="text-xs sm:text-sm">{item.workingQuantity}</span>
//         )}
//       </td>
//     </tr>
//   );

//   return (
//     <div className="min-h-screen bg-gray-100 py-4 sm:py-6 md:py-8 lg:py-10 px-2 sm:px-4 md:px-6">
//       <Toaster position="top-right" />

//       <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200">
//           <div>
//              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">
//                Equipment Status
//              </h1>
             
//              {/* 3. Displaying MTC Name & Code dynamically */}
//              <div className="mt-1 flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-600">
//                <span>Logged in as:</span>
//                {mtcName && (
//                  <span className="font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
//                    {mtcName}
//                  </span>
//                )}
//                {mtcCode && (
//                  <span className="font-mono text-gray-500 bg-gray-100 px-2 py-0.5 rounded border border-gray-200">
//                    ({mtcCode})
//                  </span>
//                )}
//              </div>
//           </div>

//           <div className="flex gap-2 sm:gap-3">
//             <Button
//               onClick={handleBackToHome}
//               variant="outline"
//               className="border-gray-600 text-gray-700 hover:bg-gray-100 transition text-xs sm:text-sm"
//             >
//               <Home className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" /> 
//               <span className="hidden sm:inline">Back to Home</span>
//               <span className="sm:hidden">Home</span>
//             </Button>
//           </div>
//         </div>

//         {/* Filters Section */}
//         <Card className="shadow-sm border border-gray-200">
//           <CardContent className="pt-4 sm:pt-6">
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 items-end">
//               <div>
//                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
//                   Year
//                 </label>
//                 <select 
//                   className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                   value={selectedYear}
//                   onChange={(e) => setSelectedYear(e.target.value)}
//                 >
//                   <option value="">Select Year</option>
//                   <option value="2023">2023</option>
//                   <option value="2024">2024</option>
//                   <option value="2025">2025</option>
//                   <option value="2026">2026</option>
//                 </select>
//               </div>
              
//               <div>
//                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
//                   Quarter
//                 </label>
//                 <select 
//                   className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                   value={selectedQuarter}
//                   onChange={(e) => setSelectedQuarter(e.target.value)}
//                 >
//                   <option value="">Select Quarter</option>
//                   <option value="1">Q1</option>
//                   <option value="2">Q2</option>
//                   <option value="3">Q3</option>
//                   <option value="4">Q4</option>
//                 </select>
//               </div>
              
//               <div className="flex gap-2">
//                 <Button
//                   onClick={handleView}
//                   disabled={isLoading}
//                   className="bg-indigo-600 hover:bg-indigo-700 flex-1"
//                 >
//                   {isLoading ? <Loader2 className="animate-spin h-4 w-4 mr-1" /> : <Eye className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />}
//                   <span className="text-xs sm:text-sm">View</span>
//                 </Button>
                
//                 <Button
//                   onClick={handleEdit}
//                   disabled={isLoading}
//                   className={isEditing ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"}
//                 >
//                   {isLoading ? (
//                     <Loader2 className="animate-spin h-4 w-4 mr-1" />
//                   ) : isEditing ? (
//                     <>
//                       <Save className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
//                       <span className="text-xs sm:text-sm">Save</span>
//                     </>
//                   ) : (
//                     <>
//                       <Edit className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
//                       <span className="text-xs sm:text-sm">Edit</span>
//                     </>
//                   )}
//                 </Button>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Equipment Table */}
//         <Card className="shadow-sm border border-gray-200">
//           <CardHeader className="pb-2 sm:pb-4 border-b border-gray-100">
//             <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
//               <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
//                 Summary Table
//               </h2>
//               <span className="text-xs sm:text-sm text-gray-500">
//                 Last Updated: <span className="font-medium text-gray-700">{lastUpdated}</span>
//               </span>
//             </div>
//           </CardHeader>
//           <CardContent className="pt-4">
//             <div className="overflow-x-auto rounded-lg border border-gray-200">
//               <table className="min-w-full text-xs sm:text-sm text-gray-700 border-collapse">
//                 <thead>
//                   <tr className="bg-indigo-50 text-indigo-700 border-b border-gray-200">
//                     <th className="py-2.5 sm:py-3 px-2 sm:px-4 text-left font-semibold">Equipment Name</th>
//                     <th className="py-2.5 sm:py-3 px-2 sm:px-4 text-center font-semibold">Availability</th>
//                     <th className="py-2.5 sm:py-3 px-2 sm:px-4 text-center font-semibold">Total Items</th>
//                     <th className="py-2.5 sm:py-3 px-2 sm:px-4 text-center font-semibold">Working Status</th>
//                     <th className="py-2.5 sm:py-3 px-2 sm:px-4 text-center font-semibold">Working Items</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr className="bg-indigo-100/60 font-semibold text-indigo-900">
//                     <td colSpan={5} className="py-2 px-2 sm:px-4">A. SCREENING ROOM</td>
//                   </tr>
//                   {equipmentData.screeningRoom.map(item => renderEquipmentRow(item, "screeningRoom"))}
                  
//                   <tr className="bg-indigo-100/60 font-semibold text-indigo-900">
//                     <td colSpan={5} className="py-2 px-2 sm:px-4">B. EQUIPMENT FOR EXAMINE</td>
//                   </tr>
//                   {equipmentData.equipmentForExamine.map(item => renderEquipmentRow(item, "equipmentForExamine"))}

//                   <tr className="bg-indigo-100/60 font-semibold text-indigo-900">
//                     <td colSpan={5} className="py-2 px-2 sm:px-4">C. WARD</td>
//                   </tr>
//                   {equipmentData.ward.map(item => renderEquipmentRow(item, "ward"))}

//                   <tr className="bg-indigo-100/60 font-semibold text-indigo-900">
//                     <td colSpan={5} className="py-2 px-2 sm:px-4">D. OTHER</td>
//                   </tr>
//                   {equipmentData.other.map(item => renderEquipmentRow(item, "other"))}

//                   <tr className="bg-indigo-100/60 font-semibold text-indigo-900">
//                     <td colSpan={5} className="py-2 px-2 sm:px-4">E. KITCHEN EQUIPMENT UTENSILS</td>
//                   </tr>
//                   {equipmentData.kitchenEquipment.map(item => renderEquipmentRow(item, "kitchenEquipment"))}
//                 </tbody>
//               </table>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Edit, Eye, Home, Save, Loader2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

interface EquipmentItem {
  id: number;
  name: string;
  availability: string;
  quantity: number;
  workingStatus: string;
  workingQuantity: number;
}

interface EquipmentData {
  screeningRoom: EquipmentItem[];
  equipmentForExamine: EquipmentItem[];
  ward: EquipmentItem[];
  other: EquipmentItem[];
  kitchenEquipment: EquipmentItem[];
}

export default function EquipmentStatus() {
  const router = useRouter();
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedQuarter, setSelectedQuarter] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("Not updated yet");
  
  // User Session Identifiers
  const [mtcCode, setMtcCode] = useState<string>("");
  const [mtcName, setMtcName] = useState<string>("");

  // Default Form Schema
  const [equipmentData, setEquipmentData] = useState<EquipmentData>({
    screeningRoom: [
      { id: 1, name: "Digital Weighing Scale", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 2, name: "Stadiometer", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 3, name: "Infantometer", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 4, name: "MUAC Tape", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 5, name: "Weighing scales (to weigh to 5 gms.)", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 6, name: "Clock", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 7, name: "Calculator", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 8, name: "SAM Chart", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 9, name: "SAM Register", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 10, name: "Camera", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 11, name: "File", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 12, name: "Almirah Rack", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 13, name: "Almirah", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 14, name: "Protocol Poster", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 15, name: "Marker", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 16, name: "White Board", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 17, name: "Display Board", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 18, name: "Tablet", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
    ],
    equipmentForExamine: [
      { id: 19, name: "Thermometers", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 20, name: "Resuscitation equipment", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 21, name: "NG Tube 6/8 No", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 22, name: "Suction equipment (low pressure)", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 23, name: "Blood Transfusion Kit", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 24, name: "Hb Meter", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 25, name: "Glucometer", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
    ],
    ward: [
      { id: 26, name: "Bed", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 27, name: "Side Table", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 28, name: "IV Stand", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 29, name: "Room Heater", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 30, name: "Cooler / AC", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 31, name: "Fan (inward/ weighing area/playing area)", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 32, name: "Table / Chair", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 33, name: "Dustbin", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 34, name: "Shoe Rack", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 35, name: "TV - Ward and Play Area", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 36, name: "Inverter", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 37, name: "Toys for structural play", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 38, name: "Nutrition Counselling Flip Books", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
    ],
    other: [
      { id: 39, name: "Washing Machine Automatic", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 40, name: "Geyser", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 41, name: "Computer With Colour printer For reporting", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 42, name: "Bed Sheet - for Ward", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 43, name: "Medicine Tray", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 44, name: "Curtains for Window and Door", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 45, name: "Tube light", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 46, name: "Bulb", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
    ],
    kitchenEquipment: [
      { id: 47, name: "Cooking Gas", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 48, name: "Dietary Scale (Upto 1 gm Sensitive)", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 49, name: "Measuring Jar", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 50, name: "Electric Mixer Blender", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 51, name: "Water Filter / RO", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 52, name: "Refrigerator", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 53, name: "Utensils for Kitchen", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 54, name: "Measuring Cup, Glass, Spoon", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 55, name: "Pressure Cooker", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 56, name: "Steel Container", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 57, name: "Tablet", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 58, name: "Steel Bucket with Mug", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 59, name: "Steel Plate, Bowl, Glass, Spoon", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 60, name: "Storage Rack", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
    ]
  });

  // Extract Session Information on Mount
  useEffect(() => {
    const sessionData = sessionStorage.getItem("mtc_user");
    if (sessionData) {
      try {
        const user = JSON.parse(sessionData);
        const code = user.mtcCode || "";
        const name = user.mtcName || "";
        
        setMtcCode(code);
        setMtcName(name);

        if (code || name) {
          fetchEquipmentData(code, name);
        }
      } catch (err) {
        console.error("Session parse error:", err);
      }
    }
  }, []);

  // Fetch Saved Equipment Data
  const fetchEquipmentData = async (code: string, name: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/equipment?mtcCode=${encodeURIComponent(code)}&mtcName=${encodeURIComponent(name)}`);
      const json = await response.json();
      
      if (response.ok && json.success) {
        if (json.data) {
          if (json.lastUpdated) {
            setLastUpdated(new Date(json.lastUpdated).toLocaleString());
          }
          setEquipmentData(json.data);
          toast.success(`Loaded equipment status for ${name || code}`);
        } else {
          toast.success(`Ready to input equipment for ${name || code}`);
        }
      } else {
        toast.error("Failed to retrieve equipment status.");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Network error while fetching data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleView = () => {
    if (!mtcCode && !mtcName) {
      toast.error("Session missing. Please log in again.");
      return;
    }
    fetchEquipmentData(mtcCode, mtcName);
  };

  // Save Equipment Status to DB
  const handleEdit = async () => {
    if (!mtcCode && !mtcName) {
      toast.error("Session missing. Please log in again.");
      return;
    }

    if (!isEditing) {
      setIsEditing(true);
      toast.success("Edit mode active");
    } else {
      setIsLoading(true);
      try {
        const response = await fetch('/api/equipment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            mtcCode,
            mtcName,
            equipmentData
          })
        });

        const json = await response.json();

        if (response.ok && json.success) {
          toast.success(`Equipment status saved for ${mtcName || mtcCode}`);
          if (json.lastUpdated) {
            setLastUpdated(new Date(json.lastUpdated).toLocaleString());
          }
          setIsEditing(false);
        } else {
          toast.error(json.error || "Failed to save equipment data");
        }
      } catch (error) {
        console.error("Save error:", error);
        toast.error("Server error while saving");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleBackToHome = () => {
    router.push("/mtc-user/dashboard/home");
  };

  const updateEquipmentField = (
    category: keyof EquipmentData,
    id: number,
    field: keyof EquipmentItem,
    value: string | number
  ) => {
    setEquipmentData(prev => ({
      ...prev,
      [category]: prev[category].map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  const renderEquipmentRow = (item: EquipmentItem, category: keyof EquipmentData) => (
    <tr key={item.id} className={item.id % 2 === 0 ? "bg-white" : "bg-gray-50/70"}>
      <td className="py-2.5 px-3 sm:px-4 text-xs sm:text-sm font-medium text-gray-800">
        {item.name}
      </td>
      <td className="py-2 px-2 sm:px-4 text-center">
        {isEditing ? (
          <select
            className="w-full px-2 py-1 text-xs border rounded border-gray-300 focus:ring-1 focus:ring-indigo-500"
            value={item.availability}
            onChange={(e) => updateEquipmentField(category, item.id, "availability", e.target.value)}
          >
            <option value="">Select</option>
            <option value="Available">Available</option>
            <option value="Not Available">Not Available</option>
          </select>
        ) : (
          <span className={`text-xs sm:text-sm font-semibold ${item.availability === 'Available' ? 'text-emerald-600' : item.availability === 'Not Available' ? 'text-rose-600' : 'text-gray-400'}`}>
            {item.availability || "-"}
          </span>
        )}
      </td>
      <td className="py-2 px-2 sm:px-4 text-center">
        {isEditing ? (
          <Input
            type="number"
            className="w-full text-xs h-8 text-center"
            value={item.quantity}
            onChange={(e) => updateEquipmentField(category, item.id, "quantity", parseInt(e.target.value) || 0)}
          />
        ) : (
          <span className="text-xs sm:text-sm font-medium">{item.quantity}</span>
        )}
      </td>
      <td className="py-2 px-2 sm:px-4 text-center">
        {isEditing ? (
          <select
            className="w-full px-2 py-1 text-xs border rounded border-gray-300 focus:ring-1 focus:ring-indigo-500"
            value={item.workingStatus}
            onChange={(e) => updateEquipmentField(category, item.id, "workingStatus", e.target.value)}
          >
            <option value="">Select</option>
            <option value="Working">Working</option>
            <option value="Not Working">Not Working</option>
          </select>
        ) : (
          <span className={`text-xs sm:text-sm font-semibold ${item.workingStatus === 'Working' ? 'text-emerald-600' : item.workingStatus === 'Not Working' ? 'text-rose-600' : 'text-gray-400'}`}>
            {item.workingStatus || "-"}
          </span>
        )}
      </td>
      <td className="py-2 px-2 sm:px-4 text-center">
        {isEditing ? (
          <Input
            type="number"
            className="w-full text-xs h-8 text-center"
            value={item.workingQuantity}
            onChange={(e) => updateEquipmentField(category, item.id, "workingQuantity", parseInt(e.target.value) || 0)}
          />
        ) : (
          <span className="text-xs sm:text-sm font-medium">{item.workingQuantity}</span>
        )}
      </td>
    </tr>
  );

  return (
    <div className="min-h-screen bg-gray-100 py-4 sm:py-6 md:py-8 px-2 sm:px-4 md:px-6">
      <Toaster position="top-right" />

      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        
        {/* Header Block showing Center & Status */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">
              Equipment Status
            </h1>
            
            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-600">
              <span className="font-medium text-gray-500">Logged in as:</span>
              {mtcName && (
                <span className="font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-200 uppercase">
                  {mtcName}
                </span>
              )}
              {mtcCode && (
                <span className="font-mono text-gray-600 bg-gray-100 px-2.5 py-1 rounded-md border border-gray-200">
                  ({mtcCode})
                </span>
              )}
            </div>
          </div>

          <Button
            onClick={handleBackToHome}
            variant="outline"
            className="border-gray-300 text-gray-700 hover:bg-gray-100 transition text-xs sm:text-sm"
          >
            <Home className="mr-1.5 h-4 w-4" /> 
            <span>Back to Home</span>
          </Button>
        </div>

        {/* Filter Toolbar */}
        <Card className="shadow-sm border border-gray-200">
          <CardContent className="pt-4 sm:pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 items-end">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Year
                </label>
                <select 
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                >
                  <option value="">Select Year</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                </select>
              </div>
              
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Quarter
                </label>
                <select 
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={selectedQuarter}
                  onChange={(e) => setSelectedQuarter(e.target.value)}
                >
                  <option value="">Select Quarter</option>
                  <option value="1">Q1</option>
                  <option value="2">Q2</option>
                  <option value="3">Q3</option>
                  <option value="4">Q4</option>
                </select>
              </div>
              
              <div className="flex gap-2 lg:col-span-2">
                <Button
                  onClick={handleView}
                  disabled={isLoading}
                  className="bg-indigo-600 hover:bg-indigo-700 flex-1"
                >
                  {isLoading ? <Loader2 className="animate-spin h-4 w-4 mr-1" /> : <Eye className="mr-1.5 h-4 w-4" />}
                  <span className="text-xs sm:text-sm">View</span>
                </Button>
                
                <Button
                  onClick={handleEdit}
                  disabled={isLoading}
                  className={isEditing ? "bg-emerald-600 hover:bg-emerald-700 flex-1" : "bg-blue-600 hover:bg-blue-700 flex-1"}
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin h-4 w-4 mr-1" />
                  ) : isEditing ? (
                    <>
                      <Save className="mr-1.5 h-4 w-4" />
                      <span className="text-xs sm:text-sm">Save Equipment Status</span>
                    </>
                  ) : (
                    <>
                      <Edit className="mr-1.5 h-4 w-4" />
                      <span className="text-xs sm:text-sm">Edit</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Equipment Data Table */}
        <Card className="shadow-sm border border-gray-200">
          <CardHeader className="pb-3 sm:pb-4 border-b border-gray-100">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                Equipment Inventory Summary
              </h2>
              <span className="text-xs sm:text-sm text-gray-500">
                Last Updated: <span className="font-semibold text-gray-700">{lastUpdated}</span>
              </span>
            </div>
          </CardHeader>
          
          <CardContent className="pt-4">
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="min-w-full text-xs sm:text-sm text-gray-700 border-collapse">
                <thead>
                  <tr className="bg-indigo-50 text-indigo-800 border-b border-gray-200">
                    <th className="py-3 px-3 sm:px-4 text-left font-bold">Equipment Name</th>
                    <th className="py-3 px-2 sm:px-4 text-center font-bold">Availability</th>
                    <th className="py-3 px-2 sm:px-4 text-center font-bold">Total Items</th>
                    <th className="py-3 px-2 sm:px-4 text-center font-bold">Working Status</th>
                    <th className="py-3 px-2 sm:px-4 text-center font-bold">Working Items</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-indigo-100/70 font-bold text-indigo-950">
                    <td colSpan={5} className="py-2.5 px-3 sm:px-4">A. SCREENING ROOM</td>
                  </tr>
                  {equipmentData.screeningRoom.map(item => renderEquipmentRow(item, "screeningRoom"))}
                  
                  <tr className="bg-indigo-100/70 font-bold text-indigo-950">
                    <td colSpan={5} className="py-2.5 px-3 sm:px-4">B. EQUIPMENT FOR EXAMINE</td>
                  </tr>
                  {equipmentData.equipmentForExamine.map(item => renderEquipmentRow(item, "equipmentForExamine"))}

                  <tr className="bg-indigo-100/70 font-bold text-indigo-950">
                    <td colSpan={5} className="py-2.5 px-3 sm:px-4">C. WARD</td>
                  </tr>
                  {equipmentData.ward.map(item => renderEquipmentRow(item, "ward"))}

                  <tr className="bg-indigo-100/70 font-bold text-indigo-950">
                    <td colSpan={5} className="py-2.5 px-3 sm:px-4">D. OTHER</td>
                  </tr>
                  {equipmentData.other.map(item => renderEquipmentRow(item, "other"))}

                  <tr className="bg-indigo-100/70 font-bold text-indigo-950">
                    <td colSpan={5} className="py-2.5 px-3 sm:px-4">E. KITCHEN EQUIPMENT UTENSILS</td>
                  </tr>
                  {equipmentData.kitchenEquipment.map(item => renderEquipmentRow(item, "kitchenEquipment"))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}