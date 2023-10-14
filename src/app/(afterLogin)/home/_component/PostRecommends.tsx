"use client";

import React from "react";
import Post from "@/app/(afterLogin)/_component/Post";
import {useQuery} from "@tanstack/react-query";
import { Post as IPost } from '@/model/Post';
import MyPosts from "@/app/(afterLogin)/home/_component/MyPosts";
import {getPostRecommends} from "@/app/(afterLogin)/home/_lib/getPostRecommends";

export default function PostRecommends() {
  const { data } = useQuery<IPost[]>({ queryKey: ["postRecommends"], queryFn: getPostRecommends });

  return (
    <>
      <MyPosts/>
      {data?.map((v) => <Post key={v.postId} post={v}/>)}
    </>
  );
}