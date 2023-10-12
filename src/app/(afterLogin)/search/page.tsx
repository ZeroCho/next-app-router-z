import {Metadata} from "next";
import SearchForm from "@/app/(afterLogin)/_component/SearchForm";
import style from './search.module.css';
import React from "react";
import {Post as IPost} from "@/model/Post";
import Post from "@/app/(afterLogin)/home/_component/Post";
import BackButton from "@/app/(afterLogin)/search/_component/BackButton";
import {redirect} from "next/navigation";
import Tab from "@/app/(afterLogin)/search/_component/Tab";

type Props = {
  params: { id: string }
  searchParams: { q: string, pf?: string }
}

export async function generateMetadata({params, searchParams}: Props): Promise<Metadata> {
  return {
    title: `${searchParams.q} - 검색 / Z`,
    description: `${searchParams.q} - 검색 / Z`,
  }
}

async function getSearchResult(searchParams: Props['searchParams']) {
  const res = await fetch(`http://localhost:9090/api/search/${searchParams.q}?${new URLSearchParams(searchParams).toString()}`, {
    cache: 'no-store',
  })

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json();
}

export default async function Search({searchParams}: Props) {
  const searchResult: IPost[] = await getSearchResult(searchParams);

  if (!searchParams.q) {
    redirect('/explore');
  }

  return (
    <main className={style.main}>
      <div className={style.searchTop}>
        <div className={style.searchZone}>
          <div className={style.buttonZone}>
            <BackButton/>
          </div>
          <div className={style.formZone}>
            <SearchForm q={searchParams.q}/>
          </div>
        </div>
        <Tab/>
      </div>
      <div className={style.list}>
        {searchResult.map((v) => <Post key={v.postId} post={v}/>)}
      </div>
    </main>
  )
}