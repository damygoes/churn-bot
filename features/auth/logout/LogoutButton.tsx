'use client'

import { Button } from '@/components/ui/button/Button'
import { cn } from '@/lib/utils'
import { SignOutButton } from '@clerk/nextjs'
import { useTranslations } from 'next-intl'

export default function LogoutButton({ className }: { className?: string }) {
  const t = useTranslations('Auth')

  return (
    <SignOutButton>
      <Button className={cn(className)} variant="destructive">
        {t('logout')}
      </Button>
    </SignOutButton>
  )
}
