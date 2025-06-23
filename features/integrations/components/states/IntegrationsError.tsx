import { Button } from '@/components/ui/button/Button'
import { Icon } from '@/components/ui/icon/Icon'

export function WorkspaceIntegrationsError({
  onRetry,
}: {
  onRetry?: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-12 text-center text-destructive">
      <Icon name="alert" />
      <h2 className="text-xl font-semibold">Something went wrong</h2>
      <p className="text-muted-foreground max-w-md">
        We couldn’t load your workspace integrations. This could be due to a
        network issue or a temporary server error.
      </p>
      {onRetry && (
        <Button variant="secondary" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  )
}
