"use client";

import { create } from "zustand";
import type { VenueType } from "@/types/scan";
import type { RecommendationPayload } from "@/types/recommendation";

export type ExtractedItem = {
  id: string;
  name: string;
  confidence?: number;
  notes?: string;
};

type ScanState = {
  selectedImageFile: File | null;
  selectedImagePreview: string | null;
  extractedItems: ExtractedItem[];
  recommendations: RecommendationPayload | null;
  loading: boolean;
  error: string | null;
  analyzedAt: string | null;
  venueType: VenueType;
};

type ScanActions = {
  setVenueType: (venueType: VenueType) => void;
  setImage: (file: File | null, preview: string | null) => void;
  clearImage: () => void;
  setExtractedItems: (items: ExtractedItem[]) => void;
  setRecommendations: (recommendations: RecommendationPayload | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  markAnalyzed: () => void;
  reset: () => void;
};

const initialState: ScanState = {
  selectedImageFile: null,
  selectedImagePreview: null,
  extractedItems: [],
  recommendations: null,
  loading: false,
  error: null,
  analyzedAt: null,
  venueType: "restaurant",
};

export const useScanStore = create<ScanState & ScanActions>((set) => ({
  ...initialState,

  setVenueType: (venueType) => set({ venueType }),

  setImage: (file, preview) =>
    set({
      selectedImageFile: file,
      selectedImagePreview: preview,
      error: null,
    }),

  clearImage: () =>
    set({
      selectedImageFile: null,
      selectedImagePreview: null,
    }),

  setExtractedItems: (items) =>
    set({
      extractedItems: items,
    }),

  setRecommendations: (recommendations) =>
    set({
      recommendations,
    }),

  setLoading: (loading) =>
    set({
      loading,
    }),

  setError: (error) =>
    set({
      error,
    }),

  markAnalyzed: () =>
    set({
      analyzedAt: new Date().toISOString(),
    }),

  reset: () =>
    set({
      ...initialState,
    }),
}));
