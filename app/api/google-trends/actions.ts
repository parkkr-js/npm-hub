// app/api/google-trends/actions.ts
import { TrendsData } from '@/types/google-trends';
import { removeSpecialChars } from '@/lib/utils';

export async function fetchGoogleTrends(packageName: string): Promise<TrendsData> {
  try {
    let modifiedPackageName = decodeURIComponent(packageName);

    modifiedPackageName = removeSpecialChars(modifiedPackageName);

    const url = `/api/google-trends?keyword=${modifiedPackageName}`;

    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error response:', errorText);
      throw new Error(`API Error: ${response.status} - ${errorText}`);
    }

    const contentType = response.headers.get('content-type');

    if (!contentType?.includes('application/json')) {
      throw new Error(`잘못된 응답 타입: ${contentType}`);
    }

    const data = await response.json();

    if (!data.interest || !Array.isArray(data.interest)) {
      throw new Error('유효하지 않은 데이터 형식');
    }

    return data;
  } catch (error) {
    console.error('fetchGoogleTrends 에러:', error);
    throw error;
  }
}
