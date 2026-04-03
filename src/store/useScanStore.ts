import { create } from "zustand"
import { persist } from "zustand/middleware"
import {
  type VenueType,
  type ExtractedItem,
  type ScanRecord,
} from "@/types/scan"
import { type RecommendationPayload } from "@/types/recommendation"

type ScanState = {
  selectedImageFile: File | null
  selectedImagePreview: string | null
  extractedItems: ExtractedItem[]
  recommendations: RecommendationPayload | null
  loading: boolean
  error: string | null
  analyzedAt: string | null
  venueType: VenueType
  previousScans: ScanRecord[]
}

type ScanActions = {
  setVenueType: (venueType: VenueType) => void
  setImage: (file: File | null, preview: string | null) => void
  clearImage: () => void
  setExtractedItems: (items: ExtractedItem[]) => void
  setRecommendations: (recs: RecommendationPayload | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  markAnalyzed: () => void
  reset: () => void
  addToHistory: (scan: Omit<ScanRecord, 'id'>) => void
}

const initialState: ScanState = {
  selectedImageFile: null,
  selectedImagePreview: null,
  extractedItems: [],
  recommendations: null,
  loading: false,
  error: null,
  analyzedAt: null,
  venueType: "restaurant",
  previousScans: [],
}

export const useScanStore = create<ScanState & ScanActions>()(
  persist(
    (set) => ({
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

      setLoading: (loading) => set({ loading }),

      setError: (error) => set({ error }),

      markAnalyzed: () =>
        set({
          analyzedAt: new Date().toISOString(),
        }),

      reset: () => set(initialState),

      addToHistory: (scan) =>
        set((state) => ({
          previousScans: [
            {
              ...scan,
              id: crypto.randomUUID(),
              createdAt: new Date().toISOString(),
            },
            ...state.previousScans,
          ],
        })),
    }),
    {
      name: "scan-store",
      partialize: (state) => 
        Object.fromEntries(
          Object.entries(state).filter(([key]) => 
            !['selectedImageFile', 'loading', 'error'].includes(key)
          )
        ),
    }
  )
)
