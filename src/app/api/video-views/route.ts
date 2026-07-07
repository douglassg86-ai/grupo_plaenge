import { NextRequest, NextResponse } from 'next/server'
import { getRedis } from '@/lib/redis'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'plaenge2024'

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json()
    if (password !== ADMIN_PASSWORD) return NextResponse.json({ ok: false }, { status: 401 })
    const r = getRedis()
    if (!r) return NextResponse.json({ ok: true, total: 0, today: 0 })
    const today = new Date().toISOString().slice(0, 10)
    const [total, todayCount] = await Promise.all([
      r.get<number>('synthe:convite:views:total'),
      r.get<number>(`synthe:convite:views:${today}`),
    ])
    return NextResponse.json({ ok: true, total: total ?? 0, today: todayCount ?? 0 })
  } catch {
    return NextResponse.json({ ok: false })
  }
}
