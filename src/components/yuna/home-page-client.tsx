'use client';

import { WhatsappButton } from '@/components/whatsapp-button'
import Image from 'next/image';
import { useState } from 'react';
import UnitGrid from '@/components/yuna/unit-grid';
import { GalleryViewer } from '@/components/shared/gallery-viewer';
import { PlantsViewer } from '@/components/shared/plants-viewer';
import { ProductHeader } from '@/components/shared/product-header';
import { ProductLinks } from '@/components/shared/product-links';

const LINKS_CONFIG = {
  tabela: 'https://drive.google.com/open?id=1bCteAFZM13jHQTTX1MrB-Cdiyh8_VJzX&usp=drive_fs',
  book: 'https://drive.google.com/open?id=1z2VaBjxZ0oCWFU-7F9R-IJNhopOijY5t&usp=drive_fs',
  imagens: 'https://drive.google.com/open?id=1z0m41I9WZ5rSDVuu0mQ-TXuIvqZjpVr_&usp=drive_fs',
  video: 'https://drive.google.com/open?id=1CTC8Vm9x8GOJPGlisLou5bBAlc8499CP&usp=drive_fs',
  site: 'https://www.vanguard.com.br/porto-alegre/yuna',
  clienteSlug: 'yuna',
};

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
      { src: `${P}/plantas/04_VAN_PARECI_APTO_3_DORM_EF.webp`, alt: 'Unidade II — 88,68 m²' },
      { src: `${P}/plantas/04_VAN_PARECI_APTO_3_DORM_EF_COTAS.webp`, alt: 'Unidade II — Cotas — 88,68 m²' },
      { src: `${P}/plantas/06_VAN_PARECI_APTO_3_DORM_OP_EF.webp`, alt: 'Unidade II — Opção — 88,68 m²' },
      { src: `${P}/plantas/06_VAN_PARECI_APTO_3_DORM_OP_EF_COTAS.webp`, alt: 'Unidade II — Opção Cotas — 88,68 m²' },
      { src: `${P}/plantas/07_VAN_PARECI_APTO_3_DORM_OP_LIVING_EF.webp`, alt: 'Unidade II — Living Estendido' },
      { src: `${P}/plantas/07_VAN_PARECI_APTO_3_DORM_OP_LIVING_EF_COTAS.webp`, alt: 'Unidade II — Living Estendido Cotas' },
    ],
  },
  {
    label: 'Unidade III — 72,58 m²',
    images: [
      { src: `${P}/plantas/03_VAN_PARECI_APTO_2_DORM_Ef.webp`, alt: 'Unidade III — 72,58 m²' },
      { src: `${P}/plantas/03_VAN_PARECI_APTO_2_DORM_Ef_COTAS.webp`, alt: 'Unidade III — Cotas — 72,58 m²' },
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

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function YunaHomePageClient({ isClientePage = false }: { isClientePage?: boolean }) {
  return (
    <div className="bg-background min-h-screen">
      {/* HEADER */}
      <ProductHeader hideNav={isClientePage} />

      {/* HERO */}
      <section className="relative h-[70vh] flex items-end pb-16 text-white">
        <div className="absolute inset-0">
          <Image src={`${P}/IMG-20240704-WA0031.webp`} alt="YUNA Jardim Botânico" fill className="object-cover" style={{ objectPosition: 'center 70%' }} priority />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/70" />
        </div>
        <div className="relative z-10 container">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-white/70 mb-3">
            Jardim Botânico · Porto Alegre
          </p>
          <span className="inline-block mb-3 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold tracking-wide backdrop-blur-sm">Previsão de entrega: Novembro 2027</span>
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

        {/* ── MATERIAIS (corretor) — logo após o Sobre ── */}
        {!isClientePage && <ProductLinks config={LINKS_CONFIG} />}

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
          <GalleryViewer categories={galleryCategories} />
        </div>

        {/* PLANTAS */}
        <div className="bg-card rounded-2xl p-8">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-6 text-center">Plantas</p>
          <PlantsViewer categories={plantCategories} />
        </div>

        {/* VÍDEO */}
        <div className="bg-card rounded-2xl p-8 space-y-4">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-2">Vídeo</p>
          <h2 className="font-display text-3xl text-foreground">Conheça o YUNA</h2>
          <div className="aspect-video w-full overflow-hidden rounded-xl border">
            <iframe src="https://www.youtube.com/embed/joyIU3Bn1G4" title="YUNA Jardim Botânico" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full h-full" style={{ border: 0 }} />
          </div>
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

        {!isClientePage && (
          <>
            {/* DISPONIBILIDADE */}
            <div className="bg-card rounded-2xl p-8">
              <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-6 text-center">Disponibilidade</p>
              <UnitGrid />
            </div>

            {/* IMPLANTAÇÃO DAS UNIDADES */}
            <div className="bg-card rounded-2xl p-8">
              <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-6 text-center">Implantação das Unidades</p>
              <PlantsViewer categories={[{ label: 'Implantação', images: [
                { src: `${P}/implantacoes/yuna-01.png`, alt: 'Implantação — Posição das Unidades 1' },
                { src: `${P}/implantacoes/yuna-02.png`, alt: 'Implantação — Posição das Unidades 2' },
                { src: `${P}/implantacoes/yuna-03.png`, alt: 'Implantação — Posição das Unidades 3' },
              ]}]} />
            </div>
          </>
        )}

      </div>

      {/* FOOTER */}
      <footer className="border-t py-8 text-center text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} Vanguard · Grupo Plaenge · YUNA Jardim Botânico · Porto Alegre</p>

      {!isClientePage && <WhatsappButton product="YUNA Jardim Botânico" />}
      </footer>

    </div>
  );
}
