'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const SLIDES = [
  { src: '/EDITION/JAC_01_Fachada_A_EF2.webp', alt: 'Edition Moinhos — Fachada', pos: 'center 40%' },
  { src: '/VERDANT/©VISTA_01_EXT_FACHADA_DIURNA_FINAL.webp', alt: 'Verdant — Fachada Diurna', pos: 'center 30%' },
  { src: '/ORBITALE/01_FACHADA-01.webp', alt: 'Orbitale — Fachada', pos: 'center 75%' },
  { src: '/MOOD/01_fachada-05.webp', alt: 'Mood Central Parque — Fachada', pos: 'center 40%' },
  { src: '/EDITION/JAC_05_Fotomontagem_EF.webp', alt: 'Edition Moinhos — Fotomontagem', pos: 'center 40%' },
  { src: '/VERDANT/©VISTA_02_EXT_FACHADA_NOTURNA_FINAL.webp', alt: 'Verdant — Fachada Noturna', pos: 'center 30%' },
  { src: '/TREND/PNB_01_Fotomontagem_EF.webp', alt: 'Trend Downtown — Fotomontagem', pos: 'center 40%' },
  { src: '/VERDANT/©VISTA_11_EXT_AÉREA_ÁREA_CONDOMINIAL_FINAL.webp', alt: 'Verdant — Vista Aérea', pos: 'center 40%' },
  { src: '/EDITION/JAC_07_Piscina_A_EF2.webp', alt: 'Edition Moinhos — Piscina', pos: 'center 40%' },
  { src: '/MOOD/01_fachada-02.webp', alt: 'Mood Central Parque — Fachada', pos: 'center 40%' },
  { src: '/ORBITALE/01_FACHADA-02.webp', alt: 'Orbitale — Fachada', pos: 'center 75%' },
  { src: '/VERDANT/©VISTA_08_EXT_PISCINA_ABERTA_FINAL_.webp', alt: 'Verdant — Piscina', pos: 'center 40%' },
]

// 4 Ken Burns animations cycling per slide
const KB_ANIMS = ['kb1', 'kb2', 'kb3', 'kb4']

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const INTERVAL = 5000
const FADE_MS = 900

export function HomeHeroSlideshow() {
  const [slides, setSlides] = useState(SLIDES)
  const [current, setCurrent] = useState(0)
  const [next, setNext] = useState<number | null>(null)
  const [transitioning, setTransitioning] = useState(false)

  useEffect(() => {
    setSlides(shuffle(SLIDES))
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      const nextIdx = (current + 1) % slides.length
      setNext(nextIdx)
      setTransitioning(true)
      setTimeout(() => {
        setCurrent(nextIdx)
        setNext(null)
        setTransitioning(false)
      }, FADE_MS)
    }, INTERVAL)
    return () => clearInterval(timer)
  }, [current, slides.length])

  const currentSlide = slides[current]
  const nextSlide = next !== null ? slides[next] : null
  const currentAnim = KB_ANIMS[current % KB_ANIMS.length]
  const nextAnim = next !== null ? KB_ANIMS[next % KB_ANIMS.length] : 'kb1'

  return (
    <>
      <style>{`
        @keyframes kb1 {
          from { transform: scale(1.0) translate(0%, 0%); }
          to   { transform: scale(1.12) translate(-1.5%, -1%); }
        }
        @keyframes kb2 {
          from { transform: scale(1.12) translate(-2%, 0%); }
          to   { transform: scale(1.0) translate(0%, 1%); }
        }
        @keyframes kb3 {
          from { transform: scale(1.0) translate(1%, 1%); }
          to   { transform: scale(1.12) translate(-0.5%, -0.5%); }
        }
        @keyframes kb4 {
          from { transform: scale(1.08) translate(0%, -1%); }
          to   { transform: scale(1.0) translate(1%, 0.5%); }
        }
        .kb-slide {
          animation-timing-function: ease-in-out;
          animation-fill-mode: forwards;
        }
      `}</style>

      {/* Current slide — fades out during transition */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          opacity: transitioning ? 0 : 1,
          transition: `opacity ${FADE_MS}ms ease-in-out`,
          zIndex: 1,
        }}
      >
        <div
          className="kb-slide absolute inset-0"
          style={{ animation: `${currentAnim} ${INTERVAL + FADE_MS}ms ease-in-out forwards` }}
          key={`cur-wrap-${current}`}
        >
          <Image
            src={currentSlide.src}
            alt={currentSlide.alt}
            fill
            className="object-cover"
            style={{ objectPosition: currentSlide.pos }}
            sizes="100vw"
            priority={current === 0}
          />
        </div>
      </div>

      {/* Next slide — fades in during transition */}
      {nextSlide && (
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            opacity: transitioning ? 1 : 0,
            transition: `opacity ${FADE_MS}ms ease-in-out`,
            zIndex: 2,
          }}
        >
          <div
            className="kb-slide absolute inset-0"
            style={{ animation: `${nextAnim} ${INTERVAL + FADE_MS}ms ease-in-out forwards` }}
            key={`next-wrap-${next}`}
          >
            <Image
              src={nextSlide.src}
              alt={nextSlide.alt}
              fill
              className="object-cover"
              style={{ objectPosition: nextSlide.pos }}
              sizes="100vw"
            />
          </div>
        </div>
      )}

      {/* Dark overlay — always on top */}
      <div className="absolute inset-0 bg-black/55" style={{ zIndex: 3 }} />
    </>
  )
}
