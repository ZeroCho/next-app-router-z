"use client";

import Post from "@/app/(afterLogin)/_component/Post";
import {usePostStore} from "@/store/post";

export default function MyPosts() {
  const myPosts = usePostStore((store) => store.myPosts);
  return myPosts.map((v) => <Post post={v} key={v.postId} />)
}