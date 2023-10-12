import style from "./home.module.css";
import Post from "@/app/(afterLogin)/home/_component/Post";
import {Metadata, NextPage} from "next";
import React from "react";
import MyPosts from "@/app/(afterLogin)/home/_component/MyPosts";
import PostForm from "@/app/(afterLogin)/home/_component/PostForm";
import Tab from "@/app/(afterLogin)/home/_component/Tab";
import TabProvider from "@/app/(afterLogin)/home/_component/TabProvider";
import TabDecider from "@/app/(afterLogin)/home/_component/TabDecider";

async function getPostRecommends() {
  const res = await fetch('http://localhost:9090/api/postRecommends', {
    cache: 'no-store', // 캐싱 안 함
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

async function getFollowingPosts() {
  const res = await fetch('http://localhost:9090/api/followingPosts', {
    cache: 'no-store', // 캐싱 안 함
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export const metadata: Metadata = {
  title: '홈 / Z',
  description: '홈',
}

const Home: NextPage = async () => {
  const recommends: Post[] = await getPostRecommends();
  const following: Post[] = await getFollowingPosts();

  return (
    <main className={style.main}>
      <TabProvider>
        <Tab/>
        <PostForm/>
        <div className={style.list}>
          <TabDecider
            recommend={<>
              <MyPosts/>
              {recommends.map((v) => <Post key={v.postId} post={v}/>)}
            </>}
            following={following.map((v) => <Post key={v.postId} post={v}/>)}
          />
        </div>
      </TabProvider>
    </main>
  );
}

export default Home;
