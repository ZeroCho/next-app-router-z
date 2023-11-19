import {cookies} from "next/headers";
import {revalidatePath} from "next/cache";

export const getSinglePostServer = async ({ queryKey }: { queryKey: [string, string ]}) => {
  const [_1, id] = queryKey;
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${id}`, {
    next: {
      revalidate: 3600,
      tags: ['posts', id],
    },
    credentials: 'include',
    headers: {Cookie: cookies().toString()},

  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}