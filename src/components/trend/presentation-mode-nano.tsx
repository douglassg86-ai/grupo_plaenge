'use client';

import Image from 'next/image';
import { useRef, useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const P  = '/TREND';
const PL = '/TREND/plantas';
const PN = '/TREND/implantacoes-nano';

/* ─── Tipos ─────────────────────────────────────────────── */
type Slide =
  | { kind: 'cover' }
  | { kind: 'image'; src: string; caption?: string; subcaption?: string; position?: string; contain?: boolean; whiteBg?: boolean }
  | { kind: 'chapter'; num: string; title: string; subtitle?: string }
  | { kind: 'text'; super?: string; title: string; body?: string; items?: string[]; cols?: string[][] }
  | { kind: 'grid'; super?: string; title?: string; images: { src: string; label: string }[] };

/* ─── Roteiro NANO + OFFICE ─────────────────────────────── */
const SLIDES: Slide[] = [
  /* CAPA */
  { kind: 'cover' },

  /* ══ CAP 01 — O COMPLEXO ════════════════════════════════ */
  { kind: 'chapter', num: '01', title: 'O\nComplexo', subtitle: 'Trend Downtown · Porto Alegre' },

  { kind: 'text',
    super: 'CONCEITO',
    title: 'Um complexo\nurbano único\nem Porto Alegre.',
    body: 'O Trend Downtown reúne em um único endereço na Avenida Azenha três torres residenciais, uma torre comercial, um mercado autônomo e um mall de serviços — criando um ecossistema completo de morar, trabalhar e se conectar.',
  },

  { kind: 'image', src: `${P}/PNB_01_Fotomontagem_EF.webp`,
    caption: 'Fotomontagem', subcaption: 'Complexo Trend Downtown — Av. Azenha, Porto Alegre', position: 'center 40%' },

  { kind: 'image', src: `${P}/PNB_02_Fachada_Azenha_EF.webp`,
    caption: 'Fachada', subcaption: 'Av. Azenha', position: 'center 40%' },

  { kind: 'image', src: `${P}/PNB_03_Fachada_Lima_EF.webp`,
    caption: 'Fachada', subcaption: 'Rua General Lima e Silva', position: 'center 65%' },

  { kind: 'image', src: `${P}/PNB_08_Mall_Acesso_EF.webp`,
    caption: 'Mall', subcaption: 'Acesso Principal', position: 'center 40%' },
  { kind: 'image', src: `${P}/PNB_09_Mall_Interno_EF2.webp`,
    caption: 'Mall', subcaption: 'Interno', position: 'center 40%' },
  { kind: 'image', src: `${P}/PNB_10_Mall_Interno_B_EF.webp`,
    caption: 'Mall', subcaption: 'Galeria de Serviços', position: 'center 40%' },

  { kind: 'image', src: `${PL}/PNB_PB_01_Implantacao_Terreo_EF.webp`,
    caption: 'Implantação', subcaption: 'Térreo · Mall + Acessos', contain: true, whiteBg: true },
  { kind: 'image', src: `${PL}/PNB_PB_02_Implantacao_2o_Pavimento_EF.webp`,
    caption: 'Implantação', subcaption: '2º Pavimento · Mall + Nano + Office', contain: true, whiteBg: true },

  /* ══ CAP 02 — OFFICE ════════════════════════════════════ */
  { kind: 'chapter', num: '02', title: 'Office', subtitle: 'Downtown Office · Soluções para negócios' },

  { kind: 'text',
    super: 'TREND DOWNTOWN OFFICE',
    title: 'Você no centro\ndos negócios.',
    body: 'O Downtown Office entrega salas comerciais inteligentes no coração de Porto Alegre, com acesso direto ao Mall e infraestrutura pensada para empresas e profissionais liberais que buscam presença e praticidade.',
  },

  { kind: 'image', src: `${P}/PNB_07_Fachada_Office_EF.webp`,
    caption: 'Fachada', subcaption: 'Torre Office · Av. Azenha', position: 'center 40%' },

  { kind: 'image', src: `${P}/PNB_29_Office_Hall_EF.webp`,
    caption: 'Hall de Entrada', subcaption: 'Downtown Office', position: 'center 35%' },

  { kind: 'image', src: `${P}/PNB_31_Office_Foyer_EF.webp`,
    caption: 'Foyer', subcaption: 'Downtown Office', position: 'center 35%' },

  { kind: 'image', src: `${P}/PNB_32_Office_Sala_Escritorio_EF.webp`,
    caption: 'Sala Escritório', subcaption: 'Downtown Office', position: 'center 35%' },

  { kind: 'image', src: `${P}/PNB_33_Office_Meia_Laje_EF.webp`,
    caption: 'Meia Laje', subcaption: 'Downtown Office', position: 'center 35%' },

  /* Plantas Office: apenas as duas pavimentos (meia laje e laje inteira) */
  { kind: 'image', src: `${PL}/PNB_PB_04_Planta_5o_Pavimento_Office_EF.webp`,
    caption: 'Planta do Pavimento', subcaption: 'Office · 5º Pavimento — Meia Laje', contain: true, whiteBg: true },
  { kind: 'image', src: `${PL}/PNB_PB_05_Planta_6o_Pavimento_Office_EF.webp`,
    caption: 'Planta do Pavimento', subcaption: 'Office · 6º Pavimento — Laje Inteira', contain: true, whiteBg: true },

  /* ══ CAP 03 — NANO LAZER ════════════════════════════════ */
  { kind: 'chapter', num: '03', title: 'Nano\nLazer', subtitle: 'Rooftop · Comodidades · Mercado Autônomo' },

  { kind: 'text',
    super: 'TREND DOWNTOWN NANO',
    title: 'Tudo que\nvocê precisa,\na poucos passos.',
    cols: [
      [ 'Rooftop com piscina e área de lazer', 'Fitness moderno', 'Hall com lounge', 'Lavanderia compartilhada' ],
      [ 'Acesso direto ao Mall', 'Mercado Autônomo 24h', 'Localização Av. Azenha 123', '259 unidades · Studios' ],
    ],
  },

  { kind: 'image', src: `${P}/PNB_27_Nano_Hall_EF.webp`,
    caption: 'Hall', subcaption: 'Downtown Nano', position: 'center 35%' },

  { kind: 'image', src: `${P}/PNB_26_Nano_Fitness_EF.webp`,
    caption: 'Fitness', subcaption: 'Downtown Nano', position: 'center 35%' },

  { kind: 'image', src: `${P}/PNB_28_Nano_Lavanderia_EF.webp`,
    caption: 'Lavanderia', subcaption: 'Downtown Nano', position: 'center 35%' },

  { kind: 'text',
    super: 'MERCADO AUTÔNOMO',
    title: 'Conveniência\nno seu próprio\ncondomínio.',
    body: 'O Trend Downtown contará com mercado autônomo operando 24 horas, integrado ao Mall. Tecnologia de ponta para compras rápidas sem filas, com acesso direto pelo térreo do complexo.',
  },

  { kind: 'image', src: `${P}/PNB_25_Nano_Rooftop_Interno_EF.webp`,
    caption: 'Rooftop', subcaption: 'Downtown Nano — Área Interna', position: 'center 35%' },

  { kind: 'image', src: `${P}/PNB_12_Nano_Rooftop_Externo_EF.webp`,
    caption: 'Rooftop', subcaption: 'Downtown Nano — Vista Panorâmica', position: 'center 40%' },

  { kind: 'image', src: `${P}/PNB_11_Nano_Rooftop_Piscina_EF.webp`,
    caption: 'Rooftop', subcaption: 'Downtown Nano — Piscina', position: 'center 40%' },

  { kind: 'image', src: `${PL}/PNB_PB_06_Planta_Rooftop_Nano_EF.webp`,
    caption: 'Planta do Rooftop', subcaption: 'Downtown Nano', contain: true, whiteBg: true },

  /* Todas as implantações por pavimento em um único slide grid */
  { kind: 'grid',
    super: 'NANO · IMPLANTAÇÃO DAS UNIDADES',
    title: 'Posição dos finais\nnos pavimentos.',
    images: [
      { src: `${PN}/nano-02.jpg`, label: '3º Pav' },
      { src: `${PN}/nano-03.jpg`, label: '4º–8º Pav' },
      { src: `${PN}/nano-05.jpg`, label: '9º Pav' },
      { src: `${PN}/nano-04.jpg`, label: '10º Pav' },
      { src: `${PN}/nano-06.jpg`, label: '11º Pav' },
      { src: `${PN}/nano-07.jpg`, label: '12º Pav' },
      { src: `${PN}/nano-09.jpg`, label: '13º Pav' },
      { src: `${PN}/nano-08.jpg`, label: '14º Pav' },
      { src: `${PN}/nano-01.jpg`, label: '15º Pav' },
    ],
  },

  /* ══ CAP 04 — NANO APARTAMENTOS ════════════════════════ */
  { kind: 'chapter', num: '04', title: 'Nano\nStudios', subtitle: 'Studios · 259 unidades · Av. Azenha 123' },

  { kind: 'image', src: `${P}/PNB_34_Nano_Apartamento_EF.webp`,
    caption: 'Studio', subcaption: 'Downtown Nano', position: 'center 35%' },

  { kind: 'image', src: `${PL}/PNB_PB_07_Planta_Nano_Apto_01A_EF.webp`, caption: 'Planta da Unidade', subcaption: 'Nano · Studio Tipo 01A', contain: true, whiteBg: true },
  { kind: 'image', src: `${PL}/PNB_PB_08_Planta_Nano_Apto_02B_EF.webp`, caption: 'Planta da Unidade', subcaption: 'Nano · Studio Tipo 02B', contain: true, whiteBg: true },
  { kind: 'image', src: `${PL}/PNB_PB_09_Planta_Nano_Apto_03B_EF.webp`, caption: 'Planta da Unidade', subcaption: 'Nano · Studio Tipo 03B', contain: true, whiteBg: true },
  { kind: 'image', src: `${PL}/PNB_PB_10_Planta_Nano_Apto_04_EF.webp`,  caption: 'Planta da Unidade', subcaption: 'Nano · Studio Tipo 04',  contain: true, whiteBg: true },
  { kind: 'image', src: `${PL}/PNB_PB_11_Planta_Nano_Apto_05_EF.webp`,  caption: 'Planta da Unidade', subcaption: 'Nano · Studio Tipo 05',  contain: true, whiteBg: true },
  { kind: 'image', src: `${PL}/PNB_PB_12_Planta_Nano_Apto_06_EF.webp`,  caption: 'Planta da Unidade', subcaption: 'Nano · Studio Tipo 06',  contain: true, whiteBg: true },
  { kind: 'image', src: `${PL}/PNB_PB_13_Planta_Nano_Apto_07_EF.webp`,  caption: 'Planta da Unidade', subcaption: 'Nano · Studio Tipo 07',  contain: true, whiteBg: true },

  /* ══ CAP 05 — GESTÃO ════════════════════════════════════ */
  { kind: 'chapter', num: '05', title: 'Gestão', subtitle: 'Cityhome by Intercity Hotels' },

  { kind: 'text',
    super: 'GESTÃO · CITYHOME BY INTERCITY HOTELS',
    title: 'Seu imóvel\ntrabalhando\npara você.',
    body: 'O Downtown Nano conta com gestão profissional Cityhome by Intercity Hotels — programa de locação por temporada e longa estada gerenciado por uma das maiores redes hoteleiras do Brasil, maximizando a rentabilidade da sua unidade com total praticidade.',
  },

  { kind: 'text',
    super: 'GESTÃO · VANTAGENS DO PROGRAMA',
    title: 'Rentabilidade\nsem abrir mão\nda flexibilidade.',
    cols: [
      [ 'Gestão profissional Intercity Hotels', 'Plataformas integradas (Airbnb, Booking)', 'Limpeza e manutenção incluídas', 'Repasse mensal de receitas' ],
      [ 'Uso pelo proprietário nos períodos desejados', 'Contrato flexível de adesão', 'Relatórios de desempenho periódicos', 'Atendimento 24h para hóspedes' ],
    ],
  },

  /* ══ CAP 06 — FICHA TÉCNICA ════════════════════════════ */
  { kind: 'chapter', num: '06', title: 'Ficha\nTécnica', subtitle: 'Trend Downtown · Dados do Empreendimento' },

  { kind: 'text',
    super: 'TREND DOWNTOWN NANO + OFFICE · FICHA TÉCNICA',
    title: 'Um complexo.\nDois produtos.\nUm endereço.',
    items: [
      'Localização Nano — Av. Azenha, 123 · Porto Alegre/RS',
      'Localização Office — Av. Azenha, 15 · Porto Alegre/RS',
      'Mall — 22 lojas de serviços e conveniência',
      'Torre Nano — 259 studios',
      'Torre Office — 82 unidades comerciais',
      'Gestão Nano — Cityhome by Intercity Hotels',
      'Arquitetura — IDEAI1',
      'Conceito — Smart Arquitetura',
      'Iluminação — Lumin Studio Sandra Thomé',
      'Interiores — Maena Design Conecta',
      'Paisagismo — Creare Paisagismo',
    ],
  },

  /* ENCERRAMENTO */
  { kind: 'image', src: `${P}/PNB_06_Fachada_Nano_EF.webp`,
    caption: 'TREND DOWNTOWN NANO', subcaption: 'Você no centro de tudo.', position: 'center 40%' },
];

/* ─── Props ─────────────────────────────────────────────── */
interface Props {
  currentSlide: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

/* ─── Componente principal ──────────────────────────────── */
export function TrendNanoPresentationMode({ currentSlide, onClose, onPrev, onNext }: Props) {
  const slide = SLIDES[currentSlide];
  const containerRef = useRef<HTMLDivElement>(null);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => { setAnimKey(k => k + 1); }, [currentSlide]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.requestFullscreen?.().catch(() => {});
    return () => { if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {}); };
  }, []);

  useEffect(() => {
    const h = () => { if (!document.fullscreenElement) onClose(); };
    document.addEventListener('fullscreenchange', h);
    return () => document.removeEventListener('fullscreenchange', h);
  }, [onClose]);

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') { document.exitFullscreen?.().catch(() => {}); onClose(); }
    if (e.key === 'ArrowRight' || e.key === ' ') {
      e.preventDefault();
      if (currentSlide < SLIDES.length - 1) onNext();
    }
    if (e.key === 'ArrowLeft') {
      if (currentSlide > 0) onPrev();
    }
  }, [onClose, onNext, onPrev, currentSlide]);

  useEffect(() => {
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  const chapterLabels = ['O Complexo', 'Office', 'Nano Lazer', 'Nano Studios', 'Gestão', 'Ficha Técnica'];
  let chapterCount = -1;
  for (let i = 0; i <= currentSlide; i++) {
    if (SLIDES[i].kind === 'chapter') chapterCount++;
  }
  const chapterLabel = chapterCount >= 0 && chapterCount < chapterLabels.length ? chapterLabels[chapterCount] : '';

  return (
    <div ref={containerRef} className="fixed inset-0 z-[200] select-none overflow-hidden" style={{ background: '#0A0A0A' }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@200;300;400;600;700;800&family=Jost:wght@200;300;400;500&display=swap');
        .tn-serif { font-family: 'Montserrat', system-ui, sans-serif; }
        .tn-sans  { font-family: 'Jost', system-ui, sans-serif; }
        @keyframes tn-enter { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
        .tn-anim-1 { animation: tn-enter 0.7s cubic-bezier(.22,.68,0,1.2) both; }
        .tn-anim-2 { animation: tn-enter 0.7s 0.12s cubic-bezier(.22,.68,0,1.2) both; }
        .tn-anim-3 { animation: tn-enter 0.7s 0.24s cubic-bezier(.22,.68,0,1.2) both; }
        .tn-caption-anim { animation: tn-enter 0.9s 0.2s cubic-bezier(.22,.68,0,1.2) both; }
      `}</style>

      {/* ── Top bar ──────────────────────────────────── */}
      <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-8 py-5">
        <div className="flex items-center gap-4">
          <span className="tn-sans text-white/90 font-light tracking-[0.25em] text-xs uppercase">TREND DOWNTOWN NANO + OFFICE</span>
          {chapterLabel && (
            <>
              <span className="w-px h-3 bg-white/20" />
              <span className="tn-sans text-white/40 font-light tracking-widest text-xs uppercase">{chapterLabel}</span>
            </>
          )}
        </div>
        <div className="flex items-center gap-5">
          <span className="tn-sans text-white/30 text-xs tabular-nums font-light">
            {String(currentSlide + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
          </span>
          <button
            onClick={() => { document.exitFullscreen?.().catch(() => {}); onClose(); }}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-white/10"
            style={{ border: '1px solid rgba(255,255,255,0.15)' }}
            aria-label="Fechar apresentação"
          >
            <X className="w-3.5 h-3.5 text-white/60" />
          </button>
        </div>
      </div>

      {/* ── Slide ────────────────────────────────────── */}
      <div className="absolute inset-0">
        {slide.kind === 'cover'   && <NanoCoverSlide   key={animKey} />}
        {slide.kind === 'image'   && <NanoImageSlide   key={animKey} slide={slide} />}
        {slide.kind === 'chapter' && <NanoChapterSlide key={animKey} slide={slide} />}
        {slide.kind === 'text'    && <NanoTextSlide    key={animKey} slide={slide} />}
        {slide.kind === 'grid'    && <NanoGridSlide    key={animKey} slide={slide} />}
      </div>

      {/* ── Navegação ────────────────────────────────── */}
      <button onClick={onPrev} disabled={currentSlide === 0}
        className="absolute left-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-0 hover:bg-white/10"
        style={{ border: '1px solid rgba(255,255,255,0.15)' }} aria-label="Slide anterior">
        <ChevronLeft className="w-5 h-5 text-white/60" />
      </button>
      <button onClick={onNext} disabled={currentSlide === SLIDES.length - 1}
        className="absolute right-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-0 hover:bg-white/10"
        style={{ border: '1px solid rgba(255,255,255,0.15)' }} aria-label="Próximo slide">
        <ChevronRight className="w-5 h-5 text-white/60" />
      </button>

      {/* ── Barra de progresso cobre ─────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 z-30 h-px bg-white/10">
        <div className="h-full transition-all duration-500 ease-out"
          style={{ width: `${((currentSlide + 1) / SLIDES.length) * 100}%`, background: '#D4785A' }} />
      </div>

      {/* ── Dots ─────────────────────────────────────── */}
      <div className="absolute bottom-4 left-0 right-0 z-30 flex justify-center gap-2 flex-wrap px-20">
        {SLIDES.map((s, i) => {
          const isChap = s.kind === 'chapter';
          const isCur  = i === currentSlide;
          return (
            <button key={i}
              onClick={() => {
                const d = i - currentSlide;
                if (d > 0) for (let j = 0; j < d; j++) onNext();
                else if (d < 0) for (let j = 0; j < -d; j++) onPrev();
              }}
              className="transition-all duration-300"
              style={{
                width: isCur ? '20px' : isChap ? '6px' : '4px',
                height: isChap ? '6px' : '4px',
                borderRadius: '9999px',
                background: isCur ? '#D4785A' : isChap ? 'rgba(212,120,90,0.4)' : 'rgba(255,255,255,0.2)',
              }}
              aria-label={`Slide ${i + 1}`}
            />
          );
        })}
      </div>
    </div>
  );
}

/* ─── NanoCoverSlide ─────────────────────────────────────── */
function NanoCoverSlide() {
  return (
    <div className="flex flex-col items-center justify-center h-full" style={{ background: '#0A0A0A' }}>
      <Image
        src={`${P}/PNB_06_Fachada_Nano_EF.webp`}
        alt=""
        fill
        className="object-cover"
        style={{ objectPosition: 'center 40%', opacity: 0.12 }}
        sizes="100vw"
        priority
      />
      <div className="absolute inset-0 opacity-15" style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'1\'/%3E%3C/svg%3E")',
        backgroundSize: '200px',
      }} />
      <div className="relative z-10 flex flex-col items-center gap-8">
        <div className="tn-anim-1">
          <Image
            src={`${P}/logo_nano.png`}
            alt="TREND DOWNTOWN NANO"
            width={480}
            height={120}
            className="object-contain"
            priority
          />
        </div>
        <div className="tn-anim-2 flex items-center gap-4" style={{ width: '320px' }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(212,120,90,0.4)' }} />
          <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#D4785A' }} />
          <div style={{ flex: 1, height: '1px', background: 'rgba(212,120,90,0.4)' }} />
        </div>
        <p className="tn-sans tn-anim-2 font-light" style={{ color: 'rgba(255,255,255,0.5)', fontSize: 'clamp(0.8rem, 1.5vw, 1rem)', letterSpacing: '0.3em' }}>
          VOCÊ NO CENTRO DE TUDO
        </p>
        {/* Parceiros */}
        <div className="tn-anim-3 flex flex-col items-center gap-1" style={{ marginTop: '0.5rem' }}>
          <p className="tn-sans font-light" style={{ color: 'rgba(255,255,255,0.22)', fontSize: '0.6rem', letterSpacing: '0.2em' }}>
            UMA REALIZAÇÃO
          </p>
          <p className="tn-sans font-semibold" style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.7rem', letterSpacing: '0.25em' }}>
            MAIOJAMA · VANGUARD · FUNDO PHORBIS
          </p>
        </div>
        <div className="tn-anim-3 flex flex-col items-center gap-1" style={{ marginTop: '0.5rem' }}>
          <p className="tn-sans font-light" style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.6rem', letterSpacing: '0.25em' }}>
            AV. AZENHA, 123 · PORTO ALEGRE, RS
          </p>
          <p className="tn-sans font-light" style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.6rem', letterSpacing: '0.25em' }}>
            AV. AZENHA, 15 · OFFICE
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── NanoImageSlide ─────────────────────────────────────── */
function NanoImageSlide({ slide }: { slide: Extract<Slide, { kind: 'image' }> }) {
  const isContain = slide.contain;
  const bg = slide.whiteBg ? '#FFFFFF' : '#0A0A0A';
  const captionDark = slide.whiteBg;
  return (
    <>
      {isContain && <div className="absolute inset-0" style={{ background: bg }} />}
      <Image
        src={slide.src}
        alt={slide.caption ?? 'TREND DOWNTOWN'}
        fill
        className={isContain ? 'object-contain' : 'object-cover'}
        style={!isContain ? { objectPosition: slide.position ?? 'center 40%' } : { padding: '56px 80px 88px' }}
        sizes="100vw"
        priority
      />
      {!isContain && (
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 30%, transparent 55%, rgba(0,0,0,0.75) 100%)'
        }} />
      )}
      {isContain && !slide.whiteBg && (
        <div className="absolute inset-x-0 bottom-0" style={{
          height: '150px',
          background: 'linear-gradient(to top, rgba(10,10,10,0.97) 0%, transparent 100%)'
        }} />
      )}
      {(slide.caption || slide.subcaption) && (
        <div className="tn-caption-anim absolute bottom-12 left-12 right-24">
          <div className="mb-3" style={{ width: '40px', height: '1px', background: '#D4785A' }} />
          {slide.caption && (
            <p className="tn-serif font-bold leading-none mb-2"
              style={{ fontSize: 'clamp(1.4rem, 2.8vw, 2.4rem)', color: captionDark ? '#1A1A1A' : '#fff', letterSpacing: '-0.02em' }}>
              {slide.caption}
            </p>
          )}
          {slide.subcaption && (
            <p className="tn-sans font-light" style={{ fontSize: 'clamp(0.6rem, 0.9vw, 0.75rem)', letterSpacing: '0.15em', color: captionDark ? 'rgba(0,0,0,0.45)' : 'rgba(255,255,255,0.55)' }}>
              {slide.subcaption.toUpperCase()}
            </p>
          )}
        </div>
      )}
    </>
  );
}

/* ─── NanoChapterSlide ───────────────────────────────────── */
function NanoChapterSlide({ slide }: { slide: Extract<Slide, { kind: 'chapter' }> }) {
  return (
    <div className="flex flex-col items-center justify-center h-full" style={{ background: '#0A0A0A' }}>
      <div className="absolute inset-0 opacity-15" style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'1\'/%3E%3C/svg%3E")',
        backgroundSize: '200px',
      }} />
      <div className="relative z-10 text-center px-12">
        <p className="tn-sans tn-anim-1 font-light mb-8" style={{ color: '#D4785A', fontSize: 'clamp(0.6rem, 1vw, 0.75rem)', letterSpacing: '0.35em' }}>
          CAPÍTULO {slide.num}
        </p>
        <div className="tn-anim-1 mx-auto mb-8" style={{ width: '60px', height: '1px', background: '#D4785A' }} />
        <h2 className="tn-serif tn-anim-2 text-white font-bold leading-none" style={{ fontSize: 'clamp(3.5rem, 9vw, 8rem)', whiteSpace: 'pre-line', letterSpacing: '-0.03em' }}>
          {slide.title}
        </h2>
        {slide.subtitle && (
          <p className="tn-sans tn-anim-3 font-light mt-6" style={{ color: 'rgba(255,255,255,0.35)', fontSize: 'clamp(0.65rem, 1vw, 0.8rem)', letterSpacing: '0.2em' }}>
            {slide.subtitle.toUpperCase()}
          </p>
        )}
      </div>
    </div>
  );
}

/* ─── NanoTextSlide ──────────────────────────────────────── */
function NanoTextSlide({ slide }: { slide: Extract<Slide, { kind: 'text' }> }) {
  const hasColumns = slide.cols && slide.cols.length === 2;
  const hasItems   = slide.items && slide.items.length > 0;

  return (
    <div className="flex flex-col justify-center h-full px-16 md:px-24" style={{ background: '#0A0A0A' }}>
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'1\'/%3E%3C/svg%3E")',
        backgroundSize: '200px',
      }} />
      <div className="relative z-10 max-w-5xl">
        {slide.super && (
          <p className="tn-sans tn-anim-1 font-light mb-5" style={{ color: '#D4785A', fontSize: 'clamp(0.55rem, 0.9vw, 0.7rem)', letterSpacing: '0.3em' }}>
            {slide.super}
          </p>
        )}
        <div className="tn-anim-1 mb-6" style={{ width: '40px', height: '1px', background: '#D4785A' }} />
        <h2 className="tn-serif tn-anim-2 text-white font-bold leading-none mb-8" style={{ fontSize: 'clamp(2.4rem, 5.5vw, 5rem)', whiteSpace: 'pre-line', letterSpacing: '-0.03em' }}>
          {slide.title}
        </h2>
        {slide.body && (
          <p className="tn-sans tn-anim-3 font-light leading-relaxed max-w-xl" style={{ color: 'rgba(255,255,255,0.5)', fontSize: 'clamp(0.85rem, 1.2vw, 1rem)' }}>
            {slide.body}
          </p>
        )}
        {hasItems && (
          <ul className="tn-anim-3 space-y-3">
            {slide.items!.map((item, i) => {
              const [label, value] = item.split(' — ');
              return (
                <li key={i} className="flex items-baseline gap-3">
                  <span className="tn-sans font-light shrink-0" style={{ color: '#D4785A', fontSize: '0.55rem' }}>◆</span>
                  {value ? (
                    <span className="tn-sans font-light" style={{ color: 'rgba(255,255,255,0.6)', fontSize: 'clamp(0.75rem, 1.1vw, 0.9rem)' }}>
                      <span style={{ color: 'rgba(255,255,255,0.9)' }}>{label}</span>
                      <span style={{ color: 'rgba(255,255,255,0.3)' }}> — </span>
                      {value}
                    </span>
                  ) : (
                    <span className="tn-sans font-light" style={{ color: 'rgba(255,255,255,0.7)', fontSize: 'clamp(0.75rem, 1.1vw, 0.9rem)' }}>{label}</span>
                  )}
                </li>
              );
            })}
          </ul>
        )}
        {hasColumns && (
          <div className="tn-anim-3 grid grid-cols-2 gap-x-12 gap-y-3 mt-2">
            {slide.cols!.map((col, ci) => (
              <ul key={ci} className="space-y-3">
                {col.map((item, i) => (
                  <li key={i} className="flex items-baseline gap-3">
                    <span className="tn-sans font-light shrink-0" style={{ color: '#D4785A', fontSize: '0.5rem' }}>◆</span>
                    <span className="tn-sans font-light" style={{ color: 'rgba(255,255,255,0.65)', fontSize: 'clamp(0.7rem, 1vw, 0.85rem)', lineHeight: '1.5' }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── NanoGridSlide ──────────────────────────────────────── */
function NanoGridSlide({ slide }: { slide: Extract<Slide, { kind: 'grid' }> }) {
  return (
    <div className="flex flex-col h-full" style={{ background: '#0A0A0A' }}>
      {/* Cabeçalho compacto */}
      <div className="px-16 pt-20 pb-4 flex-shrink-0 flex items-center gap-8">
        <div>
          {slide.super && (
            <p className="tn-sans tn-anim-1 font-light mb-2" style={{ color: '#D4785A', fontSize: '0.6rem', letterSpacing: '0.3em' }}>
              {slide.super}
            </p>
          )}
          <div className="tn-anim-1 mb-2" style={{ width: '30px', height: '1px', background: '#D4785A' }} />
          {slide.title && (
            <h2 className="tn-serif tn-anim-2 text-white font-bold leading-none" style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2.2rem)', letterSpacing: '-0.03em', whiteSpace: 'pre-line' }}>
              {slide.title}
            </h2>
          )}
        </div>
      </div>
      {/* Grid de imagens — sem box, direto na tela */}
      <div className="flex-1 px-10 pb-14 grid grid-cols-5 gap-2" style={{ gridTemplateRows: 'repeat(2, 1fr)' }}>
        {slide.images.map((img, i) => (
          <div key={i} className="relative flex flex-col" style={{ gridColumn: i === 8 ? '3' : 'auto' }}>
            <div className="relative flex-1 min-h-0">
              <Image
                src={img.src}
                alt={img.label}
                fill
                className="object-contain"
                sizes="20vw"
              />
            </div>
            <p className="tn-sans text-center font-light mt-1 flex-shrink-0" style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.6rem', letterSpacing: '0.1em' }}>
              {img.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
