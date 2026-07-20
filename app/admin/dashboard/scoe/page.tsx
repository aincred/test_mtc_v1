"use client";

import React from 'react';
import { ExternalLink, Award, Users, BookOpen, Microscope, Activity } from 'lucide-react';

const JharkhandSCoE = () => {
  const medicalColleges = [
    "Dumka Medical College",
    "Hazaribagh Medical College",
    "MGM Jamshedpur",
    "Patliputra Medical College, Dhanbad",
    "Palamu Medical College"
  ];

  const pillars = [
    {
      title: "Capacity Building",
      description: "Enhancing skills of healthcare providers for better SAM management.",
      icon: <Users className="w-5 h-5" />
    },
    {
      title: "Policy Support",
      description: "Technical assistance in implementing state nutrition policies.",
      icon: <Award className="w-5 h-5" />
    },
    {
      title: "Knowledge Management",
      description: "Documenting best practices and research for scaled impact.",
      icon: <BookOpen className="w-5 h-5" />
    },
    {
      title: "Monitoring & Supervision",
      description: "Ensuring quality care in both facility and community settings.",
      icon: <Activity className="w-5 h-5" />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Main Header Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="bg-[#077c78] p-6 text-white">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-white/20 rounded-lg">
                <Microscope className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium uppercase tracking-wider opacity-90">State Centre of Excellence</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold leading-tight">
              Management of Severe Acute Malnutrition (SAM)
            </h1>
            <p className="mt-2 text-teal-50 font-medium">
              Rajendra Institute of Medical Sciences (RIMS), Ranchi, Jharkhand
            </p>
          </div>

          <div className="p-6 md:p-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-[#077c78]" />
                  About the Center
                </h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    Established in October 2019, the State Centre of Excellence (SCoE) at RIMS Ranchi functions in collaboration with the Department of Health, Medical Education & Family Welfare, State Nutrition Mission, and ICDS.
                  </p>
                  <p>
                    Supported technically by <span className="font-semibold">UNICEF Jharkhand</span> and <span className="font-semibold">NCoE-SAM, KSCH, New Delhi</span>, the center serves as a hub for quality care in facility-based and community-based SAM management programs.
                  </p>
                  <div className="pt-4 border-t border-gray-100">
                    <a 
                      href="http://coesamnetwork.in/AboutDetails.aspx?AboutId=7" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[#077c78] font-medium hover:underline group"
                    >
                      Visit Official Portal
                      <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Network Partners</h3>
                <ul className="space-y-3">
                  {medicalColleges.map((college, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#077c78] mt-1.5 shrink-0" />
                      {college}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Pillars of Activity */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pillars.map((pillar, idx) => (
            <div key={idx} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-lg bg-teal-50 text-[#077c78] flex items-center justify-center mb-4">
                {pillar.icon}
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{pillar.title}</h3>
              <p className="text-sm text-gray-500 Shadcnleading-snug">{pillar.description}</p>
            </div>
          ))}
        </div>

        {/* Footer info */}
        <footer className="mt-12 text-center text-gray-400 text-xs">
          © {new Date().getFullYear()} SCoE-SAM Jharkhand • Supported by UNICEF
        </footer>
      </div>
    </div>
  );
};

export default JharkhandSCoE;