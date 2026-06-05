'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { managers } from '@/lib/managers'

function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
  return match ? match[2] : undefined
}

interface Props {
  product?: string // ex: 'EDITION', 'MOOD' etc — para personalizar a mensagem
}

export function WhatsappButton({ product }: Props) {
  const [manager, setManager] = useState<typeof managers[0] | null>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const slug = getCookie('manager')
    if (slug) {
      const found = managers.find(m => m.slug === slug)
      if (found) setManager(found)
    }
  }, [])

  if (!manager) return null

  function handleClick() {
    if (!manager) return
    // Track click
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug: manager.slug, event: 'click', product }),
    }).catch(() => {})

    const msg = product
      ? `Olá ${manager.name}, tenho interesse no empreendimento ${product} do Grupo Plaenge!`
      : `Olá ${manager.name}, tenho interesse nos empreendimentos do Grupo Plaenge!`
    const url = `https://wa.me/${manager.phone}?text=${encodeURIComponent(msg)}`
    window.open(url, '_blank')
    setOpen(false)
  }

  return (
    <>
      {/* Card expandido */}
      {open && (
        <div
          className="fixed bottom-24 right-5 z-50 bg-white rounded-2xl shadow-2xl p-4 w-64 border border-gray-100"
          style={{ animation: 'fadeInUp 0.2s ease' }}
        >
          <button
            onClick={() => setOpen(false)}
            className="absolute top-2 right-3 text-gray-400 hover:text-gray-600 text-lg"
          >
            ×
          </button>
          <div className="flex items-center gap-3 mb-3">
            <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-green-500">
              <Image src={manager.photo} alt={manager.name} fill className="object-cover" />
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">{manager.name}</p>
              <p className="text-xs text-gray-500">Gestor Comercial</p>
            </div>
          </div>
          <p className="text-xs text-gray-600 mb-3">
            Fale diretamente com seu gestor pelo WhatsApp.
          </p>
          <button
            onClick={handleClick}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-xl text-sm flex items-center justify-center gap-2 transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Falar no WhatsApp
          </button>
        </div>
      )}

      {/* Botão flutuante */}
      <button
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-5 right-5 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 active:scale-95"
        aria-label="WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </button>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  )
}
