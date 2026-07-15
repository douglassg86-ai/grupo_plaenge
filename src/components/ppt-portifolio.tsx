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
  addr: string;
  bairro: string;
  price?: string;
  badges: string[];
  delivery: string;
  sold?: string;
}

// ── PRODUCTS ──────────────────────────────────────────────────────────────────
const PRODUCTS: ProductData[] = [
  {
    name: 'Orbitale',
    logo: '/ORBITALE/logo_orbitale.png',
    img: '/ORBITALE/01_FACHADA-02.webp',
    plantaImg: '/ORBITALE/plantas/PLARE_29_Garden_2_P4_HIGH.webp',
    plantaLabel: 'Apartamento Garden — Final 2',
    addr: 'Rua Regente, 152',
    bairro: 'Petrópolis · Porto Alegre',
    price: 'R$ 4.900.000',
    badges: ['Última unidade disponível', 'Pronto para morar'],
    delivery: 'Pronto para morar',
  },
  {
    name: 'Verdant',
    logo: '/VERDANT/logo_verdant.png',
    img: '/VERDANT/©VISTA_01_EXT_FACHADA_DIURNA_FINAL.webp',
    plantaImg: '/VERDANT/plantas/©VISTA_05_PLB_UNIDADE_APTO_TIPO_01_FINAL.webp',
    plantaLabel: 'Planta Tipo — 145 m²',
    addr: 'Rua Eça de Queiroz, 215',
    bairro: 'Porto Alegre',
    price: 'R$ 1.990.000',
    badges: ['Parcelas fixas', '53% vendido'],
    delivery: 'Entrega Abril 2027',
    sold: '53',
  },
  {
    name: 'Mood',
    logo: '/MOOD/logo_mood.png',
    img: '/MOOD/01_fachada-02.webp',
    plantaImg: '/MOOD/plantas/IMG_9736.webp',
    plantaLabel: 'Studio — 29 m²',
    addr: 'Rua São Josemaría Escrivá, 585',
    bairro: 'Porto Alegre',
    price: 'R$ 329.999',
    badges: ['Fluxo 10/90', 'Últimas 15 unidades'],
    delivery: 'Pronto para morar ou investir',
  },
  {
    name: 'Trend Nano',
    logo: '/TREND/logo_nano.png',
    img: '/TREND/PNB_06_Fachada_Nano_EF.webp',
    plantaImg: '/TREND/plantas/PNB_PB_08_Planta_Nano_Apto_02B_EF.webp',
    plantaLabel: 'Studio 02B — 32,06 m²',
    plantaHorizontal: true,
    addr: 'Rua General Lima e Silva, 1462',
    bairro: 'Centro Histórico · Porto Alegre',
    badges: ['Fluxo 20/80', 'Parcelas fixas'],
    delivery: 'Entrega Novembro 2026',
  },
  {
    name: 'Trend Home',
    logo: '/TREND/logo_home.png',
    img: '/TREND/PNB_04_Fachada_Residencial_A_EF.webp',
    plantaImg: '/TREND/plantas/PNB_PB_18_Planta_Residencial_T1A_Apto_04_EF_2.webp',
    plantaLabel: '2 Suítes — 77 m²',
    addr: 'Rua General Lima e Silva, 1462',
    bairro: 'Centro Histórico · Porto Alegre',
    badges: ['Grande oportunidade — consulte condições'],
    delivery: 'Entrega Setembro 2028',
  },
  {
    name: 'Yuna',
    logo: '/YUNA/logo.png',
    img: '/YUNA/IMG-20240704-WA0032.webp',
    bgPos: '45% center',
    plantaImg: '/YUNA/plantas/03_VAN_PARECI_APTO_2_DORM_Ef.webp',
    plantaLabel: 'Apartamento 2 Dorms. c/Suíte — 72 m²',
    addr: 'Rua Felizardo Furtado, 348',
    bairro: 'Jardim Botânico · Porto Alegre',
    price: 'a partir de R$ 779.000',
    badges: ['Fluxo 20/80'],
    delivery: 'Entrega Novembro 2027',
  },
  {
    name: 'SHIFT',
    logo: '/SHIFT/logo_shift.png',
    img: '/SHIFT/kota_tgd_sil_fachada_4k.webp',
    plantaImg: '/SHIFT/plantas_shift3.png',
    plantaLabel: 'Studio — 25 m²',
    addr: 'Silva Jardim c/ Rua 24 de Outubro',
    bairro: 'Moinhos de Vento · Porto Alegre',
    badges: ['78% vendido'],
    delivery: 'Entrega Abril 2029',
    sold: '78',
  },
  {
    name: 'Edition',
    logo: '/EDITION/logo_edition.png',
    img: '/EDITION/JAC_01_Fachada_A_EF2.webp',
    plantaImg: '/EDITION/plantas/3 suítes_146m2_ Torre Jardim Cristófel.webp',
    plantaLabel: '3 Suítes — 146 m²',
    addr: 'Rua Jardim Cristófel',
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
    badges: ['Últimas unidades com preço de pré-lançamento'],
    delivery: 'Pré-lançamento',
  },
];

// ── MOSAIC DATA ───────────────────────────────────────────────────────────────
const MOSAIC = [
  { name: 'YVY',        logo: '/YVY/logo_yvy.png',          img: '/YVY/IMG_9127.webp',                          tag: 'ENTREGUE',       date: 'Mar/2024' },
  { name: 'Orbitale',   logo: '/ORBITALE/logo_orbitale.png', img: '/ORBITALE/01_FACHADA-02.webp',                tag: 'PRONTO',         date: '' },
  { name: 'Verdant',    logo: '/VERDANT/logo_verdant.png',   img: '/VERDANT/©VISTA_01_EXT_FACHADA_DIURNA_FINAL.webp', tag: 'ENTREGA', date: 'Abr/2027' },
  { name: 'Mood',       logo: '/MOOD/logo_mood.png',         img: '/MOOD/01_fachada-02.webp',                    tag: 'PRONTO',         date: '' },
  { name: 'Trend Nano', logo: '/TREND/logo_nano.png',        img: '/TREND/PNB_01_Fotomontagem_EF.webp',          tag: 'ENTREGA',        date: 'Nov/2026' },
  { name: 'Trend Home', logo: '/TREND/logo_home.png',        img: '/TREND/PNB_01_Fotomontagem_EF.webp',          tag: 'ENTREGA',        date: 'Set/2028' },
  { name: 'Yuna',       logo: '/YUNA/logo.png',              img: '/YUNA/IMG-20240704-WA0032.webp',              tag: 'ENTREGA',        date: 'Nov/2027' },
  { name: 'SHIFT',      logo: '/SHIFT/logo_shift.png',       img: '/SHIFT/kota_tgd_sil_fachada_4k.webp',         tag: 'ENTREGA',        date: 'Abr/2029' },
  { name: 'Edition',    logo: '/EDITION/logo_edition.png',   img: '/EDITION/JAC_31_Voo_Passaro_EF_v2.webp',      tag: 'ENTREGA',        date: 'Jul/2028' },
  { name: 'Synthè',     logo: '/SYNTHE/logo.png',            img: '/SYNTHE/©VISTA_02_EXT_FACHADA_DIURNA_FINAL.webp', tag: 'PRÉ-LANÇAMENTO', date: '' },
];

const POA_TIMELINE = [
  { name: 'YVY',                   addr: 'Lindoia',                              tag: 'Entregue Mar/2024 · 100% vendido' },
  { name: 'Orbitale',              addr: 'R. Regente, 152 · Petrópolis',         tag: 'Pronto para morar' },
  { name: 'Mood Central Parque',   addr: 'R. São Josemaría Escrivá, 585',        tag: 'Pronto para morar' },
  { name: 'Trend Downtown Nano',   addr: 'R. General Lima e Silva, 1462',        tag: 'Entrega Nov/2026' },
  { name: 'Verdant',               addr: 'R. Eça de Queiroz, 215',              tag: 'Entrega Abr/2027' },
  { name: 'Yuna Jardim Botânico',  addr: 'R. Felizardo Furtado, 348',           tag: 'Entrega Nov/2027' },
  { name: 'Edition Moinhos',       addr: 'R. Jardim Cristófel · Moinhos',       tag: 'Entrega Jul/2028' },
  { name: 'Trend Downtown Home',   addr: 'R. General Lima e Silva, 1462',       tag: 'Entrega Set/2028' },
  { name: 'SHIFT',                 addr: 'Silva Jardim c/ R. 24 de Outubro',    tag: 'Entrega Abr/2029' },
  { name: 'Synthè',                addr: "R. Pedro Ivo, 550 · Mont'Serrat",     tag: 'Pré-lançamento' },
];

// ── SLIDE LIST ────────────────────────────────────────────────────────────────
type Slide =
  | { k: 'numbers' }
  | { k: 'cover' }
  | { k: 'poa' }
  | { k: 'mosaic' }
  | { k: 'product'; p: ProductData }
  | { k: 'planta';  p: ProductData }
  | { k: 'meta1intro' }
  | { k: 'meta1car' }
  | { k: 'meta2intro' }
  | { k: 'meta2car' }
  | { k: 'contracapa' };

const SLIDES: Slide[] = [
  { k: 'numbers' },
  { k: 'cover' },
  { k: 'poa' },
  { k: 'mosaic' },
  ...PRODUCTS.flatMap(p => [
    { k: 'product' as const, p },
    { k: 'planta'  as const, p },
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
      className="absolute top-5 right-5 z-50 flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium tracking-widest"
      style={{ background: 'rgba(0,0,0,0.45)', border: '1px solid rgba(255,255,255,0.22)', color: WARM, backdropFilter: 'blur(10px)' }}
    >
      {isFullscreen ? <Minimize size={14} /> : <Maximize size={14} />}
      {isFullscreen ? 'SAIR' : 'TELA CHEIA'}
    </button>
  );
}

// ── SLIDES ────────────────────────────────────────────────────────────────────

function SlideCover({ onFullscreen, isFullscreen }: FullscreenProps) {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden" style={{ background: BG }}>
      {/* subtle texture */}
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, #1a1a1a 0%, #080808 100%)' }} />
      {/* gold line */}
      <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }} />

      <FsBtn onFullscreen={onFullscreen} isFullscreen={isFullscreen} />

      <div className="relative z-10 flex flex-col items-center gap-8 text-center px-12">
        {/* logos */}
        <div className="flex items-center gap-10 mb-4">
          <Image src="/INSTITUCIONAL/logo_plaenge_vanguard_claro.webp" alt="Plaenge Vanguard" width={220} height={60} className="object-contain" style={{ filter: 'brightness(1.1)' }} />
        </div>

        <div className="space-y-3">
          <p className="text-xs tracking-[0.4em] uppercase" style={{ color: GOLD }}>Portfólio Regional</p>
          <h1 className="font-bold tracking-tight" style={{ fontSize: 'clamp(2.8rem, 5vw, 5rem)', color: WARM, lineHeight: 1.05 }}>
            Porto Alegre
          </h1>
          <p className="text-lg" style={{ color: 'rgba(240,237,232,0.55)', letterSpacing: '0.06em' }}>
            5 anos · 10 empreendimentos
          </p>
        </div>

        <div className="flex gap-12 mt-6">
          {[['10', 'Empreendimentos'], ['5', 'Anos de atuação']].map(([n, l]) => (
            <div key={l} className="text-center">
              <p className="text-4xl font-bold" style={{ color: GOLD }}>{n}</p>
              <p className="text-xs mt-1 tracking-widest uppercase" style={{ color: 'rgba(240,237,232,0.45)' }}>{l}</p>
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
      {/* left panel */}
      <div className="relative w-1/2 h-full overflow-hidden">
        <Image src="/INSTITUCIONAL/grafismo.webp" alt="Grupo Plaenge" fill className="object-cover opacity-40" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(8,8,8,0) 60%, rgba(8,8,8,1) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(8,8,8,0.7) 0%, transparent 50%)' }} />
      </div>

      {/* right panel */}
      <div className="w-1/2 h-full flex flex-col justify-center px-12 gap-5">
        <FsBtn onFullscreen={onFullscreen} isFullscreen={isFullscreen} />
        <div>
          <p className="text-xs tracking-[0.4em] uppercase mb-2" style={{ color: GOLD }}>Grupo Plaenge</p>
          <h2 className="font-bold leading-tight" style={{ fontSize: 'clamp(1.5rem, 2.4vw, 2.6rem)', color: WARM }}>
            Mais de meio século<br />construindo qualidade<br />de vida.
          </h2>
        </div>
        <p className="text-sm leading-relaxed" style={{ color: 'rgba(240,237,232,0.55)', maxWidth: '380px' }}>
          Fundado em 1970 em Londrina, Paraná, o Grupo Plaenge atua em incorporação residencial, construção civil e projetos industriais — presente em 9 cidades do Brasil e também no Chile.
        </p>
        <div className="grid grid-cols-2 gap-4">
          {stats.map(({ n, unit, label }) => (
            <div key={n} className="border-l-2 pl-4" style={{ borderColor: GOLD + '66' }}>
              <span className="font-bold" style={{ fontSize: 'clamp(1.4rem, 2.2vw, 2.2rem)', color: GOLD }}>{n}</span>
              <p className="text-xs font-medium mt-0.5" style={{ color: WARM }}>{unit}</p>
              <p className="text-xs" style={{ color: 'rgba(240,237,232,0.4)' }}>{label}</p>
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

      {/* left */}
      <div className="w-[38%] h-full flex flex-col justify-center pl-16 pr-8 gap-6">
        <div>
          <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: GOLD }}>Regional Sul</p>
          <h2 className="font-bold leading-none" style={{ fontSize: 'clamp(2rem, 3vw, 3rem)', color: WARM }}>
            5 anos em<br />Porto Alegre.
          </h2>
        </div>
        <div className="flex gap-8">
          <div>
            <p className="text-4xl font-bold" style={{ color: GOLD }}>10</p>
            <p className="text-xs tracking-widest uppercase mt-1" style={{ color: 'rgba(240,237,232,0.45)' }}>Lançamentos</p>
          </div>
          <div>
            <p className="text-4xl font-bold" style={{ color: GOLD }}>2+</p>
            <p className="text-xs tracking-widest uppercase mt-1" style={{ color: 'rgba(240,237,232,0.45)' }}>Prontos</p>
          </div>
        </div>
        <p className="text-xs leading-relaxed" style={{ color: 'rgba(240,237,232,0.45)' }}>
          Desde 2020, a Plaenge e a Vanguard constroem presença na capital gaúcha com empreendimentos de alto padrão, consolidando posição em bairros nobres de Porto Alegre.
        </p>
      </div>

      {/* right: timeline list */}
      <div className="flex-1 h-full flex flex-col justify-center pr-12 pl-4 gap-1">
        {POA_TIMELINE.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-4 py-2 px-4 rounded-lg"
            style={{ background: 'rgba(255,255,255,0.03)', borderLeft: `2px solid ${GOLD}33` }}
          >
            <span className="text-xs font-bold w-5 text-right tabular-nums" style={{ color: GOLD + '88' }}>{String(i + 1).padStart(2, '0')}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold leading-tight truncate" style={{ color: WARM }}>{item.name}</p>
              <p className="text-xs leading-tight truncate" style={{ color: 'rgba(240,237,232,0.4)' }}>{item.addr}</p>
            </div>
            <span className="text-xs px-2 py-0.5 rounded whitespace-nowrap" style={{ background: 'rgba(196,148,58,0.15)', color: GOLD, border: `1px solid ${GOLD}33` }}>
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

      {/* header */}
      <div className="flex items-center justify-between px-10 py-4 shrink-0" style={{ borderBottom: `1px solid ${GOLD}22` }}>
        <div>
          <p className="text-xs tracking-[0.4em] uppercase" style={{ color: GOLD }}>Porto Alegre</p>
          <h2 className="text-xl font-bold" style={{ color: WARM }}>Nosso Portfólio</h2>
        </div>
        <Image src="/INSTITUCIONAL/logo_plaenge_vanguard_claro.webp" alt="logo" width={140} height={36} className="object-contain opacity-70" />
      </div>

      {/* mosaic grid */}
      <div className="flex-1 grid grid-cols-5 grid-rows-2">
        {MOSAIC.map((item) => (
          <div key={item.name} className="relative overflow-hidden group">
            <Image src={item.img} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.1) 100%)' }} />
            <div className="absolute inset-x-0 bottom-0 p-3 flex flex-col gap-1">
              <div className="relative h-6">
                <Image src={item.logo} alt={item.name} fill className="object-contain object-left" style={{ filter: 'brightness(0) invert(1)' }} />
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] px-1.5 py-0.5 rounded font-medium" style={{
                  background: item.tag === 'PRONTO' || item.tag === 'ENTREGUE' ? 'rgba(34,197,94,0.25)' : item.tag === 'PRÉ-LANÇAMENTO' ? 'rgba(196,148,58,0.25)' : 'rgba(59,130,246,0.25)',
                  color: item.tag === 'PRONTO' || item.tag === 'ENTREGUE' ? '#4ade80' : item.tag === 'PRÉ-LANÇAMENTO' ? GOLD : '#93c5fd',
                  border: `1px solid ${item.tag === 'PRONTO' || item.tag === 'ENTREGUE' ? '#4ade8044' : item.tag === 'PRÉ-LANÇAMENTO' ? GOLD + '44' : '#93c5fd44'}`
                }}>
                  {item.tag}
                </span>
                {item.date && (
                  <span className="text-[11px] font-bold px-1.5 py-0.5 rounded" style={{
                    background: 'rgba(196,148,58,0.2)',
                    color: GOLD,
                    border: `1px solid ${GOLD}44`,
                  }}>{item.date}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SlideProduct({ p, onFullscreen, isFullscreen }: { p: ProductData } & FullscreenProps) {
  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: BG }}>
      <Image
        src={p.img} alt={p.name} fill className="object-cover"
        style={{ objectPosition: p.bgPos ?? 'center' }}
      />
      {/* gradient overlays */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.3) 55%, rgba(0,0,0,0.1) 100%)' }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.5) 0%, transparent 60%)' }} />

      <FsBtn onFullscreen={onFullscreen} isFullscreen={isFullscreen} />

      {/* content */}
      <div className="absolute inset-x-0 bottom-0 px-14 pb-12 flex flex-col gap-4">
        {/* logo */}
        <div className="relative h-10 w-52">
          <Image src={p.logo} alt={p.name} fill className="object-contain object-left" style={{ filter: 'brightness(0) invert(1)' }} />
        </div>

        {/* address */}
        <p className="text-sm" style={{ color: 'rgba(240,237,232,0.55)', letterSpacing: '0.03em' }}>
          {p.addr} &nbsp;·&nbsp; {p.bairro}
        </p>

        {/* price */}
        {p.price && (
          <p className="font-bold" style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.6rem)', color: WARM, lineHeight: 1.1 }}>
            {p.price}
          </p>
        )}

        {/* delivery badge + badges */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-semibold px-4 py-1.5 rounded-full" style={{ background: GOLD, color: '#080808' }}>
            {p.delivery}
          </span>
          {p.badges.map(b => (
            <span key={b} className="text-xs px-3 py-1 rounded-full" style={{ background: 'rgba(240,237,232,0.12)', color: WARM, border: '1px solid rgba(240,237,232,0.2)', backdropFilter: 'blur(8px)' }}>
              {b}
            </span>
          ))}
        </div>

        {/* sold progress bar */}
        {p.sold && (
          <div className="flex items-center gap-3 mt-1">
            <span className="text-xs" style={{ color: 'rgba(240,237,232,0.5)' }}>Vendido</span>
            <div className="flex-1 max-w-48 h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.15)' }}>
              <div className="h-full rounded-full" style={{ width: `${p.sold}%`, background: GOLD }} />
            </div>
            <span className="text-sm font-bold" style={{ color: GOLD }}>{p.sold}%</span>
          </div>
        )}
      </div>
    </div>
  );
}

function SlidePlanta({ p, onFullscreen, isFullscreen }: { p: ProductData } & FullscreenProps) {
  if (p.plantaHorizontal) {
    return (
      <div className="relative w-full h-full flex flex-col overflow-hidden" style={{ background: '#F8F6F2' }}>
        <FsBtn onFullscreen={onFullscreen} isFullscreen={isFullscreen} />
        {/* top: planta image */}
        <div className="flex-1 relative px-8 pt-8 pb-2">
          <Image src={p.plantaImg} alt={`Planta ${p.name}`} fill className="object-contain p-8" />
        </div>
        {/* bottom strip */}
        <div className="shrink-0 flex items-center justify-between px-10 py-5" style={{ background: BG }}>
          <div className="relative h-7 w-32">
            <Image src={p.logo} alt={p.name} fill className="object-contain object-left" style={{ filter: 'brightness(0) invert(1)' }} />
          </div>
          <div className="flex items-center gap-4">
            <div className="w-5 h-0.5" style={{ background: GOLD }} />
            <p className="text-sm font-semibold" style={{ color: WARM }}>{p.plantaLabel}</p>
          </div>
          <p className="text-xs" style={{ color: 'rgba(240,237,232,0.4)' }}>{p.bairro}</p>
          <p className="text-xs tracking-widest uppercase" style={{ color: GOLD + '66' }}>Planta</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full flex overflow-hidden" style={{ background: '#F8F6F2' }}>
      <FsBtn onFullscreen={onFullscreen} isFullscreen={isFullscreen} />

      {/* left strip */}
      <div className="w-[22%] h-full flex flex-col justify-between py-10 px-8" style={{ background: BG }}>
        <div className="relative h-8 w-36">
          <Image src={p.logo} alt={p.name} fill className="object-contain object-left" style={{ filter: 'brightness(0) invert(1)' }} />
        </div>
        <div className="space-y-3">
          <div className="w-8 h-0.5" style={{ background: GOLD }} />
          <p className="text-sm font-semibold leading-tight" style={{ color: WARM }}>{p.plantaLabel}</p>
          <p className="text-xs leading-relaxed" style={{ color: 'rgba(240,237,232,0.45)' }}>{p.addr}<br />{p.bairro}</p>
        </div>
        <p className="text-xs tracking-widest uppercase" style={{ color: GOLD + '66' }}>Planta</p>
      </div>

      {/* right: planta image */}
      <div className="flex-1 h-full relative p-6">
        <Image src={p.plantaImg} alt={`Planta ${p.name}`} fill className="object-contain p-6" />
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
        <p className="text-xs tracking-[0.4em] uppercase mb-10 font-medium" style={{ color: GOLD }}>
          CAMPANHA · SYNTHÈ · META 1
        </p>
        <div className="flex items-baseline gap-5 mb-4">
          <span className="font-black" style={{ color: WARM, fontSize: 'clamp(8rem, 15vw, 14rem)', lineHeight: 0.85, letterSpacing: '-0.04em' }}>10</span>
          <span className="font-light" style={{ color: 'rgba(240,237,232,0.4)', fontSize: 'clamp(2.2rem, 4vw, 3.5rem)' }}>unidades</span>
        </div>
        <div style={{ width: '70px', height: '3px', background: GOLD, marginBottom: '2rem' }} />
        <div className="flex items-center gap-4 self-start px-6 py-3 rounded-full" style={{ border: `1px solid ${GOLD}50`, background: `${GOLD}15` }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: GOLD, flexShrink: 0 }} />
          <p className="text-base font-medium" style={{ color: 'rgba(240,237,232,0.75)', letterSpacing: '0.08em' }}>
            PRAZO: ATÉ <span style={{ color: WARM, fontWeight: 700 }}>31/10/2026</span>
          </p>
        </div>
      </div>
      <div className="absolute bottom-8 right-10 z-10">
        <div className="relative h-7 w-28">
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
        <p className="text-xs tracking-[0.35em] uppercase mb-6 font-medium" style={{ color: GOLD }}>
          METAS E PRÊMIOS · META 1
        </p>
        <div className="flex items-baseline gap-4 mb-3">
          <span className="font-black" style={{ color: WARM, fontSize: 'clamp(6rem, 11vw, 10rem)', lineHeight: 0.85, letterSpacing: '-0.03em' }}>10</span>
          <span className="font-light" style={{ color: 'rgba(240,237,232,0.55)', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}>unidades</span>
        </div>
        <p className="font-light mb-8" style={{ color: 'rgba(240,237,232,0.6)', fontSize: 'clamp(1.1rem, 1.8vw, 1.5rem)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          até 31/10/2026
        </p>
        <div style={{ width: '56px', height: '3px', background: GOLD, marginBottom: '1.8rem' }} />
        <p className="font-black" style={{ color: WARM, fontSize: 'clamp(2rem, 3.8vw, 3.5rem)', lineHeight: 1, letterSpacing: '-0.01em', textTransform: 'uppercase' }}>
          MG4 XPOWER
        </p>
        <p className="font-light mt-2" style={{ color: 'rgba(240,237,232,0.45)', fontSize: 'clamp(0.9rem, 1.4vw, 1.15rem)' }}>
          Veículo elétrico · Prêmio Meta 1
        </p>
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
        <p className="text-xs tracking-[0.4em] uppercase mb-10 font-medium" style={{ color: GOLD }}>
          CAMPANHA · SYNTHÈ · META 2
        </p>
        <div className="flex items-baseline gap-5 mb-4">
          <span className="font-black" style={{ color: WARM, fontSize: 'clamp(8rem, 15vw, 14rem)', lineHeight: 0.85, letterSpacing: '-0.04em' }}>15</span>
          <span className="font-light" style={{ color: 'rgba(240,237,232,0.4)', fontSize: 'clamp(2.2rem, 4vw, 3.5rem)' }}>unidades</span>
        </div>
        <div style={{ width: '70px', height: '3px', background: GOLD, marginBottom: '2rem' }} />
        <div className="flex items-center gap-4 self-start px-6 py-3 rounded-full" style={{ border: `1px solid ${GOLD}50`, background: `${GOLD}15` }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: GOLD, flexShrink: 0 }} />
          <p className="text-base font-medium" style={{ color: 'rgba(240,237,232,0.75)', letterSpacing: '0.08em' }}>
            PRAZO: ATÉ <span style={{ color: WARM, fontWeight: 700 }}>31/10/2026</span>
          </p>
        </div>
      </div>
      <div className="absolute bottom-8 right-10 z-10">
        <div className="relative h-7 w-28">
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
        <p className="text-xs tracking-[0.35em] uppercase font-medium" style={{ color: GOLD }}>
          META 2 · O PRÊMIO EVOLUI
        </p>
      </div>
      <div className="absolute bottom-0 left-0 right-0 z-10 px-16 pb-14">
        <p className="font-black" style={{ color: WARM, fontSize: 'clamp(3rem, 5.5vw, 5rem)', lineHeight: 1, letterSpacing: '-0.01em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
          MG CYBERSTER
        </p>
        <p className="font-light" style={{ color: 'rgba(240,237,232,0.55)', fontSize: 'clamp(0.9rem, 1.4vw, 1.15rem)' }}>
          Esportivo elétrico conversível · Prêmio Meta 2 · 15 unidades até 31/10/2026
        </p>
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
        <div className="relative" style={{ width: 'clamp(260px, 28vw, 380px)', height: 'clamp(70px, 7.5vw, 100px)' }}>
          <Image src="/INSTITUCIONAL/logo_plaenge_vanguard_claro.webp" alt="Plaenge Vanguard" fill className="object-contain" />
        </div>
        <div className="h-[1px] w-16" style={{ background: `${GOLD}55` }} />
        <p className="text-xs tracking-[0.5em] uppercase" style={{ color: `${GOLD}66` }}>Porto Alegre</p>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-[1px]" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}44, transparent)` }} />
    </div>
  );
}

// ── RENDER SLIDE ──────────────────────────────────────────────────────────────
function RenderSlide({ slide, onFullscreen, isFullscreen }: { slide: Slide } & FullscreenProps) {
  const props = { onFullscreen, isFullscreen };
  switch (slide.k) {
    case 'cover':   return <SlideCover   {...props} />;
    case 'numbers': return <SlideNumbers {...props} />;
    case 'poa':     return <SlidePoa     {...props} />;
    case 'mosaic':  return <SlideMosaic  {...props} />;
    case 'product':    return <SlideProduct    p={slide.p} {...props} />;
    case 'planta':     return <SlidePlanta     p={slide.p} {...props} />;
    case 'meta1intro': return <SlideMetaIntro1 {...props} />;
    case 'meta1car':   return <SlideMeta1Car   {...props} />;
    case 'meta2intro': return <SlideMetaIntro2 {...props} />;
    case 'meta2car':   return <SlideMeta2Car   {...props} />;
    case 'contracapa': return <SlideContracapa {...props} />;
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
      {/* slide area */}
      <div className="flex-1 relative overflow-hidden">
        <RenderSlide
          slide={SLIDES[current]}
          onFullscreen={toggleFullscreen}
          isFullscreen={isFullscreen}
        />
      </div>

      {/* nav bar */}
      <div
        className="shrink-0 flex items-center justify-between px-8 py-3"
        style={{ background: BG, borderTop: `1px solid ${GOLD}22` }}
      >
        {/* left: logo */}
        <div className="relative h-6 w-32">
          <Image src="/INSTITUCIONAL/logo_plaenge_vanguard_claro.webp" alt="logo" fill className="object-contain object-left" style={{ filter: 'brightness(0.7)' }} />
        </div>

        {/* center: dots */}
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

        {/* right: arrows + counter */}
        <div className="flex items-center gap-3">
          <span className="text-xs tabular-nums" style={{ color: 'rgba(240,237,232,0.35)' }}>
            {current + 1} / {total}
          </span>
          <button
            onClick={prev}
            disabled={current === 0}
            className="w-8 h-8 flex items-center justify-center rounded-full transition-colors"
            style={{ background: 'rgba(255,255,255,0.06)', color: current === 0 ? 'rgba(240,237,232,0.2)' : WARM }}
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={next}
            disabled={current === total - 1}
            className="w-8 h-8 flex items-center justify-center rounded-full transition-colors"
            style={{ background: current === total - 1 ? 'rgba(255,255,255,0.06)' : GOLD, color: current === total - 1 ? 'rgba(240,237,232,0.2)' : BG }}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
