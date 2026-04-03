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
  imageBase64: string;
  extractedItems: ExtractedItem[];
  recommendations: RecommendationPayload;
  confidence: number;
  notes?: string;
}

export interface UserProfile {
  preferences: {
    cuisine: string[];
    drinks: string[];
    priceSensitivity: 'low' | 'medium' | 'high';
    likesSpicy: boolean;
    prefersHealthy: boolean;
  };
  historyCount: number;
  createdAt: string;
  updatedAt: string;
}
