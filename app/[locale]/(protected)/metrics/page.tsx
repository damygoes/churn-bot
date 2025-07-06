import { Loader } from '@/components/loader/Loader'
import MetricsPageClient from '@/features/metrics/components/MetricsPageClient'
import { getCurrentUserWorkspaces } from '@/features/workspace/actions'
import { Suspense } from 'react'

export default async function MetricsPage() {
  const workspaces = await getCurrentUserWorkspaces()

  return (
    <Suspense fallback={<Loader fullPage />}>
      <MetricsPageClient defaultWorkspaces={workspaces} />
    </Suspense>
  )
}
