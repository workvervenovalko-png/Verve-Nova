import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/private/',
          '/admin/',
          '/maintenance',
          '/profile/',
          '/ca-dashboard/',
          '/assessment/',
          '/review/',
          '/careers/auth/',
          '/careers/audit/',
          '/api/',
        ],
      },
    ],
    sitemap: 'https://vervenovatech.com/sitemap.xml',
    host: 'https://vervenovatech.com',
  }
}
