import { formatDistanceToNowStrict, isToday, isTomorrow } from 'date-fns'

export function formatSelectedDate(date: Date | undefined) {
  if (!date) return ''
  return date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

export function formatDateToNaturalLanguage(date: Date): string {
  if (isToday(date)) return 'today'
  if (isTomorrow(date)) return 'tomorrow'

  return `in ${formatDistanceToNowStrict(date, { addSuffix: false })}`
}
