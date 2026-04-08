"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { useScanStore } from "@/store/useScanStore";

const fallbackHistoryItems = [
  {
    id: "demo-restaurant-1",
    title: "Restaurant menu scan",
    venue: "Restaurant",
    time: "Today · 6:42 PM",
    summary:
      "Strong overall recommendation with a clear best value and dependable safe pick.",
    topPick: "House Burger",
  },
  {
    id: "demo-bar-1",
    title: "Bar tap list scan",
    venue: "Bar",
    time: "Yesterday · 8:11 PM",
    summary:
      "Balanced recommendation set with a higher-confidence best overall and a more exploratory option.",
    topPick: "Hazy IPA",
  },
  {
    id: "demo-retail-1",
    title: "Retail shelf scan",
    venue: "Retail",
    time: "Last week",
    summary:
      "ShopRight organized visible options into a cleaner shortlist based on likely value and confidence.",
    topPick: "Noise-Cancelling Headphones",
  },
];

function formatVenueLabel(venueType: string) {
  return venueType.charAt(0).toUpperCase() + venueType.slice(1);
}

function formatTimeLabel(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString([], {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function HistoryPage() {
  const { scanHistory, setLastSharedScan, incrementReferralCount } = useScanStore();

  const items =
    scanHistory.length > 0
      ? scanHistory.map((scan) => ({
          id: scan.id,
          title: `${formatVenueLabel(scan.venueType)} scan`,
          venue: formatVenueLabel(scan.venueType),
          time: formatTimeLabel(scan.createdAt),
          summary:
            scan.recommendations?.reasoning ||
            scan.overallSummary ||
            "ShopRight generated a ranked recommendation set from this scan.",
          topPick:
            scan.recommendations?.best_item?.item ||
            "Top recommendation unavailable",
        }))
      : fallbackHistoryItems;

  const handleCopyShareLink = async (id: string) => {
    const origin =
      typeof window !== "undefined" ? window.location.origin : "";

    const shareUrl = `${origin}/share/${id}`;

    await navigator.clipboard.writeText(shareUrl);
    setLastSharedScan(id);
    incrementReferralCount();
  };

  return (
    <main className="relative min-h-screen">
      <div className="site-grid" />
      <Header />

      <section className="section-divider">
        <div className="container-shell py-16 sm:py-20">
          <div className="glass-panel rounded-[34px] px-6 py-8 sm:px-10 sm:py-10">
            <div className="max-w-3xl">
              <div className="text-[11px] uppercase tracking-[0.26em] text-white/40">
                Scan history
              </div>
              <h1 className="mt-4 text-4xl font-semibold tracking-[-0.045em] text-white sm:text-5xl">
                Past recommendation sessions in one place.
              </h1>
              <p className="mt-5 max-w-2xl text-[16px] leading-8 text-white/58">
                Review previous scans, revisit strong picks, and build a more
                useful long-term decision memory over time.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button href="/scan" size="lg">
                New scan
              </Button>
              <Button href="/pricing" variant="secondary" size="lg">
                Upgrade intelligence
              </Button>
            </div>

            <div className="mt-10 grid gap-5">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="metric-panel rounded-[28px] p-6"
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                    <div className="max-w-3xl">
                      <div className="soft-pill inline-flex rounded-full px-4 py-2 text-[11px] text-white/64">
                        {item.venue}
                      </div>
                      <h2 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-white">
                        {item.title}
                      </h2>
                      <p className="mt-3 text-sm leading-7 text-white/58">
                        {item.summary}
                      </p>

                      <div className="mt-5">
                        <button
                          type="button"
                          onClick={() => void handleCopyShareLink(item.id)}
                          className="rounded-2xl border border-white/12 bg-white/6 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
                        >
                          Copy share link
                        </button>
                      </div>
                    </div>

                    <div className="min-w-[220px] rounded-[22px] border border-white/10 bg-white/5 p-5">
                      <div className="text-[11px] uppercase tracking-[0.18em] text-white/36">
                        Top pick
                      </div>
                      <div className="mt-2 text-lg font-semibold text-white">
                        {item.topPick}
                      </div>
                      <div className="mt-4 text-xs uppercase tracking-[0.16em] text-white/34">
                        {item.time}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-[28px] border border-dashed border-white/10 bg-white/4 p-8 text-center">
              <div className="text-[11px] uppercase tracking-[0.24em] text-white/36">
                Coming next
              </div>
              <h3 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-white">
                Persistent memory, saved preferences, and richer scan analytics.
              </h3>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/56">
                The strongest version of ShopRight keeps getting better as it
                remembers what works for you and turns past decisions into a
                sharper future recommendation layer.
              </p>
              <a
                href="/scan"
                className="mt-6 inline-flex rounded-2xl border border-white/12 bg-white/6 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
              >
                Go back to scanner
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
