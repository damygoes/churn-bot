import { getCurrentUser } from '../actions'
import ProfileForm from './UserProfileForm'

export default async function UserProfile() {
  const user = await getCurrentUser()

  if (!user) return <div>User not found</div>

  return (
    <div className="flex w-full h-full justify-center items-center">
      <ProfileForm user={user} />
    </div>
  )
}
