'use client'

import { Button } from '@/components/ui/button/Button'
import { useAuth } from '@clerk/nextjs'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

export default function NotFound() {
  const { isSignedIn } = useAuth()
  const t = useTranslations('ErrorBoundary')

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 text-7xl">📉</div>

      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
        {t('title')}
      </h2>
      <p className="mt-2 max-w-md text-sm text-muted-foreground sm:text-base">
        {t('description')}
      </p>
      <Button variant="link" className="mt-6">
        <Link
          href={isSignedIn ? '/dashboard' : '/'}
          className="text-primary hover:underline"
        >
          {t('action')}
        </Link>
      </Button>
    </div>
  )
}
