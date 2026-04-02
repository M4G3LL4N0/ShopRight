import { getStructuredCompletion, validateStructuredResponse } from './openai';
import { z } from 'zod';

export type VenueType = 'restaurant' | 'bar' | 'grocery' | 'retail' | 'electronics';

export type ExtractedItem = {
  id: string;
  name: string;
  description?: string;
  price?: number;
  confidence: number;
  category?: string;
  imageUrl?: string;
};

export type ScanAnalysis = {
  extractedItems: ExtractedItem[];
  recommendations: Recommendation[];
  analyzedAt: Date;
  venueType: VenueType;
};

export type Recommendation = {
  best_item: string;
  best_value: string;
  safe_pick: string;
  adventurous_pick: string;
  reasoning: string;
};

const ANALYSIS_PROMPT = (imageBase64: string, venueType: VenueType) => `
You are an AI shopping assistant analyzing a ${venueType} image. Extract all visible items with:
1. Product name
2. Price (if visible)
3. Confidence score (0-1)
4. Category
5. Image URL (base64 encoded)

Format your response as JSON with these fields:
{
  "extractedItems": [
    {
      "id": "unique-id",
      "name": "product name",
      "price": 19.99,
      "confidence": 0.95,
      "category": "electronics",
      "imageUrl": "data:image/png;base64,${imageBase64}"
    }
  ]
}
`;

export async function analyzeImage(imageBase64: string, venueType: VenueType) {
  try {
    const response = await getStructuredCompletion({
      model: 'gpt-4-vision-preview',
      messages: [
        {
          role: 'user',
          content: ANALYSIS_PROMPT(imageBase64, venueType),
        },
      ],
      temperature: 0.3,
      max_tokens: 2000,
    });

    const schema = z.object({
      extractedItems: z.array(
        z.object({
          id: z.string(),
          name: z.string(),
          price: z.number().optional(),
          confidence: z.number().min(0).max(1),
          category: z.string().optional(),
          imageUrl: z.string().optional(),
        }),
      ),
    });

    return validateStructuredResponse(schema, response);
  } catch (error) {
    throw new Error(`Image analysis failed: ${error.message}`);
  }
}
