// store/selectors.ts

import { selector } from 'recoil';
import {
  suggestionsAtom,
  searchQueryAtom,
  searchResultsAtom,
  sortTypeAtom,
  selectedKeywordAtom,
} from '@/store/atoms';
import { calculateBadges } from '@/lib/utils';

export const filteredSuggestionsSelector = selector({
  key: 'filteredSuggestionsSelector',
  get: ({ get }) => {
    const suggestions = get(suggestionsAtom);
    const query = get(searchQueryAtom);

    if (!query.trim()) return [];
    const originalOrder = suggestions.map((suggestion) => suggestion.package.name);

    return calculateBadges(suggestions, originalOrder);
  },
});

export const sortedAndBadgedResultsSelector = selector({
  key: 'sortedAndBadgedResultsSelector',
  get: ({ get }) => {
    const results = get(searchResultsAtom);
    const sortType = get(sortTypeAtom);

    const originalOrder = results.map((result) => result.package.name);

    if (sortType === 'default') {
      return calculateBadges(results, originalOrder);
    }

    const sortedResults = [...results].sort((a, b) => {
      switch (sortType) {
        case 'popularity':
          return b.score.detail.popularity - a.score.detail.popularity;
        case 'downloads':
          return b.package.downloadCount - a.package.downloadCount;
        case 'recent':
          return new Date(b.package.date).getTime() - new Date(a.package.date).getTime();
        default:
          return 0;
      }
    });

    return calculateBadges(sortedResults, originalOrder);
  },
});

export const keywordFilteredResultsSelector = selector({
  key: 'keywordFilteredResultsSelector',
  get: ({ get }) => {
    const results = get(sortedAndBadgedResultsSelector);
    const selectedKeyword = get(selectedKeywordAtom);

    if (!selectedKeyword) return results;

    return results.filter((item) => item.package.keywords?.includes(selectedKeyword));
  },
});

export const memoizedTopKeywordsSelector = selector({
  key: 'memoizedTopKeywordsSelector',
  get: ({ get }) => {
    const results = get(searchResultsAtom);
    const keywordMap = new Map<string, number>();

    for (const result of results) {
      for (const keyword of result.package.keywords) {
        keywordMap.set(keyword, (keywordMap.get(keyword) || 0) + 1);
      }
    }

    return Array.from(keywordMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([keyword]) => keyword);
  },
});
