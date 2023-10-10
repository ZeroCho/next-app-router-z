"use client";

import LoginComponent from '@/components/root/Login';
import {redirect, useRouter} from "next/navigation";

export default function Login() {
  const router = useRouter();
  router.replace('/i/flow/login')
  return <LoginComponent />;
}