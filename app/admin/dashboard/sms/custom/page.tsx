'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Send } from 'lucide-react';

export default function CustomSMS() {
  const [mobileNumber, setMobileNumber] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  // Restrict to digits only, max 10 chars
  const handleMobileChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 10) {
      setMobileNumber(value);
    }
  };

  // Limit message length to 200 characters
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
    console.log('Sending SMS...', { mobileNumber, message });

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('SMS Sent Successfully!');
      
      // Reset form after successful send
      setMobileNumber('');
      setMessage('');
    } catch (error) {
      console.error('Failed to send SMS', error);
      alert('An error occurred while sending the message.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="w-full p-4 font-sans text-gray-800">
      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden relative mt-4">
        
        {/* Card Header */}
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <h5 className="text-lg font-semibold m-0 text-[#0b918c]">Custom SMS</h5>
        </div>

        {/* Card Body */}
        <div className="p-6">
          <form onSubmit={handleSend} className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            
            {/* Mobile Number */}
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

            {/* Message Input */}
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

            {/* Send Button */}
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
        
      </div>
    </div>
  );
}