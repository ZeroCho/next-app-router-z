"use client";

import {createContext, ReactNode, useState} from "react";

interface Props {
  children: ReactNode;
}

export const TabContext = createContext({
  tab: 'rec',
  setTab: (value: string) => {
  }
});

export default function TabProvider({children}: Props) {
  const [tab, setTab] = useState('rec');

  return (
    <TabContext.Provider value={{tab, setTab}}>{children}</TabContext.Provider>
  );
}