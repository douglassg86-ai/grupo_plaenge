import { NextRequest, NextResponse } from 'next/server'
import { getAnalytics, getDacoesClicks, getProductVisits, getProductContentClicks } from '@/lib/redis'
import { managers } from '@/lib/managers'

const ALL_PRODUCTS = ['EDITION','MOOD','ORBITALE','SHIFT','SYNTHE','TREND HOME','TREND NANO','VERDANT','WAVE','YUNA']

export async function POST(req: NextRequest) {
  const { password, startDate, endDate } = await req.json()
  if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const end = endDate ?? new Date().toISOString().slice(0, 10)
  const start = startDate ?? new Date(Date.now() - 30 * 86400000).toISOString().slice(0, 10)

  const [data, dacoes, productVisits, ...contentArrays] = await Promise.all([
    Promise.all(
      managers.map(async m => ({
        slug: m.slug,
        name: m.name,
        photo: m.photo,
        ...(await getAnalytics(m.slug, start, end)),
      }))
    ),
    getDacoesClicks(start, end),
    getProductVisits(start, end),
    ...ALL_PRODUCTS.map(p => getProductContentClicks(p, start, end)),
  ])

  const contentByProduct: Record<string, { contentType: string; label: string; count: number }[]> = {}
  ALL_PRODUCTS.forEach((p, i) => {
    if (contentArrays[i]?.length > 0) contentByProduct[p] = contentArrays[i]
  })

  return NextResponse.json({ data, dacoes, productVisits, contentByProduct })
}
