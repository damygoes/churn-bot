'use client'

import { Button } from '@/components/ui/button/Button'
import { getTemplatesWithIntegrations } from '@/features/workspace/actions'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { createWorkspacesFromTemplates } from '../lib/createWorkspaces'
import OnboardingSuccessAlert from './OnboardingSuccessAlert'
import WorkspaceCard from './WorkspaceCard'

export default function OnboardingShell({
  templates,
}: {
  templates: Awaited<ReturnType<typeof getTemplatesWithIntegrations>>
}) {
  const t = useTranslations('Onboarding')
  const [selectedTemplates, setSelectedTemplates] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)

  const toggleTemplate = (id: string) => {
    setSelectedTemplates((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    )
  }

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true)
      setError(null)
      await createWorkspacesFromTemplates(selectedTemplates)
      setShowSuccessAlert(true)
    } catch (err) {
      setError(t('errorCreatingWorkspaces'))
      console.error('Error creating workspaces:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">{t('selectTemplates')}</h1>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        {templates.map((template) => (
          <WorkspaceCard
            key={template.id}
            template={template}
            selected={selectedTemplates.includes(template.id)}
            toggle={toggleTemplate}
            disabled={isSubmitting || showSuccessAlert}
          />
        ))}
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <Button
        disabled={
          isSubmitting || selectedTemplates.length === 0 || showSuccessAlert
        }
        onClick={handleSubmit}
        isLoading={isSubmitting}
      >
        {isSubmitting ? t('creatingWorkspaces') : t('continue')}
      </Button>
      {showSuccessAlert ? (
        <div className="w-full my-8">
          <OnboardingSuccessAlert />
        </div>
      ) : null}
    </div>
  )
}
