import style from "./layout.module.css";
import Link from "next/link";
import Image from "next/image";
import NavMenu from "@/app/(afterLogin)/_component/NavMenu";
import {NextPage} from "next";
import FollowRecommend from "@/app/(afterLogin)/home/_component/FollowRecommend";
import LogOutButton from "@/app/(afterLogin)/_component/LogOutButton";
import {Hashtag} from "@/model/Hashtag";
import {User} from "@/model/User";
import RightSearchZone from "@/app/(afterLogin)/_component/RightSearchZone";
import React from "react";
import TrendSection from "@/app/(afterLogin)/_component/TrendSection";
import RQProvider from "./_component/RQProvider";
import {getFollowRecommends} from "@/app/(afterLogin)/_lib/getFollowRecommends";
import {getTrends} from "@/app/(afterLogin)/_lib/getTrends";
import {auth} from "@/auth";

export async function getMyInfo() {
  const res = await fetch('http://localhost:9090/api/user', {
    next: {tags: ['myInfo']},
    credentials: 'include',
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json();
}

interface Props {
  children: React.ReactNode,
  modal: React.ReactNode,
}

const Layout: NextPage<Props> = async ({
                                         children, modal
                                       }) => {
  const trends: Hashtag[] = await getTrends();
  const followRecommends: User[] = await getFollowRecommends();
  const session = await auth();

  return (
    <div className={style.container}>
      <header className={style.leftSectionWrapper}>
        <section className={style.leftSection}>
          <div className={style.leftSectionFixed}>
            <Link className={style.logo} href="/home">
              <div className={style.logoPill}>
                <Image src="/zlogo.png" alt="z.com로고" width={40} height={40}/>
              </div>
            </Link>
            <nav>
              <ul>
                <NavMenu/>
                <div>
                  <Link href="/compose/tweet" className={style.postButton}>게시하기</Link>
                </div>
              </ul>
            </nav>
            <LogOutButton/>
          </div>
        </section>
      </header>
      <RQProvider>
        <div className={style.rightSectionWrapper}>
          <div className={style.rightSectionInner}>
            {children}
            <section className={style.rightSection}>
              <RightSearchZone/>
              <TrendSection trends={trends}/>
              <div className={style.followRecommend}>
                <h3>팔로우 추천</h3>
                {followRecommends.map((v) => <FollowRecommend key={Math.random()} user={v}/>)}
              </div>
            </section>
          </div>
        </div>
        {modal}
      </RQProvider>
    </div>
  )
}

export default Layout;