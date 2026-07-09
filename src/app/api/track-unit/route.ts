import { NextRequest, NextResponse } from 'next/server'
import { trackUnitClick } from '@/lib/redis'

const VALID_PRODUCTS = ['YUNA','EDITION','MOOD','ORBITALE','VERDANT','TREND HOME','TREND NANO','WAVE','SHIFT','SYNTHÈ']

export async function POST(req: NextRequest) {
  try {
    const { product, unitCode } = await req.json()
    if (!product || !unitCode) return NextResponse.json({ ok: false })
    if (!VALID_PRODUCTS.includes(product)) return NextResponse.json({ ok: false })
    if (typeof unitCode !== 'string' || unitCode.length > 20) return NextResponse.json({ ok: false })
    await trackUnitClick(product, unitCode)
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false })
  }
}
