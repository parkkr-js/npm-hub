// app/api/google-trends/actions.ts
import { TrendsData } from '@/types/google-trends';
import { CacheManager } from '@/lib/cache';

const trendsCache = new CacheManager<TrendsData>();

export async function fetchGoogleTrends(packageName: string): Promise<TrendsData> {
  const cacheKey = `trends-${packageName}`;
  const cachedData = trendsCache.get(cacheKey);

  if (cachedData) {
    return cachedData;
  }

  const response = await fetch(`/api/google-trends?keyword=${encodeURIComponent(packageName)}`);

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  const data = (await response.json()) as TrendsData;

  if (!data.interest || !Array.isArray(data.interest)) {
    throw new Error('Invalid data format received');
  }

  trendsCache.set(cacheKey, data);
  return data;
}
