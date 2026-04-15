import dbConnect from "../lib/mongodb";
import Blog from "../models/Blog";

const dummyBlogs = [
  {
    title: "The Future of AI-Driven Enterprise Systems",
    excerpt: "Exploring how autonomous agents are redefining software architecture in 2026 and beyond.",
    content: `Artificial Intelligence has moved beyond simple chat interfaces. Today, enterprises are looking for 'Agentic AI' systems—software that can think, plan, and execute complex workflows without constant human supervision. 

At Verve Nova, we are engineering the infrastructure that powers these agents, ensuring security, scalability, and extreme performance. The shift from static software to dynamic, learning systems is the next frontier of digital evolution.

As we look toward the future, the integration of Large Action Models (LAMs) will allow software to not just predict patterns, but to execute physical and digital operations across heterogeneous environments. This requires a fundamental rethink of legacy API architectures. Our team is currently benchmarking high-throughput node clusters designed specifically for this new era of computation.`,
    coverImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000",
    author: "Verve Nova Intelligence",
  },
  {
    title: "Scaling Secure Infrastructure Globally",
    excerpt: "Why modern software requires more than just code—it requires a security-first infrastructure.",
    content: `Security is no longer a feature; it's the foundation. As businesses expand globally, the complexity of managing secure data transmissions across borders increases exponentially. 

Our approach at Verve Nova involves 'Zero Trust' architecture combined with edge computing. By moving security to the network's periphery, we reduce latency while maintaining bank-level encryption for every packet of data transferred.

Modern infrastructure must be resilient to both traditional penetration attempts and emerging quantum-level threats. We are exploring lattice-based cryptography to future-proof our clients' data against the next decade of cryptographic advancements. Our global node distribution ensures that even in the event of regional outages, your critical systems remain operational with sub-50ms failover times.`,
    coverImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000",
    author: "Infrastructure Ops",
  },
  {
    title: "Modern Minimalist UI/UX for SaaS",
    excerpt: "How reducing visual noise leads to higher conversion rates and better user retention.",
    content: `The era of cluttered dashboards is over. Users today crave simplicity and directness. A 'Minimalist UI' is not just about having fewer elements; it's about the right elements being exactly where they need to be. 

We focus on editorial typography, matte-black aesthetics, and cinematic transitions to create software that doesn't just work—it feels prestigious to use. This elevates the brand and keeps users engaged longer.

Psychological studies show that 'Cognitive Load' is the primary reason for user churn in complex B2B applications. By implementing a 'Progressive Disclosure' strategy, we hide non-essential features until they are contextually relevant. This results in a cleaner workspace where users can focus on their core tasks without distraction. At Verve Nova, design is a mathematical problem of balance and negative space.`,
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000",
    author: "Design Team",
  }
];

async function seed() {
  try {
    await dbConnect();
    // Generate slugs for dummy blogs
    const blogsWithSlugs = dummyBlogs.map(blog => ({
      ...blog,
      slug: blog.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      createdAt: new Date()
    }));

    await Blog.deleteMany({}); // Optional: clear existing if you want exactly 3
    await Blog.insertMany(blogsWithSlugs);
    console.log("Database seeded successfully with 3 intelligence reports.");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

seed();
