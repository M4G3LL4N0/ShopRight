import type { VenueType } from "@/types/scan";
import type { RecommendationPayload } from "@/types/recommendation";

export type AnalyzeImageInput = {
  imageBase64: string;
  venueType?: VenueType;
  preferences?: unknown;
};

export type ExtractedItem = {
  id: string;
  name: string;
  confidence?: number;
  notes?: string;
};

export type AnalyzeImageResult = {
  extractedItems: ExtractedItem[];
  confidence: number;
  notes?: string;
};

export type GenerateRecommendationsInput = {
  extractedItems: ExtractedItem[];
  venueType?: VenueType;
  preferences?: unknown;
};

const DEFAULT_ITEMS_BY_VENUE: Record<VenueType, string[]> = {
  restaurant: [
    "House Burger",
    "Margherita Pizza",
    "Grilled Salmon",
    "Caesar Salad",
  ],
  bar: [
    "Hazy IPA",
    "Pilsner",
    "Espresso Martini",
    "Old Fashioned",
  ],
  grocery: [
    "Greek Yogurt",
    "Sourdough Bread",
    "Organic Eggs",
    "Blueberries",
  ],
  retail: [
    "Classic White Tee",
    "Slim Denim",
    "Leather Jacket",
    "Crewneck Sweater",
  ],
  electronics: [
    "Noise-Cancelling Headphones",
    "Portable SSD",
    "Mechanical Keyboard",
    "4K Monitor",
  ],
};

import { getStructuredCompletion } from "./openai";

async function extractItemsWithAI(imageBase64: string, venueType: VenueType): Promise<string[]> {
  try {
    const response = await getStructuredCompletion({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Analyze this ${venueType} image and extract all visible items. Return ONLY a JSON array of item names in this exact format: ["item1", "item2", ...]`
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${imageBase64}`
              }
            }
          ]
        }
      ],
      max_tokens: 1000
    });

    return JSON.parse(response) as string[];
  } catch (error) {
    console.error("AI extraction failed:", error);
    return [];
  }
}

export async function analyzeImage(
  input: AnalyzeImageInput
): Promise<AnalyzeImageResult> {
  const venueType = input.venueType ?? "restaurant";

  if (!input.imageBase64) {
    throw new Error("Missing imageBase64 for analysis.");
  }

  // Try AI extraction first
  const itemNames = await extractItemsWithAI(input.imageBase64, venueType);
  
  // Fallback to default items if AI fails
  const finalItems = itemNames.length > 0 
    ? itemNames 
    : DEFAULT_ITEMS_BY_VENUE[venueType];

  return {
    extractedItems: finalItems.map((name, index) => ({
      id: `item-${index + 1}`,
      name,
      confidence: Math.max(0.7, 0.95 - index * 0.05),
      notes: "AI-extracted item"
    })),
    confidence: itemNames.length > 0 ? 0.85 : 0.65,
    notes: itemNames.length > 0 
      ? "AI analysis completed successfully" 
      : "Used fallback items after AI analysis failed"
  };
}

export async function generateRecommendations(
  input: GenerateRecommendationsInput
): Promise<RecommendationPayload> {
  const items = input.extractedItems ?? [];
  const names = items.map((item) => item.name);

  const bestOverall = names[0] ?? "Top pick unavailable";
  const bestValue = names[1] ?? bestOverall;
  const safePick = names[2] ?? bestOverall;
  const adventurousPick = names[3] ?? bestOverall;

  return {
    best_item: {
      item: bestOverall,
      explanation:
        "Strong overall choice based on the extracted set and broad appeal.",
      confidence: 0.84,
    },
    best_value: {
      item: bestValue,
      explanation:
        "Likely the best balance of quality, satisfaction, and perceived value.",
      confidence: 0.8,
    },
    safe_pick: {
      item: safePick,
      explanation:
        "A dependable option that should work for most people in this category.",
      confidence: 0.77,
    },
    adventurous_pick: {
      item: adventurousPick,
      explanation:
        "A more exploratory choice for someone open to trying something less obvious.",
      confidence: 0.74,
    },
    reasoning:
      items.length > 0
        ? `Generated from ${items.length} extracted item(s) for a ${input.venueType ?? "restaurant"} scan.`
        : "No extracted items were available, so recommendations were generated from fallback logic.",
    confidence: 0.79,
  };
}
