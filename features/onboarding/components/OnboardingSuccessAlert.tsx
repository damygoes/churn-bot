'use client'

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert/Alert'
import { Button } from '@/components/ui/button/Button'
import { useLocale, useTranslations } from 'next-intl'
import Link from 'next/link'

export default function OnboardingSuccessAlert() {
  const locale = useLocale()
  const t = useTranslations('Onboarding')

  return (
    <Alert className="bg-success/80 text-white space-y-2">
      <AlertTitle>{t('SuccessAlert.title')}</AlertTitle>
      <AlertDescription className="text-white">
        {t('SuccessAlert.description')}
        <div className="mt-4">
          <Link href={`/${locale}/integrations`}>
            <Button icon="arrow-right" iconPosition="after">
              {t('SuccessAlert.buttonText')}
            </Button>
          </Link>
        </div>
      </AlertDescription>
    </Alert>
  )
}
