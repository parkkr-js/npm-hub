// store/atoms.ts

import { atom } from 'recoil';
import { SuggestionPackageInfo, SearchResultPackageInfo } from '@/types/package';
import { PopularPackageInfo } from '@/types/package';
import { sortType } from '@/types/common';

export const popularPackagesAtom = atom<PopularPackageInfo[]>({
  key: 'popularPackagesAtom',
  default: [],
});

export const searchQueryAtom = atom<string>({
  key: 'searchQueryAtom',
  default: '',
});

export const suggestionsAtom = atom<SuggestionPackageInfo[]>({
  key: 'suggestionsAtom',
  default: [],
});

export const searchResultsAtom = atom<SearchResultPackageInfo[]>({
  key: 'searchResultsAtom',
  default: [],
});

export const sortTypeAtom = atom<sortType>({
  key: 'sortTypeAtom',
  default: 'default',
});
