import AppContainer from '@/components/layout/AppContainer'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card/Card'
import { getStripeMetricsForWorkspace } from '@/features/integrations/stripe/actions'
import { notFound } from 'next/navigation'

interface Props {
  params: {
    workspaceId: string
    locale: string
  }
}

export default async function WorkspaceMetricsPage({ params }: Props) {
  const { workspaceId } = params

  const metrics = await getStripeMetricsForWorkspace(workspaceId)

  if (!metrics) {
    notFound()
  }

  return (
    <AppContainer className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Stripe Metrics</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <MetricCard title="MRR" value={`$${metrics.mrr.toFixed(2)}`} />
        <MetricCard title="ARR" value={`$${metrics.arr.toFixed(2)}`} />
        <MetricCard
          title="Active Subscriptions"
          value={metrics.activeSubscriptions.toString()}
        />
        <MetricCard
          title="Churned Subscriptions"
          value={metrics.churnedSubscriptions.toString()}
        />
      </div>
    </AppContainer>
  )
}

interface MetricCardProps {
  title: string
  value: string
}

function MetricCard({ title, value }: MetricCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <span className="text-2xl font-semibold">{value}</span>
      </CardContent>
    </Card>
  )
}
