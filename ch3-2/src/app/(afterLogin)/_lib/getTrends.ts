export async function getTrends() {
  const res = await fetch(`http://localhost:9090/api/trends`, {
    next: {
      tags: ['trends'],
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