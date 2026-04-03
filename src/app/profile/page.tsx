import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";

const preferenceGroups = [
  {
    title: "Food preferences",
    description:
      "Shape recommendations around the kinds of meals and ingredients you consistently prefer.",
    items: [
      "Favorite cuisines",
      "Disliked ingredients",
      "Spice tolerance",
      "Dietary restrictions",
    ],
  },
  {
    title: "Drink preferences",
    description:
      "Make beverage recommendations sharper by capturing taste patterns and comfort zones.",
    items: [
      "Beer or cocktail preferences",
      "Sweet vs dry preference",
      "Adventurousness level",
      "Alcohol comfort profile",
    ],
  },
  {
    title: "Shopping preferences",
    description:
      "Carry the same intelligence into shelves, retail, beauty, and electronics decisions.",
    items: [
      "Price sensitivity",
      "Favorite brands",
      "Style direction",
      "Quality vs value balance",
    ],
  },
];

export default function ProfilePage() {
  return (
    <main className="relative min-h-screen">
      <div className="site-grid" />
      <Header />

      <section className="section-divider">
        <div className="container-shell py-16 sm:py-20">
          <div className="glass-panel rounded-[34px] px-6 py-8 sm:px-10 sm:py-10">
            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
              <div>
                <div className="text-[11px] uppercase tracking-[0.26em] text-white/40">
                  Preference profile
                </div>
                <h1 className="mt-4 text-4xl font-semibold tracking-[-0.045em] text-white sm:text-5xl">
                  Teach ShopRight what fits your taste.
                </h1>
              </div>

              <p className="max-w-2xl text-[16px] leading-8 text-white/58 lg:justify-self-end">
                The product gets more valuable when it remembers what you
                consistently like, avoid, and consider worth it. This page is
                the foundation for a much stronger recommendation layer.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button href="/scan" size="lg">
                Start a scan
              </Button>
              <Button href="/pricing" variant="secondary" size="lg">
                Unlock deeper personalization
              </Button>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {preferenceGroups.map((group) => (
                <div
                  key={group.title}
                  className="feature-card rounded-[30px] p-6 sm:p-7"
                >
                  <div className="soft-pill inline-flex rounded-full px-4 py-2 text-[11px] text-white/62">
                    Preference layer
                  </div>

                  <h2 className="mt-6 text-[28px] font-semibold leading-[1.06] tracking-[-0.035em] text-white">
                    {group.title}
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-white/58">
                    {group.description}
                  </p>

                  <div className="mt-6 space-y-3">
                    {group.items.map((item) => (
                      <div
                        key={item}
                        className="metric-panel rounded-[20px] px-4 py-3 text-sm text-white/74"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="metric-panel rounded-[28px] p-6">
                <div className="text-[11px] uppercase tracking-[0.22em] text-white/36">
                  Why this matters
                </div>
                <h3 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-white">
                  Better memory creates better recommendations.
                </h3>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-white/58">
                  A generic rating is useful once. A system that understands how
                  you eat, drink, shop, and prioritize value becomes
                  increasingly useful every time you open it.
                </p>
              </div>

              <div className="metric-panel rounded-[28px] p-6">
                <div className="text-[11px] uppercase tracking-[0.22em] text-white/36">
                  Next step
                </div>
                <h3 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-white">
                  Preference-aware scanning is the real upgrade path.
                </h3>
                <p className="mt-4 text-sm leading-7 text-white/58">
                  Build the scanner first, then deepen the intelligence layer
                  through preferences, saved history, and stronger confidence
                  scoring.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
