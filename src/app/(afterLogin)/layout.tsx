import style from "./layout.module.css";
import Link from "next/link";
import Image from "next/image";
import NavIcons from "@/app/(afterLogin)/_component/NavIcons";
import {NextPage} from "next";
import FollowRecommend from "@/app/(afterLogin)/home/_component/FollowRecommend";
import LogOutButton from "@/app/(afterLogin)/_component/LogOutButton";
import {Hashtag} from "@/model/Hashtag";
import {User} from "@/model/User";
import RightSearchZone from "@/app/(afterLogin)/_component/RightSearchZone";
import React from "react";
import TrendSection from "@/app/(afterLogin)/_component/TrendSection";

export async function getMyInfo() {
  const res = await fetch('http://localhost:9090/api/user', {
    next: { tags: ['myInfo'] },
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

export async function getTrends() {
  const res = await fetch('http://localhost:9090/api/trends', {
    cache: 'no-store',
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}
async function getFollowRecommends() {
  const res = await fetch('http://localhost:9090/api/followRecommends');
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

interface Props {
  children: React.ReactNode,
  modal: React.ReactNode,
}
const Layout: NextPage<Props> = async ({
                                 children, modal
                               }) => {
  const me = await getMyInfo();
  const trends: Hashtag[] = await getTrends();
  const followRecommends: User[] = await getFollowRecommends();


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
                <li>
                  <Link href="/home">
                    <div className={style.navPill}>
                      <NavIcons type="/home"/>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link href="/explore">
                    <div className={style.navPill}>
                      <NavIcons type="/explore"/>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link href="/messages">
                    <div className={style.navPill}>
                      <NavIcons type="/messages"/>
                    </div>
                  </Link>
                </li>
                {me?.id && <li>
                  <Link href={`/${me?.id}`}>
                    <div className={style.navPill}>
                      <NavIcons type="/username"/>
                    </div>
                  </Link>
                </li>}
                <div>
                  <Link href="/compose/tweet" className={style.postButton}>게시하기</Link>
                </div>
              </ul>
            </nav>
            <LogOutButton />
          </div>
        </section>
      </header>
      <div className={style.rightSectionWrapper}>
        <div className={style.rightSectionInner}>
          {children}
          <section className={style.rightSection}>
            <RightSearchZone />
            <TrendSection trends={trends} />
            <div className={style.followRecommend}>
              <h3>팔로우 추천</h3>
              {followRecommends.map((v) => <FollowRecommend key={Math.random()} user={v} />)}
            </div>
          </section>
        </div>
      </div>
      {modal}
    </div>
  )
}

export default Layout;