// app/detail/[package]/layout.tsx
import { Metadata } from 'next';

interface LayoutProps {
  children: React.ReactNode;
  params: { package: string };
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const packageName = params.package;
  const title = `${packageName} - NPM Package Trends`;
  const description = `Analyzeㅋㅋㅋㅋㅋㅋ trends and popularity data for the ${packageName} npm package including Google Trends data, related topics, and queries.`;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://npmhub.vercel.app';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      images: [
        {
          url: `${baseUrl}/detail/${packageName}/opengraph-image`,
          width: 1200,
          height: 630,
        }
      ]
    },
    twitter: {
      title,
      description,
      card: 'summary_large_image',
      images: [`${baseUrl}/detail/${packageName}/opengraph-image`]
    },
  };
}

export default function Layout({ children }: LayoutProps) {
  return <main className="min-h-screen">{children}</main>;
}