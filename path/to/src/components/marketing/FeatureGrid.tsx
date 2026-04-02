import { GlassCard } from "../ui/GlassCard";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function FeatureGrid() {
  return (
    <section className="container mx-auto px-6 py-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <Image
              className="w-12 h-12 rounded-full"
              src="/camera.svg"
              alt="Camera icon"
              width={24}
              height={24}
              priority
            />
            <div>
              <h3 className="text-xl font-semibold">Camera-First Intelligence</h3>
              <p className="text-lg text-muted-foreground">
                Scan products, menus, or shelves with our AI engine to extract 
                product details and generate confidence-scored recommendations.
              </p>
            </div>
          </div>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Image
                className="w-12 h-12"
                src="/graph.svg"
                alt="Graph icon"
                width={24}
                height={24}
                priority
              />
              <div>
                <h3 className="text-xl font-semibold">Confidence-Scored Recommendations</h3>
                <p className="text-lg text-muted-foreground">
                  Get AI-powered recommendations with confidence scores, ranked by 
                  relevance and personalized to your preferences.
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Image
                className="w-12 h-12"
                src="/chart.svg"
                alt="Chart icon"
                width={24}
                height={24}
                priority
              />
              <div>
                <h3 className="text-xl font-semibold">Trust & Preference Graph</h3>
                <p className="text-lg text-muted-foreground">
                  Build a trust graph that evolves with your shopping habits, 
                  delivering increasingly accurate recommendations over time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
