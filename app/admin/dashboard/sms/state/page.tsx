'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Send, Plus, Edit, Trash2, ArrowLeft, Save, X } from 'lucide-react';

// --- Types ---
interface Contact {
  id: number;
  stateName: string;
  name: string;
  mobile: string;
}

// --- Mock Data ---
const INITIAL_CONTACTS: Contact[] = [
  { id: 4, stateName: 'Jharkhand', name: 'PRITISH NAYAK, NUTRITION OFFICER, UNICEF', mobile: '7772895526' },
  { id: 5, stateName: 'Jharkhand', name: 'VIKASH SEET, STATE CONSULTANT, AMB & MIS', mobile: '8210061193' },
  { id: 7, stateName: 'Jharkhand', name: 'SUJIT SINHA, CONSULTANT, F-SAM', mobile: '9471355854' },
  { id: 8, stateName: 'Jharkhand', name: 'PRATIMA SINGH, CONSULTANT-MN & VAS', mobile: '9431180411' },
  { id: 152, stateName: 'Jharkhand', name: 'PRASHANTI TIWARY, CONSULTANT, SCoE', mobile: '7091284428' },
  { id: 153, stateName: 'Jharkhand', name: 'Dr. R.N. Shama, Nodal Child Health', mobile: '9835133980' },
  { id: 154, stateName: 'Jharkhand', name: 'SAGAR, CONSULTANT, CH, NHM', mobile: '8617814127' },
  { id: 155, stateName: 'Jharkhand', name: 'ANAMIKA, CONSULTANT WCD', mobile: '9431555838' },
  { id: 157, stateName: 'Jharkhand', name: 'Dr. Vidhya Sagar, HoD, PSM RIMS', mobile: '9523365695' },
  { id: 158, stateName: 'Jharkhand', name: 'Dr. Asha Kiran, Nodal, SCoE, RIMS', mobile: '9431257527' },
];

export default function CustomSMS() {
  // --- State ---
  const [view, setView] = useState<'list' | 'send' | 'edit'>('list');
  const [contacts, setContacts] = useState<Contact[]>(INITIAL_CONTACTS);
  
  // Custom SMS Form State
  const [mobileNumber, setMobileNumber] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  // Edit Contact Form State
  const [editContact, setEditContact] = useState<Contact | null>(null);

  // --- Handlers: List View ---
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
    setEditContact({ id: 0, stateName: 'Jharkhand', name: '', mobile: '' });
    setView('edit');
  };

  // --- Handlers: Edit Contact Form ---
  const handleSaveContact = (e: FormEvent) => {
    e.preventDefault();
    if (!editContact?.name || !editContact?.mobile) return;

    if (editContact.id === 0) {
      // Create
      const newId = Math.max(...contacts.map(c => c.id), 0) + 1;
      setContacts([{ ...editContact, id: newId }, ...contacts]);
    } else {
      // Update
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
  const renderList = () => (
    <>
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <h5 className="text-lg font-semibold m-0 text-[#0b918c]">State SMS List</h5>
          <button
            onClick={handleAddClick}
            className="inline-flex items-center px-3 py-1.5 border border-[#17a2b8] text-[#17a2b8] text-sm font-medium rounded hover:bg-[#17a2b8] hover:text-white transition-colors"
          >
            <Plus size={14} className="mr-1" /> Add
          </button>
        </div>
        <button
          onClick={() => setView('send')}
          className="inline-flex items-center px-4 py-2 bg-[#28a745] text-white text-sm font-medium rounded hover:bg-[#218838] transition-colors shadow-sm"
        >
          <Send size={14} className="mr-2" /> Send SMS
        </button>
      </div>

      <div className="p-6">
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-16">S.No</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">State Name</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Mobile Numbers</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider w-24">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {contacts.map((contact, index) => (
                <tr key={contact.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                  <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">{index + 1}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">{contact.stateName}</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{contact.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{contact.mobile}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-center">
                    <div className="flex justify-center space-x-2">
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
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
          Showing 1 to {contacts.length} of {contacts.length} entries
        </div>
      </div>
    </>
  );

  const renderSendSms = () => (
    <>
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
        <h5 className="text-lg font-semibold m-0 text-[#0b918c]">Custom SMS</h5>
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