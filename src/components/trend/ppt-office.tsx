'use client';

import Image from 'next/image';
import { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, Maximize, Minimize } from 'lucide-react';

const DARK = '#0A0A0A';
const ACC = '#D6876B';
const TOTAL = 38;
const SLIDE = (n: number) => `/TREND/ppt_office/slide-${String(n + 1).padStart(2, '0')}.webp`;

export default function TrendOfficePpt() {
  const [slide, setSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);

  const goTo = useCallback((n: number) => {
    setSlide((prev) => {
      const next = Math.max(0, Math.min(TOTAL - 1, n));
      return next === prev ? prev : next;
    });
  }, []);

  // keyboard
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (['ArrowRight', 'ArrowDown', ' ', 'PageDown'].includes(e.key)) { e.preventDefault(); goTo(slide + 1); }
      else if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(e.key)) { e.preventDefault(); goTo(slide - 1); }
      else if (e.key === 'Home') { e.preventDefault(); goTo(0); }
      else if (e.key === 'End') { e.preventDefault(); goTo(TOTAL - 1); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [slide, goTo]);

  // deep link ?slide=N (1-based) — read once on mount
  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get('slide');
    const n = parseInt(p ?? '', 10);
    if (!isNaN(n)) goTo(n - 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // fullscreen state sync
  useEffect(() => {
    const onFs = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onFs);
    return () => document.removeEventListener('fullscreenchange', onFs);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) containerRef.current?.requestFullscreen?.();
    else document.exitFullscreen?.();
  }, []);

  // touch / swipe
  const onTouchStart = (e: React.TouchEvent) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 45) goTo(slide + (dx < 0 ? 1 : -1));
    touchX.current = null;
  };

  // keep a small window of slides mounted for instant transitions
  const window_ = [slide - 1, slide, slide + 1, slide + 2].filter((n) => n >= 0 && n < TOTAL);

  return (
    <div
      ref={containerRef}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className="fixed inset-0 overflow-hidden select-none"
      style={{ background: DARK }}
    >
      {/* slides */}
      {window_.map((n) => (
        <div
          key={n}
          className="absolute inset-0 flex items-center justify-center transition-opacity duration-500 ease-out"
          style={{ opacity: n === slide ? 1 : 0, pointerEvents: n === slide ? 'auto' : 'none' }}
        >
          <div className="relative w-full h-full">
            <Image
              src={SLIDE(n)}
              alt={`Trend Downtown Office — slide ${n + 1}`}
              fill
              priority={Math.abs(n - slide) <= 1}
              className="object-contain"
              sizes="100vw"
            />
          </div>
        </div>
      ))}

      {/* top scrim — keeps the chrome legible over light slides */}
      <div
        className="absolute top-0 left-0 right-0 h-24 z-30 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.42), rgba(0,0,0,0))' }}
      />

      {/* top bar */}
      <div className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-4 md:px-9 md:py-5 pointer-events-none">
        <div className="flex items-center gap-3 pointer-events-none">
          <div style={{ width: 22, height: 1, background: `${ACC}66` }} />
          <span className="uppercase tabular-nums" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.7rem', letterSpacing: '0.2em' }}>
            Trend&nbsp;Downtown&nbsp;Office
          </span>
        </div>
        <div className="flex items-center gap-4 pointer-events-auto">
          <span className="tabular-nums" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.72rem', letterSpacing: '0.15em' }}>
            {String(slide + 1).padStart(2, '0')} / {TOTAL}
          </span>
          <button
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? 'Sair da tela cheia' : 'Tela cheia'}
            className="flex items-center gap-2 rounded-full px-3 py-1.5 transition-transform hover:scale-105"
            style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)', backdropFilter: 'blur(6px)' }}
          >
            {isFullscreen ? <Minimize className="w-4 h-4 text-white" /> : <Maximize className="w-4 h-4 text-white" />}
            <span className="hidden sm:inline text-white" style={{ fontSize: '0.68rem', letterSpacing: '0.18em' }}>
              {isFullscreen ? 'SAIR' : 'TELA CHEIA'}
            </span>
          </button>
        </div>
      </div>

      {/* arrow zones */}
      {slide > 0 && (
        <button
          onClick={() => goTo(slide - 1)}
          aria-label="Slide anterior"
          className="absolute left-0 top-16 bottom-10 w-16 md:w-24 z-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
        >
          <ChevronLeft className="w-8 h-8" style={{ color: 'rgba(255,255,255,0.55)' }} />
        </button>
      )}
      {slide < TOTAL - 1 && (
        <button
          onClick={() => goTo(slide + 1)}
          aria-label="Próximo slide"
          className="absolute right-0 top-16 bottom-10 w-16 md:w-24 z-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
        >
          <ChevronRight className="w-8 h-8" style={{ color: 'rgba(255,255,255,0.55)' }} />
        </button>
      )}

      {/* progress bar */}
      <div className="absolute bottom-0 left-0 right-0 z-40 h-[3px]" style={{ background: 'rgba(255,255,255,0.08)' }}>
        <div
          style={{
            width: `${((slide + 1) / TOTAL) * 100}%`,
            height: '100%',
            background: ACC,
            transition: 'width 0.45s cubic-bezier(.4,0,.2,1)',
          }}
        />
      </div>
    </div>
  );
}
