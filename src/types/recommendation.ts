export type Recommendation = {
  type: 'best' | 'value' | 'safe' | 'adventurous'
  itemId: string
  reasoning: string
  confidence: number
  summary?: string
}

export type RecommendationSummary = {
  best: Recommendation
  value: Recommendation
  safe: Recommendation
  adventurous: Recommendation
  overallSummary: string
}
