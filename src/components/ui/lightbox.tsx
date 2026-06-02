'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface LightboxImage { src: string; alt: string; }

interface LightboxProps {
  images: LightboxImage[];
  initialIndex: number;
  onClose: () => void;
}

export function Lightbox({ images, initialIndex, onClose }: LightboxProps) {
  const [index, setIndex] = useState(initialIndex);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, ox: 0, oy: 0 });
  // touch pinch
  const lastDist = useRef<number | null>(null);

  const resetZoom = () => { setScale(1); setOffset({ x: 0, y: 0 }); };
  const navigate = (dir: number) => {
    setIndex(i => (i + dir + images.length) % images.length);
    resetZoom();
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') navigate(1);
      if (e.key === 'ArrowLeft') navigate(-1);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setScale(s => Math.min(5, Math.max(1, s * (1 - e.deltaY * 0.001))));
    if (scale <= 1) setOffset({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale <= 1) return;
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY, ox: offset.x, oy: offset.y };
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setOffset({
      x: dragStart.current.ox + (e.clientX - dragStart.current.x),
      y: dragStart.current.oy + (e.clientY - dragStart.current.y),
    });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (lastDist.current !== null) {
        const delta = dist - lastDist.current;
        setScale(s => Math.min(5, Math.max(1, s + delta * 0.01)));
      }
      lastDist.current = dist;
    }
  };

  const cursor = scale > 1 ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-zoom-in';

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center select-none"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Fechar */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white text-2xl flex items-center justify-center transition-colors"
        aria-label="Fechar"
      >×</button>

      {/* Controles de zoom */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10 bg-black/50 rounded-full px-3 py-1.5">
        <button
          onClick={() => { setScale(s => Math.max(1, +(s - 0.5).toFixed(1))); if (scale <= 1.5) resetZoom(); }}
          className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-bold text-lg leading-none"
        >−</button>
        <span className="text-white/70 text-xs w-10 text-center tabular-nums">{Math.round(scale * 100)}%</span>
        <button
          onClick={() => setScale(s => Math.min(5, +(s + 0.5).toFixed(1)))}
          className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-bold text-lg leading-none"
        >+</button>
        {scale > 1 && (
          <button onClick={resetZoom} className="text-white/60 hover:text-white text-xs ml-1 transition-colors">
            Reset
          </button>
        )}
      </div>

      {/* Navegação */}
      {images.length > 1 && <>
        <button
          onClick={() => navigate(-1)}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-2xl transition-colors"
        >‹</button>
        <button
          onClick={() => navigate(1)}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-2xl transition-colors"
        >›</button>
      </>}

      {/* Imagem com zoom */}
      <div
        className={`w-full h-full flex items-center justify-center overflow-hidden ${cursor}`}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onTouchMove={handleTouchMove}
        onTouchEnd={() => { lastDist.current = null; }}
        onClick={e => { if (!isDragging && scale <= 1) { setScale(2); } else if (!isDragging && scale > 1) { resetZoom(); } }}
      >
        <div
          style={{
            transform: `scale(${scale}) translate(${offset.x / scale}px, ${offset.y / scale}px)`,
            transition: isDragging ? 'none' : 'transform 0.15s ease',
            position: 'relative',
            width: '90vw',
            height: '90vh',
          }}
        >
          <Image
            src={images[index].src}
            alt={images[index].alt}
            fill
            className="object-contain"
            sizes="100vw"
            priority
          />
        </div>
      </div>

      {/* Legenda + contador */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center pointer-events-none">
        <p className="text-white/90 text-sm font-medium drop-shadow">{images[index].alt}</p>
        {images.length > 1 && (
          <p className="text-white/50 text-xs mt-0.5">{index + 1} / {images.length}</p>
        )}
        <p className="text-white/30 text-xs mt-1">Scroll ou pinça para zoom · Arraste para mover</p>
      </div>
    </div>
  );
}
