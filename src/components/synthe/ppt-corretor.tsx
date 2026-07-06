'use client';

import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';

const BG   = '#F5F2EE';
const ACC  = '#C1422A';
const DARK = '#1A1A1A';
const P    = '/SYNTHE';
const TOTAL = 10;

const FONT_CSS = `
@font-face {
  font-family: 'Normalidad';
  src: url('/SYNTHE/fonts/NormalidadCompact-Thin.woff2') format('woff2');
  font-weight: 100; font-style: normal; font-display: swap;
}
@font-face {
  font-family: 'Normalidad';
  src: url('/SYNTHE/fonts/NormalidadCompact-Light.woff2') format('woff2');
  font-weight: 300; font-style: normal; font-display: swap;
}
@font-face {
  font-family: 'Normalidad';
  src: url('/SYNTHE/fonts/NormalidadCompact-Regular.woff2') format('woff2');
  font-weight: 400; font-style: normal; font-display: swap;
}
@font-face {
  font-family: 'Normalidad';
  src: url('/SYNTHE/fonts/NormalidadCompact-Medium.woff2') format('woff2');
  font-weight: 500; font-style: normal; font-display: swap;
}
@font-face {
  font-family: 'Normalidad';
  src: url('/SYNTHE/fonts/NormalidadCompact-Bold.woff2') format('woff2');
  font-weight: 700; font-style: normal; font-display: swap;
}
@font-face {
  font-family: 'Normalidad';
  src: url('/SYNTHE/fonts/NormalidadCompact-Black.woff2') format('woff2');
  font-weight: 900; font-style: normal; font-display: swap;
}
.sn { font-family: 'Normalidad', 'Helvetica Neue', Arial, sans-serif; }
@keyframes sn-up   { from { opacity:0; transform:translateY(22px); } to { opacity:1; transform:translateY(0); } }
@keyframes sn-in   { from { opacity:0; } to { opacity:1; } }
@keyframes sn-scale { from { opacity:0; transform:scale(0.94); } to { opacity:1; transform:scale(1); } }
.sn-a0  { animation: sn-up 0.65s 0.00s cubic-bezier(.22,.68,0,1.15) both; }
.sn-a1  { animation: sn-up 0.65s 0.12s cubic-bezier(.22,.68,0,1.15) both; }
.sn-a2  { animation: sn-up 0.65s 0.24s cubic-bezier(.22,.68,0,1.15) both; }
.sn-a3  { animation: sn-up 0.65s 0.36s cubic-bezier(.22,.68,0,1.15) both; }
.sn-a4  { animation: sn-up 0.65s 0.48s cubic-bezier(.22,.68,0,1.15) both; }
.sn-a5  { animation: sn-up 0.65s 0.60s cubic-bezier(.22,.68,0,1.15) both; }
.sn-fade { animation: sn-in 1.2s 0.1s both; }
.sn-sc  { animation: sn-scale 0.8s 0.1s cubic-bezier(.22,.68,0,1.15) both; }
`;

// ─── SLIDE COMPONENTS ────────────────────────────────────────────────────────

function Slide01Capa() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-end pb-20">
      <div className="absolute inset-0">
        <Image src={`${P}/©VISTA_02_EXT_FACHADA_DIURNA_FINAL.webp`} alt="SYNTHÈ Fachada" fill
          className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.72) 100%)' }} />
      </div>
      <div className="relative z-10 flex flex-col items-center text-center px-8">
        <p className="sn sn-a0 text-white/60 tracking-[0.35em] uppercase mb-8" style={{ fontSize: 'clamp(0.65rem, 1vw, 0.8rem)' }}>
          APRESENTAÇÃO CORRETORES
        </p>
        <div className="sn-a1 mb-6">
          <Image src={`${P}/logo.png`} alt="SYNTHÈ" width={260} height={78}
            className="brightness-0 invert" style={{ width: 'clamp(180px, 18vw, 280px)', height: 'auto' }} />
        </div>
        <p className="sn sn-a2 text-white/75 italic" style={{ fontSize: 'clamp(1rem, 1.8vw, 1.4rem)', letterSpacing: '0.08em', fontWeight: 300 }}>
          A síntese do equilíbrio.
        </p>
        <div className="sn-a3 mt-8 flex items-center gap-3">
          <div style={{ height: '1px', width: '40px', background: 'rgba(255,255,255,0.35)' }} />
          <p className="sn text-white/55 tracking-[0.25em] uppercase" style={{ fontSize: 'clamp(0.6rem, 0.85vw, 0.75rem)' }}>
            PLAENGE · TGD · MONT&apos;SERRAT · PORTO ALEGRE
          </p>
          <div style={{ height: '1px', width: '40px', background: 'rgba(255,255,255,0.35)' }} />
        </div>
      </div>
    </div>
  );
}

function Slide02Highlight() {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden" style={{ background: BG }}>
      <div className="absolute inset-0 sn-fade" style={{ background: `radial-gradient(ellipse 80% 60% at 50% 50%, ${ACC}12 0%, transparent 70%)` }} />
      <div className="relative z-10 flex flex-col items-center text-center px-12">
        <div className="sn-a0 flex items-center gap-4 mb-8">
          <div style={{ height: '1px', width: '60px', background: `${ACC}80` }} />
          <p className="sn tracking-[0.35em] uppercase" style={{ color: ACC, fontSize: 'clamp(0.65rem, 1vw, 0.8rem)', fontWeight: 500 }}>
            SYNTHÈ · PLAENGE
          </p>
          <div style={{ height: '1px', width: '60px', background: `${ACC}80` }} />
        </div>
        <h1 className="sn sn-a1" style={{
          color: DARK, fontWeight: 900,
          fontSize: 'clamp(3.5rem, 8vw, 7rem)',
          lineHeight: 0.9, letterSpacing: '-0.02em', textTransform: 'uppercase',
        }}>
          NOVA ETAPA
        </h1>
        <h2 className="sn sn-a2" style={{
          color: ACC, fontWeight: 900,
          fontSize: 'clamp(3.5rem, 8vw, 7rem)',
          lineHeight: 0.9, letterSpacing: '-0.02em', textTransform: 'uppercase',
        }}>
          PRÉ-LANÇAMENTO
        </h2>
        <p className="sn sn-a3 mt-10" style={{ color: `${DARK}70`, fontSize: 'clamp(0.8rem, 1.4vw, 1.1rem)', fontWeight: 300, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          O momento é agora.
        </p>
      </div>
    </div>
  );
}

function Slide03Feature() {
  return (
    <div className="relative w-full h-full flex" style={{ background: DARK }}>
      {/* Left — image */}
      <div className="relative w-1/2 h-full">
        <Image src={`${P}/©VISTA_15_INT_APTO_TIPO_01_LIVING_01_FINAL.webp`} alt="Apartamento SYNTHÈ"
          fill className="object-cover" sizes="50vw" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, transparent 60%, rgba(26,26,26,0.9) 100%)' }} />
      </div>
      {/* Right — content */}
      <div className="relative z-10 w-1/2 flex flex-col justify-center px-16 py-16">
        <p className="sn sn-a0 tracking-[0.3em] uppercase mb-6" style={{ color: ACC, fontSize: 'clamp(0.65rem, 1vw, 0.8rem)', fontWeight: 500 }}>
          FERRAMENTA DO CORRETOR
        </p>
        <h2 className="sn sn-a1" style={{ color: '#FFFFFF', fontWeight: 700, fontSize: 'clamp(2.5rem, 4.5vw, 3.8rem)', lineHeight: 1, letterSpacing: '-0.01em', textTransform: 'uppercase' }}>
          BOOK DIGITAL<br />COMPLETO
        </h2>
        <div className="sn-a2 mt-8 mb-8" style={{ width: '48px', height: '2px', background: ACC }} />
        <p className="sn sn-a3" style={{ color: 'rgba(255,255,255,0.6)', fontSize: 'clamp(0.85rem, 1.4vw, 1.1rem)', fontWeight: 300, lineHeight: 1.7, maxWidth: '380px' }}>
          Acesse o material completo do empreendimento: galeria de imagens, plantas, ficha técnica e condições de pagamento — tudo em um só lugar.
        </p>
        <div className="sn-a4 mt-10 flex flex-col gap-3">
          {['Galeria de imagens e renders', 'Plantas e tipologias', 'Ficha técnica completa', 'Site do cliente disponível'].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: ACC, flexShrink: 0 }} />
              <p className="sn" style={{ color: 'rgba(255,255,255,0.55)', fontSize: 'clamp(0.8rem, 1.2vw, 0.95rem)', fontWeight: 300 }}>{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Slide04Fachada() {
  return (
    <div className="relative w-full h-full">
      <Image src={`${P}/©VISTA_03_EXT_FACHADA_DETALHE_01_FINAL.webp`} alt="SYNTHÈ — Fachada"
        fill className="object-cover" sizes="100vw" priority />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)' }} />
      <div className="absolute bottom-12 left-16 right-16 z-10">
        <p className="sn sn-a0 text-white/55 tracking-[0.3em] uppercase mb-3" style={{ fontSize: 'clamp(0.6rem, 0.9vw, 0.75rem)' }}>
          SYNTHÈ · FACHADA
        </p>
        <p className="sn sn-a1 text-white italic" style={{ fontSize: 'clamp(1.2rem, 2.2vw, 1.8rem)', fontWeight: 300, letterSpacing: '0.04em' }}>
          Precisão. Escolha. Equilíbrio.
        </p>
      </div>
    </div>
  );
}

function Slide05VideoGrid() {
  const videos = [
    { label: 'Campanha — Lançamento', sub: 'Vídeo principal da campanha' },
    { label: 'Campanha — Produto',    sub: 'Tour pelo empreendimento' },
    { label: 'Campanha — Lifestyle',  sub: 'Estilo de vida SYNTHÈ' },
    { label: 'Campanha — Depoimento', sub: 'Voz do cliente' },
  ];
  return (
    <div className="relative w-full h-full flex flex-col" style={{ background: DARK }}>
      <div className="px-16 pt-14 pb-6 flex-shrink-0">
        <p className="sn sn-a0 tracking-[0.3em] uppercase mb-3" style={{ color: ACC, fontSize: 'clamp(0.65rem, 1vw, 0.8rem)', fontWeight: 500 }}>SYNTHÈ · CAMPANHA</p>
        <h2 className="sn sn-a1" style={{ color: '#FFFFFF', fontWeight: 700, fontSize: 'clamp(2rem, 3.5vw, 3rem)', lineHeight: 1, textTransform: 'uppercase', letterSpacing: '-0.01em' }}>
          VÍDEOS DA CAMPANHA
        </h2>
      </div>
      <div className="flex-1 px-16 pb-14 grid grid-cols-2 gap-4 sn-a2">
        {videos.map((v, i) => (
          <div key={i} className="relative rounded-xl overflow-hidden flex flex-col items-center justify-center cursor-pointer group"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="flex flex-col items-center gap-4 p-8">
              <div className="w-14 h-14 rounded-full flex items-center justify-center transition-all group-hover:scale-110"
                style={{ border: `2px solid ${ACC}`, background: `${ACC}18` }}>
                <Play className="w-6 h-6 ml-0.5" style={{ color: ACC }} />
              </div>
              <div className="text-center">
                <p className="sn font-medium text-white/85" style={{ fontSize: 'clamp(0.85rem, 1.3vw, 1rem)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{v.label}</p>
                <p className="sn font-light text-white/40 mt-1" style={{ fontSize: 'clamp(0.7rem, 1vw, 0.82rem)' }}>{v.sub}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Slide06Incentive() {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden" style={{ background: ACC }}>
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 70% 70% at 50% 50%, rgba(255,255,255,0.08) 0%, transparent 70%)' }} />
      <div className="relative z-10 flex flex-col items-center text-center px-12">
        <p className="sn sn-a0 tracking-[0.4em] uppercase mb-8" style={{ color: 'rgba(255,255,255,0.55)', fontSize: 'clamp(0.65rem, 1vw, 0.8rem)', fontWeight: 500 }}>
          VERBA DE MARKETING · APOIO AO CORRETOR
        </p>
        <h2 className="sn sn-a1" style={{ color: '#FFFFFF', fontWeight: 900, fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 0.95, letterSpacing: '-0.01em', textTransform: 'uppercase' }}>
          IMPULSIONAMENTO
        </h2>
        <div className="sn-a2 my-8" style={{ width: '80px', height: '2px', background: 'rgba(255,255,255,0.35)' }} />
        <p className="sn sn-a3" style={{ color: 'rgba(255,255,255,0.7)', fontSize: 'clamp(0.85rem, 1.5vw, 1.15rem)', fontWeight: 300, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1rem' }}>
          SORTEIO
        </p>
        <p className="sn sn-a4" style={{ color: '#FFFFFF', fontWeight: 900, fontSize: 'clamp(3rem, 6vw, 5.5rem)', lineHeight: 0.9, letterSpacing: '-0.02em' }}>
          R$ 5.000
        </p>
        <p className="sn sn-a5 mt-4" style={{ color: 'rgba(255,255,255,0.6)', fontSize: 'clamp(0.8rem, 1.3vw, 1rem)', fontWeight: 300, letterSpacing: '0.06em' }}>
          Verba de marketing para apoio aos corretores parceiros
        </p>
      </div>
    </div>
  );
}

function Slide07Media() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center" style={{ background: DARK }}>
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(193,66,42,0.12) 0%, transparent 70%)' }} />
      <div className="relative z-10 flex flex-col items-center text-center px-8">
        <p className="sn sn-a0 tracking-[0.35em] uppercase mb-10" style={{ color: 'rgba(255,255,255,0.35)', fontSize: 'clamp(0.65rem, 1vw, 0.8rem)', fontWeight: 400 }}>
          SYNTHÈ · EXPERIÊNCIA IMERSIVA
        </p>
        <div className="sn-a1 relative w-24 h-24 rounded-full flex items-center justify-center mb-10 cursor-pointer group"
          style={{ border: `2px solid ${ACC}`, background: `${ACC}18` }}>
          <Play className="w-10 h-10 ml-1" style={{ color: ACC }} />
          <div className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ border: `1px solid ${ACC}` }} />
        </div>
        <h2 className="sn sn-a2" style={{ color: '#FFFFFF', fontWeight: 700, fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1, textTransform: 'uppercase', letterSpacing: '-0.01em' }}>
          VÍDEO SALA IMERSIVA
        </h2>
        <p className="sn sn-a3 mt-5" style={{ color: 'rgba(255,255,255,0.4)', fontSize: 'clamp(0.8rem, 1.3vw, 1rem)', fontWeight: 300, letterSpacing: '0.1em' }}>
          Inserir link do vídeo
        </p>
      </div>
    </div>
  );
}

function Slide08Metas() {
  const metas = [
    { unidades: '10', prazo: 'em 60 dias', premio: 'BYD DOLPHIN MINI', tag: 'Meta Bronze' },
    { unidades: '15', prazo: 'em 90 dias', premio: 'BYD SEAL',         tag: 'Meta Ouro' },
  ];
  return (
    <div className="relative w-full h-full flex flex-col" style={{ background: BG }}>
      <div className="px-16 pt-14 pb-6 flex-shrink-0">
        <p className="sn sn-a0 tracking-[0.3em] uppercase mb-3" style={{ color: ACC, fontSize: 'clamp(0.65rem, 1vw, 0.8rem)', fontWeight: 500 }}>CAMPANHA DE VENDAS</p>
        <h2 className="sn sn-a1" style={{ color: DARK, fontWeight: 900, fontSize: 'clamp(2rem, 3.5vw, 3rem)', lineHeight: 1, textTransform: 'uppercase', letterSpacing: '-0.01em' }}>
          METAS E PRÊMIOS
        </h2>
      </div>
      <div className="flex-1 px-16 pb-14 grid grid-cols-2 gap-6 sn-a2">
        {metas.map((m, i) => (
          <div key={i} className="relative rounded-2xl flex flex-col justify-between overflow-hidden p-10"
            style={{ background: DARK, border: `2px solid ${i === 1 ? ACC : 'transparent'}` }}>
            {i === 1 && (
              <div className="absolute top-0 right-0 px-4 py-2 text-white text-xs tracking-widest uppercase sn"
                style={{ background: ACC, fontSize: '0.65rem', borderBottomLeftRadius: '12px' }}>
                DESTAQUE
              </div>
            )}
            <div>
              <p className="sn tracking-[0.25em] uppercase mb-4" style={{ color: `${ACC}`, fontSize: 'clamp(0.65rem, 1vw, 0.75rem)', fontWeight: 500 }}>{m.tag}</p>
              <div className="flex items-baseline gap-3 mb-2">
                <span className="sn" style={{ color: '#FFFFFF', fontWeight: 900, fontSize: 'clamp(3.5rem, 6vw, 5.5rem)', lineHeight: 0.9, letterSpacing: '-0.02em' }}>{m.unidades}</span>
                <span className="sn" style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 300, fontSize: 'clamp(1rem, 1.8vw, 1.5rem)' }}>unidades</span>
              </div>
              <p className="sn" style={{ color: 'rgba(255,255,255,0.45)', fontSize: 'clamp(0.8rem, 1.2vw, 0.95rem)', fontWeight: 300, letterSpacing: '0.06em' }}>{m.prazo}</p>
            </div>
            <div>
              <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', marginBottom: '1.5rem', marginTop: '1.5rem' }} />
              <p className="sn" style={{ color: 'rgba(255,255,255,0.4)', fontSize: 'clamp(0.65rem, 0.9vw, 0.75rem)', fontWeight: 400, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>PRÊMIO</p>
              <p className="sn" style={{ color: '#FFFFFF', fontWeight: 700, fontSize: 'clamp(1.4rem, 2.5vw, 2.2rem)', lineHeight: 1, letterSpacing: '-0.01em', textTransform: 'uppercase' }}>{m.premio}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Slide09Estrategia() {
  const points = [
    { title: 'Parcerias mantidas', desc: 'Manutenção de todas as parcerias estabelecidas durante a pré-venda.' },
    { title: '5 linhas de tabela', desc: 'Negociações com 5 linhas de tabela disponíveis para maior flexibilidade.' },
  ];
  return (
    <div className="relative w-full h-full flex" style={{ background: BG }}>
      {/* Left accent bar */}
      <div style={{ width: '5px', background: ACC, flexShrink: 0 }} />
      <div className="flex-1 flex flex-col justify-center px-20 py-16">
        <p className="sn sn-a0 tracking-[0.3em] uppercase mb-6" style={{ color: ACC, fontSize: 'clamp(0.65rem, 1vw, 0.8rem)', fontWeight: 500 }}>SYNTHÈ · COMERCIAL</p>
        <h2 className="sn sn-a1" style={{ color: DARK, fontWeight: 900, fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', lineHeight: 1, textTransform: 'uppercase', letterSpacing: '-0.01em' }}>
          ESTRATÉGIA<br />COMERCIAL
        </h2>
        <div className="sn-a2 mt-10 space-y-8">
          {points.map((pt, i) => (
            <div key={i} className="flex gap-8 items-start">
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: ACC, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span className="sn" style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '1.1rem' }}>{i + 1}</span>
              </div>
              <div>
                <p className="sn" style={{ color: DARK, fontWeight: 700, fontSize: 'clamp(1rem, 1.8vw, 1.4rem)', letterSpacing: '0.01em', marginBottom: '0.4rem' }}>{pt.title}</p>
                <p className="sn" style={{ color: `${DARK}70`, fontSize: 'clamp(0.85rem, 1.3vw, 1rem)', fontWeight: 300, lineHeight: 1.6 }}>{pt.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Right — decorative image */}
      <div className="relative w-2/5 h-full sn-fade">
        <Image src={`${P}/©VISTA_11_HALL_FINAL_03_FINAL - HALL .webp`} alt="Hall SYNTHÈ"
          fill className="object-cover" sizes="40vw" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(245,242,238,0.85) 0%, rgba(245,242,238,0.2) 60%, transparent 100%)' }} />
      </div>
    </div>
  );
}

function Slide10Cta() {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden" style={{ background: DARK }}>
      <div className="absolute inset-0">
        <Image src={`${P}/©VISTA_05_EXT_ACESSO_EXTERNO_OBSERVADOR_FINAL.webp`} alt="SYNTHÈ"
          fill className="object-cover" sizes="100vw" style={{ opacity: 0.18 }} />
      </div>
      <div className="relative z-10 flex flex-col items-center text-center px-12">
        <div className="sn-a0 mb-8">
          <Image src={`${P}/logo.png`} alt="SYNTHÈ" width={200} height={60}
            className="brightness-0 invert" style={{ width: 'clamp(140px, 14vw, 200px)', height: 'auto', opacity: 0.9 }} />
        </div>
        <p className="sn sn-a1 tracking-[0.35em] uppercase mb-10" style={{ color: 'rgba(255,255,255,0.45)', fontSize: 'clamp(0.65rem, 1vw, 0.8rem)' }}>
          ACESSE O MATERIAL COMPLETO
        </p>
        {/* QR Code placeholder */}
        <div className="sn-a2 flex flex-col items-center gap-4">
          <div style={{
            width: 'clamp(140px, 15vw, 180px)',
            height: 'clamp(140px, 15vw, 180px)',
            border: `2px dashed ${ACC}70`,
            borderRadius: '12px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(255,255,255,0.04)',
          }}>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.4 }}>
              <rect x="4" y="4" width="16" height="16" rx="2" stroke={ACC} strokeWidth="2.5" fill="none"/>
              <rect x="8" y="8" width="8" height="8" rx="1" fill={ACC}/>
              <rect x="28" y="4" width="16" height="16" rx="2" stroke={ACC} strokeWidth="2.5" fill="none"/>
              <rect x="32" y="8" width="8" height="8" rx="1" fill={ACC}/>
              <rect x="4" y="28" width="16" height="16" rx="2" stroke={ACC} strokeWidth="2.5" fill="none"/>
              <rect x="8" y="32" width="8" height="8" rx="1" fill={ACC}/>
              <rect x="28" y="28" width="4" height="4" rx="0.5" fill={ACC}/>
              <rect x="36" y="28" width="4" height="4" rx="0.5" fill={ACC}/>
              <rect x="28" y="36" width="4" height="4" rx="0.5" fill={ACC}/>
              <rect x="36" y="36" width="4" height="4" rx="0.5" fill={ACC}/>
            </svg>
            <p className="sn mt-2" style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>QR CODE</p>
          </div>
          <p className="sn" style={{ color: 'rgba(255,255,255,0.25)', fontSize: 'clamp(0.65rem, 0.9vw, 0.75rem)', letterSpacing: '0.1em' }}>
            grupo-plaenge.vercel.app/synthe
          </p>
        </div>
        <div className="sn-a3 mt-12" style={{ height: '1px', width: '60px', background: `${ACC}50` }} />
        <p className="sn sn-a4 mt-5" style={{ color: 'rgba(255,255,255,0.3)', fontSize: 'clamp(0.65rem, 0.9vw, 0.75rem)', letterSpacing: '0.25em', textTransform: 'uppercase' }}>
          PLAENGE · TGD · MONT&apos;SERRAT · PORTO ALEGRE
        </p>
      </div>
    </div>
  );
}

// ─── SLIDES MAP ───────────────────────────────────────────────────────────────

const SLIDES = [
  Slide01Capa,
  Slide02Highlight,
  Slide03Feature,
  Slide04Fachada,
  Slide05VideoGrid,
  Slide06Incentive,
  Slide07Media,
  Slide08Metas,
  Slide09Estrategia,
  Slide10Cta,
];

const LABELS = [
  'Abertura', 'Pré-Lançamento', 'Book Digital', 'Fachada',
  'Campanhas', 'Impulsionamento', 'Experiência', 'Metas', 'Estratégia', 'Material',
];

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function SynthePptCorretor() {
  const [slide, setSlide] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  const goTo = useCallback((n: number) => {
    if (n < 0 || n >= TOTAL) return;
    setSlide(n);
    setAnimKey(k => k + 1);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (['ArrowRight', 'ArrowDown', ' '].includes(e.key)) { e.preventDefault(); goTo(slide + 1); }
      if (['ArrowLeft', 'ArrowUp'].includes(e.key)) { e.preventDefault(); goTo(slide - 1); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [slide, goTo]);

  const SlideContent = SLIDES[slide];
  const isLight = [0, 3].includes(slide);

  return (
    <div className="fixed inset-0 overflow-hidden select-none" style={{ background: DARK }}>
      <style>{FONT_CSS}</style>

      {/* Slide */}
      <div key={animKey} className="w-full h-full">
        <SlideContent />
      </div>

      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-10 py-5 pointer-events-none">
        <div className="flex items-center gap-3">
          <div style={{ width: '20px', height: '1px', background: isLight ? 'rgba(255,255,255,0.35)' : `${ACC}60` }} />
          <span className="sn tracking-[0.25em] uppercase" style={{ color: isLight ? 'rgba(255,255,255,0.45)' : `${DARK}60`, fontSize: '0.62rem', fontWeight: 400 }}>
            {LABELS[slide]}
          </span>
        </div>
        <span className="sn tabular-nums" style={{ color: isLight ? 'rgba(255,255,255,0.3)' : `${DARK}40`, fontSize: '0.62rem', fontWeight: 300, letterSpacing: '0.15em' }}>
          {String(slide + 1).padStart(2, '0')} / {String(TOTAL).padStart(2, '0')}
        </span>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 z-40 h-0.5" style={{ background: 'rgba(255,255,255,0.07)' }}>
        <div style={{ width: `${((slide + 1) / TOTAL) * 100}%`, height: '100%', background: ACC, transition: 'width 0.45s cubic-bezier(.4,0,.2,1)' }} />
      </div>

      {/* Dot nav */}
      <div className="absolute bottom-3 left-0 right-0 z-40 flex justify-center gap-2 pointer-events-none">
        {Array.from({ length: TOTAL }).map((_, i) => (
          <button key={i} onClick={() => goTo(i)}
            className="pointer-events-auto transition-all duration-300"
            style={{
              width: i === slide ? '20px' : '5px',
              height: '5px',
              borderRadius: '3px',
              background: i === slide ? ACC : 'rgba(255,255,255,0.2)',
            }} />
        ))}
      </div>

      {/* Arrow nav (invisible hotzones) */}
      {slide > 0 && (
        <button onClick={() => goTo(slide - 1)}
          className="absolute left-0 top-8 bottom-8 w-20 z-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
          <ChevronLeft className="w-7 h-7" style={{ color: isLight ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.25)' }} />
        </button>
      )}
      {slide < TOTAL - 1 && (
        <button onClick={() => goTo(slide + 1)}
          className="absolute right-0 top-8 bottom-8 w-20 z-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
          <ChevronRight className="w-7 h-7" style={{ color: isLight ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.25)' }} />
        </button>
      )}
    </div>
  );
}
