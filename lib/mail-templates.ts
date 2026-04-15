/**
 * Verve Nova - Official 'Surgical Studio' Email Templates
 * Designed for Obsidian Aurora Aesthetic
 */

const VERVE_LOGO_SVG = `https://vervenova.tech/icon.svg`; // Fallback to verified image if available

const BRAND_COLORS = {
  indigo: '#6366f1',
  violet: '#8b5cf6',
  black: '#0A0A0C',
  gray: '#111113',
  textMuted: '#666666',
};

const baseStyle = `
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  background-color: ${BRAND_COLORS.black};
  color: #ffffff;
  padding: 40px 20px;
  line-height: 1.6;
`;

const containerStyle = `
  max-width: 600px;
  margin: 0 auto;
  background-color: ${BRAND_COLORS.gray};
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 24px;
  padding: 48px;
  text-align: left;
`;

const headerStyle = `
  margin-bottom: 40px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  padding-bottom: 24px;
`;

const titleStyle = `
  font-size: 24px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  margin: 0 0 10px 0;
  color: #ffffff;
`;

const accentTitleStyle = `
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 0.5em;
  text-transform: uppercase;
  color: ${BRAND_COLORS.indigo};
  display: block;
  margin-bottom: 12px;
`;

const footerStyle = `
  margin-top: 48px;
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  font-size: 10px;
  font-weight: 700;
  color: #333333;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  text-align: center;
`;

export const getContactTemplate = (name: string) => `
<div style="${baseStyle}">
  <div style="${containerStyle}">
    <div style="${headerStyle}">
      <span style="${accentTitleStyle}">Communication // Received</span>
      <h1 style="${titleStyle}">Query Initialized.</h1>
    </div>
    <p>Greetings ${name.toUpperCase()},</p>
    <p>Your transmission has been successfully received by the Verve Nova digital studio. Our engineering team is currently reviewing your brief with surgical precision.</p>
    <p>Expect a detailed response within 24 standard business hours.</p>
    <div style="${footerStyle}">
      © 2026 VERVE NOVA TECHNOLOGIES // MISSION-CRITICAL EXCELLENCE
    </div>
  </div>
</div>
`;

export const getWelcomeTemplate = (name: string, vnId: string) => `
<div style="${baseStyle}">
  <div style="${containerStyle}">
    <div style="${headerStyle}">
      <span style="${accentTitleStyle}">Onboarding // Initialized</span>
      <h1 style="${titleStyle}">Welcome to the Nexus.</h1>
    </div>
    <p>Greetings ${name.toUpperCase()},</p>
    <p>You have been successfully integrated into the Verve Nova Candidate Registry. Your unique identification has been generated:</p>
    <div style="background: rgba(99, 102, 241, 0.1); border: 1px solid ${BRAND_COLORS.indigo}; padding: 20px; border-radius: 12px; text-align: center; margin: 30px 0;">
      <span style="font-size: 24px; font-weight: 900; color: ${BRAND_COLORS.indigo}; letter-spacing: 0.1em;">${vnId}</span>
    </div>
    <p>Use this ID for all future intelligence audits and mission applications within our studio.</p>
    <div style="${footerStyle}">
      © 2026 VERVE NOVA TECHNOLOGIES // MISSION-CRITICAL EXCELLENCE
    </div>
  </div>
</div>
`;

export const getApplicationTemplate = (name: string, role: string) => `
<div style="${baseStyle}">
  <div style="${containerStyle}">
    <div style="${headerStyle}">
      <span style="${accentTitleStyle}">Application // Staged</span>
      <h1 style="${titleStyle}">Mission Submission Received.</h1>
    </div>
    <p>Greetings ${name.toUpperCase()},</p>
    <p>Your application for the <strong>${role.toUpperCase()}</strong> position has been successfully staged for review.</p>
    <p>Our talent architects are currently analyzing your profile against our surgical standards. We will notify you of the next protocol phase shortly.</p>
    <div style="${footerStyle}">
      © 2026 VERVE NOVA TECHNOLOGIES // MISSION-CRITICAL EXCELLENCE
    </div>
  </div>
</div>
`;

export const getInterviewTemplate = (name: string, date: string, link?: string) => `
<div style="${baseStyle}">
  <div style="${containerStyle}">
    <div style="${headerStyle}">
      <span style="${accentTitleStyle}">Interview // Protocol</span>
      <h1 style="${titleStyle}">Selection Phase Initialized.</h1>
    </div>
    <p>Greetings ${name.toUpperCase()},</p>
    <p>We have escalated your application to the technical interview phase.</p>
    <div style="border: 1px solid rgba(255, 255, 255, 0.05); padding: 24px; border-radius: 16px; margin: 24px 0;">
      <p style="margin: 0 0 10px 0; font-size: 10px; color: #444;">SCHEDULED DATE</p>
      <p style="margin: 0; font-weight: 800; color: #fff; font-size: 16px;">${date}</p>
      
      <p style="margin: 20px 0 10px 0; font-size: 10px; color: #444;">G-MEET ACCESS</p>
      ${link ? `
        <a href="${link}" style="display: block; background: ${BRAND_COLORS.indigo}; color: #fff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 800; text-align: center; font-size: 12px; text-transform: uppercase;">Join Intelligence Brief</a>
      ` : `
        <div style="color: #6366f1; font-weight: 800; font-size: 12px; line-height: 1.4;">
          For G-Meet link, contact: +91 7380663685
        </div>
      `}
    </div>
    <div style="${footerStyle}">
      © 2026 VERVE NOVA TECHNOLOGIES // MISSION-CRITICAL EXCELLENCE
    </div>
  </div>
</div>
`;

export const getStatusTemplate = (name: string, status: string) => {
  const isAccepted = status.toLowerCase() === 'accepted';
  const color = isAccepted ? '#10b981' : '#ef4444';
  const title = isAccepted ? 'Mission Approved.' : 'Mission Concluded.';
  const message = isAccepted 
    ? 'Your application has been successfully accepted into the Verve Nova studio. Welcome to the elite core.'
    : 'We have concluded our review phase for your current application. Although we are not moving forward at this time, your credentials remain in our high-priority registry.';

  return `
<div style="${baseStyle}">
  <div style="${containerStyle}">
    <div style="${headerStyle}">
      <span style="${accentTitleStyle}">Application // Result</span>
      <h1 style="${titleStyle}; color: ${color};">${title}</h1>
    </div>
    <p>Greetings ${name.toUpperCase()},</p>
    <p>${message}</p>
    <div style="${footerStyle}">
      © 2026 VERVE NOVA TECHNOLOGIES // MISSION-CRITICAL EXCELLENCE
    </div>
  </div>
</div>
  `;
};
