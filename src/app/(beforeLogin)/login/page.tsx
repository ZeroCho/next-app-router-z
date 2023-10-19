"use client";

import BeforeLogin from '@/app/(beforeLogin)/_component/BeforeLogin';
import {redirect, useRouter} from "next/navigation";

export default function Login() {
  const router = useRouter();
  router.replace('/i/flow/login')
  return <BeforeLogin />;
}