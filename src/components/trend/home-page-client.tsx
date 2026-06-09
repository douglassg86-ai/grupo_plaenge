'use client';

import { WhatsappButton } from '@/components/whatsapp-button'
import Image from 'next/image';
import { useState } from 'react';
import UnitGrid from '@/components/trend/unit-grid';
import CommunityPopup from '@/components/wave/community-popup';
import { GalleryViewer } from '@/components/shared/gallery-viewer';
import { PlantsViewer } from '@/components/shared/plants-viewer';
import { ImplantacaoFloorSelector } from '@/components/shared/implantacao-floor-selector';
import { ProductHeader } from '@/components/shared/product-header';

const P = '/TREND';

// ─── NANO IMPLANTAÇÃO POR PAVIMENTO ──────────────────────────────────────────
const nanoFloorPlans = [
  { label: '1º Pavimento', src: `${P}/implantacoes-nano/nano-01.jpg`, alt: 'Implantação Torre Nano — 1º Pavimento' },
  { label: '2º Pavimento', src: `${P}/implantacoes-nano/nano-02.jpg`, alt: 'Implantação Torre Nano — 2º Pavimento' },
  { label: '3º Pavimento', src: `${P}/implantacoes-nano/nano-03.jpg`, alt: 'Implantação Torre Nano — 3º Pavimento' },
  { label: '4º Pavimento', src: `${P}/implantacoes-nano/nano-04.jpg`, alt: 'Implantação Torre Nano — 4º Pavimento' },
  { label: '5º Pavimento', src: `${P}/implantacoes-nano/nano-05.jpg`, alt: 'Implantação Torre Nano — 5º Pavimento' },
  { label: '6º Pavimento', src: `${P}/implantacoes-nano/nano-06.jpg`, alt: 'Implantação Torre Nano — 6º Pavimento' },
  { label: '7º Pavimento', src: `${P}/implantacoes-nano/nano-07.jpg`, alt: 'Implantação Torre Nano — 7º Pavimento' },
  { label: '8º Pavimento', src: `${P}/implantacoes-nano/nano-08.jpg`, alt: 'Implantação Torre Nano — 8º Pavimento' },
  { label: '9º Pavimento', src: `${P}/implantacoes-nano/nano-09.jpg`, alt: 'Implantação Torre Nano — 9º Pavimento' },
];

// ─── HOME IMPLANTAÇÃO ─────────────────────────────────────────────────────────
const homeImplantacaoImages = [
  { src: `${P}/implantacoes-home/home-01.png`, alt: 'Implantação Downtown Home — 1' },
  { src: `${P}/implantacoes-home/home-02.png`, alt: 'Implantação Downtown Home — 2' },
  { src: `${P}/implantacoes-home/home-03.png`, alt: 'Implantação Downtown Home — 3' },
];

// ─── GALLERY ─────────────────────────────────────────────────────────────────
const galleryCategories = [
  {
    label: 'Complexo',
    images: [
      { src: `${P}/PNB_01_Fotomontagem_EF.webp`, alt: 'Fotomontagem — Complexo Trend Downtown' },
      { src: `${P}/PNB_02_Fachada_Azenha_EF.webp`, alt: 'Fachada — Av. Azenha' },
      { src: `${P}/PNB_03_Fachada_Lima_EF.webp`, alt: 'Fachada — Rua General Lima e Silva' },
    ],
  },
  {
    label: 'Downtown Home',
    images: [
      { src: `${P}/PNB_04_Fachada_Residencial_A_EF.webp`, alt: 'Fachada Residencial — Torre A' },
      { src: `${P}/PNB_05_Fachada_Residencial_B_EF.webp`, alt: 'Fachada Residencial — Torre B' },
      { src: `${P}/PNB_13_Residencial_Piscina_EF_V2.webp`, alt: 'Piscina' },
      { src: `${P}/PNB_14_Residencial_Kids_Externo_EF.webp`, alt: 'Kids Externo' },
      { src: `${P}/PNB_15_Residencial_Beach_Tennis_EF.webp`, alt: 'Beach Tennis' },
      { src: `${P}/PNB_16_Residencial_Quadra_Infantil_EF.webp`, alt: 'Quadra Infantil' },
      { src: `${P}/PNB_17_Residencial_Gourmet_Externo_EF.webp`, alt: 'Espaço Gourmet Externo' },
      { src: `${P}/PNB_18_Residencial_Espaco_Pet_EF.webp`, alt: 'Espaço Pet' },
      { src: `${P}/PNB_19_Residencial_Fitness_EF.webp`, alt: 'Fitness' },
      { src: `${P}/PNB_20_Residencial_Kids_EF.webp`, alt: 'Espaço Kids' },
      { src: `${P}/PNB_21_Residencial_Festas_A_EF.webp`, alt: 'Salão de Festas A' },
      { src: `${P}/PNB_22_Residencial_Festas_B_EF.webp`, alt: 'Salão de Festas B' },
      { src: `${P}/PNB_23_Residencial_Coworking_EF_v1.webp`, alt: 'Coworking' },
      { src: `${P}/PNB_23_Residencial_Coworking_EF_v2.webp`, alt: 'Coworking — Vista 2' },
      { src: `${P}/PNB_24_Residencial_Hall_EF.webp`, alt: 'Hall Residencial' },
      { src: `${P}/PNB_35_Residencial_Living_T1_Tipo_A_EF2.webp`, alt: 'Living — Torre 1 Tipo A' },
    ],
  },
  {
    label: 'Downtown Nano',
    images: [
      { src: `${P}/PNB_06_Fachada_Nano_EF.webp`, alt: 'Fachada Downtown Nano' },
      { src: `${P}/PNB_11_Nano_Rooftop_Piscina_EF.webp`, alt: 'Rooftop — Piscina' },
      { src: `${P}/PNB_12_Nano_Rooftop_Externo_EF.webp`, alt: 'Rooftop Externo' },
      { src: `${P}/PNB_25_Nano_Rooftop_Interno_EF.webp`, alt: 'Rooftop Interno' },
      { src: `${P}/PNB_26_Nano_Fitness_EF.webp`, alt: 'Fitness' },
      { src: `${P}/PNB_27_Nano_Hall_EF.webp`, alt: 'Hall Nano' },
      { src: `${P}/PNB_28_Nano_Lavanderia_EF.webp`, alt: 'Lavanderia Compartilhada' },
      { src: `${P}/PNB_34_Nano_Apartamento_EF.webp`, alt: 'Apartamento Studio' },
    ],
  },
  {
    label: 'Office & Mall',
    images: [
      { src: `${P}/PNB_07_Fachada_Office_EF.webp`, alt: 'Fachada Downtown Office' },
      { src: `${P}/PNB_08_Mall_Acesso_EF.webp`, alt: 'Mall — Acesso' },
      { src: `${P}/PNB_09_Mall_Interno_EF2.webp`, alt: 'Mall Interno' },
      { src: `${P}/PNB_10_Mall_Interno_B_EF.webp`, alt: 'Mall Interno — Vista 2' },
      { src: `${P}/PNB_29_Office_Hall_EF.webp`, alt: 'Office — Hall' },
      { src: `${P}/PNB_31_Office_Foyer_EF.webp`, alt: 'Office — Foyer' },
      { src: `${P}/PNB_32_Office_Sala_Escritorio_EF.webp`, alt: 'Office — Sala Escritório' },
      { src: `${P}/PNB_33_Office_Meia_Laje_EF.webp`, alt: 'Office — Meia Laje' },
    ],
  },
];

// ─── PLANTS ──────────────────────────────────────────────────────────────────
const plantCategories = [
  {
    label: 'Implantação',
    images: [
      { src: `${P}/plantas/PNB_PB_01_Implantacao_Terreo_EF.webp`, alt: 'Implantação — Térreo' },
      { src: `${P}/plantas/PNB_PB_01_Implantacao_Terreo_EF_com tracejado.webp`, alt: 'Implantação — Térreo c/ tracejado' },
      { src: `${P}/plantas/PNB_PB_02_Implantacao_2o_Pavimento_EF.webp`, alt: 'Implantação — 2º Pavimento' },
      { src: `${P}/plantas/PNB_PB_02_Implantacao_2o_Pavimento_EF_com tracejado.webp`, alt: 'Implantação — 2º Pav. c/ tracejado' },
    ],
  },
  {
    label: 'Home — Torre 1',
    images: [
      { src: `${P}/plantas/PNB_PB_03_Implantacao_3o_Pavimento_EF.webp`, alt: 'Implantação — 3º Pavimento' },
      { src: `${P}/plantas/PNB_PB_16_Planta_Residencial_T1A_Apto_01_EF.webp`, alt: '109,40 m²' },
      { src: `${P}/plantas/PNB_PB_20_Planta_Residencial_T1B_Apto_02_EF.webp`, alt: '88,84 m²' },
      { src: `${P}/plantas/PNB_PB_18_Planta_Residencial_T1A_Apto_04_EF_2.webp`, alt: '77,86 m²' },
    ],
  },
  {
    label: 'Nano — Studios',
    images: [
      { src: `${P}/plantas/PNB_PB_07_Planta_Nano_Apto_01A_EF.webp`, alt: 'Nano — Studio 01A — 32,70 m²' },
      { src: `${P}/plantas/PNB_PB_08_Planta_Nano_Apto_02B_EF.webp`, alt: 'Nano — Studio 02B — 32,06 m²' },
      { src: `${P}/plantas/PNB_PB_09_Planta_Nano_Apto_03B_EF.webp`, alt: 'Nano — Studio 03B — 34,72 m²' },
      { src: `${P}/plantas/PNB_PB_10_Planta_Nano_Apto_04_EF.webp`, alt: 'Nano — Studio 04 — 28,39 m²' },
      { src: `${P}/plantas/PNB_PB_11_Planta_Nano_Apto_05_EF.webp`, alt: 'Nano — Studio 05 — 23,63 m²' },
      { src: `${P}/plantas/PNB_PB_12_Planta_Nano_Apto_06_EF.webp`, alt: 'Nano — Studio 06 — 32,06 m²' },
      { src: `${P}/plantas/PNB_PB_13_Planta_Nano_Apto_07_EF.webp`, alt: 'Nano — Studio 07 — 23,63 m²' },
      { src: `${P}/plantas/PNB_PB_06_Planta_Rooftop_Nano_EF.webp`, alt: 'Nano — Rooftop' },
    ],
  },
  {
    label: 'Office',
    images: [
      { src: `${P}/plantas/PNB_PB_04_Planta_5o_Pavimento_Office_EF.webp`, alt: 'Office — 5º Pavimento — 294,88 m²' },
      { src: `${P}/plantas/PNB_PB_05_Planta_6o_Pavimento_Office_EF.webp`, alt: 'Office — 6º Pavimento — 498,95 m²' },
      { src: `${P}/plantas/PNB_PB_14_Planta_Office_Sala_02_EF.webp`, alt: 'Office — Sala 02 — 31,35 m²' },
      { src: `${P}/plantas/PNB_PB_15_Planta_Office_Sala_04_EF.webp`, alt: 'Office — Sala 04 — 34,72 m²' },
    ],
  },
];

const homeDiferenciais = [
  'Torre 1 lançada — Torre 2: futuro lançamento',
  'Apartamentos de 3 dormitórios com suíte',
  'Piscina descoberta',
  'Beach Tennis',
  'Fitness',
  'Espaço Kids interno e externo',
  'Salão de Festas A e B',
  'Espaço Gourmet Externo',
  'Coworking',
  'Espaço Pet',
  'Hall social com design assinado',
  'Vagas de garagem',
];

const nanoDiferenciais = [
  'Studios de 23,63 m² a 53,69 m²',
  'Rooftop Gourmet com piscina',
  'Fitness',
  'Lavanderia compartilhada',
  'Hall moderno',
  'Gestão inteligente Cityhome (opcional)',
  'Serviços pay-per-use exclusivos',
  'Estacionamento',
  '259 unidades residenciais',
];

const tipologiasHome = [
  { tipo: 'Tipo A', area: '106,19 – 109,40 m²', detalhe: '3 dorm. com suíte + sacada / churrasqueira' },
  { tipo: 'Tipo B', area: '85,00 – 88,84 m²', detalhe: '3 dorm. com suíte + sacada' },
  { tipo: 'Tipo C', area: '77,18 – 77,86 m²', detalhe: '3 dormitórios' },
  { tipo: 'Tipo D', area: '75,92 – 76,35 m²', detalhe: '3 dormitórios' },
];

const tipologiasNano = [
  { tipo: 'Studio Compacto', area: '23,63 – 34,72 m²', detalhe: 'Studio integrado' },
  { tipo: 'Studio Médio', area: '38,35 – 42,05 m²', detalhe: 'Studio integrado' },
  { tipo: 'Studio Terraço', area: '46,15 – 53,69 m²', detalhe: 'Studio com terraço privativo' },
];

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function TrendHomePageClient() {
  const [activeTab, setActiveTab] = useState<'home' | 'nano'>('home');

  return (
    <div className="bg-background min-h-screen">
      <CommunityPopup />

      {/* HEADER */}
      <ProductHeader />

      {/* HERO */}
      <section className="relative h-[70vh] flex items-end pb-16 text-white">
        <div className="absolute inset-0">
          <Image src={`${P}/PNB_01_Fotomontagem_EF.webp`} alt="Trend Downtown — Complexo" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/70" />
        </div>
        <div className="relative z-10 container">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-white/70 mb-3">
            Cidade Baixa · Porto Alegre
          </p>
          <p className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-2">
            TREND <span className="text-white/80">DOWNTOWN</span>
          </p>
          <p className="text-white/80 text-base max-w-lg leading-relaxed">
            Um complexo multiuso que transforma a região. Residencial, office, studios e mall — tudo integrado no coração de Porto Alegre.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <div className="container relative z-10 -mt-8 pb-16 space-y-2">

        {/* CHAMADA */}
        <div className="bg-primary text-primary-foreground rounded-2xl px-8 py-6 text-center">
          <p className="text-lg font-semibold tracking-wide">Você no Centro de Tudo</p>
          <p className="text-primary-foreground/80 text-sm mt-1">
            Maiojama · Vanguard · Fundo Phorbis · Av. Azenha / Rua Gen. Lima e Silva · Porto Alegre
          </p>
        </div>

        {/* SOBRE O COMPLEXO */}
        <div className="bg-card rounded-2xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-5">
              <div>
                <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-2">Sobre o Complexo</p>
                <h2 className="font-display text-4xl md:text-5xl text-foreground leading-tight mb-4">
                  A tendência mundial que conquistou Porto Alegre
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  O Trend Downtown nasce com propósito de transformar. Onde a rotina é mais fluida e o tempo livre
                  ganha um novo significado. Com torre residencial, office e mall já lançados, além de
                  uma segunda torre residencial em futuro lançamento, é um verdadeiro complexo de facilidades.
                </p>
              </div>
              <div className="pt-2 border-t space-y-3">
                {[
                  { label: 'Incorporação', value: 'Maiojama · Vanguard · Fundo Phorbis' },
                  { label: 'Conceituação', value: 'Smart Arquitetura' },
                  { label: 'Interiores', value: 'Maena Design Conecta' },
                  { label: 'Paisagismo', value: 'Creare Paisagismo' },
                  { label: 'Luminotécnico', value: 'Studio Sandra Thomé' },
                  { label: 'Localização', value: 'Av. Azenha / Rua Gen. Lima e Silva' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex gap-3 text-sm">
                    <span className="text-muted-foreground w-32 flex-shrink-0">{label}</span>
                    <span className="font-medium text-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-96 rounded-xl overflow-hidden">
              <Image src={`${P}/PNB_02_Fachada_Azenha_EF.webp`} alt="Fachada Trend Downtown" fill className="object-cover" sizes="600px" />
            </div>
          </div>
        </div>

        {/* COMPONENTES DO COMPLEXO */}
        <div className="bg-card rounded-2xl p-8">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-6 text-center">Componentes do Complexo</p>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { title: 'Downtown Home', desc: 'Torre 1 lançada · 100 unid. · 3 dormitórios · 75–109 m² · Torre 2: futuro lançamento', img: `${P}/PNB_04_Fachada_Residencial_A_EF.webp`, logo: `${P}/logo_home.png` },
              { title: 'Downtown Nano', desc: '259 studios · 23–53 m² · Rooftop com piscina · Gestão Cityhome', img: `${P}/PNB_06_Fachada_Nano_EF.webp`, logo: `${P}/logo_nano.png` },
              { title: 'Downtown Office', desc: '82 salas comerciais · 31–498 m² · 5º e 6º pavimentos', img: `${P}/PNB_07_Fachada_Office_EF.webp`, logo: null },
              { title: 'Mall', desc: '22 lojas · Av. João Pessoa e Rua Gen. Lima e Silva · Acesso direto', img: `${P}/PNB_08_Mall_Acesso_EF.webp`, logo: null },
            ].map((c) => (
              <div key={c.title} className="rounded-xl overflow-hidden border bg-muted/30">
                <div className="relative h-40">
                  <Image src={c.img} alt={c.title} fill className="object-cover" sizes="400px" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    {c.logo ? (
                      <Image src={c.logo} alt={c.title} width={100} height={30} className="brightness-0 invert" />
                    ) : (
                      <p className="text-white text-sm font-bold tracking-wide">{c.title}</p>
                    )}
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-xs text-muted-foreground leading-relaxed">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TABS — DETALHE POR TORRE */}
        <div className="bg-card rounded-2xl overflow-hidden">
          {/* Tab nav */}
          <div className="flex border-b">
            {[
              { key: 'home', label: 'Downtown Home' },
              { key: 'nano', label: 'Downtown Nano' },
            ].map(({ key, label }) => (
              <button key={key} onClick={() => setActiveTab(key as 'home' | 'nano')}
                className={`flex-1 py-4 text-sm font-medium transition-colors ${
                  activeTab === key
                    ? 'text-primary border-b-2 border-primary bg-muted/30'
                    : 'text-muted-foreground hover:text-foreground'
                }`}>
                {label}
              </button>
            ))}
          </div>

          <div className="p-8 space-y-8">
            {activeTab === 'home' ? (
              <>
                {/* HOME — SOBRE */}
                <div className="grid md:grid-cols-2 gap-10 items-start">
                  <div>
                    <Image src={`${P}/logo_home.png`} alt="Downtown Home" width={180} height={50} className="mb-4" />
                    <p className="text-muted-foreground leading-relaxed mb-5">
                      As plantas do Trend Downtown Home foram projetadas para unir conforto e funcionalidade.
                      Com arquitetura inteligente, cada detalhe maximiza o aproveitamento do espaço e da vida.
                      Torre 1 disponível para venda. Torre 2 é futuro lançamento — sem informações disponíveis no momento.
                    </p>
                    <ul className="space-y-2">
                      {homeDiferenciais.map((d, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-primary font-bold mt-0.5">✓</span>{d}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-4">Tipologias</p>
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left pb-3 text-muted-foreground font-normal">Tipo</th>
                          <th className="text-left pb-3 text-muted-foreground font-normal">Área</th>
                          <th className="text-left pb-3 text-muted-foreground font-normal">Detalhe</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tipologiasHome.map((t, i) => (
                          <tr key={i} className="border-b last:border-0">
                            <td className="py-2.5 font-medium text-foreground">{t.tipo}</td>
                            <td className="py-2.5 text-muted-foreground">{t.area}</td>
                            <td className="py-2.5 text-muted-foreground text-xs">{t.detalhe}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </>
            ) : (
              <>
                {/* NANO — SOBRE */}
                <div className="grid md:grid-cols-2 gap-10 items-start">
                  <div>
                    <Image src={`${P}/logo_nano.png`} alt="Downtown Nano" width={180} height={50} className="mb-4" />
                    <p className="text-muted-foreground leading-relaxed mb-5">
                      A torre Downtown Nano é o lugar ideal para quem busca uma vida dinâmica, conectada e inteligente.
                      Studios projetados para atender a todas as necessidades com eficiência, rooftop gourmet com piscina
                      e a opção de gestão inteligente pela Cityhome.
                    </p>
                    <ul className="space-y-2">
                      {nanoDiferenciais.map((d, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-primary font-bold mt-0.5">✓</span>{d}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-4">Tipologias</p>
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left pb-3 text-muted-foreground font-normal">Tipo</th>
                          <th className="text-left pb-3 text-muted-foreground font-normal">Área</th>
                          <th className="text-left pb-3 text-muted-foreground font-normal">Detalhe</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tipologiasNano.map((t, i) => (
                          <tr key={i} className="border-b last:border-0">
                            <td className="py-2.5 font-medium text-foreground">{t.tipo}</td>
                            <td className="py-2.5 text-muted-foreground">{t.area}</td>
                            <td className="py-2.5 text-muted-foreground text-xs">{t.detalhe}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </>
            )}
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

        {/* VÍDEOS — TREND NANO */}
        <div className="bg-card rounded-2xl p-8 space-y-6">
          <div>
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-2">Vídeos</p>
            <h2 className="font-display text-3xl text-foreground">Conheça o TREND Nano</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="aspect-video w-full overflow-hidden rounded-xl border">
                <iframe src="https://www.youtube.com/embed/KBCXAtAESWM" title="TREND Downtown Nano" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full h-full" style={{ border: 0 }} />
              </div>
              <p className="text-xs text-muted-foreground text-center">Vídeo do empreendimento</p>
            </div>
            <div className="space-y-2">
              <div className="aspect-video w-full overflow-hidden rounded-xl border">
                <iframe src="https://www.youtube.com/embed/a5lCfqU8UWY" title="TREND Downtown Nano — Decorado" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full h-full" style={{ border: 0 }} />
              </div>
              <p className="text-xs text-muted-foreground text-center">Apartamento decorado</p>
            </div>
          </div>
        </div>

        {/* LOCALIZAÇÃO */}
        <div className="bg-card rounded-2xl p-8">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-6 text-center">Localização</p>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="space-y-3 text-sm">
              <p className="font-medium text-foreground">Av. Azenha / Rua General Lima e Silva · Cidade Baixa · Porto Alegre — RS</p>
              <p className="text-muted-foreground">
                Entre a João Pessoa e a Lima e Silva, no coração da Cidade Baixa. Próximo ao Parque Farroupilha (Redenção),
                UFRGS, Zaffari Lima e Silva, Shopping Praia de Belas, Auditório Araújo Vianna, Gasômetro e a Orla do Guaíba.
              </p>
              <div className="grid grid-cols-2 gap-2 pt-2">
                {[
                  '6 min. a pé — Parque Redenção',
                  '3 min. bike — Zaffari Lima e Silva',
                  '9 min. bike — Shopping Praia de Belas',
                  '4 min. bike — Auditório Araújo Vianna',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <span className="text-primary mt-0.5">•</span>{item}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl overflow-hidden border" style={{ height: '280px' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.5!2d-51.2185!3d-30.0478!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x951979c0!2sAv.+Azenha%2C+Porto+Alegre+-+RS!5e0!3m2!1spt-BR!2sbr!4v1234567890"
                width="100%" height="280" style={{ border: 0 }} allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade" title="Localização Trend Downtown"
              />
            </div>
          </div>
        </div>

        {/* DISPONIBILIDADE */}
        <div className="bg-card rounded-2xl p-8">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-6 text-center">Disponibilidade</p>
          <UnitGrid />
        </div>

        {/* IMPLANTAÇÃO — DOWNTOWN HOME */}
        <div className="bg-card rounded-2xl p-8">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-6 text-center">Implantação das Unidades — Downtown Home</p>
          <PlantsViewer categories={[{ label: 'Implantação', images: homeImplantacaoImages }]} />
        </div>

        {/* IMPLANTAÇÃO — DOWNTOWN NANO */}
        <div className="bg-card rounded-2xl p-8">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-6 text-center">Implantação das Unidades — Downtown Nano</p>
          <ImplantacaoFloorSelector floors={nanoFloorPlans} />
        </div>

      </div>

      {/* FOOTER */}
      <footer className="border-t py-8 text-center text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} Maiojama · Vanguard · Fundo Phorbis · Trend Downtown · Porto Alegre</p>

      <WhatsappButton product="TREND DOWNTOWN" />
      </footer>

    </div>
  );
}
