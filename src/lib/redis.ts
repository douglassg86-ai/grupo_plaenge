import { Redis } from '@upstash/redis'

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
