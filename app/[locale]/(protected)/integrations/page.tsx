import AppContainer from '@/components/layout/AppContainer'
import { Loader } from '@/components/loader/Loader'
import { IntegrationsList } from '@/features/integrations/components/IntergrationsList'
import { EmptyWorkspaceIntegrations } from '@/features/integrations/components/states/EmptyIntegrations'
import { getWorkspacesWithIntegrationsForUser } from '@/features/workspace/actions'
import { Suspense } from 'react'

export default async function IntegrationsPage() {
  const workspaces = await getWorkspacesWithIntegrationsForUser()

  if (workspaces.length === 0) {
    return <EmptyWorkspaceIntegrations />
  }

  return (
    <Suspense fallback={<Loader fullPage />}>
      <AppContainer className="space-y-8 p-6">
        <IntegrationsList workspaces={workspaces} />
      </AppContainer>
    </Suspense>
  )
}
