import {QueryFunction} from "@tanstack/query-core";
import {Post} from "@/model/Post";

const getSearchResult: QueryFunction<Post[], [_key: string, searchParams: { q: string, pf?: string }]>
  = async ({queryKey}) => {
  const [_key, searchParams] = queryKey;
  const res = await fetch(`http://localhost:9090/api/search/${searchParams.q}?${new URLSearchParams(searchParams).toString()}`, {
    cache: 'no-store',
  })

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json();
}
export {getSearchResult};
