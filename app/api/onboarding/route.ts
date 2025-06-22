import { createWorkspace } from '@/actions/workspace.actions'

export async function POST(req: Request) {
  const body = await req.json()
  const { name, templateId } = body

  try {
    const id = await createWorkspace({ name, templateId })
    return Response.json({ success: true, id })
  } catch (err) {
    console.error('Error creating workspace:', err)
    return new Response('Error creating workspace', { status: 500 })
  }
}
