import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service & Client IP Ownership Agreement",
  description: "Terms of service, engineering deliverables, 100% intellectual property assignment, and service level commitments of Verve Nova Technologies.",
  alternates: {
    canonical: "https://vervenovatech.com/terms",
  },
  openGraph: {
    title: "Terms of Service | Verve Nova Technologies",
    description: "Legal terms, 100% code ownership assignment, and service terms for Verve Nova Technologies clients.",
    url: "https://vervenovatech.com/terms",
    siteName: "Verve Nova Technologies",
    type: "website",
  },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
