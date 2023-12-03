"use client";

import style from "@/app/(afterLogin)/messages/[room]/chatRoom.module.css";
import BackButton from "@/app/(afterLogin)/_component/BackButton";
import Link from "next/link";
import {useQuery} from "@tanstack/react-query";
import {getUser} from "@/app/(afterLogin)/[username]/_lib/getUser";

interface Props {
  id: string;
}
export function UserInfo({ id }: Props) {
  const {data: user} = useQuery({
    queryKey: ['users', id], queryFn: getUser
  })
  if (!user) {
    return null;
  }
  return (
    <>
      <div className={style.header}>
        <BackButton/>
        <div><h2>{user.nickname}</h2></div>
      </div>
      <Link href={'/' + user.id} className={style.userInfo}>
        <img src={user.image} alt={user.id}/>
        <div><b>{user.nickname}</b></div>
        <div>@{user.id}</div>
      </Link>
    </>
  )
}