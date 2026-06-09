'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Lightbox } from '@/components/ui/lightbox';

export interface FloorPlan {
  label: string;
  src: string;
  alt: string;
}

export function ImplantacaoFloorSelector({ floors }: { floors: FloorPlan[] }) {
  const [selected, setSelected] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const current = floors[selected];
  const lightboxImages = floors.map((f) => ({ src: f.src, alt: f.alt }));

  return (
    <div className="space-y-4">
      {/* Dropdown de pavimentos */}
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-sm text-muted-foreground font-medium whitespace-nowrap">Selecione o pavimento:</span>
        <select
          value={selected}
          onChange={(e) => setSelected(Number(e.target.value))}
          className="flex-1 min-w-[200px] border border-border rounded-lg px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {floors.map((f, i) => (
            <option key={i} value={i}>
              {f.label}
            </option>
          ))}
        </select>
      </div>

      {/* Pills de navegação rápida */}
      <div className="flex gap-2 flex-wrap">
        {floors.map((f, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
              selected === i
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-transparent text-muted-foreground border-border hover:bg-muted'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Imagem principal */}
      <div
        className="relative w-full bg-white rounded-xl border overflow-hidden cursor-zoom-in group"
        style={{ height: '520px' }}
        onClick={() => setLightboxOpen(true)}
        title="Clique para ampliar"
      >
        <Image
          key={current.src}
          src={current.src}
          alt={current.alt}
          fill
          className="object-contain p-4 group-hover:opacity-95 transition-opacity"
          sizes="(max-width: 768px) 100vw, 1200px"
        />
        <div className="absolute top-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
          <span>🔍</span> Ampliar
        </div>
      </div>

      <p className="text-center text-sm text-muted-foreground font-medium">
        {current.alt}
        <span className="ml-2 text-xs text-muted-foreground/60">(clique na imagem para ampliar)</span>
      </p>

      {lightboxOpen && (
        <Lightbox
          images={lightboxImages}
          initialIndex={selected}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </div>
  );
}
