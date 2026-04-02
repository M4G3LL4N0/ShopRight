import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { image, venueType, preferences } = body ?? {};

    if (!image) {
      return NextResponse.json(
        { error: "Missing image payload." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      extractedItems: [],
      recommendations: {
        best_item: "",
        best_value: "",
        safe_pick: "",
        adventurous_pick: "",
        reasoning: "Analysis pipeline placeholder response.",
        confidence: 0,
      },
      venueType: venueType ?? "restaurant",
      preferences: preferences ?? null,
    });
  } catch (error) {
    console.error("Analyze route error:", error);

    return NextResponse.json(
      { error: "Failed to analyze image." },
      { status: 500 }
    );
  }
}
