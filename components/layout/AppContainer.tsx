import { cn } from '@/lib/utils'

export default async function AppContainer({
  children,
  className,
}: Readonly<{
  children: React.ReactNode
  className?: string
}>) {
  return (
    <div
      className={cn(
        'p-4 md:p-8 w-full h-full overflow-x-hidden overflow-y-auto',
        className
      )}
    >
      {children}
    </div>
  )
}
