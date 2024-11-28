import type {
  PopularPackageInfo,
  PackageInfo,
  SuggestionPackageInfo,
  SearchResultPackageInfo,
} from '@/types/package';

import { CacheManager } from '@/lib/utils';
import axios from 'axios';

const NPM_BASE_URL = process.env.NEXT_PUBLIC_NPM_REGISTRY_URL;
const NPM_POPULAR_ENDPOINT = process.env.NEXT_PUBLIC_NPM_POPULAR_ENDPOINT;
const NPM_SEARCH_ENDPOINT = process.env.NEXT_PUBLIC_NPM_SEARCH_ENDPOINT;
const NPM_API_URL = process.env.NEXT_PUBLIC_NPM_API_URL;
const NPM_DOWNLOADS_ENDPOINT = process.env.NEXT_PUBLIC_NPM_DOWNLOAD_ENDPOINT;

const suggestionsCache = new CacheManager<Promise<SuggestionPackageInfo[]>>({
  maxSize: 40,
  expiryTime: 1000 * 60 * 5,
});

export async function getPopularPackages(): Promise<PopularPackageInfo[]> {
  try {
    const response = await axios.get<{ objects: PackageInfo[] }>(
      `${NPM_BASE_URL}${NPM_POPULAR_ENDPOINT}`
    );

    return response.data.objects.map((item: PackageInfo): PopularPackageInfo => {
      return {
        name: item.package?.name || 'Unknown Package',
        description: item.package?.description || 'No description available',
        score: {
          detail: {
            popularity: item.score?.detail?.popularity || 0,
          },
        },
        author: {
          name: item.package?.author?.name || 'Unknown',
          email: item.package?.author?.email || '',
        },
        publisher: {
          username: item.package?.publisher?.username || 'Unknown',
          email: item.package?.publisher?.email || '',
        },
      };
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('NPM API Error:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
    } else {
      console.error('Unexpected error:', error);
    }
    return [];
  }
}

export async function getSuggestionPackages(query: string): Promise<SuggestionPackageInfo[]> {
  const cachedData = suggestionsCache.get(query);
  if (cachedData) {
    return cachedData;
  }

  const fetchPromise = (async () => {
    try {
      const response = await axios.get(
        `${NPM_BASE_URL}${NPM_SEARCH_ENDPOINT}${encodeURIComponent(query)}&size=20&from=0`
      );

      const packageDownload = await Promise.all(
        response.data.objects.map(async (item: PackageInfo) => {
          const packageData = {
            name: item.package?.name || 'Unknown Package',
            description: item.package?.description || 'No description available',
            date: item.package?.date || 'Unknown Date',
            downloadCount: 0,
          };

          try {
            const downloadsResponse = await axios.get<{ downloads: number }>(
              `${NPM_API_URL}${NPM_DOWNLOADS_ENDPOINT}${encodeURIComponent(item.package.name)}`
            );
            packageData.downloadCount = downloadsResponse.data?.downloads || 0;
          } catch (downloadError) {
            console.warn(`Failed to fetch download count for ${item.package.name}:`, downloadError);
          }

          return {
            package: packageData,
            score: {
              detail: {
                popularity: item.score.detail.popularity || 0,
              },
            },
          };
        })
      );

      return packageDownload;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('NPM API Error:', {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        });
      } else {
        console.error('Unexpected error:', error);
      }
      return [];
    }
  })();

  suggestionsCache.set(query, fetchPromise);
  return fetchPromise;
}

export async function getSearchResultPackages(query: string): Promise<SearchResultPackageInfo[]> {
  try {
    const response = await axios.get(
      `${NPM_BASE_URL}${NPM_SEARCH_ENDPOINT}${encodeURIComponent(query)}`
    );

    const mapPackageData = (item: PackageInfo, downloads: number = 0) => ({
      package: {
        name: item.package?.name || 'Unknown Package',
        version: item.package?.version || 'Unknown Version',
        description: item.package?.description || 'No description available',
        keywords: item.package?.keywords || [],
        date: item.package?.date || 'Unknown Date',
        author: {
          name: item.package?.author?.name || 'Unknown',
          email: item.package?.author?.email || '',
        },
        publisher: {
          username: item.package?.publisher?.username || 'Unknown',
          email: item.package?.publisher?.email || '',
        },
        downloadCount: downloads,
      },
      score: {
        final: item.score.final || 0,
        detail: {
          popularity: item.score.detail.popularity || 0,
        },
      },
    });

    const packageDownload = await Promise.all(
      response.data.objects.map(async (item: PackageInfo) => {
        try {
          const downloadsResponse = await axios.get<{ downloads: number }>(
            `${NPM_API_URL}${NPM_DOWNLOADS_ENDPOINT}${encodeURIComponent(item.package.name)}`
          );
          return mapPackageData(item, downloadsResponse.data?.downloads || 0);
        } catch (downloadError) {
          console.warn(`Failed to fetch download count for ${item.package.name}:`, downloadError);
          return mapPackageData(item);
        }
      })
    );

    return packageDownload;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('NPM API Error:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
    } else {
      console.error('Unexpected error:', error);
    }
    return [];
  }
}
