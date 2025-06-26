'use server'

import { StripeMetrics } from './types'

export async function getStripeMetricsForWorkspace(
  workspaceId: string
): Promise<StripeMetrics | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/integrations/stripe/metrics?workspaceId=${workspaceId}`,
    {
      cache: 'no-store',
    }
  )

  if (!res.ok) {
    console.error('Failed to load Stripe metrics:', res.statusText)
    return null
  }

  return res.json() as Promise<{
    mrr: number
    arr: number
    activeSubscriptions: number
    churnedSubscriptions: number
  }>
}
