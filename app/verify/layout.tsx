import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Credential & Certificate Verification Portal",
  description: "Official credential verification system for Verve Nova Technologies certificates, internship completions, and employment credentials.",
  keywords: [
    "Certificate Verification",
    "Internship Certificate Check",
    "VNT Credential Verification",
    "Verve Nova Certificate Authenticator"
  ],
  alternates: {
    canonical: "https://vervenovatech.com/verify",
  },
  openGraph: {
    title: "Credential Verification Portal | Verve Nova Technologies",
    description: "Verify authentic certificates, offer letters, and credentials issued by Verve Nova Technologies.",
    url: "https://vervenovatech.com/verify",
    siteName: "Verve Nova Technologies",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Verify - Verve Nova Tech" }],
  },
};

export default function VerifyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
