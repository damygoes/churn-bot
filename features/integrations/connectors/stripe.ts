export function connectStripe(workspaceId: string, locale: string) {
  const redirectUri = `${window.location.origin}/api/integrations/stripe/callback`

  const stateObj = {
    workspaceId,
    locale,
  }

  const connectUrl =
    `https://connect.stripe.com/oauth/authorize` +
    `?response_type=code` +
    `&client_id=${process.env.NEXT_PUBLIC_STRIPE_CLIENT_ID}` +
    `&scope=read_write` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&state=${encodeURIComponent(JSON.stringify(stateObj))}`

  window.location.href = connectUrl
}
