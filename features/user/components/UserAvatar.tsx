'use client'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar/Avatar'

export function UserAvatar({
  src,
  alt,
  fallback,
  className,
}: {
  src: string
  alt: string
  fallback: string
  className?: string
}) {
  return (
    <Avatar className={className}>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback className="rounded-lg">{fallback}</AvatarFallback>
    </Avatar>
  )
}
