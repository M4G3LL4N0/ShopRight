import type { RecommendationPayload } from "@/types/recommendation";

export type VenueType =
  | "restaurant"
  | "bar"
  | "grocery"
  | "retail"
  | "electronics";

export type ExtractedItem = {
  id: string;
  name: string;
  confidence?: number;
  notes?: string;
};

export interface ScanAnalysis {
  extractedItems: ExtractedItem[];
  recommendations: RecommendationPayload;
  analyzedAt: string;
  venueType: VenueType;
}

export interface ScanRecord {
  id: string;
  venueType: VenueType;
  createdAt: string;
  imageUrl?: string | null;
  overallSummary?: string | null;
  confidence?: number | null;
}
