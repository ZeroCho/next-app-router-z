export async function getFollowingPosts() {
  const res = await fetch(`http://localhost:9090/api/followingPosts`, {
    next: {
      tags: ['posts', 'followings'],
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