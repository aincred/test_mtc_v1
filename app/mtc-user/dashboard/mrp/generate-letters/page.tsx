"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Printer, Download, FileText, Loader2, FileSpreadsheet } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ChildFollowUpRecord {
  recordNo: string;
  childName: string;
  parentName: string;
  mobile: string;
  address: string;
  block: string;
  fu1: string;
  fu2: string;
  fu3: string;
  fu4: string;
}

interface Html2PdfOptions {
  margin?: number | [number, number] | [number, number, number, number];
  filename?: string;
  image?: { type: string; quality: number };
  html2canvas?: { scale: number; useCORS: boolean };
  jsPDF?: { unit: string; format: string; orientation: string };
}

interface Html2PdfWorker {
  set: (options: Html2PdfOptions) => Html2PdfWorker;
  from: (element: HTMLElement) => Html2PdfWorker;
  save: () => void;
}

declare global {
  interface Window {
    html2pdf: () => Html2PdfWorker;
  }
}

export default function FollowUpLetterPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [childrenList, setChildrenList] = useState<ChildFollowUpRecord[] | null>(null);

  // Form States
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [month, setMonth] = useState((new Date().getMonth() + 1).toString());
  const mtcName = "CHAIBASA"; // Keeping static as per implementation note

  const monthsList = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Fetch children due for follow up based on selected month and year
  const handleGenerate = async () => {
    if (!year || !month) {
      toast.error("Please select both Year and Month");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/reports/follow-ups?year=${year}&month=${month}`);
      
      if (!response.ok) {
        setChildrenList([]);
        toast.error("Endpoint not found. Showing empty template.");
      } else {
        const data = await response.json();
        setChildrenList(data.data || []);
        toast.success("Letter generated successfully!");
      }
    } catch {
      toast.error("Failed to generate letter data.");
      setChildrenList([]); 
    } finally {
      setLoading(false);
    }
  };

  // --- EXPORT FUNCTIONS ---
  const handlePrint = () => window.print();

  const handleDownloadPDF = () => {
    const element = document.getElementById("printable-letter");
    if (!element) return;

    const generatePDF = (el: HTMLElement) => {
      const opt: Html2PdfOptions = { 
        margin: 0.5, 
        filename: `FollowUp_Letter_${monthsList[parseInt(month) - 1]}_${year}.pdf`, 
        image: { type: 'jpeg', quality: 0.98 }, 
        html2canvas: { scale: 2, useCORS: true }, 
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' } 
      };
      window.html2pdf().set(opt).from(el).save();
    };

    if (!window.html2pdf) {
      toast.success("Generating PDF Document...");
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
      script.onload = () => generatePDF(element);
      document.body.appendChild(script);
    } else {
      generatePDF(element);
    }
  };

  const exportTableToCSV = () => {
    if (!childrenList || childrenList.length === 0) {
      toast.error("No data to export");
      return;
    }
    const headers = [
      "Record No", "Child Name", "Parent Name", "Mobile", "Address", "Block", 
      "Follow-up 1 Date", "Follow-up 2 Date", "Follow-up 3 Date", "Follow-up 4 Date"
    ];
    const csvData = childrenList.map(r => [
      r.recordNo, r.childName, r.parentName, r.mobile, r.address, r.block,
      r.fu1, r.fu2, r.fu3, r.fu4
    ]);
    const csvContent = [headers.join(","), ...csvData.map(row => row.map(item => `"${item || ''}"`).join(","))].join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `FollowUp_List_${monthsList[parseInt(month) - 1]}_${year}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Excel/CSV Downloaded!");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 px-4 sm:px-6 lg:px-8 font-sans pb-28">
      <Toaster position="top-center" />
      <div className="max-w-5xl mx-auto">
        
        {/* Navigation & Header */}
        <div className="mb-2 flex items-center print:hidden">
          <Button variant="ghost" onClick={() => router.back()} className="pl-0 text-slate-500 hover:text-blue-700 hover:bg-transparent">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back
          </Button>
        </div>

        <div className="mb-8 flex flex-col md:flex-row justify-between md:items-end gap-4 print:hidden">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3">
              <FileText className="text-blue-600 h-8 w-8" />
              Generate Letters for Follow-up
            </h1>
            <p className="mt-2 text-sm text-slate-500">Create official CDPO notification letters for discharged children.</p>
          </div>
          
          {childrenList !== null && (
            <div className="flex gap-2 flex-wrap">
              <Button onClick={handlePrint} variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                <Printer className="w-4 h-4 mr-2" /> Print Letter
              </Button>
              <Button onClick={handleDownloadPDF} variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                <Download className="w-4 h-4 mr-2" /> PDF
              </Button>
              <Button onClick={exportTableToCSV} className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
                <FileSpreadsheet className="w-4 h-4 mr-2" /> Export List
              </Button>
            </div>
          )}
        </div>

        {/* Control Panel (Hidden during print) */}
        <Card className="border-0 shadow-sm mb-8 print:hidden">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Year *</label>
                <select value={year} onChange={(e) => setYear(e.target.value)} className="w-full h-11 px-3 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:ring-2 focus:ring-blue-500/30 outline-none">
                  {Array.from({ length: 15 }, (_, i) => 2012 + i).map(y => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Month *</label>
                <select value={month} onChange={(e) => setMonth(e.target.value)} className="w-full h-11 px-3 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:ring-2 focus:ring-blue-500/30 outline-none">
                  {monthsList.map((m, index) => (
                    <option key={index + 1} value={index + 1}>{m}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">MTC Center</label>
                <select disabled className="w-full h-11 px-3 rounded-xl border border-slate-200 bg-slate-100 text-slate-500 text-sm outline-none cursor-not-allowed">
                  <option>{mtcName}</option>
                </select>
              </div>
              <div>
                <Button onClick={handleGenerate} disabled={loading} className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white">
                  {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <FileText className="w-4 h-4 mr-2" />}
                  Generate Letter
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* The Printable Letter Container */}
        {childrenList !== null && (
          <div className="bg-white rounded-none sm:rounded-xl shadow-lg print:shadow-none border border-slate-200 print:border-none p-8 sm:p-12 text-slate-900 mx-auto" id="printable-letter" style={{ maxWidth: '210mm', minHeight: '297mm' }}>
            
            {/* Letter Header */}
            <div className="text-center font-bold text-xl mb-8 border-b-2 border-slate-800 pb-4 inline-block mx-auto w-full">
              कुपोषण उपचार केन्द्र , {mtcName}
            </div>

            <div className="mb-6 flex justify-between font-medium">
              <div>पत्रांक : ........................</div>
              <div>दिनांक : ........................</div>
            </div>

            {/* Letter Body */}
            <div className="space-y-4 text-base leading-relaxed">
              <div>
                <strong>प्रेषक,</strong><br />
                डॉ.<br />
                प्रभारी चिकित्सा पदाधिकारी,<br />
                कुपोषण उपचार केन्द्र, {mtcName}
              </div>

              <div className="mt-4">
                <strong>सेवा में,</strong><br />
                बाल विकास परियोजना पदाधिकारी,<br />
                ..................................................
              </div>

              <div className="mt-6 flex gap-2">
                <strong className="shrink-0">विषय :</strong> 
                <span className="font-semibold underline">
                  माह {monthsList[parseInt(month) - 1]}, वर्ष: {year} में एम.टी.सी. {mtcName} से उपचारित बच्चों के फोलोअप जाँच के संबंध में |
                </span>
              </div>

              <div className="mt-6">
                <strong>महाशय/महाशया,</strong>
              </div>

              <p className="text-justify indent-8">
                उपर्युक्त विषय के संबंध में कहना है कि माह <strong>{monthsList[parseInt(month) - 1]} {year}</strong> में एम.टी.सी. <strong>{mtcName}</strong> से निम्न बच्चों को उपचार के उपरांत विरमित किया गया है एवं उनका फोलोअप जाँच अनुलग्नक में दिए गए तालिका के अनुसार निर्धारित तिथि पर किया जाना है|
              </p>

              <p className="text-justify indent-8">
                अतः अनुरोध है कि उपंकित बच्चों के फोलोअप सुनिश्चित करने हेतु सम्बन्धित महिला पर्यवेक्षिका / आंगनवाड़ी सेविका को निदेशित करने की कृपा की जाय|
              </p>
              
              <p className="font-semibold">
                अनुलग्नक : फोलोअप जाँच तालिका
              </p>
            </div>

            {/* Signatures */}
            <div className="mt-12 flex justify-end text-center">
              <div>
                <p className="mb-12"><strong>विश्वासभाजन</strong></p>
                <p className="m-0 font-bold">प्रभारी चिकित्सा पदाधिकारी,</p>
                <p>कुपोषण उपचार केन्द्र, {mtcName}</p>
              </div>
            </div>

            {/* CC Section */}
            <div className="mt-8 text-sm space-y-2 border-t border-slate-300 pt-6">
              <p><strong>प्रतिलिपि :</strong> उपायुक्त, ................................. को सूचनार्थ प्रेषित|</p>
              <p><strong>प्रतिलिपि :</strong> असैनिक शल्य चिकित्सक सह मुख्य चिकित्सा पदाधिकारी, .................................. को सूचनार्थ प्रेषित|</p>
              <p><strong>प्रतिलिliteral:</strong> जिला समाज कल्याण पदाधिकारी, ............................... को सूचनार्थ एवं आवश्यक कार्यार्थ प्रेषित|</p>
            </div>

            <div className="mt-12 flex justify-end text-center text-sm">
              <div>
                <p className="mb-10 font-bold">प्रभारी चिकित्सा पदाधिकारी,</p>
                <p>कुपोषण उपचार केन्द्र, {mtcName}</p>
              </div>
            </div>

            {/* Page Break for Print */}
            <div className="page-break" style={{ pageBreakBefore: 'always' }}></div>

            {/* Data Table */}
            <div className="mt-12">
              <h3 className="font-bold text-lg mb-4 text-center underline">अनुलग्नक: फोलोअप जाँच तालिका ({monthsList[parseInt(month) - 1]} {year})</h3>
              <div className="overflow-x-auto border border-slate-300">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-300">
                      <th className="p-2 border-r border-slate-300 font-bold">Record No</th>
                      <th className="p-2 border-r border-slate-300 font-bold">Child Name</th>
                      <th className="p-2 border-r border-slate-300 font-bold">Parent Name</th>
                      <th className="p-2 border-r border-slate-300 font-bold">Mobile</th>
                      <th className="p-2 border-r border-slate-300 font-bold">Address</th>
                      <th className="p-2 border-r border-slate-300 font-bold">Block</th>
                      <th className="p-2 border-r border-slate-300 font-bold">FU 1 Date</th>
                      <th className="p-2 border-r border-slate-300 font-bold">FU 2 Date</th>
                      <th className="p-2 border-r border-slate-300 font-bold">FU 3 Date</th>
                      <th className="p-2 font-bold">FU 4 Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {childrenList.length > 0 ? (
                      childrenList.map((row, idx) => (
                        <tr key={idx}>
                          <td className="p-2 border-r border-slate-200">{row.recordNo}</td>
                          <td className="p-2 border-r border-slate-200 font-semibold">{row.childName}</td>
                          <td className="p-2 border-r border-slate-200">{row.parentName}</td>
                          <td className="p-2 border-r border-slate-200">{row.mobile}</td>
                          <td className="p-2 border-r border-slate-200">{row.address}</td>
                          <td className="p-2 border-r border-slate-200">{row.block}</td>
                          <td className="p-2 border-r border-slate-200">{row.fu1}</td>
                          <td className="p-2 border-r border-slate-200">{row.fu2}</td>
                          <td className="p-2 border-r border-slate-200">{row.fu3}</td>
                          <td className="p-2">{row.fu4}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={10} className="p-6 text-center text-slate-500 italic">No children data available for this month.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

      </div>

      <style jsx global>{`
        @media print {
          body {
            background-color: white !important;
          }
          @page {
            margin: 15mm;
            size: A4 portrait;
          }
        }
      `}</style>

    </div>
  );
}