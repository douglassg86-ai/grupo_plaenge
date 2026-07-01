'use client';

import Image from 'next/image';
import { useRef, useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const P  = '/TREND';
const PL = '/TREND/plantas';

/* ─── Tipos ─────────────────────────────────────────────── */
type Slide =
  | { kind: 'cover' }
  | { kind: 'image'; src: string; caption?: string; subcaption?: string; position?: string; contain?: boolean; whiteBg?: boolean }
  | { kind: 'chapter'; num: string; title: string; subtitle?: string }
  | { kind: 'text'; super?: string; title: string; body?: string; items?: string[]; cols?: string[][] };

/*
 * Roteiro HOME — Torre 1 apenas
 * Slides removidos (instrução do usuário, numeração 1-based):
 * 31 (PNB_36), 34 (PNB_PB_17), 36 (PNB_PB_19), 38-45 (PNB_PB_21..31)
 */
const SLIDES: Slide[] = [
  /* 1 · CAPA */
  { kind: 'cover' },

  /* ══ CAP 01 — O COMPLEXO ════════════════════════════════ */
  /* 2 */ { kind: 'chapter', num: '01', title: 'O\nComplexo', subtitle: 'Trend Downtown · Porto Alegre' },

  /* 3 */ { kind: 'text',
    super: 'CONCEITO',
    title: 'Sua vida\nno centro\nde tudo.',
    body: 'O Trend Downtown Home reúne em um único endereço na Rua General Lima e Silva duas torres residenciais com lazer completo no 7º pavimento, acesso ao mall de serviços e a conveniência do bairro Azenha — um dos mais dinâmicos de Porto Alegre.',
  },

  /* 4 */ { kind: 'image', src: `${P}/PNB_01_Fotomontagem_EF.webp`,
    caption: 'Fotomontagem', subcaption: 'Complexo Trend Downtown — Av. Azenha, Porto Alegre', position: 'center 40%' },

  /* 5 */ { kind: 'image', src: `${P}/PNB_02_Fachada_Azenha_EF.webp`,
    caption: 'Fachada', subcaption: 'Av. Azenha', position: 'center 40%' },

  /* 6 */ { kind: 'image', src: `${P}/PNB_03_Fachada_Lima_EF.webp`,
    caption: 'Fachada', subcaption: 'Rua General Lima e Silva', position: 'center 65%' },

  /* 7 */ { kind: 'image', src: `${P}/PNB_08_Mall_Acesso_EF.webp`,
    caption: 'Mall', subcaption: 'Acesso Principal', position: 'center 40%' },
  /* 8 */ { kind: 'image', src: `${P}/PNB_09_Mall_Interno_EF2.webp`,
    caption: 'Mall', subcaption: 'Interno', position: 'center 40%' },
  /* 9 */ { kind: 'image', src: `${P}/PNB_10_Mall_Interno_B_EF.webp`,
    caption: 'Mall', subcaption: 'Galeria de Serviços', position: 'center 40%' },

  /* 10 */ { kind: 'image', src: `${PL}/PNB_PB_01_Implantacao_Terreo_EF.webp`,
    caption: 'Implantação', subcaption: 'Térreo · Mall + Acessos', contain: true, whiteBg: true },
  /* 11 */ { kind: 'image', src: `${PL}/PNB_PB_02_Implantacao_2o_Pavimento_EF.webp`,
    caption: 'Implantação', subcaption: '2º Pavimento', contain: true, whiteBg: true },

  /* ══ CAP 02 — LAZER 7º PAVIMENTO ════════════════════════ */
  /* 12 */ { kind: 'chapter', num: '02', title: 'Lazer\n3º Pav', subtitle: 'Downtown Home · Área de lazer completa' },

  /* 13 */ { kind: 'image', src: `${P}/PNB_04_Fachada_Residencial_A_EF.webp`,
    caption: 'Downtown Home', subcaption: 'Torre 1 — Fachada Residencial', position: 'center 40%' },

  /* 14 */ { kind: 'text',
    super: 'TREND DOWNTOWN HOME · LAZER 3º PAVIMENTO',
    title: 'Um pavimento\ninteiro\npara você.',
    cols: [
      [ 'Piscina adulto e infantil', 'Beach Tennis', 'Quadra infantil', 'Fitness moderno', 'Espaço Kids coberto' ],
      [ 'Salão de festas A e B', 'Espaço Gourmet externo', 'Espaço Pet', 'Coworking', 'Hall social de entrada' ],
    ],
  },

  /* 15 */ { kind: 'image', src: `${P}/PNB_24_Residencial_Hall_EF.webp`,
    caption: 'Hall Social', subcaption: 'Downtown Home', position: 'center 35%' },

  /* 16 */ { kind: 'image', src: `${P}/PNB_19_Residencial_Fitness_EF.webp`,
    caption: 'Fitness', subcaption: 'Downtown Home', position: 'center 35%' },

  /* 17 */ { kind: 'image', src: `${P}/PNB_21_Residencial_Festas_A_EF.webp`,
    caption: 'Salão de Festas A', subcaption: 'Downtown Home', position: 'center 35%' },
  /* 18 */ { kind: 'image', src: `${P}/PNB_22_Residencial_Festas_B_EF.webp`,
    caption: 'Salão de Festas B', subcaption: 'Downtown Home', position: 'center 35%' },

  /* 19 */ { kind: 'image', src: `${P}/PNB_17_Residencial_Gourmet_Externo_EF.webp`,
    caption: 'Espaço Gourmet', subcaption: 'Downtown Home', position: 'center 35%' },

  /* 20 */ { kind: 'image', src: `${P}/PNB_23_Residencial_Coworking_EF_v1.webp`,
    caption: 'Coworking', subcaption: 'Downtown Home', position: 'center 35%' },

  /* 21 */ { kind: 'image', src: `${P}/PNB_20_Residencial_Kids_EF.webp`,
    caption: 'Espaço Kids', subcaption: 'Downtown Home', position: 'center 35%' },

  /* 22 */ { kind: 'image', src: `${P}/PNB_13_Residencial_Piscina_EF_V2.webp`,
    caption: 'Piscina', subcaption: 'Downtown Home', position: 'center 40%' },

  /* 23 */ { kind: 'image', src: `${P}/PNB_15_Residencial_Beach_Tennis_EF.webp`,
    caption: 'Beach Tennis', subcaption: 'Downtown Home', position: 'center 40%' },

  /* 24 */ { kind: 'image', src: `${P}/PNB_16_Residencial_Quadra_Infantil_EF.webp`,
    caption: 'Quadra Infantil', subcaption: 'Downtown Home', position: 'center 40%' },

  /* 25 */ { kind: 'image', src: `${P}/PNB_14_Residencial_Kids_Externo_EF.webp`,
    caption: 'Kids Externo', subcaption: 'Downtown Home', position: 'center 40%' },

  /* 26 */ { kind: 'image', src: `${P}/PNB_18_Residencial_Espaco_Pet_EF.webp`,
    caption: 'Espaço Pet', subcaption: 'Downtown Home', position: 'center 35%' },

  /* 27 */ { kind: 'image', src: `${PL}/PNB_PB_03_Implantacao_3o_Pavimento_EF.webp`,
    caption: 'Implantação', subcaption: 'Downtown Home · 3º Pavimento — Lazer Condominial', contain: true, whiteBg: true },

  /* ══ CAP 03 — APARTAMENTOS ══════════════════════════════ */
  /* 28 */ { kind: 'chapter', num: '03', title: 'Aparta-\nmentos', subtitle: 'Torre 1 · Rua Gen. Lima e Silva, 1462' },

  /* 29 */ { kind: 'text',
    super: 'TREND DOWNTOWN HOME · TORRE 1',
    title: 'Projetos que\ncabem na sua\nvida.',
    body: 'O Downtown Home Torre 1 oferece três tipologias de planta — 77 m² com 2 suítes, 88 m² com 3 dormitórios e suíte e 109 m² com 3 dormitórios e suíte — todas disponíveis com ou sem sacada.',
  },

  /* 30 */ { kind: 'image', src: `${P}/PNB_35_Residencial_Living_T1_Tipo_A_EF2.webp`,
    caption: 'Living', subcaption: 'Downtown Home · Torre 1', position: 'center 35%' },

  /* slide 31 (PNB_36 — T2 living) REMOVIDO */

  /* 31 */ { kind: 'image', src: `${P}/PNB_37_Residencial_Suite_Master_T2_Tipo_B_EF.webp`,
    caption: 'Suíte Master', subcaption: 'Downtown Home · Torre 1', position: 'center 35%' },

  /* 32 */ { kind: 'image', src: `${PL}/PNB_PB_16_Planta_Residencial_T1A_Apto_01_EF_2.webp`,
    caption: 'Planta 109 m²', subcaption: '3 Dormitórios · Suíte', contain: true, whiteBg: true },

  /* slide 34 (PNB_PB_17 — T1A Apto 02) REMOVIDO */

  /* 33 */ { kind: 'image', src: `${PL}/PNB_PB_18_Planta_Residencial_T1A_Apto_04_EF_2.webp`,
    caption: 'Planta 77 m²', subcaption: '2 Suítes', contain: true, whiteBg: true },

  /* slide 36 (PNB_PB_19 — T1B Apto 01) REMOVIDO */

  /* 34 */ { kind: 'image', src: `${PL}/PNB_PB_20_Planta_Residencial_T1B_Apto_02_EF_2.webp`,
    caption: 'Planta 88 m²', subcaption: '3 Dormitórios · Suíte', contain: true, whiteBg: true },

  /* slides 38-45 (T1B Apto 04 + todos T2) REMOVIDOS */

  /* ══ CAP 04 — FICHA TÉCNICA ════════════════════════════ */
  /* 35 */ { kind: 'chapter', num: '04', title: 'Ficha\nTécnica', subtitle: 'Trend Downtown Home · Dados do Empreendimento' },

  /* 36 */ { kind: 'text',
    super: 'TREND DOWNTOWN HOME · FICHA TÉCNICA',
    title: 'Morar bem,\nno centro\nde Porto Alegre.',
    items: [
      'Localização — Rua General Lima e Silva, 1462 · Porto Alegre/RS',
      'Torre 1 — 77 m² (2 suítes) · 88 m² (3D com suíte) · 109 m² (3D com suíte)',
      'Todas as tipologias disponíveis com e sem sacada',
      'Lazer — 3º Pavimento completo com piscina, fitness, beach tennis, festas, kids, pet e coworking',
      'Mall — 22 lojas de serviços e conveniência com acesso direto',
      'Arquitetura — IDEAI1',
      'Conceito — Smart Arquitetura',
      'Iluminação — Lumin Studio Sandra Thomé',
      'Interiores — Maena Design Conecta',
      'Paisagismo — Creare Paisagismo',
    ],
  },

  /* ENCERRAMENTO */
  /* 37 */ { kind: 'image', src: `${P}/PNB_04_Fachada_Residencial_A_EF.webp`,
    caption: 'TREND DOWNTOWN HOME', subcaption: 'Sua vida no centro de tudo.', position: 'center 40%' },
];

/* ─── Props ─────────────────────────────────────────────── */
interface Props {
  currentSlide: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

/* ─── Componente principal ──────────────────────────────── */
export function TrendHomePresentationMode({ currentSlide, onClose, onPrev, onNext }: Props) {
  const slide = SLIDES[currentSlide];
  const containerRef = useRef<HTMLDivElement>(null);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => { setAnimKey(k => k + 1); }, [currentSlide]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.requestFullscreen?.().catch(() => {});
    return () => { if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {}); };
  }, []);

  useEffect(() => {
    const h = () => { if (!document.fullscreenElement) onClose(); };
    document.addEventListener('fullscreenchange', h);
    return () => document.removeEventListener('fullscreenchange', h);
  }, [onClose]);

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') { document.exitFullscreen?.().catch(() => {}); onClose(); }
    if (e.key === 'ArrowRight' || e.key === ' ') {
      e.preventDefault();
      if (currentSlide < SLIDES.length - 1) onNext();
    }
    if (e.key === 'ArrowLeft') {
      if (currentSlide > 0) onPrev();
    }
  }, [onClose, onNext, onPrev, currentSlide]);

  useEffect(() => {
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  const chapterLabels = ['O Complexo', 'Lazer 7º Pav', 'Apartamentos', 'Ficha Técnica'];
  let chapterCount = -1;
  for (let i = 0; i <= currentSlide; i++) {
    if (SLIDES[i].kind === 'chapter') chapterCount++;
  }
  const chapterLabel = chapterCount >= 0 && chapterCount < chapterLabels.length ? chapterLabels[chapterCount] : '';

  const BG  = '#F5F2EE';
  const ACC = '#C1422A';

  return (
    <div ref={containerRef} className="fixed inset-0 z-[200] select-none overflow-hidden" style={{ background: BG }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,200;0,300;0,400;0,600;0,700;1,300&family=Jost:wght@200;300;400;500&display=swap');
        .th-serif { font-family: 'Raleway', system-ui, sans-serif; }
        .th-sans  { font-family: 'Jost', system-ui, sans-serif; }
        @keyframes th-enter { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
        .th-anim-1 { animation: th-enter 0.7s cubic-bezier(.22,.68,0,1.2) both; }
        .th-anim-2 { animation: th-enter 0.7s 0.12s cubic-bezier(.22,.68,0,1.2) both; }
        .th-anim-3 { animation: th-enter 0.7s 0.24s cubic-bezier(.22,.68,0,1.2) both; }
        .th-caption-anim { animation: th-enter 0.9s 0.2s cubic-bezier(.22,.68,0,1.2) both; }
      `}</style>

      {/* ── Top bar ──────────────────────────────────── */}
      <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-8 py-5">
        <div className="flex items-center gap-4">
          <span className="th-sans font-light tracking-[0.25em] text-xs uppercase" style={{ color: '#1A1A1A' }}>TREND DOWNTOWN HOME</span>
          {chapterLabel && (
            <>
              <span className="w-px h-3" style={{ background: 'rgba(0,0,0,0.15)' }} />
              <span className="th-sans font-light tracking-widest text-xs uppercase" style={{ color: 'rgba(0,0,0,0.35)' }}>{chapterLabel}</span>
            </>
          )}
        </div>
        <div className="flex items-center gap-5">
          <span className="th-sans text-xs tabular-nums font-light" style={{ color: 'rgba(0,0,0,0.3)' }}>
            {String(currentSlide + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
          </span>
          <button
            onClick={() => { document.exitFullscreen?.().catch(() => {}); onClose(); }}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-black/10"
            style={{ border: '1px solid rgba(0,0,0,0.15)' }}
            aria-label="Fechar apresentação"
          >
            <X className="w-3.5 h-3.5" style={{ color: 'rgba(0,0,0,0.4)' }} />
          </button>
        </div>
      </div>

      {/* ── Slide ────────────────────────────────────── */}
      <div className="absolute inset-0">
        {slide.kind === 'cover'   && <HomeCoverSlide   key={animKey} bg={BG} acc={ACC} />}
        {slide.kind === 'image'   && <HomeImageSlide   key={animKey} slide={slide} bg={BG} acc={ACC} />}
        {slide.kind === 'chapter' && <HomeChapterSlide key={animKey} slide={slide} bg={BG} acc={ACC} />}
        {slide.kind === 'text'    && <HomeTextSlide    key={animKey} slide={slide} bg={BG} acc={ACC} />}
      </div>

      {/* ── Navegação ────────────────────────────────── */}
      <button onClick={onPrev} disabled={currentSlide === 0}
        className="absolute left-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-0 hover:bg-black/10"
        style={{ border: '1px solid rgba(0,0,0,0.15)' }} aria-label="Slide anterior">
        <ChevronLeft className="w-5 h-5" style={{ color: 'rgba(0,0,0,0.4)' }} />
      </button>
      <button onClick={onNext} disabled={currentSlide === SLIDES.length - 1}
        className="absolute right-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-0 hover:bg-black/10"
        style={{ border: '1px solid rgba(0,0,0,0.15)' }} aria-label="Próximo slide">
        <ChevronRight className="w-5 h-5" style={{ color: 'rgba(0,0,0,0.4)' }} />
      </button>

      {/* ── Barra de progresso ───────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 z-30 h-px" style={{ background: 'rgba(0,0,0,0.1)' }}>
        <div className="h-full transition-all duration-500 ease-out"
          style={{ width: `${((currentSlide + 1) / SLIDES.length) * 100}%`, background: ACC }} />
      </div>

      {/* ── Dots ─────────────────────────────────────── */}
      <div className="absolute bottom-4 left-0 right-0 z-30 flex justify-center gap-2 flex-wrap px-20">
        {SLIDES.map((s, i) => {
          const isChap = s.kind === 'chapter';
          const isCur  = i === currentSlide;
          return (
            <button key={i}
              onClick={() => {
                const d = i - currentSlide;
                if (d > 0) for (let j = 0; j < d; j++) onNext();
                else if (d < 0) for (let j = 0; j < -d; j++) onPrev();
              }}
              className="transition-all duration-300"
              style={{
                width: isCur ? '20px' : isChap ? '6px' : '4px',
                height: isChap ? '6px' : '4px',
                borderRadius: '9999px',
                background: isCur ? ACC : isChap ? `${ACC}66` : 'rgba(0,0,0,0.2)',
              }}
              aria-label={`Slide ${i + 1}`}
            />
          );
        })}
      </div>
    </div>
  );
}

/* ─── HomeCoverSlide ─────────────────────────────────────── */
function HomeCoverSlide({ bg, acc }: { bg: string; acc: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-full" style={{ background: bg }}>
      <Image
        src={`${P}/PNB_04_Fachada_Residencial_A_EF.webp`}
        alt=""
        fill
        className="object-cover"
        style={{ objectPosition: 'center 40%', opacity: 0.08 }}
        sizes="100vw"
        priority
      />
      <div className="relative z-10 flex flex-col items-center gap-8">
        <div className="th-anim-1">
          <Image
            src={`${P}/logo_home.png`}
            alt="TREND DOWNTOWN HOME"
            width={480}
            height={120}
            className="object-contain"
            priority
          />
        </div>
        <div className="th-anim-2 flex items-center gap-4" style={{ width: '320px' }}>
          <div style={{ flex: 1, height: '1px', background: `${acc}66` }} />
          <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: acc }} />
          <div style={{ flex: 1, height: '1px', background: `${acc}66` }} />
        </div>
        <p className="th-sans th-anim-2 font-light" style={{ color: 'rgba(0,0,0,0.45)', fontSize: 'clamp(0.8rem, 1.5vw, 1rem)', letterSpacing: '0.3em' }}>
          SUA VIDA NO CENTRO DE TUDO
        </p>
        {/* Parceiros em preto */}
        <div className="th-anim-3 flex flex-col items-center gap-1" style={{ marginTop: '0.5rem' }}>
          <p className="th-sans font-light" style={{ color: 'rgba(0,0,0,0.3)', fontSize: '0.6rem', letterSpacing: '0.2em' }}>
            UMA REALIZAÇÃO
          </p>
          <p className="th-sans font-semibold" style={{ color: 'rgba(0,0,0,0.65)', fontSize: '0.7rem', letterSpacing: '0.25em' }}>
            MAIOJAMA · VANGUARD · FUNDO PHORBIS
          </p>
        </div>
        <div className="th-anim-3 flex flex-col items-center gap-1" style={{ marginTop: '0.25rem' }}>
          <p className="th-sans font-light" style={{ color: 'rgba(0,0,0,0.3)', fontSize: '0.6rem', letterSpacing: '0.25em' }}>
            RUA GEN. LIMA E SILVA, 1462 · PORTO ALEGRE, RS
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── HomeImageSlide ─────────────────────────────────────── */
function HomeImageSlide({ slide, bg, acc }: { slide: Extract<Slide, { kind: 'image' }>; bg: string; acc: string }) {
  const isContain = slide.contain;
  const slideBg = slide.whiteBg ? '#FFFFFF' : bg;
  const captionDark = slide.whiteBg;
  return (
    <>
      {isContain && <div className="absolute inset-0" style={{ background: slideBg }} />}
      <Image
        src={slide.src}
        alt={slide.caption ?? 'TREND DOWNTOWN HOME'}
        fill
        className={isContain ? 'object-contain' : 'object-cover'}
        style={!isContain ? { objectPosition: slide.position ?? 'center 40%' } : { padding: '56px 80px 88px' }}
        sizes="100vw"
        priority
      />
      {!isContain && (
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, transparent 30%, transparent 55%, rgba(0,0,0,0.65) 100%)'
        }} />
      )}
      {isContain && !slide.whiteBg && (
        <div className="absolute inset-x-0 bottom-0" style={{
          height: '150px',
          background: `linear-gradient(to top, ${slideBg}FA 0%, transparent 100%)`
        }} />
      )}
      {(slide.caption || slide.subcaption) && (
        <div className="th-caption-anim absolute bottom-12 left-12 right-24">
          <div className="mb-3" style={{ width: '40px', height: '1px', background: acc }} />
          {slide.caption && (
            <p className="th-serif font-bold leading-none mb-2"
              style={{ fontSize: 'clamp(1.4rem, 2.8vw, 2.4rem)', color: captionDark ? '#1A1A1A' : '#fff', letterSpacing: '-0.01em' }}>
              {slide.caption}
            </p>
          )}
          {slide.subcaption && (
            <p className="th-sans font-light" style={{ fontSize: 'clamp(0.6rem, 0.9vw, 0.75rem)', letterSpacing: '0.15em', color: captionDark ? 'rgba(0,0,0,0.45)' : 'rgba(255,255,255,0.55)' }}>
              {slide.subcaption.toUpperCase()}
            </p>
          )}
        </div>
      )}
    </>
  );
}

/* ─── HomeChapterSlide ───────────────────────────────────── */
function HomeChapterSlide({ slide, bg, acc }: { slide: Extract<Slide, { kind: 'chapter' }>; bg: string; acc: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-full" style={{ background: bg }}>
      <div className="relative z-10 text-center px-12">
        <p className="th-sans th-anim-1 font-light mb-8" style={{ color: acc, fontSize: 'clamp(0.6rem, 1vw, 0.75rem)', letterSpacing: '0.35em' }}>
          CAPÍTULO {slide.num}
        </p>
        <div className="th-anim-1 mx-auto mb-8" style={{ width: '60px', height: '1px', background: acc }} />
        <h2 className="th-serif th-anim-2 font-bold leading-none" style={{ fontSize: 'clamp(3.5rem, 9vw, 8rem)', whiteSpace: 'pre-line', color: '#1A1A1A', letterSpacing: '-0.02em' }}>
          {slide.title}
        </h2>
        {slide.subtitle && (
          <p className="th-sans th-anim-3 font-light mt-6" style={{ color: 'rgba(0,0,0,0.35)', fontSize: 'clamp(0.65rem, 1vw, 0.8rem)', letterSpacing: '0.2em' }}>
            {slide.subtitle.toUpperCase()}
          </p>
        )}
      </div>
    </div>
  );
}

/* ─── HomeTextSlide ──────────────────────────────────────── */
function HomeTextSlide({ slide, bg, acc }: { slide: Extract<Slide, { kind: 'text' }>; bg: string; acc: string }) {
  const hasColumns = slide.cols && slide.cols.length === 2;
  const hasItems   = slide.items && slide.items.length > 0;

  return (
    <div className="flex flex-col justify-center h-full px-16 md:px-24" style={{ background: bg }}>
      <div className="relative z-10 max-w-5xl">
        {slide.super && (
          <p className="th-sans th-anim-1 font-light mb-5" style={{ color: acc, fontSize: 'clamp(0.55rem, 0.9vw, 0.7rem)', letterSpacing: '0.3em' }}>
            {slide.super}
          </p>
        )}
        <div className="th-anim-1 mb-6" style={{ width: '40px', height: '1px', background: acc }} />
        <h2 className="th-serif th-anim-2 font-bold leading-none mb-8" style={{ fontSize: 'clamp(2.4rem, 5.5vw, 5rem)', whiteSpace: 'pre-line', color: '#1A1A1A', letterSpacing: '-0.02em' }}>
          {slide.title}
        </h2>
        {slide.body && (
          <p className="th-sans th-anim-3 font-light leading-relaxed max-w-xl" style={{ color: 'rgba(0,0,0,0.5)', fontSize: 'clamp(0.85rem, 1.2vw, 1rem)' }}>
            {slide.body}
          </p>
        )}
        {hasItems && (
          <ul className="th-anim-3 space-y-3">
            {slide.items!.map((item, i) => {
              const [label, value] = item.split(' — ');
              return (
                <li key={i} className="flex items-baseline gap-3">
                  <span className="th-sans font-light shrink-0" style={{ color: acc, fontSize: '0.55rem' }}>◆</span>
                  {value ? (
                    <span className="th-sans font-light" style={{ color: 'rgba(0,0,0,0.55)', fontSize: 'clamp(0.75rem, 1.1vw, 0.9rem)' }}>
                      <span style={{ color: 'rgba(0,0,0,0.85)' }}>{label}</span>
                      <span style={{ color: 'rgba(0,0,0,0.25)' }}> — </span>
                      {value}
                    </span>
                  ) : (
                    <span className="th-sans font-light" style={{ color: 'rgba(0,0,0,0.65)', fontSize: 'clamp(0.75rem, 1.1vw, 0.9rem)' }}>{label}</span>
                  )}
                </li>
              );
            })}
          </ul>
        )}
        {hasColumns && (
          <div className="th-anim-3 grid grid-cols-2 gap-x-12 gap-y-3 mt-2">
            {slide.cols!.map((col, ci) => (
              <ul key={ci} className="space-y-3">
                {col.map((item, idx) => (
                  <li key={idx} className="flex items-baseline gap-3">
                    <span className="th-sans font-light shrink-0" style={{ color: acc, fontSize: '0.5rem' }}>◆</span>
                    <span className="th-sans font-light" style={{ color: 'rgba(0,0,0,0.6)', fontSize: 'clamp(0.7rem, 1vw, 0.85rem)', lineHeight: '1.5' }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
