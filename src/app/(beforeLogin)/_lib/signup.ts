'use server';

import {redirect} from "next/navigation";
import {signIn} from "@/auth";

export default async (prevState: any, formData: FormData) => {
  if (!formData.get('id')) {
    return { message: 'no_id' };
  }
  if (!formData.get('name')) {
    return { message: 'no_name' };
  }
  if (!formData.get('password')) {
    return { message: 'no_password' };
  }
  if (!formData.get('image')) {
    return { message: 'no_image' };
  }
  let shouldRedirect = false;
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`, {
      method: 'post',
      body: formData,
      credentials: 'include',
    });
    console.log('status', response.status);
    console.log(await response.text());
    if (response.status === 200) {
      shouldRedirect = true;
      await signIn('credentials', {
        username: formData.get('id'),
        password: formData.get('password'),
        redirect: false,
      })
    }
    if (response.status === 403) {
      return { message: 'user_exists' };
    }
    if (response.status === 404) {
      return { message: 'wrong_password' };
    }
  } catch (err) {
    console.error('error', err);
  }
  if (shouldRedirect) {
    await redirect(`/home`);
  }
}
