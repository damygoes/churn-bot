export const SUPPORTED_LOCALES = ['en', 'de'] as const
export const DEFAULT_LOCALE = 'en'

export type Locale = (typeof SUPPORTED_LOCALES)[number]

export const LOCALE_LABELS: Record<Locale, string> = {
  en: 'English',
  de: 'Deutsch',
}
