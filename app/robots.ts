import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://npmhub.vercel.app'

  return {
    // 크롤러 규칙
    rules: [
      {
        // 구글 크롤러에 대한 특별 규칙
        userAgent: 'Googlebot',
        allow: [
          '/',              // 메인 페이지
          '/search',        // 검색 페이지
          '/packages/*',    // 패키지 상세 페이지
          '/trending',      // 트렌딩 페이지
        ],
        disallow: [
          '/api/*',         // API 엔드포인트 제외
          '/_next/*',       // Next.js 내부 파일 제외
          '/static/*',      // 정적 파일 제외
        ],
      },
      {
        // 다른 모든 크롤러에 대한 규칙
        userAgent: '*',
        allow: [
          '/',
          '/search',
          '/packages/*',
        ],
        disallow: [
          '/api/*',
          '/_next/*',
          '/static/*',
        ],
      }
    ],
    // 사이트맵 위치
    sitemap: `${baseUrl}/sitemap.xml`,
    // 표준 호스트 선언
    host: baseUrl,
  }
}