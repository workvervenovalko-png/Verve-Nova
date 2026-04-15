import { ServiceTemplate } from "@/components/service-template";

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
