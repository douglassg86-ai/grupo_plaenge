import { NextRequest, NextResponse } from 'next/server'
import { getInvestorAnalytics, getInvestorProfile } from '@/lib/redis'

export async function POST(req: NextRequest) {
  const { password, startDate, endDate } = await req.json()
  if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }
  const end = endDate ?? new Date().toISOString().slice(0, 10)
  const start = startDate ?? new Date(Date.now() - 30 * 86400000).toISOString().slice(0, 10)
  const [analytics, profile] = await Promise.all([getInvestorAnalytics(start, end), getInvestorProfile(start, end)])
  return NextResponse.json({ ...analytics, profile })
}
