import type { PopularPackageInfo, PackageInfo, AutocompletePackageInfo } from '@/types/package';
import axios from 'axios';

const NPM_BASE_URL = process.env.NEXT_PUBLIC_NPM_REGISTRY_URL;
const NPM_POPULAR_ENDPOINT = process.env.NEXT_PUBLIC_NPM_POPULAR_ENDPOINT;
const NPM_SEARCH_ENDPOINT = process.env.NEXT_PUBLIC_NPM_SEARCH_ENDPOINT;
const NPM_API_URL = process.env.NEXT_PUBLIC_NPM_API_URL;
const NPM_DOWNLOADS_ENDPOINT = process.env.NEXT_PUBLIC_NPM_DOWNLOAD_ENDPOINT;

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

export async function searchPackages(query: string): Promise<AutocompletePackageInfo[]> {
  try {
    const response = await axios.get(
      `${NPM_BASE_URL}${NPM_SEARCH_ENDPOINT}${encodeURIComponent(query)}`
    );

    const packageDownload = await Promise.all(
      response.data.objects.map(async (item: PackageInfo) => {
        try {
          const downloadsResponse = await axios.get<{ downloads: number }>(
            `${NPM_API_URL}${NPM_DOWNLOADS_ENDPOINT}${encodeURIComponent(item.package.name)}`
          );

          return {
            package: {
              name: item.package.name,
              description: item.package.description || 'No description available',
              date: item.package.date,
              downloadCount: downloadsResponse.data.downloads,
            },
            score: {
              detail: {
                popularity: item.score.detail.popularity,
              },
            },
          };
        } catch (downloadError) {
          console.warn(`Failed to fetch download count for ${item.package.name}:`, downloadError);
          return {
            package: {
              name: item.package.name,
              description: item.package.description || 'No description available',
              date: item.package.date,
              downloadCount: 0,
            },
            score: {
              detail: {
                popularity: item.score.detail.popularity,
              },
            },
          };
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
