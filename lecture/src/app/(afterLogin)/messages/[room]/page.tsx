import style from './chatRoom.module.css';
import relativeTime from "dayjs/plugin/relativeTime";
import 'dayjs/locale/ko';
import dayjs from "dayjs";
import MessageForm from "@/app/(afterLogin)/messages/[room]/_component/MessageForm";
import {getUserServer} from "@/app/(afterLogin)/[username]/_lib/getUserServer";
import {auth} from "@/auth";
import {QueryClient} from "@tanstack/react-query";
import {UserInfo} from "@/app/(afterLogin)/messages/[room]/_component/UserInfo";
import WebSocketComponent from "@/app/(afterLogin)/messages/[room]/_component/WebSocketComponent";
import React from "react";
import MessageList from "@/app/(afterLogin)/messages/[room]/_component/MessageList";

dayjs.locale('ko');
dayjs.extend(relativeTime)

type Props = {
  params: { room: string },
}
export default async function ChatRoom({ params }: Props) {
  const session = await auth();
  const queryClient = new QueryClient();
  const ids = params.room.split('-').filter((v) => v !== session?.user?.email);
  if (!ids[0]) {
    return null;
  }
  await queryClient.prefetchQuery({queryKey: ['users', ids[0]], queryFn: getUserServer})

  const messages = [
    {messageId: 1, roomId: 123, id: 'zerohch0',  content: '안녕하세요.', createdAt: new Date()},
    {messageId: 2, roomId: 123, id: 'hero', content: '안녕히가세요.', createdAt: new Date()},
  ]

  return (
    <main className={style.main}>
      <WebSocketComponent />
      <UserInfo id={ids[0]} />
      <MessageList id={ids[0]} />
      <MessageForm id={ids[0]} />
    </main>
  )
}