'use client';

import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Maximize, Minimize } from 'lucide-react';

const BG   = '#0D0D0D';
const ACC  = '#A43A25';
const WARM = '#F0EDE8';
const P    = '/SHIFT';

const FONT_CSS = `
.sh { font-family: 'Helvetica Neue', Arial, sans-serif; }
@keyframes sh-up   { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
@keyframes sh-in   { from { opacity:0; } to { opacity:1; } }
.sh-a0  { animation: sh-up 0.6s 0.00s cubic-bezier(.22,.68,0,1.2) both; }
.sh-a1  { animation: sh-up 0.6s 0.12s cubic-bezier(.22,.68,0,1.2) both; }
.sh-a2  { animation: sh-up 0.6s 0.24s cubic-bezier(.22,.68,0,1.2) both; }
.sh-a3  { animation: sh-up 0.6s 0.36s cubic-bezier(.22,.68,0,1.2) both; }
.sh-a4  { animation: sh-up 0.6s 0.48s cubic-bezier(.22,.68,0,1.2) both; }
.sh-a5  { animation: sh-up 0.6s 0.60s cubic-bezier(.22,.68,0,1.2) both; }
.sh-fade { animation: sh-in 1.0s 0.1s both; }
`;

// ─── GALLERY IMAGES ──────────────────────────────────────────────────────────

const GALLERY = [
  { src: `${P}/kota_tgd_sil_apto_decorado_01_4k.webp`,    label: 'Apartamento Decorado' },
  { src: `${P}/kota_tgd_sil_apto_decorado_02_4k.webp`,    label: 'Apartamento Decorado 2' },
  { src: `${P}/kota_tgd_sil_piscina_4k.webp`,             label: 'Piscina' },
  { src: `${P}/kota_tgd_sil_gourmet_externo_4k.webp`,     label: 'Espaço Gourmet' },
  { src: `${P}/kota_tgd_sil_coworking_4k.webp`,           label: 'Coworking' },
  { src: `${P}/kota_tgd_sil_fitness_4k.webp`,             label: 'Fitness' },
];

// ─── SLIDES ───────────────────────────────────────────────────────────────────

type Slide =
  | { kind: 'capa' }
  | { kind: 'video' }
  | { kind: 'cidade' }
  | { kind: 'gallery'; img: { src: string; label: string }; index: number; total: number }
  | { kind: 'condicoes' }
  | { kind: 'cta' };

const SLIDES: Slide[] = [
  { kind: 'capa' },
  { kind: 'video' },
  { kind: 'cidade' },
  ...GALLERY.map((img, i) => ({ kind: 'gallery' as const, img, index: i + 1, total: GALLERY.length })),
  { kind: 'condicoes' },
  { kind: 'cta' },
];

const TOTAL = SLIDES.length;

function slideLabel(s: Slide): string {
  switch (s.kind) {
    case 'capa':       return 'Abertura';
    case 'video':      return 'Vídeo';
    case 'cidade':     return 'Localização';
    case 'gallery':    return s.img.label;
    case 'condicoes':  return 'Condições';
    case 'cta':        return 'Contato';
    default:           return '';
  }
}

// ─── FULLSCREEN BUTTON ───────────────────────────────────────────────────────

function FullscreenBtn({ onFullscreen, isFullscreen }: { onFullscreen: () => void; isFullscreen: boolean }) {
  return (
    <button
      data-pdf-hide
      onClick={onFullscreen}
      className="absolute top-5 right-5 z-50 flex items-center gap-2 px-4 py-2 rounded-full transition-all hover:scale-105"
      style={{ background: 'rgba(0,0,0,0.40)', border: '1px solid rgba(255,255,255,0.22)', backdropFilter: 'blur(10px)' }}
    >
      {isFullscreen
        ? <Minimize className="w-4 h-4 text-white" />
        : <Maximize className="w-4 h-4 text-white" />}
      <span className="sh text-white text-xs tracking-widest font-medium">
        {isFullscreen ? 'SAIR' : 'TELA CHEIA'}
      </span>
    </button>
  );
}

// ─── SLIDE: CAPA ─────────────────────────────────────────────────────────────

function SlideCapa({ onFullscreen, isFullscreen }: { onFullscreen: () => void; isFullscreen: boolean }) {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-end pb-20">
      <div className="absolute inset-0">
        <Image
          src={`${P}/cidade_book_p8_0.webp`}
          alt="SHIFT Fachada"
          fill className="object-cover" priority sizes="100vw"
          style={{ objectPosition: 'center top' }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.1) 35%, rgba(0,0,0,0.82) 100%)' }} />
      </div>
      <FullscreenBtn onFullscreen={onFullscreen} isFullscreen={isFullscreen} />
      <div className="relative z-10 flex flex-col items-center text-center px-8">
        <p className="sh sh-a0 text-white/50 tracking-[0.45em] uppercase mb-8" style={{ fontSize: 'clamp(0.7rem, 1vw, 0.85rem)', fontWeight: 500 }}>
          APRESENTAÇÃO CORRETORES
        </p>
        <div className="sh-a1 mb-8">
          <Image src={`${P}/logo_shift.png`} alt="SHIFT" width={280} height={80}
            className="brightness-0 invert" style={{ width: 'clamp(180px, 18vw, 280px)', height: 'auto' }} />
        </div>
        <p className="sh sh-a2 text-white/60 italic" style={{ fontSize: 'clamp(1rem, 1.8vw, 1.4rem)', letterSpacing: '0.12em', fontWeight: 300 }}>
          Life on demand.
        </p>
        <div className="sh-a3 mt-8 flex items-center gap-4">
          <div style={{ height: '1px', width: '44px', background: `${ACC}90` }} />
          <p className="sh text-white/45 tracking-[0.28em] uppercase" style={{ fontSize: 'clamp(0.7rem, 0.9vw, 0.82rem)', fontWeight: 400 }}>
            VANGUARD · TGD · PORTO ALEGRE
          </p>
          <div style={{ height: '1px', width: '44px', background: `${ACC}90` }} />
        </div>
      </div>
    </div>
  );
}

// ─── SLIDE: VÍDEO ────────────────────────────────────────────────────────────

function SlideVideo({ onFullscreen, isFullscreen }: { onFullscreen: () => void; isFullscreen: boolean }) {
  return (
    <div className="relative w-full h-full flex" style={{ background: BG }}>
      <FullscreenBtn onFullscreen={onFullscreen} isFullscreen={isFullscreen} />
      {/* Left panel */}
      <div className="relative w-[38%] h-full shrink-0">
        <Image src={`${P}/kota_tgd_sil_apto_studio_4k.webp`} alt="SHIFT Studio" fill
          className="object-cover" sizes="40vw" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, transparent 55%, rgba(13,13,13,0.98) 100%)' }} />
      </div>
      {/* Right content */}
      <div className="flex-1 flex flex-col justify-center px-14 py-14">
        <p className="sh sh-a0 tracking-[0.35em] uppercase mb-5" style={{ color: ACC, fontSize: 'clamp(0.75rem, 1.1vw, 0.95rem)', fontWeight: 600 }}>
          SHIFT · VANGUARD
        </p>
        <h2 className="sh sh-a1" style={{ color: WARM, fontWeight: 900, fontSize: 'clamp(2.8rem, 5vw, 4.5rem)', lineHeight: 0.92, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
          ASSISTA<br />O VÍDEO
        </h2>
        <div className="sh-a2 mt-6 mb-8" style={{ width: '52px', height: '3px', background: ACC }} />
        <div className="sh-a3 w-full" style={{ maxWidth: '560px' }}>
          <div className="relative w-full rounded-xl overflow-hidden border" style={{ borderColor: 'rgba(255,255,255,0.08)', aspectRatio: '16/9' }}>
            <iframe
              src="https://www.youtube.com/embed/A0wPDvil9HI?rel=0&modestbranding=1"
              title="Vídeo SHIFT"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full absolute inset-0"
            />
          </div>
        </div>
        <p className="sh sh-a4 mt-5" style={{ color: 'rgba(255,255,255,0.38)', fontSize: 'clamp(0.85rem, 1.3vw, 1.05rem)', fontWeight: 300, letterSpacing: '0.04em' }}>
          Entrega Abril/2029
        </p>
      </div>
    </div>
  );
}

// ─── SLIDE: CIDADE ───────────────────────────────────────────────────────────

function SlideCidade({ onFullscreen, isFullscreen }: { onFullscreen: () => void; isFullscreen: boolean }) {
  return (
    <div className="relative w-full h-full">
      <Image
        src={`${P}/cidade_book_p8_0.webp`}
        alt="SHIFT — Vista da cidade"
        fill className="object-cover" sizes="100vw"
        style={{ objectPosition: 'center 20%' }}
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.08) 50%, transparent 100%)' }} />
      <FullscreenBtn onFullscreen={onFullscreen} isFullscreen={isFullscreen} />
      <div className="absolute bottom-12 left-16 z-10">
        <p className="sh sh-a0 tracking-[0.35em] uppercase mb-3" style={{ color: ACC, fontSize: 'clamp(0.75rem, 1.1vw, 0.95rem)', fontWeight: 600 }}>
          SHIFT · LOCALIZAÇÃO
        </p>
        <h2 className="sh sh-a1 text-white" style={{ fontWeight: 900, fontSize: 'clamp(2rem, 3.5vw, 3rem)', lineHeight: 1, textTransform: 'uppercase', letterSpacing: '-0.01em' }}>
          O ENDEREÇO MAIS<br />COBIÇADO DE PORTO ALEGRE
        </h2>
        <p className="sh sh-a2 mt-3 text-white/55" style={{ fontSize: 'clamp(0.9rem, 1.4vw, 1.1rem)', fontWeight: 300, letterSpacing: '0.06em' }}>
          Silva Jardim c/ Rua 24 de Outubro
        </p>
      </div>
    </div>
  );
}

// ─── SLIDE: GALLERY ──────────────────────────────────────────────────────────

function SlideGallery({ img, index, total, onFullscreen, isFullscreen }: {
  img: { src: string; label: string }; index: number; total: number;
  onFullscreen: () => void; isFullscreen: boolean;
}) {
  return (
    <div className="relative w-full h-full">
      <Image src={img.src} alt={img.label} fill className="object-cover" sizes="100vw" priority />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.60) 0%, transparent 45%)' }} />
      <FullscreenBtn onFullscreen={onFullscreen} isFullscreen={isFullscreen} />
      <div className="absolute bottom-12 left-16 z-10">
        <p className="sh sh-a0 text-white/45 tracking-[0.25em] uppercase mb-2" style={{ fontSize: 'clamp(0.7rem, 0.95vw, 0.82rem)' }}>
          SHIFT · {index}/{total}
        </p>
        <p className="sh sh-a1 text-white font-semibold tracking-wide" style={{ fontSize: 'clamp(1.2rem, 2vw, 1.7rem)', letterSpacing: '0.04em' }}>
          {img.label}
        </p>
      </div>
    </div>
  );
}

// ─── SLIDE: CONDIÇÕES ────────────────────────────────────────────────────────

function SlideCondicoes({ onFullscreen, isFullscreen }: { onFullscreen: () => void; isFullscreen: boolean }) {
  const items = [
    { label: 'Ato',          value: 'R$ 50.000',  sub: 'na assinatura',              highlight: false },
    { label: 'Mensais',      value: 'R$ 1.000',   sub: 'por mês durante a obra',     highlight: false },
    { label: '3 Reforços',   value: 'R$ 20.000',  sub: 'por reforço',                highlight: false },
    { label: 'Saldo',        value: 'R$ 270.000', sub: 'na entrega / financiamento', highlight: true  },
  ];

  return (
    <div className="relative w-full h-full flex" style={{ background: BG }}>
      <FullscreenBtn onFullscreen={onFullscreen} isFullscreen={isFullscreen} />

      {/* Left accent bar */}
      <div className="w-1.5 h-full shrink-0" style={{ background: ACC }} />

      {/* Plant image panel */}
      <div className="relative hidden lg:block w-[44%] h-full shrink-0" style={{ background: '#fff' }}>
        <Image
          src={`${P}/planta_book_p28_0.webp`}
          alt="Planta SHIFT"
          fill
          className="object-contain"
          sizes="44vw"
          style={{ padding: '24px' }}
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center px-12 py-14">
        <p className="sh sh-a0 tracking-[0.35em] uppercase mb-4" style={{ color: ACC, fontSize: 'clamp(0.75rem, 1.1vw, 0.95rem)', fontWeight: 600 }}>
          SHIFT · CONDIÇÕES DE PAGAMENTO
        </p>
        <h2 className="sh sh-a1" style={{ color: WARM, fontWeight: 900, fontSize: 'clamp(2.5rem, 4.5vw, 4rem)', lineHeight: 0.92, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
          COMO<br />ADQUIRIR
        </h2>
        <div className="sh-a2 mt-6 mb-10" style={{ width: '52px', height: '3px', background: ACC }} />

        <div className="sh-a3 space-y-4" style={{ maxWidth: '420px' }}>
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-5 py-4 px-5 rounded-xl"
              style={{
                background: item.highlight ? `${ACC}22` : 'rgba(255,255,255,0.04)',
                border: item.highlight ? `1px solid ${ACC}55` : '1px solid rgba(255,255,255,0.07)',
              }}>
              <div className="w-1 self-stretch rounded-full shrink-0" style={{ background: item.highlight ? ACC : 'rgba(255,255,255,0.15)' }} />
              <div className="flex-1">
                <p className="sh" style={{ color: 'rgba(255,255,255,0.45)', fontSize: 'clamp(0.7rem, 1vw, 0.82rem)', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '2px' }}>
                  {item.label}
                </p>
                <p className="sh" style={{ color: WARM, fontWeight: 800, fontSize: 'clamp(1.5rem, 2.5vw, 2.1rem)', letterSpacing: '-0.01em', lineHeight: 1 }}>
                  {item.value}
                </p>
              </div>
              <p className="sh text-right" style={{ color: 'rgba(255,255,255,0.35)', fontSize: 'clamp(0.7rem, 0.95vw, 0.82rem)', fontWeight: 300, maxWidth: '120px', lineHeight: 1.4 }}>
                {item.sub}
              </p>
            </div>
          ))}
        </div>

        <p className="sh sh-a4 mt-8" style={{ color: 'rgba(255,255,255,0.25)', fontSize: 'clamp(0.7rem, 0.9vw, 0.8rem)', letterSpacing: '0.08em' }}>
          * Valores sujeitos a atualização. Consulte condições vigentes.
        </p>
      </div>
    </div>
  );
}

// ─── SLIDE: CTA ──────────────────────────────────────────────────────────────

function SlideCta({ onFullscreen, isFullscreen }: { onFullscreen: () => void; isFullscreen: boolean }) {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center" style={{ background: BG }}>
      <div className="absolute inset-0 sh-fade" style={{ background: `radial-gradient(ellipse 70% 55% at 50% 50%, ${ACC}18 0%, transparent 70%)` }} />
      <FullscreenBtn onFullscreen={onFullscreen} isFullscreen={isFullscreen} />
      <div className="relative z-10 flex flex-col items-center text-center px-12">
        <div className="sh-a0 mb-10">
          <Image src={`${P}/logo_shift.png`} alt="SHIFT" width={240} height={68}
            className="brightness-0 invert opacity-90" style={{ width: 'clamp(160px, 16vw, 240px)', height: 'auto' }} />
        </div>
        <h2 className="sh sh-a1" style={{ color: WARM, fontWeight: 900, fontSize: 'clamp(3rem, 6vw, 5.5rem)', lineHeight: 0.9, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
          LIFE ON
        </h2>
        <h2 className="sh sh-a2" style={{ color: ACC, fontWeight: 900, fontSize: 'clamp(3rem, 6vw, 5.5rem)', lineHeight: 0.9, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
          DEMAND
        </h2>
        <div className="sh-a3 mt-8 flex items-center gap-4">
          <div style={{ height: '1px', width: '44px', background: `${ACC}60` }} />
          <p className="sh text-white/40 tracking-[0.3em] uppercase" style={{ fontSize: 'clamp(0.7rem, 0.95vw, 0.85rem)', fontWeight: 400 }}>
            VANGUARD · TGD · ENTREGA ABRIL 2029
          </p>
          <div style={{ height: '1px', width: '44px', background: `${ACC}60` }} />
        </div>
        <p className="sh sh-a4 mt-10 text-white/35 italic" style={{ fontSize: 'clamp(1rem, 1.6vw, 1.25rem)', fontWeight: 300, letterSpacing: '0.08em' }}>
          Porto Alegre, RS.
        </p>
      </div>
    </div>
  );
}

// ─── RENDER SLIDE ─────────────────────────────────────────────────────────────

function RenderSlide({ slide, onFullscreen, isFullscreen }: {
  slide: Slide; onFullscreen: () => void; isFullscreen: boolean;
}) {
  switch (slide.kind) {
    case 'capa':      return <SlideCapa      onFullscreen={onFullscreen} isFullscreen={isFullscreen} />;
    case 'video':     return <SlideVideo     onFullscreen={onFullscreen} isFullscreen={isFullscreen} />;
    case 'cidade':    return <SlideCidade    onFullscreen={onFullscreen} isFullscreen={isFullscreen} />;
    case 'gallery':   return <SlideGallery   img={slide.img} index={slide.index} total={slide.total} onFullscreen={onFullscreen} isFullscreen={isFullscreen} />;
    case 'condicoes': return <SlideCondicoes onFullscreen={onFullscreen} isFullscreen={isFullscreen} />;
    case 'cta':       return <SlideCta       onFullscreen={onFullscreen} isFullscreen={isFullscreen} />;
    default:          return null;
  }
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

export default function ShiftPptCorretor() {
  const [current, setCurrent] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const prev = useCallback(() => setCurrent(c => Math.max(0, c - 1)), []);
  const next = useCallback(() => setCurrent(c => Math.min(TOTAL - 1, c + 1)), []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  }, []);

  useEffect(() => {
    const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next();
      if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   prev();
      if (e.key === 'f' || e.key === 'F') toggleFullscreen();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev, toggleFullscreen]);

  const slide = SLIDES[current];

  return (
    <>
      <style>{FONT_CSS}</style>
      <div className="sh flex flex-col" style={{ background: BG, minHeight: '100dvh' }}>

        {/* STAGE */}
        <div className="relative flex-1" style={{ minHeight: 0 }}>
          <div className="w-full h-full" style={{ aspectRatio: '16/9', maxHeight: 'calc(100dvh - 52px)' }}>
            <div key={current} className="relative w-full h-full overflow-hidden" style={{ background: BG }}>
              <RenderSlide slide={slide} onFullscreen={toggleFullscreen} isFullscreen={isFullscreen} />
            </div>
          </div>
        </div>

        {/* CONTROLS BAR */}
        <div data-pdf-hide className="shrink-0 flex items-center justify-between px-6 py-2.5 border-t"
          style={{ background: '#111', borderColor: 'rgba(255,255,255,0.08)', height: '52px' }}>

          {/* Prev */}
          <button onClick={prev} disabled={current === 0}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-all disabled:opacity-30"
            style={{ color: 'rgba(255,255,255,0.55)', background: current === 0 ? 'transparent' : 'rgba(255,255,255,0.06)' }}>
            <ChevronLeft className="w-4 h-4" />
            <span className="tracking-wide text-xs font-medium hidden sm:inline">ANTERIOR</span>
          </button>

          {/* Slide pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto max-w-[60vw] px-2">
            {SLIDES.map((s, i) => (
              <button key={i} onClick={() => setCurrent(i)}
                title={slideLabel(s)}
                className="rounded-full shrink-0 transition-all"
                style={{
                  width: i === current ? '28px' : '8px',
                  height: '8px',
                  background: i === current ? ACC : 'rgba(255,255,255,0.2)',
                }}
              />
            ))}
          </div>

          {/* Slide counter + Next */}
          <div className="flex items-center gap-3">
            <span className="sh text-xs tabular-nums" style={{ color: 'rgba(255,255,255,0.3)' }}>
              {current + 1} / {TOTAL}
            </span>
            <button onClick={next} disabled={current === TOTAL - 1}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-all disabled:opacity-30"
              style={{ color: 'rgba(255,255,255,0.55)', background: current === TOTAL - 1 ? 'transparent' : 'rgba(255,255,255,0.06)' }}>
              <span className="tracking-wide text-xs font-medium hidden sm:inline">PRÓXIMO</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
