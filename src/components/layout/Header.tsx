import Link from "next/link";
import { Button } from "../ui/Button";
import { cn } from "@/lib/utils";

export function Header() {
  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50",
        "backdrop-blur-md bg-white/10 dark:bg-black/10",
        "border-b border-white/10 dark:border-black/10"
      )}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-semibold tracking-tight">
          ShopRight
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/product" className="hover:text-primary transition-colors">
            Product
          </Link>
          <Link href="/how-it-works" className="hover:text-primary transition-colors">
            How it Works
          </Link>
          <Link href="/pricing" className="hover:text-primary transition-colors">
            Pricing
          </Link>
          <Link href="/sign-in" className="hover:text-primary transition-colors">
            Sign In
          </Link>
        </nav>

        <Button className="ml-4" asChild>
          <Link href="/scan">Scan Now</Link>
        </Button>
      </div>
    </header>
  );
}
