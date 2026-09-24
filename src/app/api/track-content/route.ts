import { NextRequest, NextResponse } from 'next/server'
import { trackContentClick } from '@/lib/redis'

export async function POST(req: NextRequest) {
  try {
    const { product, contentType, label } = await req.json()
    if (typeof product === 'string' && typeof contentType === 'string' && typeof label === 'string') {
      await trackContentClick(product, contentType, label)
    }
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
