import type { PopularPackageInfo, PackageInfo } from '@/types/package';
import axios from 'axios';

const NPM_BASE_URL = process.env.NEXT_PUBLIC_NPM_REGISTRY_URL;
const NPM_POPULAR_ENDPOINT = process.env.NEXT_PUBLIC_NPM_POPULAR_ENDPOINT;

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
