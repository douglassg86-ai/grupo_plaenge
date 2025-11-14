import Link from "next/link";
import Image from "next/image";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/INSTITUCIONAL/logo_grupo_plaenge.png"
            alt="Grupo Plaenge Logo"
            width={150}
            height={40}
            priority
            className="h-auto"
          />
        </Link>
        <nav>
          {/* Future nav items can go here */}
        </nav>
      </div>
    </header>
  );
}
