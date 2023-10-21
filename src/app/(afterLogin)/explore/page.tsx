import {Metadata} from "next";
import style from "./explore.module.css";
import Trend from "@/app/(afterLogin)/home/_component/Trend";
import {Hashtag} from "@/model/Hashtag";
import SearchForm from "@/app/(afterLogin)/_component/SearchForm";
import React from "react";
import {getTrends} from "@/app/(afterLogin)/_lib/getTrends";

export const metadata: Metadata = {
  title: '탐색하기 / Z',
  description: '탐색하기',
}

export default async function Explore() {
  const trends: Hashtag[] = await getTrends();

  return <main className={style.main}>
    <div className={style.formZone}>
      <SearchForm />
    </div>
    <div className={style.trend}>
      <h3>나를 위한 트렌드</h3>
      {trends.map((v) => <Trend key={v.tagId} trend={v} />)}
    </div>
  </main>
}