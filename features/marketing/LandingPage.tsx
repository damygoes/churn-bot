'use client'

import CTA from './components/CTA'
import Features from './components/Features'
import Hero from './components/Hero'
import HowItWorks from './components/HowItWorks'
import LandingPageHeader from './components/LandingPageHeader'
import LandingPageIntegrations from './components/LandingPageIntegrations'

export default function LandingPage() {
  return (
    <div className="relative flex flex-col items-start justify-start min-h-screen gap-8 bg-background p-8 scrollbar-hide sm:p-20 sm:pt-4">
      <LandingPageHeader />
      <div className="flex flex-col items-start justify-start gap-4 w-full h-full grow scrollbar-hide">
        <Hero />
        <Features />
        <HowItWorks />
        <LandingPageIntegrations />
        <CTA />
      </div>
    </div>
  )
}
