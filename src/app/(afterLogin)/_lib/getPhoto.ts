type Props = {
  username: string, id: string, photoId: string
}
const getPhoto = async (params: Props) => {
  const res = await fetch(`http://localhost:9090/api/posts/${params.id}/photos/${params.photoId}`)

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json();
}
export {getPhoto};
