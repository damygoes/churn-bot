'use client'

import {
  DEFAULT_LOCALE,
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
import { replaceLocaleInPath } from './utils'

type Props = {
  __storybookLocaleOverride?: Locale
  onLocaleChange?: (locale: Locale) => void
}

export function LanguageSwitcher({
  __storybookLocaleOverride,
  onLocaleChange,
}: Props) {
  const localeFromHook = useLocale()
  const validatedLocale = SUPPORTED_LOCALES.includes(localeFromHook as Locale)
    ? (localeFromHook as Locale)
    : DEFAULT_LOCALE

  const currentLocale = __storybookLocaleOverride ?? validatedLocale

  const pathname = usePathname()
  const router = useRouter()

  const handleLocaleChange = (locale: Locale) => {
    if (onLocaleChange) {
      // Storybook interactive mode: only update state, skip router.push
      onLocaleChange(locale)
      return
    }
    // Real app mode: update URL
    const newPath = replaceLocaleInPath(pathname, locale)
    router.push(newPath)
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
