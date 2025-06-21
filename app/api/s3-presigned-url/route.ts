import { S3Client } from '@aws-sdk/client-s3'
import { createPresignedPost } from '@aws-sdk/s3-presigned-post'
import { randomUUID } from 'crypto'
import { NextResponse } from 'next/server'

const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

export async function POST(req: Request) {
  const { filename, type } = await req.json()

  const extension = filename.split('.').pop()
  const key = `user-avatars/${randomUUID()}.${extension}`

  const presignedPost = await createPresignedPost(s3, {
    Bucket: process.env.AWS_S3_BUCKET!,
    Key: key,
    Conditions: [
      ['starts-with', '$Content-Type', ''],
      ['content-length-range', 0, 5 * 1024 * 1024], // limit: 5MB
    ],
    Fields: {
      key,
      'Content-Type': type,
    },
    Expires: 60, // seconds
  })

  return NextResponse.json({
    url: presignedPost.url,
    fields: presignedPost.fields,
    key,
  })
}
