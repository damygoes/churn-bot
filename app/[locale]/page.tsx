import { db } from '@/db/drizzle'
import { users } from '@/db/schema'
import LandingPage from '@/features/marketing/LandingPage'
import { auth } from '@clerk/nextjs/server'
import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'

export default async function LocaleHomePage({
  params,
}: {
  params: { locale: string }
}) {
  const { userId } = await auth()

  if (userId) {
    const user = await db.query.users.findFirst({
      where: eq(users.clerkUserId, userId),
    })

    if (user?.onboarded) {
      redirect(`/${params.locale}/dashboard`)
    } else {
      redirect(`/${params.locale}/onboarding`)
    }
  }

  return <LandingPage />
}
