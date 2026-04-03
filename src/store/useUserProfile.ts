import { create } from 'zustand';

interface UserProfile {
  likesSpicy: boolean;
  prefersHealthy: boolean;
  budgetLevel: 'low' | 'medium' | 'high';
  favoriteCuisines: string[];
  setProfile: (profile: Partial<UserProfile>) => void;
}

export const useUserProfile = create<UserProfile>((set) => ({
  likesSpicy: false,
  prefersHealthy: false,
  budgetLevel: 'medium',
  favoriteCuisines: [],
  setProfile: (profile) => set((state) => ({ ...state, ...profile }))
}));
