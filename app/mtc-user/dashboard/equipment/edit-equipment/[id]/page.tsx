"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Save, X } from "lucide-react"; // Removed AlertCircle since it's not used
import toast, { Toaster } from "react-hot-toast";

// Equipment data structure
interface EquipmentItem {
  id: string;
  equipmentGrpId: number;
  equipmentSubGrpId: number;
  name: string;
  availability: string;
  availableUnits: number;
  functionality: string;
  functionalUnits: number;
  modified: number;
}

// Equipment categories
const equipmentCategories = [
  {
    id: 1,
    name: "A. SCREENING ROOM",
    items: [
      { id: 1, name: "Digital Weighing Scale" },
      { id: 2, name: "Stadiometer" },
      { id: 3, name: "Infantometer" },
      { id: 4, name: "MUAC Tape" },
      { id: 5, name: "Weing scales (to weigh to 5 gms.)" },
      { id: 6, name: "Clock" },
      { id: 7, name: "Calculator" },
      { id: 8, name: "SAM Chart" },
      { id: 9, name: "SAM Register" },
      { id: 10, name: "Camera" },
      { id: 11, name: "File" },
      { id: 12, name: "Almira Rake" },
      { id: 13, name: "Almira" },
      { id: 14, name: "Protocol Poster" },
      { id: 15, name: "Marker" },
      { id: 16, name: "White Board" },
      { id: 17, name: "Display Board" },
      { id: 18, name: "Tab" }
    ]
  },
  {
    id: 2,
    name: "B. EQUIPMENT FOR EXAMINE",
    items: [
      { id: 19, name: "Thermometers" },
      { id: 20, name: "Resuscitation equipment" },
      { id: 21, name: "NG Tube 6/8 No" },
      { id: 22, name: "Suction equipment (low pressure)" },
      { id: 23, name: "Blood Transfusion Kit" },
      { id: 24, name: "Hb Meter" },
      { id: 25, name: "Glucometer" }
    ]
  },
  {
    id: 3,
    name: "C. WARD",
    items: [
      { id: 26, name: "Bed" },
      { id: 27, name: "Side Table" },
      { id: 28, name: "IV Stand" },
      { id: 29, name: "Room Heater" },
      { id: 30, name: "Cooler / AC" },
      { id: 31, name: "Fan (inward/ weighing area/playing area)" },
      { id: 32, name: "Tabale/Chair" },
      { id: 33, name: "Dustbin" },
      { id: 34, name: "Shoe Rack" },
      { id: 35, name: "TV- Ward and Play Area" },
      { id: 36, name: "Inverter" },
      { id: 37, name: "Toys for structural play" },
      { id: 60, name: "Nutrition Couselling Flip Books" }
    ]
  },
  {
    id: 4,
    name: "D. OTHER",
    items: [
      { id: 38, name: "Washing Machine Automatic" },
      { id: 39, name: "Geyser" },
      { id: 40, name: "Computer With Colour printer For reporting" },
      { id: 41, name: "Bed Seat -for Ward" },
      { id: 42, name: "Medicine Tray" },
      { id: 43, name: "Prada Window and Door" },
      { id: 44, name: "Tube light" },
      { id: 45, name: "Bulb" }
    ]
  },
  {
    id: 5,
    name: "E. KITCHEN EQUIPMENT UTENSIL",
    items: [
      { id: 46, name: "Cooking Gas" },
      { id: 47, name: "Dietary Scale (Upto 1 gm Sensitive)" },
      { id: 48, name: "Measuring Jar" },
      { id: 49, name: "Electric Mixer Blende" },
      { id: 50, name: "Water Filter/RO" },
      { id: 51, name: "Refrigerator" },
      { id: 52, name: "Utensil for Kitchen" },
      { id: 53, name: "Massacring Cup, Glass, Spoon" },
      { id: 54, name: "Presser cooker" },
      { id: 55, name: "Steel Cacontner" },
      { id: 56, name: "Tab" },
      { id: 57, name: "Balti Steel - with Mug" },
      { id: 58, name: "Steel Plat Katori, Glass, Spoon" },
      { id: 59, name: "Store Rack" }
    ]
  }
];

export default function EquipmentDetailsPage() {
  const [equipmentItems, setEquipmentItems] = useState<EquipmentItem[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAvailabilityFields, setShowAvailabilityFields] = useState<{ [key: string]: boolean }>({});
  const [showFunctionalityFields, setShowFunctionalityFields] = useState<{ [key: string]: boolean }>({});
  const [showFunctionalUnitsFields, setShowFunctionalUnitsFields] = useState<{ [key: string]: boolean }>({});

  // Initialize equipment items
  useEffect(() => {
    const initialItems: EquipmentItem[] = [];
    
    equipmentCategories.forEach(category => {
      category.items.forEach(item => {
        initialItems.push({
          id: item.id.toString(),
          equipmentGrpId: category.id,
          equipmentSubGrpId: item.id,
          name: item.name,
          availability: "0",
          availableUnits: 0,
          functionality: "0",
          functionalUnits: 0,
          modified: 0
        });
      });
    });
    
    setEquipmentItems(initialItems);
  }, []);

  // Handle availability change
  const handleAvailabilityChange = (id: string, value: string) => {
    setEquipmentItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, availability: value, modified: 1 } : item
      )
    );
    
    // Show/hide related fields
    if (value === "1") {
      setShowAvailabilityFields(prev => ({ ...prev, [id]: true }));
      setShowFunctionalityFields(prev => ({ ...prev, [id]: true }));
    } else {
      setShowAvailabilityFields(prev => ({ ...prev, [id]: false }));
      setShowFunctionalityFields(prev => ({ ...prev, [id]: false }));
      setShowFunctionalUnitsFields(prev => ({ ...prev, [id]: false }));
      
      // Reset values
      setEquipmentItems(prevItems => 
        prevItems.map(item => 
          item.id === id ? { 
            ...item, 
            availableUnits: 0, 
            functionality: "0", 
            functionalUnits: 0 
          } : item
        )
      );
    }
  };

  // Handle available units change
  const handleAvailableUnitsChange = (id: string, value: number) => {
    setEquipmentItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, availableUnits: value, modified: 1 } : item
      )
    );
  };

  // Handle functionality change
  const handleFunctionalityChange = (id: string, value: string) => {
    setEquipmentItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, functionality: value, modified: 1 } : item
      )
    );
    
    // Show/hide functional units field
    if (value === "1") {
      setShowFunctionalUnitsFields(prev => ({ ...prev, [id]: true }));
    } else {
      setShowFunctionalUnitsFields(prev => ({ ...prev, [id]: false }));
      
      // Reset functional units
      setEquipmentItems(prevItems => 
        prevItems.map(item => 
          item.id === id ? { ...item, functionalUnits: 0 } : item
        )
      );
    }
  };

  // Handle functional units change
  const handleFunctionalUnitsChange = (id: string, value: number) => {
    const item = equipmentItems.find(item => item.id === id);
    
    if (item && value > item.availableUnits) {
      toast.error("Number of Working items should be less than Available Units");
      return;
    }
    
    setEquipmentItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, functionalUnits: value, modified: 1 } : item
      )
    );
  };

  // Handle save
  const handleSave = () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Record Saved Successfully.");
      
      // In a real app, you would redirect to the index page
      // window.location.href = '/Equipment/Index';
    }, 2000);
  };

  // Handle cancel
  const handleCancel = () => {
    // In a real app, you would redirect to the index page
    // window.location.href = '/Equipment/Index';
    toast("Navigation cancelled");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-4 sm:py-6 md:py-8 lg:py-10 px-2 sm:px-4 md:px-6">
      <Toaster position="top-right" />

      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Header */}
        <Card className="shadow-sm border border-gray-200">
          <CardHeader className="pb-2 sm:pb-4">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-teal-600 tracking-tight">
              Equipment Details
            </h1>
          </CardHeader>

          <CardContent>
            <div className="space-y-6">
              {equipmentCategories.map(category => (
                <div key={category.id} className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-800">{category.name}</h4>
                  
                  {category.items.map((item, index) => {
                    const equipmentItem = equipmentItems.find(e => e.id === item.id.toString());
                    if (!equipmentItem) return null;
                    
                    return (
                      <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                        <div className="md:col-span-3">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {index + 1}. {item.name}:
                          </label>
                        </div>
                        
                        <div className="md:col-span-2">
                          <label className="block text-xs font-medium text-gray-600 mb-1">Availability</label>
                          <Select
                            value={equipmentItem.availability}
                            onValueChange={(value) => handleAvailabilityChange(equipmentItem.id, value)}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0">Select</SelectItem>
                              <SelectItem value="1">Yes</SelectItem>
                              <SelectItem value="2">No</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        {showAvailabilityFields[equipmentItem.id] && (
                          <div className="md:col-span-2">
                            <label className="block text-xs font-medium text-gray-600 mb-1">Number of Available items</label>
                            <Input
                              type="number"
                              value={equipmentItem.availableUnits}
                              onChange={(e) => handleAvailableUnitsChange(equipmentItem.id, parseInt(e.target.value) || 0)}
                              className="w-full"
                            />
                          </div>
                        )}
                        
                        {showFunctionalityFields[equipmentItem.id] && (
                          <div className="md:col-span-2">
                            <label className="block text-xs font-medium text-gray-600 mb-1">Working/Not Working</label>
                            <Select
                              value={equipmentItem.functionality}
                              onValueChange={(value) => handleFunctionalityChange(equipmentItem.id, value)}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="0">Select</SelectItem>
                                <SelectItem value="1">Working</SelectItem>
                                <SelectItem value="2">Not Working</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                        
                        {showFunctionalUnitsFields[equipmentItem.id] && (
                          <div className="md:col-span-2">
                            <label className="block text-xs font-medium text-gray-600 mb-1">Number of Working items</label>
                            <Input
                              type="number"
                              value={equipmentItem.functionalUnits}
                              onChange={(e) => handleFunctionalUnitsChange(equipmentItem.id, parseInt(e.target.value) || 0)}
                              className="w-full"
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
              
              {/* Action Buttons */}
              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  onClick={handleSave}
                  disabled={isSubmitting}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </>
                  )}
                </Button>
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  className="border-gray-500 text-gray-700 hover:bg-gray-50"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}