import { ServiceTemplate } from "@/components/service-template";

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
