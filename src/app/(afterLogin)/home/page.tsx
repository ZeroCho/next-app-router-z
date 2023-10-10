import style from "./home.module.css";
import Post from "@/components/home/Post";
import {NextPage} from "next";

const Home: NextPage = () => {
  return (
    <main className={style.main}>
      <div className={style.homeFixed}>
        <div className={style.homeText}>홈</div>
        <div className={style.homeTab}>
          <a href="">추천
            <div className={style.tabIndicator}></div>
          </a>
          <a href="">팔로우 중</a>
        </div>
      </div>
      <div className={style.postForm}>
        <div className={style.postUserSection}>
          <div className={style.postUserImage}>
            <img src="/5Udwvqim.jpg" alt="me"/>
          </div>
        </div>
        <div className={style.postInputSection}>
          <input type="text" placeholder="무슨 일이 일어나고 있나요?"/>
          <div className={style.postButtonSection}>
            <div className={style.footerButtons}>
              <div className={style.footerButtonLeft}>
                <button className={style.uploadButton}>
                  <svg width={24} viewBox="0 0 24 24" aria-hidden="true">
                    <g>
                      <path
                        d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"></path>
                    </g>
                  </svg>
                </button>
              </div>
              <button className={style.actionButton} disabled>게시하기</button>
            </div>
          </div>
        </div>
      </div>
      <div className={style.list}>
        <Post/>
        <Post/>
        <Post/>
        <Post/>
      </div>
    </main>
  );
}

export default Home;
