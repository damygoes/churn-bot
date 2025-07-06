'use client'

import { Workspace } from '@/db/schema'
import { getStripeMetricsForWorkspace } from '@/features/integrations/stripe/actions'
import { StripeMetrics } from '@/features/integrations/stripe/types'
import { WorkspaceSelector } from '@/features/workspace/components/WorkspaceSelector'
import { useEffect, useState } from 'react'
import { getCurrencySymbol } from '../utils/currency'
import { ChurnRateGauge } from './charts/ChurnRateGauge'
import { MrrArrBarChart } from './charts/MrrArrBarChart'
import { SubscriptionBarChart } from './charts/SubscriptionBarChart'
import { MetricCard } from './MetricCard'

interface MetricsPageClientProps {
  defaultWorkspaces: Workspace[]
}

export default function MetricsPageClient({
  defaultWorkspaces,
}: MetricsPageClientProps) {
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState<string | null>(
    null
  )
  const [metrics, setMetrics] = useState<StripeMetrics | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (defaultWorkspaces.length > 0 && !selectedWorkspaceId) {
      setSelectedWorkspaceId(defaultWorkspaces[0].id)
    }
  }, [defaultWorkspaces, selectedWorkspaceId])

  useEffect(() => {
    async function loadMetrics() {
      if (selectedWorkspaceId) {
        setIsLoading(true)
        const data = await getStripeMetricsForWorkspace(selectedWorkspaceId)
        setMetrics(data)
        setIsLoading(false)
      }
    }

    loadMetrics()
  }, [selectedWorkspaceId])

  return (
    <div className="p-6 space-y-10">
      <WorkspaceSelector
        defaultWorkspaces={defaultWorkspaces}
        onWorkspaceChange={setSelectedWorkspaceId}
      />
      {isLoading && (
        <div className="text-center flex justify-center items-center">
          Loading metrics...
        </div>
      )}

      {metrics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-12">
          <MetricCard
            title="MRR"
            value={`${getCurrencySymbol(metrics.currency)}${metrics.mrr.toFixed(2)}`}
          />
          <MetricCard
            title="ARR"
            value={`${getCurrencySymbol(metrics.currency)}${metrics.arr.toFixed(2)}`}
          />
          <MetricCard
            title="New Customers"
            value={`${metrics.newSubscriptions}`}
          />
          <MetricCard
            title="Churned Customers"
            value={`${metrics.churnedCustomers}`}
          />

          <MrrArrBarChart
            mrr={metrics.mrr}
            arr={metrics.arr}
            currencySymbol={getCurrencySymbol(metrics.currency)}
            className="col-span-1 md:col-span-2"
          />
          <SubscriptionBarChart
            newSubscriptions={metrics.newSubscriptions}
            churnedCustomers={metrics.churnedCustomers}
            className="col-span-1 md:col-span-2"
          />
          <ChurnRateGauge
            churnRate={metrics.churnRate}
            className="col-span-1 md:col-span-2"
          />
        </div>
      )}
    </div>
  )
}
