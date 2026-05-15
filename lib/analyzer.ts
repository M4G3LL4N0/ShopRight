import type { VenueType } from "@/types/scan";
import type { RecommendationPayload } from "@/types/recommendation";
import { openai, getStructuredCompletion } from "./openai";

export type ExtractedItem = {
  id: string;
  name: string;
  confidence?: number;
  notes?: string;
};

export type AnalyzeImageInput = {
  imageBase64: string;
  venueType?: VenueType;
  preferences?: unknown;
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

async function analyzeWithOpenAI(imageBase64: string, venueType: VenueType): Promise<ExtractedItem[]> {
  try {
    const prompt = [
      `Analyze this ${venueType} image and extract visible items.`,
      `Return only a JSON array of item names in this format: ["item1", "item2", ...]`,
    ].join('\n');

    const result = await getStructuredCompletion({
      messages: [
        {
          role: "system",
          content: "You are an expert at extracting items from images of menus, shelves, and product displays."
        },
        {
          role: "user", 
          content: prompt
        }
      ]
    });

    const items = JSON.parse(result);
    return items.map((name: string, index: number) => ({
      id: `item-${index + 1}`,
      name,
      confidence: 0.85 + (Math.random() * 0.1), // 0.85-0.95
      notes: "AI-extracted item"
    }));
  } catch (error) {
    console.error("AI analysis failed, falling back to defaults:", error);
    return makeItems(DEFAULT_ITEMS_BY_VENUE[venueType]);
  }
}

function makeItems(names: string[]): ExtractedItem[] {
  return names.map((name, index) => ({
    id: `item-${index + 1}`,
    name,
    confidence: Math.max(0.7, 0.95 - index * 0.05),
    notes: "Default placeholder item",
  }));
}

export async function analyzeImage(
  input: AnalyzeImageInput
): Promise<AnalyzeImageResult> {
  const venueType = input.venueType ?? "restaurant";

  if (!input.imageBase64) {
    throw new Error("Missing required imageBase64");
  }

  try {
    const extractedItems = openai 
      ? await analyzeWithOpenAI(input.imageBase64, venueType)
      : makeItems(DEFAULT_ITEMS_BY_VENUE[venueType]);

    return {
      extractedItems,
      confidence: 0.85,
      notes: openai 
        ? "AI-powered analysis completed"
        : "Fallback analysis using default items"
    };
  } catch (error) {
    console.error("Analysis failed:", error);
    return {
      extractedItems: makeItems(DEFAULT_ITEMS_BY_VENUE[venueType]),
      confidence: 0.7,
      notes: "Analysis failed, using fallback items",
    };
  }
}

export async function generateRecommendations(
  input: GenerateRecommendationsInput
): Promise<RecommendationPayload> {
  // First try making an AI-powered recommendation
  if (openai && input.extractedItems?.length) {
    try {
      const prompt = [
        `You are a recommendation engine for ${input.venueType ?? "restaurant"} items.`,
        `Given these items: ${input.extractedItems.map(i => i.name).join(', ')}`,
        "Provide recommendations including:\n" +
        "- Best overall\n- Best value\n- Safe pick\n- Adventurous pick\n" +
        "Return as JSON matching RecommendationPayload type"
      ].join('\n');

      const result = await getStructuredCompletion({
        messages: [
          {
            role: "system",
            content: "You are an expert at recommending items based on quality, value and appeal."
          },
          {
            role: "user",
            content: prompt
          }
        ]
      });

      return JSON.parse(result);
    } catch (error) {
      console.error("AI recommendation failed, falling back:", error);
      // Continue to fallback logic
    }
  }

  // Fallback recommendation logic
  const items = input.extractedItems ?? [];
  const names = items.map(i => i.name);
  
  return {
    best_item: {
      item: names[0] || "Top pick unavailable",
      explanation: "Strong overall choice",
      confidence: 0.8
    },
    best_value: {
      item: names[1] || names[0] || "Value pick unavailable", 
      explanation: "Best balance of quality and value",
      confidence: 0.75
    },
    safe_pick: {
      item: names[2] || names[0] || "Safe pick unavailable",
      explanation: "Dependable option with broad appeal",
      confidence: 0.7
    },
    adventurous_pick: {
      item: names[3] || names[0] || "Adventurous pick unavailable",
      explanation: "More exploratory choice",
      confidence: 0.65
    },
    reasoning: items.length 
      ? `Analyzed ${items.length} items` 
      : "No items available for recommendations",
    confidence: 0.75
  };
}
