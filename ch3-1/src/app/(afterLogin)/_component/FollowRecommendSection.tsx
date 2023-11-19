"use client";

import {useQuery} from "@tanstack/react-query";
import {User} from "@/model/User";
import {getFollowRecommends} from "@/app/(afterLogin)/_lib/getFollowRecommends";
import FollowRecommend from "@/app/(afterLogin)/_component/FollowRecommend";

export default function FollowRecommendSection() {
  const { data } = useQuery<User[]>({
    queryKey: ['users', 'followRecommends'],
    queryFn: getFollowRecommends,
    staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
    gcTime: 300 * 1000,
  })

  return data?.map((user) => <FollowRecommend user={user} key={user.id} />);
}