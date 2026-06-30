'use client';

import Image from 'next/image';
import { useRef, useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const P  = '/TREND';
const PL = '/TREND/plantas';
const PN = '/TREND/implantacoes-nano';

/* ─── Tipos ─────────────────────────────────────────────── */
type Slide =
  | { kind: 'cover' }
  | { kind: 'image'; src: string; caption?: string; subcaption?: string; position?: string; contain?: boolean; compass?: boolean }
  | { kind: 'chapter'; num: string; title: string; subtitle?: string }
  | { kind: 'text'; super?: string; title: string; body?: string; items?: string[]; cols?: string[][]; bg?: string };

/* ─── Roteiro NANO + OFFICE ─────────────────────────────── */
const SLIDES: Slide[] = [
  /* CAPA */
  { kind: 'cover' },

  /* ══ CAP 01 — O COMPLEXO ════════════════════════════════ */
  { kind: 'chapter', num: '01', title: 'O\nComplexo', subtitle: 'Trend Downtown · Porto Alegre' },

  { kind: 'text',
    super: 'CONCEITO',
    title: 'Um complexo\nurbano único\nem Porto Alegre.',
    body: 'O Trend Downtown reúne em um único endereço na Avenida Azenha três torres residenciais, uma torre comercial, um mercado autônomo e um mall de serviços — criando um ecossistema completo de morar, trabalhar e se conectar.',
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

  /* ══ CAP 02 — OFFICE ════════════════════════════════════ */
  { kind: 'chapter', num: '02', title: 'Office', subtitle: 'Downtown Office · Soluções para negócios' },

  { kind: 'text',
    super: 'TREND DOWNTOWN OFFICE',
    title: 'Você no centro\ndos negócios.',
    body: 'O Downtown Office entrega salas comerciais inteligentes no coração de Porto Alegre, com acesso direto ao Mall e infraestrutura pensada para empresas e profissionais liberais que buscam presença e praticidade.',
  },

  { kind: 'image', src: `${P}/PNB_07_Fachada_Office_EF.webp`,
    caption: 'Fachada', subcaption: 'Torre Office · Av. Azenha', position: 'center 40%' },

  { kind: 'image', src: `${P}/PNB_29_Office_Hall_EF.webp`,
    caption: 'Hall de Entrada', subcaption: 'Downtown Office', position: 'center 35%' },

  { kind: 'image', src: `${P}/PNB_31_Office_Foyer_EF.webp`,
    caption: 'Foyer', subcaption: 'Downtown Office', position: 'center 35%' },

  { kind: 'image', src: `${P}/PNB_32_Office_Sala_Escritorio_EF.webp`,
    caption: 'Sala Escritório', subcaption: 'Downtown Office', position: 'center 35%' },

  { kind: 'image', src: `${P}/PNB_33_Office_Meia_Laje_EF.webp`,
    caption: 'Meia Laje', subcaption: 'Downtown Office', position: 'center 35%' },

  { kind: 'image', src: `${PL}/PNB_PB_14_Planta_Office_Sala_02_EF.webp`,
    caption: 'Planta da Unidade', subcaption: 'Office · Sala 02', contain: true },
  { kind: 'image', src: `${PL}/PNB_PB_15_Planta_Office_Sala_04_EF.webp`,
    caption: 'Planta da Unidade', subcaption: 'Office · Sala 04', contain: true },
  { kind: 'image', src: `${PL}/PNB_PB_04_Planta_5o_Pavimento_Office_EF.webp`,
    caption: 'Planta do Pavimento', subcaption: 'Office · 5º Pavimento', contain: true, compass: true },
  { kind: 'image', src: `${PL}/PNB_PB_05_Planta_6o_Pavimento_Office_EF.webp`,
    caption: 'Planta do Pavimento', subcaption: 'Office · 6º Pavimento', contain: true, compass: true },

  /* ══ CAP 03 — NANO LAZER ════════════════════════════════ */
  { kind: 'chapter', num: '03', title: 'Nano\nLazer', subtitle: 'Rooftop · Comodidades · Mercado Autônomo' },

  { kind: 'text',
    super: 'TREND DOWNTOWN NANO',
    title: 'Tudo que\nvocê precisa,\na poucos passos.',
    cols: [
      [ 'Rooftop com piscina e área de lazer', 'Fitness moderno', 'Hall com lounge', 'Lavanderia compartilhada' ],
      [ 'Acesso direto ao Mall', 'Mercado Autônomo 24h', 'Localização Av. Azenha 123', '259 unidades · Studios e 1 dorm' ],
    ],
  },

  { kind: 'image', src: `${P}/PNB_27_Nano_Hall_EF.webp`,
    caption: 'Hall', subcaption: 'Downtown Nano', position: 'center 35%' },

  { kind: 'image', src: `${P}/PNB_26_Nano_Fitness_EF.webp`,
    caption: 'Fitness', subcaption: 'Downtown Nano', position: 'center 35%' },

  { kind: 'image', src: `${P}/PNB_28_Nano_Lavanderia_EF.webp`,
    caption: 'Lavanderia', subcaption: 'Downtown Nano', position: 'center 35%' },

  { kind: 'text',
    super: 'MERCADO AUTÔNOMO',
    title: 'Conveniência\nno seu próprio\ncondomínio.',
    body: 'O Trend Downtown contará com mercado autônomo operando 24 horas, integrado ao Mall. Tecnologia de ponta para compras rápidas sem filas, com acesso direto pelo térreo do complexo.',
  },

  { kind: 'image', src: `${P}/PNB_25_Nano_Rooftop_Interno_EF.webp`,
    caption: 'Rooftop', subcaption: 'Downtown Nano — Área Interna', position: 'center 35%' },

  { kind: 'image', src: `${P}/PNB_12_Nano_Rooftop_Externo_EF.webp`,
    caption: 'Rooftop', subcaption: 'Downtown Nano — Vista Panorâmica', position: 'center 40%' },

  { kind: 'image', src: `${P}/PNB_11_Nano_Rooftop_Piscina_EF.webp`,
    caption: 'Rooftop', subcaption: 'Downtown Nano — Piscina', position: 'center 40%' },

  { kind: 'image', src: `${PL}/PNB_PB_06_Planta_Rooftop_Nano_EF.webp`,
    caption: 'Planta do Rooftop', subcaption: 'Downtown Nano', contain: true, compass: true },

  /* Implantações por pavimento */
  { kind: 'image', src: `${PN}/nano-01.jpg`, caption: 'Implantação', subcaption: 'Nano · 15º Pavimento', contain: true, compass: true },
  { kind: 'image', src: `${PN}/nano-02.jpg`, caption: 'Implantação', subcaption: 'Nano · 3º Pavimento', contain: true, compass: true },
  { kind: 'image', src: `${PN}/nano-03.jpg`, caption: 'Implantação', subcaption: 'Nano · 4º ao 8º Pavimentos', contain: true, compass: true },
  { kind: 'image', src: `${PN}/nano-04.jpg`, caption: 'Implantação', subcaption: 'Nano · 10º Pavimento', contain: true, compass: true },
  { kind: 'image', src: `${PN}/nano-05.jpg`, caption: 'Implantação', subcaption: 'Nano · 9º Pavimento', contain: true, compass: true },
  { kind: 'image', src: `${PN}/nano-06.jpg`, caption: 'Implantação', subcaption: 'Nano · 11º Pavimento', contain: true, compass: true },
  { kind: 'image', src: `${PN}/nano-07.jpg`, caption: 'Implantação', subcaption: 'Nano · 12º Pavimento', contain: true, compass: true },
  { kind: 'image', src: `${PN}/nano-08.jpg`, caption: 'Implantação', subcaption: 'Nano · 14º Pavimento', contain: true, compass: true },
  { kind: 'image', src: `${PN}/nano-09.jpg`, caption: 'Implantação', subcaption: 'Nano · 13º Pavimento', contain: true, compass: true },

  /* ══ CAP 04 — NANO APARTAMENTOS ════════════════════════ */
  { kind: 'chapter', num: '04', title: 'Nano\nAptos', subtitle: 'Studios e 1 dorm · 259 unidades · Av. Azenha 123' },

  { kind: 'image', src: `${P}/PNB_34_Nano_Apartamento_EF.webp`,
    caption: 'Apartamento', subcaption: 'Downtown Nano', position: 'center 35%' },

  { kind: 'image', src: `${PL}/PNB_PB_07_Planta_Nano_Apto_01A_EF.webp`, caption: 'Planta da Unidade', subcaption: 'Nano · Tipo 01A', contain: true },
  { kind: 'image', src: `${PL}/PNB_PB_08_Planta_Nano_Apto_02B_EF.webp`, caption: 'Planta da Unidade', subcaption: 'Nano · Tipo 02B', contain: true },
  { kind: 'image', src: `${PL}/PNB_PB_09_Planta_Nano_Apto_03B_EF.webp`, caption: 'Planta da Unidade', subcaption: 'Nano · Tipo 03B', contain: true },
  { kind: 'image', src: `${PL}/PNB_PB_10_Planta_Nano_Apto_04_EF.webp`,  caption: 'Planta da Unidade', subcaption: 'Nano · Tipo 04',  contain: true },
  { kind: 'image', src: `${PL}/PNB_PB_11_Planta_Nano_Apto_05_EF.webp`,  caption: 'Planta da Unidade', subcaption: 'Nano · Tipo 05',  contain: true },
  { kind: 'image', src: `${PL}/PNB_PB_12_Planta_Nano_Apto_06_EF.webp`,  caption: 'Planta da Unidade', subcaption: 'Nano · Tipo 06',  contain: true },
  { kind: 'image', src: `${PL}/PNB_PB_13_Planta_Nano_Apto_07_EF.webp`,  caption: 'Planta da Unidade', subcaption: 'Nano · Tipo 07',  contain: true },

  /* ══ CAP 05 — GESTÃO ════════════════════════════════════ */
  { kind: 'chapter', num: '05', title: 'Gestão', subtitle: 'Cityhome by Intercity Hotels' },

  { kind: 'text',
    super: 'GESTÃO · CITYHOME BY INTERCITY HOTELS',
    title: 'Seu imóvel\ntrabalhando\npara você.',
    body: 'O Downtown Nano conta com gestão profissional Cityhome by Intercity Hotels — programa de locação por temporada e longa estada gerenciado por uma das maiores redes hoteleiras do Brasil, maximizando a rentabilidade da sua unidade com total praticidade.',
  },

  { kind: 'text',
    super: 'GESTÃO · VANTAGENS DO PROGRAMA',
    title: 'Rentabilidade\nsem abrir mão\nda flexibilidade.',
    cols: [
      [ 'Gestão profissional Intercity Hotels', 'Plataformas de reserva integradas (Airbnb, Booking, site próprio)', 'Limpeza e manutenção incluídas', 'Repasse mensal de receitas' ],
      [ 'Uso pelo próprio proprietário nos períodos desejados', 'Contrato flexível de adesão ao programa', 'Relatórios de desempenho periódicos', 'Atendimento 24h para hóspedes' ],
    ],
  },

  /* ══ CAP 06 — FICHA TÉCNICA ════════════════════════════ */
  { kind: 'chapter', num: '06', title: 'Ficha\nTécnica', subtitle: 'Trend Downtown · Dados do Empreendimento' },

  { kind: 'text',
    super: 'TREND DOWNTOWN NANO + OFFICE · FICHA TÉCNICA',
    title: 'Um complexo.\nDois produtos.\nUm endereço.',
    items: [
      'Localização Nano — Av. Azenha, 123 · Porto Alegre/RS',
      'Localização Office — Av. Azenha, 15 · Porto Alegre/RS',
      'Mall — 22 lojas de serviços e conveniência',
      'Torre Nano — 259 unidades · Studios e 1 dormitório',
      'Torre Office — 82 unidades comerciais',
      'Gestão Nano — Cityhome by Intercity Hotels',
      'Arquitetura — IDEAI1',
      'Conceito — Smart Arquitetura',
      'Iluminação — Lumin Studio Sandra Thomé',
      'Interiores — Maena Design Conecta',
      'Paisagismo — Creare Paisagismo',
    ],
  },

  /* ENCERRAMENTO */
  { kind: 'image', src: `${P}/PNB_06_Fachada_Nano_EF.webp`,
    caption: 'TREND DOWNTOWN NANO', subcaption: 'Você no centro de tudo.', position: 'center 40%' },
];

/* ─── Props ─────────────────────────────────────────────── */
interface Props {
  currentSlide: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

/* ─── Compass Rose ───────────────────────────────────────── */
function CompassRose() {
  return (
    <div className="absolute bottom-20 right-8 z-20 select-none" style={{ width: 64, height: 64 }}>
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"
        style={{ filter: 'drop-shadow(0 1px 4px rgba(0,0,0,0.6))' }}>
        <circle cx="32" cy="32" r="30" fill="rgba(10,10,10,0.72)" stroke="rgba(212,120,90,0.6)" strokeWidth="0.8" />
        <line x1="32" y1="6"  x2="32" y2="58" stroke="rgba(255,255,255,0.12)" strokeWidth="0.6" />
        <line x1="6"  y1="32" x2="58" y2="32" stroke="rgba(255,255,255,0.12)" strokeWidth="0.6" />
        <g transform="rotate(45 32 32)">
          <polygon points="32,7 28,32 32,28 36,32" fill="#D4785A" />
          <polygon points="32,57 28,32 32,36 36,32" fill="rgba(255,255,255,0.28)" />
        </g>
        <circle cx="32" cy="32" r="2.5" fill="#D4785A" />
        <text x="50" y="16" textAnchor="middle" fill="#D4785A" fontSize="7"
          fontFamily="'Jost',sans-serif" fontWeight="400" letterSpacing="0.05em">N</text>
      </svg>
    </div>
  );
}

/* ─── Componente principal ──────────────────────────────── */
export function TrendNanoPresentationMode({ currentSlide, onClose, onPrev, onNext }: Props) {
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

  const chapterLabels = ['O Complexo', 'Office', 'Nano Lazer', 'Nano Aptos', 'Gestão', 'Ficha Técnica'];
  let chapterCount = -1;
  for (let i = 0; i <= currentSlide; i++) {
    if (SLIDES[i].kind === 'chapter') chapterCount++;
  }
  const chapterLabel = chapterCount >= 0 && chapterCount < chapterLabels.length ? chapterLabels[chapterCount] : '';

  return (
    <div ref={containerRef} className="fixed inset-0 z-[200] select-none overflow-hidden" style={{ background: '#0A0A0A' }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@200;300;400;500&display=swap');
        .tn-serif { font-family: 'Cormorant Garamond', Georgia, serif; }
        .tn-sans  { font-family: 'Jost', system-ui, sans-serif; }
        @keyframes tn-enter { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
        .tn-anim-1 { animation: tn-enter 0.7s cubic-bezier(.22,.68,0,1.2) both; }
        .tn-anim-2 { animation: tn-enter 0.7s 0.12s cubic-bezier(.22,.68,0,1.2) both; }
        .tn-anim-3 { animation: tn-enter 0.7s 0.24s cubic-bezier(.22,.68,0,1.2) both; }
        .tn-caption-anim { animation: tn-enter 0.9s 0.2s cubic-bezier(.22,.68,0,1.2) both; }
      `}</style>

      {/* ── Top bar ──────────────────────────────────── */}
      <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-8 py-5">
        <div className="flex items-center gap-4">
          <span className="tn-sans text-white/90 font-light tracking-[0.25em] text-xs uppercase">TREND DOWNTOWN NANO + OFFICE</span>
          {chapterLabel && (
            <>
              <span className="w-px h-3 bg-white/20" />
              <span className="tn-sans text-white/40 font-light tracking-widest text-xs uppercase">{chapterLabel}</span>
            </>
          )}
        </div>
        <div className="flex items-center gap-5">
          <span className="tn-sans text-white/30 text-xs tabular-nums font-light">
            {String(currentSlide + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
          </span>
          <button
            onClick={() => { document.exitFullscreen?.().catch(() => {}); onClose(); }}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-white/10"
            style={{ border: '1px solid rgba(255,255,255,0.15)' }}
            aria-label="Fechar apresentação"
          >
            <X className="w-3.5 h-3.5 text-white/60" />
          </button>
        </div>
      </div>

      {/* ── Slide ────────────────────────────────────── */}
      <div className="absolute inset-0">
        {slide.kind === 'cover'   && <NanoCoverSlide   key={animKey} />}
        {slide.kind === 'image'   && <NanoImageSlide   key={animKey} slide={slide} />}
        {slide.kind === 'chapter' && <NanoChapterSlide key={animKey} slide={slide} />}
        {slide.kind === 'text'    && <NanoTextSlide    key={animKey} slide={slide} />}
      </div>

      {/* ── Navegação ────────────────────────────────── */}
      <button onClick={onPrev} disabled={currentSlide === 0}
        className="absolute left-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-0 hover:bg-white/10"
        style={{ border: '1px solid rgba(255,255,255,0.15)' }} aria-label="Slide anterior">
        <ChevronLeft className="w-5 h-5 text-white/60" />
      </button>
      <button onClick={onNext} disabled={currentSlide === SLIDES.length - 1}
        className="absolute right-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-0 hover:bg-white/10"
        style={{ border: '1px solid rgba(255,255,255,0.15)' }} aria-label="Próximo slide">
        <ChevronRight className="w-5 h-5 text-white/60" />
      </button>

      {/* ── Barra de progresso cobre ─────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 z-30 h-px bg-white/10">
        <div className="h-full transition-all duration-500 ease-out"
          style={{ width: `${((currentSlide + 1) / SLIDES.length) * 100}%`, background: '#D4785A' }} />
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
                background: isCur ? '#D4785A' : isChap ? 'rgba(212,120,90,0.4)' : 'rgba(255,255,255,0.2)',
              }}
              aria-label={`Slide ${i + 1}`}
            />
          );
        })}
      </div>
    </div>
  );
}

/* ─── NanoCoverSlide ─────────────────────────────────────── */
function NanoCoverSlide() {
  return (
    <div className="flex flex-col items-center justify-center h-full" style={{ background: '#0A0A0A' }}>
      <Image
        src={`${P}/PNB_06_Fachada_Nano_EF.webp`}
        alt=""
        fill
        className="object-cover"
        style={{ objectPosition: 'center 40%', opacity: 0.12 }}
        sizes="100vw"
        priority
      />
      <div className="absolute inset-0 opacity-15" style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'1\'/%3E%3C/svg%3E")',
        backgroundSize: '200px',
      }} />
      <div className="relative z-10 flex flex-col items-center gap-10">
        <div className="tn-anim-1">
          <Image
            src={`${P}/logo_nano.png`}
            alt="TREND DOWNTOWN NANO"
            width={480}
            height={120}
            className="object-contain"
            priority
          />
        </div>
        <div className="tn-anim-2 flex items-center gap-4" style={{ width: '320px' }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(212,120,90,0.4)' }} />
          <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#D4785A' }} />
          <div style={{ flex: 1, height: '1px', background: 'rgba(212,120,90,0.4)' }} />
        </div>
        <p className="tn-sans tn-anim-2 font-light" style={{ color: 'rgba(255,255,255,0.5)', fontSize: 'clamp(0.8rem, 1.5vw, 1.1rem)', letterSpacing: '0.3em' }}>
          VOCÊ NO CENTRO DE TUDO
        </p>
        <div className="tn-anim-3">
          <Image
            src="/INSTITUCIONAL/logo_plaenge_vanguard_escuro.webp"
            alt="Plaenge | Vanguard"
            width={240}
            height={36}
            className="object-contain"
            style={{ opacity: 0.6 }}
            priority
          />
        </div>
        <p className="tn-sans tn-anim-3 font-light" style={{
          color: 'rgba(255,255,255,0.2)',
          fontSize: '0.65rem',
          letterSpacing: '0.25em',
        }}>
          AV. AZENHA · PORTO ALEGRE
        </p>
      </div>
    </div>
  );
}

/* ─── NanoImageSlide ─────────────────────────────────────── */
function NanoImageSlide({ slide }: { slide: Extract<Slide, { kind: 'image' }> }) {
  const isContain = slide.contain;
  return (
    <>
      {isContain && <div className="absolute inset-0" style={{ background: '#0A0A0A' }} />}
      <Image
        src={slide.src}
        alt={slide.caption ?? 'TREND DOWNTOWN'}
        fill
        className={isContain ? 'object-contain' : 'object-cover'}
        style={!isContain ? { objectPosition: slide.position ?? 'center 40%' } : { padding: '56px 80px 88px' }}
        sizes="100vw"
        priority
      />
      {!isContain && (
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 30%, transparent 55%, rgba(0,0,0,0.75) 100%)'
        }} />
      )}
      {isContain && (
        <div className="absolute inset-x-0 bottom-0" style={{
          height: '150px',
          background: 'linear-gradient(to top, rgba(10,10,10,0.97) 0%, transparent 100%)'
        }} />
      )}
      {slide.compass && <CompassRose />}
      {(slide.caption || slide.subcaption) && (
        <div className="tn-caption-anim absolute bottom-12 left-12 right-24">
          <div className="mb-4" style={{ width: '40px', height: '1px', background: '#D4785A' }} />
          {slide.caption && (
            <p className="tn-serif text-white font-light leading-none mb-2" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}>
              {slide.caption}
            </p>
          )}
          {slide.subcaption && (
            <p className="tn-sans text-white/55 font-light" style={{ fontSize: 'clamp(0.6rem, 0.9vw, 0.75rem)', letterSpacing: '0.15em' }}>
              {slide.subcaption.toUpperCase()}
            </p>
          )}
        </div>
      )}
    </>
  );
}

/* ─── NanoChapterSlide ───────────────────────────────────── */
function NanoChapterSlide({ slide }: { slide: Extract<Slide, { kind: 'chapter' }> }) {
  return (
    <div className="flex flex-col items-center justify-center h-full" style={{ background: '#0A0A0A' }}>
      <div className="absolute inset-0 opacity-15" style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'1\'/%3E%3C/svg%3E")',
        backgroundSize: '200px',
      }} />
      <div className="relative z-10 text-center px-12">
        <p className="tn-sans tn-anim-1 font-light mb-8" style={{ color: '#D4785A', fontSize: 'clamp(0.6rem, 1vw, 0.75rem)', letterSpacing: '0.35em' }}>
          CAPÍTULO {slide.num}
        </p>
        <div className="tn-anim-1 mx-auto mb-8" style={{ width: '60px', height: '1px', background: '#D4785A' }} />
        <h2 className="tn-serif tn-anim-2 text-white font-light leading-none" style={{ fontSize: 'clamp(3.5rem, 9vw, 8rem)', whiteSpace: 'pre-line' }}>
          {slide.title}
        </h2>
        {slide.subtitle && (
          <p className="tn-sans tn-anim-3 font-light mt-6" style={{ color: 'rgba(255,255,255,0.35)', fontSize: 'clamp(0.65rem, 1vw, 0.8rem)', letterSpacing: '0.2em' }}>
            {slide.subtitle.toUpperCase()}
          </p>
        )}
      </div>
    </div>
  );
}

/* ─── NanoTextSlide ──────────────────────────────────────── */
function NanoTextSlide({ slide }: { slide: Extract<Slide, { kind: 'text' }> }) {
  const hasColumns = slide.cols && slide.cols.length === 2;
  const hasItems   = slide.items && slide.items.length > 0;

  return (
    <div className="flex flex-col justify-center h-full px-16 md:px-24" style={{ background: '#0A0A0A' }}>
      {slide.bg && (
        <>
          <Image src={slide.bg} alt="" fill className="object-cover"
            style={{ objectPosition: 'center 40%' }} sizes="100vw" priority />
          <div className="absolute inset-0" style={{ background: 'rgba(10,10,10,0.85)' }} />
        </>
      )}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'1\'/%3E%3C/svg%3E")',
        backgroundSize: '200px',
      }} />
      <div className="relative z-10 max-w-5xl">
        {slide.super && (
          <p className="tn-sans tn-anim-1 font-light mb-5" style={{ color: '#D4785A', fontSize: 'clamp(0.55rem, 0.9vw, 0.7rem)', letterSpacing: '0.3em' }}>
            {slide.super}
          </p>
        )}
        <div className="tn-anim-1 mb-6" style={{ width: '40px', height: '1px', background: '#D4785A' }} />
        <h2 className="tn-serif tn-anim-2 text-white font-light leading-none mb-8" style={{ fontSize: 'clamp(2.8rem, 6vw, 5.5rem)', whiteSpace: 'pre-line' }}>
          {slide.title}
        </h2>
        {slide.body && (
          <p className="tn-sans tn-anim-3 font-light leading-relaxed max-w-xl" style={{ color: 'rgba(255,255,255,0.5)', fontSize: 'clamp(0.85rem, 1.2vw, 1rem)' }}>
            {slide.body}
          </p>
        )}
        {hasItems && (
          <ul className="tn-anim-3 space-y-3">
            {slide.items!.map((item, i) => {
              const [label, value] = item.split(' — ');
              return (
                <li key={i} className="flex items-baseline gap-3">
                  <span className="tn-sans font-light shrink-0" style={{ color: '#D4785A', fontSize: '0.55rem' }}>◆</span>
                  {value ? (
                    <span className="tn-sans font-light" style={{ color: 'rgba(255,255,255,0.6)', fontSize: 'clamp(0.75rem, 1.1vw, 0.9rem)' }}>
                      <span style={{ color: 'rgba(255,255,255,0.9)' }}>{label}</span>
                      <span style={{ color: 'rgba(255,255,255,0.3)' }}> — </span>
                      {value}
                    </span>
                  ) : (
                    <span className="tn-sans font-light" style={{ color: 'rgba(255,255,255,0.7)', fontSize: 'clamp(0.75rem, 1.1vw, 0.9rem)' }}>{label}</span>
                  )}
                </li>
              );
            })}
          </ul>
        )}
        {hasColumns && (
          <div className="tn-anim-3 grid grid-cols-2 gap-x-12 gap-y-3 mt-2">
            {slide.cols!.map((col, ci) => (
              <ul key={ci} className="space-y-3">
                {col.map((item, i) => (
                  <li key={i} className="flex items-baseline gap-3">
                    <span className="tn-sans font-light shrink-0" style={{ color: '#D4785A', fontSize: '0.5rem' }}>◆</span>
                    <span className="tn-sans font-light" style={{ color: 'rgba(255,255,255,0.65)', fontSize: 'clamp(0.7rem, 1vw, 0.85rem)', lineHeight: '1.5' }}>
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
