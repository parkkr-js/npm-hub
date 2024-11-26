// store/atoms/search.ts
/*
현재 searchQueryState 하나로 자동완성이랑 검색 결과에 대한 필터를 사용하고 있는데
이 문제는
1. 검색 결과 페이지로 가서 searchBar 입력 시에 자동완성이 나올 때 정확하지 않게 밑에 검색 결과도 자동으로 업데이트 가 된다.

그렇기에 searchQueryState,  searchFixedQueryState를 분리해서 사용
*/

import { atom } from 'recoil';

import {
  autocompletePackageInfo,
  autocompletePackageInfoWithBadgesInfo,
  searchPackagesInfo,
} from '@/types/package';

export const searchQueryState = atom<string>({
  key: 'searchQueryState',
  default: '',
});

export const searchFixedQueryState = atom<string>({
  key: 'searchFixedQueryState',
  default: '',
});

export type Sorttype = 'default' | 'downloads' | 'popularity' | 'recent';

export const selectedSortState = atom<Sorttype>({
  key: 'selectedSortState',
  default: 'default',
});

export const autoCompleteState = atom<autocompletePackageInfo[]>({
  key: 'autoCompleteState',
  default: [],
});

export const searchResultsState = atom<searchPackagesInfo[]>({
  key: 'searchResultsState',
  default: [],
});
