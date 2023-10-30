import style from './signup.module.css';
import BackButton from './BackButton';
import {redirect} from "next/navigation";
import {signIn} from "next-auth/react";
export default function SignupModal() {

  const onSubmit = async (formData: FormData) => {
    'use server';
    let shouldRedirect = false;
    try {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`, {
          method: 'post',
          body: formData,
          credentials: 'include',
        });
        console.log(response.status);
        if (response.status === 200) {
          shouldRedirect = true;
        }
      } catch (err) {
        console.error(err);
      }
    } catch (err) {
      console.error(err);
    }
    if (shouldRedirect) {
      await redirect(`/home`);
    }
  }

  return (
    <>
      <div className={style.modalBackground}>
        <div className={style.modal}>
          <div className={style.modalHeader}>
            <BackButton />
            <div>계정을 생성하세요.</div>
          </div>
          <form action={onSubmit}>
            <div className={style.modalBody}>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="id">아이디</label>
                <input id="id" name="id" className={style.input} type="text" placeholder=""
                />
              </div>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="name">닉네임</label>
                <input id="name" name="name" className={style.input} type="text" placeholder=""
                />
              </div>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="password">비밀번호</label>
                <input id="password" name="password" className={style.input} type="password" placeholder=""
                />
              </div>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="image">프로필</label>
                <input id="image" name="image" className={style.input} type="file" accept="image/*"
                />
              </div>
            </div>
            <div className={style.modalFooter}>
              <button className={style.actionButton}>가입하기</button>
            </div>
          </form>
        </div>
      </div>
    </>)
}
