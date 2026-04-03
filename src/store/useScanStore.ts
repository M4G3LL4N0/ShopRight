"use client";

import { create } from "zustand";
import type { VenueType, ExtractedItem } from "@/types/scan";
import type { RecommendationPayload } from "@/types/recommendation";

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

  setVenueType: (venueType: VenueType) =>
    set({
      venueType,
    }),

  setImage: (file: File | null, preview: string | null) =>
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

  setExtractedItems: (items: ExtractedItem[]) =>
    set({
      extractedItems: items,
    }),

  setRecommendations: (recommendations: RecommendationPayload | null) =>
    set({
      recommendations,
    }),

  setLoading: (loading: boolean) =>
    set({
      loading,
    }),

  setError: (error: string | null) =>
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
