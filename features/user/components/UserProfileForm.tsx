'use client'

import { updateUserProfile } from '@/actions/users.actions'
import { Button } from '@/components/ui/button/Button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form/Form'
import { Input } from '@/components/ui/input/Input'
import { UserAvatar } from '@/features/user/components/UserAvatar'
import { uploadToS3Presigned } from '@/lib/utils'
import { AppUser } from '@/types/AppUser'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const profileSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
})

type ProfileValues = z.infer<typeof profileSchema>

interface ProfileFormProps {
  user: AppUser
}

export default function ProfileForm({ user }: ProfileFormProps) {
  const t = useTranslations('ProfileForm')
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(user?.avatarUrl || '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
    },
  })

  useEffect(() => {
    if (!file) {
      setPreview(user?.avatarUrl || '')
      return
    }

    const objectUrl = URL.createObjectURL(file)
    setPreview(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
  }, [file, user?.avatarUrl])

  async function onSubmit(values: ProfileValues) {
    setLoading(true)
    setError(null)

    try {
      let uploadedAvatarUrl = user?.avatarUrl
      if (file) {
        if (file.size > 5 * 1024 * 1024) {
          throw new Error(t('fileLimitExceeded'))
        }
        uploadedAvatarUrl = await uploadToS3Presigned(file)
      }

      if (!user?.clerkUserId) throw new Error('User ID missing')

      await updateUserProfile({
        clerkUserId: user.clerkUserId,
        avatarUrl: uploadedAvatarUrl ?? undefined,
        ...values,
      })

      alert(t('successMessage')) // replace with Sonner or Toast
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError(t('errorMessage'))
      }
    } finally {
      setLoading(false)
    }
  }

  const avatarFallback =
    user?.firstName?.[0]?.toUpperCase() ??
    user?.email?.[0]?.toUpperCase() ??
    '?'

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-3xl space-y-6">
        <div className="flex justify-start items-start gap-8 w-full">
          <div className="flex items-center justify-center gap-4 w-1/3 h-full">
            <div className="relative group cursor-pointer">
              <label htmlFor="avatar-upload">
                <UserAvatar
                  src={preview || ''}
                  alt={user?.firstName || 'User Avatar'}
                  fallback={avatarFallback}
                  className="h-full w-full rounded-lg transition-opacity group-hover:opacity-80"
                />
                <div className="absolute inset-0 flex items-center justify-center w-full bg-black/30 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                  {t('changeAvatar')}
                </div>
              </label>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="hidden"
              />
            </div>
          </div>
          <div className="space-y-6 grow h-full">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('firstName')}</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('lastName')}</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('email')}</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
        <div className="w-full justify-end items-center flex">
          <Button type="submit" disabled={loading}>
            {loading ? t('updating') : t('saveChanges')}
          </Button>
        </div>
      </form>
    </Form>
  )
}
