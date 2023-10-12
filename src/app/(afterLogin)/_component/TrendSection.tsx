"use client";

import style from "@/app/(afterLogin)/layout.module.css";
import Trend from "@/app/(afterLogin)/home/_component/Trend";
import {usePathname} from "next/navigation";
import {Hashtag} from "@/model/Hashtag";

interface Props {
  trends: Hashtag[];
}
export default function TrendSection({ trends }: Props) {
  const pathname = usePathname();

  if (pathname === '/explore') {
    return null;
  }
  return (
    <div className={style.trendBg}>
      <div className={style.trend}>
        <h3>나를 위한 트렌드</h3>
        {trends.map((v) => <Trend key={v.title} trend={v} />)}
      </div>
    </div>
  )
}