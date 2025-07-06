import { relations } from 'drizzle-orm'
import {
  boolean,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  clerkUserId: text('clerk_user_id').notNull().unique(),
  email: text('email').notNull(),
  firstName: text('first_name'),
  lastName: text('last_name'),
  avatarUrl: text('avatar_url'),
  onboarded: boolean('onboarded').default(false),
  createdAt: timestamp('created_at').defaultNow(),
})

export const workspaceTemplates = pgTable('workspace_templates', {
  id: uuid('id').primaryKey().defaultRandom(),
  slug: text('slug').notNull().unique(), // e.g. "finance", "sales"
  name: text('name').notNull(), // e.g. "Finance"
})

export const workspaces = pgTable('workspaces', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(), // e.g. "Finance Dept"
  templateId: uuid('template_id')
    .references(() => workspaceTemplates.id)
    .notNull(),
  createdByUserId: uuid('created_by_user_id')
    .references(() => users.id)
    .notNull(),
  createdAt: timestamp('created_at').defaultNow(),
})

export const workspaceMemberships = pgTable('workspace_memberships', {
  id: uuid('id').primaryKey().defaultRandom(),
  workspaceId: uuid('workspace_id')
    .references(() => workspaces.id)
    .notNull(),
  userId: uuid('user_id')
    .references(() => users.id)
    .notNull(),
  role: text('role', { enum: ['admin', 'viewer'] })
    .default('viewer')
    .notNull(),
  status: text('status', { enum: ['active', 'invited'] }).default('active'), // useful for pending invites
  createdAt: timestamp('created_at').defaultNow(),
})

export const integrations = pgTable('integrations', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(), // e.g. "Stripe"
  slug: text('slug').notNull().unique(), // e.g. "stripe"
})

export const templateIntegrations = pgTable('template_integrations', {
  id: uuid('id').primaryKey().defaultRandom(),
  templateId: uuid('template_id')
    .references(() => workspaceTemplates.id)
    .notNull(),
  integrationId: uuid('integration_id')
    .references(() => integrations.id)
    .notNull(),
})

export const workspaceIntegrations = pgTable('workspace_integrations', {
  id: uuid('id').primaryKey().defaultRandom(),
  workspaceId: uuid('workspace_id')
    .references(() => workspaces.id)
    .notNull(),
  integrationId: uuid('integration_id')
    .references(() => integrations.id)
    .notNull(),
  config: jsonb('config').notNull(), // tokens, settings, etc.
  createdAt: timestamp('created_at').defaultNow(),
})

// Relations
export const workspacesRelations = relations(workspaces, ({ one, many }) => ({
  template: one(workspaceTemplates, {
    fields: [workspaces.templateId],
    references: [workspaceTemplates.id],
  }),
  workspaceIntegrations: many(workspaceIntegrations),
  memberships: many(workspaceMemberships),
}))

export const workspaceTemplatesRelations = relations(
  workspaceTemplates,
  ({ many }) => ({
    templateIntegrations: many(templateIntegrations),
  })
)

export const templateIntegrationsRelations = relations(
  templateIntegrations,
  ({ one }) => ({
    workspaceTemplate: one(workspaceTemplates, {
      fields: [templateIntegrations.templateId],
      references: [workspaceTemplates.id],
    }),
    integration: one(integrations, {
      fields: [templateIntegrations.integrationId],
      references: [integrations.id],
    }),
  })
)

export const workspaceIntegrationsRelations = relations(
  workspaceIntegrations,
  ({ one }) => ({
    workspace: one(workspaces, {
      fields: [workspaceIntegrations.workspaceId],
      references: [workspaces.id],
    }),
    integration: one(integrations, {
      fields: [workspaceIntegrations.integrationId],
      references: [integrations.id],
    }),
  })
)

export const workspaceMembershipsRelations = relations(
  workspaceMemberships,
  ({ one }) => ({
    workspace: one(workspaces, {
      fields: [workspaceMemberships.workspaceId],
      references: [workspaces.id],
    }),
    user: one(users, {
      fields: [workspaceMemberships.userId],
      references: [users.id],
    }),
  })
)

// Export types
export type WorkspaceTemplate = typeof workspaceTemplates.$inferSelect
export type TemplateIntegration = typeof templateIntegrations.$inferSelect
export type Integration = typeof integrations.$inferSelect
export type Workspace = typeof workspaces.$inferSelect
export type WorkspaceMembership = typeof workspaceMemberships.$inferSelect
