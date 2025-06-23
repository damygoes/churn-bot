import { db } from '@/db/drizzle'
import { users } from '@/db/schema'
import { auth, clerkClient } from '@clerk/nextjs/server'
import { eq } from 'drizzle-orm'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { locale: string } }
) {
  const { locale } = params
  const { userId } = await auth()

  if (!userId) {
    return NextResponse.redirect(new URL(`/${locale}`, request.url))
  }

  let user = await db.query.users.findFirst({
    where: eq(users.clerkUserId, userId),
  })

  if (!user) {
    const clerkUser = await (await clerkClient()).users.getUser(userId)
    const email = clerkUser.primaryEmailAddress?.emailAddress ?? ''
    const firstName = clerkUser.firstName ?? ''
    const lastName = clerkUser.lastName ?? ''

    await db.insert(users).values({
      clerkUserId: userId,
      email,
      firstName,
      lastName,
    })

    user = await db.query.users.findFirst({
      where: eq(users.clerkUserId, userId),
    })
  }

  const targetPath = user?.onboarded
    ? `/${locale}/dashboard`
    : `/${locale}/onboarding`

  return NextResponse.redirect(new URL(targetPath, request.url))
}
