'use client';

import React, { useState } from 'react';
import { Calendar, Search, Download, Image as ImageIcon } from 'lucide-react';

// --- Types & Interfaces ---
interface KPICardData {
  title: string;
  value: string | number;
  bgColor: string;
}

interface ChartDataItem {
  label: string;
  value: number;
  color: string;
}

// --- Mock Data Constants ---
const KPI_CARDS: KPICardData[] = [
  { title: 'Total Sanctioned MTCs', value: 22, bgColor: '#2ec2fc' },
  { title: 'Total Beds Sanctioned', value: 260, bgColor: '#fa6ec6' },
  { title: 'Total Functional MTCs', value: 21, bgColor: '#a4d97b' },
  { title: 'Total Beds Available', value: 250, bgColor: '#feb638' },
  { title: 'Total Admissions', value: 22249, bgColor: '#f48e50' },
  { title: 'Total Exits', value: 22033, bgColor: '#f17c8a' },
  { title: 'Total Cured', value: 17407, bgColor: '#67aeb3' },
  { title: 'Total Defaulters', value: 2889, bgColor: '#bfd12a' },
  { title: 'Total Deaths', value: 15, bgColor: '#2ec2fc' },
  { title: 'Avg Weight Gain (gm/kg/day)', value: 8.8, bgColor: '#fa6ec6' },
  { title: 'Bed Occupancy Rate (%)', value: 49.87, bgColor: '#a4d97b' },
  { title: 'Average Day of Stay', value: 14.45, bgColor: '#feb638' },
];

const GENDER_DATA: ChartDataItem[] = [
  { label: 'MALE', value: 10162, color: '#ff6384' },
  { label: 'FEMALE', value: 12087, color: '#36a2eb' },
  { label: 'TRANSGENDER', value: 0, color: '#4bc0c0' },
];

const AGE_GROUP_DATA: ChartDataItem[] = [
  { label: '0-6M', value: 1357, color: '#ff6384' },
  { label: '6-24 M', value: 16082, color: '#36a2eb' },
  { label: '24-36 M', value: 2872, color: '#4bc0c0' },
  { label: '>36 M', value: 1934, color: '#9966ff' },
];

const COMPLICATIONS_DATA: ChartDataItem[] = [
  { label: 'COMPLICATED', value: 8177, color: '#ff6384' },
  { label: 'NON COMPLICATED', value: 14072, color: '#36a2eb' },
];

const REFERRED_BY_DATA: ChartDataItem[] = [
  { label: 'ANGANWADI', value: 6460, color: '#ff6384' },
  { label: 'ANM', value: 303, color: '#36a2eb' },
  { label: 'OPD', value: 896, color: '#4bc0c0' },
  { label: 'POSHAN SAKHI', value: 1, color: '#9966ff' },
  { label: 'RBSK TEAM', value: 5, color: '#ffcd56' },
  { label: 'SAHIYA', value: 10616, color: '#ff9f40' },
  { label: 'SELF', value: 2519, color: '#ff6384' },
  { label: 'OTHER', value: 1145, color: '#36a2eb' },
];

const CASTE_DATA: ChartDataItem[] = [
  { label: 'SC', value: 1877, color: '#ff6384' },
  { label: 'ST', value: 16934, color: '#36a2eb' },
  { label: 'OBC', value: 1794, color: '#4bc0c0' },
  { label: 'OTHERS', value: 1644, color: '#9966ff' },
];

const OUTCOME_DATA: ChartDataItem[] = [
  { label: 'CURED', value: 17407, color: '#ff6384' },
  { label: 'DEFAULTER', value: 2889, color: '#36a2eb' },
  { label: 'MEDICAL TRANSFER', value: 439, color: '#4bc0c0' },
  { label: 'NON RESPONDENT', value: 209, color: '#9966ff' },
  { label: 'DEATH', value: 15, color: '#ffcd56' },
];

// --- Custom Chart Components ---

// Doughnut Chart using pure CSS Conic Gradients
const DoughnutChart = ({ data, title }: { data: ChartDataItem[], title: string }) => {
  const total = data.reduce((acc, curr) => acc + curr.value, 0);
  let currentPercentage = 0;
  
  const gradientStops = data.map(item => {
    const percentage = total === 0 ? 0 : (item.value / total) * 100;
    const stop = `${item.color} ${currentPercentage}% ${currentPercentage + percentage}%`;
    currentPercentage += percentage;
    return stop;
  });

  const backgroundStr = total > 0 ? `conic-gradient(${gradientStops.join(', ')})` : '#e5e7eb';

  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-lg h-full">
      <h6 className="text-[#026158] font-bold mb-4">{title}</h6>
      <div className="relative w-40 h-40 rounded-full flex items-center justify-center mb-6" style={{ background: backgroundStr }}>
        {/* Inner white circle for the "donut" effect */}
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-inner">
          <span className="text-gray-400 text-xs font-semibold">Total: {total}</span>
        </div>
      </div>
      <div className="w-full grid grid-cols-1 gap-2 text-xs">
        {data.map((d, i) => (
          <div key={i} className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }}></span>
              <span className="font-semibold text-gray-700 truncate" title={d.label}>{d.label}</span>
            </div>
            <span className="text-gray-500 font-medium">
              {d.value} ({total > 0 ? Math.round((d.value / total) * 100) : 0}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Bar Chart using simple Flexbox logic
const BarChart = ({ data, title }: { data: ChartDataItem[], title: string }) => {
  const max = Math.max(...data.map(d => d.value), 1); // Avoid division by zero

  return (
    <div className="flex flex-col p-4 bg-white rounded-lg h-full w-full">
      <h6 className="text-[#026158] font-bold mb-6 text-center">{title}</h6>
      <div className="flex-1 flex items-end justify-around gap-2 pb-2 border-b border-gray-200 relative pt-8 min-h-[160px]">
        {data.map((d, i) => (
          <div key={i} className="flex flex-col items-center group w-full relative h-full justify-end">
            <div className="opacity-0 group-hover:opacity-100 absolute -top-7 bg-gray-800 text-white text-[10px] py-0.5 px-1.5 rounded whitespace-nowrap transition-opacity z-10 pointer-events-none">
              {d.value}
            </div>
            <div 
              className="w-full rounded-t-sm transition-all duration-700 ease-out hover:opacity-80" 
              style={{ height: `${(d.value / max) * 100}%`, backgroundColor: d.color, minHeight: d.value > 0 ? '4px' : '0' }}
            ></div>
          </div>
        ))}
      </div>
      <div className="flex justify-around gap-2 pt-3 h-16">
        {data.map((d, i) => (
          <div key={i} className="w-full flex justify-center">
             <span 
              className="text-[9px] text-gray-600 text-center leading-tight wrap-break-words max-w-full font-medium" 
              title={`${d.label}: ${d.value}`}
             >
               {d.label}
             </span>
          </div>
        ))}
      </div>
    </div>
  );
};


// --- Main Dashboard Component ---
export default function Dashboard() {
  const [fromDate, setFromDate] = useState('2010-01-01');
  const [toDate, setToDate] = useState('2026-04-28');
  const [division, setDivision] = useState('');
  const [district, setDistrict] = useState('');
  const [mapMode, setMapMode] = useState<'districts' | 'division'>('division');

  const handleSearch = () => {
    console.log('Searching dashboard with:', { fromDate, toDate, division, district });
  };

  const handleMapClick = (divId: number) => {
    console.log('Division Selected on Map:', divId);
    setDivision(divId.toString());
  };

  return (
    <div className="w-full p-4 font-sans text-gray-800 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden mt-4">
        
        {/* Filters Row */}
        <div className="p-4 border-b border-gray-100 bg-white z-10 relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 items-end">
            <div className="lg:col-span-2 flex flex-col">
              <label className="text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">From Date</label>
              <div className="relative">
                <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} className="w-full pl-3 pr-8 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-[#0b918c]" />
                <Calendar size={14} className="absolute right-2 top-2.5 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div className="lg:col-span-2 flex flex-col">
              <label className="text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">To Date</label>
              <div className="relative">
                <input type="date" value={toDate} onChange={e => setToDate(e.target.value)} className="w-full pl-3 pr-8 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-[#0b918c]" />
                <Calendar size={14} className="absolute right-2 top-2.5 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div className="lg:col-span-3 flex flex-col">
              <label className="text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Division</label>
              <select value={division} onChange={e => setDivision(e.target.value)} className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-[#0b918c] bg-white">
                <option value="">Select Division</option>
                <option value="1">NORTH CHOTANAGPUR</option>
                <option value="2">SOUTH CHOTANAGPUR</option>
                <option value="3">PALAMU</option>
                <option value="4">SANTHAL</option>
                <option value="5">KOLHAN</option>
              </select>
            </div>
            <div className="lg:col-span-3 flex flex-col">
              <label className="text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">District</label>
              <select value={district} onChange={e => setDistrict(e.target.value)} className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-[#0b918c] bg-white">
                <option value="">Select District</option>
                <option value="1">BOKARO</option>
                <option value="8">RANCHI</option>
                <option value="4">DHANBAD</option>
                <option value="22">EAST SINGHBHUM</option>
                {/* Other options truncated for brevity */}
              </select>
            </div>
            <div className="lg:col-span-2 flex flex-col">
              <button onClick={handleSearch} className="inline-flex items-center justify-center w-full px-4 py-2 border border-[#17a2b8] text-sm font-medium rounded text-[#17a2b8] hover:text-white bg-white hover:bg-[#17a2b8] transition-colors">
                <Search size={16} className="mr-2" /> Search
              </button>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-6 bg-gray-50/30">
          
          {/* Header & Export Actions */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <div className="text-[#026158] font-bold text-lg">
              Inception Report <span className="text-sm font-normal text-gray-500 ml-2">({fromDate} to {toDate})</span>
            </div>
            <div className="flex gap-2 mt-4 sm:mt-0">
              <button className="p-2 bg-[#17a2b8] text-white rounded hover:bg-[#138496] transition-colors shadow-sm" title="Download Excel">
                <Download size={16} />
              </button>
              <button className="p-2 bg-[#17a2b8] text-white rounded hover:bg-[#138496] transition-colors shadow-sm" title="Download Image">
                <ImageIcon size={16} />
              </button>
            </div>
          </div>

          {/* Map and KPI Cards Layout */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 mb-8">
            
            {/* SVG Map Section */}
            <div className="xl:col-span-7 bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col">
              
              {/* Map Toggle controls */}
              <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-4">
                <div className="bg-gray-100 p-1 rounded-md inline-flex">
                  <button onClick={() => setMapMode('districts')} className={`px-4 py-1 text-xs font-semibold rounded-sm transition-all ${mapMode === 'districts' ? 'bg-[#28a745] text-white shadow-sm' : 'text-gray-600 hover:text-gray-800'}`}>
                    Districts
                  </button>
                  <button onClick={() => setMapMode('division')} className={`px-4 py-1 text-xs font-semibold rounded-sm transition-all ${mapMode === 'division' ? 'bg-[#28a745] text-white shadow-sm' : 'text-gray-600 hover:text-gray-800'}`}>
                    Division
                  </button>
                </div>
                <h6 className="text-[#0b918c] font-bold text-sm">Jharkhand Map</h6>
              </div>

              {/* Interactive SVG */}
              <div className="flex-1 flex items-center justify-center">
                <svg viewBox="0 0 841.89 595.28" className="w-full h-auto max-h-[450px] drop-shadow-md">
                  <g>
                    {/* Santhal Pargana */}
                    <path onClick={() => handleMapClick(4)} className="cursor-pointer hover:opacity-80 transition-opacity duration-200" fill="#E77E26" stroke="#ffffff" strokeWidth="2" strokeMiterlimit="10" d="M455.84,370.381c8.108,4.65,15.704-4.428,24.996,1c-0.657,3.658,2.164,3.836,2,7 c3.412,1.588,7.936,2.064,11.998,3c-0.438,3.438,0.396,5.604,1,7.998c6.164,0.836,7.414,6.586,12.999,8 c3.765-0.234,4.233-3.766,7.999-4c7.674,11.83,29.896-1.396,35.996,7.998c2.9,0.096,5.75-4.213,6.998,0 c0.75,7.75-10.803,3.195-14.998,6c1.984,11.762-4.496,16.125-6,23.996c7.086,3.244,10.314,16.59,17.998,8 c3.023,6.311,12.051,6.613,13.998,13.998c-1.287,1.031-2.572,10.516,1,9.998c3.141-0.473,2.643,2.691,5,3 c2.867-4.824,13.08-0.691,16.998,0c-0.023,2.355,1.723,2.943,1,6c0.563,2.17,2.387,8.188,0,9.998c-1.428-0.238-1.688-1.646-3-2 c-0.811,0.191-0.996,1.004-2,1c0,2.334,0,4.666,0,7c3.699,4.301,13.297,2.699,14.998,8.998c-0.633,3.367-2.871,5.127-2,10 c5.939,0.303,11.74,8.293,7,12.998c-6.666,0.998-8.637-2.697-13.998-3c-0.74,3.664,2.459,5.555,0,7.998 c-21.131,4.74-32.088-15.143-48.994-20.996c-2.092,3.24-4.086,6.58-8.998,6.998c-8.669-6.33-17.852-12.145-21.998-22.996 c-8.924-0.484-11.357-7.896-20.998-5c-8.645-1.354-8.18-11.816-14.998-14.998c-0.934,7.732-8.381,8.949-11.998,13.998 c2.364,7.094,13.801,10.768,6.999,20.998c1.752,1.914,2.12,5.213,3,7.998c-1.631,3.369-5.731,4.268-5.999,9 c0.906,3.76,5.109,4.221,4.999,8.998c-4.794,13.4-8.272,28.332-19.997,36.996c-1.48,1.158-2.521,1.158-4,0 c-9.888-0.902-16.256,0.869-18.998-7c2.516-5.818,7.038-9.627,10.999-13.998c-6.731-2.184-10.515,6.658-18.997,6 c-4.212-3.73-9.699-4.652-16.999-3c-7.798-6.867-20.896-8.434-30.996-12.998c-2.908,5.09-9.294,6.703-14.998,8.998 c-3.31,5.355-5.09,12.242-10.999,14.998c-1.795-0.994-1.311-5.877-4-7.998c-1.982-1.564-7.626-0.455-10.999-2 c-6.348-2.908-5.533-5.893-9.999-6c-5.597-0.133-6.65,5.506-11.998,4c9.062-9.936,12.594-25.402,19.997-36.996 c-4.245-6.516-1.744-20.248-5.999-28.996c0.36-4.504-0.733-18.182,5-17.998c-2.579-13.002,6.885-29.229,10.999-41.994 c9.86,3.752,17.701-1.975,21.997-6.998c14.664-0.666,18.969,9.027,26.997,14.998c7.566-5.434,15.771-10.227,18.998-19.998 c14.771-5.814,28.089-3.479,38.995,4C457.084,401.115,432.272,375.484,455.84,370.381z"></path>
                    {/* South Chotanagpur */}
                    <path onClick={() => handleMapClick(2)} className="cursor-pointer hover:opacity-80 transition-opacity duration-200" fill="#9459A4" stroke="#ffffff" strokeWidth="2" strokeMiterlimit="10" d="M318.004,280.28c-2.857-4.476-5.871-8.794-8.999-12.999 c1.591-2.408,4.686-3.313,6-5.999c0.659-7.658-2.028-11.97-2-18.998c-9.906-0.425-16.084-4.58-23.997-6.999 c-0.229-6.104-0.966-11.7-6-12.999c-0.836,0.801-0.652,3.026-2,4c-6.533,4.716-15.119,8.248-23.997,7.999 c-2.277-8.693,4.801-15.56,4-25.997c-5.203-1.129-4.21-8.455-6.999-11.998c-6.827,0.827-11.275-0.724-10.999-7 c1.529-3.137,6.618-2.714,7-6.999c-1.208-0.211-0.615-1.109,0-2c-6.308-5.024-9.801-12.863-20.998-12.999 c-0.348-5.984-4.808-7.857-6.999-11.999c-1.578-4.577,4.15-1.849,4-5c-2.281-4.384-3.988-9.343-6.999-12.998 c-3.562-0.229-5.228,1.438-5,5c-2.807-1.983-9.853-2.869-10.999,0c0.022,2.355-1.722,2.944-1,5.999c-1.163-0.163-1.779,0.221-2,1 c-1.926-0.407-0.79-3.876-3.999-3c-2.761-0.428-0.938,3.728-3,4c-9.523-7.694-5.388-23.024-16.998-27.996 c-6.991,1.18-6.905,8.295-7,13.998c-11.185,7.302-29.34,5.837-40.995,7.999c-6.233,1.233-6.765-3.233-12.999-2 c-4.158-3.697-10.934,0.752-12.998-4c-0.61,0.056-1.184,0.149-1,1c-2.032,2.635-6.677,2.655-9.999,4 c-14.563,1.408-11.879,20.913-2,24.997c-7.648,10.155-7.386,23.762-14.998,34.996c-1.387,1.612-2.064,3.936-4,4.999c0,1,0,2,0,3 c1.003-0.003,1.19,0.81,2,1c0.333,0,0.667,0,1,0c2.268,2.398,9.784-0.452,10.999,3c0.75,6.582,6.671,7.994,13.999,7.999 c-2.354,14.006,4.944,26.774,15.998,32.996c1.386,2.613,8.485-0.486,9.999,2c-0.728,2.728,1.987,2.013,2,4 c3.083,1.917,0.782,9.217,3,11.999c0.573,18.758,10.748,27.915,29.996,27.997c2.832-0.834,1.189-6.144,3-8 c3.767-0.899,6.996-2.337,10.999-3c0.224,20.13-8.093,27.625-10.999,42.995c1.842,1.49,3.508,3.158,5,4.998 c4.538,0.539,2.67-5.328,6.999-4.998c3.412,0.588,2.467,5.531,5,6.998c5.236,0.904,3.763-4.902,8.999-3.998 c4.19-0.191,3.091,4.908,7.999,3.998c4.635-1.031,7.788-3.543,10.999-5.998c-1.737-12.736,1.97-20.027,10.999-21.998 c-0.5-10.383,1.294-21.93,11.999-17.998c-0.526-2.555-1.326-3.5,1-5c10.337,2.672,9.682-5.649,17.998-4.999 c3.17,1.829,4.488,5.51,5.999,8.999c4.367-1.299,4.523-6.809,10.999-5.999c4.919,0.081,3.578,6.421,7.999,6.999 c4.351,0.018,5.574-3.091,10.999-2c2.416,2.583,2.946,7.052,4,10.999c6.881-1.883,6.819,3.179,10.999,3.999 c2.359-1.974,5.202-3.464,7.999-4.999c2.76,0.238,2.281,3.717,4,4.999c2.406-8.285,2.344-16.19-2-21.998 C311.625,283.233,315.079,282.021,318.004,280.28z"></path>
                    {/* North Chotanagpur */}
                    <path onClick={() => handleMapClick(1)} className="cursor-pointer hover:opacity-80 transition-opacity duration-200" fill="#7292CB" stroke="#ffffff" strokeWidth="2" strokeMiterlimit="10" d="M318.225,279.881c6.33,0.542,7.717,2.103,13.998,1c0,1.666,0,3.332,0,4.999 c5.694-0.027,8.792,2.54,14.999,2c1.357-2.976,0.729-7.937,4.999-7.999c2.576,1.424,5.657,2.342,6,5.999 c-1.013,3.32-5.534,3.132-5,7.999c8.943,5.675,24.155,14.781,37.995,9c2.082,3.055,5.445-0.35,6.999,3.998 c1.185-2.48,1.059-6.273,6-4.998c1.797,10.533,9.015,15.648,17.998,18.996c1.4,1.658,9.599,1.658,10.999,0 c11.225-2.225,14.988,3.01,21.997,5c6.673,3.393,0.886,18.957-4.999,21.998c-1.538,11.172,9.568,14.012,6.998,22.996 c-23.566,5.104,1.245,30.734-3.999,42.996c-10.906-7.479-24.224-9.814-38.995-4c-3.227,9.771-11.431,14.564-18.998,19.998 c-8.028-5.971-12.333-15.664-26.997-14.998c-4.296,5.023-12.137,10.75-21.997,6.998c-4.113,12.766-13.577,28.992-10.999,41.994 c-5.732-0.184-4.639,13.494-5,17.998c-6.943,4.723-17.681,5.65-23.997,10.998c-8.854-9.342-21.838,1.078-30.996,1 c-8.412-0.07-21.137-8.404-33.996-1.998c-4.842,19.445-31.53,8.885-47.994,6.998c-2.814-4.184-6.652-7.346-5.999-14.998 c-8.641-5.004-22.393-9.17-21.997-19.998c8.211-14.947,40.002-2.553,37.995-28.996c14.391,1.059,9.854-16.809,21.997-17.998 c0.093-6.475,5.082-11.621-1-17.996c-11.613,3.484-19.572,0.15-26.997-6c-2.404,0.928,0.605,7.271-4,6 c-8.664-1.852-2.233-14.986-6.999-21.998c-4.01-1.656-9.618-1.715-10.999-6c0.158-11.174,5.296-17.367,4-29.996 c5.236,0.904,3.763-4.902,8.999-3.998c4.19-0.191,3.091,4.908,7.999,3.998c4.635-1.031,7.788-3.543,10.999-5.998 c-1.737-12.736,1.97-20.027,10.999-21.998c-0.5-10.383,1.294-21.93,11.999-17.998c-0.526-2.555-1.326-3.5,1-5 c10.337,2.672,9.682-5.648,17.998-4.998c3.17,1.828,4.488,5.51,5.999,8.998c4.367-1.299,4.523-6.809,10.999-5.999 c4.919,0.081,3.578,6.421,7.999,6.999c4.351,0.018,5.574-3.092,10.999-2c2.416,2.584,2.946,7.052,4,11 c6.881-1.883,6.819,3.178,10.999,3.998c2.359-1.973,5.202-3.463,7.999-4.998c2.76,0.238,2.281,3.717,4,4.998 c2.406-8.285,2.344-16.189-2-21.997C311.847,282.834,315.3,281.623,318.225,279.881z"></path>
                    {/* Kolhan */}
                    <path onClick={() => handleMapClick(5)} className="cursor-pointer hover:opacity-80 transition-opacity duration-200" fill="#28B999" stroke="#ffffff" strokeWidth="2" strokeMiterlimit="10" d="M722.859,16.697c9.268,6.139,22.439,7.22,30.996,15.998 c-2.416,5.649-1.047,7.999,1,12.999c-3.24,1.759-1.768,8.231-4,10.999c3.078-0.745,1.922,2.744,5,2c2.188,2.145,6.521,2.144,7,6 c2.047,4.284-0.342,13.005,1.998,16.998c0.334,0,0.668,0,1,0c1.932,7.951-4.666,12.637-2,17.998 c3.156,4.668-5.713,4.581-4.998,9.999c4.988,0.157,5.912,1.426,9.998,4c0.744,3.078-2.744,1.921-2,5 c0.857,2.738,5.566,4.933,3,7.999c-1.098,7.669,0.391,14.132-9.998,15.998c-2.348-1.363-6.084-6.524-9-4 c3.609,3.391,3.621,10.378,7,13.998c-5.953,16.057-10.17,36.254-28.996,41.995c-0.045,1.71,0.742,2.59,2,3 c3.277,1.722,5.877,4.121,6.998,7.999c-0.188,2.813-1.738,4.26-5,4c-4.783,1.075-7.316-5.29-10.998-2 c0.396,5.729-0.867,9.798-3,12.998c-4.891,0.187-6.475-7.011-10.998-4c-2.311,2.055-0.693,8.635,0,10.999 c-2.338,0.329-4.131,1.202-6,2c-2.176,2.191,3.436,5.917-0.998,7.999c-7.289-2.39-12.225-9.095-19.998-3 c-2.721-0.613-1.43-5.236-3-6.999c-4.367,1.311-9.035-2.221-10.998,0c-1.209,5.874,4.877,4.455,4.998,8.999 c5.473,1.187,4.68,9.422,3,16.998c-3.055-0.722-3.643,1.022-5.998,1c-2.512,1.738,2.547,7.071-2,7.999 c-3.125,0.458-3.197-2.136-3-5c-4.744,2.65-8.436-0.568-11.998-2c-2.094,2.485,5.855,3.433,3.998,8.999 c-1.91,1.421-2.867,3.798-5.998,4c-4.533-5.956-9.631-0.154-13.998-5c-4.244-1.423-5.004-6.328-12-4.999 c-4.094-0.239-5.268-3.397-8.998-4c-3.092,4.466-6.883,10.507-12.998,8.999c0,0.333,0,0.667,0,1c-1.828-1.506-2.352-4.313-4-5.999 c-18.756-6.908-30.359-20.967-48.994-27.997c7.451-3.604,29.52-21.51,4-22.997c4.281-11.385,1.846-25.105-7.998-33.996 c4.422-6.553,9.348-15.172,9.998-24.997c8.746-1.251,9.451-10.546,15.998-13.998c3.164,4.946,12.861,6.589,18.998,3 c2.797-1.536,2.236-6.429,5.998-6.999c6.895,3.437,7.119,13.546,19.998,10.999c0.881-6.452,2.865-11.799,7.998-13.999 c3.602,1.733,5.779,4.887,10,6c0,0.333,0,0.667,0,1c2.275,2.157,3.873-2.002,5.998-3c-4.854-6.565,4.875-12.414,4-14.998 c-0.635-16.548,2.406-21.334,10.998-30.996c-9.609-16.804,8.152-36.949,21.998-31.996c4.707-0.625,3.643-7.022,4-11.998 c0-1,0-2,0-3c4.912-1.087,7.902-4.095,11.998-5.999c5.209,2.08,7.789,3.902,12.998,4c0-0.667,0-1.333,0-2 c2.447-2.552,4.105-5.894,5-9.999c0.332,0,0.666,0,1,0c1.666,0,3.332,0,4.998,0c1.191-2.143,1.08-5.586,3-6.999 c0.852,0.184,0.943-0.39,1-1C721.527,16.697,722.193,16.697,722.859,16.697z"></path>
                    {/* Palamu */}
                    <path onClick={() => handleMapClick(3)} className="cursor-pointer hover:opacity-80 transition-opacity duration-200" fill="#E64C3C" stroke="#ffffff" strokeWidth="2" strokeMiterlimit="10" d="M249.224,180.879c-0.628-10.959,9.069-11.595,12.998-17.998 c4.505,0.828,8.396,2.27,12.999,3c-1.05-6.383,2.745-7.921,4-11.999c11.956-0.107,10.596-8.708,20.997-8.999 c1.197,2.803,1.1,6.899,1,10.999c9.637-2.079,6.718,10.673,8.999,12.999c5.029-0.697,6.969,1.696,11.999,1 c3.585-1.748,4.95-5.715,8.999-7c2.617,3.059,3.168,2.976,7,1c-0.207,2.874,0.253,5.079,2,6c4.791-3.002,10.456-6.041,7.999-10.999 c8.612-2.72,18.006-4.658,21.997-11.999c20.531-2.481,25.428,0.004,41.995-3.999c1.984-1.349-0.315-6.981,3-7 c3.509,3.432,9.067,1.52,11.998-1c0.449-5.115-2.738-6.594-3-10.999c9.025-4.973,5.702-22.294,16.998-24.997 c3.281,2.169,7.699,2.267,11.999,1c7.685,3.313,8.801,13.196,20.997,11.999c4.6-1.399,4.008-7.992,10.999-7 c2.493,8.505,13.169,8.829,14.998,17.998c-9.396,8.903,6.854,23.278,12.999,10.999c4.23,4.409,9.032,3.863,13.998,5.999 c1.033,8.7-0.759,14.573-6,16.998c7.998,5.667,15.754,11.577,23.998,16.998c9.844,8.891,12.279,22.61,7.998,33.996 c25.52,1.487,3.451,19.393-4,22.997c18.635,7.03,30.238,21.088,48.994,27.997c1.648,1.686,2.172,4.493,4,5.999 c0.143,3.857,3.379,4.621,3,8.999c-2.537,12.188-12.76,11.569-22.998,11.999c-1.67-1.604-10.717-2.102-10.998,1 c-0.334,0-0.666,0-1,0c-1.508,5.491-5.527,8.471-9.998,10.999c-13.689-4.75-19.285,6.512-27.997,9.999 c3.69,9.805-1.646,21.383-9.999,24.996c-2.762,0.429-0.938-3.727-3-3.998c-2.224-1.776-7.557-0.442-7.998-4 c-0.19-0.811-1.004-0.996-1-2c-7.362,2.13-7.473-1.445-11.999-4c0.199-2.303,1.382-9.127,1-14.998 c-5.735,5.695-14.194-0.169-18.997,0c-3.605,6.285,1.951,11.128,3.999,14.998c-7.614,2.719-21.421-0.756-28.997,2 c-0.947,2.492,3.57,6.032-0.999,6c-7.009-1.99-10.772-7.227-21.997-5c-3.666,0-7.332,0-10.999,0 c-8.983-3.349-16.2-8.463-17.998-18.998c-4.941-1.273-4.815,2.518-6,5c-1.554-4.349-4.917-0.943-6.999-4 c-13.84,5.782-29.052-3.322-37.995-8.999c-0.535-4.867,3.986-4.679,5-7.999c-0.342-3.657-3.423-4.576-6-5.999 c-4.271,0.062-3.642,5.024-4.999,7.999c-6.207,0.541-9.305-2.027-14.999-2c0-1.667,0-3.333,0-4.999 c-6.281,1.103-7.668-0.458-13.998-1c-2.857-4.476-5.871-8.794-8.999-12.999c1.591-2.408,4.686-3.313,6-5.999 c0.659-7.658-2.028-11.97-2-18.998c-9.906-0.425-16.084-4.58-23.997-6.999c-0.229-6.104-0.966-11.7-6-12.999 c-0.836,0.801-0.652,3.026-2,4c-6.533,4.716-15.119,8.248-23.997,7.999c-2.277-8.693,4.801-15.56,4-25.997 c-5.203-1.129-4.21-8.455-6.999-11.998c-6.827,0.827-11.275-0.724-10.999-7c1.529-3.137,6.618-2.714,7-6.999 C248.016,182.667,248.609,181.77,249.224,180.879z"></path>
                    
                    {/* SVG Labels */}
                    <text transform="matrix(1 0 0 1 104.5 215.89)" fill="#FFFFFF" fontSize="15" className="font-bold pointer-events-none drop-shadow-md">PALAMU DIVISION</text>
                    <text transform="matrix(1 0 0 1 320.5 215.89)" fill="#FFFFFF" fontSize="15" className="font-bold pointer-events-none drop-shadow-md">NORTH CHOTANAGPUR</text>
                    <text transform="matrix(1 0 0 1 365.5 235.89)" fill="#FFFFFF" fontSize="15" className="font-bold pointer-events-none drop-shadow-md">DIVISION</text>
                    <text transform="matrix(1 0 0 1 581.5 161.89)" fill="#FFFFFF" fontSize="15" className="font-bold pointer-events-none drop-shadow-md">SANTHAL PARGANA</text>
                    <text transform="matrix(1 0 0 1 620.5 181.89)" fill="#FFFFFF" fontSize="15" className="font-bold pointer-events-none drop-shadow-md">DIVISION</text>
                    <text transform="matrix(1 0 0 1 374.4 454.37)" fill="#FFFFFF" fontSize="15" className="font-bold pointer-events-none drop-shadow-md">KOLHAN DIVISION</text>
                    <text transform="matrix(1 0 0 1 223.8 369.58)" fill="#FFFFFF" fontSize="15" className="font-bold pointer-events-none drop-shadow-md">SOUTH CHOTANAGPUR</text>
                    <text transform="matrix(1 0 0 1 268.8 390.79)" fill="#FFFFFF" fontSize="15" className="font-bold pointer-events-none drop-shadow-md">DIVISION</text>
                  </g>
                </svg>
              </div>
            </div>

            {/* KPI Cards Section */}
            <div className="xl:col-span-5 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-2 gap-3">
              {KPI_CARDS.map((kpi, index) => (
                <div key={index} className="rounded-xl p-4 flex flex-col justify-center items-center text-center shadow-sm transition-transform hover:-translate-y-1 duration-200" style={{ backgroundColor: kpi.bgColor }}>
                  <h3 className="text-2xl lg:text-3xl font-light text-white mb-1 drop-shadow-sm">{kpi.value}</h3>
                  <h6 className="text-xs lg:text-sm font-medium text-white/90 leading-tight">{kpi.title}</h6>
                </div>
              ))}
            </div>
            
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="rounded-xl shadow-sm border border-gray-100 relative group h-80">
              <button className="absolute top-3 right-3 p-1.5 bg-gray-100 hover:bg-gray-200 rounded text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity z-10" title="Download Image">
                <ImageIcon size={14} />
              </button>
              <DoughnutChart title="Gender Distribution" data={GENDER_DATA} />
            </div>
            
            <div className="rounded-xl shadow-sm border border-gray-100 relative group h-80">
              <button className="absolute top-3 right-3 p-1.5 bg-gray-100 hover:bg-gray-200 rounded text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity z-10" title="Download Image">
                <ImageIcon size={14} />
              </button>
              <BarChart title="Age Group" data={AGE_GROUP_DATA} />
            </div>

            <div className="rounded-xl shadow-sm border border-gray-100 relative group h-80">
              <button className="absolute top-3 right-3 p-1.5 bg-gray-100 hover:bg-gray-200 rounded text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity z-10" title="Download Image">
                <ImageIcon size={14} />
              </button>
              <DoughnutChart title="Complicated and Non-Complicated SAM" data={COMPLICATIONS_DATA} />
            </div>

            <div className="rounded-xl shadow-sm border border-gray-100 relative group h-80">
              <button className="absolute top-3 right-3 p-1.5 bg-gray-100 hover:bg-gray-200 rounded text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity z-10" title="Download Image">
                <ImageIcon size={14} />
              </button>
              <BarChart title="Referred By" data={REFERRED_BY_DATA} />
            </div>

            <div className="rounded-xl shadow-sm border border-gray-100 relative group h-80">
              <button className="absolute top-3 right-3 p-1.5 bg-gray-100 hover:bg-gray-200 rounded text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity z-10" title="Download Image">
                <ImageIcon size={14} />
              </button>
              <BarChart title="Caste Wise Distribution" data={CASTE_DATA} />
            </div>

            <div className="rounded-xl shadow-sm border border-gray-100 relative group h-80">
              <button className="absolute top-3 right-3 p-1.5 bg-gray-100 hover:bg-gray-200 rounded text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity z-10" title="Download Image">
                <ImageIcon size={14} />
              </button>
              <BarChart title="Outcome Indicators" data={OUTCOME_DATA} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

