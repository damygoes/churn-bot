import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card/Card'

export function MetricCard({ title, value }: { title: string; value: string }) {
  return (
    <Card className="p-4">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-semibold">{value}</p>
      </CardContent>
    </Card>
  )
}
