import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function GlassCard({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "glass-panel rounded-[28px] border border-white/10",
        className
      )}
    >
      {children}
    </div>
  );
}
