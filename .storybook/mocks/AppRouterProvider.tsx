/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { AppRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { ReactNode, useMemo } from 'react'

// Define a minimal router mock compatible with AppRouterContext
const mockRouter = {
  push: (url: string) => console.log('router.push:', url),
  replace: (url: string) => console.log('router.replace:', url),
  refresh: () => {},
  back: () => {},
  forward: () => {},
  prefetch: async () => {},
}

export function AppRouterProvider({ children }: { children: ReactNode }) {
  const router = useMemo(() => mockRouter, [])
  return (
    <AppRouterContext.Provider value={router as any}>
      {children}
    </AppRouterContext.Provider>
  )
}
