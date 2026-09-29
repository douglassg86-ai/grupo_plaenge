import { NextRequest, NextResponse } from 'next/server'
import { INVESTOR_EVENTS, InvestorEvent, trackInvestorEvent } from '@/lib/redis'

// Chamado pela apresentação (/investidores) e pela tela de senha dela.
// `vid`: id aleatório do navegador (localStorage) — só para contar pessoas únicas.
const VID = /^[A-Za-z0-9-]{8,64}$/

export async function POST(req: NextRequest) {
  try {
    const { event, vid } = await req.json()
    if (!INVESTOR_EVENTS.includes(event)) return NextResponse.json({ ok: false }, { status: 400 })
    await trackInvestorEvent(event as InvestorEvent, typeof vid === 'string' && VID.test(vid) ? vid : undefined)
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
