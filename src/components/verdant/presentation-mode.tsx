'use client';

import { useEffect, useCallback, useRef, useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const P = '/VERDANT';
const PL = `${P}/plantas`;

/* ─── Tipagem ──────────────────────────────────────────── */
type Slide =
  | { kind: 'image';   src: string; caption?: string; subcaption?: string; position?: string }
  | { kind: 'chapter'; num: string; title: string; subtitle?: string }
  | { kind: 'text';    super?: string; title: string; body?: string; items?: string[]; cols?: [string[], string[]] };

/* ─── Roteiro — 46 slides ───────────────────────────────── */
const SLIDES: Slide[] = [

  /* ── CAPA ─────────────────────────────────────────────── */
  { kind: 'image', src: `${P}/©VISTA_01_EXT_FACHADA_DIURNA_FINAL.webp`,
    caption: 'VERDANT', subcaption: 'Plaenge · Rua Eça de Queiroz, 215 · Porto Alegre', position: 'center 40%' },

  /* ── CAP 1: CONCEITO (5 slides) ────────────────────────── */
  { kind: 'chapter', num: '01', title: 'Conceito' },

  { kind: 'text',
    super: 'PLAENGE — 50 ANOS',
    title: 'Criamos muitas\nraízes ao longo\ndos anos.',
    body: 'Líder no Sul do Brasil, referência no mercado imobiliário de alto padrão em seis estados e no Chile. Há mais de 50 anos, a Plaenge une tradição e inovação para transformar cada empreendimento em um lugar onde os sonhos ganham vida.' },

  { kind: 'text',
    super: 'VERDANT',
    title: 'Natureza\nintegrada\nà vida.',
    body: '54 unidades com tipologias inéditas em Porto Alegre — apartamentos tipo, gardens, duplex, coberturas e casas com pátio privativo. Um empreendimento concebido para quem vive a natureza como filosofia.' },

  { kind: 'image', src: `${P}/©VISTA_13_EXT_INSERCAO_FINAL.webp`,
    caption: 'Inserção Urbana', subcaption: 'Rua Eça de Queiroz, 215 · Bairro Rio Branco · Porto Alegre', position: 'center 50%' },

  /* ── CAP 2: IMPLANTAÇÃO & LAZER (18 slides) ─────────────── */
  { kind: 'chapter', num: '02', title: 'Implantação\ne Lazer', subtitle: '17 espaços de convívio e bem-estar' },

  { kind: 'image', src: `${P}/©VISTA_02_EXT_FACHADA_NOTURNA_FINAL.webp`,
    caption: 'Fachada Noturna', position: 'center 40%' },

  { kind: 'image', src: `${P}/©VISTA_03_EXT_ACESSO_FINAL_AJUSTADA_SEM_PLACA.webp`,
    caption: 'Acesso Principal', position: 'center 45%' },

  { kind: 'image', src: `${P}/©VISTA_04_EXT_FACHADA_DETALHE_FINAL.webp`,
    caption: 'Fachada — Detalhe Arquitetônico', position: 'center 40%' },

  { kind: 'image', src: `${P}/©VISTA_05_EXT_FACHADA_ACESSO_CASAS_FINAL.webp`,
    caption: 'Acesso — Residências Unifamiliares', position: 'center 45%' },

  { kind: 'image', src: `${P}/©VISTA_11_EXT_AÉREA_ÁREA_CONDOMINIAL_FINAL.webp`,
    caption: 'Vista Aérea', subcaption: 'Área Condominial', position: 'center 50%' },

  { kind: 'image', src: `${P}/©VISTA_34_EXT_AÉREA_ÁREA_CONDOMINIAL_02_(EXTRA)_FINAL.webp`,
    caption: 'Vista Aérea', subcaption: 'Área de Lazer', position: 'center 50%' },

  { kind: 'image', src: `${P}/©VISTA_08_EXT_PISCINA_ABERTA_FINAL_.webp`,
    caption: 'Piscina Adulto e Infantil', position: 'center 45%' },

  { kind: 'image', src: `${P}/©VISTA_09_EXT_DECK_MOLHADO_FINAL.webp`,
    caption: 'Deck Molhado', position: 'center 45%' },

  { kind: 'image', src: `${P}/©VISTA_06_EXT_PET_PLACE_FINAL.webp`,
    caption: 'Pet Place', position: 'center 40%' },

  { kind: 'image', src: `${P}/©VISTA_07_EXT_PLAYGROUND_FINAL.webp`,
    caption: 'Playground com Casinha na Árvore', position: 'center 40%' },

  { kind: 'image', src: `${P}/©VISTA_14_INT_HALL_FINAL.webp`,
    caption: 'Hall Social', position: 'center 35%' },

  { kind: 'image', src: `${P}/©VISTA_21_INT_ESPACO_ROOFTOP_01_FINAL.webp`,
    caption: 'Sunset View', subcaption: 'Rooftop Condominial', position: 'center 40%' },

  { kind: 'image', src: `${P}/©VISTA_22_INT_ESPAÇO_ROOFTOP_02_FINAL_.webp`,
    caption: 'Sunset View', subcaption: 'Rooftop Condominial — Vista Panorâmica', position: 'center 40%' },

  { kind: 'image', src: `${P}/©VISTA_17_INT_SALÃO_DE_FESTAS_FINAL_.webp`,
    caption: 'Salão de Festas', position: 'center 35%' },

  { kind: 'image', src: `${P}/©VISTA_15_INT_YOGA_FINAL.webp`,
    caption: 'Espaço Yoga', position: 'center 40%' },

  { kind: 'image', src: `${P}/©VISTA_16_INT_FITNESS_FINAL.webp`,
    caption: 'Gymnasium Plaenge', position: 'center 40%' },

  { kind: 'image', src: `${P}/©VISTA_33_INT_SAUNA_FINAL.webp`,
    caption: 'Sauna', position: 'center 40%' },

  { kind: 'image', src: `${P}/©VISTA_35_INT_ESPAÇO_KIDS_02_FINAL.webp`,
    caption: 'Espaço Kids', position: 'center 40%' },

  { kind: 'image', src: `${P}/©VISTA_23_INT_SALA_DE_REUNIÕES_FINAL.webp`,
    caption: 'Office Box', position: 'center 35%' },

  /* ── CAP 3: TIPOLOGIAS (8 slides) ──────────────────────── */
  { kind: 'chapter', num: '03', title: 'Tipologias', subtitle: 'Apartamentos · Duplex · Coberturas · Casas' },

  { kind: 'image', src: `${P}/©VISTA_30_INT_LIVING_TIPO_COM_SACADA_FINAL.webp`,
    caption: 'Living', subcaption: 'Apartamento Tipo com Sacada — 145 a 163 m²', position: 'center 35%' },

  { kind: 'image', src: `${P}/©VISTA_36_INT_LIVING_TIPO_COM_SACADA_02_(EXTRA)_FINAL.webp`,
    caption: 'Living', subcaption: 'Apartamento Tipo com Sacada', position: 'center 35%' },

  { kind: 'image', src: `${P}/©VISTA_25_EXT_SACADA_APTO_DUPLEX_FINAL.webp`,
    caption: 'Sacada', subcaption: 'Apartamento Duplex — 295 m²', position: 'center 40%' },

  { kind: 'image', src: `${P}/©VISTA_31_INT_LIVING_DUPLEX_FINAL.webp`,
    caption: 'Living', subcaption: 'Apartamento Duplex', position: 'center 35%' },

  { kind: 'image', src: `${P}/©VISTA_32_INT_LIVING_APTO_COBERTURA_FINAL.webp`,
    caption: 'Living', subcaption: 'Cobertura — 304 a 321 m²', position: 'center 35%' },

  { kind: 'image', src: `${P}/©VISTA_27_EXT_PÁTIO_CASAS_FINAL.webp`,
    caption: 'Pátio Privativo', subcaption: 'Residência Unifamiliar — 366 a 370 m²', position: 'center 45%' },

  { kind: 'image', src: `${P}/©VISTA_28_INT_ESTAR_JANTAR_TERREO_CASAS_FINAL.webp`,
    caption: 'Estar e Jantar', subcaption: 'Residência Unifamiliar — Pavimento Térreo', position: 'center 35%' },

  /* ── CAP 4: PLANTAS (8 slides) ──────────────────────────── */
  { kind: 'chapter', num: '04', title: 'Plantas', subtitle: 'Implantação · Pavimento Tipo · Unidades' },

  { kind: 'image', src: `${PL}/©VISTA_01_PLB_TÉRREO_FINAL.webp`,
    caption: 'Planta Baixa — Térreo', position: 'center 50%' },

  { kind: 'image', src: `${PL}/©VISTA_03_PLB_PAV_TIPO_FINAL.webp`,
    caption: 'Planta Baixa — Pavimento Tipo', position: 'center 50%' },

  { kind: 'image', src: `${PL}/©VISTA_05_PLB_UNIDADE_APTO_TIPO_01_FINAL.webp`,
    caption: 'Planta da Unidade', subcaption: 'Apartamento Tipo 01', position: 'center 50%' },

  { kind: 'image', src: `${PL}/©VISTA_06_PLB_UNIDADE_APTO_TIPO_02_FINAL.webp`,
    caption: 'Planta da Unidade', subcaption: 'Apartamento Tipo 02', position: 'center 50%' },

  { kind: 'image', src: `${PL}/©VISTA_08_PLB_UNIDADE_APTO_DUPLEX_INFERIOR_FINAL.webp`,
    caption: 'Planta da Unidade', subcaption: 'Duplex — Pavimento Inferior', position: 'center 50%' },

  { kind: 'image', src: `${PL}/©VISTA_10_PLB_UNIDADE_APTO_COBERTURA_INFERIOR_FINAL_sem banheira.webp`,
    caption: 'Planta da Unidade', subcaption: 'Cobertura — Pavimento Inferior', position: 'center 50%' },

  { kind: 'image', src: `${PL}/©VISTA_12_PLB_UNIDADE_RESIDÊNCIA_UNIFAMILIAR_TÉRREO_FINAL.webp`,
    caption: 'Planta da Unidade', subcaption: 'Residência Unifamiliar — Térreo', position: 'center 50%' },

  /* ── CAP 5: DIFERENCIAIS (5 slides) ───────────────────── */
  { kind: 'chapter', num: '05', title: 'Diferenciais', subtitle: 'Acabamento · Construtivos' },

  { kind: 'text',
    super: 'DIFERENCIAIS DE ACABAMENTO',
    title: 'Cada detalhe\npensado com\nprecisão.',
    cols: [
      [
        'Porcelanato de grande formato nas áreas sociais',
        'Revestimento cerâmico especial nos banheiros',
        'Bancadas em quartzito natural nas cozinhas',
        'Marcenaria planejada com painéis de MDF revestido',
        'Esquadrias em alumínio de alta performance',
      ],
      [
        'Vidros duplos laminados com controle solar',
        'Forro em drywall com sanca para iluminação indireta',
        'Pintura texturizada premium em todas as paredes',
        'Peças sanitárias e metais de linha superior',
        'Piso flutuante de madeira nos dormitórios',
      ],
    ],
  },

  { kind: 'text',
    super: 'DIFERENCIAIS CONSTRUTIVOS',
    title: 'Tecnologia e\nsustentabilidade\nem cada etapa.',
    cols: [
      [
        'Estrutura em concreto armado de alta resistência',
        'Alvenaria em bloco cerâmico com isolamento acústico',
        'Impermeabilização com garantia estendida',
        'Sistema de pressurização nas escadas de emergência',
        'Energia solar fotovoltaica compartilhada',
      ],
      [
        'Infraestrutura para recarga de veículos elétricos',
        'Sistema de reaproveitamento de água pluvial',
        'Automação residencial Smart Home Ready',
        'Gerador de emergência para áreas comuns',
        'Câmeras de monitoramento com acesso remoto',
      ],
    ],
  },

  /* ── CAP 6: RESUMO (4 slides) ──────────────────────────── */
  { kind: 'chapter', num: '06', title: 'Resumo', subtitle: 'Ficha Técnica do Empreendimento' },

  { kind: 'text',
    super: 'VERDANT · FICHA TÉCNICA',
    title: 'Um endereço\nque define\num novo padrão.',
    items: [
      'Localização — Rua Eça de Queiroz, 215 · Bairro Rio Branco · Porto Alegre/RS',
      'Número de Registro — RI n.º 215.432 · Cartório de Registro de Imóveis',
      'Área do Terreno — 4.178,11 m²',
      'Total de Unidades — 54 unidades (50 na Torre + 4 Casas)',
      'Tipologias — Tipo · Garden · Duplex · Cobertura · Casa com Pátio',
      'Áreas Privativas — 145 m² a 370 m²',
      'Áreas de Lazer — 17 espaços de convívio e bem-estar',
      'Previsão de Entrega — Abril de 2027',
    ],
  },

  /* ── ENCERRAMENTO ───────────────────────────────────────── */
  { kind: 'image', src: `${P}/©VISTA_37_EXT_FACHADA_DETALHE_FINAL.webp`,
    caption: 'VERDANT', subcaption: 'Um pouco mais da nossa natureza.', position: 'center 40%' },
];

/* ─── Props ─────────────────────────────────────────────── */
interface Props {
  currentSlide: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

/* ─── Componente ────────────────────────────────────────── */
export function VerdantPresentationMode({ currentSlide, onClose, onPrev, onNext }: Props) {
  const slide = SLIDES[currentSlide];
  const containerRef = useRef<HTMLDivElement>(null);
  const [animKey, setAnimKey] = useState(0);

  // Dispara animação de entrada a cada troca de slide
  useEffect(() => { setAnimKey(k => k + 1); }, [currentSlide]);

  // Fullscreen ao montar
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.requestFullscreen?.().catch(() => {});
    return () => { if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {}); };
  }, []);

  // Fecha ao sair do fullscreen (ESC nativo)
  useEffect(() => {
    const h = () => { if (!document.fullscreenElement) onClose(); };
    document.addEventListener('fullscreenchange', h);
    return () => document.removeEventListener('fullscreenchange', h);
  }, [onClose]);

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') { document.exitFullscreen?.().catch(() => {}); onClose(); }
    if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); onNext(); }
    if (e.key === 'ArrowLeft') onPrev();
  }, [onClose, onNext, onPrev]);

  useEffect(() => {
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  /* Capítulo atual (para exibir no top bar) */
  const chapters = ['Conceito', 'Implantação & Lazer', 'Tipologias', 'Plantas', 'Diferenciais', 'Resumo'];
  const chapterIndex = SLIDES.slice(0, currentSlide + 1).reduce(
    (acc, s) => (s.kind === 'chapter' ? acc + 1 : acc), -1
  );
  const chapterLabel = chapterIndex >= 0 && chapterIndex < chapters.length ? chapters[chapterIndex] : '';

  return (
    <div ref={containerRef} className="fixed inset-0 z-[200] select-none overflow-hidden" style={{ background: '#0A0A08', fontFamily: 'inherit' }}>

      {/* ── Fonte Google ─────────────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@200;300;400;500&display=swap');
        .vd-serif { font-family: 'Cormorant Garamond', Georgia, serif; }
        .vd-sans  { font-family: 'Jost', system-ui, sans-serif; }
        @keyframes vd-enter { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
        @keyframes vd-enter-fast { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        .vd-anim-1 { animation: vd-enter 0.7s cubic-bezier(.22,.68,0,1.2) both; }
        .vd-anim-2 { animation: vd-enter 0.7s 0.12s cubic-bezier(.22,.68,0,1.2) both; }
        .vd-anim-3 { animation: vd-enter 0.7s 0.24s cubic-bezier(.22,.68,0,1.2) both; }
        .vd-anim-f { animation: vd-enter-fast 0.5s cubic-bezier(.22,.68,0,1.2) both; }
        .vd-caption-anim { animation: vd-enter 0.9s 0.2s cubic-bezier(.22,.68,0,1.2) both; }
      `}</style>

      {/* ── Top bar ─────────────────────────────────────── */}
      <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-8 py-5">
        <div className="flex items-center gap-4">
          {/* Logo wordmark */}
          <span className="vd-sans text-white/90 font-light tracking-[0.25em] text-xs uppercase">
            VERDANT
          </span>
          {chapterLabel && (
            <>
              <span className="w-px h-3 bg-white/20" />
              <span className="vd-sans text-white/40 font-light tracking-widest text-xs uppercase">
                {chapterLabel}
              </span>
            </>
          )}
        </div>
        <div className="flex items-center gap-5">
          <span className="vd-sans text-white/30 text-xs tabular-nums font-light">
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

      {/* ── Conteúdo do slide ────────────────────────────── */}
      <div className="absolute inset-0">
        {slide.kind === 'image' && (
          <ImageSlide key={animKey} slide={slide} />
        )}
        {slide.kind === 'chapter' && (
          <ChapterSlide key={animKey} slide={slide} />
        )}
        {slide.kind === 'text' && (
          <TextSlide key={animKey} slide={slide} />
        )}
      </div>

      {/* ── Navegação lateral ────────────────────────────── */}
      <button
        onClick={onPrev} disabled={currentSlide === 0}
        className="absolute left-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-0 hover:bg-white/10"
        style={{ border: '1px solid rgba(255,255,255,0.15)' }}
        aria-label="Slide anterior"
      >
        <ChevronLeft className="w-5 h-5 text-white/60" />
      </button>
      <button
        onClick={onNext} disabled={currentSlide === SLIDES.length - 1}
        className="absolute right-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-0 hover:bg-white/10"
        style={{ border: '1px solid rgba(255,255,255,0.15)' }}
        aria-label="Próximo slide"
      >
        <ChevronRight className="w-5 h-5 text-white/60" />
      </button>

      {/* ── Barra de progresso ───────────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 z-30 h-px bg-white/10">
        <div
          className="h-full transition-all duration-500 ease-out"
          style={{ width: `${((currentSlide + 1) / SLIDES.length) * 100}%`, background: '#B8945A' }}
        />
      </div>

      {/* ── Dots de capítulo ─────────────────────────────── */}
      <div className="absolute bottom-4 left-0 right-0 z-30 flex justify-center gap-2">
        {SLIDES.map((s, i) => {
          const isChapter = s.kind === 'chapter';
          const isCurrent = i === currentSlide;
          return (
            <button
              key={i}
              onClick={() => {
                const diff = i - currentSlide;
                if (diff > 0) for (let j = 0; j < diff; j++) onNext();
                else if (diff < 0) for (let j = 0; j < -diff; j++) onPrev();
              }}
              className="transition-all duration-300"
              style={{
                width: isCurrent ? '20px' : isChapter ? '6px' : '4px',
                height: isChapter ? '6px' : '4px',
                borderRadius: '9999px',
                background: isCurrent ? '#B8945A' : isChapter ? 'rgba(184,148,90,0.4)' : 'rgba(255,255,255,0.2)',
              }}
              aria-label={`Slide ${i + 1}`}
            />
          );
        })}
      </div>
    </div>
  );
}

/* ─── Sub-componentes de slide ──────────────────────────── */

function ImageSlide({ slide }: { slide: Extract<Slide, { kind: 'image' }> }) {
  return (
    <>
      <Image
        src={slide.src}
        alt={slide.caption ?? 'VERDANT'}
        fill
        className="object-cover"
        style={{ objectPosition: slide.position ?? 'center 40%' }}
        sizes="100vw"
        priority
      />
      {/* Gradiente duplo — topo escuro sutil + base forte */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 30%, transparent 55%, rgba(0,0,0,0.75) 100%)'
      }} />
      {(slide.caption || slide.subcaption) && (
        <div className="vd-caption-anim absolute bottom-12 left-12 right-12">
          {/* Linha ouro decorativa */}
          <div className="mb-4" style={{ width: '40px', height: '1px', background: '#B8945A' }} />
          {slide.caption && (
            <p className="vd-serif text-white font-light leading-none mb-2" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
              {slide.caption}
            </p>
          )}
          {slide.subcaption && (
            <p className="vd-sans text-white/55 font-light tracking-widest" style={{ fontSize: 'clamp(0.65rem, 1vw, 0.8rem)', letterSpacing: '0.2em' }}>
              {slide.subcaption.toUpperCase()}
            </p>
          )}
        </div>
      )}
    </>
  );
}

function ChapterSlide({ slide }: { slide: Extract<Slide, { kind: 'chapter' }> }) {
  return (
    <div className="flex flex-col items-center justify-center h-full" style={{ background: '#0F1A0F' }}>
      {/* Grain overlay */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'1\'/%3E%3C/svg%3E")',
        backgroundSize: '200px',
      }} />
      <div className="relative z-10 text-center px-12">
        {/* Número do capítulo */}
        <p className="vd-sans vd-anim-1 font-light mb-8" style={{ color: '#B8945A', fontSize: 'clamp(0.6rem, 1vw, 0.75rem)', letterSpacing: '0.35em' }}>
          CAPÍTULO {slide.num}
        </p>
        {/* Linha ouro */}
        <div className="vd-anim-1 mx-auto mb-8" style={{ width: '60px', height: '1px', background: '#B8945A' }} />
        {/* Título do capítulo */}
        <h2 className="vd-serif vd-anim-2 text-white font-light leading-none" style={{ fontSize: 'clamp(3.5rem, 9vw, 8rem)', whiteSpace: 'pre-line' }}>
          {slide.title}
        </h2>
        {slide.subtitle && (
          <p className="vd-sans vd-anim-3 font-light mt-6" style={{ color: 'rgba(255,255,255,0.35)', fontSize: 'clamp(0.65rem, 1vw, 0.8rem)', letterSpacing: '0.2em' }}>
            {slide.subtitle.toUpperCase()}
          </p>
        )}
      </div>
    </div>
  );
}

function TextSlide({ slide }: { slide: Extract<Slide, { kind: 'text' }> }) {
  const hasColumns = slide.cols && slide.cols.length === 2;
  const hasItems = slide.items && slide.items.length > 0;

  return (
    <div className="flex flex-col justify-center h-full px-16 md:px-24" style={{ background: '#0A0A08' }}>
      {/* Grain sutil */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'1\'/%3E%3C/svg%3E")',
        backgroundSize: '200px',
      }} />
      <div className="relative z-10 max-w-5xl">

        {/* Super label */}
        {slide.super && (
          <p className="vd-sans vd-anim-1 font-light mb-5" style={{ color: '#B8945A', fontSize: 'clamp(0.55rem, 0.9vw, 0.7rem)', letterSpacing: '0.3em' }}>
            {slide.super}
          </p>
        )}

        {/* Linha */}
        <div className="vd-anim-1 mb-6" style={{ width: '40px', height: '1px', background: '#B8945A' }} />

        {/* Título */}
        <h2 className="vd-serif vd-anim-2 text-white font-light leading-none mb-8" style={{ fontSize: 'clamp(2.8rem, 6vw, 5.5rem)', whiteSpace: 'pre-line' }}>
          {slide.title}
        </h2>

        {/* Corpo (texto longo) */}
        {slide.body && (
          <p className="vd-sans vd-anim-3 font-light leading-relaxed max-w-xl" style={{ color: 'rgba(255,255,255,0.5)', fontSize: 'clamp(0.85rem, 1.2vw, 1rem)' }}>
            {slide.body}
          </p>
        )}

        {/* Lista simples (ficha técnica) */}
        {hasItems && (
          <ul className="vd-anim-3 space-y-3">
            {slide.items!.map((item, i) => {
              const [label, value] = item.split(' — ');
              return (
                <li key={i} className="flex items-baseline gap-3">
                  <span className="vd-sans font-light shrink-0" style={{ color: '#B8945A', fontSize: '0.55rem', letterSpacing: '0.1em' }}>◆</span>
                  {value ? (
                    <span className="vd-sans font-light" style={{ color: 'rgba(255,255,255,0.6)', fontSize: 'clamp(0.75rem, 1.1vw, 0.9rem)' }}>
                      <span style={{ color: 'rgba(255,255,255,0.9)' }}>{label}</span>
                      <span style={{ color: 'rgba(255,255,255,0.3)' }}> — </span>
                      {value}
                    </span>
                  ) : (
                    <span className="vd-sans font-light" style={{ color: 'rgba(255,255,255,0.7)', fontSize: 'clamp(0.75rem, 1.1vw, 0.9rem)' }}>
                      {label}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        )}

        {/* Colunas (diferenciais) */}
        {hasColumns && (
          <div className="vd-anim-3 grid grid-cols-2 gap-x-12 gap-y-3 mt-2">
            {slide.cols!.map((col, ci) => (
              <ul key={ci} className="space-y-3">
                {col.map((item, i) => (
                  <li key={i} className="flex items-baseline gap-3">
                    <span className="vd-sans font-light shrink-0" style={{ color: '#B8945A', fontSize: '0.5rem' }}>◆</span>
                    <span className="vd-sans font-light" style={{ color: 'rgba(255,255,255,0.65)', fontSize: 'clamp(0.7rem, 1vw, 0.85rem)', lineHeight: '1.5' }}>
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

export const PRESENTATION_TOTAL = SLIDES.length;
