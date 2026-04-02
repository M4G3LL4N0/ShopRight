import { GlassCard } from "../ui/GlassCard";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function HowItWorks() {
  return (
    <section className="container mx-auto px-6 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-8">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            How ShopRight Works
          </h2>
          <p className="text-lg text-muted-foreground">
            ShopRight's AI engine transforms your camera into purchase intelligence. 
            Scan products, menus, or shelves to get instant, confidence-scored 
            recommendations across food, drinks, and retail.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-4">
                <Image
                  className="w-12 h-12"
                  src="/scan.svg"
                  alt="Scan icon"
                  width={24}
                  height={24}
                  priority
                />
                <div>
                  <h3 className="text-xl font-semibold">1. Scan</h3>
                  <p className="text-lg text-muted-foreground">
                    Point your camera at products, menus, or shelves to capture visual data.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-4">
                <Image
                  className="w-12 h-12"
                  src="/analyze.svg"
                  alt="Analyze icon"
                  width={24}
                  height={24}
                  priority
                />
                <div>
                  <h3 className="text-xl font-semibold">2. Analyze</h3>
                  <p className="text-lg text-muted-foreground">
                    Our AI engine processes visual data to extract product details and 
                    generate confidence-scored recommendations.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-4">
                <Image
                  className="w-12 h-12"
                  src="/recommend.svg"
                  alt="Recommend icon"
                  width={24}
                  height={24}
                  priority
                />
                <div>
                  <h3 className="text-xl font-semibold">3. Recommend</h3>
                  <p className="text-lg text-muted-foreground">
                    Receive personalized, confidence-scored recommendations tailored 
                    to your preferences and purchase history.
                  </p>
                </div>
              </div>
            </div>
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
                <h3 className="text-xl font-semibold">Trust & Preferences</h3>
                <p className="text-lg text-muted-foreground">
                  Build a trust graph that evolves with your shopping habits, 
                  continuously refining recommendations based on your choices.
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
                  <h3 className="text-xl font-semibold">Scale with Confidence</h3>
                  <p className="text-lg text-muted-foreground">
                    As your shopping needs grow, ShopRight scales with you, providing 
                    enterprise-grade intelligence for food, drinks, and retail.
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
