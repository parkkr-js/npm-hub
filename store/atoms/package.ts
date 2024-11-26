import { atom } from 'recoil';
import { packageInfo } from '@/types/package';
import { autocompletePackageInfo } from '@/types/package';

export const popularPackagesState = atom<packageInfo[]>({
  key: 'popularPackagesState',
  default: [],
});

export const autocompletePackagesState = atom<autocompletePackageInfo[]>({
  key: 'autocompletePackagesState',
  default: [],
});
