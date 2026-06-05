import { NextRequest, NextResponse } from 'next/server'
import { getAnalytics } from '@/lib/redis'
import { managers } from '@/lib/managers'

export async function POST(req: NextRequest) {
  const { password, days = 30 } = await req.json()
  if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const data = await Promise.all(
    managers.map(async m => ({
      slug: m.slug,
      name: m.name,
      photo: m.photo,
      ...(await getAnalytics(m.slug, days)),
    }))
  )

  return NextResponse.json({ data })
}
