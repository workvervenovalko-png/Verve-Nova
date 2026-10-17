import { Metadata } from "next";
import { ServiceTemplate } from "@/components/service-template";

export const metadata: Metadata = {
  title: "AI & Intelligent Automation Systems",
  description: "Enterprise artificial intelligence, LLM fine-tuning, autonomous workflow agents, and predictive data systems engineered for mission-critical operations.",
  keywords: [
    "Enterprise AI",
    "Intelligent Automation",
    "LLM Integration",
    "Autonomous Agents",
    "Machine Learning Solutions",
    "Predictive Insights",
    "Verve Nova Technologies"
  ],
  alternates: {
    canonical: "https://vervenovatech.com/ai-automation",
  },
  openGraph: {
    title: "AI & Intelligent Systems | Verve Nova Technologies",
    description: "Automating enterprise decisions and enhancing business intelligence with bespoke AI models and workflow automations.",
    url: "https://vervenovatech.com/ai-automation",
    siteName: "Verve Nova Technologies",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "AI Automation - Verve Nova Tech" }],
  },
};

export default function AIAutomationPage() {
  return (
    <ServiceTemplate 
      title="AI & Intelligent Systems"
      subtitle="Automating Decisions. Enhancing Intelligence."
      overview="We integrate advanced artificial intelligence into business systems to enable automation, predictive insights, and intelligent decision-making. Our solutions are designed to optimize operations and drive measurable efficiency."
      deliverableLabel="What We Build"
      deliverables={[
        {
          title: "Intelligent Chatbots",
          description: "Smart assistants that handle customer queries 24/7 so your team doesn't have to."
        },
        {
          title: "Automated Workflows",
          description: "Software that handles repetitive tasks automatically, saving you hours of manual work."
        },
        {
          title: "Predictive Insights",
          description: "Tools that look at your data to predict future trends and help you make better decisions."
        }
      ]}
      capabilities={[
        "Machine Learning Integration",
        "Natural Language Processing",
        "Predictive Modeling",
        "Automated Decision Engines"
      ]}
      ctaText="Bring Intelligence to Your Business"
    />
  );
}
