// app/page.tsx
import { Suspense } from 'react';
import SearchBar from '@/components/client/SearchBar';
import PopularPackages from '@/components/server/PopularPackages';
import Background from '@/components/client/Background';
import { PackageCardSkeleton } from '@/components/skeletons/PackageCardSkeleton';

export default function HomePage() {
  return (
    <main className="min-h-screen relative">
      <Background />
      <div className="container mx-auto px-4 py-8 relative z-10">
        <h1 className="text-5xl font-bold text-center text-primary-60 mb-12">MAIN LOGO</h1>
        <SearchBar />
        <section className="mt-16">
          <h2 className="text-3xl font-semibold text-surface-white mb-2">Most popular packages</h2>
          <p className="text-surface-medium mb-8">
            Some of the most downloaded packages over the past 60 days
          </p>
          <Suspense fallback={<PackageCardSkeleton count={4} />}>
            <PopularPackages />
          </Suspense>
        </section>
      </div>
    </main>
  );
}
