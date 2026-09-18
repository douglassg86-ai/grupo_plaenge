'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ProductHeader } from '@/components/shared/product-header';
import { GalleryViewer } from '@/components/shared/gallery-viewer';
import { ProductLinks } from '@/components/shared/product-links';
import { WhatsappButton } from '@/components/whatsapp-button';
import { useManager, trackClick } from '@/lib/use-manager';

const BLOB = 'https://snmigf0anjlpuyzw.public.blob.vercel-storage.com';

const LINKS_CONFIG = {
  videos: [
    { url: `${BLOB}/videos/avulsos-marques-pombal-video.mp4`, title: 'Vídeo — Ilha Florida 501' },
  ],
  clienteSlug: 'avulsos',
};

// ─── Dados dos imóveis ────────────────────────────────────────────────────────

const PARADOR = {
  id: 'parador',
  tag: 'Dação · Zona Sul',
  edificio: 'Edifício Residencial Parador 2447',
  endereco: 'Av. Cel. Marcos, 2447 — Ipanema, Porto Alegre / RS',
  apto: '320',
  torre: '10',
  area: '162,68 m²',
  tipologia: '3 Suítes',
  vagas: '3 vagas (Box 146 Duplo + 79 simples)',
  condominio: 'R$ 2.885,64 / mês',
  nota: 'Imóvel com móveis fixos inclusos. Ocupado — agendar visita com antecedência.',
  preco: 'R$ 1.900.000',
  status: 'Ocupado',
  gallery: {
    categories: [
      {
        label: 'Galeria',
        images: Array.from({ length: 39 }, (_, i) => ({
          src: `/AVULSOS/parador/parador_${String(i + 1).padStart(2, '0')}.webp`,
          alt: `Parador 2447 — foto ${i + 1}`,
        })),
      },
    ],
  },
};

const MARQUES = {
  id: 'marques',
  tag: 'Dação · Moinhos de Vento',
  edificio: 'Edifício Ilha Florida',
  endereco: 'Rua Marques do Pombal, 93 — Apto 501 · Moinhos de Vento, Porto Alegre / RS',
  apto: '501',
  torre: '—',
  area: '166,48 m² privativo · 209,80 m² total',
  tipologia: 'Apartamento de alto padrão',
  vagas: '2 vagas (1 por convenção + 1 escriturada)',
  condominio: 'R$ 2.400,00 / mês',
  nota: 'Imóvel desocupado. Móveis fixos inclusos.',
  preco: 'R$ 1.900.000',
  status: 'Desocupado',
  video: `${BLOB}/videos/avulsos-marques-pombal-video.mp4`,
  gallery: {
    categories: [
      {
        label: 'Galeria',
        images: Array.from({ length: 28 }, (_, i) => ({
          src: `/AVULSOS/marques/marques_${String(i + 1).padStart(2, '0')}.webp`,
          alt: `Ilha Florida 501 — foto ${i + 1}`,
        })),
      },
    ],
  },
};

// ─── Spec chip ────────────────────────────────────────────────────────────────

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span style={{ fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9CA3AF', fontWeight: 600 }}>{label}</span>
      <span style={{ fontSize: '14px', color: '#F3F4F6', fontWeight: 500 }}>{value}</span>
    </div>
  );
}

// ─── Badge de status ──────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const isAvailable = status === 'Desocupado';
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      padding: '4px 10px',
      borderRadius: '99px',
      fontSize: '11px',
      fontWeight: 600,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      background: isAvailable ? 'rgba(34,197,94,0.12)' : 'rgba(251,191,36,0.12)',
      color: isAvailable ? '#4ADE80' : '#FCD34D',
      border: `1px solid ${isAvailable ? 'rgba(34,197,94,0.3)' : 'rgba(251,191,36,0.3)'}`,
    }}>
      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: isAvailable ? '#4ADE80' : '#FCD34D' }} />
      {status}
    </span>
  );
}

// ─── Property Card ────────────────────────────────────────────────────────────

type ManagerType = { slug: string; name: string; phone: string; photo: string; proposalUrl: string };

function InterestButton({ manager }: { manager: ManagerType | null }) {
  const btnStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: 700,
    letterSpacing: '0.04em',
    transition: 'opacity 0.2s',
    textDecoration: 'none',
  };

  if (manager) {
    return (
      <a
        href={`https://wa.me/${manager.phone}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{ ...btnStyle, background: '#D4AF37', color: '#0A0A0A' }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.099.546 4.07 1.5 5.781L0 24l6.336-1.654A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.659-.523-5.173-1.432l-.371-.22-3.763.982.998-3.649-.241-.379A9.946 9.946 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
        Tenho interesse
      </a>
    );
  }

  return (
    <span style={{
      ...btnStyle,
      background: 'rgba(255,255,255,0.06)',
      color: '#9CA3AF',
      border: '1px solid rgba(255,255,255,0.12)',
      cursor: 'default',
      fontSize: '12px',
    }}>
      Fale com o seu GPI Plaenge/Vanguard
    </span>
  );
}

function PropertySection({
  property,
  reverse = false,
  isClientePage,
  manager,
}: {
  property: typeof PARADOR;
  reverse?: boolean;
  isClientePage?: boolean;
  manager: ManagerType | null;
}) {
  const [videoOpen, setVideoOpen] = useState(false);
  const hasVideo = 'video' in property && !!property.video;

  // ESC key closes the video modal
  useEffect(() => {
    if (!videoOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setVideoOpen(false); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [videoOpen]);

  return (
    <section
      id={property.id}
      style={{
        padding: '80px 0',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        scrollMarginTop: '60px',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 500px), 1fr))',
          gap: '60px',
          alignItems: 'start',
          direction: reverse ? 'rtl' : 'ltr',
        }}
      >
        {/* Galeria */}
        <div style={{ direction: 'ltr' }}>
          <GalleryViewer categories={property.gallery.categories} />
          {hasVideo && (
            <button
              onClick={() => setVideoOpen(true)}
              style={{
                marginTop: '16px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                borderRadius: '8px',
                border: '1px solid rgba(212,175,55,0.4)',
                background: 'rgba(212,175,55,0.08)',
                color: '#D4AF37',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                letterSpacing: '0.04em',
                transition: 'all 0.2s',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              Assistir vídeo do imóvel
            </button>
          )}
        </div>

        {/* Info */}
        <div style={{ direction: 'ltr' }}>
          {/* Tag */}
          <span style={{
            display: 'inline-block',
            padding: '4px 12px',
            borderRadius: '4px',
            background: 'rgba(212,175,55,0.15)',
            border: '1px solid rgba(212,175,55,0.35)',
            color: '#D4AF37',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '20px',
          }}>
            {property.tag}
          </span>

          <h2 style={{ fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 700, color: '#F9FAFB', lineHeight: 1.2, marginBottom: '6px' }}>
            {property.edificio}
          </h2>
          <p style={{ fontSize: '13px', color: '#9CA3AF', marginBottom: '24px', lineHeight: 1.6 }}>
            {property.endereco}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: 'clamp(26px, 4vw, 36px)', fontWeight: 800, color: '#F9FAFB', letterSpacing: '-0.02em' }}>
              {property.preco}
            </span>
            <StatusBadge status={property.status} />
          </div>

          {/* Specs grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px 32px',
            padding: '24px',
            borderRadius: '12px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            marginBottom: '24px',
          }}>
            <Spec label="Apartamento" value={property.apto} />
            <Spec label="Área" value={property.area} />
            <Spec label="Tipologia" value={property.tipologia} />
            <Spec label="Vagas" value={property.vagas} />
            {property.condominio !== '—' && (
              <Spec label="Condomínio" value={property.condominio} />
            )}
          </div>

          {/* Nota */}
          <p style={{
            fontSize: '13px',
            color: '#9CA3AF',
            lineHeight: 1.7,
            padding: '14px 16px',
            borderLeft: '2px solid rgba(212,175,55,0.4)',
            background: 'rgba(212,175,55,0.04)',
            borderRadius: '0 8px 8px 0',
            marginBottom: '28px',
          }}>
            {property.nota}
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <InterestButton manager={isClientePage ? null : manager} />
          </div>
        </div>
      </div>

      {/* Video modal */}
      {hasVideo && videoOpen && (
        <div
          onClick={() => setVideoOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 999,
            background: 'rgba(0,0,0,0.92)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '24px',
          }}
        >
          <div onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: '900px' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '12px' }}>
              <button
                onClick={() => setVideoOpen(false)}
                style={{
                  background: 'rgba(255,255,255,0.12)', border: 'none',
                  color: '#fff', borderRadius: '50%', width: '36px', height: '36px',
                  cursor: 'pointer', fontSize: '18px', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                }}
                title="Fechar (ESC)"
              >
                ×
              </button>
            </div>
            <video
              src={(property as typeof MARQUES).video}
              controls
              autoPlay
              style={{ width: '100%', borderRadius: '12px', background: '#000' }}
            />
            <p style={{ textAlign: 'center', marginTop: '10px', fontSize: '11px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>
              pressione ESC para fechar
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

// ─── Hero Banner ──────────────────────────────────────────────────────────────

function HeroBanner() {
  return (
    <section style={{ position: 'relative', height: '100vh', minHeight: '600px', maxHeight: '900px', overflow: 'hidden' }}>
      {/* Background: primeira imagem do Parador como hero */}
      <Image
        src="/AVULSOS/parador/parador_01.webp"
        alt="Imóveis Avulsos"
        fill
        priority
        style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
      />
      {/* Gradiente escuro */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.3) 40%, rgba(10,10,10,0.95) 100%)',
      }} />

      {/* Conteúdo central */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '0 24px',
      }}>
        {/* Eyebrow */}
        <span style={{
          display: 'inline-block',
          marginBottom: '20px',
          padding: '6px 18px',
          border: '1px solid rgba(212,175,55,0.5)',
          borderRadius: '99px',
          background: 'rgba(212,175,55,0.1)',
          color: '#D4AF37',
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
        }}>
          Oportunidade Exclusiva · Plaenge
        </span>

        <h1 style={{
          fontSize: 'clamp(40px, 7vw, 80px)',
          fontWeight: 900,
          color: '#FFFFFF',
          letterSpacing: '-0.03em',
          lineHeight: 1,
          marginBottom: '12px',
        }}>
          IMÓVEIS
        </h1>
        <h1 style={{
          fontSize: 'clamp(40px, 7vw, 80px)',
          fontWeight: 900,
          background: 'linear-gradient(135deg, #D4AF37 0%, #F5E192 50%, #B8892A 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-0.03em',
          lineHeight: 1,
          marginBottom: '28px',
        }}>
          AVULSOS
        </h1>

        <p style={{
          maxWidth: '520px',
          fontSize: 'clamp(14px, 2vw, 17px)',
          color: 'rgba(255,255,255,0.75)',
          lineHeight: 1.7,
          marginBottom: '40px',
        }}>
          Apartamentos de alto padrão adquiridos por dação em pagamento.
          Disponibilidade imediata · Condições especiais · Porto Alegre
        </p>

        {/* Botões de ação rápida */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <a
            href="#parador"
            style={{
              padding: '13px 28px',
              borderRadius: '8px',
              background: '#D4AF37',
              color: '#0A0A0A',
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '0.05em',
              textDecoration: 'none',
            }}
          >
            Parador 2447
          </a>
          <a
            href="#marques"
            style={{
              padding: '13px 28px',
              borderRadius: '8px',
              background: 'transparent',
              color: '#fff',
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '0.05em',
              textDecoration: 'none',
              border: '1px solid rgba(255,255,255,0.35)',
            }}
          >
            Ilha Florida 501
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: '36px', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
        opacity: 0.5,
      }}>
        <span style={{ fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#fff' }}>
          explorar
        </span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <path d="M12 5v14M5 12l7 7 7-7"/>
        </svg>
      </div>
    </section>
  );
}

// ─── Section Divider ──────────────────────────────────────────────────────────

function SectionDivider({ number, label }: { number: string; label: string }) {
  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '60px 24px 0',
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
    }}>
      <span style={{
        fontSize: '11px', fontWeight: 800, letterSpacing: '0.2em',
        color: '#D4AF37', opacity: 0.6,
      }}>
        {number}
      </span>
      <div style={{ flex: 1, height: '1px', background: 'rgba(212,175,55,0.2)' }} />
      <span style={{
        fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em',
        textTransform: 'uppercase', color: '#6B7280',
      }}>
        {label}
      </span>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AvulsosHomePageClient({ isClientePage }: { isClientePage?: boolean }) {
  const manager = useManager();

  useEffect(() => {
    if (manager) trackClick(manager.slug, 'AVULSOS');
  }, [manager]);

  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh', color: '#F9FAFB' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0A0A0A; }
        @media (prefers-color-scheme: dark) { :root { color-scheme: dark; } }
        a { transition: opacity 0.2s; }
        a:hover { opacity: 0.85; }
        button:hover { opacity: 0.9; }
      `}} />

      <ProductHeader hideNav={isClientePage} />

      <HeroBanner />

      <SectionDivider number="01" label="Parador 2447 · Ipanema" />
      <PropertySection property={PARADOR} isClientePage={isClientePage} manager={manager} />

      <SectionDivider number="02" label="Ilha Florida · Moinhos de Vento" />
      <PropertySection property={MARQUES} reverse isClientePage={isClientePage} manager={manager} />

      {/* ProductLinks — materiais e link do cliente para GPIs */}
      {!isClientePage && (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px 0' }}>
          <ProductLinks config={LINKS_CONFIG} />
        </div>
      )}

      {/* Footer minimalista */}
      <footer style={{
        padding: '40px 24px',
        textAlign: 'center',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}>
        <Image
          src="/INSTITUCIONAL/logo_grupo_plaenge_claro.webp"
          alt="Grupo Plaenge"
          width={120}
          height={26}
          style={{ opacity: 0.5, margin: '0 auto 12px' }}
        />
        <p style={{ fontSize: '12px', color: '#4B5563' }}>
          Imóveis avulsos · Grupo Plaenge · Porto Alegre / RS
        </p>
      </footer>

      {!isClientePage && <WhatsappButton />}
    </div>
  );
}
