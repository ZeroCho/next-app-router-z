import style from "@/app/(afterLogin)/home/_component/post.module.css";
import {Post} from '@/model/Post';
import Link from "next/link";

interface Props {
  post: Post
}

const Post = ({post}: Props) => {
  return (
    <Link href={`/${post.User.id}/status/${post.postId}`}>
      <article className={style.post}>
        <div className={style.postUserSection}>
          <div className={style.postUserImage}>
            <img src={post.User.image} alt={post.User.nickname}/>
          </div>
        </div>
        <div>
          <div>
            <span className={style.postUserName}>{post.User.nickname}</span>
            &nbsp;
            <span>@{post.User.id}</span>
          </div>
          <div>{post.content}</div>
          {post.Images.length > 0 && (
            <div className={style.postImageSection}>
              <img src={post.Images[0]?.link} alt=""/>
            </div>
          )}
        </div>
      </article>
    </Link>
  )
}

export default Post;