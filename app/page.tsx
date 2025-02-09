// app/page.tsx
import { Suspense } from 'react';

import PopularPackageCarousel from '@/components/popular-packages';
import { PackageCardSkeleton } from '@/components/skeletons/PopularPackageCardSkeleton';

export default function HomePage() {
  return (
    <main className="container mx-auto py-8 relative">
      <article className="mt-40">
        <header>
          <h1 className="text-3xl font-semibold font-tommy text-surface-white mb-2">
            Most popular packages
          </h1>
          <p className="text-xl text-secondary-60 font-semibold mb-8">
            Some of the most downloaded packages over the past 60 days
          </p>
        </header>
        <section aria-label="Popular packages carousel">
          <Suspense fallback={<PackageCardSkeleton count={4} />}>
            <PopularPackageCarousel />
          </Suspense>
        </section>
      </article>
    </main>
  );
}
