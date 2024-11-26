import { selector } from 'recoil';
import {
  autocompletePackageInfoWithBadgesInfo,
  searchPackagesWithBadgesInfo,
} from '@/types/package';
import {
  searchQueryState,
  searchResultsState,
  selectedSortState,
  searchFixedQueryState,
  autoCompleteState,
} from '@/store/atoms/search';
/*
api를 통해서는 Bage 정보를 추가하지 않았지만, selector를 통해서는 Bage 정보를 추가한다.
*/

export const filteredAutoComplementPackagesSelector = selector<
  autocompletePackageInfoWithBadgesInfo[]
>({
  key: 'filteredAutoComplementPackages',
  get: ({ get }): autocompletePackageInfoWithBadgesInfo[] => {
    const query = get(searchQueryState);
    const results = get(autoCompleteState);

    let filteredResults = results.filter(
      (item) =>
        item.package.name.toLowerCase().includes(query.toLowerCase()) ||
        item.package.description.toLowerCase().includes(query.toLowerCase())
    );

    const mostDownloaded = filteredResults.reduce(
      (max, curr) => (curr.package.downloadCount > max.package.downloadCount ? curr : max),
      filteredResults[0]
    );

    const mostRecent = filteredResults.reduce(
      (max, curr) => (new Date(curr.package.date) > new Date(max.package.date) ? curr : max),
      filteredResults[0]
    );

    const mostPopular = filteredResults.reduce(
      (max, curr) => (curr.score.detail.popularity > max.score.detail.popularity ? curr : max),
      filteredResults[0]
    );

    const filterdResultswithBadge = filteredResults.map((pkg, index) => ({
      ...pkg,
      badges: {
        isExactMatch: index === 0,
        isMostDownloaded: pkg === mostDownloaded,
        isMostRecent: pkg === mostRecent,
        isMostPopular: pkg === mostPopular,
      },
    }));

    return filterdResultswithBadge;
  },
});

export const filteredSearchPackagesSelector = selector<searchPackagesWithBadgesInfo[]>({
  key: 'filteredSearchPackages',
  get: ({ get }): searchPackagesWithBadgesInfo[] => {
    const query = get(searchFixedQueryState);
    const results = get(searchResultsState);
    const sortType = get(selectedSortState);

    let filteredResults = results.filter(
      (item) =>
        item.package.name.toLowerCase().includes(query.toLowerCase()) ||
        item.package.description.toLowerCase().includes(query.toLowerCase())
    );

    const mostDownloaded = filteredResults.reduce(
      (max, curr) => (curr.package.downloadCount > max.package.downloadCount ? curr : max),
      filteredResults[0]
    );

    const mostRecent = filteredResults.reduce(
      (max, curr) => (new Date(curr.package.date) > new Date(max.package.date) ? curr : max),
      filteredResults[0]
    );

    const mostPopular = filteredResults.reduce(
      (max, curr) => (curr.score.detail.popularity > max.score.detail.popularity ? curr : max),
      filteredResults[0]
    );

    const filterdResultswithBadge = filteredResults.map((pkg, index) => ({
      ...pkg,
      badges: {
        isExactMatch: index === 0,
        isMostDownloaded: pkg === mostDownloaded,
        isMostRecent: pkg === mostRecent,
        isMostPopular: pkg === mostPopular,
      },
    }));

    switch (sortType) {
      case 'downloads':
        return filterdResultswithBadge.sort(
          (a, b) => b.package.downloadCount - a.package.downloadCount
        );
      case 'popularity':
        return filterdResultswithBadge.sort(
          (a, b) => b.score.detail.popularity - a.score.detail.popularity
        );
      case 'recent':
        return filterdResultswithBadge.sort(
          (a, b) => new Date(b.package.date).getTime() - new Date(a.package.date).getTime()
        );
      default:
        return filterdResultswithBadge;
    }
  },
});
