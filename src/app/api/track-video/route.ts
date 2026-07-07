import { NextResponse } from 'next/server'
import { getRedis, todayKey } from '@/lib/redis'

export async function POST() {
  try {
    const r = getRedis()
    if (!r) return NextResponse.json({ ok: false })
    const day = todayKey()
    await Promise.all([
      r.incr('synthe:convite:views:total'),
      r.incr(`synthe:convite:views:${day}`),
    ])
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false })
  }
}
