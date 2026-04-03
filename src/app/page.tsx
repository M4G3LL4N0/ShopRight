import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/marketing/Hero";
import { FeatureGrid } from "@/components/marketing/FeatureGrid";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { CTASection } from "@/components/marketing/CTASection";

const showcaseTiles = [
  {
    tag: "Restaurants / Menus",
    title: "Food decision intelligence",
    body: "See the strongest order, cleanest safe pick, and best value without bouncing between review sites.",
    palette:
      "from-[rgba(61,108,255,0.85)] via-[rgba(20,40,91,0.65)] to-[rgba(8,13,24,0.92)]",
  },
  {
    tag: "Bars / Drinks",
    title: "Beverage recommendation layer",
    body: "Make better bar and tap-list decisions with a clearer way to interpret drink-heavy environments.",
    palette:
      "from-[rgba(34,196,255,0.85)] via-[rgba(14,67,98,0.62)] to-[rgba(8,13,24,0.92)]",
  },
  {
    tag: "Retail / Shelves",
    title: "Retail visibility engine",
    body: "Extend the same camera-first decision flow into shelves, product displays, and high-choice stores.",
    palette:
      "from-[rgba(112,92,255,0.84)] via-[rgba(42,28,86,0.60)] to-[rgba(8,13,24,0.92)]",
  },
  {
    tag: "Trust / Value",
    title: "Confidence-aware picks",
    body: "Surface what is worth the money, not just what is most visible or most hyped.",
    palette:
      "from-[rgba(76,214,181,0.82)] via-[rgba(18,74,65,0.6)] to-[rgba(8,13,24,0.92)]",
  },
  {
    tag: "Taste / Memory",
    title: "Preference-aware recommendations",
    body: "Build a system that remembers what works for you and sharpens future choices over time.",
    palette:
      "from-[rgba(255,129,87,0.84)] via-[rgba(93,42,23,0.6)] to-[rgba(8,13,24,0.92)]",
  },
  {
    tag: "Platform Direction",
    title: "Decision OS for commerce",
    body: "Position ShopRight as the intelligence layer above fragmented real-world buying behavior.",
    palette:
      "from-[rgba(255,99,182,0.78)] via-[rgba(82,27,58,0.58)] to-[rgba(8,13,24,0.92)]",
  },
];

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <div className="site-grid" />
      <Header />
      <Hero />
      <FeatureGrid />

      <section className="section-divider">
        <div className="container-shell py-18 sm:py-22">
          <div className="glass-panel rounded-[36px] px-6 py-8 sm:px-10 sm:py-10">
            <div className="max-w-4xl">
              <div className="text-[11px] uppercase tracking-[0.26em] text-white/38">
                Product surface showcase
              </div>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.045em] text-white sm:text-5xl">
                A premium venture-style homepage with real visual weight.
              </h2>
              <p className="mt-5 max-w-3xl text-[16px] leading-8 text-white/58">
                ShopRight should feel like a serious category-defining startup,
                not a plain landing page. The visual system needs coordinated
                panels, stronger lighting, depth, and a sharper product story.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {showcaseTiles.map((tile) => (
                <div key={tile.title} className="poster-card min-h-[340px]">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${tile.palette}`}
                  />
                  <div className="relative flex h-full flex-col justify-between p-4">
                    <div className="soft-pill inline-flex w-fit rounded-full px-4 py-2 text-[11px] text-white/70">
                      {tile.tag}
                    </div>

                    <div className="mt-6 rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(8,12,22,0.08),rgba(8,12,22,0.84))] p-6 backdrop-blur-md">
                      <div className="text-[30px] font-semibold leading-[1.02] tracking-[-0.04em] text-white">
                        {tile.title}
                      </div>
                      <p className="mt-4 max-w-md text-sm leading-7 text-white/68">
                        {tile.body}
                      </p>

                      <div className="mt-6 flex gap-2">
                        {Array.from({ length: 4 }).map((_, i) => (
                          <div
                            key={i}
                            className="h-10 flex-1 rounded-[14px] border border-white/8 bg-white/6"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <HowItWorks />
      <CTASection />
      <Footer />
    </main>
  );
}
