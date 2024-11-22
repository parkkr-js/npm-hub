import { atom } from 'recoil';
import { PackageInfo } from '@/types/package';
import { AutocompletePackageInfo } from '@/types/package';

export const popularPackagesState = atom<PackageInfo[]>({
  key: 'popularPackagesState',
  default: [],
});

export const autocompletePackagesState = atom<AutocompletePackageInfo[]>({
  key: 'autocompletePackagesState',
  default: [],
});
