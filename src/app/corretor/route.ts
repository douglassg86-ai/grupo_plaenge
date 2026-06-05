import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const url = new URL('/', req.url)
  const res = NextResponse.redirect(url)
  res.cookies.set('manager', '', { maxAge: 0, path: '/' })
  return res
}
