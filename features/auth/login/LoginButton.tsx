'use client'

import { Button } from '@/components/ui/button/Button'
import { cn } from '@/lib/utils'
import { SignInButton } from '@clerk/nextjs'
import { useTranslations } from 'next-intl'

export default function LoginButton({
  buttonTitle,
  className,
}: {
  buttonTitle?: string
  className?: string
}) {
  const t = useTranslations('Auth')

  return (
    <SignInButton>
      <Button className={cn(className)}>{buttonTitle || t('login')}</Button>
    </SignInButton>
  )
}
