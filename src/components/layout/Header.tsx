import Link from "next/link";
import { Button } from "@/components/ui/Button";

const nav = [
  { href: "#product", label: "Product" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#intelligence", label: "Intelligence" },
  { href: "/pricing", label: "Pricing" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-[#050914]/72 backdrop-blur-2xl">
      <div className="container-shell flex h-[76px] items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/6 text-sm font-semibold text-white shadow-[0_8px_28px_rgba(0,0,0,0.28)]">
            SR
          </div>
          <div>
            <div className="text-[17px] font-semibold tracking-tight text-white">
              ShopRight
            </div>
            <div className="text-[11px] uppercase tracking-[0.2em] text-white/36">
              Purchase Intelligence
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-white/60 transition hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {userPlan === "free" && (
            <Button href="/pricing" variant="secondary" className="hidden sm:inline-flex">
              Upgrade
            </Button>
          )}
          <Button href="/scan" variant={userPlan === "pro" ? "primary" : "secondary"} className="hidden sm:inline-flex">
            {userPlan === "pro" ? "Scan Now" : "Live Scan"}
          </Button>
          <Button href="/scan">
            Open ShopRight
          </Button>
        </div>
      </div>
    </header>
  );
}
