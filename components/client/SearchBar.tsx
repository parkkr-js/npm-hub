'use client';

import { useSetRecoilState } from 'recoil';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { searchQueryState } from '@/store/atoms/search';

export default function SearchBar() {
  const setSearchQuery = useSetRecoilState(searchQueryState);

  return (
    <div className="relative max-w-2xl mx-auto">
      <Input
        type="text"
        placeholder="Search packages..."
        className="w-full pl-10 py-6 bg-surface-search/10 text-surface-white border-surface-medium focus:border-primary-60"
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-medium" />
    </div>
  );
}
