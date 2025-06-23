export async function createWorkspacesFromTemplates(templateIds: string[]) {
  const res = await fetch('/api/onboarding', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ selectedTemplates: templateIds }),
  })

  if (!res.ok) {
    throw new Error('Failed to complete onboarding.')
  }

  return res.json()
}
