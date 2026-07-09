import { NextRequest, NextResponse } from 'next/server'
import { getTopUnits } from '@/lib/redis'

const VALID_PRODUCTS = ['YUNA','EDITION','MOOD','ORBITALE','VERDANT','TREND HOME','TREND NANO','WAVE','SHIFT','SYNTHÈ']

export async function POST(req: NextRequest) {
  try {
    const { password, product, startDate, endDate } = await req.json()
    if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }
    if (!product || !VALID_PRODUCTS.includes(product)) {
      return NextResponse.json({ error: 'Produto inválido' }, { status: 400 })
    }
    const start = startDate ?? new Date(Date.now() - 30 * 86400000).toISOString().slice(0, 10)
    const end = endDate ?? new Date().toISOString().slice(0, 10)
    const units = await getTopUnits(product, start, end, 30)
    return NextResponse.json({ units })
  } catch {
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
