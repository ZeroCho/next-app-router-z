"use client";

import React from "react";
import Post from "@/app/(afterLogin)/_component/Post";
import {useQuery} from "@tanstack/react-query";
import {Post as IPost} from '@/model/Post';
import {getSearchResult} from "@/app/(afterLogin)/search/_lib/getSearchResult";

type Props = {
  searchParams: { q: string, pf?: string };
}
export default function SearchResult({searchParams}: Props) {
  const {data} = useQuery<IPost[], Object, IPost[], [_key: string, Props['searchParams']]>({
    queryKey: ["searchResult", searchParams],
    queryFn: getSearchResult,
  });

  return data?.map((v) => <Post key={v.postId} post={v}/>);
}