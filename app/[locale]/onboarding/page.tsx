import { LanguageSwitcher } from '@/components/language-switcher/LanguageSwitcher'
import AppContainer from '@/components/layout/AppContainer'
import { Loader } from '@/components/loader/Loader'
import OnboardingShell from '@/features/onboarding/components/OnboardingShell'
import { getTemplatesWithIntegrations } from '@/features/workspace/actions'
import { Suspense } from 'react'

export default async function OnboardingPage() {
  const templates = await getTemplatesWithIntegrations()

  return (
    <Suspense fallback={<Loader fullPage />}>
      <AppContainer>
        <div className="w-full flex justify-end items-center">
          <LanguageSwitcher />
        </div>
        <OnboardingShell templates={templates} />
      </AppContainer>
    </Suspense>
  )
}
