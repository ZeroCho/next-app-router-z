import {QueryFunction} from "@tanstack/query-core";
import {Post as IPost} from '@/model/Post';
const getComments: QueryFunction<IPost[], [_key: string, _key2: string, { id: string, postId: string }]>
  = async ({queryKey}) => {
  const [_key, _key2, { id, postId }] = queryKey;
  const res = await fetch(`http://localhost:9090/api/users/${id}/posts/${postId}/comments`, {
    cache: 'no-store', // 캐싱 안 함
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}
export { getComments };