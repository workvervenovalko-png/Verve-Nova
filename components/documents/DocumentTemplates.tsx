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
