import { Metadata } from "next";
import { ServiceTemplate } from "@/components/service-template";

export const metadata: Metadata = {
  title: "Software Engineering & Enterprise Systems Development",
  description: "Enterprise software engineering, scalable web platforms, distributed systems, and custom applications engineered for high concurrency and performance.",
  keywords: [
    "Enterprise Software Engineering",
    "Custom Software Development",
    "Full-Stack Web Engineering",
    "Scalable System Architecture",
    "Next.js Development",
    "Node.js Microservices",
    "Verve Nova Technologies"
  ],
  alternates: {
    canonical: "https://vervenovatech.com/software-engineering",
  },
  openGraph: {
    title: "Software Engineering & Enterprise Systems | Verve Nova Technologies",
    description: "Architecting high-performance, scalable software systems, web platforms, and custom mobile applications.",
    url: "https://vervenovatech.com/software-engineering",
    siteName: "Verve Nova Technologies",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Software Engineering - Verve Nova Tech" }],
  },
};

export default function SoftwareEngineeringPage() {
  return (
    <ServiceTemplate 
      title="Software Engineering"
      subtitle="Architecting High-Performance, Scalable Software Systems"
      overview="At Verve Nova Tech, we engineer robust software systems designed to support enterprise-scale operations. Our development approach focuses on scalability, performance, and long-term adaptability, ensuring your technology evolves with your business."
      deliverableLabel="What We Build"
      deliverables={[
        {
          title: "Web Platforms",
          description: "Fast, reliable websites built to handle high traffic and scale with your user base."
        },
        {
          title: "Mobile Apps",
          description: "Custom mobile applications designed for seamless performance and great user experiences."
        },
        {
          title: "Custom Systems",
          description: "Tailor-made software solutions built to solve your unique business challenges."
        }
      ]}
      capabilities={[
        "Scalable System Architecture",
        "Modular & Maintainable Codebase",
        "Performance Optimization",
        "Security-First Development"
      ]}
      ctaText="Start Building Scalable Systems"
    />
  );
}
