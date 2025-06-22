'use server'

import { db } from '@/db/drizzle'
import {
  templateIntegrations,
  users,
  workspaceMemberships,
  workspaces,
} from '@/db/schema'
import { auth } from '@clerk/nextjs/server'
import { eq } from 'drizzle-orm'

// Get all workspace templates
export async function getAllTemplates() {
  return db.query.workspaceTemplates.findMany()
}

// Get integrations allowed for a specific workspace template
export async function getIntegrationsForTemplate(templateId: string) {
  return db.query.templateIntegrations.findMany({
    where: eq(templateIntegrations.templateId, templateId),
    with: {
      integration: true,
    },
  })
}

// Create a workspace (by an admin user)
export async function createWorkspace({
  name,
  templateId,
}: {
  name: string
  templateId: string
}) {
  const { userId } = await auth()
  if (!userId) throw new Error('Not authenticated')

  const dbUser = await db.query.users.findFirst({
    where: eq(users.clerkUserId, userId),
  })
  if (!dbUser) throw new Error('User not found')

  // Let DB generate ID and return it
  const [workspace] = await db
    .insert(workspaces)
    .values({
      name,
      templateId,
      createdByUserId: dbUser.id,
    })
    .returning()

  if (!workspace) throw new Error('Failed to create workspace')

  // Add creator as admin member
  await db.insert(workspaceMemberships).values({
    workspaceId: workspace.id,
    userId: dbUser.id,
    role: 'admin',
    status: 'active',
  })

  return workspace.id
}

// Invite a user to a workspace (read-only)
export async function inviteUserToWorkspace({
  workspaceId,
  userId,
}: {
  workspaceId: string
  userId: string
}) {
  await db.insert(workspaceMemberships).values({
    workspaceId,
    userId,
    role: 'viewer',
    status: 'invited',
  })
}

// Get all workspaces the current user belongs to
export async function getUserWorkspaces() {
  const { userId } = await auth()
  if (!userId) return []

  const dbUser = await db.query.users.findFirst({
    where: eq(users.clerkUserId, userId),
  })

  if (!dbUser) return []

  const memberships = await db.query.workspaceMemberships.findMany({
    where: eq(workspaceMemberships.userId, dbUser.id),
    with: {
      workspace: true,
    },
  })

  return memberships.map((m) => m.workspace)
}

// Fetch workspace + integrations (joined)
export async function getWorkspaceWithIntegrations(workspaceId: string) {
  return db.query.workspaces.findFirst({
    where: eq(workspaces.id, workspaceId),
    with: {
      template: {
        with: {
          templateIntegrations: {
            with: {
              integration: true,
            },
          },
        },
      },
    },
  })
}

// Get all templates with their integrations (for onboarding)
export async function getTemplatesWithIntegrations() {
  return db.query.workspaceTemplates.findMany({
    with: {
      templateIntegrations: {
        with: {
          integration: true,
        },
      },
    },
  })
}
