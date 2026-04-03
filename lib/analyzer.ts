import type { VenueType } from "@/types/scan";
import type { RecommendationPayload } from "@/types/recommendation";

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

function normalizeVenueType(venueType?: VenueType): VenueType {
  return venueType ?? "restaurant";
}

function buildAnalysisPrompt(imageBase64: string, venueType: VenueType) {
  return [
    `Analyze this ${venueType} image and identify likely visible items.`,
    "Return a concise structured interpretation suitable for a shopping recommendation app.",
    `Image payload length: ${imageBase64.length} characters.`,
  ].join(" ");
}

function makeItems(names: string[]): ExtractedItem[] {
  return names.map((name, index) => ({
    id: `item-${index + 1}`,
    name,
    confidence: Math.max(0.7, 0.95 - index * 0.05),
    notes: "Auto-detected placeholder item for MVP flow.",
  }));
}

export async function analyzeImage(
  input: AnalyzeImageInput
): Promise<AnalyzeImageResult> {
  const venueType = normalizeVenueType(input.venueType);

  if (!input.imageBase64 || typeof input.imageBase64 !== "string") {
    throw new Error("Missing imageBase64 for analysis.");
  }

  const _prompt = buildAnalysisPrompt(input.imageBase64, venueType);

  return {
    extractedItems: makeItems(DEFAULT_ITEMS_BY_VENUE[venueType]),
    confidence: 0.78,
    notes: "Fallback analyzer result generated locally.",
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
