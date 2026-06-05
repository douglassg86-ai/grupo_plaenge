import { NextRequest, NextResponse } from 'next/server'
import { trackEvent } from '@/lib/redis'
import { getManager } from '@/lib/managers'

export async function POST(req: NextRequest) {
  try {
    const { slug, event } = await req.json()
    if (!slug || !event) return NextResponse.json({ ok: false })
    if (!getManager(slug)) return NextResponse.json({ ok: false })
    if (event !== 'visit' && event !== 'click') return NextResponse.json({ ok: false })
    await trackEvent(slug, event)
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false })
  }
}
