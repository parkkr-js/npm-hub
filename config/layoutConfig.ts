// layoutConfig.ts
export const pageConfigs = {
  home: {
    searchBarWidth: 'w-[805px]',
    searchBarHeight: 'h-[55px]',
    searchBarPosition: 'mt-8',
    backgroundImage: '/images/대쉬보드 중앙 상단.svg',
    backgroundPosition: 'top',
    logoSize: 'text-[120px]',
    logoFont: 'font-tommy',
    headerLayout: 'flex-col items-center',
    showSearchSuggestions: true,
  },
  search: {
    searchBarWidth: 'w-[608px]',
    searchBarHeight: 'h-[51.06px]',
    searchBarPosition: 'ml-4',
    backgroundImage: '/images/검색결과 페이지 오른쪽 배경 작은 원.svg',
    backgroundImage2: '/images/검색 결과 페이지 왼쪽 배경 중간 원.svg',
    backgroundPosition: '95% 5%',
    backgroundPosition2: '5% 95%',
    logoSize: 'text-[25.814px]',
    logoFont: 'font-tommy',
    headerLayout: 'flex flex-row items-center pl-[306px]',
    showSearchSuggestions: true,
  },
  detail: {
    searchBarWidth: 'w-[608px]',
    searchBarHeight: 'h-[51.06px]',
    searchBarPosition: 'ml-4',
    backgroundImage: '/images/검색결과 페이지 오른쪽 배경 작은 원.svg',
    backgroundImage2: '/images/검색 결과 페이지 왼쪽 배경 중간 원.svg',
    backgroundPosition: '95% 5%',
    backgroundPosition2: '5% 95%',
    logoSize: 'text-[25.814px]',
    logoFont: 'font-tommy',
    headerLayout: 'flex flex-row pl-[306px]',
    showSearchSuggestions: true,
  },
} as const;

export type PageConfigType =
  | typeof pageConfigs.home
  | typeof pageConfigs.search
  | typeof pageConfigs.detail;

export function getPageConfig(pathname: string): PageConfigType {
  if (pathname === '/') {
    return pageConfigs.home;
  }

  if (pathname.startsWith('/search')) {
    return pageConfigs.search;
  }
  if (pathname.startsWith('/detail')) {
    return pageConfigs.detail;
  }

  return pageConfigs.home;
}
