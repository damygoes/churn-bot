import {
  type Integration,
  type TemplateIntegration,
  type WorkspaceTemplate,
} from '@/db/schema'

export type WorkspaceTemplateWithIntegrations = WorkspaceTemplate & {
  templateIntegrations: (TemplateIntegration & {
    integration: Integration
  })[]
}
