"use client";

import React, { useState, FormEvent } from "react";
import { Send, Smartphone, MessageSquare } from "lucide-react";

export default function SimpleSmsForm() {
  const [mobileNumber, setMobileNumber] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/[^0-9]/g, "");
    setMobileNumber(numericValue);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (mobileNumber.length !== 10) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }
    if (message.trim() === "") {
      alert("Please enter a message.");
      return;
    }

    setIsLoading(true);

    try {
      console.log("Sending SMS...", { mobileNumber, message });
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call

      setMessage("");
      setMobileNumber("");
      alert("Message sent successfully!");
    } catch (error) {
      console.error("Failed to send message", error);
      alert("Failed to send message.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="flex items-center gap-2 mb-6 border-b pb-4">
        <MessageSquare className="w-5 h-5 text-blue-600" />
        <h2 className="text-lg font-semibold text-gray-800">Custom SMS</h2>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 items-start">
        <input type="hidden" name="SMS_TYPE_ID" value="1" />

        {/* Mobile Number Field */}
        <div className="w-full md:w-1/3">
          <label htmlFor="mobile" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
            <Smartphone className="w-4 h-4 text-gray-500" />
            Mobile Number
          </label>
          <input
            id="mobile"
            type="text"
            maxLength={10}
            value={mobileNumber}
            onChange={handleMobileChange}
            placeholder="10-digit number"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Message Field */}
        <div className="w-full md:w-1/2">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Message
          </label>
          <textarea
            id="message"
            rows={2}
            maxLength={200}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        {/* Submit Button */}
        <div className="w-full md:w-auto md:pt-6">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors disabled:bg-blue-400"
          >
            {isLoading ? "Sending..." : "Send"}
            {!isLoading && <Send className="w-4 h-4" />}
          </button>
        </div>
      </form>
    </div>
  );
}