import Link from 'next/link';
import { OnboardingModal } from '../src/components/OnboardingModal';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-white mb-8 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-pink-400 animate-fade-in [animation-delay:100ms]">
            Find Your Perfect Meal
          </h1>
          <p className="text-xl text-gray-300 mb-16 animate-fade-in [animation-delay:300ms]">
            Scan any menu and get personalized recommendations
          </p>
          <Link
            href="/scan"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-2xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg shadow-indigo-500/20 animate-fade-in [animation-delay:500ms]"
          >
            Scan a Menu
          </Link>
        </div>
      </div>
    </div>
    <OnboardingModal />
    <Auth />
  );
}
