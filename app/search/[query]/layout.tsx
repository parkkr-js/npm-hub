import { Metadata } from 'next';

interface SearchLayoutProps {
  children: React.ReactNode;
  params: {
    query: string;
  };
}

export async function generateMetadata({ params }: SearchLayoutProps): Promise<Metadata> {
  const decodedQuery = decodeURIComponent(params.query);

  return {
    title: `Search results for "${decodedQuery}" | Package Search`,
    keywords: 'npm, package, search, find, browse, react, vue, angular, javascript, typescript',
    description: `Browse packages matching "${decodedQuery}". Find the best npm packages for your project.`,
    openGraph: {
      title: `Search results for "${decodedQuery}"`,
      description: `Browse packages matching "${decodedQuery}". Find the best npm packages for your project.`,
    },
  };
}

export default function SearchLayout({ children }: SearchLayoutProps) {
  return <main className="container mx-auto px-4">{children}</main>;
}
