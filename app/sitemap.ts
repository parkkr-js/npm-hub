import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://npmhub.com'

  // 기본 정적 페이지들
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: 'hourly' as const,
      priority: 0.8
    },
    {
      url: `${baseUrl}/trending`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9
    }
  ]

  // 실제 서비스에서는 여기에 동적으로 생성되는 페이지들도 포함
  // 예: 인기 패키지 목록이나 최근 본 패키지 페이지 등

  return [...staticPages]
}