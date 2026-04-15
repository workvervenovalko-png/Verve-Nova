export type InternshipRole = {
  slug: string;
  title: string;
  shortDesc: string;
  duration: string;
  responsibilities: string[];
  benefits: string[];
  requirements: string[];
  techStack: string[];
};

export const internshipRoles: Record<string, InternshipRole> = {
  "web-development": {
    slug: "web-development",
    title: "Web Development",
    shortDesc: "Engineer high-performance digital ecosystems and fullstack architectures.",
    duration: "3 Months",
    responsibilities: [
      "Architect responsive, high-converting frontend systems using Next.js 14+.",
      "Develop robust backend logic and API integrations for enterprise scale.",
      "Optimize website performance and vitals for global deployment.",
      "Collaborate with UI/UX teams to translate pixel-perfect designs into code.",
      "Participate in code reviews and architectural audits."
    ],
    benefits: [
      "Professional Certificate of Completion.",
      "Fast-track path to Full-Time PPO (Performance Based).",
      "Direct mentorship from senior technical architects.",
      "Contribution to live global enterprise projects.",
      "Stellar LinkedIn recommendation & Professional Portfolio."
    ],
    requirements: [
      "Solid understanding of React.js and TypeScript.",
      "Familiarity with Tailwind CSS and Framer Motion.",
      "Basic knowledge of Node.js and Database architecture.",
      "Uncompromising attention to detail and performance."
    ],
    techStack: ["React", "Next.js", "TypeScript", "TailwindCSS", "Prisma", "PostgreSQL"]
  },
  "uiux-design": {
    slug: "uiux-design",
    title: "UI/UX & Design",
    shortDesc: "Crafting the visual soul and interactive narratives of Verve Nova.",
    duration: "3 Months",
    responsibilities: [
      "Design high-fidelity user interfaces for web and mobile platforms.",
      "Create cohesive design systems and visual brand languages.",
      "Conduct user research and translate insights into architectural flows.",
      "Develop interactive prototypes with advanced motion physics.",
      "Collaborate with engineers to ensure design integrity during deployment."
    ],
    benefits: [
      "Professional Design Certificate.",
      "Inclusion in the Verve Nova design collective.",
      "Mentorship from senior brand architects.",
      "Portfolio exposure via global client projects.",
      "Path to PPO based on creative excellence."
    ],
    requirements: [
      "Proficiency in Figma and Adobe Creative Suite.",
      "Strong understanding of typography and color theory.",
      "Knowledge of responsive design principles.",
      "A portfolio showcasing unique, bespoke design thinking."
    ],
    techStack: ["Figma", "Adobe Illustrator", "After Effects", "Spline", "Lottie"]
  },
  "app-development": {
    slug: "app-development",
    title: "App Development",
    shortDesc: "Architecting mobile experiences with high-impact native performance.",
    duration: "3 Months",
    responsibilities: [
      "Build cross-platform mobile apps using React Native or Flutter.",
      "Implement complex mobile navigation and state management.",
      "Integrate native device features and third-party APIs.",
      "Optimize app performance and launch procedures for App Stores.",
      "Test and debug across multiple mobile OS versions."
    ],
    benefits: [
      "App Development Master Certificate.",
      "Hands-on experience with production-grade mobile codebases.",
      "Mentorship from experienced mobile engineers.",
      "Opportunity for full-time conversion.",
      "Detailed project credits in your professional portfolio."
    ],
    requirements: [
      "Knowledge of JavaScript/TypeScript or Dart.",
      "Basic understanding of React Native or Flutter frameworks.",
      "Familiarity with mobile UI components and best practices.",
      "Problem-solving mindset for complex mobile environments."
    ],
    techStack: ["React Native", "Flutter", "Firebase", "App Store Connect", "Play Console"]
  },
  "ai-automation": {
    slug: "ai-automation",
    title: "AI & Automation",
    shortDesc: "Implementing intelligent systems and automated workflows for global scale.",
    duration: "3 Months",
    responsibilities: [
      "Develop and fine-tune AI-driven chatbots and assistants.",
      "Automate complex business processes using advanced logic tools.",
      "Research and implement emerging AI models and API integrations.",
      "Analyze data flows to optimize automation efficiency.",
      "Support the team in building 'intelligent' features for client ecosystems."
    ],
    benefits: [
      "AI Engineering Specialist Certificate.",
      "Experience with cutting-edge LLM and automation tools.",
      "Mentorship from AI/Automation leads.",
      "Path to a career in high-demand automated engineering.",
      "Exclusive project showcase on LinkedIn."
    ],
    requirements: [
      "Strong logical reasoning and algorithmic thinking.",
      "Basic understanding of AI concepts and API structures.",
      "Interest in Python or specialized automation tools (Make/Zapier).",
      "Ability to research and adapt to fast-moving AI technology."
    ],
    techStack: ["Python", "OpenAI API", "HuggingFace", "Zapier", "Flowise", "VectorDB"]
  },
  "digital-marketing": {
    slug: "digital-marketing",
    title: "Digital Marketing",
    shortDesc: "Strategizing global growth and brand positioning for Verve Nova.",
    duration: "3 Months",
    responsibilities: [
      "Execute high-impact SEO and SEM strategies for global reach.",
      "Manage and grow LinkedIn brand presence through professional content.",
      "Analyze market trends and competitor positioning.",
      "Support lead generation and client outreach campaigns.",
      "Measure and report on digital campaign performance metrics."
    ],
    benefits: [
      "Strategic Marketing Excellence Certificate.",
      "Real-world experience in high-ticket client acquisition.",
      "Mentorship from growth and brand strategists.",
      "Full-time PPO path for growth-focused achievers.",
      "Networking opportunities with global business leads."
    ],
    requirements: [
      "Strong written and verbal communication skills.",
      "Analytical mindset with an interest in data-driven growth.",
      "Familiarity with SEO tools and social media platforms.",
      "Creative thinking for brand narrative development."
    ],
    techStack: ["Google Analytics", "SEMRush", "LinkedIn Ads", "HubSpot", "Mailchimp"]
  },
  "content-copywriting": {
    slug: "content-copywriting",
    title: "Content & Copywriting",
    shortDesc: "Architecting the brand voice through high-converting narratives.",
    duration: "3 Months",
    responsibilities: [
      "Write high-converting copy for landing pages and case studies.",
      "Develop authoritative LinkedIn growth content for the agency.",
      "Craft compelling brand stories and technical service descriptions.",
      "Edit and refine internal and external communication for clarity.",
      "Collaborate with the design team for headline and layout copy."
    ],
    benefits: [
      "Professional Copywriting & Brand Voice Certificate.",
      "Portfolio of published high-impact case studies.",
      "Mentorship from senior brand storytellers.",
      "Opportunity for full-time brand role.",
      "Deep understanding of high-ticket conversion copy."
    ],
    requirements: [
      "Native or near-native command of English (Written).",
      "Ability to translate complex tech into simple, powerful narratives.",
      "Interest in psychology-based conversion copywriting.",
      "Sharp attention to detail and brand consistency."
    ],
    techStack: ["Notion", "Google Docs", "Grammarly", "ChatGPT (Advanced Prompting)", "Hemingway"]
  },
  "business-development": {
    slug: "business-development",
    title: "Business Development",
    shortDesc: "Strategizing global growth and architecting high-value enterprise partnerships.",
    duration: "3 Months",
    responsibilities: [
      "Identify and research potential enterprise clients and partnerships.",
      "Develop strategic outreach narratives and growth frameworks.",
      "Support the senior architects in client onboarding and strategy sessions.",
      "Analyze market data to identify new professional trajectories for the studio.",
      "Collaborate with the marketing team to align outreach with brand voice."
    ],
    benefits: [
      "Business Intelligence & Strategy Certificate.",
      "Direct exposure to high-ticket enterprise deal-making.",
      "Mentorship from growth and business architects.",
      "Clear path to PPO for high-performing strategists.",
      "Advanced networking within the global tech ecosystem."
    ],
    requirements: [
      "Exceptional communication and negotiation capability.",
      "Strategic mindset with a focus on long-term value.",
      "Ability to research and synthesize complex market data.",
      "Highest level of professional ethics and drive."
    ],
    techStack: ["HubSpot CRM", "LinkedIn Sales Nav", "Notion", "Apollo.io", "Crunchbase"]
  },
  "upwork-bidder": {
    slug: "upwork-bidder",
    title: "Upwork Bidder",
    shortDesc: "Mastering the art of client acquisition on the world's most elite platforms.",
    duration: "3 Months",
    responsibilities: [
      "Analyze and filter high-value job postings on Upwork and similar platforms.",
      "Draft bespoke, high-converting proposals that resonate with client needs.",
      "Manage client communications and initial lead qualification.",
      "Maintain a high success rate through strategic bidding and profile management.",
      "Work closely with technical leads to ensure project feasibility."
    ],
    benefits: [
      "Platform Acquisition Specialist Certificate.",
      "Mastery of high-ticket freelancing and agency sales.",
      "Incentive-based rewards for successful lead generation.",
      "Mentorship from the studio's top lead generators.",
      "Portfolio of successful client engagements."
    ],
    requirements: [
      "Excellent command of the English language (Bespoke writing).",
      "Quick response time and platform agility.",
      "Ability to understand technical requirements and explain them simply.",
      "Resilience and a performance-driven mindset."
    ],
    techStack: ["Upwork", "Toptal", "Loom", "ChatGPT (Strategy)", "Grammarly"]
  },
  "qa-testing": {
    slug: "qa-testing",
    title: "QA / Testing",
    shortDesc: "Ensuring a mirror-finish and bulletproof reliability for all studio output.",
    duration: "3 Months",
    responsibilities: [
      "Conduct manual and automated testing of all agency web/app projects.",
      "Identify, document, and track bugs through to resolution.",
      "Perform UX/UI audits to ensure design and functional consistency.",
      "Test responsiveness across all major devices and browser engines.",
      "Support the development team in achieving 'Zero-Defect' launches."
    ],
    benefits: [
      "QA Engineering & Auditing Certificate.",
      "Experience with production-grade bug tracking systems.",
      "Mentorship from senior testing architects.",
      "Entry into the path of professional QA engineering.",
      "Direct impact on the quality of global client systems."
    ],
    requirements: [
      "Extreme attention to detail (The 'Bug Hunter' mindset).",
      "Logical approach to troubleshooting and reproduction.",
      "Basic understanding of web technologies (HTML/CSS/JS).",
      "Persistence and commitment to quality."
    ],
    techStack: ["Cypress", "Postman", "Chrome DevTools", "Jira", "Lighthouse", "BrowserStack"]
  },
  "cybersecurity": {
    slug: "cybersecurity",
    title: "Cybersecurity",
    shortDesc: "Securing the perimeter and architecting risk strategies for global clients.",
    duration: "3 Months",
    responsibilities: [
      "Support in conducting security audits and risk assessments.",
      "Monitor systems for potential vulnerabilities and threats.",
      "Research the latest security protocols and deployment strategies.",
      "Perform penetration testing on studio-developed applications.",
      "Collaborate with architects to integrate 'Security by Design'."
    ],
    benefits: [
      "Cybersecurity Audit & Risk Specialist Certificate.",
      "Hands-on experience with secure enterprise environments.",
      "Mentorship from security and architecture leads.",
      "Path to professional cybersecurity certification support.",
      "High-value portfolio credits in security engineering."
    ],
    requirements: [
      "Fundamental knowledge of networking and web protocols.",
      "Interest in ethical hacking and defensive security.",
      "Strong analytical and research capabilities.",
      "Highest standards of ethics and integrity."
    ],
    techStack: ["Ethical Hacking Tools", "Nmap", "Wireshark", "Burp Suite", "OWASP", "CloudFlare"]
  }
};
