// app/api/google-trends/route.ts
import { NextResponse } from 'next/server';
import googleTrends from 'google-trends-api';
import { TrendsAPIResponse } from '@/types/google-trends';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const keyword = searchParams.get('keyword');

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
    if (error instanceof Error) {
      console.error('Google Trends API Error:', error.message);
    }
    return NextResponse.json({ error: 'Failed to fetch trends data' }, { status: 500 });
  }
}
