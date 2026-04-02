import { extractMenuItems } from './openai';
import { VenueType } from '@/types/scan';

export interface AnalysisResult {
  items: string[];
  confidence: number;
  rawText?: string;
  venueType: VenueType;
}

export async function analyzeImage(
  base64Image: string,
  venueType: VenueType
): Promise<AnalysisResult> {
  try {
    // Extract menu items using OpenAI Vision
    const { items, confidence, rawText } = await extractMenuItems(base64Image);
    
    // Validate extracted items
    if (items.length === 0) {
      throw new Error('No menu items detected');
    }

    return {
      items,
      confidence,
      rawText,
      venueType
    };
  } catch (error) {
    console.error('Analysis failed:', error);
    throw new Error('Failed to analyze menu image');
  }
}
