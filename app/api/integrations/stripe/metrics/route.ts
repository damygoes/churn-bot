import { db } from '@/db/drizzle'
import { workspaceIntegrations } from '@/db/schema'
import { StripeWorkspaceIntegrationConfig } from '@/types/StripeWorkspaceIntegrationConfig'
import { eq } from 'drizzle-orm'
import { NextRequest } from 'next/server'
import Stripe from 'stripe'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const workspaceId = searchParams.get('workspaceId')

  if (!workspaceId) {
    return new Response('Missing workspaceId', { status: 400 })
  }

  const integration = await db.query.workspaceIntegrations.findFirst({
    where: eq(workspaceIntegrations.workspaceId, workspaceId),
  })

  if (!integration || !integration.config) {
    return new Response('Stripe integration not found', { status: 404 })
  }

  const config = integration.config as StripeWorkspaceIntegrationConfig

  const stripe = new Stripe(config.accessToken, {
    apiVersion: '2025-05-28.basil',
  })

  try {
    const now = Math.floor(Date.now() / 1000)
    const last30Days = now - 30 * 24 * 60 * 60

    // 1. Get active subscriptions
    const activeSubs = await stripe.subscriptions.list({
      status: 'active',
      limit: 100,
    })

    // 2. Pick currency from first active subscription
    const firstPrice = activeSubs.data[0]?.items.data[0]?.price
    const currency = firstPrice?.currency ?? 'usd' // Fallback to 'usd' if none found

    // 3. Calculate MRR (current monthly recurring revenue right now, based on all active subscriptions)
    const mrr = activeSubs.data.reduce((total, sub) => {
      const item = sub.items.data[0]
      const price = item?.price.unit_amount ?? 0
      const interval = item?.price.recurring?.interval
      const multiplier = interval === 'year' ? 1 / 12 : 1
      return total + price * multiplier
    }, 0)

    // 4. Calculate ARR (current projected annual revenue, not tied to a time range)
    const arr = mrr * 12

    // 5. New subscriptions in last 30 days
    const newSubs = activeSubs.data.filter((s) => s.created >= last30Days)

    // 6. Canceled subscriptions in last 30 days
    const canceledSubs = await stripe.subscriptions.list({
      status: 'canceled',
      limit: 100,
    })
    const churned = canceledSubs.data.filter(
      (s) => s.canceled_at && s.canceled_at >= last30Days
    )

    // 7. Approximate churn rate (calculated based on active + churned over last 30 days)
    const churnRate =
      activeSubs.data.length + churned.length > 0
        ? (churned.length / (activeSubs.data.length + churned.length)) * 100
        : 0

    return Response.json({
      mrr: mrr / 100,
      arr: arr / 100,
      newSubscriptions: newSubs.length,
      churnedCustomers: churned.length,
      churnRate: Number(churnRate.toFixed(2)),
      currency,
    })
  } catch (err) {
    console.error('Stripe metrics error:', err)
    return new Response('Internal server error', { status: 500 })
  }
}
