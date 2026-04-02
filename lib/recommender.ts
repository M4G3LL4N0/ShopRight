import { z } from 'zod';

export type RecommendationSummary = {
  best: Recommendation;
  value: Recommendation;
  safe: Recommendation;
  adventurous: Recommendation;
  overallSummary: string;
};

export type Recommendation = {
  best_item: string;
  best_value: string;
  safe_pick: string;
  adventurous_pick: string;
  reasoning: string;
};

const RECOMMENDATION_PROMPT = (items: string[], venueType: string) => `
Based on these ${venueType} items: ${items.join(', ')}, provide:
1. Best item (highest quality)
2. Best value (best price/quality ratio)
3. Safe pick (reliable choice)
4. Adventurous pick (unique/experimental)
5. Overall summary

Format as JSON with these fields:
{
  "best_item": "item name",
  "best_value": "item name",
  "safe_pick": "item name",
  "adventurous_pick": "item name",
  "reasoning": "detailed analysis"
}
`;

export async function generateRecommendations(items: string[], venueType: string) {
  try {
    const response = await getStructuredCompletion({
      model: 'gpt-4',
      messages: [
        {
          role: 'user',
          content: RECOMMENDATION_PROMPT(items, venueType),
        },
      ],
      temperature: 0.5,
      max_tokens: 1000,
    });

    const schema = z.object({
      best_item: z.string(),
      best_value: z.string(),
      safe_pick: z.string(),
      adventurous_pick: z.string(),
      reasoning: z.string(),
    });

    return validateStructuredResponse(schema, response);
  } catch (error) {
    throw new Error(`Recommendation generation failed: ${error.message}`);
  }
}
