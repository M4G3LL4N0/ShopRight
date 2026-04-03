import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";

const resultCards = [
  {
    label: "Best Overall",
    title: "House Burger",
    body: "Strong all-around choice with broad appeal, high satisfaction likelihood, and the clearest overall recommendation profile.",
  },
  {
    label: "Best Value",
    title: "Margherita Pizza",
    body: "Best balance of quality and perceived price-to-satisfaction ratio among the visible options.",
  },
  {
    label: "Safe Pick",
    title: "Grilled Salmon",
    body: "Dependable option with lower downside risk and broad compatibility for most users.",
  },
  {
    label: "Adventurous Pick",
    title: "Chef’s Special",
    body: "Higher-upside exploratory choice for someone open to a less obvious but potentially more memorable selection.",
  },
];

const extractedItems = [
  "House Burger",
  "Margherita Pizza",
  "Grilled Salmon",
  "Caesar Salad",
  "Fries",
  "Chef’s Special",
];

export default function ResultsPage() {
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
              <Button href="/history" variant="secondary" size="lg">
                View history
              </Button>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-2">
              {resultCards.map((card) => (
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
              ))}
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
                  Instead of forcing users to parse scattered opinions, ShopRight
                  reduces the decision into a cleaner ranking structure based on
                  likely appeal, value, safety, and exploration potential.
                </p>
              </div>

              <div className="metric-panel rounded-[28px] p-6">
                <div className="text-[11px] uppercase tracking-[0.22em] text-white/36">
                  Extracted items
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {extractedItems.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-white/6 px-3 py-1.5 text-xs text-white/74"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-6 text-xs uppercase tracking-[0.16em] text-white/34">
                  Confidence 0.84
                </div>
              </div>
            </div>

            <div className="mt-10 rounded-[28px] border border-dashed border-white/10 bg-white/4 p-8 text-center">
              <div className="text-[11px] uppercase tracking-[0.24em] text-white/36">
                Next step
              </div>
              <h3 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-white">
                Push this into a real live scanner and connected recommendation engine.
              </h3>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/56">
                This page is the premium results surface. The next layer is
                wiring the real scan state and AI outputs into this layout so it
                becomes a true product experience instead of a static demo.
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
