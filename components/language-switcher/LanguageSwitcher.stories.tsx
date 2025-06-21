import { type Locale } from '@/lib/i18n/config'
import type { Meta, StoryObj } from '@storybook/nextjs'
import { NextIntlClientProvider } from 'next-intl' // <- use this instead
import { useState } from 'react'
import { LanguageSwitcher } from './LanguageSwitcher'

const meta: Meta<typeof LanguageSwitcher> = {
  title: 'Navigation/LanguageSwitcher',
  component: LanguageSwitcher,
  parameters: {
    layout: 'centered',
  },
}
export default meta

type Story = StoryObj<typeof LanguageSwitcher>

export const Default: Story = {
  render: (args) => (
    <NextIntlClientProvider
      locale="en"
      messages={{
        'LanguageSwitcher.label': 'English',
      }}
    >
      <div className="p-4">
        <LanguageSwitcher __storybookLocaleOverride="en" {...args} />
      </div>
    </NextIntlClientProvider>
  ),
}

export const Interactive: Story = {
  render: (args) => {
    const [locale, setLocale] = useState<Locale>('en')

    // Dummy messages
    const messages = {
      en: { 'LanguageSwitcher.label': 'English' },
      de: { 'LanguageSwitcher.label': 'Deutsch' },
    }

    return (
      <NextIntlClientProvider locale={locale} messages={messages[locale]}>
        <div className="p-4">
          <LanguageSwitcher
            __storybookLocaleOverride={locale}
            onLocaleChange={(newLocale: Locale) => setLocale(newLocale)}
            {...args}
          />
          <p className="mt-4">
            Current locale is: <strong>{locale}</strong>
          </p>
        </div>
      </NextIntlClientProvider>
    )
  },
}
