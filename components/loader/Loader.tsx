'use client'

import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { useTranslations } from 'next-intl'

interface LoadingProps {
  message?: string
  fullPage?: boolean
  className?: string
}

export function Loader({ message, fullPage = false, className }: LoadingProps) {
  const t = useTranslations('Loader')
  const content = (
    <div
      className={cn(
        'flex flex-col items-center gap-2 text-muted-foreground',
        className
      )}
    >
      <Loader2 className="h-6 w-6 animate-spin text-primary" />
      <span className="text-sm">{t('message') || message}</span>
    </div>
  )

  if (fullPage) {
    return (
      <div className="flex h-[80vh] items-center justify-center">{content}</div>
    )
  }

  return content
}
