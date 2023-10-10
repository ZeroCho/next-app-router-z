import style from "./layout.module.css";
import Link from "next/link";
import Image from "next/image";
import NavIcons from "@/components/root/NavIcons";
import {NextPage} from "next";
import Trend from "@/components/home/Trend";
import FollowRecommend from "@/components/home/FollowRecommend";

interface Props {
  children: React.ReactNode,
  modal: React.ReactNode,
}
const Layout: NextPage<Props> = ({
                                 children, modal
                               }) => {
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
                      <div>홈</div>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link href="/search">
                    <div className={style.navPill}>
                      <NavIcons type="/search"/>
                      <div>탐색하기</div>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link href="/messages">
                    <div className={style.navPill}>
                      <NavIcons type="/messages"/>
                      <div>쪽지</div>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link href="/username"> {/* TODO: username 대신 내 이름으로 */}
                    <div className={style.navPill}>
                      <NavIcons type="/username"/>
                      <div>프로필</div>
                    </div>
                  </Link>
                </li>
                <div>
                  <Link href="/compose/tweet" className={style.postButton}>게시하기</Link>
                </div>
              </ul>
            </nav>
            <div className={style.logOutButton}>
              <div className={style.logOutUserImage}>
                <img src="/5Udwvqim.jpg" alt="me"/>
              </div>
              <div className={style.logOutUserName}>
                <div>조현영</div>
                <div>@zerohch0</div>
              </div>
            </div>
          </div>
        </section>
      </header>
      <div className={style.rightSectionWrapper}>
        <div className={style.rightSectionInner}>
          {children}
          <section className={style.rightSection}>
            <form className={style.search}>
              <svg width={20} viewBox="0 0 24 24" aria-hidden="true">
                <g>
                  <path
                    d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z"></path>
                </g>
              </svg>
              <input type="search" placeholder="검색"/>
            </form>
            <div className={style.trend}>
              <h3>나를 위한 트렌드</h3>
              <Trend />
              <Trend />
              <Trend />
              <Trend />
              <Trend />
              <Trend />
              <Trend />
            </div>
            <div className={style.followRecommend}>
              <h3>팔로우 추천</h3>
              <FollowRecommend />
              <FollowRecommend />
              <FollowRecommend />
            </div>
          </section>
        </div>
      </div>
      {modal}
    </div>
  )
}

export default Layout;