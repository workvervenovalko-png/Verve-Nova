import { MetadataRoute } from 'next';
import { staticBlogs } from '@/lib/blogs-data';
import { servicesData } from '@/lib/services-data';
import { industriesData } from '@/lib/industries-data';
import { internshipRoles } from '@/lib/internship-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://vervenovatech.com';
  const now = new Date();

  // 1. Core Pillar & Solution Landing Pages
  const coreRoutes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
    { path: '', priority: 1.0, changeFrequency: 'daily' },
    { path: '/services', priority: 0.95, changeFrequency: 'weekly' },
    { path: '/software-engineering', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/cloud-infrastructure', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/ai-automation', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/cybersecurity', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/enterprise-solutions', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/digital-experience', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/projects', priority: 0.85, changeFrequency: 'weekly' },
    { path: '/case-studies', priority: 0.85, changeFrequency: 'weekly' },
    { path: '/pricing', priority: 0.85, changeFrequency: 'weekly' },
    { path: '/testimonials', priority: 0.85, changeFrequency: 'weekly' },
    { path: '/about', priority: 0.85, changeFrequency: 'monthly' },
    { path: '/contact', priority: 0.85, changeFrequency: 'monthly' },
    { path: '/registry', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/verify', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/careers', priority: 0.85, changeFrequency: 'weekly' },
    { path: '/careers/apply/campus-ambassador', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/blog', priority: 0.9, changeFrequency: 'daily' },
    { path: '/privacy', priority: 0.5, changeFrequency: 'monthly' },
    { path: '/terms', priority: 0.5, changeFrequency: 'monthly' },
    { path: '/cookies', priority: 0.5, changeFrequency: 'monthly' },
    { path: '/nda', priority: 0.5, changeFrequency: 'monthly' },
  ];

  const coreEntries: MetadataRoute.Sitemap = coreRoutes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // 2. Dynamic Service Pages (25 specialised technical services)
  const serviceEntries: MetadataRoute.Sitemap = Object.keys(servicesData).map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // 3. Dynamic Industry Solutions Pages (6 key verticals)
  const industryEntries: MetadataRoute.Sitemap = Object.keys(industriesData).map((slug) => ({
    url: `${baseUrl}/industries/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // 4. Proprietary Product Suite Pages
  const productSlugs = ['verve-ledger', 'verve-crm', 'verve-erp'];
  const productEntries: MetadataRoute.Sitemap = productSlugs.map((slug) => ({
    url: `${baseUrl}/products/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // 5. Career & Internship Tracks
  const internshipSlugs = Object.keys(internshipRoles);
  const internshipDetailEntries: MetadataRoute.Sitemap = internshipSlugs.map((slug) => ({
    url: `${baseUrl}/careers/internships/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const internshipApplyEntries: MetadataRoute.Sitemap = internshipSlugs.map((slug) => ({
    url: `${baseUrl}/careers/apply/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.75,
  }));

  // 6. Technical Engineering Dispatches & Blog Posts
  const blogEntries: MetadataRoute.Sitemap = staticBlogs.map((blog) => ({
    url: `${baseUrl}/blog/${blog.slug}`,
    lastModified: new Date(blog.updatedAt || blog.createdAt || now),
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  return [
    ...coreEntries,
    ...serviceEntries,
    ...industryEntries,
    ...productEntries,
    ...internshipDetailEntries,
    ...internshipApplyEntries,
    ...blogEntries,
  ];
}
