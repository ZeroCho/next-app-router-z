"use client";

import {EventHandler, MouseEventHandler, ReactNode} from "react";
import style from './post.module.css';
import {useRouter} from "next/navigation";
import {Post} from "@/model/Post";

type Props = {
  children: ReactNode,
  post: Post
}

export default function PostArticle({ children, post}: Props) {
  const router = useRouter();
  let target = post;
  if (post.Original) {
    target = post.Original;
  }
  const onClick = () => {
    router.push(`/${target.User.id}/status/${target.postId}`);
  }

  return (
    <article onClick={onClick} className={style.post}>
      {children}
    </article>
  );
}