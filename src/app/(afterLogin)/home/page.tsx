import style from "./home.module.css";
import Post from "@/app/(afterLogin)/home/_component/Post";
import {Metadata, NextPage} from "next";
import React from "react";
import MyPosts from "@/app/(afterLogin)/home/_component/MyPosts";
import {getMyInfo} from "@/app/(afterLogin)/layout";
import PostForm from "@/app/(afterLogin)/home/_component/PostForm";
import Tab from "@/app/(afterLogin)/home/_component/Tab";

async function getPostRecommends() {
  const res = await fetch('http://localhost:9090/api/postRecommends');
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

  return (
    <main className={style.main}>
      <Tab />
      <PostForm />
      <div className={style.list}>
        <MyPosts />
        {recommends.map((v) => <Post key={v.postId} post={v} />)}
      </div>
    </main>
  );
}

export default Home;
