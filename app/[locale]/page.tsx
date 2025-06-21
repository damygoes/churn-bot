'use client'

import { LanguageSwitcher } from '@/components/language-switcher/LanguageSwitcher'
import LoginButton from '@/features/auth/login/LoginButton'
import { useScrolled } from '@/hooks/useScrolled'
import { SignedOut } from '@clerk/nextjs'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'

export default function Home() {
  const t = useTranslations('LandingPage')
  const scrolled = useScrolled(0)

  return (
    <div className="relative flex flex-col items-start justify-start min-h-screen gap-8 bg-background p-8 scrollbar-hide sm:p-20 sm:pt-4">
      <header
        className={clsx(
          'sticky z-50 flex h-16 gap-4 px-4 transition-colors duration-300 top-0 right-0 w-full items-center justify-end',
          {
            glass: scrolled,
          }
        )}
      >
        <SignedOut>
          <LoginButton />
        </SignedOut>
        <LanguageSwitcher />
        {/* <SignedIn>
          <UserButton />
        </SignedIn> */}
      </header>

      <div className="flex flex-col items-start justify-start gap-4 w-full h-full grow scrollbar-hide">
        <h1>{t('title')}</h1>
        {Array.from({ length: 100 }).map((_, i) => (
          <p key={i}>Test</p>
        ))}
        <p>LAST TEST</p>
      </div>
    </div>
  )
}
