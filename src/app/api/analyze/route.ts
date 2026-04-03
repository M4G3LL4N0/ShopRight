import { analyzeImage } from '@/lib/analyzer'
import { type AnalyzeImageInput } from '@/lib/analyzer'
import { NextResponse } from 'next/server'
import { validateImage } from '@/lib/image'

export const runtime = 'edge'

export async function POST(request: Request) {
  try {
    const input: AnalyzeImageInput = await request.json()
    
    // Validate input
    if (!input.imageBase64) {
      throw new Error('Missing required imageBase64')
    }

    const result = await analyzeImage(input)
    return NextResponse.json(result)
  } catch (error) {
    console.error('Analysis failed:', error)
    return NextResponse.json(
      { error: 'Image analysis failed' },
      { status: 500 }
    )
  }
}
