'use client'

import { updateUserProfile } from '@/actions/users.actions'
import { Button } from '@/components/ui/button/Button'
import { Input } from '@/components/ui/input/Input'
import { Label } from '@/components/ui/label/Label'
import { UserAvatar } from '@/features/user/components/UserAvatar'
import { uploadToS3Presigned } from '@/lib/utils'
import { AppUser } from '@/types/AppUser'
import React, { useEffect, useState } from 'react'

interface ProfileFormProps {
  user: AppUser
}

export default function ProfileForm({ user }: ProfileFormProps) {
  const [firstName, setFirstName] = useState(user?.firstName || '')
  const [lastName, setLastName] = useState(user?.lastName || '')
  const [avatarUrl] = useState(user?.avatarUrl || '')
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(avatarUrl)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Show preview when file is selected
  useEffect(() => {
    if (!file) {
      setPreview(avatarUrl)
      return
    }
    const objectUrl = URL.createObjectURL(file)
    setPreview(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
  }, [file, avatarUrl])

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      let uploadedAvatarUrl = avatarUrl
      if (file) {
        if (file.size > 5 * 1024 * 1024) {
          throw new Error('File size exceeds 5MB limit.')
        }
        uploadedAvatarUrl = await uploadToS3Presigned(file)
      }

      if (!user?.clerkUserId) throw new Error('User ID missing')

      await updateUserProfile({
        clerkUserId: user.clerkUserId,
        firstName,
        lastName,
        avatarUrl: uploadedAvatarUrl,
      })

      alert('Profile updated!')
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Something went wrong.')
      }
    } finally {
      setLoading(false)
    }
  }

  const avatarFallback =
    firstName?.[0]?.toUpperCase() ?? user?.email?.[0]?.toUpperCase() ?? '?'

  return (
    <form onSubmit={onSubmit} className="max-w-md w-full space-y-6">
      <div>
        <Label className="block mb-2 font-semibold">Avatar</Label>
        <UserAvatar
          src={preview || ''}
          alt={firstName || 'User Avatar'}
          fallback={avatarFallback}
          className="h-24 w-24 rounded-lg mb-2"
        />
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
      </div>

      <div>
        <Label className="block mb-1 font-semibold">First Name</Label>
        <Input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>

      <div>
        <Label className="block mb-1 font-semibold">Last Name</Label>
        <Input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Button type="submit" disabled={loading}>
        {loading ? 'Saving...' : 'Save Changes'}
      </Button>
    </form>
  )
}
