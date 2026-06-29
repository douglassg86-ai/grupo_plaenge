'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { ChevronDown, Home, Building2 } from 'lucide-react';

const empreendimentos = [
  { name: 'ORBITALE', slug: 'orbitale', brand: 'Plaenge' },
  { name: 'EDITION Moinhos', slug: 'edition', brand: 'Plaenge' },
  { name: 'VERDANT', slug: 'verdant', brand: 'Plaenge' },
  { name: 'SYNTHÈ', slug: 'synthe', brand: 'Plaenge' },
  { name: 'MOOD Central Parque', slug: 'mood', brand: 'Vanguard' },
  { name: 'YUNA Jardim Botânico', slug: 'yuna', brand: 'Vanguard' },
  { name: 'TREND Downtown', slug: 'trend', brand: 'Vanguard' },
  { name: 'SHIFT', slug: 'shift', brand: 'Vanguard' },
  { name: 'WAVE Home Resort', slug: 'wave', brand: 'Vanguard' },
];

export function ProductHeader({ hideNav = false }: { hideNav?: boolean }) {
  const [open, setOpen] = useState(false);

  const logo = (
    <Image
      src="/INSTITUCIONAL/logo_grupo_plaenge_escuro.webp"
      alt="Grupo Plaenge"
      width={150}
      height={32}
      className="h-7 w-auto"
    />
  );

  return (
    <header className="absolute top-0 left-0 w-full z-[60] py-4">
      <div className="container flex items-center justify-between">
        {/* Logo — sem link na visão do cliente para não expor outros empreendimentos */}
        {hideNav ? logo : <Link href="/">{logo}</Link>}

        {/* Dropdown — oculto na visão do cliente */}
        {!hideNav && (
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium backdrop-blur-sm bg-black/20 hover:bg-black/30 px-4 py-2 rounded-full transition-all border border-white/20"
          >
            <Building2 className="w-4 h-4" />
            Empreendimentos
            <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
          </button>

          {open && (
            <>
              {/* Backdrop */}
              <div className="fixed inset-0 z-[55]" onClick={() => setOpen(false)} />
              {/* Menu */}
              <div className="absolute right-0 mt-2 w-64 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 overflow-hidden z-[60]">
                <Link
                  href="/"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 border-b border-gray-100"
                >
                  <Home className="w-4 h-4" />
                  Página Inicial
                </Link>

                {['Plaenge', 'Vanguard'].map((brand) => (
                  <div key={brand}>
                    <p className="px-4 pt-3 pb-1 text-xs font-bold uppercase tracking-widest text-gray-400">
                      {brand}
                    </p>
                    {empreendimentos
                      .filter((e) => e.brand === brand)
                      .map((e) => (
                        <Link
                          key={e.slug}
                          href={`/${e.slug}`}
                          onClick={() => setOpen(false)}
                          className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors"
                        >
                          {e.name}
                        </Link>
                      ))}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
        )}
      </div>
    </header>
  );
}
