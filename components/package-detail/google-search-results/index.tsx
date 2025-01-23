'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { SearchResult, SearchResultsProps } from '@/types/google-search';
import { ExternalLink, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';

export function GoogleSearchResults({ packageName }: SearchResultsProps) {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        top: 150,
        behavior: 'smooth',
      });
    }
  };

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
        console.log('it works2');
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
    <div className="bg-secondary-90 w-80 h-[560px] flex flex-col rounded-[20px]">
      <div>
        <p className="ml-8 mt-6 text-xl font-semibold text-[#F5F6F8]">Related search</p>
        <p className="ml-8 text-xs font-normal text-secondary-40">
          Preview Google search results for a package.
        </p>
      </div>

      <div ref={scrollContainerRef} className="flex flex-col overflow-y-auto px-6 py-3 space-y-3">
        {results.map((result, index) => (
          <div
            key={index}
            className="rounded-[10px] border border-[var(--secondary-black60,#7B7C81)] hover:shadow-lg transition-shadow duration-200"
          >
            <a href={result.link} target="_blank" rel="noopener noreferrer" className="block">
              <div className="flex flex-col py-[5px] px-[6px]">
                <p className="text-xs font-semibold text-[var(--surface-white,#FFF)] hover:underline mb-1">
                  {result.title}
                </p>
                <p className="text-sm text-secondary-40 line-clamp-2">{result.snippet}</p>
                <div className="flex">
                  {result.thumbnail ? (
                    <div className="w-3 h-4 relative flex-shrink-0 rounded overflow-hidden">
                      <Image
                        src={`/api/image-proxy?url=${encodeURIComponent(result.thumbnail.src)}`}
                        alt={result.title}
                        width={result.thumbnail.width}
                        height={result.thumbnail.height}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ) : (
                    <div className="w-3 h-4 bg-gray-100 flex items-center justify-center flex-shrink-0 rounded">
                      <ImageIcon size={32} />
                    </div>
                  )}
                  <p className="text-sm text-secondary-40 mb-2">{result.displayLink}</p>
                  <ExternalLink className="text-gray-400 flex-shrink-0 ml-2" size={18} />
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>

      <button
        onClick={handleNext}
        className="mx-auto p-2 mb-4 transition-transform duration-300 hover:opacity-80"
      >
        <Image
          src="/images/화살표아래.svg"
          alt="Show next"
          width={24}
          height={24}
          className="transition-transform duration-300"
        />
      </button>
    </div>
  );
}
