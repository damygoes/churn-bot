'use client'

import { getUserByClerkId, upsertUser } from '@/actions/users.actions'
import { useUser } from '@clerk/nextjs'
import { useEffect } from 'react'

export function SyncClerkUser() {
  const { user, isLoaded } = useUser()

  useEffect(() => {
    if (!isLoaded || !user) return

    async function syncUser(currentUser: NonNullable<typeof user>) {
      const clerkUserId = currentUser.id
      const email = currentUser.primaryEmailAddress?.emailAddress ?? ''
      const firstName = currentUser.firstName ?? ''
      const lastName = currentUser.lastName ?? ''

      if (!clerkUserId || !email) {
        return
      }

      const existingUser = await getUserByClerkId(clerkUserId)

      if (
        !existingUser ||
        existingUser.email !== email ||
        existingUser.firstName !== firstName ||
        existingUser.lastName !== lastName
      ) {
        await upsertUser({
          clerkUserId,
          email,
          firstName,
          lastName,
        })
      }
    }

    syncUser(user)
  }, [user, isLoaded])

  return null
}
