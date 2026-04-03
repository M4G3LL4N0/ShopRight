export type RecommendationItem = {
  item: string;
  explanation: string;
  confidence?: number;
};

export type RecommendationPayload = {
  best_item: RecommendationItem | null;
  best_value: RecommendationItem | null;
  safe_pick: RecommendationItem | null;
  adventurous_pick: RecommendationItem | null;
  reasoning: string;
  confidence?: number;
};
