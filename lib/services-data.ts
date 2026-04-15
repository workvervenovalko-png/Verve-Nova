export interface ServiceDetail {
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
}

export const servicesData: Record<string, ServiceDetail> = {
  // Software & Application
  "web-applications": {
    title: "Web Applications",
    subtitle: "High-Performance, Scalable Web Solutions for Modern Enterprises.",
    overview: "In today's digital-first economy, your web application is more than just a site—it's the engine of your business. We build ultra-fast, responsive, and secure web platforms using modern stacks like Next.js, React, and Node.js. Our applications are engineered to handle high concurrency while providing a seamless user experience across all devices.",
    deliverableLabel: "What We Build",
    deliverables: [
      {
        title: "Enterprise Portals",
        description: "Secure, role-based internal systems for data management, employee collaboration, and operational efficiency."
      },
      {
        title: "SaaS Platforms",
        description: "Full-scale Software-as-a-Service products with multi-tenancy, subscription management, and robust APIs."
      },
      {
        title: "E-commerce Solutions",
        description: "High-conversion digital storefronts with integrated payment gateways and sophisticated inventory management."
      }
    ],
    capabilities: [
      "Next.js & React Development",
      "Real-time Data Processing",
      "PWA (Progressive Web Apps)",
      "Headless CMS Integration"
    ],
    ctaText: "Launch Your Web Platform"
  },
  "mobile-applications": {
    title: "Mobile Applications",
    subtitle: "Native-Quality Experiences for iOS and Android.",
    overview: "Mobility is the core of modern user engagement. We develop high-performance mobile applications that leverage the full potential of hardware capabilities. Whether it's a native iOS/Android app or a cross-platform solution using React Native or Flutter, we ensure your brand stays in your customers' pockets.",
    deliverableLabel: "Our Mobile Expertise",
    deliverables: [
      {
        title: "Consumer Apps",
        description: "Engagement-focused mobile apps with intuitive UX, push notifications, and seamless offline functionality."
      },
      {
        title: "Field Force Systems",
        description: "Specialized tools for remote workers, including GPS tracking, offline data sync, and image processing."
      },
      {
        title: "FinTech & Secure Apps",
        description: "High-security mobile solutions with biometric authentication and encrypted data storage."
      }
    ],
    capabilities: [
      "React Native & Flutter",
      "Native iOS (Swift) & Android (Kotlin)",
      "Offline-First Architecture",
      "App Store & Play Store Deployment"
    ],
    ctaText: "Build Your Mobile App"
  },
  "enterprise-software": {
    title: "Enterprise Software",
    subtitle: "Complex Systems Optimized for Scale and Reliability.",
    overview: "Large-scale organizations require software that is as ambitious as their goals. We engineer enterprise-grade software that integrates deeply with your existing workflows, automates complex logic, and scales horizontally to meet global demand. Our focus is on long-term maintainability and bulletproof security.",
    deliverableLabel: "Enterprise Solutions",
    deliverables: [
      {
        title: "Legacy Modernization",
        description: "Updating outdated systems into modern microservices architectures without disrupting business continuity."
      },
      {
        title: "Business Intelligence Tools",
        description: "Custom dashboards and reporting systems that turn raw enterprise data into actionable insights."
      },
      {
        title: "Supply Chain Management",
        description: "End-to-end tracking and optimization software for complex logistics and procurement cycles."
      }
    ],
    capabilities: [
      "Microservices Architecture",
      "Distributed Systems",
      "High-Availability Design",
      "Legacy Data Migration"
    ],
    ctaText: "Scale Your Enterprise"
  },
  "custom-platforms": {
    title: "Custom Platforms",
    subtitle: "Bespoke Technology Built for Your Unique Business Model.",
    overview: "Off-the-shelf software often forces you to compromise your business processes. Our custom platforms are built from the ground up to match your exact requirements. We solve your most difficult technical challenges with tailored solutions that give you a significant competitive advantage.",
    deliverableLabel: "Custom Implementations",
    deliverables: [
      {
        title: "Niche Marketplaces",
        description: "Highly specialized platforms for specific industries, featuring custom matching algorithms and workflows."
      },
      {
        title: "Scientific & Medical Systems",
        description: "Precision software for data-intensive fields, emphasizing accuracy, compliance, and specialized visualizations."
      },
      {
        title: "Internal Operations Tools",
        description: "Custom-fit software that automates your unique business logic and replaces fragmented spreadsheets."
      }
    ],
    capabilities: [
      "Domain-Specific Architecture",
      "Custom Workflow Design",
      "Third-Party Integrations",
      "Scalable Cloud Foundation"
    ],
    ctaText: "Build Your Vision"
  },

  // AI & Automation
  "ai-chatbots": {
    title: "AI Chatbots",
    subtitle: "Conversational Intelligence for 24/7 Engagement.",
    overview: "Reduce operational costs and improve customer satisfaction with AI-driven conversational agents. We build sophisticated chatbots that understand context, intent, and sentiment, providing human-like interactions across web, mobile, and social platforms.",
    deliverableLabel: "Chatbot Capabilities",
    deliverables: [
      {
        title: "Customer Support Bots",
        description: "Automated handling of up to 80% of routine queries with seamless human handoff features."
      },
      {
        title: "Sales & Navigation Bots",
        description: "Proactive agents that guide users through your product catalog and help close sales."
      },
      {
        title: "Internal Knowledge Bots",
        description: "LLM-powered assistants that help your employees find information in company wikis instantly."
      }
    ],
    capabilities: [
      "Natural Language Processing (NLP)",
      "LLM Integration (GPT-4, Claude)",
      "Multi-Platform Support",
      "Sentiment Analysis"
    ],
    ctaText: "Deploy Intelligent Bots"
  },
  "workflow-automation": {
    title: "Workflow Automation",
    subtitle: "Automating the Repetitive to Focus on the Strategic.",
    overview: "Human error and manual repetition are the hidden costs of growth. We map your business processes and implement automated workflows that connect your apps, move your data, and perform complex tasks without human intervention.",
    deliverableLabel: "Automated Workflows",
    deliverables: [
      {
        title: "Data Entry Automation",
        description: "Eliminating manual typing by automating data extraction from emails, PDFs, and external APIs."
      },
      {
        title: "Marketing Automation",
        description: "Complex lead nurturing and campaign management systems that respond to user behavior in real-time."
      },
      {
        title: "HR & Onboarding Workflows",
        description: "Standardizing employee journeys from first interview to final paperwork with automated tasking."
      }
    ],
    capabilities: [
      "No-Code/Low-Code Integration",
      "Custom Scripting & Webhooks",
      "Event-Driven Architecture",
      "Process Bottleneck Analysis"
    ],
    ctaText: "Automate Your Workflow"
  },
  "intelligent-systems": {
    title: "Intelligent Systems",
    subtitle: "Embedded Intelligence for Complex Decision Making.",
    overview: "Go beyond simple automation with systems that learn and adapt. We build 'neural' backends that use machine learning to optimize resources, predict maintenance needs, and provide real-time recommendations for your users.",
    deliverableLabel: "AI Implementation",
    deliverables: [
      {
        title: "Recommendation Engines",
        description: "Personalized content and product feeds that increase user engagement and average order value."
      },
      {
        title: "Predictive Analytics",
        description: "Forecasting systems that analyze historical data to predict future trends and risks."
      },
      {
        title: "Computer Vision Tools",
        description: "Image and video analysis software for quality control, security, or automated categorization."
      }
    ],
    capabilities: [
      "Machine Learning Engineering",
      "Predictive Modeling",
      "Data Science Consulting",
      "Neural Network Design"
    ],
    ctaText: "Infuse Intelligence"
  },

  // Enterprise Systems
  "crm-development": {
    title: "CRM Development",
    subtitle: "Relationship Management Tailored to Your Sales Cycle.",
    overview: "Generic CRMs are often cluttered and confusing. We build custom Customer Relationship Management systems that mirror your specific sales process, providing clarity for your team and better experiences for your leads.",
    deliverableLabel: "CRM Features",
    deliverables: [
      {
        title: "Sales Pipeline Management",
        description: "Visual, drag-and-drop pipelines that give an instant overview of every deal's status."
      },
      {
        title: "Automated Lead Scoring",
        description: "Algorithmic scoring that tells your sales team exactly which prospects to call first."
      },
      {
        title: "Omnichannel Communications",
        description: "Integrated email, calling, and messaging history inside every contact profile."
      }
    ],
    capabilities: [
      "Custom Field Architecture",
      "Salesforce/HubSpot Migration",
      "Real-time Dashboards",
      "Lead Attribution Tracking"
    ],
    ctaText: "Design Your CRM"
  },
  "erp-solutions": {
    title: "ERP Solutions",
    subtitle: "The Central Nervous System of Your Business.",
    overview: "Enterprise Resource Planning should unify your departments, not isolate them. We build modular ERPs that integrate finance, HR, inventory, and operations into a single, cohesive source of truth for your entire organization.",
    deliverableLabel: "ERP Modules",
    deliverables: [
      {
        title: "Financial Consolidation",
        description: "Automated accounting and reporting modules that handle multi-currency and complex tax rules."
      },
      {
        title: "Inventory & Warehouse MGMT",
        description: "Real-time stock tracking with automated reordering and predictive supply chain logic."
      },
      {
        title: "Manufacturing Execution",
        description: "Detailed production tracking, quality control, and resource allocation for industrial units."
      }
    ],
    capabilities: [
      "Unified Data Architecture",
      "Secure Financial Logic",
      "Inventory Forecasting",
      "Departmental Interoperability"
    ],
    ctaText: "Integrate Your Business"
  },
  "business-automation": {
    title: "Business Automation",
    subtitle: "Operational Efficiency at Scale.",
    overview: "Business automation is the bridge between a startup and an enterprise. We identify manual bottlenecks across your organization and solve them with hyper-automation, reducing overhead costs by up to 60%.",
    deliverableLabel: "Automation Areas",
    deliverables: [
      {
        title: "Invoicing & Billing",
        description: "Seamless, hands-free billing cycles with automated reminders and reconciliation."
      },
      {
        title: "Compliance & Reporting",
        description: "Automated audit logs and regulatory report generation to ensure you're always compliant."
      },
      {
        title: "Customer Success Tasks",
        description: "Automated reach-outs and task creation based on user interaction levels."
      }
    ],
    capabilities: [
      "Robotic Process Automation (RPA)",
      "AI-Driven Logic",
      "Cloud Workflow Synergy",
      "Efficiency Auditing"
    ],
    ctaText: "Optimize Operations"
  },

  // Backend & APIs
  "rest-apis": {
    title: "REST APIs",
    subtitle: "Robust Bridges for Modern Interoperability.",
    overview: "APIs are the heartbeat of the modern web. We design and build clean, well-documented, and highly performant RESTful APIs that allow your systems to communicate securely with anything else on the planet.",
    deliverableLabel: "API Engineering",
    deliverables: [
      {
        title: "Public API Platforms",
        description: "Developer-friendly APIs that allow third parties to build on top of your platform safely."
      },
      {
        title: "Mobile Backends",
        description: "High-speed JSON APIs optimized for low-latency mobile networking and data sync."
      },
      {
        title: "Third-Party Integration Proxies",
        description: "Secure layers that consolidate multiple external APIs into a single, clean internal endpoint."
      }
    ],
    capabilities: [
      "Node.js & Go Backends",
      "GraphQL & REST Support",
      "Rate Limiting & Security",
      "Comprehensive Documentation"
    ],
    ctaText: "Design Your API"
  },
  "secure-authentication": {
    title: "Secure Authentication",
    subtitle: "Bulletproof Identity Management for Peace of Mind.",
    overview: "Security starts with knowing exactly who is accessing your system. We implement industry-standard authentication and authorization layers that protect your user data while providing a frictionless login experience.",
    deliverableLabel: "Security Protocols",
    deliverables: [
      {
        title: "Single Sign-On (SSO)",
        description: "Seamless login across multiple apps using Google, Microsoft, or internal enterprise credentials."
      },
      {
        title: "Multi-Factor Auth (MFA)",
        description: "Adding critical layers of security via SMS, Email, or Authenticator App verification."
      },
      {
        title: "Role-Based Access (RBAC)",
        description: "Granular permission systems that ensure users only see what they are authorized to see."
      }
    ],
    capabilities: [
      "OAuth2 & OpenID Connect",
      "JWT & Session Management",
      "Biometric Integration",
      "Identity Provider Setup"
    ],
    ctaText: "Secure Your System"
  },
  "payment-integrations": {
    title: "Payment Integrations",
    subtitle: "Frictionless Global Commerce and Revenue Management.",
    overview: "Moving money securely is the most critical part of any digital business. We integrate global payment gateways with complex logic for subscriptions, taxes, and multi-party payouts, ensuring every cent is accounted for.",
    deliverableLabel: "Payment Solutions",
    deliverables: [
      {
        title: "Subscription Billing",
        description: "Complex recurring logic with trials, tiered pricing, and automated dunning management."
      },
      {
        title: "Global Gateway Setup",
        description: "Integration with Stripe, PayPal, Razorpay, or local banks for worldwide reach."
      },
      {
        title: "Marketplace Payouts",
        description: "Automated logic for split payments and vendor disbursements in platform business models."
      }
    ],
    capabilities: [
      "Stripe Connect & Billing",
      "PCI Compliance Advisory",
      "Automated Tax (VAT/GST) Logic",
      "Refund & Dispute Automation"
    ],
    ctaText: "Simplify Payments"
  },

  // UI/UX & Branding
  "ui-ux-design": {
    title: "UI/UX Design",
    subtitle: "Where Aesthetic Excellence Meets Human Intuition.",
    overview: "Design is not just how it looks; it's how it works. We combine deep user research with cutting-edge visual design to create products that are both stunning to look at and effortless to use.",
    deliverableLabel: "Design Process",
    deliverables: [
      {
        title: "User Research & Audits",
        description: "Deep-diving into how your users actually interact with your product to find friction points."
      },
      {
        title: "High-Fidelity Wireframes",
        description: "Detailed interactive prototypes that let you 'feel' the application before a single line of code is written."
      },
      {
        title: "Interaction Design",
        description: "Fine-tuning transitions, animations, and micro-interactions that make the app feel alive."
      }
    ],
    capabilities: [
      "Figma Prototyping",
      "User Journey Mapping",
      "Accessibility (WCAG) Audits",
      "Design Systems Construction"
    ],
    ctaText: "Design Your Experience"
  },
  "brand-identity": {
    title: "Brand Identity",
    subtitle: "Visual Narratives for the Digital Age.",
    overview: "Your brand is your promise to your customer. We define the visual language—logos, typography, and color theory—that makes your business instantly recognizable and conveys your core values at a glance.",
    deliverableLabel: "Identity Package",
    deliverables: [
      {
        title: "Logo Systems",
        description: "Versatile, timeless logos that work perfectly on everything from a favicon to a billboard."
      },
      {
        title: "Color & Type Systems",
        description: "Carefully curated palettes and typography sets that evoke the right emotions in your audience."
      },
      {
        title: "Brand Style Guides",
        description: "Comprehensive rulebooks that ensure consistency across your entire marketing and product ecosystem."
      }
    ],
    capabilities: [
      "Visual Strategy",
      "Typography Design",
      "Iconography Sets",
      "Brand Voice Definition"
    ],
    ctaText: "Define Your Brand"
  },
  "creative-assets": {
    title: "Creative Assets",
    subtitle: "High-Impact Visual Content for Multi-Channel Growth.",
    overview: "Great software needs great content to sell it. We produce high-end creative assets—from custom illustrations to 3D animations—that help you stand out in a crowded digital landscape.",
    deliverableLabel: "Asset Production",
    deliverables: [
      {
        title: "Custom Illustrations",
        description: "Unique visual storytelling that makes complex technical concepts easy to understand."
      },
      {
        title: "Motion Graphics",
        description: "Engaging video content and UI animations that capture attention in social feeds and landing pages."
      },
      {
        title: "Social Media Kits",
        description: "Ready-to-use templates for LinkedIn, Twitter, and Instagram that maintain brand integrity."
      }
    ],
    capabilities: [
      "2D/3D Asset Creation",
      "Motion Design",
      "Deck & Presentation Design",
      "Ad Creative Production"
    ],
    ctaText: "Elevate Your Content"
  },

  // Marketing & Growth
  "seo": {
    title: "SEO",
    subtitle: "Search Authority Driven by Data and Content.",
    overview: "Being invisible on Google is like not existing. We implement technical SEO and content strategies that drive organic traffic, build authority, and keep you ahead of your competitors in the search results.",
    deliverableLabel: "SEO Strategy",
    deliverables: [
      {
        title: "Technical SEO Audits",
        description: "Fixing core web vitals, site structure, and indexing issues that hold your rankings back."
      },
      {
        title: "Keyword Intelligence",
        description: "Identifying high-intent search terms that your customers are actually using to find services."
      },
      {
        title: "Backlink Strategy",
        description: "Building your domain authority through high-quality, relevant industry placements."
      }
    ],
    capabilities: [
      "On-Page Optimization",
      "Semantic Content Strategy",
      "Performance SEO",
      "Competitor Analysis"
    ],
    ctaText: "Rank Higher"
  },
  "performance-marketing": {
    title: "Performance Marketing",
    subtitle: "Precision-Targeted Campaigns for Guaranteed Scaling.",
    overview: "Advertising should be an investment, not an expense. We manage data-driven campaigns across Google, Meta, and LinkedIn that focus on ROI, customer acquisition cost (CAC), and lifetime value (LTV).",
    deliverableLabel: "Ad Management",
    deliverables: [
      {
        title: "Google Search Ads",
        description: "Capturing users at the very moment they are searching for solutions like yours."
      },
      {
        title: "Social Retargeting",
        description: "Keeping your brand top-of-mind for users who have previously visited your site without converting."
      },
      {
        title: "A/B Testing Frameworks",
        description: "Constant iteration on copy and creative to squeeze every bit of value from your budget."
      }
    ],
    capabilities: [
      "Media Buying Strategy",
      "Conversion Tracking Setup",
      "CPA Optimization",
      "Multi-Channel Attribution"
    ],
    ctaText: "Launch Campaigns"
  },
  "lead-generation": {
    title: "Lead Generation",
    subtitle: "A Predictable Pipeline for Your Sales Team.",
    overview: "Stop waiting for sales and start generating them. We build automated lead generation machines that find, qualify, and deliver high-intent prospects directly to your CRM.",
    deliverableLabel: "Generation Systems",
    deliverables: [
      {
        title: "High-Conversion Landers",
        description: "Optimized landing pages designed with a single goal: converting visitors into leads."
      },
      {
        title: "Cold Outreach Systems",
        description: "Personalized, automated B2B outreach that starts conversations with key decision makers."
      },
      {
        title: "Lead Qualification Funnels",
        description: "Interactive quizzes and forms that filter out low-quality leads before they ever reach your team."
      }
    ],
    capabilities: [
      "Funnel Engineering",
      "B2B Database Sourcing",
      "Email Automation",
      "Landing Page Optimization"
    ],
    ctaText: "Scale Your Pipeline"
  },

  // Cloud & DevOps
  "cloud-deployment": {
    title: "Cloud Deployment",
    subtitle: "Modern Infrastructure for Global Reach.",
    overview: "Infrastructure should be invisible, resilient, and cost-effective. We design and manage cloud environments on AWS, Google Cloud, and Azure that ensure your application stays online no matter the load.",
    deliverableLabel: "Cloud Services",
    deliverables: [
      {
        title: "Architecture Design",
        description: "Designing the blueprint for your servers, databases, and networking to ensure zero single points of failure."
      },
      {
        title: "Serverless Implementations",
        description: "Leveraging Lambda and Cloud Functions to build apps that only cost money when they are actually being used."
      },
      {
        title: "Cloud Migration",
        description: "Safely moving your existing data and applications from local servers to the cloud."
      }
    ],
    capabilities: [
      "AWS / GCP / Azure",
      "Infrastructure as Code (Terraform)",
      "Serverless Architecture",
      "Cost Optimization Audits"
    ],
    ctaText: "Move to the Cloud"
  },
  "cicd-pipelines": {
    title: "CI/CD Pipelines",
    subtitle: "Ship Faster with Absolute Confidence.",
    overview: "Manual deployments are the enemy of speed. We implement automated Continuous Integration and Continuous Deployment pipelines that test and deploy your code every time you make a change.",
    deliverableLabel: "DevOps Pipeline",
    deliverables: [
      {
        title: "Automated Testing Suites",
        description: "Ensuring that new code doesn't break old features by running thousands of tests in seconds."
      },
      {
        title: "One-Click Deployments",
        description: "Simplifying the release process so you can ship updates multiple times a day with zero downtime."
      },
      {
        title: "Environment Management",
        description: "Standardizing Staging, UAT, and Production environments so 'it works on my machine' is never a problem again."
      }
    ],
    capabilities: [
      "GitHub Actions & GitLab CI",
      "Docker & Kubernetes",
      "Automated Testing Integration",
      "Zero-Downtime Releases"
    ],
    ctaText: "Streamline Delivery"
  },
  "infrastructure-scaling": {
    title: "Infrastructure Scaling",
    subtitle: "Building for Millions of Users.",
    overview: "Success can be dangerous if your infrastructure isn't ready. We implement auto-scaling groups and global CDNs that allow your site to handle traffic spikes naturally and efficiently.",
    deliverableLabel: "Scaling Strategy",
    deliverables: [
      {
        title: "Auto-Scaling Groups",
        description: "Systems that automatically add or remove server capacity based on real-time traffic demand."
      },
      {
        title: "Global CDN Setup",
        description: "Distributing your content across hundreds of edge locations so your site is fast in London, New York, or Delhi."
      },
      {
        title: "Database Optimization",
        description: "Sharding and indexing strategies that keep your data fast as your records grow from thousands to billions."
      }
    ],
    capabilities: [
      "Kubernetes Orchestration",
      "Horizontal & Vertical Scaling",
      "Load Balancing",
      "Performance Benchmarking"
    ],
    ctaText: "Scale Globally"
  },

  // Cybersecurity
  "security-audits": {
    title: "Security Audits",
    subtitle: "Identifying Vulnerabilities Before Hackers Do.",
    overview: "Peace of mind comes from rigorous testing. We perform deep security audits of your codebase and infrastructure to find and patch entry points, ensuring your company isn't the next headline.",
    deliverableLabel: "Security Services",
    deliverables: [
      {
        title: "Penetration Testing",
        description: "Simulating real-world attacks to see how your systems hold up under pressure."
      },
      {
        title: "Compliance Audits",
        description: "Ensuring your data handling meets SOC2, HIPAA, or GDPR standards."
      },
      {
        title: "Network Security Review",
        description: "Closing open ports and securing firewalls to prevent unauthorized access at the network level."
      }
    ],
    capabilities: [
      "Ethical Hacking",
      "Compliance Consulting (SOC2/GDPR)",
      "Vulnerability Scanning",
      "Security Best Practices Training"
    ],
    ctaText: "Audit Your Security"
  },
  "risk-analysis": {
    title: "Risk Analysis",
    subtitle: "Data-Driven Strategies for Long-Term Resilience.",
    overview: "Cybersecurity is as much about people and processes as it is about code. We analyze your entire organization to identify risks in how you manage data and provide a roadmap for total resilience.",
    deliverableLabel: "Risk Assessment",
    deliverables: [
      {
        title: "Threat Modeling",
        description: "Mapping out possible attack vectors specific to your industry and business model."
      },
      {
        title: "Disaster Recovery Planning",
        description: "Step-by-step playbooks for what to do if the worst happens, ensuring data is never truly lost."
      },
      {
        title: "Third-Party Risk Review",
        description: "Auditing the security of the vendors and tools you use every day."
      }
    ],
    capabilities: [
      "Business Continuity Planning",
      "Threat Intelligence",
      "Data Governance",
      "Employee Security Policies"
    ],
    ctaText: "Analyze Your Risk"
  },
  "it-consulting": {
    title: "IT Consulting",
    subtitle: "Strategic Technology Leadership on Demand.",
    overview: "Don't guess your way into a technical debt hole. Our expert consultants provide the strategic oversight you need to make the right technology choices today that will support your goals tomorrow.",
    deliverableLabel: "Consulting Areas",
    deliverables: [
      {
        title: "vCTO Services",
        description: "Fractional Chief Technology Officer support for startups and SMEs that need high-level vision without the full-time cost."
      },
      {
        title: "Tech Stack Advisory",
        description: "Helping you choose the right languages, databases, and frameworks for your specific project."
      },
      {
        title: "Budget Optimization",
        description: "Reviewing your technical overhead to find ways to reduce spend while improving performance."
      }
    ],
    capabilities: [
      "Strategic Roadmapping",
      "Tech Selection Advice",
      "Budgeting & Forecasting",
      "Vendor Management"
    ],
    ctaText: "Get Expert Advice"
  }
};
