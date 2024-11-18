'use client';

import { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import ShowPopular from '@/components/ShowPopular';
import { useRouter } from 'next/navigation';

function MainPage() {
  const router = useRouter();

  const handleSearch = (query: string) => {
    if (query.trim()) {
      router.push(`/search/${encodeURIComponent(query)}`); // URL 구조 변경
    }
  };

  return (
    <div className="flex flex-col items-center mt-36 min-h-screen p-4">
      <SearchBar onSearch={handleSearch} />
      <ShowPopular className="mt-[91px]" />
    </div>
  );
}

export default MainPage;
