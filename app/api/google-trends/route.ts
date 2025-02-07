// app/api/google-trends/route.ts
import { NextResponse } from 'next/server';
import googleTrends from 'google-trends-api';
import { TrendsAPIResponse } from '@/types/google-trends';
import { removeSpecialChars } from '@/lib/utils';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);


    const keyword = searchParams.get('keyword') || '';

    console.log('키워드:', keyword);

    if (!keyword) {
      return NextResponse.json({ error: 'Keyword is required' }, { status: 400 });
    }

    const options = {
      keyword,
      startTime: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
      category: 31,
    };

    const interestData = await googleTrends.interestOverTime(options);

    const parsedInterest = JSON.parse(interestData) as TrendsAPIResponse;

    return NextResponse.json({
      interest: parsedInterest.default.timelineData,
    });
  } catch (error) {
    // 더 자세한 에러 로깅
    console.error('Detailed error:', error);

    return NextResponse.json(
      {
        error: 'Failed to fetch trends data',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
