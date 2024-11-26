'use client';
import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { searchFixedQueryState, searchResultsState } from '@/store/atoms/search';
import { getSearchResultPackages } from '@/lib/api/npm';

export default function SearchResultPackage({ query }: { query: string }) {
  const setSearchResults = useSetRecoilState(searchResultsState);
  const setSearchQuery = useSetRecoilState(searchFixedQueryState);
  useEffect(() => {
    const fetchResults = async () => {
      try {
        const results = await getSearchResultPackages(query);
        setSearchResults(results);
        setSearchQuery(query);
      } catch (err) {
        console.error('Error fetching search results:', err);
      }
    };

    fetchResults();
  }, [query, setSearchResults, setSearchQuery]);

  return null;
}
