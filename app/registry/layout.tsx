import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Corporate Registry & MSME Government Compliance",
  description: "Official corporate registry, MSME Government of India registration (UDYAM-UP-10-0047070), client verification, and legal identity credentials for Verve Nova Technologies.",
  keywords: [
    "Verve Nova MSME Registration",
    "UDYAM-UP-10-0047070",
    "Corporate Verification",
    "Verve Nova Legal Entity",
    "Govt Registered Software Agency"
  ],
  alternates: {
    canonical: "https://vervenovatech.com/registry",
  },
  openGraph: {
    title: "Corporate Registry & MSME Compliance | Verve Nova Technologies",
    description: "Verified institutional credentials and legal registration for Verve Nova Technologies.",
    url: "https://vervenovatech.com/registry",
    siteName: "Verve Nova Technologies",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Registry - Verve Nova Tech" }],
  },
};

export default function RegistryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
