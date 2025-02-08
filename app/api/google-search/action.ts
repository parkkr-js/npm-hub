import { SearchResult } from '@/types/google-search';
import { removeSpecialChars } from '@/lib/utils';
export async function fetchGoogleSearch(packageName: string): Promise<SearchResult[]> {
  // console.count('API 호출 횟수'); // 호출 횟수 카운트
  // console.log('API 호출 시간:', new Date().toISOString()); // 호출 시간 기록
  console.log('패키지 이름:', packageName);
  let modifiedPackageName = decodeURIComponent(packageName);
  modifiedPackageName = `npm ${modifiedPackageName}`;
  modifiedPackageName = removeSpecialChars(modifiedPackageName);

  const response = await fetch(`/api/google-search?q=${modifiedPackageName}`);

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  const data = await response.json();
  console.log('API 응답 데이터:', data);

  if (!data.items || !Array.isArray(data.items)) {
    return [];
  }

  return data.items.map((item: SearchResult) => ({
    title: item.title,
    link: item.link,
    snippet: item.snippet,
    displayLink: item.displayLink,
    thumbnail: item.thumbnail,
  }));
}
