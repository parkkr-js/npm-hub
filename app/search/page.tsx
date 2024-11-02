// app/search/page.tsx
"use client";

import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import { searchPackages, PackageData } from "@/lib/api";

const SearchPage: React.FC = () => {
  const [packages, setPackages] = useState<PackageData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await searchPackages(query);
      setPackages(result.objects.map((obj) => obj.package));
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <SearchBar onSearch={handleSearch} />
      {loading && <p className="mt-4 text-blue-600">Loading...</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}
      <ul className="mt-6 space-y-4 w-full max-w-lg">
        {packages.map((pkg) => (
          <li key={pkg.name} className="p-4 bg-gray-100 rounded-md shadow">
            <h3 className="text-xl font-semibold">
              {pkg.name} - {pkg.version}
            </h3>
            <p className="text-gray-700">{pkg.description}</p>
            <a
              href={pkg.links.npm}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              View on npm
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchPage;
