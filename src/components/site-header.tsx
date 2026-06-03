import Link from "next/link";
import Image from "next/image";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" style={{ height: '44px' }}>
      <div className="container flex items-center justify-between" style={{ height: '44px' }}>
        <Link href="/" className="flex items-center">
          <Image
            src="/INSTITUCIONAL/logo_grupo_plaenge_claro.webp"
            alt="Grupo Plaenge"
            width={160}
            height={22}
            priority
            style={{ height: '22px', width: 'auto' }}
          />
        </Link>
        <nav>
          {/* Future nav items can go here */}
        </nav>
      </div>
    </header>
  );
}
