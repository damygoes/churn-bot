import { db } from '@/db/drizzle'
import { integrations, workspaceIntegrations } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const code = searchParams.get('code')
  const stateRaw = searchParams.get('state')

  if (!code || !stateRaw) {
    return new Response('Missing code or state', { status: 400 })
  }

  let workspaceId: string | undefined
  let locale = 'en'

  try {
    const state = JSON.parse(stateRaw)
    workspaceId = state.workspaceId
    locale = state.locale || 'en'
  } catch (err) {
    console.error('Invalid state parameter:', err)
    return new Response('Invalid state parameter', { status: 400 })
  }

  if (!workspaceId) {
    return new Response('Missing workspaceId in state', { status: 400 })
  }

  try {
    // Exchange code for access token
    const stripeRes = await fetch('https://connect.stripe.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_secret: process.env.STRIPE_SECRET_KEY!,
        code,
        grant_type: 'authorization_code',
      }),
    })

    const stripeData = await stripeRes.json()

    if (!stripeRes.ok) {
      console.error('Stripe token exchange failed:', stripeData)
      return new Response('Stripe auth failed', { status: 500 })
    }

    // 🔍 Get the integrationId from pre-seeded DB using slug 'stripe'
    const stripeIntegration = await db.query.integrations.findFirst({
      where: eq(integrations.slug, 'stripe'),
    })

    if (!stripeIntegration) {
      console.error('Stripe integration not found in DB')
      return new Response('Integration not found', { status: 404 })
    }

    // Save to DB
    await db.insert(workspaceIntegrations).values({
      workspaceId,
      integrationId: stripeIntegration.id,
      config: {
        accessToken: stripeData.access_token,
        refreshToken: stripeData.refresh_token,
        stripeUserId: stripeData.stripe_user_id,
        scope: stripeData.scope,
      },
    })

    // ✅ Redirect to integrations dashboard
    return Response.redirect(
      `${req.nextUrl.origin}/${locale}/integrations`,
      302
    )
  } catch (err) {
    console.error('Stripe callback error:', err)
    return new Response('Internal error', { status: 500 })
  }
}
