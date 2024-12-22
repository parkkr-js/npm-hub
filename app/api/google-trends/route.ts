// app/api/google-trends/route.ts
import { NextResponse } from 'next/server';
import googleTrends from 'google-trends-api';

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
    const parsedInterest = JSON.parse(interestData);

    // 안전하게 데이터 추출
    const response = {
      interest: parsedInterest.default?.timelineData || [],
    };

    // 디버깅용 로그
    console.log('API Response:', {
      keyword,
      dataPoints: response.interest.length,
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error('Google Trends API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch trends data' }, { status: 500 });
  }
}
