import { NextRequest } from '@vercel/next/server';
import { generateRecommendations } from '../../lib/recommender';

export async function GET(request: NextRequest) {
  try {
    const formData = await request.formData();
    const items = Array.from(formData.get('items') as string[]);
    const venueType = formData.get('venueType') as string;

    if (items.length < 3) {
      throw new Error('At least 3 items required for recommendations');
    }

    const recommendations = await generateRecommendations(items, venueType);

    return new Response(
      JSON.stringify({
        recommendations,
        venueType,
        generatedAt: new Date().toISOString(),
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
