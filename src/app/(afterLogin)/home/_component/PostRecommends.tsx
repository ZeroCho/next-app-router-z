"use client";

import React, {Fragment, useEffect} from "react";
import Post from "@/app/(afterLogin)/_component/Post";
import {useInfiniteQuery} from "@tanstack/react-query";
import {Post as IPost} from '@/model/Post';
import MyPosts from "@/app/(afterLogin)/home/_component/MyPosts";
import {getPostRecommends} from "@/app/(afterLogin)/home/_lib/getPostRecommends";
import {useInView} from "react-intersection-observer";

export default function PostRecommends() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useInfiniteQuery<IPost[]>({
    queryKey: ["posts", "infinite", "recommends"],
    queryFn: getPostRecommends,
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
      <MyPosts/>
      {data?.pages?.map((group, i) => (
        <Fragment key={i}>
          {group.map((v) => <Post key={v.postId} post={v}/>)}
        </Fragment>
      ))}
      <div ref={ref} style={{ height: 50 }} />
    </>
  );
}