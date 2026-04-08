import { NextRequest, NextResponse } from "next/server";
import type { ScanRecord, VenueType } from "@/types/scan";
import { analyzeImage } from "@/lib/analyzer";
import { generateRecommendations } from "@/lib/recommender";

type AnalyzeRequestBody = {
  image?: string;
  venueType?: VenueType;
};

const scanHistory: ScanRecord[] = [];

export async function POST(req: NextRequest) {
  try {
    const input = (await req.json()) as AnalyzeRequestBody;

    if (!input.image) {
      return NextResponse.json(
        { error: "Missing image payload." },
        { status: 400 }
      );
    }

    const extractedItems = await analyzeImage({
      imageBase64: input.image,
      venueType: input.venueType ?? "restaurant",
    });

    const recommendations = await generateRecommendations(
      Array.isArray(extractedItems?.extractedItems)
        ? extractedItems.extractedItems.map((item) =>
            typeof item === "string" ? item : item.name
          )
        : [],
      input.venueType ?? "restaurant"
    );

    const scanRecord: ScanRecord = {
      id: crypto.randomUUID(),
      venueType: input.venueType ?? "restaurant",
      createdAt: new Date().toISOString(),
      image: input.image,
      extractedItems: extractedItems.extractedItems ?? [],
      recommendations,
      overallSummary: recommendations.reasoning,
      confidence: recommendations.confidence ?? null,
    };

    scanHistory.unshift(scanRecord);

    return NextResponse.json({
      id: scanRecord.id,
      extractedItems: scanRecord.extractedItems,
      recommendations: scanRecord.recommendations,
      scanRecord,
    });
  } catch (error) {
    console.error("Analyze route error:", error);

    return NextResponse.json(
      { error: "Failed to analyze image." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    scans: scanHistory,
  });
}
