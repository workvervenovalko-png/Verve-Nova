import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transparent Engineering Pricing & Engagement Packages",
  description: "Institutional software engineering pricing and agile sprint packages for MVP founders, mid-market scaling, and enterprise custom architectures.",
  keywords: [
    "Software Engineering Pricing",
    "MVP Development Packages",
    "App Development Cost",
    "Enterprise Tech Sprint",
    "Verve Nova Pricing"
  ],
  alternates: {
    canonical: "https://vervenovatech.com/pricing",
  },
  openGraph: {
    title: "Engineering Pricing & Engagement Packages | Verve Nova Technologies",
    description: "Transparent, milestone-based pricing for software engineering, MVP sprints, and enterprise platforms.",
    url: "https://vervenovatech.com/pricing",
    siteName: "Verve Nova Technologies",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Pricing - Verve Nova Tech" }],
  },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
