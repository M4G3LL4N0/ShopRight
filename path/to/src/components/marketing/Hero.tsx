import { Button } from "../ui/Button";
import { GlassCard } from "../ui/GlassCard";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center justify-center">
          <div className="space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
              The AI Decision Layer<br />
              for Real-World Commerce
            </h1>
            <p className="text-lg text-muted-foreground">
              ShopRight transforms your camera into purchase intelligence, delivering 
              confidence-scored recommendations across food, drinks, and retail. 
              Our AI learns your preferences to deliver personalized buying insights 
              that evolve with your shopping habits.
            </p>
            <div className="flex gap-4">
              <Button size="lg">
                Start Free Trial
              </Button>
              <Button variant="outline" size="lg">
                See How It Works
              </Button>
            </div>
          </div>

          <div className="relative">
            <GlassCard className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Image
                    className="w-12 h-12 rounded-full"
                    src="/logo.svg"
                    alt="ShopRight logo"
                    width={24}
                    height={24}
                    priority
                  />
                  <div>
                    <h3 className="text-xl font-semibold">Camera-First Intelligence</h3>
                    <p className="text-lg text-muted-foreground">
                      Scan products, menus, or shelves to get instant, confidence-scored 
                      recommendations ranked by relevance.
                    </p>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}
