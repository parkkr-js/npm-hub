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
