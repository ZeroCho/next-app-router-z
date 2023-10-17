import style from "./profile.module.css";
import BackButton from "@/app/(afterLogin)/search/_component/BackButton";
import React from "react";
import {User} from "@/model/User";
import {getUser} from "@/app/(afterLogin)/[username]/_lib/getUser";
import UserPosts from "@/app/(afterLogin)/[username]/_component/UserPosts";
import getQueryClient from "@/app/(afterLogin)/_lib/getQueryClient";
import {dehydrate, Hydrate} from "@tanstack/react-query";
import {getUserPosts} from "@/app/(afterLogin)/[username]/_lib/getUserPosts";

export async function generateMetadata({params}: Props) {
  const user: User = await getUser(params.username);
  return {
    title: `${user.nickname} (${user.id}) / Z`,
    description: `${user.nickname} (${user.id}) 프로필`,
  }
}

type Props = {
  params: { username: string }
};

export default async function Page({params}: Props) {
  const user: User = await getUser(params.username);
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(['posts', 'users', {id: params.username}], getUserPosts);
  const dehydratedState = dehydrate(queryClient)

  return (
    <div className={style.main}>
      <div className={style.header}>
        <BackButton/>
        <h3 className={style.headerTitle}>{user.nickname}</h3>
      </div>
      <div className={style.userZone}>
        <div className={style.userImage}>
          <img src={user.image} alt={user.id}/>
        </div>
        <div className={style.userName}>
          <div>{user.nickname}</div>
          <div>@{user.id}</div>
        </div>
        <button className={style.followButton}>팔로우</button>
      </div>
      <Hydrate state={dehydratedState}>
        <UserPosts id={params.username}/>
      </Hydrate>
    </div>
  );
}