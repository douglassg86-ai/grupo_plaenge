'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Lightbox } from '@/components/ui/lightbox';

export interface PlantCategory {
  label: string;
  images: { src: string; alt: string }[];
}

export function PlantsViewer({ categories }: { categories: PlantCategory[] }) {
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeImg, setActiveImg] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
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
            {cat.label}
          </button>
        ))}
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveImg(i)}
            className={`relative rounded-lg overflow-hidden border-2 transition-all bg-muted ${
              activeImg === i ? 'border-primary' : 'border-transparent hover:border-border'
            }`}
            style={{ paddingBottom: '75%', height: 0, position: 'relative' }}
          >
            <Image src={img.src} alt={img.alt} fill className="object-contain p-1" sizes="300px" />
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 px-2 py-1">
              <p className="text-white text-xs text-center leading-tight line-clamp-2">{img.alt}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Viewer principal — clicável para lightbox */}
      <div
        className="relative w-full bg-white rounded-xl border overflow-hidden cursor-zoom-in group"
        style={{ height: '520px' }}
        onClick={() => setLightboxOpen(true)}
        title="Clique para ampliar"
      >
        <Image
          src={images[activeImg].src}
          alt={images[activeImg].alt}
          fill
          className="object-contain p-4 group-hover:opacity-95 transition-opacity"
          sizes="(max-width: 768px) 100vw, 1200px"
        />
        {/* Indicador de zoom */}
        <div className="absolute top-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
          <span>🔍</span> Ampliar
        </div>
      </div>

      <p className="text-center text-sm text-muted-foreground font-medium">
        {images[activeImg].alt}
        <span className="ml-2 text-xs text-muted-foreground/60">(clique na imagem para ampliar)</span>
      </p>

      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox
          images={images}
          initialIndex={activeImg}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </div>
  );
}
