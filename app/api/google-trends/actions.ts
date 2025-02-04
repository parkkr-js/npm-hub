// app/api/google-trends/actions.ts
import { TrendsData } from '@/types/google-trends';

export async function fetchGoogleTrends(packageName: string): Promise<TrendsData> {
  console.count('trendsAPI 호출 횟수'); // 호출 횟수 카운트
  console.log('trendsAPI 호출 시간:', new Date().toISOString()); // 호출 시간 기록
  const response = await fetch(`/api/google-trends?keyword=${packageName}`);

  if (!response.ok) {
    // 실제 에러 응답 내용 확인
    const errorText = await response.text();
    console.error('API Error response:', errorText);
    throw new Error(`API Error: ${response.status} - ${errorText}`);
  }

  // content-type 확인
  const contentType = response.headers.get('content-type');
  if (!contentType?.includes('application/json')) {
    throw new Error(`잘못된 응답 타입: ${contentType}`);
  }
  const data = await response.json();

  if (!data.interest || !Array.isArray(data.interest)) {
    throw new Error('유효하지 않은 데이터 형식');
  }

  return data;
}
