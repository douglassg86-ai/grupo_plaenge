'use client'

import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import Image from 'next/image'

// ── Chart component (Chart.js via canvas) ──────────────────────────────────
type DailyPoint = { date: string; visits: number; clicks: number }

function DailyChart({ daily, color, height = 64, names = { visits: 'Visitas', clicks: 'Cliques WA' } }: { daily: DailyPoint[]; color: string; height?: number; names?: { visits: string; clicks: string } }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    if (!canvasRef.current || daily.length === 0) return
    let ChartJS: typeof import('chart.js').Chart | null = null
    let instance: import('chart.js').Chart | null = null
    let cancelled = false   // o import é assíncrono: evita desenhar duas vezes no mesmo canvas
    import('chart.js').then(({ Chart, registerables }) => {
      if (cancelled || !canvasRef.current) return
      Chart.register(...registerables)
      ChartJS = Chart
      Chart.getChart(canvasRef.current)?.destroy()
      const peakIdx = daily.reduce((bi, d, i) => d.visits > daily[bi].visits ? i : bi, 0)
      const barColors = daily.map((_, i) =>
        i === peakIdx ? color : (color.length === 7 ? color + '66' : color.slice(0, 7) + '66')
      )
      const labels = daily.map(d => {
        const [, mm, dd] = d.date.split('-')
        return `${dd}/${mm}`
      })
      instance = new Chart(canvasRef.current, {
        type: 'bar',
        data: {
          labels,
          datasets: [
            { label: names.clicks, data: daily.map(d => d.clicks), backgroundColor: 'rgba(74,222,128,0.85)', borderRadius: 2, order: 1 },
            { label: names.visits, data: daily.map(d => d.visits), backgroundColor: barColors, borderRadius: 2, order: 2 },
          ],
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: { backgroundColor: '#18181b', borderColor: '#27272a', borderWidth: 1, titleColor: '#a1a1aa', bodyColor: '#fafafa', titleFont: { size: 9 }, bodyFont: { size: 10 } },
          },
          scales: {
            x: { stacked: false, ticks: { color: '#3f3f46', font: { size: 7 }, maxTicksLimit: 7 }, grid: { color: '#1f1f23' } },
            y: { stacked: false, ticks: { color: '#3f3f46', font: { size: 8 }, maxTicksLimit: 3 }, grid: { color: '#1f1f23' } },
          },
        },
      })
    })
    return () => { cancelled = true; instance?.destroy() }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [daily, color, names.visits, names.clicks])
  return <canvas ref={canvasRef} style={{ width: '100%', height: `${height}px`, display: 'block' }} />
}

// ── Lista com barras e mini-histograma (aba Investidores) ──────────────────
type Ranked = { name: string; count: number }

// No celular a barra vai para a linha de baixo, para o rótulo não ser espremido.
function BarList({ items, color, total, emptyText, max = 8, format, unit = 'acessos', labelWidth = 'sm:w-44', valueWidth = 'sm:w-28' }: {
  items: Ranked[]; color: string; total?: number; emptyText: string; max?: number
  format?: (n: number) => string; unit?: string; labelWidth?: string; valueWidth?: string
}) {
  if (items.length === 0) return <p className="text-zinc-600 text-sm py-2">{emptyText}</p>
  const shown = items.slice(0, max), rest = items.slice(max)
  const top = Math.max(1, ...shown.map(i => i.count))
  return (
    <div className="space-y-2 sm:space-y-1.5">
      {shown.map(it => {
        const fill = <div className="h-full rounded" style={{ width: `${Math.max(3, Math.round((it.count / top) * 100))}%`, background: color }} />
        return (
          <div key={it.name} className="text-sm">
            <div className="flex items-center gap-3">
              <span className={`min-w-0 flex-1 sm:flex-none ${labelWidth} truncate text-zinc-300`} title={it.name}>{it.name}</span>
              <div className="hidden sm:block flex-1 bg-zinc-800/80 rounded h-4 overflow-hidden">{fill}</div>
              <span className={`shrink-0 ${valueWidth} text-right tabular-nums text-zinc-300 whitespace-nowrap`}>
                {format ? format(it.count) : it.count.toLocaleString('pt-BR')}
                {total ? <span className="text-zinc-600 text-xs"> · {Math.round((it.count / total) * 100)}%</span> : null}
              </span>
            </div>
            <div className="sm:hidden mt-1 bg-zinc-800/80 rounded h-2 overflow-hidden">{fill}</div>
          </div>
        )
      })}
      {rest.length > 0 && (
        <p className="text-[11px] text-zinc-600 pt-1">+ {rest.length} outros ({rest.reduce((s, i) => s + i.count, 0).toLocaleString('pt-BR')} {unit})</p>
      )}
    </div>
  )
}

function MiniColumns({ values, labels, color, height = 72 }: { values: number[]; labels: string[]; color: string; height?: number }) {
  const top = Math.max(1, ...values)
  return (
    <div>
      <div className="flex items-end gap-[3px]" style={{ height }}>
        {values.map((v, i) => (
          <div key={i} className="flex-1 rounded-t" title={`${labels[i] || i}: ${v}`}
            style={{ height: `${v ? Math.max(6, (v / top) * 100) : 3}%`, background: v ? color : '#27272a' }} />
        ))}
      </div>
      <div className="flex gap-[3px] mt-1">
        {labels.map((l, i) => <span key={i} className="flex-1 text-center text-[9px] text-zinc-600">{l}</span>)}
      </div>
    </div>
  )
}

function fmtDuration(totalSec: number): string {
  const s = Math.round(totalSec)
  if (s < 60) return `${s} s`
  const m = Math.floor(s / 60), r = s % 60
  if (m < 60) return r ? `${m} min ${String(r).padStart(2, '0')} s` : `${m} min`
  return `${Math.floor(m / 60)} h ${String(m % 60).padStart(2, '0')} min`
}
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
  const [adminView, setAdminView] = useState<'disponibilidade' | 'gestores' | 'interesse' | 'investidores'>('disponibilidade')
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

  // Investidores — apresentação /investidores
  type InvestorData = {
    since: string
    daily: { date: string; acessos: number; pessoas: number; telas: number; erros: number }[]
    period: { acessos: number; pessoas: number; telas: number; pessoasTela: number; erros: number }
    allTime: { acessos: number; pessoas: number }
    lastAccess: string | null
    profile?: {
      geo: Ranked[]; device: Ranked[]; os: Ranked[]
      hour: number[]; weekday: number[]
      slides: { i: number; title: string; product: string; seen: number; sec: number }[]
      zooms: Ranked[]
    }
  }
  const [invData, setInvData] = useState<InvestorData | null>(null)
  const [invLoading, setInvLoading] = useState(false)

  const loadInvestors = useCallback(async (start: string, end: string) => {
    const pw = sessionStorage.getItem('admin_password') || ''
    setInvLoading(true)
    const res = await fetch('/api/investidores/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: pw, startDate: start, endDate: end }),
    })
    if (res.ok) setInvData(await res.json())
    setInvLoading(false)
  }, [])

  useEffect(() => {
    if (authed && adminView === 'investidores') loadInvestors(dateStart, dateEnd)
  }, [authed, adminView, dateStart, dateEnd, loadInvestors])

  const invChartDaily = useMemo(
    () => (invData?.daily ?? []).map(d => ({ date: d.date, visits: d.acessos, clicks: d.pessoas })),
    [invData]
  )

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
          { key: 'investidores',    label: '💼 Investidores' },
        ] as const).map(v => (
          <button key={v.key} onClick={() => setAdminView(v.key)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${adminView === v.key ? 'bg-white text-gray-900' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}>
            {v.label}
          </button>
        ))}
      </div>

      {/* Shared date range picker — shown in gestores, interesse and investidores */}
      {(adminView === 'gestores' || adminView === 'interesse' || adminView === 'investidores') && (
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
        <div className="px-5 py-5 space-y-5">

          {/* refresh */}
          <div className="flex justify-end">
            <button onClick={() => loadAnalytics(dateStart, dateEnd)}
              className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 rounded-lg text-xs transition-colors">
              ↻ Atualizar
            </button>
          </div>

          {analyticsLoading ? (
            <div className="text-zinc-500 text-sm py-12 text-center">Carregando...</div>
          ) : (<>

          {/* ── 1. VISÃO GERAL DA EQUIPE ── */}
          {analyticsData.length > 0 && (() => {
            const totalVisits = analyticsData.reduce((s, m) => s + m.daily.reduce((a, d) => a + d.visits, 0), 0)
            const totalClicks = analyticsData.reduce((s, m) => s + m.daily.reduce((a, d) => a + d.clicks, 0), 0)
            const avgConv = totalVisits > 0 ? ((totalClicks / totalVisits) * 100).toFixed(1) : '0'
            const peakEntry = analyticsData.reduce((best, m) => {
              let pk = { v: 0, date: '' }
              m.daily.forEach(d => { if (d.visits > pk.v) pk = { v: d.visits, date: d.date } })
              return pk.v > best.v ? pk : best
            }, { v: 0, date: '' })
            const allDates = analyticsData[0]?.daily.map(d => d.date) ?? []
            const aggDaily = allDates.map((date, i) => ({
              date,
              visits: analyticsData.reduce((s, m) => s + (m.daily[i]?.visits ?? 0), 0),
              clicks: analyticsData.reduce((s, m) => s + (m.daily[i]?.clicks ?? 0), 0),
            }))
            const maxAgg = Math.max(...aggDaily.map(d => d.visits), 1)
            return (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <p className="text-[10px] font-semibold tracking-[0.12em] uppercase text-zinc-600">Visão Geral da Equipe</p>
                </div>
                {/* KPI row */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 mb-3">
                  <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 relative overflow-hidden" style={{ boxShadow: 'inset 0 0 40px rgba(96,165,250,0.04)' }}>
                    <p className="text-[10px] font-medium text-zinc-600 uppercase tracking-[0.08em] mb-1.5">Total Visitas</p>
                    <p className="text-[1.75rem] font-extrabold text-blue-400 tabular-nums leading-none">{totalVisits.toLocaleString('pt-BR')}</p>
                  </div>
                  <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 relative overflow-hidden" style={{ boxShadow: 'inset 0 0 40px rgba(74,222,128,0.04)' }}>
                    <p className="text-[10px] font-medium text-zinc-600 uppercase tracking-[0.08em] mb-1.5">Cliques WhatsApp</p>
                    <p className="text-[1.75rem] font-extrabold text-green-400 tabular-nums leading-none">{totalClicks.toLocaleString('pt-BR')}</p>
                  </div>
                  <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 relative overflow-hidden" style={{ boxShadow: 'inset 0 0 40px rgba(251,191,36,0.04)' }}>
                    <p className="text-[10px] font-medium text-zinc-600 uppercase tracking-[0.08em] mb-1.5">Conversão Média</p>
                    <p className="text-[1.75rem] font-extrabold text-amber-400 tabular-nums leading-none">{avgConv}%</p>
                  </div>
                  <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 relative overflow-hidden" style={{ boxShadow: 'inset 0 0 40px rgba(45,212,191,0.04)' }}>
                    <p className="text-[10px] font-medium text-zinc-600 uppercase tracking-[0.08em] mb-1.5">Pico do Período</p>
                    <p className="text-[1.75rem] font-extrabold text-teal-400 tabular-nums leading-none">{peakEntry.v}</p>
                    {peakEntry.date && <p className="text-[11px] text-zinc-500 mt-1">visitas em {peakEntry.date.slice(5).split('-').reverse().join('/')}</p>}
                  </div>
                </div>
                {/* Aggregate chart */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-[13px] font-semibold text-zinc-100">Atividade diária — equipe completa</p>
                    <div className="flex gap-3">
                      <div className="flex items-center gap-1.5 text-[11px] text-zinc-500"><span className="w-2 h-2 rounded-sm inline-block bg-blue-400"/><span>Visitas</span></div>
                      <div className="flex items-center gap-1.5 text-[11px] text-zinc-500"><span className="w-2 h-2 rounded-sm inline-block bg-green-400"/><span>Cliques WA</span></div>
                    </div>
                  </div>
                  <div style={{ height: 90 }}>
                    <DailyChart daily={aggDaily} color="#60a5fa" height={90} />
                  </div>
                </div>
              </div>
            )
          })()}

          {/* ── 2. VISITAS POR EMPREENDIMENTO ── */}
          {productVisitsData.length > 0 && (() => {
            const PROD_COLORS: Record<string, string> = {
              'YUNA': '#f59e0b', 'EDITION': '#3b82f6', 'TREND NANO': '#8b5cf6',
              'VERDANT': '#10b981', 'SHIFT': '#ec4899', 'MOOD': '#f97316',
              'SYNTHE': '#ef4444', 'WAVE': '#06b6d4', 'ORBITALE': '#a78bfa',
              'TREND HOME': '#64748b',
            }
            const totalPV = productVisitsData.reduce((s, p) => s + p.visits, 0)
            const maxPV = productVisitsData[0]?.visits ?? 1
            return (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <p className="text-[10px] font-semibold tracking-[0.12em] uppercase text-zinc-600">Visitas por Empreendimento</p>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-green-400/10 text-green-400 tracking-wide">NOVO</span>
                </div>
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-[13px] font-semibold text-zinc-100">Páginas de produto — todas as origens</p>
                      <p className="text-[11px] text-zinc-600 mt-0.5">inclui acesso direto, links de gestores e busca orgânica</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-extrabold text-zinc-100 tabular-nums tracking-tight">{totalPV.toLocaleString('pt-BR')}</p>
                      <p className="text-[11px] text-zinc-600">total de visitas</p>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    {productVisitsData.map(pv => {
                      const barW = Math.round((pv.visits / maxPV) * 100)
                      const pct = Math.round((pv.visits / totalPV) * 100)
                      const color = PROD_COLORS[pv.product] ?? '#60a5fa'
                      const expandKey = `pv-${pv.product}`
                      const isOpen = expandedProducts.has(expandKey)
                      const contentItems = contentByProduct[pv.product] ?? []
                      return (
                        <div key={pv.product}>
                          <div
                            className={`flex items-center gap-2 rounded-md px-1 py-1 transition-colors ${contentItems.length > 0 ? 'cursor-pointer hover:bg-white/[0.03]' : ''}`}
                            onClick={() => contentItems.length > 0 && toggleProductExpand(expandKey)}
                          >
                            {contentItems.length > 0
                              ? <span className="text-zinc-500 text-[10px] w-3 transition-transform" style={{ display:'inline-block', transform: isOpen ? 'rotate(90deg)' : 'none' }}>›</span>
                              : <span className="text-zinc-700 text-[10px] w-3">·</span>}
                            <span className="text-[11px] font-semibold text-zinc-400 w-20 shrink-0">{pv.product}</span>
                            <div className="flex-1 rounded" style={{ background: '#27272a', height: 20, overflow: 'hidden' }}>
                              <div style={{ width: `${barW}%`, height: '100%', background: color + '99', borderRadius: 4, display: 'flex', alignItems: 'center', paddingLeft: 8 }}>
                                <span className="text-[11px] font-bold tabular-nums" style={{ color: 'rgba(255,255,255,0.85)' }}>{pv.visits}</span>
                              </div>
                            </div>
                            <span className="text-[11px] text-zinc-600 tabular-nums w-8 text-right">{pct}%</span>
                          </div>
                          {isOpen && contentItems.length > 0 && (
                            <div className="ml-5 mb-2 mt-0.5 pl-3 border-l border-zinc-700 space-y-1">
                              {contentItems.map(ci => (
                                <div key={`${ci.contentType}:${ci.label}`} className="flex items-center gap-2 bg-zinc-800/60 rounded-md px-2 py-1.5">
                                  <span className={`text-[11px] font-mono w-14 shrink-0 ${CONTENT_TYPE_COLOR[ci.contentType] ?? 'text-zinc-400'}`}>{ci.contentType}</span>
                                  <span className="text-[11px] text-zinc-500 flex-1 truncate">{ci.label}</span>
                                  <span className={`text-[11px] font-bold tabular-nums ${CONTENT_TYPE_COLOR[ci.contentType] ?? 'text-zinc-300'}`}>{ci.count}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )
          })()}

          {/* ── 3. RANKING ── */}
          {analyticsData.length > 0 && (() => {
            const ranked = [...analyticsData]
              .map(m => {
                const pv = m.daily.reduce((s, d) => s + d.visits, 0)
                const pc = m.daily.reduce((s, d) => s + d.clicks, 0)
                const conv = pv > 0 ? ((pc / pv) * 100).toFixed(1) : '0.0'
                const topProd = m.byProduct ? Object.entries(m.byProduct).sort((a, b) => b[1] - a[1])[0]?.[0] ?? '—' : '—'
                return { ...m, pv, pc, conv, topProd }
              })
              .sort((a, b) => b.pc - a.pc)
            const convColors = ['rgba(74,222,128,0.15)', 'rgba(74,222,128,0.10)', 'rgba(251,191,36,0.12)', 'rgba(161,161,170,0.12)', 'rgba(248,113,113,0.12)']
            const convTextColors = ['#4ade80', '#86efac', '#fbbf24', '#a1a1aa', '#f87171']
            return (
              <div>
                <p className="text-[10px] font-semibold tracking-[0.12em] uppercase text-zinc-600 mb-3">Ranking do Período</p>
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        {['#','Gestor','Visitas','Cliques WA','Conversão','Top Produto'].map((h, i) => (
                          <th key={h} className={`text-[10px] font-semibold tracking-[0.1em] uppercase text-zinc-600 py-2.5 border-b border-zinc-800 ${i === 0 ? 'pl-4 pr-2 text-left' : i === 1 ? 'text-left pl-2' : 'text-right pr-3'}`}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {ranked.map((m, i) => (
                        <tr key={m.slug} className="border-b border-zinc-800/60 last:border-0">
                          <td className="pl-4 pr-2 py-2.5 text-[11px] font-bold text-zinc-600 tabular-nums">{i + 1}</td>
                          <td className="pl-2 py-2.5">
                            <div className="flex items-center gap-2">
                              <div className="relative w-7 h-7 rounded-full overflow-hidden shrink-0 border border-zinc-700">
                                <Image src={m.photo} alt={m.name} fill className="object-cover" />
                              </div>
                              <div>
                                <p className="text-[13px] font-semibold text-zinc-100 leading-none">{m.name}</p>
                                <p className="text-[10px] text-zinc-600 mt-0.5">/g/{m.slug}</p>
                              </div>
                            </div>
                          </td>
                          <td className="pr-3 py-2.5 text-right text-[13px] font-medium text-blue-400 tabular-nums">{m.pv}</td>
                          <td className="pr-3 py-2.5 text-right text-[13px] font-medium text-green-400 tabular-nums">{m.pc}</td>
                          <td className="pr-3 py-2.5 text-right">
                            <span className="text-[11px] font-bold tabular-nums px-2 py-1 rounded-full" style={{ background: convColors[i] ?? convColors[3], color: convTextColors[i] ?? convTextColors[3] }}>{m.conv}%</span>
                          </td>
                          <td className="pr-3 py-2.5 text-right text-[11px] text-zinc-500">{m.topProd}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )
          })()}

          {/* ── 4. DAÇÕES ── */}
          {dacoesData !== null && (() => {
            const dacEntries = Object.entries(dacoesData.byDacao) as [string, number][]
            const dacMax = Math.max(...dacEntries.map(e => e[1]), 1)
            return (
              <div>
                <p className="text-[10px] font-semibold tracking-[0.12em] uppercase text-zinc-600 mb-3">Dações — Interesse no Período</p>
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-[13px] font-semibold text-zinc-100">Total de cliques em Interesse</p>
                      <p className="text-[11px] text-zinc-600 mt-0.5">Parador + Marquês · período selecionado</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[1.5rem] font-extrabold text-amber-400 tabular-nums leading-none">{dacoesData.total}</p>
                      <p className="text-[11px] text-zinc-600 mt-0.5">cliques totais</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {dacEntries.map(([id, count]) => {
                      const pct = dacoesData.total > 0 ? Math.round((count / dacoesData.total) * 100) : 0
                      return (
                        <div key={id} className="flex items-center gap-2.5">
                          <span className="text-[11px] font-semibold text-zinc-500 w-16 shrink-0 capitalize">{id}</span>
                          <div className="flex-1 rounded" style={{ background: '#27272a', height: 20, overflow: 'hidden' }}>
                            <div style={{ width: `${Math.round((count / dacMax) * 100)}%`, height: '100%', background: id === 'parador' ? '#b45309' : '#6b7280', borderRadius: 4, display: 'flex', alignItems: 'center', paddingLeft: 8 }}>
                              <span className="text-[11px] font-bold text-white tabular-nums">{count}</span>
                            </div>
                          </div>
                          <span className="text-[11px] text-zinc-600 tabular-nums w-8 text-right">{pct}%</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )
          })()}

          {/* ── 5. DETALHE POR GESTOR ── */}
          {analyticsData.length > 0 && (
            <div>
              <div className="mb-3">
                <p className="text-[10px] font-semibold tracking-[0.12em] uppercase text-zinc-600 inline">Detalhe por Gestor</p>
                <span className="text-[11px] text-violet-400 ml-2 normal-case tracking-normal font-normal">— clique em qualquer produto para ver o conteúdo detalhado</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {analyticsData.map(m => {
                  const pv = m.daily.reduce((s, d) => s + d.visits, 0)
                  const pc = m.daily.reduce((s, d) => s + d.clicks, 0)
                  const conv = pv > 0 ? ((pc / pv) * 100).toFixed(1) : '0.0'
                  const daily30 = m.daily.slice(-30)
                  const peakIdx30 = daily30.reduce((bi, d, i) => d.visits > (daily30[bi]?.visits ?? 0) ? i : bi, 0)
                  const peakDate = (() => { const p = daily30[peakIdx30]?.date ?? ''; const [, mm, dd] = p.split('-'); return p ? `${dd}/${mm}` : '' })()
                  const peakV = daily30[peakIdx30]?.visits ?? 0
                  const MGMT_COLORS: Record<string, string> = { jardim: '#3b82f6', raffael: '#8b5cf6', renato: '#10b981', charles: '#f59e0b', nishi: '#ec4899' }
                  const mColor = MGMT_COLORS[m.slug] ?? '#60a5fa'
                  const byProductEntries = m.byProduct ? Object.entries(m.byProduct).sort((a, b) => b[1] - a[1]) : []
                  const maxProd = byProductEntries[0]?.[1] ?? 1
                  return (
                    <div key={m.slug} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                      {/* header */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border-2 border-zinc-700">
                          <Image src={m.photo} alt={m.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[15px] font-bold text-zinc-100 leading-none">{m.name}</p>
                          <p className="text-[11px] text-zinc-600 mt-0.5 truncate">grupo-plaenge.vercel.app/g/{m.slug}</p>
                        </div>
                      </div>
                      {/* stats */}
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        <div className="text-center">
                          <p className="text-[1.375rem] font-extrabold text-blue-400 tabular-nums leading-none">{pv}</p>
                          <p className="text-[9px] text-zinc-600 uppercase tracking-[0.07em] mt-1">Visitas</p>
                        </div>
                        <div className="text-center">
                          <p className="text-[1.375rem] font-extrabold text-green-400 tabular-nums leading-none">{pc}</p>
                          <p className="text-[9px] text-zinc-600 uppercase tracking-[0.07em] mt-1">Cliques WA</p>
                        </div>
                        <div className="text-center">
                          <p className="text-[1.375rem] font-extrabold text-amber-400 tabular-nums leading-none">{conv}%</p>
                          <p className="text-[9px] text-zinc-600 uppercase tracking-[0.07em] mt-1">Conversão</p>
                        </div>
                      </div>
                      {/* peak + legend */}
                      <div className="flex items-center justify-between mb-1.5">
                        <p className="text-[11px] text-amber-400">⚡ Pico: {peakDate} — {peakV} visitas</p>
                        <div className="flex items-center gap-2 text-[10px] text-zinc-600">
                          <span className="w-2 h-2 rounded-sm inline-block" style={{ background: mColor + '66' }}/>Visitas
                          <span className="w-2 h-2 rounded-sm inline-block bg-green-400"/>WA
                        </div>
                      </div>
                      {/* chart — Chart.js canvas with date labels on X-axis */}
                      <div className="mb-3" style={{ height: 80 }}>
                        <DailyChart daily={daily30} color={mColor} height={80} />
                      </div>
                      {/* products */}
                      {byProductEntries.length > 0 && (
                        <div className="border-t border-zinc-800 pt-3">
                          <p className="text-[9px] font-semibold tracking-[0.1em] uppercase text-zinc-600 mb-2">Produto que gerou o clique · clique para ver conteúdo</p>
                          <div className="space-y-1">
                            {byProductEntries.map(([prod, count]) => {
                              const expandKey = `${m.slug}-${prod}`
                              const isOpen = expandedProducts.has(expandKey)
                              const contentItems = contentByProduct[prod] ?? []
                              const barW = Math.round((count / maxProd) * 100)
                              const pct = pc > 0 ? Math.round((count / pc) * 100) : 0
                              const CONTENT_TYPE_HEX: Record<string, string> = { download: '#60a5fa', acesso: '#a78bfa', video: '#f87171', visita: '#4ade80' }
                              return (
                                <div key={prod}>
                                  <div
                                    className="flex items-center gap-1.5 rounded-md px-0.5 py-1 cursor-pointer transition-colors hover:bg-white/[0.04]"
                                    onClick={() => toggleProductExpand(expandKey)}
                                  >
                                    <span className="text-zinc-500 text-[11px] w-3.5 text-center flex-shrink-0 transition-transform inline-block select-none" style={{ transform: isOpen ? 'rotate(90deg)' : 'none' }}>›</span>
                                    <span className="text-[11px] text-zinc-400 w-[68px] shrink-0">{prod}</span>
                                    <div className="flex-1 rounded" style={{ background: '#27272a', height: 14, overflow: 'hidden' }}>
                                      <div style={{ width: `${barW}%`, height: '100%', background: '#4ade8066', borderRadius: 3, display: 'flex', alignItems: 'center', paddingLeft: 5 }}>
                                        <span className="text-[9px] font-bold tabular-nums" style={{ color: 'rgba(255,255,255,0.7)' }}>{count}</span>
                                      </div>
                                    </div>
                                    <span className="text-[11px] text-zinc-600 tabular-nums w-7 text-right">{pct}%</span>
                                  </div>
                                  {isOpen && (
                                    <div className="ml-5 mt-0.5 mb-2 pl-2.5 border-l border-zinc-700 space-y-1">
                                      {contentItems.length === 0
                                        ? <p className="text-[10px] text-zinc-600 italic py-1 px-2">Sem eventos de conteúdo registrados para este produto.</p>
                                        : contentItems.map(ci => {
                                            const maxCi = contentItems[0]?.count || 1
                                            const ciPct = Math.round((ci.count / maxCi) * 100)
                                            const ciColor = CONTENT_TYPE_HEX[ci.contentType] ?? '#a1a1aa'
                                            return (
                                              <div key={`${ci.contentType}:${ci.label}`} className="flex items-center gap-2 rounded-md px-2 py-1.5" style={{ background: '#1f1f23' }}>
                                                <span className="text-[11px] flex-1 truncate" style={{ color: '#a1a1aa' }}>{ci.label}</span>
                                                <div className="w-12 h-1.5 rounded-full overflow-hidden shrink-0" style={{ background: '#27272a' }}>
                                                  <div className="h-full rounded-full" style={{ width: `${ciPct}%`, background: ciColor }} />
                                                </div>
                                                <span className="text-[11px] font-bold tabular-nums w-5 text-right" style={{ color: ciColor }}>{ci.count}</span>
                                                <span className="text-[9px] w-10 text-right uppercase tracking-wide" style={{ color: '#52525b' }}>{ci.contentType}</span>
                                              </div>
                                            )
                                          })
                                      }
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
              </div>
            </div>
          )}

          {analyticsData.length === 0 && (
            <p className="text-zinc-500 text-sm text-center py-8">Nenhum dado ainda. Compartilhe os links para começar a rastrear.</p>
          )}

          {/* Links dos gestores */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
            <p className="text-[11px] font-semibold text-zinc-400 mb-3 uppercase tracking-widest">Links para compartilhar</p>
            <div className="space-y-2">
              {[
                { slug: 'jardim',  name: 'Jardim' },
                { slug: 'raffael', name: 'Raffael' },
                { slug: 'renato',  name: 'Renato' },
                { slug: 'charles', name: 'Charles' },
                { slug: 'nishi',   name: 'Nishi' },
              ].map(m => (
                <div key={m.slug} className="flex items-center justify-between py-1">
                  <span className="text-sm text-zinc-400">{m.name}</span>
                  <code className="text-xs bg-zinc-800 px-2 py-1 rounded text-blue-300 select-all">
                    grupo-plaenge.vercel.app/g/{m.slug}
                  </code>
                </div>
              ))}
            </div>
          </div>
          </>)}
        </div>
      )}


      {/* Investidores — apresentação /investidores */}
      {adminView === 'investidores' && (
        <div className="px-5 py-5 space-y-5">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <p className="text-[10px] font-semibold tracking-[0.12em] uppercase text-zinc-600">Apresentação para investidores</p>
              <p className="text-sm text-zinc-400 mt-1">
                Seleção Porto Alegre · <a href="/investidores" target="_blank" rel="noopener" className="text-violet-300 hover:underline">/investidores</a> · acesso com senha
              </p>
            </div>
            <button onClick={() => loadInvestors(dateStart, dateEnd)}
              className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 rounded-lg text-xs transition-colors">
              ↻ Atualizar
            </button>
          </div>

          {invLoading || !invData ? (
            <div className="text-zinc-500 text-sm py-12 text-center">Carregando...</div>
          ) : (() => {
            const { period: p, allTime, lastAccess, since } = invData
            const fmtDay = (iso: string) => iso.slice(0, 10).split('-').reverse().join('/')
            const last = lastAccess
              ? new Date(lastAccess).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo', day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
              : null
            const tiles = [
              { label: 'Acessos', value: p.acessos, color: 'text-violet-400', glow: '167,139,250', note: 'vezes que a apresentação foi aberta' },
              { label: 'Pessoas', value: p.pessoas, color: 'text-green-400', glow: '74,222,128', note: 'navegadores diferentes que abriram' },
              { label: 'Tela de senha', value: p.pessoasTela, color: 'text-blue-400', glow: '96,165,250', note: 'navegadores que chegaram ao login' },
              { label: 'Senhas incorretas', value: p.erros, color: 'text-amber-400', glow: '251,191,36', note: 'tentativas com a senha errada' },
            ]
            return (<>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
                {tiles.map(t => (
                  <div key={t.label} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 relative overflow-hidden" style={{ boxShadow: `inset 0 0 40px rgba(${t.glow},0.04)` }}>
                    <p className="text-[10px] font-medium text-zinc-600 uppercase tracking-[0.08em] mb-1.5">{t.label}</p>
                    <p className={`text-[1.75rem] font-extrabold ${t.color} tabular-nums leading-none`}>{t.value.toLocaleString('pt-BR')}</p>
                    <p className="text-[11px] text-zinc-500 mt-1.5">{t.note}</p>
                  </div>
                ))}
              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                  <p className="text-[10px] font-semibold tracking-[0.12em] uppercase text-zinc-600">Por dia</p>
                  <div className="flex items-center gap-4 text-[11px] text-zinc-500">
                    <span className="flex items-center gap-1.5"><i className="inline-block w-2.5 h-2.5 rounded-sm" style={{ background: '#a78bfa' }} />Acessos</span>
                    <span className="flex items-center gap-1.5"><i className="inline-block w-2.5 h-2.5 rounded-sm" style={{ background: 'rgba(74,222,128,0.85)' }} />Pessoas</span>
                  </div>
                </div>
                {p.acessos + p.telas === 0 ? (
                  <div className="text-zinc-500 text-sm py-10 text-center">Nenhum acesso registrado no período.</div>
                ) : (
                  <div style={{ height: 150 }}>
                    <DailyChart daily={invChartDaily} color="#a78bfa" height={150} names={{ visits: 'Acessos', clicks: 'Pessoas' }} />
                  </div>
                )}
              </div>

              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-400 flex flex-wrap gap-x-6 gap-y-1">
                <span>Desde {fmtDay(since)}: <b className="text-zinc-200 tabular-nums">{allTime.acessos.toLocaleString('pt-BR')}</b> acessos · <b className="text-zinc-200 tabular-nums">{allTime.pessoas.toLocaleString('pt-BR')}</b> pessoas</span>
                <span>Último acesso: <b className="text-zinc-200">{last ?? '—'}</b></span>
              </div>

              {invData.profile && (() => {
                const pr = invData.profile
                const sl = pr.slides
                type Sl = typeof sl[number]
                const firstProd = sl.findIndex(s => s.product)
                const lastProd = firstProd < 0 ? -1 : sl.length - 1 - [...sl].reverse().findIndex(s => s.product)
                const secOf = (f: (s: Sl, k: number) => boolean) => sl.filter(f).reduce((a, s) => a + s.sec, 0)
                // Empreendimentos e seus nomes vêm dos títulos dos slides gravados pela própria
                // apresentação ("Nome · Seção") — nada da apresentação fica neste código público.
                const prods = [...new Set(sl.map(s => s.product).filter(Boolean))]
                const prodName = (c: string) => sl.find(s => s.product === c && s.title)?.title.split(' · ')[0] || c
                const PROD_COLORS = ['#c4b5fd', '#a78bfa', '#7c3aed', '#6d28d9']
                const sections: Ranked[] = [
                  { name: 'Abertura institucional', count: secOf((s, k) => !s.product && (firstProd < 0 || k < firstProd)) },
                  ...prods.map(c => ({ name: prodName(c), count: secOf(s => s.product === c) })),
                  { name: 'Resumo e encerramento', count: secOf((s, k) => !s.product && firstProd >= 0 && k > lastProd) },
                ].filter(x => x.count > 0)
                const totalSec = sl.reduce((a, s) => a + s.sec, 0)
                const base = Math.max(p.acessos, 1)
                const reach = (f: (s: Sl) => boolean) => { const s = sl.find(f); return s ? Math.min(100, Math.round((s.seen / base) * 100)) : null }
                const resumo = reach(s => /Resumo/i.test(s.title))
                const precos = prods.map(c => ({ name: prodName(c), v: reach(s => s.product === c && /Condição/i.test(s.title)) }))
                const totalZooms = pr.zooms.reduce((a, z) => a + z.count, 0)
                const geoTotal = pr.geo.reduce((a, g) => a + g.count, 0)
                const devTotal = pr.device.reduce((a, d) => a + d.count, 0)
                const hasTime = pr.hour.some(v => v > 0)
                const peakHour = pr.hour.reduce((bi, v, i) => (v > pr.hour[bi] ? i : bi), 0)
                const WD = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
                const peakWd = pr.weekday.reduce((bi, v, i) => (v > pr.weekday[bi] ? i : bi), 0)
                const card = 'bg-zinc-900 border border-zinc-800 rounded-xl p-4'
                const title = 'text-[10px] font-semibold tracking-[0.12em] uppercase text-zinc-600 mb-3'
                const mini = 'bg-zinc-950/40 border border-zinc-800 rounded-lg p-3'
                const sub = 'text-xs text-zinc-500 mb-2'
                return (<>
                  {/* Engajamento */}
                  <div className={card}>
                    <p className={title}>Engajamento</p>
                    {sl.length === 0 ? (
                      <p className="text-zinc-600 text-sm py-2">Ainda sem dados de engajamento no período — eles aparecem conforme os investidores navegam pela apresentação.</p>
                    ) : (<>
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 mb-5">
                        <div className={mini}>
                          <p className="text-[10px] text-zinc-600 uppercase tracking-[0.08em] mb-1">Tempo médio por acesso</p>
                          <p className="text-xl font-bold text-violet-300 tabular-nums">{fmtDuration(totalSec / base)}</p>
                          <p className="text-[11px] text-zinc-600 mt-0.5">com a apresentação aberta e em uso</p>
                        </div>
                        <div className={mini}>
                          <p className="text-[10px] text-zinc-600 uppercase tracking-[0.08em] mb-1">Chegaram ao resumo</p>
                          <p className="text-xl font-bold text-green-300 tabular-nums">{resumo === null ? '—' : `${resumo}%`}</p>
                          <p className="text-[11px] text-zinc-600 mt-0.5">dos acessos viram o slide final de valores</p>
                        </div>
                        <div className={mini}>
                          <p className="text-[10px] text-zinc-600 uppercase tracking-[0.08em] mb-1">Viram o quadro de preços</p>
                          <div className="space-y-0.5 mt-1">
                            {precos.map(x => (
                              <p key={x.name} className="text-sm text-zinc-300 flex justify-between"><span>{x.name}</span><b className="tabular-nums text-amber-300">{x.v === null ? '—' : `${x.v}%`}</b></p>
                            ))}
                          </div>
                        </div>
                        <div className={mini}>
                          <p className="text-[10px] text-zinc-600 uppercase tracking-[0.08em] mb-1">Plantas ampliadas</p>
                          <p className="text-xl font-bold text-sky-300 tabular-nums">{totalZooms.toLocaleString('pt-BR')}</p>
                          <p className="text-[11px] text-zinc-600 mt-0.5">cliques para ver planta ou implantação</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                          <p className={sub}>Tempo por empreendimento (soma do período)</p>
                          <BarList items={sections} color="#a78bfa" format={fmtDuration} emptyText="Sem tempo registrado ainda." labelWidth="sm:w-52" max={6} />
                        </div>
                        <div>
                          <p className={sub}>Plantas e implantações ampliadas</p>
                          <BarList items={pr.zooms} color="#38bdf8" emptyText="Nenhuma planta ampliada no período." unit="ampliações" labelWidth="sm:w-64 xl:w-80" valueWidth="sm:w-10" />
                        </div>
                      </div>
                      <details className="mt-5">
                        <summary className="text-xs text-zinc-400 cursor-pointer select-none hover:text-zinc-200">Alcance e tempo médio por slide</summary>
                        <div className="mt-3 space-y-1">
                          {sl.map(s => {
                            const pct = Math.min(100, Math.round((s.seen / base) * 100))
                            const fill = <div className="h-full rounded" style={{ width: `${Math.max(2, pct)}%`, background: s.product ? PROD_COLORS[prods.indexOf(s.product) % PROD_COLORS.length] : '#52525b' }} />
                            return (
                              <div key={s.i} className="text-xs">
                                <div className="flex items-center gap-3">
                                  <span className="w-6 shrink-0 text-right text-zinc-600 tabular-nums">{String(s.i).padStart(2, '0')}</span>
                                  <span className="min-w-0 flex-1 sm:flex-none sm:w-72 truncate text-zinc-300" title={s.title}>{s.title || `Slide ${s.i}`}</span>
                                  <div className="hidden sm:block flex-1 bg-zinc-800/80 rounded h-3 overflow-hidden">{fill}</div>
                                  <span className="shrink-0 sm:w-48 text-right tabular-nums text-zinc-400 whitespace-nowrap">{pct}% · {s.seen ? fmtDuration(s.sec / s.seen) : '—'}<span className="hidden sm:inline"> por visita</span></span>
                                </div>
                                <div className="sm:hidden mt-1 ml-9 bg-zinc-800/80 rounded h-1.5 overflow-hidden">{fill}</div>
                              </div>
                            )
                          })}
                        </div>
                      </details>
                    </>)}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-2.5">
                    {/* Localização */}
                    <div className={card}>
                      <p className={title}>De onde acessam</p>
                      <BarList items={pr.geo} color="#34d399" total={geoTotal} emptyText="Sem acessos com localização no período." unit="acessos" max={10} />
                    </div>
                    {/* Dispositivo e horário */}
                    <div className={card}>
                      <p className={title}>Dispositivo e horário</p>
                      <BarList items={pr.device} color="#fbbf24" total={devTotal} emptyText="Sem acessos no período." max={3} labelWidth="sm:w-28" />
                      {pr.os.length > 0 && (
                        <p className="text-[11px] text-zinc-500 mt-2">Sistemas: {pr.os.map(o => `${o.name} ${o.count}`).join(' · ')}</p>
                      )}
                      <p className={`${sub} mt-4`}>Hora do acesso (Brasília){hasTime ? ` · pico às ${peakHour}h` : ''}</p>
                      <MiniColumns values={pr.hour} labels={pr.hour.map((_, h) => (h % 3 === 0 ? `${h}h` : ''))} color="#fbbf24" />
                      <p className={`${sub} mt-4`}>Dia da semana{hasTime ? ` · mais acessos ${['no domingo', 'na segunda', 'na terça', 'na quarta', 'na quinta', 'na sexta', 'no sábado'][peakWd]}` : ''}</p>
                      <MiniColumns values={pr.weekday} labels={WD} color="#fbbf24" height={48} />
                    </div>
                  </div>
                </>)
              })()}

              <p className="text-[11px] text-zinc-600 leading-relaxed">
                Pessoas = navegadores diferentes (o mesmo investidor no celular e no computador conta como 2). Os primeiros acessos, anteriores à contagem de pessoas e do perfil, aparecem só em Acessos — por isso percentuais do início podem ficar abaixo do real.
                Localização aproximada pelo provedor de internet, sem guardar IP (em redes de celular pode indicar a cidade da operadora). O tempo só conta com a apresentação visível e para após 2 minutos sem interação. Dias em horário UTC, como no restante do painel; hora e dia da semana em horário de Brasília.
              </p>
            </>)
          })()}
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
