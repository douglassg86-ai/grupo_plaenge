import { Redis } from '@upstash/redis'

// Uses UPSTASH_REDIS_KV_REST_API_URL and UPSTASH_REDIS_KV_REST_API_TOKEN
// set automatically by Vercel Upstash integration
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

export async function getAnalytics(slug: string, days = 30) {
  const r = getRedis()
  if (!r) return { visits: 0, clicks: 0, daily: [] as { date: string; visits: number; clicks: number }[] }

  const dailyData: { date: string; visits: number; clicks: number }[] = []
  const keys: string[] = []

  for (let i = 0; i < days; i++) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    const date = d.toISOString().slice(0, 10)
    keys.push(`manager:${slug}:visit:${date}`, `manager:${slug}:click:${date}`)
    dailyData.unshift({ date, visits: 0, clicks: 0 })
  }

  const values = await r.mget<number[]>(...keys)

  for (let i = 0; i < days; i++) {
    dailyData[i].visits = values[i * 2] ?? 0
    dailyData[i].clicks = values[i * 2 + 1] ?? 0
  }

  const totals = await r.mget<number[]>(
    `manager:${slug}:visit:total`,
    `manager:${slug}:click:total`
  )

  // Product click breakdown
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
    daily: dailyData,
    byProduct,
  }
}
