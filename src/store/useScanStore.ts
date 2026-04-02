import { create } from 'zustand';
import { VenueType } from '@/types/scan';
import { ExtractedItem, Recommendation } from '@/types/recommendation';

interface ScanState {
  selectedImageFile: File | null;
  selectedImagePreview: string | null;
  extractedItems: ExtractedItem[];
  recommendations: Recommendation[];
  loading: boolean;
  error: string | null;
  analyzedAt: Date | null;
  venueType: VenueType | null;
}

interface ScanActions {
  setImage: (file: File, preview: string) => void;
  removeImage: () => void;
  setVenueType: (type: VenueType) => void;
  startAnalysis: () => void;
  completeAnalysis: (extractedItems: ExtractedItem[], recommendations: Recommendation[]) => void;
  setError: (error: string) => void;
  reset: () => void;
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
};

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
}));
