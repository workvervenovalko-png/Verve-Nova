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
      <div className="w-[1000px] h-[700px] bg-white text-[#09090B] p-0 relative overflow-hidden font-sans border-[20px] border-[#1e1e2e] shadow-2xl">
        {/* Premium Background Elements */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-indigo-500/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl -z-10" />
        
        {/* Geometric Accents */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#1e1e2e] clip-path-poly-1 opacity-[0.03] -z-10" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }} />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#6366f1] clip-path-poly-2 opacity-[0.05] -z-10" style={{ clipPath: 'polygon(100% 100%, 0 100%, 100% 0)' }} />
        
        {/* Border Patterns (Golden/Indigo Mix) */}
        <div className="absolute inset-0 border-[1px] border-indigo-500/20 m-4 pointer-events-none" />
        <div className="absolute top-0 right-0 w-48 h-48 border-r-4 border-t-4 border-indigo-500/30 m-8" />
        <div className="absolute bottom-0 left-0 w-48 h-48 border-l-4 border-b-4 border-indigo-500/30 m-8" />

        <div className="h-full flex flex-col items-center justify-between py-10 px-20 text-center relative z-10">
          {/* Header Section */}
          <div className="w-full flex justify-between items-center mb-8">
            <div className="flex flex-col items-start">
              <img src="/vnt-logo.png" alt="VNT Logo" className="h-16 object-contain mb-2" />
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1e1e2e]">Verve Nova Technologies</p>
            </div>
            
            <div className="flex flex-col items-end">
              <img src="/udyam.png" alt="MSME Logo" className="h-14 object-contain mb-2" />
              <div className="text-right">
                <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#6366f1]">Verification Portal</p>
                <p className="text-[10px] font-mono font-black text-[#1e1e2e]">{verificationId}</p>
              </div>
            </div>
          </div>

          {/* Main Title Section */}
          <div className="flex flex-col items-center">
            <div className="mb-4">
              <div className="h-[2px] w-24 bg-indigo-500/30 mx-auto mb-4" />
              <h1 className="text-6xl font-black uppercase tracking-[0.25em] text-[#1e1e2e] leading-none">Certificate</h1>
              <p className="text-sm font-bold uppercase tracking-[0.5em] text-[#6366f1] mt-4 italic">of internship completion</p>
              <div className="h-[2px] w-24 bg-indigo-500/30 mx-auto mt-4" />
            </div>
            
            <div className="my-8">
              <p className="text-base font-medium italic text-gray-400 mb-4">This prestigious credential is proudly presented to</p>
              <h2 className="text-6xl font-black text-[#1e1e2e] uppercase tracking-tight leading-none drop-shadow-sm">{candidateName}</h2>
              <div className="h-1.5 w-48 bg-gradient-to-r from-transparent via-indigo-500 to-transparent mx-auto mt-6" />
            </div>

            <p className="max-w-2xl mx-auto text-sm leading-relaxed text-gray-600 font-medium">
              For their outstanding dedication and professional contribution during the 
              <span className="font-bold text-[#1e1e2e] mx-1 uppercase tracking-wider">{domain}</span> 
              internship program at <span className="font-bold text-[#6366f1]">Verve Nova Technologies</span>. 
              The candidate has demonstrated technical excellence and architectural innovation from 
              <span className="font-bold text-gray-800 mx-1">{metadata?.startDate || '---'}</span> to 
              <span className="font-bold text-gray-800 mx-1">{metadata?.endDate || '---'}</span>.
            </p>
          </div>

          {/* Footer Section */}
          <div className="w-full flex justify-between items-end pt-10">
            <div className="flex flex-col items-start gap-4">
              <div className="text-left">
                <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-1">Issue Date</p>
                <p className="text-xs font-black text-[#1e1e2e]">{dateStr}</p>
              </div>
              <div className="p-2 border border-gray-100 rounded-lg bg-gray-50/50">
                {/* Simulated QR Code for authenticity */}
                <div className="w-12 h-12 bg-indigo-900/5 flex items-center justify-center">
                   <div className="w-8 h-8 border-2 border-indigo-500/20 grid grid-cols-2 gap-0.5">
                      <div className="bg-indigo-500/40" />
                      <div className="bg-transparent" />
                      <div className="bg-transparent" />
                      <div className="bg-indigo-500/40" />
                   </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              {/* Official Seal Placeholder */}
              <div className="absolute -top-16 -left-16 w-24 h-24 rounded-full border-2 border-indigo-500/10 flex items-center justify-center opacity-20 rotate-12">
                <p className="text-[8px] font-black uppercase text-center leading-none">Official<br/>VNT<br/>Seal</p>
              </div>
              
              <div className="flex flex-col items-center">
                <img src="/signatures/sign.png" alt="Signature" className="h-20 object-contain mb-[-12px] relative z-10" />
                <div className="w-56 h-[1.5px] bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
                <p className="text-xs font-black uppercase tracking-[0.2em] mt-3 text-[#1e1e2e]">Founder & CEO</p>
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Verve Nova Technologies</p>
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
