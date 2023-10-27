"use client";

import style from "@/app/(afterLogin)/search/search.module.css";
import React, {useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import {Route} from "next";

export default function Tab() {
  const [current, setCurrent] = useState('hot');
  const searchParams = useSearchParams();
  const router = useRouter();
  const onClickHot = () => {
    let url = `/search?q=${searchParams.get('q')}`;
    if (searchParams.has('pf')) {
      url += `&pf=${searchParams.get('pf')}`
    }
    setCurrent('hot');
    router.replace(url as Route)
  }
  const onClickNew = () => {
    setCurrent('new');
    router.replace(`/search?${searchParams.toString()}&f=live`)
  }

  return (
    <div className={style.homeFixed}>
      <div className={style.homeTab}>
        <div onClick={onClickHot}>
          인기
          <div className={style.tabIndicator} hidden={current === 'new'}></div>
        </div>
        <div onClick={onClickNew}>
          최신
          <div className={style.tabIndicator} hidden={current === 'hot'}></div>
        </div>
      </div>
    </div>
  )
}