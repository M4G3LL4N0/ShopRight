"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/Button";
import { useScanStore } from "@/store/useScanStore";

const nav = [
  { href: "/#product", label: "Product" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/#intelligence", label: "Intelligence" },
  { href: "/pricing", label: "Pricing" },
];

export function Header() {
  const { userPlan } = useScanStore();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-[#050914]/72 backdrop-blur-2xl">
      <div className="container-shell flex h-[76px] items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3 lift-hover" onClick={() => setOpen(false)}>
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/6 text-sm font-semibold text-white shadow-[0_8px_28px_rgba(0,0,0,0.28)] transition duration-300 hover:border-white/20 hover:bg-white/10">
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
              className="link-hover text-sm text-white/60"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {userPlan === "free" && (
            <Button
              href="/pricing"
              variant="secondary"
              className="hidden sm:inline-flex"
              onClick={() => setOpen(false)}
            >
              Upgrade
            </Button>
          )}

          <Button href="/scan" onClick={() => setOpen(false)} className="hidden md:inline-flex">
            Open ShopRight
          </Button>

          <Button href="/scan" onClick={() => setOpen(false)} className="md:hidden">
            Scan
          </Button>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/12 text-white md:hidden"
            aria-expanded={open}
            aria-controls="shopright-mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span aria-hidden className="text-lg">
              {open ? "×" : "☰"}
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div
          id="shopright-mobile-nav"
          className="border-t border-white/8 md:hidden"
        >
          <div className="container-shell flex flex-col gap-1 py-4">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-xl px-3 py-2.5 text-sm text-white/75 hover:bg-white/5"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            {userPlan === "free" && (
              <Button href="/pricing" variant="secondary" className="mt-2 justify-center" onClick={() => setOpen(false)}>
                Upgrade
              </Button>
            )}
            <Button href="/scan" className="justify-center" onClick={() => setOpen(false)}>
              Open ShopRight
            </Button>
            <p className="px-3 pt-2 text-[11px] leading-relaxed text-white/40">
              Receipt and label intelligence is for planning — confirm ingredients, recalls, and prices before you buy.
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
