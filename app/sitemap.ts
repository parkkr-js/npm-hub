import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://npmhub.vercel.app'

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0
    },
    {
      url: `${baseUrl}/search/[query]`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.8
    },
    {
      url: `${baseUrl}/detail/[package]`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7
    },
  ]

  return staticPages
}