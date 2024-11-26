'use client';

import { useSetRecoilState, useRecoilValue } from 'recoil';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { searchQueryState } from '@/store/atoms/search';
import { useRef, Suspense } from 'react';
import AutoCompletePackage from './AutoCompletePackage';

export default function SearchBarWithAutoComplete() {
  const setSearchQuery = useSetRecoilState(searchQueryState);
  const searchQuery = useRecoilValue(searchQueryState);
  const debounceTimer = useRef<NodeJS.Timeout>();

  const handleSearch = (value: string) => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      setSearchQuery(value);
    }, 300);
  };

  return (
    <div className="relative">
      <Input
        type="text"
        placeholder="Search packages..."
        className="w-full pl-10 py-6 bg-[#1a1a1a] text-surface-white border-surface-medium focus:border-primary-60 focus-visible:ring-0 focus-visible:ring-offset-0"
        onChange={(e) => handleSearch(e.target.value)}
        spellCheck={false}
      />
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-medium h-5 w-5" />
    </div>
  );
}
