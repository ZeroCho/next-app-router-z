"use client";

import React from "react";
import Post from "@/app/(afterLogin)/_component/Post";
import {useQuery} from "@tanstack/react-query";
import {Post as IPost} from '@/model/Post';
import {getUserPosts} from "@/app/(afterLogin)/[username]/_lib/getUserPosts";

type Props = {
  id: string;
}
export default function UserPosts({id}: Props) {
  const {data} = useQuery<IPost[], Object, IPost[], [_key: string, _key2: string, { id: string }]>({
    queryKey: ["posts", "users", {id}],
    queryFn: getUserPosts,
  });

  return data?.map((v) => <Post key={v.postId} post={v}/>);
}