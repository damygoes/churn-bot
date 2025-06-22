import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import createIntlMiddleware from 'next-intl/middleware'
import { NextRequest } from 'next/server'
import { routing } from './lib/i18n/routing'

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)', '/settings(.*)'])
const intlMiddleware = createIntlMiddleware(routing)

// Exclude API routes from i18n middleware
function shouldRunIntlMiddleware(req: NextRequest) {
  // Exclude everything under /api, including your s3-presigned-url
  return !req.nextUrl.pathname.startsWith('/api')
}

export default clerkMiddleware(async (auth, req: NextRequest) => {
  // Run i18n middleware only on non-API requests
  const response = shouldRunIntlMiddleware(req)
    ? await intlMiddleware(req)
    : undefined

  if (isProtectedRoute(req)) {
    await auth.protect()
  }

  // If i18n middleware ran, return its response; otherwise continue
  return response
})

export const config = {
  matcher: [
    // Match all pages except API and internals
    '/((?!api|trpc|_next|_static|favicon.ico|.*\\..*).*)',
    '/(api|trpc)(.*)',
  ],
}
