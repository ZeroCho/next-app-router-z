"use client";

import {ReactNode, useContext} from "react";
import {TabContext} from "@/app/(afterLogin)/home/_component/TabProvider";

interface Props {
  recommend: ReactNode;
  following: ReactNode;
}
export default function TabDecider({ recommend, following }: Props) {
  const { tab } = useContext(TabContext);
  if (tab === 'rec') {
    return recommend;
  } else {
    return following;
  }
}