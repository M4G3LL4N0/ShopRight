import Link from "next/link";
import { cn } from "@/lib/utils";

export function Footer() {
  return (
    <footer
      className={cn(
        "border-t border-white/10 dark:border-black/10",
        "bg-white/5 dark:bg-black/5",
        "backdrop-blur-md"
      )}
    >
      <div className="container mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-sm font-semibold mb-4">Product</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/features" className="text-sm text-muted-foreground hover:text-primary">
                Features
              </Link>
            </li>
            <li>
              <Link href="/pricing" className="text-sm text-muted-foreground hover:text-primary">
                Pricing
              </Link>
            </li>
            <li>
              <Link href="/download" className="text-sm text-muted-foreground hover:text-primary">
                Download
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-4">Company</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/about" className="text-sm text-muted-foreground hover:text-primary">
                About
              </Link>
            </li>
            <li>
              <Link href="/careers" className="text-sm text-muted-foreground hover:text-primary">
                Careers
              </Link>
            </li>
            <li>
              <Link href="/press" className="text-sm text-muted-foreground hover:text-primary">
                Press
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-4">Resources</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/blog" className="text-sm text-muted-foreground hover:text-primary">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/support" className="text-sm text-muted-foreground hover:text-primary">
                Support
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-4">Legal</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary">
                Terms
              </Link>
            </li>
            <li>
              <Link href="/cookies" className="text-sm text-muted-foreground hover:text-primary">
                Cookies
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 dark:border-black/10 py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} ShopRight. All rights reserved.
      </div>
    </footer>
  );
}
