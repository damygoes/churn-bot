'use server'

import { db } from '@/db/drizzle'
import { users } from '@/db/schema'
import { auth } from '@clerk/nextjs/server'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

export async function upsertUser({
  clerkUserId,
  email,
  firstName,
  lastName,
}: {
  clerkUserId: string
  email: string
  firstName?: string
  lastName?: string
}) {
  const existingUser = await db.query.users.findFirst({
    where: eq(users.clerkUserId, clerkUserId),
  })

  if (existingUser) {
    await db
      .update(users)
      .set({ email, firstName, lastName })
      .where(eq(users.clerkUserId, clerkUserId))
  } else {
    await db.insert(users).values({ clerkUserId, email, firstName, lastName })
  }

  // Optional: if any route relies on this user data
  // revalidatePath('/dashboard')
}

export async function getCurrentUser() {
  const { userId } = await auth()
  if (!userId) return null

  return db.query.users.findFirst({
    where: eq(users.clerkUserId, userId),
  })
}

export async function getUserByClerkId(clerkUserId: string) {
  return db.query.users.findFirst({
    where: eq(users.clerkUserId, clerkUserId),
  })
}

export async function updateUser({
  firstName,
  lastName,
  avatarUrl,
}: {
  firstName?: string
  lastName?: string
  avatarUrl?: string
}) {
  const { userId } = await auth()
  if (!userId) return

  await db
    .update(users)
    .set({ firstName, lastName, avatarUrl })
    .where(eq(users.clerkUserId, userId))
}

export async function updateUserProfile({
  clerkUserId,
  firstName,
  lastName,
  avatarUrl,
}: {
  clerkUserId: string
  firstName?: string
  lastName?: string
  avatarUrl?: string
}) {
  await db
    .update(users)
    .set({ firstName, lastName, avatarUrl })
    .where(eq(users.clerkUserId, clerkUserId))

  revalidatePath('/dashboard')
}
