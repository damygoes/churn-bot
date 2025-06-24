'use client'

import { LanguageSwitcher } from '@/components/language-switcher/LanguageSwitcher'
import { Button } from '@/components/ui/button/Button'
import LoginButton from '@/features/auth/login/LoginButton'
import { useScrolled } from '@/hooks/useScrolled'
import { cn } from '@/lib/utils'
import { SignedOut } from '@clerk/nextjs'
import { Bot } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function LandingHeader() {
  const t = useTranslations('LandingPage')
  const scrolled = useScrolled(0)

  return (
    <header
      className={cn(
        'sticky z-50 flex h-16 gap-4 w-full px-2 items-center justify-between right-0 top-0 mx-auto transition-all duration-500 ease-in-out',
        {
          'glass top-4 w-3/5 px-8': scrolled,
        }
      )}
    >
      <div className="flex items-center justify-start gap-1">
        <Button variant="ghost" size="icon">
          <Bot className="w-12 h-12" />
          <span className="sr-only">KPI Bot</span>
        </Button>
        <h1 className="text-lg font-semibold uppercase">
          KPI <span className="text-xs tracking-wider font-medium">BOT</span>
        </h1>
      </div>

      <div className="flex items-center justify-end gap-4 grow">
        <SignedOut>
          <LoginButton buttonTitle={t('getStarted')} />
        </SignedOut>
        <LanguageSwitcher />
      </div>
    </header>
  )
}
