import { Metadata } from "next";
import { ServiceTemplate } from "@/components/service-template";

export const metadata: Metadata = {
  title: "Digital Experience & Modern UI/UX Product Design",
  description: "Bespoke digital experience design, user research, interactive prototyping, conversion rate optimization, and cohesive design systems for high-growth tech brands.",
  keywords: [
    "Digital Experience Design",
    "UI UX Design",
    "Product Design Studio",
    "Design Systems",
    "User Interface Engineering",
    "Conversion Optimization",
    "Verve Nova Technologies"
  ],
  alternates: {
    canonical: "https://vervenovatech.com/digital-experience",
  },
  openGraph: {
    title: "Digital Experience & UI/UX Product Design | Verve Nova Technologies",
    description: "Designing modern digital experiences and high-fidelity interfaces that captivate users and drive commercial results.",
    url: "https://vervenovatech.com/digital-experience",
    siteName: "Verve Nova Technologies",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Digital Experience - Verve Nova Tech" }],
  },
};

export default function DigitalExperiencePage() {
  return (
    <ServiceTemplate 
      title="Digital Experience"
      subtitle="Designing Interfaces That Drive Results"
      overview="We create intuitive and visually refined digital experiences that enhance usability, engagement, and overall user satisfaction."
      deliverableLabel="What We Deliver"
      deliverables={[
        {
          title: "Modern UI Design",
          description: "Beautiful, clean interfaces that make your brand look like a leader in your industry."
        },
        {
          title: "User Experience",
          description: "We research how your customers think to build apps they will actually love using."
        },
        {
          title: "Brand Growth Strategy",
          description: "A digital roadmap that ensures your business stays ahead of competitors."
        }
      ]}
      capabilities={[
        "User-Centered Design",
        "Conversion Optimization",
        "Design Systems",
        "Consistent Branding"
      ]}
      ctaText="Enhance Your Digital Experience"
    />
  );
}
