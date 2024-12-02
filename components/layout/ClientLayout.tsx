'use client';

import { usePathname } from 'next/navigation';
import { getPageConfig } from '@/config/layoutConfig';
import ClientHeader from './ClientHeader';
import Image from 'next/image';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const config = getPageConfig(pathname);

  return (
    <div className="min-h-screen relative">
      <div className="fixed inset-0 bg-secondary-100">
        <Image
          src={config.backgroundImage}
          alt="background pattern"
          fill
          className="object-contain pointer-events-none"
          style={{ objectPosition: config.backgroundPosition }}
          priority
        />
        {'backgroundImage2' in config && (
          <Image
            src={config.backgroundImage2}
            alt="background pattern 2"
            fill
            className="object-contain pointer-events-none"
            style={{ objectPosition: config.backgroundPosition2 }}
            priority
          />
        )}
      </div>
      <div className="relative z-10">
        <ClientHeader config={config} />
        {children}
      </div>
    </div>
  );
}
