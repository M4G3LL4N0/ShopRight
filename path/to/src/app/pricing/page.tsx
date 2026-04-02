import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export default function PricingPage() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      features: [
        "Unlimited scans per month",
        "Basic preference memory",
        "Standard recommendation confidence",
        "Access to scan history",
      ],
      cta: { text: "Start Free", href: "/scan" },
      highlight: false,
    },
    {
      name: "Pro",
      price: "$19.99/mo",
      features: [
        "Unlimited scans per month",
        "Advanced preference memory",
        "Smart personalized recommendations",
        "Premium confidence scoring",
        "Priority support",
      ],
      cta: { text: "Upgrade to Pro", href: "/subscribe/pro" },
      highlight: true,
    },
    {
      name: "Concierge",
      price: "$49.99/mo",
      features: [
        "Unlimited scans per month",
        "Advanced preference memory",
        "Smart personalized recommendations",
        "Premium confidence scoring",
        "Retail & alcohol category expansion",
        "Dedicated account manager",
        "24/7 priority support",
      ],
      cta: { text: "Get Concierge", href: "/subscribe/concierge" },
      highlight: false,
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-white/5 to-white dark:from-black/5 dark:to-black/5 py-20">
      <section className="container mx-auto px-6 text-center mb-20">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          Pricing for Purchase Intelligence
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Choose the plan that matches your shopping intelligence needs. From free 
          experimentation to enterprise-grade concierge service, ShopRight provides 
          the AI-powered decision layer for modern commerce.
        </p>
      </section>

      <section className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {plans.map((plan) => (
          <GlassCard
            key={plan.name}
            title={plan.name}
            subtitle={plan.price}
            accent={plan.highlight ? "bg-primary/10" : "bg-white/10"}
            className={cn(plan.highlight && "border-2 border-primary")}
          >
            <ul className="space-y-2 text-left text-gray-700 dark:text-gray-300">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-2 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Button asChild className="w-full">
                <a href={plan.cta.href}>{plan.cta.text}</a>
              </Button>
            </div>
          </GlassCard>
        ))}
      </section>

      <section className="container mx-auto px-6 text-center mb-20">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
          Frequently Asked Questions
        </h2>
        <dl className="space-y-6 max-w-3xl mx-auto text-left">
          <div>
            <dt className="font-medium text-gray-800 dark:text-gray-200">
              What is the difference between Pro and Concierge?
            </dt>
            <dd className="mt-1 text-gray-600 dark:text-gray-300">
              Pro gives you unlimited scans, advanced preference memory, and premium 
              confidence scoring. Concierge adds retail & alcohol category expansion, 
              a dedicated account manager, and 24/7 priority support for 
              enterprise-grade usage.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-gray-800 dark:text-gray-200">
              How does the confidence scoring work?
            </dt>
            <dd className="mt-1 text-gray-600 dark:text-gray-300">
              Our AI model assigns a confidence score to each recommendation based on 
              historical accuracy, user feedback, and contextual relevance. Premium 
              plans expose the full confidence range and allow you to filter results.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-gray-800 dark:text-gray-200">
              Can I cancel or downgrade my plan at any time?
            </dt>
            <dd className="mt-1 text-gray-600 dark:text-gray-300">
              Yes. All plans are billed monthly and can be changed or cancelled from 
              your account dashboard without any penalty.
            </dd>
          </div>
        </dl>
      </section>

      <section className="container mx-auto px-6 text-center">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
          Trusted by Shoppers Worldwide
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          ShopRight powers over 1M active users across 50+ countries, helping them 
          save time, money, and stress. Our AI is built on top of OpenAI’s GPT-4 and 
          continuously learns from millions of real shopping scenarios.
        </p>
      </section>
    </main>
  );
}
