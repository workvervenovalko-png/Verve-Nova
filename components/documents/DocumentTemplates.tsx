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

  if (type === 'Certificate') {
    return (
      <div className="w-[1000px] h-[700px] bg-white text-[#0a0a0a] p-0 relative overflow-hidden font-serif border-[1px] border-gray-200 shadow-2xl">
        {/* Corner Accents (Triangles) */}
        <div className="absolute top-0 left-0 w-48 h-48 bg-[#000830]" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }} />
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#000830]" style={{ clipPath: 'polygon(100% 100%, 0 100%, 100% 0)' }} />
        
        {/* Golden Ribbon Seal (Top Left) */}
        <div className="absolute top-4 left-4 z-20 scale-75 origin-top-left">
           <div className="relative w-32 h-32 flex items-center justify-center">
              {/* Ribbon Straps */}
              <div className="absolute top-1/2 left-[20%] w-8 h-24 bg-[#fcc419] -rotate-[15deg] origin-top" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 85%, 0 100%)' }} />
              <div className="absolute top-1/2 right-[20%] w-8 h-24 bg-[#fcc419] rotate-[15deg] origin-top" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 85%, 0 100%)' }} />
              
              {/* Seal Circle */}
              <div className="absolute w-24 h-24 rounded-full bg-gradient-to-br from-[#fcc419] via-[#ffd43b] to-[#fcc419] shadow-lg border-4 border-[#fab005] flex items-center justify-center">
                 <div className="w-[85%] h-[85%] rounded-full border-2 border-[#fab005] border-dashed" />
                 <div className="absolute w-16 h-16 rounded-full bg-[#ffd43b]/20 blur-sm" />
              </div>
           </div>
        </div>

        {/* Logo (Top Right) */}
        <div className="absolute top-8 right-12 text-right">
           <div className="flex items-center gap-2">
              <span className="text-2xl font-black tracking-tighter text-[#000830]">Verve<span className="text-indigo-600">Nova</span></span>
              <div className="h-8 w-[2px] bg-gray-200 mx-2" />
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-tight">Technologies<br/>Security</span>
           </div>
        </div>

        <div className="h-full flex flex-col items-center justify-center px-24 text-center">
           {/* Title */}
           <h1 className="text-5xl font-bold uppercase tracking-[0.05em] text-[#000830] mb-8">Certificate of Completion</h1>
           
           <p className="text-lg italic text-gray-600 mb-6">This is to certify that</p>
           
           {/* Recipient Name */}
           <div className="mb-10">
              <h2 className="text-6xl font-bold text-[#000830] uppercase tracking-tight px-12 border-b-2 border-[#000830] pb-2 inline-block">{candidateName}</h2>
           </div>

           {/* Body Content */}
           <div className="max-w-2xl space-y-6 text-base font-medium text-gray-800 leading-relaxed">
              <p>has successfully completed 3 Months Internship and 3 Months Professional Experience<br/>
              in <span className="font-bold">{domain}</span> at <span className="font-bold">Verve Nova Technologies</span></p>
              
              <p className="text-sm px-10">During this period, the candidate demonstrated strong technical skills, dedication, and professionalism in {domain.toLowerCase()} projects.</p>
              
              <p className="italic text-gray-500 pt-4">We wish them success in their future career.</p>
           </div>

           {/* Footer Section */}
           <div className="w-full flex justify-between items-end mt-20">
              {/* Signature (Bottom Left) */}
              <div className="flex flex-col items-start text-left min-w-[200px]">
                 <img src="/signatures/sign.png" alt="Signature" className="h-16 object-contain mb-[-10px] ml-4" />
                 <div className="w-full h-[1px] bg-gray-400 mb-2" />
                 <p className="text-sm font-bold text-[#000830]">Puneet Kushwaha</p>
                 <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Director</p>
                 <p className="text-[9px] font-bold text-gray-400 uppercase">Verve Nova Technologies</p>
              </div>

              {/* Document Details (Bottom Right) */}
              <div className="text-right space-y-1">
                 <p className="text-[10px] font-bold text-gray-800 uppercase tracking-widest">
                    Certificate ID: <span className="font-mono">{verificationId.split('-').slice(0, 4).join('-')}</span>
                 </p>
                 <p className="text-[10px] font-bold text-gray-800 uppercase tracking-widest">
                    Date: <span className="font-mono">{format(new Date(issuedAt), "dd MMMM yyyy")}</span>
                 </p>
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
      <div className="flex justify-between items-start border-b-2 border-[#6366f1]/20 pb-8 mb-12">
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
      <div className="space-y-8 text-sm leading-relaxed text-gray-700">
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
              <p>Your internship duration will be for 3 months. Your official joining date will be shared with you in the <strong>Official Joining Letter</strong>. During this period, you will receive a monthly stipend of <span className="font-bold text-[#6366f1]">{metadata?.stipend || 'As we discussed'}</span>.</p>
            </>
          ) : (
            <>
              <p>This is to confirm your appointment as a <span className="font-bold text-[#1e1e2e]">{domain} Intern</span> at Verve Nova Technologies. We are excited to have you on board as we continue to push the boundaries of technology and innovation.</p>
              <p>You are officially joined as of <span className="font-bold text-[#1e1e2e]">{metadata?.startDate || dateStr}</span> for a duration of 3 months. During this period, you will receive a monthly stipend of <span className="font-bold text-[#6366f1]">{metadata?.stipend || 'As we discussed'}</span>. You will report to the Technical Lead for your respective project domain.</p>
            </>
          )}

          <p>At Verve Nova, we believe in a "Performance-First" culture. You will be expected to demonstrate technical excellence, creative problem-solving, and professional integrity at all times.</p>
          
          <p>We look forward to seeing the impact you will create during your tenure with us.</p>
        </div>

        <div className="pt-12">
          <p className="font-bold text-gray-400 uppercase text-[10px] tracking-widest mb-4">Best Regards,</p>
          <div className="flex flex-col items-start">
            <img src="/signatures/sign.png" alt="Signature" className="h-16 object-contain mb-[-10px]" />
            <div className="w-40 h-[1px] bg-gray-300" />
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
