import { WorkspaceIntegrations } from '@/features/workspace/components/WorkspaceIntegrations'
import { WorkspaceWithIntegrations } from '@/types/workspace'
import { WorkspaceIntegrationsError } from './states/IntegrationsError'

export function IntegrationsList({
  workspaces,
}: {
  workspaces?: WorkspaceWithIntegrations[]
}) {
  if (!workspaces) {
    return <WorkspaceIntegrationsError />
  }

  return (
    <>
      {workspaces.map((workspace) => (
        <WorkspaceIntegrations key={workspace.id} workspace={workspace} />
      ))}
    </>
  )
}
