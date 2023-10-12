import style from "./profile.module.css";
import BackButton from "@/app/(afterLogin)/search/_component/BackButton";
import React from "react";
import Post from "@/app/(afterLogin)/home/_component/Post";
import { Post as IPost } from '@/model/Post';
import {User} from "@/model/User";

async function getUser(id: string) {
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

async function getUserPosts(id: string) {
  const res = await fetch(`http://localhost:9090/api/users/${id}/posts`, {
    cache: 'no-store',
  })

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json();
}

type Props = {
  params: { id: string }
};

export default async function Page({ params} : Props) {
  const user: User = await getUser(params.id);
  const posts: IPost[] = await getUserPosts(params.id);

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
      {posts.map((v) => <Post post={v} key={v.postId} />)}
    </div>
  );
}