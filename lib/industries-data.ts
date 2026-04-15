export interface IndustryDetail {
  title: string;
  subtitle: string;
  overview: string;
  deliverableLabel: string;
  deliverables: {
    title: string;
    description: string;
  }[];
  capabilities: string[];
  ctaText: string;
  slug: string;
}

export const industriesData: Record<string, IndustryDetail> = {
  "fintech-banking": {
    slug: "fintech-banking",
    title: "Fintech & Banking",
    subtitle: "Secure, Scalable Infrastructure for the Future of Money.",
    overview: "In the world of finance, security and speed are non-negotiable. We engineer high-frequency trading platforms, secure digital wallets, and complex banking backends that handle millions of transactions with zero failure rate.",
    deliverableLabel: "FinTech Deliverables",
    deliverables: [
      {
        title: "Secure Ledger Systems",
        description: "Immutable, high-performance ledger architectures for real-time transaction tracking and reconciliation."
      },
      {
        title: "Payment Gateways",
        description: "Global payment processing engines with advanced fraud detection and automatic multi-currency settlement."
      },
      {
        title: "HFT Infrastructure",
        description: "Low-latency trading environments designed for high-frequency execution and market data processing."
      }
    ],
    capabilities: [
      "Blockchain Integration",
      "PCI-DSS Compliance",
      "Real-time Fraud Detection",
      "Secure API Ecosystems"
    ],
    ctaText: "Deploy Your FinTech Solution"
  },
  "healthcare-tech": {
    slug: "healthcare-tech",
    title: "Healthcare Tech",
    subtitle: "Digital Resilience and Patient-Centric Innovation.",
    overview: "The healthcare landscape is undergoing a massive digital shift. We build secure, compliant, and highly interoperable systems that allow medical providers to focus on what matters most: patient care.",
    deliverableLabel: "Healthcare Solutions",
    deliverables: [
      {
        title: "HIPAA-Compliant Platforms",
        description: "Secure data environments built to strict regulatory standards for patient privacy and encryption."
      },
      {
        title: "Tele-medicine Portals",
        description: "High-end video consultation systems with integrated electronic health records (EHR) and digital prescriptions."
      },
      {
        title: "Patient Management",
        description: "Advanced systems for appointment scheduling, hospital bed management, and clinical workflow optimization."
      }
    ],
    capabilities: [
      "HIPAA Compliance Setup",
      "DICOM/FHIR Integration",
      "Secure Patient Portals",
      "Zero-Trust Architecture"
    ],
    ctaText: "Innovate Your Healthcare System"
  },
  "ecommerce": {
    slug: "ecommerce",
    title: "E-Commerce",
    subtitle: "High-Conversion Scaling for Modern Retail.",
    overview: "Transactional excellence is the difference between a shop and a brand. We build custom e-commerce engines that handle massive traffic spikes and offer personalized shopping experiences at global scale.",
    deliverableLabel: "Retail Infrastructure",
    deliverables: [
      {
        title: "Scalable Multi-Vendor Platforms",
        description: "Bespoke marketplace architectures that allow thousands of vendors to manage inventory and payouts seamlessly."
      },
      {
        title: "AI Recommendation Engines",
        description: "Deep-learning models integrated into the shopping flow to provide hyper-personalized product suggestions."
      },
      {
        title: "Omnichannel Sync",
        description: "Real-time inventory and customer data synchronization across physical and digital storefronts."
      }
    ],
    capabilities: [
      "Headless Commerce Design",
      "Global Payment Routing",
      "Automated Logistics Sync",
      "Personalized Upsell AI"
    ],
    ctaText: "Scale Your Retail Brand"
  },
  "logistics-supply": {
    slug: "logistics-supply",
    title: "Logistics & Supply",
    subtitle: "Supply Chain Visibility and Operational Excellence.",
    overview: "The global economy relies on movement. We build the software that tracks, optimizes, and secures that movement. From warehouse automation to real-time fleet tracking.",
    deliverableLabel: "Logistics Software",
    deliverables: [
      {
        title: "Real-Time Tracking Systems",
        description: "End-to-end visibility dashboards tracking goods from factory floors to the customer doorstep."
      },
      {
        title: "Algorithmic Route Optimization",
        description: "Custom mathematical models designed to minimize fuel costs and delivery times for global shipping fleets."
      },
      {
        title: "Warehouse Automation",
        description: "AI-driven inventory slotting and automated picking lists that reduce physical operational overhead."
      }
    ],
    capabilities: [
      "IoT Device Integration",
      "Route Optimization Algorithms",
      "Real-time Inventory Mapping",
      "Custom EDI Bridges"
    ],
    ctaText: "Optimize Your Supply Chain"
  },
  "real-estate-prop": {
    slug: "real-estate-prop",
    title: "Real Estate & Prop",
    subtitle: "Next-Gen Visualization and Management for Developers.",
    overview: "Real estate is evolving into a digital asset class. We build the tools that allow developers to visualize, manage, and sell properties in a connected world.",
    deliverableLabel: "PropTech Deliverables",
    deliverables: [
      {
        title: "Virtual Viewing Portals",
        description: "Immersive 3D/VR walkthrough systems that allow global buyers to experience properties before they are built."
      },
      {
        title: "Automated Property Management",
        description: "Full-scale software for large-scale developers to handle tenant onboarding, maintenance, and rent collection."
      },
      {
        title: "Real Estate Market Data",
        description: "Advanced analytics platforms that track market trends and property valuations in real-time."
      }
    ],
    capabilities: [
      "3D/Web Graphics (WebGL)",
      "Automated Tenant CRM",
      "Secure Digital Contracts",
      "Smart Building IoT"
    ],
    ctaText: "Build Your PropTech Future"
  },
  "data-ai-saas": {
    slug: "data-ai-saas",
    title: "Data & AI-SaaS",
    subtitle: "High-Performance Data Pipelines and LLM Implementations.",
    overview: "Data is the new oil, but only if it's refined. We build the pipelines that move data at scale and the intelligence engines that turn that data into enterprise value.",
    deliverableLabel: "AI & Platform Engineering",
    deliverables: [
      {
        title: "Data Pipelines",
        description: "High-performance processing streams that move and transform massive datasets with zero latency."
      },
      {
        title: "Custom LLM Implementations",
        description: "Engineering specialized Large Language Models tailored to institutional knowledge and specific industry use cases."
      },
      {
        title: "Multi-Tenant SaaS",
        description: "Isolated, secure data environments for thousands of clients on individual, shared infrastructures."
      }
    ],
    capabilities: [
      "LLM Fine-Tuning",
      "Vector Data Pipelines",
      "Scalable Tenant Management",
      "Cloud Infrastructure Ops"
    ],
    ctaText: "Deploy Your Intelligence"
  }
};
