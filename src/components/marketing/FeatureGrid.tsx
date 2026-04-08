const cards = [
  {
    tag: "Restaurant Intelligence",
    title: "Know what is actually worth ordering.",
    body: "Turn dense menus into ranked choices with a best overall pick, safest option, strongest value, and higher-upside adventurous recommendation.",
  },
  {
    tag: "Bar + Beverage Layer",
    title: "Use ratings logic without opening five apps.",
    body: "Make better drink decisions with a cleaner way to interpret tap lists and beverage-heavy environments in real time.",
  },
  {
    tag: "Retail Decision Support",
    title: "Bring the same logic to shelves and product walls.",
    body: "Extend the decision engine into beauty, fashion, electronics, and general retail where choice overload is highest.",
  },
  {
    tag: "Taste Memory",
    title: "Recommendations improve when the system remembers you.",
    body: "Preference memory gives ShopRight a stronger long-term edge than generic reviews because it learns what consistently works for you.",
  },
  {
    tag: "Value + Trust Layer",
    title: "Not just what is popular — what is worth it.",
    body: "Blend taste fit, perceived value, reliability, and confidence into a more useful decision model than raw ratings alone.",
  },
  {
    tag: "Platform Direction",
    title: "Designed as a category, not a single feature.",
    body: "ShopRight is the AI decision layer for real-world commerce, with room to grow from food and drink into broader buying intelligence.",
  },
];

export function FeatureGrid() {
  return (
    <section id="product" className="section-divider">
      <div className="container-shell py-18 sm:py-22">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <div className="text-[11px] uppercase tracking-[0.26em] text-white/40">
              Product surface
            </div>
            <h2 className="mt-4 max-w-2xl text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
              Premium product framing with a bigger strategic shape.
            </h2>
          </div>
          <p className="max-w-2xl text-[15px] leading-7 text-white/58 lg:justify-self-end">
            The strongest version of ShopRight is not a review app. It is a
            real-world intelligence layer that helps people decide faster and
            better wherever buying hesitation appears.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {cards.map((card) => (
            <div 
              key={card.title} 
              className="feature-card p-6 sm:p-7 hover:border-white/20 transition-all duration-300"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="soft-pill inline-flex rounded-full px-4 py-2 text-[11px] text-white/62">
                {card.tag}
              </div>
              <h3 className="mt-6 text-[27px] font-semibold leading-[1.08] tracking-[-0.03em] text-white">
                {card.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-white/58">{card.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
