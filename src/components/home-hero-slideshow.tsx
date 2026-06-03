'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const SLIDES = [
  { src: '/EDITION/JAC_01_Fachada_A_EF2.webp', alt: 'Edition Moinhos — Fachada' },
  { src: '/VERDANT/©VISTA_01_EXT_FACHADA_DIURNA_FINAL.webp', alt: 'Verdant — Fachada Diurna' },
  { src: '/ORBITALE/01_FACHADA-01.webp', alt: 'Orbitale — Fachada' },
  { src: '/MOOD/01_fachada-05.webp', alt: 'Mood Central Parque — Fachada' },
  { src: '/EDITION/JAC_05_Fotomontagem_EF.webp', alt: 'Edition Moinhos — Fotomontagem' },
  { src: '/VERDANT/©VISTA_02_EXT_FACHADA_NOTURNA_FINAL.webp', alt: 'Verdant — Fachada Noturna' },
  { src: '/TREND/PNB_01_Fotomontagem_EF.webp', alt: 'Trend Downtown — Fotomontagem' },
  { src: '/VERDANT/©VISTA_11_EXT_AÉREA_ÁREA_CONDOMINIAL_FINAL.webp', alt: 'Verdant — Vista Aérea' },
  { src: '/EDITION/JAC_07_Piscina_A_EF2.webp', alt: 'Edition Moinhos — Piscina' },
  { src: '/MOOD/01_fachada-02.webp', alt: 'Mood Central Parque — Fachada' },
  { src: '/ORBITALE/01_FACHADA-02.webp', alt: 'Orbitale — Fachada' },
  { src: '/VERDANT/©VISTA_08_EXT_PISCINA_ABERTA_FINAL_.webp', alt: 'Verdant — Piscina' },
]

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const INTERVAL = 5000

export function HomeHeroSlideshow() {
  const [slides] = useState(() => shuffle(SLIDES))
  const [current, setCurrent] = useState(0)
  const [prev, setPrev] = useState<number | null>(null)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setPrev(current)
      setFading(true)
      const next = (current + 1) % slides.length
      setTimeout(() => {
        setCurrent(next)
        setFading(false)
        setPrev(null)
      }, 800)
    }, INTERVAL)
    return () => clearInterval(timer)
  }, [current, slides.length])

  return (
    <>
      {/* Previous slide (fading out) */}
      {prev !== null && (
        <Image
          key={`prev-${prev}`}
          src={slides[prev].src}
          alt={slides[prev].alt}
          fill
          className="object-cover"
          style={{ opacity: fading ? 0 : 1, transition: 'opacity 0.8s ease' }}
          priority
        />
      )}
      {/* Current slide */}
      <Image
        key={`cur-${current}`}
        src={slides[current].src}
        alt={slides[current].alt}
        fill
        className="object-cover"
        style={{ opacity: fading ? 0 : 1, transition: 'opacity 0.8s ease' }}
        priority={current === 0}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/55" />
    </>
  )
}
