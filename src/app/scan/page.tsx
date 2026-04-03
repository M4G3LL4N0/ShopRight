import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";

const venueTypes = [
  "Restaurant",
  "Bar",
  "Grocery",
  "Retail",
  "Electronics",
];

const scanHighlights = [
  {
    title: "Best Overall",
    body: "Find the strongest first-choice option without digging through scattered reviews.",
  },
  {
    title: "Best Value",
    body: "Surface the option that gives the best balance of quality and price.",
  },
  {
    title: "Safe Pick",
    body: "Reduce downside risk with a dependable recommendation for most people.",
  },
  {
    title: "Adventurous Pick",
    body: "Get a higher-upside option when you want something less obvious.",
  },
];

export default function ScanPage() {
  const {
    venueType,
    setVenueType,
    selectedImagePreview,
    error,
    loading,
    setImage,
    clearImage,
    setLoading,
    setError,
    markAnalyzed,
    setExtractedItems,
    setRecommendations
  } = useScanStore()

  const handleImageUpload = async (file: File) => {
    try {
      setLoading(true)
      setError(null)
      
      const preview = URL.createObjectURL(file)
      setImage(file, preview)

      // Convert to base64 and validate
      const base64 = await convertToBase64(file)
      
      // Call analyze API
      const analysis = await analyzeImage({
        imageBase64: base64,
        venueType
      })

      setExtractedItems(analysis.extractedItems)

      // Call recommendation API
      const recommendations = await generateRecommendations({
        extractedItems: analysis.extractedItems,
        venueType
      })

      setRecommendations(recommendations)
      markAnalyzed()
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
      clearImage()
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="relative min-h-screen">
      <div className="site-grid" />
      <Header />

      <section className="section-divider">
        <div className="container-shell py-16 sm:py-20">
          <div className="glass-panel rounded-[34px] px-6 py-8 sm:px-10 sm:py-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-end">
              <div>
                <div className="text-[11px] uppercase tracking-[0.26em] text-white/40">
                  Live scanner
                </div>
                <h1 className="mt-4 text-4xl font-semibold tracking-[-0.045em] text-white sm:text-5xl">
                  Turn camera input into a clearer buying decision.
                </h1>
              </div>

              <p className="max-w-2xl text-[16px] leading-8 text-white/58 lg:justify-self-end">
                ShopRight is designed for the exact moment you are choosing from
                a menu, shelf, tap list, or product display and want a cleaner,
                faster answer.
              </p>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="feature-card rounded-[30px] p-6 sm:p-7">
                <div className="soft-pill inline-flex rounded-full px-4 py-2 text-[11px] text-white/62">
                  Upload surface
                </div>

                <h2 className="mt-6 text-[30px] font-semibold leading-[1.04] tracking-[-0.04em] text-white">
                  Premium scan entry point
                </h2>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-white/58">
                  This is the premium shell for the real scanner flow. It should
                  evolve into drag and drop upload, live camera capture, OCR,
                  extraction, and ranked AI recommendations.
                </p>

                <div className="mt-8 rounded-[28px] border border-dashed border-white/12 bg-white/[0.04] p-10 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[20px] border border-white/10 bg-white/6 text-white/76">
                    SR
                  </div>

                  <h3 className="mt-5 text-2xl font-semibold tracking-[-0.03em] text-white">
                    Upload a menu, shelf, or product photo
                  </h3>

                  <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-white/56">
                    Drag and drop will go here. This page is now a valid premium
                    module and can be wired into the real scan engine next.
                  </p>

                  <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:justify-center">
                    <Button href="/results" size="lg">
                      View demo results
                    </Button>
                    <Button href="/pricing" variant="secondary" size="lg">
                      Unlock premium intelligence
                    </Button>
                  </div>
                </div>
              </div>

              <div className="grid gap-5">
                <div className="metric-panel rounded-[28px] p-6">
                  <div className="text-[11px] uppercase tracking-[0.22em] text-white/36">
                    Venue types
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {venueTypes.map((type) => (
                      <span
                        key={type}
                        className="rounded-full border border-white/10 bg-white/6 px-3 py-1.5 text-xs text-white/74"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="metric-panel rounded-[28px] p-6">
                  <div className="text-[11px] uppercase tracking-[0.22em] text-white/36">
                    Recommendation outputs
                  </div>

                  <div className="mt-4 grid gap-3">
                    {scanHighlights.map((item) => (
                      <div
                        key={item.title}
                        className="rounded-[20px] border border-white/10 bg-white/5 p-4"
                      >
                        <div className="text-sm font-semibold text-white">
                          {item.title}
                        </div>
                        <p className="mt-2 text-sm leading-6 text-white/56">
                          {item.body}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="metric-panel rounded-[28px] p-6">
                  <div className="text-[11px] uppercase tracking-[0.22em] text-white/36">
                    Product direction
                  </div>
                  <h3 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-white">
                    This page should feel premium before the full logic is wired in.
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-white/58">
                    The goal is to keep the visual system strong while the real
                    scanner, extraction, and recommendation pipeline are added
                    step by step.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 rounded-[28px] border border-dashed border-white/10 bg-white/4 p-8 text-center">
              <div className="text-[11px] uppercase tracking-[0.24em] text-white/36">
                Build path
              </div>
              <h3 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-white">
                Next: connect this surface to the real upload and analysis flow.
              </h3>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/56">
                This fixes the broken module problem cleanly and preserves the
                premium site direction while you stabilize the rest of the app.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
