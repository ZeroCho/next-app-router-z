import {Message} from "@/model/Message";

type Props = { pageParam?: number, queryKey: [string, { senderId: string, receiverId: string }, string] };
export async function getMessages({pageParam, queryKey}: Props) {
  const [_, userInfo] = queryKey;
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${userInfo.senderId}/rooms/${userInfo.receiverId}?cursor=${pageParam}`, {
    next: {
      tags: ['rooms'],
    },
    credentials: 'include',
    cache: 'no-store',
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json() as Promise<Message[]>;
}