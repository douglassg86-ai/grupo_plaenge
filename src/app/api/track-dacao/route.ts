import { NextRequest, NextResponse } from 'next/server'
import { trackDacaoClick, DACOES_IDS, type DacaoId } from '@/lib/redis'

export async function POST(req: NextRequest) {
  try {
    const { dacaoId } = await req.json()
    if (!dacaoId || !(DACOES_IDS as readonly string[]).includes(dacaoId)) {
      return NextResponse.json({ ok: false })
    }
    await trackDacaoClick(dacaoId as DacaoId)
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false })
  }
}
