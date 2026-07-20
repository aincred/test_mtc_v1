'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Send, Plus, Edit, Trash2, ArrowLeft, Save, X, MessageSquare, Filter, Calendar, Search } from 'lucide-react';

// --- Types ---
interface Contact {
  id: number;
  type: 'state' | 'district' | 'mtc';
  stateName?: string;
  districtName?: string;
  districtId?: string; // Used for MTC filtering
  mtcName?: string;
  name?: string;
  mobile: string;
}

interface FollowUpChild {
  id: number;
  recordNo: string;
  samNo: string;
  childName: string;
  guardianName: string;
  mobile: string;
  followUpDate: string;
  mtcName: string;
}

// --- Constants ---
const DISTRICTS = [
  { id: '1', name: 'BOKARO' }, { id: '2', name: 'CHATRA' }, { id: '16', name: 'DEOGHAR' },
  { id: '4', name: 'DHANBAD' }, { id: '17', name: 'DUMKA' }, { id: '22', name: 'EAST SINGHBHUM' },
  { id: '14', name: 'GARHWA' }, { id: '3', name: 'GIRIDIH' }, { id: '18', name: 'GODDA' },
  { id: '9', name: 'GUMLA' }, { id: '6', name: 'HAZARIBAGH' }, { id: '19', name: 'JAMTARA' },
  { id: '10', name: 'KHUNTI' }, { id: '7', name: 'KODERMA' }, { id: '15', name: 'LATEHAR' },
  { id: '11', name: 'LOHARDAGA' }, { id: '20', name: 'PAKUR' }, { id: '13', name: 'PALAMU' },
  { id: '5', name: 'RAMGARH' }, { id: '8', name: 'RANCHI' }, { id: '21', name: 'SAHIBGANJ' },
  { id: '23', name: 'SERAIKELA' }, { id: '12', name: 'SIMDEGA' }, { id: '24', name: 'WEST SINGHBHUM' }
];

const MOCK_MTCS: Record<string, { id: string; name: string }[]> = {
  '1': [{ id: '101', name: 'CHAS MTC' }, { id: '102', name: 'BERMO MTC' }],
  '7': [{ id: '69', name: 'DOMCHANCH' }, { id: '70', name: 'KODERMA' }, { id: '71', name: 'SATGAWA' }],
  '8': [{ id: '801', name: 'RANCHI SADAR' }, { id: '802', name: 'RIMS MTC' }],
};

// --- Mock Data ---
const STATE_CONTACTS: Contact[] = [
  { id: 4, type: 'state', stateName: 'Jharkhand', name: 'PRITISH NAYAK, NUTRITION OFFICER, UNICEF', mobile: '7772895526' },
  { id: 5, type: 'state', stateName: 'Jharkhand', name: 'VIKASH SEET, STATE CONSULTANT, AMB & MIS', mobile: '8210061193' },
  { id: 7, type: 'state', stateName: 'Jharkhand', name: 'SUJIT SINHA, CONSULTANT, F-SAM', mobile: '9471355854' },
  { id: 8, type: 'state', stateName: 'Jharkhand', name: 'PRATIMA SINGH, CONSULTANT-MN & VAS', mobile: '9431180411' },
];

const DISTRICT_CONTACTS: Contact[] = [
  { id: 23, type: 'district', districtName: 'BOKARO', mobile: '8340268013' },
  { id: 24, type: 'district', districtName: 'CHATRA', mobile: '9470102901' },
  { id: 25, type: 'district', districtName: 'GIRIDIH', mobile: '9570200749' },
  { id: 26, type: 'district', districtName: 'DHANBAD', mobile: '9031080232' },
];

const MTC_CONTACTS: Contact[] = [
  { id: 69, type: 'mtc', districtId: '7', mtcName: 'DOMCHANCH', mobile: '9999999999' },
  { id: 70, type: 'mtc', districtId: '7', mtcName: 'KODERMA', mobile: '9999999999' },
  { id: 71, type: 'mtc', districtId: '7', mtcName: 'SATGAWA', mobile: '9999999999' },
];

const MOCK_FOLLOW_UP_CHILDREN: FollowUpChild[] = [
  { id: 1, recordNo: '563728', samNo: 'JH/BOK/BOK/2480', childName: 'SHIV KUMAR SOREN', guardianName: 'Ramesh Soren', mobile: '9102896621', followUpDate: '2026-05-01', mtcName: 'CHAS MTC' },
  { id: 2, recordNo: '563873', samNo: 'JH/BOK/BOK/2481', childName: 'ASHA KUMARI', guardianName: 'Sita Devi', mobile: '8388867013', followUpDate: '2026-05-02', mtcName: 'CHAS MTC' },
  { id: 3, recordNo: '563993', samNo: 'JH/KOD/DOM/1022', childName: 'MEERA KARMKAR', guardianName: 'Sunil Karmkar', mobile: '9647384064', followUpDate: '2026-05-05', mtcName: 'DOMCHANCH' },
];

export default function CustomSMS() {
  // --- State ---
  const [view, setView] = useState<'list' | 'send' | 'edit'>('list');
  const [activeTab, setActiveTab] = useState<'followup' | 'district' | 'state' | 'mtc'>('followup');
  const [contacts, setContacts] = useState<Contact[]>([...STATE_CONTACTS, ...DISTRICT_CONTACTS, ...MTC_CONTACTS]);
  
  // Contacts Filters
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>('');

  // Follow-up Filters
  const [fFromDate, setFFromDate] = useState('');
  const [fToDate, setFToDate] = useState('');
  const [fDistrict, setFDistrict] = useState('');
  const [fMtc, setFMtc] = useState('');
  const [fRecordNo, setFRecordNo] = useState('');
  const [fSamNo, setFSamNo] = useState('');
  const [fChildName, setFChildName] = useState('');
  const [followUpResults, setFollowUpResults] = useState<FollowUpChild[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Custom SMS Form State
  const [mobileNumber, setMobileNumber] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  // Edit Contact Form State
  const [editContact, setEditContact] = useState<Contact | null>(null);

  // Computed data
  const displayedContacts = contacts.filter(c => {
    if (c.type !== activeTab) return false;
    if (activeTab === 'mtc' && selectedDistrictId && c.districtId !== selectedDistrictId) return false;
    return true;
  });

  const availableMtcsForFollowUp = fDistrict ? MOCK_MTCS[fDistrict] || [] : [];

  // --- Handlers: List View (Contacts) ---
  const handleDeleteContact = (id: number) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      setContacts((prev) => prev.filter((c) => c.id !== id));
    }
  };

  const handleEditClick = (contact: Contact) => {
    setEditContact(contact);
    setView('edit');
  };

  const handleAddClick = () => {
    if (activeTab === 'followup') return;
    setEditContact({ 
      id: 0, 
      type: activeTab as 'state' | 'district' | 'mtc', 
      stateName: activeTab === 'state' ? 'Jharkhand' : '', 
      districtName: '', 
      districtId: selectedDistrictId || '',
      mtcName: '',
      name: '', 
      mobile: '' 
    });
    setView('edit');
  };

  const handleDirectSendClick = (mobile: string) => {
    setMobileNumber(mobile);
    setView('send');
  };

  // --- Handlers: Follow-up View ---
  const handleFollowUpSearch = () => {
    console.log("Searching Follow-ups with:", { fFromDate, fToDate, fDistrict, fMtc, fRecordNo, fSamNo, fChildName });
    // Simulate search logic
    let results = [...MOCK_FOLLOW_UP_CHILDREN];
    if (fRecordNo) results = results.filter(c => c.recordNo.includes(fRecordNo));
    if (fSamNo) results = results.filter(c => c.samNo.includes(fSamNo));
    if (fChildName) results = results.filter(c => c.childName.toLowerCase().includes(fChildName.toLowerCase()));
    
    setFollowUpResults(results);
    setHasSearched(true);
  };

  const resetFollowUpFilters = () => {
    setFFromDate(''); setFToDate(''); setFDistrict(''); setFMtc('');
    setFRecordNo(''); setFSamNo(''); setFChildName('');
    setFollowUpResults([]);
    setHasSearched(false);
  };

  // --- Handlers: Edit Contact Form ---
  const handleSaveContact = (e: FormEvent) => {
    e.preventDefault();
    if (!editContact?.mobile) return;

    if (editContact.id === 0) {
      const newId = Math.max(...contacts.map(c => c.id), 0) + 1;
      setContacts([{ ...editContact, id: newId }, ...contacts]);
    } else {
      setContacts(contacts.map(c => c.id === editContact.id ? editContact : c));
    }
    setView('list');
  };

  // --- Handlers: Send SMS Form ---
  const handleMobileChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 10) {
      setMobileNumber(value);
    }
  };

  const handleMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= 200) {
      setMessage(e.target.value);
    }
  };

  const handleSend = async (e: FormEvent) => {
    e.preventDefault();
    
    if (mobileNumber.length < 10) {
      alert('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (!message.trim()) {
      alert('Please enter a message to send.');
      return;
    }

    setIsSending(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('SMS Sent Successfully to:', mobileNumber);
      setMobileNumber('');
      setMessage('');
      setView('list');
    } catch (error) {
      console.error('Failed to send SMS', error);
      alert('An error occurred while sending the message.');
    } finally {
      setIsSending(false);
    }
  };

  // --- Renders ---
  
  const renderFollowUpTab = () => (
    <div className="animate-in fade-in duration-200">
      {/* Filters Form Container */}
      <div className="mb-6">
        {/* Row 1: Dates & Location */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4">
          <div className="md:col-span-2 flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1.5">From Date</label>
            <div className="relative">
              <input type="date" value={fFromDate} onChange={(e) => setFFromDate(e.target.value)} className="w-full pl-3 pr-8 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#0b918c] focus:border-[#0b918c] transition-colors" />
              <Calendar size={14} className="absolute right-2 top-2.5 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <div className="md:col-span-2 flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1.5">To Date</label>
            <div className="relative">
              <input type="date" value={fToDate} onChange={(e) => setFToDate(e.target.value)} className="w-full pl-3 pr-8 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#0b918c] focus:border-[#0b918c] transition-colors" />
              <Calendar size={14} className="absolute right-2 top-2.5 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <div className="md:col-span-3 flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1.5">District</label>
            <select value={fDistrict} onChange={(e) => { setFDistrict(e.target.value); setFMtc(''); }} className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#0b918c] focus:border-[#0b918c] bg-white transition-colors">
              <option value="">Select</option>
              {DISTRICTS.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
          </div>
          <div className="md:col-span-3 flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1.5">MTC</label>
            <select value={fMtc} onChange={(e) => setFMtc(e.target.value)} disabled={!fDistrict} className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#0b918c] focus:border-[#0b918c] bg-white disabled:bg-gray-100 disabled:text-gray-400 transition-colors">
              <option value="">Select</option>
              {availableMtcsForFollowUp.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
            </select>
          </div>
        </div>

        {/* Row 2: Search Identifiers */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-2 flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1.5">Record No</label>
            <input type="text" value={fRecordNo} onChange={(e) => setFRecordNo(e.target.value.replace(/\D/g, ''))} className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#0b918c] focus:border-[#0b918c] transition-colors" />
          </div>
          <div className="md:col-span-2 flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1.5">SAM Number</label>
            <input type="text" value={fSamNo} onChange={(e) => setFSamNo(e.target.value)} className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#0b918c] focus:border-[#0b918c] transition-colors" />
          </div>
          <div className="md:col-span-2 flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1.5">Child Name</label>
            <input type="text" value={fChildName} onChange={(e) => setFChildName(e.target.value)} className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#0b918c] focus:border-[#0b918c] transition-colors" />
          </div>
          <div className="md:col-span-2 flex flex-col justify-end">
            <div className="flex gap-2">
              <button onClick={handleFollowUpSearch} className="flex-1 inline-flex items-center justify-center px-4 py-1.5 border border-[#17a2b8] text-sm font-medium rounded text-[#17a2b8] hover:text-white bg-white hover:bg-[#17a2b8] focus:outline-none transition-colors">
                <Search size={14} className="mr-1.5" /> Search
              </button>
              <button onClick={resetFollowUpFilters} className="px-3 py-1.5 border border-gray-300 text-sm font-medium rounded text-gray-600 bg-white hover:bg-gray-50 focus:outline-none transition-colors" title="Reset Filters">
                <X size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results Table */}
      {hasSearched && (
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm mt-8">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Record No</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">SAM No</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Child Details</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Guardian Mobile</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Follow-up Date</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider w-24">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {followUpResults.map((child, index) => (
                <tr key={child.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                  <td className="px-4 py-3 text-sm text-gray-900 font-medium">{child.recordNo}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{child.samNo}</td>
                  <td className="px-4 py-3 text-sm">
                    <div className="font-medium text-gray-900">{child.childName}</div>
                    <div className="text-xs text-gray-500">C/O: {child.guardianName}</div>
                    <div className="text-xs text-gray-400">{child.mtcName}</div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">{child.mobile}</td>
                  <td className="px-4 py-3 text-sm text-[#0b918c] font-medium whitespace-nowrap">{child.followUpDate}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-center">
                    <button
                      onClick={() => handleDirectSendClick(child.mobile)}
                      className="inline-flex items-center justify-center px-2.5 py-1.5 bg-[#28a745] text-white text-xs rounded hover:bg-[#218838] transition-colors"
                      title="Send SMS"
                    >
                      <Send size={14} className="mr-1" /> SMS
                    </button>
                  </td>
                </tr>
              ))}
              {followUpResults.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-sm text-gray-500">
                    No children found matching the search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  const renderContactsList = () => (
    <div className="animate-in fade-in duration-200">
      {/* Conditional Filters */}
      {activeTab === 'mtc' && (
        <div className="mb-6 grid grid-cols-1 md:grid-cols-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1.5 flex items-center">
              <Filter size={14} className="mr-1.5 text-gray-400" /> District Filter
            </label>
            <select
              value={selectedDistrictId}
              onChange={(e) => setSelectedDistrictId(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0b918c] focus:border-[#0b918c] transition-colors bg-white"
            >
              <option value="">All Districts</option>
              {DISTRICTS.map(dist => (
                <option key={dist.id} value={dist.id}>{dist.name}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-16">
                {activeTab === 'state' ? 'S.No' : 'Id'}
              </th>
              {activeTab === 'state' && (
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">State Name</th>
              )}
              {activeTab === 'state' && (
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
              )}
              {activeTab === 'district' && (
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">District</th>
              )}
              {activeTab === 'mtc' && (
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">MTC Name</th>
              )}
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Mobile Numbers</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider w-32">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {displayedContacts.map((contact, index) => (
              <tr key={contact.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                  {activeTab === 'state' ? index + 1 : contact.id}
                </td>
                {activeTab === 'state' && (
                  <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">{contact.stateName}</td>
                )}
                {activeTab === 'state' && (
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{contact.name}</td>
                )}
                {activeTab === 'district' && (
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{contact.districtName}</td>
                )}
                {activeTab === 'mtc' && (
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{contact.mtcName}</td>
                )}
                <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{contact.mobile}</td>
                <td className="px-4 py-3 whitespace-nowrap text-center">
                  <div className="flex justify-center space-x-1.5">
                    <button
                      onClick={() => handleEditClick(contact)}
                      className="p-1.5 bg-[#28a745] text-white rounded hover:bg-[#218838] transition-colors"
                      title="Edit"
                    >
                      <Edit size={14} />
                    </button>
                    <button
                      onClick={() => handleDeleteContact(contact.id)}
                      className="p-1.5 bg-[#dc3545] text-white rounded hover:bg-[#c82333] transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                    <button
                      onClick={() => handleDirectSendClick(contact.mobile)}
                      className="p-1.5 bg-[#17a2b8] text-white rounded hover:bg-[#138496] transition-colors"
                      title="Send SMS to this contact"
                    >
                      <MessageSquare size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {displayedContacts.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-sm text-gray-500">
                  No contacts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
        Showing {displayedContacts.length > 0 ? 1 : 0} to {displayedContacts.length} of {displayedContacts.length} entries
      </div>
    </div>
  );

  const renderList = () => (
    <>
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        
        {/* Tabs */}
        <div className="flex items-center bg-gray-200/50 p-1 rounded-md flex-wrap gap-1">
          <button
            onClick={() => setActiveTab('followup')}
            className={`px-4 py-1.5 text-sm font-medium rounded transition-colors flex items-center ${
              activeTab === 'followup' ? 'bg-white text-[#0b918c] shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Calendar size={14} className="mr-1.5" /> Follow Up Due
          </button>
          <button
            onClick={() => setActiveTab('mtc')}
            className={`px-4 py-1.5 text-sm font-medium rounded transition-colors ${
              activeTab === 'mtc' ? 'bg-white text-[#0b918c] shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            MTC
          </button>
          <button
            onClick={() => setActiveTab('district')}
            className={`px-4 py-1.5 text-sm font-medium rounded transition-colors ${
              activeTab === 'district' ? 'bg-white text-[#0b918c] shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            District
          </button>
          <button
            onClick={() => setActiveTab('state')}
            className={`px-4 py-1.5 text-sm font-medium rounded transition-colors ${
              activeTab === 'state' ? 'bg-white text-[#0b918c] shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            State
          </button>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {activeTab !== 'followup' && (
            <button
              onClick={handleAddClick}
              className="flex-1 sm:flex-none inline-flex items-center justify-center px-3 py-1.5 border border-[#17a2b8] text-[#17a2b8] text-sm font-medium rounded hover:bg-[#17a2b8] hover:text-white transition-colors"
            >
              <Plus size={14} className="mr-1" /> Add
            </button>
          )}
          <button
            onClick={() => setView('send')}
            className="flex-1 sm:flex-none inline-flex items-center justify-center px-4 py-1.5 bg-[#28a745] text-white text-sm font-medium rounded hover:bg-[#218838] transition-colors shadow-sm"
          >
            <Send size={14} className="mr-2" /> Custom SMS
          </button>
        </div>
      </div>

      <div className="p-6">
        {activeTab === 'followup' ? renderFollowUpTab() : renderContactsList()}
      </div>
    </>
  );

  const renderSendSms = () => (
    <>
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
        <h5 className="text-lg font-semibold m-0 text-[#0b918c]">Send Custom SMS</h5>
        <button
          onClick={() => setView('list')}
          className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft size={16} className="mr-1" /> Back to List
        </button>
      </div>

      <div className="p-6">
        <form onSubmit={handleSend} className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          <div className="md:col-span-3 flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1.5">Mobile Number</label>
            <textarea
              value={mobileNumber}
              onChange={handleMobileChange}
              rows={2}
              placeholder="10-digit number"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0b918c] focus:border-[#0b918c] transition-colors resize-none"
              required
            />
          </div>

          <div className="md:col-span-6 flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1.5 flex justify-between">
              <span>Message</span>
              <span className="text-xs text-gray-400 font-normal">{message.length} / 200</span>
            </label>
            <textarea
              value={message}
              onChange={handleMessageChange}
              rows={2}
              placeholder="Type your message here..."
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0b918c] focus:border-[#0b918c] transition-colors resize-none"
              required
            />
          </div>

          <div className="md:col-span-3 flex flex-col h-full justify-end">
            <button
              type="submit"
              disabled={isSending || mobileNumber.length < 10 || message.length === 0}
              className="inline-flex items-center justify-center w-full px-4 py-2.5 border border-[#28a745] text-sm font-medium rounded-md text-[#28a745] bg-white hover:bg-[#28a745] hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#28a745] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            >
              <Send size={16} className="mr-2" />
              {isSending ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </form>
      </div>
    </>
  );

  const renderEditContact = () => (
    <>
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
        <h5 className="text-lg font-semibold m-0 text-[#0b918c]">
          {editContact?.id === 0 ? 'Add Contact' : 'Edit Contact'}
        </h5>
      </div>

      <div className="p-6">
        <form onSubmit={handleSaveContact} className="max-w-2xl space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Conditional fields based on type */}
            {editContact?.type === 'state' && (
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1.5">State Name</label>
                <input
                  type="text"
                  value={editContact?.stateName || ''}
                  onChange={(e) => setEditContact(prev => prev ? { ...prev, stateName: e.target.value } : null)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-gray-50"
                  readOnly
                />
              </div>
            )}

            {editContact?.type === 'district' && (
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1.5">District</label>
                <input
                  type="text"
                  value={editContact?.districtName || ''}
                  onChange={(e) => setEditContact(prev => prev ? { ...prev, districtName: e.target.value } : null)}
                  placeholder="e.g., BOKARO"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-[#0b918c] focus:border-[#0b918c] transition-colors uppercase"
                  required
                />
              </div>
            )}

            {editContact?.type === 'mtc' && (
              <>
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1.5">District</label>
                  <select
                    value={editContact?.districtId || ''}
                    onChange={(e) => setEditContact(prev => prev ? { ...prev, districtId: e.target.value } : null)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0b918c] focus:border-[#0b918c] transition-colors bg-white"
                    required
                  >
                    <option value="">Select District</option>
                    {DISTRICTS.map(dist => (
                      <option key={dist.id} value={dist.id}>{dist.name}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1.5">MTC Name</label>
                  <input
                    type="text"
                    value={editContact?.mtcName || ''}
                    onChange={(e) => setEditContact(prev => prev ? { ...prev, mtcName: e.target.value } : null)}
                    placeholder="e.g., DOMCHANCH"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-[#0b918c] focus:border-[#0b918c] transition-colors uppercase"
                    required
                  />
                </div>
              </>
            )}
            
            {/* Common fields */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1.5">Mobile Number</label>
              <input
                type="text"
                value={editContact?.mobile || ''}
                onChange={(e) => setEditContact(prev => prev ? { ...prev, mobile: e.target.value.replace(/\D/g, '').slice(0, 10) } : null)}
                placeholder="10-digit number"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-[#0b918c] focus:border-[#0b918c] transition-colors"
                required
              />
            </div>

            {editContact?.type === 'state' && (
              <div className="sm:col-span-2 flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1.5">Name / Designation</label>
                <input
                  type="text"
                  value={editContact?.name || ''}
                  onChange={(e) => setEditContact(prev => prev ? { ...prev, name: e.target.value } : null)}
                  placeholder="e.g., JOHN DOE, CONSULTANT"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-[#0b918c] focus:border-[#0b918c] transition-colors"
                  required
                />
              </div>
            )}
          </div>

          <div className="flex gap-4 pt-4 border-t border-gray-100">
            <button
              type="submit"
              className="inline-flex items-center px-6 py-2 bg-[#0b918c] text-white text-sm font-medium rounded hover:bg-[#097a76] transition-colors shadow-sm"
            >
              <Save size={16} className="mr-2" /> Save
            </button>
            <button
              type="button"
              onClick={() => setView('list')}
              className="inline-flex items-center px-6 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded hover:bg-gray-50 transition-colors shadow-sm"
            >
              <X size={16} className="mr-2" /> Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );

  return (
    <div className="w-full p-4 font-sans text-gray-800">
      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden relative mt-4">
        {view === 'list' && renderList()}
        {view === 'send' && renderSendSms()}
        {view === 'edit' && renderEditContact()}
      </div>
    </div>
  );
}