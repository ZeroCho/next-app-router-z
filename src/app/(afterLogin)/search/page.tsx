import {Metadata} from "next";
import SearchForm from "@/app/(afterLogin)/_component/SearchForm";
import style from './search.module.css';
import React from "react";
import BackButton from "@/app/(afterLogin)/search/_component/BackButton";
import {redirect} from "next/navigation";
import Tab from "@/app/(afterLogin)/search/_component/Tab";
import getQueryClient from "@/app/(afterLogin)/_lib/getQueryClient";
import {dehydrate, Hydrate} from "@tanstack/react-query";
import {getSearchResult} from "@/app/(afterLogin)/search/_lib/getSearchResult";
import SearchResult from "@/app/(afterLogin)/search/_component/SearchResult";

type Props = {
  params: { id: string }
  searchParams: { q: string, pf?: string, f?: string }
}

export async function generateMetadata({params, searchParams}: Props): Promise<Metadata> {
  return {
    title: `${searchParams.q} - 검색 / Z`,
    description: `${searchParams.q} - 검색 / Z`,
  }
}

export default async function Search({searchParams}: Props) {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(['searchResults', searchParams], getSearchResult);
  const dehydratedState = dehydrate(queryClient)

  if (!searchParams.q) {
    redirect('/explore');
  }

  return (
    <main className={style.main}>
      <Hydrate state={dehydratedState}>
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
          <SearchResult searchParams={searchParams} />
        </div>
      </Hydrate>
    </main>
  )
}