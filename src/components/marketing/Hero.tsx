import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="section-divider relative overflow-hidden">
      <div className="container-shell relative py-20 sm:py-24 lg:py-28">
        <div className="glass-panel relative overflow-hidden rounded-[38px] px-6 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-18">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(66,104,255,0.18),transparent_22%),radial-gradient(circle_at_82%_20%,rgba(57,208,255,0.12),transparent_22%)]" />

          <div className="relative grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="soft-pill inline-flex rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.26em] text-white/58">
                Camera-first purchase intelligence
              </div>

              <h1 className="hero-title mt-7 max-w-5xl text-[46px] font-semibold text-white sm:text-[66px] lg:text-[92px]">
                Decide what is worth buying{" "}
                <span className="hero-gradient">before you buy it.</span>
              </h1>

              <p className="mt-7 max-w-3xl text-[17px] leading-8 text-white/62 sm:text-[19px]">
                ShopRight turns menus, tap lists, shelves, and product displays
                into ranked recommendations with taste, value, trust, and
                confidence built directly into the moment of choice.
              </p>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <Button href="/scan" size="lg">
                  Open the scanner
                </Button>
                <Button href="/pricing" variant="secondary" size="lg">
                  Explore pricing
                </Button>
              </div>

              <div className="mt-10 grid max-w-3xl gap-4 sm:grid-cols-3">
                {[
                  ["Food + Drinks", "Menus, taps, cafés, bars"],
                  ["Retail + Shelves", "Fashion, beauty, electronics"],
                  ["Taste + Value", "Preference-aware recommendations"],
                ].map(([label, value]) => (
                  <div key={label} className="metric-panel rounded-[22px] p-4">
                    <div className="text-[11px] uppercase tracking-[0.18em] text-white/38">
                      {label}
                    </div>
                    <div className="mt-2 text-sm leading-6 text-white/78">
                      {value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="poster-card bg-[linear-gradient(145deg,rgba(73,100,255,0.24),rgba(17,24,42,0.92)_36%,rgba(5,10,20,0.95)_100%)] p-3 sm:p-4">
                <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(100,190,255,0.14),transparent_24%),linear-gradient(180deg,rgba(8,16,32,0.72),rgba(6,10,18,0.92))] p-5">
                  <div className="soft-pill inline-flex rounded-full px-4 py-2 text-[11px] text-white/64">
                    Live recommendation preview
                  </div>

                  <div className="mt-5 rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(42,111,255,0.18),rgba(5,12,24,0.22)_58%,rgba(6,10,18,0.1))] p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-[11px] uppercase tracking-[0.18em] text-white/38">
                          Best Overall
                        </div>
                        <div className="mt-2 text-[30px] font-semibold tracking-tight text-white">
                          House Burger
                        </div>
                      </div>
                      <div className="soft-pill rounded-full px-3 py-1.5 text-xs text-white/68">
                        confidence 0.84
                      </div>
                    </div>

                    <p className="mt-4 text-sm leading-6 text-white/62">
                      Broad appeal, strong perceived value, and the highest
                      likelihood of satisfaction for a first-choice order.
                    </p>
                  </div>

                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    {[
                      ["Best Value", "Margherita Pizza"],
                      ["Safe Pick", "Grilled Salmon"],
                      ["Adventurous Pick", "Chef’s Special"],
                      ["Venue Type", "Restaurant"],
                    ].map(([label, value], i) => (
                      <div
                        key={label}
                        className={`rounded-[22px] border border-white/10 p-4 ${
                          i % 2 === 0 ? "bg-white/6" : "bg-white/4"
                        }`}
                      >
                        <div className="text-[11px] uppercase tracking-[0.18em] text-white/38">
                          {label}
                        </div>
                        <div className="mt-2 text-sm font-medium text-white/84">
                          {value}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-[24px] border border-white/10 bg-white/[0.04] p-4">
                    <div className="text-[11px] uppercase tracking-[0.18em] text-white/38">
                      Extracted items
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {["Burger", "Pizza", "Salmon", "Caesar", "Fries"].map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-white/10 bg-white/6 px-3 py-1.5 text-xs text-white/72"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative mt-14 grid gap-4 md:grid-cols-3">
            {[
              ["Fast", "Move from uncertainty to a confident choice in seconds."],
              ["Useful", "See what is best, safest, strongest value, or worth trying."],
              ["Scalable", "Built to expand from menus into retail, shelves, and more."],
            ].map(([title, body]) => (
              <div key={title} className="metric-panel rounded-[24px] p-5">
                <div className="text-sm font-semibold text-white">{title}</div>
                <p className="mt-2 text-sm leading-6 text-white/58">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
