/**
 * Verve Nova - Official Premium Email Templates
 * Designed for Clarity & High-End Aesthetic
 */

const BRAND_COLORS = {
  indigo: '#6366f1',
  violet: '#8b5cf6',
  black: '#09090b',
  card: '#121215',
  border: 'rgba(255, 255, 255, 0.08)',
  textMain: '#ffffff',
  textDim: 'rgba(255, 255, 255, 0.5)',
};

const baseStyle = `
  font-family: 'Inter', -apple-system, sans-serif;
  background-color: ${BRAND_COLORS.black};
  color: ${BRAND_COLORS.textMain};
  padding: 40px 10px;
  margin: 0;
  line-height: 1.6;
`;

const containerStyle = `
  max-width: 540px;
  margin: 0 auto;
  background-color: ${BRAND_COLORS.card};
  border: 1px solid ${BRAND_COLORS.border};
  border-radius: 24px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
`;

const logoArea = `
  text-align: center;
  margin-bottom: 32px;
`;

const titleStyle = `
  font-size: 22px;
  font-weight: 800;
  letter-spacing: -0.01em;
  margin: 0 0 12px 0;
  color: #ffffff;
`;

const accentLabel = `
  font-size: 9px;
  font-weight: 900;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: ${BRAND_COLORS.indigo};
  display: block;
  margin-bottom: 8px;
`;

const footerStyle = `
  margin-top: 40px;
  padding-top: 24px;
  border-top: 1px solid ${BRAND_COLORS.border};
  font-size: 9px;
  font-weight: 700;
  color: ${BRAND_COLORS.textDim};
  text-transform: uppercase;
  letter-spacing: 0.15em;
  text-align: center;
`;

const buttonStyle = `
  display: inline-block;
  background-color: ${BRAND_COLORS.indigo};
  color: #ffffff;
  padding: 14px 28px;
  border-radius: 12px;
  font-weight: 700;
  text-decoration: none;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-top: 10px;
`;

export const getContactTemplate = (name: string) => `
<div style="${baseStyle}">
  <div style="${containerStyle}">
    <div style="${logoArea}">
       <span style="${accentLabel}">Message Received</span>
       <h1 style="${titleStyle}">Hello ${name},</h1>
    </div>
    <p style="color: ${BRAND_COLORS.textDim}; font-size: 14px;">Thank you for reaching out to Verve Nova. We've received your inquiry and our team is currently looking into it.</p>
    <p style="color: ${BRAND_COLORS.textDim}; font-size: 14px;">We usually respond within 24 hours. Hang tight, we'll be in touch very soon.</p>
    <div style="${footerStyle}">
      VERVE NOVA TECHNOLOGIES // GLOBAL OPERATIONS
    </div>
  </div>
</div>
`;

export const getWelcomeTemplate = (name: string, vnId: string) => `
<div style="${baseStyle}">
  <div style="${containerStyle}">
    <div style="${logoArea}">
       <span style="${accentLabel}">Onboarding Success</span>
       <h1 style="${titleStyle}">Welcome to Verve Nova.</h1>
    </div>
    <p style="color: ${BRAND_COLORS.textDim}; font-size: 14px;">Hi ${name}, your registration is complete. You are now part of our candidate network.</p>
    <p style="color: ${BRAND_COLORS.textDim}; font-weight: 600; margin-bottom: 8px;">Your Unique Identification ID:</p>
    <div style="background: rgba(99, 102, 241, 0.05); border: 1px dashed ${BRAND_COLORS.indigo}; padding: 24px; border-radius: 16px; text-align: center; margin: 20px 0;">
      <span style="font-size: 26px; font-weight: 900; color: #ffffff; letter-spacing: 0.1em;">${vnId}</span>
    </div>
    <p style="color: ${BRAND_COLORS.textDim}; font-size: 14px;">Please keep this ID handy for future reference and application tracking.</p>
    <div style="${footerStyle}">
      VERVE NOVA TECHNOLOGIES // GLOBAL OPERATIONS
    </div>
  </div>
</div>
`;

export const getApplicationTemplate = (name: string, role: string) => `
<div style="${baseStyle}">
  <div style="${containerStyle}">
    <div style="${logoArea}">
       <span style="${accentLabel}">Application Received</span>
       <h1 style="${titleStyle}">Application Submitted.</h1>
    </div>
    <p style="color: ${BRAND_COLORS.textDim}; font-size: 14px;">Hi ${name}, we've received your application for the <strong>${role}</strong> role.</p>
    <p style="color: ${BRAND_COLORS.textDim}; font-size: 14px;">Our hiring team is reviewing your profile. If your skills match our requirements, we'll contact you for the next steps.</p>
    <div style="${footerStyle}">
      VERVE NOVA TECHNOLOGIES // GLOBAL OPERATIONS
    </div>
  </div>
</div>
`;

export const getInterviewTemplate = (name: string, date: string, link?: string) => `
<div style="${baseStyle}">
  <div style="${containerStyle}">
    <div style="${logoArea}">
       <span style="${accentLabel}">Next Step</span>
       <h1 style="${titleStyle}">Interview Invitation.</h1>
    </div>
    <p style="color: ${BRAND_COLORS.textDim}; font-size: 14px;">Hello ${name}, we were impressed with your profile and would like to schedule a session to get to know you better.</p>
    
    <div style="background: rgba(255,255,255,0.03); border: 1px solid ${BRAND_COLORS.border}; padding: 24px; border-radius: 20px; margin: 24px 0;">
      <div style="margin-bottom: 20px;">
        <p style="margin: 0 0 4px 0; font-size: 10px; font-weight: 800; color: ${BRAND_COLORS.indigo}; text-transform: uppercase;">Scheduled Time</p>
        <p style="margin: 0; font-weight: 700; color: #fff; font-size: 16px;">${date}</p>
      </div>
      
      <div>
        <p style="margin: 0 0 8px 0; font-size: 10px; font-weight: 800; color: ${BRAND_COLORS.indigo}; text-transform: uppercase;">Interview Link</p>
        ${link ? `
          <a href="${link}" style="${buttonStyle}">Join Session</a>
        ` : `
          <p style="color: #fff; font-size: 13px; font-weight: 600; margin: 0;">Link will be provided shortly. <br/> <span style="font-size: 11px; opacity: 0.5;">Contact +91 7380663685 for help.</span></p>
        `}
      </div>
    </div>

    <p style="color: ${BRAND_COLORS.textDim}; font-size: 13px;">Please ensure you have a stable internet connection and are in a quiet environment.</p>

    <div style="${footerStyle}">
      VERVE NOVA TECHNOLOGIES // GLOBAL OPERATIONS
    </div>
  </div>
</div>
`;

export const getStatusTemplate = (name: string, status: string) => {
  const isAccepted = status.toLowerCase() === 'accepted';
  const color = isAccepted ? '#10b981' : '#f87171';
  const title = isAccepted ? 'Congratulations!' : 'Update on your Application';
  const message = isAccepted 
    ? `We are happy to inform you that you have been selected. Welcome to the Verve Nova team!`
    : `Thank you for your interest in Verve Nova. After careful review, we've decided to move forward with other candidates. We'll keep your profile in our database for future openings.`;

  return `
<div style="${baseStyle}">
  <div style="${containerStyle}">
    <div style="${logoArea}">
       <span style="${accentLabel}">Application Status</span>
       <h1 style="${titleStyle}; color: ${color};">${title}</h1>
    </div>
    <p style="color: #fff; font-size: 15px; font-weight: 600;">Hi ${name},</p>
    <p style="color: ${BRAND_COLORS.textDim}; font-size: 14px; line-height: 1.6;">${message}</p>
    <div style="${footerStyle}">
      VERVE NOVA TECHNOLOGIES // GLOBAL OPERATIONS
    </div>
  </div>
</div>
  `;
};

export const getOfferLetterTemplate = (name: string) => `
<div style="${baseStyle}">
  <div style="${containerStyle}">
    <div style="${logoArea}">
       <span style="${accentLabel}">Official Document</span>
       <h1 style="${titleStyle}">Offer of Employment.</h1>
    </div>
    <p style="color: #fff; font-size: 15px; font-weight: 600;">Congratulations ${name},</p>
    <p style="color: ${BRAND_COLORS.textDim}; font-size: 14px; line-height: 1.6;">We are thrilled to officially offer you a position at Verve Nova Technologies. Your exceptional skills and alignment with our vision have distinguished your profile.</p>
    <p style="color: ${BRAND_COLORS.textDim}; font-size: 14px; line-height: 1.6;">Please find your official Offer Letter attached to this secure transmission. It contains all the details regarding your role, compensation, and onboarding process.</p>
    
    <div style="background: rgba(99, 102, 241, 0.05); border: 1px dashed ${BRAND_COLORS.indigo}; padding: 24px; border-radius: 16px; text-align: center; margin: 24px 0;">
      <p style="margin: 0 0 8px 0; font-size: 10px; font-weight: 800; color: ${BRAND_COLORS.indigo}; text-transform: uppercase;">Action Required</p>
      <p style="margin: 0; color: #fff; font-size: 13px;">Please review the attached document, sign it, and revert back to finalize your onboarding.</p>
    </div>

    <div style="${footerStyle}">
      VERVE NOVA TECHNOLOGIES // GLOBAL OPERATIONS
    </div>
  </div>
</div>
`;

export const getCertificateTemplate = (name: string) => `
<div style="${baseStyle}">
  <div style="${containerStyle}">
    <div style="${logoArea}">
       <span style="${accentLabel}">Official Document</span>
       <h1 style="${titleStyle}">Certificate of Completion.</h1>
    </div>
    <p style="color: #fff; font-size: 15px; font-weight: 600;">Congratulations ${name},</p>
    <p style="color: ${BRAND_COLORS.textDim}; font-size: 14px; line-height: 1.6;">You have successfully completed your tenure with Verve Nova Technologies. Your dedication, technical prowess, and contribution to our projects have been exemplary.</p>
    <p style="color: ${BRAND_COLORS.textDim}; font-size: 14px; line-height: 1.6;">Please find your official Internship Certificate attached to this email. This document serves as a verified record of your valuable time at our studio.</p>
    
    <p style="color: ${BRAND_COLORS.textDim}; font-size: 14px; line-height: 1.6; margin-top: 24px;">We wish you the very best in your future endeavors. Your credentials will permanently remain in our high-priority alumni registry.</p>

    <div style="${footerStyle}">
      VERVE NOVA TECHNOLOGIES // GLOBAL OPERATIONS
    </div>
  </div>
</div>
`;
export const getHumanDocumentTemplate = (name: string, domain: string, startDate: string, verificationId: string, type: string) => `
<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px;">
  <p>Dear ${name.split(' ')[0]},</p>
  <p>I hope you are doing well.</p>

  <p>We are pleased to inform you that you have been selected for the position of <strong>${domain}</strong> at <strong>Verve Nova Technologies</strong>. Based on your qualifications and experience, we believe you will be a valuable addition to our team.</p>

  <p><strong>Internship Details:</strong></p>
  <ul style="list-style: none; padding-left: 0;">
    <li><strong>Position:</strong> Intern</li>
    <li><strong>Department:</strong> ${domain}</li>
    <li><strong>Duration:</strong> 3 Months</li>
    <li><strong>Mode:</strong> Remote</li>
    <li><strong>Start Date:</strong> ${startDate}</li>
  </ul>

  <p>Attached to this email, you will find your official <strong>Internship ${type}</strong>, which includes details regarding your role, duration of the internship, reporting structure, and other relevant terms and conditions.</p>
 
  <p>Please review the ${type.toLowerCase()} carefully. If you agree to the terms outlined, kindly reply with "I accept the offer". Should you have any questions or require further clarification, feel free to reach out to us directly.</p>

  <p>Alternatively, you can view and download your document directly from our secure portal:<br/>
  <a href="https://vervenovatech.com/verify/${verificationId}" style="color: #6366f1; text-decoration: underline; font-weight: bold;">View & Download Official Document</a></p>

  <div style="margin-top: 40px; border-top: 1px solid #eee; pt: 20px;">
    <p style="margin: 0; font-weight: bold;">Warm regards,</p>
    <p style="margin: 5px 0;"><strong>Founder & CEO</strong><br/>
    Verve Nova Technologies<br/>
    📧 <a href="mailto:work.vervenova.lko@gmail.com" style="color: #333; text-decoration: none;">work.vervenova.lko@gmail.com</a></p>
  </div>
  
  <p style="font-size: 10px; color: #999; margin-top: 30px;">Ref: ${verificationId} // Authorized Digital Transmission</p>
</div>
`;

export const getHumanCertificateTemplate = (name: string, domain: string, verificationId: string) => `
<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px;">
  <p>Dear ${name.split(' ')[0]},</p>
  <p>I hope you are doing well.</p>

  <p>We are pleased to share your official <strong>Certificate of Internship Completion</strong> for the ${domain} program at <strong>Verve Nova Technologies</strong>.</p>

  <p>Your dedication and technical contributions during your 3-month tenure have been exemplary. We are confident that the skills you've acquired will serve as a strong foundation for your future career.</p>
 
  <p>You can view and download your verified certificate using the link below:<br/>
  <a href="https://vervenovatech.com/verify/${verificationId}" style="color: #6366f1; text-decoration: underline; font-weight: bold;">Download Digital Certificate</a></p>

  <p>We wish you all the best for your upcoming endeavors.</p>

  <div style="margin-top: 40px; border-top: 1px solid #eee; pt: 20px;">
    <p style="margin: 0; font-weight: bold;">Warm regards,</p>
    <p style="margin: 5px 0;"><strong>Founder & CEO</strong><br/>
    Verve Nova Technologies<br/>
    📧 <a href="mailto:work.vervenova.lko@gmail.com" style="color: #333; text-decoration: none;">work.vervenova.lko@gmail.com</a></p>
  </div>
  
  <p style="font-size: 10px; color: #999; margin-top: 30px;">Ref: ${verificationId} // Verifiable Internship Credential</p>
</div>
`;
