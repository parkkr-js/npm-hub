/* Response는 TypeScript/JavaScript의 내장 타입/인터페이스,웹 API의 일부로, fetch API가 반환하는 응답 객체의 타입
ok: boolean
status: number
statusText: string
text(): Promise<string>
json(): Promise<any>
 */
import { CacheManager } from '@/lib/cache';

const markdownCache = new CacheManager<string>();
const NPM_README_API = process.env.NEXT_PUBLIC_UNPKG_URL;

async function fetchReadmeFile(packageName: string, filename: string): Promise<Response> {
  const response = await fetch(`${NPM_README_API}/${packageName}/${filename}`);
  return response;
}

export async function fetchReadme(packageName: string): Promise<{
  readme: string;
  error?: string;
}> {
  if (!packageName) {
    return { readme: '', error: 'Package name is required' };
  }

  try {
    const cacheKey = `readme-${packageName}`;
    const cachedData = await markdownCache.get(cacheKey);

    if (cachedData) {
      return { readme: cachedData };
    }

    const upperReadmeResponse = await fetchReadmeFile(packageName, 'README.md');
    const readmeResponse = upperReadmeResponse.ok
      ? upperReadmeResponse
      : await fetchReadmeFile(packageName, 'readme.md');

    if (!readmeResponse.ok) {
      throw new Error(`Failed to fetch README: ${readmeResponse.statusText}`);
    }

    const readmeText = await readmeResponse.text();
    const processedReadme = processReadmeImages(readmeText);

    markdownCache.set(cacheKey, processedReadme);
    return { readme: processedReadme };
  } catch (err) {
    return {
      readme: '',
      error: err instanceof Error ? err.message : 'Failed to fetch package data',
    };
  }
}

function processReadmeImages(readmeText: string): string {
  return readmeText.replace(
    /!\[.*?\]\(((?!http)[^)]+)\)|<img[^>]+src=["']((?!http)[^"']+)["']/g,
    (match, p1, p2) => {
      const imagePath = p1 || p2;
      if (imagePath.startsWith('images/')) {
        const newPath = `https://raw.githubusercontent.com/welldone-software/why-did-you-render/master/${imagePath}`;
        return match.replace(imagePath, newPath);
      }
      return match;
    }
  );
}
