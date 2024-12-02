//types/common.d.ts

export type sortType = 'default' | 'downloads' | 'popularity' | 'recent';

export type badgeType = 'exactMatch' | 'downloads' | 'recent' | 'popular';

export interface CacheItem<T> {
  data: T;
  timestamp: number;
}

export interface CacheOptions {
  maxSize?: number;
  expiryTime?: number;
}

export interface PageConfig {
  searchBarWidth: string;
  searchBarHeight: string;
  searchBarPosition: string;
  backgroundImage: string;
  backgroundImage2?: string;
  backgroundPosition: string;
  backgroundPosition2?: string;
  backgroundPosition: string;
  logoSize: string;
  logoFont: string;
  headerLayout: string;
  showSearchSuggestions?: boolean;
}
