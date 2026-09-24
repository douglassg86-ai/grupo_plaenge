'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { units as editionUnits, towers as editionTowers } from '@/lib/edition-data'
import { units as moodUnits } from '@/lib/mood-data'
import { units as orbitaleUnits } from '@/lib/orbitale-data'
import { units as syntheUnits } from '@/lib/synthe-data'
import { homeUnits, nanoUnits } from '@/lib/trend-data'
import { units as verdantUnits } from '@/lib/verdant-data'
import { units as yunaUnits } from '@/lib/yuna-data'
import { lots as waveLots } from '@/lib/wave-data'
import { shiftUnits } from '@/lib/shift-data'
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
  { key: 'edition', label: 'EDITION', units: editionUnits, isWave: false, hasTowers: true },
  { key: 'mood', label: 'MOOD', units: moodUnits, isWave: false, hasTowers: false },
  { key: 'orbitale', label: 'ORBITALE', units: orbitaleUnits, isWave: false, hasTowers: false },
  { key: 'shift', label: 'SHIFT', units: shiftUnits, isWave: false, hasTowers: false },
  { key: 'synthe', label: 'SYNTHÈ', units: syntheUnits as { id: number; code: string; floor: number; status: Status }[], isWave: false, hasTowers: false },
  { key: 'trend_home', label: 'TREND Home', units: homeUnits, isWave: false, hasTowers: false },
  { key: 'trend_nano', label: 'TREND Nano', units: nanoUnits, isWave: false, hasTowers: false },
  { key: 'verdant', label: 'VERDANT', units: verdantUnits, isWave: false, hasTowers: false },
  { key: 'yuna', label: 'YUNA', units: yunaUnits, isWave: false, hasTowers: false },
  { key: 'wave', label: 'WAVE', units: [], isWave: true, hasTowers: false },
]

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState('')
  const [adminView, setAdminView] = useState<'disponibilidade' | 'gestores' | 'interesse'>('disponibilidade')
  const [activeProduct, setActiveProduct] = useState(PRODUCTS[0].key)
  const [activeTower, setActiveTower] = useState(editionTowers[0])
  const [overrides, setOverrides] = useState<OverridesMap>(rawOverrides as OverridesMap)
  const [saving, setSaving] = useState(false)
  const [saveMsg, setSaveMsg] = useState('')

  // Video views state
  const [videoViews, setVideoViews] = useState<{ total: number; today: number } | null>(null)

  // Shared date range for all analytics views
  const [dateStart, setDateStart] = useState(() => {
    const d = new Date(); d.setDate(d.getDate() - 29)
    return d.toISOString().slice(0, 10)
  })
  const [dateEnd, setDateEnd] = useState(() => new Date().toISOString().slice(0, 10))

  // Gestores analytics state
  const [analyticsData, setAnalyticsData] = useState<{
    slug: string; name: string; photo: string;
    visits: number; clicks: number;
    daily: { date: string; visits: number; clicks: number }[]
    byProduct: Record<string, number>
  }[]>([])
  const [analyticsLoading, setAnalyticsLoading] = useState(false)
  const [dacoesData, setDacoesData] = useState<{ total: number; byDacao: Record<string, number> } | null>(null)
  const [productVisitsData, setProductVisitsData] = useState<{ product: string; visits: number }[]>([])
  const [contentByProduct, setContentByProduct] = useState<Record<string, { contentType: string; label: string; count: number }[]>>({})
  const [expandedProducts, setExpandedProducts] = useState<Set<string>>(new Set())

  const loadAnalytics = useCallback(async (start: string, end: string) => {
    const pw = sessionStorage.getItem('admin_password') || ''
    setAnalyticsLoading(true)
    const res = await fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: pw, startDate: start, endDate: end }),
    })
    if (res.ok) {
      const { data, dacoes, productVisits, contentByProduct: cByP } = await res.json()
      setAnalyticsData(data)
      if (dacoes) setDacoesData(dacoes)
      if (productVisits) setProductVisitsData(productVisits)
      if (cByP) setContentByProduct(cByP)
    }
    setAnalyticsLoading(false)
  }, [])

  function toggleProductExpand(key: string) {
    setExpandedProducts(prev => {
      const next = new Set(prev)
      next.has(key) ? next.delete(key) : next.add(key)
      return next
    })
  }

  const CONTENT_TYPE_COLOR: Record<string, string> = {
    download: 'text-blue-400',
    acesso:   'text-violet-400',
    video:    'text-rose-400',
    visita:   'text-green-400',
  }

  // Interesse (unit clicks) state
  const [interestProduct, setInterestProduct] = useState('YUNA')
  const [interestData, setInterestData] = useState<{ code: string; clicks: number }[]>([])
  const [interestLoading, setInterestLoading] = useState(false)

  const INTEREST_PRODUCTS = ['YUNA','EDITION','MOOD','ORBITALE','VERDANT','TREND HOME','TREND NANO','WAVE']

  const loadInterest = useCallback(async (product: string, start: string, end: string) => {
    const pw = sessionStorage.getItem('admin_password') || ''
    setInterestLoading(true)
    const res = await fetch('/api/unit-analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: pw, product, startDate: start, endDate: end }),
    })
    if (res.ok) {
      const { units } = await res.json()
      setInterestData(units ?? [])
    }
    setInterestLoading(false)
  }, [])

  useEffect(() => {
    if (authed && adminView === 'gestores') loadAnalytics(dateStart, dateEnd)
  }, [authed, adminView, dateStart, dateEnd, loadAnalytics])

  useEffect(() => {
    if (authed && adminView === 'interesse') loadInterest(interestProduct, dateStart, dateEnd)
  }, [authed, adminView, interestProduct, dateStart, dateEnd, loadInterest])

  useEffect(() => {
    if (sessionStorage.getItem('admin_authed') === '1') setAuthed(true)
  }, [])

  useEffect(() => {
    if (!authed) return
    const pw = sessionStorage.getItem('admin_password') || ''
    fetch('/api/video-views', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: pw }),
    }).then(async r => {
      if (r.ok) {
        const d = await r.json()
        if (d.ok) setVideoViews({ total: d.total, today: d.today })
      }
    }).catch(() => {})
  }, [authed])

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

    // Save the full overrides state as-is — do NOT compare against unit.status
    // (unit.status is already post-override, so the comparison would incorrectly drop saved overrides)
    const cleaned: OverridesMap = {}
    for (const key of Object.keys(overrides)) {
      cleaned[key] = { ...overrides[key] }
    }
    // Ensure all known product keys exist
    for (const product of PRODUCTS) {
      if (!cleaned[product.key]) cleaned[product.key] = {}
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

  const isWaveActive = activeProduct === 'wave'
  const productOv = overrides[activeProduct] || {}
  const changedCount = Object.values(overrides).reduce((acc, m) => acc + Object.keys(m).length, 0)

  // Standard product grouping by floor
  const currentProduct = PRODUCTS.find(p => p.key === activeProduct)!
  const byFloor: Record<number, typeof currentProduct.units> = {}
  if (!isWaveActive) {
    const unitsToShow = activeProduct === 'edition'
      ? (currentProduct.units as typeof editionUnits).filter(u => u.tower === activeTower)
      : currentProduct.units
    for (const unit of unitsToShow) {
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
      <div className="px-6 pt-4 flex gap-2 border-b border-gray-800 pb-3 flex-wrap">
        {([
          { key: 'disponibilidade', label: '📋 Disponibilidade' },
          { key: 'gestores',        label: '📊 Gestores' },
          { key: 'interesse',       label: '🎯 Interesse' },
        ] as const).map(v => (
          <button key={v.key} onClick={() => setAdminView(v.key)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${adminView === v.key ? 'bg-white text-gray-900' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}>
            {v.label}
          </button>
        ))}
      </div>

      {/* Shared date range picker — shown in gestores and interesse */}
      {(adminView === 'gestores' || adminView === 'interesse') && (
        <div className="px-6 pt-4 pb-3 border-b border-gray-800 flex flex-wrap items-center gap-3">
          <span className="text-sm text-gray-400">Período:</span>
          <div className="flex items-center gap-2">
            <input type="date" value={dateStart} max={dateEnd}
              onChange={e => setDateStart(e.target.value)}
              className="bg-gray-800 text-white text-sm px-3 py-1.5 rounded-lg border border-gray-700 focus:outline-none focus:border-gray-500" />
            <span className="text-gray-500 text-sm">até</span>
            <input type="date" value={dateEnd} min={dateStart} max={new Date().toISOString().slice(0,10)}
              onChange={e => setDateEnd(e.target.value)}
              className="bg-gray-800 text-white text-sm px-3 py-1.5 rounded-lg border border-gray-700 focus:outline-none focus:border-gray-500" />
          </div>
          {[
            { label: '7d',  days: 7 },
            { label: '30d', days: 30 },
            { label: '60d', days: 60 },
            { label: '90d', days: 90 },
          ].map(({ label, days }) => (
            <button key={days} onClick={() => {
              const end = new Date().toISOString().slice(0, 10)
              const start = new Date(Date.now() - (days - 1) * 86400000).toISOString().slice(0, 10)
              setDateStart(start); setDateEnd(end)
            }} className="px-3 py-1 bg-gray-800 hover:bg-gray-700 text-gray-400 rounded-lg text-sm transition-colors">
              {label}
            </button>
          ))}
          <button onClick={() => {
            setDateStart('2025-01-01')
            setDateEnd(new Date().toISOString().slice(0, 10))
          }} className="px-3 py-1 bg-violet-900/50 hover:bg-violet-800/60 text-violet-300 border border-violet-700/50 rounded-lg text-sm transition-colors">
            Todo o período
          </button>
        </div>
      )}

      {/* Analytics dashboard */}
      {adminView === 'gestores' && (
        <div className="px-6 py-4 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-widest">Painel Gestores</h2>
            <button onClick={() => loadAnalytics(dateStart, dateEnd)}
              className="px-3 py-1 bg-gray-800 hover:bg-gray-700 text-gray-400 rounded-lg text-sm transition-colors">
              ↻ Atualizar
            </button>
          </div>

          {analyticsLoading ? (
            <div className="text-gray-500 text-sm py-8 text-center">Carregando...</div>
          ) : (<>

          {/* KPI tiles */}
          {analyticsData.length > 0 && (() => {
            const totalVisits = analyticsData.reduce((s, m) => s + m.daily.reduce((a, d) => a + d.visits, 0), 0)
            const totalClicks = analyticsData.reduce((s, m) => s + m.daily.reduce((a, d) => a + d.clicks, 0), 0)
            const avgConv = totalVisits > 0 ? ((totalClicks / totalVisits) * 100).toFixed(1) : '0'
            const peakManager = analyticsData.reduce((best, m) => {
              const v = m.daily.reduce((a, d) => a + d.visits, 0)
              return v > best.v ? { name: m.name, v } : best
            }, { name: '—', v: 0 })
            return (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  { label: 'Visitas totais', value: totalVisits, color: 'text-blue-400', bg: 'bg-blue-900/20 border-blue-800/30' },
                  { label: 'Cliques WA', value: totalClicks, color: 'text-green-400', bg: 'bg-green-900/20 border-green-800/30' },
                  { label: 'Conversão média', value: `${avgConv}%`, color: 'text-amber-400', bg: 'bg-amber-900/20 border-amber-800/30' },
                  { label: 'Maior audiência', value: peakManager.name, color: 'text-teal-400', bg: 'bg-teal-900/20 border-teal-800/30' },
                ].map(kpi => (
                  <div key={kpi.label} className={`rounded-xl p-4 border ${kpi.bg}`}>
                    <p className={`text-2xl font-bold tabular-nums ${kpi.color}`}>{kpi.value}</p>
                    <p className="text-xs text-gray-500 mt-1">{kpi.label}</p>
                  </div>
                ))}
              </div>
            )
          })()}

          {/* Aggregate chart */}
          {analyticsData.length > 0 && (() => {
            const allDates = analyticsData[0]?.daily.map(d => d.date) ?? []
            const aggDaily = allDates.map((date, i) => ({
              date,
              visits: analyticsData.reduce((s, m) => s + (m.daily[i]?.visits ?? 0), 0),
              clicks: analyticsData.reduce((s, m) => s + (m.daily[i]?.clicks ?? 0), 0),
            }))
            const maxVal = Math.max(...aggDaily.map(d => d.visits), 1)
            return (
              <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">Atividade agregada — todos os gestores</p>
                <div className="flex items-end gap-px" style={{ height: 64 }}>
                  {aggDaily.slice(-30).map(d => (
                    <div key={d.date} className="flex-1 flex flex-col justify-end gap-px" title={`${d.date}: ${d.visits} visitas, ${d.clicks} cliques`}>
                      <div className="bg-green-600 rounded-sm" style={{ height: `${d.clicks > 0 ? Math.max((d.clicks / maxVal) * 64, 2) : 0}px` }} />
                      <div className="bg-blue-600 rounded-sm" style={{ height: `${d.visits > 0 ? Math.max((d.visits / maxVal) * 64, 2) : 0}px` }} />
                    </div>
                  ))}
                </div>
                <div className="flex gap-4 mt-2 text-xs text-gray-600">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 bg-blue-600 rounded-sm inline-block"/>Visitas</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 bg-green-600 rounded-sm inline-block"/>Cliques WA</span>
                </div>
              </div>
            )
          })()}

          {/* Visitas por empreendimento */}
          {productVisitsData.length > 0 && (
            <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">Visitas por empreendimento</p>
              <div className="space-y-2">
                {productVisitsData.map((pv, i) => {
                  const max = productVisitsData[0]?.visits ?? 1
                  const pct = Math.round((pv.visits / max) * 100)
                  const expandKey = `pv-${pv.product}`
                  const isOpen = expandedProducts.has(expandKey)
                  const contentItems = contentByProduct[pv.product] ?? []
                  return (
                    <div key={pv.product}>
                      <div
                        className={`flex items-center gap-3 cursor-pointer py-1 rounded px-1 transition-colors ${contentItems.length > 0 ? 'hover:bg-gray-800/60' : ''}`}
                        onClick={() => contentItems.length > 0 && toggleProductExpand(expandKey)}
                      >
                        <span className="text-xs text-gray-500 tabular-nums w-4 text-right">{i + 1}</span>
                        <span className="text-xs font-medium text-gray-300 w-24 shrink-0">{pv.product}</span>
                        <div className="flex-1 bg-gray-800 rounded h-4 overflow-hidden">
                          <div className="h-full bg-blue-600 rounded transition-all" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="text-xs font-semibold text-blue-400 tabular-nums w-8 text-right">{pv.visits}</span>
                        {contentItems.length > 0 && (
                          <span className="text-gray-500 text-xs w-4">{isOpen ? '▾' : '›'}</span>
                        )}
                      </div>
                      {isOpen && contentItems.length > 0 && (
                        <div className="ml-8 mt-1 mb-2 space-y-1 pl-3 border-l border-gray-700">
                          {contentItems.map(ci => (
                            <div key={`${ci.contentType}:${ci.label}`} className="flex items-center gap-2">
                              <span className={`text-xs w-16 shrink-0 font-mono ${CONTENT_TYPE_COLOR[ci.contentType] ?? 'text-gray-400'}`}>{ci.contentType}</span>
                              <span className="text-xs text-gray-500 flex-1 truncate">{ci.label}</span>
                              <span className="text-xs font-semibold text-gray-300 tabular-nums">{ci.count}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Ranking table */}
          {analyticsData.length > 0 && (
            <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">Ranking gestores</p>
              <div className="space-y-1">
                {[...analyticsData]
                  .map(m => ({ ...m, pv: m.daily.reduce((s, d) => s + d.visits, 0), pc: m.daily.reduce((s, d) => s + d.clicks, 0) }))
                  .sort((a, b) => b.pv - a.pv)
                  .map((m, i) => {
                    const conv = m.pv > 0 ? ((m.pc / m.pv) * 100).toFixed(0) : '0'
                    return (
                      <div key={m.slug} className="flex items-center gap-3 py-1.5 border-b border-gray-800/60 last:border-0">
                        <span className="text-xs text-gray-600 tabular-nums w-4">{i + 1}</span>
                        <div className="relative w-7 h-7 rounded-full overflow-hidden shrink-0 border border-gray-700">
                          <Image src={m.photo} alt={m.name} fill className="object-cover" />
                        </div>
                        <span className="text-sm text-gray-300 flex-1">{m.name}</span>
                        <span className="text-xs text-blue-400 tabular-nums w-12 text-right">{m.pv} vis.</span>
                        <span className="text-xs text-green-400 tabular-nums w-12 text-right">{m.pc} WA</span>
                        <span className="text-xs text-amber-400 tabular-nums w-10 text-right">{conv}%</span>
                      </div>
                    )
                  })}
              </div>
            </div>
          )}

          {/* Manager cards */}
          <div className="space-y-4">
            {analyticsData.map(m => {
              const periodVisits = m.daily.reduce((s, d) => s + d.visits, 0)
              const periodClicks = m.daily.reduce((s, d) => s + d.clicks, 0)
              const conversion = periodVisits > 0 ? ((periodClicks / periodVisits) * 100).toFixed(1) : '0'
              const maxVisits = Math.max(...m.daily.map(d => d.visits), 1)
              const byProductEntries = m.byProduct ? Object.entries(m.byProduct).sort((a, b) => b[1] - a[1]) : []
              const maxProduct = byProductEntries[0]?.[1] ?? 1
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
                        <p className="text-2xl font-bold text-blue-400 tabular-nums">{periodVisits}</p>
                        <p className="text-xs text-gray-500">Visitas</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-green-400 tabular-nums">{periodClicks}</p>
                        <p className="text-xs text-gray-500">Cliques WA</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-amber-400 tabular-nums">{conversion}%</p>
                        <p className="text-xs text-gray-500">Conversão</p>
                      </div>
                    </div>
                  </div>
                  {/* Mini bar chart */}
                  <div className="flex items-end gap-px" style={{ height: 48 }}>
                    {m.daily.slice(-30).map(d => (
                      <div key={d.date} className="flex-1 flex flex-col justify-end gap-px" title={`${d.date}: ${d.visits} visitas, ${d.clicks} cliques`}>
                        <div className="bg-green-600 rounded-sm" style={{ height: `${d.clicks > 0 ? Math.max((d.clicks / maxVisits) * 48, 2) : 0}px` }} />
                        <div className="bg-blue-600 rounded-sm" style={{ height: `${d.visits > 0 ? Math.max((d.visits / maxVisits) * 48, 2) : 0}px` }} />
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-4 mt-1 text-xs text-gray-600">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 bg-blue-600 rounded-sm inline-block"/>Visitas</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 bg-green-600 rounded-sm inline-block"/>Cliques WA</span>
                  </div>
                  {byProductEntries.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-800">
                      <p className="text-xs text-gray-500 mb-2 uppercase tracking-widest">Produto que gerou o clique no WhatsApp</p>
                      <div className="space-y-1.5">
                        {byProductEntries.map(([prod, count]) => {
                          const expandKey = `${m.slug}-${prod}`
                          const isOpen = expandedProducts.has(expandKey)
                          const contentItems = contentByProduct[prod] ?? []
                          return (
                            <div key={prod}>
                              <div
                                className={`flex items-center gap-2 rounded px-1 py-0.5 transition-colors ${contentItems.length > 0 ? 'cursor-pointer hover:bg-gray-800/60' : ''}`}
                                onClick={() => contentItems.length > 0 && toggleProductExpand(expandKey)}
                              >
                                <span className="text-xs text-gray-400 w-24 shrink-0 font-medium">{prod}</span>
                                <div className="flex-1 bg-gray-800 rounded h-4 overflow-hidden">
                                  <div className="h-full bg-green-700 rounded transition-all" style={{ width: `${Math.round((count / maxProduct) * 100)}%` }} />
                                </div>
                                <span className="text-xs font-semibold text-green-400 tabular-nums w-5 text-right">{count}</span>
                                {contentItems.length > 0 && (
                                  <span className="text-gray-500 text-xs w-4">{isOpen ? '▾' : '›'}</span>
                                )}
                              </div>
                              {isOpen && contentItems.length > 0 && (
                                <div className="ml-2 mt-1 mb-1 pl-3 border-l border-gray-700 space-y-0.5">
                                  {contentItems.map(ci => (
                                    <div key={`${ci.contentType}:${ci.label}`} className="flex items-center gap-2">
                                      <span className={`text-xs w-14 shrink-0 font-mono ${CONTENT_TYPE_COLOR[ci.contentType] ?? 'text-gray-400'}`}>{ci.contentType}</span>
                                      <span className="text-xs text-gray-500 flex-1 truncate">{ci.label}</span>
                                      <span className="text-xs font-semibold text-gray-300 tabular-nums">{ci.count}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
            {analyticsData.length === 0 && (
              <p className="text-gray-500 text-sm text-center py-8">Nenhum dado ainda. Compartilhe os links para começar a rastrear.</p>
            )}
          </div>

          {/* Dações card */}
          {dacoesData !== null && (
            <div className="bg-gray-900 rounded-xl p-4 border border-amber-800/30 bg-amber-900/10">
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">🏠 Dações — Interesse no período</p>
              <div className="flex gap-3 flex-wrap">
                <div className="rounded-xl px-5 py-3 text-center min-w-[100px] bg-gray-800/50">
                  <p className="text-2xl font-bold text-amber-400 tabular-nums">{dacoesData.total}</p>
                  <p className="text-xs text-gray-400 mt-0.5">total de cliques</p>
                </div>
                {Object.entries(dacoesData.byDacao).map(([id, count]) => (
                  <div key={id} className="bg-gray-800/50 rounded-xl px-5 py-3 text-center min-w-[110px]">
                    <p className="text-2xl font-bold text-white tabular-nums">{count as number}</p>
                    <p className="text-xs text-gray-400 mt-0.5 capitalize">{id}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Links dos gestores */}
          <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
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
          </>)}
        </div>
      )}


      {/* Interesse — mapa de cliques por unidade */}
      {adminView === 'interesse' && (
        <div className="px-6 py-4">
          {/* Product selector */}
          <div className="flex gap-2 flex-wrap mb-5">
            {INTEREST_PRODUCTS.map(p => (
              <button key={p} onClick={() => setInterestProduct(p)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${interestProduct === p ? 'bg-white text-gray-900' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}>
                {p}
              </button>
            ))}
          </div>

          {interestLoading ? (
            <div className="text-gray-500 text-sm py-12 text-center">Carregando...</div>
          ) : interestData.length === 0 ? (
            <div className="text-gray-500 text-sm py-12 text-center">
              Nenhum clique registrado para {interestProduct} no período selecionado.<br />
              <span className="text-gray-600 text-xs mt-1 block">Os cliques começam a aparecer assim que os visitantes abrirem unidades no site.</span>
            </div>
          ) : (
            <div className="space-y-2 max-w-lg">
              <p className="text-xs text-gray-500 mb-3 uppercase tracking-widest">
                {interestProduct} — {interestData.length} unidades clicadas
              </p>
              {interestData.map((item, i) => {
                const max = interestData[0]?.clicks ?? 1
                const pct = Math.round((item.clicks / max) * 100)
                return (
                  <div key={item.code} className="flex items-center gap-3">
                    <span className="text-xs text-gray-500 w-5 text-right tabular-nums">{i + 1}</span>
                    <span className="font-mono text-sm text-gray-200 w-16 shrink-0">{item.code}</span>
                    <div className="flex-1 bg-gray-800 rounded h-5 overflow-hidden">
                      <div className="h-full bg-sky-500 rounded transition-all duration-300" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-sm font-semibold text-sky-400 tabular-nums w-8 text-right">{item.clicks}</span>
                  </div>
                )
              })}
            </div>
          )}
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

      {/* Torre selector for EDITION */}
      {activeProduct === 'edition' && (
        <div className="px-6 pt-2 flex gap-2">
          {editionTowers.map(t => (
            <button key={t} onClick={() => setActiveTower(t)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${activeTower === t ? 'bg-white text-gray-900' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}>
              {t}
            </button>
          ))}
        </div>
      )}

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
