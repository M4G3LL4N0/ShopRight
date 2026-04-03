import { getStructuredCompletion } from "./openai";
import type { RecommendationPayload, RecommendationItem } from "@/types/recommendation";
import type { VenueType } from "@/types/scan";

export async function generateRecommendations(
  items: string[],
  venueType: VenueType
): Promise<RecommendationPayload> {
  if (items.length === 0) {
    return getFallbackRecommendations(venueType);
  }

  try {
    const response = await getStructuredCompletion({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a shopping recommendation assistant for ${venueType} venues. 
          Analyze the items and provide recommendations in JSON format.`
        },
        {
          role: "user",
          content: `Items: ${items.join(", ")}\n\nProvide recommendations with:
          - best_item (most recommended)
          - best_value (best price/quality)
          - safe_pick (most reliable)
          - adventurous_pick (most unique)
          - reasoning (1-2 sentences)
          Return ONLY valid JSON matching this interface:
          {
            best_item: { item: string, explanation: string },
            best_value: { item: string, explanation: string },
            safe_pick: { item: string, explanation: string },
            adventurous_pick: { item: string, explanation: string },
            reasoning: string
          }`
        }
      ],
      temperature: 0.3,
      max_tokens: 500
    });

    const result = JSON.parse(response) as Omit<RecommendationPayload, "confidence">;
    return {
      ...result,
      confidence: 0.9
    };
  } catch (error) {
    console.error("AI recommendation failed:", error);
    return getFallbackRecommendations(venueType);
  }
}

function getFallbackRecommendations(venueType: VenueType): RecommendationPayload {
  const items = ["Item 1", "Item 2", "Item 3", "Item 4"];
  return {
    best_item: {
      item: items[0],
      explanation: "Fallback top recommendation",
    },
    best_value: {
      item: items[1],
      explanation: "Fallback value pick",
    },
    safe_pick: {
      item: items[2],
      explanation: "Fallback safe choice",
    },
    adventurous_pick: {
      item: items[3],
      explanation: "Fallback adventurous option",
    },
    reasoning: "Fallback recommendations generated after AI failure",
    confidence: 0.5
  };
}
