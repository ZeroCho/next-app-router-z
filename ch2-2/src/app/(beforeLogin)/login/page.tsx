"use client";

import {useRouter} from "next/navigation";
import Main from "@/app/(beforeLogin)/_component/Main";

export default function Login() {
  const router = useRouter();
  router.replace('/i/flow/login');
  return (
    <Main/>
  );
}
