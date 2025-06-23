'use client'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card/Card'
import { IntegrationCard } from '@/features/integrations/components/IntegrationCard'
import { useTranslations } from 'next-intl'

interface Integration {
  id: string
  name: string
}

interface WorkspaceWithIntegrations {
  id: string
  displayName: string
  availableIntegrations: Integration[]
  connectedIntegrations: Integration[]
}

interface Props {
  workspace: WorkspaceWithIntegrations
}

export function WorkspaceIntegrations({ workspace }: Props) {
  const tWorkspaces = useTranslations('Workspaces')
  const tWorkspaceIntegrations = useTranslations('WorkspaceIntegrations')

  const prefix = 'Workspace for'
  const suffix = workspace.displayName.slice(prefix.length + 1) // +1 for the space

  function handleConnect(workspaceId: string, integrationId: string) {
    console.log(
      `Connect workspace ${workspaceId} to integration ${integrationId}`
    )
    // TODO: implement real connect logic
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {`${tWorkspaceIntegrations(prefix)} ${tWorkspaces(suffix)}`}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex justify-start items-center flex-wrap gap-12">
        {workspace.availableIntegrations.map((integration) => {
          const isConnected = workspace.connectedIntegrations.some(
            (ci) => ci.id === integration.id
          )

          return (
            <IntegrationCard
              key={integration.id}
              workspaceId={workspace.id}
              integration={integration}
              isConnected={isConnected}
              onConnect={handleConnect}
              className="w-64"
            />
          )
        })}
      </CardContent>
    </Card>
  )
}
