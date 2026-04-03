import { analyzeImage } from '@/lib/analyzer'
import { generateRecommendations } from '@/lib/recommender'
import { type AnalyzeImageInput } from '@/lib/analyzer'
import { NextResponse } from 'next/server'

export const runtime = 'edge'

export async function POST(request: Request) {
  try {
    const input: AnalyzeImageInput = await request.json()
    
    if (!input.imageBase64) {
      return NextResponse.json(
        { error: 'Missing required imageBase64' },
        { status: 400 }
      )
    }

    // Analyze image to extract items
    const { extractedItems } = await analyzeImage(input)
    
    // Generate recommendations
    const recommendations = await generateRecommendations(
      extractedItems.map(item => item.name),
      input.venueType ?? 'restaurant'
    )

    const scanRecord: ScanRecord = {
      id: crypto.randomUUID(),
      venueType: input.venueType ?? 'restaurant',
      createdAt: new Date().toISOString(),
      imageBase64: input.imageBase64,
      extractedItems,
      recommendations,
      confidence: recommendations.confidence ?? 0.8,
    };

    addScan(scanRecord);

    return NextResponse.json({
      ...scanRecord
    })
  } catch (error) {
    console.error('Analysis failed:', error)
    return NextResponse.json(
      { error: 'Image analysis failed' },
      { status: 500 }
    )
  }
}
