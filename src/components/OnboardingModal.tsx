'use client';

import { useState } from 'react';
import { useUserProfile } from '../store/useUserProfile';

export function OnboardingModal() {
  const [isOpen, setIsOpen] = useState(true);
  const { setProfile, ...profile } = useUserProfile();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-800/50 backdrop-blur-lg rounded-3xl p-8 max-w-md w-full border border-gray-700/20">
        <h2 className="text-3xl font-bold text-white mb-8 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-pink-400">
          Tell us your tastes
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={profile.likesSpicy}
                onChange={(e) => setProfile({ likesSpicy: e.target.checked })}
                className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-gray-300">I like spicy food</span>
            </label>
          </div>

          <div>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={profile.prefersHealthy}
                onChange={(e) => setProfile({ prefersHealthy: e.target.checked })}
                className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-gray-300">I prefer healthy options</span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Budget Level
            </label>
            <select
              value={profile.budgetLevel}
              onChange={(e) => setProfile({ budgetLevel: e.target.value as any })}
              className="bg-gray-700/50 text-white rounded-xl px-4 py-2 w-full backdrop-blur-sm"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Favorite Cuisines (comma separated)
            </label>
            <input
              type="text"
              value={profile.favoriteCuisines.join(', ')}
              onChange={(e) => setProfile({ favoriteCuisines: e.target.value.split(',').map(s => s.trim()) })}
              className="bg-gray-700/50 text-white rounded-xl px-4 py-3 w-full backdrop-blur-sm border border-gray-600/30 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 transition-all"
              placeholder="Italian, Mexican, Japanese"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg shadow-indigo-500/20"
          >
            Save Preferences
          </button>
        </form>
      </div>
    </div>
  );
}
