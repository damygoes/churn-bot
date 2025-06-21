'use client'

import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'

export function useBreadcrumbs() {
  const pathname = usePathname()
  const t = useTranslations('Sidebar')

  if (!pathname) return []

  const segments = pathname.split('/').filter(Boolean)

  // Skip locale (assume first segment is the locale code)
  const [, ...rest] = segments.length > 1 ? segments : [null]

  return rest
    .filter((segment): segment is string => segment !== null)
    .map((segment, idx) => ({
      href: `/${segments[0]}/${rest.slice(0, idx + 1).join('/')}`,
      label: t(segment),
    }))
}
