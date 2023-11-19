import {QueryFunction} from "@tanstack/query-core";
import {Post} from "@/model/Post";

export const getComments: QueryFunction<Post[], [_1: string, _2: string, _3: string]>
  = async ({ queryKey }) => {
  const [_1, id] = queryKey;
  const res = await fetch(`http://localhost:9090/api/posts/${id}/comments`, {
    next: {
      tags: ['posts', id, 'comments'],
    },
    cache: 'no-store',
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}