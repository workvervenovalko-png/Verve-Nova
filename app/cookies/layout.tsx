import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy & Telemetry Notice",
  description: "Transparent cookie and telemetry policy explaining session maintenance, performance metrics, and client preference handling.",
  alternates: {
    canonical: "https://vervenovatech.com/cookies",
  },
  openGraph: {
    title: "Cookie Policy | Verve Nova Technologies",
    description: "Detailed cookie and telemetry guidelines for vervenovatech.com visitors.",
    url: "https://vervenovatech.com/cookies",
    siteName: "Verve Nova Technologies",
    type: "website",
  },
};

export default function CookiesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
