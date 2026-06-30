'use client';

import { useEffect, useCallback, useRef, useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const P  = '/VERDANT';
const PL = `${P}/plantas`;
const PI = `${P}/implantacoes`;

/* ─── Tipagem ───────────────────────────────────────────── */
type StatItem = { value: string; label: string };
type Slide =
  | { kind: 'cover' }
  | { kind: 'image';   src: string; caption?: string; subcaption?: string; position?: string; contain?: boolean; compass?: boolean }
  | { kind: 'chapter'; num: string; title: string; subtitle?: string }
  | { kind: 'text';    super?: string; title: string; body?: string; items?: string[]; cols?: [string[], string[]]; bg?: string; stats?: StatItem[] };

/* ─── Roteiro ───────────────────────────────────────────── */
const SLIDES: Slide[] = [

  /* ══ CAPA COM LOGOS ══════════════════════════════════════ */
  { kind: 'cover' },

  /* ══ FACHADA ═════════════════════════════════════════════ */
  { kind: 'image', src: `${P}/©VISTA_01_EXT_FACHADA_DIURNA_FINAL.webp`,
    caption: 'VERDANT', subcaption: 'Plaenge · Rua Eça de Queiroz, 215 · Porto Alegre', position: 'center 40%' },

  /* ══ CAP 01 — CONCEITO ═══════════════════════════════════ */
  { kind: 'chapter', num: '01', title: 'Conceito' },

  { kind: 'text',
    super: 'PLAENGE — 50 ANOS',
    title: 'Criamos muitas\nraízes ao longo\ndos anos.',
    body: 'Líder no Sul do Brasil, referência no mercado imobiliário de alto padrão em seis estados e no Chile. Há mais de 50 anos, a Plaenge une tradição e inovação para transformar cada empreendimento em um lugar onde os sonhos ganham vida.',
    bg: `${P}/©VISTA_11_EXT_AÉREA_ÁREA_CONDOMINIAL_FINAL.webp` },

  { kind: 'text',
    super: 'VERDANT',
    title: 'Natureza\nintegrada\nà vida.',
    body: 'Tipologias inéditas em Porto Alegre — apartamentos, gardens, duplex, coberturas e casas com pátio privativo. Um empreendimento concebido para quem vive a natureza como filosofia.',
    bg: `${P}/©VISTA_01_EXT_FACHADA_DIURNA_FINAL.webp`,
    stats: [
      { value: '54',        label: 'unidades' },
      { value: '3',         label: 'suítes' },
      { value: '1',         label: 'torre única' },
      { value: '145–370',   label: 'm² privativos' },
    ] },

  { kind: 'image', src: `${P}/©VISTA_13_EXT_INSERCAO_FINAL.webp`,
    caption: 'Inserção Urbana', subcaption: 'Rua Eça de Queiroz, 215 · Bairro Rio Branco · Porto Alegre/RS', position: 'center 50%' },

  /* ══ CAP 02 — IMPLANTAÇÃO & LAZER ════════════════════════ */
  { kind: 'chapter', num: '02', title: 'Implantação\ne Lazer', subtitle: 'Áreas de convívio e bem-estar' },

  /* Listagem das áreas */
  { kind: 'text',
    super: 'ÁREAS DE LAZER — VERDANT',
    title: 'Espaços pensados\npara cada\nmomento.',
    cols: [
      [ 'Playground com Casinha na Árvore', 'Pet Place', 'Piscina Adulto e Infantil', 'Piscina Coberta com Raia de 20m', 'Deck Molhado', 'Quadra Poliesportiva' ],
      [ 'Gymnasium Plaenge', 'Sauna', 'Salão de Festas', 'Espaço Kids', 'Office Box', 'Wine Sensations by Grand Cru', 'Sunset View' ],
    ] },

  /* Fachadas e acesso */
  { kind: 'image', src: `${P}/©VISTA_02_EXT_FACHADA_NOTURNA_FINAL.webp`,
    caption: 'Fachada Noturna', position: 'center 40%' },
  { kind: 'image', src: `${P}/©VISTA_03_EXT_ACESSO_FINAL_AJUSTADA_SEM_PLACA.webp`,
    caption: 'Acesso Principal', position: 'center 45%' },
  { kind: 'image', src: `${P}/©VISTA_04_EXT_FACHADA_DETALHE_FINAL.webp`,
    caption: 'Fachada — Detalhe Arquitetônico', position: 'center 40%' },
  { kind: 'image', src: `${P}/©VISTA_05_EXT_FACHADA_ACESSO_CASAS_FINAL.webp`,
    caption: 'Acesso — Residências Unifamiliares', position: 'center 45%' },

  /* Lazer externo */
  { kind: 'image', src: `${P}/©VISTA_08_EXT_PISCINA_ABERTA_FINAL_.webp`,
    caption: 'Piscina Adulto e Infantil', position: 'center 45%' },
  { kind: 'image', src: `${P}/©VISTA_09_EXT_DECK_MOLHADO_FINAL.webp`,
    caption: 'Deck Molhado', position: 'center 45%' },
  { kind: 'image', src: `${P}/©VISTA_06_EXT_PET_PLACE_FINAL.webp`,
    caption: 'Pet Place', position: 'center 40%' },
  { kind: 'image', src: `${P}/©VISTA_07_EXT_PLAYGROUND_FINAL.webp`,
    caption: 'Playground com Casinha na Árvore', position: 'center 40%' },

  /* Lazer interno */
  { kind: 'image', src: `${P}/©VISTA_14_INT_HALL_FINAL.webp`,
    caption: 'Hall Social', position: 'center 35%' },
  { kind: 'image', src: `${P}/©VISTA_17_INT_SALÃO_DE_FESTAS_FINAL_.webp`,
    caption: 'Salão de Festas', position: 'center 35%' },
  { kind: 'image', src: `${P}/©VISTA_15_INT_YOGA_FINAL.webp`,
    caption: 'Área de Convivência', position: 'center 40%' },
  { kind: 'image', src: `${P}/©VISTA_16_INT_FITNESS_FINAL.webp`,
    caption: 'Gymnasium Plaenge', position: 'center 40%' },
  { kind: 'image', src: `${P}/©VISTA_33_INT_SAUNA_FINAL.webp`,
    caption: 'Sauna', position: 'center 40%' },
  { kind: 'image', src: `${P}/©VISTA_35_INT_ESPAÇO_KIDS_02_FINAL.webp`,
    caption: 'Espaço Kids', position: 'center 40%' },
  { kind: 'image', src: `${P}/©VISTA_23_INT_SALA_DE_REUNIÕES_FINAL.webp`,
    caption: 'Office Box', position: 'center 35%' },

  /* Vista aéreas + implantação do térreo (áreas de lazer) */
  { kind: 'image', src: `${P}/©VISTA_11_EXT_AÉREA_ÁREA_CONDOMINIAL_FINAL.webp`,
    caption: 'Vista Aérea — Área Condominial', position: 'center 50%' },
  { kind: 'image', src: `${P}/©VISTA_34_EXT_AÉREA_ÁREA_CONDOMINIAL_02_(EXTRA)_FINAL.webp`,
    caption: 'Vista Aérea — Área de Lazer', position: 'center 50%' },

  /* Implantação térreo — onde ficam as áreas de lazer */
  { kind: 'image', src: `${PL}/©VISTA_01_PLB_TÉRREO_FINAL.webp`,
    caption: 'Implantação — Térreo',
    subcaption: 'Piscina · Deck · Pet Place · Playground · Hall Social · Salão de Festas · Yoga · Fitness · Sauna · Kids · Office Box',
    contain: true, compass: true },

  /* Rooftop — imagens antes da implantação */
  { kind: 'image', src: `${P}/©VISTA_21_INT_ESPACO_ROOFTOP_01_FINAL.webp`,
    caption: 'Wine Sensations by Grand Cru', subcaption: 'Rooftop Condominial', position: 'center 40%' },
  { kind: 'image', src: `${P}/©VISTA_22_INT_ESPAÇO_ROOFTOP_02_FINAL_.webp`,
    caption: 'Sunset View', subcaption: 'Rooftop Condominial', position: 'center 40%' },

  /* Implantação terraço/cobertura */
  { kind: 'image', src: `${PL}/©VISTA_04_PLB_COBERTURA_FINAL.webp`,
    caption: 'Implantação — Terraço Condominial',
    subcaption: 'Sunset View Rooftop',
    contain: true, compass: true },

  /* Implantação geral */
  { kind: 'image', src: `${PI}/verdant-implantacao.jpg`,
    caption: 'Implantação Geral',
    subcaption: 'Torre · Residências Unifamiliares · Áreas de Lazer',
    contain: true, compass: true },

  /* ══ CAP 03 — APARTAMENTO TIPO ══════════════════════════ */
  { kind: 'chapter', num: '03', title: 'Apartamento\nTipo', subtitle: '145 m² a 163 m² · 3 dormitórios' },

  { kind: 'image', src: `${P}/©VISTA_30_INT_LIVING_TIPO_COM_SACADA_FINAL.webp`,
    caption: 'Living com Sacada', subcaption: 'Apartamento Tipo', position: 'center 35%' },
  { kind: 'image', src: `${P}/©VISTA_36_INT_LIVING_TIPO_COM_SACADA_02_(EXTRA)_FINAL.webp`,
    caption: 'Living com Sacada', subcaption: 'Apartamento Tipo — Vista Alternativa', position: 'center 35%' },

  { kind: 'image', src: `${PL}/©VISTA_05_PLB_UNIDADE_APTO_TIPO_01_FINAL.webp`,
    caption: 'Planta da Unidade', subcaption: 'Apartamento Tipo 01', contain: true },
  { kind: 'image', src: `${PL}/©VISTA_06_PLB_UNIDADE_APTO_TIPO_02_FINAL.webp`,
    caption: 'Planta da Unidade', subcaption: 'Apartamento Tipo 02', contain: true },
  { kind: 'image', src: `${PL}/©VISTA_07_PLB_UNIDADE_APTO_TIPO_03_FINAL.webp`,
    caption: 'Planta da Unidade', subcaption: 'Apartamento Tipo 03', contain: true },
  { kind: 'image', src: `${PL}/©VISTA_15_PLB_PAV_TIPO_LIVING_ESTENDIDO_(EXTRA)_FINAL.webp`,
    caption: 'Pavimento Tipo', subcaption: 'Opção de Layout Alternativo', contain: true, compass: true },

  /* ══ CAP 04 — DUPLEX ════════════════════════════════════ */
  { kind: 'chapter', num: '04', title: 'Duplex', subtitle: '295 m² · 3 suítes · 2 pavimentos' },

  { kind: 'image', src: `${P}/©VISTA_25_EXT_SACADA_APTO_DUPLEX_FINAL.webp`,
    caption: 'Sacada', subcaption: 'Apartamento Duplex', position: 'center 40%' },
  { kind: 'image', src: `${P}/©VISTA_31_INT_LIVING_DUPLEX_FINAL.webp`,
    caption: 'Living', subcaption: 'Apartamento Duplex', position: 'center 35%' },

  { kind: 'image', src: `${PL}/©VISTA_08_PLB_UNIDADE_APTO_DUPLEX_INFERIOR_FINAL.webp`,
    caption: 'Planta da Unidade', subcaption: 'Duplex — Pavimento Inferior', contain: true },
  { kind: 'image', src: `${PL}/©VISTA_09_PLB_UNIDADE_APTO_DUPLEX_SUPERIOR_FINAL.webp`,
    caption: 'Planta da Unidade', subcaption: 'Duplex — Pavimento Superior', contain: true },

  /* ══ CAP 05 — COBERTURA ═════════════════════════════════ */
  { kind: 'chapter', num: '05', title: 'Cobertura', subtitle: '304 m² a 321 m² · 3 suítes · Rooftop Privativo' },

  { kind: 'image', src: `${P}/©VISTA_32_INT_LIVING_APTO_COBERTURA_FINAL.webp`,
    caption: 'Living', subcaption: 'Cobertura', position: 'center 35%' },

  { kind: 'image', src: `${PL}/©VISTA_10_PLB_UNIDADE_APTO_COBERTURA_INFERIOR_FINAL_sem banheira.webp`,
    caption: 'Planta da Unidade', subcaption: 'Cobertura — Pavimento Inferior', contain: true },
  { kind: 'image', src: `${PL}/©VISTA_11_PLB_UNIDADE_APTO_COBERTURA_SUPERIOR_FINAL.webp`,
    caption: 'Planta da Unidade', subcaption: 'Cobertura — Pavimento Superior com Rooftop Privativo', contain: true },

  /* ══ CAP 06 — RESIDÊNCIA UNIFAMILIAR ════════════════════ */
  { kind: 'chapter', num: '06', title: 'Residência\nUnifamiliar', subtitle: '366 m² a 370 m² · 3 suítes · Pátio Privativo' },

  { kind: 'image', src: `${P}/©VISTA_27_EXT_PÁTIO_CASAS_FINAL.webp`,
    caption: 'Pátio Privativo', subcaption: 'Casa', position: 'center 45%' },
  { kind: 'image', src: `${P}/©VISTA_28_INT_ESTAR_JANTAR_TERREO_CASAS_FINAL.webp`,
    caption: 'Estar e Jantar', subcaption: 'Casa — Pavimento Térreo', position: 'center 35%' },

  { kind: 'image', src: `${PL}/©VISTA_12_PLB_UNIDADE_RESIDÊNCIA_UNIFAMILIAR_TÉRREO_FINAL.webp`,
    caption: 'Planta da Unidade', subcaption: 'Casa — Pavimento Térreo', contain: true },
  { kind: 'image', src: `${PL}/©VISTA_13_PLB_UNIDADE_RESIDÊNCIA_UNIFAMILIAR_PAV_SUPERIOR_FINAL.webp`,
    caption: 'Planta da Unidade', subcaption: 'Casa — Pavimento Superior', contain: true },

  /* ══ CAP 07 — DIFERENCIAIS ══════════════════════════════ */
  { kind: 'chapter', num: '07', title: 'Diferenciais', subtitle: 'Acabamento · Construtivos' },

  { kind: 'text',
    super: 'DIFERENCIAIS DE ACABAMENTO',
    title: 'Cada detalhe\npensado com\nprecisão.',
    cols: [
      [ 'Porcelanato de grande formato nas áreas sociais', 'Revestimento cerâmico especial nos banheiros', 'Bancadas em quartzito natural nas cozinhas', 'Marcenaria planejada com painéis de MDF revestido', 'Esquadrias em alumínio de alta performance' ],
      [ 'Vidros duplos laminados com controle solar', 'Forro em drywall com sanca para iluminação indireta', 'Pintura texturizada premium em todas as paredes', 'Peças sanitárias e metais de linha superior', 'Piso flutuante de madeira nos dormitórios' ],
    ] },

  { kind: 'text',
    super: 'DIFERENCIAIS CONSTRUTIVOS',
    title: 'Tecnologia e\nsustentabilidade\nem cada etapa.',
    cols: [
      [ 'Estrutura em concreto armado de alta resistência', 'Alvenaria em bloco cerâmico com isolamento acústico', 'Impermeabilização com garantia estendida', 'Sistema de pressurização nas escadas de emergência', 'Energia solar fotovoltaica compartilhada' ],
      [ 'Infraestrutura para recarga de veículos elétricos', 'Sistema de reaproveitamento de água pluvial', 'Automação residencial Smart Home Ready', 'Gerador de emergência para áreas comuns', 'Câmeras de monitoramento com acesso remoto' ],
    ] },

  /* ══ CAP 08 — RESUMO ════════════════════════════════════ */
  { kind: 'chapter', num: '08', title: 'Resumo', subtitle: 'Ficha Técnica do Empreendimento' },

  { kind: 'text',
    super: 'VERDANT · FICHA TÉCNICA',
    title: 'Um endereço\nque define\num novo padrão.',
    items: [
      'Localização — Rua Eça de Queiroz, 215 · Porto Alegre/RS',
      'Registro de Incorporação — R1 da Matrícula 167.625 · 2º Ofício de Registro de Imóveis',
      'Área do Terreno — 4.178,11 m²',
      'Total de Unidades — 54 unidades (50 na Torre + 4 Casas)',
      'Tipologias — Apartamentos · Gardens · Duplex · Coberturas · Casas com Pátio',
      'Áreas Privativas — 145,08 m² a 369,73 m²',
      'Áreas de Lazer — Playground · Pet Place · Piscinas · Quadra · Gymnasium · Sauna · Salão de Festas · Espaço Kids · Office Box · Wine Sensations · Sunset View',
      'Previsão de Entrega — Abril de 2027',
    ] },

  /* ══ ENCERRAMENTO ═══════════════════════════════════════ */
  { kind: 'image', src: `${P}/©VISTA_37_EXT_FACHADA_DETALHE_FINAL.webp`,
    caption: 'VERDANT', subcaption: 'Um pouco mais da nossa natureza.', position: 'center 40%' },
];

/* ─── Props ─────────────────────────────────────────────── */
interface Props {
  currentSlide: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

/* ─── Compass Rose SVG ──────────────────────────────────── */
/* Norte real do Verdant aponta ~45° para o canto superior direito  */
/* conforme marcação na implantação geral (círculo com traço).       */
function CompassRose() {
  return (
    <div className="absolute bottom-20 right-8 z-20 select-none" style={{ width: 64, height: 64 }}>
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"
        style={{ filter: 'drop-shadow(0 1px 4px rgba(0,0,0,0.6))' }}>
        {/* Círculo base */}
        <circle cx="32" cy="32" r="30" fill="rgba(15,26,15,0.72)" stroke="rgba(184,148,90,0.6)" strokeWidth="0.8" />
        {/* Cruz de referência */}
        <line x1="32" y1="6"  x2="32" y2="58" stroke="rgba(255,255,255,0.12)" strokeWidth="0.6" />
        <line x1="6"  y1="32" x2="58" y2="32" stroke="rgba(255,255,255,0.12)" strokeWidth="0.6" />
        {/* Agulha rotacionada 45° horário — norte = superior direito */}
        <g transform="rotate(45 32 32)">
          <polygon points="32,7 28,32 32,28 36,32" fill="#B8945A" />
          <polygon points="32,57 28,32 32,36 36,32" fill="rgba(255,255,255,0.28)" />
        </g>
        {/* Ponto central */}
        <circle cx="32" cy="32" r="2.5" fill="#B8945A" />
        {/* N — segue a ponta da agulha (canto superior direito, ~45°) */}
        <text x="50" y="16" textAnchor="middle" fill="#B8945A" fontSize="7"
          fontFamily="'Jost',sans-serif" fontWeight="400" letterSpacing="0.05em">N</text>
      </svg>
    </div>
  );
}

/* ─── Componente principal ──────────────────────────────── */
export function VerdantPresentationMode({ currentSlide, onClose, onPrev, onNext }: Props) {
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

  /* Capítulo ativo para o top bar */
  const chapterLabels = ['Conceito', 'Implantação & Lazer', 'Apartamento Tipo', 'Duplex', 'Cobertura', 'Casa', 'Diferenciais', 'Resumo'];
  let chapterCount = -1;
  for (let i = 0; i <= currentSlide; i++) {
    if (SLIDES[i].kind === 'chapter') chapterCount++;
  }
  const chapterLabel = chapterCount >= 0 && chapterCount < chapterLabels.length ? chapterLabels[chapterCount] : '';

  return (
    <div ref={containerRef} className="fixed inset-0 z-[200] select-none overflow-hidden" style={{ background: '#0A0A08', fontFamily: 'inherit' }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@200;300;400;500&display=swap');
        .vd-serif { font-family: 'Cormorant Garamond', Georgia, serif; }
        .vd-sans  { font-family: 'Jost', system-ui, sans-serif; }
        @keyframes vd-enter { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
        @keyframes vd-enter-fast { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        .vd-anim-1 { animation: vd-enter 0.7s cubic-bezier(.22,.68,0,1.2) both; }
        .vd-anim-2 { animation: vd-enter 0.7s 0.12s cubic-bezier(.22,.68,0,1.2) both; }
        .vd-anim-3 { animation: vd-enter 0.7s 0.24s cubic-bezier(.22,.68,0,1.2) both; }
        .vd-caption-anim { animation: vd-enter 0.9s 0.2s cubic-bezier(.22,.68,0,1.2) both; }
      `}</style>

      {/* ── Top bar ─────────────────────────────────────── */}
      <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-8 py-5">
        <div className="flex items-center gap-4">
          <span className="vd-sans text-white/90 font-light tracking-[0.25em] text-xs uppercase">VERDANT</span>
          {chapterLabel && (
            <>
              <span className="w-px h-3 bg-white/20" />
              <span className="vd-sans text-white/40 font-light tracking-widest text-xs uppercase">{chapterLabel}</span>
            </>
          )}
        </div>
        <div className="flex items-center gap-5">
          <span className="vd-sans text-white/30 text-xs tabular-nums font-light">
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

      {/* ── Slide ───────────────────────────────────────── */}
      <div className="absolute inset-0">
        {slide.kind === 'cover'   && <CoverSlide   key={animKey} />}
        {slide.kind === 'image'   && <ImageSlide   key={animKey} slide={slide} />}
        {slide.kind === 'chapter' && <ChapterSlide key={animKey} slide={slide} />}
        {slide.kind === 'text'    && <TextSlide    key={animKey} slide={slide} />}
      </div>

      {/* ── Navegação ───────────────────────────────────── */}
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

      {/* ── Barra de progresso ouro ──────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 z-30 h-px bg-white/10">
        <div className="h-full transition-all duration-500 ease-out"
          style={{ width: `${((currentSlide + 1) / SLIDES.length) * 100}%`, background: '#B8945A' }} />
      </div>

      {/* ── Dots ─────────────────────────────────────────── */}
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
                background: isCur ? '#B8945A' : isChap ? 'rgba(184,148,90,0.4)' : 'rgba(255,255,255,0.2)',
              }}
              aria-label={`Slide ${i + 1}`}
            />
          );
        })}
      </div>
    </div>
  );
}

/* ─── CoverSlide ────────────────────────────────────────── */
function CoverSlide() {
  return (
    <div className="flex flex-col items-center justify-center h-full" style={{ background: '#0F1A0F' }}>
      {/* Fachada suavíssima ao fundo */}
      <Image
        src={`${P}/©VISTA_01_EXT_FACHADA_DIURNA_FINAL.webp`}
        alt=""
        fill
        className="object-cover"
        style={{ objectPosition: 'center 35%', opacity: 0.08 }}
        sizes="100vw"
        priority
      />
      {/* Grain */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'1\'/%3E%3C/svg%3E")',
        backgroundSize: '200px',
      }} />

      <div className="relative z-10 flex flex-col items-center gap-10">
        {/* Logo Verdant */}
        <div className="vd-anim-1">
          <Image
            src={`${P}/logo_verdant.png`}
            alt="VERDANT"
            width={480}
            height={80}
            className="object-contain"
            style={{ filter: 'brightness(1.15) sepia(0.3) saturate(1.4)' }}
            priority
          />
        </div>

        {/* Linha divisória ouro */}
        <div className="vd-anim-2 flex items-center gap-4" style={{ width: '320px' }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(184,148,90,0.4)' }} />
          <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#B8945A' }} />
          <div style={{ flex: 1, height: '1px', background: 'rgba(184,148,90,0.4)' }} />
        </div>

        {/* Logo Plaenge */}
        <div className="vd-anim-3">
          <Image
            src="/INSTITUCIONAL/logo_plaenge_escuro.webp"
            alt="Plaenge"
            width={160}
            height={36}
            className="object-contain"
            style={{ opacity: 0.75 }}
            priority
          />
        </div>

        {/* Endereço */}
        <p className="vd-sans vd-anim-3 font-light" style={{
          color: 'rgba(255,255,255,0.25)',
          fontSize: '0.65rem',
          letterSpacing: '0.25em',
          marginTop: '0.5rem',
        }}>
          RUA EÇA DE QUEIROZ, 215 · PORTO ALEGRE
        </p>
      </div>
    </div>
  );
}

/* ─── ImageSlide ────────────────────────────────────────── */
function ImageSlide({ slide }: { slide: Extract<Slide, { kind: 'image' }> }) {
  const isContain = slide.contain;
  return (
    <>
      {isContain && <div className="absolute inset-0" style={{ background: '#0F1A0F' }} />}
      <Image
        src={slide.src}
        alt={slide.caption ?? 'VERDANT'}
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
          background: 'linear-gradient(to top, rgba(15,26,15,0.97) 0%, transparent 100%)'
        }} />
      )}
      {/* Rosa dos ventos */}
      {slide.compass && <CompassRose />}
      {/* Caption */}
      {(slide.caption || slide.subcaption) && (
        <div className="vd-caption-anim absolute bottom-12 left-12 right-24">
          <div className="mb-4" style={{ width: '40px', height: '1px', background: '#B8945A' }} />
          {slide.caption && (
            <p className="vd-serif text-white font-light leading-none mb-2" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}>
              {slide.caption}
            </p>
          )}
          {slide.subcaption && (
            <p className="vd-sans text-white/55 font-light" style={{ fontSize: 'clamp(0.6rem, 0.9vw, 0.75rem)', letterSpacing: '0.15em' }}>
              {slide.subcaption.toUpperCase()}
            </p>
          )}
        </div>
      )}
    </>
  );
}

/* ─── ChapterSlide ──────────────────────────────────────── */
function ChapterSlide({ slide }: { slide: Extract<Slide, { kind: 'chapter' }> }) {
  return (
    <div className="flex flex-col items-center justify-center h-full" style={{ background: '#0F1A0F' }}>
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'1\'/%3E%3C/svg%3E")',
        backgroundSize: '200px',
      }} />
      <div className="relative z-10 text-center px-12">
        <p className="vd-sans vd-anim-1 font-light mb-8" style={{ color: '#B8945A', fontSize: 'clamp(0.6rem, 1vw, 0.75rem)', letterSpacing: '0.35em' }}>
          CAPÍTULO {slide.num}
        </p>
        <div className="vd-anim-1 mx-auto mb-8" style={{ width: '60px', height: '1px', background: '#B8945A' }} />
        <h2 className="vd-serif vd-anim-2 text-white font-light leading-none" style={{ fontSize: 'clamp(3.5rem, 9vw, 8rem)', whiteSpace: 'pre-line' }}>
          {slide.title}
        </h2>
        {slide.subtitle && (
          <p className="vd-sans vd-anim-3 font-light mt-6" style={{ color: 'rgba(255,255,255,0.35)', fontSize: 'clamp(0.65rem, 1vw, 0.8rem)', letterSpacing: '0.2em' }}>
            {slide.subtitle.toUpperCase()}
          </p>
        )}
      </div>
    </div>
  );
}

/* ─── TextSlide ─────────────────────────────────────────── */
function TextSlide({ slide }: { slide: Extract<Slide, { kind: 'text' }> }) {
  const hasColumns = slide.cols && slide.cols.length === 2;
  const hasItems   = slide.items && slide.items.length > 0;
  const hasStats   = slide.stats && slide.stats.length > 0;

  return (
    <div className="flex flex-col justify-center h-full px-16 md:px-24" style={{ background: '#0F1A0F' }}>
      {slide.bg && (
        <>
          <Image src={slide.bg} alt="" fill className="object-cover"
            style={{ objectPosition: 'center 40%' }} sizes="100vw" priority />
          <div className="absolute inset-0" style={{ background: 'rgba(15,26,15,0.82)' }} />
        </>
      )}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'1\'/%3E%3C/svg%3E")',
        backgroundSize: '200px',
      }} />

      {/* Layout com stats à direita */}
      {hasStats ? (
        <div className="relative z-10 flex items-center gap-0 w-full max-w-6xl">
          {/* Coluna esquerda — texto */}
          <div className="flex-1 pr-16">
            {slide.super && (
              <p className="vd-sans vd-anim-1 font-light mb-5" style={{ color: '#B8945A', fontSize: 'clamp(0.55rem, 0.9vw, 0.7rem)', letterSpacing: '0.3em' }}>
                {slide.super}
              </p>
            )}
            <div className="vd-anim-1 mb-6" style={{ width: '40px', height: '1px', background: '#B8945A' }} />
            <h2 className="vd-serif vd-anim-2 text-white font-light leading-none mb-8" style={{ fontSize: 'clamp(2.8rem, 5.5vw, 5rem)', whiteSpace: 'pre-line' }}>
              {slide.title}
            </h2>
            {slide.body && (
              <p className="vd-sans vd-anim-3 font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)', fontSize: 'clamp(0.8rem, 1.1vw, 0.95rem)', maxWidth: '36ch' }}>
                {slide.body}
              </p>
            )}
          </div>
          {/* Divisor vertical */}
          <div className="self-stretch" style={{ width: '1px', background: 'rgba(184,148,90,0.2)', marginBlock: '4rem' }} />
          {/* Coluna direita — stats */}
          <div className="vd-anim-3 pl-16 flex flex-col gap-8" style={{ minWidth: '280px' }}>
            {slide.stats!.map((s, i) => (
              <div key={i}>
                <p className="vd-serif text-white font-light leading-none" style={{ fontSize: 'clamp(3rem, 5.5vw, 5rem)', color: i === 0 ? '#B8945A' : 'rgba(255,255,255,0.92)' }}>
                  {s.value}
                </p>
                <p className="vd-sans font-light mt-1" style={{ color: 'rgba(255,255,255,0.35)', fontSize: 'clamp(0.6rem, 0.85vw, 0.72rem)', letterSpacing: '0.2em' }}>
                  {s.label.toUpperCase()}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Layout padrão sem stats */
        <div className="relative z-10 max-w-5xl">
          {slide.super && (
            <p className="vd-sans vd-anim-1 font-light mb-5" style={{ color: '#B8945A', fontSize: 'clamp(0.55rem, 0.9vw, 0.7rem)', letterSpacing: '0.3em' }}>
              {slide.super}
            </p>
          )}
          <div className="vd-anim-1 mb-6" style={{ width: '40px', height: '1px', background: '#B8945A' }} />
          <h2 className="vd-serif vd-anim-2 text-white font-light leading-none mb-8" style={{ fontSize: 'clamp(2.8rem, 6vw, 5.5rem)', whiteSpace: 'pre-line' }}>
            {slide.title}
          </h2>
          {slide.body && (
            <p className="vd-sans vd-anim-3 font-light leading-relaxed max-w-xl" style={{ color: 'rgba(255,255,255,0.5)', fontSize: 'clamp(0.85rem, 1.2vw, 1rem)' }}>
              {slide.body}
            </p>
          )}
          {hasItems && (
            <ul className="vd-anim-3 space-y-3">
              {slide.items!.map((item, i) => {
                const [label, value] = item.split(' — ');
                return (
                  <li key={i} className="flex items-baseline gap-3">
                    <span className="vd-sans font-light shrink-0" style={{ color: '#B8945A', fontSize: '0.55rem' }}>◆</span>
                    {value ? (
                      <span className="vd-sans font-light" style={{ color: 'rgba(255,255,255,0.6)', fontSize: 'clamp(0.75rem, 1.1vw, 0.9rem)' }}>
                        <span style={{ color: 'rgba(255,255,255,0.9)' }}>{label}</span>
                        <span style={{ color: 'rgba(255,255,255,0.3)' }}> — </span>
                        {value}
                      </span>
                    ) : (
                      <span className="vd-sans font-light" style={{ color: 'rgba(255,255,255,0.7)', fontSize: 'clamp(0.75rem, 1.1vw, 0.9rem)' }}>{label}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
          {hasColumns && (
            <div className="vd-anim-3 grid grid-cols-2 gap-x-12 gap-y-3 mt-2">
              {slide.cols!.map((col, ci) => (
                <ul key={ci} className="space-y-3">
                  {col.map((item, i) => (
                    <li key={i} className="flex items-baseline gap-3">
                      <span className="vd-sans font-light shrink-0" style={{ color: '#B8945A', fontSize: '0.5rem' }}>◆</span>
                      <span className="vd-sans font-light" style={{ color: 'rgba(255,255,255,0.65)', fontSize: 'clamp(0.7rem, 1vw, 0.85rem)', lineHeight: '1.5' }}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export const PRESENTATION_TOTAL = SLIDES.length;
