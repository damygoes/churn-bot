import { NavbarUser } from '@/components/navigation/types'
import { AppUser } from '@/types/AppUser'

export const getAppUserData = (user: AppUser): NavbarUser => {
  if (!user)
    return {
      name: 'Unknown User',
      email: 'No email provided',
      avatar: '',
      fallback: '?',
    }

  const fallback = user.firstName?.charAt(0) || user.email?.charAt(0) || '?'
  const displayName =
    `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim() || user.email

  return {
    name: displayName || 'Unknown User',
    email: user.email || 'No email provided',
    avatar: user.avatarUrl || '',
    fallback: fallback || '?',
  }
}
