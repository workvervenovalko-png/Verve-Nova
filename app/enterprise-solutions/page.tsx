import { ServiceTemplate } from "@/components/service-template";

export default function EnterpriseSolutionsPage() {
  return (
    <ServiceTemplate 
      title="Enterprise Solutions"
      subtitle="Unified Platforms for Scalable Business Operations"
      overview="We design enterprise-grade systems that centralize processes, improve efficiency, and enable data-driven decision-making across organizations."
      deliverableLabel="What We Build"
      deliverables={[
        {
          title: "Team Sync Tools",
          description: "Internal software that helps your departments communicate and share data perfectly."
        },
        {
          title: "Operations Hub",
          description: "A single platform to manage your inventory, orders, and employees from one place."
        },
        {
          title: "Reporting Dashboards",
          description: "Clear, easy-to-read reports that show you exactly how your business is performing."
        }
      ]}
      capabilities={[
        "Process Integration",
        "Centralized Data Systems",
        "Scalable Architecture",
        "Business Intelligence"
      ]}
      ctaText="Transform Your Business Operations"
    />
  );
}
