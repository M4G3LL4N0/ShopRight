import { Button } from "../ui/Button";
import { GlassCard } from "../ui/GlassCard";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function CTASection() {
  return (
    <section className="container mx-auto px-6 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-8">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            Ready to Transform Your Shopping?
          </h2>
          <p className="text-lg text-muted-foreground">
            ShopRight is the AI decision layer for real-world commerce. Start your free 
            trial today and experience the future of shopping intelligence.
          </p>
          <div className="flex gap-4">
            <Button size="lg">
              Start Free Trial
            </Button>
            <Button variant="outline" size="lg">
              Schedule Demo
            </Button>
          </div>
        </div>

        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4">
              <Image
                className="w-12 h-12"
                src="/trust.svg"
                alt="Trust icon"
                width={24}
                height={24}
                priority
              />
              <div>
                <h3 className="text-xl font-semibold">Trusted by Shoppers Worldwide</h3>
                <p className="text-lg text-muted-foreground">
                  Over 1M active users across 50+ countries rely on ShopRight for smarter 
                  shopping decisions.
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-4">
                <Image
                  className="w-12 h-12"
                  src="/scale.svg"
                  alt="Scale icon"
                  width={24}
                  height={24}
                  priority
                />
                <div>
                  <h3 className="text-xl font-semibold">Enterprise-Grade Intelligence</h3>
                  <p className="text-lg text-muted-foreground">
                    Built on OpenAI's GPT-4 and continuously learning from millions of 
                    real shopping scenarios.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
