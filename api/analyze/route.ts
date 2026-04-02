import { NextRequest } from '@vercel/next/server';
import { analyzeImage, generateRecommendations } from '../../lib/analyzer';
import { convertToBase64, validateImage } from '../../lib/image';

export async function GET(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;
    const venueType = formData.get('venueType') as string;
    const preferences = formData.get('preferences') as string | null;

    validateImage(file);
    const base64Image = await convertToBase64(file);

    const analysis = await analyzeImage(base64Image, venueType);
    const recommendations = await generateRecommendations(
      analysis.extractedItems.map(item => item.name),
      venueType
    );

    return new Response(
      JSON.stringify({
        extractedItems: analysis.extractedItems,
        recommendations: recommendations,
        venueType,
        analyzedAt: new Date().toISOString(),
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
