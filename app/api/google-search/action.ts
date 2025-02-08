import { SearchResult } from '@/types/google-search';
import { removeSpecialChars } from '@/lib/utils';
export async function fetchGoogleSearch(packageName: string): Promise<SearchResult[]> {
  let modifiedPackageName = decodeURIComponent(packageName);
  modifiedPackageName = `npm ${modifiedPackageName}`;
  modifiedPackageName = removeSpecialChars(modifiedPackageName);

  const response = await fetch(`/api/google-search?q=${modifiedPackageName}`);

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  const data = await response.json();

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
