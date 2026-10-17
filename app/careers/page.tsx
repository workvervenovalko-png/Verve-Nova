import { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CareersHero, WhyJoinUs, InternshipProgram, ApplicationProcess } from "@/components/careers-sections";
import { NoiseTexture } from "@/components/ui/noise-texture";

export const metadata: Metadata = {
  title: "Careers & Engineering Internships | Verve Nova Technologies",
  description: "Join Verve Nova Technologies. Explore engineering roles, product design internships, mentor-driven apprenticeships, and PPO pathways in modern software systems.",
  keywords: [
    "Tech Careers",
    "Software Engineering Internship",
    "Web Development Internship",
    "UI UX Design Internship",
    "Verve Nova Careers",
    "Verve Nova Technologies PPO"
  ],
  alternates: {
    canonical: "https://vervenovatech.com/careers",
  },
  openGraph: {
    title: "Careers & Engineering Internships | Verve Nova Technologies",
    description: "Build cutting-edge enterprise cloud systems, AI tools, and digital platforms. Apply for live internships and roles.",
    url: "https://vervenovatech.com/careers",
    siteName: "Verve Nova Technologies",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Careers - Verve Nova Tech" }],
  },
};

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-background selection:bg-indigo-500/10 selection:text-indigo-900 overflow-hidden">
      <NoiseTexture />
      <Navbar />
      <CareersHero />
      <WhyJoinUs />
      <InternshipProgram />
      <ApplicationProcess />
      <Footer />
    </main>
  );
}
