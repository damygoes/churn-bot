'use client'

import {
  type Locale,
  LOCALE_LABELS,
  SUPPORTED_LOCALES,
} from '@/lib/i18n/config'
import { useLocale } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu/DropdownMenu'

type Props = {
  __storybookLocaleOverride?: Locale
  onLocaleChange?: (locale: Locale) => void
}

export function LanguageSwitcher({
  __storybookLocaleOverride,
  onLocaleChange,
}: Props) {
  const localeFromHook = useLocale() as Locale
  const currentLocale = __storybookLocaleOverride ?? localeFromHook

  const pathname = usePathname()
  const router = useRouter()

  const handleLocaleChange = (locale: Locale) => {
    if (onLocaleChange) {
      // Storybook interactive mode: only update state, skip router.push
      onLocaleChange(locale)
    } else {
      // Real app mode: update URL
      const segments = pathname.split('/')
      segments[1] = locale
      router.push(segments.join('/'))
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex items-center px-3 py-2 rounded-md border bg-background text-foreground text-sm">
        {LOCALE_LABELS[currentLocale]}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup
          value={currentLocale}
          onValueChange={(value) => handleLocaleChange(value as Locale)}
        >
          {SUPPORTED_LOCALES.map((locale) => (
            <DropdownMenuRadioItem key={locale} value={locale}>
              {LOCALE_LABELS[locale]}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
