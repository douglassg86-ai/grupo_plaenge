'use client';

import { WhatsappButton } from '@/components/whatsapp-button'
import Image from 'next/image';
import { useState } from 'react';
import UnitGrid from '@/components/synthe/unit-grid';
import { GalleryViewer } from '@/components/shared/gallery-viewer';
import { PlantsViewer } from '@/components/shared/plants-viewer';
import { ProductHeader } from '@/components/shared/product-header';
import { ProductLinks } from '@/components/shared/product-links';
import { ConvitePopup } from '@/components/synthe/convite-popup';

const LINKS_CONFIG = {
  tabela:        'https://drive.google.com/open?id=1EloA34inI_S0FGE03BY9QVaKpZTJerww&usp=drive_fs',
  book:          'https://drive.google.com/open?id=1netjJDKzSz8VPgROc3ZoMloFPSv07O7m&usp=drive_fs',
  imagens:       'https://drive.google.com/open?id=1Q6LpU-LPMwxZtdbbHb7E3XX1u24UD3o0&usp=drive_fs',
  plantas:       'https://drive.google.com/open?id=1WLV6OkYCJRBoeKZGakO1Mvupy_0cdhgC&usp=drive_fs',
  fotosDecorado: 'https://drive.google.com/open?id=1cUR5dU96rq85x5pyEMsN693EjHeu2Miw&usp=drive_fs',
  reels:         'https://drive.google.com/open?id=16p4XzKKraSWvwPGLsuJ7Wig07xhE7_ZS&usp=drive_fs',
  video:         'https://drive.google.com/open?id=1V88BFKdVAGjAcMPyECIg0t1_4SCNPmr7&usp=drive_fs',
  clienteSlug:   'synthe',
};

const P = '/SYNTHE';

// ─── GALLERY ─────────────────────────────────────────────────────────────────
const galleryCategories = [
  {
    label: 'Fachada',
    images: [
      { src: `${P}/©VISTA_02_EXT_FACHADA_DIURNA_FINAL.webp`, alt: 'Fachada Diurna' },
      { src: `${P}/©VISTA_03_EXT_FACHADA_DETALHE_01_FINAL.webp`, alt: 'Detalhe Fachada 1' },
      { src: `${P}/©VISTA_04_EXT_FACHADA_DETALHE_02_FINAL.webp`, alt: 'Detalhe Fachada 2' },
      { src: `${P}/©VISTA_05_EXT_ACESSO_EXTERNO_OBSERVADOR_FINAL.webp`, alt: 'Acesso Externo' },
      { src: `${P}/©VISTA_06_EXT_INSERCAO_FINAL.webp`, alt: 'Inserção Urbana' },
    ],
  },
  {
    label: 'Lazer',
    images: [
      { src: `${P}/©VISTA_07_EXT_PISCINA_FINAL.webp`, alt: 'Piscina' },
      { src: `${P}/©VISTA_01_INT_SALÃO_DE_FESTAS_02_FINAL.webp`, alt: 'Salão de Festas' },
      { src: `${P}/©VISTA_10_INT_SALÃO_DE_FESTAS_01_FINAL.webp`, alt: 'Salão de Festas — Vista 2' },
      { src: `${P}/©VISTA_12_INT_SALÃO_DE_FESTAS_03_FINAL.webp`, alt: 'Salão de Festas — Vista 3' },
      { src: `${P}/©VISTA_13_FITNESS_FINAL.webp`, alt: 'Fitness' },
      { src: `${P}/©VISTA_14_INT_ESPAÇO_KIDS_FINAL.webp`, alt: 'Espaço Kids' },
    ],
  },
  {
    label: 'Espaços Sociais',
    images: [
      { src: `${P}/©VISTA_11_HALL_FINAL_03_FINAL - HALL .webp`, alt: 'Hall' },
    ],
  },
  {
    label: 'Apartamento',
    images: [
      { src: `${P}/©VISTA_15_INT_APTO_TIPO_01_LIVING_01_FINAL.webp`, alt: 'Living — Vista 1' },
      { src: `${P}/©VISTA_16_INT_APTO_TIPO_01_LIVING_02_FINAL.webp`, alt: 'Living — Vista 2' },
    ],
  },
];

// ─── PLANTS ──────────────────────────────────────────────────────────────────
const plantCategories = [
  {
    label: 'Tipo 01 Padrão',
    images: [
      { src: `${P}/plantas/©VISTA_01_PLB_APARTAMENTO_TIPO_01_PADRAO_R03_COTAS_FINAL.webp`, alt: 'Apartamento Tipo 01 Padrão — 176,89 m²' },
    ],
  },
  {
    label: 'Cobertura (2 Pav.)',
    images: [
      { src: `${P}/plantas/©VISTA_02_PLB_APARTAMENTO_TIPO_02_(COBERTURA 2 PAV)_R04_COTAS_FINAL.webp`, alt: 'Penthouse — Cobertura 2 Pavimentos — 298 m²' },
    ],
  },
  {
    label: 'Tipo 01 Decorado',
    images: [
      { src: `${P}/plantas/©VISTA_06_PLB_APARTAMENTO_TIPO_01_(DECORADO)_R03_COTAS_FINAL.webp`, alt: 'Apartamento Tipo 01 — Decorado' },
    ],
  },
  {
    label: 'Tipo 01 c/ Office',
    images: [
      { src: `${P}/plantas/©VISTA_07_PLB_APARTAMENTO_TIPO_01_(OFFICE)_R04_COTAS_FINAL.webp`, alt: 'Apartamento Tipo 01 — Com Office' },
    ],
  },
  {
    label: 'Implantação',
    images: [
      { src: `${P}/plantas/©VISTA_03_PLB_IMPLANTAÇÃO_SUBSOLO_R03_FINAL.webp`, alt: 'Implantação — Subsolo' },
      { src: `${P}/plantas/©VISTA_04_PLB_IMPLANTAÇÃO_TÉRREO_R05_FINAL.webp`, alt: 'Implantação — Térreo' },
      { src: `${P}/plantas/©VISTA_05_PLB_IMPLANTAÇÃO_2PAV_R03_FINAL.webp`, alt: 'Implantação — 2º Pavimento' },
    ],
  },
];

const diferenciais = [
  '32 unidades — 2 por andar',
  'Hall privativo por andar',
  'Apartamentos de 172 m² a 298 m²',
  '3 suítes em todas as unidades',
  'Gerador pleno',
  'Espera para carregador elétrico',
  'Piscina',
  'Salão de Festas',
  'Fitness',
  'Brinquedoteca',
  'Playground',
  'Varanda e Copa condominiais',
  'Rooftop privativo nas coberturas',
];

const tipologias = [
  { tipo: 'Apartamento Tipo 01', area: '176,89 m²', unidades: '30 unid.', detalhe: '3 suítes · Hall privativo' },
  { tipo: 'Penthouse', area: '298 m²', unidades: '2 unid.', detalhe: '3 suítes · Rooftop privativo' },
];

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function SyntheHomePageClient({ isClientePage = false }: { isClientePage?: boolean }) {
  return (
    <div className="bg-background min-h-screen">
      {!isClientePage && <ConvitePopup />}
      {/* HEADER */}
      <ProductHeader hideNav={isClientePage} />

      {/* HERO */}
      <section className="relative h-[70vh] flex items-end pb-16 text-white">
        <div className="absolute inset-0">
          <Image src={`${P}/©VISTA_02_EXT_FACHADA_DIURNA_FINAL.webp`} alt="SYNTHÈ — Fachada" fill
            className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/70" />
        </div>
        <div className="relative z-10 container">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-white/70 mb-3">
            Mont'Serrat · Porto Alegre
          </p>
          <Image src={`${P}/logo.png`} alt="SYNTHÈ" width={200} height={60}
            className="brightness-0 invert mb-4" />
          <p className="text-white/80 text-base max-w-md leading-relaxed italic">
            A síntese do equilíbrio.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <div className="container relative z-10 -mt-8 pb-16 space-y-2">

        {/* BADGE PRÉ-LANÇAMENTO */}
        <div className="bg-primary text-primary-foreground rounded-2xl px-8 py-5 text-center">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-primary-foreground/60 mb-2">Pré-lançamento</p>
          <p className="text-lg font-semibold">Consulte valores e disponibilidade</p>
          <p className="text-primary-foreground/80 text-sm mt-1">com o seu Corretor / GP</p>
        </div>

        {/* BANNER CAMPANHA DE INCENTIVO — só para corretores */}
        {!isClientePage && (
          <div className="relative rounded-2xl overflow-hidden" style={{ background: '#111' }}>
            {/* Imagem do Cyberster */}
            <div className="absolute inset-0">
              <Image
                src={`${P}/carro-meta2-cyberster.webp`}
                alt="MG Cyberster"
                fill
                className="object-cover"
                sizes="100vw"
                style={{ objectPosition: 'center 50%', opacity: 0.35 }}
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.6) 55%, rgba(0,0,0,0.2) 100%)' }} />
            </div>
            {/* Conteúdo */}
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 px-8 py-7">
              <div className="flex-1">
                <p className="text-xs font-semibold tracking-[0.35em] uppercase mb-2" style={{ color: '#C1422A' }}>
                  Campanha de Incentivo · Pré-lançamento
                </p>
                <p className="text-white font-bold text-xl md:text-2xl leading-tight mb-1">
                  Venda e ganhe um carro elétrico.
                </p>
                <p className="text-white/60 text-sm leading-relaxed">
                  <span className="text-white/80 font-medium">Meta 1:</span> 10 unidades até 31/10/2026 →{' '}
                  <span className="text-white/80 font-medium">MG4 XPOWER</span>
                  {' · '}
                  <span className="text-white/80 font-medium">Meta 2:</span> 15 unidades →{' '}
                  <span className="text-white/80 font-medium">MG Cyberster</span>
                </p>
              </div>
              <a
                href="https://drive.google.com/open?id=1dSK7ztNZ6PpfywJYX-1IL-d7WftLPb6e&usp=drive_fs"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 px-6 py-3 rounded-full text-sm font-semibold transition-opacity hover:opacity-80 whitespace-nowrap"
                style={{ background: '#C1422A', color: '#fff' }}
              >
                Ver regulamento
              </a>
            </div>
          </div>
        )}

        {/* CHAMADA */}
        <div className="bg-primary text-primary-foreground rounded-2xl px-8 py-6 text-center">
          <p className="text-lg font-semibold tracking-wide">A Síntese do Equilíbrio</p>
          <p className="text-primary-foreground/80 text-sm mt-1">
            Plaenge · TGD · Rua Pedro Ivo, 550 · Mont'Serrat · Porto Alegre
          </p>
        </div>

        {/* SOBRE */}
        <div className="bg-card rounded-2xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-5">
              <div>
                <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-2">Sobre o Empreendimento</p>
                <h2 className="font-display text-4xl md:text-5xl text-foreground leading-tight mb-4">
                  Arquitetura em seu estado essencial.
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Um empreendimento que nasce da ideia de que qualidade não está em acumular atributos,
                  mas em definir prioridades. Cada escolha é pensada para concentrar valor, organizar o
                  espaço e dar clareza ao uso, evitando excessos que competem entre si.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Síntese não é soma. É a capacidade de filtrar até que permaneça apenas o que faz sentido.
                  É a simplicidade como o último grau de sofisticação. Precisão. Escolha. Equilíbrio.
                </p>
              </div>
              <div className="pt-2 border-t space-y-3">
                {[
                  { label: 'Incorporação', value: 'Plaenge · TGD' },
                  { label: 'Endereço', value: 'Rua Pedro Ivo, 550' },
                  { label: 'Bairro', value: "Mont'Serrat" },
                  { label: 'Cidade', value: 'Porto Alegre — RS' },
                  { label: 'Unidades', value: '32 · 2 por andar' },
                  { label: 'Áreas', value: '172 m² a 298 m²' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex gap-3 text-sm">
                    <span className="text-muted-foreground w-28 flex-shrink-0">{label}</span>
                    <span className="font-medium text-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-96 rounded-xl overflow-hidden">
              <Image src={`${P}/©VISTA_03_EXT_FACHADA_DETALHE_01_FINAL.webp`} alt="Detalhe Fachada SYNTHÈ"
                fill className="object-cover" sizes="600px" />
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

        {/* DIFERENCIAIS + LOCALIZAÇÃO */}
        <div className="grid md:grid-cols-2 gap-2">
          <div className="bg-card rounded-2xl p-8">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-6">Diferenciais</p>
            <ul className="space-y-2">
              {diferenciais.map((d, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-primary font-bold mt-0.5">✓</span>{d}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-card rounded-2xl p-8">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-6">Localização</p>
            <div className="space-y-4">
              <div className="text-sm space-y-1">
                <p className="font-medium text-foreground">Rua Pedro Ivo, 550 · Mont'Serrat · Porto Alegre — RS</p>
                <p className="text-muted-foreground">Uma localização que oferece conveniência sem ruído e conexão sem excesso. Próximo a William & Sons Coffee, Jean Pierre Patisserie, Zaffari Anita, Academia Body Tech e Paddock & Co Padaria Artesanal.</p>
              </div>
              <div className="rounded-xl overflow-hidden border" style={{ height: '280px' }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.5!2d-51.1950!3d-30.0320!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x951977!2sR.+Pedro+Ivo%2C+590+-+Petr%C3%B3polis%2C+Porto+Alegre+-+RS!5e0!3m2!1spt-BR!2sbr!4v1234567890"
                  width="100%" height="280" style={{ border: 0 }} allowFullScreen loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade" title="Localização SYNTHÈ"
                />
              </div>
            </div>
          </div>
        </div>

        {!isClientePage && (
          <>
            {/* DISPONIBILIDADE */}
            <div className="bg-card rounded-2xl p-8">
              <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-2 text-center">Mapa de Unidades</p>
              <p className="text-xs text-muted-foreground text-center mb-6">
                Pré-lançamento · Clique em uma unidade para cadastrar seu interesse
              </p>
              <UnitGrid />
            </div>
          </>
        )}

      </div>

      {/* FOOTER */}
      <footer className="border-t py-8 text-center text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} Plaenge · TGD · SYNTHÈ Mont'Serrat · Porto Alegre</p>

      {!isClientePage && <WhatsappButton product="SYNTHÈ" />}
      </footer>

    </div>
  );
}
