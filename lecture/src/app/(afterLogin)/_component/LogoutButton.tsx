"use client"

import style from "./logoutButton.module.css";
import {signOut} from "next-auth/react";
import {Session} from "@auth/core/types";
import {useQueryClient} from "@tanstack/react-query";

type Props = {
  me: Session | null
}
export default function LogoutButton({ me }: Props) {
  const queryClient = useQueryClient();

  const onLogout = () => {
    queryClient.invalidateQueries({
      queryKey: ["posts"],
    });
    queryClient.invalidateQueries({
      queryKey: ["users"],
    });
    signOut({ callbackUrl: '/' });
  };

  if (!me?.user) {
    return null;
  }

  return (
    <button className={style.logOutButton} onClick={onLogout}>
      <div className={style.logOutUserImage}>
        <img src={me.user?.image as string} alt={me.user?.email as string}/>
      </div>
      <div className={style.logOutUserName}>
        <div>{me.user?.name}</div>
        <div>@{me.user?.email}</div>
      </div>
    </button>
  )
}