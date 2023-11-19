"use client";

import {useEffect} from "react";
import {useRouter} from "next/navigation";
export default function RedirectToLogin() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/i/flow/login');
  }, []);
  return null;
}