"use client";

import React from 'react';
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface DocumentProps {
  type: 'Offer Letter' | 'Joining Letter' | 'Certificate';
  candidateName: string;
  vnId: string;
  verificationId: string;
  issuedAt: Date | string;
  metadata?: {
    startDate?: string;
    endDate?: string;
    stipend?: string;
    performance?: string;
    domain?: string;
  };
}

export const DocumentTemplates: React.FC<DocumentProps> = ({
  type,
  candidateName,
  vnId,
  verificationId,
  issuedAt,
  metadata
}) => {
  const dateStr = format(new Date(issuedAt), "PPPP");
  const domain = metadata?.domain || "Web Development";
  const stipend = metadata?.stipend || "As we discussed";

  if (type === 'Certificate') {
    let start = new Date();
    if (metadata?.startDate) {
      start = new Date(metadata.startDate);
    }
    const formattedStartDate = format(start, "dd MMM yyyy");
    
    const end = new Date(start);
    end.setMonth(end.getMonth() + 3);
    const formattedEndDate = format(end, "dd MMM yyyy");

    return (
      <div className="w-[1000px] h-[750px] bg-white text-[#1e293b] p-6 relative font-sans">
        {/* Outer Gold Border */}
        <div className="w-full h-full border-[4px] border-[#d4af37] rounded-3xl p-12 relative flex flex-col items-center">
          
          {/* Top Right Ribbon Seal */}
          <div className="absolute top-12 right-12 flex flex-col items-center z-20">
            <div className="w-24 h-24 bg-[#0f172a] rounded-full flex flex-col items-center justify-center text-[#d4af37] text-[9px] font-bold text-center tracking-widest leading-tight border-[3px] border-[#d4af37] shadow-lg z-10">
              <span>★ ★ ★</span>
              <span className="mt-1">LEARN</span>
              <span>PERFORM</span>
              <span>GROW</span>
              <span className="mt-1">★</span>
            </div>
            {/* Ribbons */}
            <div className="flex gap-1 -mt-4">
              <div className="w-6 h-12 bg-[#d4af37]" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)' }}></div>
              <div className="w-6 h-16 bg-[#d4af37]" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 85%, 0 100%)' }}></div>
            </div>
          </div>

          {/* Logo Section */}
          <div className="flex flex-col items-center mb-8">
            <div className="flex items-center gap-4">
              <img src="/vnt-logo.png" alt="VNT Logo" className="h-16 w-16 object-contain" />
              <div>
                <h1 className="text-4xl font-black text-[#1e3a8a] tracking-tight leading-none uppercase">Verve Nova</h1>
                <p className="text-sm font-bold text-[#1e3a8a] tracking-[0.2em] uppercase">Technologies & IT Services</p>
              </div>
            </div>
          </div>

          {/* Title Section */}
          <div className="text-center mb-6 w-full relative">
            <h1 className="text-7xl font-black text-[#0f172a] tracking-widest uppercase mb-4">CERTIFICATE</h1>
            <div className="flex items-center justify-center gap-4 text-[#d4af37]">
              <div className="w-48 h-[2px] bg-[#d4af37]"></div>
              <span className="text-2xl font-bold tracking-[0.3em] uppercase">OF INTERNSHIP</span>
              <div className="w-48 h-[2px] bg-[#d4af37]"></div>
            </div>
            {/* Diamond Decorators */}
            <div className="flex justify-center items-center gap-2 mt-4 text-[#d4af37]">
              <div className="w-2.5 h-2.5 bg-[#d4af37] rotate-45"></div>
              <img src="/vnt-logo.png" alt="mini logo" className="w-6 h-6 object-contain opacity-50 sepia hue-rotate-15" />
              <div className="w-2.5 h-2.5 bg-[#d4af37] rotate-45"></div>
            </div>
          </div>

          {/* Presented To */}
          <p className="text-sm font-bold text-gray-500 tracking-[0.2em] uppercase mb-4 mt-2">This certificate is proudly presented to</p>
          
          <div className="w-3/4 flex flex-col items-center mb-8">
            <h2 className="text-5xl font-serif italic text-[#1e293b] mb-2">{candidateName}</h2>
            <div className="w-full h-[1px] bg-gray-400"></div>
          </div>

          {/* Body Text */}
          <div className="text-center max-w-3xl text-[16px] leading-relaxed text-gray-700 font-medium px-8">
            <p>
              For successfully completing the <strong>{domain}</strong> internship program at <strong>Verve Nova Technologies</strong>. 
              The internship was conducted from <strong>{formattedStartDate}</strong> to <strong>{formattedEndDate}</strong>. 
              During this period, the individual has shown dedication, consistency, and a strong willingness to learn and contribute.
            </p>
          </div>

          {/* Footer Area */}
          <div className="absolute bottom-12 w-full px-16 flex justify-between items-end">
            
            {/* Left Signature */}
            <div className="flex flex-col items-center w-56 text-center">
              <img src="/signatures/sign.png" alt="Signature" className="h-12 object-contain mb-2 opacity-90" />
              <div className="w-full h-[1px] bg-[#d4af37] mb-2"></div>
              <p className="font-bold text-[#0f172a] text-[15px]">Puneet Kushwaha</p>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Founder & CEO</p>
            </div>

            {/* Center Stamp & Quote */}
            <div className="flex flex-col items-center pb-2">
              <div className="w-20 h-20 rounded-full border border-gray-300 flex flex-col items-center justify-center p-2 mb-4 relative">
                {/* Circular Text using simple CSS approach or just stacked text */}
                <p className="text-[5px] font-bold text-[#1e3a8a] uppercase tracking-widest text-center">Verve Nova</p>
                <img src="/vnt-logo.png" alt="VNT Logo" className="w-6 h-6 object-contain my-1" />
                <p className="text-[5px] font-bold text-[#1e3a8a] uppercase tracking-widest text-center">Technologies</p>
              </div>
              <div className="flex items-center gap-4 text-gray-500">
                <div className="w-16 h-[1px] bg-[#d4af37]"></div>
                <p className="font-bold italic text-[#1e293b] text-sm">"Learn, Perform, Grow"</p>
                <div className="w-16 h-[1px] bg-[#d4af37]"></div>
              </div>
            </div>

            {/* Right Signature (HR / Authorized) */}
            <div className="flex flex-col items-center w-56 text-center">
              <div className="h-12 w-full flex items-end justify-center mb-2">
                 <span className="font-serif italic text-gray-400 text-xl">Verve Nova HR</span>
              </div>
              <div className="w-full h-[1px] bg-[#d4af37] mb-2"></div>
              <p className="font-bold text-[#0f172a] text-[15px]">Human Resources</p>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Authorized Signatory</p>
            </div>
            
          </div>
          
          {/* Verification ID (Bottom Left Corner inside border) */}
          <div className="absolute bottom-4 left-6 text-[8px] font-bold text-gray-400 uppercase tracking-widest">
            Verification ID: {verificationId}
          </div>

        </div>
      </div>
    );
  }

  // Offer Letter and Joining Letter Template (Modern Letterhead Style)
  const formattedIssueDate = format(new Date(issuedAt), "dd MMM yyyy");
  
  let start = new Date();
  if (metadata?.startDate) {
    start = new Date(metadata.startDate);
  }
  const formattedStartDate = format(start, "dd MMM yyyy");
  
  const end = new Date(start);
  end.setMonth(end.getMonth() + 3);
  const formattedEndDate = format(end, "dd MMM yyyy");

  return (
    <div className="w-[800px] min-h-[1050px] bg-white text-[#1e293b] p-12 font-sans relative flex flex-col justify-between">
      <div>
        {/* Letterhead Header */}
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-center gap-4">
            <img src="/vnt-logo.png" alt="VNT Logo" className="h-16 w-16 object-contain" />
            <div>
              <h1 className="text-3xl font-black text-[#1e3a8a] tracking-tight leading-none uppercase">Verve Nova</h1>
              <p className="text-sm font-semibold text-[#1e3a8a]">Technologies & Digital Solutions</p>
            </div>
          </div>
          <div className="text-right text-xs text-[#1e3a8a] font-medium space-y-1">
            <p className="font-bold text-sm">VERVE NOVA</p>
            <p>Technologies & IT Services</p>
            <p className="flex items-center justify-end gap-1"><span className="text-blue-500">🌐</span> www.vervenovatech.com</p>
            <p className="flex items-center justify-end gap-1"><span className="text-blue-500">✉️</span> contact@vervenovatech.com</p>
            <p className="flex items-center justify-end gap-1"><span className="text-red-500">📍</span> India</p>
          </div>
        </div>

        {/* Ref and Date */}
        <div className="flex justify-between text-[13px] font-bold text-[#1e293b] mb-2">
          <p>Ref. No.: {verificationId}</p>
          <p>Date : {formattedIssueDate}</p>
        </div>
        
        {/* Golden Line */}
        <div className="w-full h-[2px] bg-[#d4af37] mb-8" />

        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black uppercase tracking-[0.2em] text-[#1e3a8a]">{type.toUpperCase()}</h2>
          <div className="w-2 h-2 bg-[#d4af37] rotate-45 mx-auto mt-2" />
        </div>

        {/* Body Content */}
        <div className="space-y-6 text-[13px] leading-relaxed">
          <p>
            <strong>Dear {candidateName}, Congratulations!</strong>
          </p>
          
          <p>
            We are pleased to offer you the position of <strong>Intern</strong> at <strong>Verve Nova Technologies</strong>. We were impressed with your skills, passion, and enthusiasm, and we believe you will be a great addition to our team.
          </p>

          {/* INTERNSHIP DETAILS */}
          <div>
            <h3 className="text-sm font-bold text-[#92400e] uppercase tracking-wide flex items-center gap-2 mb-3">
              <span>💼</span> INTERNSHIP DETAILS
            </h3>
            <div className="grid grid-cols-[160px_1fr] gap-y-2 font-medium pl-6">
              <p>Position</p>
              <p>: Intern</p>
              
              <p>Department</p>
              <p>: {domain}</p>
              
              <p>Internship Duration</p>
              <p>: 3 Months</p>
              
              <p>Start Date</p>
              <p>: {formattedStartDate}</p>
              
              <p>End Date</p>
              <p>: {formattedEndDate}</p>
              
              <p>Work Mode</p>
              <p>: Remote</p>
            </div>
          </div>

          {/* ROLE & RESPONSIBILITIES */}
          <div>
            <h3 className="text-sm font-bold text-[#1d4ed8] uppercase tracking-wide flex items-center gap-2 mb-3">
              <span>👤</span> ROLE & RESPONSIBILITIES
            </h3>
            <ul className="list-disc list-inside pl-2 space-y-1">
              <li>Work on assigned tasks and projects as per the guidance of the project coordinator.</li>
              <li>Collaborate with the team to deliver high-quality results.</li>
              <li>Learn, implement, and contribute innovative ideas.</li>
              <li>Maintain professionalism, discipline, and commitment throughout the internship.</li>
            </ul>
          </div>

          {/* TERMS & CONDITIONS */}
          <div>
            <h3 className="text-sm font-bold text-[#92400e] uppercase tracking-wide flex items-center gap-2 mb-3">
              <span>📄</span> TERMS & CONDITIONS
            </h3>
            <ol className="list-decimal list-inside pl-2 space-y-1">
              <li>This internship is purely for educational and skill development purposes.</li>
              <li>You are expected to maintain confidentiality of all company information.</li>
              <li>Any misconduct or failure to meet expectations may result in termination of the internship.</li>
              <li>Upon successful completion, you will be awarded a Certificate of Internship.</li>
            </ol>
          </div>

          <p className="pt-2">
            We are excited to have you on board and look forward to a productive and rewarding journey together.
          </p>
          <p className="font-bold">Welcome to the Verve Nova family!</p>
        </div>
      </div>

      {/* Footer / Signatures */}
      <div className="flex justify-between items-end mt-12 pb-4">
        {/* Left Signature */}
        <div className="text-center w-48">
          <img src="/signatures/sign.png" alt="Signature" className="h-12 object-contain mx-auto mb-1 opacity-90" />
          <div className="w-full h-[1px] bg-[#1e3a8a] mb-2" />
          <p className="font-bold text-[#1e3a8a] text-sm">Puneet Kushwaha</p>
          <p className="text-xs text-gray-600">Founder & CEO</p>
          <p className="text-xs text-gray-600">Verve Nova</p>
        </div>

        {/* Center Seal */}
        <div className="w-24 h-24 rounded-full border-2 border-[#1e3a8a] flex flex-col items-center justify-center p-2">
          <p className="text-[6px] font-bold text-[#1e3a8a] uppercase tracking-widest text-center" style={{ letterSpacing: '0.2em' }}>Verve Nova</p>
          <img src="/vnt-logo.png" alt="VNT Logo" className="w-8 h-8 object-contain my-1" />
          <p className="text-[6px] font-bold text-[#1e3a8a] uppercase tracking-widest text-center" style={{ letterSpacing: '0.1em' }}>Technologies</p>
        </div>

        {/* Right Signature (Candidate) */}
        <div className="text-center w-48">
          <div className="h-12 flex items-end justify-center pb-1">
             <span className="font-serif italic text-gray-500">{candidateName.split(' ')[0]}</span>
          </div>
          <div className="w-full h-[1px] bg-[#1e3a8a] mb-2" />
          <p className="font-bold text-[#1e3a8a] text-sm">{candidateName}</p>
          <p className="text-xs text-gray-600">Candidate</p>
          <p className="text-xs text-gray-600">Verve Nova</p>
        </div>
      </div>
    </div>
  );
};
