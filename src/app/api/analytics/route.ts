import { NextRequest, NextResponse } from 'next/server'
import { getAnalytics } from '@/lib/redis'
import { managers } from '@/lib/managers'

export async function POST(req: NextRequest) {
  const { password, startDate, endDate } = await req.json()
  if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const end = endDate ?? new Date().toISOString().slice(0, 10)
  const start = startDate ?? new Date(Date.now() - 30 * 86400000).toISOString().slice(0, 10)

  const data = await Promise.all(
    managers.map(async m => ({
      slug: m.slug,
      name: m.name,
      photo: m.photo,
      ...(await getAnalytics(m.slug, start, end)),
    }))
  )

  return NextResponse.json({ data })
}
