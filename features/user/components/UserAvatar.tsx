'use client'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar/Avatar'

interface UserAvatarProps {
  src?: string
  alt?: string
  fallback: string
  className?: string
}

export function UserAvatar({ src, alt, fallback, className }: UserAvatarProps) {
  return (
    <Avatar className={className}>
      {src ? <AvatarImage src={src} alt={alt} /> : null}
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  )
}
