'use client';
import { useState, useEffect } from 'react';
import { searchPackages } from '@/lib/api/npm';
import Autocomplete from '../server/Autocomplete';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { searchQueryState } from '@/store/atoms/search';
import { AutocompletePackageInfo } from '@/types/package';

export default function AutoCompletePackage() {
  const [packages, setPackages] = useState<AutocompletePackageInfo[]>([]);
  const searchQuery = useRecoilValue(searchQueryState);

  useEffect(() => {
    const fetchPackages = async () => {
      if (!searchQuery.trim()) {
        setPackages([]);
        return;
      }

      try {
        const result = await searchPackages(searchQuery);
        setPackages(result);
      } catch (err) {
        console.error('Error fetching packages:', err);
      }
    };

    fetchPackages();
  }, [searchQuery]);

  return <Autocomplete packages={packages} />;
}
