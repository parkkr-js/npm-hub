// app/page.tsx
import { Suspense } from 'react';
import SearchBox from '@/components/search/SearchBox';
import PopularPackageCarousel from '@/components/popular-packages';
import { PackageCardSkeleton } from '@/components/skeletons/PopularPackageCardSkeleton';
import { SuggestionSkeleton } from '@/components/skeletons/SuggestionSkeleton';
import SuggestionList from '@/components/search/suggestions/SuggestionList';

export default function HomePage() {
  return (
    <main className="min-h-screen relative">
      <div className="container mx-auto py-8 relative z-10">
        <h1 className="text-5xl font-bold text-center text-primary-60 mb-12">NPM HUB</h1>
        <div className="relative">
          <SearchBox />
          <Suspense fallback={<SuggestionSkeleton />}>
            <div className="absolute w-full">
              <SuggestionList />
            </div>
          </Suspense>
        </div>

        <section className="mt-16">
          <h2 className="text-3xl font-semibold text-surface-white mb-2">Most popular packages</h2>
          <p className="text-surface-medium mb-8">
            Some of the most downloaded packages over the past 60 days
          </p>
          <Suspense fallback={<PackageCardSkeleton count={4} />}>
            <PopularPackageCarousel />
          </Suspense>
        </section>
      </div>
    </main>
  );
}
