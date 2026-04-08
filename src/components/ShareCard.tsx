"use client";

import { useMemo, useRef } from "react";
import { toPng } from "html-to-image";
import { cn } from "@/lib/utils";
import type { RecommendationItem } from "@/types/recommendation";
import type { VenueType } from "@/types/scan";

interface ShareCardProps {
  recommendation: RecommendationItem | null;
  venueType: VenueType;
  reasoning?: string;
  confidence?: number;
  className?: string;
}

function formatVenueType(venueType: VenueType) {
  return venueType.charAt(0).toUpperCase() + venueType.slice(1);
}

export function ShareCard({
  recommendation,
  venueType,
  reasoning,
  confidence,
  className,
}: ShareCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const fallbackReasoning = useMemo(() => {
    if (reasoning && reasoning.trim().length > 0) return reasoning;
    return "Scan anything. Know what’s worth buying.";
  }, [reasoning]);

  const handleDownload = async () => {
    if (!cardRef.current) return;

    const dataUrl = await toPng(cardRef.current, {
      cacheBust: true,
      pixelRatio: 2,
    });

    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `shopright-${venueType}-share-card.png`;
    link.click();
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div
        ref={cardRef}
        className="poster-card overflow-hidden rounded-[32px] border border-white/12 bg-[radial-gradient(circle_at_top_left,rgba(88,118,255,0.24),transparent_24%),radial-gradient(circle_at_top_right,rgba(58,214,255,0.16),transparent_20%),linear-gradient(180deg,#0b1222_0%,#070d18_60%,#050814_100%)] p-6 sm:p-8"
      >
        <div className="flex items-center justify-between gap-4">
          <div className="soft-pill inline-flex rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.24em] text-white/64">
            ShopRight Share
          </div>
          <div className="text-[11px] uppercase tracking-[0.18em] text-white/40">
            {formatVenueType(venueType)}
          </div>
        </div>

        <div className="mt-8">
          <div className="text-[11px] uppercase tracking-[0.18em] text-white/36">
            Best overall
          </div>
          <h3 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
            {recommendation?.item ?? "No recommendation yet"}
          </h3>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/62">
            {recommendation?.explanation ?? fallbackReasoning}
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="metric-panel rounded-[22px] p-4">
            <div className="text-[11px] uppercase tracking-[0.18em] text-white/36">
              Confidence
            </div>
            <div className="mt-2 text-lg font-semibold text-white">
              {typeof confidence === "number" ? confidence.toFixed(2) : "0.00"}
            </div>
          </div>

          <div className="metric-panel rounded-[22px] p-4">
            <div className="text-[11px] uppercase tracking-[0.18em] text-white/36">
              Why it won
            </div>
            <div className="mt-2 text-sm leading-6 text-white/70">
              {fallbackReasoning}
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => void handleDownload()}
        className="rounded-2xl border border-white/12 bg-white/6 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
      >
        Download share card
      </button>
    </div>
  );
}
