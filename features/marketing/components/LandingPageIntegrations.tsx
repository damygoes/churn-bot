'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

const integrations = [
  { name: 'Stripe', logoSrc: '/stripe.svg', alt: 'Stripe Logo' },
  { name: 'Slack', logoSrc: '/slack.svg', alt: 'Slack Logo' },
  { name: 'GitHub', logoSrc: '/github.svg', alt: 'GitHub Logo' },
  { name: 'Jira', logoSrc: '/jira.svg', alt: 'Jira Logo' },
  { name: 'Hubspot', logoSrc: '/hubspot.svg', alt: 'Hubspot Logo' },
]

export default function LandingPageIntegrations() {
  const t = useTranslations('LandingPage.integrations')

  return (
    <section className="w-full py-20 sm:py-32 flex flex-col items-center text-center gap-12 bg-muted/10">
      <motion.h2
        className="text-3xl sm:text-4xl font-bold tracking-tight max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        {t('heading')}
      </motion.h2>

      <motion.p
        className="text-muted-foreground max-w-xl text-lg"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        {t('subheading')}
      </motion.p>

      <div className="grid grid-cols-3 sm:grid-cols-5 gap-8 max-w-5xl w-full items-center justify-center">
        {integrations.map(({ name, logoSrc, alt }, index) => (
          <motion.div
            key={name}
            className="flex items-center justify-center p-4 bg-background rounded-lg border shadow-sm hover:shadow-md transition-shadow"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Image
              src={logoSrc}
              alt={alt}
              className="max-h-10 max-w-full object-contain"
              loading="lazy"
              draggable={false}
              aria-label={name}
              width={300}
              height={300}
            />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
