import { Suspense } from 'react';
import Background from '@/components/client/Background';
import { PackageLoadingSkeleton } from '@/components/skeletons/PackageSearchSkeleton';
import ResultCard from '@/components/server/SearchResultCard';
import SearchResultPackage from '@/components/client/searchpage/SearchResultPackage';
import SearchResultUI from '@/components/client/searchpage/SearchResultUI';
import AutoCompletePackage from '@/components/client/autocomplete/AutoCompletePackage';
import SearchBar from '@/components/client/SearchBar';
import AutoCompleteUI from '@/components/client/autocomplete/AutoCompleteUI';

export default function Page({ params: { query } }: { params: { query: string } }) {
  const decodedQuery = decodeURIComponent(query);
  return (
    <main className="min-h-screen relative">
      <Background />
      <div className="container mx-auto  py-8 relative z-10">
        <SearchBar />
        <AutoCompletePackage />
        <Suspense fallback={<div className="text-cyan-50">Loading...</div>}>
          <AutoCompleteUI />
        </Suspense>
        <SearchResultPackage query={decodedQuery} />
        <Suspense fallback={<PackageLoadingSkeleton />}>
          <SearchResultUI />
        </Suspense>
      </div>
    </main>
  );
}
