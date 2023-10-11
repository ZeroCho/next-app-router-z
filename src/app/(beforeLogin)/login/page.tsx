"use client";

import LoginComponent from '@/app/(beforeLogin)/_component/Login';
import {redirect, useRouter} from "next/navigation";

export default function Login() {
  const router = useRouter();
  router.replace('/i/flow/login')
  return <LoginComponent />;
}