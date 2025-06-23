import { db } from '@/db/drizzle'
import { users, workspaces } from '@/db/schema'
import { auth } from '@clerk/nextjs/server'
import { eq } from 'drizzle-orm'

export async function POST(req: Request) {
  const { userId } = await auth()
  if (!userId) return new Response('Unauthorized', { status: 401 })

  const { selectedTemplates } = await req.json()

  if (!Array.isArray(selectedTemplates) || selectedTemplates.length === 0) {
    return new Response('No templates selected', { status: 400 })
  }

  const dbUser = await db.query.users.findFirst({
    where: eq(users.clerkUserId, userId),
  })
  if (!dbUser) return new Response('User not found', { status: 404 })

  // Create one workspace per template
  for (const templateId of selectedTemplates) {
    await db.insert(workspaces).values({
      name: `Workspace for ${templateId}`,
      templateId,
      createdByUserId: dbUser.id,
    })
  }

  // Mark user as onboarded
  await db.update(users).set({ onboarded: true }).where(eq(users.id, dbUser.id))

  return Response.json({ success: true })
}
