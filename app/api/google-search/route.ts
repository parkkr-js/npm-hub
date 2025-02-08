// app/api/google-search/route.ts
import { NextResponse } from 'next/server';
import { GoogleSearchItem } from '@/types/google-search';

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const GOOGLE_CX_ID = process.env.GOOGLE_CX_ID;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const query = searchParams.get('q') || '';

    if (!query) {
      return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
    }

    if (!GOOGLE_API_KEY || !GOOGLE_CX_ID) {
      throw new Error('Missing Google API configuration');
    }
    console.log(query);
    const searchUrl = new URL('https://customsearch.googleapis.com/customsearch/v1');
    const params = {
      key: GOOGLE_API_KEY,
      cx: GOOGLE_CX_ID,
      q: query,
      num: '5',
      filter: 0,

      gl: 'kr',
      hl: 'ko',
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
