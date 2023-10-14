export async function getUser(id: string) {
  const res = await fetch(`http://localhost:9090/api/users/${id}`, {
    cache: 'no-store',
  })

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    console.error('statusText', res.statusText);
    throw new Error('Failed to fetch data')
  }

  return res.json();
}