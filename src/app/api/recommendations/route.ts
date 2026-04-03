import { generateRecommendations } from '@/lib/analyzer'
import { type GenerateRecommendationsInput } from '@/lib/analyzer'
import { NextResponse } from 'next/server'

export const runtime = 'edge'

export async function POST(request: Request) {
  try {
    const input: GenerateRecommendationsInput = await request.json()
    
    // Validate input
    if (!input.extractedItems?.length) {
      throw new Error('Missing required extractedItems')
    }

    const result = await generateRecommendations(input)
    return NextResponse.json(result)
  } catch (error) {
    console.error('Recommendation failed:', error)
    return NextResponse.json(
      { error: 'Recommendation generation failed' },
      { status: 500 }
    )
  }
}
