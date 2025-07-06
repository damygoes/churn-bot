import { routing } from '@/lib/i18n/routing'
import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { Geist, Geist_Mono } from 'next/font/google'
import { notFound } from 'next/navigation'
import '../styles/globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'KPI Bot',
  description:
    'KPI Bot is a tool to help you track and visualize your key performance indicators (KPIs) with ease.',
  openGraph: {
    title: 'KPI Bot',
    description:
      'KPI Bot is a tool to help you track and visualize your key performance indicators (KPIs) with ease.',
    url: 'https://kpi-bot.com',
    siteName: 'KPI Bot',
  },
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }
  return (
    <html lang={locale} className="scrollbar-hide">
      <ClerkProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased scrollbar-hide`}
        >
          <NextIntlClientProvider>{children}</NextIntlClientProvider>
        </body>
      </ClerkProvider>
    </html>
  )
}
