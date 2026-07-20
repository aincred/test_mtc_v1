"use client";

import React, { useState } from "react";
import { 
  Plus, 
  Send, 
  Edit, 
  Trash2, 
  X, 
  Save 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SmsContactItem {
  id: number | null;
  state: string;
  name: string;
  mobile: string;
}

interface FormState {
  id: number | null;
  name: string;
  mobile: string;
}

// Mock Data
const INITIAL_DATA: SmsContactItem[] = [
  { id: 4, state: "Jharkhand", name: "PRITISH NAYAK, NUTRITION OFFICER, UNICEF", mobile: "7772895526" },
  { id: 5, state: "Jharkhand", name: "VIKASH SEET, STATE CONSULTANT, AMB & MIS", mobile: "8210061193" },
  { id: 7, state: "Jharkhand", name: "SUJIT SINHA, CONSULTANT, F-SAM", mobile: "9471355854" },
  { id: 8, state: "Jharkhand", name: "PRATIMA SINGH, CONSULTANT-MN & VAS", mobile: "9431180411" },
  { id: 152, state: "Jharkhand", name: "PRASHANTI TIWARY, CONSULTANT, SCoE", mobile: "7091284428" },
];

export default function StateSmsList() {
  const [data] = useState<SmsContactItem[]>(INITIAL_DATA);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<FormState>({ id: null, name: "", mobile: "" });

  // Open modal for Add or Edit
  const openModal = (item: FormState = { id: null, name: "", mobile: "" }) => {
    setFormData(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({ id: null, name: "", mobile: "" });
  };

  const handleSave = () => {
    // Logic to save/update data
    console.log("Saving data:", formData);
    closeModal();
  };

  return (
    <div className="w-full mt-8 relative">
      {/* Main Table Card */}
      <div className={cn("bg-white rounded-xl shadow-md border border-gray-200", isModalOpen && "opacity-50 pointer-events-none")}>
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 rounded-t-xl flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h5 className="text-[1.25rem] font-medium m-0" style={{ color: "#0B918C" }}>State SMS List</h5>
            <button
              onClick={() => openModal()}
              className="inline-flex items-center gap-1 px-3 py-1 text-sm font-medium text-cyan-600 border border-cyan-600 rounded hover:bg-cyan-50 transition-colors"
            >
              <Plus size={16} /> Add
            </button>
          </div>
          <button className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-medium text-white bg-green-600 rounded hover:bg-green-700 shadow-sm transition-colors">
            <Send size={16} /> Send SMS
          </button>
        </div>

        <div className="p-6 overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-[#0B918C]">
                <th className="py-3 px-4 font-semibold border-r">S.No</th>
                <th className="py-3 px-4 font-semibold border-r">State Name</th>
                <th className="py-3 px-4 font-semibold border-r">Name</th>
                <th className="py-3 px-4 font-semibold border-r">Mobile Numbers</th>
                <th className="py-3 px-4 font-semibold text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={row.id ?? index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-center border-r">{index + 1}</td>
                  <td className="py-3 px-4 border-r">{row.state}</td>
                  <td className="py-3 px-4 border-r">{row.name}</td>
                  <td className="py-3 px-4 border-r">{row.mobile}</td>
                  <td className="py-3 px-4 flex justify-center gap-2">
                    <button 
                      onClick={() => openModal({ id: row.id, name: row.name, mobile: row.mobile })} 
                      className="p-1.5 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      <Edit size={14}/>
                    </button>
                    <button className="p-1.5 bg-red-500 text-white rounded hover:bg-red-600">
                      <Trash2 size={14}/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* State SMS Details Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="text-xl font-semibold text-gray-800">State SMS Details</h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-bold text-[#0B918C] mb-2 uppercase tracking-wide">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-[#0B918C] focus:border-[#0B918C] outline-none transition-all"
                  placeholder="Enter contact name"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[#0B918C] mb-2 uppercase tracking-wide">Mobile Numbers</label>
                <textarea
                  rows={4}
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-[#0B918C] focus:border-[#0B918C] outline-none transition-all resize-none"
                  placeholder="Enter mobile numbers"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-3 px-6 py-4 bg-gray-50 border-t border-gray-100">
              <button
                onClick={closeModal}
                className="px-5 py-2 text-sm font-medium text-white bg-slate-500 rounded hover:bg-slate-600 transition-colors shadow-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="inline-flex items-center gap-2 px-5 py-2 text-sm font-medium text-[#0B918C] bg-white border border-[#0B918C] rounded hover:bg-[#0B918C] hover:text-white transition-all shadow-sm"
              >
                <Save size={16} /> Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}