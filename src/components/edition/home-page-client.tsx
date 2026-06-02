'use client';

import Image from 'next/image';
import { useState } from 'react';
import UnitGrid from '@/components/edition/unit-grid';
import CommunityPopup from '@/components/wave/community-popup';
import { GalleryViewer } from '@/components/shared/gallery-viewer';
import { PlantsViewer } from '@/components/shared/plants-viewer';

// ─── GALLERY DATA ─────────────────────────────────────────────────────────────
const galleryCategories = [
  {
    label: 'Fachada',
    images: [
      { src: '/EDITION/JAC_01_Fachada_A_EF2.webp', alt: 'Fachada Torre Jardim Cristofel' },
      { src: '/EDITION/JAC_02_Fachada_B_EF2.webp', alt: 'Fachada Torre Doutor Vale' },
      { src: '/EDITION/JAC_05_Fotomontagem_EF.webp', alt: 'Fotomontagem' },
      { src: '/EDITION/JAC_31_Voo_Passaro_EF_v2.webp', alt: 'Vista aérea' },
      { src: '/EDITION/JAC_32_Detalhe_Fachada_EF2.webp', alt: 'Detalhe fachada' },
      { src: '/EDITION/JAC_33_Fachada_A_EF2.webp', alt: 'Fachada A' },
      { src: '/EDITION/JAC_34_Fachada_A_EF2.webp', alt: 'Fachada A (2)' },
      { src: '/EDITION/JAC_35_Fachada_B_EF2.webp', alt: 'Fachada B' },
    ],
  },
  {
    label: 'Áreas Comuns',
    images: [
      { src: '/EDITION/JAC_17_Lobby_EF.webp', alt: 'Lobby' },
      { src: '/EDITION/JAC_38_Lobby_Conceitual_EF.webp', alt: 'Lobby conceitual' },
      { src: '/EDITION/JAC_03_Acesso_A_EF.webp', alt: 'Acesso A' },
      { src: '/EDITION/JAC_04_Acesso_B_EF2.webp', alt: 'Acesso B' },
      { src: '/EDITION/JAC_06_Passarela_EF2.webp', alt: 'Passarela' },
    ],
  },
  {
    label: 'Lazer',
    images: [
      { src: '/EDITION/JAC_07_Piscina_A_EF2.webp', alt: 'Piscina externa' },
      { src: '/EDITION/JAC_08_Piscina_B_EF2.webp', alt: 'Piscina B' },
      { src: '/EDITION/JAC_36_Piscina_C_EF2.webp', alt: 'Piscina C' },
      { src: '/EDITION/JAC_37_Piscina_D_EF2.webp', alt: 'Piscina D' },
      { src: '/EDITION/JAC_15_Pool_Lounge_EF2.webp', alt: 'Pool Lounge' },
      { src: '/EDITION/JAC_20_Piscina_Interna_EF.webp', alt: 'Piscina interna' },
      { src: '/EDITION/JAC_39_Piscina_Interna_Wide_02.webp', alt: 'Piscina interna (panorâmica)' },
      { src: '/EDITION/JAC_18_Festas_A_EF.webp', alt: 'Salão de Festas' },
      { src: '/EDITION/JAC_19_Festas_B_EF2.webp', alt: 'Salão de Festas B' },
      { src: '/EDITION/JAC_25_Fitness_A_EF.webp', alt: 'Fitness' },
      { src: '/EDITION/JAC_26_Fitness_B_EF3.webp', alt: 'Fitness B' },
      { src: '/EDITION/JAC_10_Wine_Spa_EF.webp', alt: 'Wine Spa' },
      { src: '/EDITION/JAC_24_Wine_Lounge_EF.webp', alt: 'Wine Lounge' },
      { src: '/EDITION/JAC_40_Wine_Lounge_Conceitual_EF.webp', alt: 'Wine Lounge conceitual' },
      { src: '/EDITION/JAC_21_Massagem_EF.webp', alt: 'Sala de Massagem' },
      { src: '/EDITION/JAC_22_Beauty_EF.webp', alt: 'Beauty Space' },
      { src: '/EDITION/JAC_23_Kids_EF.webp', alt: 'Espaço Kids' },
      { src: '/EDITION/JAC_14_Playground_EF_v2.webp', alt: 'Playground' },
    ],
  },
];

// ─── PLANTS DATA ──────────────────────────────────────────────────────────────
const plantCategories = [
  {
    label: 'Implantação',
    images: [
      { src: '/EDITION/plantas/JAC_PB_01_Implantacao_Terreo_EF2.webp', alt: 'Implantação Térreo' },
      { src: '/EDITION/plantas/JAC_PB_02_Implantacao_Lazer_EF2_v2.webp', alt: 'Implantação Lazer' },
      { src: '/EDITION/plantas/JAC_PB_09_Implantacao_3pav_EF2_v2.webp', alt: 'Implantação 3º Pavimento' },
    ],
  },
  {
    label: 'Torre Jardim Cristofel',
    images: [
      { src: '/EDITION/plantas/3 suítes_146m2_ Torre Jardim Cristófel.webp', alt: '3 Suítes — 146 m²' },
      { src: '/EDITION/plantas/3 suítes_172m2_ Torre Jardim Cristofel.webp', alt: '3 Suítes — 172 m²' },
      { src: '/EDITION/plantas/3 suítes_177m2_ Torre Jardim Cristofel.webp', alt: '3 Suítes — 177 m²' },
      { src: '/EDITION/plantas/4 suítes_322m2_ Torre Jardim Cristofel.webp', alt: '4 Suítes — 322 m²' },
    ],
  },
  {
    label: 'Torre Doutor Vale',
    images: [
      { src: '/EDITION/plantas/3 suítes_172m2_ Torre Doutor Vale.webp', alt: '3 Suítes — 172 m²' },
      { src: '/EDITION/plantas/3 suítes_206m2_ Torre Doutor Vale.webp', alt: '3 Suítes — 206 m²' },
    ],
  },
];

const diferenciais = [
  'Elevador privativo por unidade',
  'Elevador Panorâmico',
  'Unidades com lareira na suíte',
  'Unidades com elevador privativo para área íntima',
  'Piscina interna e externa',
  'Wine Garden',
  'Salão de Festas',
  'Fitness',
  'Beauty Space',
  'Espaço Kids & Playground',
  'Sala de Massagem e Sauna',
  'Gerador pleno',
];

// ─── GALLERY COMPONENT ────────────────────────────────────────────────────────
function Gallery() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeImg, setActiveImg] = useState(0);
  const images = galleryCategories[activeCategory].images;

  function selectCategory(idx: number) {
    setActiveCategory(idx);
    setActiveImg(0);
  }

  return (
    <div className="space-y-4">
      {/* Category tabs */}
      <div className="flex gap-2 flex-wrap">
        {galleryCategories.map((cat, i) => (
          <button
            key={cat.label}
            onClick={() => selectCategory(i)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              activeCategory === i
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-transparent text-muted-foreground border-border hover:bg-muted'
            }`}
          >
            {cat.label}
            <span className="ml-1.5 text-xs opacity-60">({cat.images.length})</span>
          </button>
        ))}
      </div>

      {/* Main image */}
      <div className="relative w-full h-[500px] rounded-xl overflow-hidden bg-muted">
        <Image
          src={images[activeImg].src}
          alt={images[activeImg].alt}
          fill
          className="object-cover transition-opacity duration-300"
          sizes="(max-width: 768px) 100vw, 1200px"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-6 py-4">
          <p className="text-white text-sm font-medium">{images[activeImg].alt}</p>
          <p className="text-white/60 text-xs">{activeImg + 1} / {images.length}</p>
        </div>
        {/* Prev / Next */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => setActiveImg((p) => (p - 1 + images.length) % images.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors"
              aria-label="Anterior"
            >‹</button>
            <button
              onClick={() => setActiveImg((p) => (p + 1) % images.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors"
              aria-label="Próxima"
            >›</button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveImg(i)}
            className={`relative flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
              activeImg === i ? 'border-primary opacity-100' : 'border-transparent opacity-60 hover:opacity-90'
            }`}
          >
            <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="80px" />
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── PLANTS COMPONENT ─────────────────────────────────────────────────────────
function Plants() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeImg, setActiveImg] = useState(0);
  const images = plantCategories[activeCategory].images;

  function selectCategory(idx: number) {
    setActiveCategory(idx);
    setActiveImg(0);
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        {plantCategories.map((cat, i) => (
          <button
            key={cat.label}
            onClick={() => selectCategory(i)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              activeCategory === i
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-transparent text-muted-foreground border-border hover:bg-muted'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveImg(i)}
            className={`relative rounded-lg overflow-hidden border-2 transition-all bg-muted ${
              activeImg === i ? 'border-primary' : 'border-transparent hover:border-border'
            }`}
            style={{ paddingBottom: '75%', height: 0, position: 'relative' }}
          >
            <Image src={img.src} alt={img.alt} fill className="object-contain p-1" sizes="300px" />
            <div className="absolute bottom-0 left-0 right-0 bg-black/40 px-2 py-1">
              <p className="text-white text-xs text-center truncate">{img.alt}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Main plant view */}
      <div className="relative w-full bg-white rounded-xl border overflow-hidden" style={{ height: '520px' }}>
        <Image
          src={images[activeImg].src}
          alt={images[activeImg].alt}
          fill
          className="object-contain p-4"
          sizes="(max-width: 768px) 100vw, 1200px"
        />
      </div>
      <p className="text-center text-sm text-muted-foreground">{images[activeImg].alt}</p>
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function EditionHomePageClient() {
  return (
    <div className="bg-background min-h-screen">
      <CommunityPopup />

      {/* ── HEADER ── */}
      <header className="absolute top-0 left-0 w-full z-20 py-5">
        <div className="container flex justify-center">
          <Image src="/INSTITUCIONAL/logo_grupo_plaenge.png" alt="Grupo Plaenge" width={140} height={36} />
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="relative h-[70vh] flex items-end pb-16 text-white">
        <div className="absolute inset-0">
          <Image
            src="/EDITION/JAC_31_Voo_Passaro_EF_v2.webp"
            alt="Vista aérea EDITION Moinhos"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/70" />
        </div>
        <div className="relative z-10 container">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-white/70 mb-3">
            Moinhos de Vento · Porto Alegre
          </p>
          <Image
            src="/EDITION/logo_edition.png"
            alt="EDITION Moinhos"
            width={260}
            height={90}
            className="brightness-0 invert mb-4"
          />
          <p className="text-white/80 text-base max-w-md leading-relaxed">
            Uma edição limitada de elegância e exclusividade no bairro mais charmoso de Porto Alegre.
          </p>
        </div>
      </section>

      {/* ── CONTENT ── */}
      <div className="container relative z-10 -mt-8 pb-16 space-y-2">

        {/* ── CHAMADA ── */}
        <div className="bg-primary text-primary-foreground rounded-2xl px-8 py-6 text-center">
          <p className="text-lg font-semibold tracking-wide">
            Vida Ilimitada — Últimas unidades disponíveis
          </p>
          <p className="text-primary-foreground/80 text-sm mt-1">
            Incorporação registrada · Pronto para morar
          </p>
        </div>

        {/* ── SOBRE ── */}
        <div className="bg-card rounded-2xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-5">
              <div>
                <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-2">
                  Arquitetura Atemporal
                </p>
                <h2 className="font-display text-4xl md:text-5xl text-foreground leading-tight mb-4">
                  Por que não podemos ter tudo?
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Arquitetura atemporal, paisagismo fluido, design puro. A harmonia perfeita entre
                  detalhes que se complementam e promovem uma experiência espacial surpreendente.
                </p>
              </div>
              <div className="pt-2 border-t space-y-3">
                {[
                  { label: 'Arquitetura', value: 'Studio Ronaldo Rezende' },
                  { label: 'Interiores', value: 'LW Design Group · Dubai & São Paulo' },
                  { label: 'Paisagismo', value: 'Tellini Vontobel' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex gap-3 text-sm">
                    <span className="text-muted-foreground w-24 flex-shrink-0">{label}</span>
                    <span className="font-medium text-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-96 rounded-xl overflow-hidden">
              <Image
                src="/EDITION/JAC_32_Detalhe_Fachada_EF2.webp"
                alt="Detalhe fachada EDITION"
                fill
                className="object-cover"
                sizes="600px"
              />
            </div>
          </div>
        </div>

        {/* ── FICHA TÉCNICA ── */}
        <div className="bg-card rounded-2xl p-8">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-6 text-center">
            Ficha Técnica
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { label: 'Área privativa', value: '146 – 545 m²' },
              { label: 'Vagas', value: '2 a 4' },
              { label: 'Unidades', value: '48' },
              { label: 'Torres', value: '2' },
            ].map(({ label, value }) => (
              <div key={label} className="space-y-1">
                <p className="text-3xl font-display text-primary">{value}</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── GALERIA ── */}
        <div className="bg-card rounded-2xl p-8 md:p-10">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-2">Galeria</p>
          <h2 className="font-display text-3xl text-foreground mb-6">Imagens do Empreendimento</h2>
          <Gallery />
        </div>

        {/* ── PLANTAS ── */}
        <div className="bg-card rounded-2xl p-8 md:p-10">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-2">Plantas</p>
          <h2 className="font-display text-3xl text-foreground mb-6">Tipologias & Implantação</h2>
          <Plants />
        </div>

        {/* ── DIFERENCIAIS + LOCALIZAÇÃO ── */}
        <div className="grid md:grid-cols-2 gap-2">
          <div className="bg-card rounded-2xl p-8 space-y-4">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary">Diferenciais</p>
            <h2 className="font-display text-2xl text-foreground">O que o EDITION oferece</h2>
            <ul className="space-y-2.5 pt-1">
              {diferenciais.map((d) => (
                <li key={d} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs flex-shrink-0">✓</span>
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-card rounded-2xl p-8 space-y-4">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary">Localização</p>
            <h2 className="font-display text-2xl text-foreground">Moinhos de Vento</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Um dos bairros mais nobres de Porto Alegre, com ruas arborizadas, gastronomia de
              alto padrão e o icônico Parque Moinhos de Vento a poucos passos.
            </p>
            <div className="rounded-xl overflow-hidden border" style={{ height: '280px' }}>
              <iframe
                src="https://maps.google.com/maps?q=Rua+Jardim+Cristofel,+Porto+Alegre&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                title="Localização EDITION Moinhos"
              />
            </div>
          </div>
        </div>

        {/* ── DISPONIBILIDADE ── */}
        <div className="bg-card rounded-2xl p-8 md:p-10">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-2">Disponibilidade</p>
          <h2 className="font-display text-3xl text-foreground mb-6">Unidades Disponíveis</h2>
          <UnitGrid />
        </div>

      </div>

      {/* ── FOOTER ── */}
      <footer className="border-t py-8 text-center text-xs text-muted-foreground space-y-1">
        <p className="font-medium">EDITION Moinhos · Grupo Plaenge</p>
        <p>Plaenge Empreendimentos Ltda. · Incorporação registrada conforme R-1/218.732 da 1ª Zona de Porto Alegre.</p>
      </footer>
    </div>
  );
}
