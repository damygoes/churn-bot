'use client'

import { Badge } from '@/components/ui/badge/Badge'
import { Button } from '@/components/ui/button/Button'
import { Card, CardDescription, CardFooter } from '@/components/ui/card/Card'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'

interface Integration {
  id: string
  name: string
}

interface IntegrationCardProps {
  workspaceId: string
  integration: Integration
  isConnected: boolean
  onConnect: (workspaceId: string, integrationId: string) => void
  className?: string
}

export function IntegrationCard({
  workspaceId,
  integration,
  isConnected,
  onConnect,
  className,
}: IntegrationCardProps) {
  const t = useTranslations('IntegrationCard')
  return (
    <Card
      className={cn('flex flex-col gap-2 p-4 border rounded-lg', className)}
    >
      <span className="font-semibold">{integration.name}</span>

      <CardDescription>
        <Badge variant="outline" className="flex items-center gap-2">
          <span
            className={cn('size-2 rounded-full', {
              'bg-success': isConnected,
              'bg-border': !isConnected,
            })}
            aria-hidden="true"
          />
          {isConnected ? t('connected') : t('notConnected')}
        </Badge>
      </CardDescription>

      <CardFooter className="px-0 mt-4">
        <Button
          variant={isConnected ? 'default' : 'secondary'}
          onClick={() => onConnect(workspaceId, integration.id)}
          aria-pressed={isConnected}
        >
          {isConnected ? t('configure') : t('connect')}
        </Button>
      </CardFooter>
    </Card>
  )
}
