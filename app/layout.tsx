import type { Metadata } from 'next';
import ClientRoot from '@/components/ClientRoot';
import '@/styles/globals.css';
import Background from '@/components/layout/Background';

export const metadata: Metadata = {
  title: 'NPM Hub',
  description: 'Search and discover NPM packages',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientRoot>
          <Background>{children}</Background>
        </ClientRoot>
      </body>
    </html>
  );
}
