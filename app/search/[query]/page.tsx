'use client';

import { useState, useEffect } from 'react';
import SearchBar from '@/components/SearchBar';
import { searchPackages, PackageData } from '@/lib/api';
import { useRouter } from 'next/navigation';
import SearchBarSmall from '@/components/SearchBarSmall';

interface SearchPageProps {
  params: { query: string };
}

function SearchPage({ params }: SearchPageProps) {
  // params = { query: 'test' }  디자인 개발시에는 이렇게 설정하고 사용
  const { query } = params;
  const router = useRouter();
  const decodedQuery = decodeURIComponent(query);

  const [packages, setPackages] = useState<PackageData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = (newQuery: string) => {
    router.push(`/search/${encodeURIComponent(newQuery)}`);
  };

  const fetchSearchResults = async (searchQuery: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await searchPackages(searchQuery);
      setPackages(result.objects.map((obj) => obj.package));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An unknown error occurred.',
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (decodedQuery) {
      fetchSearchResults(decodedQuery);
    }
  }, [decodedQuery]);

  const handlePackageClick = (packageName: string) => {
    router.push(`/package/${encodeURIComponent(packageName)}`); // 경로 변경
  };

  return (
    <div className="flex flex-col items-center mt-[33px] p-4">
      <SearchBarSmall onSearch={handleSearch} initialQuery={decodedQuery} />
      {loading && <p className="mt-4 text-blue-600">Loading...</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}
      <div className="flex flex-col items-center mt-[59px] w-full ">
        {packages.map((pkg) => (
          <div
            key={pkg.name}
            role="button"
            tabIndex={0}
            className="
            mb-[16px]
            w-[794px]
            flex
            pt-[12px]
            pb-[20px]
            pl-[20.9px]
            pr-[20px]
            bg-secondary-90
            rounded-[23.03px]
            shadow cursor-pointer"
            onClick={() => handlePackageClick(pkg.name)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handlePackageClick(pkg.name);
            }}
          >
            <h3 className="text-xl font-semibold">
              {pkg.name} - {pkg.version}
            </h3>
            <p className="text-gray-700">{pkg.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchPage;
