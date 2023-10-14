import {QueryFunction} from "@tanstack/query-core";
import {Post} from "@/model/Post";

const getUserPosts: QueryFunction<Post[], [_key: string, _key2: string, { id: string }]> = async ({queryKey}) => {
  const [_key, _key2, {id}] = queryKey;
  const res = await fetch(`http://localhost:9090/api/users/${id}/posts`, {
    cache: 'no-store',
  })

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json();
}
export {getUserPosts};
