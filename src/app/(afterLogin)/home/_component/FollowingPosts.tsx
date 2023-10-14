"use client";

import React, {Fragment, useEffect} from "react";
import Post from "@/app/(afterLogin)/_component/Post";
import {useInfiniteQuery} from "@tanstack/react-query";
import { Post as IPost } from '@/model/Post';
import {getFollowingPosts} from "@/app/(afterLogin)/home/_lib/getFollowingPosts";
import {useInView} from "react-intersection-observer";

export default function FollowingPosts() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useInfiniteQuery<IPost[]>({
    queryKey: ['posts', "infinite", "followings"],
    queryFn: getFollowingPosts,
    getNextPageParam: (lastPage, pages) => lastPage.at(-1)?.postId
  });
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });

  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage()
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  return (
    <>
      {data?.pages?.map((group, i) => (
        <Fragment key={i}>
          {group.map((v) => <Post key={v.postId} post={v}/>)}
        </Fragment>
      ))}
      <div ref={ref} style={{ height: 50 }} />
    </>
  );
}