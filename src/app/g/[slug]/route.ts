import { NextRequest, NextResponse } from 'next/server'
import { getManager } from '@/lib/managers'
import { trackEvent } from '@/lib/redis'

export const dynamic = 'force-dynamic'

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const manager = getManager(params.slug)

  if (!manager) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  // Track visit (non-blocking)
  trackEvent(manager.slug, 'visit').catch(() => {})

  // Redirect to home setting the cookie via response header
  const response = NextResponse.redirect(new URL('/', req.url))
  response.cookies.set('manager', manager.slug, {
    maxAge: 60 * 60 * 24 * 365,
    path: '/',
    httpOnly: false,
    sameSite: 'lax',
  })

  return response
}
