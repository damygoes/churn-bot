'use client'

import { motion } from 'framer-motion'
import { Activity, BarChart2, Slack, Users } from 'lucide-react'
import { useTranslations } from 'next-intl'

const features = [
  {
    icon: BarChart2,
    titleKey: 'metrics.title',
    descriptionKey: 'metrics.description',
  },
  {
    icon: Users,
    titleKey: 'teams.title',
    descriptionKey: 'teams.description',
  },
  {
    icon: Slack,
    titleKey: 'slack.title',
    descriptionKey: 'slack.description',
  },
  {
    icon: Activity,
    titleKey: 'realtime.title',
    descriptionKey: 'realtime.description',
  },
]

export default function Features() {
  const t = useTranslations('LandingPage.features')

  return (
    <section className="w-full py-20 sm:py-32 flex flex-col items-center text-center gap-12">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        {features.map((feature, index) => {
          const Icon = feature.icon

          return (
            <motion.div
              key={index}
              className="p-6 rounded-2xl border bg-muted/20 shadow-sm text-left flex flex-col gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Icon className="w-8 h-8 text-primary" />
              <h3 className="text-xl font-semibold">{t(feature.titleKey)}</h3>
              <p className="text-muted-foreground text-sm">
                {t(feature.descriptionKey)}
              </p>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
