import { atom } from 'recoil';
import { PackageInfo } from '@/types/package';

export const popularPackagesState = atom<PackageInfo[]>({
  key: 'popularPackagesState',
  default: [],
});
