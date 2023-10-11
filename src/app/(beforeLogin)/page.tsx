import React from "react";
import type {Metadata, NextPage} from "next";
import Login from "@/app/(beforeLogin)/_component/Login";
import {redirect} from "next/navigation";
import {getMyInfo} from "@/app/(afterLogin)/layout";

const IS_LOGGED_IN = false;
export async function generateMetadata(): Promise<Metadata> {
  const me = await getMyInfo();
  // read route params
  if (me) {
    return {
      title: 'Z',
      description: 'Z.com inspired by X.com',
    }
  }
  return {
    title: 'Z. 무슨 일이 일어나고 있나요? / Z',
  }
}

const Home: NextPage = async () => {
  const me = await getMyInfo();
  if (me) {
    redirect('/home');
  }
  return <Login />
}
export default Home;