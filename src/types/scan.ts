import type { RecommendationPayload } from "@/types/recommendation";


export type ExtractedItem = {
  id: string;
  name: string;
  confidence?: number;
  notes?: string;
};

export type ScanRecord = {
  id: string;
  venueType: VenueType;
  createdAt: string;
  image?: string | null;
  imageUrl?: string | null;
  extractedItems: ExtractedItem[] | string[];
  recommendations: RecommendationPayload;
  overallSummary?: string | null;
  confidence?: number | null;
};

export interface ScanAnalysis {
  extractedItems: ExtractedItem[];
  recommendations: RecommendationPayload;
  analyzedAt: string;
  venueType: VenueType;
}
