import { getTemplatesWithIntegrations } from '@/actions/workspace.actions'
import { LanguageSwitcher } from '@/components/language-switcher/LanguageSwitcher'
import AppContainer from '@/components/layout/AppContainer'
import OnboardingShell from '@/features/onboarding/components/OnboardingShell'
import { Suspense } from 'react'

export default async function OnboardingPage() {
  const templates = await getTemplatesWithIntegrations()

  return (
    <Suspense fallback={<div className="p-6">Loading onboarding...</div>}>
      <AppContainer>
        <div className="w-full flex justify-end items-center">
          <LanguageSwitcher />
        </div>
        <OnboardingShell templates={templates} />
      </AppContainer>
    </Suspense>
  )
}
