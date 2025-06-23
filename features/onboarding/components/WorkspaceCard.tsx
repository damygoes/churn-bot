import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card/Card'
import { Icon } from '@/components/ui/icon/Icon'
import { cn } from '@/lib/utils'
import { WorkspaceTemplateWithIntegrations } from '@/types/WorkspaceTemplateWithIntegrations'
import { useTranslations } from 'next-intl'

export default function WorkspaceCard({
  template,
  selected,
  toggle,
  disabled = false,
}: {
  template: WorkspaceTemplateWithIntegrations
  selected: boolean
  toggle: (id: string) => void
  disabled?: boolean
}) {
  const tWorkspaces = useTranslations('Workspaces')
  const tCommon = useTranslations('Common')

  return (
    <Card
      onClick={() => toggle(template.id)}
      className={cn(
        'cursor-pointer transition hover:shadow',
        selected ? 'border-primary bg-primary/5' : 'border-muted',
        disabled && 'cursor-not-allowed opacity-50'
      )}
    >
      <CardHeader>
        <CardTitle>{tWorkspaces(template.name)}</CardTitle>
        {selected && (
          <CardAction>
            <Icon name="check-circle" className="text-primary" size="3xl" />
          </CardAction>
        )}
        <CardDescription>
          {tCommon('includes')}:{' '}
          {template.templateIntegrations
            .map((ti) => ti.integration.name)
            .join(', ')}
        </CardDescription>
      </CardHeader>
    </Card>
  )
}
