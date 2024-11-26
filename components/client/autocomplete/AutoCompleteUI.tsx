// AutoCompleteUI.tsx
'use client';
import { autocompletePackageInfoWithBadgesInfo } from '@/types/package';
import { useRecoilValue } from 'recoil';
import { autoCompleteState } from '@/store/atoms/search';
import { filteredAutoComplementPackagesSelector } from '@/store/selectors/search';
import Autocomplete from '@/components/server/AutoComplete';

export default function AutoCompleteUI() {
  const packages = useRecoilValue<autocompletePackageInfoWithBadgesInfo[]>(
    filteredAutoComplementPackagesSelector
  );

  return <Autocomplete packages={packages} />;
}
