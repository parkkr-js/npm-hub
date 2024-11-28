'use client';

import { useEffect, useMemo } from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { searchResultsAtom } from '@/store/atoms';
import { sortedAndBadgedResultsSelector } from '@/store/selectors';
import { SearchResultList } from './SearchResultList';
import type { SearchResultPackageInfo } from '@/types/package';

interface SearchResultsWrapperProps {
  initialResults: SearchResultPackageInfo[];
}

export function SearchResultsWrapper({ initialResults }: SearchResultsWrapperProps) {
  const setSearchResults = useSetRecoilState(searchResultsAtom);
  const sortedResults = useRecoilValue(sortedAndBadgedResultsSelector);

  useEffect(() => {
    setSearchResults(initialResults);
  }, [initialResults, setSearchResults]);

  const memoizedResults = useMemo(() => sortedResults, [sortedResults]);

  return <SearchResultList results={memoizedResults} />;
}
