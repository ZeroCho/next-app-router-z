import Main from "@/app/(beforeLogin)/_component/Main";
import {auth} from "@/auth";
import {redirect} from "next/navigation";
import RedirectToLogin from "@/app/(beforeLogin)/login/_component/RedirectToLogin";

export default async function Login() {
  const session = await auth();

  if (session?.user) {
    redirect('/home');
    return null;
  }

  return (
    <>
      <RedirectToLogin />
      <Main/>
    </>
  );
}
