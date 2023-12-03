import {cookies} from "next/headers";
import {Room} from "@/model/Room";

export async function getRooms(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${id}/rooms`, {
    next: {
      tags: ['rooms'],
    },
    credentials: 'include',
    headers: {Cookie: cookies().toString()},
    cache: 'no-store',
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json() as Promise<Room[]>;
}