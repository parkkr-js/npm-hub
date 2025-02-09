// app/layout.tsx
import type { Metadata } from 'next';
import '@/styles/globals.css';
import ClientLayout from '@/components/layout/ClientLayout';
import ClientRoot from '@/components/ClientRoot';

export const metadata: Metadata = {
  title: 'NPM Hub - NPM Package Search & Analytics Platform',
  description: 'Discover, analyze, and compare NPM packages with real-time analytics, download trends, GitHub metrics, and dependency insights. Make data-driven decisions for your JavaScript and TypeScript projects with comprehensive package statistics and visualization tools.',
  keywords: [
    'npm',
    'package search',
    'javascript packages',
    'typescript packages',
    'npm analytics',
    'package trends', 
    'github metrics',
    'dependency analysis',
    'npm registry',
    'package statistics'
  ],
  creator: 'ParkJiSung WooByeongHee',
  publisher: 'Last Dance',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: 'https://your-domain.com',
  },
  openGraph: {
    title: 'NPM Hub - Your Smart Package Analytics Platform',
    description: 'Analyze NPM packages with download stats, Google Trends data, and GitHub metrics. Make informed package decisions with comprehensive analytics and visualizations.',
    url: 'https://your-domain.com',
    siteName: 'NPM Hub',
    images: [
      {
        url: 'https://your-domain.com/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'NPM Hub - Package Analytics Dashboard',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NPM Hub - Package Analytics Made Simple',
    description: 'Find the perfect NPM packages with comprehensive analytics, trends, and insights.',
    images: ['https://your-domain.com/twitter-image.png'],
    creator: '@npmhub',
  },
  verification: {
    google: 'your-google-verification-code',
  },
  category: 'Technology',
 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientRoot>
          <ClientLayout>{children}</ClientLayout>
        </ClientRoot>
      </body>
    </html>
  );
}
