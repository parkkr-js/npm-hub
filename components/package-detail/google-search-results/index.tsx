// app/components/package-detail/google-search-results/index.tsx
'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { SearchResult, SearchResultsProps } from '@/types/google-search';
import { ExternalLink, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';

export function GoogleSearchResults({ packageName }: SearchResultsProps) {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(
          `/api/google-search?q=${encodeURIComponent(`npm ${packageName}`)}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch search results');
        }

        const data = await response.json();
        setResults(data.items || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load results');
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [packageName]);

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="p-4 animate-pulse">
            <div className="flex items-start gap-4">
              <div className="w-24 h-24 bg-gray-200 rounded flex-shrink-0" />
              <div className="flex-grow">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return <Card className="p-4 text-red-500">{error}</Card>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Related Resources</h2>
      {results.map((result, index) => (
        <Card key={index} className="p-4 hover:shadow-lg transition-shadow duration-200">
          <a href={result.link} target="_blank" rel="noopener noreferrer" className="block">
            <div className="flex items-start gap-4">
              {result.thumbnail ? (
                <div className="w-24 h-24 relative flex-shrink-0 rounded overflow-hidden">
                  <Image
                    src={`/api/image-proxy?url=${encodeURIComponent(result.thumbnail.src)}`}
                    alt={result.title}
                    width={result.thumbnail.width}
                    height={result.thumbnail.height}
                    className="object-cover w-full h-full"
                  />
                </div>
              ) : (
                <div className="w-24 h-24 bg-gray-100 flex items-center justify-center flex-shrink-0 rounded">
                  <ImageIcon className="text-gray-400" size={32} />
                </div>
              )}
              <div className="flex-grow">
                <h3 className="text-lg font-medium text-blue-600 hover:underline mb-1">
                  {result.title}
                </h3>
                <p className="text-sm text-green-700 mb-2">{result.displayLink}</p>
                <p className="text-sm text-gray-600 line-clamp-2">{result.snippet}</p>
              </div>
              <ExternalLink className="text-gray-400 flex-shrink-0 ml-2" size={18} />
            </div>
          </a>
        </Card>
      ))}
    </div>
  );
}
