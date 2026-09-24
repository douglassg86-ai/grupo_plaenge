import { NextRequest, NextResponse } from 'next/server'
import { trackProductVisit } from '@/lib/redis'

export async function POST(req: NextRequest) {
  try {
    const { product } = await req.json()
    if (typeof product === 'string' && product) {
      await trackProductVisit(product)
    }
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
