"use client";

import { create } from "zustand";
import type { VenueType, ExtractedItem, ScanRecord } from "@/types/scan";
import type { RecommendationPayload } from "@/types/recommendation";

type UserPlan = "free" | "pro";

type ScanState = {
  selectedImageFile: File | null;
  selectedImagePreview: string | null;
  extractedItems: ExtractedItem[];
  recommendations: RecommendationPayload | null;
  loading: boolean;
  error: string | null;
  analyzedAt: string | null;
  venueType: VenueType;
  userPlan: UserPlan;
  scanCount: number;
  scanLimit: number;
  lastScanDate: string | null;
  scanHistory: ScanRecord[];
  referralCount: number;
  lastSharedScan: string | null;
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
  setUserPlan: (plan: UserPlan) => void;
  incrementScanCount: () => void;
  resetDailyUsageIfNeeded: () => void;
  addScan: (scan: ScanRecord) => void;
  loadHistory: (scans: ScanRecord[]) => void;
  setLastSharedScan: (scanId: string | null) => void;
  incrementReferralCount: () => void;
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
  userPlan: "free",
  scanCount: 0,
  scanLimit: 3,
  lastScanDate: null,
  scanHistory: [],
  referralCount: 0,
  lastSharedScan: null,
};

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

export const useScanStore = create<ScanState & ScanActions>((set, get) => ({
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

  setUserPlan: (plan: UserPlan) =>
    set({
      userPlan: plan,
      scanLimit: plan === "pro" ? Number.MAX_SAFE_INTEGER : 3,
    }),

  incrementScanCount: () => {
    const { userPlan, scanCount } = get();
    const today = todayKey();

    set({
      scanCount: userPlan === "pro" ? scanCount : scanCount + 1,
      lastScanDate: today,
    });
  },

  resetDailyUsageIfNeeded: () => {
    const { lastScanDate, userPlan } = get();
    const today = todayKey();

    if (lastScanDate !== today) {
      set({
        scanCount: 0,
        lastScanDate: today,
        scanLimit: userPlan === "pro" ? Number.MAX_SAFE_INTEGER : 3,
      });
    }
  },

  addScan: (scan: ScanRecord) =>
    set((state) => ({
      scanHistory: [scan, ...state.scanHistory],
    })),

  loadHistory: (scans: ScanRecord[]) =>
    set({
      scanHistory: scans,
    }),

  setLastSharedScan: (scanId: string | null) =>
    set({
      lastSharedScan: scanId,
    }),

  incrementReferralCount: () =>
    set((state) => {
      const newCount = state.referralCount + 1;
      // Give bonus scans for referrals
      const scanBonus = Math.floor(newCount / 3); // +1 scan per 3 referrals
      return {
        referralCount: newCount,
        scanLimit: state.userPlan === 'pro' 
          ? Number.MAX_SAFE_INTEGER 
          : 3 + scanBonus
      };
    }),

  applyReferral: (code: string) => {
    if (code === get().referralCode) return; // Can't refer self
    
    set({
      referredBy: code,
      scanLimit: get().userPlan === 'pro' 
        ? Number.MAX_SAFE_INTEGER 
        : 4 // +1 scan for being referred
    });
  },

  reset: () =>
    set({
      ...initialState,
    }),
}));
