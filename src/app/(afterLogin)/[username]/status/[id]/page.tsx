import {Post as IPost} from '@/model/Post';
import Post from "@/app/(afterLogin)/home/_component/Post";
import BackButton from "@/app/(afterLogin)/search/_component/BackButton";
import React from "react";
import style from './singlePost.module.css';

type Props = {
  params: { id: string }
}

async function getSinglePost({params}: Props) {
  const res = await fetch(`http://localhost:9090/api/posts/${params.id}`, {
    cache: 'no-store', // 캐싱 안 함
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function Page(props: Props) {
  const post: IPost = await getSinglePost(props);

  // TODO: 답글 넣기

  return <div className={style.main}>
    <div className={style.header}>
      <BackButton/>
      <h3 className={style.headerTitle}>게시하기</h3>
    </div>
    <Post post={post}/>
  </div>
}