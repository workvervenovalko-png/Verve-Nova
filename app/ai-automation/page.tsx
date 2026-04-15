import { ServiceTemplate } from "@/components/service-template";

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
        "Predictive Analytics",
        "Process Automation",
        "Real-Time Decision Systems"
      ]}
      ctaText="Integrate Intelligence into Your Systems"
    />
  );
}
