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
