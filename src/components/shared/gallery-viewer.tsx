'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Lightbox } from '@/components/ui/lightbox';
import { Download, Package } from 'lucide-react';

export interface GalleryCategory {
  label: string;
  images: { src: string; alt: string }[];
}

export function GalleryViewer({
  categories,
  zipUrl,
}: {
  categories: GalleryCategory[];
  zipUrl?: string;
}) {
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeImg, setActiveImg] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const images = categories[activeCategory].images;

  return (
    <div className="space-y-4">
      {/* Filtros + botão download todas */}
      <div className="flex items-start justify-between gap-3 flex-wrap">
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
        {zipUrl && (
          <a
            href={zipUrl}
            download
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-border hover:bg-muted transition-colors flex-shrink-0"
          >
            <Package className="w-3.5 h-3.5" /> Baixar todas
          </a>
        )}
      </div>

      {/* Imagem principal */}
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
        {/* Botão download imagem atual */}
        <a
          href={images[activeImg].src}
          download
          onClick={e => e.stopPropagation()}
          className="absolute top-3 left-3 bg-black/50 hover:bg-black/70 text-white text-xs px-2.5 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 z-10"
        >
          <Download className="w-3 h-3" /> Baixar
        </a>
        {/* Indicador de zoom */}
        <div className="absolute top-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 pointer-events-none">
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

      {/* Thumbnails com botão download */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {images.map((img, i) => (
          <div key={i} className="relative flex-shrink-0 group/thumb">
            <button
              onClick={() => setActiveImg(i)}
              className={`relative w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                activeImg === i ? 'border-primary opacity-100' : 'border-transparent opacity-60 hover:opacity-90'
              }`}
            >
              <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="80px" />
            </button>
            {/* Download no hover do thumbnail */}
            <a
              href={img.src}
              download
              onClick={e => e.stopPropagation()}
              className="absolute bottom-1 right-1 w-5 h-5 rounded bg-black/60 hover:bg-black/80 text-white flex items-center justify-center opacity-0 group-hover/thumb:opacity-100 transition-opacity z-10"
              title="Baixar"
            >
              <Download className="w-2.5 h-2.5" />
            </a>
          </div>
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
