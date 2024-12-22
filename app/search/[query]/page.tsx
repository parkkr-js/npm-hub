// app/search/[query]/page.tsx
import { Suspense } from 'react';
import { getSearchResultPackages } from '@/app/api/npm';
import { SearchResultsWrapper } from '@/components/search-results/SearchResultsWrapper';
import { FilterSidebar } from '@/components/search-results/FilterSidebar';
import { KeywordBox } from '@/components/search-results/KeywordBox';

interface SearchPageProps {
  params: {
    query: string;
  };
}

export default async function SearchPage({ params }: SearchPageProps) {
  console.time('SearchPage');
  const initialResults = await getSearchResultPackages(params.query);
  console.timeEnd('SearchPage');
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-12 gap-6">
        <aside className="col-span-2">
          <Suspense fallback={<div>Loading filters...</div>}>
            <FilterSidebar />
          </Suspense>
        </aside>

        <main className="col-span-7">
          <Suspense fallback={<div>Loading results...</div>}>
            <SearchResultsWrapper initialResults={initialResults} />
          </Suspense>
        </main>

        <aside className="col-span-3">
          <Suspense fallback={<div>Loading keywords...</div>}>
            <KeywordBox />
          </Suspense>
        </aside>
      </div>
    </div>
  );
}
