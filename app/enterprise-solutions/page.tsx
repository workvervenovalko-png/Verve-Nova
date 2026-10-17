import { Metadata } from "next";
import { ServiceTemplate } from "@/components/service-template";

export const metadata: Metadata = {
  title: "Enterprise Solutions & Institutional ERP/CRM Systems",
  description: "Unified enterprise software, ERP platforms, automated departmental workflows, and business intelligence suites engineered for scalable operations.",
  keywords: [
    "Enterprise Solutions",
    "Institutional ERP",
    "Enterprise CRM",
    "Operations Management Software",
    "Business Process Automation",
    "Verve Nova Technologies"
  ],
  alternates: {
    canonical: "https://vervenovatech.com/enterprise-solutions",
  },
  openGraph: {
    title: "Enterprise Solutions & Operations Systems | Verve Nova Technologies",
    description: "Unified platforms for scalable business operations, departmental sync, and automated enterprise reporting.",
    url: "https://vervenovatech.com/enterprise-solutions",
    siteName: "Verve Nova Technologies",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Enterprise Solutions - Verve Nova Tech" }],
  },
};

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
