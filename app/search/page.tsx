'use client';

import { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import { searchPackages, PackageData } from '@/lib/api';
import { useRouter } from 'next/navigation';

function SearchPage() {
  const router = useRouter();
  const [packages, setPackages] = useState<PackageData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await searchPackages(query);
      console.log('****Search result: ', result);
      setPackages(result.objects.map((obj) => obj.package));
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : 'An unknown error occurred.',
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePackageClick = (packageName: string) => {
    const encodedPackageName = encodeURIComponent(packageName); // URL 인코딩
    router.push(`/search/${encodedPackageName}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <SearchBar onSearch={handleSearch} />
      {loading && <p className="mt-4 text-blue-600">Loading...</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}
      <ul className="mt-6 space-y-4 w-full max-w-lg">
        {packages.map((pkg) => (
          <li
            key={pkg.name}
            role="button"
            tabIndex={0}
            className="p-4 bg-gray-100 rounded-md shadow cursor-pointer"
            onClick={() => handlePackageClick(pkg.name)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handlePackageClick(pkg.name);
            }}
          >
            <h3 className="text-xl font-semibold">
              {pkg.name}
              {' '}
              -
              {pkg.version}
            </h3>
            <p className="text-gray-700">{pkg.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchPage;
