import type { RecommendationPayload } from "@/types/recommendation";

function pickItem(items: string[], index: number, fallback: string) {
  return items[index] ?? items[0] ?? fallback;
}

export async function generateRecommendations(
  items: string[],
  venueType: string
): Promise<RecommendationPayload> {
  const bestOverall = pickItem(items, 0, "Top pick unavailable");
  const bestValue = pickItem(items, 1, bestOverall);
  const safePick = pickItem(items, 2, bestOverall);
  const adventurousPick = pickItem(items, 3, bestOverall);

  return {
    best_item: {
      item: bestOverall,
      explanation: `Strong overall choice for this ${venueType} scan based on the detected options.`,
      confidence: 0.84,
    },
    best_value: {
      item: bestValue,
      explanation: `Best balance of quality and value from the extracted ${venueType} items.`,
      confidence: 0.8,
    },
    safe_pick: {
      item: safePick,
      explanation: `Dependable option with broad appeal for most people.`,
      confidence: 0.77,
    },
    adventurous_pick: {
      item: adventurousPick,
      explanation: `A more exploratory pick if you want something less obvious.`,
      confidence: 0.74,
    },
    reasoning:
      items.length > 0
        ? `Generated from ${items.length} extracted item(s) for a ${venueType} scan.`
        : `No extracted items were available, so fallback recommendation logic was used for this ${venueType} scan.`,
    confidence: 0.79,
  };
}
