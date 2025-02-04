//const sortedResults = useRecoilValue(sortedAndBadgedResultsSelector); =>eywordFilteredResultsSelector 안에서 사용 중이므로
// useMemo는 의존성 배열에 값이 변하면 그 변한 값 반환 아니면 기존 값 반환인데

'use client';

import { useEffect, useMemo } from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { searchResultsAtom } from '@/store/atoms';
import { keywordFilteredResultsSelector } from '@/store/selectors';
import { SearchResultList } from './SearchResultList';
import type { SearchResultPackageInfo } from '@/types/package';

interface SearchResultsWrapperProps {
  initialResults: SearchResultPackageInfo[];
}

export function SearchResultsWrapper({ initialResults }: SearchResultsWrapperProps) {
  const setSearchResults = useSetRecoilState(searchResultsAtom);

  const keywordFilteredResults = useRecoilValue(keywordFilteredResultsSelector);
  useEffect(() => {
    setSearchResults(initialResults);
  }, [initialResults, setSearchResults]);

  // const memoizedResults = useMemo(() => sortedResults, [sortedResults]);
  const memoizedResults = useMemo(() => keywordFilteredResults, [keywordFilteredResults]);

  return <SearchResultList results={memoizedResults} />;
}
