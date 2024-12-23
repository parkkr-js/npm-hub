// app/api/image-proxy/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const imageUrl = searchParams.get('url');

    if (!imageUrl) {
      return new NextResponse('Image URL is required', { status: 400 });
    }

    const response = await fetch(imageUrl);
    const buffer = await response.arrayBuffer();

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'image/jpeg',
        'Cache-Control': 'public, max-age=31536000',
      },
    });
  } catch (error) {
    return new NextResponse('Failed to fetch image', { status: 500 });
  }
}
