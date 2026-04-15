import { ServiceTemplate } from "@/components/service-template";

export default function CybersecurityPage() {
  return (
    <ServiceTemplate 
      title="Cybersecurity"
      subtitle="Protecting Systems. Securing Growth."
      overview="We provide advanced cybersecurity solutions and strategic consulting to safeguard digital assets and ensure compliance in an evolving threat landscape."
      deliverableLabel="What We Deliver"
      deliverables={[
        {
          title: "Full Security Audits",
          description: "We find the 'holes' in your current security before hackers do, so you stay one step ahead."
        },
        {
          title: "Real-time Protection",
          description: "Systems that watch your company data 24/7 to stop threats instantly."
        },
        {
          title: "Safe Scale Strategy",
          description: "Expert advice on how to keep your business secure as you grow into new markets."
        }
      ]}
      capabilities={[
        "Threat Detection & Prevention",
        "Data Security & Encryption",
        "Compliance Frameworks",
        "Security Strategy"
      ]}
      ctaText="Secure Your Systems Today"
    />
  );
}
