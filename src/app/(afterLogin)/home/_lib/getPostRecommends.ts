
export async function getPostRecommends({pageParam}: { pageParam?: number }) {
  const res = await fetch(`http://localhost:9090/api/postRecommends${pageParam ? `?cursor=${pageParam}` : ''}`, {
    next: {
      tags: ['posts', 'recommends'],
    }
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}