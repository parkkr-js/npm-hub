'use client';

// components/search-results/FilterSidebar.tsx

import { useSetRecoilState } from 'recoil';
import { sortTypeAtom } from '@/store/atoms';
import { sortType } from '@/types/common';
import { useCallback } from 'react';

export function FilterSidebar() {
  const setSortType = useSetRecoilState(sortTypeAtom);

  const handleSort = useCallback(
    (type: sortType) => {
      setSortType(type);
    },
    [setSortType]
  );

  return (
    <div className="fixed w-48 space-y-2">
      {(['default', 'popularity', 'downloads', 'recent'] as sortType[]).map((type) => (
        <button
          key={type}
          onClick={() => handleSort(type)}
          className="w-full px-4 py-2 text-left text-sm bg-surface-90 rounded-lg text-surface-white"
        >
          {type}
        </button>
      ))}
    </div>
  );
}
