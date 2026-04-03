import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/8 bg-[#04070f]">
      <div className="container-shell py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_0.8fr_0.8fr]">
          <div>
            <div className="text-lg font-semibold tracking-tight text-white">
              ShopRight
            </div>
            <p className="mt-3 max-w-xl text-sm leading-6 text-white/52">
              The AI decision layer for real-world commerce — built for menus,
              drinks, shelves, product displays, and the moments where buying
              hesitation actually happens.
            </p>
          </div>

          <div>
            <div className="text-sm font-medium text-white/82">Product</div>
            <div className="mt-4 space-y-3 text-sm text-white/52">
              <Link href="/scan" className="block hover:text-white">
                Scan
              </Link>
              <Link href="/pricing" className="block hover:text-white">
                Pricing
              </Link>
              <Link href="/history" className="block hover:text-white">
                History
              </Link>
            </div>
          </div>

          <div>
            <div className="text-sm font-medium text-white/82">Company</div>
            <div className="mt-4 space-y-3 text-sm text-white/52">
              <a href="#product" className="block hover:text-white">
                Product
              </a>
              <a href="#intelligence" className="block hover:text-white">
                Intelligence
              </a>
              <a href="#how-it-works" className="block hover:text-white">
                How It Works
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/8 pt-6 text-xs uppercase tracking-[0.18em] text-white/30 sm:flex-row sm:items-center sm:justify-between">
          <span>ShopRight — premium decision intelligence</span>
          <span>Built for fast real-world choices</span>
        </div>
      </div>
    </footer>
  );
}
