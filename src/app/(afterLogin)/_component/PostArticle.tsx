"use client";

import {ReactNode} from "react";
import {useRouter} from "next/navigation";
import {Post} from "@/model/Post";
import style from "@/app/(afterLogin)/_component/post.module.css";

export default function PostArticle({children, post }: { children: ReactNode, post: Post }) {
  const router = useRouter();

  let target = post;
  if (post.Repost) target = post.Repost;

  const onClick = () => {
    router.push(`/${target.User.id}/status/${target.postId}`);
  }
  return (
    <article className={style.post} onClick={onClick}>{children}</article>
  )
}