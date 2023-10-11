import style from '@/app/(afterLogin)/home/_component/trend.module.css';
import {Hashtag} from "@/model/Hashtag";
import Link from "next/link";

interface Props {
  trend: Hashtag
}
export default function Trend({ trend }: Props) {
  return (
    <Link href={`/search?q=${trend.title}`} className={style.container}>
      <div className={style.count}>실시간트렌드</div>
      <div className={style.title}>{trend.title}</div>
      <div className={style.count}>{trend.count.toLocaleString()} posts</div>
    </Link>
  )
}