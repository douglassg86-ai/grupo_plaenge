'use client';

import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Maximize, Minimize } from 'lucide-react';

// ── THEME ─────────────────────────────────────────────────────────────────────
const BG   = '#080808';
const GOLD = '#C4943A';
const WARM = '#F0EDE8';

// ── TYPES ─────────────────────────────────────────────────────────────────────
interface FullscreenProps { onFullscreen: () => void; isFullscreen: boolean }

interface ProductData {
  name: string;
  logo: string;
  img: string;
  bgPos?: string;
  plantaImg: string;
  plantaLabel: string;
  plantaHorizontal?: boolean;
  extraPlantas?: { img: string; label: string; implantacaoImg?: string }[];
  implantacaoImg?: string;
  mapUrl?: string;
  addr: string;
  bairro: string;
  price?: string;
  badges: string[];
  delivery: string;
  sold?: string;
}

interface MosaicItem {
  name: string;
  logo: string;
  img: string;
  tag: string;
  date: string;
  badge2?: string;
  sold100?: boolean;
}

// ── PRODUCTS ──────────────────────────────────────────────────────────────────
const PRODUCTS: ProductData[] = [
  {
    name: 'Verdant',
    logo: '/VERDANT/logo_verdant.png',
    img: '/VERDANT/©VISTA_01_EXT_FACHADA_DIURNA_FINAL.webp',
    plantaImg: '/VERDANT/plantas/©VISTA_05_PLB_UNIDADE_APTO_TIPO_01_FINAL.webp',
    plantaLabel: 'Apartamento Tipo — 145 m²',
    implantacaoImg: '/VERDANT/implantacoes/verdant-implantacao.jpg',
    mapUrl: 'https://maps.google.com/maps?q=Rua+Eça+de+Queiroz,+215,+Porto+Alegre&t=&z=15&ie=UTF8&iwloc=&output=embed',
    extraPlantas: [
      { img: '/VERDANT/plantas/©VISTA_08_PLB_UNIDADE_APTO_DUPLEX_INFERIOR_FINAL.webp', label: 'Duplex — Pavimento Inferior' },
      { img: '/VERDANT/plantas/©VISTA_09_PLB_UNIDADE_APTO_DUPLEX_SUPERIOR_FINAL.webp', label: 'Duplex — Pavimento Superior' },
      { img: '/VERDANT/plantas/©VISTA_10_PLB_UNIDADE_APTO_COBERTURA_INFERIOR_FINAL_sem banheira.webp', label: 'Cobertura — Pavimento Inferior' },
      { img: '/VERDANT/plantas/©VISTA_11_PLB_UNIDADE_APTO_COBERTURA_SUPERIOR_FINAL.webp', label: 'Cobertura — Pavimento Superior' },
    ],
    addr: 'Rua Eça de Queiroz, 215',
    bairro: 'Porto Alegre',
    price: 'R$ 2.099.000',
    badges: ['Parcelas fixas', 'Últimas unidades', 'Ref. unidade 301'],
    delivery: 'Entrega Abril 2027',
  },
  {
    name: 'Mood',
    logo: '/MOOD/logo_mood.png',
    img: '/MOOD/01_fachada-02.webp',
    plantaImg: '/MOOD/plantas/IMG_9736.webp',
    plantaLabel: 'Studio — 29 m²',
    implantacaoImg: '/MOOD/implantacoes/mood.png',
    mapUrl: 'https://maps.google.com/maps?q=Rua+São+Josemaría+Escrivá,+585,+Porto+Alegre&t=&z=15&ie=UTF8&iwloc=&output=embed',
    addr: 'Rua São Josemaría Escrivá, 585',
    bairro: 'Porto Alegre',
    price: 'R$ 299.000',
    badges: ['Fluxo 10/90', 'Últimas unidades'],
    delivery: 'Pronto para morar ou investir',
  },
  {
    name: 'Trend Nano',
    logo: '/TREND/logo_nano.png',
    img: '/TREND/PNB_06_Fachada_Nano_EF.webp',
    plantaImg: '/TREND/plantas/PNB_PB_08_Planta_Nano_Apto_02B_EF.webp',
    plantaLabel: 'Studio 02B — 32,06 m²',
    plantaHorizontal: true,
    implantacaoImg: '/TREND/implantacoes-nano/nano-03.jpg',
    mapUrl: 'https://maps.google.com/maps?q=Av.+Azenha,+15,+Porto+Alegre&t=&z=15&ie=UTF8&iwloc=&output=embed',
    addr: 'Av. Azenha, 15',
    bairro: 'Cidade Baixa · Porto Alegre',
    price: 'a partir de R$ 399.000',
    badges: ['Fluxo 20/80', 'Parcelas fixas até a entrega', 'Em breve: decorado na torre'],
    delivery: 'Entrega Dez/2026 · Primeira Fase',
  },
  {
    name: 'Yuna',
    logo: '/YUNA/logo.png',
    img: '/YUNA/IMG-20240704-WA0032.webp',
    bgPos: '45% center',
    plantaImg: '/YUNA/plantas/03_VAN_PARECI_APTO_2_DORM_Ef.webp',
    plantaLabel: 'Apartamento 2 Dorms. c/Suíte — 72 m²',
    implantacaoImg: '/YUNA/implantacoes/yuna-01.png',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.0!2d-51.1988!3d-30.0438!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x951979c0e3cc1dbd%3A0x1!2sR.+Felizardo+Furtado%2C+348+-+Jardim+Bot%C3%A2nico%2C+Porto+Alegre+-+RS!5e0!3m2!1spt-BR!2sbr!4v1234567890',
    extraPlantas: [
      { img: '/YUNA/plantas/07_VAN_PARECI_APTO_3_DORM_OP_LIVING_EF_COTAS.webp', label: 'Apartamento 3 Dorms. — Living Estendido', implantacaoImg: '/YUNA/implantacoes/yuna-03.png' },
      { img: '/YUNA/plantas/06_VAN_PARECI_APTO_3_DORM_OP_EF.webp', label: 'Apartamento 3 Dorms. — Opção', implantacaoImg: '/YUNA/implantacoes/yuna-02.png' },
    ],
    addr: 'Rua Felizardo Furtado, 348',
    bairro: 'Jardim Botânico · Porto Alegre',
    price: 'a partir de R$ 966.000 · 88 m²',
    badges: ['Fluxo 20/80', 'Ref. unidade 205'],
    delivery: 'Entrega Novembro 2027',
  },
  {
    name: 'SHIFT',
    logo: '/SHIFT/logo_shift.png',
    img: '/SHIFT/kota_tgd_sil_fachada_4k.webp',
    plantaImg: '/SHIFT/plantas_shift3.png',
    plantaLabel: 'Studio — 25 m²',
    implantacaoImg: '/SHIFT/cpavimentos-01.png',
    mapUrl: 'https://maps.google.com/maps?q=Rua+Silva+Jardim,+21,+Porto+Alegre&t=&z=15&ie=UTF8&iwloc=&output=embed',
    addr: 'Rua Silva Jardim, 21',
    bairro: 'Moinhos de Vento · Porto Alegre',
    price: 'a partir de R$ 389.000',
    badges: ['Últimas unidades'],
    delivery: 'Entrega Abril 2029',
  },
  {
    name: 'Edition',
    logo: '/EDITION/logo_edition.png',
    img: '/EDITION/JAC_01_Fachada_A_EF2.webp',
    plantaImg: '/EDITION/plantas/3 suítes_146m2_ Torre Jardim Cristófel.webp',
    plantaLabel: '3 Suítes — 146 m²',
    implantacaoImg: '/EDITION/implantacoes/edition.png',
    mapUrl: 'https://maps.google.com/maps?q=Rua+Jardim+Cristofel,+215,+Porto+Alegre&t=&z=15&ie=UTF8&iwloc=&output=embed',
    extraPlantas: [
      { img: '/EDITION/plantas/3 suítes_172m2_ Torre Doutor Vale.webp',       label: '3 Suítes — 172 m² · Torre Doutor Vale' },
      { img: '/EDITION/plantas/3 suítes_172m2_ Torre Jardim Cristofel.webp',  label: '3 Suítes — 172 m² · Torre Jardim Cristófel' },
      { img: '/EDITION/plantas/3 suítes_206m2_ Torre Doutor Vale.webp',       label: '3 Suítes — 206 m² · Torre Doutor Vale' },
      { img: '/EDITION/plantas/4 suítes_322m2_ Torre Jardim Cristofel.webp',  label: '4 Suítes — 322 m² · Torre Jardim Cristófel' },
    ],
    addr: 'Rua Jardim Cristófel, 215',
    bairro: 'Moinhos de Vento · Porto Alegre',
    badges: ['Grande oportunidade — consulte condições'],
    delivery: 'Entrega Julho 2028',
  },
  {
    name: 'Synthè',
    logo: '/SYNTHE/logo.png',
    img: '/SYNTHE/©VISTA_02_EXT_FACHADA_DIURNA_FINAL.webp',
    plantaImg: '/SYNTHE/plantas/©VISTA_01_PLB_APARTAMENTO_TIPO_01_PADRAO_R03_COTAS_FINAL.webp',
    plantaLabel: 'Planta Tipo',
    addr: 'Rua Pedro Ivo, 550',
    bairro: "Mont'Serrat · Porto Alegre",
    badges: ['Últimas oportunidades para concorrer aos carros'],
    delivery: 'Pré-lançamento',
  },
];

// ── MOSAIC DATA ───────────────────────────────────────────────────────────────
const MOSAIC: MosaicItem[] = [
  { name: 'YVY',        logo: '/YVY/logo_yvy.png',          img: '/YVY/IMG_9127.webp',                               tag: 'ENTREGUE',       date: 'Mar/2024',  sold100: true },
  { name: 'Orbitale',   logo: '/ORBITALE/logo_orbitale.png', img: '/ORBITALE/01_FACHADA-02.webp',                     tag: 'PRONTO',         date: '',          sold100: true },
  { name: 'Verdant',    logo: '/VERDANT/logo_verdant.png',   img: '/VERDANT/©VISTA_01_EXT_FACHADA_DIURNA_FINAL.webp', tag: 'ENTREGA',        date: 'Abr/2027',  badge2: 'Últimas unidades' },
  { name: 'Mood',       logo: '/MOOD/logo_mood.png',         img: '/MOOD/01_fachada-02.webp',                         tag: 'PRONTO',         date: '',          badge2: 'Últimas unidades' },
  { name: 'Trend Nano', logo: '/TREND/logo_nano.png',        img: '/TREND/PNB_01_Fotomontagem_EF.webp',               tag: 'ENTREGA',        date: 'Dez/2026' },
  { name: 'Yuna',       logo: '/YUNA/logo.png',              img: '/YUNA/IMG-20240704-WA0032.webp',                   tag: 'ENTREGA',        date: 'Nov/2027' },
  { name: 'SHIFT',      logo: '/SHIFT/logo_shift.png',       img: '/SHIFT/kota_tgd_sil_fachada_4k.webp',              tag: 'ENTREGA',        date: 'Abr/2029',  badge2: 'Últimas unidades' },
  { name: 'Edition',    logo: '/EDITION/logo_edition.png',   img: '/EDITION/JAC_31_Voo_Passaro_EF_v2.webp',           tag: 'ENTREGA',        date: 'Jul/2028' },
  { name: 'Synthè',     logo: '/SYNTHE/logo.png',            img: '/SYNTHE/©VISTA_02_EXT_FACHADA_DIURNA_FINAL.webp',  tag: 'PRÉ-LANÇAMENTO', date: '' },
  { name: 'Wave',       logo: '',                            img: '/WAVE/wave_pordosol.jpg',                          tag: 'PRONTO',         date: '' },
];

const POA_TIMELINE = [
  { name: 'YVY',                   addr: 'Lindoia',                              tag: 'Entregue Mar/2024 · 100% vendido' },
  { name: 'Orbitale',              addr: 'R. Regente, 152 · Petrópolis',         tag: '100% Vendido' },
  { name: 'Wave Home Resort',      addr: 'Av. José Bruno Klein, 879 · Xangri-lá', tag: 'Pronto para construir' },
  { name: 'Mood Central Parque',   addr: 'R. São Josemaría Escrivá, 585',        tag: 'Pronto para morar' },
  { name: 'Trend Downtown Nano',   addr: 'R. General Lima e Silva, 1462',        tag: 'Entrega Dez/2026' },
  { name: 'Verdant',               addr: 'R. Eça de Queiroz, 215',               tag: 'Entrega Abr/2027' },
  { name: 'Yuna Jardim Botânico',  addr: 'R. Felizardo Furtado, 348',            tag: 'Entrega Nov/2027' },
  { name: 'Edition Moinhos',       addr: 'R. Jardim Cristófel · Moinhos',        tag: 'Entrega Jul/2028' },
  { name: 'SHIFT',                 addr: 'Silva Jardim c/ R. 24 de Outubro',     tag: 'Entrega Abr/2029' },
  { name: 'Synthè',                addr: "R. Pedro Ivo, 550 · Mont'Serrat",      tag: 'Pré-lançamento' },
];

// ── SLIDE LIST ────────────────────────────────────────────────────────────────
type Slide =
  | { k: 'numbers' }
  | { k: 'cover' }
  | { k: 'poa' }
  | { k: 'mosaic' }
  | { k: 'orbitale100' }
  | { k: 'product'; p: ProductData }
  | { k: 'mapa';    p: ProductData }
  | { k: 'planta';  p: ProductData }
  | { k: 'moodcampanha' }
  | { k: 'meta1intro' }
  | { k: 'meta1car' }
  | { k: 'meta2intro' }
  | { k: 'meta2car' }
  | { k: 'contracapa' };

const SLIDES: Slide[] = [
  { k: 'numbers' },
  { k: 'cover' },
  { k: 'mosaic' },
  { k: 'orbitale100' },
  ...PRODUCTS.flatMap(p => [
    { k: 'product' as const, p },
    ...(p.name === 'Mood' ? [{ k: 'moodcampanha' as const }] : []),
    ...(p.mapUrl ? [{ k: 'mapa' as const, p }] : []),
    { k: 'planta'  as const, p },
    ...(p.extraPlantas ?? []).map(ep => ({
      k: 'planta' as const,
      p: { ...p, plantaImg: ep.img, plantaLabel: ep.label, ...(ep.implantacaoImg ? { implantacaoImg: ep.implantacaoImg } : {}) } as ProductData,
    })),
  ]),
  { k: 'meta1intro' },
  { k: 'meta1car' },
  { k: 'meta2intro' },
  { k: 'meta2car' },
  { k: 'contracapa' },
];

// ── FULLSCREEN BUTTON ─────────────────────────────────────────────────────────
function FsBtn({ onFullscreen, isFullscreen }: FullscreenProps) {
  return (
    <button
      onClick={onFullscreen}
      className="absolute top-5 right-5 z-50 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium tracking-widest"
      style={{ background: 'rgba(0,0,0,0.45)', border: '1px solid rgba(255,255,255,0.22)', color: WARM, backdropFilter: 'blur(10px)' }}
    >
      {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
      {isFullscreen ? 'SAIR' : 'TELA CHEIA'}
    </button>
  );
}

// ── SLIDES ────────────────────────────────────────────────────────────────────

function SlideCover({ onFullscreen, isFullscreen }: FullscreenProps) {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden" style={{ background: BG }}>
      {/* Central de Decorados Plaenge POA — foto noturna */}
      <Image
        src="/INSTITUCIONAL/central_decorados_noturna.webp"
        alt="Central de Decorados Plaenge Porto Alegre"
        fill
        className="object-cover"
        style={{ objectPosition: 'center 40%', opacity: 0.55 }}
      />
      {/* lâmina escura para legibilidade */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(8,8,8,0.95) 0%, rgba(8,8,8,0.6) 50%, rgba(8,8,8,0.45) 100%)' }} />
      <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }} />

      <FsBtn onFullscreen={onFullscreen} isFullscreen={isFullscreen} />

      <div className="relative z-10 flex flex-col items-center gap-8 text-center px-12">
        <div className="flex items-center gap-10 mb-4">
          <Image src="/INSTITUCIONAL/logo_plaenge_vanguard_claro.webp" alt="Plaenge Vanguard" width={260} height={70} className="object-contain" style={{ filter: 'brightness(1.1)' }} />
        </div>

        <div className="space-y-3">
          <p className="text-sm tracking-[0.4em] uppercase" style={{ color: GOLD }}>Portfólio Regional</p>
          <h1 className="font-bold tracking-tight" style={{ fontSize: 'clamp(3.5rem, 6vw, 6rem)', color: WARM, lineHeight: 1.05 }}>
            Porto Alegre
          </h1>
          <p className="text-xl" style={{ color: 'rgba(240,237,232,0.55)', letterSpacing: '0.06em' }}>
            5 anos · 10 empreendimentos
          </p>
        </div>

        <div className="flex gap-12 mt-6">
          {[['10', 'Empreendimentos'], ['5', 'Anos de atuação']].map(([n, l]) => (
            <div key={l} className="text-center">
              <p className="font-bold" style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)', color: GOLD }}>{n}</p>
              <p className="text-sm mt-1 tracking-widest uppercase" style={{ color: 'rgba(240,237,232,0.45)' }}>{l}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[1px]" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}44, transparent)` }} />
    </div>
  );
}

function SlideNumbers({ onFullscreen, isFullscreen }: FullscreenProps) {
  const stats = [
    { n: '56',     unit: 'anos',      label: 'de mercado' },
    { n: '529',    unit: 'projetos',  label: 'entregues' },
    { n: '+134k',  unit: 'famílias',  label: 'moram em um Plaenge' },
    { n: '9',      unit: 'cidades',   label: 'no Brasil e Chile' },
  ];
  return (
    <div className="relative w-full h-full flex overflow-hidden" style={{ background: BG }}>
      <div className="relative w-1/2 h-full overflow-hidden">
        <Image src="/INSTITUCIONAL/central_decorados_noturna.webp" alt="Central de Decorados Plaenge" fill className="object-cover" style={{ objectPosition: 'center 35%', opacity: 0.7 }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(8,8,8,0) 55%, rgba(8,8,8,1) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(8,8,8,0.75) 0%, transparent 50%)' }} />
      </div>

      <div className="w-1/2 h-full flex flex-col justify-center px-12 gap-6">
        <FsBtn onFullscreen={onFullscreen} isFullscreen={isFullscreen} />
        <div>
          <p className="text-sm tracking-[0.4em] uppercase mb-2" style={{ color: GOLD }}>Grupo Plaenge</p>
          <h2 className="font-bold leading-tight" style={{ fontSize: 'clamp(1.8rem, 2.8vw, 3rem)', color: WARM }}>
            Mais de meio século<br />construindo qualidade<br />de vida.
          </h2>
        </div>
        <p className="text-base leading-relaxed" style={{ color: 'rgba(240,237,232,0.55)', maxWidth: '380px' }}>
          Fundado em 1970 em Londrina, Paraná, o Grupo Plaenge atua em incorporação residencial, construção civil e projetos industriais — presente em 9 cidades do Brasil e também no Chile.
        </p>
        <div className="grid grid-cols-2 gap-5">
          {stats.map(({ n, unit, label }) => (
            <div key={n} className="border-l-2 pl-4" style={{ borderColor: GOLD + '66' }}>
              <span className="font-bold" style={{ fontSize: 'clamp(1.7rem, 2.5vw, 2.6rem)', color: GOLD }}>{n}</span>
              <p className="text-sm font-medium mt-0.5" style={{ color: WARM }}>{unit}</p>
              <p className="text-sm" style={{ color: 'rgba(240,237,232,0.4)' }}>{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SlidePoa({ onFullscreen, isFullscreen }: FullscreenProps) {
  return (
    <div className="relative w-full h-full flex overflow-hidden" style={{ background: BG }}>
      <FsBtn onFullscreen={onFullscreen} isFullscreen={isFullscreen} />

      <div className="w-[38%] h-full flex flex-col justify-center pl-16 pr-8 gap-6">
        <div>
          <p className="text-sm tracking-[0.4em] uppercase mb-3" style={{ color: GOLD }}>Regional Sul</p>
          <h2 className="font-bold leading-none" style={{ fontSize: 'clamp(2.2rem, 3.5vw, 3.6rem)', color: WARM }}>
            5 anos em<br />Porto Alegre.
          </h2>
        </div>
        <div className="flex gap-8">
          <div>
            <p className="font-bold" style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)', color: GOLD }}>10</p>
            <p className="text-sm tracking-widest uppercase mt-1" style={{ color: 'rgba(240,237,232,0.45)' }}>Lançamentos</p>
          </div>
          <div>
            <p className="font-bold" style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)', color: GOLD }}>2+</p>
            <p className="text-sm tracking-widest uppercase mt-1" style={{ color: 'rgba(240,237,232,0.45)' }}>Prontos</p>
          </div>
        </div>
        <p className="text-sm leading-relaxed" style={{ color: 'rgba(240,237,232,0.45)' }}>
          Desde 2020, a Plaenge e a Vanguard constroem presença na capital gaúcha com empreendimentos de alto padrão, consolidando posição em bairros nobres de Porto Alegre.
        </p>
      </div>

      <div className="flex-1 h-full flex flex-col justify-center pr-12 pl-4 gap-1.5">
        {POA_TIMELINE.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-4 py-2.5 px-4 rounded-lg"
            style={{ background: 'rgba(255,255,255,0.03)', borderLeft: `2px solid ${GOLD}33` }}
          >
            <span className="text-sm font-bold w-6 text-right tabular-nums" style={{ color: GOLD + '88' }}>{String(i + 1).padStart(2, '0')}</span>
            <div className="flex-1 min-w-0">
              <p className="text-base font-semibold leading-tight truncate" style={{ color: item.name === 'Orbitale' ? '#ef4444' : WARM }}>{item.name}</p>
              <p className="text-sm leading-tight truncate" style={{ color: 'rgba(240,237,232,0.4)' }}>{item.addr}</p>
            </div>
            <span
              className="text-sm px-3 py-1 rounded whitespace-nowrap font-medium"
              style={item.name === 'Orbitale'
                ? { background: 'rgba(239,68,68,0.2)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.4)' }
                : { background: 'rgba(196,148,58,0.15)', color: GOLD, border: `1px solid ${GOLD}33` }
              }
            >
              {item.tag}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SlideMosaic({ onFullscreen, isFullscreen }: FullscreenProps) {
  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden" style={{ background: BG }}>
      <FsBtn onFullscreen={onFullscreen} isFullscreen={isFullscreen} />

      <div className="flex items-center justify-between px-10 py-4 shrink-0" style={{ borderBottom: `1px solid ${GOLD}22` }}>
        <div>
          <p className="text-sm tracking-[0.4em] uppercase" style={{ color: GOLD }}>Porto Alegre</p>
          <h2 className="text-2xl font-bold" style={{ color: WARM }}>Nosso Portfólio</h2>
        </div>
        <Image src="/INSTITUCIONAL/logo_plaenge_vanguard_claro.webp" alt="logo" width={160} height={42} className="object-contain opacity-70" />
      </div>

      <div className="flex-1 grid grid-cols-5" style={{ gridTemplateRows: 'repeat(2, 1fr)' }}>
        {MOSAIC.map((item, idx) => (
          <div key={item.name} className="relative overflow-hidden group" style={idx === MOSAIC.length - 1 && MOSAIC.length % 5 !== 0 ? { gridColumn: `span ${5 - (MOSAIC.length - 1) % 5}` } : undefined}>
            <Image src={item.img} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.1) 100%)' }} />

            {/* 100% Vendido red overlay for Orbitale */}
            {item.sold100 && (
              <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'rgba(220,38,38,0.55)' }}>
                <div className="text-center px-2">
                  <p className="font-black text-white leading-none" style={{ fontSize: 'clamp(0.8rem, 1.6vw, 1.4rem)', letterSpacing: '-0.02em' }}>100%</p>
                  <p className="font-black text-white leading-none" style={{ fontSize: 'clamp(0.7rem, 1.3vw, 1.1rem)', letterSpacing: '0.05em' }}>VENDIDO</p>
                </div>
              </div>
            )}

            <div className="absolute inset-x-0 bottom-0 p-3 flex flex-col gap-1.5">
              <div className="relative h-7">
                {item.logo ? (
                  <Image src={item.logo} alt={item.name} fill className="object-contain object-left" style={{ filter: 'brightness(0) invert(1)' }} />
                ) : (
                  <p className="text-sm font-bold tracking-widest uppercase" style={{ color: WARM }}>{item.name}</p>
                )}
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                {!item.sold100 && (
                  <span className="text-[11px] px-2 py-0.5 rounded font-medium" style={{
                    background: item.tag === 'PRONTO' || item.tag === 'ENTREGUE' ? 'rgba(34,197,94,0.25)' : item.tag === 'PRÉ-LANÇAMENTO' ? 'rgba(196,148,58,0.25)' : 'rgba(59,130,246,0.25)',
                    color: item.tag === 'PRONTO' || item.tag === 'ENTREGUE' ? '#4ade80' : item.tag === 'PRÉ-LANÇAMENTO' ? GOLD : '#93c5fd',
                    border: `1px solid ${item.tag === 'PRONTO' || item.tag === 'ENTREGUE' ? '#4ade8044' : item.tag === 'PRÉ-LANÇAMENTO' ? GOLD + '44' : '#93c5fd44'}`
                  }}>
                    {item.tag}
                  </span>
                )}
                {item.date && (
                  <span className="text-[12px] font-bold px-2 py-0.5 rounded" style={{
                    background: 'rgba(196,148,58,0.2)',
                    color: GOLD,
                    border: `1px solid ${GOLD}44`,
                  }}>{item.date}</span>
                )}
                {item.badge2 && (
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded" style={{
                    background: 'rgba(251,191,36,0.2)',
                    color: '#fbbf24',
                    border: '1px solid rgba(251,191,36,0.35)',
                  }}>{item.badge2}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── ORBITALE 100% VENDIDO ─────────────────────────────────────────────────────
function SlideOrbitale100({ onFullscreen, isFullscreen }: FullscreenProps) {
  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: '#080808' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeInUp {
          0%   { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInSub {
          0%   { opacity: 0; }
          100% { opacity: 1; }
        }
      ` }} />

      {/* fachada ao fundo com opacidade visível */}
      <Image
        src="/ORBITALE/01_FACHADA-02.webp"
        alt="Orbitale"
        fill
        className="object-cover"
        style={{ opacity: 0.55 }}
      />

      {/* lâmina escura para legibilidade */}
      <div className="absolute inset-0" style={{ background: 'rgba(8,8,8,0.72)' }} />

      {/* acento vermelho sutil no topo */}
      <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: 'linear-gradient(90deg, transparent, #dc2626, transparent)' }} />

      <FsBtn onFullscreen={onFullscreen} isFullscreen={isFullscreen} />

      {/* conteúdo */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 gap-2">
        <div style={{ animation: 'fadeInUp 0.7s ease-out 0.2s both' }}>
          <p
            className="font-black text-center leading-none"
            style={{
              color: '#ef4444',
              fontSize: 'clamp(7rem, 18vw, 18rem)',
              letterSpacing: '-0.04em',
              textShadow: '0 8px 60px rgba(220,38,38,0.5)',
            }}
          >
            100%
          </p>
          <p
            className="font-black text-center leading-none"
            style={{
              color: 'rgba(255,255,255,0.92)',
              fontSize: 'clamp(3rem, 8vw, 8rem)',
              letterSpacing: '0.18em',
              textShadow: '0 4px 20px rgba(0,0,0,0.6)',
            }}
          >
            VENDIDO
          </p>
        </div>

        <div
          className="flex flex-col items-center gap-3 mt-8"
          style={{ animation: 'fadeInSub 0.6s ease-out 0.8s both' }}
        >
          <div className="h-[1px] w-24" style={{ background: 'rgba(239,68,68,0.5)' }} />
          <div className="relative h-8 w-44">
            <Image
              src="/ORBITALE/logo_orbitale.png"
              alt="Orbitale"
              fill
              className="object-contain"
              style={{ filter: 'brightness(0) invert(1)', opacity: 0.7 }}
            />
          </div>
          <p className="text-base tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.45)' }}>
            Petrópolis · Porto Alegre
          </p>
        </div>
      </div>
    </div>
  );
}

function SlideProduct({ p, onFullscreen, isFullscreen }: { p: ProductData } & FullscreenProps) {
  const isMood = p.name === 'Mood';
  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: BG }}>
      <style>{`
        @keyframes sealBounceIn {
          0%   { opacity: 0; transform: scale(0.4) rotate(-20deg); }
          65%  { transform: scale(1.1) rotate(5deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        @keyframes sealFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50%       { transform: translateY(-10px) rotate(5deg); }
        }
      `}</style>
      <Image
        src={p.img} alt={p.name} fill className="object-cover"
        style={{ objectPosition: p.bgPos ?? 'center' }}
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.1) 100%)' }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.6) 0%, transparent 60%)' }} />

      {/* Selos da campanha Mood — PRONTO e ÚLTIMAS UNIDADES */}
      {isMood && (
        <>
          <div className="absolute pointer-events-none" style={{
            top: '8%', left: '6%',
            width: 'clamp(130px, 15vw, 200px)',
            height: 'clamp(130px, 15vw, 200px)',
            animation: 'sealBounceIn 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) 0.4s both, sealFloat 5s ease-in-out 1.2s infinite',
          }}>
            <Image src="/MOOD/campanha_elementos01.png" alt="Pronto" fill className="object-contain" />
          </div>
          <div className="absolute pointer-events-none" style={{
            top: '38%', left: '4%',
            width: 'clamp(110px, 13vw, 180px)',
            height: 'clamp(110px, 13vw, 180px)',
            animation: 'sealBounceIn 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) 0.65s both, sealFloat 6s ease-in-out 1.5s infinite',
          }}>
            <Image src="/MOOD/campanha_elementos02.png" alt="Últimas unidades" fill className="object-contain" />
          </div>
        </>
      )}

      <FsBtn onFullscreen={onFullscreen} isFullscreen={isFullscreen} />

      <div className="absolute inset-x-0 bottom-0 px-14 pb-12 flex flex-col gap-5">
        <div className="relative h-12 w-56">
          <Image src={p.logo} alt={p.name} fill className="object-contain object-left" style={{ filter: 'brightness(0) invert(1)' }} />
        </div>

        <p className="text-base" style={{ color: 'rgba(240,237,232,0.55)', letterSpacing: '0.03em' }}>
          {p.addr} &nbsp;·&nbsp; {p.bairro}
        </p>

        {p.price && (
          <p className="font-bold" style={{ fontSize: 'clamp(2rem, 3.5vw, 3.2rem)', color: WARM, lineHeight: 1.1 }}>
            {p.price}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-2">
          {p.delivery && (
            <span className="text-base font-semibold px-5 py-2 rounded-full" style={{ background: GOLD, color: '#080808' }}>
              {p.delivery}
            </span>
          )}
          {p.badges.map(b => (
            <span key={b} className="text-sm px-4 py-1.5 rounded-full" style={{ background: 'rgba(240,237,232,0.12)', color: WARM, border: '1px solid rgba(240,237,232,0.2)', backdropFilter: 'blur(8px)' }}>
              {b}
            </span>
          ))}
        </div>

        {p.sold && (
          <div className="flex items-center gap-3 mt-1">
            <span className="text-sm" style={{ color: 'rgba(240,237,232,0.5)' }}>Vendido</span>
            <div className="flex-1 max-w-48 h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.15)' }}>
              <div className="h-full rounded-full" style={{ width: `${p.sold}%`, background: GOLD }} />
            </div>
            <span className="text-base font-bold" style={{ color: GOLD }}>{p.sold}%</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ── SLIDE MAPA ────────────────────────────────────────────────────────────────
function SlideMapa({ p, onFullscreen, isFullscreen }: { p: ProductData } & FullscreenProps) {
  return (
    <div className="relative w-full h-full flex overflow-hidden" style={{ background: BG }}>
      <FsBtn onFullscreen={onFullscreen} isFullscreen={isFullscreen} />
      <div className="w-[22%] h-full flex flex-col justify-between py-10 px-8" style={{ background: BG }}>
        <div className="relative h-9 w-36">
          <Image src={p.logo} alt={p.name} fill className="object-contain object-left" style={{ filter: 'brightness(0) invert(1)' }} />
        </div>
        <div className="space-y-3">
          <div className="w-8 h-0.5" style={{ background: GOLD }} />
          <p className="text-base font-semibold leading-tight" style={{ color: WARM }}>{p.addr}</p>
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(240,237,232,0.45)' }}>{p.bairro}</p>
        </div>
        <p className="text-sm tracking-widest uppercase" style={{ color: GOLD + '66' }}>Localização</p>
      </div>
      <div className="flex-1 h-full relative">
        <iframe
          src={p.mapUrl}
          className="w-full h-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Mapa ${p.name}`}
        />
      </div>
    </div>
  );
}


function ImplantacaoThumb({ img }: { img: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="relative w-full rounded-lg overflow-hidden group shrink-0"
        style={{ aspectRatio: '4/3', border: `1px solid ${GOLD}33` }}
      >
        <Image src={img} alt="Implantação" fill className="object-contain" style={{ background: 'rgba(255,255,255,0.94)' }} />
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-center py-1" style={{ background: `${BG}99` }}>
          <span className="text-[10px] tracking-wide" style={{ color: 'rgba(240,237,232,0.6)' }}>Clique para ampliar</span>
        </div>
      </button>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.85)' }}
          onClick={() => setOpen(false)}
        >
          <div className="relative w-[80vw] h-[80vh] rounded-xl overflow-hidden shadow-2xl" style={{ background: '#fff' }} onClick={e => e.stopPropagation()}>
            <Image src={img} alt="Implantação ampliada" fill className="object-contain p-4" />
            <button
              className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
              style={{ background: BG, color: WARM }}
              onClick={() => setOpen(false)}
            >✕</button>
          </div>
        </div>
      )}
    </>
  );
}

function SlidePlanta({ p, onFullscreen, isFullscreen }: { p: ProductData } & FullscreenProps) {
  if (p.plantaHorizontal) {
    return (
      <div className="relative w-full h-full flex overflow-hidden" style={{ background: '#F8F6F2' }}>
        <FsBtn onFullscreen={onFullscreen} isFullscreen={isFullscreen} />
        {/* Sidebar esquerda — logo + implantação */}
        <div className="w-[22%] h-full flex flex-col py-10 px-8 gap-5" style={{ background: BG }}>
          <div className="relative h-8 w-36 shrink-0">
            <Image src={p.logo} alt={p.name} fill className="object-contain object-left" style={{ filter: 'brightness(0) invert(1)' }} />
          </div>
          {p.implantacaoImg && <ImplantacaoThumb img={p.implantacaoImg} />}
          <div className="flex-1" />
          <div className="space-y-2">
            <div className="w-5 h-0.5" style={{ background: GOLD }} />
            <p className="text-sm font-semibold leading-tight" style={{ color: WARM }}>{p.plantaLabel}</p>
            <p className="text-xs leading-relaxed" style={{ color: 'rgba(240,237,232,0.4)' }}>{p.bairro}</p>
          </div>
          <p className="text-sm tracking-widest uppercase" style={{ color: GOLD + '66' }}>Planta</p>
        </div>
        <div className="flex-1 h-full relative">
          <Image src={p.plantaImg} alt={`Planta ${p.name}`} fill className="object-contain p-8" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full flex overflow-hidden" style={{ background: '#F8F6F2' }}>
      <FsBtn onFullscreen={onFullscreen} isFullscreen={isFullscreen} />

      <div className="w-[22%] h-full flex flex-col py-10 px-8 gap-5" style={{ background: BG }}>
        <div className="relative h-9 w-36 shrink-0">
          <Image src={p.logo} alt={p.name} fill className="object-contain object-left" style={{ filter: 'brightness(0) invert(1)' }} />
        </div>
        {p.implantacaoImg && <ImplantacaoThumb img={p.implantacaoImg} />}
        <div className="flex-1" />
        <div className="space-y-3">
          <div className="w-8 h-0.5" style={{ background: GOLD }} />
          <p className="text-base font-semibold leading-tight" style={{ color: WARM }}>{p.plantaLabel}</p>
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(240,237,232,0.45)' }}>{p.addr}<br />{p.bairro}</p>
        </div>
        <p className="text-sm tracking-widest uppercase" style={{ color: GOLD + '66' }}>Planta</p>
      </div>

      <div className="flex-1 h-full relative">
        <Image src={p.plantaImg} alt={`Planta ${p.name}`} fill className="object-contain p-6" />
      </div>
    </div>
  );
}

// ── MOOD CAMPANHA BICICLETA ───────────────────────────────────────────────────
function SlideMoodCampanha({ onFullscreen, isFullscreen }: FullscreenProps) {
  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: '#080808' }}>
      <style>{`
        @keyframes moodBikeIn {
          0%   { opacity: 0; transform: translateX(120px) scale(0.88); }
          100% { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes moodTextUp {
          0%   { opacity: 0; transform: translateY(28px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes moodSealIn {
          0%   { opacity: 0; transform: scale(0.5) rotate(-15deg); }
          70%  { transform: scale(1.08) rotate(3deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        @keyframes moodSealFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50%       { transform: translateY(-8px) rotate(4deg); }
        }
        @keyframes moodLineIn {
          0%   { transform: scaleX(0); transform-origin: left; }
          100% { transform: scaleX(1); transform-origin: left; }
        }
        @keyframes moodGlow {
          0%, 100% { opacity: 0.55; }
          50%       { opacity: 0.8; }
        }
      `}</style>

      {/* Fundo: glow dourado sutil no centro-direita */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 65% 80% at 75% 50%, rgba(196,148,58,0.13) 0%, transparent 65%), #080808',
        animation: 'moodGlow 4s ease-in-out infinite',
      }} />

      {/* Linha gold topo */}
      <div className="absolute top-0 left-0 right-0 h-[2px] pointer-events-none" style={{
        background: `linear-gradient(90deg, transparent 0%, ${GOLD} 35%, transparent 100%)`
      }} />

      {/* ─── BIKE (PNG transparente) — hero visual ─── */}
      <div
        className="absolute right-[-4%] bottom-0 h-[92%]"
        style={{
          width: '58%',
          animation: 'moodBikeIn 1s cubic-bezier(0.22, 1, 0.36, 1) 0.15s both',
        }}
      >
        <Image
          src="/MOOD/campanha_bike_eletrica.png"
          alt="Bicicleta Elétrica"
          fill
          className="object-contain"
          style={{ objectPosition: 'right bottom' }}
        />
      </div>

      {/* Gradiente de fusão texto/bike */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'linear-gradient(to right, rgba(8,8,8,1) 0%, rgba(8,8,8,0.97) 32%, rgba(8,8,8,0.6) 48%, rgba(8,8,8,0.05) 65%)'
      }} />

      <FsBtn onFullscreen={onFullscreen} isFullscreen={isFullscreen} />

      {/* ─── CONTEÚDO ESQUERDA ─── */}
      <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-center pl-16 pr-6 gap-4" style={{ width: '48%' }}>

        {/* Logo Mood */}
        <div
          className="relative"
          style={{ height: '2.6rem', width: '10rem', animation: 'moodTextUp 0.55s ease-out 0.35s both' }}
        >
          <Image
            src="/MOOD/logo_mood.png"
            alt="Mood"
            fill
            className="object-contain object-left"
            style={{ filter: 'brightness(0) invert(1)' }}
          />
        </div>

        {/* Label campanha */}
        <p
          className="text-sm font-semibold tracking-[0.35em] uppercase"
          style={{ color: GOLD, animation: 'moodTextUp 0.55s ease-out 0.5s both' }}
        >
          Campanha · Setembro 2026
        </p>

        {/* Headline principal */}
        <div style={{ animation: 'moodTextUp 0.65s ease-out 0.6s both', lineHeight: 0.9 }}>
          <p
            className="font-black"
            style={{ color: WARM, fontSize: 'clamp(2.8rem, 5.5vw, 5.5rem)', letterSpacing: '-0.04em', lineHeight: 0.95 }}
          >
            UM MOOD
          </p>
          <p
            className="font-black"
            style={{ color: WARM, fontSize: 'clamp(2.8rem, 5.5vw, 5.5rem)', letterSpacing: '-0.04em', lineHeight: 0.95 }}
          >
            PARA VIVER.
          </p>
          <p
            className="font-black mt-1"
            style={{ color: GOLD, fontSize: 'clamp(2.2rem, 4.2vw, 4rem)', letterSpacing: '-0.03em', lineHeight: 1 }}
          >
            UMA BIKE ELÉTRICA
          </p>
          <p
            className="font-black"
            style={{ color: GOLD, fontSize: 'clamp(2.2rem, 4.2vw, 4rem)', letterSpacing: '-0.03em', lineHeight: 1 }}
          >
            PARA EXPLORAR.
          </p>
        </div>

        {/* Linha gold animada */}
        <div
          style={{
            width: '72px', height: '3px', background: GOLD,
            animation: 'moodLineIn 0.5s ease-out 0.95s both',
          }}
        />

        {/* Descrição */}
        <p
          className="text-base leading-relaxed"
          style={{ color: 'rgba(240,237,232,0.65)', maxWidth: '340px', animation: 'moodTextUp 0.55s ease-out 1s both' }}
        >
          Compre seu studio no Mood Central Parque e ganhe uma bicicleta elétrica. Oferta por tempo limitado — consulte condições.
        </p>

        {/* Badges */}
        <div
          className="flex flex-wrap gap-2 mt-1"
          style={{ animation: 'moodTextUp 0.55s ease-out 1.1s both' }}
        >
          <span className="text-sm px-4 py-2 rounded-full" style={{ background: 'rgba(240,237,232,0.1)', color: WARM, border: '1px solid rgba(240,237,232,0.2)' }}>
            a partir de R$ 299.000
          </span>
        </div>
      </div>
    </div>
  );
}

function SlideMetaIntro1({ onFullscreen, isFullscreen }: FullscreenProps) {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden" style={{ background: BG }}>
      <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 70% 70% at 30% 50%, ${GOLD}18 0%, transparent 65%)` }} />
      <FsBtn onFullscreen={onFullscreen} isFullscreen={isFullscreen} />
      <div className="relative z-10 flex flex-col justify-center px-24 max-w-5xl w-full">
        <p className="text-sm tracking-[0.4em] uppercase mb-10 font-medium" style={{ color: GOLD }}>
          CAMPANHA · SYNTHÈ · META 1
        </p>
        <div className="flex items-baseline gap-5 mb-4">
          <span className="font-black" style={{ color: WARM, fontSize: 'clamp(9rem, 16vw, 15rem)', lineHeight: 0.85, letterSpacing: '-0.04em' }}>10</span>
          <span className="font-light" style={{ color: 'rgba(240,237,232,0.4)', fontSize: 'clamp(2.5rem, 4.5vw, 4rem)' }}>unidades</span>
        </div>
        <div style={{ width: '70px', height: '3px', background: GOLD, marginBottom: '2rem' }} />
        <div className="flex items-center gap-4 self-start px-6 py-3 rounded-full" style={{ border: `1px solid ${GOLD}50`, background: `${GOLD}15` }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: GOLD, flexShrink: 0 }} />
          <p className="text-lg font-medium" style={{ color: 'rgba(240,237,232,0.75)', letterSpacing: '0.08em' }}>
            PRAZO: ATÉ <span style={{ color: WARM, fontWeight: 700 }}>31/10/2026</span>
          </p>
        </div>
      </div>
      <div className="absolute bottom-8 right-10 z-10">
        <div className="relative h-8 w-32">
          <Image src="/SYNTHE/logo.png" alt="Synthè" fill className="object-contain object-right" style={{ filter: 'brightness(0) invert(1)', opacity: 0.35 }} />
        </div>
      </div>
    </div>
  );
}

function SlideMeta1Car({ onFullscreen, isFullscreen }: FullscreenProps) {
  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: BG }}>
      <div className="absolute inset-0">
        <Image src="/SYNTHE/carro-meta1-mg4.webp" alt="MG4 XPOWER" fill
          className="object-cover" style={{ objectPosition: 'center 40%' }} />
      </div>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.15) 100%)' }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)' }} />

      <FsBtn onFullscreen={onFullscreen} isFullscreen={isFullscreen} />

      <div className="absolute left-0 top-0 bottom-0 z-10 flex flex-col justify-center px-20 max-w-2xl">
        <p className="text-sm tracking-[0.35em] uppercase mb-6 font-medium" style={{ color: GOLD }}>
          METAS E PRÊMIOS · META 1
        </p>
        <div className="flex items-baseline gap-4 mb-3">
          <span className="font-black" style={{ color: WARM, fontSize: 'clamp(7rem, 12vw, 11rem)', lineHeight: 0.85, letterSpacing: '-0.03em' }}>10</span>
          <span className="font-light" style={{ color: 'rgba(240,237,232,0.55)', fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}>unidades</span>
        </div>
        <p className="font-light mb-8" style={{ color: 'rgba(240,237,232,0.6)', fontSize: 'clamp(1.2rem, 2vw, 1.7rem)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          até 31/10/2026
        </p>
        <div style={{ width: '56px', height: '3px', background: GOLD, marginBottom: '1.8rem' }} />
        <p className="font-black" style={{ color: WARM, fontSize: 'clamp(2.2rem, 4vw, 4rem)', lineHeight: 1, letterSpacing: '-0.01em', textTransform: 'uppercase' }}>
          MG4 XPOWER
        </p>
        <p className="font-light mt-2" style={{ color: 'rgba(240,237,232,0.45)', fontSize: 'clamp(1rem, 1.5vw, 1.3rem)' }}>
          Veículo elétrico · Prêmio Meta 1
        </p>
        <a href="https://drive.google.com/open?id=1dSK7ztNZ6PpfywJYX-1IL-d7WftLPb6e&usp=drive_fs" target="_blank" rel="noopener noreferrer"
          className="mt-6 self-start flex items-center gap-2 px-5 py-2.5 rounded-full transition-all hover:opacity-80"
          style={{ border: `1px solid ${GOLD}55`, background: `${GOLD}15`, color: 'rgba(240,237,232,0.7)', fontSize: 'clamp(0.85rem, 1.1vw, 1rem)', fontWeight: 500, letterSpacing: '0.1em', textDecoration: 'none', textTransform: 'uppercase' }}>
          📋 Conferir o Regulamento
        </a>
      </div>
    </div>
  );
}

function SlideMetaIntro2({ onFullscreen, isFullscreen }: FullscreenProps) {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden" style={{ background: BG }}>
      <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 70% 70% at 30% 50%, ${GOLD}18 0%, transparent 65%)` }} />
      <FsBtn onFullscreen={onFullscreen} isFullscreen={isFullscreen} />
      <div className="relative z-10 flex flex-col justify-center px-24 max-w-5xl w-full">
        <p className="text-sm tracking-[0.4em] uppercase mb-10 font-medium" style={{ color: GOLD }}>
          CAMPANHA · SYNTHÈ · META 2
        </p>
        <div className="flex items-baseline gap-5 mb-4">
          <span className="font-black" style={{ color: WARM, fontSize: 'clamp(9rem, 16vw, 15rem)', lineHeight: 0.85, letterSpacing: '-0.04em' }}>15</span>
          <span className="font-light" style={{ color: 'rgba(240,237,232,0.4)', fontSize: 'clamp(2.5rem, 4.5vw, 4rem)' }}>unidades</span>
        </div>
        <div style={{ width: '70px', height: '3px', background: GOLD, marginBottom: '2rem' }} />
        <div className="flex items-center gap-4 self-start px-6 py-3 rounded-full" style={{ border: `1px solid ${GOLD}50`, background: `${GOLD}15` }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: GOLD, flexShrink: 0 }} />
          <p className="text-lg font-medium" style={{ color: 'rgba(240,237,232,0.75)', letterSpacing: '0.08em' }}>
            PRAZO: ATÉ <span style={{ color: WARM, fontWeight: 700 }}>31/10/2026</span>
          </p>
        </div>
      </div>
      <div className="absolute bottom-8 right-10 z-10">
        <div className="relative h-8 w-32">
          <Image src="/SYNTHE/logo.png" alt="Synthè" fill className="object-contain object-right" style={{ filter: 'brightness(0) invert(1)', opacity: 0.35 }} />
        </div>
      </div>
    </div>
  );
}

function SlideMeta2Car({ onFullscreen, isFullscreen }: FullscreenProps) {
  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: BG }}>
      <div className="absolute inset-0">
        <Image src="/SYNTHE/carro-meta2-cyberster.webp" alt="MG Cyberster" fill
          className="object-cover" style={{ objectPosition: 'center 50%' }} />
      </div>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, transparent 30%, transparent 55%, rgba(0,0,0,0.85) 100%)' }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.15) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.15) 100%)' }} />

      <FsBtn onFullscreen={onFullscreen} isFullscreen={isFullscreen} />

      <div className="absolute top-0 left-0 right-0 z-10 flex items-center gap-3 px-16 pt-14">
        <div style={{ width: '32px', height: '2px', background: GOLD }} />
        <p className="text-sm tracking-[0.35em] uppercase font-medium" style={{ color: GOLD }}>
          META 2 · O PRÊMIO EVOLUI
        </p>
      </div>
      <div className="absolute bottom-0 left-0 right-0 z-10 px-16 pb-14">
        <p className="font-black" style={{ color: WARM, fontSize: 'clamp(3.5rem, 6vw, 5.5rem)', lineHeight: 1, letterSpacing: '-0.01em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
          MG CYBERSTER
        </p>
        <p className="font-light mb-4" style={{ color: 'rgba(240,237,232,0.55)', fontSize: 'clamp(1rem, 1.5vw, 1.3rem)' }}>
          Esportivo elétrico conversível · Prêmio Meta 2 · 15 unidades até 31/10/2026
        </p>
        <a href="https://drive.google.com/open?id=1dSK7ztNZ6PpfywJYX-1IL-d7WftLPb6e&usp=drive_fs" target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full transition-all hover:opacity-80"
          style={{ border: `1px solid ${GOLD}55`, background: `${GOLD}15`, color: 'rgba(240,237,232,0.7)', fontSize: 'clamp(0.85rem, 1.1vw, 1rem)', fontWeight: 500, letterSpacing: '0.1em', textDecoration: 'none', textTransform: 'uppercase' }}>
          📋 Conferir o Regulamento
        </a>
      </div>
    </div>
  );
}

function SlideContracapa({ onFullscreen, isFullscreen }: FullscreenProps) {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden" style={{ background: BG }}>
      <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }} />
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(ellipse 70% 50% at 50% 50%, #1a1a1a 0%, #080808 100%)' }} />
      <FsBtn onFullscreen={onFullscreen} isFullscreen={isFullscreen} />
      <div className="relative z-10 flex flex-col items-center gap-6">
        <div className="relative" style={{ width: 'clamp(300px, 32vw, 420px)', height: 'clamp(80px, 8.5vw, 110px)' }}>
          <Image src="/INSTITUCIONAL/logo_plaenge_vanguard_claro.webp" alt="Plaenge Vanguard" fill className="object-contain" />
        </div>
        <div className="h-[1px] w-16" style={{ background: `${GOLD}55` }} />
        <p className="text-sm tracking-[0.5em] uppercase" style={{ color: `${GOLD}66` }}>Porto Alegre</p>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-[1px]" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}44, transparent)` }} />
    </div>
  );
}

// ── RENDER SLIDE ──────────────────────────────────────────────────────────────
function RenderSlide({ slide, onFullscreen, isFullscreen }: { slide: Slide } & FullscreenProps) {
  const props = { onFullscreen, isFullscreen };
  switch (slide.k) {
    case 'cover':       return <SlideCover        {...props} />;
    case 'numbers':     return <SlideNumbers       {...props} />;
    case 'poa':         return <SlidePoa           {...props} />;
    case 'mosaic':      return <SlideMosaic        {...props} />;
    case 'orbitale100':   return <SlideOrbitale100   {...props} />;
    case 'product':       return <SlideProduct       p={slide.p} {...props} />;
    case 'mapa':          return <SlideMapa          p={slide.p} {...props} />;
    case 'planta':        return <SlidePlanta        p={slide.p} {...props} />;
    case 'moodcampanha':  return <SlideMoodCampanha  {...props} />;
    case 'meta1intro':    return <SlideMetaIntro1    {...props} />;
    case 'meta1car':    return <SlideMeta1Car      {...props} />;
    case 'meta2intro':  return <SlideMetaIntro2    {...props} />;
    case 'meta2car':    return <SlideMeta2Car      {...props} />;
    case 'contracapa':  return <SlideContracapa    {...props} />;
  }
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function PptPortifolio() {
  const [current, setCurrent] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const total = SLIDES.length;

  const prev = useCallback(() => setCurrent(c => Math.max(0, c - 1)), []);
  const next = useCallback(() => setCurrent(c => Math.min(total - 1, c + 1)), [total]);

  const toggleFullscreen = useCallback(async () => {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  }, []);

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next();
      if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   prev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [next, prev]);

  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden" style={{ background: BG }}>
      {/* Pré-carregamento dos mapas — fora da tela mas com dimensões reais para o browser carregar */}
      <div aria-hidden style={{ position: 'fixed', left: '-9999px', top: 0, pointerEvents: 'none' }}>
        {SLIDES.filter(s => s.k === 'mapa').map((s, i) => (
          s.k === 'mapa' && s.p.mapUrl ? (
            <iframe key={i} src={s.p.mapUrl} title={`preload-map-${i}`} loading="eager" referrerPolicy="no-referrer-when-downgrade" style={{ width: 400, height: 300, border: 0 }} />
          ) : null
        ))}
      </div>
      <div className="flex-1 relative overflow-hidden">
        <RenderSlide
          slide={SLIDES[current]}
          onFullscreen={toggleFullscreen}
          isFullscreen={isFullscreen}
        />
      </div>

      <div
        className="shrink-0 flex items-center justify-between px-8 py-3"
        style={{ background: BG, borderTop: `1px solid ${GOLD}22` }}
      >
        <div className="relative h-6 w-32">
          <Image src="/INSTITUCIONAL/logo_plaenge_vanguard_claro.webp" alt="logo" fill className="object-contain object-left" style={{ filter: 'brightness(0.7)' }} />
        </div>

        <div className="flex items-center gap-1.5">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === current ? '20px' : '6px',
                height: '6px',
                background: i === current ? GOLD : 'rgba(196,148,58,0.3)',
              }}
            />
          ))}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm tabular-nums" style={{ color: 'rgba(240,237,232,0.35)' }}>
            {current + 1} / {total}
          </span>
          <button
            onClick={prev}
            disabled={current === 0}
            className="w-9 h-9 flex items-center justify-center rounded-full transition-colors"
            style={{ background: 'rgba(255,255,255,0.06)', color: current === 0 ? 'rgba(240,237,232,0.2)' : WARM }}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            disabled={current === total - 1}
            className="w-9 h-9 flex items-center justify-center rounded-full transition-colors"
            style={{ background: current === total - 1 ? 'rgba(255,255,255,0.06)' : GOLD, color: current === total - 1 ? 'rgba(240,237,232,0.2)' : BG }}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
