'use client'

import LoginButton from '@/features/auth/login/LoginButton'
import { cn } from '@/lib/utils'
import { SignedOut } from '@clerk/nextjs'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

export default function Hero() {
  const t = useTranslations('LandingPage')

  return (
    <section
      className={cn(
        'relative flex flex-col-reverse gap-8 lg:flex-row items-center justify-between w-full py-20 sm:py-32'
      )}
    >
      <div className="flex flex-col items-start max-w-xl gap-6 text-left">
        <motion.h1
          className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {t('hero.title')}
        </motion.h1>

        <motion.p
          className="text-muted-foreground text-lg sm:text-xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {t('hero.subtitle')}
        </motion.p>

        <SignedOut>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <LoginButton buttonTitle={t('getStarted')} />
          </motion.div>
        </SignedOut>
      </div>

      <motion.div
        className="w-full lg:w-1/2 h-full rounded-xl shadow-xs"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Image
          src="/lp_hero.jpg"
          alt="KPI Bot dashboard showing analytics and metrics"
          priority
          unoptimized
          width={800}
          height={600}
          className="w-full h-auto rounded-xl object-cover"
        />
      </motion.div>
    </section>
  )
}
