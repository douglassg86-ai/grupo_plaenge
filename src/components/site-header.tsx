import Link from "next/link";
import Image from "next/image";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" style={{ height: '56px' }}>
      <div className="container flex h-full items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/INSTITUCIONAL/logo_grupo_plaenge_claro.webp"
            alt="Grupo Plaenge"
            width={200}
            height={30}
            priority
            className="h-8 w-auto"
          />
        </Link>
        <nav>
          {/* Future nav items can go here */}
        </nav>
      </div>
    </header>
  );
}
