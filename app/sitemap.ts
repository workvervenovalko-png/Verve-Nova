import { MetadataRoute } from 'next';
import { staticBlogs } from '@/lib/blogs-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://vervenovatech.com';

  const staticRoutes = [
    '',
    '/about',
    '/services',
    '/projects',
    '/careers',
    '/blog',
    '/pricing',
    '/contact',
    '/registry',
    '/testimonials',
    '/privacy',
    '/terms',
    '/cookies',
    '/nda',
  ];

  const standardPages = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: (route === '' ? 'daily' : 'monthly') as 'daily' | 'monthly',
    priority: route === '' ? 1.0 : 0.8,
  }));

  const blogPages = staticBlogs.map((blog) => ({
    url: `${baseUrl}/blog/${blog.slug}`,
    lastModified: new Date(blog.updatedAt || blog.createdAt),
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  return [...standardPages, ...blogPages];
}
