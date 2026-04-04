import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get('title') || 'ShopRight Recommendation';
  const description = searchParams.get('description') || 'Know what\'s worth buying';
  const venueType = searchParams.get('venueType') || 'menu';

  const venueEmojis: Record<string, string> = {
    restaurant: '🍽️',
    bar: '🍸',
    grocery: '🛒',
    retail: '🛍️'
  };

  return new ImageResponse(
    (
      <div style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0f172a',
        color: 'white',
        padding: '64px',
        backgroundImage: 'linear-gradient(to bottom right, #020617 25%, #1e293b 75%)'
      }}>
        <div style={{
          fontSize: '64px',
          marginBottom: '32px'
        }}>
          {venueEmojis[venueType] || '✨'}
        </div>
        <h1 style={{
          fontSize: '64px',
          fontWeight: 'bold',
          textAlign: 'center',
          backgroundImage: 'linear-gradient(90deg, #f59e0b, #ec4899)',
          backgroundClip: 'text',
          color: 'transparent',
          marginBottom: '32px'
        }}>
          {title}
        </h1>
        <p style={{
          fontSize: '32px',
          opacity: 0.8,
          textAlign: 'center',
          maxWidth: '800px'
        }}>
          {description}
        </p>
        <div style={{
          display: 'flex',
          marginTop: '64px',
          alignItems: 'center'
        }}>
          <span style={{
            fontSize: '24px',
            opacity: 0.6
          }}>
            shopright.app
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
