import { Metadata } from "next";
import { ServiceTemplate } from "@/components/service-template";

export const metadata: Metadata = {
  title: "Cloud Infrastructure & DevOps Systems",
  description: "Enterprise cloud-native infrastructure, automated CI/CD pipelines, Kubernetes orchestration, and multi-region high availability architectures.",
  keywords: [
    "Cloud Infrastructure",
    "DevOps Automation",
    "Kubernetes Orchestration",
    "AWS Google Cloud Azure",
    "Auto Scaling Systems",
    "Verve Nova Technologies"
  ],
  alternates: {
    canonical: "https://vervenovatech.com/cloud-infrastructure",
  },
  openGraph: {
    title: "Cloud Infrastructure & DevOps Systems | Verve Nova Technologies",
    description: "Enterprise cloud-native architecture ensuring 99.99% uptime, auto-scaling, and global low-latency performance.",
    url: "https://vervenovatech.com/cloud-infrastructure",
    siteName: "Verve Nova Technologies",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Cloud Infrastructure - Verve Nova Tech" }],
  },
};

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
