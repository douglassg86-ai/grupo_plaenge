'use client';

import Image from 'next/image';
import { useState } from 'react';
import UnitGrid from '@/components/mood/unit-grid';
import CommunityPopup from '@/components/wave/community-popup';
import { GalleryViewer } from '@/components/shared/gallery-viewer';
import { PlantsViewer } from '@/components/shared/plants-viewer';
import { ProductHeader } from '@/components/shared/product-header';

// ─── GALLERY ─────────────────────────────────────────────────────────────────
const galleryCategories = [
  {
    label: 'Fachada',
    images: [
      { src: '/MOOD/01_fachada-02.webp', alt: 'Fachada — Rua José Albano Volkmer' },
      { src: '/MOOD/01_fachada-05.webp', alt: 'Fachada — Vista 2' },
      { src: '/MOOD/01_fachada-06.webp', alt: 'Fachada — Vista 3' },
      { src: '/MOOD/01_fachada-07.webp', alt: 'Acesso e Porte-Cochère' },
    ],
  },
  {
    label: 'Lazer',
    images: [
      { src: '/MOOD/08_piscina-01.webp', alt: 'Piscina' },
      { src: '/MOOD/08_piscina-02.webp', alt: 'Piscina — Vista 2' },
      { src: '/MOOD/09_beachtennis-01.webp', alt: 'Beach Tennis' },
      { src: '/MOOD/11_freshliving-01.webp', alt: 'Fresh Living' },
      { src: '/MOOD/11_freshliving-03.webp', alt: 'Fresh Living — 2' },
      { src: '/MOOD/11_freshliving-05.webp', alt: 'Fresh Living — 3' },
      { src: '/MOOD/07_fitness-01.webp', alt: 'Fitness' },
      { src: '/MOOD/07_fitness-02.webp', alt: 'Fitness — 2' },
    ],
  },
  {
    label: 'Espaços Sociais',
    images: [
      { src: '/MOOD/02_lobby-01.webp', alt: 'Lobby' },
      { src: '/MOOD/02_lobby-02.webp', alt: 'Lobby — 2' },
      { src: '/MOOD/03_coworking-01.webp', alt: 'Coworking' },
      { src: '/MOOD/04_partyroom-01.webp', alt: 'Party Room' },
      { src: '/MOOD/04_partyroom-03.webp', alt: 'Party Room — 2' },
      { src: '/MOOD/04_partyroom-04.webp', alt: 'Party Room — 3' },
      { src: '/MOOD/05_gourmet-01.webp', alt: 'Gourmet' },
      { src: '/MOOD/06_pub-01.webp', alt: 'Pub' },
    ],
  },
];

const plantCategories = [
  {
    label: 'Plantas',
    images: [
      { src: '/MOOD/plantas/IMG_9733.webp', alt: 'Studio — 30 m² (Finais 01 e 03)' },
      { src: '/MOOD/plantas/IMG_9734.webp', alt: 'Studio+ — 42 m² (Final 04)' },
      { src: '/MOOD/plantas/IMG_9735.webp', alt: '1 Suíte — 56 m² (Final 02)' },
      { src: '/MOOD/plantas/IMG_9736.webp', alt: '1 Suíte+ — 65 m² (Final 05)' },
    ],
  },
];

const diferenciais = [
  'Guarita com 2 pulmões de acesso',
  'Market Store',
  'Delivery Room',
  'Coworking',
  'Lobby',
  'Pub',
  'Fitness + Fitness Outdoor',
  'Zen Space',
  'Party Room',
  'Fresh Living',
  'Piscina',
  'Pet Place',
  'Laundry',
  'Gourmet',
];

const tipologias = [
  { tipo: 'Studio', area: '29 m²', unidades: '108 unid.', finais: 'Finais 06–14' },
  { tipo: 'Studio', area: '30 m²', unidades: '48 unid.', finais: 'Finais 01, 03, 15 e 16' },
  { tipo: 'Studio+', area: '42 m²', unidades: '12 unid.', finais: 'Final 04' },
  { tipo: '1 Suíte', area: '56 m²', unidades: '12 unid.', finais: 'Final 02' },
  { tipo: '1 Suíte+', area: '65 m²', unidades: '12 unid.', finais: 'Final 05' },
];

// ─── GALLERY COMPONENT ────────────────────────────────────────────────────────
function Gallery() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeImg, setActiveImg] = useState(0);
  const images = galleryCategories[activeCategory].images;

  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        {galleryCategories.map((cat, i) => (
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

// ─── PLANTS COMPONENT ─────────────────────────────────────────────────────────
function Plants() {
  const [activeImg, setActiveImg] = useState(0);
  const images = plantCategories[0].images;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {images.map((img, i) => (
          <button key={i} onClick={() => setActiveImg(i)}
            className={`relative rounded-lg overflow-hidden border-2 transition-all bg-muted ${
              activeImg === i ? 'border-primary' : 'border-transparent hover:border-border'}`}
            style={{ paddingBottom: '75%', height: 0, position: 'relative' }}>
            <Image src={img.src} alt={img.alt} fill className="object-contain p-1" sizes="300px" />
            <div className="absolute bottom-0 left-0 right-0 bg-black/40 px-2 py-1">
              <p className="text-white text-xs text-center truncate">{img.alt}</p>
            </div>
          </button>
        ))}
      </div>
      <div className="relative w-full bg-white rounded-xl border overflow-hidden" style={{ height: '520px' }}>
        <Image src={images[activeImg].src} alt={images[activeImg].alt} fill
          className="object-contain p-4" sizes="(max-width: 768px) 100vw, 1200px" />
      </div>
      <p className="text-center text-sm text-muted-foreground">{images[activeImg].alt}</p>
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function MoodHomePageClient() {
  return (
    <div className="bg-background min-h-screen">
      <CommunityPopup />

      {/* HEADER */}
      <ProductHeader />

      {/* HERO */}
      <section className="relative h-[70vh] flex items-end pb-16 text-white">
        <div className="absolute inset-0">
          <Image src="/MOOD/01_fachada-07.webp" alt="MOOD Central Parque" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/70" />
        </div>
        <div className="relative z-10 container">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-white/70 mb-3">
            Central Parque · Porto Alegre
          </p>
          <span className="inline-block mb-3 px-3 py-1 rounded-full bg-green-500/90 text-white text-xs font-semibold tracking-wide">✓ Pronto para morar</span>
          <Image src="/MOOD/logo_mood.png" alt="MOOD Central Parque" width={220} height={80}
            className="brightness-0 invert mb-4" />
          <p className="text-white/80 text-base max-w-md leading-relaxed">
            O que te define também te move. Inteligente, conectado e completo — para uma vida sem desperdício de tempo.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <div className="container relative z-10 -mt-8 pb-16 space-y-2">

        {/* CHAMADA */}
        <div className="bg-primary text-primary-foreground rounded-2xl px-8 py-6 text-center">
          <p className="text-lg font-semibold tracking-wide">Qual o seu mood?</p>
          <p className="text-primary-foreground/80 text-sm mt-1">Vanguard + TGD · Central Parque · Porto Alegre</p>
        </div>

        {/* SOBRE */}
        <div className="bg-card rounded-2xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-5">
              <div>
                <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-2">Sobre o Empreendimento</p>
                <h2 className="font-display text-4xl md:text-5xl text-foreground leading-tight mb-4">
                  Um estilo inteligente de morar
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  O MOOD Central Parque é o primeiro empreendimento da parceria Vanguard e TGD.
                  Ele tem a cara e o jeito do seu usuário — sempre atento a mudanças, com uma rotina
                  descomplicada e adaptável a todos os momentos da vida.
                </p>
              </div>
              <div className="pt-2 border-t space-y-3">
                {[
                  { label: 'Incorporadora', value: 'Vanguard + TGD' },
                  { label: 'Arquitetura', value: 'Estudio Pretto' },
                  { label: 'Endereço', value: 'Rua São Josemaría Escrivá, 585' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex gap-3 text-sm">
                    <span className="text-muted-foreground w-28 flex-shrink-0">{label}</span>
                    <span className="font-medium text-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-96 rounded-xl overflow-hidden">
              <Image src="/MOOD/01_fachada-02.webp" alt="Fachada MOOD Central Parque" fill className="object-cover" sizes="600px" />
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
                  <th className="text-left pb-3 text-muted-foreground font-normal">Finais</th>
                </tr>
              </thead>
              <tbody>
                {tipologias.map((t, i) => (
                  <tr key={i} className="border-b last:border-0">
                    <td className="py-3 font-medium text-foreground">{t.tipo}</td>
                    <td className="py-3 text-primary font-semibold">{t.area}</td>
                    <td className="py-3 text-muted-foreground">{t.unidades}</td>
                    <td className="py-3 text-muted-foreground text-xs">{t.finais}</td>
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
          <Gallery />
        </div>

        {/* PLANTAS */}
        <div className="bg-card rounded-2xl p-8 md:p-10">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-2">Plantas</p>
          <h2 className="font-display text-3xl text-foreground mb-6">Tipologias</h2>
          <Plants />
        </div>

        {/* DIFERENCIAIS + LOCALIZAÇÃO */}
        <div className="grid md:grid-cols-2 gap-2">
          <div className="bg-card rounded-2xl p-8 space-y-4">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary">Áreas de Lazer</p>
            <h2 className="font-display text-2xl text-foreground">Tudo que você precisa</h2>
            <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 pt-1">
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
            <h2 className="font-display text-2xl text-foreground">Central Parque</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Cercado por área verde, próximo ao Jardim Botânico, PUCRS e à avenida Carlos Gomes.
              Ruas para curtir a pé ou de bike, com segurança 24 horas.
            </p>
            <div className="rounded-xl overflow-hidden border" style={{ height: '280px' }}>
              <iframe
                src="https://maps.google.com/maps?q=Rua+São+Josemaría+Escrivá,+585,+Porto+Alegre&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%" height="100%" style={{ border: 0 }} loading="lazy"
                title="Localização MOOD Central Parque" />
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
        <p className="font-medium">MOOD Central Parque · Vanguard + TGD</p>
        <p>Rua São Josemaría Escrivá, 585 — Central Parque, Porto Alegre, RS</p>
      </footer>
    </div>
  );
}
