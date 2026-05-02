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
      <div className="w-[800px] h-[600px] bg-white text-[#09090B] p-0 relative overflow-hidden font-sans border-[12px] border-[#1e1e2e]">
        {/* Blue Geometric Background Elements (Kimberly Nguyen Style) */}
        <div className="absolute top-0 left-0 w-48 h-48 bg-[#6366f1]/10 rounded-br-full -z-10" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#6366f1]/5 rotate-45 translate-x-1/2 translate-y-1/2 -z-10" />
        <div className="absolute top-12 right-12 w-24 h-24 border-4 border-[#6366f1]/20 rounded-full" />
        
        {/* Border Patterns */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#6366f1] opacity-10" style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }} />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#1e1e2e]" style={{ clipPath: 'polygon(0 100%, 0 0, 100% 100%)' }} />

        <div className="h-full flex flex-col items-center justify-between py-12 px-16 text-center">
          {/* Header */}
          <div className="w-full flex justify-between items-start">
            <img src="/vnt-logo.png" alt="VNT Logo" className="h-14 object-contain" />
            <div className="text-right">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#6366f1]">Verification ID</p>
              <p className="text-xs font-mono font-bold">{verificationId}</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            <h1 className="text-4xl font-black uppercase tracking-[0.2em] text-[#1e1e2e]">Certificate</h1>
            <p className="text-xs font-bold uppercase tracking-[0.4em] text-[#6366f1]/60">Of Internship Completion</p>
            
            <div className="py-4">
              <p className="text-sm font-medium italic text-gray-500 mb-2">This is to certify that</p>
              <h2 className="text-5xl font-black text-[#1e1e2e] uppercase tracking-tight leading-none">{candidateName}</h2>
              <div className="h-1 w-32 bg-[#6366f1] mx-auto mt-4" />
            </div>

            <p className="max-w-xl mx-auto text-sm leading-relaxed text-gray-600">
              has successfully completed their internship in <span className="font-bold text-[#1e1e2e]">{domain}</span> at <span className="font-bold text-[#6366f1]">Verve Nova Technologies</span>. 
              During this period from <span className="font-semibold text-gray-800">{metadata?.startDate || '---'}</span> to <span className="font-semibold text-gray-800">{metadata?.endDate || '---'}</span>, the candidate demonstrated exceptional skills, 
              professionalism, and dedication.
            </p>
            
            {metadata?.performance && (
              <p className="text-[11px] text-gray-400 italic">"{metadata.performance}"</p>
            )}
          </div>

          {/* Footer */}
          <div className="w-full flex justify-between items-end">
            <div className="text-left">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Date of Issue</p>
              <p className="text-xs font-bold">{dateStr}</p>
            </div>
            
            <div className="flex flex-col items-center">
              <img src="/signatures/sign.png" alt="Signature" className="h-16 object-contain mb-[-10px]" />
              <div className="w-40 h-[1px] bg-gray-300" />
              <p className="text-[10px] font-bold uppercase tracking-widest mt-2">Founder & CEO</p>
              <p className="text-[8px] font-bold text-gray-400 uppercase">Verve Nova Technologies</p>
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
              <p>Your internship is scheduled to commence on <span className="font-bold text-[#1e1e2e]">{metadata?.startDate || 'TBD'}</span> for a duration of 3 months. During this period, you will receive a monthly stipend of <span className="font-bold text-[#6366f1]">{metadata?.stipend || 'As we discussed'}</span>.</p>
            </>
          ) : (
            <>
              <p>This is to confirm your appointment as a <span className="font-bold text-[#1e1e2e]">{domain} Intern</span> at Verve Nova Technologies. We are excited to have you on board as we continue to push the boundaries of technology and innovation.</p>
              <p>You are officially joined as of <span className="font-bold text-[#1e1e2e]">{metadata?.startDate || dateStr}</span>. You will report to the Technical Lead for your respective project domain.</p>
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
            <p className="text-sm font-black uppercase text-[#1e1e2e] mt-2">Founder & CEO</p>
            <p className="text-[10px] font-bold text-gray-400 uppercase">Verve Nova Technologies</p>
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
