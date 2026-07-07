'use client';

import Image from 'next/image';
import { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Maximize, Minimize } from 'lucide-react';

const BG   = '#F5F2EE';
const ACC  = '#C1422A';
const DARK = '#1A1A1A';
const P    = '/SYNTHE';

const FONT_CSS = `
@font-face {
  font-family: 'Normalidad';
  src: url('/SYNTHE/fonts/NormalidadCompact-Thin.woff2') format('woff2');
  font-weight: 100; font-style: normal; font-display: swap;
}
@font-face {
  font-family: 'Normalidad';
  src: url('/SYNTHE/fonts/NormalidadCompact-Light.woff2') format('woff2');
  font-weight: 300; font-style: normal; font-display: swap;
}
@font-face {
  font-family: 'Normalidad';
  src: url('/SYNTHE/fonts/NormalidadCompact-Regular.woff2') format('woff2');
  font-weight: 400; font-style: normal; font-display: swap;
}
@font-face {
  font-family: 'Normalidad';
  src: url('/SYNTHE/fonts/NormalidadCompact-Medium.woff2') format('woff2');
  font-weight: 500; font-style: normal; font-display: swap;
}
@font-face {
  font-family: 'Normalidad';
  src: url('/SYNTHE/fonts/NormalidadCompact-Bold.woff2') format('woff2');
  font-weight: 700; font-style: normal; font-display: swap;
}
@font-face {
  font-family: 'Normalidad';
  src: url('/SYNTHE/fonts/NormalidadCompact-Black.woff2') format('woff2');
  font-weight: 900; font-style: normal; font-display: swap;
}
.sn { font-family: 'Normalidad', 'Helvetica Neue', Arial, sans-serif; }
@keyframes sn-up   { from { opacity:0; transform:translateY(26px); } to { opacity:1; transform:translateY(0); } }
@keyframes sn-in   { from { opacity:0; } to { opacity:1; } }
.sn-a0  { animation: sn-up 0.65s 0.00s cubic-bezier(.22,.68,0,1.15) both; }
.sn-a1  { animation: sn-up 0.65s 0.12s cubic-bezier(.22,.68,0,1.15) both; }
.sn-a2  { animation: sn-up 0.65s 0.24s cubic-bezier(.22,.68,0,1.15) both; }
.sn-a3  { animation: sn-up 0.65s 0.36s cubic-bezier(.22,.68,0,1.15) both; }
.sn-a4  { animation: sn-up 0.65s 0.48s cubic-bezier(.22,.68,0,1.15) both; }
.sn-a5  { animation: sn-up 0.65s 0.60s cubic-bezier(.22,.68,0,1.15) both; }
.sn-fade { animation: sn-in 1.2s 0.1s both; }
`;

// ─── GALLERY IMAGES (all SYNTHE renders) ────────────────────────────────────

const GALLERY_IMAGES = [
  { src: `${P}/©VISTA_02_EXT_FACHADA_DIURNA_FINAL.webp`,             label: 'Fachada Diurna' },
  { src: `${P}/©VISTA_03_EXT_FACHADA_DETALHE_01_FINAL.webp`,         label: 'Fachada — Detalhe' },
  { src: `${P}/©VISTA_04_EXT_FACHADA_DETALHE_02_FINAL.webp`,         label: 'Fachada — Detalhe 2' },
  { src: `${P}/©VISTA_05_EXT_ACESSO_EXTERNO_OBSERVADOR_FINAL.webp`,  label: 'Acesso Externo' },
  { src: `${P}/©VISTA_06_EXT_INSERCAO_FINAL.webp`, label: 'Inserção Urbana', objectPosition: '58% 62%', pin: { x: 57.5, y: 64 } },
  { src: `${P}/©VISTA_07_EXT_PISCINA_FINAL.webp`,                    label: 'Piscina' },
  { src: `${P}/©VISTA_01_INT_SALÃO_DE_FESTAS_02_FINAL.webp`,         label: 'Salão de Festas' },
  { src: `${P}/©VISTA_10_INT_SALÃO_DE_FESTAS_01_FINAL.webp`,         label: 'Salão de Festas 2' },
  { src: `${P}/©VISTA_12_INT_SALÃO_DE_FESTAS_03_FINAL.webp`,         label: 'Salão de Festas 3' },
  { src: `${P}/©VISTA_11_HALL_FINAL_03_FINAL - HALL .webp`,          label: 'Hall' },
  { src: `${P}/©VISTA_13_FITNESS_FINAL.webp`,                        label: 'Fitness' },
  { src: `${P}/©VISTA_14_INT_ESPAÇO_KIDS_FINAL.webp`,               label: 'Espaço Kids' },
  { src: `${P}/©VISTA_15_INT_APTO_TIPO_01_LIVING_01_FINAL.webp`,    label: 'Living — Vista 1' },
  { src: `${P}/©VISTA_16_INT_APTO_TIPO_01_LIVING_02_FINAL.webp`,    label: 'Living — Vista 2' },
];

// ─── CORRETORES ──────────────────────────────────────────────────────────────

const CORRETORES = [
  '01-alexandra','02-diogo','03-veneza','04-thayla','05-amanda',
  '06-andrea','07-chiara','08-ulisses','09-marcio','10-estefani',
  '11-jorge','12-rogerio','13-karen','14-ana-paula','15-nara',
  '16-amanda-f','17-luciana','18-celso','19-claudio-z','20-cristina',
  '21-claudio-g','22-fabricia','23-rudimar','24-tarcisio','25-roger',
  '26-regina','27-raquel',
];

// ─── SLIDE STRUCTURE ─────────────────────────────────────────────────────────

type Slide =
  | { kind: 'capa' }
  | { kind: 'highlight' }
  | { kind: 'book' }
  | { kind: 'gallery'; img: { src: string; label: string; objectPosition?: string; pin?: { x: number; y: number } }; index: number; total: number }
  | { kind: 'corretores' }
  | { kind: 'imersiva' }
  | { kind: 'meta1' }
  | { kind: 'meta2' }
  | { kind: 'estrategia1' }
  | { kind: 'estrategia2' }
  | { kind: 'cta' };

const SLIDES: Slide[] = [
  { kind: 'capa' },
  { kind: 'highlight' },
  { kind: 'book' },
  ...GALLERY_IMAGES.map((img, i) => ({
    kind: 'gallery' as const,
    img,
    index: i + 1,
    total: GALLERY_IMAGES.length,
  })),
  { kind: 'corretores' },
  { kind: 'imersiva' },
  { kind: 'estrategia1' },
  { kind: 'estrategia2' },
  { kind: 'meta1' },
  { kind: 'meta2' },
  { kind: 'cta' },
];

const TOTAL = SLIDES.length;

// ─── LABEL MAP ───────────────────────────────────────────────────────────────

function slideLabel(s: Slide): string {
  switch (s.kind) {
    case 'capa':        return 'Abertura';
    case 'highlight':   return 'Pré-Lançamento';
    case 'book':        return 'Book Digital';
    case 'gallery':     return s.img.label ?? 'Imagens';
    case 'corretores':  return 'Campanha';
    case 'imersiva':    return 'Sala Imersiva';
    case 'meta1':       return 'Meta 1';
    case 'meta2':       return 'Meta 2';
    case 'estrategia1': return 'Estratégia — Condições';
    case 'estrategia2': return 'Estratégia — Tabela';
    case 'cta':         return 'Material';
    default:            return '';
  }
}

// ─── INDIVIDUAL SLIDE COMPONENTS ─────────────────────────────────────────────

function SlideCapa({ onFullscreen, isFullscreen }: { onFullscreen: () => void; isFullscreen: boolean }) {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-end pb-24">
      <div className="absolute inset-0">
        <Image src={`${P}/©VISTA_02_EXT_FACHADA_DIURNA_FINAL.webp`} alt="SYNTHÈ Fachada" fill
          className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.75) 100%)' }} />
      </div>
      {/* Fullscreen button */}
      <button data-pdf-hide onClick={onFullscreen}
        className="absolute top-6 right-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full transition-all hover:scale-105"
        style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', backdropFilter: 'blur(8px)' }}>
        {isFullscreen
          ? <Minimize className="w-4 h-4 text-white" />
          : <Maximize className="w-4 h-4 text-white" />}
        <span className="sn text-white text-xs tracking-wider">{isFullscreen ? 'SAIR' : 'TELA CHEIA'}</span>
      </button>
      <div className="relative z-10 flex flex-col items-center text-center px-8">
        <p className="sn sn-a0 text-white/60 tracking-[0.35em] uppercase mb-8" style={{ fontSize: 'clamp(0.8rem, 1.2vw, 1rem)' }}>
          APRESENTAÇÃO CORRETORES
        </p>
        <div className="sn-a1 mb-8">
          <Image src={`${P}/logo.png`} alt="SYNTHÈ" width={320} height={96}
            className="brightness-0 invert" style={{ width: 'clamp(220px, 22vw, 340px)', height: 'auto' }} />
        </div>
        <p className="sn sn-a2 text-white/75 italic" style={{ fontSize: 'clamp(1.2rem, 2.2vw, 1.8rem)', letterSpacing: '0.08em', fontWeight: 300 }}>
          A síntese do equilíbrio.
        </p>
        <div className="sn-a3 mt-8 flex items-center gap-4">
          <div style={{ height: '1px', width: '48px', background: 'rgba(255,255,255,0.35)' }} />
          <p className="sn text-white/55 tracking-[0.25em] uppercase" style={{ fontSize: 'clamp(0.75rem, 1vw, 0.9rem)' }}>
            PLAENGE · TGD · MONT&apos;SERRAT · PORTO ALEGRE
          </p>
          <div style={{ height: '1px', width: '48px', background: 'rgba(255,255,255,0.35)' }} />
        </div>
      </div>
    </div>
  );
}

function SlideHighlight() {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden" style={{ background: BG }}>
      <div className="absolute inset-0 sn-fade" style={{ background: `radial-gradient(ellipse 80% 60% at 50% 50%, ${ACC}12 0%, transparent 70%)` }} />
      <div className="relative z-10 flex flex-col items-center text-center px-12">
        <div className="sn-a0 flex items-center gap-5 mb-10">
          <div style={{ height: '1px', width: '70px', background: `${ACC}80` }} />
          <p className="sn tracking-[0.4em] uppercase" style={{ color: ACC, fontSize: 'clamp(0.8rem, 1.2vw, 1rem)', fontWeight: 500 }}>SYNTHÈ · PLAENGE · TGD</p>
          <div style={{ height: '1px', width: '70px', background: `${ACC}80` }} />
        </div>
        <h1 className="sn sn-a1" style={{ color: DARK, fontWeight: 900, fontSize: 'clamp(4.5rem, 10vw, 9rem)', lineHeight: 0.9, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
          NOVA ETAPA
        </h1>
        <h2 className="sn sn-a2" style={{ color: ACC, fontWeight: 900, fontSize: 'clamp(4.5rem, 10vw, 9rem)', lineHeight: 0.9, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
          PRÉ-LANÇAMENTO
        </h2>
        <p className="sn sn-a3 mt-12" style={{ color: `${DARK}60`, fontSize: 'clamp(1rem, 1.6vw, 1.3rem)', fontWeight: 300, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          O momento é agora.
        </p>
      </div>
    </div>
  );
}

function SlideBook() {
  return (
    <div className="relative w-full h-full flex" style={{ background: DARK }}>
      <div className="relative w-1/2 h-full">
        <Image src={`${P}/©VISTA_15_INT_APTO_TIPO_01_LIVING_01_FINAL.webp`} alt="Apartamento SYNTHÈ"
          fill className="object-cover" sizes="50vw" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, transparent 60%, rgba(26,26,26,0.95) 100%)' }} />
      </div>
      <div className="relative z-10 w-1/2 flex flex-col justify-center px-16 py-16">
        <p className="sn sn-a0 tracking-[0.3em] uppercase mb-6" style={{ color: ACC, fontSize: 'clamp(0.8rem, 1.2vw, 1rem)', fontWeight: 500 }}>FERRAMENTA DO CORRETOR</p>
        <h2 className="sn sn-a1" style={{ color: '#FFFFFF', fontWeight: 900, fontSize: 'clamp(3rem, 5.5vw, 5rem)', lineHeight: 0.95, letterSpacing: '-0.01em', textTransform: 'uppercase' }}>
          BOOK DIGITAL<br />COMPLETO
        </h2>
        <div className="sn-a2 mt-8 mb-8" style={{ width: '56px', height: '3px', background: ACC }} />
        <p className="sn sn-a3" style={{ color: 'rgba(255,255,255,0.6)', fontSize: 'clamp(1rem, 1.6vw, 1.3rem)', fontWeight: 300, lineHeight: 1.7, maxWidth: '400px' }}>
          Acesse o material completo do empreendimento: galeria de imagens, plantas, ficha técnica e condições de pagamento.
        </p>
        <div className="sn-a4 mt-12 flex flex-col gap-4">
          {['Galeria de imagens e renders', 'Plantas e tipologias', 'Ficha técnica completa', 'Site do cliente disponível'].map((item, i) => (
            <div key={i} className="flex items-center gap-4">
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: ACC, flexShrink: 0 }} />
              <p className="sn" style={{ color: 'rgba(255,255,255,0.55)', fontSize: 'clamp(0.9rem, 1.4vw, 1.1rem)', fontWeight: 300 }}>{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SlideGallery({ img, index, total }: { img: { src: string; label: string; objectPosition?: string; pin?: { x: number; y: number } }; index: number; total: number }) {
  return (
    <div className="relative w-full h-full">
      <Image src={img.src} alt={img.label} fill className="object-cover" sizes="100vw" priority
        style={{ objectPosition: img.objectPosition ?? 'center center' }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 40%)' }} />
      {/* PIN marker for location slides */}
      {img.pin && (
        <div className="absolute z-20" style={{ left: `${img.pin.x}%`, top: `${img.pin.y}%`, transform: 'translate(-50%, -100%)' }}>
          {/* Drop shadow */}
          <svg width="44" height="58" viewBox="0 0 44 58" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.7))' }}>
            <path d="M22 0C9.85 0 0 9.85 0 22C0 38.5 22 58 22 58C22 58 44 38.5 44 22C44 9.85 34.15 0 22 0Z" fill={ACC} />
            <circle cx="22" cy="22" r="9" fill="white" />
            <circle cx="22" cy="22" r="5" fill={ACC} />
          </svg>
          {/* Label */}
          <div className="sn absolute left-1/2 -bottom-8 whitespace-nowrap px-3 py-1 rounded-full" style={{ transform: 'translateX(-50%)', background: ACC, color: '#fff', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em' }}>
            SYNTHÈ
          </div>
        </div>
      )}
      <div className="absolute bottom-12 left-16 z-10">
        <p className="sn sn-a0 text-white/50 tracking-[0.25em] uppercase mb-2" style={{ fontSize: 'clamp(0.7rem, 1vw, 0.85rem)' }}>
          SYNTHÈ · {index}/{total}
        </p>
        <p className="sn sn-a1 text-white font-medium tracking-wide" style={{ fontSize: 'clamp(1.2rem, 2vw, 1.6rem)' }}>
          {img.label}
        </p>
      </div>
    </div>
  );
}

function SlideCorretores() {
  return (
    <div className="relative w-full h-full flex flex-col" style={{ background: DARK }}>
      <div className="px-16 pt-14 pb-4 flex-shrink-0">
        <p className="sn sn-a0 tracking-[0.3em] uppercase mb-3" style={{ color: ACC, fontSize: 'clamp(0.8rem, 1.2vw, 1rem)', fontWeight: 500 }}>SYNTHÈ · CAMPANHA</p>
        <h2 className="sn sn-a1" style={{ color: '#FFFFFF', fontWeight: 900, fontSize: 'clamp(2.5rem, 4.5vw, 4rem)', lineHeight: 1, textTransform: 'uppercase', letterSpacing: '-0.01em' }}>
          CORRETORES NA CAMPANHA
        </h2>
      </div>
      <div className="flex-1 px-16 pb-10 overflow-hidden sn-a2">
        <div className="grid gap-2 h-full" style={{ gridTemplateColumns: 'repeat(9, 1fr)', gridTemplateRows: 'repeat(3, 1fr)' }}>
          {CORRETORES.map((name, i) => (
            <div key={i} className="relative rounded-lg overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
              <Image
                src={`${P}/capas-corretores/${name}.webp`}
                alt={name}
                fill
                className="object-cover"
                sizes="11vw"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SlideIncentive() {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden" style={{ background: ACC }}>
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 70% 70% at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 70%)' }} />
      <div className="relative z-10 flex flex-col items-center text-center px-12">
        <p className="sn sn-a0 tracking-[0.4em] uppercase mb-10" style={{ color: 'rgba(255,255,255,0.55)', fontSize: 'clamp(0.8rem, 1.2vw, 1rem)', fontWeight: 500 }}>
          VERBA DE MARKETING · APOIO AO CORRETOR
        </p>
        <h2 className="sn sn-a1" style={{ color: '#FFFFFF', fontWeight: 900, fontSize: 'clamp(3.5rem, 6.5vw, 6rem)', lineHeight: 0.95, letterSpacing: '-0.01em', textTransform: 'uppercase' }}>
          IMPULSIONAMENTO
        </h2>
        <div className="sn-a2 my-10" style={{ width: '90px', height: '3px', background: 'rgba(255,255,255,0.35)' }} />
        <p className="sn sn-a3" style={{ color: 'rgba(255,255,255,0.7)', fontSize: 'clamp(1rem, 1.6vw, 1.3rem)', fontWeight: 300, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.2rem' }}>
          SORTEIO
        </p>
        <p className="sn sn-a4" style={{ color: '#FFFFFF', fontWeight: 900, fontSize: 'clamp(4rem, 7.5vw, 7rem)', lineHeight: 0.9, letterSpacing: '-0.02em' }}>
          R$ 5.000
        </p>
        <p className="sn sn-a5 mt-5" style={{ color: 'rgba(255,255,255,0.6)', fontSize: 'clamp(0.9rem, 1.4vw, 1.15rem)', fontWeight: 300, letterSpacing: '0.06em' }}>
          Verba de marketing para apoio aos corretores parceiros
        </p>
      </div>
    </div>
  );
}

function SlideImersiva() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center" style={{ background: DARK }}>
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(193,66,42,0.14) 0%, transparent 70%)' }} />
      <div className="relative z-10 flex flex-col items-center text-center px-16 max-w-4xl">
        <p className="sn sn-a0 tracking-[0.35em] uppercase mb-10" style={{ color: 'rgba(255,255,255,0.35)', fontSize: 'clamp(0.8rem, 1.2vw, 1rem)', fontWeight: 400 }}>
          SYNTHÈ · EXPERIÊNCIA
        </p>
        <div className="sn-a1 relative w-28 h-28 rounded-full flex items-center justify-center mb-12 cursor-pointer"
          style={{ border: `2px solid ${ACC}`, background: `${ACC}20` }}>
          <Play className="w-12 h-12 ml-1" style={{ color: ACC }} />
          <div className="absolute inset-0 rounded-full animate-ping opacity-15" style={{ border: `1px solid ${ACC}` }} />
        </div>
        <h2 className="sn sn-a2" style={{ color: '#FFFFFF', fontWeight: 900, fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 1, textTransform: 'uppercase', letterSpacing: '-0.01em' }}>
          SALA IMERSIVA
        </h2>
        <div className="sn-a3 mt-6" style={{ width: '60px', height: '2px', background: ACC }} />
        <p className="sn sn-a4 mt-8" style={{ color: 'rgba(255,255,255,0.6)', fontSize: 'clamp(1.1rem, 1.8vw, 1.5rem)', fontWeight: 300, lineHeight: 1.6 }}>
          Você está convidado a conhecer o SYNTHÈ na nossa<br />
          <span style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 400 }}>Central de Decorados</span>
        </p>
        <p className="sn sn-a5 mt-6" style={{ color: 'rgba(255,255,255,0.35)', fontSize: 'clamp(0.85rem, 1.3vw, 1.1rem)', fontWeight: 300, letterSpacing: '0.08em' }}>
          Ambiente exclusivo para corretores · Central de Decorados
        </p>
      </div>
    </div>
  );
}

function SlideMeta1() {
  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: DARK }}>
      {/* Car image full bleed */}
      <div className="absolute inset-0 sn-fade">
        <Image src={`${P}/carro-meta1-mg4.webp`} alt="MG4 XPOWER" fill
          className="object-cover" sizes="100vw" style={{ objectPosition: 'center 40%' }} />
      </div>
      {/* Gradient overlays — escurece bordas, texto legível */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.15) 100%)' }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)' }} />
      {/* Text — left side */}
      <div className="absolute left-0 top-0 bottom-0 z-10 flex flex-col justify-center px-20 max-w-2xl">
        <p className="sn sn-a0 tracking-[0.35em] uppercase mb-6" style={{ color: ACC, fontSize: 'clamp(0.8rem, 1.2vw, 1rem)', fontWeight: 500 }}>
          METAS E PRÊMIOS · META 1
        </p>
        <div className="sn-a1 flex items-baseline gap-4 mb-3">
          <span className="sn" style={{ color: '#FFFFFF', fontWeight: 900, fontSize: 'clamp(6rem, 11vw, 10rem)', lineHeight: 0.85, letterSpacing: '-0.03em' }}>10</span>
          <span className="sn" style={{ color: 'rgba(255,255,255,0.55)', fontWeight: 300, fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}>unidades</span>
        </div>
        <p className="sn sn-a2" style={{ color: 'rgba(255,255,255,0.6)', fontSize: 'clamp(1.1rem, 1.8vw, 1.5rem)', fontWeight: 300, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '2rem' }}>em 90 dias</p>
        <div className="sn-a3" style={{ width: '56px', height: '3px', background: ACC, marginBottom: '1.8rem' }} />
        <p className="sn sn-a4" style={{ color: '#FFFFFF', fontWeight: 900, fontSize: 'clamp(2rem, 3.8vw, 3.5rem)', lineHeight: 1, letterSpacing: '-0.01em', textTransform: 'uppercase' }}>
          MG4 XPOWER
        </p>
        <p className="sn sn-a5" style={{ color: 'rgba(255,255,255,0.45)', fontSize: 'clamp(0.9rem, 1.4vw, 1.15rem)', fontWeight: 300, marginTop: '0.6rem' }}>
          Veículo elétrico · Prêmio Meta 1
        </p>
      </div>
    </div>
  );
}

function SlideMeta2() {
  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: DARK }}>
      {/* Car image full bleed */}
      <div className="absolute inset-0 sn-fade">
        <Image src={`${P}/carro-meta2-cyberster.webp`} alt="MG Cyberster" fill
          className="object-cover" sizes="100vw" style={{ objectPosition: 'center 45%' }} />
      </div>
      {/* Gradients */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 55%, rgba(0,0,0,0.1) 100%)' }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 50%)' }} />
      {/* Text — left side */}
      <div className="absolute left-0 top-0 bottom-0 z-10 flex flex-col justify-center px-20 max-w-2xl">
        <div className="sn-a0 flex items-center gap-3 mb-6">
          <div style={{ width: '32px', height: '2px', background: ACC }} />
          <p className="sn tracking-[0.35em] uppercase" style={{ color: ACC, fontSize: 'clamp(0.8rem, 1.2vw, 1rem)', fontWeight: 500 }}>
            META 2 · O PRÊMIO EVOLUI
          </p>
        </div>
        <div className="sn-a1 flex items-baseline gap-4 mb-3">
          <span className="sn" style={{ color: '#FFFFFF', fontWeight: 900, fontSize: 'clamp(6rem, 11vw, 10rem)', lineHeight: 0.85, letterSpacing: '-0.03em' }}>15</span>
          <span className="sn" style={{ color: 'rgba(255,255,255,0.55)', fontWeight: 300, fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}>unidades</span>
        </div>
        <p className="sn sn-a2" style={{ color: 'rgba(255,255,255,0.6)', fontSize: 'clamp(1.1rem, 1.8vw, 1.5rem)', fontWeight: 300, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '2rem' }}>em 90 dias</p>
        <div className="sn-a3" style={{ width: '56px', height: '3px', background: ACC, marginBottom: '1.8rem' }} />
        <p className="sn sn-a4" style={{ color: '#FFFFFF', fontWeight: 900, fontSize: 'clamp(2rem, 3.8vw, 3.5rem)', lineHeight: 1, letterSpacing: '-0.01em', textTransform: 'uppercase' }}>
          MG CYBERSTER
        </p>
        <p className="sn sn-a5" style={{ color: 'rgba(255,255,255,0.45)', fontSize: 'clamp(0.9rem, 1.4vw, 1.15rem)', fontWeight: 300, marginTop: '0.6rem', marginBottom: '1.5rem' }}>
          Esportivo elétrico conversível · Prêmio Meta 2
        </p>
        <div className="sn-a5 px-5 py-3 rounded-full self-start" style={{ background: `${ACC}30`, border: `1px solid ${ACC}60` }}>
          <p className="sn" style={{ color: ACC, fontSize: 'clamp(0.8rem, 1.2vw, 1rem)', fontWeight: 500 }}>
            Atinja a meta 2 e o prêmio evolui do MG4 para o Cyberster
          </p>
        </div>
      </div>
    </div>
  );
}

function SlideEstrategia1() {
  return (
    <div className="relative w-full h-full flex" style={{ background: BG }}>
      <div style={{ width: '6px', background: ACC, flexShrink: 0 }} />
      <div className="flex-1 flex flex-col justify-center px-20 py-16">
        <p className="sn sn-a0 tracking-[0.3em] uppercase mb-6" style={{ color: ACC, fontSize: 'clamp(0.8rem, 1.2vw, 1rem)', fontWeight: 500 }}>ESTRATÉGIA COMERCIAL · 01</p>
        <h2 className="sn sn-a1" style={{ color: DARK, fontWeight: 900, fontSize: 'clamp(2.8rem, 5vw, 4.5rem)', lineHeight: 1, textTransform: 'uppercase', letterSpacing: '-0.01em' }}>
          CONDIÇÕES DA<br />1ª ETAPA<br />MANTIDAS
        </h2>
        <div className="sn-a2 mt-10 mb-10" style={{ width: '60px', height: '3px', background: ACC }} />
        <p className="sn sn-a3" style={{ color: `${DARK}70`, fontSize: 'clamp(1.1rem, 1.8vw, 1.5rem)', fontWeight: 300, lineHeight: 1.6, maxWidth: '560px' }}>
          Todas as parcerias e condições estabelecidas durante a primeira etapa do pré-lançamento serão mantidas nesta nova fase.
        </p>
        <p className="sn sn-a4 mt-8" style={{ color: ACC, fontSize: 'clamp(1rem, 1.5vw, 1.25rem)', fontWeight: 500, letterSpacing: '0.04em' }}>
          Seus clientes continuam com as mesmas vantagens.
        </p>
      </div>
      <div className="relative w-2/5 h-full sn-fade">
        <Image src={`${P}/©VISTA_03_EXT_FACHADA_DETALHE_01_FINAL.webp`} alt="SYNTHÈ"
          fill className="object-cover" sizes="40vw" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(245,242,238,0.9) 0%, rgba(245,242,238,0.2) 60%, transparent 100%)' }} />
      </div>
    </div>
  );
}

function SlideEstrategia2() {
  const units = [
    { unidade: '302',  area: '180,39', valor: '2.952.043,20', entrada: '73.801,08', mensal: '14.702,56', reforco: '73.801,08', saldo: '1.743.550,52', m2: '16.364,78' },
    { unidade: '501',  area: '176,80', valor: '2.966.634,90', entrada: '74.165,87', mensal: '14.775,23', reforco: '74.165,87', saldo: '1.752.168,74', m2: '16.779,61' },
    { unidade: '601',  area: '176,80', valor: '2.992.591,20', entrada: '74.814,78', mensal: '14.904,51', reforco: '74.814,78', saldo: '1.767.499,18', m2: '16.926,42' },
    { unidade: '1201', area: '180,30', valor: '3.159.163,50', entrada: '78.979,09', mensal: '15.734,12', reforco: '78.979,09', saldo: '1.865.880,94', m2: '17.521,71' },
    { unidade: '1502', area: '176,89', valor: '3.159.163,50', entrada: '78.979,09', mensal: '15.734,12', reforco: '78.979,09', saldo: '1.865.880,94', m2: '17.859,48' },
  ];
  const headers = [
    { label: 'Unidade', sub: '' },
    { label: 'Área (m²)', sub: '' },
    { label: 'Valor Pré-venda', sub: '' },
    { label: 'Entrada', sub: '5×' },
    { label: 'Mensais', sub: '32×' },
    { label: 'Reforços', sub: '5×' },
    { label: 'Saldo', sub: '1×' },
    { label: 'R$/m²', sub: '' },
  ];
  const vals = (u: typeof units[0]) => [u.unidade, u.area, u.valor, u.entrada, u.mensal, u.reforco, u.saldo, u.m2];
  return (
    <div className="relative w-full h-full flex flex-col" style={{ background: DARK }}>
      <div className="px-14 pt-12 pb-6 flex-shrink-0">
        <p className="sn sn-a0 tracking-[0.3em] uppercase mb-3" style={{ color: ACC, fontSize: 'clamp(0.75rem, 1.1vw, 0.9rem)', fontWeight: 500 }}>ESTRATÉGIA COMERCIAL · 02</p>
        <p className="sn sn-a1" style={{ color: 'rgba(255,255,255,0.5)', fontSize: 'clamp(0.85rem, 1.3vw, 1.1rem)', fontWeight: 300 }}>
          5 unidades selecionadas · condições especiais de pré-lançamento
        </p>
      </div>
      <div className="flex-1 px-14 pb-12 sn-a2 flex flex-col justify-center">
        <table className="w-full" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${ACC}60` }}>
              {headers.map((h, i) => (
                <th key={i} className="sn text-left pb-4" style={{
                  color: ACC,
                  fontSize: 'clamp(0.65rem, 0.9vw, 0.78rem)',
                  fontWeight: 500,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  paddingRight: i < headers.length - 1 ? '1.2rem' : 0,
                  whiteSpace: 'nowrap',
                }}>
                  {h.label}{h.sub && <span style={{ color: 'rgba(255,255,255,0.3)', marginLeft: '4px' }}>{h.sub}</span>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {units.map((u, i) => (
              <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                {vals(u).map((v, j) => (
                  <td key={j} className="sn" style={{
                    paddingTop: 'clamp(14px, 2.2vh, 22px)',
                    paddingBottom: 'clamp(14px, 2.2vh, 22px)',
                    paddingRight: j < vals(u).length - 1 ? '1.2rem' : 0,
                    color: j === 0 ? '#FFFFFF' : j === 2 ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.6)',
                    fontWeight: j === 0 ? 700 : j === 2 ? 500 : 300,
                    fontSize: j === 0
                      ? 'clamp(1rem, 1.5vw, 1.25rem)'
                      : 'clamp(0.8rem, 1.15vw, 0.95rem)',
                    whiteSpace: 'nowrap',
                  }}>
                    {j === 0 ? v : j === 1 ? v : `R$ ${v}`}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SlideCta() {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden" style={{ background: DARK }}>
      <div className="absolute inset-0">
        <Image src={`${P}/©VISTA_05_EXT_ACESSO_EXTERNO_OBSERVADOR_FINAL.webp`} alt="SYNTHÈ"
          fill className="object-cover" sizes="100vw" style={{ opacity: 0.15 }} />
      </div>
      <div className="relative z-10 flex flex-col items-center text-center px-12">
        <div className="sn-a0 mb-10">
          <Image src={`${P}/logo.png`} alt="SYNTHÈ" width={240} height={72}
            className="brightness-0 invert" style={{ width: 'clamp(180px, 17vw, 240px)', height: 'auto', opacity: 0.9 }} />
        </div>
        <p className="sn sn-a1 tracking-[0.35em] uppercase mb-12" style={{ color: 'rgba(255,255,255,0.45)', fontSize: 'clamp(0.8rem, 1.2vw, 1rem)' }}>
          ACESSE O MATERIAL COMPLETO
        </p>
        <div className="sn-a2 flex gap-16 items-center">
          <div className="flex flex-col items-center gap-4">
            <div style={{ width: 'clamp(160px, 16vw, 200px)', height: 'clamp(160px, 16vw, 200px)', borderRadius: '14px', overflow: 'hidden', background: '#FFFFFF', padding: '8px', position: 'relative' }}>
              <Image src={`${P}/qrcode-synthe.webp`} alt="QR Code SYNTHÈ" fill className="object-contain" sizes="200px" />
            </div>
            <p className="sn" style={{ color: 'rgba(255,255,255,0.25)', fontSize: 'clamp(0.7rem, 0.9vw, 0.8rem)', letterSpacing: '0.08em' }}>
              Escaneie para acessar
            </p>
          </div>
          <div className="flex flex-col items-center justify-center gap-5">
            <p className="sn" style={{ color: 'rgba(255,255,255,0.3)', fontSize: 'clamp(0.75rem, 1vw, 0.9rem)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>ou acesse</p>
            <a href="https://grupo-plaenge.vercel.app/synthe" target="_blank" rel="noopener noreferrer"
              className="sn flex items-center gap-3 px-10 py-4 rounded-full transition-all hover:scale-105"
              style={{ background: ACC, color: '#FFFFFF', fontWeight: 700, fontSize: 'clamp(1rem, 1.6vw, 1.3rem)', letterSpacing: '0.06em', textDecoration: 'none' }}>
              Clique aqui
            </a>
          </div>
        </div>
        <div className="sn-a3 mt-14" style={{ height: '1px', width: '70px', background: `${ACC}45` }} />
        <p className="sn sn-a4 mt-5" style={{ color: 'rgba(255,255,255,0.25)', fontSize: 'clamp(0.75rem, 1vw, 0.9rem)', letterSpacing: '0.25em', textTransform: 'uppercase' }}>
          PLAENGE · TGD · MONT&apos;SERRAT · PORTO ALEGRE
        </p>
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function SynthePptCorretor() {
  const [slide, setSlide] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback((n: number) => {
    if (n < 0 || n >= TOTAL) return;
    setSlide(n);
    setAnimKey(k => k + 1);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (['ArrowRight', 'ArrowDown', ' '].includes(e.key)) { e.preventDefault(); goTo(slide + 1); }
      if (['ArrowLeft', 'ArrowUp'].includes(e.key)) { e.preventDefault(); goTo(slide - 1); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [slide, goTo]);

  useEffect(() => {
    const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  }, []);

  const current = SLIDES[slide];

  const isLightSlide = current.kind === 'capa' ||
    (current.kind === 'gallery') ||
    current.kind === 'estrategia1';

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden select-none" style={{ background: DARK }}>
      <style>{FONT_CSS}</style>

      {/* Slide content */}
      <div key={animKey} className="w-full h-full">
        {current.kind === 'capa'        && <SlideCapa onFullscreen={toggleFullscreen} isFullscreen={isFullscreen} />}
        {current.kind === 'highlight'   && <SlideHighlight />}
        {current.kind === 'book'        && <SlideBook />}
        {current.kind === 'gallery'     && <SlideGallery img={current.img} index={current.index} total={current.total} />}
        {current.kind === 'corretores'  && <SlideCorretores />}
        {current.kind === 'incentive'   && <SlideIncentive />}
        {current.kind === 'imersiva'    && <SlideImersiva />}
        {current.kind === 'meta1'       && <SlideMeta1 />}
        {current.kind === 'meta2'       && <SlideMeta2 />}
        {current.kind === 'estrategia1' && <SlideEstrategia1 />}
        {current.kind === 'estrategia2' && <SlideEstrategia2 />}
        {current.kind === 'cta'         && <SlideCta />}
      </div>

      {/* Top bar */}
      <div data-pdf-hide className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-10 py-5 pointer-events-none">
        <div className="flex items-center gap-3">
          <div style={{ width: '22px', height: '1px', background: isLightSlide ? 'rgba(255,255,255,0.35)' : `${ACC}55` }} />
          <span className="sn tracking-[0.25em] uppercase" style={{ color: isLightSlide ? 'rgba(255,255,255,0.45)' : `${DARK}55`, fontSize: '0.72rem', fontWeight: 400 }}>
            {slideLabel(current)}
          </span>
        </div>
        <span className="sn tabular-nums" style={{ color: isLightSlide ? 'rgba(255,255,255,0.3)' : `${DARK}35`, fontSize: '0.72rem', fontWeight: 300, letterSpacing: '0.15em' }}>
          {String(slide + 1).padStart(2, '0')} / {String(TOTAL).padStart(2, '0')}
        </span>
      </div>

      {/* Progress bar */}
      <div data-pdf-hide className="absolute bottom-0 left-0 right-0 z-40 h-0.5" style={{ background: 'rgba(255,255,255,0.06)' }}>
        <div style={{ width: `${((slide + 1) / TOTAL) * 100}%`, height: '100%', background: ACC, transition: 'width 0.45s cubic-bezier(.4,0,.2,1)' }} />
      </div>

      {/* Dot nav */}
      <div data-pdf-hide className="absolute bottom-3 left-0 right-0 z-40 flex justify-center gap-1.5 flex-wrap px-8">
        {Array.from({ length: TOTAL }).map((_, i) => (
          <button key={i} onClick={() => goTo(i)}
            className="transition-all duration-300"
            style={{
              width: i === slide ? '18px' : '5px',
              height: '5px',
              borderRadius: '3px',
              background: i === slide ? ACC : 'rgba(255,255,255,0.18)',
            }} />
        ))}
      </div>

      {/* Arrow nav */}
      {slide > 0 && (
        <button data-pdf-hide onClick={() => goTo(slide - 1)}
          className="absolute left-0 top-12 bottom-8 w-20 z-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
          <ChevronLeft className="w-8 h-8" style={{ color: isLightSlide ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.3)' }} />
        </button>
      )}
      {slide < TOTAL - 1 && (
        <button data-pdf-hide onClick={() => goTo(slide + 1)}
          className="absolute right-0 top-12 bottom-8 w-20 z-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
          <ChevronRight className="w-8 h-8" style={{ color: isLightSlide ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.3)' }} />
        </button>
      )}
    </div>
  );
}
