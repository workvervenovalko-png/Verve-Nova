import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Engineering Case Studies & Architectural Solutions",
  description: "Deep architectural case studies into enterprise systems, zero-commission quick commerce, real-time sync, and scalable mobile app ecosystems engineered by Verve Nova.",
  keywords: [
    "Software Architecture Case Studies",
    "Enterprise Tech Case Studies",
    "ChotU Architecture",
    "Verve Nova Engineering"
  ],
  alternates: {
    canonical: "https://vervenovatech.com/case-studies",
  },
  openGraph: {
    title: "Engineering Case Studies | Verve Nova Technologies",
    description: "Detailed breakdowns of high-scale enterprise platforms and mobile systems delivered by Verve Nova Technologies.",
    url: "https://vervenovatech.com/case-studies",
    siteName: "Verve Nova Technologies",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Case Studies - Verve Nova Tech" }],
  },
};

export default function CaseStudiesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
