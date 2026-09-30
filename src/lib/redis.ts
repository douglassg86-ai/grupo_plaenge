import { Redis } from '@upstash/redis'
import { INVESTOR_DECKS, InvestorDeck } from './investor-decks'

let redis: Redis | null = null

export function getRedis(): Redis | null {
  if (!process.env.UPSTASH_REDIS_KV_REST_API_URL || !process.env.UPSTASH_REDIS_KV_REST_API_TOKEN) {
    return null
  }
  if (!redis) {
    redis = new Redis({
      url: process.env.UPSTASH_REDIS_KV_REST_API_URL,
      token: process.env.UPSTASH_REDIS_KV_REST_API_TOKEN,
    })
  }
  return redis
}

export function todayKey(): string {
  return new Date().toISOString().slice(0, 10) // YYYY-MM-DD
}

/** Generate all YYYY-MM-DD strings between startDate and endDate inclusive */
function dateRange(startDate: string, endDate: string): string[] {
  const dates: string[] = []
  const cur = new Date(startDate + 'T12:00:00Z')
  const end = new Date(endDate + 'T12:00:00Z')
  while (cur <= end) {
    dates.push(cur.toISOString().slice(0, 10))
    cur.setUTCDate(cur.getUTCDate() + 1)
  }
  return dates
}

export async function trackEvent(slug: string, event: 'visit' | 'click', product?: string) {
  const r = getRedis()
  if (!r) return
  const day = todayKey()
  const ops: Promise<unknown>[] = [
    r.incr(`manager:${slug}:${event}:${day}`),
    r.incr(`manager:${slug}:${event}:total`),
  ]
  if (event === 'click' && product) {
    ops.push(r.incr(`manager:${slug}:click:product:${product}:${day}`))
    ops.push(r.incr(`manager:${slug}:click:product:${product}:total`))
  }
  await Promise.all(ops)
}

export async function trackUnitClick(product: string, unitCode: string) {
  const r = getRedis()
  if (!r) return
  const day = todayKey()
  const member = unitCode
  await Promise.all([
    r.zincrby(`unit:click:${product}:${day}`, 1, member),
    r.zincrby(`unit:click:${product}:total`, 1, member),
  ])
}

export async function getTopUnits(
  product: string,
  startDate: string,
  endDate: string,
  limit = 20
): Promise<{ code: string; clicks: number }[]> {
  const r = getRedis()
  if (!r) return []

  const dates = dateRange(startDate, endDate)
  const dailyKeys = dates.map(d => `unit:click:${product}:${d}`)

  // Use total key if range covers more than 60 days (performance guard)
  // Otherwise union the daily sorted sets
  let sourceKey: string
  const tmpKey = `tmp:unit:${product}:${startDate}:${endDate}:${Date.now()}`

  if (dailyKeys.length === 0) return []

  if (dailyKeys.length === 1) {
    sourceKey = dailyKeys[0]
  } else {
    await r.zunionstore(tmpKey, dailyKeys.length, dailyKeys)
    sourceKey = tmpKey
  }

  // ZRANGE with REV and WITHSCORES to get top N
  const raw = await r.zrange<string[]>(sourceKey, 0, limit - 1, { rev: true, withScores: true })

  if (sourceKey === tmpKey) {
    await r.del(tmpKey)
  }

  // raw alternates: [member, score, member, score, ...]
  const result: { code: string; clicks: number }[] = []
  for (let i = 0; i < raw.length; i += 2) {
    result.push({ code: String(raw[i]), clicks: Number(raw[i + 1]) })
  }
  return result
}

export const DACOES_IDS = ['parador', 'marques'] as const
export type DacaoId = typeof DACOES_IDS[number]

export async function trackDacaoClick(dacaoId: DacaoId) {
  const r = getRedis()
  if (!r) return
  const day = todayKey()
  await Promise.all([
    r.incr(`dacao:click:${dacaoId}:${day}`),
    r.incr(`dacao:click:${dacaoId}:total`),
    r.incr(`dacao:click:total:${day}`),
    r.incr(`dacao:click:total`),
  ])
}

export async function getDacoesClicks(startDate: string, endDate: string): Promise<{ total: number; byDacao: Record<DacaoId, number> }> {
  const r = getRedis()
  if (!r) return { total: 0, byDacao: { parador: 0, marques: 0 } }
  const dates = dateRange(startDate, endDate)
  const keys = DACOES_IDS.flatMap(id => dates.map(d => `dacao:click:${id}:${d}`))
  const values = keys.length > 0 ? await r.mget<number[]>(...keys) : []
  const byDacao = {} as Record<DacaoId, number>
  DACOES_IDS.forEach((id, i) => {
    byDacao[id] = dates.reduce((sum, _, di) => sum + (values[i * dates.length + di] ?? 0), 0)
  })
  const total = (Object.values(byDacao) as number[]).reduce((a, b) => a + b, 0)
  return { total, byDacao }
}

// ── PRODUCT VISIT TRACKING ──

const ALL_PRODUCTS = ['EDITION','MOOD','ORBITALE','SHIFT','SYNTHE','TREND HOME','TREND NANO','VERDANT','WAVE','YUNA']

export async function trackProductVisit(product: string) {
  const r = getRedis()
  if (!r) return
  const day = todayKey()
  await Promise.all([
    r.incr(`product:visit:${product}:${day}`),
    r.incr(`product:visit:${product}:total`),
  ])
}

export async function getProductVisits(startDate: string, endDate: string): Promise<{ product: string; visits: number }[]> {
  const r = getRedis()
  if (!r) return []
  const dates = dateRange(startDate, endDate)
  const keys = ALL_PRODUCTS.flatMap(p => dates.map(d => `product:visit:${p}:${d}`))
  const values = keys.length > 0 ? await r.mget<number[]>(...keys) : []
  return ALL_PRODUCTS
    .map((product, pi) => ({
      product,
      visits: dates.reduce((sum, _, di) => sum + (values[pi * dates.length + di] ?? 0), 0),
    }))
    .filter(p => p.visits > 0)
    .sort((a, b) => b.visits - a.visits)
}

// ── CONTENT CLICK TRACKING ──

const PRODUCT_CONTENT_KEYS: Record<string, { contentType: string; label: string }[]> = {
  'YUNA':       [{ contentType:'download',label:'book-pdf'},{ contentType:'download',label:'book-horizontal'},{ contentType:'download',label:'tabela-pagamento'},{ contentType:'acesso',label:'apresentacao-ppt'},{ contentType:'visita',label:'link-cliente'}],
  'EDITION':    [{ contentType:'download',label:'book-pdf'},{ contentType:'download',label:'tabela-pagamento'},{ contentType:'acesso',label:'tour-virtual'},{ contentType:'visita',label:'link-cliente'}],
  'TREND NANO': [{ contentType:'acesso',label:'apresentacao-nano'},{ contentType:'download',label:'book-pdf'},{ contentType:'download',label:'tabela-pagamento'},{ contentType:'video',label:'video-empreendimento'},{ contentType:'video',label:'video-decorado'},{ contentType:'visita',label:'link-cliente'}],
  'VERDANT':    [{ contentType:'acesso',label:'apresentacao-verdant'},{ contentType:'download',label:'book-pdf'},{ contentType:'download',label:'tabela-pagamento'},{ contentType:'visita',label:'link-cliente'}],
  'SHIFT':      [{ contentType:'acesso',label:'ppt-corretor'},{ contentType:'download',label:'book-pdf'},{ contentType:'download',label:'tabela-pagamento'},{ contentType:'visita',label:'link-cliente'}],
  'SYNTHE':     [{ contentType:'acesso',label:'ppt-corretor'},{ contentType:'download',label:'book-pdf'},{ contentType:'video',label:'video-evento'},{ contentType:'visita',label:'link-cliente'}],
  'MOOD':       [{ contentType:'download',label:'book-pdf'},{ contentType:'download',label:'tabela-pagamento'},{ contentType:'visita',label:'link-cliente'}],
  'ORBITALE':   [{ contentType:'download',label:'book-pdf'},{ contentType:'visita',label:'link-cliente'}],
  'WAVE':       [{ contentType:'download',label:'book-pdf'},{ contentType:'download',label:'tabela-pagamento'},{ contentType:'visita',label:'link-cliente'}],
  'INVESTIDORES': [{ contentType:'acesso',label:'apresentacao'},{ contentType:'visita',label:'tela-de-senha'},{ contentType:'visita',label:'senha-incorreta'}],
  'INVESTIDORES 2': [{ contentType:'acesso',label:'apresentacao'},{ contentType:'visita',label:'tela-de-senha'},{ contentType:'visita',label:'senha-incorreta'}],
}

export async function trackContentClick(product: string, contentType: string, label: string) {
  const r = getRedis()
  if (!r) return
  const day = todayKey()
  const base = `content:click:${product}:${contentType}:${label}`
  await Promise.all([r.incr(`${base}:${day}`), r.incr(`${base}:total`)])
}

export async function getProductContentClicks(
  product: string, startDate: string, endDate: string
): Promise<{ contentType: string; label: string; count: number }[]> {
  const r = getRedis()
  if (!r) return []
  const items = PRODUCT_CONTENT_KEYS[product] ?? []
  if (items.length === 0) return []
  const dates = dateRange(startDate, endDate)
  const keys = items.flatMap(ci => dates.map(d => `content:click:${product}:${ci.contentType}:${ci.label}:${d}`))
  const values = keys.length > 0 ? await r.mget<number[]>(...keys) : []
  return items
    .map((ci, ii) => ({
      contentType: ci.contentType,
      label: ci.label,
      count: dates.reduce((sum, _, di) => sum + (values[ii * dates.length + di] ?? 0), 0),
    }))
    .filter(c => c.count > 0)
    .sort((a, b) => b.count - a.count)
}

// ── APRESENTAÇÕES PARA INVESTIDORES (/investidores, /investidores2 — ver investor-decks.ts) ──
// Contagens usam as chaves de conteúdo (content:click:{product}:…), que já gravam desde o
// lançamento. Pessoas únicas = navegadores, por um id aleatório que a página guarda no
// localStorage (HyperLogLog: {prefix}:uv:{evento}:{dia|total}).

export const INVESTOR_EVENTS = ['acesso', 'tela-de-senha', 'senha-incorreta'] as const
export type InvestorEvent = typeof INVESTOR_EVENTS[number]

const INVESTOR_CONTENT_SUFFIX: Record<InvestorEvent, string> = {
  'acesso': 'acesso:apresentacao',
  'tela-de-senha': 'visita:tela-de-senha',
  'senha-incorreta': 'visita:senha-incorreta',
}
const investorContentKey = (deck: InvestorDeck, event: InvestorEvent) =>
  `content:click:${INVESTOR_DECKS[deck].product}:${INVESTOR_CONTENT_SUFFIX[event]}`

// Contexto de cada acesso: cabeçalhos de geolocalização da Vercel e user-agent.
// Só entram em contagens agregadas por dia — nada é guardado por pessoa, nem o IP.
export type InvestorContext = { ua?: string; city?: string; region?: string; country?: string }

function deviceOf(ua: string): { device: string; os: string } {
  const device = /iPad|Tablet|PlayBook|Silk|Android(?!.*Mobile)/i.test(ua) ? 'Tablet'
    : /Mobi|iPhone|iPod|Android|BlackBerry|Opera Mini|IEMobile/i.test(ua) ? 'Celular' : 'Computador'
  const os = /iPhone|iPad|iPod/i.test(ua) ? 'iOS' : /Android/i.test(ua) ? 'Android' : /Windows/i.test(ua) ? 'Windows'
    : /Macintosh|Mac OS X/i.test(ua) ? 'macOS' : /CrOS/i.test(ua) ? 'ChromeOS' : /Linux/i.test(ua) ? 'Linux' : 'Outro'
  return { device, os }
}

function placeOf(ctx: InvestorContext): string {
  let city = ctx.city ?? ''
  try { city = decodeURIComponent(city) } catch { /* mantém como veio */ }
  if (!city) return 'Não identificada'
  const parts = [city.slice(0, 60)]
  if (ctx.region) parts.push(ctx.region.slice(0, 10))
  if (ctx.country && ctx.country !== 'BR') parts.push(ctx.country.slice(0, 4))
  return parts.join(' · ')
}

/** Hora (0–23) e dia da semana (0 = domingo) no horário de Brasília. */
function brasiliaNow(): { hour: number; weekday: number } {
  const parts = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Sao_Paulo', hour: 'numeric', hourCycle: 'h23', weekday: 'short' }).formatToParts(new Date())
  const hour = Number(parts.find(p => p.type === 'hour')?.value ?? 0) % 24
  const weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(parts.find(p => p.type === 'weekday')?.value ?? 'Sun')
  return { hour, weekday: Math.max(0, weekday) }
}

export async function trackInvestorEvent(deck: InvestorDeck, event: InvestorEvent, visitorId?: string, ctx?: InvestorContext) {
  const r = getRedis()
  if (!r) return
  const day = todayKey()
  const k = INVESTOR_DECKS[deck].prefix
  const content = investorContentKey(deck, event)
  const ops: Promise<unknown>[] = [r.incr(`${content}:${day}`), r.incr(`${content}:total`)]
  if (visitorId && event !== 'senha-incorreta') {
    ops.push(r.pfadd(`${k}:uv:${event}:${day}`, visitorId), r.pfadd(`${k}:uv:${event}:total`, visitorId))
  }
  if (event === 'acesso') {
    ops.push(r.set(`${k}:last-access`, new Date().toISOString()))
    if (ctx) {
      const { device, os } = deviceOf(ctx.ua ?? '')
      const { hour, weekday } = brasiliaNow()
      ops.push(
        r.hincrby(`${k}:geo:${day}`, placeOf(ctx), 1),
        r.hincrby(`${k}:device:${day}`, device, 1),
        r.hincrby(`${k}:os:${day}`, os, 1),
        r.hincrby(`${k}:hour:${day}`, String(hour), 1),
        r.hincrby(`${k}:wd:${day}`, String(weekday), 1),
      )
    }
  }
  await Promise.all(ops)
}

// Engajamento: a apresentação envia só o que mudou desde o último envio. Títulos de
// slide e legendas de planta vêm da própria apresentação e ficam só no Redis
// ({prefix}:eng:meta / {prefix}:eng:zoommeta) — este repositório é público.
export type EngagementSlide = { i: number; t: string; p: string; seen: boolean; sec: number }
export type EngagementZoom = { k: string; c: string }

export async function trackInvestorEngagement(deck: InvestorDeck, slides: EngagementSlide[], zooms: EngagementZoom[]) {
  const r = getRedis()
  if (!r || slides.length + zooms.length === 0) return
  const day = todayKey()
  const k = INVESTOR_DECKS[deck].prefix
  const p = r.pipeline()
  for (const s of slides) {
    p.hset(`${k}:eng:meta`, { [String(s.i)]: `${s.p}|${s.t}` })
    if (s.seen) p.incr(`${k}:eng:seen:${s.i}:${day}`)
    if (s.sec > 0) p.incrby(`${k}:eng:sec:${s.i}:${day}`, s.sec)
  }
  for (const z of zooms) {
    if (z.c) p.hset(`${k}:eng:zoommeta`, { [z.k]: z.c })
    p.hincrby(`${k}:eng:zoom:${day}`, z.k, 1)
  }
  await p.exec()
}

export type InvestorProfile = {
  geo: { name: string; count: number }[]
  device: { name: string; count: number }[]
  os: { name: string; count: number }[]
  hour: number[]      // 24 posições, horário de Brasília
  weekday: number[]   // 7 posições, 0 = domingo
  slides: { i: number; title: string; product: string; seen: number; sec: number }[]
  zooms: { name: string; count: number }[]
}

export async function getInvestorProfile(deck: InvestorDeck, startDate: string, endDate: string): Promise<InvestorProfile> {
  const empty: InvestorProfile = { geo: [], device: [], os: [], hour: Array(24).fill(0), weekday: Array(7).fill(0), slides: [], zooms: [] }
  const r = getRedis()
  if (!r) return empty
  const { prefix: k, since } = INVESTOR_DECKS[deck]
  const start = startDate < since ? since : startDate
  const dates = start <= endDate ? dateRange(start, endDate) : []
  if (dates.length === 0) return empty

  const HASHES = ['geo', 'device', 'os', 'hour', 'wd', 'eng:zoom'] as const
  const p = r.pipeline()
  HASHES.forEach(h => dates.forEach(d => p.hgetall(`${k}:${h}:${d}`)))
  p.hgetall(`${k}:eng:meta`)
  p.hgetall(`${k}:eng:zoommeta`)
  const res = await p.exec<(Record<string, unknown> | null)[]>()

  const sumHash = (hIdx: number) => {
    const acc: Record<string, number> = {}
    for (let k = 0; k < dates.length; k++) {
      const h = res[hIdx * dates.length + k]
      if (h) for (const [f, v] of Object.entries(h)) acc[f] = (acc[f] ?? 0) + Number(v)
    }
    return acc
  }
  const ranked = (o: Record<string, number>) => Object.entries(o).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count)
  const hourAcc = sumHash(3), wdAcc = sumHash(4)

  const meta = (res[HASHES.length * dates.length] ?? {}) as Record<string, unknown>
  const zoomMeta = (res[HASHES.length * dates.length + 1] ?? {}) as Record<string, unknown>
  const idx =Object.keys(meta).map(Number).filter(n => n > 0).sort((a, b) => a - b)
  let slides: InvestorProfile['slides'] = []
  if (idx.length) {
    const keys = idx.flatMap(i => dates.flatMap(d => [`${k}:eng:seen:${i}:${d}`, `${k}:eng:sec:${i}:${d}`]))
    const vals = await r.mget<(number | null)[]>(...keys)
    slides = idx.map((i, si) => {
      let seen = 0, sec = 0
      for (let k = 0; k < dates.length; k++) {
        const base = (si * dates.length + k) * 2
        seen += Number(vals[base] ?? 0); sec += Number(vals[base + 1] ?? 0)
      }
      const [product = '', ...rest] = String(meta[String(i)] ?? '').split('|')
      return { i, title: rest.join('|'), product, seen, sec }
    })
  }

  return {
    geo: ranked(sumHash(0)),
    device: ranked(sumHash(1)),
    os: ranked(sumHash(2)),
    hour: Array.from({ length: 24 }, (_, h) => hourAcc[String(h)] ?? 0),
    weekday: Array.from({ length: 7 }, (_, w) => wdAcc[String(w)] ?? 0),
    slides,
    zooms: ranked(sumHash(5)).map(z => ({ name: String(zoomMeta[z.name] ?? z.name), count: z.count })),
  }
}

export type InvestorDay = { date: string; acessos: number; pessoas: number; telas: number; erros: number }

export async function getInvestorAnalytics(deck: InvestorDeck, startDate: string, endDate: string) {
  const { prefix: k, since } = INVESTOR_DECKS[deck]
  const empty = {
    since: since as string,
    daily: [] as InvestorDay[],
    period: { acessos: 0, pessoas: 0, telas: 0, pessoasTela: 0, erros: 0 },
    allTime: { acessos: 0, pessoas: 0 },
    lastAccess: null as string | null,
  }
  const r = getRedis()
  if (!r) return empty
  const start = startDate < since ? since : startDate
  const dates = start <= endDate ? dateRange(start, endDate) : []
  if (dates.length === 0) return empty

  const countKeys = (['acesso', 'tela-de-senha', 'senha-incorreta'] as const).flatMap(ev => dates.map(d => `${investorContentKey(deck, ev)}:${d}`))
  const counts = await r.mget<(number | null)[]>(...countKeys)
  const at = (evIdx: number, dayIdx: number) => Number(counts[evIdx * dates.length + dayIdx] ?? 0)

  const accKeys = dates.map(d => `${k}:uv:acesso:${d}`)
  const telaKeys = dates.map(d => `${k}:uv:tela-de-senha:${d}`)
  const p = r.pipeline()
  accKeys.forEach(k => p.pfcount(k))
  p.pfcount(accKeys[0], ...accKeys.slice(1))    // união do período = pessoas únicas
  p.pfcount(telaKeys[0], ...telaKeys.slice(1))
  p.get(`${investorContentKey(deck, 'acesso')}:total`)
  p.pfcount(`${k}:uv:acesso:total`)
  p.get(`${k}:last-access`)
  const res = await p.exec<unknown[]>()
  const perDay = res.slice(0, dates.length).map(Number)
  const [pessoasPeriodo, pessoasTela, acessosTotal, pessoasTotal, lastAccess] = res.slice(dates.length)

  const daily: InvestorDay[] = dates.map((date, i) => ({
    date, acessos: at(0, i), pessoas: perDay[i] || 0, telas: at(1, i), erros: at(2, i),
  }))
  return {
    since: since as string,
    daily,
    period: {
      acessos: daily.reduce((s, d) => s + d.acessos, 0),
      pessoas: Number(pessoasPeriodo) || 0,
      telas: daily.reduce((s, d) => s + d.telas, 0),
      pessoasTela: Number(pessoasTela) || 0,
      erros: daily.reduce((s, d) => s + d.erros, 0),
    },
    allTime: { acessos: Number(acessosTotal) || 0, pessoas: Number(pessoasTotal) || 0 },
    lastAccess: typeof lastAccess === 'string' ? lastAccess : null,
  }
}

export async function getAnalytics(slug: string, startDate: string, endDate: string) {
  const r = getRedis()
  if (!r) return { visits: 0, clicks: 0, daily: [] as { date: string; visits: number; clicks: number }[], byProduct: {} as Record<string, number> }

  const dates = dateRange(startDate, endDate)
  const keys: string[] = []
  for (const date of dates) {
    keys.push(`manager:${slug}:visit:${date}`, `manager:${slug}:click:${date}`)
  }

  const values = keys.length > 0 ? await r.mget<number[]>(...keys) : []
  const daily = dates.map((date, i) => ({
    date,
    visits: values[i * 2] ?? 0,
    clicks: values[i * 2 + 1] ?? 0,
  }))

  const totals = await r.mget<number[]>(
    `manager:${slug}:visit:total`,
    `manager:${slug}:click:total`
  )

  const PRODUCTS = ['EDITION','MOOD','ORBITALE','VERDANT','YUNA','TREND HOME','TREND NANO','SYNTHÈ','WAVE','SHIFT']
  const productKeys = PRODUCTS.map(p => `manager:${slug}:click:product:${p}:total`)
  const productValues = await r.mget<number[]>(...productKeys)
  const byProduct: Record<string, number> = {}
  PRODUCTS.forEach((p, i) => {
    const v = productValues[i] ?? 0
    if (v > 0) byProduct[p] = v
  })

  return {
    visits: totals[0] ?? 0,
    clicks: totals[1] ?? 0,
    daily,
    byProduct,
  }
}
