'use client';

import { WhatsappButton } from '@/components/whatsapp-button'
import Image from 'next/image';
import { useState } from 'react';
import UnitGrid from '@/components/orbitale/unit-grid';
import CommunityPopup from '@/components/wave/community-popup';
import { GalleryViewer } from '@/components/shared/gallery-viewer';
import { PlantsViewer } from '@/components/shared/plants-viewer';
import { ProductHeader } from '@/components/shared/product-header';

// ─── GALLERY ─────────────────────────────────────────────────────────────────
const galleryCategories = [
  {
    label: 'Fachada',
    images: [
      { src: '/ORBITALE/01_FACHADA-01.webp', alt: 'Fachada — Vista 1' },
      { src: '/ORBITALE/01_FACHADA-02.webp', alt: 'Fachada — Vista 2' },
      { src: '/ORBITALE/01_FACHADA-03.webp', alt: 'Fachada — Vista 3' },
      { src: '/ORBITALE/01_FACHADA-04.webp', alt: 'Fachada — Vista 4' },
      { src: '/ORBITALE/01_FACHADA-05.webp', alt: 'Fachada — Vista 5' },
    ],
  },
  {
    label: 'Áreas Comuns',
    images: [
      { src: '/ORBITALE/02_GUARITA-01.webp', alt: 'Guarita' },
      { src: '/ORBITALE/03_HALL-01.webp', alt: 'Hall Social' },
      { src: '/ORBITALE/03_HALL-02.webp', alt: 'Hall Social — 2' },
      { src: '/ORBITALE/03_HALL-03.webp', alt: 'Hall Social — 3' },
      { src: '/ORBITALE/12_SALAODEFESTAS-01.webp', alt: 'Salão de Festas' },
      { src: '/ORBITALE/12_SALAODEFESTAS-02.webp', alt: 'Salão de Festas — 2' },
      { src: '/ORBITALE/12_SALAODEFESTAS-03.webp', alt: 'Salão de Festas — 3' },
      { src: '/ORBITALE/12_SALAODEFESTAS-04.webp', alt: 'Salão de Festas — 4' },
      { src: '/ORBITALE/13_AREAEXTERNASALAO-01.webp', alt: 'Área Externa Salão' },
      { src: '/ORBITALE/13_AREAEXTERNASALAO-02.webp', alt: 'Área Externa Salão — 2' },
    ],
  },
  {
    label: 'Lazer',
    images: [
      { src: '/ORBITALE/05_PISCINACOBERTA-01.webp', alt: 'Piscina Coberta com Raia' },
      { src: '/ORBITALE/05_PISCINACOBERTA-02.webp', alt: 'Piscina Coberta — 2' },
      { src: '/ORBITALE/05_PISCINACOBERTA-03.webp', alt: 'Piscina Coberta — 3' },
      { src: '/ORBITALE/11_PISCINA-01.webp', alt: 'Piscina Externa' },
      { src: '/ORBITALE/11_PISCINA-02.webp', alt: 'Piscina Externa — 2' },
      { src: '/ORBITALE/11_PISCINA-03.webp', alt: 'Piscina Externa — 3' },
      { src: '/ORBITALE/08_FITNESS-01.webp', alt: 'Fitness' },
      { src: '/ORBITALE/08_FITNESS-02.webp', alt: 'Fitness — 2' },
      { src: '/ORBITALE/08_FITNESS-03.webp', alt: 'Fitness Externo' },
      { src: '/ORBITALE/06_SAUNA-01.webp', alt: 'Sauna Seca' },
      { src: '/ORBITALE/07_SALADEMASSAGEM-01.webp', alt: 'Sala de Massagem' },
      { src: '/ORBITALE/04_KIDS-01.webp', alt: 'Espaço Kids' },
      { src: '/ORBITALE/04_KIDS-02.webp', alt: 'Espaço Kids — 2' },
      { src: '/ORBITALE/04_KIDS-03.webp', alt: 'Espaço Kids — 3' },
      { src: '/ORBITALE/09_PLAYGROUND-01.webp', alt: 'Playground' },
      { src: '/ORBITALE/09_PLAYGROUND-02.webp', alt: 'Playground — 2' },
      { src: '/ORBITALE/10_PETPLACE-01.webp', alt: 'Pet Place' },
    ],
  },
  {
    label: 'Decorado',
    images: Array.from({ length: 23 }, (_, i) => ({
      src: `/ORBITALE/Decorado Orbitale-${i + 1}.webp`,
      alt: `Apartamento Decorado — ${i + 1}`,
    })),
  },
];

// ─── PLANTS ──────────────────────────────────────────────────────────────────
const plantCategories = [
  {
    label: 'Apartamento Tipo A',
    images: [
      { src: '/ORBITALE/plantas/PLARE_23_Apto_A_-_Layout_Padrao_P4_HIGH.webp', alt: 'Tipo A — Layout Padrão — 230,94 m²' },
      { src: '/ORBITALE/plantas/PLARE_21_Apto_A_-_Layout_com_3_Su-tes_-_Dorm._Servi-o_P4_HIGH.webp', alt: 'Tipo A — 3 Suítes + Dorm. Serviço — 230,94 m²' },
      { src: '/ORBITALE/plantas/PLARE_22_Apto_A_-_Layout_com_Su-te_Master_Estendida_-_Adega_P4_HIGH.webp', alt: 'Tipo A — Suíte Master Estendida + Adega — 230,94 m²' },
    ],
  },
  {
    label: 'Garden / Rooftop / Terraços',
    images: [
      { src: '/ORBITALE/plantas/PLARE_24_Apto_B_Garden_Pav02_P4_HIGH.webp', alt: 'Garden B — 397,10 m² (165,57 m² de garden)' },
      { src: '/ORBITALE/plantas/PLARE_29_Garden_2_P4_HIGH.webp', alt: 'Garden A — 502,86 m² (270,80 m² de garden)' },
      { src: '/ORBITALE/plantas/PLARE_25_Apto_A_Cobertura_Inferior_P4_HIGH.webp', alt: 'Rooftop A — Pavimento Inferior — 366,69 m²' },
      { src: '/ORBITALE/plantas/PLARE_26_Cobertura_Rooftop_P4_HIGH_-1-.webp', alt: 'Rooftop A — Terraço — 133,56 m²' },
      { src: '/ORBITALE/plantas/PLARE_31_Cobertura_Inferior_2_P4_HIGH.webp', alt: 'Rooftop B — Pavimento Inferior — 394,53 m²' },
      { src: '/ORBITALE/plantas/PLARE_30_Cobertura_Rooftop_2_P4_HIGH_-1-.webp', alt: 'Rooftop B — Terraço — 169,06 m²' },
    ],
  },
  {
    label: 'Implantação / Subsolos',
    images: [
      { src: '/ORBITALE/plantas/PLARE_20_Pav._Terreo_P4_HIGH.webp', alt: 'Implantação — Térreo' },
      { src: '/ORBITALE/plantas/PLARE_27_Subsolo_1_P4_HIGH (3).webp', alt: 'Subsolo 1' },
      { src: '/ORBITALE/plantas/PLARE_28_Subsolo_2_P4_HIGH_-2-.webp', alt: 'Subsolo 2' },
    ],
  },
];

const diferenciais = [
  'Piscina coberta com raia de 20 m',
  'Piscina externa adulto e infantil aquecida',
  'Fitness + Fitness Externo',
  'Salão de Festas',
  'Espaço Kids',
  'Sala de Massagem',
  'Sauna Seca',
  'Playground',
  'Pet Place',
  'Bicicletário',
  'Sala de Encomendas',
  'Guarita blindada',
  'Elevador privativo por andar',
  '3 vagas de garagem + depósito',
  'Gerador para apartamento',
  'Espera para carregador elétrico',
];

const tipologias = [
  { tipo: 'Apartamento Tipo A', area: '230,94 – 238,43 m²', unidades: '22 unid.', detalhe: 'Finais 1 e 2' },
  { tipo: 'Garden A', area: '502,86 m²', unidades: '1 unid.', detalhe: '270,80 m² de garden' },
  { tipo: 'Garden B', area: '397,10 m²', unidades: '1 unid.', detalhe: '165,57 m² de garden' },
  { tipo: 'Rooftop Privativo A', area: '366,69 m²', unidades: '1 unid.', detalhe: '133,56 m² de terraço' },
  { tipo: 'Rooftop Privativo B', area: '394,53 m²', unidades: '1 unid.', detalhe: '169,06 m² de terraço' },
];

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function OrbitaleHomePageClient() {
  return (
    <div className="bg-background min-h-screen">
      <CommunityPopup />

      {/* HEADER */}
      <ProductHeader />

      {/* HERO */}
      <section className="relative h-[70vh] flex items-end pb-16 text-white">
        <div className="absolute inset-0">
          <Image src="/ORBITALE/01_FACHADA-01.webp" alt="ORBITALE Petrópolis" fill className="object-cover" style={{ objectPosition: 'center 75%' }} priority />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/70" />
        </div>
        <div className="relative z-10 container">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-white/70 mb-3">
            Petrópolis · Porto Alegre
          </p>
          <span className="inline-block mb-3 px-3 py-1 rounded-full bg-green-500/90 text-white text-xs font-semibold tracking-wide">✓ Pronto para morar</span>
          <Image src="/ORBITALE/logo_orbitale.png" alt="ORBITALE" width={240} height={80}
            className="brightness-0 invert mb-4" />
          <p className="text-white/80 text-base max-w-md leading-relaxed">
            Uma joia em forma de edifício. Arquitetura que desafia as formas e lapida cada detalhe em um diamante.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <div className="container relative z-10 -mt-8 pb-16 space-y-2">

        {/* CHAMADA */}
        <div className="bg-primary text-primary-foreground rounded-2xl px-8 py-6 text-center">
          <p className="text-lg font-semibold tracking-wide">A Singularidade dos Detalhes</p>
          <p className="text-primary-foreground/80 text-sm mt-1">Plaenge · Rua Regente, 152 · Petrópolis · Porto Alegre</p>
        </div>

        {/* SOBRE */}
        <div className="bg-card rounded-2xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-5">
              <div>
                <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-2">Sobre o Empreendimento</p>
                <h2 className="font-display text-4xl md:text-5xl text-foreground leading-tight mb-4">
                  Seu mundo em Porto Alegre
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Nosso mundo é um lugar que apenas nós conhecemos. Um espaço só nosso planejado para integrar
                  vivências e compartilhar momentos. Moderno e aconchegante, que faz com que você se sinta completo.
                </p>
              </div>
              <div className="pt-2 border-t space-y-3">
                {[
                  { label: 'Arquitetura', value: 'Studio Ronaldo Rezende' },
                  { label: 'Interiores', value: 'Bohrer Arquitetos' },
                  { label: 'Paisagismo', value: 'Tellini Vontobel' },
                  { label: 'Iluminação', value: 'Studio Fos' },
                  { label: 'Endereço', value: 'Rua Regente, 152 — Petrópolis' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex gap-3 text-sm">
                    <span className="text-muted-foreground w-28 flex-shrink-0">{label}</span>
                    <span className="font-medium text-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-96 rounded-xl overflow-hidden">
              <Image src="/ORBITALE/01_FACHADA-02.webp" alt="Fachada ORBITALE" fill className="object-cover" sizes="600px" />
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
                  <th className="text-left pb-3 text-muted-foreground font-normal">Área Total</th>
                  <th className="text-left pb-3 text-muted-foreground font-normal">Unidades</th>
                  <th className="text-left pb-3 text-muted-foreground font-normal">Detalhe</th>
                </tr>
              </thead>
              <tbody>
                {tipologias.map((t, i) => (
                  <tr key={i} className="border-b last:border-0">
                    <td className="py-3 font-medium text-foreground">{t.tipo}</td>
                    <td className="py-3 text-primary font-semibold">{t.area}</td>
                    <td className="py-3 text-muted-foreground">{t.unidades}</td>
                    <td className="py-3 text-muted-foreground text-xs">{t.detalhe}</td>
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
            <h2 className="font-display text-2xl text-foreground">O que o ORBITALE oferece</h2>
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
            <h2 className="font-display text-2xl text-foreground">Petrópolis</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Um dos bairros mais nobres de Porto Alegre, com ruas arborizadas, próximo ao Shopping Iguatemi,
              PUCRS, Country Club e à Praça do Sol.
            </p>
            <div className="rounded-xl overflow-hidden border" style={{ height: '280px' }}>
              <iframe
                src="https://maps.google.com/maps?q=Rua+Regente,+152,+Petrópolis,+Porto+Alegre&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%" height="100%" style={{ border: 0 }} loading="lazy"
                title="Localização ORBITALE" />
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

      {/* FOOTER */}
      <footer className="border-t py-8 text-center text-xs text-muted-foreground space-y-1">
        <p className="font-medium">ORBITALE · Plaenge</p>
        <p>Rua Regente, 152 — Petrópolis, Porto Alegre, RS</p>

      <WhatsappButton product="ORBITALE" />
      </footer>

    </div>
  );
}
