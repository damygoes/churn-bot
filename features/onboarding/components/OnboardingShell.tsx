'use client'

import { getTemplatesWithIntegrations } from '@/actions/workspace.actions'
import { Button } from '@/components/ui/button/Button'
import { useState } from 'react'
import WorkspaceCard from './WorkspaceCard'

export default function OnboardingShell({
  templates,
}: {
  templates: Awaited<ReturnType<typeof getTemplatesWithIntegrations>>
}) {
  const [selectedTemplates, setSelectedTemplates] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const toggleTemplate = (id: string) => {
    setSelectedTemplates((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    )
  }

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true)
      setError(null)

      for (const templateId of selectedTemplates) {
        // Create workspace for each selected template
        await fetch('/api/onboarding', {
          method: 'POST',
          body: JSON.stringify({ name: templateId, templateId }),
        })
      }

      window.location.href = '/dashboard' // or redirect to first workspace
    } catch (err) {
      setError('Something went wrong while creating workspaces.')
      console.error('Error creating workspaces:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Choose Your Workspaces</h1>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        {templates.map((template) => (
          <WorkspaceCard
            key={template.id}
            template={template}
            selected={selectedTemplates.includes(template.id)}
            toggle={toggleTemplate}
          />
        ))}
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <Button
        disabled={isSubmitting || selectedTemplates.length === 0}
        onClick={handleSubmit}
      >
        {isSubmitting ? 'Creating...' : 'Continue'}
      </Button>
    </div>
  )
}
