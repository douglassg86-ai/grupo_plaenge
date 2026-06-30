'use client';

import { useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const P = '/VERDANT';

type Slide =
  | { kind: 'image'; src: string; caption?: string; subcaption?: string }
  | { kind: 'text'; title: string; body?: string; sub?: string };

const SLIDES: Slide[] = [
  // 1 — Capa
  { kind: 'image', src: `${P}/©VISTA_01_EXT_FACHADA_DIURNA_FINAL.webp`, caption: 'VERDANT', subcaption: 'Plaenge · Rua Eça de Queiroz, 215 · Porto Alegre' },
  // 2 — Conceito
  { kind: 'text', title: 'Criamos muitas raízes\nao longo dos anos.', body: 'A Plaenge é líder no Sul do Brasil. Referência no ramo imobiliário de alto padrão em seis Estados e também no Chile. Há mais de 50 anos, une tradição e inovação para tornar cada novo empreendimento em um lugar onde os seus sonhos ganham vida.', sub: 'PLAENGE' },
  // 3 — Natureza
  { kind: 'text', title: 'Descubra um pouco\nmais da nossa natureza.', body: '54 unidades com tipologias inéditas em Porto Alegre — apartamentos tipo, gardens, duplex, coberturas e casas com pátio privativo.', sub: 'VERDANT · NATUREZA INTEGRADA À VIDA' },
  // 4 — Localização / Inserção
  { kind: 'image', src: `${P}/©VISTA_13_EXT_INSERCAO_FINAL.webp`, caption: 'Localização', subcaption: 'Rua Eça de Queiroz, 215 · Porto Alegre' },
  // 5 — Fachada Noturna
  { kind: 'image', src: `${P}/©VISTA_02_EXT_FACHADA_NOTURNA_FINAL.webp`, caption: 'Fachada Noturna' },
  // 6 — Acesso
  { kind: 'image', src: `${P}/©VISTA_03_EXT_ACESSO_FINAL_AJUSTADA_SEM_PLACA.webp`, caption: 'Acesso Principal' },
  // 7 — Vista Aérea
  { kind: 'image', src: `${P}/©VISTA_11_EXT_AÉREA_ÁREA_CONDOMINIAL_FINAL.webp`, caption: 'Vista Aérea — Área Condominial' },
  // 8 — Vista Aérea 2
  { kind: 'image', src: `${P}/©VISTA_34_EXT_AÉREA_ÁREA_CONDOMINIAL_02_(EXTRA)_FINAL.webp`, caption: 'Vista Aérea' },
  // 9 — Acesso Casas
  { kind: 'image', src: `${P}/©VISTA_05_EXT_FACHADA_ACESSO_CASAS_FINAL.webp`, caption: 'Acesso — Residências Unifamiliares' },
  // 10 — Piscina Aberta
  { kind: 'image', src: `${P}/©VISTA_08_EXT_PISCINA_ABERTA_FINAL_.webp`, caption: 'Piscina Adulto e Infantil' },
  // 11 — Deck Molhado
  { kind: 'image', src: `${P}/©VISTA_09_EXT_DECK_MOLHADO_FINAL.webp`, caption: 'Deck Molhado' },
  // 12 — Pet Place
  { kind: 'image', src: `${P}/©VISTA_06_EXT_PET_PLACE_FINAL.webp`, caption: 'Pet Place' },
  // 13 — Playground
  { kind: 'image', src: `${P}/©VISTA_07_EXT_PLAYGROUND_FINAL.webp`, caption: 'Playground com Casinha na Árvore' },
  // 14 — Hall
  { kind: 'image', src: `${P}/©VISTA_14_INT_HALL_FINAL.webp`, caption: 'Hall Social' },
  // 15 — Sunset View Rooftop 1
  { kind: 'image', src: `${P}/©VISTA_21_INT_ESPACO_ROOFTOP_01_FINAL.webp`, caption: 'Sunset View — Rooftop Condominial' },
  // 16 — Sunset View Rooftop 2
  { kind: 'image', src: `${P}/©VISTA_22_INT_ESPAÇO_ROOFTOP_02_FINAL_.webp`, caption: 'Sunset View — Rooftop Condominial' },
  // 17 — Salão de Festas
  { kind: 'image', src: `${P}/©VISTA_17_INT_SALÃO_DE_FESTAS_FINAL_.webp`, caption: 'Salão de Festas' },
  // 18 — Yoga
  { kind: 'image', src: `${P}/©VISTA_15_INT_YOGA_FINAL.webp`, caption: 'Espaço Yoga' },
  // 19 — Fitness
  { kind: 'image', src: `${P}/©VISTA_16_INT_FITNESS_FINAL.webp`, caption: 'Gymnasium Plaenge' },
  // 20 — Sauna
  { kind: 'image', src: `${P}/©VISTA_33_INT_SAUNA_FINAL.webp`, caption: 'Sauna' },
  // 21 — Espaço Kids
  { kind: 'image', src: `${P}/©VISTA_35_INT_ESPAÇO_KIDS_02_FINAL.webp`, caption: 'Espaço Kids' },
  // 22 — Office Box
  { kind: 'image', src: `${P}/©VISTA_23_INT_SALA_DE_REUNIÕES_FINAL.webp`, caption: 'Office Box' },
  // 23 — Living Tipo
  { kind: 'image', src: `${P}/©VISTA_30_INT_LIVING_TIPO_COM_SACADA_FINAL.webp`, caption: 'Living — Apartamento Tipo com Sacada' },
  // 24 — Living Tipo 2
  { kind: 'image', src: `${P}/©VISTA_36_INT_LIVING_TIPO_COM_SACADA_02_(EXTRA)_FINAL.webp`, caption: 'Living — Apartamento Tipo com Sacada' },
  // 25 — Sacada Duplex
  { kind: 'image', src: `${P}/©VISTA_25_EXT_SACADA_APTO_DUPLEX_FINAL.webp`, caption: 'Sacada — Apartamento Duplex' },
  // 26 — Living Duplex
  { kind: 'image', src: `${P}/©VISTA_31_INT_LIVING_DUPLEX_FINAL.webp`, caption: 'Living — Apartamento Duplex' },
  // 27 — Living Cobertura
  { kind: 'image', src: `${P}/©VISTA_32_INT_LIVING_APTO_COBERTURA_FINAL.webp`, caption: 'Living — Cobertura' },
  // 28 — Casa Estar/Jantar
  { kind: 'image', src: `${P}/©VISTA_28_INT_ESTAR_JANTAR_TERREO_CASAS_FINAL.webp`, caption: 'Estar/Jantar — Residência Unifamiliar' },
  // 29 — Pátio Casas
  { kind: 'image', src: `${P}/©VISTA_27_EXT_PÁTIO_CASAS_FINAL.webp`, caption: 'Pátio Privativo — Residência Unifamiliar' },
  // 30 — Decorado 1
  { kind: 'image', src: `${P}/Decorado Verdant - final-1.webp`, caption: 'Apartamento Decorado' },
  // 31 — Decorado 4
  { kind: 'image', src: `${P}/Decorado Verdant - final-4.webp`, caption: 'Apartamento Decorado' },
  // 32 — Decorado 8
  { kind: 'image', src: `${P}/Decorado Verdant - final-8.webp`, caption: 'Apartamento Decorado' },
  // 33 — Decorado 14
  { kind: 'image', src: `${P}/Decorado Verdant - final-14.webp`, caption: 'Apartamento Decorado' },
  // 34 — Decorado 20
  { kind: 'image', src: `${P}/Decorado Verdant - final-20.webp`, caption: 'Apartamento Decorado' },
  // 35 — Decorado 28
  { kind: 'image', src: `${P}/Decorado Verdant - final-28.webp`, caption: 'Apartamento Decorado' },
  // 36 — Ficha Técnica
  { kind: 'text', title: 'Ficha Técnica', body: 'Localização: Rua Eça de Queiroz, 215\nÁrea do Terreno: 4.178,11 m²\nApartamentos: de 145,08 m² a 162,98 m²\nGardens: de 167,35 m² a 197,73 m²\nDuplex: 295,09 m²\nCoberturas: de 303,56 m² a 321,46 m²\nCasas: de 366,05 m² a 369,73 m²\nTotal de unidades: 54 unidades\nPrevisão de entrega: Abril 2027', sub: 'VERDANT · PLAENGE' },
  // 37 — Encerramento
  { kind: 'image', src: `${P}/©VISTA_04_EXT_FACHADA_DETALHE_FINAL.webp`, caption: 'VERDANT', subcaption: 'Um pouco mais da nossa natureza.' },
];

interface Props {
  currentSlide: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export function VerdantPresentationMode({ currentSlide, onClose, onPrev, onNext }: Props) {
  const slide = SLIDES[currentSlide];
  const containerRef = useRef<HTMLDivElement>(null);

  // Entra em fullscreen real ao montar
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.requestFullscreen?.().catch(() => {});
    return () => {
      if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {});
    };
  }, []);

  // Fecha ao sair do fullscreen com ESC do browser
  useEffect(() => {
    const handler = () => {
      if (!document.fullscreenElement) onClose();
    };
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, [onClose]);

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') { document.exitFullscreen?.().catch(() => {}); onClose(); }
    if (e.key === 'ArrowRight' || e.key === ' ') onNext();
    if (e.key === 'ArrowLeft') onPrev();
  }, [onClose, onNext, onPrev]);

  useEffect(() => {
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[200] bg-black flex flex-col select-none">
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-6 py-4">
        <span className="text-white/50 text-sm font-medium tracking-widest uppercase">
          VERDANT
        </span>
        <div className="flex items-center gap-4">
          <span className="text-white/40 text-xs tabular-nums">
            {currentSlide + 1} / {SLIDES.length}
          </span>
          <button
            onClick={() => { document.exitFullscreen?.().catch(() => {}); onClose(); }}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Fechar apresentação"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Slide content */}
      <div className="flex-1 relative">
        {slide.kind === 'image' ? (
          <>
            <Image
              src={slide.src}
              alt={slide.caption ?? 'VERDANT'}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
            {(slide.caption || slide.subcaption) && (
              <div className="absolute bottom-20 left-0 right-0 px-12 text-white">
                {slide.caption && (
                  <p className="text-2xl md:text-4xl font-light tracking-wide mb-1">{slide.caption}</p>
                )}
                {slide.subcaption && (
                  <p className="text-white/60 text-sm tracking-widest uppercase">{slide.subcaption}</p>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="flex items-center justify-center h-full px-12 md:px-24">
            <div className="max-w-2xl text-center space-y-6">
              {slide.sub && (
                <p className="text-white/40 text-xs font-semibold tracking-[0.3em] uppercase">{slide.sub}</p>
              )}
              <h2 className="text-white text-3xl md:text-5xl font-light leading-tight" style={{ whiteSpace: 'pre-line' }}>
                {slide.title}
              </h2>
              {slide.body && (
                <p className="text-white/60 text-sm md:text-base leading-relaxed" style={{ whiteSpace: 'pre-line' }}>
                  {slide.body}
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <button
        onClick={onPrev}
        disabled={currentSlide === 0}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-20 text-white flex items-center justify-center transition-colors"
        aria-label="Slide anterior"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={onNext}
        disabled={currentSlide === SLIDES.length - 1}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-20 text-white flex items-center justify-center transition-colors"
        aria-label="Próximo slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Progress dots */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-1 flex-wrap px-12">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              const diff = i - currentSlide;
              if (diff > 0) for (let j = 0; j < diff; j++) onNext();
              else if (diff < 0) for (let j = 0; j < -diff; j++) onPrev();
            }}
            className={`w-1.5 h-1.5 rounded-full transition-all ${i === currentSlide ? 'bg-white w-4' : 'bg-white/30'}`}
            aria-label={`Ir para slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export const PRESENTATION_TOTAL = SLIDES.length;
