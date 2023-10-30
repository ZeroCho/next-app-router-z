"use client";

import style from "@/app/(afterLogin)/layout.module.css";
import {useRouter} from "next/navigation";
import {useEffect} from "react";
import {useUserStore} from "@/store/user";
import {signOut, useSession} from "next-auth/react";

export default function LogOutButton() {
  const router = useRouter();
  const me = useUserStore(store => store.me);
  const add = useUserStore(store => store.add);
  const remove = useUserStore(store => store.remove);
  const { data: session, status } = useSession()

  useEffect(() => {
    if (!me && session?.user) {
      const { email, name, image } = session.user;
      if (email && name && image) {
        add({
          id: email,
          nickname: name,
          image: image,
        });
      }
    }
  }, [me, add, session]);

  const onLogout = () => {
    signOut({ redirect: false }).then(() => {
      remove();
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