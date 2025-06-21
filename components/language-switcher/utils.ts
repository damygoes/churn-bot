import { type Locale, SUPPORTED_LOCALES } from '@/lib/i18n/config'

export function isSupportedLocale(locale: string): locale is Locale {
  return SUPPORTED_LOCALES.includes(locale as Locale)
}

export function replaceLocaleInPath(
  pathname: string,
  newLocale: Locale
): string {
  const segments = pathname.split('/')
  if (segments.length > 1 && isSupportedLocale(newLocale)) {
    segments[1] = newLocale
  }
  return segments.join('/')
}
