// lib/cache.ts
import { TrendsResults } from '@/types/google-trends-api';

const CACHE_DURATION = 1000 * 60 * 60; // 1 hour
const cache = new Map<string, { data: TrendsResults; timestamp: number }>();

export function getCachedData(key: string): TrendsResults | null {
  const cached = cache.get(key);
  if (!cached) return null;

  const isExpired = Date.now() - cached.timestamp > CACHE_DURATION;
  if (isExpired) {
    cache.delete(key);
    return null;
  }

  return cached.data;
}

export function setCachedData(key: string, data: TrendsResults): void {
  cache.set(key, { data, timestamp: Date.now() });
}
