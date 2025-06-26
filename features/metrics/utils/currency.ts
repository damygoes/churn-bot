export function getCurrencySymbol(currency: string): string {
  const map: Record<string, string> = {
    usd: '$',
    eur: '€',
    gbp: '£',
  }
  return map[currency.toLowerCase()] ?? ''
}
