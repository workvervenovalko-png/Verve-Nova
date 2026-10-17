import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enterprise Software Services & Engineering Capabilities",
  description: "Explore Verve Nova's 25+ specialized engineering services across web applications, mobile platforms, cloud systems, AI automation, and custom enterprise software.",
  keywords: [
    "Enterprise Software Services",
    "Web App Development",
    "Mobile Application Engineering",
    "Cloud Native Development",
    "AI ML Solutions",
    "DevOps Automation",
    "Verve Nova Technologies"
  ],
  alternates: {
    canonical: "https://vervenovatech.com/services",
  },
  openGraph: {
    title: "Enterprise Software Services | Verve Nova Technologies",
    description: "Full-spectrum software engineering, cloud systems, and AI automation for global enterprises and high-growth brands.",
    url: "https://vervenovatech.com/services",
    siteName: "Verve Nova Technologies",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Services - Verve Nova Tech" }],
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
