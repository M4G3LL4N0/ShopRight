import { cn } from "@/lib/utils"

export function LoadingState() {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center",
      "min-h-[300px] space-y-4"
    )}>
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-ping"></div>
        <div className="absolute inset-0 rounded-full border-2 border-primary/50 animate-pulse"></div>
        <div className="absolute inset-1 rounded-full bg-primary/10 animate-spin"></div>
      </div>
      <p className="text-sm text-muted-foreground">
        Analyzing your scan...
      </p>
    </div>
  )
}
