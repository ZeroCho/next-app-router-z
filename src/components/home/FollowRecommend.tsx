import style from '@/components/home/followRecommend.module.css';

export default function FollowRecommend() {
  return (
    <div className={style.container}>
      <div className={style.userLogoSection}>
        <div className={style.userLogo}>
          <img src="/yRsRRjGO.jpg" alt=""/>
        </div>
      </div>
      <div className={style.userInfo}>
        <div className={style.title}>Elon Musk</div>
        <div className={style.count}>@elonmusk</div>
      </div>
      <div className={style.followButtonSection}>
        <button>팔로우</button>
      </div>
    </div>
  )
}