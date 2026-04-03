import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export default function PricingPage() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "A clean way to try ShopRight and experience the core scan flow.",
      features: [
        "Limited scans each month",
        "Best overall, value, safe, and adventurous picks",
        "Basic recommendation summaries",
        "Core menu and shelf scan experience",
      ],
      cta: {
        text: "Start free",
        href: "/scan",
      },
      featured: false,
    },
    {
      name: "Pro",
      price: "$19",
      period: "/month",
      description:
        "For people who want smarter recommendations, memory, and a sharper buying edge.",
      features: [
        "More monthly scans",
        "Preference-aware recommendations",
        "Saved scan history",
        "Stronger confidence and reasoning layers",
        "Priority access to new categories",
      ],
      cta: {
        text: "Go Pro",
        href: "/scan",
      },
      featured: true,
    },
    {
      name: "Power User",
      price: "$49",
      period: "/month",
      description:
        "For heavy users who want the deepest recommendation layer and future premium capabilities.",
      features: [
        "High scan volume",
        "Advanced preference memory",
        "Priority feature access",
        "Expanded category support",
        "Early access to premium intelligence features",
      ],
      cta: {
        text: "Join Power User",
        href: "/scan",
      },
      featured: false,
    },
  ];

  const faqs = [
    {
      question: "What does ShopRight actually do?",
      answer:
        "ShopRight turns photos of menus, shelves, taps, and product displays into ranked recommendations so you can make better buying decisions in the real world.",
    },
    {
      question: "Is this only for restaurants?",
      answer:
        "No. The product starts with food and drink use cases, but it is designed as a broader decision layer for retail, electronics, and other real-world shopping environments.",
    },
    {
      question: "Why would I pay for it?",
      answer:
        "The paid tiers are built around more scans, richer personalization, stronger memory, and a sharper recommendation engine that gets more useful over time.",
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-white/45">
            Pricing
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            Pricing for better decisions.
          </h1>
          <p className="mt-4 text-base leading-7 text-white/65">
            Start free, then unlock deeper recommendation intelligence,
            preference memory, and a more powerful real-world buying workflow.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <GlassCard
              key={plan.name}
              className={cn(
                "rounded-[2rem] p-8",
                plan.featured
                  ? "border-white/20 bg-white/8 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]"
                  : ""
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-white/75">{plan.name}</p>
                  <div className="mt-4 flex items-end gap-1">
                    <span className="text-4xl font-semibold tracking-tight">
                      {plan.price}
                    </span>
                    {plan.period ? (
                      <span className="pb-1 text-sm text-white/45">
                        {plan.period}
                      </span>
                    ) : null}
                  </div>
                </div>

                {plan.featured ? (
                  <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-white/75">
                    Popular
                  </span>
                ) : null}
              </div>

              <p className="mt-5 text-sm leading-6 text-white/65">
                {plan.description}
              </p>

              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="text-sm leading-6 text-white/78">
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <Button
                  href={plan.cta.href}
                  className="w-full"
                  variant={plan.featured ? "primary" : "secondary"}
                >
                  {plan.cta.text}
                </Button>
              </div>
            </GlassCard>
          ))}
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <GlassCard className="rounded-[2rem] p-8">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-white/45">
              Why paid tiers matter
            </p>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight">
              ShopRight gets more valuable when it remembers what works for you.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/65">
              The long-term value is not just running scans. It is building a
              sharper recommendation layer around your taste, your priorities,
              and the choices that repeatedly prove worth it.
            </p>
          </GlassCard>

          <GlassCard className="rounded-[2rem] p-8">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-white/45">
              CTA
            </p>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight">
              Start with one scan.
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/65">
              The easiest way to understand the product is to use it in a real
              decision moment.
            </p>
            <div className="mt-6">
              <Button href="/scan" className="w-full">
                Scan now
              </Button>
            </div>
          </GlassCard>
        </div>

        <div className="mt-16">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-white/45">
            FAQ
          </p>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {faqs.map((faq) => (
              <GlassCard key={faq.question} className="rounded-[2rem] p-6">
                <h3 className="text-lg font-semibold tracking-tight">
                  {faq.question}
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/65">
                  {faq.answer}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
