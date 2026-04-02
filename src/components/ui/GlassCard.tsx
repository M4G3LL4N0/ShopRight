import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export interface GlassCardProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  accent?: string;
  footer?: ReactNode;
}

export function GlassCard({
  title,
  subtitle,
  children,
  className,
  accent = "bg-white/10",
  footer,
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-xl p-6 backdrop-blur-md border border-white/5",
        accent,
        className
      )}
    >
      {title && (
        <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      )}
      {subtitle && (
        <p className="text-sm text-white/80 mb-4">{subtitle}</p>
      )}
      <div className="space-y-4">{children}</div>
      {footer && <div className="mt-6">{footer}</div>}
    </div>
  );
}
