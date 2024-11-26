/*
PopularPackageInfo: 인기 패키지 정보를 담을 interface
AutocompletePackageInfo: 자동완성 패키지 정보를 담을 interface
AutocompletePackageInfoWithBadgesInfo: 자동완성 패키지 정보를 담은 interface에 뱃지 별정 보를 추가한 interface
searchPackagesInfo: 검색 결과를 담을 interface
searchPackageWithBadges: 검색 결과를 담은 interface에 뱃지 별 정보를 추가한 interface
*/

export interface popularPackageInfo {
  name: string;
  description: string;
  score: {
    detail: {
      popularity: number;
    };
  };
  author: {
    name: string;
    email: string;
  };
  publisher: {
    username: string;
    email: string;
  };
}

export interface autocompletePackageInfo {
  package: {
    name: string;
    description: string;
    date: string;
    downloadCount: number;
  };
  score: {
    detail: {
      popularity: number;
    };
  };
}

export interface autocompletePackageInfoWithBadgesInfo extends autocompletePackageInfo {
  badges: {
    isExactMatch: boolean;
    isMostDownloaded: boolean;
    isMostRecent: boolean;
    isMostPopular: boolean;
  };
}

export interface searchPackagesInfo {
  package: {
    name: string;
    version: string;
    description: string;
    keywords: string[];
    date: string;
    author: {
      name: string;
      email: string;
      username?: string;
    };
    publisher: {
      username: string;
      email: string;
    };
    downloadCount: number;
  };
  score: {
    final: number;
    detail: {
      popularity: number;
    };
  };
}

export interface searchPackagesWithBadgesInfo extends searchPackagesInfo {
  badges: {
    isExactMatch: boolean;
    isMostDownloaded: boolean;
    isMostRecent: boolean;
    isMostPopular: boolean;
  };
}

export interface packageInfo {
  package: {
    name: string;
    scope: 'unscoped' | string;
    version: string;
    description: string;
    keywords?: string[];
    date: string;
    links: {
      npm: string;
      homepage?: string;
      repository?: string;
      bugs?: string;
    };
    author: {
      name: string;
      email: string;
      username?: string;
    };
    publisher: {
      username: string;
      email: string;
    };
    maintainers: Array<{
      username: string;
      email: string;
    }>;
  };
  flags: {
    insecure: number;
  };
  score: {
    final: number;
    detail: {
      quality: number;
      popularity: number;
      maintenance: number;
    };
  };
  searchScore: number;
}
