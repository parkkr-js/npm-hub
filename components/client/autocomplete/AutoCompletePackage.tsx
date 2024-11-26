// AutoCompletePackage.tsx
'use client';
import { useState, useEffect } from 'react';
import { getAutocompletePackages } from '@/lib/api/npm';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { autoCompleteState, searchQueryState } from '@/store/atoms/search';

export default function AutoCompletePackage() {
  const setSearchResults = useSetRecoilState(autoCompleteState);
  const searchQuery = useRecoilValue(searchQueryState);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPackages = async () => {
      if (!searchQuery.trim()) {
        setSearchResults([]);
        return;
      }

      setIsLoading(true);

      try {
        const result = await getAutocompletePackages(searchQuery);

        setSearchResults(result);
      } catch (err) {
      } finally {
        setIsLoading(false);
      }
    };

    fetchPackages();
  }, [searchQuery, setSearchResults]);

  return null;
}
