'use client';

import Image from 'next/image';
import { useState } from 'react';
import UnitGrid from '@/components/verdant/unit-grid';
import CommunityPopup from '@/components/wave/community-popup';
import { GalleryViewer } from '@/components/shared/gallery-viewer';
import { PlantsViewer } from '@/components/shared/plants-viewer';
import { ProductHeader } from '@/components/shared/product-header';

const P = '/VERDANT'; // base path

// ─── GALLERY ─────────────────────────────────────────────────────────────────
const galleryCategories = [
  {
    label: 'Fachada & Externo',
    images: [
      { src: `${P}/©VISTA_01_EXT_FACHADA_DIURNA_FINAL.webp`, alt: 'Fachada Diurna' },
      { src: `${P}/©VISTA_02_EXT_FACHADA_NOTURNA_FINAL.webp`, alt: 'Fachada Noturna' },
      { src: `${P}/©VISTA_03_EXT_ACESSO_FINAL_AJUSTADA_SEM_PLACA.webp`, alt: 'Acesso' },
      { src: `${P}/©VISTA_04_EXT_FACHADA_DETALHE_FINAL.webp`, alt: 'Detalhe Fachada' },
      { src: `${P}/©VISTA_05_EXT_FACHADA_ACESSO_CASAS_FINAL.webp`, alt: 'Acesso Casas' },
      { src: `${P}/©VISTA_37_EXT_FACHADA_DETALHE_FINAL.webp`, alt: 'Detalhe Fachada 2' },
      { src: `${P}/©VISTA_13_EXT_INSERCAO_FINAL.webp`, alt: 'Inserção Urbana' },
      { src: `${P}/©VISTA_11_EXT_AÉREA_ÁREA_CONDOMINIAL_FINAL.webp`, alt: 'Vista Aérea' },
      { src: `${P}/©VISTA_34_EXT_AÉREA_ÁREA_CONDOMINIAL_02_(EXTRA)_FINAL.webp`, alt: 'Vista Aérea 2' },
    ],
  },
  {
    label: 'Lazer',
    images: [
      { src: `${P}/©VISTA_08_EXT_PISCINA_ABERTA_FINAL_.webp`, alt: 'Piscina Aberta' },
      { src: `${P}/©VISTA_09_EXT_DECK_MOLHADO_FINAL.webp`, alt: 'Deck Molhado' },
      { src: `${P}/©VISTA_06_EXT_PET_PLACE_FINAL.webp`, alt: 'Pet Place' },
      { src: `${P}/©VISTA_07_EXT_PLAYGROUND_FINAL.webp`, alt: 'Playground' },
      { src: `${P}/©VISTA_33_INT_SAUNA_FINAL.webp`, alt: 'Sauna' },
      { src: `${P}/©VISTA_35_INT_ESPAÇO_KIDS_02_FINAL.webp`, alt: 'Espaço Kids' },
      { src: `${P}/©VISTA_25_EXT_SACADA_APTO_DUPLEX_FINAL.webp`, alt: 'Sacada Duplex' },
      { src: `${P}/©VISTA_27_EXT_PÁTIO_CASAS_FINAL.webp`, alt: 'Pátio Casas' },
    ],
  },
  {
    label: 'Áreas Sociais',
    images: [
      { src: `${P}/©VISTA_14_INT_HALL_FINAL.webp`, alt: 'Hall Social' },
      { src: `${P}/©VISTA_17_INT_SALÃO_DE_FESTAS_FINAL_.webp`, alt: 'Salão de Festas' },
      { src: `${P}/©VISTA_15_INT_YOGA_FINAL.webp`, alt: 'Espaço Yoga' },
      { src: `${P}/©VISTA_16_INT_FITNESS_FINAL.webp`, alt: 'Fitness / Gymnasium' },
      { src: `${P}/©VISTA_21_INT_ESPACO_ROOFTOP_01_FINAL.webp`, alt: 'Sunset View — Rooftop 1' },
      { src: `${P}/©VISTA_22_INT_ESPAÇO_ROOFTOP_02_FINAL_.webp`, alt: 'Sunset View — Rooftop 2' },
      { src: `${P}/©VISTA_23_INT_SALA_DE_REUNIÕES_FINAL.webp`, alt: 'Office Box' },
    ],
  },
  {
    label: 'Apartamentos',
    images: [
      { src: `${P}/©VISTA_30_INT_LIVING_TIPO_COM_SACADA_FINAL.webp`, alt: 'Living Tipo com Sacada' },
      { src: `${P}/©VISTA_36_INT_LIVING_TIPO_COM_SACADA_02_(EXTRA)_FINAL.webp`, alt: 'Living Tipo com Sacada 2' },
      { src: `${P}/©VISTA_31_INT_LIVING_DUPLEX_FINAL.webp`, alt: 'Living Duplex' },
      { src: `${P}/©VISTA_32_INT_LIVING_APTO_COBERTURA_FINAL.webp`, alt: 'Living Cobertura' },
      { src: `${P}/©VISTA_28_INT_ESTAR_JANTAR_TERREO_CASAS_FINAL.webp`, alt: 'Estar/Jantar — Casa Térrea' },
    ],
  },
  {
    label: 'Decorado',
    images: Array.from({ length: 34 }, (_, i) => ({
      src: `${P}/Decorado Verdant - final-${i + 1}.webp`,
      alt: `Apartamento Decorado — ${i + 1}`,
    })),
  },
];

// ─── PLANTS ──────────────────────────────────────────────────────────────────
const plantCategories = [
  {
    label: 'Implantação',
    images: [
      { src: `${P}/plantas/©VISTA_01_PLB_TÉRREO_FINAL.webp`, alt: 'Térreo' },
      { src: `${P}/plantas/©VISTA_03_PLB_PAV_TIPO_FINAL.webp`, alt: 'Pavimento Tipo' },
      { src: `${P}/plantas/©VISTA_15_PLB_PAV_TIPO_LIVING_ESTENDIDO_(EXTRA)_FINAL.webp`, alt: 'Pavimento Tipo — Living Estendido' },
      { src: `${P}/plantas/©VISTA_04_PLB_COBERTURA_FINAL.webp`, alt: 'Cobertura' },
      { src: `${P}/plantas/©VISTA_02_PLB_SUBSOLO_01_FINAL.webp`, alt: 'Subsolo 1' },
      { src: `${P}/plantas/©VISTA_14_PLB_SUBSOLO_02_(EXTRA)_FINAL.webp`, alt: 'Subsolo 2' },
    ],
  },
  {
    label: 'Apartamento Tipo',
    images: [
      { src: `${P}/plantas/©VISTA_05_PLB_UNIDADE_APTO_TIPO_01_FINAL.webp`, alt: 'Tipo 01 — 145–163 m²' },
      { src: `${P}/plantas/©VISTA_06_PLB_UNIDADE_APTO_TIPO_02_FINAL.webp`, alt: 'Tipo 02 — 145–163 m²' },
      { src: `${P}/plantas/©VISTA_07_PLB_UNIDADE_APTO_TIPO_03_FINAL.webp`, alt: 'Tipo 03 — 145–163 m²' },
    ],
  },
  {
    label: 'Garden & Duplex',
    images: [
      { src: `${P}/plantas/©VISTA_08_PLB_UNIDADE_APTO_DUPLEX_INFERIOR_FINAL.webp`, alt: 'Duplex — Pavimento Inferior — 295,09 m²' },
      { src: `${P}/plantas/©VISTA_09_PLB_UNIDADE_APTO_DUPLEX_SUPERIOR_FINAL.webp`, alt: 'Duplex — Pavimento Superior — 295,09 m²' },
    ],
  },
  {
    label: 'Cobertura',
    images: [
      { src: `${P}/plantas/©VISTA_10_PLB_UNIDADE_APTO_COBERTURA_INFERIOR_FINAL_sem banheira.webp`, alt: 'Cobertura — Pavimento Inferior — 303–321 m²' },
      { src: `${P}/plantas/©VISTA_11_PLB_UNIDADE_APTO_COBERTURA_SUPERIOR_FINAL.webp`, alt: 'Cobertura — Pavimento Superior — 303–321 m²' },
    ],
  },
  {
    label: 'Casas',
    images: [
      { src: `${P}/plantas/©VISTA_12_PLB_UNIDADE_RESIDÊNCIA_UNIFAMILIAR_TÉRREO_FINAL.webp`, alt: 'Casa — Térreo — 366–370 m²' },
      { src: `${P}/plantas/©VISTA_13_PLB_UNIDADE_RESIDÊNCIA_UNIFAMILIAR_PAV_SUPERIOR_FINAL.webp`, alt: 'Casa — Pavimento Superior — 366–370 m²' },
    ],
  },
];

const diferenciais = [
  'Playground com Casinha na Árvore',
  'Pet Place',
  'Piscina adulto e infantil',
  'Quadra Poliesportiva',
  'Gymnasium Plaenge',
  'Piscina coberta com raia de 20 m',
  'Sauna',
  'Salão de Festas',
  'Espaço Kids',
  'Office Box',
  'Wine Sensations by Grand Cru',
  'Sunset View (Rooftop)',
  'Depósito privativo por unidade',
  'Vaga com espera p/ carro elétrico',
];

const tipologias = [
  { tipo: 'Apartamento Tipo', area: '145,08 – 162,98 m²', unidades: '38 unid.' },
  { tipo: 'Garden', area: '167,35 – 197,73 m²', unidades: '6 unid.' },
  { tipo: 'Duplex', area: '295,09 m²', unidades: '2 unid.' },
  { tipo: 'Cobertura', area: '303,56 – 321,46 m²', unidades: '4 unid.' },
  { tipo: 'Casas', area: '366,05 – 369,73 m²', unidades: '4 unid.' },
];

// ─── REUSABLE COMPONENTS ──────────────────────────────────────────────────────
function Gallery({ categories }: { categories: typeof galleryCategories }) {
  const [activeCat, setActiveCat] = useState(0);
  const [activeImg, setActiveImg] = useState(0);
  const images = categories[activeCat].images;
  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        {categories.map((cat, i) => (
          <button key={cat.label} onClick={() => { setActiveCat(i); setActiveImg(0); }}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${activeCat === i ? 'bg-primary text-primary-foreground border-primary' : 'bg-transparent text-muted-foreground border-border hover:bg-muted'}`}>
            {cat.label} <span className="ml-1 text-xs opacity-60">({cat.images.length})</span>
          </button>
        ))}
      </div>
      <div className="relative w-full h-[500px] rounded-xl overflow-hidden bg-muted">
        <Image src={images[activeImg].src} alt={images[activeImg].alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 1200px" />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-6 py-4">
          <p className="text-white text-sm font-medium">{images[activeImg].alt}</p>
          <p className="text-white/60 text-xs">{activeImg + 1} / {images.length}</p>
        </div>
        {images.length > 1 && (<>
          <button onClick={() => setActiveImg(p => (p - 1 + images.length) % images.length)} className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center text-xl">‹</button>
          <button onClick={() => setActiveImg(p => (p + 1) % images.length)} className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center text-xl">›</button>
        </>)}
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {images.map((img, i) => (
          <button key={i} onClick={() => setActiveImg(i)} className={`relative flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${activeImg === i ? 'border-primary opacity-100' : 'border-transparent opacity-60 hover:opacity-90'}`}>
            <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="80px" />
          </button>
        ))}
      </div>
    </div>
  );
}

function Plants({ categories }: { categories: typeof plantCategories }) {
  const [activeCat, setActiveCat] = useState(0);
  const [activeImg, setActiveImg] = useState(0);
  const images = categories[activeCat].images;
  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        {categories.map((cat, i) => (
          <button key={cat.label} onClick={() => { setActiveCat(i); setActiveImg(0); }}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${activeCat === i ? 'bg-primary text-primary-foreground border-primary' : 'bg-transparent text-muted-foreground border-border hover:bg-muted'}`}>
            {cat.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {images.map((img, i) => (
          <button key={i} onClick={() => setActiveImg(i)} className={`relative rounded-lg overflow-hidden border-2 transition-all bg-muted ${activeImg === i ? 'border-primary' : 'border-transparent hover:border-border'}`} style={{ paddingBottom: '75%', height: 0, position: 'relative' }}>
            <Image src={img.src} alt={img.alt} fill className="object-contain p-1" sizes="300px" />
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 px-2 py-1">
              <p className="text-white text-xs text-center leading-tight line-clamp-2">{img.alt}</p>
            </div>
          </button>
        ))}
      </div>
      <div className="relative w-full bg-white rounded-xl border overflow-hidden" style={{ height: '520px' }}>
        <Image src={images[activeImg].src} alt={images[activeImg].alt} fill className="object-contain p-4" sizes="(max-width: 768px) 100vw, 1200px" />
      </div>
      <p className="text-center text-sm text-muted-foreground font-medium">{images[activeImg].alt}</p>
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function VerdantHomePageClient() {
  return (
    <div className="bg-background min-h-screen">
      <CommunityPopup />
      <ProductHeader />

      {/* HERO */}
      <section className="relative h-[70vh] flex items-end pb-16 text-white">
        <div className="absolute inset-0">
          <Image src={`${P}/©VISTA_01_EXT_FACHADA_DIURNA_FINAL.webp`} alt="VERDANT" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/70" />
        </div>
        <div className="relative z-10 container">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-white/70 mb-3">Eça de Queiroz · Porto Alegre</p>
          <Image src={`${P}/logo_verdant.png`} alt="VERDANT" width={220} height={80} className="brightness-0 invert mb-4" />
          <p className="text-white/80 text-base max-w-md leading-relaxed">
            Descubra um pouco mais da nossa natureza. Casas, duplex e apartamentos com natureza integrada ao cotidiano.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <div className="container relative z-10 -mt-8 pb-16 space-y-2">

        <div className="bg-primary text-primary-foreground rounded-2xl px-8 py-6 text-center">
          <p className="text-lg font-semibold tracking-wide">Criamos muitas raízes ao longo dos anos</p>
          <p className="text-primary-foreground/80 text-sm mt-1">Plaenge · Rua Eça de Queiroz, 215 · Porto Alegre</p>
        </div>

        {/* SOBRE */}
        <div className="bg-card rounded-2xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-5">
              <div>
                <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-2">Sobre o Empreendimento</p>
                <h2 className="font-display text-4xl md:text-5xl text-foreground leading-tight mb-4">Natureza integrada à vida</h2>
                <p className="text-muted-foreground leading-relaxed">
                  54 unidades com tipologias inéditas em Porto Alegre — apartamentos tipo, gardens, duplex,
                  coberturas e casas com pátio privativo. Um empreendimento Plaenge com toda a tradição
                  de mais de 50 anos de história.
                </p>
              </div>
              <div className="pt-2 border-t space-y-3">
                {[
                  { label: 'Arquitetura', value: 'Baldasso Arquitetura e Engenharia' },
                  { label: 'Paisagismo', value: 'Tellini Vontobel' },
                  { label: 'Interiores', value: 'Tellini Vontobel' },
                  { label: 'Total unidades', value: '54 unidades' },
                  { label: 'Endereço', value: 'Rua Eça de Queiroz, 215' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex gap-3 text-sm">
                    <span className="text-muted-foreground w-32 flex-shrink-0">{label}</span>
                    <span className="font-medium text-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-96 rounded-xl overflow-hidden">
              <Image src={`${P}/©VISTA_11_EXT_AÉREA_ÁREA_CONDOMINIAL_FINAL.webp`} alt="Vista aérea VERDANT" fill className="object-cover" sizes="600px" />
            </div>
          </div>
        </div>

        {/* TIPOLOGIAS */}
        <div className="bg-card rounded-2xl p-8">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-6 text-center">Tipologias</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left pb-3 text-muted-foreground font-normal">Tipo</th>
                  <th className="text-left pb-3 text-muted-foreground font-normal">Área</th>
                  <th className="text-left pb-3 text-muted-foreground font-normal">Unidades</th>
                </tr>
              </thead>
              <tbody>
                {tipologias.map((t, i) => (
                  <tr key={i} className="border-b last:border-0">
                    <td className="py-3 font-medium text-foreground">{t.tipo}</td>
                    <td className="py-3 text-primary font-semibold">{t.area}</td>
                    <td className="py-3 text-muted-foreground">{t.unidades}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* GALERIA */}
        <div className="bg-card rounded-2xl p-8 md:p-10">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-2">Galeria</p>
          <h2 className="font-display text-3xl text-foreground mb-6">Imagens do Empreendimento</h2>
          <GalleryViewer categories={galleryCategories} />
        </div>

        {/* PLANTAS */}
        <div className="bg-card rounded-2xl p-8 md:p-10">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-2">Plantas</p>
          <h2 className="font-display text-3xl text-foreground mb-6">Tipologias & Implantação</h2>
          <PlantsViewer categories={plantCategories} />
        </div>

        {/* DIFERENCIAIS + LOCALIZAÇÃO */}
        <div className="grid md:grid-cols-2 gap-2">
          <div className="bg-card rounded-2xl p-8 space-y-4">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary">Diferenciais</p>
            <h2 className="font-display text-2xl text-foreground">O que o VERDANT oferece</h2>
            <div className="grid grid-cols-1 gap-y-2.5 pt-1">
              {diferenciais.map(d => (
                <div key={d} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs flex-shrink-0">✓</span>
                  {d}
                </div>
              ))}
            </div>
          </div>
          <div className="bg-card rounded-2xl p-8 space-y-4">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary">Localização</p>
            <h2 className="font-display text-2xl text-foreground">Porto Alegre</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Incorporação registrada sob R1 da Matrícula 167.625 do 2º Ofício de Registro de Imóveis de Porto Alegre.
            </p>
            <div className="rounded-xl overflow-hidden border" style={{ height: '280px' }}>
              <iframe src="https://maps.google.com/maps?q=Rua+Eça+de+Queiroz,+215,+Porto+Alegre&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%" height="100%" style={{ border: 0 }} loading="lazy" title="Localização VERDANT" />
            </div>
          </div>
        </div>

        {/* DISPONIBILIDADE */}
        <div className="bg-card rounded-2xl p-8 md:p-10">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-2">Disponibilidade</p>
          <h2 className="font-display text-3xl text-foreground mb-6">Unidades Disponíveis</h2>
          <UnitGrid />
        </div>

      </div>

      <footer className="border-t py-8 text-center text-xs text-muted-foreground space-y-1">
        <p className="font-medium">VERDANT · Plaenge</p>
        <p>Rua Eça de Queiroz, 215 — Porto Alegre, RS</p>
      </footer>
    </div>
  );
}
