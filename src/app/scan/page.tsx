"use client";

import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { useScanStore } from "@/store/useScanStore";

const venueTypes = [
  { value: "restaurant", label: "Restaurant" },
  { value: "bar", label: "Bar" },
  { value: "grocery", label: "Grocery" },
  { value: "retail", label: "Retail" },
  { value: "electronics", label: "Electronics" },
] as const;

export default function ScanPage() {
  const router = useRouter();

  const {
    venueType,
    selectedImageFile,
    selectedImagePreview,
    loading,
    error,
    setVenueType,
    setImage,
    clearImage,
    setLoading,
    setError,
    setExtractedItems,
    setRecommendations,
    markAnalyzed,
  } = useScanStore();

  const handleImageUpload = async (file: File) => {
    const preview = URL.createObjectURL(file);
    setImage(file, preview);
    setError(null);
  };

  const fileToDataUrl = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(new Error("Failed to read image file."));
      reader.readAsDataURL(file);
    });

  const handleAnalyze = async () => {
    if (!selectedImageFile) {
      setError("Please upload an image first.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const image = await fileToDataUrl(selectedImageFile);

      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image,
          venueType,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Failed to analyze image.");
      }

      setExtractedItems(data.extractedItems ?? []);
      setRecommendations(data.recommendations ?? null);
      markAnalyzed();

      router.push("/results");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to analyze image.");
    } finally {
      setLoading(false);
    }
  };

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
                Upload a menu, tap list, shelf, or product display and turn the
                visible options into ranked recommendations.
              </p>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="feature-card rounded-[30px] p-6 sm:p-7">
                <div className="soft-pill inline-flex rounded-full px-4 py-2 text-[11px] text-white/62">
                  Scan input
                </div>

                <h2 className="mt-6 text-[30px] font-semibold leading-[1.04] tracking-[-0.04em] text-white">
                  Upload a photo to analyze
                </h2>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-white/58">
                  ShopRight works best with clear images of menus, shelves, tap
                  lists, and product displays.
                </p>

                <div className="mt-8 space-y-6">
                  <div>
                    <label className="mb-3 block text-[11px] uppercase tracking-[0.22em] text-white/38">
                      Venue type
                    </label>

                    <select
                      value={venueType}
                      onChange={(e) =>
                        setVenueType(
                          e.target.value as
                            | "restaurant"
                            | "bar"
                            | "grocery"
                            | "retail"
                            | "electronics"
                        )
                      }
                      className="w-full rounded-[20px] border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
                    >
                      {venueTypes.map((item) => (
                        <option
                          key={item.value}
                          value={item.value}
                          className="bg-[#0b1020]"
                        >
                          {item.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="rounded-[28px] border border-dashed border-white/12 bg-white/[0.04] p-8 text-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          void handleImageUpload(file);
                        }
                      }}
                      className="mx-auto block w-full max-w-md text-sm text-white/70 file:mr-4 file:rounded-2xl file:border-0 file:bg-white file:px-4 file:py-2 file:text-sm file:font-medium file:text-black"
                    />

                    <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/56">
                      Use a sharp, readable image for the best extraction and
                      recommendation results.
                    </p>
                  </div>

                  {selectedImagePreview ? (
                    <div className="rounded-[28px] border border-white/10 bg-white/5 p-4">
                      <img
                        src={selectedImagePreview}
                        alt="Selected preview"
                        className="max-h-[460px] w-full rounded-[22px] object-cover"
                      />

                      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                        <Button
                          onClick={handleAnalyze}
                          size="lg"
                          className="sm:flex-1"
                        >
                          {loading ? "Analyzing..." : "Analyze image"}
                        </Button>

                        <Button
                          onClick={clearImage}
                          variant="secondary"
                          size="lg"
                          className="sm:flex-1"
                        >
                          Remove image
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-[24px] border border-white/10 bg-white/5 p-5 text-sm text-white/52">
                      No image uploaded yet.
                    </div>
                  )}

                  {error ? (
                    <div className="rounded-[20px] border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-100">
                      {error}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="grid gap-5">
                <div className="metric-panel rounded-[28px] p-6">
                  <div className="text-[11px] uppercase tracking-[0.22em] text-white/36">
                    Recommendation outputs
                  </div>

                  <div className="mt-4 grid gap-3">
                    {[
                      "Best Overall",
                      "Best Value",
                      "Safe Pick",
                      "Adventurous Pick",
                    ].map((label) => (
                      <div
                        key={label}
                        className="rounded-[20px] border border-white/10 bg-white/5 p-4 text-sm text-white/74"
                      >
                        {label}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="metric-panel rounded-[28px] p-6">
                  <div className="text-[11px] uppercase tracking-[0.22em] text-white/36">
                    Supported venues
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {venueTypes.map((item) => (
                      <span
                        key={item.value}
                        className="rounded-full border border-white/10 bg-white/6 px-3 py-1.5 text-xs text-white/74"
                      >
                        {item.label}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="metric-panel rounded-[28px] p-6">
                  <div className="text-[11px] uppercase tracking-[0.22em] text-white/36">
                    Product direction
                  </div>
                  <h3 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-white">
                    Premium scan surface, wired to real outputs.
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-white/58">
                    This page is connected to the shared scan store and posts to
                    the analyze route so the results page can render a real scan
                    session.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
