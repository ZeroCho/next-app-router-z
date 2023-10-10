import React from "react";
import type {Metadata, NextPage} from "next";
import Login from "@/components/root/Login";
import {redirect} from "next/navigation";

const IS_LOGGED_IN = true;
export async function generateMetadata(): Promise<Metadata> {
  // read route params
  const isLoggedIn = IS_LOGGED_IN;
  if (isLoggedIn) {
    return {
      title: 'Z',
      description: 'Z.com inspired by X.com',
    }
  }
  return {
    title: 'Z. 무슨 일이 일어나고 있나요? / Z',
  }
}

const Home: NextPage = () => {
  const isLoggedIn = IS_LOGGED_IN;
  if (isLoggedIn) {
    redirect('/home');
  }
  return <Login />
}
export default Home;