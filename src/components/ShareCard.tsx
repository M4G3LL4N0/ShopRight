"use client";

import { useRef, useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { toPng } from "html-to-image";
import { cn } from "@/lib/utils";
import type { RecommendationItem, VenueType } from "@/types/recommendation";

interface ShareCardProps {
  recommendation: RecommendationItem | null;
  confidence?: number;
  reasoning?: string;
  venueType: VenueType;
  className?: string;
}

const VENUE_EMOJIS: Record<VenueType, string> = {
  restaurant: "🍽️",
  bar: "🍸", 
  grocery: "🛒",
  retail: "🛍️",
};

export function ShareCard({
  recommendation,
  confidence = 0,
  reasoning = "",
  venueType,
  className,
}: ShareCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (!cardRef.current || !recommendation) return;
    
    try {
      setIsDownloading(true);
      const dataUrl = await toPng(cardRef.current);
      const link = document.createElement('a');
      link.download = `shopright-${recommendation.item.toLowerCase().replace(/\s+/g, '-')}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Error downloading image:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  if (!recommendation) return null;

  return (
    <div 
      ref={cardRef}
      className={cn(
        "relative w-full max-w-xl rounded-[32px] overflow-hidden",
        "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700",
        "border border-white/10 shadow-2xl",
        className
      )}
    >
      <button 
        onClick={handleDownload}
        className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
        disabled={isDownloading}
      >
        {isDownloading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <Download className="w-5 h-5" />
        )}
      </button>

      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[length:100px_100px] opacity-10" />
      <div className="relative z-10 p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">{VENUE_EMOJIS[venueType]}</span>
            <span className="text-xs font-medium tracking-widest text-white/60 uppercase">
              {venueType}
            </span>
          </div>
          <div className="flex items-center px-3 py-1 rounded-full bg-black/30 border border-white/10">
            <div className="w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-pulse" />
            <span className="text-xs font-medium text-white/70">
              {Math.round(confidence * 100)}% Confidence
            </span>
          </div>
        </div>

        <div className="space-y-4 pb-8">
          <h3 className="text-2xl font-medium text-white/60">ShopRight recommends</h3>
          <h2 className="text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-amber-400">
            {recommendation.item}
          </h2>
        </div>

        {reasoning && (
          <div className="p-5 rounded-xl bg-white/5 backdrop-blur-sm border border-white/5">
            <p className="text-sm leading-relaxed text-white/80">{reasoning}</p>
          </div>
        )}

        <div className="absolute bottom-3 right-3">
          <div className="flex items-center">
            <Image
              src="/logo.svg"
              width={24}
              height={24}
              alt="ShopRight"
              className="opacity-80 mr-1"
            />
            <span className="text-xs font-medium text-white/50">@ShopRight</span>
          </div>
        </div>
      </div>
    </div>
  );
}
