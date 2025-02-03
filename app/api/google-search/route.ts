// app/api/google-search/route.ts
import { NextResponse } from 'next/server';
import { GoogleSearchItem } from '@/types/google-search';
import { headers } from 'next/headers';
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const GOOGLE_CX_ID = process.env.GOOGLE_CX_ID;

// 언어 코드 매핑
const COUNTRY_TO_LANG: { [key: string]: string } = {
  KR: 'lang_ko',
  US: 'lang_en',
  JP: 'lang_ja',
  NZ: 'lang_en',
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    //const query = searchParams.get('q') || '';

    const encodedQuery = searchParams.get('q') || '';
    const query = decodeURIComponent(encodedQuery);

    console.log('검색어:', query);
    if (!query) {
      return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
    }

    if (!GOOGLE_API_KEY || !GOOGLE_CX_ID) {
      throw new Error('Missing Google API configuration');
    }

    // 클라이언트 IP 가져오기
    // const headersList = headers();
    // const countryCode = headersList.get('x-vercel-ip-country') || 'KR'; // Vercel 배포 시
    // // const forwarded = headersList.get('forwarded') || ''; // 다른 호스팅의 경우

    /*
    // 현재는 로컬 환경이므로 한국으로 고정
    const countryCode = 'KR';
    const languageCode = COUNTRY_TO_LANG[countryCode] || 'lang_ko';
*/

    const headersList = headers();
    const countryCode = headersList.get('x-vercel-ip-country') || 'KR'; // Vercel 배포 시
    const languageCode = COUNTRY_TO_LANG[countryCode] || 'lang_ko';
    console.log('query:', query);
    console.log('countryCode:', countryCode);
    const searchUrl = new URL('https://customsearch.googleapis.com/customsearch/v1');
    const params = {
      key: GOOGLE_API_KEY,
      cx: GOOGLE_CX_ID,
      q: query,
      num: '5',
      safe: 'active',
      gl: countryCode, // 'countryKR' 대신 'KR'처럼 국가 코드만 사용
      lr: languageCode,
      // dateRestrict: 'y1', // 최근 1년 결과만
    };

    Object.entries(params).forEach(([key, value]) => {
      searchUrl.searchParams.append(key, value);
    });

    const response = await fetch(searchUrl.toString());

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Google API Error:', errorText);
      return NextResponse.json(
        { error: `Google API responded with status ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();

    if (!data.items) {
      return NextResponse.json(
        {
          error: 'No search results found',
          items: [],
        },
        { status: 404 }
      );
    }

    const formattedResults = data.items.map((item: GoogleSearchItem) => ({
      title: item.title,
      link: item.link,
      snippet: item.snippet,
      displayLink: item.displayLink,
      thumbnail: item.pagemap?.cse_thumbnail?.[0]
        ? {
            src: item.pagemap.cse_thumbnail[0].src,
            width: parseInt(item.pagemap.cse_thumbnail[0].width),
            height: parseInt(item.pagemap.cse_thumbnail[0].height),
          }
        : undefined,
      datePublished: item.pagemap?.metatags?.[0]?.['article:published_time'] || null,
    }));

    console.log('Formatted Results:', formattedResults);

    return NextResponse.json({
      items: formattedResults,
      searchInformation: {
        totalResults: data.searchInformation?.totalResults,
        searchTime: data.searchInformation?.searchTime,
      },
    });
  } catch (error) {
    console.error('Search API Error:', error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to fetch search results',
        items: [],
      },
      { status: 500 }
    );
  }
}
