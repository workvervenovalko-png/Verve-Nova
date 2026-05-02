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
      <div className="w-[1000px] h-[700px] bg-white text-[#0a0a0a] p-0 relative overflow-hidden font-serif border-[1px] border-gray-200 shadow-2xl flex flex-col items-center">
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
           <img src="/vnt-logo.png" alt="VNT Logo" className="h-8 w-auto object-contain brightness-110" />
           <div className="flex flex-col text-right">
              <span className="text-[8px] font-black text-[#000830] tracking-widest uppercase leading-none">Verve Nova Technologies</span>
              <span className="text-[6px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-1">Specialized Software Systems</span>
           </div>
        </div>

        {/* Main Content Container */}
        <div className="relative z-10 w-full flex flex-col items-center text-center px-32 pt-28">
           {/* Header Accent */}
           <div className="w-12 h-1 bg-indigo-600 mb-8 rounded-full" />
           
           {/* Title */}
           <h1 className="text-4xl font-bold uppercase tracking-[0.15em] text-[#000830] mb-8">Certificate of Completion</h1>
           
           <p className="text-sm italic text-gray-400 mb-4">This official document certifies that</p>
           
           {/* Recipient Name */}
           <div className="mb-10 relative">
              <h2 className="text-5xl font-bold text-[#000830] uppercase tracking-tight px-16 pb-3 inline-block">{candidateName}</h2>
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#000830] to-transparent opacity-30" />
           </div>

           {/* Body Content */}
           <div className="max-w-2xl space-y-5 text-[12px] font-medium text-gray-700 leading-relaxed uppercase tracking-wide">
              <p>has successfully completed <span className="text-[#000830] font-black">3 Months Internship</span> and <span className="text-[#000830] font-black">3 Months Professional Experience</span><br/>
              in <span className="text-indigo-600 font-black underline decoration-indigo-200 underline-offset-4">{domain}</span></p>
              
              <p className="text-[10px] px-16 text-gray-500 italic lowercase normal-case tracking-normal">
                During this period, the candidate demonstrated exceptional technical proficiency, dedication, and professional ethics in executing mission-critical projects at Verve Nova Technologies.
              </p>
              
              <p className="italic text-gray-400 pt-4 normal-case tracking-normal">We wish them success in their future career.</p>
           </div>

           {/* Footer Section */}
           <div className="w-full flex justify-between items-end mt-12 px-8">
              {/* Signature (Bottom Left) */}
              <div className="flex flex-col items-start text-left min-w-[240px]">
                 <img src="/signatures/sign.png" alt="Signature" className="h-12 object-contain mb-[-12px] ml-4 opacity-90" />
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

  // Offer Letter and Joining Letter Template (Modern Letterhead Style)
  return (
    <div className="w-[800px] min-h-[1000px] bg-white text-[#09090B] p-16 font-sans relative">
      {/* Letterhead Header */}
      <div className="flex justify-between items-start border-b-2 border-[#6366f1]/20 pb-8 mb-12 relative z-10">
        <div className="space-y-4">
          <img src="/vnt-logo.png" alt="VNT Logo" className="h-16 object-contain" />
          <div className="space-y-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-[#6366f1]">Verve Nova Technologies</p>
            <p className="text-[8px] font-bold text-gray-400 uppercase">Innovation Hub // Digital Solutions</p>
          </div>
        </div>
        <div className="text-right space-y-1">
          <h2 className="text-2xl font-black uppercase tracking-tighter text-[#1e1e2e]">{type}</h2>
          <p className="text-[9px] font-bold text-gray-400 uppercase">Reference: {verificationId}</p>
          <p className="text-[9px] font-bold text-gray-400 uppercase">Date: {dateStr}</p>
        </div>
      </div>

      {/* Body */}
      <div className="space-y-8 text-sm leading-relaxed text-gray-700 relative z-10">
        <div>
          <p className="font-bold text-[#1e1e2e]">To,</p>
          <p className="text-lg font-black uppercase text-[#1e1e2e]">{candidateName}</p>
          <p className="text-[10px] font-mono font-bold text-[#6366f1]">{vnId}</p>
        </div>

        <div className="space-y-4">
          <p className="font-bold">Subject: {type === 'Offer Letter' ? `Official Offer of Internship - ${domain}` : `Internship Appointment & Joining - ${domain}`}</p>
          
          <p>Dear {candidateName.split(' ')[0]},</p>
          
          {type === 'Offer Letter' ? (
            <>
              <p>We are pleased to offer you an internship at Verve Nova Technologies in the <span className="font-bold text-[#1e1e2e]">{domain}</span> track. Your talent and potential align perfectly with our mission to architect the future of digital solutions.</p>
              <p>Your internship duration will be for 3 months. Your official joining date will be shared with you in the <strong>Official Joining Letter</strong>. During this period, you will receive a monthly stipend of <span className="font-bold text-[#6366f1]">{stipend}</span>.</p>
              <p className="font-bold text-indigo-600 bg-indigo-50 p-4 rounded-lg border border-indigo-100">Please note: The official start date and onboarding coordinates will be provided in your "Joining Letter". You are requested to wait for the official Joining Letter for the next steps.</p>
            </>
          ) : (
            <>
              <p>This is to confirm your appointment as a <span className="font-bold text-[#1e1e2e]">{domain} Intern</span> at Verve Nova Technologies. We are excited to have you on board as we continue to push the boundaries of technology and innovation.</p>
              <p>You are officially joined as of <span className="font-bold text-[#1e1e2e]">{metadata?.startDate || dateStr}</span> for a duration of 3 months. During this period, you will receive a monthly stipend of <span className="font-bold text-[#6366f1]">{stipend}</span>. You will report to the Technical Lead for your respective project domain.</p>
            </>
          )}

          <p>At Verve Nova, we believe in a "Performance-First" culture. You will be expected to demonstrate technical excellence, creative problem-solving, and professional integrity at all times.</p>
          
          <p>We look forward to seeing the impact you will create during your tenure with us.</p>
        </div>

        <div className="pt-12">
          <p className="font-bold text-gray-400 uppercase text-[10px] tracking-widest mb-4">Best Regards,</p>
          <div className="flex flex-col items-start">
            <img src="/signatures/sign.png" alt="Signature" className="h-16 object-contain mb-[-10px] opacity-90 ml-4" />
            <div className="w-64 h-[1px] bg-gray-300 mb-2" />
            <p className="text-base font-black uppercase text-[#1e1e2e] mt-2">Puneet Kushwaha</p>
            <p className="text-[10px] font-black uppercase text-[#1e1e2e]/60 mt-1">Founder & CEO</p>
            <p className="text-[9px] font-bold text-gray-400 uppercase">Verve Nova Technologies</p>
          </div>
        </div>
      </div>

      {/* Decorative Stripes (Employment Letter Style) */}
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#6366f1]/5 flex flex-col gap-2 p-4 justify-end items-end overflow-hidden">
        <div className="w-full h-1 bg-[#6366f1] opacity-20" />
        <div className="w-3/4 h-1 bg-[#6366f1] opacity-40" />
        <div className="w-1/2 h-1 bg-[#6366f1] opacity-60" />
      </div>
    </div>
  );
};
