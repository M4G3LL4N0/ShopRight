"use client";

import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { useScanStore } from "@/store/useScanStore";

export default function ResultsPage() {
  const { recommendations, extractedItems, venueType, userPlan } = useScanStore();

  const resultCards = recommendations
    ? [
        {
          label: "Best Overall",
          title: recommendations.best_item?.item ?? "No recommendation",
          body:
            recommendations.best_item?.explanation ??
            "No explanation available.",
        },
        {
          label: "Best Value",
          title: recommendations.best_value?.item ?? "No recommendation",
          body:
            recommendations.best_value?.explanation ??
            "No explanation available.",
        },
        {
          label: "Safe Pick",
          title: recommendations.safe_pick?.item ?? "No recommendation",
          body:
            recommendations.safe_pick?.explanation ??
            "No explanation available.",
        },
        {
          label: "Adventurous Pick",
          title:
            recommendations.adventurous_pick?.item ?? "No recommendation",
          body:
            recommendations.adventurous_pick?.explanation ??
            "No explanation available.",
        },
      ]
    : [];

  return (
    <main className="relative min-h-screen">
      <div className="site-grid" />
      <Header />

      <section className="section-divider">
        <div className="container-shell py-16 sm:py-20">
          <div className="glass-panel rounded-[34px] px-6 py-8 sm:px-10 sm:py-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-end">
              <div>
                <div className="text-[11px] uppercase tracking-[0.26em] text-white/40">
                  Recommendation results
                </div>
                <h1 className="mt-4 text-4xl font-semibold tracking-[-0.045em] text-white sm:text-5xl">
                  Ranked outputs for a faster decision.
                </h1>
              </div>

              <p className="max-w-2xl text-[16px] leading-8 text-white/58 lg:justify-self-end">
                ShopRight organizes the visible options into a best overall
                choice, strongest value, safest decision, and higher-upside
                adventurous recommendation.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button href="/scan" size="lg">
                Run another scan
              </Button>
              {userPlan === "free" ? (
                <Button href="/pricing" variant="primary" size="lg">
                  Upgrade for Full History
                </Button>
              ) : (
                <Button href="/history" variant="secondary" size="lg">
                  View History
                </Button>
              )}
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-2">
              {resultCards.length > 0 ? (
                resultCards.map((card) => (
                  <div
                    key={card.label}
                    className="feature-card rounded-[30px] p-6 sm:p-7"
                  >
                    <div className="soft-pill inline-flex rounded-full px-4 py-2 text-[11px] text-white/62">
                      {card.label}
                    </div>

                    <h2 className="mt-6 text-[30px] font-semibold leading-[1.04] tracking-[-0.04em] text-white">
                      {card.title}
                    </h2>

                    <p className="mt-4 text-sm leading-7 text-white/58">
                      {card.body}
                    </p>
                  </div>
                ))
              ) : (
                <div className="feature-card rounded-[30px] p-6 sm:p-7 lg:col-span-2">
                  <div className="soft-pill inline-flex rounded-full px-4 py-2 text-[11px] text-white/62">
                    No results yet
                  </div>
                  <h2 className="mt-6 text-[30px] font-semibold leading-[1.04] tracking-[-0.04em] text-white">
                    Run a scan to generate recommendations
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-white/58">
                    Upload a menu, shelf, or product photo and ShopRight will
                    generate ranked recommendations here.
                  </p>
                </div>
              )}
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="metric-panel rounded-[28px] p-6">
                <div className="text-[11px] uppercase tracking-[0.22em] text-white/36">
                  Overall reasoning
                </div>
                <h3 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-white">
                  The recommendation stack is built around usefulness, not noise.
                </h3>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-white/58">
                  {recommendations?.reasoning ??
                    "Once you run a scan, ShopRight will explain how it arrived at its best overall, best value, safe, and adventurous picks."}
                </p>
              </div>

              <div className="metric-panel rounded-[28px] p-6">
                <div className="text-[11px] uppercase tracking-[0.22em] text-white/36">
                  Extracted items
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {extractedItems.length > 0 ? (
                    extractedItems.map((item) => (
                      <span
                        key={typeof item === "string" ? item : item.id}
                        className="rounded-full border border-white/10 bg-white/6 px-3 py-1.5 text-xs text-white/74"
                      >
                        {typeof item === "string" ? item : item.name}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-white/56">
                      No extracted items available yet.
                    </span>
                  )}
                </div>

                <div className="mt-6 text-xs uppercase tracking-[0.16em] text-white/34">
                  {venueType} · confidence{" "}
                  {recommendations?.confidence?.toFixed(2) ?? "0.00"}
                </div>
              </div>
            </div>

            <div className="mt-10 rounded-[28px] border border-dashed border-white/10 bg-white/4 p-8 text-center">
              <div className="text-[11px] uppercase tracking-[0.24em] text-white/36">
                Next step
              </div>
              <h3 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-white">
                Share this result or run another live scan.
              </h3>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/56">
                ShopRight becomes more valuable as you build a history of scans,
                preferences, and stronger decision patterns over time.
              </p>
              <Link
                href="/scan"
                className="mt-6 inline-flex rounded-2xl border border-white/12 bg-white/6 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
              >
                Back to scan
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
