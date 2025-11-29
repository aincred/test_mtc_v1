"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Edit, Eye, Home, Save } from "lucide-react"; // Removed CalendarIcon
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
  const [lastUpdated, setLastUpdated] = useState("01/01/1900");
  
  const [equipmentData, setEquipmentData] = useState<EquipmentData>({
    screeningRoom: [
      { id: 1, name: "Digital Weighing Scale", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 2, name: "Stadiometer", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 3, name: "Infantometer", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 4, name: "MUAC Tape", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 5, name: "Weing scales (to weigh to 5 gms.)", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 6, name: "Clock", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 7, name: "Calculator", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 8, name: "SAM Chart", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 9, name: "SAM Register", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 10, name: "Camera", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 11, name: "File", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 12, name: "Almira Rake", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 13, name: "Almira", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 14, name: "Protocol Poster", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 15, name: "Marker", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 16, name: "White Board", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 17, name: "Display Board", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 18, name: "Tab", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
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
      { id: 32, name: "Tabale/Chair", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 33, name: "Dustbin", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 34, name: "Shoe Rack", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 35, name: "TV- Ward and Play Area", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 36, name: "Inverter", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 37, name: "Toys for structural play", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 38, name: "Nutrition Counselling Flip Books", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
    ],
    other: [
      { id: 39, name: "Washing Machine Automatic", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 40, name: "Geyser", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 41, name: "Computer With Colour printer For reporting", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 42, name: "Bed Seat -for Ward", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 43, name: "Medicine Tray", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 44, name: "Prada Window and Door", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 45, name: "Tube light", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 46, name: "Bulb", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
    ],
    kitchenEquipment: [
      { id: 47, name: "Cooking Gas", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 48, name: "Dietary Scale (Upto 1 gm Sensitive)", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 49, name: "Measuring Jar", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 50, name: "Electric Mixer Blender", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 51, name: "Water Filter/RO", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 52, name: "Refrigerator", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 53, name: "Utensil for Kitchen", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 54, name: "Measuring Cup, Glass, Spoon", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 55, name: "Pressure Cooker", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 56, name: "Steel Container", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 57, name: "Tab", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 58, name: "Balti Steel - with Mug", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 59, name: "Steel Plate Katori, Glass, Spoon", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
      { id: 60, name: "Store Rack", availability: "", quantity: 0, workingStatus: "", workingQuantity: 0 },
    ]
  });

  const handleView = () => {
    if (!selectedYear || !selectedQuarter) {
      toast.error("Please select both year and quarter");
      return;
    }
    
    // In a real app, you would fetch data from an API
    toast.success(`Viewing data for ${selectedYear}, Q${selectedQuarter}`);
    setLastUpdated(new Date().toLocaleDateString());
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      toast.success("Edit mode enabled");
    } else {
      toast.success("Changes saved successfully");
      setLastUpdated(new Date().toLocaleDateString());
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
    <tr key={item.id} className={item.id % 2 === 0 ? "bg-white" : "bg-gray-50"}>
      <td className="py-2 px-2 sm:px-4 text-xs sm:text-sm">
        {item.name}
      </td>
      <td className="py-2 px-2 sm:px-4 text-center">
        {isEditing ? (
          <select
            className="w-full px-2 py-1 text-xs border rounded"
            value={item.availability}
            onChange={(e) => updateEquipmentField(category, item.id, "availability", e.target.value)}
          >
            <option value="">Select</option>
            <option value="Available">Available</option>
            <option value="Not Available">Not Available</option>
          </select>
        ) : (
          <span className="text-xs sm:text-sm">{item.availability}</span>
        )}
      </td>
      <td className="py-2 px-2 sm:px-4 text-center">
        {isEditing ? (
          <Input
            type="number"
            className="w-full text-xs"
            value={item.quantity}
            onChange={(e) => updateEquipmentField(category, item.id, "quantity", parseInt(e.target.value) || 0)}
          />
        ) : (
          <span className="text-xs sm:text-sm">{item.quantity}</span>
        )}
      </td>
      <td className="py-2 px-2 sm:px-4 text-center">
        {isEditing ? (
          <select
            className="w-full px-2 py-1 text-xs border rounded"
            value={item.workingStatus}
            onChange={(e) => updateEquipmentField(category, item.id, "workingStatus", e.target.value)}
          >
            <option value="">Select</option>
            <option value="Working">Working</option>
            <option value="Not Working">Not Working</option>
          </select>
        ) : (
          <span className="text-xs sm:text-sm">{item.workingStatus}</span>
        )}
      </td>
      <td className="py-2 px-2 sm:px-4 text-center">
        {isEditing ? (
          <Input
            type="number"
            className="w-full text-xs"
            value={item.workingQuantity}
            onChange={(e) => updateEquipmentField(category, item.id, "workingQuantity", parseInt(e.target.value) || 0)}
          />
        ) : (
          <span className="text-xs sm:text-sm">{item.workingQuantity}</span>
        )}
      </td>
    </tr>
  );

  return (
    <div className="min-h-screen bg-gray-100 py-4 sm:py-6 md:py-8 lg:py-10 px-2 sm:px-4 md:px-6">
      <Toaster position="top-right" />

      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">
            Equipment Status
          </h1>
          <div className="flex gap-2 sm:gap-3">
            <Button
              onClick={handleBackToHome}
              variant="outline"
              className="border-gray-600 text-gray-700 hover:bg-gray-100 transition text-xs sm:text-sm"
            >
              <Home className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" /> 
              <span className="hidden sm:inline">Back to Home</span>
              <span className="sm:hidden">Home</span>
            </Button>
          </div>
        </div>

        {/* Filters Section */}
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
                  <option value="2015">2015</option>
                  <option value="2016">2016</option>
                  <option value="2017">2017</option>
                  <option value="2018">2018</option>
                  <option value="2019">2019</option>
                  <option value="2020">2020</option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
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
                  <option value="1">Q1 (Jan 01 - Mar 31)</option>
                  <option value="2">Q2 (Apr 01 - Jun 30)</option>
                  <option value="3">Q3 (Jul 01 - Sep 30)</option>
                  <option value="4">Q4 (Oct 01 - Dec 31)</option>
                </select>
              </div>
              
              <div className="flex gap-2">
                <Button
                  onClick={handleView}
                  className="bg-indigo-600 hover:bg-indigo-700 flex-1"
                >
                  <Eye className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="text-xs sm:text-sm">View</span>
                </Button>
                
                <Button
                  onClick={handleEdit}
                  className={isEditing ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"}
                >
                  {isEditing ? (
                    <>
                      <Save className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                      <span className="text-xs sm:text-sm">Save</span>
                    </>
                  ) : (
                    <>
                      <Edit className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                      <span className="text-xs sm:text-sm">Edit</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Equipment Table */}
        <Card className="shadow-sm border border-gray-200">
          <CardHeader className="pb-2 sm:pb-4">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
              Summary Table <span className="text-sm font-normal">(Last Updated on {lastUpdated})</span>
            </h2>
          </CardHeader>

          <CardContent>
            <div className="overflow-x-auto rounded-lg">
              <table className="min-w-full text-xs sm:text-sm text-gray-700 border-collapse">
                <thead>
                  <tr className="bg-indigo-50 text-indigo-700 border-b border-gray-200">
                    <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold">Equipment</th>
                    <th className="py-2 sm:py-3 px-2 sm:px-4 text-center font-semibold">Availability</th>
                    <th className="py-2 sm:py-3 px-2 sm:px-4 text-center font-semibold">Number of items</th>
                    <th className="py-2 sm:py-3 px-2 sm:px-4 text-center font-semibold">Working/Not Working</th>
                    <th className="py-2 sm:py-3 px-2 sm:px-4 text-center font-semibold">Number of Working items</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-gray-100 font-semibold">
                    <td colSpan={5} className="py-2 px-2 sm:px-4">
                      A. SCREENING ROOM
                    </td>
                  </tr>
                  {equipmentData.screeningRoom.map(item => renderEquipmentRow(item, "screeningRoom"))}
                  
                  <tr className="bg-gray-100 font-semibold">
                    <td colSpan={5} className="py-2 px-2 sm:px-4">
                      B. EQUIPMENT FOR EXAMINE
                    </td>
                  </tr>
                  {equipmentData.equipmentForExamine.map(item => renderEquipmentRow(item, "equipmentForExamine"))}
                  
                  <tr className="bg-gray-100 font-semibold">
                    <td colSpan={5} className="py-2 px-2 sm:px-4">
                      C. WARD
                    </td>
                  </tr>
                  {equipmentData.ward.map(item => renderEquipmentRow(item, "ward"))}
                  
                  <tr className="bg-gray-100 font-semibold">
                    <td colSpan={5} className="py-2 px-2 sm:px-4">
                      D. OTHER
                    </td>
                  </tr>
                  {equipmentData.other.map(item => renderEquipmentRow(item, "other"))}
                  
                  <tr className="bg-gray-100 font-semibold">
                    <td colSpan={5} className="py-2 px-2 sm:px-4">
                      E. KITCHEN EQUIPMENT UTENSIL
                    </td>
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