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
    return (
      <div className="w-[1000px] h-[800px] bg-white text-[#0a0a0a] p-0 relative overflow-hidden font-serif border-[1px] border-gray-200 shadow-2xl flex flex-col items-center">
        {/* Corner Accents (Triangles) */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-[#000830]" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }} />
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#000830]" style={{ clipPath: 'polygon(100% 100%, 0 100%, 100% 0)' }} />
        
        {/* Golden Ribbon Seal (Top Left) */}
        <div className="absolute top-6 left-6 z-20 scale-[0.55] origin-top-left">
           <div className="relative w-32 h-32 flex items-center justify-center">
              {/* Ribbon Straps */}
              <div className="absolute top-1/2 left-[20%] w-8 h-24 bg-[#fcc419] -rotate-[15deg] origin-top" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 85%, 0 100%)' }} />
              <div className="absolute top-1/2 right-[20%] w-8 h-24 bg-[#fcc419] rotate-[15deg] origin-top" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 85%, 0 100%)' }} />
              
              {/* Seal Circle */}
              <div className="absolute w-24 h-24 rounded-full bg-gradient-to-br from-[#fcc419] via-[#ffd43b] to-[#fcc419] shadow-lg border-4 border-[#fab005] flex items-center justify-center">
                 <div className="w-[85%] h-[85%] rounded-full border-2 border-[#fab005] border-dashed" />
              </div>
           </div>
        </div>

        {/* Logo (Top Right) */}
        <div className="absolute top-8 right-8 flex flex-col items-end gap-1">
           <img src="/vnt-logo.png" alt="VNT Logo" className="h-10 w-auto object-contain brightness-110" />
           <div className="flex flex-col text-right">
              <span className="text-[10px] font-black text-[#000830] tracking-widest uppercase leading-none">Verve Nova Technologies</span>
              <span className="text-[8px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-1">Specialized Software Systems</span>
           </div>
        </div>

        {/* Main Content Container */}
        <div className="relative z-10 w-full flex flex-col items-center text-center px-32 pt-20">
           {/* Header Accent */}
           <div className="w-12 h-1 bg-indigo-600 mb-6 rounded-full" />
           
           {/* Title */}
           <h1 className="text-5xl font-bold uppercase tracking-[0.15em] text-[#000830] mb-6">Certificate of Completion</h1>
           
           <p className="text-lg italic text-gray-400 mb-4">This official document certifies that</p>
           
           {/* Recipient Name */}
           <div className="mb-8 relative">
              <h2 className="text-5xl font-bold text-[#000830] uppercase tracking-tight px-16 pb-3 inline-block">{candidateName}</h2>
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#000830] to-transparent opacity-30" />
           </div>

           {/* Body Content */}
           <div className="max-w-2xl space-y-4 text-[15px] font-medium text-gray-700 leading-relaxed uppercase tracking-wide">
              <p>has successfully completed <span className="text-[#000830] font-black">3 Months Internship</span> and <span className="text-[#000830] font-black">3 Months Professional Experience</span><br/>
              in <span className="text-indigo-600 font-black underline decoration-indigo-200 underline-offset-4">{domain}</span></p>
              
              <p className="text-[12px] px-16 text-gray-500 italic lowercase normal-case tracking-normal">
                During this period, the candidate demonstrated exceptional technical proficiency, dedication, and professional ethics in executing mission-critical projects at Verve Nova Technologies.
              </p>
              
              <p className="text-lg italic text-gray-400 pt-4 normal-case tracking-normal">We wish them success in their future career.</p>
           </div>

           {/* Footer Section */}
           <div className="w-full flex justify-between items-end mt-16 px-8">
              {/* Signature (Bottom Left) */}
              <div className="flex flex-col items-start text-left min-w-[240px]">
                 <img src="/signatures/sign.png" alt="Signature" className="h-14 object-contain mb-[-12px] ml-4 opacity-90" />
                 <div className="w-full h-[1px] bg-gray-200 mb-2" />
                 <p className="text-base font-black text-[#000830] uppercase tracking-tighter">Puneet Kushwaha</p>
                 <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Founder & CEO</p>
                 <p className="text-[10px] font-bold text-gray-300 uppercase mt-0.5">Verve Nova Technologies</p>
              </div>

              {/* Document Details (Bottom Right) */}
              <div className="text-right space-y-3 pb-1">
                 <div className="flex flex-col gap-0.5">
                    <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Verification ID</p>
                    <p className="text-[12px] font-bold text-gray-800 font-mono tracking-tighter">
                       {verificationId.split('-').slice(0, 4).join('-').toUpperCase()}
                    </p>
                 </div>
                 <div className="flex flex-col gap-0.5">
                    <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Issue Date</p>
                    <p className="text-[12px] font-bold text-gray-800 font-mono tracking-tighter">
                       {format(new Date(issuedAt), "dd.MM.yyyy").toUpperCase()}
                    </p>
                 </div>
              </div>
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
