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

export default function WorkspaceCard({
  template,
  selected,
  toggle,
}: {
  template: WorkspaceTemplateWithIntegrations
  selected: boolean
  toggle: (id: string) => void
}) {
  return (
    <Card
      onClick={() => toggle(template.id)}
      className={cn(
        'cursor-pointer transition hover:shadow',
        selected ? 'border-primary bg-primary/5' : 'border-muted'
      )}
    >
      <CardHeader>
        <CardTitle>{template.name}</CardTitle>
        {selected && (
          <CardAction>
            <Icon name="check-circle" className="text-primary" size="3xl" />
          </CardAction>
        )}
        <CardDescription>
          Includes:{' '}
          {template.templateIntegrations
            .map((ti) => ti.integration.name)
            .join(', ')}
        </CardDescription>
      </CardHeader>
    </Card>
  )
}
