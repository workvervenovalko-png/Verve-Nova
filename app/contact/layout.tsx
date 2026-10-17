import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us & Project Discovery Consultation",
  description: "Initiate project discovery with Verve Nova Technologies. Schedule an architecture consultation, request proposals, or connect with technical leadership.",
  keywords: [
    "Contact Verve Nova",
    "Hire Software Engineers",
    "Request Software Proposal",
    "Technical Consultation",
    "Verve Nova Contact"
  ],
  alternates: {
    canonical: "https://vervenovatech.com/contact",
  },
  openGraph: {
    title: "Contact Us & Project Discovery | Verve Nova Technologies",
    description: "Get in touch with Verve Nova's software engineering and systems leadership. Rapid 2-4 hour executive response.",
    url: "https://vervenovatech.com/contact",
    siteName: "Verve Nova Technologies",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Contact - Verve Nova Tech" }],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
