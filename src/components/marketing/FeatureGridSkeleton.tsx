import { LoadingState } from "@/components/ui/LoadingState";

export function FeatureGridSkeleton() {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="poster-card min-h-[340px]">
          <div className="relative flex h-full flex-col justify-between p-4">
            <div className="soft-pill inline-flex w-fit rounded-full px-4 py-2 text-[11px] text-white/70">
              <div className="h-4 w-24 rounded-full bg-white/10" />
            </div>

            <div className="mt-6 rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-md">
              <div className="h-8 w-3/4 rounded-full bg-white/10" />
              <div className="mt-4 space-y-2">
                <div className="h-4 w-full rounded-full bg-white/8" />
                <div className="h-4 w-5/6 rounded-full bg-white/8" />
                <div className="h-4 w-4/6 rounded-full bg-white/8" />
              </div>

              <div className="mt-6 flex gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-10 flex-1 rounded-[14px] bg-white/6"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
