import style from '@/components/home/trend.module.css';

export default function Trend() {
  return (
    <div className={style.container}>
      <div className={style.count}>실시간트렌드</div>
      <div className={style.title}>제로초</div>
      <div className={style.count}>1,264 posts</div>
    </div>
  )
}