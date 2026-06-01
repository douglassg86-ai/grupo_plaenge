'use client';

import Image from 'next/image';
import { useState } from 'react';
import UnitGrid from '@/components/edition/unit-grid';
import CommunityPopup from '@/components/wave/community-popup';

const gallery = [
  { src: '/EDITION/JAC_01_Fachada_A_EF2.webp', alt: 'Fachada Torre Jardim Cristofel' },
  { src: '/EDITION/JAC_02_Fachada_B_EF2.webp', alt: 'Fachada Torre Doutor Vale' },
  { src: '/EDITION/JAC_03_Acesso_A_EF.webp', alt: 'Acesso' },
  { src: '/EDITION/JAC_07_Piscina_A_EF2.webp', alt: 'Piscina Externa' },
  { src: '/EDITION/JAC_17_Lobby_EF.webp', alt: 'Lobby' },
  { src: '/EDITION/JAC_18_Festas_A_EF.webp', alt: 'Salão de Festas' },
  { src: '/EDITION/JAC_20_Piscina_Interna_EF.webp', alt: 'Piscina Interna' },
  { src: '/EDITION/JAC_25_Fitness_A_EF.webp', alt: 'Fitness' },
];

const diferenciais = [
  'Elevador privativo por unidade',
  'Piscina interna e externa',
  'Wine Garden',
  'Salão de Festas',
  'Fitness',
  'Beauty Space',
  'Espaço Kids & Playground',
  'Sala de Massagem e Sauna',
  'Passarela panorâmica',
];

export default function EditionHomePageClient() {
  const [activeImg, setActiveImg] = useState(0);

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <CommunityPopup />

      {/* Header */}
      <header className="py-4 absolute top-0 left-0 w-full z-10">
        <div className="container flex justify-center">
          <Image
            src="/INSTITUCIONAL/logo_grupo_plaenge.png"
            alt="Grupo Plaenge"
            width={150}
            height={40}
          />
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative h-[50vh] md:h-[60vh] flex items-center justify-center text-center text-white">
          <div className="absolute inset-0">
            <Image
              src="/EDITION/JAC_31_Voo_Passaro_EF_v2.webp"
              alt="EDITION Moinhos vista aérea"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          <div className="relative z-10 px-4 space-y-4">
            <Image
              src="/EDITION/logo_edition.png"
              alt="EDITION Moinhos"
              width={200}
              height={80}
              className="mx-auto brightness-0 invert"
            />
            <p className="text-lg font-light tracking-widest uppercase">Moinhos de Vento · Porto Alegre</p>
          </div>
        </section>

        {/* Content card */}
        <div className="container py-10 md:py-16 -mt-16 relative z-10">
          <div className="bg-card rounded-lg shadow-2xl p-4 md:p-8 space-y-12">

            {/* Chamada */}
            <p className="text-center font-semibold text-primary text-lg md:text-xl">
              Vida Ilimitada — uma edição limitada e única de elegância e exclusividade no Moinhos de Vento.
            </p>

            {/* Sobre */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <h2 className="font-display text-3xl text-foreground">Arquitetura Atemporal</h2>
                <p>
                  Arquitetura atemporal, paisagismo fluido, design puro. A harmonia perfeita entre
                  detalhes que se complementam e promovem uma experiência espacial surpreendente.
                </p>
                <p>
                  Projeto arquitetônico assinado pelo <strong className="text-foreground">Studio Ronaldo Rezende</strong>,
                  interiores pelo <strong className="text-foreground">LW Design Group</strong> (Dubai · São Paulo)
                  e paisagismo pela <strong className="text-foreground">Tellini Vontobel</strong>.
                </p>
              </div>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src="/EDITION/JAC_32_Detalhe_Fachada_EF2.webp"
                  alt="Detalhe fachada EDITION"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Galeria */}
            <div className="space-y-4">
              <h2 className="font-display text-3xl text-center">Imagens do Empreendimento</h2>
              <div className="relative aspect-[16/9] rounded-lg overflow-hidden">
                <Image
                  src={gallery[activeImg].src}
                  alt={gallery[activeImg].alt}
                  fill
                  className="object-cover transition-all duration-500"
                />
              </div>
              <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
                {gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`relative aspect-square rounded overflow-hidden border-2 transition-colors ${
                      activeImg === i ? 'border-primary' : 'border-transparent'
                    }`}
                  >
                    <Image src={img.src} alt={img.alt} fill className="object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Localização + Vídeo */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <h2 className="font-display text-2xl">Localização</h2>
                <p className="text-muted-foreground text-sm">
                  Moinhos de Vento é um dos bairros mais nobres de Porto Alegre, com ruas arborizadas,
                  gastronomia de alto padrão e o icônico Parque Moinhos de Vento a passos do empreendimento.
                </p>
                <div className="rounded-lg overflow-hidden border aspect-[4/3]">
                  <iframe
                    src="https://maps.google.com/maps?q=Rua+Jardim+Cristofel,+Porto+Alegre&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <h2 className="font-display text-2xl">Diferenciais</h2>
                <ul className="space-y-2">
                  {diferenciais.map((d) => (
                    <li key={d} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Ficha Técnica */}
            <div className="bg-muted/50 rounded-lg p-6 space-y-4">
              <h2 className="font-display text-2xl text-center">Ficha Técnica</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-center">
                {[
                  { label: 'Torres', value: '2' },
                  { label: 'Pavimentos', value: 'Até 17' },
                  { label: 'Tipologias', value: '146 – 545 m²' },
                  { label: 'Construtora', value: 'Plaenge' },
                ].map(({ label, value }) => (
                  <div key={label} className="space-y-1">
                    <p className="text-muted-foreground text-xs uppercase tracking-wider">{label}</p>
                    <p className="font-semibold text-foreground">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Disponibilidade */}
            <div className="space-y-4">
              <h2 className="font-display text-3xl text-center">Disponibilidade</h2>
              <UnitGrid />
            </div>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-8 text-muted-foreground text-xs border-t mt-8">
        <p>EDITION Moinhos · Plaenge Empreendimentos Ltda.</p>
        <p className="mt-1">Incorporação registrada conforme R-1/218.732 da 1ª Zona de Porto Alegre.</p>
      </footer>
    </div>
  );
}
