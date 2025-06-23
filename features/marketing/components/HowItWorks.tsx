'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, Plug, RefreshCw, Share2 } from 'lucide-react'
import { useTranslations } from 'next-intl'

const steps = [
  {
    icon: Plug,
    titleKey: 'connect.title',
    descriptionKey: 'connect.description',
  },
  {
    icon: RefreshCw,
    titleKey: 'sync.title',
    descriptionKey: 'sync.description',
  },
  {
    icon: Share2,
    titleKey: 'share.title',
    descriptionKey: 'share.description',
  },
  {
    icon: CheckCircle2,
    titleKey: 'align.title',
    descriptionKey: 'align.description',
  },
]

export default function HowItWorks() {
  const t = useTranslations('LandingPage.howItWorks')

  return (
    <section className="w-full py-20 sm:py-32 flex flex-col items-center text-center gap-12 bg-muted/5">
      <div className="max-w-2xl">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          {t('heading')}
        </motion.h2>
        <motion.p
          className="text-muted-foreground mt-4 text-lg"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {t('subheading')}
        </motion.p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl">
        {steps.map((step, index) => {
          const Icon = step.icon

          return (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-background border"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.15 }}
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold">{t(step.titleKey)}</h3>
              <p className="text-muted-foreground text-sm mt-2">
                {t(step.descriptionKey)}
              </p>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
