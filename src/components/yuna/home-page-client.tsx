'use client';

import Image from 'next/image';
import { useState } from 'react';
import UnitGrid from '@/components/yuna/unit-grid';
import CommunityPopup from '@/components/wave/community-popup';

const P = '/YUNA';

// ─── GALLERY ─────────────────────────────────────────────────────────────────
const galleryCategories = [
  {
    label: 'Galeria',
    images: [
      { src: `${P}/IMG-20240704-WA0031.webp`, alt: 'YUNA — 1' },
      { src: `${P}/IMG-20240704-WA0032.webp`, alt: 'YUNA — 2' },
      { src: `${P}/IMG-20240705-WA0040.webp`, alt: 'YUNA — 3' },
      { src: `${P}/IMG-20240705-WA0041.webp`, alt: 'YUNA — 4' },
      { src: `${P}/IMG-20240705-WA0042.webp`, alt: 'YUNA — 5' },
      { src: `${P}/IMG-20240705-WA0043.webp`, alt: 'YUNA — 6' },
      { src: `${P}/IMG-20240705-WA0044.webp`, alt: 'YUNA — 7' },
      { src: `${P}/IMG-20240705-WA0045.webp`, alt: 'YUNA — 8' },
      { src: `${P}/IMG-20240705-WA0046.webp`, alt: 'YUNA — 9' },
      { src: `${P}/IMG-20240705-WA0047.webp`, alt: 'YUNA — 10' },
      { src: `${P}/IMG-20240705-WA0048.webp`, alt: 'YUNA — 11' },
      { src: `${P}/IMG-20240705-WA0049.webp`, alt: 'YUNA — 12' },
      { src: `${P}/IMG-20240705-WA0050.webp`, alt: 'YUNA — 13' },
      { src: `${P}/IMG-20240705-WA0051.webp`, alt: 'YUNA — 14' },
      { src: `${P}/IMG-20240705-WA0052.webp`, alt: 'YUNA — 15' },
      { src: `${P}/IMG-20240705-WA0053.webp`, alt: 'YUNA — 16' },
      { src: `${P}/IMG-20240705-WA0054.webp`, alt: 'YUNA — 17' },
      { src: `${P}/IMG-20240705-WA0055.webp`, alt: 'YUNA — 18' },
      { src: `${P}/IMG-20240705-WA0056.webp`, alt: 'YUNA — 19' },
      { src: `${P}/IMG-20240705-WA0057.webp`, alt: 'YUNA — 20' },
      { src: `${P}/IMG-20240705-WA0058.webp`, alt: 'YUNA — 21' },
      { src: `${P}/IMG-20240705-WA0059.webp`, alt: 'YUNA — 22' },
    ],
  },
];

// ─── PLANTS ──────────────────────────────────────────────────────────────────
const plantCategories = [
  {
    label: 'Implantação',
    images: [
      { src: `${P}/plantas/01_VAN_PARECI_TERREO_EF2.webp`, alt: 'Térreo' },
      { src: `${P}/plantas/01_VAN_PARECI_TERREO_OP_EF2.webp`, alt: 'Térreo — Opção' },
      { src: `${P}/plantas/02_VAN_PARECI_TIPO_EF.webp`, alt: 'Pavimento Tipo' },
      { src: `${P}/plantas/05_VAN_PARECI_ROOFTOP_EF.webp`, alt: 'Rooftop' },
    ],
  },
  {
    label: 'Unidade II — 88,68 m²',
    images: [
      { src: `${P}/plantas/03_VAN_PARECI_APTO_2_DORM_Ef.webp`, alt: 'Unidade II — 2 Dormitórios — 88,68 m²' },
      { src: `${P}/plantas/03_VAN_PARECI_APTO_2_DORM_Ef_COTAS.webp`, alt: 'Unidade II — Cotas — 88,68 m²' },
    ],
  },
  {
    label: 'Unidade III — 72,58 m²',
    images: [
      { src: `${P}/plantas/04_VAN_PARECI_APTO_3_DORM_EF.webp`, alt: 'Unidade III — 3 Dormitórios — 72,58 m²' },
      { src: `${P}/plantas/04_VAN_PARECI_APTO_3_DORM_EF_COTAS.webp`, alt: 'Unidade III — Cotas — 72,58 m²' },
      { src: `${P}/plantas/06_VAN_PARECI_APTO_3_DORM_OP_EF.webp`, alt: 'Unidade III — Opção — 72,58 m²' },
      { src: `${P}/plantas/06_VAN_PARECI_APTO_3_DORM_OP_EF_COTAS.webp`, alt: 'Unidade III — Opção Cotas — 72,58 m²' },
      { src: `${P}/plantas/07_VAN_PARECI_APTO_3_DORM_OP_LIVING_EF.webp`, alt: 'Unidade III — Living Estendido' },
      { src: `${P}/plantas/07_VAN_PARECI_APTO_3_DORM_OP_LIVING_EF_COTAS.webp`, alt: 'Unidade III — Living Estendido Cotas' },
    ],
  },
];

const diferenciais = [
  'Porte-cochère',
  'Lobby decorado',
  'Piscina',
  'Espaço Kids',
  'Salão de Festas equipado e decorado',
  'Fitness',
  'Playground',
  'Área pet',
  'Plantas flexíveis com opções de layout',
  'Rooftop privativo',
  'Paisagismo integrado — selva urbana',
  'Áreas comuns entregues equipadas e decoradas',
];

const tipologias = [
  { tipo: 'Unidade II', area: '88,68 m²', unidades: '54 unid.', detalhe: '2 Dormitórios' },
  { tipo: 'Unidade III', area: '72,58 m²', unidades: '28 unid.', detalhe: '3 Dormitórios' },
  { tipo: 'Unidade I', area: '184,90 m²', unidades: '1 unid.', detalhe: 'Especial — Rooftop' },
];

// ─── REUSABLE GALLERY COMPONENT ───────────────────────────────────────────────
function Gallery({ categories }: { categories: typeof galleryCategories }) {
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeImg, setActiveImg] = useState(0);
  const images = categories[activeCategory].images;

  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        {categories.map((cat, i) => (
          <button key={cat.label} onClick={() => { setActiveCategory(i); setActiveImg(0); }}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              activeCategory === i ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-transparent text-muted-foreground border-border hover:bg-muted'}`}>
            {cat.label} <span className="ml-1 text-xs opacity-60">({cat.images.length})</span>
          </button>
        ))}
      </div>
      <div className="relative w-full h-[500px] rounded-xl overflow-hidden bg-muted">
        <Image src={images[activeImg].src} alt={images[activeImg].alt} fill
          className="object-cover transition-opacity duration-300" sizes="(max-width: 768px) 100vw, 1200px" />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-6 py-4">
          <p className="text-white text-sm font-medium">{images[activeImg].alt}</p>
          <p className="text-white/60 text-xs">{activeImg + 1} / {images.length}</p>
        </div>
        {images.length > 1 && (<>
          <button onClick={() => setActiveImg(p => (p - 1 + images.length) % images.length)}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center text-xl">‹</button>
          <button onClick={() => setActiveImg(p => (p + 1) % images.length)}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center text-xl">›</button>
        </>)}
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {images.map((img, i) => (
          <button key={i} onClick={() => setActiveImg(i)}
            className={`relative flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
              activeImg === i ? 'border-primary opacity-100' : 'border-transparent opacity-60 hover:opacity-90'}`}>
            <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="80px" />
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── REUSABLE PLANTS COMPONENT ────────────────────────────────────────────────
function Plants({ categories }: { categories: typeof plantCategories }) {
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeImg, setActiveImg] = useState(0);
  const images = categories[activeCategory].images;

  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        {categories.map((cat, i) => (
          <button key={cat.label} onClick={() => { setActiveCategory(i); setActiveImg(0); }}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              activeCategory === i ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-transparent text-muted-foreground border-border hover:bg-muted'}`}>
            {cat.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {images.map((img, i) => (
          <button key={i} onClick={() => setActiveImg(i)}
            className={`relative rounded-lg overflow-hidden border-2 transition-all bg-muted ${
              activeImg === i ? 'border-primary' : 'border-transparent hover:border-border'}`}
            style={{ paddingBottom: '75%', height: 0, position: 'relative' }}>
            <Image src={img.src} alt={img.alt} fill className="object-contain p-1" sizes="300px" />
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 px-2 py-1">
              <p className="text-white text-xs text-center leading-tight line-clamp-2">{img.alt}</p>
            </div>
          </button>
        ))}
      </div>
      <div className="relative w-full bg-white rounded-xl border overflow-hidden" style={{ height: '520px' }}>
        <Image src={images[activeImg].src} alt={images[activeImg].alt} fill
          className="object-contain p-4" sizes="(max-width: 768px) 100vw, 1200px" />
      </div>
      <p className="text-center text-sm text-muted-foreground font-medium">{images[activeImg].alt}</p>
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function YunaHomePageClient() {
  return (
    <div className="bg-background min-h-screen">
      <CommunityPopup />

      {/* HEADER */}
      <header className="absolute top-0 left-0 w-full z-20 py-5">
        <div className="container flex justify-center">
          <Image src="/INSTITUCIONAL/logo_grupo_plaenge.png" alt="Grupo Plaenge" width={140} height={36} />
        </div>
      </header>

      {/* HERO */}
      <section className="relative h-[70vh] flex items-end pb-16 text-white">
        <div className="absolute inset-0">
          <Image src={`${P}/IMG-20240704-WA0031.webp`} alt="YUNA Jardim Botânico" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/70" />
        </div>
        <div className="relative z-10 container">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-white/70 mb-3">
            Jardim Botânico · Porto Alegre
          </p>
          <Image src={`${P}/logo.png`} alt="YUNA" width={220} height={80}
            className="brightness-0 invert mb-4" />
          <p className="text-white/80 text-base max-w-md leading-relaxed">
            Um jeito de viver interligado, pulsante e arraigado ao coração do Jardim Botânico.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <div className="container relative z-10 -mt-8 pb-16 space-y-2">

        {/* CHAMADA */}
        <div className="bg-primary text-primary-foreground rounded-2xl px-8 py-6 text-center">
          <p className="text-lg font-semibold tracking-wide">Viver Bem no Jardim Botânico</p>
          <p className="text-primary-foreground/80 text-sm mt-1">Vanguard · Rua Felizardo Furtado, 348 · Jardim Botânico · Porto Alegre</p>
        </div>

        {/* SOBRE */}
        <div className="bg-card rounded-2xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-5">
              <div>
                <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-2">Sobre o Empreendimento</p>
                <h2 className="font-display text-4xl md:text-5xl text-foreground leading-tight mb-4">
                  O charme do Jardim Botânico
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Da harmonia entre formas e cores nasce o Yuna. Um jeito de viver interligado, pulsante e
                  arraigado ao coração do Jardim Botânico. O ponto de encontro para quem valoriza a eficiência
                  do tempo e o que realmente importa. Um bairro para correr, caminhar, cercado de conveniências,
                  que proporciona um refúgio para descontrair ao final do dia.
                </p>
              </div>
              <div className="pt-2 border-t space-y-3">
                {[
                  { label: 'Endereço', value: 'Rua Felizardo Furtado, 348' },
                  { label: 'Bairro', value: 'Jardim Botânico' },
                  { label: 'Cidade', value: 'Porto Alegre — RS' },
                  { label: 'Arquitetura', value: 'Pedro Gabriel & Bonini Arquitetura' },
                  { label: 'Interiores', value: 'ARTD3 Arquitetura e Design' },
                  { label: 'Paisagismo', value: 'Daniel Dillenburg Arquitetura e Paisagismo' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex gap-3 text-sm">
                    <span className="text-muted-foreground w-28 flex-shrink-0">{label}</span>
                    <span className="font-medium text-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-96 rounded-xl overflow-hidden">
              <Image src={`${P}/IMG-20240705-WA0040.webp`} alt="YUNA Jardim Botânico" fill className="object-cover" sizes="600px" />
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
                  <th className="text-left pb-3 text-muted-foreground font-normal">Área Privativa</th>
                  <th className="text-left pb-3 text-muted-foreground font-normal">Unidades</th>
                  <th className="text-left pb-3 text-muted-foreground font-normal">Detalhe</th>
                </tr>
              </thead>
              <tbody>
                {tipologias.map((t, i) => (
                  <tr key={i} className="border-b last:border-0">
                    <td className="py-3 font-medium text-foreground">{t.tipo}</td>
                    <td className="py-3 text-muted-foreground">{t.area}</td>
                    <td className="py-3 text-muted-foreground">{t.unidades}</td>
                    <td className="py-3 text-muted-foreground">{t.detalhe}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* GALERIA */}
        <div className="bg-card rounded-2xl p-8">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-6 text-center">Galeria</p>
          <Gallery categories={galleryCategories} />
        </div>

        {/* PLANTAS */}
        <div className="bg-card rounded-2xl p-8">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-6 text-center">Plantas</p>
          <Plants categories={plantCategories} />
        </div>

        {/* DIFERENCIAIS + LOCALIZAÇÃO */}
        <div className="grid md:grid-cols-2 gap-2">
          <div className="bg-card rounded-2xl p-8">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-6">Diferenciais</p>
            <ul className="space-y-2">
              {diferenciais.map((d, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-primary font-bold mt-0.5">✓</span>
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-card rounded-2xl p-8">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-6">Localização</p>
            <div className="space-y-4">
              <div className="text-sm space-y-1">
                <p className="font-medium text-foreground">Rua Felizardo Furtado, 348 · Jardim Botânico · Porto Alegre — RS</p>
                <p className="text-muted-foreground">Próximo ao Bourbon Shopping Ipiranga, PUCRS, ESEF, 3ª Perimetral e Av. Protásio Alves. Arborizado, tranquilo e conectado às principais vias de Porto Alegre.</p>
              </div>
              <div className="rounded-xl overflow-hidden border" style={{ height: '280px' }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.0!2d-51.1988!3d-30.0438!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x951979c0e3cc1dbd%3A0x1!2sR.+Felizardo+Furtado%2C+348+-+Jardim+Bot%C3%A2nico%2C+Porto+Alegre+-+RS!5e0!3m2!1spt-BR!2sbr!4v1234567890"
                  width="100%" height="280" style={{ border: 0 }} allowFullScreen loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade" title="Localização YUNA"
                />
              </div>
            </div>
          </div>
        </div>

        {/* DISPONIBILIDADE */}
        <div className="bg-card rounded-2xl p-8">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-6 text-center">Disponibilidade</p>
          <UnitGrid />
        </div>

      </div>

      {/* FOOTER */}
      <footer className="border-t py-8 text-center text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} Vanguard · Grupo Plaenge · YUNA Jardim Botânico · Porto Alegre</p>
      </footer>
    </div>
  );
}
