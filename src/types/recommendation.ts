export type Recommendation = {
  best_item: string;
  best_value: string;
  safe_pick: string;
  adventurous_pick: string;
  reasoning: string;
  confidence: number;
}

export type RecommendationPayload = Recommendation | null;
