import {Post as IPost} from '@/model/Post';
import Post from "@/app/(afterLogin)/_component/Post";
import BackButton from "@/app/(afterLogin)/search/_component/BackButton";
import React from "react";
import style from './singlePost.module.css';
import {getComments} from "@/app/(afterLogin)/[username]/status/[id]/_lib/getComments";
import getQueryClient from "@/app/(afterLogin)/_lib/getQueryClient";
import {dehydrate, HydrationBoundary} from "@tanstack/react-query";
import CommentForm from "@/app/(afterLogin)/[username]/status/[id]/_component/CommentForm";
import Comments from "@/app/(afterLogin)/[username]/status/[id]/_component/Comments";
import {User} from "@/model/User";
import {getUser} from "@/app/(afterLogin)/[username]/_lib/getUser";

export async function generateMetadata({params}: Props) {
  const user: User = await getUser(params.username);
  const post: IPost = await getSinglePost({id: params.username, postId: params.id});
  return {
    title: `Z에서 ${user.nickname} 님 : ${post.content}`,
    description: post.content,
  }
}

type Props = {
  params: { username: string, id: string }
}

async function getSinglePost({id, postId}: { id: string, postId: string }) {
  const res = await fetch(`http://localhost:9090/api/users/${id}/posts/${postId}`, {
    cache: 'no-store', // 캐싱 안 함
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function Page({params}: Props) {
  const post: IPost = await getSinglePost({id: params.username, postId: params.id});
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery({ queryKey: ['posts', 'comments', {id: params.username, postId: params.id}], queryFn: getComments });
  const dehydratedState = dehydrate(queryClient)

  return <div className={style.main}>
    <div className={style.header}>
      <BackButton/>
      <h3 className={style.headerTitle}>게시하기</h3>
    </div>
    <Post post={post}/>
    <CommentForm id={params.username} postId={params.id}/>
    <HydrationBoundary state={dehydratedState}>
      <Comments id={params.username} postId={params.id}/>
    </HydrationBoundary>
  </div>
}