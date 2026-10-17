import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Protocol & Data Sovereignty Policy",
  description: "Zero-data-harvesting privacy policy, AES-256 encryption standards, and data protection practices of Verve Nova Technologies.",
  alternates: {
    canonical: "https://vervenovatech.com/privacy",
  },
  openGraph: {
    title: "Privacy Policy | Verve Nova Technologies",
    description: "Enterprise data privacy and protection protocols of Verve Nova Technologies.",
    url: "https://vervenovatech.com/privacy",
    siteName: "Verve Nova Technologies",
    type: "website",
  },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
