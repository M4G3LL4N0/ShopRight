import { NextRequest, NextResponse } from 'next/server';
import { analyzeImage } from '@/lib/analyzer';
import { validateImage, convertToBase64 } from '@/lib/image';
import { VenueType } from '@/types/scan';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;
    const venueType = formData.get('venueType') as VenueType;

    if (!file || !venueType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    validateImage(file);
    const base64Image = await convertToBase64(file);
    const analysis = await analyzeImage(base64Image, venueType);

    return NextResponse.json(analysis);
  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Analysis failed' },
      { status: 500 }
    );
  }
}

export const runtime = 'edge';
