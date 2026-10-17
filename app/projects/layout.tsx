import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Featured Engineering Projects & Production Systems",
  description: "Explore live production software engineered by Verve Nova Technologies, including ChotU Quick Commerce, ServiceHub, Advance Transcription, and Siora 3D Infra.",
  keywords: [
    "Software Portfolio",
    "Production Systems",
    "ChotU Quick Commerce",
    "ServiceHub Play Store App",
    "Advance Transcription AI",
    "Verve Nova Projects"
  ],
  alternates: {
    canonical: "https://vervenovatech.com/projects",
  },
  openGraph: {
    title: "Featured Engineering Projects | Verve Nova Technologies",
    description: "Explore live enterprise web platforms, mobile apps, and SaaS systems engineered by Verve Nova Technologies.",
    url: "https://vervenovatech.com/projects",
    siteName: "Verve Nova Technologies",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Projects - Verve Nova Tech" }],
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
