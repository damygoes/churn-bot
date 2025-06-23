'use client'

import LoginButton from '@/features/auth/login/LoginButton'
import { SignedOut } from '@clerk/nextjs'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

export default function CTA() {
  const t = useTranslations('LandingPage.cta')

  return (
    <section className="w-full py-20 sm:py-32 bg-primary/5 flex flex-col items-center text-center gap-8 rounded-lg px-6 sm:px-12 max-w-4xl mx-auto">
      <motion.h2
        className="text-3xl sm:text-4xl font-bold tracking-tight"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {t('heading')}
      </motion.h2>
      <motion.p
        className="text-muted-foreground text-lg max-w-xl"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        {t('subtitle')}
      </motion.p>
      <SignedOut>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <LoginButton buttonTitle={t('getStarted')} />
        </motion.div>
      </SignedOut>
    </section>
  )
}
