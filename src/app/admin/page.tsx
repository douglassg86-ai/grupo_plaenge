'use client'

import { useState, useEffect } from 'react'
import { units as editionUnits } from '@/lib/edition-data'
import { units as moodUnits } from '@/lib/mood-data'
import { units as orbitaleUnits } from '@/lib/orbitale-data'
import { units as syntheUnits } from '@/lib/synthe-data'
import { homeUnits, nanoUnits } from '@/lib/trend-data'
import { units as verdantUnits } from '@/lib/verdant-data'
import { units as yunaUnits } from '@/lib/yuna-data'
import rawOverrides from '@/data/availability-overrides.json'

type Status = 'available' | 'sold' | 'negotiation'
type OverridesMap = Record<string, Record<string, Status>>

const STATUS_LABEL: Record<Status, string> = {
  available: 'Disponível',
  negotiation: 'Reservada',
  sold: 'Vendida',
}

const STATUS_COLORS: Record<Status, string> = {
  available: 'bg-green-500 hover:bg-green-400 text-white',
  negotiation: 'bg-yellow-500 hover:bg-yellow-400 text-white',
  sold: 'bg-red-500 hover:bg-red-400 text-white',
}

const STATUS_CYCLE: Status[] = ['available', 'negotiation', 'sold']

const PRODUCTS = [
  { key: 'edition', label: 'EDITION', units: editionUnits },
  { key: 'mood', label: 'MOOD', units: moodUnits },
  { key: 'orbitale', label: 'ORBITALE', units: orbitaleUnits },
  { key: 'synthe', label: 'SYNTHÈ', units: syntheUnits as { id: number; code: string; floor: number; status: Status }[] },
  { key: 'trend_home', label: 'TREND Home', units: homeUnits },
  { key: 'trend_nano', label: 'TREND Nano', units: nanoUnits },
  { key: 'verdant', label: 'VERDANT', units: verdantUnits },
  { key: 'yuna', label: 'YUNA', units: yunaUnits },
]

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState('')
  const [activeProduct, setActiveProduct] = useState(PRODUCTS[0].key)
  const [overrides, setOverrides] = useState<OverridesMap>(rawOverrides as OverridesMap)
  const [saving, setSaving] = useState(false)
  const [saveMsg, setSaveMsg] = useState('')

  // Restore session
  useEffect(() => {
    if (sessionStorage.getItem('admin_authed') === '1') setAuthed(true)
  }, [])

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    // Client-side pre-check via API
    fetch('/api/admin/commit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password, overrides, _check: true }),
    }).then(async r => {
      if (r.status === 401) {
        setAuthError('Senha incorreta')
      } else {
        sessionStorage.setItem('admin_authed', '1')
        sessionStorage.setItem('admin_password', password)
        setAuthed(true)
      }
    })
  }

  function cycleStatus(productKey: string, unitId: number, currentStatus: Status) {
    const idx = STATUS_CYCLE.indexOf(currentStatus)
    const nextStatus = STATUS_CYCLE[(idx + 1) % STATUS_CYCLE.length]
    setOverrides(prev => ({
      ...prev,
      [productKey]: {
        ...prev[productKey],
        [String(unitId)]: nextStatus,
      },
    }))
    setSaveMsg('')
  }

  async function handleSave() {
    setSaving(true)
    setSaveMsg('')
    const pw = sessionStorage.getItem('admin_password') || ''
    // Clean up overrides — remove entries that match the original status
    const cleaned: OverridesMap = {}
    for (const product of PRODUCTS) {
      const productOv = overrides[product.key] || {}
      const cleanedProduct: Record<string, Status> = {}
      for (const unit of product.units) {
        const originalStatus = unit.status as Status
        const overrideStatus = productOv[String(unit.id)]
        if (overrideStatus && overrideStatus !== originalStatus) {
          cleanedProduct[String(unit.id)] = overrideStatus
        }
      }
      cleaned[product.key] = cleanedProduct
    }

    const res = await fetch('/api/admin/commit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: pw, overrides: cleaned }),
    })

    setSaving(false)
    if (res.ok) {
      setSaveMsg('✓ Publicado! Deploy em ~2 minutos.')
    } else {
      const { error } = await res.json()
      setSaveMsg(`Erro: ${error}`)
    }
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <form onSubmit={handleLogin} className="bg-gray-900 p-8 rounded-xl w-80 space-y-4">
          <h1 className="text-white text-xl font-semibold text-center">Admin · Disponibilidade</h1>
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-gray-500"
          />
          {authError && <p className="text-red-400 text-sm text-center">{authError}</p>}
          <button
            type="submit"
            className="w-full bg-white text-gray-900 font-semibold py-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Entrar
          </button>
        </form>
      </div>
    )
  }

  const currentProduct = PRODUCTS.find(p => p.key === activeProduct)!
  const productOv = overrides[activeProduct] || {}

  // Group units by floor
  const byFloor: Record<number, typeof currentProduct.units> = {}
  for (const unit of currentProduct.units) {
    if (!byFloor[unit.floor]) byFloor[unit.floor] = []
    byFloor[unit.floor].push(unit)
  }
  const floors = Object.keys(byFloor).map(Number).sort((a, b) => b - a)

  // Count changes
  const changedCount = Object.values(overrides).reduce(
    (acc, m) => acc + Object.keys(m).length, 0
  )

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gray-900 border-b border-gray-800 px-6 py-3 flex items-center justify-between">
        <h1 className="font-semibold text-lg">Admin · Disponibilidade</h1>
        <div className="flex items-center gap-3">
          {saveMsg && (
            <span className={`text-sm ${saveMsg.startsWith('✓') ? 'text-green-400' : 'text-red-400'}`}>
              {saveMsg}
            </span>
          )}
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-white text-gray-900 font-semibold px-4 py-1.5 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 text-sm"
          >
            {saving ? 'Publicando...' : `Salvar e publicar${changedCount > 0 ? ` (${changedCount})` : ''}`}
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="px-6 pt-4 flex gap-4 text-xs">
        {STATUS_CYCLE.map(s => (
          <span key={s} className={`px-2 py-0.5 rounded ${STATUS_COLORS[s]}`}>
            {STATUS_LABEL[s]}
          </span>
        ))}
        <span className="text-gray-400 ml-2">— clique numa unidade para alternar o status</span>
      </div>

      {/* Product tabs */}
      <div className="px-6 pt-4 flex gap-2 flex-wrap">
        {PRODUCTS.map(p => {
          const productChanges = Object.keys(overrides[p.key] || {}).length
          return (
            <button
              key={p.key}
              onClick={() => setActiveProduct(p.key)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                activeProduct === p.key
                  ? 'bg-white text-gray-900'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {p.label}
              {productChanges > 0 && (
                <span className="ml-1.5 bg-orange-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {productChanges}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Unit grid */}
      <div className="px-6 py-4 space-y-3">
        {floors.map(floor => (
          <div key={floor} className="flex items-center gap-2">
            <span className="text-gray-500 text-xs w-12 text-right shrink-0">
              {floor === 0 ? 'Térreo' : `${floor}º`}
            </span>
            <div className="flex gap-1.5 flex-wrap">
              {byFloor[floor].map(unit => {
                const base = unit.status as Status
                const current: Status = productOv[String(unit.id)] ?? base
                const changed = productOv[String(unit.id)] !== undefined && productOv[String(unit.id)] !== base
                return (
                  <button
                    key={unit.id}
                    onClick={() => cycleStatus(activeProduct, unit.id, current)}
                    title={`${unit.code} — ${STATUS_LABEL[current]}`}
                    className={`text-xs font-mono px-2 py-1 rounded transition-colors ${STATUS_COLORS[current]} ${changed ? 'ring-2 ring-orange-400' : ''}`}
                  >
                    {unit.code}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
