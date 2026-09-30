import { NextRequest, NextResponse } from 'next/server'
import { getInvestorAnalytics, getInvestorProfile } from '@/lib/redis'
import { INVESTOR_DECKS, isInvestorDeck } from '@/lib/investor-decks'

export async function POST(req: NextRequest) {
  const { password, startDate, endDate, deck: rawDeck } = await req.json()
  if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }
  const deck = rawDeck === undefined ? 'g1' : rawDeck
  if (!isInvestorDeck(deck)) return NextResponse.json({ error: 'Apresentação inválida' }, { status: 400 })
  const end = endDate ?? new Date().toISOString().slice(0, 10)
  const start = startDate ?? new Date(Date.now() - 30 * 86400000).toISOString().slice(0, 10)
  const [analytics, profile] = await Promise.all([getInvestorAnalytics(deck, start, end), getInvestorProfile(deck, start, end)])
  return NextResponse.json({ ...analytics, profile, deck: { id: deck, ...INVESTOR_DECKS[deck] } })
}
