"use client";

import React from "react";
import Post from "@/app/(afterLogin)/_component/Post";
import {useQuery} from "@tanstack/react-query";
import { Post as IPost } from '@/model/Post';
import {getFollowingPosts} from "@/app/(afterLogin)/home/_lib/getFollowingPosts";

export default function FollowingPosts() {
  const { data } = useQuery<IPost[]>({ queryKey: ["followingPosts"], queryFn: getFollowingPosts });

  return data?.map((v) => <Post key={v.postId} post={v}/>);
}