// store/atoms/search.ts
import { atom } from 'recoil';

export const searchQueryState = atom<string>({
  key: 'searchQueryState',
  default: '',
});
