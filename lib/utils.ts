import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function uploadToS3Presigned(file: File): Promise<string> {
  const res = await fetch('/api/s3-presigned-url', {
    method: 'POST',
    body: JSON.stringify({
      filename: file.name,
      type: file.type,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!res.ok) throw new Error('Failed to get presigned URL')

  const { url, fields, key } = await res.json()

  const formData = new FormData()
  Object.entries(fields).forEach(([k, v]) => {
    formData.append(k, v as string)
  })
  formData.append('file', file)

  const upload = await fetch(url, {
    method: 'POST',
    body: formData,
  })

  if (!upload.ok) throw new Error('Upload failed')

  const imageUrl = new URL(key, url).toString()

  return imageUrl
}
