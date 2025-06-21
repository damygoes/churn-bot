import { getCurrentUser } from '@/actions/users.actions'
import ProfileForm from './UserProfileForm'

export default async function UserProfile() {
  const user = await getCurrentUser()

  if (!user) return <div>User not found</div>

  return <ProfileForm user={user} />
}
