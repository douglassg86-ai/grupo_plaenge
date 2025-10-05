import Link from "next/link";
import { PlaengeVanguardLogo } from "@/components/icons";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <PlaengeVanguardLogo className="fill-current text-primary" />
        </Link>
        <nav>
          {/* Future nav items can go here */}
        </nav>
      </div>
    </header>
  );
}
