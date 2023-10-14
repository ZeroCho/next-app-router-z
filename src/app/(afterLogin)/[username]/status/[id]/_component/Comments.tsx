"use client";

import React from "react";
import Post from "@/app/(afterLogin)/_component/Post";
import {useQuery} from "@tanstack/react-query";
import {Post as IPost} from '@/model/Post';
import {getComments} from "@/app/(afterLogin)/[username]/status/[id]/_lib/getComments";

type Props = {
  id: string;
  postId: string;
}
export default function Comments({id, postId}: Props) {
  const {data} = useQuery<IPost[], Object, IPost[], [_key: string, _key2: string, { id: string, postId: string }]>({
    queryKey: ["posts", "comments", {id, postId }],
    queryFn: getComments,
  });

  return data?.map((v) => <Post key={v.postId} post={v}/>);
}