// app/page.tsx
import { Suspense } from 'react';

import PopularPackageCarousel from '@/components/popular-packages';
import { PackageCardSkeleton } from '@/components/skeletons/PopularPackageCardSkeleton';

export default function HomePage() {
  return (
    <div className="container mx-auto py-8 relative z-10">
      <section className="mt-40">
        <h2 className="text-3xl font-semibold text-surface-white mb-2">Most popular packages</h2>
        <p className="text-surface-medium mb-8">
          Some of the most downloaded packages over the past 60 days
        </p>
        <Suspense fallback={<PackageCardSkeleton count={4} />}>
          <PopularPackageCarousel />
        </Suspense>
      </section>
    </div>
  );
}
