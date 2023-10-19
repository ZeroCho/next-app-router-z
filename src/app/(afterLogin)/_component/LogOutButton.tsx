"use client";

import style from "@/app/(afterLogin)/layout.module.css";
import {useRouter} from "next/navigation";
import {getMyInfo} from "@/app/(afterLogin)/layout";
import {useEffect} from "react";
import {useUserStore} from "@/store/user";
import {signOut} from "next-auth/react";

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
    signOut({ redirect: false }).then(() => {
      router.replace('/')
    }, (error) => {
      console.error(error);
    })
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