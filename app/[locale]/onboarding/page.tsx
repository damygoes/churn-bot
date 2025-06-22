import { getTemplatesWithIntegrations } from '@/actions/workspace.actions'
import { LanguageSwitcher } from '@/components/language-switcher/LanguageSwitcher'
import AppContainer from '@/components/layout/AppContainer'
import OnboardingShell from '@/features/onboarding/components/OnboardingShell'
import { Suspense } from 'react'
// import { useTranslations } from 'next-intl'

export default async function OnboardingPage() {
  //   const t = useTranslations('Dashboard')
  const templates = await getTemplatesWithIntegrations()
  console.log('Templates:', templates)

  return (
    <Suspense fallback={<div className="p-6">Loading onboarding...</div>}>
      <AppContainer>
        <LanguageSwitcher />
        <OnboardingShell templates={templates} />
      </AppContainer>
    </Suspense>
  )
}
