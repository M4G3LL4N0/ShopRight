'use client';

import { useScanStore } from '../../src/store/useScanStore';
import { ResultCard } from '../../src/components/ResultCard';
import Link from 'next/link';

export default function ResultsPage() {
  const { recommendations } = useScanStore();

  if (!recommendations) {
    return (
      <div className="min-h-screen bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-6">
              No Results Found
            </h1>
            <Link
              href="/scan"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-2xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg shadow-indigo-500/20"
            >
              Scan Again
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="space-y-12">
          <h1 className="text-4xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-pink-400">
            Your Recommendations
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ResultCard
              title="Best Overall"
              item={recommendations.best_item}
              explanation={recommendations.reasoning}
            />
            <ResultCard
              title="Best Value"
              item={recommendations.best_value}
              explanation={recommendations.reasoning}
            />
            <ResultCard
              title="Safe Pick"
              item={recommendations.safe_pick}
              explanation={recommendations.reasoning}
            />
            <ResultCard
              title="Adventurous Pick"
              item={recommendations.adventurous_pick}
              explanation={recommendations.reasoning}
            />
          </div>
          
          <div className="flex justify-center mt-8">
            <Link
              href="/scan"
              className="px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg shadow-indigo-500/20"
            >
              Scan Another Menu
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
