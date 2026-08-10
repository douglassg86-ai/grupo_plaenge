'use client';

import Image from 'next/image';
import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize, Minimize } from 'lucide-react';

/* ─── Fontes ────────────────────────────────────────────── */
const FONT_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@200;300;400;600;700;800;900&family=Jost:wght@200;300;400;500&display=swap');
.op-serif { font-family: 'Montserrat', system-ui, sans-serif; }
.op-sans  { font-family: 'Jost', system-ui, sans-serif; }
@keyframes op-up { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
@keyframes op-in { from { opacity:0; } to { opacity:1; } }
.op-a0 { animation: op-up 0.65s 0.00s cubic-bezier(.22,.68,0,1.15) both; }
.op-a1 { animation: op-up 0.65s 0.12s cubic-bezier(.22,.68,0,1.15) both; }
.op-a2 { animation: op-up 0.65s 0.24s cubic-bezier(.22,.68,0,1.15) both; }
.op-a3 { animation: op-up 0.65s 0.36s cubic-bezier(.22,.68,0,1.15) both; }
.op-a4 { animation: op-up 0.65s 0.48s cubic-bezier(.22,.68,0,1.15) both; }
.op-a5 { animation: op-up 0.65s 0.60s cubic-bezier(.22,.68,0,1.15) both; }
.op-fade { animation: op-in 1.2s 0.1s both; }
`;

/* ─── Identidade por produto ────────────────────────────── */
type ThemeKey = 'neutral' | 'verdant' | 'nano' | 'synthe';

const THEMES: Record<ThemeKey, { bg: string; accent: string; soft: string; label: string }> = {
  neutral: { bg: '#0A0A0A', accent: '#D9B25C', soft: 'rgba(217,178,92,0.14)', label: 'PLAENGE' },
  verdant: { bg: '#0A0A08', accent: '#B8945A', soft: 'rgba(184,148,90,0.16)', label: 'VERDANT' },
  nano:    { bg: '#0A0A0A', accent: '#D4785A', soft: 'rgba(212,120,90,0.16)', label: 'TREND NANO' },
  synthe:  { bg: '#1A1A1A', accent: '#C1422A', soft: 'rgba(193,66,42,0.18)', label: 'SYNTHÈ' },
};

const V = '/VERDANT';
const T = '/TREND';
const S = '/SYNTHE';

/* ─── Estrutura de slides ───────────────────────────────── */
type Slide =
  | { kind: 'cover' }
  | { kind: 'chapter'; theme: ThemeKey; num: string; title: string; subtitle?: string }
  | { kind: 'hero'; theme: ThemeKey; src: string; eyebrow: string; title: string; subtitle?: string; position?: string }
  | { kind: 'stat'; theme: ThemeKey; eyebrow: string; value: string; unit?: string; caption?: string }
  | { kind: 'plan'; theme: ThemeKey; src: string; eyebrow: string; title: string; caption?: string }
  | { kind: 'diff'; theme: ThemeKey; eyebrow: string; title: string; cols: [string[], string[]] }
  | { kind: 'payment'; theme: ThemeKey; eyebrow: string; title: string; steps: { label: string; value: string; sub?: string }[]; total: string }
  | { kind: 'campaign'; theme: ThemeKey; eyebrow: string; title: string; body?: string }
  | { kind: 'car'; theme: ThemeKey; src: string; eyebrow: string; title: string; sub?: string; position?: string }
  | { kind: 'cta' };

const SLIDES: Slide[] = [
  { kind: 'cover' },

  /* ══════════════════════ VERDANT ══════════════════════ */
  { kind: 'chapter', theme: 'verdant', num: '01', title: 'VERDANT', subtitle: 'Natureza integrada à vida · Porto Alegre' },

  { kind: 'hero', theme: 'verdant', src: `${V}/©VISTA_01_EXT_FACHADA_DIURNA_FINAL.webp`,
    eyebrow: 'VERDANT · PLAENGE', title: 'Um endereço\nque define\num novo padrão.', subtitle: 'Rua Eça de Queiroz, 215 · Rio Branco · Porto Alegre', position: 'center 40%' },

  { kind: 'stat', theme: 'verdant', eyebrow: 'OPORTUNIDADE VERDANT', value: '11', unit: 'unidades', caption: 'Últimas unidades disponíveis — a janela está fechando.' },

  { kind: 'stat', theme: 'verdant', eyebrow: 'CONDIÇÃO ESPECIAL', value: 'INCC', caption: 'Congelado até a entrega — o valor contratado não sofre correção pelo índice até as chaves.' },

  { kind: 'diff', theme: 'verdant', eyebrow: 'DIFERENCIAIS DE ACABAMENTO', title: 'Cada detalhe\npensado com\nprecisão.',
    cols: [
      ['Porcelanato de grande formato nas áreas sociais', 'Revestimento cerâmico especial nos banheiros', 'Bancadas em quartzito natural nas cozinhas', 'Marcenaria planejada com painéis de MDF revestido', 'Esquadrias em alumínio de alta performance'],
      ['Vidros duplos laminados com controle solar', 'Forro em drywall com sanca para iluminação indireta', 'Pintura texturizada premium em todas as paredes', 'Peças sanitárias e metais de linha superior', 'Piso flutuante de madeira nos dormitórios'],
    ] },

  { kind: 'diff', theme: 'verdant', eyebrow: 'DIFERENCIAIS CONSTRUTIVOS E DE ENTREGA', title: 'Tecnologia,\nsustentabilidade\ne previsibilidade.',
    cols: [
      ['Estrutura em concreto armado de alta resistência', 'Alvenaria em bloco cerâmico com isolamento acústico', 'Impermeabilização com garantia estendida', 'Sistema de pressurização nas escadas de emergência', 'Energia solar fotovoltaica compartilhada'],
      ['Infraestrutura para recarga de veículos elétricos', 'Sistema de reaproveitamento de água pluvial', 'Automação residencial Smart Home Ready', 'Gerador de emergência para áreas comuns', 'Entrega prevista para abril de 2027'],
    ] },

  /* ══════════════════════ TREND NANO ══════════════════════ */
  { kind: 'chapter', theme: 'nano', num: '02', title: 'TREND NANO', subtitle: 'Trend Downtown · Av. Azenha · Porto Alegre' },

  { kind: 'hero', theme: 'nano', src: `${T}/PNB_06_Fachada_Nano_EF.webp`,
    eyebrow: 'TREND NANO · TREND DOWNTOWN', title: 'Studios\ncompactos.\nEntrada imediata\nno mercado.', subtitle: 'Torre Nano · Trend Downtown · Av. Azenha', position: 'center 40%' },

  { kind: 'plan', theme: 'nano', src: `${T}/plantas/PNB_PB_08_Planta_Nano_Apto_02B_EF.webp`,
    eyebrow: 'PLANTA 02B', title: 'Studio de\n32 m² — pronto\npara investir.', caption: 'Metragem otimizada, alto potencial de locação e revenda' },

  { kind: 'stat', theme: 'nano', eyebrow: 'A PARTIR DE', value: 'R$ 399.000', caption: 'Studio de 32 m² · Torre Nano · Trend Downtown' },

  { kind: 'payment', theme: 'nano', eyebrow: 'CONDIÇÃO ESPECIAL', title: 'Fluxo de pagamento facilitado.',
    steps: [
      { label: 'Entrada', value: '4x R$ 12.500', sub: 'mensais' },
      { label: 'Chaves', value: 'R$ 30.000', sub: 'na entrega' },
      { label: 'Saldo', value: 'R$ 319.000', sub: 'financiamento' },
    ],
    total: 'TOTAL R$ 399.000' },

  { kind: 'stat', theme: 'nano', eyebrow: 'CONDIÇÃO ESPECIAL', value: 'INCC', caption: 'Congelado até a entrega — o valor contratado não sofre correção pelo índice até as chaves.' },

  { kind: 'stat', theme: 'nano', eyebrow: 'ENTREGA PREVISTA', value: 'DEZ/2026', caption: 'Faltam poucos meses para as chaves na mão.' },

  /* ══════════════════════ SYNTHÈ ══════════════════════ */
  { kind: 'chapter', theme: 'synthe', num: '03', title: 'SYNTHÈ', subtitle: "Mont'Serrat · Porto Alegre" },

  { kind: 'hero', theme: 'synthe', src: `${S}/©VISTA_02_EXT_FACHADA_DIURNA_FINAL.webp`,
    eyebrow: 'SYNTHÈ · PLAENGE · TGD', title: 'A última\nunidade do\npré-lançamento.', subtitle: "Mont'Serrat · Porto Alegre", position: 'center 40%' },

  { kind: 'stat', theme: 'synthe', eyebrow: 'OPORTUNIDADE FINAL', value: '1', unit: 'unidade', caption: 'Última unidade ainda com valor de pré-lançamento — depois dela, a tabela sobe.' },

  { kind: 'campaign', theme: 'synthe', eyebrow: 'CAMPANHA DE CORRETORES', title: 'A campanha\ndos carros\nestá de volta.', body: 'Retomamos a disputa pelas metas — corretores voltam a competir pelos prêmios da campanha SYNTHÈ.' },

  { kind: 'car', theme: 'synthe', src: `${S}/carro-meta1-mg4.webp`,
    eyebrow: 'META 1 · PRÊMIO', title: 'MG4 XPOWER', sub: 'Veículo elétrico', position: 'center 40%' },

  { kind: 'car', theme: 'synthe', src: `${S}/carro-meta2-cyberster.webp`,
    eyebrow: 'META 2 · O PRÊMIO EVOLUI', title: 'MG CYBERSTER', sub: 'Esportivo elétrico conversível', position: 'center 50%' },

  { kind: 'cta' },
];

const TOTAL = SLIDES.length;

function slideLabel(s: Slide): string {
  switch (s.kind) {
    case 'cover':    return 'Abertura';
    case 'chapter':  return `${THEMES[s.theme].label}`;
    case 'hero':     return `${THEMES[s.theme].label} · Apresentação`;
    case 'stat':     return `${THEMES[s.theme].label} · ${s.eyebrow}`;
    case 'plan':     return `${THEMES[s.theme].label} · Planta`;
    case 'diff':     return `${THEMES[s.theme].label} · Diferenciais`;
    case 'payment':  return `${THEMES[s.theme].label} · Pagamento`;
    case 'campaign': return `${THEMES[s.theme].label} · Campanha`;
    case 'car':      return `${THEMES[s.theme].label} · Prêmio`;
    case 'cta':      return 'Encerramento';
    default:         return '';
  }
}

/* ─── Slides individuais ────────────────────────────────── */

function SlideCover({ onFullscreen, isFullscreen }: { onFullscreen: () => void; isFullscreen: boolean }) {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden" style={{ background: '#0A0A0A' }}>
      <div className="absolute inset-0 op-fade" style={{ background: 'radial-gradient(ellipse 75% 65% at 50% 45%, rgba(217,178,92,0.16) 0%, transparent 70%)' }} />
      <button data-pdf-hide onClick={onFullscreen}
        className="absolute top-6 right-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full transition-all hover:scale-105"
        style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.25)', backdropFilter: 'blur(8px)' }}>
        {isFullscreen ? <Minimize className="w-4 h-4 text-white" /> : <Maximize className="w-4 h-4 text-white" />}
        <span className="op-sans text-white text-xs tracking-wider">{isFullscreen ? 'SAIR' : 'TELA CHEIA'}</span>
      </button>
      <div className="relative z-10 flex flex-col items-center text-center px-8">
        <p className="op-sans op-a0 tracking-[0.4em] uppercase mb-8" style={{ color: 'rgba(255,255,255,0.5)', fontSize: 'clamp(0.75rem, 1.1vw, 0.95rem)' }}>
          PLAENGE · APRESENTAÇÃO DE OPORTUNIDADES
        </p>
        <h1 className="op-serif op-a1" style={{ color: '#FFFFFF', fontWeight: 900, fontSize: 'clamp(3.2rem, 8vw, 7.5rem)', lineHeight: 0.95, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
          3 Oportunidades.
        </h1>
        <h2 className="op-serif op-a2" style={{ color: '#D9B25C', fontWeight: 900, fontSize: 'clamp(3.2rem, 8vw, 7.5rem)', lineHeight: 0.95, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
          Uma janela.
        </h2>
        <div className="op-a3 mt-10 flex items-center gap-5">
          <div style={{ height: '1px', width: '56px', background: 'rgba(255,255,255,0.3)' }} />
          <p className="op-sans" style={{ color: 'rgba(255,255,255,0.55)', fontSize: 'clamp(0.85rem, 1.3vw, 1.05rem)', letterSpacing: '0.25em', textTransform: 'uppercase' }}>
            VERDANT · TREND NANO · SYNTHÈ
          </p>
          <div style={{ height: '1px', width: '56px', background: 'rgba(255,255,255,0.3)' }} />
        </div>
      </div>
    </div>
  );
}

function SlideChapter({ s }: { s: Extract<Slide, { kind: 'chapter' }> }) {
  const t = THEMES[s.theme];
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden" style={{ background: t.bg }}>
      <div className="absolute inset-0 op-fade" style={{ background: `radial-gradient(ellipse 75% 65% at 50% 50%, ${t.soft} 0%, transparent 70%)` }} />
      <div className="relative z-10 flex flex-col items-center text-center px-12">
        <p className="op-sans op-a0" style={{ color: t.accent, fontSize: 'clamp(6rem, 13vw, 12rem)', fontWeight: 200, lineHeight: 1, letterSpacing: '-0.02em' }}>{s.num}</p>
        <h1 className="op-serif op-a1 mt-2" style={{ color: '#FFFFFF', fontWeight: 900, fontSize: 'clamp(3.2rem, 7vw, 6.5rem)', lineHeight: 0.95, letterSpacing: '-0.01em', textTransform: 'uppercase' }}>
          {s.title}
        </h1>
        {s.subtitle && (
          <p className="op-sans op-a2 mt-6" style={{ color: 'rgba(255,255,255,0.5)', fontSize: 'clamp(1rem, 1.6vw, 1.3rem)', fontWeight: 300, letterSpacing: '0.08em' }}>
            {s.subtitle}
          </p>
        )}
      </div>
    </div>
  );
}

function SlideHero({ s }: { s: Extract<Slide, { kind: 'hero' }> }) {
  const t = THEMES[s.theme];
  return (
    <div className="relative w-full h-full flex flex-col items-end justify-end pb-20 overflow-hidden">
      <div className="absolute inset-0">
        <Image src={s.src} alt={s.title} fill className="object-cover" priority sizes="100vw"
          style={{ objectPosition: s.position ?? 'center center' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.25) 45%, rgba(0,0,0,0.05) 100%)' }} />
      </div>
      <div className="relative z-10 px-16 max-w-3xl text-right w-full">
        <p className="op-sans op-a0 tracking-[0.3em] uppercase mb-5" style={{ color: t.accent, fontSize: 'clamp(0.8rem, 1.2vw, 1rem)', fontWeight: 500 }}>
          {s.eyebrow}
        </p>
        <h2 className="op-serif op-a1 whitespace-pre-line" style={{ color: '#FFFFFF', fontWeight: 900, fontSize: 'clamp(2.4rem, 4.8vw, 4.2rem)', lineHeight: 1.02, letterSpacing: '-0.01em' }}>
          {s.title}
        </h2>
        {s.subtitle && (
          <p className="op-sans op-a2 mt-6" style={{ color: 'rgba(255,255,255,0.55)', fontSize: 'clamp(0.95rem, 1.4vw, 1.2rem)', fontWeight: 300 }}>
            {s.subtitle}
          </p>
        )}
      </div>
    </div>
  );
}

function SlideStat({ s }: { s: Extract<Slide, { kind: 'stat' }> }) {
  const t = THEMES[s.theme];
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden" style={{ background: t.bg }}>
      <div className="absolute inset-0 op-fade" style={{ background: `radial-gradient(ellipse 70% 60% at 50% 45%, ${t.soft} 0%, transparent 70%)` }} />
      <div className="relative z-10 flex flex-col items-center text-center px-12 max-w-4xl">
        <p className="op-sans op-a0 tracking-[0.4em] uppercase mb-8" style={{ color: t.accent, fontSize: 'clamp(0.8rem, 1.2vw, 1rem)', fontWeight: 500 }}>
          {s.eyebrow}
        </p>
        <div className="op-a1 flex items-baseline gap-5">
          <span className="op-serif" style={{ color: '#FFFFFF', fontWeight: 900, fontSize: 'clamp(5rem, 13vw, 12rem)', lineHeight: 0.85, letterSpacing: '-0.03em' }}>
            {s.value}
          </span>
          {s.unit && (
            <span className="op-sans" style={{ color: 'rgba(255,255,255,0.45)', fontWeight: 300, fontSize: 'clamp(1.6rem, 3.2vw, 2.8rem)' }}>
              {s.unit}
            </span>
          )}
        </div>
        <div className="op-a2 mt-9 mb-9" style={{ width: '70px', height: '3px', background: t.accent }} />
        {s.caption && (
          <p className="op-sans op-a3" style={{ color: 'rgba(255,255,255,0.6)', fontSize: 'clamp(1.05rem, 1.7vw, 1.4rem)', fontWeight: 300, lineHeight: 1.6, maxWidth: '640px' }}>
            {s.caption}
          </p>
        )}
      </div>
    </div>
  );
}

function SlidePlan({ s }: { s: Extract<Slide, { kind: 'plan' }> }) {
  const t = THEMES[s.theme];
  return (
    <div className="relative w-full h-full flex" style={{ background: t.bg }}>
      <div className="relative w-3/5 h-full" style={{ background: '#FFFFFF' }}>
        <Image src={s.src} alt={s.title} fill className="object-contain" sizes="60vw" style={{ padding: '2rem' }} />
      </div>
      <div className="relative z-10 w-2/5 flex flex-col justify-center px-14 py-16">
        <p className="op-sans op-a0 tracking-[0.3em] uppercase mb-6" style={{ color: t.accent, fontSize: 'clamp(0.8rem, 1.2vw, 1rem)', fontWeight: 500 }}>
          {s.eyebrow}
        </p>
        <h2 className="op-serif op-a1 whitespace-pre-line" style={{ color: '#FFFFFF', fontWeight: 900, fontSize: 'clamp(2.2rem, 4vw, 3.4rem)', lineHeight: 1.02, letterSpacing: '-0.01em' }}>
          {s.title}
        </h2>
        {s.caption && (
          <p className="op-sans op-a2 mt-7" style={{ color: 'rgba(255,255,255,0.55)', fontSize: 'clamp(0.95rem, 1.4vw, 1.15rem)', fontWeight: 300, lineHeight: 1.6, maxWidth: '400px' }}>
            {s.caption}
          </p>
        )}
      </div>
    </div>
  );
}

function SlideDiff({ s }: { s: Extract<Slide, { kind: 'diff' }> }) {
  const t = THEMES[s.theme];
  return (
    <div className="relative w-full h-full flex flex-col" style={{ background: t.bg }}>
      <div className="px-16 pt-16 pb-8 flex-shrink-0">
        <p className="op-sans op-a0 tracking-[0.3em] uppercase mb-4" style={{ color: t.accent, fontSize: 'clamp(0.8rem, 1.2vw, 1rem)', fontWeight: 500 }}>
          {s.eyebrow}
        </p>
        <h2 className="op-serif op-a1 whitespace-pre-line" style={{ color: '#FFFFFF', fontWeight: 900, fontSize: 'clamp(2.2rem, 4.2vw, 3.6rem)', lineHeight: 1.05, letterSpacing: '-0.01em' }}>
          {s.title}
        </h2>
      </div>
      <div className="flex-1 px-16 pb-14 grid grid-cols-2 gap-x-16 gap-y-4 content-center op-a2">
        {s.cols.map((col, ci) => (
          <div key={ci} className="flex flex-col gap-5">
            {col.map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: t.accent, flexShrink: 0, marginTop: '0.55em' }} />
                <p className="op-sans" style={{ color: 'rgba(255,255,255,0.7)', fontSize: 'clamp(0.95rem, 1.35vw, 1.2rem)', fontWeight: 300, lineHeight: 1.45 }}>
                  {item}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function SlidePayment({ s }: { s: Extract<Slide, { kind: 'payment' }> }) {
  const t = THEMES[s.theme];
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-12 overflow-hidden" style={{ background: t.bg }}>
      <div className="absolute inset-0 op-fade" style={{ background: `radial-gradient(ellipse 75% 60% at 50% 40%, ${t.soft} 0%, transparent 70%)` }} />
      <p className="op-sans op-a0 tracking-[0.35em] uppercase mb-5" style={{ color: t.accent, fontSize: 'clamp(0.8rem, 1.2vw, 1rem)', fontWeight: 500 }}>
        {s.eyebrow}
      </p>
      <h2 className="op-serif op-a1 text-center mb-14" style={{ color: '#FFFFFF', fontWeight: 900, fontSize: 'clamp(2rem, 3.8vw, 3.2rem)', lineHeight: 1.05, letterSpacing: '-0.01em' }}>
        {s.title}
      </h2>
      <div className="op-a2 flex items-center gap-5 flex-wrap justify-center">
        {s.steps.map((step, i) => (
          <Fragment key={i}>
            <div className="flex flex-col items-center px-10 py-9 rounded-2xl" style={{ border: `1px solid ${t.accent}55`, background: t.soft, minWidth: '220px' }}>
              <p className="op-sans tracking-[0.15em] uppercase mb-3" style={{ color: 'rgba(255,255,255,0.5)', fontSize: 'clamp(0.7rem, 1vw, 0.85rem)' }}>
                {step.label}
              </p>
              <p className="op-serif" style={{ color: '#FFFFFF', fontWeight: 900, fontSize: 'clamp(1.6rem, 2.8vw, 2.4rem)', whiteSpace: 'nowrap' }}>
                {step.value}
              </p>
              {step.sub && (
                <p className="op-sans mt-1" style={{ color: 'rgba(255,255,255,0.4)', fontSize: 'clamp(0.75rem, 1vw, 0.9rem)' }}>{step.sub}</p>
              )}
            </div>
            {i < s.steps.length - 1 && (
              <ChevronRight className="w-8 h-8 flex-shrink-0" style={{ color: t.accent }} />
            )}
          </Fragment>
        ))}
      </div>
      <div className="op-a3 mt-14 flex items-center gap-4">
        <div style={{ height: '1px', width: '48px', background: `${t.accent}90` }} />
        <p className="op-sans" style={{ color: t.accent, fontWeight: 700, fontSize: 'clamp(1rem, 1.6vw, 1.35rem)', letterSpacing: '0.12em' }}>
          {s.total}
        </p>
        <div style={{ height: '1px', width: '48px', background: `${t.accent}90` }} />
      </div>
    </div>
  );
}

function SlideCampaign({ s }: { s: Extract<Slide, { kind: 'campaign' }> }) {
  const t = THEMES[s.theme];
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden" style={{ background: t.bg }}>
      <div className="absolute top-0 left-0 right-0" style={{ height: '3px', background: t.accent }} />
      <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 80% 60% at 50% 50%, ${t.soft} 0%, transparent 65%)` }} />
      <div className="relative z-10 flex flex-col items-center text-center px-16 max-w-5xl">
        <p className="op-sans op-a0 tracking-[0.45em] uppercase mb-10" style={{ color: `${t.accent}` , fontSize: 'clamp(0.75rem, 1.1vw, 0.9rem)', fontWeight: 500 }}>
          {s.eyebrow}
        </p>
        <h2 className="op-serif op-a1 whitespace-pre-line" style={{ color: '#FFFFFF', fontWeight: 900, fontSize: 'clamp(3rem, 5.6vw, 5.2rem)', lineHeight: 1.05, letterSpacing: '-0.01em' }}>
          {s.title}
        </h2>
        {s.body && (
          <p className="op-sans op-a2 mt-10" style={{ color: 'rgba(255,255,255,0.6)', fontSize: 'clamp(1.1rem, 1.8vw, 1.5rem)', fontWeight: 300, lineHeight: 1.6, maxWidth: '620px' }}>
            {s.body}
          </p>
        )}
      </div>
    </div>
  );
}

function SlideCar({ s }: { s: Extract<Slide, { kind: 'car' }> }) {
  const t = THEMES[s.theme];
  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: t.bg }}>
      <div className="absolute inset-0 op-fade">
        <Image src={s.src} alt={s.title} fill className="object-cover" sizes="100vw" style={{ objectPosition: s.position ?? 'center center' }} />
      </div>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 30%, transparent 55%, rgba(0,0,0,0.88) 100%)' }} />
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center gap-3 px-16 pt-14">
        <div style={{ width: '32px', height: '2px', background: t.accent }} />
        <p className="op-sans op-a0 tracking-[0.35em] uppercase" style={{ color: t.accent, fontSize: 'clamp(0.8rem, 1.2vw, 1rem)', fontWeight: 500 }}>
          {s.eyebrow}
        </p>
      </div>
      <div className="absolute bottom-0 left-0 right-0 z-10 px-16 pb-14">
        <p className="op-serif op-a1" style={{ color: '#FFFFFF', fontWeight: 900, fontSize: 'clamp(3rem, 5.8vw, 5.5rem)', lineHeight: 1, letterSpacing: '-0.01em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
          {s.title}
        </p>
        {s.sub && (
          <p className="op-sans op-a2" style={{ color: 'rgba(255,255,255,0.6)', fontSize: 'clamp(0.95rem, 1.4vw, 1.2rem)', fontWeight: 300 }}>
            {s.sub}
          </p>
        )}
      </div>
    </div>
  );
}

function SlideCta() {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden" style={{ background: '#0A0A0A' }}>
      <div className="absolute inset-0 op-fade" style={{ background: 'radial-gradient(ellipse 75% 65% at 50% 45%, rgba(217,178,92,0.14) 0%, transparent 70%)' }} />
      <div className="relative z-10 flex flex-col items-center text-center px-12">
        <p className="op-sans op-a0 tracking-[0.4em] uppercase mb-10" style={{ color: 'rgba(255,255,255,0.45)', fontSize: 'clamp(0.8rem, 1.2vw, 1rem)' }}>
          3 OPORTUNIDADES · JANELA CURTA
        </p>
        <h2 className="op-serif op-a1" style={{ color: '#FFFFFF', fontWeight: 900, fontSize: 'clamp(2.6rem, 5.5vw, 5rem)', lineHeight: 1, letterSpacing: '-0.01em', textTransform: 'uppercase' }}>
          Fale com seu<br />gerente comercial.
        </h2>
        <div className="op-a2 mt-12 flex gap-10 flex-wrap items-center justify-center">
          <a href="https://grupo-plaenge.vercel.app/verdant" target="_blank" rel="noopener noreferrer"
            className="op-sans flex items-center gap-3 px-8 py-3.5 rounded-full transition-all hover:scale-105"
            style={{ border: '1px solid rgba(184,148,90,0.5)', background: 'rgba(184,148,90,0.12)', color: '#FFFFFF', fontWeight: 600, fontSize: 'clamp(0.9rem, 1.3vw, 1.05rem)', letterSpacing: '0.06em', textDecoration: 'none' }}>
            VERDANT
          </a>
          <a href="https://grupo-plaenge.vercel.app/trend" target="_blank" rel="noopener noreferrer"
            className="op-sans flex items-center gap-3 px-8 py-3.5 rounded-full transition-all hover:scale-105"
            style={{ border: '1px solid rgba(212,120,90,0.5)', background: 'rgba(212,120,90,0.12)', color: '#FFFFFF', fontWeight: 600, fontSize: 'clamp(0.9rem, 1.3vw, 1.05rem)', letterSpacing: '0.06em', textDecoration: 'none' }}>
            TREND NANO
          </a>
          <a href="https://grupo-plaenge.vercel.app/synthe" target="_blank" rel="noopener noreferrer"
            className="op-sans flex items-center gap-3 px-8 py-3.5 rounded-full transition-all hover:scale-105"
            style={{ border: '1px solid rgba(193,66,42,0.5)', background: 'rgba(193,66,42,0.12)', color: '#FFFFFF', fontWeight: 600, fontSize: 'clamp(0.9rem, 1.3vw, 1.05rem)', letterSpacing: '0.06em', textDecoration: 'none' }}>
            SYNTHÈ
          </a>
        </div>
        <p className="op-sans op-a3 mt-16" style={{ color: 'rgba(255,255,255,0.25)', fontSize: 'clamp(0.7rem, 0.9vw, 0.8rem)', letterSpacing: '0.25em', textTransform: 'uppercase' }}>
          PLAENGE · PORTO ALEGRE
        </p>
      </div>
    </div>
  );
}

/* ─── Componente principal ──────────────────────────────── */

export default function PptOportunidade() {
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
    const params = new URLSearchParams(window.location.search);
    const p = parseInt(params.get('slide') ?? '', 10);
    if (!isNaN(p) && p >= 0 && p < TOTAL) goTo(p);
  }, [goTo]);

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
  const theme: ThemeKey = 'theme' in current ? current.theme : 'neutral';
  const t = THEMES[theme];
  const isPlanSlide = current.kind === 'plan';

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden select-none" style={{ background: t.bg }}>
      <style dangerouslySetInnerHTML={{ __html: FONT_CSS }} />

      <div key={animKey} className="w-full h-full">
        {current.kind === 'cover'    && <SlideCover onFullscreen={toggleFullscreen} isFullscreen={isFullscreen} />}
        {current.kind === 'chapter'  && <SlideChapter s={current} />}
        {current.kind === 'hero'     && <SlideHero s={current} />}
        {current.kind === 'stat'     && <SlideStat s={current} />}
        {current.kind === 'plan'     && <SlidePlan s={current} />}
        {current.kind === 'diff'     && <SlideDiff s={current} />}
        {current.kind === 'payment'  && <SlidePayment s={current} />}
        {current.kind === 'campaign' && <SlideCampaign s={current} />}
        {current.kind === 'car'      && <SlideCar s={current} />}
        {current.kind === 'cta'      && <SlideCta />}
      </div>

      {/* Top bar */}
      <div data-pdf-hide className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-10 py-5 pointer-events-none">
        <div className="flex items-center gap-3">
          <div style={{ width: '22px', height: '1px', background: `${t.accent}70` }} />
          <span className="op-sans tracking-[0.25em] uppercase" style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.72rem', fontWeight: 400 }}>
            {slideLabel(current)}
          </span>
        </div>
        <span className="op-sans tabular-nums" style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.72rem', fontWeight: 300, letterSpacing: '0.15em' }}>
          {String(slide + 1).padStart(2, '0')} / {String(TOTAL).padStart(2, '0')}
        </span>
      </div>

      {/* Progress bar */}
      <div data-pdf-hide className="absolute bottom-0 left-0 right-0 z-40 h-0.5" style={{ background: 'rgba(255,255,255,0.06)' }}>
        <div style={{ width: `${((slide + 1) / TOTAL) * 100}%`, height: '100%', background: t.accent, transition: 'width 0.45s cubic-bezier(.4,0,.2,1), background 0.4s ease' }} />
      </div>

      {/* Dot nav */}
      <div data-pdf-hide className="absolute bottom-3 left-0 right-0 z-40 flex justify-center gap-1.5 flex-wrap px-8">
        {SLIDES.map((sl, i) => (
          <button key={i} onClick={() => goTo(i)}
            className="transition-all duration-300"
            style={{
              width: i === slide ? '18px' : sl.kind === 'chapter' ? '8px' : '5px',
              height: '5px',
              borderRadius: '3px',
              background: i === slide ? t.accent : sl.kind === 'chapter' ? 'rgba(255,255,255,0.32)' : 'rgba(255,255,255,0.16)',
            }} />
        ))}
      </div>

      {/* Arrow nav */}
      {slide > 0 && (
        <button data-pdf-hide onClick={() => goTo(slide - 1)}
          className={`absolute left-0 top-12 bottom-8 z-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity ${isPlanSlide ? 'w-16' : 'w-20'}`}>
          <ChevronLeft className="w-8 h-8" style={{ color: 'rgba(255,255,255,0.5)' }} />
        </button>
      )}
      {slide < TOTAL - 1 && (
        <button data-pdf-hide onClick={() => goTo(slide + 1)}
          className={`absolute right-0 top-12 bottom-8 z-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity ${isPlanSlide ? 'w-16' : 'w-20'}`}>
          <ChevronRight className="w-8 h-8" style={{ color: 'rgba(255,255,255,0.5)' }} />
        </button>
      )}
    </div>
  );
}
