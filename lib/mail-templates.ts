/**
 * Verve Nova - Official Professional Email Templates
 * Designed for Clarity, Professionalism & High-End Aesthetic
 */

const baseStyles = "font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;";
const footerSection = `
  <div style="margin-top: 40px; border-top: 1px solid #eee; padding-top: 20px;">
    <p style="margin: 0; font-weight: bold;">Warm regards,</p>
    <p style="margin: 5px 0;"><strong>Puneet Kushwaha</strong><br/>
    Founder & CEO – Verve Nova Technologies<br/>
    📧 <a href="mailto:work.vervenova.lko@gmail.com" style="color: #333; text-decoration: none;">work.vervenova.lko@gmail.com</a><br/>
    📞 +91 7380663685</p>
  </div>
`;

export const getContactTemplate = (name: string) => `
<div style="${baseStyles}">
  <p>Dear ${name.split(' ')[0]},</p>
  <p>Thank you for reaching out to <strong>Verve Nova Technologies</strong>.</p>
  <p>We have received your message and our team is currently reviewing your inquiry. We strive to provide thoughtful responses and will get back to you within 24–48 business hours.</p>
  <p>If your request is urgent, please feel free to reply directly to this email or contact our support line.</p>
  ${footerSection}
  <p style="font-size: 10px; color: #999; margin-top: 30px;">Transmission ID: ${Math.random().toString(36).substring(7).toUpperCase()} // Official Inquiry Response</p>
</div>
`;

export const getWelcomeTemplate = (name: string, vnId: string) => `
<div style="${baseStyles}">
  <p>Dear ${name.split(' ')[0]},</p>
  <p>Welcome to the <strong>Verve Nova Technologies</strong> ecosystem.</p>
  <p>Your registration is successful, and you have been officially onboarded into our candidate and professional network. This allows you to track your applications and receive official communications from our team.</p>
  
  <p><strong>Your Unique Identification ID:</strong></p>
  <div style="background: #f8f9fa; border: 1px solid #e9ecef; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
    <span style="font-size: 24px; font-weight: bold; color: #6366f1; letter-spacing: 2px;">${vnId}</span>
  </div>
  
  <p>Please keep this ID confidential and use it for all future correspondence regarding your applications or verification requests.</p>
  ${footerSection}
</div>
`;

export const getApplicationTemplate = (name: string, role: string) => `
<div style="${baseStyles}">
  <p>Dear ${name.split(' ')[0]},</p>
  <p>We have successfully received your application for the <strong>${role}</strong> position at Verve Nova Technologies.</p>
  <p>Our talent acquisition team is currently reviewing your qualifications and experience. If your profile aligns with our current requirements, we will reach out to you to schedule an interview or further assessment.</p>
  <p>In the meantime, feel free to explore our latest projects and updates on our official portal.</p>
  ${footerSection}
</div>
`;

export const getInterviewTemplate = (name: string, date: string, link?: string) => `
<div style="${baseStyles}">
  <p>Dear ${name.split(' ')[0]},</p>
  <p>I hope you are doing well.</p>
  <p>We were impressed with your application and would like to invite you for an interview to discuss your skills and the role in more detail.</p>
  
  <div style="background: #f8f9fa; border: 1px solid #e9ecef; padding: 20px; border-radius: 8px; margin: 20px 0;">
    <p style="margin: 0 0 10px 0;"><strong>Scheduled Time:</strong> ${date}</p>
    <p style="margin: 0;"><strong>Format:</strong> Virtual / Online Session</p>
    ${link ? `
      <p style="margin: 15px 0 0 0;"><a href="${link}" style="background-color: #6366f1; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Join Interview Session</a></p>
    ` : `
      <p style="margin: 15px 0 0 0; color: #666; font-style: italic;">The meeting link will be shared shortly before the session.</p>
    `}
  </div>
  
  <p>Please ensure you have a stable internet connection and a quiet environment for the duration of the interview.</p>
  ${footerSection}
</div>
`;

export const getStatusTemplate = (name: string, status: string) => {
  const isAccepted = status.toLowerCase() === 'accepted';
  const message = isAccepted 
    ? `We are pleased to inform you that you have been selected for the position you applied for. Welcome to the Verve Nova team! We are excited to have you on board.`
    : `Thank you for your interest in Verve Nova Technologies. After careful review of your application and/or interview performance, we have decided to move forward with other candidates at this time. We will keep your profile in our database for future opportunities that may be a better match.`;

  return `
<div style="${baseStyles}">
  <p>Dear ${name.split(' ')[0]},</p>
  <p>This is an update regarding your application for the internship/professional program at Verve Nova Technologies.</p>
  <p>${message}</p>
  <p>We appreciate the time and effort you put into the application process.</p>
  ${footerSection}
</div>
  `;
};

export const getOfferLetterTemplate = (name: string) => `
<div style="${baseStyles}">
  <p>Dear ${name.split(' ')[0]},</p>
  <p>Congratulations!</p>
  <p>We are thrilled to officially offer you a position at <strong>Verve Nova Technologies</strong>. Your skills and potential align perfectly with our vision, and we are excited to see the impact you will make.</p>
  <p>Please find your official <strong>Offer Letter</strong> attached to this email. It contains important details regarding your role, responsibilities, and the onboarding process.</p>
  <p>Kindly review the document and revert back with your acceptance to proceed further.</p>
  ${footerSection}
</div>
`;

export const getCertificateTemplate = (name: string) => `
<div style="${baseStyles}">
  <p>Dear ${name.split(' ')[0]},</p>
  <p>Congratulations on successfully completing your tenure at <strong>Verve Nova Technologies</strong>.</p>
  <p>Your contributions during this period have been invaluable, and we appreciate the dedication you showed towards your projects. We are pleased to share your official completion certificate, which is attached to this email.</p>
  <p>We wish you the very best in your future career endeavors. Do stay in touch!</p>
  ${footerSection}
</div>
`;

export const getHumanDocumentTemplate = (name: string, domain: string, startDate: string, verificationId: string, type: string) => `
<div style="${baseStyles}">
  <p>Dear ${name.split(' ')[0]},</p>
  <p>I hope you are doing well.</p>
  <p>We are pleased to inform you that you have been selected for the position of <strong>${domain}</strong> at <strong>Verve Nova Technologies</strong>. Based on your qualifications and experience, we believe you will be a valuable addition to our team.</p>
  <p><strong>Internship Details:</strong></p>
  <ul style="list-style: none; padding-left: 0;">
    <li><strong>Position:</strong> Intern</li>
    <li><strong>Department:</strong> ${domain}</li>
    <li><strong>Duration:</strong> 3 Months</li>
    <li><strong>Mode:</strong> Remote</li>
    <li><strong>Joining Date:</strong> To be shared in the Official Joining Letter</li>
  </ul>
  <p>Attached to this email, you will find your official <strong>Internship ${type}</strong>, which includes details regarding your role, duration of the internship, reporting structure, and other relevant terms and conditions.</p>
  <p>Please review the ${type.toLowerCase()} carefully. If you agree to the terms outlined, kindly reply with "I accept the offer".</p>
  <p>Alternatively, you can view and download your document directly from our secure portal:<br/>
  <a href="https://vervenovatech.com/verify/${verificationId}" style="color: #6366f1; text-decoration: underline; font-weight: bold;">View & Download Official Document</a></p>
  ${footerSection}
  <p style="font-size: 10px; color: #999; margin-top: 30px;">Ref: ${verificationId} // Authorized Digital Transmission</p>
</div>
`;

export const getHumanCertificateTemplate = (name: string, domain: string, verificationId: string) => `
<div style="${baseStyles}">
  <p>Dear ${name.split(' ')[0]},</p>
  <p>I hope you are doing well.</p>
  <p>We are pleased to share your official <strong>Certificate of Internship Completion</strong> for the ${domain} program at <strong>Verve Nova Technologies</strong>.</p>
  <p>Your dedication and technical contributions during your 3-month tenure have been exemplary. We are confident that the skills you've acquired will serve as a strong foundation for your future career.</p>
  <p>You can view and download your verified certificate using the link below:<br/>
  <a href="https://vervenovatech.com/verify/${verificationId}" style="color: #6366f1; text-decoration: underline; font-weight: bold;">Download Digital Certificate</a></p>
  <p>We wish you all the best for your upcoming endeavors.</p>
  ${footerSection}
  <p style="font-size: 10px; color: #999; margin-top: 30px;">Ref: ${verificationId} // Verifiable Internship Credential</p>
</div>
`;
