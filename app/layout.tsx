// app/layout.tsx
import type { Metadata } from 'next';
import '@/styles/globals.css';
import ClientLayout from '@/components/layout/ClientLayout';
import ClientRoot from '@/components/ClientRoot';

export const metadata: Metadata = {
  title: 'NPM Hub',
  description: 'Search and discover NPM packages',
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
