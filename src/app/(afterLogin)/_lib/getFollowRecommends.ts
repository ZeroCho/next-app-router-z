export async function getFollowRecommends() {
  const res = await fetch('http://localhost:9090/api/followRecommends');
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}