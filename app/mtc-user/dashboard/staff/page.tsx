"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Plus, Download, Edit, Home, Search, Trash2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

interface StaffMember {
  id: number;
  slNo: number;
  districtName: string;
  mtcName: string;
  name: string;
  mobileNumber: string;
  emailId: string;
  designation: string;
  fsamTrainingReceived: string;
  fsamTrainingDate: string;
  refresherTrainingReceived: string;
  refresherTrainingDate: string;
  lastModifiedDate: string;
}

const districts = [
  "BOKARO", "CHATRA", "DEOGHAR", "DHANBAD", "DUMKA", "EAST SINGHBHUM", 
  "GARHWA", "GIRIDIH", "GODDA", "GUMLA", "HAZARIBAGH", "JAMTARA", 
  "KHUNTI", "KODERMA", "LATEHAR", "LOHARDAGA", "PAKUR", "PALAMU", 
  "RAMGARH", "RANCHI", "SAHIBGANJ", "SERAIKELA", "SIMDEGA", "WEST SINGHBHUM"
];

export default function StaffManagementPage() {
  const router = useRouter();
  const [staffData, setStaffData] = useState<StaffMember[]>([]);
  const [filteredData, setFilteredData] = useState<StaffMember[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showDistrictFilter, setShowDistrictFilter] = useState(false);

  // Load data on component mount
  useEffect(() => {
    // In a real app, you would fetch data from an API
    // For now, we'll use the sample data from the HTML
    const sampleData: StaffMember[] = [
      {
        id: 2376,
        slNo: 1,
        districtName: "WEST SINGHBHUM",
        mtcName: "CHAIBASA",
        name: "Dr SHIV CHARAN HANSDA",
        mobileNumber: "9934181227",
        emailId: "mtc.chaibasa2022@gmail.com",
        designation: "Medical Officer",
        fsamTrainingReceived: "No",
        fsamTrainingDate: "",
        refresherTrainingReceived: "No",
        refresherTrainingDate: "",
        lastModifiedDate: "01-Sep-2022"
      },
      {
        id: 2332,
        slNo: 2,
        districtName: "WEST SINGHBHUM",
        mtcName: "CHAIBASA",
        name: "Arunima Kujur",
        mobileNumber: "7979701287",
        emailId: "arunimakujur170@gmail.com",
        designation: "ANM",
        fsamTrainingReceived: "Yes",
        fsamTrainingDate: "07-Dec-2017",
        refresherTrainingReceived: "No",
        refresherTrainingDate: "",
        lastModifiedDate: "22-May-2025"
      },
      {
        id: 2334,
        slNo: 3,
        districtName: "WEST SINGHBHUM",
        mtcName: "CHAIBASA",
        name: "Reena Bobonga",
        mobileNumber: "8340765496",
        emailId: "reenabobonga79@gmail.com",
        designation: "ANM",
        fsamTrainingReceived: "No",
        fsamTrainingDate: "",
        refresherTrainingReceived: "No",
        refresherTrainingDate: "",
        lastModifiedDate: "22-May-2025"
      },
      {
        id: 2336,
        slNo: 4,
        districtName: "WEST SINGHBHUM",
        mtcName: "CHAIBASA",
        name: "Susana Kispota",
        mobileNumber: "8809262058",
        emailId: "mtc.chaibasa2022@gmail.com",
        designation: "ANM",
        fsamTrainingReceived: "No",
        fsamTrainingDate: "",
        refresherTrainingReceived: "No",
        refresherTrainingDate: "",
        lastModifiedDate: "01-Jun-2022"
      },
      {
        id: 2337,
        slNo: 5,
        districtName: "WEST SINGHBHUM",
        mtcName: "CHAIBASA",
        name: "Bindu Kumari",
        mobileNumber: "8409738314",
        emailId: "mtc.chaibasa2022@gmail.com",
        designation: "ANM",
        fsamTrainingReceived: "No",
        fsamTrainingDate: "",
        refresherTrainingReceived: "No",
        refresherTrainingDate: "",
        lastModifiedDate: "24-Nov-2022"
      },
      {
        id: 2338,
        slNo: 6,
        districtName: "WEST SINGHBHUM",
        mtcName: "CHAIBASA",
        name: "Sulekha Sundi",
        mobileNumber: "7759916285",
        emailId: "sulekhasundimts@gmail.com",
        designation: "Cook cum Care Taker",
        fsamTrainingReceived: "Yes",
        fsamTrainingDate: "07-Dec-2017",
        refresherTrainingReceived: "Yes",
        refresherTrainingDate: "",
        lastModifiedDate: "19-Dec-2023"
      },
      {
        id: 2339,
        slNo: 7,
        districtName: "WEST SINGHBHUM",
        mtcName: "CHAIBASA",
        name: "Gita Devi",
        mobileNumber: "6299320109",
        emailId: "mtc.chaibasa2022@gmail.com",
        designation: "Attendent Cleaner",
        fsamTrainingReceived: "No",
        fsamTrainingDate: "",
        refresherTrainingReceived: "No",
        refresherTrainingDate: "",
        lastModifiedDate: "01-Jun-2022"
      },
      {
        id: 2341,
        slNo: 8,
        districtName: "WEST SINGHBHUM",
        mtcName: "CHAIBASA",
        name: "Rani Barjo",
        mobileNumber: "9102183855",
        emailId: "mtc.chaibasa2022@gmail.com",
        designation: "Attendent Cleaner",
        fsamTrainingReceived: "No",
        fsamTrainingDate: "",
        refresherTrainingReceived: "No",
        refresherTrainingDate: "",
        lastModifiedDate: "01-Jun-2022"
      },
      {
        id: 2342,
        slNo: 9,
        districtName: "WEST SINGHBHUM",
        mtcName: "CHAIBASA",
        name: "Shakuntala Das",
        mobileNumber: "8540923003",
        emailId: "mtc.chaibasa2022@gmail.com",
        designation: "Attendent Cleaner",
        fsamTrainingReceived: "No",
        fsamTrainingDate: "",
        refresherTrainingReceived: "No",
        refresherTrainingDate: "",
        lastModifiedDate: "01-Jun-2022"
      },
      {
        id: 2540,
        slNo: 10,
        districtName: "WEST SINGHBHUM",
        mtcName: "CHAIBASA",
        name: "RAYMUNI TUTI",
        mobileNumber: "9668015434",
        emailId: "mtc.chaibasa2022@gmail.com",
        designation: "ANM",
        fsamTrainingReceived: "Yes",
        fsamTrainingDate: "",
        refresherTrainingReceived: "No",
        refresherTrainingDate: "",
        lastModifiedDate: "22-Sep-2023"
      }
    ];
    
    setStaffData(sampleData);
    setFilteredData(sampleData);
  }, []);

  // Filter data based on search term and selected districts
  useEffect(() => {
    let filtered = [...staffData];
    
    if (searchTerm) {
      filtered = filtered.filter(staff => 
        staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.districtName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.mtcName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.mobileNumber.includes(searchTerm) ||
        staff.emailId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedDistricts.length > 0) {
      filtered = filtered.filter(staff => 
        selectedDistricts.includes(staff.districtName)
      );
    }
    
    setFilteredData(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [staffData, searchTerm, selectedDistricts]);

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const handleDistrictToggle = (district: string) => {
    setSelectedDistricts(prev => 
      prev.includes(district) 
        ? prev.filter(d => d !== district)
        : [...prev, district]
    );
  };

  const handleAddStaff = () => {
    router.push("/mtc-user/dashboard/staff/add-staff/[id]");
  };

  const handleEditStaff = (staffId: number) => {
    router.push(`/mtc-user/dashboard/staff/add-staff/${staffId}`);
  };

  const handleDeleteStaff = (staffId: number, staffName: string) => {
    if (window.confirm(`Are you sure you want to delete ${staffName}?`)) {
      // In a real app, you would make an API call to delete the staff member
      const updatedStaff = staffData.filter(staff => staff.id !== staffId);
      setStaffData(updatedStaff);
      toast.success("Staff member deleted successfully!");
    }
  };

  const handleDownload = () => {
    // In a real app, you would generate and download a CSV or Excel file
    toast.success("Downloading staff data...");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-4 sm:py-6 md:py-8 lg:py-10 px-2 sm:px-4 md:px-6">
      <Toaster position="top-right" />

      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">
            MTC Staff
          </h1>
          <div className="flex gap-2 sm:gap-3">
            <Button
              onClick={handleAddStaff}
              className="bg-indigo-600 hover:bg-indigo-700 text-xs sm:text-sm"
            >
              <Plus className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" /> 
              <span className="hidden sm:inline">Add Staff</span>
              <span className="sm:hidden">Add</span>
            </Button>
            <Button
              onClick={() => router.push("/mtc-user/dashboard/home")}
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
              <div className="sm:col-span-2">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Search
                </label>
                <div className="relative">
                  <Input
                    placeholder="Search by name, district, MTC, designation, etc."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pr-8 sm:pr-10 text-xs sm:text-sm"
                  />
                  <Search className="absolute right-2 top-2.5 text-gray-400 h-3 w-3 sm:h-4 sm:w-4" />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs sm:text-sm font-medium text-gray-700">
                    District Filter
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowDistrictFilter(!showDistrictFilter)}
                    className="text-xs text-indigo-600 hover:text-indigo-800"
                  >
                    {showDistrictFilter ? "Hide" : "Show"}
                  </button>
                </div>
                <div className="text-xs sm:text-sm text-gray-600">
                  {selectedDistricts.length === 0 
                    ? "All districts" 
                    : `${selectedDistricts.length} district${selectedDistricts.length > 1 ? "s" : ""} selected`}
                </div>
              </div>
              
              <div>
                <Button
                  onClick={handleDownload}
                  variant="outline"
                  className="border-green-600 text-green-700 hover:bg-green-50 transition text-xs sm:text-sm w-full"
                >
                  <Download className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" /> 
                  Download
                </Button>
              </div>
            </div>
            
            {showDistrictFilter && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                  {districts.map(district => (
                    <div key={district} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`district-${district}`}
                        checked={selectedDistricts.includes(district)}
                        onChange={() => handleDistrictToggle(district)}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label 
                        htmlFor={`district-${district}`} 
                        className="ml-2 text-xs text-gray-700 cursor-pointer"
                      >
                        {district}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Table Section */}
        <Card className="shadow-sm border border-gray-200">
          <CardHeader className="pb-2 sm:pb-4">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 text-center">
              List of MTC Staff Members
            </h2>
          </CardHeader>

          <CardContent>
            <div className="overflow-x-auto rounded-lg">
              <table className="min-w-full text-xs sm:text-sm text-gray-700 border-collapse">
                <thead>
                  <tr className="bg-indigo-50 text-indigo-700 border-b border-gray-200">
                    <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold">Sl.No</th>
                    <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold">District Name</th>
                    <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold">MTC Name</th>
                    <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold">Name</th>
                    <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold hidden md:table-cell">Mobile Number</th>
                    <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold hidden lg:table-cell">Email ID</th>
                    <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold hidden lg:table-cell">Designation</th>
                    <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold hidden xl:table-cell">3 days FSAM Training</th>
                    <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold hidden xl:table-cell">1 day FSAM Refresher</th>
                    <th className="py-2 sm:py-3 px-2 sm:px-4 text-center font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.length > 0 ? (
                    currentItems.map((staff, i) => (
                      <tr
                        key={staff.id}
                        className={`${i % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-indigo-50 transition`}
                      >
                        <td className="py-2 sm:py-3 px-2 sm:px-4">{staff.slNo}</td>
                        <td className="py-2 sm:py-3 px-2 sm:px-4">{staff.districtName}</td>
                        <td className="py-2 sm:py-3 px-2 sm:px-4">{staff.mtcName}</td>
                        <td className="py-2 sm:py-3 px-2 sm:px-4 font-medium">{staff.name}</td>
                        <td className="py-2 sm:py-3 px-2 sm:px-4 hidden md:table-cell">{staff.mobileNumber}</td>
                        <td className="py-2 sm:py-3 px-2 sm:px-4 hidden lg:table-cell">{staff.emailId}</td>
                        <td className="py-2 sm:py-3 px-2 sm:px-4 hidden lg:table-cell">{staff.designation}</td>
                        <td className="py-2 sm:py-3 px-2 sm:px-4 hidden xl:table-cell">
                          <div>
                            <div>{staff.fsamTrainingReceived}</div>
                            {staff.fsamTrainingDate && (
                              <div className="text-xs text-gray-500">{staff.fsamTrainingDate}</div>
                            )}
                          </div>
                        </td>
                        <td className="py-2 sm:py-3 px-2 sm:px-4 hidden xl:table-cell">
                          <div>
                            <div>{staff.refresherTrainingReceived}</div>
                            {staff.refresherTrainingDate && (
                              <div className="text-xs text-gray-500">{staff.refresherTrainingDate}</div>
                            )}
                          </div>
                        </td>
                        <td className="py-2 sm:py-3 px-2 sm:px-4 text-center">
                          <div className="flex justify-center gap-1">
                            <Button
                              onClick={() => handleEditStaff(staff.id)}
                              className="bg-blue-600 hover:bg-blue-700 p-1 sm:p-2"
                              title="Edit"
                            >
                              <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                            </Button>
                            <Button
                              onClick={() => handleDeleteStaff(staff.id, staff.name)}
                              className="bg-red-600 hover:bg-red-700 p-1 sm:p-2"
                              title="Delete"
                            >
                              <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={10} className="py-8 text-center text-gray-500 text-xs sm:text-sm">
                        <div className="flex flex-col items-center">
                          <div className="mb-2">
                            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                            </svg>
                          </div>
                          <p className="font-medium">No staff members found</p>
                          <p className="mt-1">Try adjusting your search or filter criteria</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            <div className="flex flex-col sm:flex-row justify-between items-center mt-4 pt-4 border-t border-gray-200 gap-4">
              <div className="flex items-center text-xs sm:text-sm text-gray-700">
                Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredData.length)} of {filteredData.length} entries
              </div>
              
              <div className="flex items-center gap-2">
                <label className="text-xs sm:text-sm text-gray-700">Show</label>
                <select
                  value={itemsPerPage}
                  onChange={handleItemsPerPageChange}
                  className="px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
                <label className="text-xs sm:text-sm text-gray-700">entries</label>
              </div>
              
              <div className="flex items-center">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 text-xs border border-gray-300 rounded-l bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className={`px-3 py-1 text-xs border-t border-b border-gray-300 ${
                      pageNumber === currentPage
                        ? "bg-indigo-600 text-white"
                        : "bg-white hover:bg-gray-100"
                    }`}
                  >
                    {pageNumber}
                  </button>
                ))}
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 text-xs border border-gray-300 rounded-r bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}