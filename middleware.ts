import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import createIntlMiddleware from 'next-intl/middleware'
import { NextRequest } from 'next/server'
import { routing } from './lib/i18n/routing'

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)', '/settings(.*)'])
const intlMiddleware = createIntlMiddleware(routing)

export default clerkMiddleware((auth, req: NextRequest) => {
  // First, run i18n middleware to handle locale routing
  const response = intlMiddleware(req)

  // Then, check if the route requires authentication
  if (isProtectedRoute(req)) {
    return auth.protect().then(() => response)
  }

  return response
})

export const config = {
  matcher: [
    // Public-facing pages with i18n, except static/internal files
    '/((?!api|trpc|_next|_vercel|.*\\..*).*)',

    // Always include API and tRPC routes for Clerk auth
    '/(api|trpc)(.*)',
  ],
}
