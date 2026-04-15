import { ServiceTemplate } from "@/components/service-template";

export default function CloudInfrastructurePage() {
  return (
    <ServiceTemplate 
      title="Cloud & Infrastructure"
      subtitle="Scalable. Reliable. Future-Ready Systems."
      overview="We build cloud-native infrastructure that ensures high availability, scalability, and performance for modern digital systems."
      deliverableLabel="What We Deliver"
      deliverables={[
        {
          title: "Always-On Sync",
          description: "We set up hosting that stays live 100% of the time, so your business never stops."
        },
        {
          title: "Global Speed",
          description: "Systems that load instantly for customers anywhere in the world, from NYC to Mumbai."
        },
        {
          title: "Future-Proof Setup",
          description: "A cloud foundation that is ready to grow as quickly as your business does."
        }
      ]}
      capabilities={[
        "Auto Scaling Systems",
        "High Availability Architecture",
        "Performance Monitoring",
        "Secure Cloud Environments"
      ]}
      ctaText="Scale Your Infrastructure Seamlessly"
    />
  );
}
