import React from "react";
import type {Metadata, NextPage} from "next";

export async function generateMetadata(): Promise<Metadata> {
  // read route params
  const isLoggedIn = false;
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
  return <div>Hello</div>
}
export default Home;