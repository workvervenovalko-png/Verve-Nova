import { Metadata } from "next";
import { ServiceTemplate } from "@/components/service-template";

export const metadata: Metadata = {
  title: "Cybersecurity & Institutional Vulnerability Defense",
  description: "Enterprise cybersecurity consulting, zero-trust architecture, penetration testing, compliance audits, and real-time threat response systems.",
  keywords: [
    "Enterprise Cybersecurity",
    "Zero-Trust Architecture",
    "Penetration Testing",
    "Security Audits",
    "Compliance Defense",
    "Data Protection",
    "Verve Nova Technologies"
  ],
  alternates: {
    canonical: "https://vervenovatech.com/cybersecurity",
  },
  openGraph: {
    title: "Cybersecurity & Vulnerability Defense | Verve Nova Technologies",
    description: "Protecting systems, securing high-growth architectures, and preventing breaches with 24/7 proactive security posture.",
    url: "https://vervenovatech.com/cybersecurity",
    siteName: "Verve Nova Technologies",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Cybersecurity - Verve Nova Tech" }],
  },
};

export default function CybersecurityPage() {
  return (
    <ServiceTemplate 
      title="Cybersecurity"
      subtitle="Protecting Systems. Securing Growth."
      overview="We provide advanced cybersecurity solutions and strategic consulting to safeguard digital assets and ensure compliance in an evolving threat landscape."
      deliverableLabel="What We Deliver"
      deliverables={[
        {
          title: "Full Security Audits",
          description: "We find the 'holes' in your current security before hackers do, so you stay one step ahead."
        },
        {
          title: "Real-time Protection",
          description: "Systems that watch your company data 24/7 to stop threats instantly."
        },
        {
          title: "Safe Scale Strategy",
          description: "Expert advice on how to keep your business secure as you grow into new markets."
        }
      ]}
      capabilities={[
        "Threat Detection & Prevention",
        "Vulnerability Assessments",
        "Data Protection Protocols",
        "Compliance & Risk Advisory"
      ]}
      ctaText="Secure Your Digital Operations"
    />
  );
}
