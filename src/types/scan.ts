export type VenueType = 
  | 'restaurant'
  | 'bar'
  | 'grocery'
  | 'retail'
  | 'electronics';

export interface ExtractedItem {
  id: string;
  name: string;
  description?: string;
  price?: number;
  confidence: number;
  category?: string;
  imageUrl?: string;
}

export interface ScanAnalysis {
  extractedItems: ExtractedItem[];
  recommendations: Recommendation[];
  analyzedAt: Date;
  venueType: VenueType;
}
