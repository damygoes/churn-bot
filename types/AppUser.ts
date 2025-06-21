export type AppUser =
  | {
      firstName: string | null
      email: string
      lastName: string | null
      avatarUrl: string | null
      id: string
      clerkUserId: string
      createdAt: Date | null
    }
  | null
  | undefined
