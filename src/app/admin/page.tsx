'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { units as editionUnits } from '@/lib/edition-data'
import { units as moodUnits } from '@/lib/mood-data'
import { units as orbitaleUnits } from '@/lib/orbitale-data'
import { units as syntheUnits } from '@/lib/synthe-data'
import { homeUnits, nanoUnits } from '@/lib/trend-data'
import { units as verdantUnits } from '@/lib/verdant-data'
import { units as yunaUnits } from '@/lib/yuna-data'
import { lots as waveLots } from '@/lib/wave-data'
import rawOverrides from '@/data/availability-overrides.json'

type Status = 'available' | 'sold' | 'negotiation'
type WaveStatus = 'available' | 'sold' | 'negotiation' | 'opportunity'
type OverridesMap = Record<string, Record<string, string>>

const STATUS_LABEL: Record<Status, string> = {
  available: 'Disponível',
  negotiation: 'Reservada',
  sold: 'Vendida',
}
const WAVE_STATUS_LABEL: Record<WaveStatus, string> = {
  available: 'Disponível',
  negotiation: 'Reservada',
  sold: 'Vendido',
  opportunity: 'Oportunidade',
}

const STATUS_COLORS: Record<Status, string> = {
  available: 'bg-green-500 hover:bg-green-400 text-white',
  negotiation: 'bg-yellow-500 hover:bg-yellow-400 text-white',
  sold: 'bg-red-500 hover:bg-red-400 text-white',
}
const WAVE_STATUS_COLORS: Record<WaveStatus, string> = {
  available: 'bg-green-500 hover:bg-green-400 text-white',
  negotiation: 'bg-yellow-500 hover:bg-yellow-400 text-white',
  sold: 'bg-red-500 hover:bg-red-400 text-white',
  opportunity: 'bg-blue-500 hover:bg-blue-400 text-white',
}

const STATUS_CYCLE: Status[] = ['available', 'negotiation', 'sold']
const WAVE_STATUS_CYCLE: WaveStatus[] = ['available', 'negotiation', 'sold', 'opportunity']

const PRODUCTS = [
  { key: 'edition', label: 'EDITION', units: editionUnits, isWave: false },
  { key: 'mood', label: 'MOOD', units: moodUnits, isWave: false },
  { key: 'orbitale', label: 'ORBITALE', units: orbitaleUnits, isWave: false },
  { key: 'synthe', label: 'SYNTHÈ', units: syntheUnits as { id: number; code: string; floor: number; status: Status }[], isWave: false },
  { key: 'trend_home', label: 'TREND Home', units: homeUnits, isWave: false },
  { key: 'trend_nano', label: 'TREND Nano', units: nanoUnits, isWave: false },
  { key: 'verdant', label: 'VERDANT', units: verdantUnits, isWave: false },
  { key: 'yuna', label: 'YUNA', units: yunaUnits, isWave: false },
  { key: 'wave', label: 'WAVE', units: [], isWave: true },
]

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState('')
  const [adminView, setAdminView] = useState<'disponibilidade' | 'gestores'>('disponibilidade')
  const [activeProduct, setActiveProduct] = useState(PRODUCTS[0].key)
  const [overrides, setOverrides] = useState<OverridesMap>(rawOverrides as OverridesMap)
  const [saving, setSaving] = useState(false)
  const [saveMsg, setSaveMsg] = useState('')

  // Analytics state
  const [analyticsData, setAnalyticsData] = useState<{
    slug: string; name: string; photo: string;
    visits: number; clicks: number;
    daily: { date: string; visits: number; clicks: number }[]
  }[]>([])
  const [analyticsDays, setAnalyticsDays] = useState(30)
  const [analyticsLoading, setAnalyticsLoading] = useState(false)

  const loadAnalytics = useCallback(async (days: number) => {
    const pw = sessionStorage.getItem('admin_password') || ''
    setAnalyticsLoading(true)
    const res = await fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: pw, days }),
    })
    if (res.ok) {
      const { data } = await res.json()
      setAnalyticsData(data)
    }
    setAnalyticsLoading(false)
  }, [])

  useEffect(() => {
    if (authed && adminView === 'gestores') loadAnalytics(analyticsDays)
  }, [authed, adminView, analyticsDays, loadAnalytics])

  useEffect(() => {
    if (sessionStorage.getItem('admin_authed') === '1') setAuthed(true)
  }, [])

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
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

  function cycleStatus(productKey: string, unitId: number, currentStatus: string) {
    const isWave = productKey === 'wave'
    const cycle = isWave ? WAVE_STATUS_CYCLE : STATUS_CYCLE
    const idx = cycle.indexOf(currentStatus as never)
    const nextStatus = cycle[(idx + 1) % cycle.length]
    setOverrides(prev => ({
      ...prev,
      [productKey]: { ...prev[productKey], [String(unitId)]: nextStatus },
    }))
    setSaveMsg('')
  }

  async function handleSave() {
    setSaving(true)
    setSaveMsg('')
    const pw = sessionStorage.getItem('admin_password') || ''

    const cleaned: OverridesMap = {}

    // Standard products
    for (const product of PRODUCTS.filter(p => !p.isWave)) {
      const productOv = overrides[product.key] || {}
      const cleanedProduct: Record<string, string> = {}
      for (const unit of product.units) {
        const originalStatus = unit.status as string
        const overrideStatus = productOv[String(unit.id)]
        if (overrideStatus && overrideStatus !== originalStatus) {
          cleanedProduct[String(unit.id)] = overrideStatus
        }
      }
      cleaned[product.key] = cleanedProduct
    }

    // WAVE lots
    const waveOv = overrides['wave'] || {}
    const cleanedWave: Record<string, string> = {}
    for (const lot of waveLots) {
      const originalStatus = lot.status as string
      const overrideStatus = waveOv[String(lot.id)]
      if (overrideStatus && overrideStatus !== originalStatus) {
        cleanedWave[String(lot.id)] = overrideStatus
      }
    }
    cleaned['wave'] = cleanedWave

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

  const isWaveActive = activeProduct === 'wave'
  const productOv = overrides[activeProduct] || {}
  const changedCount = Object.values(overrides).reduce((acc, m) => acc + Object.keys(m).length, 0)

  // Standard product grouping by floor
  const currentProduct = PRODUCTS.find(p => p.key === activeProduct)!
  const byFloor: Record<number, typeof currentProduct.units> = {}
  if (!isWaveActive) {
    for (const unit of currentProduct.units) {
      if (!byFloor[unit.floor]) byFloor[unit.floor] = []
      byFloor[unit.floor].push(unit)
    }
  }
  const floors = Object.keys(byFloor).map(Number).sort((a, b) => b - a)

  // WAVE grouping by block
  const byBlock: Record<string, typeof waveLots> = {}
  if (isWaveActive) {
    for (const lot of waveLots) {
      if (!byBlock[lot.block]) byBlock[lot.block] = []
      byBlock[lot.block].push(lot)
    }
  }
  const blocks = Object.keys(byBlock).sort()

  // Summary counts for active product
  const summaryItems = isWaveActive
    ? WAVE_STATUS_CYCLE.map(s => ({
        status: s,
        label: WAVE_STATUS_LABEL[s],
        color: WAVE_STATUS_COLORS[s],
        count: waveLots.filter(l => ((productOv[String(l.id)] as WaveStatus) ?? l.status) === s).length,
      }))
    : STATUS_CYCLE.map(s => ({
        status: s,
        label: STATUS_LABEL[s],
        color: STATUS_COLORS[s],
        count: currentProduct.units.filter(u => ((productOv[String(u.id)] as Status) ?? u.status) === s).length,
      }))

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

      {/* View switcher */}
      <div className="px-6 pt-4 flex gap-2 border-b border-gray-800 pb-3">
        {(['disponibilidade', 'gestores'] as const).map(v => (
          <button key={v} onClick={() => setAdminView(v)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium capitalize transition-colors ${adminView === v ? 'bg-white text-gray-900' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}>
            {v === 'disponibilidade' ? '📋 Disponibilidade' : '📊 Gestores'}
          </button>
        ))}
      </div>

      {/* Analytics dashboard */}
      {adminView === 'gestores' && (
        <div className="px-6 py-4">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-sm text-gray-400">Período:</span>
            {[7, 30, 90].map(d => (
              <button key={d} onClick={() => setAnalyticsDays(d)}
                className={`px-3 py-1 rounded-lg text-sm transition-colors ${analyticsDays === d ? 'bg-white text-gray-900 font-semibold' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}>
                {d} dias
              </button>
            ))}
            <button onClick={() => loadAnalytics(analyticsDays)}
              className="ml-2 px-3 py-1 bg-gray-800 hover:bg-gray-700 text-gray-400 rounded-lg text-sm transition-colors">
              ↻ Atualizar
            </button>
          </div>

          {analyticsLoading ? (
            <div className="text-gray-500 text-sm py-8 text-center">Carregando...</div>
          ) : (
            <div className="space-y-4">
              {analyticsData.map(m => {
                const conversion = m.visits > 0 ? ((m.clicks / m.visits) * 100).toFixed(1) : '0'
                const maxVisits = Math.max(...m.daily.map(d => d.visits), 1)
                return (
                  <div key={m.slug} className="bg-gray-900 rounded-xl p-4 border border-gray-800">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-gray-700">
                        <Image src={m.photo} alt={m.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">{m.name}</p>
                        <p className="text-xs text-gray-500 font-mono">grupo-plaenge.vercel.app/g/{m.slug}</p>
                      </div>
                      <div className="flex gap-4 text-center">
                        <div>
                          <p className="text-2xl font-bold text-blue-400">{m.visits}</p>
                          <p className="text-xs text-gray-500">Visitas</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-green-400">{m.clicks}</p>
                          <p className="text-xs text-gray-500">Cliques WA</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-yellow-400">{conversion}%</p>
                          <p className="text-xs text-gray-500">Conversão</p>
                        </div>
                      </div>
                    </div>
                    {/* Mini bar chart */}
                    <div className="flex items-end gap-0.5 h-12">
                      {m.daily.slice(-30).map(d => (
                        <div key={d.date} className="flex-1 flex flex-col justify-end gap-0.5" title={`${d.date}: ${d.visits} visitas, ${d.clicks} cliques`}>
                          <div className="bg-green-600 rounded-sm" style={{ height: `${d.clicks > 0 ? Math.max((d.clicks / maxVisits) * 48, 3) : 0}px` }} />
                          <div className="bg-blue-600 rounded-sm" style={{ height: `${d.visits > 0 ? Math.max((d.visits / maxVisits) * 48, 3) : 0}px` }} />
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-4 mt-1 text-xs text-gray-600">
                      <span className="flex items-center gap-1"><span className="w-2 h-2 bg-blue-600 rounded-sm inline-block"/>Visitas</span>
                      <span className="flex items-center gap-1"><span className="w-2 h-2 bg-green-600 rounded-sm inline-block"/>Cliques WA</span>
                    </div>
                  </div>
                )
              })}
              {analyticsData.length === 0 && (
                <p className="text-gray-500 text-sm text-center py-8">Nenhum dado ainda. Compartilhe os links para começar a rastrear.</p>
              )}
            </div>
          )}

          {/* Links dos gestores */}
          <div className="mt-6 bg-gray-900 rounded-xl p-4 border border-gray-800">
            <p className="font-semibold mb-3 text-sm text-gray-300">Links para compartilhar</p>
            <div className="space-y-2">
              {[
                { slug: 'jardim',  name: 'Jardim' },
                { slug: 'raffael', name: 'Raffael' },
                { slug: 'renato',  name: 'Renato' },
                { slug: 'charles', name: 'Charles' },
                { slug: 'nishi',   name: 'Nishi' },
              ].map(m => (
                <div key={m.slug} className="flex items-center justify-between py-1">
                  <span className="text-sm text-gray-400">{m.name}</span>
                  <code className="text-xs bg-gray-800 px-2 py-1 rounded text-blue-300 select-all">
                    grupo-plaenge.vercel.app/g/{m.slug}
                  </code>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {adminView === 'disponibilidade' && <>
      {/* Legend */}
      <div className="px-6 pt-4 flex gap-3 text-xs flex-wrap">
        {(isWaveActive ? WAVE_STATUS_CYCLE : STATUS_CYCLE).map(s => (
          <span key={s} className={`px-2 py-0.5 rounded ${isWaveActive ? WAVE_STATUS_COLORS[s as WaveStatus] : STATUS_COLORS[s as Status]}`}>
            {isWaveActive ? WAVE_STATUS_LABEL[s as WaveStatus] : STATUS_LABEL[s as Status]}
          </span>
        ))}
        <span className="text-gray-400 ml-2">— clique para alternar o status</span>
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
                activeProduct === p.key ? 'bg-white text-gray-900' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
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

      {/* Summary */}
      <div className="px-6 pt-4 flex gap-3 flex-wrap">
        {summaryItems.map(item => (
          <div key={item.status} className="bg-gray-800 rounded-lg px-4 py-2 flex flex-col items-center min-w-[80px]">
            <span className="text-2xl font-bold">{item.count}</span>
            <span className={`text-xs mt-0.5 px-2 py-0.5 rounded ${item.color}`}>{item.label}</span>
          </div>
        ))}
        <div className="bg-gray-800 rounded-lg px-4 py-2 flex flex-col items-center min-w-[80px]">
          <span className="text-2xl font-bold text-gray-400">
            {isWaveActive ? waveLots.length : currentProduct.units.length}
          </span>
          <span className="text-xs mt-0.5 text-gray-400">Total</span>
        </div>
      </div>

      {/* Grid — standard products */}
      {!isWaveActive && (
        <div className="px-6 py-4 space-y-3">
          {floors.map(floor => (
            <div key={floor} className="flex items-center gap-2">
              <span className="text-gray-500 text-xs w-12 text-right shrink-0">
                {floor === 0 ? 'Térreo' : `${floor}º`}
              </span>
              <div className="flex gap-1.5 flex-wrap">
                {byFloor[floor].map(unit => {
                  const base = unit.status as Status
                  const current: Status = (productOv[String(unit.id)] as Status) ?? base
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
      )}

      {/* Grid — WAVE lotes por quadra */}
      {isWaveActive && (
        <div className="px-6 py-4 space-y-4">
          {blocks.map(block => (
            <div key={block} className="flex items-start gap-3">
              <span className="text-gray-500 text-xs w-14 text-right shrink-0 pt-1">
                Quadra {block}
              </span>
              <div className="flex gap-1.5 flex-wrap">
                {byBlock[block].map(lot => {
                  const base = lot.status as WaveStatus
                  const current: WaveStatus = (productOv[String(lot.id)] as WaveStatus) ?? base
                  const changed = productOv[String(lot.id)] !== undefined && productOv[String(lot.id)] !== base
                  return (
                    <button
                      key={lot.id}
                      onClick={() => cycleStatus('wave', lot.id, current)}
                      title={`Lote ${lot.number} — ${WAVE_STATUS_LABEL[current]}`}
                      className={`text-xs font-mono px-2 py-1 rounded transition-colors ${WAVE_STATUS_COLORS[current]} ${changed ? 'ring-2 ring-orange-400' : ''}`}
                    >
                      L{lot.number}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </>}
    </div>
  )
}
