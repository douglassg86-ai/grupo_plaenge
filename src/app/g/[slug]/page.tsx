import { redirect, notFound } from 'next/navigation'
import { cookies } from 'next/headers'
import { getManager } from '@/lib/managers'
import { trackEvent } from '@/lib/redis'

export const dynamic = 'force-dynamic'

interface Props {
  params: { slug: string }
}

export default async function ManagerEntryPage({ params }: Props) {
  const manager = getManager(params.slug)
  if (!manager) notFound()

  // Set cookie (1 year)
  cookies().set('manager', manager.slug, {
    maxAge: 60 * 60 * 24 * 365,
    path: '/',
    httpOnly: false, // needs to be readable by client for WhatsApp button
    sameSite: 'lax',
  })

  // Track visit (fire and forget)
  await trackEvent(manager.slug, 'visit')

  redirect('/')
}
