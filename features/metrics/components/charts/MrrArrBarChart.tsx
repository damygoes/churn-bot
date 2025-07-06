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
  mrr: number
  arr: number
  currencySymbol: string
  className?: string
}

export function MrrArrBarChart({ mrr, arr, currencySymbol, className }: Props) {
  const data = [
    { name: 'MRR', value: mrr },
    { name: 'ARR', value: arr },
  ]

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Revenue Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip
              formatter={(value) =>
                `${currencySymbol}${Number(value).toFixed(2)}`
              }
            />
            <Bar dataKey="value" fill="var(--chart-5)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
