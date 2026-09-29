import { NextRequest, NextResponse } from 'next/server'
import { EngagementSlide, EngagementZoom, INVESTOR_EVENTS, InvestorEvent, trackInvestorEngagement, trackInvestorEvent } from '@/lib/redis'

// Chamado pela apresentação (/investidores) e pela tela de senha dela.
// `vid`: id aleatório do navegador (localStorage) — só para contar pessoas únicas.
// Cidade/estado vêm dos cabeçalhos de geolocalização da Vercel; o IP não é guardado.
const VID = /^[A-Za-z0-9-]{8,64}$/
const ZOOM = /^[A-Za-z0-9_]{1,40}$/
const PRODUCTS = new Set(['', 'ED', 'SY', 'CT'])

const text = (v: unknown) => (typeof v === 'string' ? v.replace(/[\r\n\t]/g, ' ').trim().slice(0, 80) : '')

function cleanSlides(raw: unknown): EngagementSlide[] {
  if (!Array.isArray(raw)) return []
  return raw.slice(0, 40).flatMap((s): EngagementSlide[] => {
    const i = Number(s?.i), sec = Math.round(Number(s?.sec ?? 0))
    const p = typeof s?.p === 'string' ? s.p : ''
    if (!Number.isInteger(i) || i < 1 || i > 60 || !PRODUCTS.has(p) || !Number.isFinite(sec)) return []
    return [{ i, p, t: text(s?.t), seen: s?.seen === true, sec: Math.min(Math.max(sec, 0), 600) }]
  })
}

// Plantas ampliadas: chave (nome do arquivo) + legenda que o painel exibe.
function cleanZooms(raw: unknown): EngagementZoom[] {
  if (!Array.isArray(raw)) return []
  return raw.slice(0, 20).flatMap((z): EngagementZoom[] => (typeof z?.k === 'string' && ZOOM.test(z.k) ? [{ k: z.k, c: text(z?.c) }] : []))
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  if (!body || typeof body !== 'object') return NextResponse.json({ ok: false }, { status: 400 })
  try {
    if (body.event === 'engajamento') {
      await trackInvestorEngagement(cleanSlides(body.slides), cleanZooms(body.zooms))
      return NextResponse.json({ ok: true })
    }
    const { event, vid } = body
    if (!INVESTOR_EVENTS.includes(event)) return NextResponse.json({ ok: false }, { status: 400 })
    await trackInvestorEvent(event as InvestorEvent, typeof vid === 'string' && VID.test(vid) ? vid : undefined, {
      ua: req.headers.get('user-agent') ?? '',
      city: req.headers.get('x-vercel-ip-city') ?? '',
      region: req.headers.get('x-vercel-ip-country-region') ?? '',
      country: req.headers.get('x-vercel-ip-country') ?? '',
    })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
