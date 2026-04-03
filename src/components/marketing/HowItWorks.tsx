const steps = [
  {
    number: "01",
    title: "Capture the moment of choice",
    body: "Upload a menu, shelf, product display, or tap list right when you need to decide.",
  },
  {
    number: "02",
    title: "Extract visible options",
    body: "ShopRight structures what it sees into a decision set instead of leaving you buried in noise.",
  },
  {
    number: "03",
    title: "Apply taste, value, and trust logic",
    body: "Recommendations are framed around what is best overall, best value, safest, or most interesting to try.",
  },
  {
    number: "04",
    title: "Move with confidence",
    body: "Choose faster, bounce across fewer apps, and build a more useful pattern of decisions over time.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="section-divider">
      <div className="container-shell py-18 sm:py-22">
        <div className="glass-panel rounded-[34px] px-6 py-8 sm:px-10 sm:py-10">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <div className="text-[11px] uppercase tracking-[0.26em] text-white/40">
                How it works
              </div>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
                Built for decision speed without losing judgment quality.
              </h2>
            </div>

            <p className="max-w-2xl text-[15px] leading-7 text-white/58 lg:justify-self-end">
              The workflow is intentionally simple. The differentiation is the
              intelligence layer that turns visual clutter into clear, usable
              buying direction.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {steps.map((step) => (
              <div key={step.number} className="metric-panel rounded-[28px] p-6">
                <div className="text-[11px] uppercase tracking-[0.22em] text-white/38">
                  Step {step.number}
                </div>
                <h3 className="mt-4 text-[23px] font-semibold leading-[1.08] tracking-[-0.03em] text-white">
                  {step.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-white/58">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
