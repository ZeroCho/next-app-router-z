"use client";

import style from "@/app/(afterLogin)/home/home.module.css";
import React, {useState} from "react";
import {useRouter} from "next/navigation";

export default function Tab() {
  const [current, setCurrent] = useState('rec');

  const onClickRec = () => {
    setCurrent('rec');
  }
  const onClickFol = () => {
    setCurrent('fol');
  }

  return (
    <div className={style.homeFixed}>
      <div className={style.homeText}>홈</div>
      <div className={style.homeTab}>
        <div onClick={onClickRec}>추천
          <div className={style.tabIndicator} hidden={current === 'fol'}></div>
        </div>
        <div onClick={onClickFol}>
          팔로우 중
          <div className={style.tabIndicator} hidden={current === 'rec'}></div>
        </div>
      </div>
    </div>
  )
}