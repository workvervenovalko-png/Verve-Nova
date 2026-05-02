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
      <div className="w-[1000px] h-[700px] bg-white text-[#0a0a0a] p-0 relative overflow-hidden font-serif border-[1px] border-gray-200 shadow-2xl flex flex-col items-center justify-center">
        {/* Corner Accents (Triangles) */}
        <div className="absolute top-0 left-0 w-44 h-44 bg-[#000830]" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }} />
        <div className="absolute bottom-0 right-0 w-44 h-44 bg-[#000830]" style={{ clipPath: 'polygon(100% 100%, 0 100%, 100% 0)' }} />
        
        {/* Golden Ribbon Seal (Top Left) */}
        <div className="absolute top-8 left-8 z-20 scale-[0.6] origin-top-left">
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
        <div className="absolute top-12 right-12 flex flex-col items-end gap-2">
           <img src="/vnt-logo.png" alt="VNT Logo" className="h-10 w-auto object-contain brightness-110" />
           <div className="flex flex-col text-right">
              <span className="text-[10px] font-black text-[#000830] tracking-widest uppercase leading-none">Verve Nova Technologies</span>
              <span className="text-[7px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-1">Specialized Software Systems</span>
           </div>
        </div>

        {/* Main Content Container */}
        <div className="relative z-10 w-full flex flex-col items-center text-center px-32 mt-4">
           {/* Header Accent */}
           <div className="w-16 h-1 bg-indigo-600 mb-8 rounded-full" />
           
           {/* Title */}
           <h1 className="text-4xl font-bold uppercase tracking-[0.15em] text-[#000830] mb-8">Certificate of Completion</h1>
           
           <p className="text-sm italic text-gray-400 mb-6">This official document certifies that</p>
           
           {/* Recipient Name */}
           <div className="mb-12 relative">
              <h2 className="text-5xl font-bold text-[#000830] uppercase tracking-tight px-16 pb-4 inline-block">{candidateName}</h2>
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#000830] to-transparent opacity-30" />
           </div>

           {/* Body Content */}
           <div className="max-w-2xl space-y-6 text-[13px] font-medium text-gray-700 leading-relaxed uppercase tracking-wide">
              <p>has successfully completed <span className="text-[#000830] font-black">3 Months Internship</span> and <span className="text-[#000830] font-black">3 Months Professional Experience</span><br/>
              in <span className="text-indigo-600 font-black underline decoration-indigo-200 underline-offset-4">{domain}</span></p>
              
              <p className="text-[11px] px-16 text-gray-500 italic lowercase normal-case tracking-normal">
                During this period, the candidate demonstrated exceptional technical proficiency, dedication, and professional ethics in executing mission-critical projects at Verve Nova Technologies.
              </p>
              
              <p className="italic text-gray-400 pt-6 normal-case tracking-normal">We wish them success in their future career.</p>
           </div>

           {/* Footer Section */}
           <div className="w-full flex justify-between items-end mt-16 px-8">
              {/* Signature (Bottom Left) */}
              <div className="flex flex-col items-start text-left min-w-[240px]">
                 <img src="/signatures/sign.png" alt="Signature" className="h-14 object-contain mb-[-12px] ml-4 opacity-90" />
                 <div className="w-full h-[1px] bg-gray-200 mb-2" />
                 <p className="text-sm font-black text-[#000830] uppercase tracking-tighter">Puneet Kushwaha</p>
                 <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Founder & CEO</p>
                 <p className="text-[8px] font-bold text-gray-300 uppercase mt-0.5">Verve Nova Technologies</p>
              </div>

              {/* Document Details (Bottom Right) */}
              <div className="text-right space-y-2 pb-1">
                 <div className="flex flex-col gap-0.5">
                    <p className="text-[8px] font-black text-gray-300 uppercase tracking-widest">Verification ID</p>
                    <p className="text-[10px] font-bold text-gray-800 font-mono tracking-tighter">
                       {verificationId.split('-').slice(0, 4).join('-').toUpperCase()}
                    </p>
                 </div>
                 <div className="flex flex-col gap-0.5">
                    <p className="text-[8px] font-black text-gray-300 uppercase tracking-widest">Issue Date</p>
                    <p className="text-[10px] font-bold text-gray-800 font-mono tracking-tighter">
                       {format(new Date(issuedAt), "dd.MM.yyyy").toUpperCase()}
                    </p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    );
  }

  // Offer Letter and Joining Letter template
  return (
    <div className="w-[800px] min-h-[1100px] bg-white text-[#0a0a0a] p-16 font-serif relative overflow-hidden border-[1px] border-gray-100 shadow-2xl">
      {/* Subtle Background Mark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[150px] font-black text-gray-50/50 -rotate-12 select-none pointer-events-none uppercase">
        Verve Nova
      </div>

      {/* Header */}
      <div className="flex justify-between items-start mb-16 relative z-10">
        <div className="flex flex-col gap-2">
           <img src="/vnt-logo.png" alt="VNT Logo" className="h-12 w-auto object-contain self-start" />
           <div className="flex flex-col">
             <span className="text-lg font-black text-[#000830] tracking-tight uppercase">Verve Nova Technologies</span>
             <p className="text-[8px] font-bold text-gray-400 uppercase tracking-[0.3em]">Specialized Software Systems</p>
           </div>
        </div>
        <div className="text-right">
          <h2 className="text-2xl font-bold uppercase tracking-widest text-[#000830] border-b-2 border-indigo-600 pb-1 mb-2">
            {type.toUpperCase()}
          </h2>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">VN / {type.split(' ')[0].toUpperCase()} / {format(new Date(), "yyyy")}</p>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-8 text-sm leading-relaxed text-gray-800 relative z-10">
        <div className="flex justify-between items-end">
           <div className="space-y-1">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Candidate Identity</p>
              <p className="text-base font-bold text-[#000830] uppercase tracking-tight">{candidateName}</p>
           </div>
           <div className="text-right">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Date of Issue</p>
              <p className="text-sm font-bold text-[#000830]">{format(new Date(), "MMMM dd, yyyy")}</p>
           </div>
        </div>

        <div className="h-px w-full bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100" />

        <div className="space-y-6">
          <p className="font-bold">Dear {candidateName.split(' ')[0]},</p>
          
          <div className="space-y-4">
            {type === 'Offer Letter' ? (
              <>
                <p>We are pleased to offer you the position of <span className="font-bold text-[#000830] uppercase tracking-tight">{domain} Intern</span> at <span className="font-bold text-[#000830]">Verve Nova Technologies</span>. Based on your qualifications and technical assessment, we believe you will be a valuable addition to our engineering team.</p>
                
                <div className="bg-gray-50/50 p-6 rounded-xl border border-gray-100 space-y-3">
                   <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] mb-2">Technical Terms</p>
                   <div className="grid grid-cols-2 gap-4 text-xs">
                      <div><span className="text-gray-400 font-bold uppercase tracking-widest text-[8px] block mb-1">Position</span> <span className="font-bold text-[#000830]">{domain} Intern</span></div>
                      <div><span className="text-gray-400 font-bold uppercase tracking-widest text-[8px] block mb-1">Duration</span> <span className="font-bold text-[#000830]">3 Months</span></div>
                      <div><span className="text-gray-400 font-bold uppercase tracking-widest text-[8px] block mb-1">Stipend</span> <span className="font-bold text-[#000830]">{stipend}</span></div>
                      <div><span className="text-gray-400 font-bold uppercase tracking-widest text-[8px] block mb-1">Mode</span> <span className="font-bold text-[#000830]">Remote / Virtual</span></div>
                   </div>
                </div>

                <p className="font-bold text-indigo-600 bg-indigo-50/50 p-4 rounded-lg border border-indigo-100">Please note: The official start date and onboarding coordinates will be provided in your "Joining Letter". You are requested to wait for the official Joining Letter for the next steps.</p>
              </>
            ) : (
              <>
                <p>Welcome to the team. This document serves as your official Joining Letter for the position of <span className="font-bold text-[#000830] uppercase tracking-tight">{domain} Intern</span>. We are excited to have you begin your professional journey with us.</p>
                <p>Your official internship starts on <span className="font-bold text-[#000830]">{format(new Date(), "MMMM dd, yyyy")}</span>. You will be reporting to the Engineering Department and will receive your initial technical briefing shortly.</p>
              </>
            )}
          </div>

          <div className="space-y-4">
             <h4 className="text-[10px] font-black text-[#000830] uppercase tracking-[0.2em] border-l-2 border-indigo-600 pl-3">Standard Operating Procedures</h4>
             <ul className="list-disc list-inside space-y-2 text-[12px] text-gray-600 pl-3">
                <li>Adherence to strict non-disclosure and intellectual property protocols.</li>
                <li>Maintenance of high-quality code standards and technical documentation.</li>
                <li>Punctual participation in daily stand-ups and project sync-ups.</li>
                <li>Active contribution to mission-critical software deployment cycles.</li>
             </ul>
          </div>
        </div>

        <p className="pt-8">We look forward to a productive association.</p>
      </div>

      {/* Signature Section */}
      <div className="mt-20 relative z-10">
        <div className="flex flex-col items-start">
           <img src="/signatures/sign.png" alt="Signature" className="h-16 object-contain mb-[-15px] ml-4 opacity-90" />
           <div className="w-64 h-[1px] bg-gray-300 mb-3" />
           <p className="text-sm font-black text-[#000830] uppercase tracking-tighter">Puneet Kushwaha</p>
           <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Founder & CEO</p>
           <p className="text-[9px] font-bold text-gray-400 uppercase">Verve Nova Technologies</p>
        </div>
      </div>

      {/* Footer Decoration */}
      <div className="absolute bottom-0 left-0 w-full h-2 bg-[#000830]" />
      <div className="absolute bottom-12 left-16 right-16 flex justify-between items-center opacity-30">
         <p className="text-[8px] font-bold text-gray-400 uppercase tracking-[0.4em]">VN-TECH-SYS-GEN-DOC</p>
         <p className="text-[8px] font-bold text-gray-400 uppercase tracking-[0.4em]">VERVENOVATECH.COM</p>
      </div>
    </div>
  );
};
