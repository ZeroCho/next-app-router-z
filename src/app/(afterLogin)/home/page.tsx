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
            <button disabled>게시하기</button>
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
