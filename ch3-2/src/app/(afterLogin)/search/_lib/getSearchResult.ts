import {QueryFunction} from "@tanstack/query-core";
import {Post} from "@/model/Post";

export const getSearchResult: QueryFunction<Post[], [_1: string, _2: string, searchParams: { q: string, pf?: string, f?: string }]>
  = async ({ queryKey }) => {
  const [_1, _2, searchParams] = queryKey;
  const res = await fetch(`http://localhost:9090/api/search/${searchParams.q}?${searchParams.toString()}`, {
    next: {
      tags: ['posts', 'search', searchParams.q],
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