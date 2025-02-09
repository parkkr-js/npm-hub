// app/search/detail/[package]/opengraph-image.tsx
import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'NPM Package Details'
export const size = {
  width: 1200,
  height: 630
}
export const contentType = 'image/png'

export default function Image({ params }: { params: { package: string } }) {
  const packageName = decodeURIComponent(params.package)

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          backgroundColor: '#161616',
          justifyContent: 'center',
          alignItems: 'center',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <div
          style={{
            backgroundColor: '#161616',
            border: '4px solid #4589ff',
            padding: '40px',
            borderRadius: '15px',
          }}
        >
          <h1 
            style={{ 
              color: '#4589ff', 
              fontSize: 64,
              margin: 0,
              textAlign: 'center'
            }}
          >
            {packageName}
          </h1>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}