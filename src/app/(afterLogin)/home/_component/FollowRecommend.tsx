"use client";

import style from './followRecommend.module.css';
import {User} from "@/model/User";

interface Props {
  user: User
}

export default function FollowRecommend({ user }: Props) {
  const onFollow = () => {
    fetch(`http://localhost:9090/api/users/${user.id}/follow`, {
      method: 'post',
    })
      .then((response) => {
        if (response.status === 200) {
          alert('팔로우 후 효과 구현');
        }
      })
  };

  return (
    <div className={style.container}>
      <div className={style.userLogoSection}>
        <div className={style.userLogo}>
          <img src={user.image} alt={user.id} />
        </div>
      </div>
      <div className={style.userInfo}>
        <div className={style.title}>{user.nickname}</div>
        <div className={style.count}>@{user.id}</div>
      </div>
      <div className={style.followButtonSection}>
        <button onClick={onFollow}>팔로우</button>
      </div>
    </div>
  )
}