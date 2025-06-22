import { db } from '@/db/drizzle'
import { users } from '@/db/schema'
import { auth, clerkClient } from '@clerk/nextjs/server'
import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'

export async function GET(
  request: Request,
  { params }: { params: { locale: string } }
) {
  const { locale } = params
  const { userId } = await auth()

  if (!userId) return redirect(`/${locale}`) // redirect to landing with locale

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

  if (user?.onboarded) {
    redirect(`/${locale}/dashboard`)
  } else {
    redirect(`/${locale}/onboarding`)
  }
}
