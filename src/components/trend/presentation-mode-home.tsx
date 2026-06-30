'use client';

import Image from 'next/image';
import { useRef, useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const P  = '/TREND';
const PL = '/TREND/plantas';

/* ─── Tipos ─────────────────────────────────────────────── */
type Slide =
  | { kind: 'cover' }
  | { kind: 'image'; src: string; caption?: string; subcaption?: string; position?: string; contain?: boolean; compass?: boolean }
  | { kind: 'chapter'; num: string; title: string; subtitle?: string }
  | { kind: 'text'; super?: string; title: string; body?: string; items?: string[]; cols?: string[][]; bg?: string };

/* ─── Roteiro HOME ──────────────────────────────────────── */
const SLIDES: Slide[] = [
  /* CAPA */
  { kind: 'cover' },

  /* ══ CAP 01 — O COMPLEXO ════════════════════════════════ */
  { kind: 'chapter', num: '01', title: 'O\nComplexo', subtitle: 'Trend Downtown · Porto Alegre' },

  { kind: 'text',
    super: 'CONCEITO',
    title: 'Sua vida\nno centro\nde tudo.',
    body: 'O Trend Downtown Home reúne em um único endereço na Rua General Lima e Silva dois torres residenciais com lazer completo no 7º pavimento, acesso ao mall de serviços e a conveniência do bairro Azenha — um dos mais dinâmicos de Porto Alegre.',
  },

  { kind: 'image', src: `${P}/PNB_01_Fotomontagem_EF.webp`,
    caption: 'Fotomontagem', subcaption: 'Complexo Trend Downtown — Av. Azenha, Porto Alegre', position: 'center 40%' },

  { kind: 'image', src: `${P}/PNB_02_Fachada_Azenha_EF.webp`,
    caption: 'Fachada', subcaption: 'Av. Azenha', position: 'center 40%' },
  { kind: 'image', src: `${P}/PNB_03_Fachada_Lima_EF.webp`,
    caption: 'Fachada', subcaption: 'Rua General Lima e Silva', position: 'center 40%' },

  { kind: 'image', src: `${P}/PNB_08_Mall_Acesso_EF.webp`,
    caption: 'Mall', subcaption: 'Acesso Principal', position: 'center 40%' },
  { kind: 'image', src: `${P}/PNB_09_Mall_Interno_EF2.webp`,
    caption: 'Mall', subcaption: 'Interno', position: 'center 40%' },
  { kind: 'image', src: `${P}/PNB_10_Mall_Interno_B_EF.webp`,
    caption: 'Mall', subcaption: 'Galeria de Serviços', position: 'center 40%' },

  { kind: 'image', src: `${PL}/PNB_PB_01_Implantacao_Terreo_EF.webp`,
    caption: 'Implantação', subcaption: 'Térreo · Mall + Acessos', contain: true, compass: true },
  { kind: 'image', src: `${PL}/PNB_PB_02_Implantacao_2o_Pavimento_EF.webp`,
    caption: 'Implantação', subcaption: '2º Pavimento · Mall + Nano + Office', contain: true, compass: true },

  /* ══ CAP 02 — LAZER 7º PAVIMENTO ════════════════════════ */
  { kind: 'chapter', num: '02', title: 'Lazer\n7º Pav', subtitle: 'Downtown Home · Área de lazer completa' },

  { kind: 'image', src: `${P}/PNB_04_Fachada_Residencial_A_EF.webp`,
    caption: 'Downtown Home', subcaption: 'Torre A — Fachada Residencial', position: 'center 40%' },

  { kind: 'text',
    super: 'TREND DOWNTOWN HOME · LAZER',
    title: 'Um andar\ninteiro\npara você.',
    cols: [
      [ 'Piscina adulto e infantil', 'Beach Tennis', 'Quadra infantil', 'Fitness moderno', 'Espaço Kids coberto' ],
      [ 'Salão de festas A e B', 'Espaço Gourmet externo', 'Espaço Pet', 'Coworking', 'Hall social de entrada' ],
    ],
  },

  { kind: 'image', src: `${P}/PNB_24_Residencial_Hall_EF.webp`,
    caption: 'Hall Social', subcaption: 'Downtown Home', position: 'center 35%' },

  { kind: 'image', src: `${P}/PNB_19_Residencial_Fitness_EF.webp`,
    caption: 'Fitness', subcaption: 'Downtown Home', position: 'center 35%' },

  { kind: 'image', src: `${P}/PNB_21_Residencial_Festas_A_EF.webp`,
    caption: 'Salão de Festas A', subcaption: 'Downtown Home', position: 'center 35%' },
  { kind: 'image', src: `${P}/PNB_22_Residencial_Festas_B_EF.webp`,
    caption: 'Salão de Festas B', subcaption: 'Downtown Home', position: 'center 35%' },

  { kind: 'image', src: `${P}/PNB_17_Residencial_Gourmet_Externo_EF.webp`,
    caption: 'Espaço Gourmet', subcaption: 'Downtown Home', position: 'center 35%' },

  { kind: 'image', src: `${P}/PNB_23_Residencial_Coworking_EF_v1.webp`,
    caption: 'Coworking', subcaption: 'Downtown Home', position: 'center 35%' },

  { kind: 'image', src: `${P}/PNB_20_Residencial_Kids_EF.webp`,
    caption: 'Espaço Kids', subcaption: 'Downtown Home', position: 'center 35%' },

  { kind: 'image', src: `${P}/PNB_13_Residencial_Piscina_EF_V2.webp`,
    caption: 'Piscina', subcaption: 'Downtown Home', position: 'center 40%' },

  { kind: 'image', src: `${P}/PNB_15_Residencial_Beach_Tennis_EF.webp`,
    caption: 'Beach Tennis', subcaption: 'Downtown Home', position: 'center 40%' },

  { kind: 'image', src: `${P}/PNB_16_Residencial_Quadra_Infantil_EF.webp`,
    caption: 'Quadra Infantil', subcaption: 'Downtown Home', position: 'center 40%' },

  { kind: 'image', src: `${P}/PNB_14_Residencial_Kids_Externo_EF.webp`,
    caption: 'Kids Externo', subcaption: 'Downtown Home', position: 'center 40%' },

  { kind: 'image', src: `${P}/PNB_18_Residencial_Espaco_Pet_EF.webp`,
    caption: 'Espaço Pet', subcaption: 'Downtown Home', position: 'center 35%' },

  { kind: 'image', src: `${PL}/PNB_PB_03_Implantacao_3o_Pavimento_EF.webp`,
    caption: 'Implantação', subcaption: 'Downtown Home · 3º Pavimento', contain: true, compass: true },

  /* ══ CAP 03 — APARTAMENTOS ══════════════════════════════ */
  { kind: 'chapter', num: '03', title: 'Apart-\nmentos', subtitle: 'Torres T1 e T2 · Rua Gen. Lima e Silva, 1462' },

  { kind: 'text',
    super: 'TREND DOWNTOWN HOME · APARTAMENTOS',
    title: 'Projetos que\ncabem na sua\nvida.',
    body: 'O Downtown Home oferece apartamentos em duas torres com tipologias T1 e T2, variando de studios compactos a unidades de 1 e 2 dormitórios — ideais para quem busca morar bem no centro de Porto Alegre com praticidade e sofisticação.',
  },

  { kind: 'image', src: `${P}/PNB_35_Residencial_Living_T1_Tipo_A_EF2.webp`,
    caption: 'Living', subcaption: 'Torre T1 — Tipo A', position: 'center 35%' },

  { kind: 'image', src: `${P}/PNB_36_Residencial_Living_T2_3o_Pav_EF.webp`,
    caption: 'Living', subcaption: 'Torre T2 — 3º Pavimento', position: 'center 35%' },

  { kind: 'image', src: `${P}/PNB_37_Residencial_Suite_Master_T2_Tipo_B_EF.webp`,
    caption: 'Suíte Master', subcaption: 'Torre T2 — Tipo B', position: 'center 35%' },

  /* Plantas T1A */
  { kind: 'image', src: `${PL}/PNB_PB_16_Planta_Residencial_T1A_Apto_01_EF_2.webp`, caption: 'Planta', subcaption: 'Torre T1A · Apto 01', contain: true },
  { kind: 'image', src: `${PL}/PNB_PB_17_Planta_Residencial_T1A_Apto_02_EF_2.webp`, caption: 'Planta', subcaption: 'Torre T1A · Apto 02', contain: true },
  { kind: 'image', src: `${PL}/PNB_PB_18_Planta_Residencial_T1A_Apto_04_EF_2.webp`, caption: 'Planta', subcaption: 'Torre T1A · Apto 04', contain: true },

  /* Plantas T1B */
  { kind: 'image', src: `${PL}/PNB_PB_19_Planta_Residencial_T1B_Apto_01_EF_2.webp`, caption: 'Planta', subcaption: 'Torre T1B · Apto 01', contain: true },
  { kind: 'image', src: `${PL}/PNB_PB_20_Planta_Residencial_T1B_Apto_02_EF_2.webp`, caption: 'Planta', subcaption: 'Torre T1B · Apto 02', contain: true },
  { kind: 'image', src: `${PL}/PNB_PB_21_Planta_Residencial_T1B_Apto_04_EF_2.webp`, caption: 'Planta', subcaption: 'Torre T1B · Apto 04', contain: true },

  /* Plantas T2 */
  { kind: 'image', src: `${PL}/PNB_PB_22_Planta_Residencial_T2_Apto_02B_EF_2.webp`, caption: 'Planta', subcaption: 'Torre T2 · Apto 02B', contain: true },
  { kind: 'image', src: `${PL}/PNB_PB_23_Planta_Residencial_T2_Apto_05_EF_2.webp`,  caption: 'Planta', subcaption: 'Torre T2 · Apto 05',  contain: true },
  { kind: 'image', src: `${PL}/PNB_PB_24_Planta_Residencial_T2A_Apto_01_EF_2.webp`, caption: 'Planta', subcaption: 'Torre T2A · Apto 01', contain: true },
  { kind: 'image', src: `${PL}/PNB_PB_25_Planta_Residencial_T2A_Apto_02_EF_2.webp`, caption: 'Planta', subcaption: 'Torre T2A · Apto 02', contain: true },
  { kind: 'image', src: `${PL}/PNB_PB_26_Planta_Residencial_T2A_Apto_04_EF_2.webp`, caption: 'Planta', subcaption: 'Torre T2A · Apto 04', contain: true },
  { kind: 'image', src: `${PL}/PNB_PB_27_Planta_Residencial_T2A_Apto_05A_EF_2.webp`,caption: 'Planta', subcaption: 'Torre T2A · Apto 05A',contain: true },
  { kind: 'image', src: `${PL}/PNB_PB_31_Planta_Residencial_T2B_Apto_05A_EF_2.webp`,caption: 'Planta', subcaption: 'Torre T2B · Apto 05A',contain: true },

  /* ══ CAP 04 — FICHA TÉCNICA ════════════════════════════ */
  { kind: 'chapter', num: '04', title: 'Ficha\nTécnica', subtitle: 'Trend Downtown Home · Dados do Empreendimento' },

  { kind: 'text',
    super: 'TREND DOWNTOWN HOME · FICHA TÉCNICA',
    title: 'Morar bem,\nno centro\nde Porto Alegre.',
    items: [
      'Localização — Rua General Lima e Silva, 1462 · Porto Alegre/RS',
      'Torres — T1 e T2 (residencial)',
      'Lazer — 7º Pavimento completo com piscina, fitness, beach tennis, festas, kids, pet e coworking',
      'Mall — 22 lojas de serviços e conveniência com acesso direto',
      'Arquitetura — IDEAI1',
      'Conceito — Smart Arquitetura',
      'Iluminação — Lumin Studio Sandra Thomé',
      'Interiores — Maena Design Conecta',
      'Paisagismo — Creare Paisagismo',
    ],
  },

  /* ENCERRAMENTO */
  { kind: 'image', src: `${P}/PNB_04_Fachada_Residencial_A_EF.webp`,
    caption: 'TREND DOWNTOWN HOME', subcaption: 'Sua vida no centro de tudo.', position: 'center 40%' },
];

/* ─── Props ─────────────────────────────────────────────── */
interface Props {
  currentSlide: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

/* ─── Compass Rose (vermelho) ────────────────────────────── */
function CompassRose() {
  return (
    <div className="absolute bottom-20 right-8 z-20 select-none" style={{ width: 64, height: 64 }}>
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"
        style={{ filter: 'drop-shadow(0 1px 4px rgba(0,0,0,0.4))' }}>
        <circle cx="32" cy="32" r="30" fill="rgba(255,255,255,0.72)" stroke="rgba(193,66,42,0.5)" strokeWidth="0.8" />
        <line x1="32" y1="6"  x2="32" y2="58" stroke="rgba(0,0,0,0.1)" strokeWidth="0.6" />
        <line x1="6"  y1="32" x2="58" y2="32" stroke="rgba(0,0,0,0.1)" strokeWidth="0.6" />
        <g transform="rotate(45 32 32)">
          <polygon points="32,7 28,32 32,28 36,32" fill="#C1422A" />
          <polygon points="32,57 28,32 32,36 36,32" fill="rgba(0,0,0,0.18)" />
        </g>
        <circle cx="32" cy="32" r="2.5" fill="#C1422A" />
        <text x="50" y="16" textAnchor="middle" fill="#C1422A" fontSize="7"
          fontFamily="'Jost',sans-serif" fontWeight="400" letterSpacing="0.05em">N</text>
      </svg>
    </div>
  );
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
    if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); onNext(); }
    if (e.key === 'ArrowLeft') onPrev();
  }, [onClose, onNext, onPrev]);

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

  /* identidade visual: fundo branco/creme, acento vermelho */
  const BG  = '#F5F2EE';
  const ACC = '#C1422A';

  return (
    <div ref={containerRef} className="fixed inset-0 z-[200] select-none overflow-hidden" style={{ background: BG }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@200;300;400;500&display=swap');
        .th-serif { font-family: 'Cormorant Garamond', Georgia, serif; }
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

      {/* ── Barra de progresso vermelho ──────────────── */}
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
      <div className="relative z-10 flex flex-col items-center gap-10">
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
        <p className="th-sans th-anim-2 font-light" style={{ color: 'rgba(0,0,0,0.45)', fontSize: 'clamp(0.8rem, 1.5vw, 1.1rem)', letterSpacing: '0.3em' }}>
          SUA VIDA NO CENTRO DE TUDO
        </p>
        <div className="th-anim-3">
          <Image
            src="/INSTITUCIONAL/logo_plaenge_vanguard_escuro.webp"
            alt="Plaenge | Vanguard"
            width={240}
            height={36}
            className="object-contain"
            style={{ opacity: 0.5 }}
            priority
          />
        </div>
        <p className="th-sans th-anim-3 font-light" style={{
          color: 'rgba(0,0,0,0.25)',
          fontSize: '0.65rem',
          letterSpacing: '0.25em',
        }}>
          RUA GEN. LIMA E SILVA, 1462 · PORTO ALEGRE
        </p>
      </div>
    </div>
  );
}

/* ─── HomeImageSlide ─────────────────────────────────────── */
function HomeImageSlide({ slide, bg }: { slide: Extract<Slide, { kind: 'image' }>; bg: string; acc: string }) {
  const isContain = slide.contain;
  return (
    <>
      {isContain && <div className="absolute inset-0" style={{ background: bg }} />}
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
      {isContain && (
        <div className="absolute inset-x-0 bottom-0" style={{
          height: '150px',
          background: `linear-gradient(to top, ${bg}FA 0%, transparent 100%)`
        }} />
      )}
      {slide.compass && <CompassRose />}
      {(slide.caption || slide.subcaption) && (
        <>
          {isContain ? (
            /* Caption escura para slides contain (fundo claro) */
            <div className="th-caption-anim absolute bottom-12 left-12 right-24">
              <div className="mb-4" style={{ width: '40px', height: '1px', background: '#C1422A' }} />
              {slide.caption && (
                <p className="th-serif font-light leading-none mb-2" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', color: '#1A1A1A' }}>
                  {slide.caption}
                </p>
              )}
              {slide.subcaption && (
                <p className="th-sans font-light" style={{ fontSize: 'clamp(0.6rem, 0.9vw, 0.75rem)', letterSpacing: '0.15em', color: 'rgba(0,0,0,0.45)' }}>
                  {slide.subcaption.toUpperCase()}
                </p>
              )}
            </div>
          ) : (
            /* Caption branca para slides fullscreen */
            <div className="th-caption-anim absolute bottom-12 left-12 right-24">
              <div className="mb-4" style={{ width: '40px', height: '1px', background: '#C1422A' }} />
              {slide.caption && (
                <p className="th-serif text-white font-light leading-none mb-2" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}>
                  {slide.caption}
                </p>
              )}
              {slide.subcaption && (
                <p className="th-sans text-white/55 font-light" style={{ fontSize: 'clamp(0.6rem, 0.9vw, 0.75rem)', letterSpacing: '0.15em' }}>
                  {slide.subcaption.toUpperCase()}
                </p>
              )}
            </div>
          )}
        </>
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
        <h2 className="th-serif th-anim-2 font-light leading-none" style={{ fontSize: 'clamp(3.5rem, 9vw, 8rem)', whiteSpace: 'pre-line', color: '#1A1A1A' }}>
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
      {slide.bg && (
        <>
          <Image src={slide.bg} alt="" fill className="object-cover"
            style={{ objectPosition: 'center 40%' }} sizes="100vw" priority />
          <div className="absolute inset-0" style={{ background: `${bg}D9` }} />
        </>
      )}
      <div className="relative z-10 max-w-5xl">
        {slide.super && (
          <p className="th-sans th-anim-1 font-light mb-5" style={{ color: acc, fontSize: 'clamp(0.55rem, 0.9vw, 0.7rem)', letterSpacing: '0.3em' }}>
            {slide.super}
          </p>
        )}
        <div className="th-anim-1 mb-6" style={{ width: '40px', height: '1px', background: acc }} />
        <h2 className="th-serif th-anim-2 font-light leading-none mb-8" style={{ fontSize: 'clamp(2.8rem, 6vw, 5.5rem)', whiteSpace: 'pre-line', color: '#1A1A1A' }}>
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
