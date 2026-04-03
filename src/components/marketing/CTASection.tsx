import { Button } from "@/components/ui/Button";

export function CTASection() {
  return (
    <section id="intelligence" className="relative overflow-hidden">
      <div className="container-shell py-18 sm:py-22">
        <div className="glass-panel relative overflow-hidden rounded-[38px] px-6 py-10 sm:px-10 sm:py-14">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,130,92,0.14),transparent_26%),radial-gradient(circle_at_bottom_left,rgba(73,109,255,0.18),transparent_28%)]" />

          <div className="relative grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <div className="text-[11px] uppercase tracking-[0.26em] text-white/40">
                Strategic positioning
              </div>
              <h2 className="mt-4 max-w-4xl text-4xl font-semibold tracking-[-0.045em] text-white sm:text-5xl lg:text-6xl">
                A consumer product with a much bigger data and intelligence trajectory.
              </h2>
              <p className="mt-6 max-w-3xl text-[16px] leading-8 text-white/60">
                Start with menus, bars, shelves, and visible product choices.
                Build trust through immediate usefulness. Then deepen into taste
                memory, recommendation quality, and the long-term decision graph.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {[
                ["Category", "AI decision layer for real-world commerce"],
                ["Start wedge", "Food + drinks, then shelves and retail"],
                ["Long-term asset", "Taste + value + confidence graph"],
              ].map(([label, value]) => (
                <div key={label} className="metric-panel rounded-[24px] p-5">
                  <div className="text-[11px] uppercase tracking-[0.18em] text-white/36">
                    {label}
                  </div>
                  <div className="mt-2 text-sm leading-6 text-white/80">
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mt-10 flex flex-col gap-4 sm:flex-row">
            <Button href="/scan" size="lg">
              Launch scanner
            </Button>
            <Button href="/pricing" variant="secondary" size="lg">
              See subscription model
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
