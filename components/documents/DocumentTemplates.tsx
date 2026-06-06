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

const DigitalStamp = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 200 200" className={cn("opacity-85 mix-blend-multiply", className)}>
    <defs>
      <path id="circlePathTop" d="M 30, 100 a 70,70 0 1,1 140,0" />
      <path id="circlePathBottom" d="M 170, 100 a 70,70 0 0,1 -140,0" />
    </defs>
    <circle cx="100" cy="100" r="95" fill="none" stroke="currentColor" strokeWidth="4" />
    <circle cx="100" cy="100" r="88" fill="none" stroke="currentColor" strokeWidth="1" />
    <circle cx="100" cy="100" r="55" fill="none" stroke="currentColor" strokeWidth="2" />
    <circle cx="100" cy="100" r="48" fill="none" stroke="currentColor" strokeWidth="1" />
    <text fill="currentColor" fontWeight="bold" fontSize="18" letterSpacing="2">
      <textPath href="#circlePathTop" startOffset="50%" textAnchor="middle">
        VERVE NOVA TECHNOLOGIES
      </textPath>
    </text>
    <text fill="currentColor" fontWeight="bold" fontSize="18" letterSpacing="4">
      <textPath href="#circlePathBottom" startOffset="50%" textAnchor="middle">
        ★ AUTHORIZED ★
      </textPath>
    </text>
    <polygon points="100,65 110,85 130,85 115,100 120,120 100,105 80,120 85,100 70,85 90,85" fill="currentColor" />
  </svg>
);

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
  const isCA = domain === 'CAMPUS AMBASSADOR' || domain === 'Campus Ambassador';

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
      <div className="w-[1000px] h-[750px] bg-[#ffffff] text-[#1e293b] p-6 relative font-sans">
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
                <p className="text-sm font-bold text-[#1e3a8a] tracking-[0.2em] uppercase mt-1">Technologies</p>
              </div>
            </div>
          </div>

          {/* Title Section */}
          <div className="text-center mb-6 w-full relative">
            <h1 className="text-7xl font-black text-[#0f172a] tracking-widest uppercase mb-4">CERTIFICATE</h1>
            <div className="flex items-center justify-center gap-4 text-[#d4af37]">
              <div className="w-48 h-[2px] bg-[#d4af37]"></div>
              <span className="text-2xl font-bold tracking-[0.3em] uppercase">OF {isCA ? 'COMPLETION' : 'INTERNSHIP'}</span>
              <div className="w-48 h-[2px] bg-[#d4af37]"></div>
            </div>
          </div>

          {/* Presented To */}
          <p className="text-sm font-bold text-[#6b7280] tracking-[0.2em] uppercase mb-4 mt-2">This certificate is proudly presented to</p>
          
          <div className="w-3/4 flex flex-col items-center mb-8">
            <h2 className="text-5xl font-serif italic text-[#1e293b] mb-2">{candidateName}</h2>
            <div className="w-full h-[1px] bg-[#9ca3af]"></div>
          </div>

          {/* Body Text */}
          <div className="text-center max-w-3xl text-[16px] leading-relaxed text-[#374151] font-medium px-8">
            <p>
              For successfully completing the <strong>{domain}</strong> {isCA ? 'program' : 'internship program'} at <strong>Verve Nova Technologies</strong>. 
              The {isCA ? 'program' : 'internship'} was conducted from <strong>{formattedStartDate}</strong> to <strong>{formattedEndDate}</strong>. 
              During this period, the individual has shown dedication, consistency, and a strong willingness to learn and contribute.
            </p>
          </div>

          {/* Footer Area */}
          <div className="absolute bottom-12 w-full px-16 flex justify-between items-end">
            
            {/* Left Signature */}
            <div className="flex flex-col items-center w-56 text-center relative">
              <div className="absolute -top-12 -right-8 -rotate-12 z-0">
                <DigitalStamp className="w-24 h-24 text-[#1e3a8a] opacity-50" />
              </div>
              <img src="/signatures/sign.png" alt="Signature" className="h-12 object-contain mb-2 opacity-90 z-10 relative" />
              <div className="w-full h-[1px] bg-[#d4af37] mb-2 z-10 relative"></div>
              <p className="font-bold text-[#0f172a] text-[15px] z-10 relative">Puneet Kushwaha</p>
              <p className="text-[10px] font-bold text-[#6b7280] uppercase tracking-widest z-10 relative">Founder & CEO</p>
            </div>

            {/* Center Quote */}
            <div className="flex flex-col items-center pb-2">
              <div className="flex items-center gap-4 text-[#6b7280] mt-10">
                <div className="w-16 h-[1px] bg-[#d4af37]"></div>
                <p className="font-bold italic text-[#1e293b] text-sm">"Learn, Perform, Grow"</p>
                <div className="w-16 h-[1px] bg-[#d4af37]"></div>
              </div>
            </div>

            {/* Right Side (Verification) */}
            <div className="flex flex-col items-center w-56 text-center pb-2">
              <p className="text-[10px] font-bold text-[#9ca3af] uppercase tracking-widest mb-1">Verification ID</p>
              <div className="w-full h-[1px] bg-[#d4af37] mb-2"></div>
              <p className="font-bold text-[#0f172a] text-[13px]">{verificationId}</p>
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
    <div className="w-[800px] bg-[#ffffff] text-[#1e293b] p-12 font-sans relative block">
      {/* Letterhead Header */}
      <div className="flex justify-between items-start mb-8">
        <div className="flex items-center gap-4">
          <img src="/vnt-logo.png" alt="VNT Logo" className="h-16 w-16 object-contain" />
          <div>
            <h1 className="text-3xl font-black text-[#1e3a8a] tracking-tight leading-none uppercase">Verve Nova</h1>
            <p className="text-[11px] font-bold tracking-[0.2em] text-[#1e3a8a] uppercase mt-1">Technologies</p>
          </div>
        </div>
        <div className="text-right text-xs text-[#1e3a8a] font-medium space-y-1">
          <p className="font-bold text-sm uppercase">Verve Nova Technologies</p>
          <p className="flex items-center justify-end gap-1"><span className="text-[#3b82f6]">🌐</span> www.vervenovatech.com</p>
          <p className="flex items-center justify-end gap-1"><span className="text-[#3b82f6]">✉️</span> work.vervenova.lko@gmail.com</p>
          <p className="flex items-center justify-end gap-1"><span className="text-[#ef4444]">📍</span> India</p>
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
        {type === 'Joining Letter' && (
          <>
            <p className="break-inside-avoid">
              <strong>Dear {candidateName}, Welcome Aboard!</strong>
            </p>
            <p className="break-inside-avoid">
              This letter serves as formal confirmation of your onboarding as a <strong>{domain}{isCA ? '' : ' Intern'}</strong> at <strong>Verve Nova Technologies</strong> effective from <strong>{formattedStartDate}</strong>. We are thrilled to have you join our team and are confident that your contributions will be valuable to our organization.
            </p>

            {/* JOINING DETAILS */}
            <div className="break-inside-avoid">
              <h3 className="text-sm font-bold text-[#92400e] uppercase tracking-wide flex items-center gap-2 mb-3">
                <span>📋</span> JOINING DETAILS
              </h3>
              <div className="grid grid-cols-[160px_1fr] gap-y-2 font-medium pl-6">
                <p>Designation</p>
                <p>: {domain}{isCA ? '' : ' Intern'}</p>
                
                <p>Date of Joining</p>
                <p>: {formattedStartDate}</p>
                
                <p>Tenure</p>
                <p>: 3 Months</p>
                
                <p>Expected End Date</p>
                <p>: {formattedEndDate}</p>
                
                <p>Work Schedule</p>
                <p>: Flexible Hours (Remote)</p>

                <p>Reporting To</p>
                <p>: Project Coordinator</p>
              </div>
            </div>

            {/* CODE OF CONDUCT & POLICIES */}
            <div className="break-inside-avoid">
              <h3 className="text-sm font-bold text-[#1d4ed8] uppercase tracking-wide flex items-center gap-2 mb-3">
                <span>📜</span> CODE OF CONDUCT & POLICIES
              </h3>
              <ul className="list-disc list-inside pl-2 space-y-2 text-[#374151]">
                <li className="break-inside-avoid"><strong>Professionalism:</strong> You are expected to maintain the highest standards of professionalism, integrity, and ethical conduct.</li>
                <li className="break-inside-avoid"><strong>Punctuality & Deadlines:</strong> Tasks and project modules assigned to you must be completed within the stipulated deadlines.</li>
                <li className="break-inside-avoid"><strong>Communication:</strong> All official communication will be conducted via Company-approved channels. Prompt responses during working hours are expected.</li>
                <li className="break-inside-avoid"><strong>Leave Policy:</strong> Any planned leaves must be communicated to your reporting manager at least 48 hours in advance.</li>
              </ul>
            </div>

            {/* CONFIDENTIALITY (NDA) */}
            <div className="break-inside-avoid">
              <h3 className="text-sm font-bold text-[#92400e] uppercase tracking-wide flex items-center gap-2 mb-3">
                <span>{isCA ? '📣' : '🔒'}</span> {isCA ? 'BRAND REPRESENTATION' : 'CONFIDENTIALITY & NDA'}
              </h3>
              {isCA ? (
                <>
                  <p className="mb-2 pl-2 break-inside-avoid">As a representative of our brand, you agree to:</p>
                  <ul className="list-disc list-inside pl-2 space-y-1 text-[#374151]">
                    <li className="break-inside-avoid">Uphold the reputation and core values of Verve Nova Technologies in all promotional activities.</li>
                    <li className="break-inside-avoid">Not make any false claims or commitments on behalf of the company.</li>
                    <li className="break-inside-avoid">Use only approved marketing materials and logos provided by the team.</li>
                  </ul>
                </>
              ) : (
                <>
                  <p className="mb-2 pl-2 break-inside-avoid">During your tenure, you will have access to sensitive company data, codebases, and intellectual property. You agree to:</p>
                  <ul className="list-disc list-inside pl-2 space-y-1 text-[#374151]">
                    <li className="break-inside-avoid">Strictly maintain the confidentiality of all proprietary information and trade secrets.</li>
                    <li className="break-inside-avoid">Not share, distribute, or copy company code, assets, or client data for personal or external use.</li>
                    <li className="break-inside-avoid">Return or destroy all company-owned digital assets upon the completion or termination of the internship.</li>
                  </ul>
                </>
              )}
            </div>

            {/* NEXT STEPS */}
            <div className="break-inside-avoid">
              <h3 className="text-sm font-bold text-[#1d4ed8] uppercase tracking-wide flex items-center gap-2 mb-3">
                <span>🚀</span> NEXT STEPS
              </h3>
              <p className="pl-2 text-[#374151]">
                {isCA 
                  ? "You will shortly receive your ambassador kit and access credentials. Please join the official communication channels as instructed by your coordinator."
                  : "You will shortly receive your project onboarding details and access credentials. Please ensure you have set up the necessary development environment as instructed by the technical team."}
              </p>
            </div>
          </>
        )}

        {type === 'Offer Letter' && (
          <>
            <p className="break-inside-avoid">
              <strong>Dear {candidateName},</strong>
            </p>
            <p className="break-inside-avoid">
              <strong>Verve Nova Technologies</strong> is pleased to offer you the position of <strong>{domain}{isCA ? '' : ' Intern'}</strong>. This {isCA ? 'program' : 'internship'} will provide hands-on experience and exposure to real-time projects.
            </p>

            {/* INTERNSHIP DETAILS */}
            <div className="break-inside-avoid">
              <h3 className="text-sm font-bold text-[#92400e] uppercase tracking-wide flex items-center gap-2 mb-3">
                <span>💼</span> INTERNSHIP DETAILS
              </h3>
              <div className="grid grid-cols-[160px_1fr] gap-y-2 font-medium pl-6">
                <p>Position</p>
                <p>: {domain}{isCA ? '' : ' Intern'}</p>
                
                <p>{isCA ? 'Program Type' : 'Internship Type'}</p>
                <p>: Free / Unpaid</p>
                
                <p>{isCA ? 'Program Duration' : 'Internship Duration'}</p>
                <p>: 3 Months</p>
                
                <p>Start Date</p>
                <p>: {formattedStartDate}</p>
                
                <p>Working Hours</p>
                <p>: Flexible</p>
                
                <p>Work Mode</p>
                <p>: Remote</p>
              </div>
            </div>

            {/* ROLE & RESPONSIBILITIES */}
            <div className="break-inside-avoid">
              <h3 className="text-sm font-bold text-[#1d4ed8] uppercase tracking-wide flex items-center gap-2 mb-3">
                <span>👤</span> ROLES & RESPONSIBILITIES
              </h3>
              <p className="mb-2 pl-2 break-inside-avoid">Your responsibilities include (and are not limited to):</p>
              <ul className="list-disc list-inside pl-2 space-y-1 text-[#374151]">
                {isCA ? (
                  <>
                    <li className="break-inside-avoid">Promote Verve Nova internship programs within your campus and community.</li>
                    <li className="break-inside-avoid">Act as the primary point of contact between students and Verve Nova Technologies.</li>
                    <li className="break-inside-avoid">Encourage student participation and assist them in the application process.</li>
                    <li className="break-inside-avoid">Organize online/offline drives, webinars, and coordinate promotional activities.</li>
                    <li className="break-inside-avoid">Maintain an active presence on social media and share verified updates.</li>
                    <li className="break-inside-avoid">Provide feedback on campaigns and suggest new ideas for engagement.</li>
                  </>
                ) : (
                  <>
                    <li className="break-inside-avoid">Work on company-assigned {domain.toLowerCase()} projects and tasks.</li>
                    <li className="break-inside-avoid">Collaborate with the technical team, web designers, and project coordinators to deliver high-quality results.</li>
                    <li className="break-inside-avoid">Maintain project documentation, refine specifications, and perform basic testing.</li>
                    <li className="break-inside-avoid">Gather and refine specifications and requirements based on technical needs.</li>
                    <li className="break-inside-avoid">Be responsible for maintaining, expanding, and scaling our platforms.</li>
                    <li className="break-inside-avoid">Stay plugged into emerging technologies and industry trends.</li>
                  </>
                )}
              </ul>
            </div>

            {/* PROJECT-BASED WORK & BENEFITS */}
            <div className="grid grid-cols-2 gap-8">
              <div className="break-inside-avoid">
                <h3 className="text-sm font-bold text-[#92400e] uppercase tracking-wide flex items-center gap-2 mb-3">
                  <span>🚀</span> {isCA ? 'PROGRAM WORKFLOW' : 'PROJECT-BASED WORK'}
                </h3>
                <p className="pl-2 text-[#374151] break-inside-avoid">
                  {isCA 
                    ? "You will operate under the guidance of our coordinators to achieve targeted outreach goals. You are expected to perform activities with responsibility, discipline, and clear communication."
                    : "You will work on live projects assigned by Verve Nova Technologies. You are expected to complete tasks with responsibility, discipline, and clear communication."}
                </p>
              </div>
              <div className="break-inside-avoid">
                <h3 className="text-sm font-bold text-[#1d4ed8] uppercase tracking-wide flex items-center gap-2 mb-3">
                  <span>🎁</span> DATE OF JOINING & BENEFITS
                </h3>
                <p className="pl-2 mb-2 text-[#374151] break-inside-avoid">
                  Your date of joining the Company will be <strong>{formattedStartDate}</strong>, the duration would be 3 month(s) and your last working day would be <strong>{formattedEndDate}</strong>.
                </p>
                <ul className="list-disc list-inside pl-2 space-y-1 text-[#374151]">
                  <li className="break-inside-avoid">Real-time practical experience</li>
                  <li className="break-inside-avoid">{isCA ? 'Certificate of Completion' : 'Internship Certificate upon completion'}</li>
                  <li className="break-inside-avoid">Letter of Recommendation (performance-based)</li>
                  <li className="break-inside-avoid">Priority consideration for future paid roles</li>
                </ul>
              </div>
            </div>

            {/* TERMS & CONDITIONS */}
            <div className="break-inside-avoid">
              <h3 className="text-sm font-bold text-[#92400e] uppercase tracking-wide flex items-center gap-2 mb-3">
                <span>📄</span> TERMS & CONDITIONS
              </h3>
              <ul className="list-decimal list-inside pl-4 space-y-1 text-[#374151]">
                <li className="break-inside-avoid">This is an unpaid {isCA ? 'program' : 'internship'}.</li>
                <li className="break-inside-avoid">The {isCA ? 'ambassador' : 'intern'} must follow all company rules and confidentiality policies.</li>
                <li className="break-inside-avoid">Failure to complete assigned tasks may result in termination.</li>
                <li className="break-inside-avoid">Certificate will be awarded only after 3 months and successful {isCA ? 'program completion' : 'project completion'}.</li>
              </ul>
            </div>

            {/* ACTING IN BEST INTERESTS */}
            <div className="break-inside-avoid">
              <h3 className="text-sm font-bold text-[#1d4ed8] uppercase tracking-wide flex items-center gap-2 mb-3">
                <span>🛡️</span> ACTING IN THE BEST INTERESTS OF THE COMPANY
              </h3>
              <p className="mb-2 pl-2 break-inside-avoid">In performing your responsibilities and duties, you must serve the Company:</p>
              <ol className="list-[upper-alpha] list-inside pl-4 space-y-1 text-[#374151]">
                <li className="break-inside-avoid">faithfully and diligently, exercising all due care;</li>
                <li className="break-inside-avoid">acting in the best interests of the Company at all times;</li>
                <li className="break-inside-avoid">using best endeavors to protect and promote the good name and reputation; and</li>
                <li className="break-inside-avoid">perform your responsibilities and duties to the best of your endeavors.</li>
              </ol>
            </div>

            {/* POLICIES AND PROCEDURES */}
            <div className="break-inside-avoid">
              <h3 className="text-sm font-bold text-[#92400e] uppercase tracking-wide flex items-center gap-2 mb-3">
                <span>⚖️</span> COMPANY POLICIES AND PROCEDURES
              </h3>
              <p className="pl-2 text-[#374151] break-inside-avoid">
                You agree to comply with all the Company policies and procedures as determined and amended by the Company from time to time, including all anti-discrimination, sexual harassment, and occupational health and safety policies. You agree that compliance with the Company Policies and Procedures and/or legal compliance requirements to do with your position may lead to the termination of your {isCA ? 'role' : 'internship'} without notice.
              </p>
            </div>
            
            <p className="break-inside-avoid mt-4">
              Please sign and return to us one copy of this Letter of Offer in confirmation of your acceptance of these terms and conditions of the {isCA ? 'program' : 'internship'}. We look forward to your acceptance and to working closely with you in the near future.
            </p>
          </>
        )}

      </div>

      {/* Footer / Acceptance / Signatures */}
      <div className="mt-12 pt-8 border-t border-[#e5e7eb] html2pdf__page-break-avoid">
        <h3 className="text-sm font-bold text-[#1e3a8a] uppercase tracking-wide mb-4">ACCEPTANCE</h3>
        <p className="text-[12px] text-[#374151] leading-relaxed mb-8">
          I have had reasonable opportunity to evaluate and where necessary seek advice about this {isCA ? 'program' : 'internship'} and understand and fully accept the conditions of my {isCA ? 'role' : 'internship'} as detailed above. I confirm that my Date of Joining will be <strong>{formattedStartDate}</strong>.
          <br /><br />
          Upon completing this {isCA ? 'program' : 'internship'}, you will be given a Certificate of Completion. Moreover, if your performance is above average, you can also request a Letter of Recommendation (LoR). I have read and accept the terms and conditions of this {type.toLowerCase()}.
        </p>
        
        <div className="flex justify-between items-end">
          {/* Intern Signature Block */}
          <div className="w-64 text-left">
            <div className="w-full h-[1px] bg-[#9ca3af] mb-2" />
            <p className="font-bold text-[#1e293b] text-[13px]">Signature: __________________</p>
            <p className="text-[13px] font-medium text-[#4b5563] mt-1">Name: {candidateName}</p>
            <p className="text-[13px] font-medium text-[#4b5563] mt-1">Date: ____________________</p>
          </div>

          {/* Company Signature */}
          <div className="text-center w-48 relative">
            <div className="absolute -top-10 -left-12 -rotate-12 z-0">
              <DigitalStamp className="w-24 h-24 text-[#1e3a8a] opacity-50" />
            </div>
            <img src="/signatures/sign.png" alt="Signature" className="h-12 object-contain mx-auto mb-1 opacity-90 z-10 relative" />
            <div className="w-full h-[1px] bg-[#1e3a8a] mb-2 z-10 relative" />
            <p className="font-bold text-[#1e3a8a] text-[13px] z-10 relative">Puneet Kushwaha</p>
            <p className="text-[11px] text-[#4b5563] uppercase tracking-widest z-10 relative">Founder & CEO</p>
            <p className="text-[10px] text-[#6b7280] font-bold uppercase tracking-widest mt-1 z-10 relative">Verve Nova Technologies</p>
          </div>
        </div>
      </div>
    </div>
  );
};
