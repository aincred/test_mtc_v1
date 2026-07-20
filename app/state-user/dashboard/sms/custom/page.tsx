"use client";

import React, { useState } from "react";
import { Send } from "lucide-react";

export default function CustomSmsForm() {
  // Form State
  const [mobileNumber, setMobileNumber] = useState<string>( "");
  const [message, setMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  // Handle Mobile Number Input (Only allow numbers)
  const handleMobileChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    // Replace any non-digit character with an empty string
    const sanitizedValue = value.replace(/\D/g, '');
    setMobileNumber(sanitizedValue);
  };

  // Form Validation and Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    // Basic Validation
    if (!mobileNumber) {
      setStatusMessage({ type: 'error', text: 'Please enter a mobile number.' });
      return;
    }
    if (mobileNumber.length !== 10) {
      setStatusMessage({ type: 'error', text: 'Mobile number must be exactly 10 digits.' });
      return;
    }
    if (!message.trim()) {
      setStatusMessage({ type: 'error', text: 'Please enter a message.' });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API Call
      console.log("Sending SMS Payload:", {
        SMS_TYPE_ID: 1,
        MOBILE_NO: mobileNumber,
        SMS_TEXT: message,
      });
      
      await new Promise(resolve => setTimeout(resolve, 1000)); // Fake network delay
      
      setStatusMessage({ type: 'success', text: 'Message sent successfully!' });
      setMobileNumber("");
      setMessage("");
    } catch {
      setStatusMessage({ type: 'error', text: 'Failed to send message. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full mt-8">
      {/* Outer Card with Shadow */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200">
        
        {/* Card Header */}
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 rounded-t-xl">
          <h5 className="text-[1.25rem] font-medium m-0" style={{ color: "#0B918C" }}>
            Custom SMS
          </h5>
        </div>

        {/* Card Body */}
        <div className="p-4 md:p-6 text-sm">
          
          {/* Status Message Display */}
          {statusMessage && (
            <div className={`mb-4 p-3 rounded-md ${statusMessage.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
              {statusMessage.text}
            </div>
          )}

          <form onSubmit={handleSubmit} id="CustomSmsForm">
            {/* Hidden Input mapping to original HTML structure */}
            <input type="hidden" name="SMS_TYPE_ID" value="1" />

            {/* Grid Layout aligning to original Bootstrap col-xl sizes */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
              
              {/* Mobile Number (col-xl-3) */}
              <div className="md:col-span-3 flex flex-col gap-1">
                <label htmlFor="txt_MobileNumber" className="font-medium text-gray-700">
                  Mobile Number
                </label>
                <textarea
                  id="txt_MobileNumber"
                  name="MOBILE_NO"
                  rows={2}
                  maxLength={10}
                  value={mobileNumber}
                  onChange={handleMobileChange}
                  placeholder="Enter 10-digit number"
                  className="w-full bg-white border border-gray-300 rounded-md py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-[#0B918C] focus:border-[#0B918C] resize-none"
                />
              </div>

              {/* Message (col-xl-6) */}
              <div className="md:col-span-6 flex flex-col gap-1">
                <label htmlFor="txt_Message" className="font-medium text-gray-700">
                  Message
                  <span className="text-gray-400 text-xs ml-2 font-normal">
                    ({message.length}/200 characters)
                  </span>
                </label>
                <textarea
                  id="txt_Message"
                  name="SMS_TEXT"
                  rows={2}
                  maxLength={200}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message here..."
                  className="w-full bg-white border border-gray-300 rounded-md py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-[#0B918C] focus:border-[#0B918C] resize-none"
                />
              </div>

              {/* Submit Button (col-xl-2/3) */}
              <div className="md:col-span-3 lg:pb-1">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-[42px] inline-flex justify-center items-center gap-2 px-6 py-2 border border-[#0B918C] text-sm font-medium rounded-md text-[#0B918C] bg-white hover:bg-emerald-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0B918C] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="w-4 h-4 border-2 border-[#0B918C] border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Send size={16} />
                  )}
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>

            </div>
          </form>

        </div>
      </div>
    </div>
  );
}