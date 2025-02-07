// app/api/google-trends/actions.ts
import { TrendsData } from '@/types/google-trends';
import { removeSpecialChars } from '@/lib/utils';

export async function fetchGoogleTrends(packageName: string): Promise<TrendsData> {
  try {
    console.log('=== fetchGoogleTrends 시작 ===');
    console.log('1. 원본 packageName:', packageName);

    let modifiedPackageName = decodeURIComponent(packageName);
    console.log('2. 디코딩 후:', modifiedPackageName);

    modifiedPackageName = removeSpecialChars(modifiedPackageName);
    console.log('3. 특수문자 제거 후:', modifiedPackageName);

    const url = `/api/google-trends?keyword=${modifiedPackageName}`;
    console.log('4. 요청 URL:', url);

    const response = await fetch(url);
    console.log('5. 응답 상태:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error response:', errorText);
      throw new Error(`API Error: ${response.status} - ${errorText}`);
    }

    const contentType = response.headers.get('content-type');
    console.log('6. Content-Type:', contentType);

    if (!contentType?.includes('application/json')) {
      throw new Error(`잘못된 응답 타입: ${contentType}`);
    }

    const data = await response.json();
    console.log('7. 응답 데이터 받음');

    if (!data.interest || !Array.isArray(data.interest)) {
      throw new Error('유효하지 않은 데이터 형식');
    }

    console.log('=== fetchGoogleTrends 완료 ===');
    return data;
  } catch (error) {
    console.error('fetchGoogleTrends 에러:', error);
    throw error;
  }
}