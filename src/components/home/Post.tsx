import style from "@/components/home/post.module.css";

const Post = () => {
  return (
    <div className={style.post}>
      <div className={style.postUserSection}>
        <div className={style.postUserImage}>
          <img src="/yRsRRjGO.jpg" alt="user"/>
        </div>
      </div>
      <div>
        <div>
          <span className={style.postUserName}>Elon Musk</span>
          &nbsp;
          <span>@elonmusk</span>
        </div>
        <div>I&apos;m happy</div>
        <div className={style.postImageSection}>
          <img src="/-NEfK-ll.jpg" alt=""/>
        </div>
      </div>
    </div>
  )
}

export default Post;