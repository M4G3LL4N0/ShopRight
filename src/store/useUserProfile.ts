import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserProfile {
  likesSpicy: boolean;
  prefersHealthy: boolean;
  budgetLevel: 'low' | 'medium' | 'high';
  favoriteCuisines: string[];
  setProfile: (profile: Partial<UserProfile>) => void;
}

export const useUserProfile = create<UserProfile>()(
  persist(
    (set) => ({
      likesSpicy: false,
      prefersHealthy: false,
      budgetLevel: 'medium',
      favoriteCuisines: [],
      setProfile: (profile) => set((state) => ({ ...state, ...profile })),
    }),
    {
      name: 'user-profile',
    }
  )
);
