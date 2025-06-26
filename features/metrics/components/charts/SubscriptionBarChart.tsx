'use client'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card/Card'
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

interface Props {
  newSubscriptions: number
  churnedCustomers: number
  className?: string
}

export function SubscriptionBarChart({
  newSubscriptions,
  churnedCustomers,
  className,
}: Props) {
  const data = [
    { name: 'New Subs', value: newSubscriptions },
    { name: 'Churned', value: churnedCustomers },
  ]

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Subscriptions (Last 30 Days)</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="value" fill="var(--chart-2)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
