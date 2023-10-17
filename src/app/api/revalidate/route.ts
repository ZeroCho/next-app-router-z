import { NextRequest } from 'next/server'
import { revalidateTag } from 'next/cache'

// e.g a webhook to `your-website.com/api/revalidate?tag=collection&secret=<token>`
export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')
  const tag = request.nextUrl.searchParams.get('tag')

  // MY_SECRET_TOKEN을 알아야 해서 Server Component에서만 이 요청 가능
  if (secret !== process.env.MY_SECRET_TOKEN) {
    return Response.json({ message: 'Invalid secret' }, { status: 401 })
  }

  if (!tag) {
    return Response.json({ message: 'Missing tag param' }, { status: 400 })
  }

  revalidateTag(tag)

  return Response.json({ revalidated: true, now: Date.now() })
}