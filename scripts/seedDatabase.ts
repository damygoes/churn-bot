import { db } from '@/db/drizzle'
import {
  integrations,
  templateIntegrations,
  workspaceTemplates,
} from '@/db/schema'
import {
  integrations as integrationDefs,
  workspaceTemplates as templateDefs,
  templateIntegrationMapping,
} from '@/features/workspace/config'
import { eq } from 'drizzle-orm'

async function seedWorkspaceTemplates() {
  for (const template of templateDefs) {
    const existing = await db
      .select()
      .from(workspaceTemplates)
      .where(eq(workspaceTemplates.slug, template.slug))

    if (existing.length === 0) {
      await db.insert(workspaceTemplates).values({
        slug: template.slug,
        name: template.name,
      })
    }
  }
}

async function seedIntegrations() {
  for (const integration of integrationDefs) {
    const existing = await db
      .select()
      .from(integrations)
      .where(eq(integrations.slug, integration.slug))

    if (existing.length === 0) {
      await db.insert(integrations).values({
        slug: integration.slug,
        name: integration.name,
      })
    }
  }
}

async function seedTemplateIntegrations() {
  for (const [templateSlug, integrationSlugs] of Object.entries(
    templateIntegrationMapping
  )) {
    const [template] = await db
      .select()
      .from(workspaceTemplates)
      .where(eq(workspaceTemplates.slug, templateSlug))

    if (!template) continue

    for (const integrationSlug of integrationSlugs) {
      const [integration] = await db
        .select()
        .from(integrations)
        .where(eq(integrations.slug, integrationSlug))

      if (!integration) continue

      const existing = await db
        .select()
        .from(templateIntegrations)
        .where(eq(templateIntegrations.templateId, template.id))

      const alreadyLinked = existing.some(
        (ti) => ti.integrationId === integration.id
      )

      if (!alreadyLinked) {
        await db.insert(templateIntegrations).values({
          templateId: template.id,
          integrationId: integration.id,
        })
      }
    }
  }
}

async function main() {
  await seedWorkspaceTemplates()
  await seedIntegrations()
  await seedTemplateIntegrations()
  console.log('✅ Database seeded successfully')
}

main().catch((err) => {
  console.error('❌ Seeding failed:', err)
  process.exit(1)
})
