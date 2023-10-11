"use client";

import style from './rightSearchZone.module.css'
import SearchForm from "@/app/(afterLogin)/_component/SearchForm";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

export default function RightSearchZone() {
  const pathname = usePathname()
  const searchParams = useSearchParams();
  const router = useRouter();
  console.log('pathname', pathname);

  const onChangeAll = () => {
    let url = `/search?q=${searchParams.get('q')}`;
    if (searchParams.has('f')) {
      url += `&f=${searchParams.get('f')}`
    }
    router.replace(url);
  };

  const onChangeFollow = () => {
    let url = `/search?${searchParams.toString()}&pf=on`;
    router.replace(url);
  };

  if (pathname === '/explore') {
    return null;
  }

  if (pathname === '/search') {
    return <div>
        <h5 className={style.filterTitle}>검색 필터</h5>
        <div className={style.filterSection}>
          <div>
            <label>사용자</label>
            <div className={style.radio}>
              <div>모든 사용자</div>
              <input type="radio" name="pf" defaultChecked onChange={onChangeAll} />
            </div>
            <div className={style.radio}>
              <div>내가 팔로우하는 사람들</div>
              <input type="radio" name="pf" value="on" onChange={onChangeFollow} />
            </div>
          </div>
        </div>
      </div>
  }

  return (
    <div style={{ marginBottom: 60, width: 350 }}>
      <SearchForm />
    </div>
  )
}