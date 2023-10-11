"use client";

import style from "@/app/(afterLogin)/layout.module.css";
import {useRouter} from "next/navigation";
import {getMyInfo} from "@/app/(afterLogin)/layout";
import {useEffect} from "react";
import {useUserStore} from "@/store/user";

export default function LogOutButton() {
  const router = useRouter();
  const me = useUserStore(store => store.me);
  const add = useUserStore(store => store.add);

  useEffect(() => {
    if (!me) {
      getMyInfo()
        .then((data) => {
          add(data);
        })
    }
  }, [me, add]);

  const onLogout = () => {
    fetch('http://localhost:9090/api/logout', {
      method: 'post',
      credentials: 'include',
    }).then((response: Response) => {
      console.log(response.status);
      if (response.status === 200) {
        router.replace('/home');
      }
    }).catch((err) => {
      console.error(err);
    });
  }

  if (!me) {
    return null;
  }

  return (
    <button className={style.logOutButton} onClick={onLogout}>
      <div className={style.logOutUserImage}>
        <img src={me.image} alt={me.id}/>
      </div>
      <div className={style.logOutUserName}>
        <div>{me.nickname}</div>
        <div>@{me.id}</div>
      </div>
    </button>
  )
}