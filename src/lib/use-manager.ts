'use client'

import { useEffect, useState } from 'react'
import { managers } from '@/lib/managers'

type Manager = typeof managers[0]

function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
  return match ? match[2] : undefined
}

export function useManager(): Manager | null {
  const [manager, setManager] = useState<Manager | null>(null)
  useEffect(() => {
    const slug = getCookie('manager')
    if (slug) {
      const found = managers.find(m => m.slug === slug)
      if (found) setManager(found)
    }
  }, [])
  return manager
}

export function trackClick(slug: string, product: string) {
  fetch('/api/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ slug, event: 'click', product }),
  }).catch(() => {})
}
