import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface ScanState {
  image: File | null;
  extractedItems: string[];
  recommendations: {
    best_item: string;
    best_value: string;
    safe_pick: string;
    adventurous_pick: string;
    reasoning: string;
  } | null;
  isLoading: boolean;
  error: string | null;
  setImage: (image: File) => void;
  clearImage: () => void;
  analyzeImage: () => Promise<void>;
  reset: () => void;
}

export const useScanStore = create<ScanState>((set) => ({
  image: null,
  extractedItems: [],
  recommendations: null,
  isLoading: false,
  error: null,
  setImage: (image) => set({ image }),
  clearImage: () => set({ image: null }),
  analyzeImage: async () => {
    set({ isLoading: true, error: null });
    try {
      if (!image) {
        throw new Error('No image uploaded');
      }

      // Extract menu items
      const { items, confidence } = await analyzeImage(image);
      
      if (confidence < 0.5) {
        console.warn(`Low confidence in menu extraction: ${confidence}`);
      }
      
      set({ extractedItems: items });
      
      // Get recommendations with user profile
      const profile = useUserProfile.getState();
      const recommendations = await generateRecommendations(items, profile);
      set({ recommendations });

      // Save scan to Supabase
      const { data: scan, error } = await supabase
        .from('scans')
        .insert({
          image_url: URL.createObjectURL(image),
          extracted_items: items,
          recommendations,
          confidence
        })
        .select()
        .single();

      if (error) {
        console.error('Failed to save scan:', error);
      }
    } catch (error) {
      set({ error: 'Failed to analyze image' });
    } finally {
      set({ isLoading: false });
    }
  },
  reset: () => set({
    image: null,
    extractedItems: [],
    recommendations: null,
    isLoading: false,
    error: null
  })
}));
import { create } from 'zustand'
import { VenueType } from '@/types/scan'

type ScanState = {
  selectedImageFile: File | null
  selectedImagePreview: string | null
  extractedItems: any[]
  recommendations: any[]
  loading: boolean
  error: string | null
  analyzedAt: Date | null
  venueType: VenueType | null
}

type ScanActions = {
  setImage: (file: File, preview: string) => void
  removeImage: () => void
  setVenueType: (type: VenueType) => void
  startAnalysis: () => void
  completeAnalysis: (extractedItems: any[], recommendations: any[]) => void
  setError: (error: string) => void
  reset: () => void
}

const initialState: ScanState = {
  selectedImageFile: null,
  selectedImagePreview: null,
  extractedItems: [],
  recommendations: [],
  loading: false,
  error: null,
  analyzedAt: null,
  venueType: null
}

export const useScanStore = create<ScanState & ScanActions>((set) => ({
  ...initialState,
  
  setImage: (file, preview) => set({
    selectedImageFile: file,
    selectedImagePreview: preview,
    error: null
  }),
  
  removeImage: () => set({
    selectedImageFile: null,
    selectedImagePreview: null
  }),
  
  setVenueType: (type) => set({ venueType: type }),
  
  startAnalysis: () => set({ 
    loading: true,
    error: null,
    extractedItems: [],
    recommendations: []
  }),
  
  completeAnalysis: (extractedItems, recommendations) => set({
    loading: false,
    extractedItems,
    recommendations,
    analyzedAt: new Date()
  }),
  
  setError: (error) => set({ error, loading: false }),
  
  reset: () => set(initialState)
}))
