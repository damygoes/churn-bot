'use client'

import { usePathname } from 'next/navigation'

export function useActivePage(): string | null {
  const pathname = usePathname()

  if (!pathname) return null

  // Split path, skip empty and locale segment
  const segments = pathname.split('/').filter(Boolean) // ["en", "dashboard"]

  // Return second segment (index 1) if exists
  return segments[1] || null
}
