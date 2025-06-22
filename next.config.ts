import { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const nextConfig: NextConfig = {
  images: {
    domains: ['churn-bot-bucket.s3.eu-central-1.amazonaws.com'],
  },
}

const withNextIntl = createNextIntlPlugin('./lib/i18n/request.ts')
export default withNextIntl(nextConfig)
