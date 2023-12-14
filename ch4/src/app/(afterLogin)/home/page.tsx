import style from './home.module.css';
import Tab from "@/app/(afterLogin)/home/_component/Tab";
import TabProvider from "@/app/(afterLogin)/home/_component/TabProvider";
import PostForm from "@/app/(afterLogin)/home/_component/PostForm";
import {auth} from "@/auth";
import {Metadata} from "next";
import {Suspense} from "react";
import TabDeciderSuspense from "@/app/(afterLogin)/home/_component/TabDeciderSuspense";
import Loading from "@/app/(afterLogin)/home/loading";

export const metadata: Metadata = {
  title: '홈 / Z',
  description: '홈',
}

export default async function Home() {
  const session = await auth();
  return (
    <main className={style.main}>
      <TabProvider>
        <Tab/>
        <PostForm me={session}/>
        <Suspense fallback={<Loading/>}>
          <TabDeciderSuspense/>
        </Suspense>
      </TabProvider>
    </main>
  )
}
