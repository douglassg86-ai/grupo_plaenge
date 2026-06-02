'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Lightbox } from '@/components/ui/lightbox';

export interface GalleryCategory {
  label: string;
  images: { src: string; alt: string }[];
}

export function GalleryViewer({ categories }: { categories: GalleryCategory[] }) {
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeImg, setActiveImg] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const images = categories[activeCategory].images;

  return (
    <div className="space-y-4">
      {/* Filtros */}
      <div className="flex gap-2 flex-wrap">
        {categories.map((cat, i) => (
          <button
            key={cat.label}
            onClick={() => { setActiveCategory(i); setActiveImg(0); }}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              activeCategory === i
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-transparent text-muted-foreground border-border hover:bg-muted'
            }`}
          >
            {cat.label} <span className="ml-1 text-xs opacity-60">({cat.images.length})</span>
          </button>
        ))}
      </div>

      {/* Imagem principal — clicável para lightbox */}
      <div
        className="relative w-full h-[500px] rounded-xl overflow-hidden bg-muted cursor-zoom-in group"
        onClick={() => setLightboxIndex(activeImg)}
        title="Clique para ampliar"
      >
        <Image
          src={images[activeImg].src}
          alt={images[activeImg].alt}
          fill
          className="object-cover transition-opacity duration-300 group-hover:opacity-95"
          sizes="(max-width: 768px) 100vw, 1200px"
        />
        {/* Indicador de zoom */}
        <div className="absolute top-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
          <span>🔍</span> Ampliar
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-6 py-4 pointer-events-none">
          <p className="text-white text-sm font-medium">{images[activeImg].alt}</p>
          <p className="text-white/60 text-xs">{activeImg + 1} / {images.length}</p>
        </div>
        {images.length > 1 && (<>
          <button
            onClick={e => { e.stopPropagation(); setActiveImg(p => (p - 1 + images.length) % images.length); }}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center text-xl"
          >‹</button>
          <button
            onClick={e => { e.stopPropagation(); setActiveImg(p => (p + 1) % images.length); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center text-xl"
          >›</button>
        </>)}
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveImg(i)}
            className={`relative flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
              activeImg === i ? 'border-primary opacity-100' : 'border-transparent opacity-60 hover:opacity-90'
            }`}
          >
            <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="80px" />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </div>
  );
}
