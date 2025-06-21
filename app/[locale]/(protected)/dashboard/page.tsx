import AppContainer from '@/components/layout/AppContainer'
import { useTranslations } from 'next-intl'
export default function DashboardPage() {
  const t = useTranslations('Dashboard')

  return (
    <AppContainer>
      <p>{t('title')}</p>
    </AppContainer>
  )
}
