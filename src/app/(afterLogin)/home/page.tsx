import style from "./home.module.css";
import {Metadata, NextPage} from "next";
import React from "react";
import PostForm from "@/app/(afterLogin)/home/_component/PostForm";
import Tab from "@/app/(afterLogin)/home/_component/Tab";
import TabProvider from "@/app/(afterLogin)/home/_component/TabProvider";
import TabDecider from "@/app/(afterLogin)/home/_component/TabDecider";
import {dehydrate, Hydrate} from "@tanstack/react-query";
import getQueryClient from "@/app/(afterLogin)/_lib/getQueryClient";
import PostRecommends from "@/app/(afterLogin)/home/_component/PostRecommends";
import FollowingPosts from "@/app/(afterLogin)/home/_component/FollowingPosts";
import {getFollowingPosts} from "@/app/(afterLogin)/home/_lib/getFollowingPosts";
import {getPostRecommends} from "@/app/(afterLogin)/home/_lib/getPostRecommends";

export const metadata: Metadata = {
  title: '홈 / Z',
  description: '홈',
}

const Home: NextPage = async () => {
  const queryClient = getQueryClient()
  await queryClient.prefetchInfiniteQuery(['posts', "infinite", 'recommends'], getPostRecommends)
  await queryClient.prefetchInfiniteQuery(['posts', "infinite", 'followings'], getFollowingPosts)
  const dehydratedState = dehydrate(queryClient)

  return (
    <main className={style.main}>
      <Hydrate state={dehydratedState}>
        <TabProvider>
          <Tab/>
          <PostForm/>
          <div className={style.list}>
            <TabDecider
              recommend={<PostRecommends/>}
              following={<FollowingPosts/>}
            />
          </div>
        </TabProvider>
      </Hydrate>
    </main>
  );
}

export default Home;
