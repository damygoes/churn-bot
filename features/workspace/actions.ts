'use server'

import { db } from '@/db/drizzle'
import {
  templateIntegrations,
  users,
  workspaceMemberships,
  workspaces,
} from '@/db/schema'
import {
  WorkspaceWithIntegrations,
  WorkspaceWithTemplate,
} from '@/types/workspace'
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
export async function getCurrentUserWorkspaces(): Promise<
  WorkspaceWithTemplate[]
> {
  const { userId } = await auth()
  if (!userId) return []

  const dbUser = await db.query.users.findFirst({
    where: eq(users.clerkUserId, userId),
  })

  if (!dbUser) return []

  const memberships = await db.query.workspaceMemberships.findMany({
    where: eq(workspaceMemberships.userId, dbUser.id),
    with: {
      workspace: {
        with: {
          template: true,
        },
      },
    },
  })

  return memberships.map((m) => m.workspace)
}

export async function getUserWorkspacesByUserId(userId: string) {
  const memberships = await db
    .select({
      id: workspaces.id,
      name: workspaces.name,
    })
    .from(workspaceMemberships)
    .innerJoin(workspaces, eq(workspaceMemberships.workspaceId, workspaces.id))
    .where(eq(workspaceMemberships.userId, userId))

  return memberships
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

// Get all workspaces created by the current user
export async function getWorkspacesCreatedByCurrentUser() {
  const { userId } = await auth()
  if (!userId) return []

  const dbUser = await db.query.users.findFirst({
    where: eq(users.clerkUserId, userId),
  })
  if (!dbUser) return []

  const workspacesCreated = await db.query.workspaces.findMany({
    where: eq(workspaces.createdByUserId, dbUser.id),
    with: {
      template: true, // Include the related template
    },
  })

  return workspacesCreated.map((ws) => ({
    ...ws,
    displayName: `Workspace for ${ws.template.name}`,
  }))
}

// Get all workspaces with their integrations for the current user
export async function getWorkspacesWithIntegrationsForUser(): Promise<
  WorkspaceWithIntegrations[]
> {
  const { userId } = await auth()
  if (!userId) return []

  const dbUser = await db.query.users.findFirst({
    where: eq(users.clerkUserId, userId),
  })
  if (!dbUser) return []

  const workspacesWithIntegrations = await db.query.workspaces.findMany({
    where: eq(workspaces.createdByUserId, dbUser.id),
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
      workspaceIntegrations: {
        with: {
          integration: true,
        },
      },
    },
  })

  return workspacesWithIntegrations.map((ws) => ({
    id: ws.id,
    displayName: `Workspace for ${ws.template.name}`,
    availableIntegrations: ws.template.templateIntegrations.map(
      (ti) => ti.integration
    ),
    connectedIntegrations: ws.workspaceIntegrations.map((wi) => wi.integration),
  }))
}
