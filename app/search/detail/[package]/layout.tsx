// app/search/detail/[package]/layout.tsx
import { Metadata } from 'next';

interface LayoutProps {
  children: React.ReactNode;
  params: { package: string };
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const title = `${params.package} - NPM Package Trends`;
  const description = `Analyze trends and popularity data for the ${params.package} npm package including Google Trends data, related topics, and queries.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
    },
    twitter: {
      title,
      description,
      card: 'summary_large_image',
    },
  };
}

export default function Layout({ children }: LayoutProps) {
  return <main className="min-h-screen">{children}</main>;
}
